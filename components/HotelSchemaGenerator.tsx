"use client";

import { useMemo, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import {
  buildHotelSchema,
  clockTime,
  geoDecimalPlaces,
  geoNumber,
  hotelAmenities,
  hotelPriceRange,
  hotelStarRating,
  httpUrl,
  ratingDecimal,
  reviewCountValue,
  telephoneValue,
} from "@/lib/generators";

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

export function HotelSchemaGenerator() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [addressLocality, setAddressLocality] = useState("");
  const [addressRegion, setAddressRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressCountry, setAddressCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [telephone, setTelephone] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [starRatingValue, setStarRatingValue] = useState("");
  const [starBestRating, setStarBestRating] = useState("");
  const [starRatingAuthor, setStarRatingAuthor] = useState("");
  const [checkinTime, setCheckinTime] = useState("");
  const [checkoutTime, setCheckoutTime] = useState("");
  const [amenities, setAmenities] = useState("");
  const [ratingValue, setRatingValue] = useState("");
  const [reviewCount, setReviewCount] = useState("");
  const [bestRating, setBestRating] = useState("");

  const output = useMemo(
    () =>
      buildHotelSchema({
        name,
        description,
        streetAddress,
        addressLocality,
        addressRegion,
        postalCode,
        addressCountry,
        latitude,
        longitude,
        telephone,
        url,
        imageUrl,
        priceRange,
        starRatingValue,
        starBestRating,
        starRatingAuthor,
        checkinTime,
        checkoutTime,
        amenities,
        ratingValue,
        reviewCount,
        bestRating,
      }),
    [
      name,
      description,
      streetAddress,
      addressLocality,
      addressRegion,
      postalCode,
      addressCountry,
      latitude,
      longitude,
      telephone,
      url,
      imageUrl,
      priceRange,
      starRatingValue,
      starBestRating,
      starRatingAuthor,
      checkinTime,
      checkoutTime,
      amenities,
      ratingValue,
      reviewCount,
      bestRating,
    ],
  );

  const started = [
    name,
    description,
    streetAddress,
    addressLocality,
    addressRegion,
    postalCode,
    addressCountry,
    latitude,
    longitude,
    telephone,
    url,
    imageUrl,
    priceRange,
    starRatingValue,
    starBestRating,
    starRatingAuthor,
    checkinTime,
    checkoutTime,
    amenities,
    ratingValue,
    reviewCount,
    bestRating,
  ].some((value) => value.trim());

  const addressMissing =
    name.trim() &&
    ![streetAddress, addressLocality, addressRegion, postalCode, addressCountry].some((value) => value.trim());
  const countryHint =
    addressCountry.trim() && !/^[A-Za-z]{2}$/.test(addressCountry.trim())
      ? "Google’s examples use a two-letter country code, such as US. Other country text is still written."
      : "";
  const phoneHint =
    telephone.trim() && !telephoneValue(telephone)
      ? "Enter a phone number with 7–15 digits, or leave this blank."
      : "";
  const imageHint = imageUrl.trim() && !httpUrl(imageUrl) ? "Enter the image URL, or leave it blank." : "";
  const urlHint = url.trim() && !httpUrl(url) ? "Enter the page URL, or leave it blank." : "";
  const priceHint =
    priceRange.trim() && !hotelPriceRange(priceRange)
      ? "Use the short price range the page shows, such as $$$ or $100 - $240. Longer than 80 characters is left out."
      : "";
  const checkinHint =
    checkinTime.trim() && !clockTime(checkinTime) ? "Use a 24-hour time, like 15:00. A sentence is left out." : "";
  const checkoutHint =
    checkoutTime.trim() && !clockTime(checkoutTime) ? "Use a 24-hour time, like 11:00. A sentence is left out." : "";

  let geoHint = "";
  if (latitude.trim() || longitude.trim()) {
    const lat = geoNumber(latitude, -90, 90);
    const lng = geoNumber(longitude, -180, 180);
    if (!latitude.trim() || !longitude.trim()) geoHint = "Enter both latitude and longitude, or leave both blank.";
    else if (lat === null || lng === null) geoHint = "Latitude runs from -90 to 90. Longitude runs from -180 to 180.";
    else if (geoDecimalPlaces(latitude) < 5 || geoDecimalPlaces(longitude) < 5) {
      geoHint = "Google recommends at least five decimal places. The script uses the numbers you entered.";
    }
  }

  const starAuthorIsUrl =
    /^https?:\/\//i.test(starRatingAuthor.trim()) || /^[^/\s]+\.[^/\s]+\/.+/.test(starRatingAuthor.trim());
  const starWritten = Boolean(hotelStarRating(starRatingValue, starBestRating, starRatingAuthor));
  let starHint = "";
  if (starRatingValue.trim() || starBestRating.trim() || starRatingAuthor.trim()) {
    if (!starRatingValue.trim()) starHint = "Add the official star value. An organization name alone is left out.";
    else if (!starWritten) {
      starHint = "Use a number greater than zero. If you set a best rating, the stars cannot be higher than it.";
    } else if (starAuthorIsUrl) {
      starHint = "Enter the rating organization’s name. A URL alone is left off the rating.";
    } else if (starRatingAuthor.trim().replace(/\s+/g, " ").length > 80) {
      starHint = "The organization name is longer than 80 characters, so it is left off the rating.";
    }
  }

  const amenityLines = amenities.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const amenityCount = hotelAmenities(amenities).length;
  const amenityHint =
    amenityLines.length > 0 && amenityCount < amenityLines.length
      ? "A line was left out. Use a name of at most 80 characters. After a pipe, use true, false, a number, or a note of at most 80 characters. A repeated name is written once."
      : "";

  const ratingStarted = Boolean(ratingValue.trim() || reviewCount.trim() || bestRating.trim());
  const ratingOk = Boolean(
    ratingDecimal(ratingValue) &&
      reviewCountValue(reviewCount) &&
      (!bestRating.trim() || ratingDecimal(bestRating)) &&
      (!bestRating.trim() || Number(ratingDecimal(ratingValue)) <= Number(ratingDecimal(bestRating))),
  );
  const aggregateHint = ratingStarted && !ratingOk
    ? "Enter a rating greater than zero and a review count of at least 1. One without the other is left out. The rating cannot be higher than the best rating."
    : "";

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Use the name, the address, the stars, and the other facts a person can already
        see. Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Example Hotel"
            required
          />
          {started && !name.trim() ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              Add the name. The script is written once the hotel name is present.
            </span>
          ) : null}
        </label>
        <label className="block text-sm font-medium">
          Description
          <textarea
            className={`${field} mt-1 min-h-24`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="The sentence already on the page."
            rows={3}
          />
        </label>
        <fieldset className="grid gap-4">
          <legend className="text-sm font-medium">Address</legend>
          <label className="block text-sm font-medium">
            Street address
            <input
              className={`${field} mt-1`}
              value={streetAddress}
              onChange={(event) => setStreetAddress(event.target.value)}
              placeholder="200 Oak Street"
              autoComplete="street-address"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              City
              <input
                className={`${field} mt-1`}
                value={addressLocality}
                onChange={(event) => setAddressLocality(event.target.value)}
                placeholder="Springfield"
                autoComplete="address-level2"
              />
            </label>
            <label className="block text-sm font-medium">
              Region
              <input
                className={`${field} mt-1`}
                value={addressRegion}
                onChange={(event) => setAddressRegion(event.target.value)}
                placeholder="IL"
                autoComplete="address-level1"
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Postal code
              <input
                className={`${field} mt-1`}
                value={postalCode}
                onChange={(event) => setPostalCode(event.target.value)}
                placeholder="62704"
                autoComplete="postal-code"
              />
            </label>
            <label className="block text-sm font-medium">
              Country
              <input
                className={`${field} mt-1`}
                value={addressCountry}
                onChange={(event) => setAddressCountry(event.target.value)}
                placeholder="US"
                autoComplete="country"
              />
              {countryHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{countryHint}</span> : null}
            </label>
          </div>
          {addressMissing ? (
            <p className="text-xs text-ink-soft">
              Google’s local business rich result needs an address as well as the name. The script is still written from
              the name.
            </p>
          ) : null}
        </fieldset>
        <fieldset className="grid gap-4">
          <legend className="text-sm font-medium">Geo coordinates</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Latitude
              <input
                className={`${field} mt-1`}
                value={latitude}
                onChange={(event) => setLatitude(event.target.value)}
                placeholder="39.78172"
                inputMode="decimal"
              />
            </label>
            <label className="block text-sm font-medium">
              Longitude
              <input
                className={`${field} mt-1`}
                value={longitude}
                onChange={(event) => setLongitude(event.target.value)}
                placeholder="-89.65015"
                inputMode="decimal"
              />
            </label>
          </div>
          {geoHint ? <p className="text-xs text-ink-soft">{geoHint}</p> : null}
        </fieldset>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Telephone
            <input
              className={`${field} mt-1`}
              value={telephone}
              onChange={(event) => setTelephone(event.target.value)}
              placeholder="+1-555-010-0148"
              inputMode="tel"
              autoComplete="tel"
            />
            {phoneHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{phoneHint}</span> : null}
          </label>
          <label className="block text-sm font-medium">
            Page URL
            <input
              className={`${field} mt-1`}
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://example.com/hotels/example"
              inputMode="url"
              autoComplete="url"
            />
            {urlHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{urlHint}</span> : null}
          </label>
        </div>
        <label className="block text-sm font-medium">
          Image URL
          <input
            className={`${field} mt-1`}
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://example.com/photos/example.jpg"
            inputMode="url"
          />
          {imageHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{imageHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          priceRange
          <input
            className={`${field} mt-1`}
            value={priceRange}
            onChange={(event) => setPriceRange(event.target.value)}
            placeholder="$$$"
          />
          {priceHint ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">{priceHint}</span>
          ) : (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              The text the page shows, such as $$$ or $100 - $240. This is not a room rate and not an Offer.
            </span>
          )}
        </label>
        <fieldset className="grid gap-4">
          <legend className="text-sm font-medium">Official star rating</legend>
          <p className="text-xs text-ink-soft">
            schema.org starRating is the official classification, not the guest average. Leave it blank when the page
            does not show one.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block text-sm font-medium">
              Stars
              <input
                className={`${field} mt-1`}
                value={starRatingValue}
                onChange={(event) => setStarRatingValue(event.target.value)}
                placeholder="4"
                inputMode="decimal"
              />
            </label>
            <label className="block text-sm font-medium">
              Best
              <input
                className={`${field} mt-1`}
                value={starBestRating}
                onChange={(event) => setStarBestRating(event.target.value)}
                placeholder="5"
                inputMode="decimal"
              />
            </label>
            <label className="block text-sm font-medium">
              Rating organization
              <input
                className={`${field} mt-1`}
                value={starRatingAuthor}
                onChange={(event) => setStarRatingAuthor(event.target.value)}
                placeholder="Hotelstars"
              />
            </label>
          </div>
          {starHint ? <p className="text-xs text-ink-soft">{starHint}</p> : null}
        </fieldset>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            checkinTime
            <input
              className={`${field} mt-1`}
              value={checkinTime}
              onChange={(event) => setCheckinTime(event.target.value)}
              placeholder="15:00"
              inputMode="numeric"
              spellCheck={false}
            />
            {checkinHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{checkinHint}</span> : null}
          </label>
          <label className="block text-sm font-medium">
            checkoutTime
            <input
              className={`${field} mt-1`}
              value={checkoutTime}
              onChange={(event) => setCheckoutTime(event.target.value)}
              placeholder="11:00"
              inputMode="numeric"
              spellCheck={false}
            />
            {checkoutHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{checkoutHint}</span> : null}
          </label>
        </div>
        <label className="block text-sm font-medium">
          amenityFeature
          <textarea
            className={`${field} mt-1 min-h-28 font-mono`}
            value={amenities}
            onChange={(event) => setAmenities(event.target.value)}
            placeholder={"Pool\nSauna | true\nShuttle | complimentary"}
            rows={4}
            spellCheck={false}
          />
          {amenityHint ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">{amenityHint}</span>
          ) : (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              One feature per line. No pipe means value true. After a pipe: true, false, a number, or a short note.
            </span>
          )}
        </label>
        <fieldset className="grid gap-4">
          <legend className="text-sm font-medium">aggregateRating (optional)</legend>
          <p className="text-xs text-ink-soft">
            The guest average, only when the page shows it. This is not starRating. Google recommends this property for
            sites that review other businesses. A hotel marking up its own guest stars is outside that recommendation.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block text-sm font-medium">
              Rating
              <input
                className={`${field} mt-1`}
                value={ratingValue}
                onChange={(event) => setRatingValue(event.target.value)}
                placeholder="4.5"
                inputMode="decimal"
              />
            </label>
            <label className="block text-sm font-medium">
              Review count
              <input
                className={`${field} mt-1`}
                value={reviewCount}
                onChange={(event) => setReviewCount(event.target.value)}
                placeholder="1200"
                inputMode="numeric"
              />
            </label>
            <label className="block text-sm font-medium">
              Best
              <input
                className={`${field} mt-1`}
                value={bestRating}
                onChange={(event) => setBestRating(event.target.value)}
                placeholder="5"
                inputMode="decimal"
              />
            </label>
          </div>
          {aggregateHint ? <p className="text-xs text-ink-soft">{aggregateHint}</p> : null}
        </fieldset>
      </div>
      <CopyBlock label="Hotel JSON-LD" value={output} empty="Add a name to generate the script tag." />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}
