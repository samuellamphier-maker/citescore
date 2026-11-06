import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { register } from "node:module";
import { test } from "node:test";
import type { Metadata } from "next";

register("./alias-hook.mjs", import.meta.url);

const { blogIndexDescription, blogPosts, marketingPaths } = await import("./content/blog.ts");
const { pageMeta } = await import("./content/meta.ts");
const { searchSnippetOverrides } = await import("./content/search-snippets.ts");
const { topicPages } = await import("./content/topics.ts");
const {
  contactEmail,
  fixPackIntroPriceLabel,
  sellerName,
  site,
} = await import("./site.ts");

const TITLE_LIMIT = 65;
const DESCRIPTION_LIMIT = 160;
const TARGET_TITLE = 60;
const DESCRIPTION_MIN = 120;
const DESCRIPTION_MAX = 155;

const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const llmsRoute = readFileSync(new URL("../app/llms.txt/route.ts", import.meta.url), "utf8");
const blogPostPage = readFileSync(new URL("../app/blog/[slug]/page.tsx", import.meta.url), "utf8");

function sitemapPaths() {
  return [...new Set([...marketingPaths.map((item) => item.path), ...topicPages.map((page) => page.path)])];
}

function pageFile(path: string) {
  if (path === "/") return new URL("../app/page.tsx", import.meta.url);
  if (path === "/llms.txt") return new URL("../app/llms.txt/route.ts", import.meta.url);
  if (path.startsWith("/blog/") && path !== "/blog") {
    return new URL("../app/blog/[slug]/page.tsx", import.meta.url);
  }
  return new URL(`../app${path}/page.tsx`, import.meta.url);
}

function readPage(path: string) {
  return readFileSync(pageFile(path), "utf8");
}

/** Titles and descriptions the page passes into `pageMeta` before overrides. */
const marketingInput: Record<string, { title: string; description: string }> = {
  "/blog": {
    title: "GEO guides",
    description: blogIndexDescription,
  },
  "/alternatives": {
    title: "CiteScore alternatives",
    description:
      "How the free AI Answer Snapshot and the Fix Pack compare with Otterly, Profound, and Peec AI — ongoing AI-visibility monitors — and when to buy which.",
  },
  "/sample": {
    title: "Sample report — Northbound",
    description:
      "A fictional CiteScore audit for Northbound, a sample SaaS product. Labeled as a sample throughout.",
  },
  "/about": {
    title: "About",
    description: `CiteScore is operated by the CiteScore Team. The free AI Answer Snapshot and the ${fixPackIntroPriceLabel} Fix Pack are sold by ${sellerName}. Contact ${contactEmail}.`,
  },
  "/trust": {
    title: "Trust",
    description: `Who sells CiteScore: the free AI Answer Snapshot and the ${fixPackIntroPriceLabel} Fix Pack, sold by ${sellerName}. Operated by the CiteScore Team. Contact ${contactEmail}.`,
  },
  "/contact": {
    title: "Contact",
    description: `Questions about CiteScore: email ${contactEmail}. Include the business name, website, and city or trade.`,
  },
  "/privacy": {
    title: "Privacy",
    description: `How ${sellerName} handles URLs, snapshot requests, and language-model processing. Contact ${contactEmail}.`,
  },
  "/terms": {
    title: "Terms of Service",
    description: "Terms for CiteScore digital audits, the Fix Pack, and downloads sold by CiteScore.",
  },
  "/refunds": {
    title: "Refunds",
    description: `Full refund within 14 days if the CiteScore Fix Pack is not useful. Sold by ${sellerName}. Contact ${contactEmail}.`,
  },
  "/guides": { title: "Guides", description: "x" },
  "/industries": { title: "Industries", description: "x" },
  "/tools": { title: "Tools", description: "x" },
  "/geo-audit": {
    title: `Free AI Answer Snapshot and Fix Pack, ${fixPackIntroPriceLabel}`,
    description: "x",
  },
  "/alternatives/otterly": {
    title: "CiteScore vs Otterly",
    description: "x",
  },
  "/sample-snapshot": { title: "Example AI Answer Snapshot", description: "x" },
  "/sample-fix-pack": {
    title: `Sample Fix Pack: what you get for ${fixPackIntroPriceLabel}`,
    description: "x",
  },
  "/free-snapshot": { title: "Free AI Answer Snapshot", description: "x" },
  "/checklist": { title: "AI Citation Readiness Checklist", description: "x" },
  "/for-agencies": { title: "Free snapshot and Fix Pack for agencies", description: "x" },
  "/vs-agency": {
    title: "Fix Pack vs an agency retainer",
    description: `The Fix Pack is ${fixPackIntroPriceLabel} once, for one business, one city, and one service. An agency retainer is monthly. This page does not publish that fee.`,
  },
  "/done-for-you-audit": {
    title: `Free snapshot first, then the Fix Pack, ${fixPackIntroPriceLabel}`,
    description: "x",
  },
  "/pricing": { title: "Pricing", description: "x" },
  "/how-it-works": { title: "How it works", description: "x" },
  "/methodology": { title: "Methodology", description: "x" },
  "/faq": { title: "FAQ", description: "x" },
  "/fix-pack": {
    title: `AI Visibility Fix Pack, ${fixPackIntroPriceLabel}`,
    description: "x",
  },
};

