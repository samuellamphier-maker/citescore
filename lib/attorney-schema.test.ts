import assert from "node:assert/strict";
import { test } from "node:test";
import {
  attorneyLines,
  attorneySchemaType,
  buildAttorneySchema,
  type AttorneyInput,
} from "./generators.ts";

function parse(script: string) {
  const json = script.replace(/^<script type="application\/ld\+json">\n/, "").replace(/\n<\/script>\n$/, "");
  return JSON.parse(json) as Record<string, unknown>;
}

const blank: AttorneyInput = {
  type: "LegalService",
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

test("Attorney JSON-LD is empty until the name is present", () => {
  assert.equal(buildAttorneySchema({ ...blank, name: "  ", url: "https://example.com" }), "");
  assert.equal(attorneySchemaType("Notary"), "LegalService");
  assert.equal(attorneySchemaType(" attorney "), "LegalService");
  assert.deepEqual(attorneyLines("\n"), []);
  assert.deepEqual(attorneyLines("x".repeat(81)), []);
});

test("LegalService writes the visible fields and leaves invalid ones out", () => {
  const script = buildAttorneySchema({
    ...blank,
    name: "  Example   < Law Office ",
    url: "example.com/offices/example",
    logoUrl: "example.com/logo.png",
    telephone: "+1-555-010-0160",
    streetAddress: "100 Main Street",
    addressLocality: "Springfield",
    addressRegion: "IL",
    postalCode: "62701",
    addressCountry: "us",
    latitude: "39.78172",
    longitude: "-89.65015",
    hours: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" },
      { days: ["Saturday"], opens: "09:00:00", closes: "12:00" },
    ],
    areasServed: "Illinois\n\nSpringfield\nIllinois\n",
    knowsAbout: "Estate administration\nReal estate closings\nEstate administration\n",
    priceRange: "  $$  ",
    sameAs: ["example.com/profiles/example", "https://example.com/profiles/example", "not a url"],
  });
  assert.match(script, /Example \\u003c Law Office/);
  const data = parse(script);

  assert.equal(data["@context"], "https://schema.org");
  assert.equal(data["@type"], "LegalService");
  assert.equal(data.name, "Example < Law Office");
  assert.equal(data.url, "https://example.com/offices/example");
  assert.equal(data.logo, "https://example.com/logo.png");
  assert.equal(data.telephone, "+1-555-010-0160");
  assert.deepEqual(data.address, {
    "@type": "PostalAddress",
    streetAddress: "100 Main Street",
    addressLocality: "Springfield",
    addressRegion: "IL",
    postalCode: "62701",
    addressCountry: "US",
  });
  assert.deepEqual(data.geo, { "@type": "GeoCoordinates", latitude: 39.78172, longitude: -89.65015 });
  assert.deepEqual(data.openingHours, ["Mo-Fr 09:00-17:00", "Sa 09:00:00-12:00"]);
  assert.deepEqual(data.areaServed, ["Illinois", "Springfield"]);
  assert.deepEqual(data.knowsAbout, ["Estate administration", "Real estate closings"]);
  assert.equal(data.priceRange, "$$");
  assert.equal(data.sameAs, "https://example.com/profiles/example");
  assert.equal("openingHoursSpecification" in data, false);
  assert.equal("image" in data, false);
  assert.equal("review" in data, false);
  assert.equal("aggregateRating" in data, false);
  assert.equal("description" in data, false);
  assert.equal("employee" in data, false);
});

test("Attorney stays one value, and gaps in the days are commas", () => {
  const data = parse(
    buildAttorneySchema({
      ...blank,
      type: "Attorney",
      name: "Example Law Office",
      hours: [
        { days: ["Monday", "Wednesday", "Friday"], opens: "08:00", closes: "16:00" },
        { days: ["Sunday"], opens: "00:00", closes: "00:00" },
        { days: [], opens: "08:00", closes: "16:00" },
      ],
      areasServed: "Illinois",
      knowsAbout: "Estate administration",
      sameAs: ["https://example.com/a", "https://example.com/b"],
    }),
  );

  assert.equal(data["@type"], "Attorney");
  assert.deepEqual(data.openingHours, ["Mo,We,Fr 08:00-16:00", "Su 00:00-00:00"]);
  assert.equal(data.areaServed, "Illinois");
  assert.equal(data.knowsAbout, "Estate administration");
  assert.deepEqual(data.sameAs, ["https://example.com/a", "https://example.com/b"]);
});

test("a partial address is kept, and a partial geo, phone, logo, URL, or long line is left out", () => {
  const data = parse(
    buildAttorneySchema({
      ...blank,
      type: "Notary",
      name: "Example Law Office",
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
      areasServed: `${"x".repeat(80)}\n${"y".repeat(81)}`,
      knowsAbout: "Closings\n",
      priceRange: "x".repeat(100),
    }),
  );

  assert.equal(data["@type"], "LegalService");
  assert.deepEqual(data.address, { "@type": "PostalAddress", addressLocality: "Springfield" });
  assert.equal("geo" in data, false);
  assert.equal("telephone" in data, false);
  assert.equal("logo" in data, false);
  assert.equal("url" in data, false);
  assert.equal("sameAs" in data, false);
  assert.equal("priceRange" in data, false);
  assert.equal(data.openingHours, "Mo-Su 00:00-23:59");
  assert.equal(data.areaServed, "x".repeat(80));
  assert.equal(data.knowsAbout, "Closings");
});
