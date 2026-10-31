import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

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
  for (const href of [
    "/",
    "/blog",
    "/geo-audit",
    "/chatgpt-citation-check",
    "/ai-overviews",
    "/sample",
  ]) {
    assert.match(notFound, new RegExp(`href="${href}"`));
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
