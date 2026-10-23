import assert from "node:assert/strict";
import { test } from "node:test";
import {
  attorneyLines,
  buildElectricianSchema,
  electricianIdentifier,
  type ElectricianInput,
} from "./generators.ts";

function parse(script: string) {
  const json = script.replace(/^<script type="application\/ld\+json">\n/, "").replace(/\n<\/script>\n$/, "");
  return JSON.parse(json) as Record<string, unknown>;
}

const blank: ElectricianInput = {
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
  licenseNumber: "",
  priceRange: "",
  sameAs: [],
};

test("Electrician JSON-LD is empty until the name is present", () => {
  assert.equal(buildElectricianSchema({ ...blank, name: "  ", url: "https://example.com", licenseNumber: "EL-1" }), "");
  assert.equal(electricianIdentifier(""), undefined);
  assert.equal(electricianIdentifier("x".repeat(81)), undefined);
  assert.deepEqual(attorneyLines("\n"), []);
});

test("Electrician writes the visible fields, including a license identifier, and leaves invalid ones out", () => {
  const script = buildElectricianSchema({
    ...blank,
    name: "  Example   < Electric ",
    url: "example.com/shops/example",
    logoUrl: "example.com/logo.png",
    telephone: "+1-555-010-0214",
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
    services: "Panel upgrade\nEV charger installation\nPanel upgrade\n",
    licenseNumber: "  EL-214  ",
    priceRange: "  $$  ",
    sameAs: ["example.com/profiles/example", "https://example.com/profiles/example", "not a url"],
  });
  assert.match(script, /Example \\u003c Electric/);
  const data = parse(script);

  assert.equal(data["@context"], "https://schema.org");
  assert.equal(data["@type"], "Electrician");
  assert.equal(data.name, "Example < Electric");
  assert.equal(data.url, "https://example.com/shops/example");
  assert.equal(data.logo, "https://example.com/logo.png");
  assert.equal(data.telephone, "+1-555-010-0214");
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
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Panel upgrade" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "EV charger installation" } },
    ],
  });
  assert.deepEqual(data.identifier, { "@type": "PropertyValue", propertyID: "License number", value: "EL-214" });
  assert.equal(data.priceRange, "$$");
  assert.equal(data.sameAs, "https://example.com/profiles/example");
  assert.equal("openingHoursSpecification" in data, false);
  assert.equal("image" in data, false);
  assert.equal("review" in data, false);
  assert.equal("aggregateRating" in data, false);
  assert.equal("description" in data, false);
  assert.equal("knowsAbout" in data, false);
  assert.equal("availableService" in data, false);
  assert.equal("hasCredential" in data, false);
  assert.equal("taxID" in data, false);
  assert.equal("vatID" in data, false);
  assert.equal("name" in (data.hasOfferCatalog as Record<string, unknown>), false);
});

test("one service stays one value, and gaps in the days are commas", () => {
  const data = parse(
    buildElectricianSchema({
      ...blank,
      name: "Example Electric",
      hours: [
        { days: ["Monday", "Wednesday", "Friday"], opens: "07:00", closes: "16:00" },
        { days: ["Sunday"], opens: "00:00", closes: "00:00" },
        { days: [], opens: "07:00", closes: "16:00" },
      ],
      areasServed: "Springfield",
      services: "Panel upgrade",
      licenseNumber: "EL-1",
      sameAs: ["https://example.com/a", "https://example.com/b"],
    }),
  );

  assert.deepEqual(data.openingHours, ["Mo,We,Fr 07:00-16:00", "Su 00:00-00:00"]);
  assert.equal(data.areaServed, "Springfield");
  assert.deepEqual(data.hasOfferCatalog, {
    "@type": "OfferCatalog",
    itemListElement: { "@type": "Offer", itemOffered: { "@type": "Service", name: "Panel upgrade" } },
  });
  assert.deepEqual(data.identifier, { "@type": "PropertyValue", propertyID: "License number", value: "EL-1" });
  assert.deepEqual(data.sameAs, ["https://example.com/a", "https://example.com/b"]);
  assert.equal("openingHoursSpecification" in data, false);
  const offer = (data.hasOfferCatalog as { itemListElement: Record<string, unknown> }).itemListElement;
  assert.equal("price" in offer, false);
});

test("a partial address is kept, and a partial geo, phone, logo, URL, place, service, license, or price is left out", () => {
  const data = parse(
    buildElectricianSchema({
      ...blank,
      name: "Example Electric",
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
      services: "Panel upgrade\nPanel upgrade\n",
      licenseNumber: "x".repeat(81),
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
  assert.equal("identifier" in data, false);
  assert.equal(data.openingHours, "Mo-Su 00:00-23:59");
  assert.equal(data.areaServed, "Springfield");
  assert.deepEqual(data.hasOfferCatalog, {
    "@type": "OfferCatalog",
    itemListElement: { "@type": "Offer", itemOffered: { "@type": "Service", name: "Panel upgrade" } },
  });
});
