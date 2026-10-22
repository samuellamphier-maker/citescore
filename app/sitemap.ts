import type { MetadataRoute } from "next";
import { marketingPaths } from "@/lib/content/blog";
import { topicPages } from "@/lib/content/topics";
import { publicOrigin } from "@/lib/site";

const defaultLastModified = "2026-09-14";

const addedGuidePaths = [
  "/how-to-get-cited-by-claude",
  "/how-to-get-cited-by-gemini",
  "/how-to-get-cited-by-copilot",
  "/how-to-get-cited-by-grok",
  "/how-to-get-cited-by-meta-ai",
  "/how-to-get-cited-by-deepseek",
  "/how-to-get-cited-by-mistral",
  "/how-to-get-cited-by-brave-search",
  "/how-to-get-cited-by-you-com",
  "/how-to-get-cited-by-duckduckgo-ai",
  "/website-schema-generator",
  "/video-schema-generator",
  "/event-schema-generator",
  "/review-schema-generator",
  "/service-schema-generator",
  "/course-schema-generator",
  "/job-posting-schema-generator",
  "/how-to-check-if-chatgpt-mentions-your-brand",
  "/google-ai-mode-optimization",
  "/geo-for-local-businesses",
  "/llms-txt-best-practices",
  "/ai-search-visibility-for-ecommerce",
  "/recipe-schema-generator",
  "/how-to-get-cited-by-perplexity-comet",
  "/qa-page-schema-generator",
  "/ai-search-visibility-for-b2b-saas",
  "/speakable-schema-generator",
  "/ai-search-visibility-for-law-firms",
  "/image-object-schema-generator",
  "/ai-search-visibility-for-healthcare",
  "/book-schema-generator",
  "/ai-search-visibility-for-real-estate",
  "/podcast-schema-generator",
  "/ai-search-visibility-for-restaurants",
  "/movie-schema-generator",
  "/ai-search-visibility-for-accountants",
  "/dataset-schema-generator",
  "/ai-search-visibility-for-dentists",
  "/vehicle-schema-generator",
  "/ai-search-visibility-for-plumbers",
  "/hotel-schema-generator",
  "/ai-search-visibility-for-hvac",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = publicOrigin();
  const added = new Set<string>(addedGuidePaths);
  const topicRoutes = topicPages
    .filter((page) => !added.has(page.path))
    .map((page) => ({
      path: page.path,
      changeFrequency: "monthly" as const,
      priority: page.priority,
      lastModified: page.publishedAt,
    }));
  const guideRoutes = addedGuidePaths.map((path) => {
    const page = topicPages.find((item) => item.path === path);
    if (!page) {
      throw new Error(`Sitemap guide missing from topics: ${path}`);
    }
    return {
      path: page.path,
      changeFrequency: "monthly" as const,
      priority: page.priority,
      lastModified: page.publishedAt,
    };
  });
  const routes = [...marketingPaths, ...topicRoutes, ...guideRoutes];

  return routes.map((route) => ({
    url: `${origin}${route.path === "/" ? "" : route.path}`,
    lastModified: new Date(`${route.lastModified ?? defaultLastModified}T00:00:00.000Z`),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
