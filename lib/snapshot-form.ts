/**
 * FlowForm relay for the free snapshot request.
 * Generic mode needs no account. Subject and inbox match SNAPSHOT_SUBJECT and contactEmail.
 * No imports: the node test runner loads this file directly.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const snapshotFormProvider = "FlowForm";

/** Document POST. Generic mode forwards the form to the address in the path. */
export const snapshotFormPageEndpoint =
  "https://flowform.to/citescore@mail.grokbot.com";

const snapshotSubject = "Free AI Answer Snapshot";

export const snapshotSentMessage =
  "Request received. We reply with your one-page snapshot by email.";

/** Names the address the one-page snapshot is emailed to. */
export function snapshotDeliveredToMessage(email: string) {
  return `We email the snapshot to ${email.trim()}.`;
}

export const snapshotSendErrorMessage =
  "The request did not send. Use the email button below, or copy the address and the request text.";

/** Shown when a website was typed but is not an http(s) address. */
export const snapshotWebsiteInvalidMessage =
  "Enter a website, with or without https://.";

export type SnapshotFields = {
  business: string;
  city: string;
  service: string;
  website: string;
  email: string;
};

/**
 * Page path posted with a guide form. Only a same-site path is kept.
 * Query strings, hashes, and off-site values are dropped.
 */
export function snapshotSourceValue(value: string | null | undefined) {
  const trimmed = value?.trim() ?? "";
  if (!/^\/[a-z0-9/-]+$/.test(trimmed)) return "";
  if (trimmed.includes("//") || trimmed.length > 120) return "";
  return trimmed;
}

