import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const header = readFileSync(new URL("../components/SiteHeader.tsx", import.meta.url), "utf8");
const footer = readFileSync(new URL("../components/SiteFooter.tsx", import.meta.url), "utf8");
const pricing = readFileSync(new URL("../app/pricing/page.tsx", import.meta.url), "utf8");
const site = readFileSync(new URL("./site.ts", import.meta.url), "utf8");

function exportString(source: string, name: string) {
  const match = source.match(
    new RegExp(`export const ${name} =\\s*"([^"]+)"`),
  );
  assert.ok(match, name);
  return match[1];
}

const templatePackUrl = exportString(site, "templatePackUrl");
const templatePackLabel = exportString(site, "templatePackLabel");
const agencyKitUrl = exportString(site, "agencyKitUrl");
const agencyKitLabel = exportString(site, "agencyKitLabel");

function closedDisclosure(source: string, label: string) {
  const openTag = source.match(/<details\b[^>]*>/);
  assert.ok(openTag, `${label} should disclose other products`);
  assert.doesNotMatch(openTag[0], /\bopen\b/);
  const start = source.indexOf(openTag[0]);
  const end = source.indexOf("</details>", start);
  assert.ok(end > start, label);
  return source.slice(start, end);
}

test("primary nav stays on the snapshot and Fix Pack path", () => {
  for (const href of [
    "/free-snapshot",
    "/fix-pack",
    "/pricing",
    "/sample-snapshot",
    "/how-it-works",
    "/faq",
    "/trust",
    "/contact",
    "/guides",
    "/industries",
    "/tools",
    "/checklist",
    "/for-agencies",
  ]) {
    assert.match(header, new RegExp(`href="${href}"`), href);
  }
  assert.match(header, />\s*Example snapshot\s*</);
  assert.doesNotMatch(header, /href="\/sample"/);
  const menu = header.slice(header.indexOf("<details"), header.indexOf("</details>"));
  assert.match(menu, /<summary[\s\S]*>\s*Menu\s*<\/summary>/);
  assert.doesNotMatch(menu, /\bopen\b/);
  assert.match(menu, /<SnapshotCta/);
  assert.match(header, /sm:hidden/);
  const phoneBar = header.slice(header.indexOf("sm:hidden"), header.indexOf("<details"));
  assert.doesNotMatch(phoneBar, /<SnapshotCta/);
  assert.doesNotMatch(footer, /href="\/sample"/);
  assert.doesNotMatch(header, /templatePack|agencyKit|buy\.polar\.sh/);
  assert.doesNotMatch(header, /GEO Content Template Pack|GEO Agency Kit/);
  assert.doesNotMatch(header, /Samuel|Lamphier/);
  assert.match(header, /pathname === "\/"/);
  assert.match(header, /pathname === "\/free-snapshot"/);
  assert.match(header, /type="submit"\s+form="snapshot"/);
  assert.match(header, /data-snapshot-cta="focus-first"/);
  assert.match(header, /firstSnapshotFieldError/);
  assert.match(header, /snapshotWebsiteAccepted/);
  assert.match(header, /event\.preventDefault\(\)/);
  assert.doesNotMatch(header, /checkValidity|reportValidity/);
  assert.match(header, /details\.open = false/);
  const ctaClick = header.slice(header.indexOf("function onSnapshotCtaClick"));
  const preventAt = ctaClick.indexOf("event.preventDefault()");
  const firstAt = ctaClick.indexOf("const first = firstSnapshotFieldError");
  assert.ok(firstAt !== -1 && preventAt > firstAt);
});

test("footer and pricing keep the $19 and $29 products in a closed disclosure", () => {
  const peerStart = footer.indexOf("flex flex-wrap gap-x-5 gap-y-2");
  const peerEnd = footer.indexOf("</div>", peerStart);
  const footerPeers = footer.slice(peerStart, peerEnd);
  assert.doesNotMatch(footerPeers, /templatePack|agencyKit|buy\.polar\.sh/);
  assert.match(footerPeers, /href="\/free-snapshot"/);
  assert.match(footerPeers, /href="\/fix-pack"/);
  assert.match(footerPeers, /href="\/pricing"/);
  assert.match(footerPeers, /href="\/trust"/);
  assert.match(footerPeers, /href="\/refunds"/);
  assert.match(footerPeers, /href="\/contact"/);
  assert.match(footer, /Sold by CiteScore/);

  const footerProducts = closedDisclosure(footer, "footer");
  assert.match(footerProducts, /Other digital products/);
  assert.match(footerProducts, /Also available/);
  assert.match(footerProducts, new RegExp(`href=\\{templatePackUrl\\}`));
  assert.match(footerProducts, new RegExp(`href=\\{agencyKitUrl\\}`));
  assert.match(footerProducts, /\{templatePackLabel\}/);
  assert.match(footerProducts, /\{agencyKitLabel\}/);
  assert.match(footerProducts, /href="\/geo-audit">Self-serve PDF audit</);
  assert.match(footerProducts, /href="\/free-check">Public-file check</);
  assert.doesNotMatch(footerProducts, /Free AI Answer Snapshot|Free signal check|>\s*GEO audit\s*</);

  const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(home, /href="\/free-check"/);
  assert.match(home, /href="\/free-snapshot"/);
  assert.doesNotMatch(home, /href="\/geo-audit"/);
  assert.doesNotMatch(home, /href="\/free-check"[^>]*>\s*free AI Answer Snapshot/);
  assert.match(home, />\s*free AI Answer Snapshot\s*</);
  assert.match(home, />\s*Free AI Answer Snapshot\s*</);
  assert.match(home, /Get a free AI Answer Snapshot/);
  assert.doesNotMatch(home, /free signal check|Free signal check|GEO audit/);

  const pricingBody = pricing.slice(pricing.indexOf("<main"));
  const pricingProducts = closedDisclosure(pricingBody, "pricing");
  const pricingPrimary = pricingBody.slice(0, pricingBody.indexOf(pricingProducts));
  assert.match(pricingPrimary, /href="\/free-snapshot"/);
  assert.match(pricingPrimary, /<FixPackBuyLink/);
  assert.match(pricingPrimary, /<TrustLinks/);
  assert.doesNotMatch(pricingPrimary, /templatePackUrl|agencyKitUrl/);
  assert.match(pricingProducts, /Other digital products/);
  assert.match(pricingProducts, /Also available/);
  assert.match(pricingProducts, /href=\{templatePackUrl\}/);
  assert.match(pricingProducts, /href=\{agencyKitUrl\}/);
  assert.match(pricingProducts, /\{templatePackLabel\}/);
  assert.match(pricingProducts, /\{agencyKitLabel\}/);

  assert.equal(templatePackLabel, "GEO Content Template Pack ($19)");
  assert.equal(agencyKitLabel, "GEO Agency Kit ($29)");
  assert.match(templatePackUrl, /^https:\/\/buy\.polar\.sh\//);
  assert.match(agencyKitUrl, /^https:\/\/buy\.polar\.sh\//);
  assert.match(
    site,
    /export const FIX_PACK_CHECKOUT_URL = "https:\/\/payhip\.com\/b\/AjFxC";/,
  );
  assert.doesNotMatch(footer, /Samuel|Lamphier/);
  assert.doesNotMatch(pricing, /Samuel|Lamphier/);
});
