import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { marketingPaths } from "./content/blog.ts";

const page = readFileSync(new URL("../app/free-snapshot/page.tsx", import.meta.url), "utf8");
const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const fixPack = readFileSync(new URL("../app/fix-pack/page.tsx", import.meta.url), "utf8");
const sample = readFileSync(new URL("../app/sample-snapshot/page.tsx", import.meta.url), "utf8");
const industry = readFileSync(
  new URL("../components/IndustrySnapshotCta.tsx", import.meta.url),
  "utf8",
);
const form = readFileSync(
  new URL("../components/SnapshotRequestForm.tsx", import.meta.url),
  "utf8",
);
const trust = readFileSync(new URL("../components/TrustLinks.tsx", import.meta.url), "utf8");
const offerFaq = readFileSync(new URL("./offer-faq.ts", import.meta.url), "utf8");

test("free snapshot page is the linkable request, with the existing email path", () => {
  assert.match(page, /path: "\/free-snapshot"/);
  assert.match(page, /title: "Free AI Answer Snapshot"/);
  assert.match(page, /faqPageJsonLd\(freeSnapshotPageFaqs\)/);
  assert.match(page, /<SnapshotRequestForm \/>/);
  assert.match(page, /href="\/sample-snapshot"/);
  assert.match(page, /Fictional business, illustrative numbers/);
  assert.match(page, /href="\/fix-pack"/);
  assert.match(page, /href="\/checkout"/);
  assert.match(page, /<FixPackBuyLink \/>/);
  assert.match(page, /<TrustLinks \/>/);
  assert.match(page, /CiteScore Team/);
  assert.match(page, /We reply with the one-page snapshot/);
  assert.match(page, /within a few\s+business days after payment/);
  assert.match(page, /business name, city, service, website, and email/);
  assert.doesNotMatch(page, /Samuel|Lamphier|testimonial|customers served|guarantee/i);
  assert.doesNotMatch(page, /few minutes|24 hours|48 hours/);
  assert.match(form, /snapshotMailto/);
  assert.match(form, /EmailRequestFallback/);
  assert.match(form, /Website/);
  assert.match(trust, /href="\/about"/);
  assert.match(trust, /href="\/refunds"/);
  assert.match(trust, /href="\/privacy"/);
  assert.match(offerFaq, /export const freeSnapshotPageFaqs/);
  assert.match(offerFaq, /What does the free AI Answer Snapshot show\?/);
  assert.match(offerFaq, /How do I request the snapshot or the Fix Pack\?/);
  assert.match(offerFaq, /When is the Fix Pack delivered\?/);
  assert.equal(
    marketingPaths.some((item) => item.path === "/free-snapshot"),
    true,
  );
});

test("main snapshot CTAs point at the free snapshot page", () => {
  for (const source of [home, fixPack, sample]) {
    assert.match(source, /href="\/free-snapshot"/);
  }
  assert.match(industry, /snapshotHref = "\/free-snapshot"/);
  assert.match(industry, /href=\{snapshotHref\}/);
  assert.doesNotMatch(home, /href="\/#snapshot"/);
  assert.doesNotMatch(fixPack, /href="\/#snapshot"/);
  assert.doesNotMatch(sample, /href="#snapshot"/);
  assert.doesNotMatch(industry, /href="\/#snapshot"/);
  assert.match(industry, /EmailRequestFallback/);
  assert.match(sample, /<SnapshotRequestForm \/>/);
});
