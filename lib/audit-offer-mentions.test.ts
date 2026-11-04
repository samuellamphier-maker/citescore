import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { register } from "node:module";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

register("./alias-hook.mjs", import.meta.url);

const { blogIndexDescription, blogPosts, marketingPaths } = await import("./content/blog.ts");
const { topicPages } = await import("./content/topics.ts");
const { searchSnippetOverrides } = await import("./content/search-snippets.ts");
const { citeScoreLlmsTxt } = await import("./llms-txt.ts");
const { site } = await import("./site.ts");

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dedicatedPath = "/geo-audit";
const maxOtherMentions = 1;

const skipFiles = new Set([
  resolve(root, "lib/site.ts"),
  resolve(root, "lib/content/search-snippets.ts"),
  resolve(root, "lib/content/topics.ts"),
  resolve(root, "lib/content/blog.ts"),
  resolve(root, "lib/email/resend.ts"),
  resolve(root, "lib/llms-txt.ts"),
]);

function countDollars(text: string) {
  return text.match(/\$39(?!\d)/g)?.length ?? 0;
}

function stripComments(source: string) {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^\w:])\/\/.*$/gm, "$1");
}

function resolveImport(spec: string, fromFile: string) {
  let base = "";
  if (spec.startsWith("@/")) base = join(root, spec.slice(2));
  else if (spec.startsWith(".")) base = resolve(dirname(fromFile), spec);
  else return null;
  for (const candidate of [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    join(base, "index.ts"),
    join(base, "index.tsx"),
  ]) {
    try {
      if (statSync(candidate).isFile()) return candidate;
    } catch {
      // try the next extension
    }
  }
  return null;
}

function pageEntry(path: string) {
  if (path === "/") return join(root, "app/page.tsx");
  if (path === "/llms.txt") return join(root, "app/llms.txt/route.ts");
  if (path.startsWith("/blog/") && path !== "/blog") return join(root, "app/blog/[slug]/page.tsx");
  return join(root, "app", path.slice(1), "page.tsx");
}

function walk(entry: string, seen = new Set<string>()): string {
  if (seen.has(entry) || skipFiles.has(entry)) return "";
  seen.add(entry);
  let source = "";
  try {
    source = readFileSync(entry, "utf8");
  } catch {
    return "";
  }
  const text = stripComments(source);
  const labels = text.match(/(?<![A-Za-z])priceLabel\b/g)?.length ?? 0;
  let rendered = text;
  if (labels > 0) rendered += `\n${"$39".repeat(labels)}`;
  for (const match of source.matchAll(/from\s+["']([^"']+)["']/g)) {
    const next = resolveImport(match[1], entry);
    if (next) rendered += `\n${walk(next, seen)}`;
  }
  return rendered;
}

function dataText(path: string, pageSource: string) {
  const parts: string[] = [];
  const topic = topicPages.find((item) => item.path === path);
  if (topic) parts.push(topic.title, topic.description, topic.card);
  const post = blogPosts.find((item) => `/blog/${item.slug}` === path);
  if (post) parts.push(post.title, post.description);
  if (path === "/blog") {
    parts.push(
      blogIndexDescription,
      ...blogPosts.flatMap((item) => [item.title, item.description]),
    );
  }
  if (pageSource.includes("page.card") || pageSource.includes("topicPages.map")) {
    for (const item of topicPages) parts.push(item.title, item.card, item.description);
  }
  const snippet = searchSnippetOverrides[path];
  if (snippet?.title) parts.push(snippet.title);
  if (snippet?.description) parts.push(snippet.description);
  return parts.join("\n");
}

function sitemapPaths() {
  return [
    ...new Set([
      ...marketingPaths.map((item) => item.path),
      ...topicPages.map((item) => item.path),
    ]),
  ];
}

test("sitemap pages other than /geo-audit mention $39 at most once", () => {
  const offenders: string[] = [];
  for (const path of sitemapPaths()) {
    if (path === dedicatedPath) continue;
    const seen = new Set<string>();
    const entry = pageEntry(path);
    const rendered =
      path === "/llms.txt"
        ? citeScoreLlmsTxt()
        : `${walk(entry, seen)}\n${walk(join(root, "app/layout.tsx"), seen)}\n${dataText(path, readFileSync(entry, "utf8"))}`;
    const count = countDollars(rendered);
    if (count > maxOtherMentions) offenders.push(`${path} (${count})`);
  }
  assert.deepEqual(offenders, []);
});

test("the $39 audit stays purchasable from /geo-audit and checkout", () => {
  assert.equal(site.price, 39);
  assert.equal(site.priceLabel, "$39");
  const geoAudit = readFileSync(join(root, "app/geo-audit/page.tsx"), "utf8");
  const form = readFileSync(join(root, "components/AuditForm.tsx"), "utf8");
  const checkout = readFileSync(join(root, "app/checkout/page.tsx"), "utf8");
  assert.match(geoAudit, /<AuditForm/);
  assert.match(geoAudit, /price: String\(site\.price\)/);
  assert.match(form, /Get the \$39 audit/);
  assert.match(form, /\/checkout\?url=/);
  assert.match(checkout, /<AuditCheckout/);
  assert.match(checkout, /\$\{site\.priceLabel\} GEO audit/);
});
