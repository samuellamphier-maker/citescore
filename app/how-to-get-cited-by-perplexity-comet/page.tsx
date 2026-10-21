import { GuideDocument } from "@/components/articles/GuideDocument";
import {
  HowToGetCitedByPerplexityCometArticle,
  perplexityCometFaqs,
} from "@/components/articles/HowToGetCitedByPerplexityComet";
import { guideLinks } from "@/components/articles/guide-links";
import { JsonLd } from "@/components/JsonLd";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/how-to-get-cited-by-perplexity-comet");

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
  type: "article",
  publishedTime: topic.publishedAt,
});

export default function HowToGetCitedByPerplexityCometPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: perplexityCometFaqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }}
      />
      <GuideDocument
        topic={topic}
        related={guideLinks([
          { href: "/how-to-get-cited-by-perplexity", label: "How to get cited by Perplexity" },
          { href: "/how-to-get-cited-by-duckduckgo-ai", label: "How to get cited by DuckDuckGo" },
          { href: "/how-to-get-cited-by-you-com", label: "How to get cited by You.com" },
          { href: "/robots-txt-for-ai-crawlers", label: "robots.txt for AI crawlers" },
          { href: "/ai-crawler-user-agents", label: "AI crawler user agents" },
          { href: "/recipe-schema-generator", label: "Free Recipe schema generator" },
          { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
          { href: "/llms-txt-best-practices", label: "llms.txt best practices" },
          { href: "/perplexity-citations", label: "Perplexity citations" },
          { href: "/geo-audit", label: "$39 GEO audit" },
        ])}
      >
        <HowToGetCitedByPerplexityCometArticle />
      </GuideDocument>
    </>
  );
}
