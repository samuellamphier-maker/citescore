import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { register } from "node:module";
import { test } from "node:test";

register("./alias-hook.mjs", import.meta.url);

const {
  fixPackPageSnapshotServiceJsonLd,
  freeSnapshotPageFixPackDescription,
  freeSnapshotPageFixPackJsonLd,
  freeSnapshotPageFixPackRest,
  homeFixPackProductJsonLd,
  homeSnapshotOfferDescription,
  homeSnapshotServiceJsonLd,
  pricingFixPackDeliveryDescription,
  pricingFixPackLimitDescription,
  pricingFixPackProductJsonLd,
  pricingSnapshotOfferDescription,
  pricingSnapshotServiceJsonLd,
} = await import("./core-offer-schema.ts");
const { fixPackProductJsonLd, fixPackTurnaround, fixPackWhatYouGet } = await import(
  "./fix-pack-offer.ts"
);
const { faqPageJsonLd, snapshotOfferFaqs } = await import("./offer-faq.ts");
const { productionOrigin } = await import("./site.ts");
const { freeSnapshotHeadingDefault, freeSnapshotLeadDefault } = await import(
  "./home-service-trade.ts"
);
const { freeSnapshotServiceDescription, freeSnapshotServiceJsonLd } = await import(
  "./site-schema.ts"
);
const { howSnapshotIsMadeBody } = await import("./snapshot-method.ts");
const { assertCoreOfferSchema, lintJsonLd } = await import("./schema-sanity.ts");

const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const freeSnapshot = readFileSync(new URL("../app/free-snapshot/page.tsx", import.meta.url), "utf8");
const fixPack = readFileSync(new URL("../app/fix-pack/page.tsx", import.meta.url), "utf8");
const pricing = readFileSync(new URL("../app/pricing/page.tsx", import.meta.url), "utf8");
const facts = readFileSync(new URL("../components/FixPackOfferFacts.tsx", import.meta.url), "utf8");
const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");

