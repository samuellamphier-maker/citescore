import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { marketingPaths } from "./content/blog.ts";
import { isStickySnapshotContentPath } from "./industry-snapshot.ts";
import {
  sampleFixPackExampleBanner,
  sampleJsonLdText,
  sampleLocalBusinessJsonLd,
  sampleServiceJsonLd,
} from "./sample-fix-pack-example.ts";

const page = readFileSync(new URL("../app/sample-fix-pack/page.tsx", import.meta.url), "utf8");
const example = readFileSync(new URL("./sample-fix-pack-example.ts", import.meta.url), "utf8");
const fixPack = readFileSync(new URL("../app/fix-pack/page.tsx", import.meta.url), "utf8");
const pricing = readFileSync(new URL("../app/pricing/page.tsx", import.meta.url), "utf8");
const sampleSnapshot = readFileSync(
  new URL("../app/sample-snapshot/page.tsx", import.meta.url),
  "utf8",
);
const nextConfig = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
const industry = readFileSync(new URL("./industry-snapshot.ts", import.meta.url), "utf8");

const invented =
  /Samuel|Lamphier|testimonial|customers served|guarantee|few minutes|24 hours|48 hours|\b\d\.\d\b|%/i;

function assertPlaceholderJsonLd(data: object, type: string) {
  const text = sampleJsonLdText(data);
  const parsed = JSON.parse(text) as Record<string, unknown>;
  assert.equal(parsed["@context"], "https://schema.org");
  assert.equal(parsed["@type"], type);
  assert.equal(JSON.stringify(parsed), JSON.stringify(data));
  const values: string[] = [];
  const walk = (value: unknown) => {
    if (Array.isArray(value)) {
      for (const item of value) walk(item);
      return;
    }
    if (value && typeof value === "object") {
      for (const [key, item] of Object.entries(value)) {
        if (key !== "@context" && key !== "@type") walk(item);
      }
      return;
    }
    assert.equal(typeof value, "string");
    values.push(String(value));
  };
  walk(parsed);
  assert.ok(values.length > 0);
  for (const value of values) {
    assert.match(value, /^\[[^\]]+\]$/);
    assert.equal(/\d/.test(value), false, value);
  }
}

test("sample Fix Pack is a labeled fictional preview with placeholder JSON-LD", () => {
  assert.match(page, /path: "\/sample-fix-pack"/);
  assert.match(page, /Sample Fix Pack: what you get for \$\{fixPackIntroPriceLabel\}/);
  assert.match(page, /before you pay/);
  assert.match(page, /pageMeta\(/);
  assert.match(page, /CiteScore Team/);
  assert.match(page, /Example Plumbing Co\./);
  assert.match(page, /Riverton, USA/);
  assert.match(page, /sampleFixPackExampleBanner/);
  assert.match(example, new RegExp(sampleFixPackExampleBanner.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.equal((page.match(/<ExampleBanner \/>/g) ?? []).length >= 3, true);
  assert.match(example, /\[their rating\]/);
  assert.match(example, /\[competitor review count\]/);
  assert.match(page, /sampleReviewRows/);
  assert.match(page, /Google Business Profile gap list/);
  assert.match(page, /Review-gap plan and script/);
  assert.match(page, /Directories the answer cited/);
  assert.match(page, /LocalBusiness and Service JSON-LD/);
  assert.match(page, /14-day re-check/);
  assert.match(page, /AI answers vary run to run\. This is a snapshot, not a ranking\./);
  assert.match(page, /It is not a promise that any assistant will name the business\./);
  assert.match(page, /<FixPackBuyLink compact \/>/);
  assert.match(page, /href="\/free-snapshot"/);
  assert.match(page, /Get a free AI Answer Snapshot/);
  assert.match(page, /FixPackOfferFacts/);
  assert.match(page, /business name, city, main service, and/);
  assert.match(page, /within a few business days after\s+payment/);
  assert.doesNotMatch(page, /payhip\.com/);
  assert.doesNotMatch(page, /FIX_PACK_CHECKOUT_URL/);
  assert.doesNotMatch(page, /TradeGuideStickyCta/);
  assert.doesNotMatch(page, /application\/ld\+json/);
  assert.doesNotMatch(page, invented);
  assert.doesNotMatch(example.replace(/JSON\.stringify\(data, null, 2\)/, ""), /\d/);
  assert.doesNotMatch(example, invented);
  assertPlaceholderJsonLd(sampleLocalBusinessJsonLd, "LocalBusiness");
  assertPlaceholderJsonLd(sampleServiceJsonLd, "Service");
  assert.equal(isStickySnapshotContentPath("/sample-fix-pack"), false);
  assert.match(industry, /"\/sample-fix-pack"/);
});

test("sample Fix Pack is linked from the buy surfaces, sitemap, and permanent redirects", () => {
  for (const source of [fixPack, pricing, sampleSnapshot]) {
    assert.match(source, /href="\/sample-fix-pack"/);
    assert.match(source, /See a sample Fix Pack/);
  }
  assert.equal(marketingPaths.some((item) => item.path === "/sample-fix-pack"), true);
  assert.equal(existsSync(new URL("../app/sample-fix-pack/page.tsx", import.meta.url)), true);
  for (const source of ["/fix-pack/sample", "/what-you-get"]) {
    assert.match(
      nextConfig,
      new RegExp(
        `source:\\s*"${source.replaceAll("/", "\\/")}",\\s*destination:\\s*"\\/sample-fix-pack",\\s*permanent:\\s*true`,
      ),
    );
    assert.equal(existsSync(new URL(`../app${source}/page.tsx`, import.meta.url)), false);
    assert.equal(marketingPaths.some((item) => item.path === source), false);
  }
});
