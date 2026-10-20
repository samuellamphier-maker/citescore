import { GuideDocument } from "@/components/articles/GuideDocument";
import { HowToGetCitedByCopilotArticle } from "@/components/articles/HowToGetCitedByCopilot";
import { guideLinks } from "@/components/articles/guide-links";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/how-to-get-cited-by-copilot");

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
  type: "article",
  publishedTime: topic.publishedAt,
});

export default function HowToGetCitedByCopilotPage() {
  return (
    <GuideDocument
      topic={topic}
      related={guideLinks([
        { href: "/how-to-get-cited-by-grok", label: "How to get cited by Grok" },
        { href: "/how-to-get-cited-by-meta-ai", label: "How to get cited by Meta AI" },
        { href: "/how-to-get-cited-by-deepseek", label: "How to get cited by DeepSeek" },
        { href: "/how-to-get-cited-by-mistral", label: "How to get cited by Mistral" },
        { href: "/google-ai-overviews-optimization", label: "Google AI Overviews optimization" },
        { href: "/robots-txt-for-ai-crawlers", label: "robots.txt for AI crawlers" },
      ])}
    >
      <HowToGetCitedByCopilotArticle />
    </GuideDocument>
  );
}
