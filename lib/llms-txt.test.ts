import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { register } from "node:module";
import { test } from "node:test";

register("./alias-hook.mjs", import.meta.url);

const { marketingPaths } = await import("./content/blog.ts");
const { topicPages } = await import("./content/topics.ts");
const {
  contactEmail,
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  productionOrigin,
  sellerName,
  site,
} = await import("./site.ts");
const { citeScoreLlmsTxt, llmsTxtSections, sitemapSourcePaths } = await import(
  "./llms-txt.ts"
);

const nextConfig = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
const route = readFileSync(new URL("../app/llms.txt/route.ts", import.meta.url), "utf8");

const pageSources: Record<string, string> = {
  "/free-snapshot": readFileSync(new URL("../app/free-snapshot/page.tsx", import.meta.url), "utf8"),
  "/sample-snapshot": readFileSync(
    new URL("../app/sample-snapshot/page.tsx", import.meta.url),
    "utf8",
  ),
  "/fix-pack": readFileSync(new URL("../app/fix-pack/page.tsx", import.meta.url), "utf8"),
  "/how-it-works": readFileSync(new URL("../app/how-it-works/page.tsx", import.meta.url), "utf8"),
  "/pricing": readFileSync(new URL("../app/pricing/page.tsx", import.meta.url), "utf8"),
  "/faq": readFileSync(new URL("../app/faq/page.tsx", import.meta.url), "utf8"),
  "/about": readFileSync(new URL("../app/about/page.tsx", import.meta.url), "utf8"),
  "/contact": readFileSync(new URL("../app/contact/page.tsx", import.meta.url), "utf8"),
  "/terms": readFileSync(new URL("../app/terms/page.tsx", import.meta.url), "utf8"),
  "/privacy": readFileSync(new URL("../app/privacy/page.tsx", import.meta.url), "utf8"),
  "/refunds": readFileSync(new URL("../app/refunds/page.tsx", import.meta.url), "utf8"),
};

test("llms.txt follows the llmstxt.org section order and only restates published copy", () => {
  const text = citeScoreLlmsTxt();
  const lines = text.trimEnd().split("\n");
  assert.equal(lines[0], `# ${site.name}`);
  assert.equal(lines[1], "");
  assert.equal(lines[2], `> ${site.description}`);
  assert.equal(lines[3], "");
  assert.match(lines[4], /CiteScore Team/);
  assert.match(lines[4], new RegExp(contactEmail.replace(".", "\\.")));
  assert.equal(lines[4].startsWith(">"), false);
  assert.equal(text.endsWith("\n"), true);

  const headings = lines.filter((line) => line.startsWith("## "));
  assert.deepEqual(headings, ["## Offers", "## Site", "## Policies", "## Guides"]);
  assert.equal(lines.filter((line) => line.startsWith("# ")).length, 1);
  assert.equal(lines.some((line) => /^#{3,}\s/.test(line)), false);

  const known = sitemapSourcePaths();
  const linked = new Set<string>();
  for (const line of lines) {
    if (line.startsWith("## ")) {
      continue;
    }
    if (!line.startsWith("- ")) continue;
    const match = line.match(/^- \[([^\]]+)\]\(([^)]+)\): (.+)$/);
    assert.ok(match, line);
    const url = new URL(match[2]);
    assert.equal(url.origin, productionOrigin);
    assert.equal(known.has(url.pathname), true, url.pathname);
    linked.add(url.pathname);
    assert.equal(match[3].includes("\n"), false);
  }

  for (const path of [
    "/free-snapshot",
    "/sample-snapshot",
    "/fix-pack",
    "/how-it-works",
    "/pricing",
    "/faq",
    "/about",
    "/contact",
    "/terms",
    "/privacy",
    "/refunds",
  ]) {
    assert.equal(linked.has(path), true, path);
    assert.equal(known.has(path), true, path);
  }

  const guidePaths = llmsTxtSections.find((section) => section.heading === "Guides")?.links ?? [];
  assert.ok(guidePaths.length >= 5 && guidePaths.length <= 8);
  for (const link of guidePaths) {
    const page = topicPages.find((item) => item.path === link.path);
    assert.ok(page, link.path);
    assert.equal(link.note, page.description);
    assert.equal(link.title, page.navLabel ?? page.title);
    assert.equal(linked.has(link.path), true);
  }

  for (const section of llmsTxtSections) {
    if (section.heading === "Guides") continue;
    for (const link of section.links) {
      const source = pageSources[link.path];
      assert.ok(source, link.path);
      const fragments = link.note
        .replaceAll(contactEmail, "\n")
        .replaceAll(fixPackIntroPriceLabel, "\n")
        .replaceAll(fixPackListPriceLabel, "\n")
        .replaceAll(`sold by ${sellerName}`, "\n")
        .replaceAll(`Sold by ${sellerName}`, "\n")
        .replaceAll(`How ${sellerName} handles`, "\n")
        .split("\n")
        .map((part) => part.trim())
        .filter((part) => part.length > 20);
      assert.ok(fragments.length > 0, link.path);
      for (const fragment of fragments) {
        assert.equal(source.includes(fragment), true, `${link.path}: ${fragment}`);
      }
    }
  }

  assert.match(text, new RegExp(fixPackIntroPriceLabel.replace("$", "\\$")));
  assert.match(text, new RegExp(fixPackListPriceLabel.replace("$", "\\$")));
  assert.deepEqual(
    [...new Set(text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g))],
    [contactEmail],
  );
  assert.doesNotMatch(text, /Samuel|Lamphier|testimonial|customers served|guarantee/i);
  assert.doesNotMatch(text, /\/refund-policy|\/guarantee|\]\(https?:\/\/[^)]+\/refund\)/);
  assert.equal(marketingPaths.some((item) => item.path === "/llms.txt"), true);
});

test("/llms.txt is served as text/plain and the missing refund URLs redirect", () => {
  assert.match(route, /text\/plain; charset=utf-8/);
  assert.match(route, /citeScoreLlmsTxt/);
  assert.match(route, /dynamic = "force-static"/);
  assert.match(
    nextConfig,
    /source:\s*"\/refund",\s*destination:\s*"\/refunds",\s*permanent:\s*true/,
  );
  assert.match(
    nextConfig,
    /source:\s*"\/refund-policy",\s*destination:\s*"\/refunds",\s*permanent:\s*true/,
  );
  assert.doesNotMatch(nextConfig, /\/guarantee/);
});
