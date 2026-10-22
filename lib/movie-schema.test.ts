import assert from "node:assert/strict";
import { test } from "node:test";
import { buildMovieSchema, movieDate } from "./generators.ts";

function parse(script: string) {
  const json = script.replace(/^<script type="application\/ld\+json">\n/, "").replace(/\n<\/script>\n$/, "");
  return JSON.parse(json) as Record<string, unknown>;
}

const blank = {
  name: "",
  description: "",
  directorName: "",
  directorUrl: "",
  actors: [] as { name: string; kind: string; url: string }[],
  datePublished: "",
  genres: "",
  imageUrl: "",
  hours: "",
  minutes: "",
  seconds: "",
  url: "",
  ratingValue: "",
  ratingCount: "",
  bestRating: "",
};

test("Movie JSON-LD is empty until the name is present", () => {
  assert.equal(buildMovieSchema({ ...blank, name: "  ", genres: "Drama" }), "");
  assert.equal(movieDate("2026-10-22"), "2026-10-22");
  assert.equal(movieDate("2026-10-22T15:04:00Z"), "2026-10-22T15:04:00Z");
  assert.equal(movieDate("2011"), "2011");
  assert.equal(movieDate("22 October 2026"), "");
  assert.equal(movieDate("  "), "");
});

test("Movie writes the visible fields and leaves invalid ones out", () => {
  const script = buildMovieSchema({
    ...blank,
    name: "  Example   < Film ",
    description: "<b>A film</b> already on the page.",
    directorName: "Name on the film page",
    directorUrl: "https://example.com/directors/example",
    actors: [
      { name: "  First name on the page ", kind: "Person", url: "example.com/actors/first" },
      { name: "", kind: "Person", url: "https://example.com/actors/ignored" },
      { name: "Example Company", kind: "PerformingGroup", url: "" },
    ],
    datePublished: "2011",
    genres: "Drama, Drama\nComedy",
    imageUrl: "https://example.com/films/example.jpg",
    hours: "2",
    minutes: "5",
    seconds: "0",
    url: "example.com/films/example",
    ratingValue: "8",
    ratingCount: "200",
    bestRating: "10",
  });
  assert.match(script, /Example \\u003c Film/);
  const data = parse(script);

  assert.equal(data["@type"], "Movie");
  assert.equal(data.name, "Example < Film");
  assert.equal(data.description, "A film already on the page.");
  assert.deepEqual(data.director, {
    "@type": "Person",
    name: "Name on the film page",
    url: "https://example.com/directors/example",
  });
  assert.deepEqual(data.actor, [
    { "@type": "Person", name: "First name on the page", url: "https://example.com/actors/first" },
    { "@type": "PerformingGroup", name: "Example Company" },
  ]);
  assert.equal(data.datePublished, "2011");
  assert.deepEqual(data.genre, ["Drama", "Comedy"]);
  assert.equal(data.image, "https://example.com/films/example.jpg");
  assert.equal(data.duration, "PT2H5M");
  assert.equal(data.url, "https://example.com/films/example");
  assert.deepEqual(data.aggregateRating, {
    "@type": "AggregateRating",
    ratingValue: "8",
    ratingCount: "200",
    bestRating: "10",
  });
  assert.equal("review" in data, false);
  assert.equal("reviewCount" in data, false);
  assert.equal("dateCreated" in data, false);
  assert.equal("actors" in data, false);
  assert.equal("itemListElement" in data, false);
});

test("one actor is an object, and a rating above the ceiling is left out", () => {
  const data = parse(
    buildMovieSchema({
      ...blank,
      name: "Example Film",
      actors: [{ name: "Name on the film page", kind: "NotAType", url: "" }],
      genres: "https://example.com/genres/drama",
      datePublished: "not a date",
      hours: "0",
      minutes: "0",
      seconds: "0",
      imageUrl: "not a url",
      directorName: "",
      directorUrl: "https://example.com/directors/ignored",
      ratingValue: "8",
      ratingCount: "20",
      bestRating: "",
    }),
  );

  assert.deepEqual(data.actor, { "@type": "Person", name: "Name on the film page" });
  assert.equal(data.genre, "https://example.com/genres/drama");
  assert.equal("datePublished" in data, false);
  assert.equal("duration" in data, false);
  assert.equal("image" in data, false);
  assert.equal("director" in data, false);
  assert.equal("aggregateRating" in data, false);
});

test("a rating is omitted unless both the value and the count are valid", () => {
  const rated = parse(
    buildMovieSchema({
      ...blank,
      name: "Example Film",
      ratingValue: "4.6",
      ratingCount: "1,280",
      bestRating: "5",
    }),
  );
  assert.deepEqual(rated.aggregateRating, {
    "@type": "AggregateRating",
    ratingValue: "4.6",
    ratingCount: "1280",
    bestRating: "5",
  });

  const missingCount = parse(
    buildMovieSchema({ ...blank, name: "Example Film", ratingValue: "4.6", ratingCount: "" }),
  );
  assert.equal("aggregateRating" in missingCount, false);
});
