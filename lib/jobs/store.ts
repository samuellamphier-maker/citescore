import type { AuditJob, JobEvent, JobStatus } from "@/lib/jobs/types";
import { nowIso } from "@/lib/jobs/types";
import { storeBackend } from "@/lib/env";
import * as file from "@/lib/jobs/file-store";
import * as supabase from "@/lib/jobs/supabase-store";

export function jobStoreKind() {
  return storeBackend();
}

export async function createJob(job: AuditJob) {
  return storeBackend() === "supabase" ? supabase.supabaseCreate(job) : file.fileCreate(job);
}

export async function getJobById(id: string) {
  return storeBackend() === "supabase" ? supabase.supabaseGetById(id) : file.fileGetById(id);
}

export async function getJobByStripeSessionId(stripeSessionId: string) {
  return storeBackend() === "supabase"
    ? supabase.supabaseGetByStripeSessionId(stripeSessionId)
    : file.fileGetByStripeSessionId(stripeSessionId);
}

export async function getJobByDownloadToken(token: string) {
  return storeBackend() === "supabase"
    ? supabase.supabaseGetByDownloadToken(token)
    : file.fileGetByDownloadToken(token);
}

export async function updateJob(id: string, patch: Partial<AuditJob>) {
  const withTime = { ...patch, updatedAt: nowIso() };
  return storeBackend() === "supabase"
    ? supabase.supabaseUpdate(id, withTime)
    : file.fileUpdate(id, withTime);
}

export async function listJobs(limit = 50) {
  return storeBackend() === "supabase" ? supabase.supabaseList(limit) : file.fileList(limit);
}

export async function appendJobEvent(
  job: AuditJob,
  status: JobStatus | "note",
  message: string,
) {
  const event: JobEvent = { at: nowIso(), status, message };
  const events = [...job.events, event].slice(-40);
  const patch: Partial<AuditJob> = { events };
  if (status !== "note") patch.status = status;
  return updateJob(job.id, patch);
}

export async function listStuckJobs(olderThanMs = 4 * 60 * 1000, limit = 5) {
  const cutoff = Date.now() - olderThanMs;
  const jobs = await listJobs(100);
  return jobs
    .filter((job) => {
      if (job.status === "emailed") return false;
      if (job.status === "failed") return false;
      if (job.status === "received") return true;
      return new Date(job.updatedAt).getTime() < cutoff;
    })
    .slice(0, limit);
}
