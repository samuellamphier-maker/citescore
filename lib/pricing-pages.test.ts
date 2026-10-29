import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { marketingPaths } from "./content/blog.ts";

const pricing = readFileSync(new URL("../app/pricing/page.tsx", import.meta.url), "utf8");
const howItWorks = readFileSync(
  new URL("../app/how-it-works/page.tsx", import.meta.url),
  "utf8",
);
const header = readFileSync(new URL("../components/SiteHeader.tsx", import.meta.url), "utf8");
const footer = readFileSync(new URL("../components/SiteFooter.tsx", import.meta.url), "utf8");
const trust = readFileSync(new URL("../components/TrustLinks.tsx", import.meta.url), "utf8");

const invented =
  /Samuel|Lamphier|testimonial|customers served|guarantee|few minutes|24 hours|48 hours/i;

test("pricing page compares the free snapshot and the Fix Pack", () => {
  assert.match(pricing, /path: "\/pricing"/);
  assert.match(pricing, /title: "Pricing"/);
  assert.match(pricing, /CiteScore Team/);
  assert.match(pricing, /href="\/free-snapshot"/);
  assert.match(pricing, /href="\/checkout"/);
  assert.match(pricing, /href="\/fix-pack"/);
  assert.match(pricing, /href="\/sample-snapshot"/);
  assert.match(pricing, /href="\/how-it-works"/);
  assert.match(pricing, /<FixPackBuyLink/);
  assert.match(pricing, /fixPackDeliverables/);
  assert.match(pricing, /within a few\s+business days after payment/);
  assert.match(pricing, /through FormSubmit/);
  assert.match(pricing, /business name, city, service, website, and/);
  assert.doesNotMatch(pricing, /does not post to a server/);
  assert.match(
    pricing,
    /AI answers vary run to run\.\s+This is a snapshot, not a ranking\./,
  );
  assert.match(pricing, /not a promise that any assistant will name the business/);
  assert.doesNotMatch(pricing, invented);
});

test("how it works explains request, findings, and the optional Fix Pack", () => {
  assert.match(howItWorks, /path: "\/how-it-works"/);
  assert.match(howItWorks, /title: "How it works"/);
  assert.match(howItWorks, /CiteScore Team/);
  assert.match(howItWorks, /href="\/free-snapshot"/);
  assert.match(howItWorks, /href="\/sample-snapshot"/);
  assert.match(howItWorks, /href="\/fix-pack"/);
  assert.match(howItWorks, /href="\/pricing"/);
  assert.match(howItWorks, /<FixPackBuyLink/);
  assert.match(howItWorks, /No account and no paid checkout/);
  assert.match(howItWorks, /through FormSubmit/);
  assert.doesNotMatch(howItWorks, /does not post to a server/);
  assert.match(howItWorks, /We reply with the\s+one-page snapshot/);
  assert.match(howItWorks, /Fictional business, illustrative numbers/);
  assert.match(howItWorks, /within a few\s+business days after payment/);
  assert.doesNotMatch(howItWorks, invented);
});

test("pricing and how it works are in the nav, footer, trust links, and sitemap", () => {
  for (const source of [header, footer, trust]) {
    assert.match(source, /href="\/pricing"/);
    assert.match(source, /href="\/how-it-works"/);
  }
  assert.doesNotMatch(header, /href="\/#pricing"/);
  assert.doesNotMatch(footer, /href="\/#pricing"/);
  assert.equal(marketingPaths.some((item) => item.path === "/pricing"), true);
  assert.equal(marketingPaths.some((item) => item.path === "/how-it-works"), true);
});
