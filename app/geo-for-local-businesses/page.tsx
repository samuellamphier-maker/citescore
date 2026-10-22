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
        { href: "/review-schema-generator", label: "Review schema generator" },
        { href: "/service-schema-generator", label: "Service schema generator" },
        { href: "/course-schema-generator", label: "Course schema generator" },
        { href: "/job-posting-schema-generator", label: "Job posting schema generator" },
        { href: "/recipe-schema-generator", label: "Recipe schema generator" },
        { href: "/qa-page-schema-generator", label: "QAPage schema generator" },
        { href: "/speakable-schema-generator", label: "Speakable schema generator" },
        { href: "/image-object-schema-generator", label: "ImageObject schema generator" },
        { href: "/book-schema-generator", label: "Book schema generator" },
        { href: "/podcast-schema-generator", label: "Podcast schema generator" },
        { href: "/movie-schema-generator", label: "Movie schema generator" },
        { href: "/dataset-schema-generator", label: "Dataset schema generator" },
        { href: "/vehicle-schema-generator", label: "Vehicle schema generator" },
        { href: "/hotel-schema-generator", label: "Hotel schema generator" },
        { href: "/breadcrumb-schema-generator", label: "Breadcrumb schema generator" },
        { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
        { href: "/ai-search-visibility-for-law-firms", label: "AI search visibility for law firms" },
        { href: "/ai-search-visibility-for-healthcare", label: "AI search visibility for healthcare" },
        { href: "/ai-search-visibility-for-real-estate", label: "AI search visibility for real estate" },
        { href: "/ai-search-visibility-for-restaurants", label: "AI search visibility for restaurants" },
        { href: "/ai-search-visibility-for-accountants", label: "AI search visibility for accountants" },
        { href: "/ai-search-visibility-for-dentists", label: "AI search visibility for dentists" },
        { href: "/ai-search-visibility-for-plumbers", label: "AI search visibility for plumbers" },
        { href: "/ai-search-visibility-for-hvac", label: "AI search visibility for HVAC" },
        { href: "/google-ai-overviews-optimization", label: "Google AI Overviews optimization" },
        { href: "/how-to-get-cited-by-gemini", label: "How to get cited by Gemini" },
      ])}
    >
      <GeoForLocalBusinessesArticle />
    </GuideDocument>
  );
}
