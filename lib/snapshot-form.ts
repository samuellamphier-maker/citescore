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
  "Request sent. We reply with your one-page snapshot by email.";

export const snapshotSendErrorMessage =
  "The request did not send. Use the email button below, or copy the address and the request text.";

export const snapshotValidationMessage =
  "Enter a business name, city, service, website, and email.";

export type SnapshotFields = {
  business: string;
  city: string;
  service: string;
  website: string;
  email: string;
};

/**
 * Bare domains are accepted. FlowForm and the email fallback both need a
 * scheme, and a URL input rejects a value that has none.
 */
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

export function snapshotFieldsComplete(fields: SnapshotFields) {
  return Object.keys(snapshotFieldErrors(fields)).length === 0;
}

/** Field messages shown after a failed check. Empty fields are omitted. */
export function snapshotFieldErrors(fields: SnapshotFields) {
  const errors: Partial<Record<keyof SnapshotFields, string>> = {};
  if (fields.business.trim() === "") errors.business = "Enter a business name.";
  if (fields.city.trim() === "") errors.city = "Enter a city.";
  if (fields.service.trim() === "") errors.service = "Enter a service.";
  if (snapshotWebsiteValue(fields.website) === "") errors.website = "Enter a website.";
  if (!EMAIL_RE.test(fields.email.trim())) errors.email = "Enter an email address.";
  return errors;
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
