import assert from "node:assert/strict";
import { test } from "node:test";
import { buildPodcastSchema, episodeNumberValue, isoTimeDuration } from "./generators.ts";

function parse(script: string) {
  const json = script.replace(/^<script type="application\/ld\+json">\n/, "").replace(/\n<\/script>\n$/, "");
  return JSON.parse(json) as Record<string, unknown>;
}

const blank = {
  type: "PodcastSeries",
  name: "",
  description: "",
  url: "",
  imageUrl: "",
  authorName: "",
  authorKind: "Organization",
  authorUrl: "",
  webFeed: "",
  datePublished: "",
  hours: "",
  minutes: "",
  seconds: "",
  episodeNumber: "",
  audioUrl: "",
  seriesName: "",
  seriesUrl: "",
  seriesWebFeed: "",
};

test("Podcast JSON-LD is empty until the name and a known type are present", () => {
  assert.equal(buildPodcastSchema({ ...blank, name: "  ", webFeed: "https://example.com/feed.xml" }), "");
  assert.equal(buildPodcastSchema({ ...blank, type: "Podcast", name: "Example Show" }), "");
  assert.equal(isoTimeDuration({ hours: "", minutes: "32", seconds: "15" }), "PT32M15S");
  assert.equal(isoTimeDuration({ hours: "1", minutes: "0", seconds: "5" }), "PT1H5S");
  assert.equal(isoTimeDuration({ hours: "0", minutes: "0", seconds: "0" }), "");
  assert.equal(isoTimeDuration({ hours: "", minutes: "1.5", seconds: "" }), "");
  assert.equal(episodeNumberValue("12"), 12);
  assert.equal(episodeNumberValue("0"), 0);
  assert.equal(episodeNumberValue("S2E4"), "S2E4");
  assert.equal(episodeNumberValue("  "), "");
});

test("PodcastSeries writes the visible show fields and leaves episode fields out", () => {
  const data = parse(
    buildPodcastSchema({
      ...blank,
      name: "  Example   Show ",
      description: "<b>A show</b> already on the page.",
      url: "example.com/show",
      imageUrl: "https://example.com/show/cover.jpg",
      authorName: "Example Studio",
      authorKind: "Organization",
      authorUrl: "https://example.com",
      webFeed: "example.com/feed.xml",
      datePublished: "2026-10-21",
      hours: "",
      minutes: "32",
      seconds: "15",
      episodeNumber: "12",
      audioUrl: "https://example.com/show/episode.mp3",
      seriesName: "Ignored",
    }),
  );

  assert.equal(data["@type"], "PodcastSeries");
  assert.equal(data.name, "Example Show");
  assert.equal(data.description, "A show already on the page.");
  assert.equal(data.url, "https://example.com/show");
  assert.equal(data.image, "https://example.com/show/cover.jpg");
  assert.equal(data.webFeed, "https://example.com/feed.xml");
  assert.deepEqual(data.author, {
    "@type": "Organization",
    name: "Example Studio",
    url: "https://example.com/",
  });
  assert.equal("datePublished" in data, false);
  assert.equal("duration" in data, false);
  assert.equal("episodeNumber" in data, false);
  assert.equal("associatedMedia" in data, false);
  assert.equal("partOfSeries" in data, false);
  assert.equal("timeRequired" in data, false);
});

test("PodcastEpisode writes the audio file, the length, and the series", () => {
  const script = buildPodcastSchema({
    ...blank,
    type: "PodcastEpisode",
    name: "Example < episode",
    description: "The notes already on the episode page.",
    url: "https://example.com/show/12",
    datePublished: "2026-10-21T15:04:00Z",
    hours: "",
    minutes: "32",
    seconds: "15",
    episodeNumber: "12",
    audioUrl: "example.com/show/12.mp3",
    seriesName: "Example Show",
    seriesUrl: "https://example.com/show",
    seriesWebFeed: "https://example.com/feed.xml",
    authorName: "",
    authorUrl: "https://example.com/hosts/ignored",
  });
  assert.match(script, /Example \\u003c episode/);
  const data = parse(script);

  assert.equal(data["@type"], "PodcastEpisode");
  assert.equal(data.name, "Example < episode");
  assert.equal(data.datePublished, "2026-10-21T15:04:00Z");
  assert.equal(data.duration, "PT32M15S");
  assert.equal(data.episodeNumber, 12);
  assert.deepEqual(data.associatedMedia, {
    "@type": "AudioObject",
    contentUrl: "https://example.com/show/12.mp3",
  });
  assert.deepEqual(data.partOfSeries, {
    "@type": "PodcastSeries",
    name: "Example Show",
    url: "https://example.com/show",
    webFeed: "https://example.com/feed.xml",
  });
  assert.equal("author" in data, false);
  assert.equal("webFeed" in data, false);
  assert.equal("timeRequired" in data, false);
});

test("an episode leaves out a series URL without a name, a bad date, and a zero length", () => {
  const data = parse(
    buildPodcastSchema({
      ...blank,
      type: "PodcastEpisode",
      name: "Example episode",
      datePublished: "21 October 2026",
      hours: "0",
      minutes: "0",
      seconds: "0",
      episodeNumber: "S2E4",
      audioUrl: "not a url",
      seriesName: "",
      seriesUrl: "https://example.com/show",
      seriesWebFeed: "https://example.com/feed.xml",
      webFeed: "https://example.com/feed.xml",
    }),
  );

  assert.equal("datePublished" in data, false);
  assert.equal("duration" in data, false);
  assert.equal("associatedMedia" in data, false);
  assert.equal("partOfSeries" in data, false);
  assert.equal("webFeed" in data, false);
  assert.equal(data.episodeNumber, "S2E4");
});
