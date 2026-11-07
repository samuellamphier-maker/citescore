import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { register } from "node:module";
import { test } from "node:test";

register("./alias-hook.mjs", import.meta.url);

const { contactEmail, fixPackIntroPriceLabel, fixPackListPriceLabel } = await import(
  "./site.ts"
);
const { citeScoreOrganizationJsonLd, organizationId } = await import("./site-schema.ts");
const {
  fixPackDeliverables,
  fixPackHowDeliveryWorks,
  fixPackProductJsonLd,
  fixPackRefund,
  fixPackTurnaround,
  fixPackWhatYouGet,
} = await import("./fix-pack-offer.ts");

test("Fix Pack product JSON-LD states the charged price and no ratings", () => {
  const origin = "https://citescore.vercel.app";
  const data = fixPackProductJsonLd(origin);
  assert.equal(data["@type"], "Product");
  assert.equal(data.name, "AI Visibility Fix Pack");
  assert.equal(data.url, `${origin}/fix-pack`);
  const offers = data.offers as Record<string, unknown>;
  assert.equal(offers["@type"], "Offer");
  assert.equal(offers.price, fixPackIntroPriceLabel.replace(/^\$/, ""));
  assert.equal(offers.priceCurrency, "USD");
  assert.equal(offers.availability, "https://schema.org/InStock");
  assert.equal(offers.url, `${origin}/fix-pack`);
  const seller = offers.seller as Record<string, unknown>;
  assert.deepEqual(seller, { "@id": organizationId(origin) });
  const organization = citeScoreOrganizationJsonLd(origin);
  assert.equal(organization["@type"], "Organization");
  assert.equal(organization["@id"], organizationId(origin));
  assert.equal(organization.name, "CiteScore");
  assert.equal(organization.email, contactEmail);
  const json = JSON.stringify(data);
  assert.doesNotMatch(json, /"@type":"Organization"/);
  assert.match(json, /\$49|49/);
  assert.match(json, new RegExp(fixPackListPriceLabel.replace("$", "\\$")));
  assert.match(json, /few business days/);
  assert.match(json, /not a promise that any assistant will name the business/);
  assert.doesNotMatch(
    json,
    /aggregateRating|reviewCount|ratingValue|sku|gtin|testimonial|customers served|guarantee/i,
  );
  assert.equal(fixPackDeliverables.length, 5);
});

test("offer facts stay inside the published delivery and refund rules", () => {
  const joined = [
    fixPackWhatYouGet,
    fixPackHowDeliveryWorks,
    fixPackTurnaround,
    fixPackRefund,
  ].join(" ");
  assert.match(joined, /Google Business Profile gap list/);
  assert.match(joined, /review-gap plan and script/);
  assert.match(joined, /LocalBusiness and Service JSON-LD/);
  assert.match(joined, /re-check 14 days later/);
  assert.match(joined, /card checkout/);
  assert.match(joined, /business name, city, service, and public site URL/);
  assert.match(joined, /passwords, cookies, or pages behind a login/);
  assert.match(joined, /Full refund within 14 days of delivery/);
  assert.match(joined, /not useful/);
  assert.match(joined, /free AI Answer Snapshot has no charge/);
  assert.match(joined, new RegExp(fixPackIntroPriceLabel.replace("$", "\\$")));
  assert.match(joined, new RegExp(fixPackListPriceLabel.replace("$", "\\$")));
  assert.doesNotMatch(
    joined,
    /guarantee|testimonial|customers served|Payhip|few minutes|24 hours|48 hours|star rating/i,
  );
});

