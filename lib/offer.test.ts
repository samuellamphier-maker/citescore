import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { blogPosts, marketingPaths } from "./content/blog.ts";
import { topicPages } from "./content/topics.ts";
import {
  HOME_SERVICE_TRADE_IDS,
  freeSnapshotPath,
  parseHomeServiceTrade,
} from "./home-service-trade.ts";
import {
  guideSnapshotCalloutPaths,
  industrySnapshotLabel,
  showsGuideSnapshotCallout,
  contentStickySnapshotHref,
  isStickySnapshotContentPath,
  snapshotOfferForPage,
  tradeGuideStickySnapshotHref,
} from "./industry-snapshot.ts";
import {
  STICKY_SNAPSHOT_DISMISS_DAYS,
  STICKY_SNAPSHOT_DISMISS_KEY,
  funnelCtaIsInView,
  stickySnapshotDismissed,
  stickySnapshotHeadScript,
} from "./sticky-snapshot.ts";
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
    "/sample-fix-pack",
    "/free-snapshot",
    "/faq",
    "/methodology",
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
    "/thank-you",
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
  assert.match(shell, /contentStickySnapshotHref\(\{ guidePath, ctaId \}\)/);
  assert.match(shell, /<TradeGuideStickyCta href=\{stickyHref\} \/>/);
  assert.doesNotMatch(sticky, /md:hidden/);
  assert.match(sticky, /aria-label=\{label\}/);
  assert.match(sticky, /aria-label="Dismiss free snapshot offer"/);
  assert.match(
    sticky,
    /Free AI Answer Snapshot: see who ChatGPT recommends instead of you/,
  );
  assert.match(sticky, /href="\/sample-snapshot"/);
  assert.match(sticky, /See an example snapshot/);
  assert.match(sticky, /safe-area-inset-bottom/);
  assert.match(sticky, /from "next\/link"/);
  assert.match(sticky, /sticky-snapshot-offer/);
  assert.match(sticky, /motion-reduce:transition-none/);
  assert.match(sticky, /useLayoutEffect/);
  assert.match(sticky, /localStorage\.setItem/);
  assert.match(sticky, /STICKY_SNAPSHOT_DISMISS_KEY/);
  assert.match(sticky, /funnelCtaIsInView/);
  assert.match(sticky, /data-funnel-cta/);
  assert.match(sticky, /invisible pointer-events-none/);
  assert.match(
    readFileSync(new URL("../components/IndustrySnapshotCta.tsx", import.meta.url), "utf8"),
    /data-funnel-cta/,
  );
  assert.match(
    readFileSync(new URL("../components/HomeServiceGuideCallout.tsx", import.meta.url), "utf8"),
    /data-funnel-cta/,
  );
  const inView = { top: 760, bottom: 820, width: 300, height: 60 };
  assert.equal(funnelCtaIsInView(inView, 844), true);
  assert.equal(funnelCtaIsInView({ top: 900, bottom: 960, width: 300, height: 60 }, 844), false);
  assert.equal(funnelCtaIsInView({ top: 830, bottom: 850, width: 300, height: 20 }, 844), false);
  assert.equal(STICKY_SNAPSHOT_DISMISS_DAYS, 14);
  assert.equal(STICKY_SNAPSHOT_DISMISS_KEY, "citescore-sticky-snapshot-dismissed");
  assert.equal(stickySnapshotDismissed(null), false);
  assert.equal(stickySnapshotDismissed("nope", 1_000), false);
  assert.equal(stickySnapshotDismissed(String(5_000), 1_000), true);
  assert.equal(stickySnapshotDismissed(String(500), 1_000), false);
  assert.match(stickySnapshotHeadScript(), new RegExp(STICKY_SNAPSHOT_DISMISS_KEY));
  assert.match(stickySnapshotHeadScript(), /data-sticky-snapshot","off"/);
  assert.doesNotMatch(sticky, /guarantee|testimonial|customers served|% of|Samuel|Lamphier/i);

  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /html\[data-sticky-snapshot="off"\] \.sticky-snapshot-offer/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /\.sticky-snapshot-offer \* \{\s*animation: none !important;/);
  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(layout, /stickySnapshotHeadScript/);
  assert.match(layout, /data-sticky-snapshot="on"/);
  assert.match(layout, /suppressHydrationWarning/);

  for (const rel of [
    "../app/free-snapshot/page.tsx",
    "../app/thank-you/page.tsx",
    "../app/checkout/page.tsx",
    "../app/thanks/page.tsx",
  ]) {
    const source = readFileSync(new URL(rel, import.meta.url), "utf8");
    assert.doesNotMatch(source, /TradeGuideStickyCta/);
  }
});

