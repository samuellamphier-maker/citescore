"use client";

import { useMemo, useRef, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import {
  MOVIE_ACTOR_KINDS,
  buildMovieSchema,
  httpUrl,
  isoTimeDuration,
  movieDate,
  ratingDecimal,
  reviewCountValue,
  type MovieActorInput,
  type MovieActorKind,
} from "@/lib/generators";

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

type ActorRow = MovieActorInput & { id: string };

function emptyActor(id: string): ActorRow {
  return { id, name: "", kind: "Person", url: "" };
}

function partyUrlHint(url: string, name: string, label: string) {
  if (url.trim() && !httpUrl(url)) return `Enter the ${label} URL, or leave it blank. The name is still included.`;
  if (!name.trim() && url.trim()) return `Add the ${label} name, or clear the URL. A URL alone is left out.`;
  return "";
}

function ratingHintFor(ratingValue: string, ratingCount: string, bestRating: string) {
  if (ratingValue.trim() && !ratingDecimal(ratingValue)) return "Enter a rating greater than zero, like 8.";
  if (ratingCount.trim() && !reviewCountValue(ratingCount)) return "Enter a whole number of ratings, like 200.";
  if (bestRating.trim() && !ratingDecimal(bestRating)) {
    return "Enter a best rating greater than zero, like 10, or leave it blank.";
  }
  const rating = ratingDecimal(ratingValue);
  const count = reviewCountValue(ratingCount);
  if (rating && !count) return "Add the rating count the page shows, or clear the rating.";
  if (count && !rating) return "Add the rating value the page shows, or clear the rating count.";
  if (!rating || !count) return "";
  const ceiling = bestRating.trim() ? Number(ratingDecimal(bestRating)) : 5;
  if (Number(rating) > ceiling) {
    return bestRating.trim()
      ? "The rating is higher than the best rating."
      : "schema.org treats a missing best rating as 5. Enter a best rating, or use a value of 5 or less.";
  }
  return "";
}

export function MovieSchemaGenerator() {
  const seq = useRef(2);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [directorName, setDirectorName] = useState("");
  const [directorUrl, setDirectorUrl] = useState("");
  const [actors, setActors] = useState<ActorRow[]>([emptyActor("actor-1")]);
  const [datePublished, setDatePublished] = useState("");
  const [genres, setGenres] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [url, setUrl] = useState("");
  const [ratingValue, setRatingValue] = useState("");
  const [ratingCount, setRatingCount] = useState("");
  const [bestRating, setBestRating] = useState("");

  const output = useMemo(
    () =>
      buildMovieSchema({
        name,
        description,
        directorName,
        directorUrl,
        actors,
        datePublished,
        genres,
        imageUrl,
        hours,
        minutes,
        seconds,
        url,
        ratingValue,
        ratingCount,
        bestRating,
      }),
    [
      name,
      description,
      directorName,
      directorUrl,
      actors,
      datePublished,
      genres,
      imageUrl,
      hours,
      minutes,
      seconds,
      url,
      ratingValue,
      ratingCount,
      bestRating,
    ],
  );

  const started = [
    name,
    description,
    directorName,
    directorUrl,
    datePublished,
    genres,
    imageUrl,
    hours,
    minutes,
    seconds,
    url,
    ratingValue,
    ratingCount,
    bestRating,
    ...actors.flatMap((row) => [row.name, row.url]),
  ].some((value) => value.trim());
  const duration = isoTimeDuration({ hours, minutes, seconds });
  const durationStarted = [hours, minutes, seconds].some((value) => value.trim());
  const directorHint = partyUrlHint(directorUrl, directorName, "director");
  const ratingHint = ratingHintFor(ratingValue, ratingCount, bestRating);

  function nextId() {
    const id = `actor-${seq.current}`;
    seq.current += 1;
    return id;
  }

  function patchActor(id: string, patch: Partial<ActorRow>) {
    setActors((rows) => rows.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Use the title, the director, the actors, and the running time a person can
        already see. Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Example Film"
            required
          />
          {started && !name.trim() ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              Add the name. The script is written once the film name is present.
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
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Director
            <input
              className={`${field} mt-1`}
              value={directorName}
              onChange={(event) => setDirectorName(event.target.value)}
              placeholder="Name on the film page"
            />
            {directorHint && !directorName.trim() ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">{directorHint}</span>
            ) : null}
          </label>
          <label className="block text-sm font-medium">
            Director URL
            <input
              className={`${field} mt-1`}
              value={directorUrl}
              onChange={(event) => setDirectorUrl(event.target.value)}
              placeholder="https://example.com/directors/example"
              inputMode="url"
            />
            {directorUrl.trim() && !httpUrl(directorUrl) ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">{directorHint}</span>
            ) : null}
          </label>
        </div>
        <fieldset className="grid gap-4 rounded-xl border border-rule bg-white/60 p-4">
          <legend className="px-1 text-sm font-medium">Actors</legend>
          <p className="text-xs text-ink-soft">
            One named actor is one Person. A company or ensemble is a PerformingGroup. A URL without a name is left
            out. A second row becomes an array.
          </p>
          {actors.map((row, index) => {
            const hint = partyUrlHint(row.url, row.name, "actor");
            return (
              <div key={row.id} className="grid gap-3 border-t border-rule pt-4 first:border-t-0 first:pt-0">
                <p className="text-sm font-medium">Actor {index + 1}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block text-sm font-medium">
                    Name
                    <input
                      className={`${field} mt-1`}
                      value={row.name}
                      aria-label={`Actor ${index + 1} name`}
                      placeholder="Name on the film page"
                      onChange={(event) => patchActor(row.id, { name: event.target.value })}
                    />
                    {hint && !row.name.trim() ? (
                      <span className="mt-1 block text-xs font-normal text-ink-soft">{hint}</span>
                    ) : null}
                  </label>
                  <label className="block text-sm font-medium">
                    Type
                    <select
                      className={`${field} mt-1`}
                      value={row.kind}
                      aria-label={`Actor ${index + 1} type`}
                      onChange={(event) => patchActor(row.id, { kind: event.target.value as MovieActorKind })}
                    >
                      {MOVIE_ACTOR_KINDS.map((kind) => (
                        <option key={kind} value={kind}>
                          {kind}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="block text-sm font-medium">
                  URL
                  <input
                    className={`${field} mt-1`}
                    value={row.url}
                    aria-label={`Actor ${index + 1} URL`}
                    placeholder="https://example.com/actors/example"
                    inputMode="url"
                    onChange={(event) => patchActor(row.id, { url: event.target.value })}
                  />
                  {row.url.trim() && !httpUrl(row.url) ? (
                    <span className="mt-1 block text-xs font-normal text-ink-soft">{hint}</span>
                  ) : null}
                </label>
                <button
                  type="button"
                  className="justify-self-start text-sm text-ink-soft underline-offset-4 hover:underline"
                  onClick={() =>
                    setActors(actors.length === 1 ? [emptyActor(row.id)] : actors.filter((item) => item.id !== row.id))
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
            onClick={() => setActors([...actors, emptyActor(nextId())])}
          >
            Add an actor
          </button>
        </fieldset>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Date published
            <input
              className={`${field} mt-1`}
              value={datePublished}
              onChange={(event) => setDatePublished(event.target.value)}
              placeholder="2011"
            />
            {datePublished.trim() && !movieDate(datePublished) ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">
                Use YYYY-MM-DD, a four-digit year, or a date and time such as 2026-10-22T15:04:00Z.
              </span>
            ) : null}
          </label>
          <label className="block text-sm font-medium">
            Page URL
            <input
              className={`${field} mt-1`}
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://example.com/films/example"
              inputMode="url"
              autoComplete="url"
            />
            {url.trim() && !httpUrl(url) ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">Enter the page URL, or leave it blank.</span>
            ) : null}
          </label>
        </div>
        <label className="block text-sm font-medium">
          Genre
          <textarea
            className={`${field} mt-1 min-h-20`}
            value={genres}
            onChange={(event) => setGenres(event.target.value)}
            placeholder={"Drama\nComedy"}
            rows={2}
          />
          <span className="mt-1 block text-xs font-normal text-ink-soft">
            One genre per line, or separate them with commas. One genre is a string. Two become an array.
          </span>
        </label>
        <label className="block text-sm font-medium">
          Image URL
          <input
            className={`${field} mt-1`}
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://example.com/films/example.jpg"
            inputMode="url"
          />
          {imageUrl.trim() && !httpUrl(imageUrl) ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              Enter the image URL, or leave it blank.
            </span>
          ) : null}
        </label>
        <fieldset className="grid gap-4 sm:grid-cols-3">
          <legend className="text-sm font-medium sm:col-span-3">Duration</legend>
          <label className="block text-sm font-medium">
            Hours
            <input
              className={`${field} mt-1`}
              value={hours}
              onChange={(event) => setHours(event.target.value)}
              inputMode="numeric"
              placeholder="2"
            />
          </label>
          <label className="block text-sm font-medium">
            Minutes
            <input
              className={`${field} mt-1`}
              value={minutes}
              onChange={(event) => setMinutes(event.target.value)}
              inputMode="numeric"
              placeholder="5"
            />
          </label>
          <label className="block text-sm font-medium">
            Seconds
            <input
              className={`${field} mt-1`}
              value={seconds}
              onChange={(event) => setSeconds(event.target.value)}
              inputMode="numeric"
              placeholder="0"
            />
          </label>
          {durationStarted && !duration ? (
            <span className="text-xs font-normal text-ink-soft sm:col-span-3">
              Use whole numbers. A zero length is left out. 2 hours and 5 minutes is written as PT2H5M.
            </span>
          ) : null}
        </fieldset>
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium">Aggregate rating (optional)</legend>
          <p className="text-xs text-ink-soft">
            Only when the page shows this rating and this rating count. A missing best rating is treated as 5.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block text-sm font-medium">
              Rating value
              <input
                className={`${field} mt-1`}
                value={ratingValue}
                onChange={(event) => setRatingValue(event.target.value)}
                placeholder="8"
                inputMode="decimal"
              />
            </label>
            <label className="block text-sm font-medium">
              Rating count
              <input
                className={`${field} mt-1`}
                value={ratingCount}
                onChange={(event) => setRatingCount(event.target.value)}
                placeholder="200"
                inputMode="numeric"
              />
            </label>
            <label className="block text-sm font-medium">
              Best rating
              <input
                className={`${field} mt-1`}
                value={bestRating}
                onChange={(event) => setBestRating(event.target.value)}
                placeholder="10"
                inputMode="decimal"
              />
            </label>
          </div>
          {ratingHint ? <span className="text-xs font-normal text-ink-soft">{ratingHint}</span> : null}
        </fieldset>
      </div>
      <CopyBlock label="Movie JSON-LD" value={output} empty="Add a name to generate the script tag." />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}
