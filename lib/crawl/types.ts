export type FaqItem = {
  q: string;
  a: string;
};

export type PageExtract = {
  url: string;
  status: number;
  contentType: string;
  title: string;
  description: string;
  canonical: string | null;
  h1: string[];
  headings: string[];
  schemaTypes: string[];
  faq: FaqItem[];
  dateHints: string[];
  numberHints: string[];
  wordCount: number;
  textSample: string;
  ogTitle: string;
  ogType: string;
};

export type RobotsSignals = {
  fetched: boolean;
  status: number | null;
  allowsGeneric: boolean;
  gptBot: "allow" | "disallow" | "unspecified";
  perplexityBot: "allow" | "disallow" | "unspecified";
  googleExtended: "allow" | "disallow" | "unspecified";
  rawSample: string;
};

export type CrawlResult = {
  startedAt: string;
  finishedAt: string;
  homepageUrl: string;
  finalHomepageUrl: string;
  robots: RobotsSignals;
  llmsTxt: { url: string; found: boolean; status: number | null; sample: string };
  sitemap: { url: string; found: boolean; status: number | null };
  pages: PageExtract[];
  warnings: string[];
};
