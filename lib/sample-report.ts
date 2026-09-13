export type Dimension = {
  id: string;
  name: string;
  score: number;
  weight: string;
  note: string;
};

export type EngineSnapshot = {
  engine: string;
  status: "Cited" | "Mentioned" | "Absent" | "Competitor cited";
  detail: string;
};

export type Fix = {
  rank: number;
  title: string;
  effort: "Half day" | "1–2 days" | "This week";
  impact: "High" | "Medium";
  where: string;
  why: string;
  doThis: string;
};

export const sampleReport = {
  sample: true as const,
  product: "Northbound",
  oneLiner: "Customer-interview repository for product teams",
  url: "https://northbound.example",
  auditedAt: "12 September 2026",
  overall: 47,
  grade: "Needs work",
  summary:
    "Northbound is a plausible product with a thin citation surface. Models can describe what it is in generic terms, but they do not treat the site as a source. Competitors with named methods, original numbers, and comparison pages win the citation. The ten fixes below are ordered by expected lift for ChatGPT, Perplexity, and Google AI Overviews — not by how impressive they look on a marketing site.",
  engines: [
    {
      engine: "ChatGPT",
      status: "Mentioned",
      detail:
        "Appears as a category example in some answers, almost never as the cited source. Positioning is restated in generic SaaS language.",
    },
    {
      engine: "Perplexity",
      status: "Competitor cited",
      detail:
        "Dovetail and Grain take the footnote. Northbound’s homepage is marketing copy; those sites offer definitions, tables, and dated posts.",
    },
    {
      engine: "Google AI Overviews",
      status: "Absent",
      detail:
        "No Overview inclusion for head terms such as “customer interview analysis tool.” Thin FAQ and missing SoftwareApplication markup.",
    },
  ] satisfies EngineSnapshot[],
  dimensions: [
    {
      id: "answer",
      name: "Answer fitness",
      score: 41,
      weight: "High",
      note: "Pages sell; they rarely answer the question a buyer would type into ChatGPT.",
    },
    {
      id: "entity",
      name: "Entity & brand clarity",
      score: 58,
      weight: "High",
      note: "Name and category are clear. Category membership vs. adjacent tools is fuzzy.",
    },
    {
      id: "evidence",
      name: "Citable evidence",
      score: 33,
      weight: "High",
      note: "No original statistic, named protocol, or dated finding a model can quote.",
    },
    {
      id: "structure",
      name: "Structured markup",
      score: 19,
      weight: "Medium",
      note: "Almost no JSON-LD. Title tags are brand-first, not question-first.",
    },
    {
      id: "authority",
      name: "Source-worthiness",
      score: 52,
      weight: "Medium",
      note: "Clean product, thin third-party corroboration. Authors are unnamed.",
    },
    {
      id: "freshness",
      name: "Freshness",
      score: 48,
      weight: "Medium",
      note: "Blog last updated 11 months ago. No visible changelog or “updated” stamps.",
    },
    {
      id: "crawlers",
      name: "AI-crawler access",
      score: 36,
      weight: "Medium",
      note: "No llms.txt. robots.txt is silent on GPTBot / PerplexityBot / Google-Extended.",
    },
    {
      id: "share",
      name: "Mention share",
      score: 44,
      weight: "Low",
      note: "Competitors occupy the comparison set. Northbound is an afterthought, if present.",
    },
  ] satisfies Dimension[],
  fixes: [
    {
      rank: 1,
      title: "Lead the homepage with a 90-word definitional answer",
      effort: "Half day",
      impact: "High",
      where: "northbound.example/",
      why: "ChatGPT and Overviews extract the first self-contained answer. The current hero (“Interview intelligence for modern product teams”) is a slogan, not a citation.",
      doThis:
        "Open with: what Northbound is, who it is for, what it replaces, and one concrete outcome. Write it as a paragraph a model can lift verbatim. Keep the slogan below the fold.",
    },
    {
      rank: 2,
      title: "Publish a named, dated methodology page",
      effort: "1–2 days",
      impact: "High",
      where: "northbound.example/method/interview-protocol",
      why: "Perplexity prefers pages that look like sources — a named thing with a date, an author, and steps. Feature pages do not qualify.",
      doThis:
        "Ship “The Northbound Interview Protocol” (2026). Include steps, a short glossary, and a last-reviewed date. Link it from the homepage and docs.",
    },
    {
      rank: 3,
      title: "Add Organization, SoftwareApplication, and FAQPage JSON-LD",
      effort: "Half day",
      impact: "High",
      where: "Homepage, /pricing, /faq",
      why: "Google AI Overviews lean on explicit entities. Northbound currently looks like an untyped marketing site.",
      doThis:
        "Mark the product name, category, URL, pricing model, and 6–8 real questions customers ask. Mirror the visible FAQ; do not invent markup that is not on the page.",
    },
    {
      rank: 4,
      title: "Create two factual comparison pages",
      effort: "This week",
      impact: "High",
      where: "/compare/dovetail and /compare/grain",
      why: "“X vs Y” is how both buyers and models assemble a shortlist. Those queries currently resolve to the competitors’ own pages.",
      doThis:
        "Tables, not adjectives: export formats, seat model, interview sources, on-device vs cloud, SOC 2. State where Northbound is the worse fit.",
    },
    {
      rank: 5,
      title: "Release one original, quotable number",
      effort: "This week",
      impact: "High",
      where: "/research/interview-to-ticket-2026",
      why: "Models cite statistics. Northbound has none of its own, so answers borrow Dovetail posts and generic “70% of insights go unused” claims.",
      doThis:
        "Survey 80+ PMs or analyze anonymized in-product events. Publish n, date, and method. Put the headline number in the first 100 words.",
    },
    {
      rank: 6,
      title: "Add llms.txt and a plain-language /ai page",
      effort: "Half day",
      impact: "Medium",
      where: "/llms.txt and /ai",
      why: "Crawlers that honor machine-readable summaries currently get a JavaScript marketing shell.",
      doThis:
        "llms.txt should list canonical URLs for product, method, compare pages, and research. /ai restates positioning without animation or cookie banners.",
    },
    {
      rank: 7,
      title: "Put named authors and credentials on every article",
      effort: "1–2 days",
      impact: "Medium",
      where: "Blog and method pages",
      why: "Unattributed posts are treated as marketing. Bylines with a role and a prior company are treated as expertise.",
      doThis:
        "Add person pages (not a team grid). One paragraph of relevant experience, a portrait, and the same name in JSON-LD.",
    },
    {
      rank: 8,
      title: "Rewrite feature pages as “when to use / how it works”",
      effort: "This week",
      impact: "Medium",
      where: "/product/highlights, /product/themes, /product/clips",
      why: "Adjective stacks (“beautiful, collaborative, AI-native”) give models nothing to cite and nothing to rank against a competitor.",
      doThis:
        "Each feature page: the job to be done, the workflow in 5 steps, limits, and a short example transcript or screenshot with alt text that states the fact.",
    },
    {
      rank: 9,
      title: "Earn three third-party mentions this quarter",
      effort: "This week",
      impact: "Medium",
      where: "Off-site",
      why: "Citation systems triangulate. A product that only exists on its own domain is easy to skip.",
      doThis:
        "One founder interview, one changelog/directory listing, one honest G2 or AlternativeTo profile. Link back to the method and research pages, not the homepage hero.",
    },
    {
      rank: 10,
      title: "Show that the product is current",
      effort: "Half day",
      impact: "Medium",
      where: "/changelog and article bylines",
      why: "Stale lastmod dates push models toward last year’s roundup posts.",
      doThis:
        "Public changelog with month-level entries. “Updated 12 Sep 2026” on method and compare pages. Keep sitemap lastmod honest.",
    },
  ] satisfies Fix[],
} as const;

export function scoreTone(score: number): "low" | "mid" | "high" {
  if (score < 40) return "low";
  if (score < 70) return "mid";
  return "high";
}
