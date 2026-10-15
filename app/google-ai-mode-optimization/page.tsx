import { GuideDocument } from "@/components/articles/GuideDocument";
import { GoogleAiModeOptimizationArticle } from "@/components/articles/GoogleAiModeOptimization";
import { guideLinks } from "@/components/articles/guide-links";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/google-ai-mode-optimization");

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
  type: "article",
  publishedTime: topic.publishedAt,
});

export default function GoogleAiModeOptimizationPage() {
  return (
    <GuideDocument
      topic={topic}
      related={guideLinks([
        { href: "/geo-audit", label: "$39 GEO audit" },
        { href: "/google-ai-overviews-optimization", label: "Google AI Overviews optimization" },
        { href: "/how-to-get-cited-by-gemini", label: "How to get cited by Gemini" },
        { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
      ])}
    >
      <GoogleAiModeOptimizationArticle />
    </GuideDocument>
  );
}
