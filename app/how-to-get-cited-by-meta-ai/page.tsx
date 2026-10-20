import { GuideDocument } from "@/components/articles/GuideDocument";
import { HowToGetCitedByMetaAiArticle, metaAiFaqs } from "@/components/articles/HowToGetCitedByMetaAi";
import { guideLinks } from "@/components/articles/guide-links";
import { JsonLd } from "@/components/JsonLd";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/how-to-get-cited-by-meta-ai");

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
  type: "article",
  publishedTime: topic.publishedAt,
});

export default function HowToGetCitedByMetaAiPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: metaAiFaqs.map((item) => ({
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
          { href: "/how-to-get-cited-by-deepseek", label: "How to get cited by DeepSeek" },
          { href: "/how-to-get-cited-by-mistral", label: "How to get cited by Mistral" },
          { href: "/how-to-get-cited-by-brave-search", label: "How to get cited by Brave Search" },
          { href: "/how-to-get-cited-by-copilot", label: "How to get cited by Microsoft Copilot" },
          { href: "/how-to-get-cited-by-chatgpt", label: "How to get cited by ChatGPT" },
          { href: "/robots-txt-for-ai-crawlers", label: "robots.txt for AI crawlers" },
          { href: "/website-schema-generator", label: "Free WebSite schema generator" },
          { href: "/video-schema-generator", label: "Free Video schema generator" },
          { href: "/event-schema-generator", label: "Free Event schema generator" },
          { href: "/review-schema-generator", label: "Free Review schema generator" },
          { href: "/service-schema-generator", label: "Free Service schema generator" },
          { href: "/ai-crawler-user-agents", label: "AI crawler user agents" },
        ])}
      >
        <HowToGetCitedByMetaAiArticle />
      </GuideDocument>
    </>
  );
}
