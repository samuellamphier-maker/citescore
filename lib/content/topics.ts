export type TopicPage = {
  path: string;
  title: string;
  description: string;
  kicker: string;
  card: string;
  priority: number;
  publishedAt: string;
  minutes: number;
};

/** Indexable pages for searches the blog, /geo-audit, and /alternatives do not already own. */
export const topicPages: TopicPage[] = [
  {
    path: "/free-check",
    title: "Free AI search visibility check",
    description:
      "Free, no-signup check: does your site have llms.txt, AI-crawler rules in robots.txt, a sitemap and JSON-LD schema? Results in seconds.",
    kicker: "Free tool",
    card: "Instant check of llms.txt, robots.txt AI-crawler rules, sitemap and schema.",
    priority: 1.0,
    publishedAt: "2026-10-09",
    minutes: 4,
  },
  {
    path: "/how-to-get-cited-by-chatgpt",
    title: "How to get cited by ChatGPT",
    description:
      "How to get cited by ChatGPT in 2026: let OAI-SearchBot and GPTBot in, write answer-first copy, add evidence and schema, and check the basics free.",
    kicker: "Guide",
    card: "Seven practical steps to show up as a ChatGPT source, in order of payoff.",
    priority: 0.9,
    publishedAt: "2026-10-09",
    minutes: 9,
  },
  {
    path: "/ai-crawler-robots-txt-checker",
    title: "AI crawler robots.txt checker",
    description:
      "Check whether your robots.txt allows or blocks GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot and Google-Extended, with copy-paste rules for each.",
    kicker: "robots.txt",
    card: "Which AI user agents your robots.txt lets in, and the exact lines to change.",
    priority: 0.9,
    publishedAt: "2026-10-09",
    minutes: 6,
  },
  {
    path: "/aeo-checklist",
    title: "Answer engine optimization (AEO) checklist",
    description:
      "A practical AEO / GEO checklist for small sites: crawler access, answer-first copy, schema, evidence, llms.txt, and how to verify each item for free.",
    kicker: "Checklist",
    card: "Twelve checks for answer engine optimization, each with a free way to verify it.",
    priority: 0.8,
    publishedAt: "2026-10-09",
    minutes: 7,
  },
  {
    path: "/chatgpt-citation-check",
    title: "ChatGPT citation check",
    description:
      "A ChatGPT citation check for one public URL: a 0–100 score and about ten fixes. On-page signals plus an optional LLM review of the HTML — not a live ChatGPT login.",
    kicker: "Citation check",
    card: "What the ChatGPT row in the report means, and the three things it cannot see.",
    priority: 0.9,
    publishedAt: "2026-10-03",
    minutes: 8,
  },
  {
    path: "/ai-overviews",
    title: "Google AI Overviews visibility",
    description:
      "How a $39 audit estimates Google AI Overviews visibility from answer-shaped copy and FAQ markup. Not a live Google Search scrape.",
    kicker: "AI Overviews",
    card: "What the AI Overviews row uses, and what Google-Extended does not control.",
    priority: 0.9,
    publishedAt: "2026-10-03",
    minutes: 8,
  },
  {
    path: "/perplexity-citations",
    title: "Perplexity citations",
    description:
      "Why a Perplexity footnote often goes to a competitor, and what a $39 audit infers from public HTML. We do not log into Perplexity.",
    kicker: "Perplexity",
    card: "How the Perplexity snapshot is inferred, including PerplexityBot in robots.txt.",
    priority: 0.8,
    publishedAt: "2026-10-03",
    minutes: 7,
  },
  {
    path: "/llms-txt",
    title: "llms.txt checker",
    description:
      "What llms.txt is, the exact check CiteScore runs on /llms.txt, and why a missing file does not zero a $39 AI-visibility score.",
    kicker: "llms.txt",
    card: "A non-empty /llms.txt is a crawler-access signal. It is not a citation guarantee.",
    priority: 0.8,
    publishedAt: "2026-10-03",
    minutes: 7,
  },
  {
    path: "/ai-crawlers",
    title: "GPTBot, PerplexityBot, and Google-Extended",
    description:
      "How the audit reads robots.txt for GPTBot, PerplexityBot, and Google-Extended: allow, disallow, or unspecified. What each token does not control.",
    kicker: "Crawlers",
    card: "The three robots.txt tokens the audit records, and the user-agents it ignores.",
    priority: 0.8,
    publishedAt: "2026-10-03",
    minutes: 8,
  },
  {
    path: "/answer-engine-optimization",
    title: "Answer engine optimization (AEO)",
    description:
      "Answer engine optimization, GEO, and an AI-visibility audit are overlapping labels. CiteScore is the $39 version: one URL, one PDF, no live prompt tracker.",
    kicker: "AEO",
    card: "AEO, GEO, and LLMO are labels. This page says which label the $39 PDF matches.",
    priority: 0.8,
    publishedAt: "2026-10-03",
    minutes: 7,
  },
  {
    path: "/alternatives/profound",
    title: "CiteScore vs Profound",
    description:
      "CiteScore is a $39 one-off GEO audit of one URL. Profound is an enterprise AI-visibility platform with citation share, seats, and custom pricing.",
    kicker: "Comparison",
    card: "A punch-list PDF versus a Profound-class citation dashboard.",
    priority: 0.8,
    publishedAt: "2026-10-03",
    minutes: 7,
  },
];

export function getTopic(path: string) {
  const topic = topicPages.find((page) => page.path === path);
  if (!topic) throw new Error(`Unknown topic page: ${path}`);
  return topic;
}
