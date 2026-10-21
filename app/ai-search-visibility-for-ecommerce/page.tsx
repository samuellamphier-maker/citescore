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
        { href: "/ai-search-visibility-for-b2b-saas", label: "AI search visibility for B2B SaaS" },
        { href: "/ai-search-visibility-for-law-firms", label: "AI search visibility for law firms" },
        { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
        { href: "/product-schema-generator", label: "Free Product schema generator" },
        { href: "/article-schema-generator", label: "Free Article schema generator" },
        { href: "/local-business-schema-generator", label: "Free Local business schema generator" },
        { href: "/breadcrumb-schema-generator", label: "Free breadcrumb schema generator" },
        { href: "/howto-schema-generator", label: "Free HowTo schema generator" },
        { href: "/software-application-schema-generator", label: "Free Software application schema generator" },
        { href: "/person-schema-generator", label: "Free Person schema generator" },
        { href: "/website-schema-generator", label: "Free WebSite schema generator" },
        { href: "/video-schema-generator", label: "Free Video schema generator" },
        { href: "/event-schema-generator", label: "Free Event schema generator" },
        { href: "/review-schema-generator", label: "Free Review schema generator" },
        { href: "/service-schema-generator", label: "Free Service schema generator" },
        { href: "/course-schema-generator", label: "Free Course schema generator" },
        { href: "/job-posting-schema-generator", label: "Free Job posting schema generator" },
        { href: "/recipe-schema-generator", label: "Free Recipe schema generator" },
        { href: "/qa-page-schema-generator", label: "Free QAPage schema generator" },
        { href: "/speakable-schema-generator", label: "Free Speakable schema generator" },
        { href: "/how-to-get-cited-by-meta-ai", label: "How to get cited by Meta AI" },
        { href: "/how-to-get-cited-by-deepseek", label: "How to get cited by DeepSeek" },
        { href: "/how-to-get-cited-by-mistral", label: "How to get cited by Mistral" },
        { href: "/how-to-get-cited-by-brave-search", label: "How to get cited by Brave Search" },
        { href: "/how-to-get-cited-by-you-com", label: "How to get cited by You.com" },
        { href: "/how-to-get-cited-by-duckduckgo-ai", label: "How to get cited by DuckDuckGo" },
        { href: "/how-to-get-cited-by-perplexity-comet", label: "How to get cited by Perplexity Comet" },
        { href: "/google-ai-overviews-optimization", label: "Google AI Overviews optimization" },
        { href: "/how-to-get-cited-by-gemini", label: "How to get cited by Gemini" },
        { href: "/how-to-get-cited-by-copilot", label: "How to get cited by Microsoft Copilot" },
      ])}
    >
      <AiSearchVisibilityForEcommerceArticle />
    </GuideDocument>
  );
}
