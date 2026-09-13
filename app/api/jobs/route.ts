import { after } from "next/server";
import { authorizeAdmin } from "@/lib/admin-auth";
import { jobStoreKind, listJobs } from "@/lib/jobs/store";
import { receiveCheckoutJob } from "@/lib/jobs/create";
import { toPublicJob } from "@/lib/jobs/types";
import { processJob } from "@/lib/pipeline";
import { isValidEmail, normalizeSiteUrl } from "@/lib/urls";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  const auth = authorizeAdmin(request);
  if (!auth.ok) {
    return Response.json({ error: auth.reason }, { status: auth.reason.includes("not configured") ? 503 : 401 });
  }

  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit") || "50");
  const jobs = await listJobs(Math.min(100, Number.isFinite(limit) ? limit : 50));
  return Response.json({
    store: jobStoreKind(),
    jobs: jobs.map(toPublicJob),
  });
}

export async function POST(request: Request) {
  const auth = authorizeAdmin(request);
  if (!auth.ok) {
    return Response.json({ error: auth.reason }, { status: auth.reason.includes("not configured") ? 503 : 401 });
  }

  let payload: { email?: unknown; site_url?: unknown; process?: unknown };
  try {
    payload = (await request.json()) as typeof payload;
  } catch {
    return Response.json({ error: "Send JSON with email and site_url." }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email : "";
  const siteUrl = typeof payload.site_url === "string" ? normalizeSiteUrl(payload.site_url) : null;
  if (!isValidEmail(email)) {
    return Response.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (!siteUrl) {
    return Response.json({ error: "A valid http(s) site_url is required." }, { status: 400 });
  }

  const { job, created } = await receiveCheckoutJob({
    stripeSessionId: `manual_${crypto.randomUUID()}`,
    email: email.toLowerCase().trim(),
    siteUrl,
  });

  if (payload.process !== false) {
    after(() => processJob(job.id, { force: true }));
  }

  return Response.json({ created, job: toPublicJob(job) });
}
