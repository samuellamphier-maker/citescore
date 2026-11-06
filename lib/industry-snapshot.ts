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

/** Schema generators that are already about one local business or trade. */
export function industrySchemaGeneratorPaths() {
  return Object.keys(schemaIndustries).map((id) => `/${id}`);
}

export type InlineSnapshotRequest = {
  /** Posted as a hidden source field so the request shows which page it came from. */
  source: string;
  /** Service field prefill. Citation guides omit it. */
  service?: string;
};

/**
 * Pages that post the same snapshot form, with no service prefill.
 * Trade guides, citation guides, blog posts, and schema generators are
 * matched separately.
 */
export const inlineSnapshotPaths = [
  "/fix-pack",
  "/pricing",
  "/how-it-works",
  "/faq",
  "/sample",
  "/sample-fix-pack",
  "/methodology",
  "/about",
  "/checklist",
  "/for-agencies",
  "/done-for-you-audit",
  "/geo-audit",
  "/free-check",
  "/chatgpt-citation-check",
  "/llms-txt",
  "/geo-for-local-businesses",
  "/how-to-check-if-chatgpt-mentions-your-brand",
  "/answer-engine-optimization",
  "/aeo-checklist",
  "/ai-overviews",
  "/perplexity-citations",
  "/google-ai-mode-optimization",
  "/google-ai-overviews-optimization",
  "/geo-vs-seo",
  "/blog",
  "/guides",
  "/industries",
  "/tools",
] as const;

const inlineSnapshotPathSet = new Set<string>(inlineSnapshotPaths);

/**
 * Inline snapshot form. Trade guides prefill Service. A schema generator
 * prefills Service only when that page is already about one trade.
 * "local" is a category, not a service someone would type.
 */
export function inlineSnapshotRequestForPath(
  path: string | null | undefined,
): InlineSnapshotRequest | null {
  if (!path) return null;
  if (
    path.startsWith(PREFIX) &&
    path.length > PREFIX.length &&
    industrySnapshotLabel(path)
  ) {
    return { source: path, service: industrySnapshotLabel(path) ?? undefined };
  }
  const citationPrefix = "/how-to-get-cited-by-";
  if (path.startsWith(citationPrefix) && path.length > citationPrefix.length) {
    return { source: path };
  }
  if (/^\/blog\/[a-z0-9-]+$/.test(path)) return { source: path };
  if (/^\/[a-z0-9-]+-schema-generator$/.test(path)) {
    const service = schemaIndustries[path.slice(1)];
    if (service && service !== "local") return { source: path, service };
    return { source: path };
  }
  if (inlineSnapshotPathSet.has(path)) return { source: path };
  return null;
}

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
 * Free-snapshot URL for an industry visibility guide.
 * Home-service guides keep the same ?trade= prefill as the inline callout.
 * Other paths return null. The wider sticky decision lives in sticky-snapshot.
 */
export function tradeGuideStickySnapshotHref(path: string): string | null {
  if (!industrySnapshotLabel(path)) return null;
  const trade = homeServiceTradeQuery[path];
  return trade ? `/free-snapshot?trade=${trade}` : "/free-snapshot";
}

/**
 * The home page and /free-snapshot already lead with the request form, so a
 * second bar would repeat it. Checkout, confirmation, legal, and utility
 * pages stay quiet.
 */
const stickyExcludedPaths = new Set([
  "/",
  "/free-snapshot",
  "/free-snapshot/thanks",
  "/thank-you",
  "/fix-pack/next-steps",
  "/checkout",
  "/privacy",
  "/terms",
  "/refunds",
  "/thanks",
  "/contact",
  "/llms.txt",
]);

/**
 * Product, hub, alternatives, and explainer pages that are not already
 * covered by the guide and generator patterns below.
 */
