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
          { href: "/local-business-schema-generator", label: "Free Local business schema generator" },
          { href: "/breadcrumb-schema-generator", label: "Free breadcrumb schema generator" },
          { href: "/howto-schema-generator", label: "Free HowTo schema generator" },
          { href: "/software-application-schema-generator", label: "Free Software application schema generator" },
          { href: "/person-schema-generator", label: "Free Person schema generator" },
          { href: "/website-schema-generator", label: "Free WebSite schema generator" },
          { href: "/video-schema-generator", label: "Free Video schema generator" },
          { href: "/event-schema-generator", label: "Free Event schema generator" },
          { href: "/review-schema-generator", label: "Free Review schema generator" },
          { href: "/service-schema-generator", label: "Free Service schema generator" },
          { href: "/course-schema-generator", label: "Free Course schema generator" },
          { href: "/job-posting-schema-generator", label: "Free Job posting schema generator" },
          { href: "/recipe-schema-generator", label: "Free Recipe schema generator" },
          { href: "/ai-search-visibility-for-b2b-saas", label: "AI search visibility for B2B SaaS" },
          { href: "/ai-search-visibility-for-law-firms", label: "AI search visibility for law firms" },
          { href: "/ai-search-visibility-for-healthcare", label: "AI search visibility for healthcare" },
          { href: "/ai-search-visibility-for-real-estate", label: "AI search visibility for real estate" },
          { href: "/ai-search-visibility-for-restaurants", label: "AI search visibility for restaurants" },
          { href: "/ai-search-visibility-for-accountants", label: "AI search visibility for accountants" },
          { href: "/ai-search-visibility-for-dentists", label: "AI search visibility for dentists" },
          { href: "/ai-search-visibility-for-plumbers", label: "AI search visibility for plumbers" },
          { href: "/ai-search-visibility-for-hvac", label: "AI search visibility for HVAC" },
          { href: "/ai-search-visibility-for-roofers", label: "AI search visibility for roofers" },
          { href: "/ai-search-visibility-for-electricians", label: "AI search visibility for electricians" },
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
          { href: "/checklist", label: "AI Citation Readiness Checklist" },
          { href: "/geo-vs-seo", label: "GEO vs SEO" },
        ]}
      >
        <SchemaMarkupForAiSearchArticle origin={origin} />
      </ArticleShell>
    </>
  );
}
