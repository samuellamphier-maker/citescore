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
      "A plain-language definition of generative engine optimization: how it differs from classic SEO, what answer engines actually cite, and what a $39 audit can and cannot tell you.",
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
      "An honest comparison of a $39 one-off GEO audit against Otterly- and Profound-class platforms: live prompt tracking, seats, and monthly dashboards versus a punch-list PDF.",
    kicker: "Comparison",
    publishedAt: "2026-09-14",
    minutes: 7,
  },
];

export function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export const marketingPaths = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/blog", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/geo-audit", changeFrequency: "monthly" as const, priority: 0.9 },
  {
    path: "/alternatives",
    changeFrequency: "monthly" as const,
    priority: 0.6,
  },
  {
    path: "/alternatives/otterly",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  { path: "/sample", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
  ...blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  })),
];
