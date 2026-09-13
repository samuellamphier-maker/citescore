import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { AuditJob } from "@/lib/jobs/types";

const localFile = path.join(process.cwd(), "data", "jobs.json");

export function jobsPath() {
  if (process.env.JOBS_PATH) return process.env.JOBS_PATH;
  if (process.env.VERCEL) return "/tmp/citescore-jobs.json";
  return localFile;
}

async function readAll(): Promise<AuditJob[]> {
  try {
    const raw = await readFile(/*turbopackIgnore: true*/ jobsPath(), "utf8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as AuditJob[]) : [];
  } catch {
    return [];
  }
}

async function writeAll(jobs: AuditJob[]) {
  const file = jobsPath();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(
    /*turbopackIgnore: true*/ file,
    `${JSON.stringify(jobs, null, 2)}\n`,
    "utf8",
  );
}

export async function fileCreate(job: AuditJob) {
  const all = await readAll();
  const existing = all.find((row) => row.stripeSessionId === job.stripeSessionId);
  if (existing) return existing;
  all.unshift(job);
  await writeAll(all);
  return job;
}

export async function fileGetById(id: string) {
  const all = await readAll();
  return all.find((row) => row.id === id) ?? null;
}

export async function fileGetByStripeSessionId(stripeSessionId: string) {
  const all = await readAll();
  return all.find((row) => row.stripeSessionId === stripeSessionId) ?? null;
}

export async function fileGetByDownloadToken(token: string) {
  const all = await readAll();
  return all.find((row) => row.downloadToken === token) ?? null;
}

export async function fileUpdate(id: string, patch: Partial<AuditJob>) {
  const all = await readAll();
  const index = all.findIndex((row) => row.id === id);
  if (index === -1) throw new Error(`Job ${id} not found.`);
  const next = { ...all[index], ...patch, id };
  all[index] = next;
  await writeAll(all);
  return next;
}

export async function fileList(limit = 50) {
  const all = await readAll();
  return all
    .slice()
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, limit);
}
