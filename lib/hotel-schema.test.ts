import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildHotelSchema,
  hotelAmenities,
  hotelAmenityFromLine,
  hotelPriceRange,
  hotelStarRating,
} from "./generators.ts";

function parse(script: string) {
  const json = script.replace(/^<script type="application\/ld\+json">\n/, "").replace(/\n<\/script>\n$/, "");
  return JSON.parse(json) as Record<string, unknown>;
}

const blank = {
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
  priceRange: "",
  starRatingValue: "",
  starBestRating: "",
  starRatingAuthor: "",
  checkinTime: "",
  checkoutTime: "",
  amenities: "",
  ratingValue: "",
  reviewCount: "",
  bestRating: "",
};

test("Hotel JSON-LD is empty until the name is present", () => {
  assert.equal(buildHotelSchema({ ...blank, name: "  ", description: "A sentence." }), "");
  assert.equal(hotelPriceRange("$$$"), "$$$");
  assert.equal(hotelPriceRange("$100 - $240"), "$100 - $240");
  assert.equal(hotelPriceRange("x".repeat(81)), "");
  assert.equal(hotelAmenityFromLine("   "), null);
  assert.equal(hotelAmenityFromLine("x".repeat(81)), null);
  assert.deepEqual(hotelStarRating("", "5", "Hotelstars"), null);
  assert.deepEqual(hotelStarRating("6", "5", ""), null);
  assert.deepEqual(hotelStarRating("4", "stars", ""), null);
});

test("Hotel writes the visible fields and leaves invalid ones out", () => {
  const script = buildHotelSchema({
    ...blank,
    name: "  Example   < Hotel ",
    description: "  The sentence already on the page. ",
    streetAddress: "200 Oak Street",
    addressLocality: "Springfield",
    addressRegion: "IL",
    postalCode: "62704",
    addressCountry: "us",
    latitude: "39.78172",
    longitude: "-89.65015",
    telephone: "+1-555-010-0148",
    url: "example.com/hotels/example",
    imageUrl: "example.com/photos/example.jpg",
    priceRange: "$100 - $240",
    starRatingValue: "4",
    starBestRating: "5",
    starRatingAuthor: " Hotelstars ",
    checkinTime: "15:00",
    checkoutTime: "11:00:00",
    amenities: "Pool\nSauna | true\nShuttle | complimentary\nMeeting room | false\nParking spaces | 12\nPool\n",
    ratingValue: "4.5",
    reviewCount: "1,200",
    bestRating: "5",
  });
  assert.match(script, /Example \\u003c Hotel/);
  const data = parse(script);

  assert.equal(data["@context"], "https://schema.org");
  assert.equal(data["@type"], "Hotel");
  assert.equal(data.name, "Example < Hotel");
  assert.equal(data.description, "The sentence already on the page.");
  assert.deepEqual(data.address, {
    "@type": "PostalAddress",
    streetAddress: "200 Oak Street",
    addressLocality: "Springfield",
    addressRegion: "IL",
    postalCode: "62704",
    addressCountry: "US",
  });
  assert.deepEqual(data.geo, { "@type": "GeoCoordinates", latitude: 39.78172, longitude: -89.65015 });
  assert.equal(data.telephone, "+1-555-010-0148");
  assert.equal(data.url, "https://example.com/hotels/example");
  assert.deepEqual(data.image, ["https://example.com/photos/example.jpg"]);
  assert.equal(data.priceRange, "$100 - $240");
  assert.deepEqual(data.starRating, {
    "@type": "Rating",
    ratingValue: "4",
    bestRating: "5",
    author: { "@type": "Organization", name: "Hotelstars" },
  });
  assert.equal(data.checkinTime, "15:00");
  assert.equal(data.checkoutTime, "11:00:00");
  assert.deepEqual(data.amenityFeature, [
    { "@type": "LocationFeatureSpecification", name: "Pool", value: true },
    { "@type": "LocationFeatureSpecification", name: "Sauna", value: true },
    { "@type": "LocationFeatureSpecification", name: "Shuttle", value: "complimentary" },
    { "@type": "LocationFeatureSpecification", name: "Meeting room", value: false },
    { "@type": "LocationFeatureSpecification", name: "Parking spaces", value: 12 },
  ]);
  assert.deepEqual(data.aggregateRating, {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    reviewCount: "1200",
    bestRating: "5",
  });
  assert.equal("photo" in data, false);
  assert.equal("makesOffer" in data, false);
  assert.equal("identifier" in data, false);
  assert.equal("review" in data, false);
  assert.equal("openingHoursSpecification" in data, false);
});

test("a partial address is kept, and a partial geo, offer-like pair, or rating is left out", () => {
  const data = parse(
    buildHotelSchema({
      ...blank,
      name: "Example Hotel",
      addressLocality: "Springfield",
      latitude: "39.78172",
      longitude: "",
      telephone: "call the desk",
      priceRange: "",
      starRatingValue: "4",
      starRatingAuthor: "https://example.com/ratings/example",
      checkinTime: "3pm",
      checkoutTime: "",
      amenities: "Pool",
      ratingValue: "4.5",
      reviewCount: "",
      imageUrl: "not a url",
    }),
  );

  assert.deepEqual(data.address, { "@type": "PostalAddress", addressLocality: "Springfield" });
  assert.equal("geo" in data, false);
  assert.equal("telephone" in data, false);
  assert.equal("image" in data, false);
  assert.equal("checkinTime" in data, false);
  assert.equal("aggregateRating" in data, false);
  assert.deepEqual(data.starRating, { "@type": "Rating", ratingValue: "4" });
  assert.deepEqual(data.amenityFeature, {
    "@type": "LocationFeatureSpecification",
    name: "Pool",
    value: true,
  });
});

test("amenity lines and a star rating above its ceiling are left out", () => {
  assert.deepEqual(hotelAmenities(`Pool\n\nPool\n | true\nGym | ${"y".repeat(81)}`), [
    { "@type": "LocationFeatureSpecification", name: "Pool", value: true },
  ]);
  const data = parse(
    buildHotelSchema({
      ...blank,
      name: "Example Hotel",
      starRatingValue: "4",
      starBestRating: "5",
      starRatingAuthor: "x".repeat(81),
      ratingValue: "6",
      reviewCount: "10",
      bestRating: "5",
      priceRange: " ".repeat(3),
    }),
  );
  assert.deepEqual(data.starRating, { "@type": "Rating", ratingValue: "4", bestRating: "5" });
  assert.equal("aggregateRating" in data, false);
  assert.equal("priceRange" in data, false);
  assert.equal("author" in (data.starRating as Record<string, unknown>), false);
});
