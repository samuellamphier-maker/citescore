/**
 * Fix Pack intake after payment. Same FlowForm inbox and success check as
 * the free snapshot request, with a subject and note the inbox can tell apart.
 */
import { FIX_PACK_DETAILS_SUBJECT, FIX_PACK_INTAKE_NOTE } from "@/lib/email-request";
import {
  postFlowForm,
  snapshotFieldErrors,
  snapshotWebsiteInvalidMessage,
  snapshotWebsiteValue,
  type SnapshotFields,
  type SnapshotPost,
} from "@/lib/snapshot-form";

export const fixPackIntakeSentLead = "Details sent.";

export const fixPackIntakeSendErrorMessage =
  "The details did not send. Use the email button below, or copy the address and the request text.";

export const fixPackIntakeWebsiteInvalidMessage =
  "Enter a public site URL, with or without https://.";

export function fixPackIntakeFieldErrors(fields: SnapshotFields) {
  const errors = snapshotFieldErrors(fields);
  if (errors.service === "Enter a service.") errors.service = "Enter a main service.";
  if (errors.website === "Enter a website.") errors.website = "Enter a public site URL.";
  if (errors.website === snapshotWebsiteInvalidMessage) {
    errors.website = fixPackIntakeWebsiteInvalidMessage;
  }
  return errors;
}

export function fixPackIntakeFieldsComplete(fields: SnapshotFields) {
  return Object.keys(fixPackIntakeFieldErrors(fields)).length === 0;
}

/**
 * Visitor fields plus FlowForm controls.
 * The subject and Request line are not the free-snapshot subject.
 * An empty honeypot is checked in the browser and is not posted.
 */
export function fixPackIntakePayload(fields: SnapshotFields) {
  return {
    _subject: FIX_PACK_DETAILS_SUBJECT,
    _replyto: fields.email.trim(),
    "Business name": fields.business.trim(),
    City: fields.city.trim(),
    "Main service": fields.service.trim(),
    "Public site URL": snapshotWebsiteValue(fields.website),
    Email: fields.email.trim(),
    source: "/fix-pack/next-steps",
    Request: FIX_PACK_INTAKE_NOTE,
  };
}

export function fixPackIntakeEncoded(fields: SnapshotFields) {
  return new URLSearchParams(fixPackIntakePayload(fields)).toString();
}

export async function postFixPackIntake(fields: SnapshotFields, post: SnapshotPost) {
  return postFlowForm(fixPackIntakeEncoded(fields), post);
}
