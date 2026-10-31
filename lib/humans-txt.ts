import { contactEmail, site } from "@/lib/site";

/**
 * Public /humans.txt. The team credit is the site byline. The site line is
 * site.description. The contact is lib/site.ts.
 */
export function citeScoreHumansTxt() {
  const lines = [
    "/* TEAM */",
    "CiteScore Team",
    `Contact: ${contactEmail}`,
    "",
    "/* SITE */",
    site.description,
  ];
  return `${lines.join("\n")}\n`;
}
