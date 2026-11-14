import {
  freeSnapshotHrefForIndustry,
  industrySchemaGeneratorPaths,
  industrySnapshotLabel,
  schemaIndustries,
} from "@/lib/industry-snapshot";
import { topicPages, type TopicPage } from "@/lib/content/topics";

export type IndustryGroup = {
  id: string;
  title: string;
  intro: string;
  pages: TopicPage[];
};

/**
 * Every industry or local-business page already published: the visibility
 * guides, the local-business guide, and the schema generators that
 * industry-snapshot.ts already treats as one trade. Group titles follow the
 * LocalBusiness type groups in lib/generators.ts where those labels fit.
 */
const groupDefs = [
  {
    id: "local-business",
    title: "Local business",
    intro:
      "The local-business guide and the LocalBusiness schema generator already on this site.",
    paths: ["/geo-for-local-businesses", "/local-business-schema-generator"],
  },
  {
    id: "home-and-repair",
    title: "Home and repair",
    intro:
      "Plumber, electrician, HVAC, roofer, and landscaper pages already on this site.",
    paths: [
      "/ai-search-visibility-for-plumbers",
      "/plumber-schema-generator",
      "/ai-search-visibility-for-electricians",
      "/electrician-schema-generator",
      "/ai-search-visibility-for-hvac",
      "/ai-search-visibility-for-roofers",
      "/ai-search-visibility-for-landscapers",
    ],
  },
  {
    id: "health",
    title: "Health",
    intro:
      "Healthcare, clinic, dentist, chiropractor, and veterinarian pages already on this site.",
    paths: [
      "/ai-search-visibility-for-healthcare",
      "/medical-clinic-schema-generator",
      "/ai-search-visibility-for-dentists",
      "/dentist-schema-generator",
      "/ai-search-visibility-for-chiropractors",
      "/ai-search-visibility-for-veterinarians",
    ],
  },
  {
    id: "professional-services",
    title: "Professional services",
    intro: "Law firm, accountant, insurance, and real estate pages already on this site.",
    paths: [
      "/ai-search-visibility-for-law-firms",
      "/attorney-schema-generator",
      "/ai-search-visibility-for-accountants",
      "/ai-search-visibility-for-insurance-agents",
      "/ai-search-visibility-for-real-estate",
      "/real-estate-agent-schema-generator",
    ],
  },
  {
    id: "food-and-lodging",
    title: "Food and lodging",
    intro: "Restaurant and hotel pages already on this site.",
    paths: [
      "/ai-search-visibility-for-restaurants",
      "/restaurant-schema-generator",
      "/hotel-schema-generator",
    ],
  },
  {
    id: "retail-software-auto",
    title: "Retail, software, and auto repair",
    intro: "Ecommerce, B2B SaaS, and auto repair pages already on this site.",
    paths: [
      "/ai-search-visibility-for-ecommerce",
      "/ai-search-visibility-for-b2b-saas",
      "/ai-search-visibility-for-auto-repair",
    ],
  },
] as const;

const byPath = new Map(topicPages.map((page) => [page.path, page]));

function pageFor(path: string) {
  const page = byPath.get(path);
  if (!page) throw new Error(`Industry hub page missing from topics: ${path}`);
  return page;
}

/** Short label already stored on the topic. Falls back to the page title. */
export function industryPageLabel(page: TopicPage) {
  return page.navLabel ?? page.title;
}

export type IndustryHubSnapshotLink = {
  /** Same free-snapshot href that page's snapshot CTA already uses. */
  href: string;
  /** Industry phrase already passed to that page's snapshot CTA. */
  trade: string;
};

/**
 * Prefill link for one industries-hub row.
 * A visibility guide uses industrySnapshotLabel, the same phrase
 * IndustryArticleSnapshot and ArticleShell pass to freeSnapshotHrefForIndustry.
 * A schema generator uses schemaIndustries, the phrase ArticleShell uses there.
 * "local" and other phrases with no query stay off the row. The hub already
 * has the unscoped /free-snapshot button.
 */
export function industryHubSnapshotLink(path: string): IndustryHubSnapshotLink | null {
  const fromGuide = industrySnapshotLabel(path);
  const fromSchema = schemaIndustries[path.replace(/^\//, "")];
  const trade = fromGuide ?? fromSchema;
  if (!trade) return null;
  const href = freeSnapshotHrefForIndustry(trade);
  if (href === "/free-snapshot") return null;
  return { href, trade };
}

export function industryGroups(): IndustryGroup[] {
  return groupDefs.map((group) => ({
    id: group.id,
    title: group.title,
    intro: group.intro,
    pages: group.paths.map((path) => pageFor(path)),
  }));
}

/**
 * Paths the hub must list: every industry visibility guide, the local
 * business guide, and every trade schema generator.
 */
export function expectedIndustryHubPaths() {
  const guides = topicPages
    .filter(
      (page) =>
        page.path.startsWith("/ai-search-visibility-for-") ||
        page.path === "/geo-for-local-businesses",
    )
    .map((page) => page.path);
  return [...guides, ...industrySchemaGeneratorPaths()];
}
