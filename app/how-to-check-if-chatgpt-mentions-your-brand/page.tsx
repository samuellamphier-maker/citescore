import { GuideDocument } from "@/components/articles/GuideDocument";
import {
  HowToCheckIfChatgptMentionsYourBrandArticle,
  mentionCheckFaqs,
} from "@/components/articles/HowToCheckIfChatgptMentionsYourBrand";
import { guideLinks } from "@/components/articles/guide-links";
import { JsonLd } from "@/components/JsonLd";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/how-to-check-if-chatgpt-mentions-your-brand");

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
  type: "article",
  publishedTime: topic.publishedAt,
});

export default function HowToCheckIfChatgptMentionsYourBrandPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: mentionCheckFaqs.map((item) => ({
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
          { href: "/how-to-get-cited-by-chatgpt", label: "How to get cited by ChatGPT" },
          { href: "/chatgpt-citation-check", label: "ChatGPT citation check" },
          { href: "/ai-crawler-robots-txt-checker", label: "AI crawler robots.txt checker" },
          { href: "/robots-txt-for-ai-crawlers", label: "robots.txt for AI crawlers" },
          { href: "/llms-txt", label: "llms.txt checker" },
          { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
          { href: "/video-schema-generator", label: "Free Video schema generator" },
          { href: "/event-schema-generator", label: "Free Event schema generator" },
          { href: "/review-schema-generator", label: "Free Review schema generator" },
          { href: "/service-schema-generator", label: "Free Service schema generator" },
          { href: "/course-schema-generator", label: "Free Course schema generator" },
          { href: "/job-posting-schema-generator", label: "Free Job posting schema generator" },
          { href: "/recipe-schema-generator", label: "Free Recipe schema generator" },
          { href: "/qa-page-schema-generator", label: "Free QAPage schema generator" },
          { href: "/speakable-schema-generator", label: "Free Speakable schema generator" },
          { href: "/image-object-schema-generator", label: "Free ImageObject schema generator" },
          { href: "/book-schema-generator", label: "Free Book schema generator" },
          { href: "/podcast-schema-generator", label: "Free Podcast schema generator" },
          { href: "/movie-schema-generator", label: "Free Movie schema generator" },
          { href: "/geo-audit", label: "$39 GEO audit" },
        ])}
      >
        <HowToCheckIfChatgptMentionsYourBrandArticle />
      </GuideDocument>
    </>
  );
}
