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
  assert.match(checkout, /Other products/);
  assert.match(checkout, /href="\/free-snapshot"/);
  assert.match(checkout, /Request the free snapshot/);
  assert.match(site, /searchParams\.set\("client_reference_id"/);
  assert.match(site, /searchParams\.set\("site_url"/);

  const primaryAt = checkout.indexOf('emphasis="primary"');
  const otherAt = checkout.indexOf(">Other products<");
  const auditAt = checkout.indexOf("GEO audit");
  assert.ok(primaryAt !== -1 && otherAt > primaryAt && auditAt > otherAt);
});
