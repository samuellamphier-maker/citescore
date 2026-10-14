import { GuideDocument } from "@/components/articles/GuideDocument";
import { HowToGetCitedByClaudeArticle } from "@/components/articles/HowToGetCitedByClaude";
import { guideLinks } from "@/components/articles/guide-links";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/how-to-get-cited-by-claude");

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
  type: "article",
  publishedTime: topic.publishedAt,
});

export default function HowToGetCitedByClaudePage() {
  return (
    <GuideDocument
      topic={topic}
      related={guideLinks([
        { href: "/how-to-get-cited-by-chatgpt", label: "How to get cited by ChatGPT" },
        { href: "/how-to-get-cited-by-perplexity", label: "How to get cited by Perplexity" },
        { href: "/robots-txt-for-ai-crawlers", label: "robots.txt for AI crawlers" },
      ])}
    >
      <HowToGetCitedByClaudeArticle />
    </GuideDocument>
  );
}
