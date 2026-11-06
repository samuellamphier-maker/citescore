import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const geo = readFileSync(new URL("../app/geo-audit/page.tsx", import.meta.url), "utf8");
const written = readFileSync(
  new URL("../app/done-for-you-audit/page.tsx", import.meta.url),
  "utf8",
);
const older = readFileSync(
  new URL("../components/OlderAudits.tsx", import.meta.url),
  "utf8",
);
const snippets = readFileSync(
  new URL("./content/search-snippets.ts", import.meta.url),
  "utf8",
);
const redirects = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");

function primaryCopy(source: string) {
  const h1 = source.indexOf("<h1");
  const olderAt = source.indexOf("<OlderAudits");
  assert.ok(h1 !== -1 && olderAt > h1);
  return source.slice(h1, olderAt);
}

test("geo and done-for-you pages lead with the free snapshot and Fix Pack", () => {
  for (const source of [geo, written]) {
    const primary = primaryCopy(source);
    assert.match(primary, /href="\/free-snapshot"/);
    assert.match(primary, /Get a free AI Answer Snapshot/);
    assert.match(primary, /<FixPackBuyLink/);
    assert.match(primary, /href="\/fix-pack"/);
    assert.match(primary, /fixPackIntroPriceLabel/);
    assert.match(primary, /Prepared by the CiteScore Team/);
    assert.match(source, /<OlderAudits>/);
    assert.match(source, /<InlineSnapshotRequest source="/);
    assert.doesNotMatch(primary, /\$39|\$99|\$149|\$19|\$29/);
    assert.doesNotMatch(primary, /<AuditForm|doneForYouAuditUrl|whiteLabelAuditUrl|templatePack|agencyKit/);
    assert.doesNotMatch(source, /Samuel|Lamphier|testimonial|customers served/);
  }

  assert.match(geo, /Free AI Answer Snapshot and Fix Pack/);
  assert.match(written, /Free snapshot first, then the Fix Pack/);
  assert.doesNotMatch(geo, /GEO audit for SaaS/);
  assert.doesNotMatch(written, /A \$99 Done-For-You AI Search Audit/);
  assert.match(geo, /<AuditForm/);
  assert.ok(geo.indexOf("<AuditForm") > geo.indexOf("<OlderAudits"));
  assert.match(geo, /price: String\(site\.price\)/);
  assert.match(geo, /priceLabel/);
  assert.doesNotMatch(written, /<AuditForm/);
  assert.equal((written.match(/(?<![A-Za-z])priceLabel\b/g) ?? []).length, 1);
});

test("older audits stay collapsed and keep the written-audit checkout links", () => {
  const openTag = older.match(/<details\b[^>]*>/);
  assert.ok(openTag);
  assert.doesNotMatch(openTag[0], /\bopen\b/);
  assert.match(older, /Older self-serve \/ written audits/);
  assert.match(older, /doneForYouAuditUrl/);
  assert.match(older, /whiteLabelAuditUrl/);
  assert.match(older, /Buy the \$99 audit/);
  assert.match(older, /Buy the white-label audit/);
  assert.match(older, /CiteScore Team/);
  assert.doesNotMatch(older, /\$19|\$29|templatePack|agencyKit|Samuel|Lamphier/);
  assert.match(snippets, /free AI Answer Snapshot, then the \$\{fixPackIntroPriceLabel\} AI Visibility Fix Pack for one business/);
  assert.match(snippets, /Start with a free AI Answer Snapshot, then the \$\{fixPackIntroPriceLabel\} AI Visibility Fix Pack/);
  assert.doesNotMatch(snippets, /GEO audit for SaaS|A \$99 Done-For-You/);
});

test("existing audit redirects still point at the geo audit page", () => {
  for (const source of ["/audit", "/audit-39", "/ai-visibility-audit"]) {
    assert.match(
      redirects,
      new RegExp(`source:\\s*"${source}",\\s*destination:\\s*"/geo-audit"`),
      source,
    );
  }
});
