import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { marketingPaths } from "./content/blog.ts";

const page = readFileSync(new URL("../app/faq/page.tsx", import.meta.url), "utf8");
const trust = readFileSync(new URL("./trust-faq.ts", import.meta.url), "utf8");
const offerFaq = readFileSync(new URL("./offer-faq.ts", import.meta.url), "utf8");
const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const footer = readFileSync(new URL("../components/SiteFooter.tsx", import.meta.url), "utf8");
const header = readFileSync(new URL("../components/SiteHeader.tsx", import.meta.url), "utf8");
const pricing = readFileSync(new URL("../app/pricing/page.tsx", import.meta.url), "utf8");
const howItWorks = readFileSync(
  new URL("../app/how-it-works/page.tsx", import.meta.url),
  "utf8",
);

const invented =
  /Samuel|Lamphier|testimonial|customers served|guarantee|few minutes|24 hours|48 hours/i;

function questions(source: string) {
  return [...source.matchAll(/\bq: "([^"]+)"/g)].map((match) => match[1]);
}

test("faq page answers the snapshot and Fix Pack from stated facts", () => {
  assert.match(page, /path: "\/faq"/);
  assert.match(page, /title: "FAQ"/);
  assert.match(page, /CiteScore Team/);
  assert.match(page, /faqPageJsonLd\(trustFaqs\)/);
  assert.match(page, /href="\/free-snapshot"/);
  assert.match(page, /href="\/fix-pack"/);
  assert.match(page, /<FaqList items=\{snapshotTrustFaqs\}/);
  assert.match(page, /<FaqList items=\{fixPackTrustFaqs\}/);
  assert.doesNotMatch(page, /snapshotOfferFaqs|fixPackFaqs|freeSnapshotPageFaqs/);
  assert.match(trust, /through FlowForm/);
  assert.match(trust, /within a few business days after payment/);
  assert.match(trust, /within 14 days of delivery/);
  assert.match(trust, /passwords, cookies, or content behind a login/);
  assert.match(trust, /CiteScore Team/);
  assert.match(trust, /privacy page/);
  assert.match(trust, /refunds page/);
  assert.doesNotMatch(trust, /FormSubmit/);
  assert.doesNotMatch(page, invented);
  assert.doesNotMatch(trust, invented);
  assert.doesNotMatch(trust, /\b(John|Jane|Samuel|Lamphier)\b/);
});

test("faq questions are not the ones already published with FAQPage schema", () => {
  const existing = new Set([...questions(offerFaq), ...questions(home)]);
  const own = questions(trust);
  assert.ok(own.length >= 8);
  for (const question of own) {
    assert.equal(existing.has(question), false, question);
  }
});

test("faq is linked from the footer, header, pricing, how it works, and the sitemap", () => {
  assert.match(footer, /href="\/faq"/);
  assert.match(header, /href="\/faq"/);
  assert.match(pricing, /href="\/faq"/);
  assert.match(howItWorks, /href="\/faq"/);
  assert.equal(marketingPaths.some((item) => item.path === "/faq"), true);
  assert.doesNotMatch(footer, /href="\/#faq"/);
  assert.doesNotMatch(header, /href="\/#faq"/);
});
