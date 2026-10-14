import { GuideDocument } from "@/components/articles/GuideDocument";
import { LlmsTxtBestPracticesArticle } from "@/components/articles/LlmsTxtBestPractices";
import { guideLinks } from "@/components/articles/guide-links";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/llms-txt-best-practices");

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
  type: "article",
  publishedTime: topic.publishedAt,
});

export default function LlmsTxtBestPracticesPage() {
  return (
    <GuideDocument
      topic={topic}
      related={guideLinks([
        { href: "/llms-txt-generator", label: "Free llms.txt generator" },
        { href: "/llms-txt", label: "llms.txt checker" },
        { href: "/llms-txt-examples", label: "llms.txt examples" },
        { href: "/robots-txt-for-ai-crawlers", label: "robots.txt for AI crawlers" },
      ])}
    >
      <LlmsTxtBestPracticesArticle />
    </GuideDocument>
  );
}
