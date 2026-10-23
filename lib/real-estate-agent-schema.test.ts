import assert from "node:assert/strict";
import { test } from "node:test";
import { attorneyLines, buildRealEstateAgentSchema, type RealEstateAgentInput } from "./generators.ts";

function parse(script: string) {
  const json = script.replace(/^<script type="application\/ld\+json">\n/, "").replace(/\n<\/script>\n$/, "");
  return JSON.parse(json) as Record<string, unknown>;
}

const blank: RealEstateAgentInput = {
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
  knowsAbout: "",
  priceRange: "",
  sameAs: [],
};

test("RealEstateAgent JSON-LD is empty until the name is present", () => {
  assert.equal(buildRealEstateAgentSchema({ ...blank, name: "  ", url: "https://example.com" }), "");
  assert.deepEqual(attorneyLines("\n"), []);
  assert.deepEqual(attorneyLines("x".repeat(81)), []);
});

test("RealEstateAgent writes the visible fields and leaves invalid ones out", () => {
  const script = buildRealEstateAgentSchema({
    ...blank,
    name: "  Example   < Realty ",
    url: "example.com/offices/example",
    logoUrl: "example.com/logo.png",
    telephone: "+1-555-010-0184",
    streetAddress: "18 Bay Street",
    addressLocality: "Springfield",
    addressRegion: "IL",
    postalCode: "62702",
    addressCountry: "us",
    latitude: "39.78172",
    longitude: "-89.65015",
    hours: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" },
      { days: ["Saturday"], opens: "09:00:00", closes: "12:00" },
    ],
    areasServed: "Springfield\n\nIllinois\nSpringfield\n",
    knowsAbout: "Residential sales\nBuyer representation\nResidential sales\n",
    priceRange: "  $$  ",
    sameAs: ["example.com/profiles/example", "https://example.com/profiles/example", "not a url"],
  });
  assert.match(script, /Example \\u003c Realty/);
  const data = parse(script);

  assert.equal(data["@context"], "https://schema.org");
  assert.equal(data["@type"], "RealEstateAgent");
  assert.equal(data.name, "Example < Realty");
  assert.equal(data.url, "https://example.com/offices/example");
  assert.equal(data.logo, "https://example.com/logo.png");
  assert.equal(data.telephone, "+1-555-010-0184");
  assert.deepEqual(data.address, {
    "@type": "PostalAddress",
    streetAddress: "18 Bay Street",
    addressLocality: "Springfield",
    addressRegion: "IL",
    postalCode: "62702",
    addressCountry: "US",
  });
  assert.deepEqual(data.geo, { "@type": "GeoCoordinates", latitude: 39.78172, longitude: -89.65015 });
  assert.deepEqual(data.openingHours, ["Mo-Fr 09:00-17:00", "Sa 09:00:00-12:00"]);
  assert.deepEqual(data.areaServed, ["Springfield", "Illinois"]);
  assert.deepEqual(data.knowsAbout, ["Residential sales", "Buyer representation"]);
  assert.equal(data.priceRange, "$$");
  assert.equal(data.sameAs, "https://example.com/profiles/example");
  assert.equal("openingHoursSpecification" in data, false);
  assert.equal("image" in data, false);
  assert.equal("review" in data, false);
  assert.equal("aggregateRating" in data, false);
  assert.equal("description" in data, false);
  assert.equal("employee" in data, false);
});

test("one place stays one value, and gaps in the days are commas", () => {
  const data = parse(
    buildRealEstateAgentSchema({
      ...blank,
      name: "Example Realty",
      hours: [
        { days: ["Monday", "Wednesday", "Friday"], opens: "09:00", closes: "16:00" },
        { days: ["Sunday"], opens: "00:00", closes: "00:00" },
        { days: [], opens: "09:00", closes: "16:00" },
      ],
      areasServed: "Springfield",
      knowsAbout: "Residential sales",
      sameAs: ["https://example.com/a", "https://example.com/b"],
    }),
  );

  assert.deepEqual(data.openingHours, ["Mo,We,Fr 09:00-16:00", "Su 00:00-00:00"]);
  assert.equal(data.areaServed, "Springfield");
  assert.equal(data.knowsAbout, "Residential sales");
  assert.deepEqual(data.sameAs, ["https://example.com/a", "https://example.com/b"]);
  assert.equal("openingHoursSpecification" in data, false);
});

test("a partial address is kept, and a partial geo, phone, logo, URL, place, topic, or price is left out", () => {
  const data = parse(
    buildRealEstateAgentSchema({
      ...blank,
      name: "Example Realty",
      addressLocality: "Springfield",
      latitude: "39.78172",
      longitude: "",
      telephone: "call the desk",
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
      knowsAbout: "Residential sales\nResidential sales\n",
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
  assert.equal(data.knowsAbout, "Residential sales");
});
