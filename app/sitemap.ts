import type { MetadataRoute } from "next";
import { marketingPaths } from "@/lib/content/blog";
import { topicPages } from "@/lib/content/topics";
import { publicOrigin } from "@/lib/site";

const defaultLastModified = "2026-09-14";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = publicOrigin();
  const routes = [
    ...marketingPaths,
    ...topicPages.map((page) => ({
      path: page.path,
      changeFrequency: "monthly" as const,
      priority: page.priority,
      lastModified: page.publishedAt,
    })),
  ];

  return routes.map((route) => ({
    url: `${origin}${route.path === "/" ? "" : route.path}`,
    lastModified: new Date(`${route.lastModified ?? defaultLastModified}T00:00:00.000Z`),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
