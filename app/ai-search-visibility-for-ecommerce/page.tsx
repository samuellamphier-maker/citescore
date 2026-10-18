import { GuideDocument } from "@/components/articles/GuideDocument";
import { AiSearchVisibilityForEcommerceArticle } from "@/components/articles/AiSearchVisibilityForEcommerce";
import { guideLinks } from "@/components/articles/guide-links";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/ai-search-visibility-for-ecommerce");

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
  type: "article",
  publishedTime: topic.publishedAt,
});

export default function AiSearchVisibilityForEcommercePage() {
  return (
    <GuideDocument
      topic={topic}
      related={guideLinks([
        { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
        { href: "/product-schema-generator", label: "Free Product schema generator" },
        { href: "/article-schema-generator", label: "Free Article schema generator" },
        { href: "/local-business-schema-generator", label: "Free Local business schema generator" },
        { href: "/breadcrumb-schema-generator", label: "Free breadcrumb schema generator" },
        { href: "/howto-schema-generator", label: "Free HowTo schema generator" },
        { href: "/software-application-schema-generator", label: "Free Software application schema generator" },
        { href: "/google-ai-overviews-optimization", label: "Google AI Overviews optimization" },
        { href: "/how-to-get-cited-by-gemini", label: "How to get cited by Gemini" },
        { href: "/how-to-get-cited-by-copilot", label: "How to get cited by Microsoft Copilot" },
      ])}
    >
      <AiSearchVisibilityForEcommerceArticle />
    </GuideDocument>
  );
}
