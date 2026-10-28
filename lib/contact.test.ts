import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { marketingPaths } from "./content/blog.ts";

const page = readFileSync(new URL("../app/contact/page.tsx", import.meta.url), "utf8");
const header = readFileSync(new URL("../components/SiteHeader.tsx", import.meta.url), "utf8");
const footer = readFileSync(new URL("../components/SiteFooter.tsx", import.meta.url), "utf8");
const about = readFileSync(new URL("../app/about/page.tsx", import.meta.url), "utf8");
const refunds = readFileSync(new URL("../app/refunds/page.tsx", import.meta.url), "utf8");
const trust = readFileSync(new URL("../components/TrustLinks.tsx", import.meta.url), "utf8");
const fixPack = readFileSync(new URL("../app/fix-pack/page.tsx", import.meta.url), "utf8");

test("contact page gives the email, what to include, and the offer links", () => {
  assert.match(page, /path: "\/contact"/);
  assert.match(page, /title: "Contact"/);
  assert.match(page, /mailto:\$\{contactEmail\}/);
  assert.match(page, /Business name/);
  assert.match(page, /Website/);
  assert.match(page, /City or trade/);
  assert.match(page, /"\/free-snapshot"/);
  assert.match(page, /"\/fix-pack"/);
  assert.match(page, /"\/sample-snapshot"/);
  assert.match(page, /"\/refunds"/);
  assert.match(page, /"\/about"/);
  assert.match(page, /CiteScore Team/);
  assert.doesNotMatch(page, /Samuel|Lamphier|testimonial|customers served|guarantee/i);
});

test("contact is linked from nav, footer, about, refunds, trust, and the sitemap", () => {
  for (const source of [header, footer, about, refunds, trust, fixPack]) {
    assert.match(source, /href="\/contact"/);
  }
  assert.equal(marketingPaths.some((item) => item.path === "/contact"), true);
  assert.doesNotMatch(about, /Samuel|Lamphier/);
  assert.doesNotMatch(refunds, /Samuel|Lamphier/);
});
