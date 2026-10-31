import { contactEmail, productionOrigin } from "@/lib/site";

/** RFC 9116 Expires. One year after 2026-10-31. */
export const securityTxtExpires = "2027-10-31T23:59:59.000Z";

export function citeScoreSecurityTxt() {
  const lines = [
    `Contact: mailto:${contactEmail}`,
    `Expires: ${securityTxtExpires}`,
    "Preferred-Languages: en",
    `Canonical: ${productionOrigin}/.well-known/security.txt`,
  ];
  return `${lines.join("\n")}\n`;
}
