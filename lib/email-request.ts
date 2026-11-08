export const SNAPSHOT_SUBJECT = "Free AI Answer Snapshot";
export const FIX_PACK_SUBJECT = "Fix Pack request";
export const FIX_PACK_DETAILS_SUBJECT = "Fix Pack intake after payment";

/** Body line that keeps a paid Fix Pack intake out of the free-snapshot queue. */
export const FIX_PACK_INTAKE_NOTE =
  "This is Fix Pack intake after payment. It is not a new free AI Answer Snapshot request.";

export type FixPackDetailsInput = {
  business?: string;
  city?: string;
  service?: string;
  website?: string;
  email?: string;
};

export function noMailAppInstruction(inbox: string) {
  return `No mail app opened? Copy this and email it to ${inbox} from any inbox.`;
}

export function snapshotRequestBody(input: {
  business: string;
  city: string;
  service: string;
  website: string;
  email: string;
  source?: string;
}) {
  const lines = [
    `Business name: ${input.business}`,
    `City: ${input.city}`,
    `Service: ${input.service}`,
    `Website: ${input.website}`,
    `Email: ${input.email}`,
  ];
  const source = input.source?.trim();
  if (source) lines.push(`Source: ${source}`);
  lines.push("", "Please send a free AI Answer Snapshot.");
  return lines.join("\n");
}

export function mailtoHref(inbox: string, subject: string, body?: string) {
  const query = [`subject=${encodeURIComponent(subject)}`];
  if (body) query.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${inbox}?${query.join("&")}`;
}

/**
 * Default subject unless an allowlisted trade label is passed.
 * An empty label keeps the subject identical to a request with no ?trade=.
 */
export function snapshotSubjectForTrade(service?: string | null) {
  const label = service?.trim();
  if (!label) return SNAPSHOT_SUBJECT;
  return `${SNAPSHOT_SUBJECT} - ${label}`;
}

export function snapshotMailto(inbox: string, body: string, subject = SNAPSHOT_SUBJECT) {
  return mailtoHref(inbox, subject, body);
}

/** Plain-text message a visitor can paste into any inbox. */
export function requestClipboard(inbox: string, subject: string, body: string) {
  return [`To: ${inbox}`, `Subject: ${subject}`, "", body].join("\n");
}

export function snapshotRequestClipboard(
  inbox: string,
  input: {
    business: string;
    city: string;
    service: string;
    website: string;
    email: string;
    source?: string;
  },
  subject = SNAPSHOT_SUBJECT,
) {
  return requestClipboard(inbox, subject, snapshotRequestBody(input));
}

/** Blank snapshot request. Service is filled when the page is already about one trade. */
export function snapshotTemplateRequestText(inbox: string, service = "") {
  return snapshotRequestClipboard(inbox, {
    business: "",
    city: "",
    service,
    website: "",
    email: "",
  });
}

export function fixPackRequestText(inbox: string) {
  return requestClipboard(
    inbox,
    FIX_PACK_SUBJECT,
    [
      "Please send the AI Visibility Fix Pack.",
      "",
      "Business name:",
      "City:",
      "Service:",
      "Email:",
    ].join("\n"),
  );
}

function detailLine(label: string, value: string | undefined) {
  return `${label}: ${value?.trim() ?? ""}`;
}

/**
 * Intake after a Fix Pack purchase. Blank fields stay in the template so a
 * buyer can still email them. Filled fields match the on-page form.
 */
export function fixPackDetailsBody(input: FixPackDetailsInput = {}) {
  return [
    detailLine("Business name", input.business),
    detailLine("City", input.city),
    detailLine("Main service", input.service),
    detailLine("Public site URL", input.website),
    detailLine("Email", input.email),
    "Source: /fix-pack/next-steps",
    "",
    FIX_PACK_INTAKE_NOTE,
  ].join("\n");
}

export function fixPackDetailsMailto(inbox: string, input?: FixPackDetailsInput) {
  return mailtoHref(inbox, FIX_PACK_DETAILS_SUBJECT, fixPackDetailsBody(input));
}

export function fixPackDetailsRequestText(inbox: string, input?: FixPackDetailsInput) {
  return requestClipboard(inbox, FIX_PACK_DETAILS_SUBJECT, fixPackDetailsBody(input));
}
