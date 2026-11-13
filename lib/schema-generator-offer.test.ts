import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import { marketingPaths } from "./content/blog.ts";
import { topicPages } from "./content/topics.ts";
import { schemaGeneratorAudience, schemaIndustries } from "./industry-snapshot.ts";

const shell = readFileSync(new URL("../components/ArticleShell.tsx", import.meta.url), "utf8");
const lead = readFileSync(new URL("../components/SchemaGeneratorLead.tsx", import.meta.url), "utf8");
const nextConfig = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");

test("schema generator audience names the trade without inventing a result", () => {
  assert.equal(schemaGeneratorAudience(), "your trade in your city");
  assert.equal(schemaGeneratorAudience("plumber"), "a plumber in your city");
  assert.equal(schemaGeneratorAudience("electrician"), "an electrician in your city");
  assert.equal(schemaGeneratorAudience("dental"), "a dentist in your city");
  assert.equal(schemaGeneratorAudience("local"), "a local business in your city");
  assert.equal(schemaGeneratorAudience("law firm"), "a law firm in your city");
  assert.equal(schemaGeneratorAudience("real estate"), "a real estate agent in your city");
  for (const industry of new Set(Object.values(schemaIndustries))) {
    const phrase = schemaGeneratorAudience(industry);
    assert.match(phrase, /in your city$/);
    assert.doesNotMatch(phrase, /^a local in your city$/);
  }
});

test("schema generator pages lead with the snapshot and Fix Pack above the form", () => {
  const leadAt = shell.indexOf("<SchemaGeneratorLead");
  const formAt = shell.indexOf("<InlineSnapshotRequest");
  const childrenAt = shell.indexOf("{children}");
  assert.ok(leadAt !== -1 && formAt !== -1 && childrenAt !== -1);
  assert.ok(leadAt < formAt && formAt < childrenAt);
  assert.match(shell, /schemaGenerator \? <p>\{dek\}<\/p> : null/);
  assert.match(lead, /Free AI Answer Snapshot/);
  assert.match(lead, /When customers ask ChatGPT or Perplexity for \{audience\}/);
  assert.match(lead, /logged-out ChatGPT and/);
  const questionAt = lead.indexOf("When customers ask ChatGPT or Perplexity");
  const ctaAt = lead.indexOf("data-funnel-cta");
  const explainsAt = lead.indexOf("logged-out ChatGPT and");
  assert.ok(questionAt !== -1 && ctaAt > questionAt && explainsAt > ctaAt);
  assert.match(lead, /It does not make an assistant name the business/);
  assert.match(lead, /href="#snapshot"/);
  assert.match(lead, /\{snapshotRequestCtaLabel\}/);
  assert.match(lead, /<FixPackBuyLink/);
  assert.match(lead, /fixPackIntroPriceLabel/);
  assert.match(lead, /fixPackDetailsCtaLabel/);
  assert.match(lead, /href="\/sample-snapshot"/);
  assert.match(lead, /href="\/fix-pack"/);
  assert.match(lead, /Prepared by the CiteScore Team/);
  assert.match(lead, /illustrative numbers/);
  assert.doesNotMatch(lead, /Samuel|Lamphier|testimonial|customers served|% of|guarantee/i);
  assert.equal(
    topicPages.filter((page) => page.path.endsWith("-schema-generator")).length > 10,
    true,
  );
});

test("schema pages no longer say assistant parsers read the script", () => {
  const pages = readdirSync(new URL("../app", import.meta.url), { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.endsWith("-schema-generator"))
    .map((entry) => entry.name);
  assert.ok(pages.includes("plumber-schema-generator"));
  assert.ok(pages.includes("faq-schema-generator"));
  for (const page of pages) {
    const source = readFileSync(new URL(`../app/${page}/page.tsx`, import.meta.url), "utf8");
    assert.doesNotMatch(source, /including the ones behind/, page);
    assert.doesNotMatch(source, /can use that label when they extract/, page);
  }
});

test("/case-study and /before-after redirect to the example snapshot and stay out of the sitemap", () => {
  const indexed = new Set([
    ...marketingPaths.map((item) => item.path),
    ...topicPages.map((item) => item.path),
  ]);
  for (const source of ["/case-study", "/before-after"]) {
    assert.match(
      nextConfig,
      new RegExp(
        `source:\\s*"${source}",\\s*destination:\\s*"/sample-snapshot",\\s*permanent:\\s*true`,
      ),
      source,
    );
    assert.equal(existsSync(new URL(`../app${source}/page.tsx`, import.meta.url)), false);
    assert.equal(indexed.has(source), false, source);
  }
  assert.equal(indexed.has("/sample-snapshot"), true);
  assert.equal(existsSync(new URL("../app/sample-snapshot/page.tsx", import.meta.url)), true);
});
