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

/**
 * Blog posts and general guides that should show one in-body snapshot
 * callout. Trade guides already get IndustrySnapshotCta from snapshotOfferForPage.
 */
export const guideSnapshotCalloutPaths = [
  "/blog/what-is-geo",
  "/blog/chatgpt-citation-checklist",
  "/blog/citescore-vs-enterprise-geo-tools",
  "/geo-for-local-businesses",
  "/how-to-check-if-chatgpt-mentions-your-brand",
  "/chatgpt-citation-check",
  "/answer-engine-optimization",
  "/perplexity-citations",
  "/ai-overviews",
  "/google-ai-overviews-optimization",
  "/google-ai-mode-optimization",
  "/geo-vs-seo",
  "/aeo-checklist",
] as const;

const guideSnapshotCalloutPathSet = new Set<string>(guideSnapshotCalloutPaths);

/** ArticleShell ctaIds that are not the path with the leading slash removed. */
const guideSnapshotCalloutCtaAliases: Record<string, string> = {
  "blog-what-is-geo": "/blog/what-is-geo",
  "blog-chatgpt-citation-checklist": "/blog/chatgpt-citation-checklist",
  "blog-citescore-vs-enterprise-geo-tools": "/blog/citescore-vs-enterprise-geo-tools",
  aeo: "/answer-engine-optimization",
};

/**
 * True when this shell should render one general snapshot callout after the intro.
 * A guidePath wins, so a trade guide cannot pick up another page's ctaId.
 */
export function showsGuideSnapshotCallout(input: {
  guidePath?: string;
  ctaId?: string;
}): boolean {
  if (input.guidePath) return guideSnapshotCalloutPathSet.has(input.guidePath);
  if (!input.ctaId) return false;
  const path = guideSnapshotCalloutCtaAliases[input.ctaId] ?? `/${input.ctaId}`;
  return guideSnapshotCalloutPathSet.has(path);
}

/** Guide paths whose inline snapshot callout already prefills ?trade=. */
const homeServiceTradeQuery: Record<string, string> = {
  "/ai-search-visibility-for-plumbers": "plumber",
  "/ai-search-visibility-for-hvac": "hvac",
  "/ai-search-visibility-for-roofers": "roofer",
  "/ai-search-visibility-for-electricians": "electrician",
};

/**
 * Mobile sticky CTA on industry guides only.
 * Home-service guides keep the same ?trade= prefill as the inline callout.
 * Other pages, including the snapshot request and checkout, get nothing.
 */
export function tradeGuideStickySnapshotHref(path: string): string | null {
  if (!industrySnapshotLabel(path)) return null;
  const trade = homeServiceTradeQuery[path];
  return trade ? `/free-snapshot?trade=${trade}` : "/free-snapshot";
}
