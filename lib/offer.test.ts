import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { marketingPaths } from "./content/blog.ts";
import {
  HOME_SERVICE_TRADE_IDS,
  freeSnapshotPath,
  parseHomeServiceTrade,
} from "./home-service-trade.ts";
import {
  industrySnapshotLabel,
  snapshotOfferForPage,
  tradeGuideStickySnapshotHref,
} from "./industry-snapshot.ts";
import { freeCheckAuditPitch } from "./free-check-pitch.ts";

test("Fix Pack checkout URL is the live Payhip product", () => {
  const source = readFileSync(new URL("./site.ts", import.meta.url), "utf8");
  assert.match(
    source,
    /export const FIX_PACK_CHECKOUT_URL = "https:\/\/payhip\.com\/b\/AjFxC";/,
  );
  assert.match(source, /Buy the Fix Pack/);
  assert.match(source, /fixPackIntroPriceLabel/);
  assert.match(source, /mailto:\$\{contactEmail\}/);
});

test("Fix Pack next steps stay off the sitemap and sit beside checkout", () => {
  const next = readFileSync(
    new URL("../app/fix-pack/next-steps/page.tsx", import.meta.url),
    "utf8",
  );
  const checkout = readFileSync(new URL("../app/checkout/page.tsx", import.meta.url), "utf8");
  const fixPack = readFileSync(new URL("../app/fix-pack/page.tsx", import.meta.url), "utf8");
  const site = readFileSync(new URL("./site.ts", import.meta.url), "utf8");
  assert.match(next, /robots: \{ index: false, follow: false \}/);
  assert.match(next, /What happens after you buy/);
  assert.match(next, /fixPackDetailsMailto\(contactEmail\)/);
  assert.match(next, /EmailRequestFallback/);
  assert.match(next, /fixPackDetailsRequestText\(contactEmail\)/);
  assert.match(
    next,
    /within a few business days after payment, once\s+we have the business name, city, service, and public site URL/,
  );
  assert.match(next, /href="\/refunds"/);
  assert.match(next, /within 14 days of delivery/);
  assert.match(next, /Main service/);
  assert.match(next, /Public site URL/);
  assert.doesNotMatch(next, /Samuel|Lamphier|testimonial|customers served|Payhip/i);
  assert.match(site, /Get the Fix Pack/);
  const facts = readFileSync(
    new URL("../components/FixPackOfferFacts.tsx", import.meta.url),
    "utf8",
  );
  assert.match(facts, /\/fix-pack\/next-steps/);
  assert.match(facts, /What happens after you buy/);
  assert.match(checkout, /FixPackOfferFacts/);
  assert.match(fixPack, /FixPackOfferFacts/);
  assert.equal((fixPack.match(/<FixPackOfferFacts/g) ?? []).length, 2);
  assert.equal(marketingPaths.some((item) => item.path === "/fix-pack/next-steps"), false);
});

test("sitemap sources include the new offer and trust URLs", () => {
  const paths = new Set(marketingPaths.map((item) => item.path));
  for (const path of [
    "/about",
    "/contact",
    "/pricing",
    "/how-it-works",
    "/fix-pack",
    "/refunds",
    "/terms",
    "/privacy",
    "/sample-snapshot",
    "/free-snapshot",
    "/faq",
  ]) {
    assert.equal(paths.has(path), true, path);
  }
});

