/** Server-side env helpers. Never import this from a client component. */

export function appUrl() {
  const explicit =
    process.env.APP_URL?.trim() || process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export function adminToken() {
  return process.env.ADMIN_TOKEN?.trim() || "";
}

export function cronSecret() {
  return process.env.CRON_SECRET?.trim() || "";
}

export function stripeWebhookSecret() {
  return process.env.STRIPE_WEBHOOK_SECRET?.trim() || "";
}

export function stripeSecretKey() {
  return process.env.STRIPE_SECRET_KEY?.trim() || "";
}

export function resendApiKey() {
  return process.env.RESEND_API_KEY?.trim() || "";
}

export function emailFrom() {
  return process.env.EMAIL_FROM?.trim() || "";
}

export function openaiApiKey() {
  return process.env.OPENAI_API_KEY?.trim() || "";
}

export function anthropicApiKey() {
  return process.env.ANTHROPIC_API_KEY?.trim() || "";
}

export function openaiModel() {
  return process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
}

export function anthropicModel() {
  return process.env.ANTHROPIC_MODEL?.trim() || "claude-3-5-haiku-20241022";
}

export function supabaseUrl() {
  return process.env.SUPABASE_URL?.trim() || "";
}

export function supabaseServiceRoleKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "";
}

export function hasSupabase() {
  return Boolean(supabaseUrl() && supabaseServiceRoleKey());
}

export function storeBackend(): "supabase" | "file" {
  return hasSupabase() ? "supabase" : "file";
}
