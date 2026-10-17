import { ArticleShell } from "@/components/ArticleShell";
import {
  SchemaMarkupForAiSearchArticle,
  articleJsonLd,
  faqJsonLd,
} from "@/components/articles/SchemaMarkupForAiSearch";
import { JsonLd } from "@/components/JsonLd";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";
import { publicOrigin } from "@/lib/site";

const topic = getTopic("/schema-markup-for-ai-search");

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
  type: "article",
  publishedTime: topic.publishedAt,
});

export default function SchemaMarkupForAiSearchPage() {
  const origin = publicOrigin();

  return (
    <>
      <JsonLd data={articleJsonLd(origin)} />
      <JsonLd data={faqJsonLd()} />
      <ArticleShell
        kicker={topic.kicker}
        title={topic.title}
        dek={topic.description}
        publishedAt={topic.publishedAt}
        minutes={topic.minutes}
        author="CiteScore Team"
        ctaId="schema-markup-for-ai-search"
        guidePath={topic.path}
        related={[
          { href: "/free-check", label: "Free AI citation-readiness check" },
          { href: "/geo-audit", label: "$39 GEO audit" },
          { href: "/robots-txt-for-ai-crawlers", label: "robots.txt for AI crawlers" },
          { href: "/faq-schema-generator", label: "Free FAQ schema generator" },
          { href: "/organization-schema-generator", label: "Free Organization schema generator" },
          { href: "/product-schema-generator", label: "Free Product schema generator" },
          { href: "/article-schema-generator", label: "Free Article schema generator" },
          { href: "/checklist", label: "AI Citation Readiness Checklist" },
          { href: "/geo-vs-seo", label: "GEO vs SEO" },
        ]}
      >
        <SchemaMarkupForAiSearchArticle origin={origin} />
      </ArticleShell>
    </>
  );
}
