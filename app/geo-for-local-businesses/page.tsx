import { GuideDocument } from "@/components/articles/GuideDocument";
import { GeoForLocalBusinessesArticle } from "@/components/articles/GeoForLocalBusinesses";
import { guideLinks } from "@/components/articles/guide-links";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/geo-for-local-businesses");

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
  type: "article",
  publishedTime: topic.publishedAt,
});

export default function GeoForLocalBusinessesPage() {
  return (
    <GuideDocument
      topic={topic}
      related={guideLinks([
        { href: "/local-business-schema-generator", label: "Local business schema generator" },
        { href: "/breadcrumb-schema-generator", label: "Breadcrumb schema generator" },
        { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
        { href: "/google-ai-overviews-optimization", label: "Google AI Overviews optimization" },
        { href: "/how-to-get-cited-by-gemini", label: "How to get cited by Gemini" },
      ])}
    >
      <GeoForLocalBusinessesArticle />
    </GuideDocument>
  );
}
