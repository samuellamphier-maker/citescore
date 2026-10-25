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
  veterinarians: "veterinarian",
};

/**
 * Industry phrase for a schema generator that is already about one trade.
 * Generic generators are omitted and get the unscoped snapshot CTA.
 */
const schemaIndustries: Record<string, string> = {
  "attorney-schema-generator": "law firm",
  "dentist-schema-generator": "dental",
  "electrician-schema-generator": "electrician",
  "hotel-schema-generator": "hotel",
  "local-business-schema-generator": "local",
  "medical-clinic-schema-generator": "clinic",
  "plumber-schema-generator": "plumber",
  "real-estate-agent-schema-generator": "real estate",
  "restaurant-schema-generator": "restaurant",
};

/** Trade phrase for the industry-page snapshot CTA, or null on other paths. */
export function industrySnapshotLabel(path: string) {
  if (!path.startsWith(PREFIX)) return null;
  const slug = path.slice(PREFIX.length);
  return labels[slug] ?? slug.replaceAll("-", " ");
}

export type SnapshotOffer = {
  /** Present when the page is already about one industry. */
  industry?: string;
};

/**
 * Shared snapshot CTA for industry visibility guides and schema generators.
 * Null means the page is neither, so the shell should not add the offer.
 */
export function snapshotOfferForPage(input: {
  guidePath?: string;
  ctaId?: string;
}): SnapshotOffer | null {
  if (input.guidePath) {
    const industry = industrySnapshotLabel(input.guidePath);
    if (!industry) return null;
    return { industry };
  }
  const ctaId = input.ctaId ?? "";
  if (!ctaId.endsWith("-schema-generator")) return null;
  const industry = schemaIndustries[ctaId];
  return industry ? { industry } : {};
}
