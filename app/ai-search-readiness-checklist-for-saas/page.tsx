import { ArticleShell } from "@/components/ArticleShell";
import { AiSearchReadinessChecklistForSaasArticle } from "@/components/articles/AiSearchReadinessChecklistForSaas";
import { JsonLd } from "@/components/JsonLd";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";
import { publicOrigin } from "@/lib/site";

const topic = getTopic("/ai-search-readiness-checklist-for-saas");

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
  type: "article",
  publishedTime: topic.publishedAt,
});

export default function AiSearchReadinessChecklistForSaasPage() {
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
          author: {
            "@type": "Organization",
            name: "CiteScore Team",
            url: origin,
          },
          publisher: { "@type": "Organization", name: "CiteScore", url: origin },
        }}
      />
      <ArticleShell
        kicker={topic.kicker}
        title={topic.title}
        dek={topic.description}
        publishedAt={topic.publishedAt}
        minutes={topic.minutes}
        author="CiteScore Team"
        ctaId="ai-search-readiness-checklist-for-saas"
        guidePath={topic.path}
        related={[
          { href: "/checklist", label: "AI Citation Readiness Checklist" },
          { href: "/ai-search-visibility-for-b2b-saas", label: "AI search visibility for B2B SaaS" },
          { href: "/qa-page-schema-generator", label: "Free QAPage schema generator" },
          { href: "/speakable-schema-generator", label: "Free Speakable schema generator" },
          { href: "/image-object-schema-generator", label: "Free ImageObject schema generator" },
          { href: "/book-schema-generator", label: "Free Book schema generator" },
          { href: "/podcast-schema-generator", label: "Free Podcast schema generator" },
          { href: "/movie-schema-generator", label: "Free Movie schema generator" },
          { href: "/dataset-schema-generator", label: "Free Dataset schema generator" },
          { href: "/vehicle-schema-generator", label: "Free Vehicle schema generator" },
          { href: "/hotel-schema-generator", label: "Free Hotel schema generator" },
          { href: "/restaurant-schema-generator", label: "Free Restaurant schema generator" },
          { href: "/medical-clinic-schema-generator", label: "Free Medical clinic schema generator" },
          { href: "/free-check", label: "Free AI citation-readiness check" },
          { href: "/geo-audit", label: "$39 GEO audit" },
        ]}
      >
        <AiSearchReadinessChecklistForSaasArticle />
      </ArticleShell>
    </>
  );
}
