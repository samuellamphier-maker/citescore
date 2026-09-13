import type { AuditJob } from "@/lib/jobs/types";
import { supabaseServiceRoleKey, supabaseUrl } from "@/lib/env";

const TABLE = "audit_jobs";

function restUrl(path = "") {
  return `${supabaseUrl()}/rest/v1/${TABLE}${path}`;
}

function headers(prefer?: string) {
  const key = supabaseServiceRoleKey();
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...(prefer ? { Prefer: prefer } : {}),
  };
}

async function request<T>(path: string, init: RequestInit): Promise<T> {
  const response = await fetch(restUrl(path), init);
  const text = await response.text();
  if (!response.ok) {
    throw new Error(
      `Supabase ${response.status}: ${text.slice(0, 400) || response.statusText}`,
    );
  }
  if (!text) return [] as T;
  return JSON.parse(text) as T;
}

function rowToJob(row: AuditJob) {
  return {
    ...row,
    events: row.events ?? [],
    crawl: row.crawl ?? null,
    report: row.report ?? null,
  };
}

export async function supabaseCreate(job: AuditJob) {
  const existing = await supabaseGetByStripeSessionId(job.stripeSessionId);
  if (existing) return existing;
  const rows = await request<AuditJob[]>("", {
    method: "POST",
    headers: headers("return=representation"),
    body: JSON.stringify(job),
  });
  return rowToJob(rows[0] ?? job);
}

export async function supabaseGetById(id: string) {
  const rows = await request<AuditJob[]>(`?id=eq.${encodeURIComponent(id)}&select=*`, {
    method: "GET",
    headers: headers(),
  });
  return rows[0] ? rowToJob(rows[0]) : null;
}

export async function supabaseGetByStripeSessionId(stripeSessionId: string) {
  const rows = await request<AuditJob[]>(
    `?stripeSessionId=eq.${encodeURIComponent(stripeSessionId)}&select=*`,
    { method: "GET", headers: headers() },
  );
  return rows[0] ? rowToJob(rows[0]) : null;
}

export async function supabaseGetByDownloadToken(token: string) {
  const rows = await request<AuditJob[]>(
    `?downloadToken=eq.${encodeURIComponent(token)}&select=*`,
    { method: "GET", headers: headers() },
  );
  return rows[0] ? rowToJob(rows[0]) : null;
}

export async function supabaseUpdate(id: string, patch: Partial<AuditJob>) {
  const rows = await request<AuditJob[]>(`?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: headers("return=representation"),
    body: JSON.stringify(patch),
  });
  if (!rows[0]) throw new Error(`Job ${id} not found.`);
  return rowToJob(rows[0]);
}

export async function supabaseList(limit = 50) {
  const rows = await request<AuditJob[]>(
    `?select=*&order=createdAt.desc&limit=${limit}`,
    { method: "GET", headers: headers() },
  );
  return rows.map(rowToJob);
}
