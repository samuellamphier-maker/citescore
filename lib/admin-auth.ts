import { timingSafeEqual } from "node:crypto";
import { adminToken, cronSecret } from "@/lib/env";

function safeEqual(a: string, b: string) {
  if (!a || !b) return false;
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function extractProvidedToken(request: Request) {
  const header = request.headers.get("authorization") ?? "";
  const bearer = header.toLowerCase().startsWith("bearer ")
    ? header.slice(7).trim()
    : "";
  const query = new URL(request.url).searchParams.get("token")?.trim() ?? "";
  return bearer || query;
}

export function authorizeAdmin(request: Request) {
  const token = adminToken();
  if (!token) return { ok: false as const, reason: "ADMIN_TOKEN is not configured." };
  const provided = extractProvidedToken(request);
  if (!safeEqual(provided, token)) {
    return { ok: false as const, reason: "Unauthorized." };
  }
  return { ok: true as const };
}

export function authorizeAdminOrCron(request: Request) {
  const provided = extractProvidedToken(request);
  const admin = adminToken();
  const cron = cronSecret();
  if (admin && safeEqual(provided, admin)) return { ok: true as const };
  if (cron && safeEqual(provided, cron)) return { ok: true as const };
  if (!admin && !cron) {
    return { ok: false as const, reason: "ADMIN_TOKEN or CRON_SECRET is not configured." };
  }
  return { ok: false as const, reason: "Unauthorized." };
}
