"use client";

import { useMemo, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import {
  PODCAST_TYPES,
  BOOK_PARTY_KINDS,
  buildPodcastSchema,
  httpUrl,
  isoDateTime,
  isoTimeDuration,
  type BookPartyKind,
  type PodcastType,
} from "@/lib/generators";

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

function partyUrlHint(url: string, name: string) {
  if (url.trim() && !httpUrl(url)) return "Enter the author URL, or leave it blank. The name is still included.";
  if (!name.trim() && url.trim()) return "Add the author name, or clear the URL. A URL alone is left out.";
  return "";
}

export function PodcastSchemaGenerator() {
  const [type, setType] = useState<PodcastType>("PodcastSeries");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorKind, setAuthorKind] = useState<BookPartyKind>("Organization");
  const [authorUrl, setAuthorUrl] = useState("");
  const [webFeed, setWebFeed] = useState("");
  const [datePublished, setDatePublished] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [episodeNumber, setEpisodeNumber] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [seriesName, setSeriesName] = useState("");
  const [seriesUrl, setSeriesUrl] = useState("");
  const [seriesWebFeed, setSeriesWebFeed] = useState("");

  const episode = type === "PodcastEpisode";
  const output = useMemo(
    () =>
      buildPodcastSchema({
        type,
        name,
        description,
        url,
        imageUrl,
        authorName,
        authorKind,
        authorUrl,
        webFeed,
        datePublished,
        hours,
        minutes,
        seconds,
        episodeNumber,
        audioUrl,
        seriesName,
        seriesUrl,
        seriesWebFeed,
      }),
    [
      type,
      name,
      description,
      url,
      imageUrl,
      authorName,
      authorKind,
      authorUrl,
      webFeed,
      datePublished,
      hours,
      minutes,
      seconds,
      episodeNumber,
      audioUrl,
      seriesName,
      seriesUrl,
      seriesWebFeed,
    ],
  );

  const started = [
    name,
    description,
    url,
    imageUrl,
    authorName,
    authorUrl,
    webFeed,
    datePublished,
    hours,
    minutes,
    seconds,
    episodeNumber,
    audioUrl,
    seriesName,
    seriesUrl,
    seriesWebFeed,
  ].some((value) => value.trim());
  const duration = isoTimeDuration({ hours, minutes, seconds });
  const durationStarted = [hours, minutes, seconds].some((value) => value.trim());
  const authorHint = partyUrlHint(authorUrl, authorName);

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Use the show or episode name, the page URL, the RSS feed, and the audio file a
        person can already see. Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Type
          <select
            className={`${field} mt-1`}
            value={type}
            onChange={(event) => setType(event.target.value as PodcastType)}
          >
            {PODCAST_TYPES.map((item) => (
              <option key={item} value={item}>
                {item === "PodcastSeries" ? "PodcastSeries (the show)" : "PodcastEpisode (one episode)"}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium">
          Name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={episode ? "Example episode" : "Example Show"}
            required
          />
          {started && !name.trim() ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              Add the name. The script is written once the show or episode name is present.
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
        <label className="block text-sm font-medium">
          Page URL
          <input
            className={`${field} mt-1`}
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder={episode ? "https://example.com/show/12" : "https://example.com/show"}
            inputMode="url"
            autoComplete="url"
          />
          {url.trim() && !httpUrl(url) ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">Enter the page URL, or leave it blank.</span>
          ) : null}
        </label>
        <label className="block text-sm font-medium">
          Image URL
          <input
            className={`${field} mt-1`}
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://example.com/show/cover.jpg"
            inputMode="url"
          />
          {imageUrl.trim() && !httpUrl(imageUrl) ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              Enter the cover image URL, or leave it blank.
            </span>
          ) : null}
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Author name
            <input
              className={`${field} mt-1`}
              value={authorName}
              onChange={(event) => setAuthorName(event.target.value)}
              placeholder={authorKind === "Organization" ? "Example Studio" : "Name on the show page"}
            />
            {authorHint && !authorName.trim() ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">{authorHint}</span>
            ) : null}
          </label>
          <label className="block text-sm font-medium">
            Author type
            <select
              className={`${field} mt-1`}
              value={authorKind}
              onChange={(event) => setAuthorKind(event.target.value as BookPartyKind)}
            >
              {BOOK_PARTY_KINDS.map((kind) => (
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
            placeholder="https://example.com"
            inputMode="url"
          />
          {authorUrl.trim() && !httpUrl(authorUrl) ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">{authorHint}</span>
          ) : null}
        </label>
        {episode ? null : (
          <label className="block text-sm font-medium">
            RSS or Atom feed (webFeed)
            <input
              className={`${field} mt-1`}
              value={webFeed}
              onChange={(event) => setWebFeed(event.target.value)}
              placeholder="https://example.com/feed.xml"
              inputMode="url"
            />
            {webFeed.trim() && !httpUrl(webFeed) ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">
                Enter the feed URL, or leave it blank.
              </span>
            ) : null}
          </label>
        )}
        {episode ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Date published
                <input
                  className={`${field} mt-1`}
                  value={datePublished}
                  onChange={(event) => setDatePublished(event.target.value)}
                  placeholder="2026-10-21"
                />
                {datePublished.trim() && !isoDateTime(datePublished) ? (
                  <span className="mt-1 block text-xs font-normal text-ink-soft">
                    Use YYYY-MM-DD, or a date and time such as 2026-10-21T15:04:00Z.
                  </span>
                ) : null}
              </label>
              <label className="block text-sm font-medium">
                Episode number
                <input
                  className={`${field} mt-1`}
                  value={episodeNumber}
                  onChange={(event) => setEpisodeNumber(event.target.value)}
                  placeholder="12"
                />
              </label>
            </div>
            <fieldset className="grid gap-4 sm:grid-cols-3">
              <legend className="text-sm font-medium">Duration</legend>
              <label className="block text-sm font-medium">
                Hours
                <input
                  className={`${field} mt-1`}
                  value={hours}
                  onChange={(event) => setHours(event.target.value)}
                  inputMode="numeric"
                  placeholder="0"
                />
              </label>
              <label className="block text-sm font-medium">
                Minutes
                <input
                  className={`${field} mt-1`}
                  value={minutes}
                  onChange={(event) => setMinutes(event.target.value)}
                  inputMode="numeric"
                  placeholder="32"
                />
              </label>
              <label className="block text-sm font-medium">
                Seconds
                <input
                  className={`${field} mt-1`}
                  value={seconds}
                  onChange={(event) => setSeconds(event.target.value)}
                  inputMode="numeric"
                  placeholder="15"
                />
              </label>
              {durationStarted && !duration ? (
                <span className="text-xs font-normal text-ink-soft sm:col-span-3">
                  Use whole numbers. A zero length is left out. 32 minutes and 15 seconds is written as PT32M15S.
                </span>
              ) : null}
            </fieldset>
            <label className="block text-sm font-medium">
              Audio file URL
              <input
                className={`${field} mt-1`}
                value={audioUrl}
                onChange={(event) => setAudioUrl(event.target.value)}
                placeholder="https://example.com/show/12.mp3"
                inputMode="url"
              />
              {audioUrl.trim() && !httpUrl(audioUrl) ? (
                <span className="mt-1 block text-xs font-normal text-ink-soft">
                  Enter the audio file URL, or leave it blank. A video watch page uses the video generator.
                </span>
              ) : null}
            </label>
            <label className="block text-sm font-medium">
              Series name
              <input
                className={`${field} mt-1`}
                value={seriesName}
                onChange={(event) => setSeriesName(event.target.value)}
                placeholder="Example Show"
              />
              {!seriesName.trim() && (seriesUrl.trim() || seriesWebFeed.trim()) ? (
                <span className="mt-1 block text-xs font-normal text-ink-soft">
                  Add the series name, or clear the series URL and feed. A URL alone is left out.
                </span>
              ) : null}
            </label>
            <label className="block text-sm font-medium">
              Series page URL
              <input
                className={`${field} mt-1`}
                value={seriesUrl}
                onChange={(event) => setSeriesUrl(event.target.value)}
                placeholder="https://example.com/show"
                inputMode="url"
              />
              {seriesUrl.trim() && !httpUrl(seriesUrl) ? (
                <span className="mt-1 block text-xs font-normal text-ink-soft">
                  Enter the show page URL, or leave it blank.
                </span>
              ) : null}
            </label>
            <label className="block text-sm font-medium">
              Series RSS or Atom feed
              <input
                className={`${field} mt-1`}
                value={seriesWebFeed}
                onChange={(event) => setSeriesWebFeed(event.target.value)}
                placeholder="https://example.com/feed.xml"
                inputMode="url"
              />
              {seriesWebFeed.trim() && !httpUrl(seriesWebFeed) ? (
                <span className="mt-1 block text-xs font-normal text-ink-soft">
                  Enter the feed URL, or leave it blank. It is written on the series, not on the episode.
                </span>
              ) : null}
            </label>
          </>
        ) : null}
      </div>
      <CopyBlock
        label="Podcast JSON-LD"
        value={output}
        empty="Add a name to generate the script tag."
      />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}
