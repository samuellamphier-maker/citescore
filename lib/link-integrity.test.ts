import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import { blogPosts, marketingPaths } from "./content/blog.ts";
import { topicPages } from "./content/topics.ts";
import { industryGuideRedirects } from "./industry-redirects.ts";

const nextConfig = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");

function redirectSources() {
  const configured = [...nextConfig.matchAll(/source:\s*"([^"]+)"/g)].map((match) => match[1]);
  return new Set([...configured, ...industryGuideRedirects().map((item) => item.source)]);
}

function indexedPaths() {
  return [...new Set([...marketingPaths.map((item) => item.path), ...topicPages.map((item) => item.path)])];
}

function pageExists(path: string) {
  if (path.startsWith("/blog/") && blogPosts.some((post) => `/blog/${post.slug}` === path)) {
    return existsSync(new URL("../app/blog/[slug]/page.tsx", import.meta.url));
  }
  const rel = path === "/" ? "/page.tsx" : `${path}/page.tsx`;
  const route = path === "/" ? "/route.ts" : `${path}/route.ts`;
  return (
    existsSync(new URL(`../app${rel}`, import.meta.url)) ||
    existsSync(new URL(`../app${route}`, import.meta.url))
  );
}

test("snapshot and Fix Pack actions each use one label", () => {
  const site = readFileSync(new URL("./site.ts", import.meta.url), "utf8");
  assert.match(site, /export const snapshotRequestCtaLabel = "Get a free AI Answer Snapshot"/);
  assert.match(site, /return `Fix Pack, \$\{fixPackIntroPriceLabel\}`/);
  assert.match(site, /export const fixPackDetailsCtaLabel = "See what's in the Fix Pack"/);
  assert.match(site, /return `Get the Fix Pack · \$\{fixPackIntroPriceLabel\}`/);
  assert.match(site, /return fixPackGetCtaLabel\(\)/);
  assert.doesNotMatch(site, /Buy the Fix Pack/);
});

test("sitemap paths are real pages and are not redirect sources", () => {
  const sources = redirectSources();
  const paths = indexedPaths();
  assert.ok(paths.includes("/"));
  assert.ok(paths.includes("/free-snapshot"));
  assert.ok(paths.includes("/llms.txt"));
  for (const path of paths) {
    assert.equal(sources.has(path), false, path);
    assert.equal(pageExists(path), true, path);
  }
});

test("rendered internal links do not point at redirect sources", () => {
  const sources = redirectSources();
  const roots = [new URL("../app/", import.meta.url), new URL("../components/", import.meta.url)];
  const files: URL[] = [];
  function walk(dir: URL) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const next = new URL(entry.isDirectory() ? `${entry.name}/` : entry.name, dir);
      if (entry.isDirectory()) walk(next);
      else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) files.push(next);
    }
  }
  for (const root of roots) walk(root);

  const hrefPattern = /href=(?:\{)?["'`]([^"'`?#]+)["'`]/g;
  for (const file of files) {
    const source = readFileSync(file, "utf8");
    for (const match of source.matchAll(hrefPattern)) {
      const href = match[1];
      if (!href.startsWith("/")) continue;
      assert.equal(sources.has(href), false, `${file.pathname} -> ${href}`);
    }
  }
});

test("header, footer, and legal pages use the snapshot request CTA", () => {
  const header = readFileSync(new URL("../components/SiteHeader.tsx", import.meta.url), "utf8");
  const footer = readFileSync(new URL("../components/SiteFooter.tsx", import.meta.url), "utf8");
  const sticky = readFileSync(new URL("../components/TradeGuideStickyCta.tsx", import.meta.url), "utf8");
  assert.match(header, /\{snapshotRequestCtaLabel\}/);
  assert.match(header, /\{fixPackPageLinkLabel\(\)\}/);
  assert.match(footer, /\{snapshotRequestCtaLabel\}/);
  assert.match(footer, /\{fixPackPageLinkLabel\(\)\}/);
  assert.match(sticky, /const label = snapshotRequestCtaLabel/);
  assert.doesNotMatch(footer, /href="\/free-check">Free AI Answer Snapshot/);
  assert.doesNotMatch(footer, /href="\/geo-audit">Free AI Answer Snapshot/);

  const funnel = readFileSync(new URL("../components/FunnelCtaRow.tsx", import.meta.url), "utf8");
  assert.match(funnel, /snapshotHref = "\/free-snapshot"/);
  assert.match(funnel, /href=\{snapshotHref\}/);
  assert.match(funnel, /\{snapshotRequestCtaLabel\}/);
  assert.match(funnel, /data-funnel-cta/);
  assert.match(funnel, /fixPackGetCtaLabel\(\)/);
  for (const path of ["privacy", "terms", "refunds"]) {
    const page = readFileSync(new URL(`../app/${path}/page.tsx`, import.meta.url), "utf8");
    assert.match(page, /<FunnelCtaRow/);
  }
});
