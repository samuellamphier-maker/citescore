import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { marketingPaths } from "./content/blog.ts";

const page = readFileSync(new URL("../app/trust/page.tsx", import.meta.url), "utf8");
const header = readFileSync(new URL("../components/SiteHeader.tsx", import.meta.url), "utf8");
const footer = readFileSync(new URL("../components/SiteFooter.tsx", import.meta.url), "utf8");
const nextConfig = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
const sitemap = readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8");

const invented =
  /Samuel|Lamphier|testimonial|customers served|guarantee|\b(John|Jane)\b/i;

test("trust page states who sells, what is sold, and what is not promised", () => {
  assert.match(page, /path: "\/trust"/);
  assert.match(page, /title: "Trust"/);
  assert.match(page, /CiteScore Team/);
  assert.match(page, /sellerName/);
  assert.match(page, /mailto:\$\{contactEmail\}/);
  assert.match(page, /fixPackIntroPriceLabel/);
  assert.match(page, /fixPackListPriceLabel/);
  assert.match(page, /site\.priceLabel/);
  assert.equal(page.match(/priceLabel/g)?.length, 1);
  assert.match(page, /AI answers vary run to run\. This is a snapshot, not a ranking\./);
  assert.match(page, /not a promise that any assistant will name the business/);
  assert.match(page, /not a promise of citations, traffic, or revenue/);
  assert.match(page, /We do not sell emails\./);
  assert.match(page, /passwords, cookies, or content behind a login/);
  assert.match(
    page,
    /within 14 days of delivery and \$?\{sellerName\} refunds that purchase\s+in full/,
  );
  assert.match(
    page,
    /The 14 days start when the Fix Pack is delivered, not when you request the free snapshot\. The free AI Answer Snapshot has no charge, so there is nothing to refund on it\./,
  );
  assert.match(page, /within a few business days after payment, once we have the business name, city, service, and public site URL/);
  assert.match(page, /faqPageJsonLd\(trustPageFaqs\)/);
  assert.match(page, /\{item\.a\}/);
  assert.doesNotMatch(page, invented);
  assert.equal(existsSync(new URL("../app/offer/page.tsx", import.meta.url)), false);
});

test("trust is linked from the header, footer, and sitemap, and /offer redirects", () => {
  assert.match(header, /href="\/trust"/);
  assert.match(footer, /href="\/trust"/);
  assert.match(sitemap, /marketingPaths/);
  assert.equal(marketingPaths.some((item) => item.path === "/trust"), true);
  assert.equal(marketingPaths.some((item) => item.path === "/offer"), false);
  assert.match(
    nextConfig,
    /source:\s*"\/offer",\s*destination:\s*"\/free-snapshot",\s*permanent:\s*true/,
  );
  for (const href of [
    "/about",
    "/contact",
    "/sample-snapshot",
    "/sample-fix-pack",
    "/methodology",
    "/terms",
    "/privacy",
    "/refunds",
    "/how-it-works",
    "/faq",
    "/free-snapshot",
    "/fix-pack",
    "/checkout",
  ]) {
    assert.match(page, new RegExp(`href="${href}"`), href);
  }
  assert.match(page, /example snapshot \(fictional business\)/i);
  assert.match(page, /sample Fix Pack \(fictional plumber\)/);
});
