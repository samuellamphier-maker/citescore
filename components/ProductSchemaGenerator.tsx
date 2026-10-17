"use client";

import { useMemo, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import {
  PRODUCT_AVAILABILITY,
  buildProductSchema,
  httpUrl,
  isoCurrency,
  productPrice,
  ratingDecimal,
  reviewCountValue,
} from "@/lib/generators";

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

const availabilityLabel: Record<(typeof PRODUCT_AVAILABILITY)[number], string> = {
  InStock: "In stock",
  OutOfStock: "Out of stock",
  PreOrder: "Pre-order",
  BackOrder: "Back order",
  Discontinued: "Discontinued",
  LimitedAvailability: "Limited availability",
  InStoreOnly: "In store only",
  OnlineOnly: "Online only",
  SoldOut: "Sold out",
  PreSale: "Pre-sale",
};

export function ProductSchemaGenerator() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [brand, setBrand] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [availability, setAvailability] = useState("");
  const [ratingValue, setRatingValue] = useState("");
  const [reviewCount, setReviewCount] = useState("");
  const [bestRating, setBestRating] = useState("");

  const output = useMemo(
    () =>
      buildProductSchema({
        name,
        description,
        imageUrl,
        brand,
        sku,
        price,
        currency,
        availability,
        ratingValue,
        reviewCount,
        bestRating,
      }),
    [name, description, imageUrl, brand, sku, price, currency, availability, ratingValue, reviewCount, bestRating],
  );

  const imageHint =
    imageUrl.trim() && !httpUrl(imageUrl) ? "Enter an image URL a crawler can fetch, or leave this blank." : "";
  const priceHint = price.trim() && !productPrice(price) ? "Enter a number greater than zero, like 18 or 18.00." : "";
  const currencyHint =
    currency.trim() && !isoCurrency(currency) ? "Use a three-letter ISO 4217 code, like USD." : "";
  const ratingHint = ratingHintFor(ratingValue, reviewCount, bestRating);

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Use the name, price, and availability a person can already read on the product
        page. Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Product name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ceramic mug"
            required
          />
        </label>
        <label className="block text-sm font-medium">
          Description
          <textarea
            className={`${field} mt-1`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="A 12 oz ceramic mug sold on this page."
            rows={3}
          />
        </label>
        <label className="block text-sm font-medium">
          Image URL
          <input
            className={`${field} mt-1`}
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://example.com/photos/mug.jpg"
            inputMode="url"
          />
          {imageHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{imageHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Brand
          <input
            className={`${field} mt-1`}
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            placeholder="Northbound"
          />
        </label>
        <label className="block text-sm font-medium">
          SKU
          <input
            className={`${field} mt-1`}
            value={sku}
            onChange={(event) => setSku(event.target.value)}
            placeholder="MUG-12"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Price
            <input
              className={`${field} mt-1`}
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="18.00"
              inputMode="decimal"
            />
            {priceHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{priceHint}</span> : null}
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
            {currencyHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{currencyHint}</span> : null}
          </label>
        </div>
        <label className="block text-sm font-medium">
          Availability
          <select
            className={`${field} mt-1`}
            value={availability}
            onChange={(event) => setAvailability(event.target.value)}
          >
            <option value="">Not stated on the page</option>
            {PRODUCT_AVAILABILITY.map((item) => (
              <option key={item} value={item}>
                {availabilityLabel[item]}
              </option>
            ))}
          </select>
        </label>
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
      <CopyBlock label="Product JSON-LD" value={output} empty="Add a product name to generate the script tag." />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
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
