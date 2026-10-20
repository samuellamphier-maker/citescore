import { GuideDocument } from "@/components/articles/GuideDocument";
import { HowToGetCitedByDeepseekArticle, deepseekFaqs } from "@/components/articles/HowToGetCitedByDeepseek";
import { guideLinks } from "@/components/articles/guide-links";
import { JsonLd } from "@/components/JsonLd";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/how-to-get-cited-by-deepseek");

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
  type: "article",
  publishedTime: topic.publishedAt,
});

export default function HowToGetCitedByDeepseekPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: deepseekFaqs.map((item) => ({
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
          { href: "/how-to-get-cited-by-grok", label: "How to get cited by Grok" },
          { href: "/how-to-get-cited-by-meta-ai", label: "How to get cited by Meta AI" },
          { href: "/how-to-get-cited-by-copilot", label: "How to get cited by Microsoft Copilot" },
          { href: "/robots-txt-for-ai-crawlers", label: "robots.txt for AI crawlers" },
          { href: "/event-schema-generator", label: "Free Event schema generator" },
          { href: "/review-schema-generator", label: "Free Review schema generator" },
          { href: "/service-schema-generator", label: "Free Service schema generator" },
          { href: "/course-schema-generator", label: "Free Course schema generator" },
          { href: "/job-posting-schema-generator", label: "Free Job posting schema generator" },
          { href: "/how-to-get-cited-by-mistral", label: "How to get cited by Mistral" },
          { href: "/how-to-get-cited-by-brave-search", label: "How to get cited by Brave Search" },
          { href: "/how-to-get-cited-by-you-com", label: "How to get cited by You.com" },
          { href: "/how-to-get-cited-by-duckduckgo-ai", label: "How to get cited by DuckDuckGo" },
          { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
          { href: "/ai-crawler-user-agents", label: "AI crawler user agents" },
        ])}
      >
        <HowToGetCitedByDeepseekArticle />
      </GuideDocument>
    </>
  );
}
