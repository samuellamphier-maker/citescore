import { GuideDocument } from "@/components/articles/GuideDocument";
import { HowToGetCitedByMistralArticle, mistralFaqs } from "@/components/articles/HowToGetCitedByMistral";
import { guideLinks } from "@/components/articles/guide-links";
import { JsonLd } from "@/components/JsonLd";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/how-to-get-cited-by-mistral");

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
  type: "article",
  publishedTime: topic.publishedAt,
});

export default function HowToGetCitedByMistralPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: mistralFaqs.map((item) => ({
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
          { href: "/how-to-get-cited-by-deepseek", label: "How to get cited by DeepSeek" },
          { href: "/how-to-get-cited-by-meta-ai", label: "How to get cited by Meta AI" },
          { href: "/how-to-get-cited-by-grok", label: "How to get cited by Grok" },
          { href: "/robots-txt-for-ai-crawlers", label: "robots.txt for AI crawlers" },
          { href: "/ai-crawler-user-agents", label: "AI crawler user agents" },
          { href: "/review-schema-generator", label: "Free Review schema generator" },
          { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
          { href: "/llms-txt-best-practices", label: "llms.txt best practices" },
          { href: "/geo-audit", label: "$39 GEO audit" },
        ])}
      >
        <HowToGetCitedByMistralArticle />
      </GuideDocument>
    </>
  );
}
