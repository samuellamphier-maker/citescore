import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("checkout buyer copy hides payment internals and keeps the URL on the link", () => {
  const checkout = readFileSync(
    new URL("../app/checkout/page.tsx", import.meta.url),
    "utf8",
  );
  const audit = readFileSync(
    new URL("../components/AuditCheckout.tsx", import.meta.url),
    "utf8",
  );
  const site = readFileSync(new URL("./site.ts", import.meta.url), "utf8");

  for (const source of [checkout, audit]) {
    assert.doesNotMatch(source, /client_reference_id/);
    assert.doesNotMatch(source, /webhook/);
    assert.doesNotMatch(source, /site_url/);
    assert.doesNotMatch(source, /Paste a URL on the homepage/);
    assert.doesNotMatch(source, /Payment Link/);
  }

  assert.match(audit, /buildPaymentHref/);
  assert.match(audit, /We'll audit/);
  assert.match(audit, /after you pay/);
  assert.match(audit, /type="url"/);
  assert.match(checkout, /<AuditCheckout/);
  assert.match(checkout, /emphasis="primary"/);
  assert.match(checkout, /href="\/free-snapshot"/);
  assert.match(checkout, /Get a free AI Answer Snapshot/);
  assert.match(site, /searchParams\.set\("client_reference_id"/);
  assert.match(site, /searchParams\.set\("site_url"/);

  const primaryAt = checkout.indexOf('emphasis="primary"');
  const detailsOpen = checkout.match(/<details\b[^>]*>/);
  assert.ok(detailsOpen, "checkout should disclose other products");
  assert.doesNotMatch(detailsOpen[0], /\bopen\b/);
  const detailsAt = checkout.indexOf(detailsOpen[0]);
  const detailsEnd = checkout.indexOf("</details>", detailsAt);
  const otherProducts = checkout.slice(detailsAt, detailsEnd);
  const primaryOffer = checkout.slice(primaryAt, detailsAt);
  const auditAt = otherProducts.indexOf("GEO audit");
  assert.ok(primaryAt !== -1 && detailsAt > primaryAt && auditAt !== -1);
  assert.match(otherProducts, /Other CiteScore products/);
  assert.match(otherProducts, /Looking for the older audit products\?/);
  assert.match(otherProducts, /<AuditCheckout/);
  assert.match(otherProducts, /agencyKitUrl/);
  assert.match(otherProducts, /doneForYouAuditUrl/);
  assert.match(otherProducts, /whiteLabelAuditUrl/);
  assert.match(otherProducts, /Buy the GEO Agency Kit/);
  assert.match(otherProducts, /Buy the \$99 audit/);
  assert.match(otherProducts, /Buy the white-label audit/);
  assert.doesNotMatch(primaryOffer, /<AuditCheckout/);
  assert.doesNotMatch(primaryOffer, /agencyKitUrl|doneForYouAuditUrl|whiteLabelAuditUrl/);
  assert.match(primaryOffer, /Get a free AI Answer Snapshot/);
  assert.match(primaryOffer, /FixPackBuyLink/);
  assert.match(primaryOffer, /<FixPackOfferFacts/);
  assert.match(primaryOffer, /<TrustLinks/);
  const trust = readFileSync(
    new URL("../components/TrustLinks.tsx", import.meta.url),
    "utf8",
  );
  const facts = readFileSync(
    new URL("../components/FixPackOfferFacts.tsx", import.meta.url),
    "utf8",
  );
  assert.match(trust, /sellerName/);
  assert.match(trust, /href="\/refunds"/);
  assert.match(trust, /href="\/trust"/);
  assert.match(facts, /CiteScore Team/);
  assert.match(facts, /\/refunds/);
  assert.doesNotMatch(checkout, /Samuel|Lamphier/);

  const metadata = checkout.slice(
    checkout.indexOf("export const metadata"),
    checkout.indexOf("function firstString"),
  );
  assert.match(metadata, /Free snapshot and \$\{fixPackIntroPriceLabel\} Fix Pack/);
  assert.match(metadata, /free AI Answer Snapshot/);
  assert.match(metadata, /fixPackIntroPriceLabel/);
  assert.match(metadata, /Sold by \$\{sellerName\}/);
  assert.doesNotMatch(
    metadata,
    /agencyKitLabel|doneForYouAuditLabel|whiteLabelCheckoutLabel|site\.priceLabel|\$39|\$29|\$99|\$149/,
  );
});
