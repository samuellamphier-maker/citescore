import { crawlSite } from "@/lib/crawl/crawler";
import { emailConfigured, sendFailureEmail, sendReportEmail } from "@/lib/email/resend";
import type { AuditJob } from "@/lib/jobs/types";
import { isInFlight, nowIso } from "@/lib/jobs/types";
import {
  appendJobEvent,
  getJobById,
  updateJob,
} from "@/lib/jobs/store";
import { renderReportPdf } from "@/lib/report/pdf";
import { scoreSite } from "@/lib/score/llm";

const STUCK_MS = 4 * 60 * 1000;

export async function processJob(id: string, options?: { force?: boolean }) {
  let job = await getJobById(id);
  if (!job) throw new Error(`Job ${id} not found.`);

  if (job.status === "emailed" && !options?.force) {
    return job;
  }

  if (
    isInFlight(job.status) &&
    !options?.force &&
    Date.now() - new Date(job.updatedAt).getTime() < STUCK_MS
  ) {
    return job;
  }

  try {
    job = await appendJobEvent(job, "crawling", `Fetching ${job.siteUrl}`);
    if (!job.siteUrl) {
      throw new Error("No site URL was attached to this checkout session.");
    }

    const crawl = await crawlSite(job.siteUrl);
    job = await updateJob(job.id, { crawl });
    if (crawl.pages.length === 0) {
      throw new Error(
        crawl.warnings[0] || "Could not fetch any public HTML for that URL.",
      );
    }

    job = await appendJobEvent(job, "scoring", "Scoring on-page GEO signals");
    const scored = await scoreSite(crawl);
    job = await updateJob(job.id, { report: scored.report });
    job = await appendJobEvent(
      job,
      "rendering",
      scored.usedLlm
        ? `Drafted report with ${scored.provider}`
        : scored.provider
          ? "LLM failed; used heuristic report"
          : "Heuristic report (no LLM key configured)",
    );

    const pdf = await renderReportPdf(scored.report);

    if (!emailConfigured()) {
      throw new Error("RESEND_API_KEY / EMAIL_FROM are not configured; report was generated but not emailed.");
    }

    await sendReportEmail(job, scored.report, pdf);
    job = await updateJob(job.id, {
      status: "emailed",
      error: null,
      completedAt: nowIso(),
    });
    job = await appendJobEvent(job, "emailed", `Sent PDF to ${job.email}`);
    return job;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown pipeline error";
    job = await updateJob(job.id, {
      status: "failed",
      error: message,
      completedAt: nowIso(),
    });
    job = await appendJobEvent(job, "failed", message);
    await notifyFailure(job, message);
    return job;
  }
}

async function notifyFailure(job: AuditJob, message: string) {
  if (job.failureEmailedAt) return;
  if (!emailConfigured()) return;
  if (!job.email) return;
  try {
    await sendFailureEmail(job, message);
    await updateJob(job.id, { failureEmailedAt: nowIso() });
  } catch (error) {
    const extra = error instanceof Error ? error.message : "failure email failed";
    await appendJobEvent(job, "note", `Could not send failure email: ${extra}`);
  }
}
