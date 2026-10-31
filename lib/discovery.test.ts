import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { register } from "node:module";
import { test } from "node:test";

register("./alias-hook.mjs", import.meta.url);

const { blogPosts, marketingPaths } = await import("./content/blog.ts");
const { guideGroups } = await import("./content/guides.ts");
const { topicPages } = await import("./content/topics.ts");
const { citeScoreRss, rssPubDate } = await import("./rss.ts");
const { productionOrigin } = await import("./site.ts");

const nextConfig = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const header = readFileSync(new URL("../components/SiteHeader.tsx", import.meta.url), "utf8");
const footer = readFileSync(new URL("../components/SiteFooter.tsx", import.meta.url), "utf8");
const guidesPage = readFileSync(new URL("../app/guides/page.tsx", import.meta.url), "utf8");
const rssRoute = readFileSync(new URL("../app/rss.xml/route.ts", import.meta.url), "utf8");
const manifest = readFileSync(new URL("../app/manifest.ts", import.meta.url), "utf8");
const meta = readFileSync(new URL("./content/meta.ts", import.meta.url), "utf8");

const invented =
  /Samuel|Lamphier|testimonial|customers served|guarantee|\b(John|Jane)\b/i;

test("guides hub lists every Guide page and links the snapshot and Fix Pack", () => {
  const groups = guideGroups();
  const listed = groups.flatMap((group) => group.pages.map((page) => page.path));
  const expected = topicPages.filter((page) => page.kicker === "Guide").map((page) => page.path);
  assert.equal(listed.length, expected.length);
  assert.deepEqual(new Set(listed), new Set(expected));
  for (const group of groups) {
    assert.ok(group.pages.length > 0, group.id);
  }
  assert.match(guidesPage, /id=\{group\.id\}/);
  assert.match(guidesPage, /guideGroups\(\)/);
  assert.match(guidesPage, /href="\/free-snapshot"/);
  assert.match(guidesPage, /href="\/fix-pack"/);
  assert.match(guidesPage, /FixPackBuyLink/);
  assert.match(guidesPage, /CiteScore Team/);
  assert.match(guidesPage, /blogPosts/);
  assert.doesNotMatch(guidesPage, invented);
  assert.equal(marketingPaths.some((item) => item.path === "/guides"), true);
  assert.match(header, /href="\/guides"/);
  assert.match(footer, /href="\/guides"/);
  assert.match(home, /href="\/guides"/);
});

test("rss.xml lists each blog post and is linked from the head", () => {
  const xml = citeScoreRss(productionOrigin);
  assert.match(xml, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.match(xml, /<rss version="2\.0">/);
  assert.match(xml, /<title>CiteScore<\/title>/);
  for (const post of blogPosts) {
    const url = `${productionOrigin}/blog/${post.slug}`;
    assert.match(xml, new RegExp(`<title>${post.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</title>`));
    assert.match(xml, new RegExp(`<link>${url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</link>`));
    assert.match(
      xml,
      new RegExp(`<description>${post.description.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</description>`),
    );
    assert.match(xml, new RegExp(`<pubDate>${rssPubDate(post.publishedAt)}</pubDate>`));
  }
  assert.equal((xml.match(/<item>/g) ?? []).length, blogPosts.length);
  assert.doesNotMatch(xml, invented);
  assert.match(rssRoute, /application\/rss\+xml; charset=utf-8/);
  assert.match(rssRoute, /citeScoreRss/);
  assert.match(rssRoute, /dynamic = "force-static"/);
  assert.match(meta, /application\/rss\+xml/);
  assert.match(meta, /rssFeedPath = "\/rss\.xml"/);
  assert.match(layout, /rssFeedAlternate/);
  assert.match(home, /rssFeedAlternate/);
});

test("discovery aliases permanently redirect and the manifest names CiteScore", () => {
  assert.match(
    nextConfig,
    /source:\s*"\/site\.webmanifest",\s*destination:\s*"\/manifest\.webmanifest",\s*permanent:\s*true/,
  );
  assert.match(
    nextConfig,
    /source:\s*"\/feed\.xml",\s*destination:\s*"\/rss\.xml",\s*permanent:\s*true/,
  );
  assert.match(
    nextConfig,
    /source:\s*"\/guarantee",\s*destination:\s*"\/refunds",\s*permanent:\s*true/,
  );
  assert.match(manifest, /name: "CiteScore"/);
  assert.match(manifest, /short_name: "CiteScore"/);
  assert.match(manifest, /background_color: "#f3eee4"/);
  assert.match(manifest, /theme_color: "#1b1814"/);
  assert.match(manifest, /src: "\/apple-touch-icon\.png"/);
  assert.match(manifest, /src: "\/icon\.svg"/);
  assert.doesNotMatch(manifest, invented);
});

test("favicon and app icons are the brand files browsers request", () => {
  const favicon = readFileSync(new URL("../app/favicon.ico", import.meta.url));
  const icon = readFileSync(new URL("../app/icon.png", import.meta.url));
  const apple = readFileSync(new URL("../app/apple-icon.png", import.meta.url));
  const touch = readFileSync(new URL("../public/apple-touch-icon.png", import.meta.url));
  const svg = readFileSync(new URL("../app/icon.svg", import.meta.url), "utf8");
  assert.equal(favicon.subarray(0, 4).toString("hex"), "00000100");
  assert.equal(icon.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.equal(apple.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.equal(touch.equals(apple), true);
  assert.match(svg, /#1B1814/);
  assert.match(svg, /#F3EEE4/);
  assert.match(svg, /#B24A22/);
  assert.equal(existsSync(new URL("../public/icon-192.png", import.meta.url)), true);
  assert.equal(existsSync(new URL("../public/icon-512.png", import.meta.url)), true);
});