test("every industry visibility path has a snapshot label", () => {
  const industries = [
    "/ai-search-visibility-for-plumbers",
    "/ai-search-visibility-for-b2b-saas",
    "/ai-search-visibility-for-hvac",
  ];
  assert.equal(industrySnapshotLabel("/ai-search-visibility-for-plumbers"), "plumber");
  assert.equal(industrySnapshotLabel("/ai-search-visibility-for-b2b-saas"), "B2B SaaS");
  assert.equal(industrySnapshotLabel("/ai-search-visibility-for-hvac"), "HVAC");
  assert.equal(industrySnapshotLabel("/ai-search-visibility-for-veterinarians"), "veterinarian");
  assert.equal(industrySnapshotLabel("/geo-audit"), null);
  for (const path of industries) assert.ok(industrySnapshotLabel(path));
  assert.deepEqual(
    snapshotOfferForPage({ guidePath: "/ai-search-visibility-for-plumbers" }),
    { industry: "plumber" },
  );
  assert.equal(snapshotOfferForPage({ guidePath: "/geo-for-local-businesses" }), null);
  assert.deepEqual(snapshotOfferForPage({ ctaId: "plumber-schema-generator" }), {
    industry: "plumber",
  });
  assert.deepEqual(snapshotOfferForPage({ ctaId: "faq-schema-generator" }), {});
  assert.equal(snapshotOfferForPage({ ctaId: "llms-txt-generator" }), null);
});

test("mobile sticky snapshot link follows the inline callout prefill", () => {
  for (const id of HOME_SERVICE_TRADE_IDS) {
    const trade = parseHomeServiceTrade(id);
    assert.ok(trade);
    assert.equal(tradeGuideStickySnapshotHref(trade.guidePath), freeSnapshotPath(id));
  }
  assert.equal(
    tradeGuideStickySnapshotHref("/ai-search-visibility-for-plumbers"),
    "/free-snapshot?trade=plumber",
  );
  assert.equal(
    tradeGuideStickySnapshotHref("/ai-search-visibility-for-electricians"),
    "/free-snapshot?trade=electrician",
  );
  assert.equal(
    tradeGuideStickySnapshotHref("/ai-search-visibility-for-dentists"),
    "/free-snapshot",
  );
  assert.equal(
    tradeGuideStickySnapshotHref("/ai-search-visibility-for-landscapers"),
    "/free-snapshot",
  );
  for (const path of [
    "/free-snapshot",
    "/free-snapshot/thanks",
    "/checkout",
    "/thanks",
    "/geo-for-local-businesses",
    "/plumber-schema-generator",
    "/fix-pack",
  ]) {
    assert.equal(tradeGuideStickySnapshotHref(path), null, path);
  }

  const shell = readFileSync(new URL("../components/ArticleShell.tsx", import.meta.url), "utf8");
  const sticky = readFileSync(
    new URL("../components/TradeGuideStickyCta.tsx", import.meta.url),
    "utf8",
  );
  assert.match(shell, /tradeGuideStickySnapshotHref\(guidePath\)/);
  assert.match(shell, /<TradeGuideStickyCta href=\{stickyHref\} \/>/);
  assert.match(sticky, /md:hidden/);
  assert.match(sticky, /aria-label=\{label\}/);
  assert.match(sticky, /aria-label="Dismiss free snapshot offer"/);
  assert.match(
    sticky,
    /Free AI Answer Snapshot: see who ChatGPT recommends instead of you/,
  );
  assert.match(sticky, /safe-area-inset-bottom/);
  assert.match(sticky, /from "next\/link"/);
  assert.doesNotMatch(sticky, /guarantee|testimonial|customers served|% of|Samuel|Lamphier/i);

  for (const rel of [
    "../app/free-snapshot/page.tsx",
    "../app/free-snapshot/thanks/page.tsx",
    "../app/checkout/page.tsx",
    "../app/thanks/page.tsx",
  ]) {
    const source = readFileSync(new URL(rel, import.meta.url), "utf8");
    assert.doesNotMatch(source, /TradeGuideStickyCta/);
  }
});

test("a missing llms.txt is not pitched as a citation issue", () => {
  const pitch = freeCheckAuditPitch({
    homepage: { reachable: true, hasMetaDescription: true },
    robots: {
      found: true,
      gptBot: "allow",
      perplexityBot: "allow",
      googleExtended: "allow",
    },
    llmsTxt: { found: false },
    sitemap: { found: true },
    schema: { found: true },
  });
  assert.doesNotMatch(pitch.heading, /llms\.txt/i);
  assert.doesNotMatch(pitch.detail, /llms\.txt is missing/i);
  assert.match(pitch.heading, /five public-file basics/);
});
