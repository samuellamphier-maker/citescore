import { normalizeSiteUrl } from "@/lib/urls";

type StripeTextField = {
  key?: string | null;
  type?: string | null;
  label?: { type?: string | null; custom?: string | null } | null;
  text?: { value?: string | null } | null;
};

export type StripeLikeSession = {
  id?: string | null;
  client_reference_id?: string | null;
  customer_email?: string | null;
  customer_details?: { email?: string | null } | null;
  metadata?: Record<string, string> | null;
  custom_fields?: StripeTextField[] | null;
  success_url?: string | null;
  cancel_url?: string | null;
};

const URL_FIELD_KEYS = new Set(["site_url", "siteurl", "url", "website", "site"]);

function firstString(...values: Array<string | null | undefined>) {
  for (const value of values) {
    if (value && value.trim()) return value.trim();
  }
  return "";
}

export function extractCustomerEmail(session: StripeLikeSession) {
  return firstString(session.customer_details?.email, session.customer_email).toLowerCase();
}

function urlFromCustomFields(fields: StripeTextField[] | null | undefined) {
  if (!fields) return "";
  for (const field of fields) {
    const key = (field.key || "").toLowerCase();
    const label = (field.label?.custom || "").toLowerCase();
    const value = field.text?.value || "";
    if (!value) continue;
    if (URL_FIELD_KEYS.has(key) || /url|website|site/.test(label)) {
      return value;
    }
  }
  return "";
}

function urlFromQuery(raw: string | null | undefined) {
  if (!raw) return "";
  try {
    const url = new URL(raw);
    return firstString(
      url.searchParams.get("site_url"),
      url.searchParams.get("url"),
      url.searchParams.get("client_reference_id"),
    );
  } catch {
    return "";
  }
}

export function extractSiteUrl(session: StripeLikeSession) {
  const raw = firstString(
    session.metadata?.site_url,
    session.metadata?.url,
    session.client_reference_id,
    urlFromCustomFields(session.custom_fields),
    urlFromQuery(session.success_url),
    urlFromQuery(session.cancel_url),
  );
  return normalizeSiteUrl(raw);
}

export function describeExtract(session: StripeLikeSession) {
  return {
    email: extractCustomerEmail(session),
    siteUrl: extractSiteUrl(session),
    usedClientReferenceId: Boolean(session.client_reference_id),
    usedMetadata: Boolean(session.metadata?.site_url || session.metadata?.url),
    usedCustomFields: Boolean(urlFromCustomFields(session.custom_fields)),
  };
}
