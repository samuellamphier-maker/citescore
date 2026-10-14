import type { MetadataRoute } from "next";
import { marketingPaths } from "@/lib/content/blog";
import { topicPages } from "@/lib/content/topics";
import { publicOrigin } from "@/lib/site";

const defaultLastModified = "2026-09-14";

const addedGuidePaths = [
  "/how-to-get-cited-by-claude",
  "/how-to-get-cited-by-gemini",
  "/how-to-get-cited-by-copilot",
  "/geo-for-local-businesses",
  "/llms-txt-best-practices",
  "/ai-search-visibility-for-ecommerce",
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
