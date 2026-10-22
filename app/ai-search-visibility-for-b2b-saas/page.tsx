import { GuideDocument } from "@/components/articles/GuideDocument";
import {
  AiSearchVisibilityForB2bSaasArticle,
  b2bSaasFaqs,
} from "@/components/articles/AiSearchVisibilityForB2bSaas";
import { guideLinks } from "@/components/articles/guide-links";
import { JsonLd } from "@/components/JsonLd";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/ai-search-visibility-for-b2b-saas");

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
  type: "article",
  publishedTime: topic.publishedAt,
});

export default function AiSearchVisibilityForB2bSaasPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: b2bSaasFaqs.map((item) => ({
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
          { href: "/ai-search-readiness-checklist-for-saas", label: "AI search readiness checklist for SaaS" },
          { href: "/how-to-get-cited-by-chatgpt", label: "How to get cited by ChatGPT" },
          { href: "/how-to-get-cited-by-perplexity", label: "How to get cited by Perplexity" },
          { href: "/how-to-get-cited-by-claude", label: "How to get cited by Claude" },
          { href: "/google-ai-overviews-optimization", label: "Google AI Overviews optimization" },
          { href: "/google-ai-mode-optimization", label: "Google AI Mode optimization" },
          { href: "/llms-txt-best-practices", label: "llms.txt best practices" },
          { href: "/llms-txt-generator", label: "Free llms.txt generator" },
          { href: "/llms-txt-examples", label: "llms.txt examples" },
          { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
          { href: "/software-application-schema-generator", label: "Free Software application schema generator" },
          { href: "/organization-schema-generator", label: "Free Organization schema generator" },
          { href: "/faq-schema-generator", label: "Free FAQ schema generator" },
          { href: "/qa-page-schema-generator", label: "Free QAPage schema generator" },
          { href: "/speakable-schema-generator", label: "Free Speakable schema generator" },
          { href: "/image-object-schema-generator", label: "Free ImageObject schema generator" },
          { href: "/book-schema-generator", label: "Free Book schema generator" },
          { href: "/podcast-schema-generator", label: "Free Podcast schema generator" },
          { href: "/movie-schema-generator", label: "Free Movie schema generator" },
          { href: "/robots-txt-for-ai-crawlers", label: "robots.txt for AI crawlers" },
          { href: "/how-to-check-if-chatgpt-mentions-your-brand", label: "How to check if ChatGPT mentions your brand" },
          { href: "/ai-search-visibility-for-ecommerce", label: "AI search visibility for ecommerce" },
          { href: "/ai-search-visibility-for-law-firms", label: "AI search visibility for law firms" },
          { href: "/ai-search-visibility-for-healthcare", label: "AI search visibility for healthcare" },
          { href: "/ai-search-visibility-for-real-estate", label: "AI search visibility for real estate" },
          { href: "/ai-search-visibility-for-restaurants", label: "AI search visibility for restaurants" },
          { href: "/ai-search-visibility-for-accountants", label: "AI search visibility for accountants" },
          { href: "/geo-audit", label: "$39 GEO audit" },
        ])}
      >
        <AiSearchVisibilityForB2bSaasArticle />
      </GuideDocument>
    </>
  );
}