function collapse(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function faqItemsFromConst(source: string, name: string) {
  const marker = `const ${name} = [`;
  const start = source.indexOf(marker);
  assert.notEqual(start, -1, name);
  const end = source.indexOf("\n];", start);
  const block = source.slice(start, end);
  const items: { q: string; a: string }[] = [];
  const re = /q: "((?:\\.|[^"\\])*)",\s*a: "((?:\\.|[^"\\])*)"/gs;
  for (const match of block.matchAll(re)) {
    items.push({
      q: JSON.parse(`"${match[1]}"`) as string,
      a: JSON.parse(`"${match[2]}"`) as string,
    });
  }
  assert.ok(items.length > 0, name);
  return items;
}

test("core offer JSON-LD parses, prices the two offers, and skips ratings", () => {
  assert.doesNotThrow(() => assertCoreOfferSchema(productionOrigin));

  const pages = {
    home: [homeSnapshotServiceJsonLd(productionOrigin), homeFixPackProductJsonLd(productionOrigin)],
    freeSnapshot: [
      freeSnapshotServiceJsonLd(productionOrigin),
      freeSnapshotPageFixPackJsonLd(productionOrigin),
    ],
    fixPack: [
      fixPackProductJsonLd(productionOrigin),
      fixPackPageSnapshotServiceJsonLd(productionOrigin),
    ],
    pricing: [
      pricingSnapshotServiceJsonLd(productionOrigin),
      pricingFixPackProductJsonLd(productionOrigin),
    ],
  };

  for (const [page, nodes] of Object.entries(pages)) {
    const prices = nodes.flatMap((node) => {
      const offers = node.offers as { price?: string };
      return offers?.price ? [offers.price] : [];
    });
    assert.deepEqual(prices.sort(), ["0", "49"], page);
  }

  const canonical = freeSnapshotServiceJsonLd(productionOrigin);
  assert.equal(canonical["@id"], `${productionOrigin}/free-snapshot#service`);
  const variant = homeSnapshotServiceJsonLd(productionOrigin);
  assert.equal("@id" in variant, false);
  assert.equal(variant.name, "Free AI Answer Snapshot");
  assert.equal(pricingSnapshotServiceJsonLd(productionOrigin).name, "AI Answer Snapshot");
  assert.equal(homeFixPackProductJsonLd(productionOrigin).name, "Fix Pack");
  assert.equal(freeSnapshotPageFixPackJsonLd(productionOrigin).name, "Fix Pack");
  const priced = pricingFixPackProductJsonLd(productionOrigin);
  assert.equal(priced.name, "AI Visibility Fix Pack");
  const offer = priced.offers as { url: string; price: string; priceCurrency: string };
  assert.equal(offer.price, "49");
  assert.equal(offer.priceCurrency, "USD");
  assert.equal(offer.url, `${productionOrigin}/fix-pack`);
});

test("offer descriptions are the sentences those pages render", () => {
  assert.equal(
    homeSnapshotServiceJsonLd(productionOrigin).description,
    homeSnapshotOfferDescription,
  );
  assert.match(home, /body: homeSnapshotOfferDescription/);
  assert.match(home, /\{step\.body\}/);

  assert.equal(
    homeFixPackProductJsonLd(productionOrigin).description,
    `${fixPackWhatYouGet} ${fixPackTurnaround}`,
  );
  assert.match(home, /<FixPackOfferFacts/);
  assert.match(facts, /fixPackWhatYouGet/);
  assert.match(facts, /fixPackTurnaround/);
  assert.match(home, /Fix Pack/);

  assert.equal(
    pricingSnapshotServiceJsonLd(productionOrigin).description,
    pricingSnapshotOfferDescription,
  );
  assert.match(pricing, /\{pricingSnapshotOfferDescription\}/);
  assert.match(pricing, /AI Answer Snapshot/);
  assert.equal(
    pricingFixPackProductJsonLd(productionOrigin).description,
    `${pricingFixPackDeliveryDescription} ${pricingFixPackLimitDescription}`,
  );
  assert.match(pricing, /\{pricingFixPackDeliveryDescription\}/);
  assert.match(pricing, /\{pricingFixPackLimitDescription\}/);
  assert.match(pricing, /AI Visibility Fix Pack/);

  assert.equal(
    freeSnapshotPageFixPackJsonLd(productionOrigin).description,
    freeSnapshotPageFixPackDescription,
  );
  assert.equal(
    freeSnapshotPageFixPackDescription,
    `The Fix Pack ${freeSnapshotPageFixPackRest}`,
  );
  assert.match(freeSnapshot, /\{freeSnapshotPageFixPackRest\}/);
  assert.match(freeSnapshot, /Fix Pack/);

  const shown = snapshotOfferFaqs.find(
    (item) => item.q === "What does the free AI Answer Snapshot show?",
  );
  assert.ok(shown);
  assert.equal(fixPackPageSnapshotServiceJsonLd(productionOrigin).description, shown.a);
  assert.match(fixPack, /fixPackPageSnapshotServiceJsonLd\(publicOrigin\(\)\)/);
  assert.match(fixPack, /<FaqList items=\{fixPackMoreFaqs\(\)\}/);
  assert.match(fixPack, /The snapshot is free/);

  const collapsed = collapse(freeSnapshot);
  const method = readFileSync(
    new URL("../components/HowSnapshotIsMade.tsx", import.meta.url),
    "utf8",
  );
  assert.match(freeSnapshot, /<HowSnapshotIsMade/);
  assert.match(method, /howSnapshotIsMadeBody/);
  assert.ok(freeSnapshotServiceDescription.includes(howSnapshotIsMadeBody));
  for (const sentence of [
    "We reply with the one-page snapshot by email.",
    "There is no set delivery time.",
  ]) {
    assert.ok(collapsed.includes(sentence), sentence);
    assert.ok(freeSnapshotServiceDescription.includes(sentence), sentence);
  }
  assert.equal(
    collapsed.includes(
      "We reply with the one-page snapshot by email: who is named, which sources are cited, and how the Google rating and review count compare.",
    ),
    false,
  );
  assert.match(freeSnapshot, /<FreeSnapshotLead/);
  assert.ok(freeSnapshotServiceDescription.startsWith(freeSnapshotHeadingDefault));
  assert.ok(freeSnapshotServiceDescription.includes(freeSnapshotLeadDefault));
});

test("FAQPage schema on the core pages repeats visible questions only", () => {
  assert.match(layout, /citeScoreOrganizationJsonLd\(publicOrigin\(\)\)/);
  assert.match(home, /faqPageJsonLd\(homePageFaqItems\)/);
  assert.match(home, /<FaqList items=\{snapshotOfferFaqs\}/);
  assert.match(home, /\{faqs\.map/);
  assert.match(home, /item\.q !== "When is the Fix Pack delivered\?"/);
  assert.match(freeSnapshot, /faqPageJsonLd\(freeSnapshotPageFaqs\)/);
  assert.match(freeSnapshot, /<FaqList items=\{freeSnapshotPageFaqs\}/);
  assert.match(fixPack, /faqPageJsonLd\(fixPackFaqs\(\)\)/);
  assert.match(pricing, /faqPageJsonLd\(pricingFaqs\)/);
  assert.match(pricing, /<FaqList items=\{pricingFaqs\}/);

  const more = faqItemsFromConst(home, "faqs");
  const homeFaqs = [
    ...snapshotOfferFaqs,
    ...more.filter((item) => item.q !== "When is the Fix Pack delivered?"),
  ];
  assert.equal(new Set(homeFaqs.map((item) => item.q)).size, homeFaqs.length);
  assert.deepEqual(lintJsonLd(faqPageJsonLd(homeFaqs), "homeFaq"), []);
  for (const item of more) {
    assert.ok(home.includes(item.q), item.q);
    assert.ok(home.includes(item.a), item.q);
  }
});
