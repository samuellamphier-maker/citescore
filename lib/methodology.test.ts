import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { marketingPaths } from "./content/blog.ts";

const page = readFileSync(new URL("../app/methodology/page.tsx", import.meta.url), "utf8");
const footer = readFileSync(new URL("../components/SiteFooter.tsx", import.meta.url), "utf8");
const howItWorks = readFileSync(new URL("../app/how-it-works/page.tsx", import.meta.url), "utf8");
const faq = readFileSync(new URL("../app/faq/page.tsx", import.meta.url), "utf8");
const sitemap = readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8");

const invented =
  /Samuel|Lamphier|testimonial|customers served|guarantee|few minutes|24 hours|48 hours/i;

test("methodology page restates how the snapshot and Fix Pack are produced", () => {
  assert.match(page, /path: "\/methodology"/);
  assert.match(page, /title: "Methodology"/);
  assert.match(page, /CiteScore Team/);
  assert.match(page, /href="\/free-snapshot"/);
  assert.match(page, /href="\/fix-pack"/);
  assert.match(page, /href="\/sample-snapshot"/);
  assert.match(page, /href="\/checkout"/);
  assert.match(page, /<FixPackBuyLink/);
  assert.match(page, /logged-out ChatGPT and Perplexity/);
  assert.match(page, /plus one variant/);
  assert.match(page, /through FlowForm/);
  assert.match(page, /Fictional business, illustrative numbers/);
  assert.match(page, /within a few\s+business days after payment/);
  assert.match(page, /not a promise that any assistant will name the business/);
  assert.match(page, /does not ask ChatGPT who/);
  assert.match(page, /fixPackDeliverables/);
  assert.doesNotMatch(page, invented);
  assert.doesNotMatch(page, /\b(John|Jane|Samuel|Lamphier)\b/);
});

test("methodology is linked from the footer, how it works, FAQ, and sitemap", () => {
  assert.match(footer, /href="\/methodology"/);
  assert.match(howItWorks, /href="\/methodology"/);
  assert.match(faq, /href="\/methodology"/);
  assert.match(sitemap, /marketingPaths/);
  assert.equal(marketingPaths.some((item) => item.path === "/methodology"), true);
});
