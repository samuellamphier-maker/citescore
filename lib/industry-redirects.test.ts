import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import { marketingPaths } from "./content/blog.ts";
import { topicPages } from "./content/topics.ts";
import { industryGuideRedirects, industryGuideSlugs } from "./industry-redirects.ts";

const prefix = "ai-search-visibility-for-";

test("guessed trade URLs permanently redirect to the published industry guides", () => {
  const published = readdirSync(new URL("../app", import.meta.url), { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith(prefix))
    .map((entry) => entry.name.slice(prefix.length))
    .sort();
  assert.deepEqual([...industryGuideSlugs].sort(), published);

  const indexed = new Set([
    ...marketingPaths.map((item) => item.path),
    ...topicPages.map((item) => item.path),
  ]);
  const redirects = industryGuideRedirects();
  const sources = new Set<string>();
  assert.equal(redirects.length, industryGuideSlugs.length * 3);

  for (const redirect of redirects) {
    assert.equal(redirect.permanent, true);
    assert.equal(sources.has(redirect.source), false, redirect.source);
    sources.add(redirect.source);
    const slug = industryGuideSlugs.find(
      (item) =>
        redirect.source === `/geo-for-${item}` ||
        redirect.source === `/for-${item}` ||
        redirect.source === `/${item}`,
    );
    assert.equal(redirect.destination, `/ai-search-visibility-for-${slug}`);
    assert.equal(existsSync(new URL(`../app${redirect.source}/page.tsx`, import.meta.url)), false);
    assert.equal(existsSync(new URL(`../app${redirect.source}/route.ts`, import.meta.url)), false);
    assert.equal(existsSync(new URL(`../app${redirect.destination}/page.tsx`, import.meta.url)), true);
    assert.equal(indexed.has(redirect.source), false, redirect.source);
    assert.equal(indexed.has(redirect.destination), true, redirect.destination);
  }

  assert.equal(sources.has("/geo-for-local-businesses"), false);
  assert.equal(sources.has("/for-agencies"), false);
  assert.equal(existsSync(new URL("../app/geo-for-local-businesses/page.tsx", import.meta.url)), true);
  assert.equal(existsSync(new URL("../app/for-agencies/page.tsx", import.meta.url)), true);

  const nextConfig = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
  assert.match(nextConfig, /\.\.\.industryGuideRedirects\(\)/);
  for (const source of sources) {
    assert.doesNotMatch(
      nextConfig,
      new RegExp(`source:\\s*"${source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`),
    );
  }
});
