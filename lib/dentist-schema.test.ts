import assert from "node:assert/strict";
import { test } from "node:test";
import { acceptingNewPatients, buildDentistSchema, type DentistInput } from "./generators.ts";

function parse(script: string) {
  const json = script.replace(/^<script type="application\/ld\+json">\n/, "").replace(/\n<\/script>\n$/, "");
  return JSON.parse(json) as Record<string, unknown>;
}

const blank: DentistInput = {
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
  specialties: "",
  acceptingNewPatients: "",
  priceRange: "",
  sameAs: [],
};

test("Dentist JSON-LD is empty until the name is present", () => {
  assert.equal(buildDentistSchema({ ...blank, name: "  ", url: "https://example.com" }), "");
  assert.equal(acceptingNewPatients(""), null);
  assert.equal(acceptingNewPatients("Yes"), null);
  assert.equal(acceptingNewPatients("true"), null);
  assert.equal(acceptingNewPatients("call the office"), null);
});

test("Dentist writes the visible fields and leaves invalid ones out", () => {
  const script = buildDentistSchema({
    ...blank,
    name: "  Example   < Dental ",
    url: "example.com/offices/example",
    logoUrl: "example.com/logo.png",
    telephone: "+1-555-010-0201",
    streetAddress: "18 Bay Street",
    addressLocality: "Springfield",
    addressRegion: "IL",
    postalCode: "62702",
    addressCountry: "us",
    latitude: "39.78172",
    longitude: "-89.65015",
    hours: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" },
      { days: ["Saturday"], opens: "08:00:00", closes: "12:00" },
    ],
    specialties: "Dentistry\n\nhttps://schema.org/PrimaryCare\nDentistry\n",
    acceptingNewPatients: "yes",
    priceRange: "  $$  ",
    sameAs: ["example.com/profiles/example", "https://example.com/profiles/example", "not a url"],
  });
  assert.match(script, /Example \\u003c Dental/);
  const data = parse(script);

  assert.equal(data["@context"], "https://schema.org");
  assert.equal(data["@type"], "Dentist");
  assert.equal(data.name, "Example < Dental");
  assert.equal(data.url, "https://example.com/offices/example");
  assert.equal(data.logo, "https://example.com/logo.png");
  assert.equal(data.telephone, "+1-555-010-0201");
  assert.deepEqual(data.address, {
    "@type": "PostalAddress",
    streetAddress: "18 Bay Street",
    addressLocality: "Springfield",
    addressRegion: "IL",
    postalCode: "62702",
    addressCountry: "US",
  });
  assert.deepEqual(data.geo, { "@type": "GeoCoordinates", latitude: 39.78172, longitude: -89.65015 });
  assert.deepEqual(data.openingHours, ["Mo-Fr 08:00-17:00", "Sa 08:00:00-12:00"]);
  assert.deepEqual(data.medicalSpecialty, ["https://schema.org/Dentistry", "https://schema.org/PrimaryCare"]);
  assert.equal(data.isAcceptingNewPatients, true);
  assert.equal(data.priceRange, "$$");
  assert.equal(data.sameAs, "https://example.com/profiles/example");
  assert.equal("availableService" in data, false);
  assert.equal("openingHoursSpecification" in data, false);
  assert.equal("image" in data, false);
  assert.equal("review" in data, false);
  assert.equal("aggregateRating" in data, false);
  assert.equal("description" in data, false);
});

test("one specialty stays one value, no is false, and gaps in the days are commas", () => {
  const data = parse(
    buildDentistSchema({
      ...blank,
      name: "Example Dental",
      hours: [
        { days: ["Monday", "Wednesday", "Friday"], opens: "08:00", closes: "16:00" },
        { days: ["Sunday"], opens: "00:00", closes: "00:00" },
        { days: [], opens: "08:00", closes: "16:00" },
      ],
      specialties: "http://schema.org/Dentistry",
      acceptingNewPatients: "no",
      sameAs: ["https://example.com/a", "https://example.com/b"],
    }),
  );

  assert.deepEqual(data.openingHours, ["Mo,We,Fr 08:00-16:00", "Su 00:00-00:00"]);
  assert.equal(data.medicalSpecialty, "https://schema.org/Dentistry");
  assert.equal(data.isAcceptingNewPatients, false);
  assert.deepEqual(data.sameAs, ["https://example.com/a", "https://example.com/b"]);
  assert.equal("availableService" in data, false);
});

test("a partial address is kept, and a partial geo, phone, logo, URL, specialty, or price is left out", () => {
  const data = parse(
    buildDentistSchema({
      ...blank,
      name: "Example Dental",
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
      specialties: "Cardiology\nDentistry\n",
      acceptingNewPatients: "maybe",
      priceRange: "x".repeat(100),
    }),
  );

  assert.deepEqual(data.address, { "@type": "PostalAddress", addressLocality: "Springfield" });
  assert.equal("geo" in data, false);
  assert.equal("telephone" in data, false);
  assert.equal("logo" in data, false);
  assert.equal("url" in data, false);
  assert.equal("sameAs" in data, false);
  assert.equal("isAcceptingNewPatients" in data, false);
  assert.equal("priceRange" in data, false);
  assert.equal(data.openingHours, "Mo-Su 00:00-23:59");
  assert.equal(data.medicalSpecialty, "https://schema.org/Dentistry");
});
