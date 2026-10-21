import assert from "node:assert/strict";
import { test } from "node:test";
import { buildImageObjectSchema } from "./generators.ts";

function parse(script: string) {
  const json = script.replace(/^<script type="application\/ld\+json">\n/, "").replace(/\n<\/script>\n$/, "");
  return JSON.parse(json) as Record<string, unknown>;
}

test("ImageObject is empty until contentUrl is a URL", () => {
  assert.equal(buildImageObjectSchema({
    contentUrl: "",
    name: "Clinic entrance",
    caption: "The front door",
    creatorName: "Example Studio",
    creatorKind: "Organization",
    creatorUrl: "https://example.com",
    license: "https://example.com/license",
    acquireLicensePage: "https://example.com/how-to-license",
    creditText: "Example Studio",
    copyrightNotice: "© 2026 Example Studio",
  }), "");
  assert.equal(buildImageObjectSchema({
    contentUrl: "not a url",
    name: "Clinic entrance",
    caption: "",
    creatorName: "",
    creatorKind: "Organization",
    creatorUrl: "",
    license: "",
    acquireLicensePage: "",
    creditText: "",
    copyrightNotice: "",
  }), "");
});

test("ImageObject writes the visible fields and omits a creator URL without a name", () => {
  const data = parse(buildImageObjectSchema({
    contentUrl: "example.com/photos/clinic-front.jpg",
    name: "  Clinic   entrance ",
    caption: "The front of the clinic on Main Street.",
    creatorName: "Example Studio",
    creatorKind: "Organization",
    creatorUrl: "https://example.com",
    license: "https://example.com/license",
    acquireLicensePage: "https://example.com/how-to-license",
    creditText: "Example Studio",
    copyrightNotice: "© 2026 Example Studio",
  }));

  assert.equal(data["@type"], "ImageObject");
  assert.equal(data.contentUrl, "https://example.com/photos/clinic-front.jpg");
  assert.equal(data.name, "Clinic entrance");
  assert.equal(data.caption, "The front of the clinic on Main Street.");
  assert.deepEqual(data.creator, {
    "@type": "Organization",
    name: "Example Studio",
    url: "https://example.com/",
  });
  assert.equal(data.license, "https://example.com/license");
  assert.equal(data.acquireLicensePage, "https://example.com/how-to-license");
  assert.equal(data.creditText, "Example Studio");
  assert.equal(data.copyrightNotice, "© 2026 Example Studio");
  assert.equal("url" in data, false);
});

test("a creator URL without a name is left out, and a Person creator is kept", () => {
  const withoutName = parse(buildImageObjectSchema({
    contentUrl: "https://example.com/photos/clinic-front.jpg",
    name: "",
    caption: "",
    creatorName: "",
    creatorKind: "Person",
    creatorUrl: "https://example.com/credits",
    license: "",
    acquireLicensePage: "",
    creditText: "Example Studio",
    copyrightNotice: "",
  }));
  assert.equal("creator" in withoutName, false);
  assert.equal(withoutName.creditText, "Example Studio");
  assert.equal("license" in withoutName, false);

  const person = parse(buildImageObjectSchema({
    contentUrl: "https://example.com/photos/clinic-front.jpg",
    name: "",
    caption: "<b>Caption</b>",
    creatorName: "Name on the credit line",
    creatorKind: "Person",
    creatorUrl: "not a url",
    license: "not a url",
    acquireLicensePage: "",
    creditText: "",
    copyrightNotice: "",
  }));
  assert.equal(person.caption, "Caption");
  assert.deepEqual(person.creator, { "@type": "Person", name: "Name on the credit line" });
  assert.equal("license" in person, false);
});
