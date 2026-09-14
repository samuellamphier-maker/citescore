import type { MetadataRoute } from "next";
import { marketingPaths } from "@/lib/content/blog";
import { publicOrigin } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = publicOrigin();
  const lastModified = new Date("2026-09-14T00:00:00.000Z");

  return marketingPaths.map((route) => ({
    url: `${origin}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