function passedCopy(path: string) {
  const topic = topicPages.find((page) => page.path === path);
  if (topic) return { title: topic.title, description: topic.description };
  const post = blogPosts.find((item) => `/blog/${item.slug}` === path);
  if (post) return { title: post.title, description: post.description };
  const marketing = marketingInput[path];
  if (!marketing) throw new Error(`No metadata input for ${path}`);
  const description = searchSnippetOverrides[path] ? "y".repeat(400) : marketing.description;
  return { title: marketing.title, description };
}

function headFromMetadata(metadata: Metadata) {
  const description = metadata.description;
  assert.equal(typeof description, "string", "meta description should be a string");
  const titleField = metadata.title;
  let title: string;
  if (typeof titleField === "string") {
    title = `${titleField} · ${site.name}`;
  } else if (
    titleField &&
    typeof titleField === "object" &&
    "absolute" in titleField &&
    typeof titleField.absolute === "string"
  ) {
    title = titleField.absolute;
  } else {
    assert.fail(`Unexpected title metadata: ${JSON.stringify(titleField)}`);
  }
  const openGraph = metadata.openGraph;
  const twitter = metadata.twitter;
  assert.equal(openGraph?.title, title);
  assert.equal(openGraph?.description, description);
  assert.equal(twitter?.title, title);
  assert.equal(twitter?.description, description);
  return { title, description: description as string };
}

test("sitemap titles stay within 65 characters and descriptions within 160", () => {
  assert.match(layout, /template:\s*`%s · \$\{site\.name\}`/);
  const paths = sitemapPaths();
  assert.equal(paths.length, 119);

  const homeTitle = `${site.name} — ${site.tagline}`;
  assert.ok(homeTitle.length <= TITLE_LIMIT, `/: title ${homeTitle.length}`);
  assert.ok(site.description.length <= DESCRIPTION_LIMIT, `/: description ${site.description.length}`);
  assert.match(layout, /description: site\.description/);
  assert.equal(home.includes("description:"), false);
  assert.match(home, /openGraph: \{ \.\.\.rootOpenGraph, url: "\/" \}/);

  assert.match(llmsRoute, /text\/plain; charset=utf-8/);
  assert.equal(llmsRoute.includes("pageMeta"), false);

  for (const path of paths) {
    if (path === "/" || path === "/llms.txt") continue;

    const source = readPage(path);
    assert.match(source, /pageMeta\(/, path);
    if (path.startsWith("/blog/") && path !== "/blog") {
      assert.match(blogPostPage, /path: `\/blog\/\$\{post\.slug\}`/);
    } else if (topicPages.some((page) => page.path === path)) {
      assert.match(source, new RegExp(`getTopic\\("${path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"\\)`));
      assert.match(source, /description: topic\.description/);
    } else {
      assert.match(source, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
      const title = passedCopy(path).title;
      const titleNeedle = source.includes(title)
        ? title
        : title.replaceAll(fixPackIntroPriceLabel, "").trim();
      assert.ok(source.includes(titleNeedle), `${path} title is not wired: ${titleNeedle}`);
      if (!searchSnippetOverrides[path]) {
        if (path === "/blog") {
          assert.match(source, /blogIndexDescription/);
        } else {
          const description = marketingInput[path]?.description;
          assert.ok(description, path);
          const descriptionNeedle = [description, ...description
            .split(fixPackIntroPriceLabel)
            .flatMap((part) => part.split(contactEmail))
            .flatMap((part) => part.split(sellerName))
            .map((part) => part.trim())]
            .find((part) => part.length > 20 && source.includes(part));
          assert.ok(descriptionNeedle, `${path} description is not wired`);
        }
      }
    }

    const input = passedCopy(path);
    const head = headFromMetadata(pageMeta({ ...input, path }));
    assert.ok(head.title.length <= TITLE_LIMIT, `${path} title ${head.title.length}: ${head.title}`);
    assert.ok(
      head.description.length <= DESCRIPTION_LIMIT,
      `${path} description ${head.description.length}`,
    );

    if (searchSnippetOverrides[path]) {
      assert.ok(head.title.length <= TARGET_TITLE, `${path} title ${head.title.length}: ${head.title}`);
      assert.ok(
        head.description.length >= DESCRIPTION_MIN && head.description.length <= DESCRIPTION_MAX,
        `${path} description ${head.description.length}: ${head.description}`,
      );
    }
  }
});

test("search snippet overrides replace long titles and descriptions passed by the page", () => {
  for (const path of Object.keys(searchSnippetOverrides)) {
    const head = headFromMetadata(
      pageMeta({
        title: "Too long to show in a search result without truncation from the layout suffix",
        description: "z".repeat(320),
        path,
      }),
    );
    if (searchSnippetOverrides[path]?.title) {
      assert.ok(head.title.length <= TARGET_TITLE, path);
      assert.equal(head.title.includes("Too long"), false, path);
    }
    if (searchSnippetOverrides[path]?.description) {
      assert.ok(
        head.description.length >= DESCRIPTION_MIN && head.description.length <= DESCRIPTION_MAX,
        path,
      );
      assert.equal(head.description.includes("z".repeat(40)), false, path);
    }
  }
});
