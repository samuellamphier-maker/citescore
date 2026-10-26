import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { marketingPaths } from "./content/blog.ts";

const page = readFileSync(new URL("../app/sample-snapshot/page.tsx", import.meta.url), "utf8");
const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const fixPack = readFileSync(new URL("../app/fix-pack/page.tsx", import.meta.url), "utf8");
const header = readFileSync(new URL("../components/SiteHeader.tsx", import.meta.url), "utf8");
const industryCta = readFileSync(
  new URL("../components/IndustrySnapshotCta.tsx", import.meta.url),
  "utf8",
);
const shell = readFileSync(new URL("../components/ArticleShell.tsx", import.meta.url), "utf8");
const footer = readFileSync(new URL("../components/SiteFooter.tsx", import.meta.url), "utf8");
const about = readFileSync(new URL("../app/about/page.tsx", import.meta.url), "utf8");

test("example snapshot is fictional and labeled", () => {
  assert.match(page, /Example only: fictional business, fictional competitors, illustrative numbers\./);
  assert.match(page, /Example Plumbing Co\./);
  assert.match(page, /Riverton, USA/);
  assert.match(page, /example-plumbing\.example/);
  assert.match(page, /AI answers vary run to run\. This is a snapshot, not a ranking\./);
  assert.match(page, /CiteScore Team/);
  assert.match(page, /Get a free AI Answer Snapshot/);
  assert.match(page, /Fix Pack,/);
  assert.match(page, /FixPackBuyLink/);
  assert.match(page, /fixPackGetCtaLabel\(\)/);
  assert.match(page, /href="#snapshot"/);
  assert.match(page, /href="\/fix-pack"/);
  assert.match(page, /mailto:\$\{contactEmail\}/);
  assert.equal((page.match(/<ExampleBanner \/>/g) ?? []).length >= 3, true);
  assert.doesNotMatch(page, /Portland|Seattle|Austin|Chicago|testimonial|Roto-Rooter/i);
});

test("snapshot example is linked from the conversion surfaces and the sitemap", () => {
  for (const source of [home, fixPack, header, industryCta]) {
    assert.match(source, /href="\/sample-snapshot"/);
  }
  assert.match(industryCta, /href="\/fix-pack"/);
  assert.match(industryCta, /Fix Pack,/);
  assert.match(industryCta, /Get a free AI Answer Snapshot/);
  assert.match(industryCta, /FixPackBuyLink/);
  assert.match(industryCta, /fixPackGetCtaLabel\(\)/);
  assert.equal((shell.match(/<IndustrySnapshotCta/g) ?? []).length, 2);
  assert.match(fixPack, /fixPackFaqs\(\)/);
  const offerFaq = readFileSync(new URL("./offer-faq.ts", import.meta.url), "utf8");
  assert.match(offerFaq, /When is the Fix Pack delivered\?/);
  assert.match(footer, /href="\/about"/);
  assert.match(about, /CiteScore Team/);
  assert.match(about, /mailto:\$\{contactEmail\}/);
  assert.doesNotMatch(about, /testimonial|customers served|star rating/i);
  assert.equal(
    marketingPaths.some((item) => item.path === "/sample-snapshot"),
    true,
  );
  assert.equal(marketingPaths.some((item) => item.path === "/about"), true);
});
