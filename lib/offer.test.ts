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
  inlineSnapshotPaths,
  inlineSnapshotRequestForPath,
  shellContentPath,
  showsGuideSnapshotCallout,
  contentStickySnapshotHref,
  highIntentStickyPaths,
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

  assert.deepEqual(inlineSnapshotRequestForPath("/ai-search-visibility-for-plumbers"), {
    source: "/ai-search-visibility-for-plumbers",
    service: "plumber",
  });
  assert.deepEqual(inlineSnapshotRequestForPath("/ai-search-visibility-for-dentists"), {
    source: "/ai-search-visibility-for-dentists",
    service: "dental",
  });
  assert.deepEqual(inlineSnapshotRequestForPath("/ai-search-visibility-for-hvac"), {
    source: "/ai-search-visibility-for-hvac",
    service: "HVAC",
  });
  assert.deepEqual(inlineSnapshotRequestForPath("/how-to-get-cited-by-chatgpt"), {
    source: "/how-to-get-cited-by-chatgpt",
  });
  assert.equal(inlineSnapshotRequestForPath("/how-to-get-cited-by-"), null);
  assert.equal(inlineSnapshotRequestForPath("/ai-search-visibility-for-"), null);
  assert.deepEqual(inlineSnapshotRequestForPath("/geo-for-local-businesses"), {
    source: "/geo-for-local-businesses",
  });
  assert.deepEqual(inlineSnapshotRequestForPath("/plumber-schema-generator"), {
    source: "/plumber-schema-generator",
    service: "plumber",
  });
  assert.deepEqual(inlineSnapshotRequestForPath("/faq-schema-generator"), {
    source: "/faq-schema-generator",
  });
  assert.deepEqual(inlineSnapshotRequestForPath("/local-business-schema-generator"), {
    source: "/local-business-schema-generator",
  });
  assert.deepEqual(inlineSnapshotRequestForPath("/blog/what-is-geo"), {
    source: "/blog/what-is-geo",
  });
  assert.deepEqual(inlineSnapshotRequestForPath("/blog"), { source: "/blog" });
  assert.equal(inlineSnapshotRequestForPath("/free-snapshot"), null);
  assert.equal(inlineSnapshotRequestForPath("/llms-txt"), null);
  assert.equal(inlineSnapshotRequestForPath("/privacy"), null);
  assert.equal(inlineSnapshotRequestForPath("/terms"), null);
  assert.equal(inlineSnapshotRequestForPath("/refunds"), null);
  assert.equal(inlineSnapshotRequestForPath("/contact"), null);
  assert.equal(inlineSnapshotRequestForPath(undefined), null);
  assert.equal(shellContentPath({ ctaId: "aeo" }), "/answer-engine-optimization");
  assert.equal(shellContentPath({ ctaId: "blog-what-is-geo" }), "/blog/what-is-geo");
  assert.equal(
    shellContentPath({ guidePath: "/geo-vs-seo", ctaId: "aeo" }),
    "/geo-vs-seo",
  );
  assert.equal(shellContentPath({ ctaId: "llms-txt" }), "/llms-txt");
  assert.equal(inlineSnapshotRequestForPath(shellContentPath({ ctaId: "llms-txt" })), null);

  let inlineGuides = 0;
  for (const topic of topicPages) {
    const request = inlineSnapshotRequestForPath(topic.path);
    const trade = topic.path.startsWith("/ai-search-visibility-for-");
    const citation = topic.path.startsWith("/how-to-get-cited-by-");
    const schema = topic.path.endsWith("-schema-generator");
    const listed = inlineSnapshotPaths.includes(topic.path as (typeof inlineSnapshotPaths)[number]);
    if (trade || citation || schema || listed) {
      inlineGuides += 1;
      assert.equal(request?.source, topic.path, topic.path);
      if (trade) assert.equal(request?.service, industrySnapshotLabel(topic.path), topic.path);
      else if (!schema) assert.equal(request?.service, undefined, topic.path);
    } else {
      assert.equal(request, null, topic.path);
    }
  }
  assert.ok(inlineGuides >= 30);
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
  for (const path of ["/", "/free-snapshot", "/free-snapshot/thanks", "/thank-you", "/checkout", "/privacy", "/terms", "/refunds", "/contact", "/llms.txt"]) {
    assert.equal(isStickySnapshotContentPath(path), false, path);
    assert.equal(contentStickySnapshotHref({ guidePath: path }), null, path);
  }
  assert.equal(contentStickySnapshotHref({ ctaId: "free-check" }), "#snapshot");
  assert.equal(contentStickySnapshotHref({ ctaId: "llms-txt" }), "/free-snapshot");
  assert.equal(contentStickySnapshotHref({ guidePath: "/geo-for-local-businesses" }), "#snapshot");
  assert.equal(contentStickySnapshotHref({ guidePath: "/llms-txt-best-practices" }), "/free-snapshot");
  assert.equal(contentStickySnapshotHref({ ctaId: "aeo" }), "#snapshot");
  assert.equal(contentStickySnapshotHref({}), null);

  let stickyTopics = 0;
  for (const topic of topicPages) {
    const href = contentStickySnapshotHref({ guidePath: topic.path });
    const legacy =
      topic.path.startsWith("/ai-search-visibility-for-") ||
      topic.path.startsWith("/how-to-get-cited-by-") ||
      topic.path.endsWith("-schema-generator") ||
      topic.path === "/llms-txt-generator" ||
      topic.path === "/robots-txt-ai-crawler-generator";
    const highIntent = (highIntentStickyPaths as readonly string[]).includes(topic.path);
    if (legacy) {
      stickyTopics += 1;
      assert.ok(href?.startsWith("/free-snapshot"), topic.path);
    } else if (highIntent) {
      stickyTopics += 1;
      const anchored =
        inlineSnapshotRequestForPath(topic.path) !== null || topic.path === "/sample-snapshot";
      assert.equal(href, anchored ? "#snapshot" : "/free-snapshot", topic.path);
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
  assert.match(shell, /inlineSnapshotRequestForPath\(\s*shellContentPath\(\{ guidePath, ctaId \}\),\s*\)/);
  assert.match(shell, /<InlineSnapshotRequest/);
  assert.match(shell, /defaultService=\{inlineSnapshot\.service\}/);
  assert.match(shell, /source=\{inlineSnapshot\.source\}/);
  const requestSection = readFileSync(
    new URL("../components/InlineSnapshotRequest.tsx", import.meta.url),
    "utf8",
  );
  assert.match(requestSection, /<SnapshotRequestForm/);
  assert.match(requestSection, /defaultService=\{defaultService\}/);
  assert.match(requestSection, /source=\{source\}/);
  assert.match(requestSection, /Request a free AI Answer Snapshot/);
  assert.match(requestSection, /Prepared by the CiteScore Team/);
  assert.match(requestSection, /not a promise that any assistant will name the business/);
  assert.match(requestSection, /data-funnel-cta/);
  assert.doesNotMatch(requestSection, /Samuel|Lamphier|testimonial|customers served|% of|guarantee/i);
  assert.doesNotMatch(shell, /Samuel|Lamphier|testimonial|customers served|% of|guarantee/i);
  for (const post of blogPosts) {
    assert.deepEqual(
      inlineSnapshotRequestForPath(shellContentPath({ ctaId: `blog-${post.slug}` })),
      { source: `/blog/${post.slug}` },
    );
  }
  const placed = [
    ["../app/fix-pack/page.tsx", "/fix-pack"],
    ["../app/pricing/page.tsx", "/pricing"],
    ["../app/how-it-works/page.tsx", "/how-it-works"],
    ["../app/faq/page.tsx", "/faq"],
    ["../app/sample/page.tsx", "/sample"],
    ["../app/sample-fix-pack/page.tsx", "/sample-fix-pack"],
    ["../app/methodology/page.tsx", "/methodology"],
    ["../app/about/page.tsx", "/about"],
    ["../app/checklist/page.tsx", "/checklist"],
    ["../app/for-agencies/page.tsx", "/for-agencies"],
    ["../app/done-for-you-audit/page.tsx", "/done-for-you-audit"],
    ["../app/geo-audit/page.tsx", "/geo-audit"],
    ["../app/blog/page.tsx", "/blog"],
    ["../app/guides/page.tsx", "/guides"],
    ["../app/industries/page.tsx", "/industries"],
    ["../app/tools/page.tsx", "/tools"],
  ] as const;
  for (const [rel, source] of placed) {
    const file = readFileSync(new URL(rel, import.meta.url), "utf8");
    assert.match(file, new RegExp(`<InlineSnapshotRequest source="${source}"`));
    assert.doesNotMatch(file, /defaultService=/);
  }
  for (const rel of [
    "../app/privacy/page.tsx",
    "../app/terms/page.tsx",
    "../app/refunds/page.tsx",
    "../app/contact/page.tsx",
    "../app/llms-txt/page.tsx",
  ]) {
    const file = readFileSync(new URL(rel, import.meta.url), "utf8");
    assert.doesNotMatch(file, /InlineSnapshotRequest|SnapshotRequestForm/);
  }
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

test("the sticky snapshot bar is on high-intent pages and off legal pages", () => {
  assert.equal(highIntentStickyPaths.length, 41);
  const shellPages = new Set([
    "/free-check",
    "/robots-txt-for-ai-crawlers",
    "/schema-markup-for-ai-search",
    "/llms-txt-examples",
    "/geo-vs-seo",
    "/google-ai-overviews-optimization",
    "/ai-search-readiness-checklist-for-saas",
    "/ai-crawler-robots-txt-checker",
    "/aeo-checklist",
    "/chatgpt-citation-check",
    "/ai-overviews",
    "/perplexity-citations",
    "/llms-txt",
    "/ai-crawlers",
    "/ai-crawler-user-agents",
    "/answer-engine-optimization",
    "/how-to-check-if-chatgpt-mentions-your-brand",
    "/google-ai-mode-optimization",
    "/geo-for-local-businesses",
    "/llms-txt-best-practices",
  ]);
  const representative = [
    "/pricing",
    "/fix-pack",
    "/sample",
    "/sample-snapshot",
    "/blog",
    "/guides",
    "/alternatives",
    "/alternatives/otterly",
    "/geo-vs-seo",
    "/llms-txt",
    "/free-check",
    "/checklist",
    "/faq",
    "/about",
  ];
  for (const path of representative) {
    assert.equal(
      (highIntentStickyPaths as readonly string[]).includes(path),
      true,
      path,
    );
  }
  const offer = readFileSync(
    new URL("../components/StickySnapshotOffer.tsx", import.meta.url),
    "utf8",
  );
  const shell = readFileSync(new URL("../components/ArticleShell.tsx", import.meta.url), "utf8");
  assert.match(offer, /TradeGuideStickyCta/);
  assert.match(offer, /contentStickySnapshotHref\(\{ guidePath: path \}\)/);
  assert.match(shell, /<TradeGuideStickyCta href=\{stickyHref\} \/>/);
  assert.match(shell, /stickyHref \? <TradeGuideStickyCta href=\{stickyHref\} \/> : null/);
  assert.match(
    readFileSync(new URL("../components/TradeGuideStickyCta.tsx", import.meta.url), "utf8"),
    /className="sticky-snapshot-offer no-print/,
  );

  for (const path of highIntentStickyPaths) {
    assert.equal(isStickySnapshotContentPath(path), true, path);
    const href = contentStickySnapshotHref({ guidePath: path });
    const anchored =
      path === "/sample-snapshot" || inlineSnapshotRequestForPath(path) !== null;
    assert.equal(href, anchored ? "#snapshot" : "/free-snapshot", path);
    if (shellPages.has(path)) continue;
    const file = readFileSync(new URL(`../app${path}/page.tsx`, import.meta.url), "utf8");
    assert.match(file, new RegExp(`<StickySnapshotOffer path="${path}" />`), path);
  }

  for (const rel of [
    "../app/page.tsx",
    "../app/free-snapshot/page.tsx",
    "../app/privacy/page.tsx",
    "../app/terms/page.tsx",
    "../app/refunds/page.tsx",
    "../app/contact/page.tsx",
    "../app/checkout/page.tsx",
  ]) {
    const file = readFileSync(new URL(rel, import.meta.url), "utf8");
    assert.doesNotMatch(file, /StickySnapshotOffer|TradeGuideStickyCta/, rel);
  }
  const llmsTxt = readFileSync(new URL("../app/llms.txt/route.ts", import.meta.url), "utf8");
  assert.doesNotMatch(llmsTxt, /StickySnapshotOffer|sticky-snapshot-offer/);
  assert.equal(isStickySnapshotContentPath("/privacy"), false);
  assert.equal(isStickySnapshotContentPath("/terms"), false);
  assert.equal(isStickySnapshotContentPath("/refunds"), false);
  assert.equal(isStickySnapshotContentPath("/contact"), false);
  assert.equal(isStickySnapshotContentPath("/llms.txt"), false);
  assert.equal(contentStickySnapshotHref({ guidePath: "/" }), null);
  assert.equal(contentStickySnapshotHref({ guidePath: "/free-snapshot" }), null);
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
