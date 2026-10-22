import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildDatasetSchema,
  datasetEncodingFormat,
  datasetLicenseUrl,
  datasetTemporalCoverage,
} from "./generators.ts";

function parse(script: string) {
  const json = script.replace(/^<script type="application\/ld\+json">\n/, "").replace(/\n<\/script>\n$/, "");
  return JSON.parse(json) as Record<string, unknown>;
}

const blank = {
  name: "",
  description: "",
  url: "",
  license: "",
  creators: [] as { name: string; kind: string; url: string }[],
  keywords: "",
  temporalCoverage: "",
  distributions: [] as { contentUrl: string; encodingFormat: string }[],
};

test("Dataset JSON-LD is empty until the name is present", () => {
  assert.equal(buildDatasetSchema({ ...blank, name: "  ", keywords: "climate" }), "");
  assert.equal(datasetTemporalCoverage("2011"), "2011");
  assert.equal(datasetTemporalCoverage("2015-11"), "2015-11");
  assert.equal(datasetTemporalCoverage("1950-01-01/2013-12-18"), "1950-01-01/2013-12-18");
  assert.equal(datasetTemporalCoverage("2013-12-19/.."), "2013-12-19/..");
  assert.equal(datasetTemporalCoverage("../2008"), "../2008");
  assert.equal(datasetTemporalCoverage("2011/2012"), "2011/2012");
  assert.equal(datasetTemporalCoverage("2008/2007"), "");
  assert.equal(datasetTemporalCoverage("../.."), "");
  assert.equal(datasetTemporalCoverage("22 October 2026"), "");
  assert.equal(datasetTemporalCoverage("2011-02-31"), "");
  assert.equal(datasetLicenseUrl("CC-BY-4.0"), "");
  assert.equal(datasetLicenseUrl("https://creativecommons.org/licenses/by/4.0"), "https://creativecommons.org/licenses/by/4.0");
  assert.equal(datasetLicenseUrl("example.com/licenses/by/4.0"), "https://example.com/licenses/by/4.0");
  assert.equal(datasetEncodingFormat("CSV"), "CSV");
  assert.equal(datasetEncodingFormat("text/csv"), "text/csv");
  assert.equal(datasetEncodingFormat("https://www.iana.org/assignments/media-types/text/csv"), "https://www.iana.org/assignments/media-types/text/csv");
});

test("Dataset writes the visible fields and leaves invalid ones out", () => {
  const description = "A short summary of the table already on the page, long enough for Google’s dataset minimum.";
  const script = buildDatasetSchema({
    ...blank,
    name: "  Example   < Set ",
    description: `<b>${description}</b>`,
    url: "example.com/data/example",
    license: "https://creativecommons.org/publicdomain/zero/1.0/",
    creators: [
      { name: "  Example Office ", kind: "Organization", url: "example.com/orgs/example" },
      { name: "", kind: "Person", url: "https://example.com/people/ignored" },
      { name: "Name on the dataset page", kind: "Person", url: "" },
    ],
    keywords: "climate, climate\nwater vapor",
    temporalCoverage: "1950-01-01/2013-12-18",
    distributions: [
      { contentUrl: "example.com/data/example.csv", encodingFormat: "CSV" },
      { contentUrl: "https://example.com/data/example.csv", encodingFormat: "XML" },
      { contentUrl: "not a url", encodingFormat: "JSON" },
      { contentUrl: "https://example.com/data/example.json", encodingFormat: "application/json" },
    ],
  });
  assert.match(script, /Example \\u003c Set/);
  const data = parse(script);

  assert.equal(data["@context"], "https://schema.org");
  assert.equal(data["@type"], "Dataset");
  assert.equal(data.name, "Example < Set");
  assert.equal(data.description, description);
  assert.equal(data.url, "https://example.com/data/example");
  assert.equal(data.license, "https://creativecommons.org/publicdomain/zero/1.0/");
  assert.deepEqual(data.creator, [
    { "@type": "Organization", name: "Example Office", url: "https://example.com/orgs/example" },
    { "@type": "Person", name: "Name on the dataset page" },
  ]);
  assert.deepEqual(data.keywords, ["climate", "water vapor"]);
  assert.equal(data.temporalCoverage, "1950-01-01/2013-12-18");
  assert.deepEqual(data.distribution, [
    { "@type": "DataDownload", contentUrl: "https://example.com/data/example.csv", encodingFormat: "CSV" },
    {
      "@type": "DataDownload",
      contentUrl: "https://example.com/data/example.json",
      encodingFormat: "application/json",
    },
  ]);
  assert.equal("sameAs" in data, false);
  assert.equal("identifier" in data, false);
  assert.equal("citation" in data, false);
  assert.equal("includedInDataCatalog" in data, false);
});

test("one creator and one download are objects, and a short description is still written", () => {
  const data = parse(
    buildDatasetSchema({
      ...blank,
      name: "Example Dataset",
      description: "Too short for Google.",
      creators: [{ name: "Example Office", kind: "NotAType", url: "" }],
      keywords: "https://example.com/keywords/climate",
      temporalCoverage: "2008",
      license: "CC-BY-4.0",
      distributions: [{ contentUrl: "https://example.com/data/example.csv", encodingFormat: "" }],
    }),
  );

  assert.equal(data.description, "Too short for Google.");
  assert.deepEqual(data.creator, { "@type": "Organization", name: "Example Office" });
  assert.equal(data.keywords, "https://example.com/keywords/climate");
  assert.equal(data.temporalCoverage, "2008");
  assert.equal("license" in data, false);
  assert.deepEqual(data.distribution, {
    "@type": "DataDownload",
    contentUrl: "https://example.com/data/example.csv",
  });
  assert.equal("encodingFormat" in (data.distribution as Record<string, unknown>), false);
});

test("a download without a content URL is left out", () => {
  const data = parse(
    buildDatasetSchema({
      ...blank,
      name: "Example Dataset",
      distributions: [{ contentUrl: "", encodingFormat: "CSV" }],
      creators: [{ name: "", kind: "Organization", url: "https://example.com/orgs/ignored" }],
    }),
  );
  assert.equal("distribution" in data, false);
  assert.equal("creator" in data, false);
});
