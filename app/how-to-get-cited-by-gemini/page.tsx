import { GuideDocument } from "@/components/articles/GuideDocument";
import { HowToGetCitedByGeminiArticle } from "@/components/articles/HowToGetCitedByGemini";
import { guideLinks } from "@/components/articles/guide-links";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/how-to-get-cited-by-gemini");

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
  type: "article",
  publishedTime: topic.publishedAt,
});

export default function HowToGetCitedByGeminiPage() {
  return (
    <GuideDocument
      topic={topic}
      related={guideLinks([
        { href: "/google-ai-overviews-optimization", label: "Google AI Overviews optimization" },
        { href: "/google-ai-mode-optimization", label: "Google AI Mode optimization" },
        { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
        { href: "/how-to-get-cited-by-meta-ai", label: "How to get cited by Meta AI" },
        { href: "/how-to-get-cited-by-deepseek", label: "How to get cited by DeepSeek" },
        { href: "/how-to-get-cited-by-mistral", label: "How to get cited by Mistral" },
        { href: "/how-to-get-cited-by-brave-search", label: "How to get cited by Brave Search" },
        { href: "/how-to-get-cited-by-you-com", label: "How to get cited by You.com" },
        { href: "/how-to-get-cited-by-duckduckgo-ai", label: "How to get cited by DuckDuckGo" },
        { href: "/how-to-get-cited-by-perplexity-comet", label: "How to get cited by Perplexity Comet" },
        { href: "/robots-txt-for-ai-crawlers", label: "robots.txt for AI crawlers" },
      ])}
    >
      <HowToGetCitedByGeminiArticle />
    </GuideDocument>
  );
}
