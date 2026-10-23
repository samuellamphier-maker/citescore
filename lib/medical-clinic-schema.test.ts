import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildMedicalClinicSchema,
  clinicServices,
  clinicSpecialties,
  openingHoursLines,
  type MedicalClinicInput,
} from "./generators.ts";

function parse(script: string) {
  const json = script.replace(/^<script type="application\/ld\+json">\n/, "").replace(/\n<\/script>\n$/, "");
  return JSON.parse(json) as Record<string, unknown>;
}

const blank: MedicalClinicInput = {
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
  services: "",
  sameAs: [],
};

test("MedicalClinic JSON-LD is empty until the name is present", () => {
  assert.equal(buildMedicalClinicSchema({ ...blank, name: "  ", url: "https://example.com" }), "");
  assert.deepEqual(clinicSpecialties("primary care\nCardiology\n"), []);
  assert.deepEqual(clinicSpecialties("https://schema.org/PrimaryCare/"), []);
  assert.deepEqual(clinicServices("\n| MedicalTest\n"), []);
  assert.deepEqual(clinicServices(`Blood panel | medicaltest\n${"n".repeat(81)}`), []);
  assert.deepEqual(openingHoursLines([{ days: ["Monday"], opens: "9am", closes: "17:00" }]), []);
});

test("MedicalClinic writes the visible fields and leaves invalid ones out", () => {
  const script = buildMedicalClinicSchema({
    ...blank,
    name: "  Example   < Clinic ",
    url: "example.com/clinics/example",
    logoUrl: "example.com/logo.png",
    telephone: "+1-555-010-0140",
    streetAddress: "240 Oak Avenue",
    addressLocality: "Springfield",
    addressRegion: "IL",
    postalCode: "62704",
    addressCountry: "us",
    latitude: "39.78172",
    longitude: "-89.65015",
    hours: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" },
      { days: ["Saturday"], opens: "09:00:00", closes: "12:00" },
    ],
    specialties: "PrimaryCare\n\nhttps://schema.org/Dermatology\nPrimaryCare\n",
    services: "Annual physical\nBlood panel | MedicalTest\nAnnual physical\nPhysical therapy | MedicalTherapy\n",
    sameAs: ["example.com/profiles/example", "https://example.com/profiles/example", "not a url"],
  });
  assert.match(script, /Example \\u003c Clinic/);
  const data = parse(script);

  assert.equal(data["@context"], "https://schema.org");
  assert.equal(data["@type"], "MedicalClinic");
  assert.equal(data.name, "Example < Clinic");
  assert.equal(data.url, "https://example.com/clinics/example");
  assert.equal(data.logo, "https://example.com/logo.png");
  assert.equal(data.telephone, "+1-555-010-0140");
  assert.deepEqual(data.address, {
    "@type": "PostalAddress",
    streetAddress: "240 Oak Avenue",
    addressLocality: "Springfield",
    addressRegion: "IL",
    postalCode: "62704",
    addressCountry: "US",
  });
  assert.deepEqual(data.geo, { "@type": "GeoCoordinates", latitude: 39.78172, longitude: -89.65015 });
  assert.deepEqual(data.openingHours, ["Mo-Fr 09:00-17:00", "Sa 09:00:00-12:00"]);
  assert.deepEqual(data.medicalSpecialty, [
    "https://schema.org/PrimaryCare",
    "https://schema.org/Dermatology",
  ]);
  assert.deepEqual(data.availableService, [
    { "@type": "MedicalProcedure", name: "Annual physical" },
    { "@type": "MedicalTest", name: "Blood panel" },
    { "@type": "MedicalTherapy", name: "Physical therapy" },
  ]);
  assert.equal(data.sameAs, "https://example.com/profiles/example");
  assert.equal("openingHoursSpecification" in data, false);
  assert.equal("image" in data, false);
  assert.equal("review" in data, false);
  assert.equal("aggregateRating" in data, false);
  assert.equal("description" in data, false);
});

test("a single hour, specialty, or service stays one value, and gaps are commas", () => {
  const data = parse(
    buildMedicalClinicSchema({
      ...blank,
      name: "Example Clinic",
      hours: [
        { days: ["Monday", "Wednesday", "Friday"], opens: "08:00", closes: "16:00" },
        { days: ["Sunday"], opens: "00:00", closes: "00:00" },
        { days: [], opens: "08:00", closes: "16:00" },
      ],
      specialties: "http://schema.org/Emergency",
      services: "Stitch removal | MedicalProcedure",
      sameAs: ["https://example.com/a", "https://example.com/b"],
    }),
  );

  assert.deepEqual(data.openingHours, ["Mo,We,Fr 08:00-16:00", "Su 00:00-00:00"]);
  assert.equal(data.medicalSpecialty, "https://schema.org/Emergency");
  assert.deepEqual(data.availableService, { "@type": "MedicalProcedure", name: "Stitch removal" });
  assert.deepEqual(data.sameAs, ["https://example.com/a", "https://example.com/b"]);
});

test("a partial address is kept, and a partial geo, phone, logo, or URL is left out", () => {
  const data = parse(
    buildMedicalClinicSchema({
      ...blank,
      name: "Example Clinic",
      addressLocality: "Springfield",
      latitude: "39.78172",
      longitude: "",
      telephone: "call the desk",
      logoUrl: "not a url",
      url: "not a url",
      hours: [{ days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59" }],
      specialties: "Nursing\nnot-a-specialty",
      services: `${"x".repeat(80)} | MedicalTest\nLab visit | Other`,
    }),
  );

  assert.deepEqual(data.address, { "@type": "PostalAddress", addressLocality: "Springfield" });
  assert.equal("geo" in data, false);
  assert.equal("telephone" in data, false);
  assert.equal("logo" in data, false);
  assert.equal("url" in data, false);
  assert.equal("sameAs" in data, false);
  assert.equal(data.openingHours, "Mo-Su 00:00-23:59");
  assert.equal(data.medicalSpecialty, "https://schema.org/Nursing");
  assert.deepEqual(data.availableService, { "@type": "MedicalTest", name: "x".repeat(80) });
});
