"use client";

import { useMemo, useRef, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import {
  RECIPE_AUTHOR_KINDS,
  buildRecipeSchema,
  httpUrl,
  isoDuration,
  ratingDecimal,
  recipeCalories,
  reviewCountValue,
  type RecipeAuthorKind,
  type RecipeStepInput,
} from "@/lib/generators";

type ImageRow = { id: string; url: string };
type IngredientRow = { id: string; text: string };
type StepRow = RecipeStepInput & { id: string };
type TimeState = { days: string; hours: string; minutes: string };

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

const emptyTime = (): TimeState => ({ days: "", hours: "", minutes: "" });

function emptyImage(id: string): ImageRow {
  return { id, url: "" };
}

function emptyIngredient(id: string): IngredientRow {
  return { id, text: "" };
}

function emptyStep(id: string): StepRow {
  return { id, name: "", text: "" };
}

export function RecipeSchemaGenerator() {
  const seq = useRef(6);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<ImageRow[]>([emptyImage("image-1")]);
  const [authorName, setAuthorName] = useState("");
  const [authorKind, setAuthorKind] = useState<RecipeAuthorKind>("Person");
  const [authorUrl, setAuthorUrl] = useState("");
  const [prep, setPrep] = useState<TimeState>(emptyTime());
  const [cook, setCook] = useState<TimeState>(emptyTime());
  const [total, setTotal] = useState<TimeState>(emptyTime());
  const [recipeYield, setRecipeYield] = useState("");
  const [ingredients, setIngredients] = useState<IngredientRow[]>([
    emptyIngredient("ingredient-1"),
    emptyIngredient("ingredient-2"),
  ]);
  const [steps, setSteps] = useState<StepRow[]>([emptyStep("step-1"), emptyStep("step-2")]);
  const [calories, setCalories] = useState("");
  const [ratingValue, setRatingValue] = useState("");
  const [ratingCount, setRatingCount] = useState("");
  const [bestRating, setBestRating] = useState("");

  const output = useMemo(
    () =>
      buildRecipeSchema({
        name,
        description,
        images: images.map((row) => row.url),
        authorName,
        authorKind,
        authorUrl,
        prep,
        cook,
        total,
        recipeYield,
        ingredients: ingredients.map((row) => row.text),
        steps,
        calories,
        ratingValue,
        ratingCount,
        bestRating,
      }),
    [
      name,
      description,
      images,
      authorName,
      authorKind,
      authorUrl,
      prep,
      cook,
      total,
      recipeYield,
      ingredients,
      steps,
      calories,
      ratingValue,
      ratingCount,
      bestRating,
    ],
  );

  function nextId(prefix: string) {
    seq.current += 1;
    return `${prefix}-${seq.current}`;
  }

  const started =
    [
      name,
      description,
      authorName,
      authorUrl,
      recipeYield,
      calories,
      ratingValue,
      ratingCount,
      bestRating,
      prep.days,
      prep.hours,
      prep.minutes,
      cook.days,
      cook.hours,
      cook.minutes,
      total.days,
      total.hours,
      total.minutes,
    ].some((value) => value.trim()) ||
    images.some((row) => row.url.trim()) ||
    ingredients.some((row) => row.text.trim()) ||
    steps.some((row) => row.name.trim() || row.text.trim());

  const nameMissing = started && !name.trim();
  const hasImage = images.some((row) => httpUrl(row.url));
  const imageMissing =
    name.trim() && !hasImage
      ? "Google’s recipe page lists an image as required for the rich result. This script can still be copied without one."
      : "";
  const authorUrlHint =
    authorUrl.trim() && !httpUrl(authorUrl)
      ? "Enter the author’s URL, or leave it blank. The name is still included."
      : "";
  const authorNameHint =
    !authorName.trim() && authorUrl.trim()
      ? "Add the author name, or clear the URL. A URL alone is left out."
      : "";
  const prepHint = durationFieldsHint(prep);
  const cookHint = durationFieldsHint(cook);
  const totalHint = durationFieldsHint(total);
  const pairHint = timePairHint(prep, cook, prepHint, cookHint);
  const caloriesValue = recipeCalories(calories);
  const caloriesHint =
    calories.trim() && !caloriesValue
      ? "Enter a number of calories, like 120, or leave this blank."
      : caloriesValue && !recipeYield.trim()
        ? "Google’s recipe page says a calorie count requires a yield. The calories are left out until the yield is filled in."
        : "";
  const ratingHint = ratingFieldsHint(ratingValue, ratingCount, bestRating);

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Use the dish name, image, ingredients, steps, and any time, yield, calories, or
        rating a person can already see on the recipe page. Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Dish name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Weeknight tomato soup"
            required
          />
          {nameMissing ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">Add the dish name shown on the page.</span>
          ) : null}
        </label>
        <label className="block text-sm font-medium">
          Description
          <textarea
            className={`${field} mt-1 min-h-24`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="A one-pot tomato soup finished with olive oil and black pepper."
            rows={3}
          />
        </label>
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium">Images</legend>
          <p className="text-xs text-ink-soft">
            URLs of the finished dish. One is enough for the script. Google’s page recommends 16:9, 4:3, and 1:1 when
            you have them. A repeated URL is kept once.
          </p>
          {images.map((row, index) => {
            const hint =
              row.url.trim() && !httpUrl(row.url) ? "Enter an image URL a crawler can fetch, or leave this blank." : "";
            return (
              <div key={row.id} className="grid gap-2">
                <input
                  className={field}
                  value={row.url}
                  aria-label={`Image ${index + 1}`}
                  placeholder="https://example.com/photos/tomato-soup.jpg"
                  inputMode="url"
                  onChange={(event) =>
                    setImages(images.map((item) => (item.id === row.id ? { ...item, url: event.target.value } : item)))
                  }
                />
                {hint ? <p className="text-xs text-ink-soft">{hint}</p> : null}
                <button
                  type="button"
                  className="justify-self-start text-sm text-ink-soft underline-offset-4 hover:underline"
                  onClick={() =>
                    setImages(images.length === 1 ? [emptyImage(row.id)] : images.filter((item) => item.id !== row.id))
                  }
                >
                  Remove
                </button>
              </div>
            );
          })}
          {imageMissing ? <p className="text-xs text-ink-soft">{imageMissing}</p> : null}
          <button
            type="button"
            className="justify-self-start rounded-lg border border-rule bg-white px-4 py-2 text-sm"
            onClick={() => setImages([...images, emptyImage(nextId("image"))])}
          >
            Add an image
          </button>
        </fieldset>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Author name
            <input
              className={`${field} mt-1`}
              value={authorName}
              onChange={(event) => setAuthorName(event.target.value)}
              placeholder="Ada Okonkwo"
            />
            {authorNameHint ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">{authorNameHint}</span>
            ) : null}
          </label>
          <label className="block text-sm font-medium">
            Author type
            <select
              className={`${field} mt-1`}
              value={authorKind}
              onChange={(event) => setAuthorKind(event.target.value as RecipeAuthorKind)}
            >
              {RECIPE_AUTHOR_KINDS.map((kind) => (
                <option key={kind} value={kind}>
                  {kind}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="block text-sm font-medium">
          Author URL
          <input
            className={`${field} mt-1`}
            value={authorUrl}
            onChange={(event) => setAuthorUrl(event.target.value)}
            placeholder="https://example.com/authors/ada"
            inputMode="url"
          />
          {authorUrlHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{authorUrlHint}</span> : null}
        </label>
        <TimeFields legend="Prep time" time={prep} hint={prepHint} onChange={setPrep} />
        <TimeFields legend="Cook time" time={cook} hint={cookHint} onChange={setCook} />
        {pairHint ? <p className="text-xs text-ink-soft">{pairHint}</p> : null}
        <TimeFields legend="Total time" time={total} hint={totalHint} onChange={setTotal} />
        <label className="block text-sm font-medium">
          Yield
          <input
            className={`${field} mt-1`}
            value={recipeYield}
            onChange={(event) => setRecipeYield(event.target.value)}
            placeholder="4 servings"
          />
        </label>
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium">Ingredients</legend>
          <p className="text-xs text-ink-soft">One ingredient per row, as the page shows it. A blank row is left out.</p>
          {ingredients.map((row, index) => (
            <div key={row.id} className="grid gap-2">
              <input
                className={field}
                value={row.text}
                aria-label={`Ingredient ${index + 1}`}
                placeholder="2 tablespoons olive oil"
                onChange={(event) =>
                  setIngredients(
                    ingredients.map((item) => (item.id === row.id ? { ...item, text: event.target.value } : item)),
                  )
                }
              />
              <button
                type="button"
                className="justify-self-start text-sm text-ink-soft underline-offset-4 hover:underline"
                onClick={() =>
                  setIngredients(
                    ingredients.length === 1
                      ? [emptyIngredient(row.id)]
                      : ingredients.filter((item) => item.id !== row.id),
                  )
                }
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="justify-self-start rounded-lg border border-rule bg-white px-4 py-2 text-sm"
            onClick={() => setIngredients([...ingredients, emptyIngredient(nextId("ingredient"))])}
          >
            Add an ingredient
          </button>
        </fieldset>
        <fieldset className="grid gap-4">
          <legend className="text-sm font-medium">Instructions</legend>
          <p className="text-xs text-ink-soft">
            A step is included only when it has instruction text. Google’s page says to leave “Step 1” out of that text.
            A name alone is left out.
          </p>
          {steps.map((row, index) => {
            const textHint =
              !row.text.trim() && row.name.trim()
                ? "Add the instruction for this step. A name alone is left out."
                : "";
            return (
              <div key={row.id} className="grid gap-2">
                <p className="text-sm font-medium">Step {index + 1}</p>
                <input
                  className={field}
                  value={row.name}
                  aria-label={`Step ${index + 1} name`}
                  placeholder="Simmer"
                  onChange={(event) =>
                    setSteps(steps.map((item) => (item.id === row.id ? { ...item, name: event.target.value } : item)))
                  }
                />
                <textarea
                  className={field}
                  value={row.text}
                  aria-label={`Step ${index + 1} instruction`}
                  placeholder="Simmer the tomatoes and stock for 20 minutes, then blend until smooth."
                  rows={3}
                  onChange={(event) =>
                    setSteps(steps.map((item) => (item.id === row.id ? { ...item, text: event.target.value } : item)))
                  }
                />
                {textHint ? <p className="text-xs text-ink-soft">{textHint}</p> : null}
                <button
                  type="button"
                  className="justify-self-start text-sm text-ink-soft underline-offset-4 hover:underline"
                  onClick={() =>
                    setSteps(steps.length === 1 ? [emptyStep(row.id)] : steps.filter((item) => item.id !== row.id))
                  }
                >
                  Remove
                </button>
              </div>
            );
          })}
          <button
            type="button"
            className="justify-self-start rounded-lg border border-rule bg-white px-4 py-2 text-sm"
            onClick={() => setSteps([...steps, emptyStep(nextId("step"))])}
          >
            Add a step
          </button>
        </fieldset>
        <label className="block text-sm font-medium">
          Calories
          <input
            className={`${field} mt-1`}
            value={calories}
            onChange={(event) => setCalories(event.target.value)}
            placeholder="180"
            inputMode="decimal"
          />
          {caloriesHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{caloriesHint}</span> : null}
        </label>
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium">Rating</legend>
          <p className="text-xs text-ink-soft">
            Optional. Leave this blank when the page does not show a rating. The rating is left out until both the
            value and the count are valid.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block text-sm font-medium">
              Rating value
              <input
                className={`${field} mt-1`}
                value={ratingValue}
                onChange={(event) => setRatingValue(event.target.value)}
                placeholder="4.8"
                inputMode="decimal"
              />
            </label>
            <label className="block text-sm font-medium">
              Number of ratings
              <input
                className={`${field} mt-1`}
                value={ratingCount}
                onChange={(event) => setRatingCount(event.target.value)}
                placeholder="18"
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
          {ratingHint ? <p className="text-xs text-ink-soft">{ratingHint}</p> : null}
        </fieldset>
      </div>
      <CopyBlock label="Recipe JSON-LD" value={output} empty="Add a dish name to generate the script tag." />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}

function TimeFields({
  legend,
  time,
  hint,
  onChange,
}: {
  legend: string;
  time: TimeState;
  hint: string;
  onChange: (time: TimeState) => void;
}) {
  return (
    <fieldset className="grid gap-3">
      <legend className="text-sm font-medium">{legend}</legend>
      <p className="text-xs text-ink-soft">Written as an ISO 8601 duration, such as PT20M or P1DT2H.</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {(["days", "hours", "minutes"] as const).map((part) => (
          <label key={part} className="block text-sm font-medium">
            {part[0].toUpperCase() + part.slice(1)}
            <input
              className={`${field} mt-1`}
              value={time[part]}
              aria-label={`${legend} ${part}`}
              placeholder={part === "minutes" ? "20" : ""}
              inputMode="numeric"
              onChange={(event) => onChange({ ...time, [part]: event.target.value })}
            />
          </label>
        ))}
      </div>
      {hint ? <span className="text-xs font-normal text-ink-soft">{hint}</span> : null}
    </fieldset>
  );
}

function durationFieldsHint(time: TimeState) {
  const fields = [time.days, time.hours, time.minutes];
  if (fields.some((value) => value.trim() && !/^\d{1,6}$/.test(value.trim()))) {
    return "Enter a whole number up to 999999, or leave the field blank.";
  }
  if (isoDuration(time)) return "";
  if (fields.some((value) => value.trim())) return "Enter a time greater than zero, or leave the fields blank.";
  return "";
}

function timeStarted(time: TimeState) {
  return [time.days, time.hours, time.minutes].some((value) => value.trim());
}

function timePairHint(prep: TimeState, cook: TimeState, prepHint: string, cookHint: string) {
  if (prepHint || cookHint) return "";
  const prepReady = Boolean(isoDuration(prep));
  const cookReady = Boolean(isoDuration(cook));
  if ((prepReady && !timeStarted(cook)) || (cookReady && !timeStarted(prep))) {
    return "Google’s recipe page says to use prepTime together with cookTime. Both are left out until both are valid. totalTime can stand alone.";
  }
  return "";
}

function ratingFieldsHint(ratingValue: string, ratingCount: string, bestRating: string) {
  const started = Boolean(ratingValue.trim() || ratingCount.trim() || bestRating.trim());
  if (!started) return "";
  if (ratingValue.trim() && !ratingDecimal(ratingValue)) return "Enter a rating greater than zero, like 4.8.";
  if (ratingCount.trim() && !reviewCountValue(ratingCount)) return "Enter a whole number of ratings, like 18.";
  if (bestRating.trim() && !ratingDecimal(bestRating)) return "Enter a best rating greater than zero, like 5, or leave it blank.";
  const rating = ratingDecimal(ratingValue);
  const count = reviewCountValue(ratingCount);
  const best = bestRating.trim() ? ratingDecimal(bestRating) : "";
  if (rating && !count) return "Add the number of ratings, or clear the rating. Both are required before the rating is written.";
  if (count && !ratingValue.trim()) return "Add the rating value, or clear the count.";
  if (rating && count) {
    const ceiling = best ? Number(best) : 5;
    if (Number(rating) > ceiling) {
      return best
        ? "The rating has to be at most the best rating, or clear the rating."
        : "A rating above 5 needs a best rating. Google’s default scale ends at 5.";
    }
  }
  return "";
}
