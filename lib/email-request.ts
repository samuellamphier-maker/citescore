export const SNAPSHOT_SUBJECT = "Free AI Answer Snapshot";
export const FIX_PACK_SUBJECT = "Fix Pack request";

export function noMailAppInstruction(inbox: string) {
  return `No mail app opened? Copy this and email it to ${inbox} from any inbox.`;
}

export function snapshotRequestBody(input: {
  business: string;
  city: string;
  service: string;
  email: string;
}) {
  return [
    `Business name: ${input.business}`,
    `City: ${input.city}`,
    `Service: ${input.service}`,
    `Email: ${input.email}`,
    "",
    "Please send a free AI Answer Snapshot.",
  ].join("\n");
}

export function mailtoHref(inbox: string, subject: string, body?: string) {
  const query = [`subject=${encodeURIComponent(subject)}`];
  if (body) query.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${inbox}?${query.join("&")}`;
}

export function snapshotMailto(inbox: string, body: string) {
  return mailtoHref(inbox, SNAPSHOT_SUBJECT, body);
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
    email: string;
  },
) {
  return requestClipboard(inbox, SNAPSHOT_SUBJECT, snapshotRequestBody(input));
}

/** Blank snapshot request. Service is filled when the page is already about one trade. */
export function snapshotTemplateRequestText(inbox: string, service = "") {
  return snapshotRequestClipboard(inbox, {
    business: "",
    city: "",
    service,
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
