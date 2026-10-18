"use client";

import { useMemo, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import {
  SOFTWARE_APPLICATION_CATEGORIES,
  buildSoftwareApplicationSchema,
  httpUrl,
  isoCurrency,
  nonNegativePrice,
  ratingDecimal,
  reviewCountValue,
} from "@/lib/generators";

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

export function SoftwareApplicationSchemaGenerator() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("");
  const [applicationCategory, setApplicationCategory] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [ratingValue, setRatingValue] = useState("");
  const [reviewCount, setReviewCount] = useState("");
  const [bestRating, setBestRating] = useState("");

  const output = useMemo(
    () =>
      buildSoftwareApplicationSchema({
        name,
        description,
        url,
        operatingSystem,
        applicationCategory,
        price,
        currency,
        ratingValue,
        reviewCount,
        bestRating,
      }),
    [name, description, url, operatingSystem, applicationCategory, price, currency, ratingValue, reviewCount, bestRating],
  );

  const urlHint = url.trim() && !httpUrl(url) ? "Enter a URL, like https://example.com/app, or leave this blank." : "";
  const priceHint = offerHint(price, currency);
  const ratingHint = ratingHintFor(ratingValue, reviewCount, bestRating);

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Use the name, price, and operating system a person can already read on the app
        page. Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Application name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Northbound"
            required
          />
        </label>
        <label className="block text-sm font-medium">
          Description
          <textarea
            className={`${field} mt-1`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="A web app for field notes, sold on this page."
            rows={3}
          />
        </label>
        <label className="block text-sm font-medium">
          URL
          <input
            className={`${field} mt-1`}
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com/northbound"
            inputMode="url"
          />
          {urlHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{urlHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Operating system
          <input
            className={`${field} mt-1`}
            value={operatingSystem}
            onChange={(event) => setOperatingSystem(event.target.value)}
            placeholder="Web, or Windows 11, macOS 14, Android"
          />
        </label>
        <label className="block text-sm font-medium">
          Application category
          <select
            className={`${field} mt-1`}
            value={applicationCategory}
            onChange={(event) => setApplicationCategory(event.target.value)}
          >
            <option value="">Not stated on the page</option>
            {SOFTWARE_APPLICATION_CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <span className="mt-1 block text-xs font-normal text-ink-soft">
            Google’s software app list uses these types. Leave the select blank when the page does not name one.
          </span>
        </label>
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium">Offer</legend>
          <p className="text-xs text-ink-soft">Use 0 when the page says the app is free. A price above zero needs a currency.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Price
              <input
                className={`${field} mt-1`}
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="39.00"
                inputMode="decimal"
              />
            </label>
            <label className="block text-sm font-medium">
              Currency
              <input
                className={`${field} mt-1`}
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
                placeholder="USD"
                maxLength={3}
                autoCapitalize="characters"
              />
            </label>
          </div>
          {priceHint ? <span className="text-xs font-normal text-ink-soft">{priceHint}</span> : null}
        </fieldset>
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium">Aggregate rating (optional)</legend>
          <p className="text-xs text-ink-soft">Only when the page shows this rating and this review count.</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block text-sm font-medium">
              Rating value
              <input
                className={`${field} mt-1`}
                value={ratingValue}
                onChange={(event) => setRatingValue(event.target.value)}
                placeholder="4.6"
                inputMode="decimal"
              />
            </label>
            <label className="block text-sm font-medium">
              Review count
              <input
                className={`${field} mt-1`}
                value={reviewCount}
                onChange={(event) => setReviewCount(event.target.value)}
                placeholder="128"
                inputMode="numeric"
              />
            </label>
            <label className="block text-sm font-medium">
              Best rating
              <input
                className={`${field} mt-1`}
                value={bestRating}
                onChange={(event) => setBestRating(event.target.value)}
                placeholder="5"
                inputMode="decimal"
              />
            </label>
          </div>
          {ratingHint ? <span className="text-xs font-normal text-ink-soft">{ratingHint}</span> : null}
        </fieldset>
      </div>
      <CopyBlock
        label="SoftwareApplication JSON-LD"
        value={output}
        empty="Add an application name to generate the script tag."
      />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}

function offerHint(price: string, currency: string) {
  if (price.trim() && !nonNegativePrice(price)) return "Enter a price of zero or more. Use 0 when the app is free.";
  if (currency.trim() && !isoCurrency(currency)) return "Use a three-letter ISO 4217 code, like USD.";
  const amount = nonNegativePrice(price);
  const code = isoCurrency(currency);
  if (amount && Number(amount) > 0 && !code) return "Add a three-letter currency, like USD.";
  if (!price.trim() && code) return "Add the price, or clear the currency. Use 0 when the app is free.";
  return "";
}

function ratingHintFor(ratingValue: string, reviewCount: string, bestRating: string) {
  if (ratingValue.trim() && !ratingDecimal(ratingValue)) return "Enter a rating greater than zero, like 4.6.";
  if (reviewCount.trim() && !reviewCountValue(reviewCount)) return "Enter a whole number of reviews, like 128.";
  if (bestRating.trim() && !ratingDecimal(bestRating)) {
    return "Enter a best rating greater than zero, like 5, or leave it blank.";
  }
  const rating = ratingDecimal(ratingValue);
  const reviews = reviewCountValue(reviewCount);
  if (rating && !reviews) return "Add the review count the page shows, or clear the rating.";
  if (reviews && !rating) return "Add the rating value the page shows, or clear the review count.";
  if (!rating || !reviews) return "";
  const ceiling = bestRating.trim() ? Number(ratingDecimal(bestRating)) : 5;
  if (Number(rating) > ceiling) {
    return bestRating.trim()
      ? "The rating is higher than the best rating."
      : "schema.org treats a missing best rating as 5. Enter a best rating, or use a value of 5 or less.";
  }
  return "";
}