test("blog posts and general guides get one in-body snapshot callout", () => {
  assert.equal(guideSnapshotCalloutPaths.length, 13);
  for (const path of guideSnapshotCalloutPaths) {
    assert.equal(snapshotOfferForPage({ guidePath: path }), null, path);
    assert.equal(tradeGuideStickySnapshotHref(path), null, path);
    assert.equal(showsGuideSnapshotCallout({ guidePath: path }), true, path);
  }
  assert.equal(showsGuideSnapshotCallout({ ctaId: "blog-what-is-geo" }), true);
  assert.equal(
    showsGuideSnapshotCallout({ ctaId: "blog-chatgpt-citation-checklist" }),
    true,
  );
  assert.equal(
    showsGuideSnapshotCallout({ ctaId: "blog-citescore-vs-enterprise-geo-tools" }),
    true,
  );
  assert.equal(showsGuideSnapshotCallout({ ctaId: "aeo" }), true);
  assert.equal(showsGuideSnapshotCallout({ ctaId: "chatgpt-citation-check" }), true);
  assert.equal(showsGuideSnapshotCallout({ ctaId: "aeo-checklist" }), true);
  assert.equal(showsGuideSnapshotCallout({ ctaId: "ai-overviews" }), true);
  assert.equal(showsGuideSnapshotCallout({ ctaId: "perplexity-citations" }), true);
  assert.equal(
    showsGuideSnapshotCallout({
      guidePath: "/ai-search-visibility-for-plumbers",
      ctaId: "aeo",
    }),
    false,
  );
  assert.equal(showsGuideSnapshotCallout({ ctaId: "llms-txt" }), false);
  assert.equal(showsGuideSnapshotCallout({ guidePath: "/geo-audit" }), false);
  assert.equal(showsGuideSnapshotCallout({}), false);

  for (const post of blogPosts) {
    assert.equal(
      contentStickySnapshotHref({ ctaId: `blog-${post.slug}` }),
      "/free-snapshot",
      post.slug,
    );
    assert.equal(tradeGuideStickySnapshotHref(`/blog/${post.slug}`), null);
  }
  assert.equal(contentStickySnapshotHref({ ctaId: "llms-txt-generator" }), "/free-snapshot");
  assert.equal(
    contentStickySnapshotHref({ ctaId: "robots-txt-ai-crawler-generator" }),
    "/free-snapshot",
  );
  assert.equal(
    contentStickySnapshotHref({ ctaId: "faq-schema-generator" }),
    "/free-snapshot",
  );
  assert.equal(
    contentStickySnapshotHref({ guidePath: "/how-to-get-cited-by-chatgpt" }),
    "/free-snapshot",
  );
  assert.equal(
    contentStickySnapshotHref({
      guidePath: "/ai-search-visibility-for-plumbers",
      ctaId: "faq-schema-generator",
    }),
    "/free-snapshot?trade=plumber",
  );
  for (const path of ["/", "/free-snapshot", "/free-snapshot/thanks", "/thank-you", "/fix-pack", "/sample-fix-pack", "/checkout", "/pricing", "/privacy", "/terms", "/refunds"]) {
    assert.equal(isStickySnapshotContentPath(path), false, path);
    assert.equal(contentStickySnapshotHref({ guidePath: path }), null, path);
  }
  assert.equal(contentStickySnapshotHref({ ctaId: "free-check" }), null);
  assert.equal(contentStickySnapshotHref({ ctaId: "llms-txt" }), null);
  assert.equal(contentStickySnapshotHref({ guidePath: "/geo-for-local-businesses" }), null);
  assert.equal(contentStickySnapshotHref({ guidePath: "/llms-txt-best-practices" }), null);
  assert.equal(contentStickySnapshotHref({}), null);

  let stickyTopics = 0;
  for (const topic of topicPages) {
    const href = contentStickySnapshotHref({ guidePath: topic.path });
    const want =
      topic.path.startsWith("/ai-search-visibility-for-") ||
      topic.path.startsWith("/how-to-get-cited-by-") ||
      topic.path.endsWith("-schema-generator") ||
      topic.path === "/llms-txt-generator" ||
      topic.path === "/robots-txt-ai-crawler-generator";
    if (want) {
      stickyTopics += 1;
      assert.ok(href?.startsWith("/free-snapshot"), topic.path);
    } else {
      assert.equal(href, null, topic.path);
    }
  }
  assert.ok(stickyTopics >= 40);

  const shell = readFileSync(new URL("../components/ArticleShell.tsx", import.meta.url), "utf8");
  const cta = readFileSync(
    new URL("../components/IndustrySnapshotCta.tsx", import.meta.url),
    "utf8",
  );
  assert.match(shell, /showsGuideSnapshotCallout\(\{ guidePath, ctaId \}\)/);
  assert.match(shell, /variant=\{generalSnapshot \? "general" : "industry"\}/);
  assert.equal((shell.match(/<IndustrySnapshotCta/g) ?? []).length, 2);
  assert.match(shell, /snapshotOffer \|\| generalSnapshot/);
  assert.match(cta, /See which local competitors ChatGPT and Perplexity name instead of the business/);
  assert.match(cta, /We ask logged-out ChatGPT and Perplexity who they name/);
  assert.match(cta, /href=\{snapshotHref\}/);
  assert.match(cta, /href="\/fix-pack"/);
  assert.match(cta, /Fix Pack,/);
  assert.doesNotMatch(
    cta,
    /guarantee|testimonial|customers served|% of|Samuel|Lamphier/i,
  );
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
