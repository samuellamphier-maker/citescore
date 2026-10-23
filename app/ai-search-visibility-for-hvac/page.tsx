import { AiSearchVisibilityForHvacArticle, hvacFaqs } from "@/components/articles/AiSearchVisibilityForHvac";
import { GuideDocument } from "@/components/articles/GuideDocument";
import { guideLinks } from "@/components/articles/guide-links";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta } from "@/lib/content/meta";
import { getTopic } from "@/lib/content/topics";

const topic = getTopic("/ai-search-visibility-for-hvac");

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
  type: "article",
  publishedTime: topic.publishedAt,
});

export default function AiSearchVisibilityForHvacPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: hvacFaqs.map((item) => ({
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
          { href: "/geo-for-local-businesses", label: "GEO for local businesses" },
          { href: "/ai-search-visibility-for-plumbers", label: "AI search visibility for plumbers" },
          { href: "/ai-search-visibility-for-landscapers", label: "AI search visibility for landscapers" },
          { href: "/ai-search-visibility-for-auto-repair", label: "AI search visibility for auto repair" },
          { href: "/ai-search-visibility-for-chiropractors", label: "AI search visibility for chiropractors" },
          { href: "/ai-search-visibility-for-dentists", label: "AI search visibility for dentists" },
          { href: "/ai-search-visibility-for-accountants", label: "AI search visibility for accountants" },
          { href: "/ai-search-visibility-for-law-firms", label: "AI search visibility for law firms" },
          { href: "/ai-search-visibility-for-healthcare", label: "AI search visibility for healthcare" },
          { href: "/ai-search-visibility-for-real-estate", label: "AI search visibility for real estate" },
          { href: "/ai-search-visibility-for-restaurants", label: "AI search visibility for restaurants" },
          { href: "/ai-search-visibility-for-b2b-saas", label: "AI search visibility for B2B SaaS" },
          { href: "/ai-search-visibility-for-ecommerce", label: "AI search visibility for ecommerce" },
          { href: "/how-to-get-cited-by-chatgpt", label: "How to get cited by ChatGPT" },
          { href: "/how-to-get-cited-by-perplexity", label: "How to get cited by Perplexity" },
          { href: "/how-to-get-cited-by-gemini", label: "How to get cited by Gemini" },
          { href: "/google-ai-overviews-optimization", label: "Google AI Overviews optimization" },
          { href: "/google-ai-mode-optimization", label: "Google AI Mode optimization" },
          { href: "/local-business-schema-generator", label: "Free Local business schema generator" },
          { href: "/service-schema-generator", label: "Free Service schema generator" },
          { href: "/person-schema-generator", label: "Free Person schema generator" },
          { href: "/organization-schema-generator", label: "Free Organization schema generator" },
          { href: "/faq-schema-generator", label: "Free FAQ schema generator" },
          { href: "/review-schema-generator", label: "Free Review schema generator" },
          { href: "/event-schema-generator", label: "Free Event schema generator" },
          { href: "/image-object-schema-generator", label: "Free ImageObject schema generator" },
          { href: "/dataset-schema-generator", label: "Free Dataset schema generator" },
          { href: "/vehicle-schema-generator", label: "Free Vehicle schema generator" },
          { href: "/hotel-schema-generator", label: "Free Hotel schema generator" },
          { href: "/restaurant-schema-generator", label: "Free Restaurant schema generator" },
          { href: "/medical-clinic-schema-generator", label: "Free Medical clinic schema generator" },
          { href: "/attorney-schema-generator", label: "Free Attorney schema generator" },
          { href: "/dentist-schema-generator", label: "Free Dentist schema generator" },
          { href: "/real-estate-agent-schema-generator", label: "Free Real estate agent schema generator" },
          { href: "/movie-schema-generator", label: "Free Movie schema generator" },
          { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
          { href: "/robots-txt-for-ai-crawlers", label: "robots.txt for AI crawlers" },
          { href: "/robots-txt-ai-crawler-generator", label: "robots.txt AI crawler generator" },
          { href: "/llms-txt-best-practices", label: "llms.txt best practices" },
          { href: "/llms-txt-generator", label: "Free llms.txt generator" },
          { href: "/llms-txt-examples", label: "llms.txt examples" },
          { href: "/geo-audit", label: "$39 GEO audit" },
        ])}
      >
        <AiSearchVisibilityForHvacArticle />
      </GuideDocument>
    </>
  );
}
