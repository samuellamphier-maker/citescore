import { orderedGuidePages, type TopicPage } from "@/lib/content/topics";

export type GuideGroup = {
  id: string;
  title: string;
  intro: string;
  pages: TopicPage[];
};

const industryPrefix = "/ai-search-visibility-for-";

function isAnswerEngineGuide(path: string) {
  return path.startsWith("/how-to-") || path.startsWith("/google-ai-");
}

/**
 * Every topic page whose kicker is Guide, grouped the way the site already
 * talks about them: answer engines, one page per trade, and the rest.
 */
export function guideGroups(): GuideGroup[] {
  const guides = orderedGuidePages();
  const industry = guides.filter((page) => page.path.startsWith(industryPrefix));
  const answerEngines = guides.filter((page) => isAnswerEngineGuide(page.path));
  const claimed = new Set([...industry, ...answerEngines].map((page) => page.path));
  const general = guides.filter((page) => !claimed.has(page.path));

  return [
    {
      id: "answer-engines",
      title: "Answer engines",
      intro:
        "Guides for the engines with a page on this site, including ChatGPT, Perplexity, Claude, Gemini, and Copilot.",
      pages: answerEngines,
    },
    {
      id: "industries",
      title: "Industry guides",
      intro: "One guide for each industry page on this site.",
      pages: industry,
    },
    {
      id: "general",
      title: "General guides",
      intro:
        "robots.txt, schema markup, llms.txt, GEO versus SEO, local businesses, and a SaaS readiness checklist.",
      pages: general,
    },
  ];
}
