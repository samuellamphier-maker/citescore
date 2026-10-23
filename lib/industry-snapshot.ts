const PREFIX = "/ai-search-visibility-for-";

const labels: Record<string, string> = {
  accountants: "accountant",
  "auto-repair": "auto repair",
  "b2b-saas": "B2B SaaS",
  chiropractors: "chiropractic",
  dentists: "dental",
  ecommerce: "ecommerce",
  electricians: "electrician",
  healthcare: "healthcare",
  hvac: "HVAC",
  "insurance-agents": "insurance",
  landscapers: "landscaping",
  "law-firms": "law firm",
  plumbers: "plumber",
  "real-estate": "real estate",
  restaurants: "restaurant",
  roofers: "roofer",
};

/** Trade phrase for the industry-page snapshot CTA, or null on other paths. */
export function industrySnapshotLabel(path: string) {
  if (!path.startsWith(PREFIX)) return null;
  const slug = path.slice(PREFIX.length);
  return labels[slug] ?? slug.replaceAll("-", " ");
}
