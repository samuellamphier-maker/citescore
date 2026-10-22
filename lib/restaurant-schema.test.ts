import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildRestaurantSchema,
  restaurantCuisines,
  restaurantPriceRange,
  restaurantReservations,
  type RestaurantInput,
} from "./generators.ts";

function parse(script: string) {
  const json = script.replace(/^<script type="application\/ld\+json">\n/, "").replace(/\n<\/script>\n$/, "");
  return JSON.parse(json) as Record<string, unknown>;
}

const blank: RestaurantInput = {
  name: "",
  description: "",
  streetAddress: "",
  addressLocality: "",
  addressRegion: "",
  postalCode: "",
  addressCountry: "",
  latitude: "",
  longitude: "",
  telephone: "",
  url: "",
  imageUrl: "",
  cuisines: "",
  priceRange: "",
  hours: [],
  menuUrl: "",
  acceptsReservations: "",
};

test("Restaurant JSON-LD is empty until the name is present", () => {
  assert.equal(buildRestaurantSchema({ ...blank, name: "  ", description: "A sentence." }), "");
  assert.equal(restaurantPriceRange("$$"), "$$");
  assert.equal(restaurantPriceRange("$10-15"), "$10-15");
  assert.equal(restaurantPriceRange("x".repeat(100)), "");
  assert.equal(restaurantPriceRange("x".repeat(99)), "x".repeat(99));
  assert.deepEqual(restaurantCuisines(`\n\n${"y".repeat(81)}\n`), []);
  assert.equal(restaurantReservations(""), null);
  assert.equal(restaurantReservations("call ahead"), null);
  assert.equal(restaurantReservations("Yes."), null);
});

test("Restaurant writes the visible fields and leaves invalid ones out", () => {
  const script = buildRestaurantSchema({
    ...blank,
    name: "  Example   < Restaurant ",
    description: "  The sentence already on the page. ",
    streetAddress: "418 Cedar Street",
    addressLocality: "Springfield",
    addressRegion: "IL",
    postalCode: "62704",
    addressCountry: "us",
    latitude: "39.78172",
    longitude: "-89.65015",
    telephone: "+1-555-010-0194",
    url: "example.com/restaurants/example",
    imageUrl: "example.com/photos/example.jpg",
    cuisines: "Middle Eastern\n\nMediterranean\nMiddle Eastern\n",
    priceRange: "$$",
    hours: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "11:00", closes: "14:30" },
      { days: ["Friday"], opens: "11:00:00", closes: "22:00" },
      { days: ["Sunday"], opens: "00:00", closes: "00:00" },
    ],
    menuUrl: "example.com/restaurants/example/menu",
    acceptsReservations: " yes ",
  });
  assert.match(script, /Example \\u003c Restaurant/);
  const data = parse(script);

  assert.equal(data["@context"], "https://schema.org");
  assert.equal(data["@type"], "Restaurant");
  assert.equal(data.name, "Example < Restaurant");
  assert.equal(data.description, "The sentence already on the page.");
  assert.deepEqual(data.address, {
    "@type": "PostalAddress",
    streetAddress: "418 Cedar Street",
    addressLocality: "Springfield",
    addressRegion: "IL",
    postalCode: "62704",
    addressCountry: "US",
  });
  assert.deepEqual(data.geo, { "@type": "GeoCoordinates", latitude: 39.78172, longitude: -89.65015 });
  assert.equal(data.telephone, "+1-555-010-0194");
  assert.equal(data.url, "https://example.com/restaurants/example");
  assert.deepEqual(data.image, ["https://example.com/photos/example.jpg"]);
  assert.deepEqual(data.servesCuisine, ["Middle Eastern", "Mediterranean"]);
  assert.equal(data.priceRange, "$$");
  assert.deepEqual(data.openingHoursSpecification, [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "11:00",
      closes: "14:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "11:00:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "00:00",
      closes: "00:00",
    },
  ]);
  assert.equal(data.menu, "https://example.com/restaurants/example/menu");
  assert.equal(data.acceptsReservations, true);
  assert.equal("hasMenu" in data, false);
  assert.equal("openingHours" in data, false);
  assert.equal("review" in data, false);
  assert.equal("aggregateRating" in data, false);
  assert.equal("starRating" in data, false);
});

test("a partial address is kept, and a partial geo, cuisine, hour, or reservation is left out", () => {
  const data = parse(
    buildRestaurantSchema({
      ...blank,
      name: "Example Restaurant",
      addressLocality: "Springfield",
      latitude: "39.78172",
      longitude: "",
      telephone: "call the desk",
      cuisines: "Coffee",
      priceRange: " ".repeat(3),
      hours: [
        { days: ["Monday"], opens: "11am", closes: "21:00" },
        { days: [], opens: "11:00", closes: "21:00" },
        { days: ["Tuesday"], opens: "17:00", closes: "21:00" },
      ],
      menuUrl: "not a url",
      acceptsReservations: "https://example.com/book",
      imageUrl: "not a url",
    }),
  );

  assert.deepEqual(data.address, { "@type": "PostalAddress", addressLocality: "Springfield" });
  assert.equal("geo" in data, false);
  assert.equal("telephone" in data, false);
  assert.equal("image" in data, false);
  assert.equal("menu" in data, false);
  assert.equal("priceRange" in data, false);
  assert.equal(data.servesCuisine, "Coffee");
  assert.deepEqual(data.openingHoursSpecification, {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Tuesday",
    opens: "17:00",
    closes: "21:00",
  });
  assert.equal(data.acceptsReservations, "https://example.com/book");
});

test("reservation no is false, and a long cuisine line is left out", () => {
  assert.equal(restaurantReservations("NO"), false);
  assert.equal(restaurantReservations("false"), false);
  assert.deepEqual(restaurantCuisines(`Coffee\nCoffee\n${"z".repeat(81)}`), ["Coffee"]);
  const data = parse(
    buildRestaurantSchema({
      ...blank,
      name: "Example Restaurant",
      acceptsReservations: "no",
      priceRange: "x".repeat(100),
    }),
  );
  assert.equal(data.acceptsReservations, false);
  assert.equal("priceRange" in data, false);
  assert.equal("menu" in data, false);
  assert.equal("servesCuisine" in data, false);
});