export const highIntentStickyPaths = [
  "/pricing",
  "/fix-pack",
  "/sample",
  "/sample-snapshot",
  "/sample-fix-pack",
  "/how-it-works",
  "/methodology",
  "/faq",
  "/about",
  "/for-agencies",
  "/vs-agency",
  "/done-for-you-audit",
  "/geo-audit",
  "/checklist",
  "/free-check",
  "/blog",
  "/guides",
  "/industries",
  "/tools",
  "/alternatives",
  "/alternatives/otterly",
  "/alternatives/profound",
  "/alternatives/peec-ai",
  "/robots-txt-for-ai-crawlers",
  "/schema-markup-for-ai-search",
  "/llms-txt-examples",
  "/geo-vs-seo",
  "/google-ai-overviews-optimization",
  "/ai-search-readiness-checklist-for-saas",
  "/ai-crawler-robots-txt-checker",
  "/aeo-checklist",
  "/chatgpt-citation-check",
  "/ai-overviews",
  "/perplexity-citations",
  "/llms-txt",
  "/ai-crawlers",
  "/ai-crawler-user-agents",
  "/answer-engine-optimization",
  "/how-to-check-if-chatgpt-mentions-your-brand",
  "/google-ai-mode-optimization",
  "/geo-for-local-businesses",
  "/llms-txt-best-practices",
] as const;

const highIntentStickyPathSet = new Set<string>(highIntentStickyPaths);

/**
 * True when this newly included page already renders the snapshot form.
 * The bar then scrolls to #snapshot instead of leaving the page.
 * /sample-snapshot renders SnapshotRequestForm directly.
 */
function stickySnapshotUsesOnPageForm(path: string): boolean {
  if (!highIntentStickyPathSet.has(path)) return false;
  if (path === "/sample-snapshot") return true;
  return inlineSnapshotRequestForPath(path) !== null;
}

/**
 * Path the shell would be showing. guidePath wins so a trade guide cannot
 * pick up another page's ctaId. Blog posts pass ctaId `blog-${slug}`.
 */
export function stickySnapshotContentPath(input: {
  guidePath?: string;
  ctaId?: string;
}): string | null {
  if (input.guidePath) return input.guidePath;
  const ctaId = input.ctaId;
  if (!ctaId) return null;
  if (ctaId.startsWith("blog-")) return `/blog/${ctaId.slice("blog-".length)}`;
  return `/${ctaId}`;
}

/**
 * Long SEO pages and the generator tools, where the offer otherwise sits
 * inline and can scroll off a phone screen. Other shells stay quiet.
 */
export function isStickySnapshotContentPath(path: string): boolean {
  if (stickyExcludedPaths.has(path)) return false;
  if (highIntentStickyPathSet.has(path)) return true;
  if (
    path.startsWith("/ai-search-visibility-for-") &&
    path.length > "/ai-search-visibility-for-".length
  ) {
    return true;
  }
  if (
    path.startsWith("/how-to-get-cited-by-") &&
    path.length > "/how-to-get-cited-by-".length
  ) {
    return true;
  }
  if (path.startsWith("/blog/") && path.length > "/blog/".length) return true;
  if (path.endsWith("-schema-generator")) return true;
  if (path === "/llms-txt-generator" || path === "/robots-txt-ai-crawler-generator") {
    return true;
  }
  return false;
}

/**
 * Primary sticky URL. Industry guides keep the ?trade= prefill. A high-intent
 * page that already shows the request form scrolls to that form. Every other
 * content or tool page goes to the plain free snapshot.
 */
export function contentStickySnapshotHref(input: {
  guidePath?: string;
  ctaId?: string;
}): string | null {
  const path = shellContentPath(input);
  if (!path || !isStickySnapshotContentPath(path)) return null;
  if (input.guidePath) {
    const trade = tradeGuideStickySnapshotHref(input.guidePath);
    if (trade) return trade;
  }
  if (stickySnapshotUsesOnPageForm(path)) return "#snapshot";
  return "/free-snapshot";
}

/**
 * Path an ArticleShell is showing. guidePath wins, so a trade guide cannot
 * pick up another page's ctaId. Known aliases such as "aeo" resolve before
 * the blog- prefix rule.
 */
export function shellContentPath(input: {
  guidePath?: string;
  ctaId?: string;
}): string | null {
  if (input.guidePath) return input.guidePath;
  const ctaId = input.ctaId;
  if (!ctaId) return null;
  return guideSnapshotCalloutCtaAliases[ctaId] ?? stickySnapshotContentPath({ ctaId });
}
