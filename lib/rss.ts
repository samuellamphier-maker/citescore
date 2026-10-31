import { blogIndexDescription, blogPosts } from "@/lib/content/blog";
import { publicOrigin, site } from "@/lib/site";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/** RFC 822 date from a repo YYYY-MM-DD publishedAt. */
export function rssPubDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00.000Z`).toUTCString();
}

/** RSS 2.0 feed of the blog posts stored in the repo. */
export function citeScoreRss(origin = publicOrigin()) {
  const posts = [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const lastBuild = posts[0]?.publishedAt;
  const lines = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<rss version="2.0">`,
    `<channel>`,
    `<title>${escapeXml(site.name)}</title>`,
    `<link>${escapeXml(`${origin}/blog`)}</link>`,
    `<description>${escapeXml(blogIndexDescription)}</description>`,
    `<language>en</language>`,
  ];
  if (lastBuild) {
    lines.push(`<lastBuildDate>${rssPubDate(lastBuild)}</lastBuildDate>`);
  }
  for (const post of posts) {
    const url = `${origin}/blog/${post.slug}`;
    lines.push(
      `<item>`,
      `<title>${escapeXml(post.title)}</title>`,
      `<link>${escapeXml(url)}</link>`,
      `<guid isPermaLink="true">${escapeXml(url)}</guid>`,
      `<description>${escapeXml(post.description)}</description>`,
      `<pubDate>${rssPubDate(post.publishedAt)}</pubDate>`,
      `</item>`,
    );
  }
  lines.push(`</channel>`, `</rss>`, ``);
  return lines.join("\n");
}
