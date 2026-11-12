import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
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
const nextConfig = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");

test("the request-page preview reuses the example snapshot wording", () => {
  const excerpt = readFileSync(
    new URL("../components/SampleSnapshotExcerpt.tsx", import.meta.url),
    "utf8",
  );
  const flat = (source: string) => source.replace(/\s+/g, " ");
  const preview = flat(excerpt);
  const sample = flat(page);
  const phrases = [
    "Example only: fictional business, fictional competitors, illustrative numbers.",
    "Example Plumbing Co.",
    "Plumber · Riverton, USA (a made-up place) · 100 Example Street",
    "example-plumbing.example",
    "24 October 2026. A real snapshot prints the day the prompts were asked. This date is a placeholder. These prompts were not run.",
    "CiteScore Team, as an example.",
    "best plumber in Riverton, USA",
    "ChatGPT, logged out",
    "Sample Rooter Co.",
    "Fictional Fixture Works",
    "Demo Drain Co.",
    "Example Plumbing Co. is not named on either prompt.",
    "Written for this example. Not a transcript of an assistant.",
    "Example Trades Directory",
    "example-trades.example/riverton",
    "Cited in both the ChatGPT example and the Perplexity example.",
    "Example City List",
    "example.com/riverton-trades",
    "Cited in the Perplexity example only.",
    "Illustrative Google rating and review count, written so the comparison is visible. Not looked up. Not a research finding.",
    "Not named",
    "ChatGPT and Perplexity",
    "ChatGPT only",
    "4.6",
    "22",
    "4.9",
    "310",
    "4.8",
    "180",
    "4.7",
    "95",
  ];
  for (const phrase of phrases) {
    assert.ok(preview.includes(phrase), phrase);
    assert.ok(sample.includes(phrase), phrase);
  }
  assert.match(excerpt, /href="\/sample-snapshot"/);
  assert.match(excerpt, /See the full example snapshot/);
  assert.doesNotMatch(excerpt, /Samuel|Lamphier|testimonial|customers served|guarantee/i);
});

test("example snapshot is fictional and labeled", () => {
  assert.match(page, /Example only: fictional business, fictional competitors, illustrative numbers\./);
  assert.match(page, /Example Plumbing Co\./);
  assert.match(page, /Riverton, USA/);
  assert.match(page, /example-plumbing\.example/);
  assert.equal((page.match(/<HowSnapshotIsMade/g) ?? []).length, 1);
  assert.match(page, /href="#how-the-snapshot-is-made"/);
  assert.equal(
    (page.match(/AI answers vary run to run\. This is a snapshot, not a ranking\./g) ?? [])
      .length,
    0,
  );
  assert.match(page, /CiteScore Team/);
  assert.match(page, /Get a free AI Answer Snapshot/);
  assert.match(page, /id="get-your-own"/);
  assert.match(page, /Get your own snapshot\./);
  assert.match(page, /source="\/sample-snapshot"/);
  assert.match(page, /The example above stays fictional\./);
  assert.match(page, /\{fixPackDetailsCtaLabel\}/);
  assert.match(page, /href="#get-your-own"/);
  assert.match(page, /FixPackBuyLink/);
  assert.match(page, /fixPackGetCtaLabel\(\)/);
  const exampleAt = page.indexOf('className="report-sheet');
  const buyAt = page.indexOf("<FixPackBuyLink");
  assert.ok(exampleAt > 0 && buyAt > exampleAt);
  assert.equal((page.match(/<FixPackBuyLink/g) ?? []).length, 1);
  assert.match(page, /href="\/free-snapshot"/);
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
  assert.equal(marketingPaths.some((item) => item.path === "/sample"), false);
  assert.match(
    nextConfig,
    /source:\s*"\/sample",\s*destination:\s*"\/sample-snapshot",\s*permanent:\s*true/,
  );
  assert.equal(existsSync(new URL("../app/sample/page.tsx", import.meta.url)), false);
  assert.doesNotMatch(home, /href="\/sample"/);
  assert.doesNotMatch(header, /href="\/sample"/);
  assert.doesNotMatch(footer, /href="\/sample"/);
  assert.match(home, /Open the example snapshot/);
  assert.doesNotMatch(home, /Northbound/);
});
