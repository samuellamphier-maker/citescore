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

export function snapshotFieldsComplete(fields: SnapshotFields) {
  return (
    fields.business.trim() !== "" &&
    fields.city.trim() !== "" &&
    fields.service.trim() !== "" &&
    fields.website.trim() !== "" &&
    EMAIL_RE.test(fields.email.trim())
  );
}

/**
 * Visitor fields plus FlowForm controls.
 * _subject stays the fixed snapshot subject even when ?trade= changes the mailto subject.
 * An empty honeypot is checked in the browser and is not posted.
 */
export function snapshotFormPayload(fields: SnapshotFields) {
  return {
    _subject: snapshotSubject,
    _replyto: fields.email.trim(),
    "Business name": fields.business.trim(),
    City: fields.city.trim(),
    Service: fields.service.trim(),
    Website: fields.website.trim(),
    Email: fields.email.trim(),
  };
}

export function snapshotFormEncoded(fields: SnapshotFields) {
  return new URLSearchParams(snapshotFormPayload(fields)).toString();
}

export function snapshotSubmitSucceeded(status: number, body: unknown) {
  if (status < 200 || status >= 300) return false;
  if (!body || typeof body !== "object") return false;
  const success = (body as { success?: unknown }).success;
  return success === true || success === "true";
}