test("buying path pages render the facts beside Fix Pack buy buttons", () => {
  const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  const fixPack = readFileSync(new URL("../app/fix-pack/page.tsx", import.meta.url), "utf8");
  const checkout = readFileSync(new URL("../app/checkout/page.tsx", import.meta.url), "utf8");
  const sample = readFileSync(
    new URL("../app/sample-snapshot/page.tsx", import.meta.url),
    "utf8",
  );
  const facts = readFileSync(
    new URL("../components/FixPackOfferFacts.tsx", import.meta.url),
    "utf8",
  );
  const about = readFileSync(new URL("../app/about/page.tsx", import.meta.url), "utf8");

  for (const source of [home, checkout, sample]) {
    assert.match(source, /FixPackOfferFacts/);
  }
  assert.equal((home.match(/<FixPackOfferFacts/g) ?? []).length, 1);
  assert.doesNotMatch(fixPack, /FixPackOfferFacts/);
  assert.doesNotMatch(fixPack, /fixPackWhatYouGet/);
  assert.doesNotMatch(fixPack, /How delivery works/);
  assert.doesNotMatch(fixPack, /How long it takes/);
  assert.equal((fixPack.match(/What you get/g) ?? []).length, 1);
  assert.equal((fixPack.match(/After you pay/g) ?? []).length, 1);
  assert.equal((fixPack.match(/>Refunds</g) ?? []).length, 1);
  assert.match(fixPack, /fixPackHowDeliveryWorks/);
  assert.match(fixPack, /fixPackTurnaround/);
  assert.match(fixPack, /fixPackRefund/);
  assert.match(fixPack, /It is not a promise that any assistant will name the business/);
  assert.match(fixPack, /AI answers vary run to run\. This is a snapshot, not a ranking\./);
  assert.match(fixPack, /SoNick Marketing/);
  assert.match(fixPack, /Illustrative example content, not a real client or real results/);
  assert.match(fixPack, /Operated by the CiteScore Team/);
  assert.match(fixPack, /mailto:\$\{contactEmail\}/);
  assert.match(fixPack, /fixPackProductJsonLd/);
  const deliverablesAt = fixPack.indexOf("{fixPackDeliverables.map");
  const afterPayAt = fixPack.indexOf("After you pay");
  const refundsAt = fixPack.indexOf(">Refunds<");
  const installAt = fixPack.indexOf("Where the JSON-LD goes");
  const faqAt = fixPack.indexOf('id="faq"');
  const buys = [...fixPack.matchAll(/<FixPackBuyLink/g)].map((match) => match.index ?? -1);
  assert.equal((fixPack.match(/data-funnel-cta/g) ?? []).length, 2);
  assert.equal(buys.length, 2);
  assert.ok(buys[0] !== -1 && buys[0] < deliverablesAt);
  assert.ok(deliverablesAt < afterPayAt);
  assert.ok(afterPayAt < refundsAt);
  assert.ok(refundsAt < installAt);
  assert.ok(installAt < faqAt);
  assert.ok(faqAt < buys[1]);
  assert.ok(buys[0] < fixPack.indexOf('href="/free-snapshot"'));
  assert.match(facts, /What you get/);
  assert.match(facts, /How delivery works/);
  assert.match(facts, /How long it takes/);
  assert.match(facts, /Refund policy/);
  assert.match(facts, /\/refunds/);
  assert.match(facts, /\/fix-pack\/next-steps/);
  assert.match(facts, /href="\/about"/);
  assert.match(facts, /CiteScore Team/);
  assert.match(facts, /contactEmail/);
  assert.match(home, /Get a free AI Answer Snapshot/);
  assert.match(home, /FixPackBuyLink/);
  assert.match(home, /href="\/fix-pack"/);
  assert.match(checkout, /sampleHref="\/sample-snapshot"/);
  assert.match(checkout, /fictional business/);
  const fixPackOffer = checkout.slice(
    checkout.indexOf("title={`AI Visibility Fix Pack"),
    checkout.indexOf("title={`${site.priceLabel} GEO audit`}"),
  );
  assert.doesNotMatch(fixPackOffer, /sample-audit\.pdf/);
  assert.match(about, /Who runs this/);
  assert.match(about, /CiteScore Team/);
  assert.match(about, /mailto:\$\{contactEmail\}/);
  const packList = home.indexOf("{fixPackDeliverables.map");
  assert.ok(packList !== -1);
  assert.doesNotMatch(home, /\$39/);
  assert.doesNotMatch(home, /priceLabel/);
  assert.doesNotMatch(home, /AuditForm/);
  assert.doesNotMatch(home, /Still available/);
  const geoAudit = readFileSync(new URL("../app/geo-audit/page.tsx", import.meta.url), "utf8");
  assert.match(geoAudit, /<AuditForm/);
  assert.match(geoAudit, /priceLabel/);
});
