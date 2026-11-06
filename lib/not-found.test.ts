import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { blogPosts, marketingPaths } from "./content/blog.ts";

const notFound = readFileSync(new URL("../app/not-found.tsx", import.meta.url), "utf8");
const nextConfig = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");

const invented =
  /Samuel|Lamphier|testimonial|customers served|guarantee|\b(John|Jane)\b/i;

const aliases = [
  { source: "/support", destination: "/contact" },
  { source: "/help", destination: "/contact" },
  { source: "/agencies", destination: "/for-agencies" },
  { source: "/compare", destination: "/alternatives" },
] as const;

test("404 keeps the report copy, offers the snapshot and Fix Pack, and is noindex", () => {
  assert.match(notFound, /That page is not in the report\./);
  assert.match(notFound, /The URL you opened is not part of this site\./);
  assert.match(notFound, /href="\/free-snapshot"/);
  assert.match(notFound, /Get a free AI Answer Snapshot/);
  assert.match(notFound, /href="\/fix-pack"/);
  assert.match(notFound, /fixPackIntroPriceLabel/);
  assert.match(notFound, /href="\/sample-snapshot"/);
  assert.match(notFound, /See an example snapshot/);
  assert.match(notFound, /Fictional business, illustrative numbers/);
  assert.match(notFound, /logged-out ChatGPT and Perplexity/);
  assert.match(notFound, /No payment/);
  assert.match(notFound, /CiteScore Team/);
  for (const href of [
    "/sample-snapshot",
    "/how-it-works",
    "/faq",
    "/ai-search-visibility-for-plumbers",
    "/ai-search-visibility-for-hvac",
    "/ai-search-visibility-for-dentists",
  ]) {
    assert.match(notFound, new RegExp(`href: "${href}"`));
    assert.equal(existsSync(new URL(`../app${href}/page.tsx`, import.meta.url)), true, href);
  }
  assert.match(notFound, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/);
  assert.doesNotMatch(notFound, invented);
});

test("missing common URLs permanently redirect to pages that exist", () => {
  for (const { source, destination } of aliases) {
    assert.match(
      nextConfig,
      new RegExp(
        `source:\\s*"${source}",\\s*destination:\\s*"${destination}",\\s*permanent:\\s*true`,
      ),
    );
    assert.equal(existsSync(new URL(`../app${source}/page.tsx`, import.meta.url)), false);
    assert.equal(existsSync(new URL(`../app${source}/route.ts`, import.meta.url)), false);
    assert.equal(
      existsSync(new URL(`../app${destination}/page.tsx`, import.meta.url)),
      true,
    );
  }
});

const purchaseAndTrustAliases = [
  { source: "/what-happens-after-you-buy", destination: "/fix-pack/next-steps" },
  { source: "/buy", destination: "/fix-pack" },
  { source: "/order", destination: "/fix-pack" },
  { source: "/purchase", destination: "/fix-pack" },
  { source: "/checkout-fix-pack", destination: "/fix-pack" },
  { source: "/order-fix-pack", destination: "/fix-pack" },
  { source: "/buy-fix-pack", destination: "/fix-pack" },
  { source: "/fix-pack/sample", destination: "/sample-fix-pack" },
  { source: "/what-you-get", destination: "/sample-fix-pack" },
  { source: "/get-started", destination: "/free-snapshot" },
  { source: "/offer", destination: "/free-snapshot" },
  { source: "/start", destination: "/free-snapshot" },
  { source: "/case-studies", destination: "/sample-snapshot" },
  { source: "/testimonials", destination: "/sample-snapshot" },
  { source: "/reviews", destination: "/sample-snapshot" },
  { source: "/security", destination: "/.well-known/security.txt" },
  { source: "/vs", destination: "/alternatives" },
  { source: "/ai-visibility-checklist", destination: "/checklist" },
  { source: "/free-audit", destination: "/free-snapshot" },
  { source: "/get-snapshot", destination: "/free-snapshot" },
  { source: "/start-here", destination: "/free-snapshot" },
  { source: "/ai-answer-snapshot-sample", destination: "/sample-snapshot" },
  { source: "/book", destination: "/contact" },
  { source: "/audit", destination: "/geo-audit" },
  { source: "/audit-39", destination: "/geo-audit" },
  { source: "/ai-visibility-audit", destination: "/geo-audit" },
  { source: "/results", destination: "/sample-snapshot" },
  { source: "/services", destination: "/fix-pack" },
  { source: "/fixpack", destination: "/fix-pack" },
  { source: "/fix", destination: "/fix-pack" },
  { source: "/pricing/fix-pack", destination: "/fix-pack" },
  { source: "/signup", destination: "/free-snapshot" },
  { source: "/sign-up", destination: "/free-snapshot" },
  { source: "/plans", destination: "/pricing" },
  { source: "/sample", destination: "/sample-snapshot" },
  { source: "/signal-check", destination: "/free-check" },
  { source: "/file-check", destination: "/free-check" },
  { source: "/template-pack", destination: "/pricing" },
  { source: "/agency-kit", destination: "/pricing" },
  { source: "/white-label", destination: "/pricing" },
  { source: "/geo", destination: "/geo-for-local-businesses" },
] as const;

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("purchase and trust guesses permanently redirect and stay out of the sitemap", () => {
  const indexed = new Set(marketingPaths.map((item) => item.path));
  for (const { source, destination } of purchaseAndTrustAliases) {
    assert.match(
      nextConfig,
      new RegExp(
        `source:\\s*"${escapeRegExp(source)}",\\s*destination:\\s*"${escapeRegExp(destination)}",\\s*permanent:\\s*true`,
      ),
    );
    assert.equal(existsSync(new URL(`../app${source}/page.tsx`, import.meta.url)), false);
    assert.equal(existsSync(new URL(`../app${source}/route.ts`, import.meta.url)), false);
    assert.equal(indexed.has(source), false, source);
    const destinationPage = new URL(`../app${destination}/page.tsx`, import.meta.url);
    const destinationRoute = new URL(`../app${destination}/route.ts`, import.meta.url);
    assert.equal(
      existsSync(destinationPage) || existsSync(destinationRoute),
      true,
      destination,
    );
  }

  assert.match(
    nextConfig,
    /source:\s*"\/what-is-geo",\s*destination:\s*"\/blog\/what-is-geo",\s*permanent:\s*true/,
  );
  assert.equal(existsSync(new URL("../app/what-is-geo/page.tsx", import.meta.url)), false);
  assert.equal(existsSync(new URL("../app/what-is-geo/route.ts", import.meta.url)), false);
  assert.equal(indexed.has("/what-is-geo"), false);
  assert.equal(indexed.has("/blog/what-is-geo"), true);
  assert.equal(blogPosts.some((post) => post.slug === "what-is-geo"), true);
  assert.equal(existsSync(new URL("../app/blog/[slug]/page.tsx", import.meta.url)), true);
});