export function snapshotWebsiteValue(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

/**
 * True when the website can be posted. A bare domain is accepted.
 * Local hosts, credentials, and values that are not http(s) URLs are not.
 */
export function snapshotWebsiteAccepted(value: string) {
  const normalized = snapshotWebsiteValue(value);
  if (!normalized) return false;
  let url: URL;
  try {
    url = new URL(normalized);
  } catch {
    return false;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return false;
  if (url.username || url.password) return false;
  const hostname = url.hostname.toLowerCase();
  if (!hostname.includes(".")) return false;
  if (
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local")
  ) {
    return false;
  }
  return true;
}

const GENERIC_BUSINESS_NAMES = new Set([
  "home",
  "homepage",
  "welcome",
  "untitled",
  "index",
]);

function codePointFromEntity(raw: string, radix: number) {
  const code = Number.parseInt(raw, radix);
  if (!Number.isFinite(code) || code < 32 || code > 0x10ffff) return "";
  if (code >= 0xd800 && code <= 0xdfff) return "";
  return String.fromCodePoint(code);
}

function decodeBasicEntities(value: string) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => codePointFromEntity(hex, 16))
    .replace(/&#(\d+);/g, (_, dec: string) => codePointFromEntity(dec, 10))
    .replace(/&nbsp;/gi, " ")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&");
}

function cleanBusinessText(value: string) {
  const decoded = decodeBasicEntities(value);
  if (/[<>]/.test(decoded)) return "";
  return decoded
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function usableBusinessName(value: string) {
  if (value.length < 2 || value.length > 80) return false;
  if (/^https?:\/\//i.test(value)) return false;
  if (!/\p{L}/u.test(value)) return false;
  return !GENERIC_BUSINESS_NAMES.has(value.toLowerCase());
}

/**
 * Website carried from the signal check into the snapshot request.
 * Query strings, hashes, and credentials are dropped. An empty string means
 * the field stays blank.
 */
export function snapshotWebsitePrefill(value: string | null | undefined) {
  const trimmed = (value ?? "").trim();
  if (!trimmed || trimmed.length > 300) return "";
  const withScheme = snapshotWebsiteValue(trimmed);
  if (!withScheme || withScheme.length > 300) return "";
  try {
    const url = new URL(withScheme);
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    if (url.username || url.password) return "";
    const hostname = url.hostname.toLowerCase();
    if (!hostname.includes(".")) return "";
    if (
      hostname === "localhost" ||
      hostname.endsWith(".local") ||
      hostname.endsWith(".localhost")
    ) {
      return "";
    }
    const path = url.pathname === "/" ? "" : url.pathname.replace(/\/+$/, "");
    return `${url.protocol}//${url.host}${path}`;
  } catch {
    return "";
  }
}

/**
 * Business name carried from a homepage title. The first usable segment
 * before a title separator is kept. Generic titles such as "Home" are not.
 */
export function snapshotBusinessPrefill(value: string | null | undefined) {
  const raw = value ?? "";
  if (raw.trim() === "" || raw.length > 500) return "";
  const cleaned = cleanBusinessText(raw);
  if (!cleaned) return "";
  const parts = cleaned
    .split(/\s+[|–—]\s+|\s+-\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
  for (const part of parts.length > 0 ? parts : [cleaned]) {
    if (usableBusinessName(part)) return part;
  }
  return "";
}

/** Snapshot request URL with the checked site filled in when it is usable. */
export function freeSnapshotRequestHref(input?: {
  website?: string | null;
  business?: string | null;
}) {
  const params = new URLSearchParams();
  const website = snapshotWebsitePrefill(input?.website);
  const business = snapshotBusinessPrefill(input?.business);
  if (website) params.set("website", website);
  if (business) params.set("business", business);
  const query = params.toString();
  return query ? `/free-snapshot?${query}` : "/free-snapshot";
}

export function snapshotFieldsComplete(fields: SnapshotFields) {
  return Object.keys(snapshotFieldErrors(fields)).length === 0;
}

/** Field messages shown after a failed check. Empty fields are omitted. */
export function snapshotFieldErrors(fields: SnapshotFields) {
  const errors: Partial<Record<keyof SnapshotFields, string>> = {};
  if (fields.business.trim() === "") errors.business = "Enter a business name.";
  if (fields.city.trim() === "") errors.city = "Enter a city.";
  if (fields.service.trim() === "") errors.service = "Enter a service.";
  if (fields.website.trim() === "") errors.website = "Enter a website.";
  else if (!snapshotWebsiteAccepted(fields.website)) {
    errors.website = snapshotWebsiteInvalidMessage;
  }
  if (!EMAIL_RE.test(fields.email.trim())) errors.email = "Enter an email address.";
  return errors;
}

const snapshotFieldOrder: (keyof SnapshotFields)[] = [
  "business",
  "city",
  "service",
  "website",
  "email",
];

/**
 * Alert under the submit button. Names only the fields that failed, in form
 * order, so a filled business name is not listed again when service is empty.
 */
export function snapshotValidationSummary(
  errors: Partial<Record<keyof SnapshotFields, string>>,
) {
  return snapshotFieldOrder
    .map((key) => errors[key])
    .filter((message): message is string => Boolean(message))
    .join(" ");
}

/**
 * Visitor fields plus FlowForm controls.
 * _subject stays the fixed snapshot subject even when ?trade= changes the mailto subject.
 * An empty honeypot is checked in the browser and is not posted.
 */
export function snapshotFormPayload(fields: SnapshotFields, source?: string) {
  const page = snapshotSourceValue(source);
  return {
    _subject: snapshotSubject,
    _replyto: fields.email.trim(),
    "Business name": fields.business.trim(),
    City: fields.city.trim(),
    Service: fields.service.trim(),
    Website: snapshotWebsiteValue(fields.website),
    Email: fields.email.trim(),
    ...(page ? { source: page } : {}),
  };
}

export function snapshotFormEncoded(fields: SnapshotFields, source?: string) {
  return new URLSearchParams(snapshotFormPayload(fields, source)).toString();
}

export function snapshotSubmitSucceeded(status: number, body: unknown) {
  if (status < 200 || status >= 300) return false;
  if (!body || typeof body !== "object") return false;
  const success = (body as { success?: unknown }).success;
  return success === true || success === "true";
}

export type SnapshotPostResponse = {
  status: number;
  json: () => Promise<unknown>;
};

export type SnapshotPost = (
  url: string,
  init: {
    method: "POST";
    headers: {
      Accept: "application/json";
      "Content-Type": "application/x-www-form-urlencoded";
    };
    body: string;
  },
) => Promise<SnapshotPostResponse>;

/**
 * Posts one urlencoded body to the same FlowForm inbox as the snapshot form.
 * JSON is required so a failure stays on the page instead of navigating away.
 * A network error and a non-success body are both failures.
 */
export async function postFlowForm(body: string, post: SnapshotPost) {
  try {
    const response = await post(snapshotFormPageEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });
    let parsed: unknown = null;
    try {
      parsed = await response.json();
    } catch {
      parsed = null;
    }
    return snapshotSubmitSucceeded(response.status, parsed) ? "sent" : "error";
  } catch {
    return "error";
  }
}

/**
 * Posts the same FlowForm body the no-JS snapshot form would submit.
 */
export async function postSnapshotForm(
  fields: SnapshotFields,
  source: string | undefined,
  post: SnapshotPost,
) {
  return postFlowForm(snapshotFormEncoded(fields, source), post);
}
