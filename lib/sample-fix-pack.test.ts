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
const checkout = readFileSync(new URL("../app/checkout/page.tsx", import.meta.url), "utf8");
const sampleSnapshot = readFileSync(
  new URL("../app/sample-snapshot/page.tsx", import.meta.url),
  "utf8",
);
const nextConfig = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
const industry = readFileSync(new URL("./industry-snapshot.ts", import.meta.url), "utf8");

const invented =
  /Samuel|Lamphier|testimonial|customers served|guarantee|few minutes|24 hours|48 hours|%/i;

const publishedDigits = new Set(["4.6", "22", "4.9", "310", "4.8", "180", "4.7", "95", "100"]);

function assertFilledJsonLd(data: object, type: string) {
  const text = sampleJsonLdText(data);
  const parsed = JSON.parse(text) as Record<string, unknown>;
  assert.equal(parsed["@context"], "https://schema.org");
  assert.equal(parsed["@type"], type);
  assert.equal(JSON.stringify(parsed), JSON.stringify(data));
  const flat = JSON.stringify(parsed);
  assert.equal(flat.includes("telephone"), false);
  assert.equal(flat.includes("["), false);
  assert.equal(flat.includes("postalCode"), false);
  assert.match(flat, /Example Plumbing Co\./);
  assert.match(flat, /100 Example Street/);
  assert.match(flat, /Riverton/);
  assert.match(flat, /example-plumbing\.example|Plumber/);
  assert.doesNotMatch(flat, invented);
}

test("sample Fix Pack is a labeled fictional preview filled from the example snapshot", () => {
  assert.match(page, /path: "\/sample-fix-pack"/);
  assert.match(page, /Sample Fix Pack: what you get for \$\{fixPackIntroPriceLabel\}/);
  assert.match(page, /before you pay/);
  assert.match(page, /pageMeta\(/);
  assert.match(page, /CiteScore Team/);
  assert.match(page, /Example Plumbing Co\./);
  assert.match(page, /Riverton, USA/);
  assert.match(page, /100 Example Street/);
  assert.match(page, /sampleFixPackExampleBanner/);
  assert.match(example, new RegExp(sampleFixPackExampleBanner.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.equal((page.match(/<ExampleBanner \/>/g) ?? []).length >= 3, true);
  const flat = page.replace(/\s+/g, " ");
  assert.match(flat, /fictional/i);
  assert.match(flat, /illustrative/i);
  assert.match(flat, /Not a customer result, and not a live ChatGPT or Perplexity answer/);
  assert.match(flat, /Not looked up\. Not a research finding\. Not a customer result/);
  assert.match(flat, /does not add a phone number/);
  assert.match(flat, /These prompts were not run/);
  assert.match(flat, /The 14-days-later column is not run\. This is an example layout/);
  assert.match(page, /sampleReviewRows/);
  assert.match(page, /Illustrative Google rating/);
  assert.match(example, /rating: "4\.6"/);
  assert.match(example, /reviews: "22"/);
  assert.match(example, /rating: "4\.9"/);
  assert.match(example, /reviews: "310"/);
  assert.match(example, /rating: "4\.8"/);
  assert.match(example, /reviews: "180"/);
  assert.match(example, /rating: "4\.7"/);
  assert.match(example, /reviews: "95"/);
  assert.match(example, /Shorter service list than Sample Rooter Co\./);
  assert.match(example, /No photos, in this illustration/);
  assert.match(example, /do not match example-plumbing\.example/);
  assert.match(example, /Sample Rooter Co\., Fictional Fixture Works, and Demo Drain Co\./);
  assert.match(example, /Fictional Fixture Works and Sample Rooter Co\./);
  assert.match(example, /Not run\. This is an example layout\./);
  assert.match(example, /100 Example Street/);
  assert.doesNotMatch(example, /\[their rating\]|\[competitor review count\]|\[business name\]|\[who was named\]/);
  assert.doesNotMatch(example, /telephone/);
  assert.doesNotMatch(page, /does not fill in a rating/);
  assert.doesNotMatch(page, /cells below stay in brackets/);
  assert.doesNotMatch(page, /\[their rating\]|\[competitor review count\]/);
  const digits =
    example.replace(/JSON\.stringify\(data, null, 2\)/, "").match(/\d+(?:\.\d+)?/g) ?? [];
  assert.ok(digits.length > 0);
  for (const token of digits) {
    assert.equal(publishedDigits.has(token), true, token);
  }
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
  assert.match(page, /<StickySnapshotOffer path="\/sample-fix-pack" \/>/);
  assert.doesNotMatch(page, /application\/ld\+json/);
  assert.doesNotMatch(page, invented);
  assert.doesNotMatch(example, invented);
  assertFilledJsonLd(sampleLocalBusinessJsonLd, "LocalBusiness");
  assertFilledJsonLd(sampleServiceJsonLd, "Service");
  assert.equal(sampleLocalBusinessJsonLd.url, "https://example-plumbing.example");
  assert.equal(isStickySnapshotContentPath("/sample-fix-pack"), true);
  assert.match(industry, /"\/sample-fix-pack"/);
});

test("sample Fix Pack is linked from the buy surfaces, sitemap, and permanent redirects", () => {
  for (const source of [fixPack, pricing, checkout, sampleSnapshot]) {
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
