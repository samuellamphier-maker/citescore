import assert from "node:assert/strict";
import { test } from "node:test";
import { attorneyLines, buildPlumberSchema, plumberOffers, type PlumberInput } from "./generators.ts";

function parse(script: string) {
  const json = script.replace(/^<script type="application\/ld\+json">\n/, "").replace(/\n<\/script>\n$/, "");
  return JSON.parse(json) as Record<string, unknown>;
}

const blank: PlumberInput = {
  name: "",
  url: "",
  logoUrl: "",
  telephone: "",
  streetAddress: "",
  addressLocality: "",
  addressRegion: "",
  postalCode: "",
  addressCountry: "",
  latitude: "",
  longitude: "",
  hours: [],
  areasServed: "",
  services: "",
  priceRange: "",
  sameAs: [],
};

test("Plumber JSON-LD is empty until the name is present", () => {
  assert.equal(buildPlumberSchema({ ...blank, name: "  ", url: "https://example.com" }), "");
  assert.deepEqual(attorneyLines("\n"), []);
  assert.deepEqual(plumberOffers("x".repeat(81)), []);
});

test("Plumber writes the visible fields and leaves invalid ones out", () => {
  const script = buildPlumberSchema({
    ...blank,
    name: "  Example   < Plumbing ",
    url: "example.com/shops/example",
    logoUrl: "example.com/logo.png",
    telephone: "+1-555-010-0212",
    streetAddress: "22 Oak Street",
    addressLocality: "Springfield",
    addressRegion: "IL",
    postalCode: "62701",
    addressCountry: "us",
    latitude: "39.78172",
    longitude: "-89.65015",
    hours: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "16:00" },
      { days: ["Saturday"], opens: "08:00:00", closes: "12:00" },
    ],
    areasServed: "Springfield\n\nIllinois\nSpringfield\n",
    services: "Drain cleaning\nWater heater replacement\nDrain cleaning\n",
    priceRange: "  $$  ",
    sameAs: ["example.com/profiles/example", "https://example.com/profiles/example", "not a url"],
  });
  assert.match(script, /Example \\u003c Plumbing/);
  const data = parse(script);

  assert.equal(data["@context"], "https://schema.org");
  assert.equal(data["@type"], "Plumber");
  assert.equal(data.name, "Example < Plumbing");
  assert.equal(data.url, "https://example.com/shops/example");
  assert.equal(data.logo, "https://example.com/logo.png");
  assert.equal(data.telephone, "+1-555-010-0212");
  assert.deepEqual(data.address, {
    "@type": "PostalAddress",
    streetAddress: "22 Oak Street",
    addressLocality: "Springfield",
    addressRegion: "IL",
    postalCode: "62701",
    addressCountry: "US",
  });
  assert.deepEqual(data.geo, { "@type": "GeoCoordinates", latitude: 39.78172, longitude: -89.65015 });
  assert.deepEqual(data.openingHours, ["Mo-Fr 07:00-16:00", "Sa 08:00:00-12:00"]);
  assert.deepEqual(data.areaServed, ["Springfield", "Illinois"]);
  assert.deepEqual(data.hasOfferCatalog, {
    "@type": "OfferCatalog",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Drain cleaning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Water heater replacement" } },
    ],
  });
  assert.equal(data.priceRange, "$$");
  assert.equal(data.sameAs, "https://example.com/profiles/example");
  assert.equal("openingHoursSpecification" in data, false);
  assert.equal("image" in data, false);
  assert.equal("review" in data, false);
  assert.equal("aggregateRating" in data, false);
  assert.equal("description" in data, false);
  assert.equal("knowsAbout" in data, false);
  assert.equal("availableService" in data, false);
  assert.equal("name" in (data.hasOfferCatalog as Record<string, unknown>), false);
});

test("one service stays one value, and gaps in the days are commas", () => {
  const data = parse(
    buildPlumberSchema({
      ...blank,
      name: "Example Plumbing",
      hours: [
        { days: ["Monday", "Wednesday", "Friday"], opens: "07:00", closes: "16:00" },
        { days: ["Sunday"], opens: "00:00", closes: "00:00" },
        { days: [], opens: "07:00", closes: "16:00" },
      ],
      areasServed: "Springfield",
      services: "Drain cleaning",
      sameAs: ["https://example.com/a", "https://example.com/b"],
    }),
  );

  assert.deepEqual(data.openingHours, ["Mo,We,Fr 07:00-16:00", "Su 00:00-00:00"]);
  assert.equal(data.areaServed, "Springfield");
  assert.deepEqual(data.hasOfferCatalog, {
    "@type": "OfferCatalog",
    itemListElement: { "@type": "Offer", itemOffered: { "@type": "Service", name: "Drain cleaning" } },
  });
  assert.deepEqual(data.sameAs, ["https://example.com/a", "https://example.com/b"]);
  assert.equal("openingHoursSpecification" in data, false);
  const offer = (data.hasOfferCatalog as { itemListElement: Record<string, unknown> }).itemListElement;
  assert.equal("price" in offer, false);
});

test("a partial address is kept, and a partial geo, phone, logo, URL, place, service, or price is left out", () => {
  const data = parse(
    buildPlumberSchema({
      ...blank,
      name: "Example Plumbing",
      addressLocality: "Springfield",
      latitude: "39.78172",
      longitude: "",
      telephone: "call the shop",
      logoUrl: "not a url",
      url: "not a url",
      hours: [
        {
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
      ],
      areasServed: `${"x".repeat(81)}\nSpringfield\n`,
      services: "Drain cleaning\nDrain cleaning\n",
      priceRange: "x".repeat(100),
    }),
  );

  assert.deepEqual(data.address, { "@type": "PostalAddress", addressLocality: "Springfield" });
  assert.equal("geo" in data, false);
  assert.equal("telephone" in data, false);
  assert.equal("logo" in data, false);
  assert.equal("url" in data, false);
  assert.equal("sameAs" in data, false);
  assert.equal("priceRange" in data, false);
  assert.equal(data.openingHours, "Mo-Su 00:00-23:59");
  assert.equal(data.areaServed, "Springfield");
  assert.deepEqual(data.hasOfferCatalog, {
    "@type": "OfferCatalog",
    itemListElement: { "@type": "Offer", itemOffered: { "@type": "Service", name: "Drain cleaning" } },
  });
});
