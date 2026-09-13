import type { AuditReport } from "@/lib/sample-report";
import type { CrawlResult } from "@/lib/crawl/types";

export const JOB_STATUSES = [
  "received",
  "crawling",
  "scoring",
  "rendering",
  "emailed",
  "failed",
] as const;

export type JobStatus = (typeof JOB_STATUSES)[number];

export type JobEvent = {
  at: string;
  status: JobStatus | "note";
  message: string;
};

export type AuditJob = {
  id: string;
  stripeSessionId: string;
  email: string;
  siteUrl: string;
  status: JobStatus;
  error: string | null;
  failureEmailedAt: string | null;
  downloadToken: string;
  crawl: CrawlResult | null;
  report: AuditReport | null;
  events: JobEvent[];
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
};

export type JobPublic = Omit<AuditJob, "events" | "crawl"> & {
  eventCount: number;
  pageCount: number;
};

export function toPublicJob(job: AuditJob): JobPublic {
  return {
    id: job.id,
    stripeSessionId: job.stripeSessionId,
    email: job.email,
    siteUrl: job.siteUrl,
    status: job.status,
    error: job.error,
    failureEmailedAt: job.failureEmailedAt,
    downloadToken: job.downloadToken,
    report: job.report,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
    completedAt: job.completedAt,
    eventCount: job.events.length,
    pageCount: job.crawl?.pages.length ?? 0,
  };
}

export function nowIso() {
  return new Date().toISOString();
}

export function newJobId() {
  return crypto.randomUUID();
}

export function newDownloadToken() {
  return crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "");
}

export function isInFlight(status: JobStatus) {
  return (
    status === "crawling" || status === "scoring" || status === "rendering"
  );
}
