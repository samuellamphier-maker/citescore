export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  kicker: string;
  publishedAt: string;
  minutes: number;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-geo",
    title: "What is GEO (generative engine optimization)?",
    description:
      "A plain-language definition of generative engine optimization: how it differs from classic SEO, what answer engines actually cite, and what a free snapshot can show.",
    kicker: "Explainer",
    publishedAt: "2026-09-14",
    minutes: 8,
  },
  {
    slug: "chatgpt-citation-checklist",
    title: "ChatGPT citation checklist for SaaS homepages",
    description:
      "Twelve on-page checks that make a SaaS homepage easier for ChatGPT, Perplexity, and Google AI Overviews to quote — without pretending anyone logged into ChatGPT for you.",
    kicker: "Checklist",
    publishedAt: "2026-09-14",
    minutes: 9,
  },
  {
    slug: "citescore-vs-enterprise-geo-tools",
    title: "CiteScore vs enterprise GEO tools",
    description:
      "An honest comparison of the free AI Answer Snapshot and the Fix Pack with Otterly- and Profound-class platforms: live prompt tracking versus a one-time pack.",
    kicker: "Comparison",
    publishedAt: "2026-09-14",
    minutes: 7,
  },
];

export function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

/** Description already published on /blog. */
export const blogIndexDescription =
  "Short explainers on generative engine optimization, ChatGPT citations, and when the free snapshot and the Fix Pack are enough versus a monitoring platform.";

export type MarketingPath = {
  path: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
  /** ISO date (YYYY-MM-DD). Defaults to the original marketing launch day. */
  lastModified?: string;
};

export const marketingPaths: MarketingPath[] = [
  { path: "/", changeFrequency: "weekly", priority: 1, lastModified: "2026-10-26" },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  {
    path: "/guides",
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified: "2026-10-31",
  },
  {
    path: "/industries",
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified: "2026-11-03",
  },
  {
    path: "/tools",
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified: "2026-11-03",
  },
  { path: "/geo-audit", changeFrequency: "monthly", priority: 0.9 },
  {
    path: "/alternatives",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/alternatives/otterly",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  { path: "/sample", changeFrequency: "monthly", priority: 0.7 },
  {
    path: "/sample-snapshot",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-11-01",
  },
  {
    path: "/sample-fix-pack",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-11-01",
  },
  {
    path: "/free-snapshot",
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: "2026-10-26",
  },
  {
    path: "/checklist",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-10-13",
  },
  {
    path: "/for-agencies",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-10-13",
  },
  {
    path: "/done-for-you-audit",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-10-13",
  },
  { path: "/about", changeFrequency: "yearly", priority: 0.4, lastModified: "2026-10-26" },
  { path: "/trust", changeFrequency: "yearly", priority: 0.4, lastModified: "2026-11-05" },
  {
    path: "/pricing",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-11-01",
  },
  {
    path: "/how-it-works",
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: "2026-10-31",
  },
  {
    path: "/methodology",
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: "2026-10-31",
  },
  {
    path: "/faq",
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: "2026-10-31",
  },
  { path: "/contact", changeFrequency: "yearly", priority: 0.4, lastModified: "2026-10-28" },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3, lastModified: "2026-10-26" },
  {
    path: "/terms",
    changeFrequency: "yearly",
    priority: 0.3,
    lastModified: "2026-10-23",
  },
  {
    path: "/refunds",
    changeFrequency: "yearly",
    priority: 0.3,
    lastModified: "2026-10-23",
  },
  {
    path: "/llms.txt",
    changeFrequency: "monthly",
    priority: 0.4,
    lastModified: "2026-11-01",
  },
  {
    path: "/fix-pack",
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: "2026-11-01",
  },
  ...blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  })),
];
