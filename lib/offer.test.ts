import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { marketingPaths } from "./content/blog.ts";
import { industrySnapshotLabel } from "./industry-snapshot.ts";
import { freeCheckAuditPitch } from "./free-check-pitch.ts";

test("Fix Pack checkout URL is a single empty constant", () => {
  const source = readFileSync(new URL("./site.ts", import.meta.url), "utf8");
  assert.match(source, /export const FIX_PACK_CHECKOUT_URL = "";/);
  assert.match(source, /Request the Fix Pack/);
  assert.match(source, /mailto:\$\{contactEmail\}/);
});

test("sitemap sources include the new offer and trust URLs", () => {
  const paths = new Set(marketingPaths.map((item) => item.path));
  for (const path of [
    "/fix-pack",
    "/refunds",
    "/terms",
    "/privacy",
    "/sample-snapshot",
  ]) {
    assert.equal(paths.has(path), true, path);
  }
});

test("every industry visibility path has a snapshot label", () => {
  const industries = [
    "/ai-search-visibility-for-plumbers",
    "/ai-search-visibility-for-b2b-saas",
    "/ai-search-visibility-for-hvac",
  ];
  assert.equal(industrySnapshotLabel("/ai-search-visibility-for-plumbers"), "plumber");
  assert.equal(industrySnapshotLabel("/ai-search-visibility-for-b2b-saas"), "B2B SaaS");
  assert.equal(industrySnapshotLabel("/ai-search-visibility-for-hvac"), "HVAC");
  assert.equal(industrySnapshotLabel("/geo-audit"), null);
  for (const path of industries) assert.ok(industrySnapshotLabel(path));
});

test("a missing llms.txt is not pitched as a citation issue", () => {
  const pitch = freeCheckAuditPitch({
    homepage: { reachable: true, hasMetaDescription: true },
    robots: {
      found: true,
      gptBot: "allow",
      perplexityBot: "allow",
      googleExtended: "allow",
    },
    llmsTxt: { found: false },
    sitemap: { found: true },
    schema: { found: true },
  });
  assert.doesNotMatch(pitch.heading, /llms\.txt/i);
  assert.doesNotMatch(pitch.detail, /llms\.txt is missing/i);
  assert.match(pitch.heading, /five public-file basics/);
});
