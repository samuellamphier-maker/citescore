import { ArticleShell } from "@/components/ArticleShell";
import { LlmsTxtExamplesArticle } from "@/components/articles/LlmsTxtExamples";
import { JsonLd } from "@/components/JsonLd";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";
import { publicOrigin } from "@/lib/site";

const topic = getTopic("/llms-txt-examples");

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
  type: "article",
  publishedTime: topic.publishedAt,
});

export default function LlmsTxtExamplesPage() {
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
        ctaId="llms-txt-examples"
        related={[
          { href: "/free-check", label: "Free AI citation-readiness check" },
          { href: "/geo-audit", label: "$39 GEO audit" },
          { href: "/llms-txt", label: "What the llms.txt check actually measures" },
          { href: "/llms-txt-generator", label: "Free llms.txt generator" },
          { href: "/checklist", label: "AI Citation Readiness Checklist" },
          { href: "/geo-vs-seo", label: "GEO vs SEO" },
        ]}
      >
        <LlmsTxtExamplesArticle />
      </ArticleShell>
    </>
  );
}
