import { GuideDocument } from "@/components/articles/GuideDocument";
import { HowToGetCitedByGrokArticle } from "@/components/articles/HowToGetCitedByGrok";
import { guideLinks } from "@/components/articles/guide-links";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/how-to-get-cited-by-grok");

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
  type: "article",
  publishedTime: topic.publishedAt,
});

export default function HowToGetCitedByGrokPage() {
  return (
    <GuideDocument
      topic={topic}
      related={guideLinks([
        { href: "/geo-audit", label: "$39 GEO audit" },
        { href: "/how-to-get-cited-by-chatgpt", label: "How to get cited by ChatGPT" },
        { href: "/how-to-get-cited-by-perplexity", label: "How to get cited by Perplexity" },
        { href: "/how-to-get-cited-by-meta-ai", label: "How to get cited by Meta AI" },
        { href: "/how-to-get-cited-by-deepseek", label: "How to get cited by DeepSeek" },
        { href: "/robots-txt-for-ai-crawlers", label: "robots.txt for AI crawlers" },
      ])}
    >
      <HowToGetCitedByGrokArticle />
    </GuideDocument>
  );
}
