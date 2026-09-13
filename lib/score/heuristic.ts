import type { CrawlResult, PageExtract } from "@/lib/crawl/types";
import type { AuditReport, Dimension, EngineSnapshot, Fix } from "@/lib/sample-report";
import { gradeFromScore } from "@/lib/sample-report";

function clamp(n: number) {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function homepage(crawl: CrawlResult): PageExtract | null {
  return crawl.pages[0] ?? null;
}

function allText(crawl: CrawlResult) {
  return crawl.pages
    .map((page) => `${page.title} ${page.description} ${page.headings.join(" ")} ${page.textSample}`)
    .join("\n");
}

function hasQuestionHeadings(page: PageExtract | null) {
  if (!page) return false;
  return page.headings.some((heading) => /[?]|(what|how|why|when|who)\b/i.test(heading));
}

function definitionalLead(page: PageExtract | null) {
  if (!page) return false;
  const lead = `${page.h1.join(" ")} ${page.description} ${page.textSample.slice(0, 400)}`;
  return /(is a|is the|helps|platform|tool for|software that)/i.test(lead) && lead.length > 80;
}

function looksLikeSlogan(page: PageExtract | null) {
  if (!page) return true;
  const hero = page.h1[0] || page.ogTitle || page.title;
  return Boolean(hero) && hero.split(/\s+/).length <= 8 && !/[.]/.test(hero);
}

export function inferProductName(crawl: CrawlResult) {
  const page = homepage(crawl);
  if (!page) {
    try {
      return new URL(crawl.homepageUrl).hostname.replace(/^www\./, "");
    } catch {
      return "This site";
    }
  }
  const host = (() => {
    try {
      return new URL(page.url).hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  })();
  const title = page.title.split(/[|–—:-]/)[0]?.trim() || "";
  if (title && title.length < 48) return title;
  if (page.h1[0] && page.h1[0].length < 48) return page.h1[0];
  return host || "This site";
}

function dimension(
  id: string,
  name: string,
  score: number,
  weight: Dimension["weight"],
  note: string,
): Dimension {
  return { id, name, score: clamp(score), weight, note };
}

export function heuristicDimensions(crawl: CrawlResult): Dimension[] {
  const home = homepage(crawl);
  const text = allText(crawl);
  const schema = new Set(crawl.pages.flatMap((page) => page.schemaTypes));
  const faqCount = crawl.pages.reduce((sum, page) => sum + page.faq.length, 0);
  const hasCompare = crawl.pages.some((page) => /compare|vs\.|versus/i.test(`${page.url} ${page.title}`));
  const hasAuthors = /\b(author|written by|byline|about the author)\b/i.test(text);
  const hasEvidence =
    crawl.pages.some((page) => page.numberHints.length >= 3) ||
    /\b(study|survey|protocol|n\s*=|research|benchmark)\b/i.test(text);

  const answer = clamp(
    (definitionalLead(home) ? 28 : 8) +
      (hasQuestionHeadings(home) ? 18 : 4) +
      (faqCount > 0 ? 22 : 0) +
      (home && home.wordCount > 400 ? 16 : 6) +
      (looksLikeSlogan(home) ? -8 : 8),
  );

  const entity = clamp(
    (home?.title ? 20 : 4) +
      (home?.description ? 16 : 4) +
      (schema.has("Organization") || schema.has("SoftwareApplication") ? 28 : 6) +
      (home?.ogTitle ? 10 : 0) +
      (home && home.h1.length > 0 ? 14 : 4),
  );

  const evidence = clamp(
    (hasEvidence ? 34 : 8) +
      Math.min(24, crawl.pages.reduce((n, p) => n + p.numberHints.length, 0) * 3) +
      (/\b(20\d{2})\b/.test(text) ? 12 : 0) +
      (hasCompare ? 16 : 0),
  );

  const structure = clamp(
    Math.min(40, schema.size * 10) +
      (schema.has("FAQPage") || schema.has("Question") ? 18 : 0) +
      (schema.has("SoftwareApplication") ? 14 : 0) +
      (home?.canonical ? 10 : 0) +
      (faqCount > 2 ? 12 : 0),
  );

  const authority = clamp(
    (hasAuthors ? 28 : 8) +
      (crawl.pages.some((p) => /about/.test(p.url)) ? 16 : 4) +
      (schema.has("Person") || schema.has("Organization") ? 18 : 6) +
      (home && home.wordCount > 700 ? 12 : 4) +
      (crawl.pages.length > 2 ? 10 : 2),
  );

  const freshness = clamp(
    (crawl.pages.some((p) => p.dateHints.length > 0) ? 28 : 8) +
      (crawl.pages.some((p) => /changelog|blog|news/.test(p.url)) ? 18 : 4) +
      (/\b202[5-9]\b/.test(text) ? 22 : 6) +
      (crawl.sitemap.found ? 12 : 2),
  );

  let crawlerScore = 40;
  if (crawl.llmsTxt.found) crawlerScore += 28;
  if (crawl.robots.gptBot === "allow") crawlerScore += 12;
  if (crawl.robots.perplexityBot === "allow") crawlerScore += 8;
  if (crawl.robots.googleExtended === "allow") crawlerScore += 8;
  if (crawl.robots.gptBot === "disallow") crawlerScore -= 18;
  if (crawl.robots.perplexityBot === "disallow") crawlerScore -= 12;
  if (crawl.robots.googleExtended === "disallow") crawlerScore -= 12;
  if (!crawl.robots.fetched) crawlerScore -= 6;

  const share = clamp(
    (hasCompare ? 36 : 10) +
      (/\b(alternative|competitor|vs)\b/i.test(text) ? 18 : 4) +
      (crawl.pages.length > 3 ? 12 : 4) +
      (hasEvidence ? 10 : 0),
  );

  return [
    dimension(
      "answer",
      "Answer fitness",
      answer,
      "High",
      definitionalLead(home)
        ? "There is some definitional language a model could lift, but question-shaped pages still look thin."
        : "Pages sell more than they answer. Models prefer a self-contained definition in the first screen.",
    ),
    dimension(
      "entity",
      "Entity & brand clarity",
      entity,
      "High",
      schema.has("Organization") || schema.has("SoftwareApplication")
        ? "Name and markup give the product a chance to be treated as a known entity."
        : "The name is visible, but structured entity markup is weak or missing.",
    ),
    dimension(
      "evidence",
      "Citable evidence",
      evidence,
      "High",
      hasEvidence
        ? "Some numbers or research language exist. A named, dated finding would still help."
        : "Little original, quotable evidence. Models will borrow a competitor’s statistic instead.",
    ),
    dimension(
      "structure",
      "Structured markup",
      structure,
      "Medium",
      schema.size
        ? `Found JSON-LD types: ${[...schema].slice(0, 6).join(", ")}.`
        : "Almost no JSON-LD. Title tags and FAQPage markup would make extraction safer.",
    ),
    dimension(
      "authority",
      "Source-worthiness",
      authority,
      "Medium",
      hasAuthors
        ? "Some attribution exists. Person-level credentials still improve citation confidence."
        : "Authors are unnamed or thin. Unattributed marketing pages are easy to skip.",
    ),
    dimension(
      "freshness",
      "Freshness",
      freshness,
      "Medium",
      crawl.pages.some((p) => p.dateHints.length)
        ? "Dates appear on the site. Keep last-reviewed stamps honest and visible."
        : "Few visible dates or changelog signals. Stale pages lose to last year’s roundup posts.",
    ),
    dimension(
      "crawlers",
      "AI-crawler access",
      crawlerScore,
      "Medium",
      crawl.llmsTxt.found
        ? "llms.txt is present. Confirm GPTBot / PerplexityBot / Google-Extended are not blocked."
        : "No llms.txt. robots.txt is silent or mixed on GPTBot / PerplexityBot / Google-Extended.",
    ),
    dimension(
      "share",
      "Mention share",
      share,
      "Low",
      hasCompare
        ? "Comparison language exists on-site. Off-site mentions were not measured."
        : "No on-site comparison surface. Off-site mention share was not crawled.",
    ),
  ];
}

const WEIGHTS: Record<string, number> = {
  High: 3,
  Medium: 2,
  Low: 1,
};

export function weightedOverall(dimensions: Dimension[]) {
  let total = 0;
  let weight = 0;
  for (const dimension of dimensions) {
    const w = WEIGHTS[dimension.weight] ?? 1;
    total += dimension.score * w;
    weight += w;
  }
  return clamp(weight ? total / weight : 0);
}

export function engineSnapshots(crawl: CrawlResult, dimensions: Dimension[]): EngineSnapshot[] {
  const byId = Object.fromEntries(dimensions.map((d) => [d.id, d.score]));
  const answer = byId.answer ?? 40;
  const evidence = byId.evidence ?? 40;
  const structure = byId.structure ?? 40;
  const crawlers = byId.crawlers ?? 40;
  const share = byId.share ?? 40;

  const chatgpt =
    crawlers < 30 ? "Absent" : answer >= 62 && evidence >= 50 ? "Mentioned" : "Absent";
  const perplexity =
    evidence >= 60 && structure >= 50 ? "Mentioned" : share < 35 ? "Competitor cited" : "Absent";
  const overviews =
    structure >= 58 && answer >= 55 ? "Mentioned" : "Absent";

  return [
    {
      engine: "ChatGPT",
      status: chatgpt,
      detail:
        chatgpt === "Mentioned"
          ? "On-page definition and evidence are strong enough that a model *could* mention this product. This is not a live ChatGPT query."
          : "Signals suggest the site is easy to describe generically and hard to cite. We did not open ChatGPT.",
    },
    {
      engine: "Perplexity",
      status: perplexity,
      detail:
        perplexity === "Mentioned"
          ? "Named facts and structure resemble pages Perplexity likes to footnote. Inferred from HTML, not a live Perplexity run."
          : "Thin evidence and few source-like pages. Competitors with tables and dated posts usually win these footnotes.",
    },
    {
      engine: "Google AI Overviews",
      status: overviews,
      detail:
        overviews === "Mentioned"
          ? "FAQ / entity markup and answer-shaped copy improve Overview eligibility. Not a live Search scrape."
          : "Weak FAQ and entity markup. Overviews typically skip untyped marketing homepages.",
    },
  ];
}

export function heuristicFixes(crawl: CrawlResult, product: string): Fix[] {
  const home = homepage(crawl);
  const host = (() => {
    try {
      return new URL(crawl.finalHomepageUrl || crawl.homepageUrl).host;
    } catch {
      return product;
    }
  })();
  const schema = new Set(crawl.pages.flatMap((p) => p.schemaTypes));
  const ideas: Fix[] = [];

  const push = (fix: Omit<Fix, "rank">) => {
    if (ideas.length >= 10) return;
    ideas.push({ ...fix, rank: ideas.length + 1 });
  };

  if (!definitionalLead(home) || looksLikeSlogan(home)) {
    push({
      title: `Lead the homepage with a 90-word definition of ${product}`,
      effort: "Half day",
      impact: "High",
      where: crawl.finalHomepageUrl || host,
      why: "Answer engines extract the first self-contained description. A slogan is not a citation.",
      doThis: `Open with what ${product} is, who it is for, what it replaces, and one concrete outcome. Write a paragraph a model can lift verbatim. Keep the slogan below that paragraph.`,
    });
  }

  if (!schema.has("FAQPage") || crawl.pages.every((p) => p.faq.length < 3)) {
    push({
      title: "Publish a visible FAQ and matching FAQPage JSON-LD",
      effort: "Half day",
      impact: "High",
      where: `${host}/faq`,
      why: "Google AI Overviews and other extractors lean on explicit Q&A. Marketing copy does not parse as questions.",
      doThis:
        "Write 6–8 questions customers actually ask. Show them on the page. Mirror the same questions in FAQPage markup. Do not invent schema that is not visible.",
    });
  }

  if (!schema.has("Organization") && !schema.has("SoftwareApplication")) {
    push({
      title: "Add Organization and SoftwareApplication JSON-LD",
      effort: "Half day",
      impact: "High",
      where: crawl.finalHomepageUrl || host,
      why: "Without typed entities, the site looks like an untyped brochure.",
      doThis: `Mark the product name (${product}), category, URL, and pricing model. Keep it consistent with visible copy.`,
    });
  }

  if (!crawl.llmsTxt.found) {
    push({
      title: "Add llms.txt and a plain-language /ai page",
      effort: "Half day",
      impact: "Medium",
      where: `${host}/llms.txt and ${host}/ai`,
      why: "Crawlers that honor machine-readable summaries currently get a marketing shell.",
      doThis:
        "llms.txt should list canonical URLs for product, method, compare, and research pages. /ai restates positioning without animation or cookie banners.",
    });
  }

  if (crawl.robots.gptBot === "disallow" || crawl.robots.perplexityBot === "disallow") {
    push({
      title: "Stop blocking the AI crawlers you want citations from",
      effort: "Half day",
      impact: "High",
      where: `${host}/robots.txt`,
      why: "A CiteScore cannot invent access. Disallowing GPTBot or PerplexityBot is an explicit opt-out of those engines.",
      doThis:
        "Allow GPTBot, PerplexityBot, ClaudeBot, and Google-Extended on public marketing and docs. Keep private app routes disallowed.",
    });
  }

  if (!crawl.pages.some((p) => /compare|vs/.test(p.url))) {
    push({
      title: "Create two factual comparison pages",
      effort: "This week",
      impact: "High",
      where: `${host}/compare/…`,
      why: "“X vs Y” is how buyers and models assemble a shortlist. Those queries currently resolve elsewhere.",
      doThis:
        "Tables, not adjectives: pricing model, limits, integrations, and where you are the worse fit. Link them from the homepage.",
    });
  }

  if (crawl.pages.every((p) => p.numberHints.length < 3)) {
    push({
      title: "Release one original, quotable number",
      effort: "This week",
      impact: "High",
      where: `${host}/research`,
      why: "Models cite statistics. If you have none, answers borrow someone else’s.",
      doThis:
        "Publish n, date, and method with the headline number in the first 100 words. Even a small first-party survey beats generic industry claims.",
    });
  }

  if (!/\b(author|written by|about the author)\b/i.test(allText(crawl))) {
    push({
      title: "Put named authors and credentials on articles",
      effort: "1–2 days",
      impact: "Medium",
      where: "Blog, docs, and method pages",
      why: "Unattributed posts are treated as marketing. Bylines with a role are treated as expertise.",
      doThis:
        "Add person pages, not a team grid. One paragraph of relevant experience and the same name in JSON-LD.",
    });
  }

  if (!crawl.pages.some((p) => p.dateHints.length > 0)) {
    push({
      title: "Show that the product is current",
      effort: "Half day",
      impact: "Medium",
      where: `${host}/changelog`,
      why: "Missing dates push models toward last year’s roundup posts.",
      doThis:
        "Public changelog with month-level entries. “Updated {month year}” on method and compare pages. Keep sitemap lastmod honest.",
    });
  }

  push({
    title: "Publish a named, dated methodology or “how it works” page",
    effort: "1–2 days",
    impact: "High",
    where: `${host}/method`,
    why: "Perplexity prefers pages that look like sources — a named thing with a date, an author, and steps.",
    doThis: `Ship a named protocol for ${product}. Include steps, a short glossary, and a last-reviewed date. Link it from the homepage.`,
  });

  push({
    title: "Rewrite feature pages as when-to-use / how-it-works",
    effort: "This week",
    impact: "Medium",
    where: `${host}/product or feature URLs`,
    why: "Adjective stacks give models nothing to cite and nothing to rank against a competitor.",
    doThis:
      "Each feature page: the job to be done, the workflow in 5 steps, limits, and one concrete example.",
  });

  push({
    title: "Earn three third-party mentions this quarter",
    effort: "This week",
    impact: "Medium",
    where: "Off-site",
    why: "Citation systems triangulate. A product that only exists on its own domain is easy to skip. We did not scrape the open web for mentions.",
    doThis:
      "One founder interview, one directory listing, one honest review profile. Link back to method and research pages, not only the homepage hero.",
  });

  return ideas.slice(0, 10).map((fix, index) => ({ ...fix, rank: index + 1 }));
}

export function heuristicReport(crawl: CrawlResult): AuditReport {
  const product = inferProductName(crawl);
  const dimensions = heuristicDimensions(crawl);
  const overall = weightedOverall(dimensions);
  const home = homepage(crawl);
  const oneLiner =
    home?.description ||
    home?.ogTitle ||
    `${product} — public site reviewed for AI-search citability`;

  return {
    product,
    oneLiner: oneLiner.slice(0, 160),
    url: crawl.finalHomepageUrl || crawl.homepageUrl,
    auditedAt: new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    overall,
    grade: gradeFromScore(overall),
    summary: `${product} was scored from publicly fetchable HTML (${crawl.pages.length} page${
      crawl.pages.length === 1 ? "" : "s"
    }), robots.txt, and llms.txt — not from a live ChatGPT, Perplexity, or AI Overviews query. ${
      crawl.warnings[0] ?? "The ten fixes below are ordered by expected citation lift."
    }`,
    methodology:
      "CiteScore does not query ChatGPT, Perplexity, or Google AI Overviews live. Engine snapshots estimate citation likelihood from on-page GEO signals (definitions, entities, evidence, schema, freshness, crawler access) plus, when configured, a language-model review of the public HTML we fetched. Treat them as a diagnostic, not a screenshot of an AI product’s UI.",
    engines: engineSnapshots(crawl, dimensions),
    dimensions,
    fixes: heuristicFixes(crawl, product),
  };
}
