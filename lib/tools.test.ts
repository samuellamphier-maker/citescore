import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";
import { test } from "node:test";

register("./alias-hook.mjs", import.meta.url);

const { marketingPaths } = await import("./content/blog.ts");
const { topicPages } = await import("./content/topics.ts");
const { expectedToolHubPaths, toolGroups, toolPageLabel } = await import("./content/tools.ts");

const page = readFileSync(new URL("../app/tools/page.tsx", import.meta.url), "utf8");
const nextConfig = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
const header = readFileSync(new URL("../components/SiteHeader.tsx", import.meta.url), "utf8");
const footer = readFileSync(new URL("../components/SiteFooter.tsx", import.meta.url), "utf8");
const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");

const invented =
  /Samuel|Lamphier|testimonial|customers served|guarantee|\b(John|Jane)\b|% of/i;

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function appToolPaths() {
  const appDir = new URL("../app/", import.meta.url);
  return readdirSync(appDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => `/${entry.name}`)
    .filter(
      (path) =>
        path === "/free-check" || path.endsWith("-checker") || path.endsWith("-generator"),
    );
}

test("tools hub lists every existing free check, checker, and generator", () => {
  const groups = toolGroups();
  const listed = groups.flatMap((group) => group.pages.map((item) => item.path));
  const expected = expectedToolHubPaths();
  const onDisk = appToolPaths();
  assert.equal(listed.length, expected.length);
  assert.deepEqual(listed, expected);
  assert.equal(new Set(listed).size, listed.length);
  assert.deepEqual(new Set(listed), new Set(onDisk));
  for (const group of groups) {
    assert.ok(group.pages.length > 0, group.id);
    assert.doesNotMatch(group.intro, invented);
  }

  assert.equal(listed.includes("/free-check"), true);
  assert.equal(listed.includes("/ai-crawler-robots-txt-checker"), true);
  assert.equal(listed.includes("/llms-txt-generator"), true);
  assert.equal(listed.includes("/robots-txt-ai-crawler-generator"), true);
  assert.equal(listed.includes("/faq-schema-generator"), true);
  assert.equal(listed.includes("/organization-schema-generator"), true);
  assert.equal(listed.includes("/chatgpt-citation-check"), false);
  assert.equal(listed.includes("/llms-txt"), false);
  assert.equal(listed.includes("/aeo-checklist"), false);

  for (const itemPath of listed) {
    const topic = topicPages.find((item) => item.path === itemPath);
    assert.ok(topic, itemPath);
    assert.ok(topic.card.length > 0, itemPath);
    assert.equal(toolPageLabel(topic), topic.navLabel ?? topic.title);
    assert.equal(existsSync(new URL(`../app${itemPath}/page.tsx`, import.meta.url)), true, itemPath);
  }
});

test("tools page leads with the snapshot and Fix Pack and uses existing blurbs", () => {
  assert.match(page, /pageMeta\(\{/);
  assert.match(page, /path,/);
  assert.match(page, /title = "Tools"/);
  assert.match(page, /"@type": "BreadcrumbList"/);
  assert.match(page, /"@type": "ItemList"/);
  assert.match(page, /name: "Home"/);
  assert.match(page, /name: "Tools"/);
  assert.match(page, /CiteScore Team/);
  assert.match(page, /aria-label="Breadcrumb"/);
  assert.match(page, /aria-current="page">Tools/);
  assert.match(page, /Get a free AI Answer Snapshot/);
  assert.match(page, /href="\/free-snapshot"/);
  assert.match(page, /href="\/fix-pack"/);
  assert.match(page, /Fix Pack, \$\{fixPackIntroPriceLabel\}/);
  assert.match(page, /toolPageLabel\(page\)/);
  assert.match(page, /\{page\.card\}/);
  assert.match(page, /toolGroups\(\)/);
  assert.match(page, /id=\{group\.id\}/);
  assert.doesNotMatch(page, invented);
  assert.equal(marketingPaths.some((item) => item.path === "/tools"), true);
  assert.match(header, /href="\/tools"/);
  assert.match(footer, /href="\/tools"/);
  assert.match(home, /href="\/tools"/);
  const snapshotAt = page.indexOf('href="/free-snapshot"');
  const fixPackAt = page.indexOf('href="/fix-pack"');
  assert.ok(snapshotAt > -1 && fixPackAt > snapshotAt);
});

const guessedAliases = [
  { source: "/resources", destination: "/guides" },
  { source: "/glossary", destination: "/guides" },
  { source: "/chatgpt-visibility", destination: "/how-to-get-cited-by-chatgpt" },
  { source: "/perplexity", destination: "/how-to-get-cited-by-perplexity" },
  { source: "/ai-search", destination: "/answer-engine-optimization" },
  { source: "/local-seo", destination: "/industries" },
  { source: "/team", destination: "/about" },
  { source: "/press", destination: "/about" },
  { source: "/changelog", destination: "/about" },
  { source: "/status", destination: "/about" },
  { source: "/partners", destination: "/for-agencies" },
] as const;

test("guessed crawler URLs permanently redirect to pages that exist and stay out of the sitemap", () => {
  const indexed = new Set([
    ...marketingPaths.map((item) => item.path),
    ...topicPages.map((item) => item.path),
  ]);
  for (const { source, destination } of guessedAliases) {
    assert.match(
      nextConfig,
      new RegExp(
        `source:\\s*"${escapeRegExp(source)}",\\s*destination:\\s*"${escapeRegExp(destination)}",\\s*permanent:\\s*true`,
      ),
    );
    assert.equal(existsSync(new URL(`../app${source}/page.tsx`, import.meta.url)), false, source);
    assert.equal(existsSync(new URL(`../app${source}/route.ts`, import.meta.url)), false, source);
    assert.equal(indexed.has(source), false, source);
    assert.equal(existsSync(new URL(`../app${destination}/page.tsx`, import.meta.url)), true, destination);
    assert.equal(indexed.has(destination), true, destination);
  }
  assert.equal(indexed.has("/tools"), true);
  assert.doesNotMatch(
    nextConfig,
    /source:\s*"\/tools"/,
  );
});
