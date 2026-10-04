import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CitationChecklistArticle } from "@/components/articles/CitationChecklist";
import { VsEnterpriseArticle } from "@/components/articles/VsEnterprise";
import { WhatIsGeoArticle } from "@/components/articles/WhatIsGeo";
import { ArticleShell, relatedFromPosts } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { blogPosts, getPost } from "@/lib/content/blog";
import { pageMeta } from "@/lib/content/meta";
import { publicOrigin, site } from "@/lib/site";

const articles = {
  "what-is-geo": WhatIsGeoArticle,
  "chatgpt-citation-checklist": CitationChecklistArticle,
  "citescore-vs-enterprise-geo-tools": VsEnterpriseArticle,
} as const;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: `${post.publishedAt}T00:00:00.000Z`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const Article = articles[slug as keyof typeof articles];
  if (!post || !Article) notFound();

  const origin = publicOrigin();
  const topicRelated = {
    "what-is-geo": [
      { href: "/answer-engine-optimization", label: "Answer engine optimization (AEO)" },
      { href: "/ai-overviews", label: "Google AI Overviews visibility" },
      { href: "/ai-crawlers", label: "GPTBot, PerplexityBot, and Google-Extended" },
    ],
    "chatgpt-citation-checklist": [
      { href: "/chatgpt-citation-check", label: "ChatGPT citation check" },
      { href: "/llms-txt", label: "llms.txt — what the audit checks" },
      { href: "/perplexity-citations", label: "Perplexity citations" },
    ],
    "citescore-vs-enterprise-geo-tools": [
      { href: "/alternatives/profound", label: "CiteScore vs Profound" },
      { href: "/answer-engine-optimization", label: "Answer engine optimization (AEO)" },
      { href: "/chatgpt-citation-check", label: "ChatGPT citation check" },
    ],
  } as const;

  const related = relatedFromPosts(
    blogPosts.filter((item) => item.slug !== post.slug),
    [
      ...(topicRelated[post.slug as keyof typeof topicRelated] ?? []),
      { href: "/geo-audit", label: "GEO audit — what you get for $39" },
      { href: "/alternatives/otterly", label: "CiteScore vs Otterly" },
      { href: "/sample", label: "Sample report" },
    ],
  );

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.publishedAt,
          author: { "@type": "Organization", name: site.name, url: origin },
          publisher: { "@type": "Organization", name: site.name, url: origin },
          mainEntityOfPage: `${origin}/blog/${post.slug}`,
        }}
      />
      <ArticleShell
        kicker={post.kicker}
        title={post.title}
        dek={post.description}
        publishedAt={post.publishedAt}
        minutes={post.minutes}
        related={related}
        ctaId={`blog-${post.slug}`}
      >
        <Article />
      </ArticleShell>
    </>
  );
}
