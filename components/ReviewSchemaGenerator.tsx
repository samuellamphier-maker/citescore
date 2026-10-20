"use client";

import { useMemo, useRef, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import {
  REVIEW_ITEM_TYPES,
  buildReviewSchema,
  httpUrl,
  isoDay,
  ratingFloor,
  ratingOnScale,
  reviewCountValue,
  reviewEntryComplete,
  reviewScaleOk,
  type ReviewEntryInput,
} from "@/lib/generators";

type ReviewRow = ReviewEntryInput & { id: string };

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

const itemLabel: Record<(typeof REVIEW_ITEM_TYPES)[number], string> = {
  Product: "Product",
  SoftwareApplication: "Software application",
};

function emptyReview(id: string): ReviewRow {
  return {
    id,
    authorName: "",
    authorKind: "Person",
    name: "",
    reviewBody: "",
    ratingValue: "",
    datePublished: "",
  };
}

export function ReviewSchemaGenerator() {
  const seq = useRef(1);
  const [itemType, setItemType] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [ratingValue, setRatingValue] = useState("");
  const [reviewCount, setReviewCount] = useState("");
  const [ratingCount, setRatingCount] = useState("");
  const [bestRating, setBestRating] = useState("");
  const [worstRating, setWorstRating] = useState("");
  const [reviews, setReviews] = useState<ReviewRow[]>([emptyReview("review-1")]);

  const output = useMemo(
    () =>
      buildReviewSchema({
        itemType,
        name,
        description,
        url,
        ratingValue,
        reviewCount,
        ratingCount,
        bestRating,
        worstRating,
        reviews,
      }),
    [itemType, name, description, url, ratingValue, reviewCount, ratingCount, bestRating, worstRating, reviews],
  );

  function nextId() {
    seq.current += 1;
    return `review-${seq.current}`;
  }

  const started = [
    itemType,
    name,
    description,
    url,
    ratingValue,
    reviewCount,
    ratingCount,
    bestRating,
    worstRating,
    ...reviews.flatMap((row) => [row.authorName, row.name, row.reviewBody, row.ratingValue, row.datePublished]),
  ].some((value) => value.trim());

  const scaleOk = reviewScaleOk(bestRating, worstRating);
  const aggregateReady = Boolean(
    ratingOnScale(ratingValue, bestRating, worstRating) &&
      (reviewCountValue(reviewCount) || reviewCountValue(ratingCount)),
  );
  const completeReviews = reviews.filter((row) => reviewEntryComplete(row, bestRating, worstRating)).length;

  const nameMissing = started && !name.trim();
  const typeHint = started && !itemType ? "Choose Product or Software application." : "";
  const urlHint = url.trim() && !httpUrl(url) ? "Enter the page URL, or leave it blank." : "";
  const scaleHint = scaleHintFor(bestRating, worstRating, scaleOk);
  const ratingHint = aggregateRatingHint(ratingValue, bestRating, worstRating, scaleOk);
  const reviewCountHint =
    reviewCount.trim() && !reviewCountValue(reviewCount)
      ? "Enter a whole number of reviews, like 89, or leave this blank."
      : "";
  const ratingCountHint =
    ratingCount.trim() && !reviewCountValue(ratingCount)
      ? "Enter a whole number of ratings, like 120, or leave this blank."
      : "";
  const aggregateGap =
    (ratingValue.trim() || reviewCount.trim() || ratingCount.trim()) && !aggregateReady && scaleOk
      ? "An aggregate rating needs the rating value and a review count or a rating count."
      : "";

  const missing = [
    itemType ? "" : "item type",
    name.trim() ? "" : "name",
    aggregateReady || completeReviews > 0 ? "" : "aggregate rating or one review",
    completeReviews >= 2 && !aggregateReady ? "aggregate rating for the reviews" : "",
  ].filter(Boolean);

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Use the name, the rating, and the review text a person can already read on the
        page. Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Item type
          <select className={`${field} mt-1`} value={itemType} onChange={(event) => setItemType(event.target.value)} required>
            <option value="">Choose one</option>
            {REVIEW_ITEM_TYPES.map((item) => (
              <option key={item} value={item}>
                {itemLabel[item]}
              </option>
            ))}
          </select>
          <span className="mt-1 block text-xs font-normal text-ink-soft">
            Product or SoftwareApplication. This form does not write LocalBusiness or Organization.
          </span>
          {typeHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{typeHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Example notes app"
            required
          />
          {nameMissing ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">Add the name shown on the page.</span>
          ) : null}
        </label>
        <label className="block text-sm font-medium">
          Description
          <textarea
            className={`${field} mt-1`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="A short description already on the page."
            rows={3}
          />
        </label>
        <label className="block text-sm font-medium">
          Page URL
          <input
            className={`${field} mt-1`}
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com/app"
            inputMode="url"
          />
          {urlHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{urlHint}</span> : null}
        </label>
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium">Rating scale</legend>
          <p className="text-xs text-ink-soft">
            Optional. Leave both blank for 1 to 5, which is the scale Google assumes. A bound is written only when you
            fill it in.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
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
            <label className="block text-sm font-medium">
              Worst rating
              <input
                className={`${field} mt-1`}
                value={worstRating}
                onChange={(event) => setWorstRating(event.target.value)}
                placeholder="1"
                inputMode="decimal"
              />
            </label>
          </div>
          {scaleHint ? <span className="text-xs font-normal text-ink-soft">{scaleHint}</span> : null}
        </fieldset>
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium">Aggregate rating</legend>
          <p className="text-xs text-ink-soft">
            The average on the page. Needs the rating value and at least one count. Required here when more than one
            review is included.
          </p>
          <label className="block text-sm font-medium">
            Rating value
            <input
              className={`${field} mt-1`}
              value={ratingValue}
              onChange={(event) => setRatingValue(event.target.value)}
              placeholder="4.6"
              inputMode="decimal"
            />
            {ratingHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{ratingHint}</span> : null}
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Review count
              <input
                className={`${field} mt-1`}
                value={reviewCount}
                onChange={(event) => setReviewCount(event.target.value)}
                placeholder="89"
                inputMode="numeric"
              />
              {reviewCountHint ? (
                <span className="mt-1 block text-xs font-normal text-ink-soft">{reviewCountHint}</span>
              ) : null}
            </label>
            <label className="block text-sm font-medium">
              Rating count
              <input
                className={`${field} mt-1`}
                value={ratingCount}
                onChange={(event) => setRatingCount(event.target.value)}
                placeholder="120"
                inputMode="numeric"
              />
              {ratingCountHint ? (
                <span className="mt-1 block text-xs font-normal text-ink-soft">{ratingCountHint}</span>
              ) : null}
            </label>
          </div>
          {aggregateGap ? <span className="text-xs font-normal text-ink-soft">{aggregateGap}</span> : null}
        </fieldset>
        <fieldset className="grid gap-4">
          <legend className="text-sm font-medium">Reviews</legend>
          <p className="text-xs text-ink-soft">
            Optional when the aggregate rating is filled in. Each review needs an author, the review text, and a
            rating. A blank row is left out. A team name uses Organization.
          </p>
          {reviews.map((row, index) => (
            <ReviewFields
              key={row.id}
              index={index}
              row={row}
              bestRating={bestRating}
              worstRating={worstRating}
              scaleOk={scaleOk}
              onChange={(next) => setReviews(reviews.map((item) => (item.id === row.id ? next : item)))}
              onRemove={() =>
                setReviews(reviews.length === 1 ? [emptyReview(row.id)] : reviews.filter((item) => item.id !== row.id))
              }
            />
          ))}
          <button
            type="button"
            className="justify-self-start rounded-lg border border-rule bg-white px-4 py-2 text-sm"
            onClick={() => setReviews([...reviews, emptyReview(nextId())])}
          >
            Add a review
          </button>
        </fieldset>
      </div>
      {started && missing.length > 0 ? (
        <p className="mt-4 text-xs text-ink-soft">Still needed: {missing.join(", ")}.</p>
      ) : null}
      {completeReviews >= 2 && !aggregateReady ? (
        <p className="mt-2 text-xs text-ink-soft">
          More than one review is filled in, so the script waits for an aggregate rating.
        </p>
      ) : null}
      <CopyBlock
        label="Review JSON-LD"
        value={output}
        empty="Choose Product or Software application, add the name, and add an aggregate rating or one review."
      />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}

function ReviewFields({
  index,
  row,
  bestRating,
  worstRating,
  scaleOk,
  onChange,
  onRemove,
}: {
  index: number;
  row: ReviewRow;
  bestRating: string;
  worstRating: string;
  scaleOk: boolean;
  onChange: (next: ReviewRow) => void;
  onRemove: () => void;
}) {
  const touched = [row.authorName, row.name, row.reviewBody, row.ratingValue, row.datePublished].some((value) =>
    value.trim(),
  );
  const author = row.authorName.trim().replace(/\s+/g, " ");
  const authorHint = author.length >= 100 ? "Google’s review documentation wants an author name shorter than 100 characters." : "";
  const bodyHint = touched && !row.reviewBody.trim() ? "Add the review text shown on the page." : "";
  const ratingHint = rowRatingHint(row.ratingValue, bestRating, worstRating, scaleOk, touched);
  const dateHint = dateHintFor(row.datePublished);

  return (
    <div className="grid gap-3 rounded-xl border border-rule bg-white/60 p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">Review {index + 1}</p>
        <button type="button" className="text-sm text-ink-soft underline-offset-4 hover:underline" onClick={onRemove}>
          Remove
        </button>
      </div>
      <label className="block text-sm font-medium">
        Author
        <input
          className={`${field} mt-1`}
          value={row.authorName}
          onChange={(event) => onChange({ ...row, authorName: event.target.value })}
          placeholder="Name printed with the review"
        />
        {authorHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{authorHint}</span> : null}
      </label>
      <label className="block text-sm font-medium">
        Author type
        <select
          className={`${field} mt-1`}
          value={row.authorKind}
          onChange={(event) => onChange({ ...row, authorKind: event.target.value })}
        >
          <option value="Person">Person</option>
          <option value="Organization">Organization</option>
        </select>
      </label>
      <label className="block text-sm font-medium">
        Review title
        <input
          className={`${field} mt-1`}
          value={row.name}
          onChange={(event) => onChange({ ...row, name: event.target.value })}
          placeholder="Optional headline already on the page"
        />
      </label>
      <label className="block text-sm font-medium">
        Review text
        <textarea
          className={`${field} mt-1`}
          value={row.reviewBody}
          onChange={(event) => onChange({ ...row, reviewBody: event.target.value })}
          placeholder="The review text already visible on the page."
          rows={3}
        />
        {bodyHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{bodyHint}</span> : null}
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Rating
          <input
            className={`${field} mt-1`}
            value={row.ratingValue}
            onChange={(event) => onChange({ ...row, ratingValue: event.target.value })}
            placeholder="5"
            inputMode="decimal"
          />
          {ratingHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{ratingHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Date published
          <input
            className={`${field} mt-1 font-mono text-[13px]`}
            value={row.datePublished}
            onChange={(event) => onChange({ ...row, datePublished: event.target.value })}
            placeholder="2026-10-01"
            spellCheck={false}
          />
          {dateHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{dateHint}</span> : null}
        </label>
      </div>
    </div>
  );
}

function scaleHintFor(best: string, worst: string, ok: boolean): string {
  if (!best.trim() && !worst.trim()) return "";
  if (ok) return "";
  if (best.trim() && !ratingFloor(best)) return "Use a number for the best rating, or clear it.";
  if (worst.trim() && !ratingFloor(worst)) return "Use a number for the worst rating, or clear it. 0 is allowed.";
  return "The worst rating has to be lower than the best rating.";
}

function aggregateRatingHint(value: string, best: string, worst: string, scaleOk: boolean): string {
  if (!value.trim()) return "";
  if (!scaleOk) return "Fix the rating scale before this value can be written.";
  return ratingOnScale(value, best, worst) ? "" : rangeHint(best, worst);
}

function rowRatingHint(value: string, best: string, worst: string, scaleOk: boolean, touched: boolean): string {
  if (!value.trim()) return touched ? "Add the rating shown with this review." : "";
  if (!scaleOk) return "Fix the rating scale before this value can be written.";
  return ratingOnScale(value, best, worst) ? "" : rangeHint(best, worst);
}

function rangeHint(best: string, worst: string): string {
  const ceiling = best.trim() && ratingFloor(best) ? ratingFloor(best) : "5";
  const floor = worst.trim() && ratingFloor(worst) ? ratingFloor(worst) : "1";
  return `Use a number from ${floor} to ${ceiling}. A blank best rating means 5, and a blank worst rating means 1.`;
}

function dateHintFor(value: string): string {
  if (!value.trim()) return "";
  return isoDay(value) ? "" : "Use a real date, like 2026-10-01, or clear this field.";
}
