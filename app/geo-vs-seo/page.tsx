import { ArticleShell } from "@/components/ArticleShell";
import { GeoVsSeoArticle } from "@/components/articles/GeoVsSeo";
import { JsonLd } from "@/components/JsonLd";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";
import { publicOrigin } from "@/lib/site";

const topic = getTopic("/geo-vs-seo");

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
  type: "article",
  publishedTime: topic.publishedAt,
});

export default function GeoVsSeoPage() {
  const origin = publicOrigin();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: topic.title,
          description: topic.description,
          datePublished: topic.publishedAt,
          url: `${origin}${topic.path}`,
          author: { "@type": "Organization", name: "CiteScore", url: origin },
        }}
      />
      <ArticleShell
        kicker={topic.kicker}
        title={topic.title}
        dek={topic.description}
        publishedAt={topic.publishedAt}
        minutes={topic.minutes}
        ctaId="geo-vs-seo"
        related={[
          { href: "/free-check", label: "Free AI citation-readiness check" },
          { href: "/geo-audit", label: "$39 GEO audit" },
          { href: "/checklist", label: "AI Citation Readiness Checklist" },
          { href: "/blog/what-is-geo", label: "What is GEO?" },
          { href: "/llms-txt-examples", label: "llms.txt examples from 10 SaaS sites" },
          { href: "/ai-crawlers", label: "GPTBot, PerplexityBot, and Google-Extended" },
        ]}
      >
        <GeoVsSeoArticle />
      </ArticleShell>
    </>
  );
}
