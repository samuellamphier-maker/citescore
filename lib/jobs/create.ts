import type { AuditJob } from "@/lib/jobs/types";
import {
  newDownloadToken,
  newJobId,
  nowIso,
} from "@/lib/jobs/types";
import { createJob, getJobByStripeSessionId } from "@/lib/jobs/store";

export async function receiveCheckoutJob(input: {
  stripeSessionId: string;
  email: string;
  siteUrl: string;
}) {
  const existing = await getJobByStripeSessionId(input.stripeSessionId);
  if (existing) {
    return { job: existing, created: false };
  }

  const now = nowIso();
  const job: AuditJob = {
    id: newJobId(),
    stripeSessionId: input.stripeSessionId,
    email: input.email,
    siteUrl: input.siteUrl,
    status: "received",
    error: null,
    failureEmailedAt: null,
    downloadToken: newDownloadToken(),
    crawl: null,
    report: null,
    events: [{ at: now, status: "received", message: "Checkout session received" }],
    createdAt: now,
    updatedAt: now,
    completedAt: null,
  };

  return { job: await createJob(job), created: true };
}
