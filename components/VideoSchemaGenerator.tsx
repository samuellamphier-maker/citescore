"use client";

import { useMemo, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { buildVideoSchema, httpUrl, isoDateTime, videoIsoDuration } from "@/lib/generators";

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

export function VideoSchemaGenerator() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [uploadDate, setUploadDate] = useState("");
  const [duration, setDuration] = useState("");
  const [contentUrl, setContentUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [publisherName, setPublisherName] = useState("");
  const [publisherUrl, setPublisherUrl] = useState("");

  const output = useMemo(
    () =>
      buildVideoSchema({
        name,
        description,
        thumbnailUrl,
        uploadDate,
        duration,
        contentUrl,
        embedUrl,
        publisherName,
        publisherUrl,
      }),
    [name, description, thumbnailUrl, uploadDate, duration, contentUrl, embedUrl, publisherName, publisherUrl],
  );

  const started = [
    name,
    description,
    thumbnailUrl,
    uploadDate,
    duration,
    contentUrl,
    embedUrl,
    publisherName,
    publisherUrl,
  ].some((value) => value.trim());

  const nameMissing = started && !name.trim();
  const descriptionMissing = started && !description.trim();
  const thumbnailHint = thumbnailHintFor(thumbnailUrl, started);
  const uploadHint = uploadHintFor(uploadDate, started);
  const durationHint = durationHintFor(duration, started);
  const contentValid = Boolean(contentUrl.trim() && httpUrl(contentUrl));
  const embedValid = Boolean(embedUrl.trim() && httpUrl(embedUrl));
  const contentHint = urlHintFor(
    contentUrl,
    started && !contentValid && !embedValid,
    "Enter the video file URL, like https://example.com/video/file.mp4. Or add an embed URL below.",
  );
  const embedHint = urlHintFor(
    embedUrl,
    started && !contentValid && !embedValid,
    "Enter the player URL, like https://example.com/embed/123. Or add a content URL above. This is the player, not the watch page.",
  );
  const publisherUrlHint =
    publisherUrl.trim() && !httpUrl(publisherUrl)
      ? "Enter the publisher’s URL, or leave it blank. The name is still included."
      : "";
  const publisherNameHint =
    !publisherName.trim() && publisherUrl.trim()
      ? "Add the publisher name, or clear the URL. A URL alone is left out."
      : "";

  const missing = [
    name.trim() ? "" : "name",
    description.trim() ? "" : "description",
    httpUrl(thumbnailUrl) ? "" : "thumbnail URL",
    isoDateTime(uploadDate) ? "" : "upload date",
    videoIsoDuration(duration) ? "" : "duration",
    contentValid || embedValid ? "" : "content URL or embed URL",
  ].filter(Boolean);

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Use the title, description, thumbnail, date, and duration a person can already
        see on the watch page. Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Product walkthrough"
            required
          />
          {nameMissing ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">Add the video title shown on the page.</span>
          ) : null}
        </label>
        <label className="block text-sm font-medium">
          Description
          <textarea
            className={`${field} mt-1`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="A two-minute walkthrough of the product, recorded for the watch page."
            rows={3}
            required
          />
          {descriptionMissing ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              Add the description already on the page.
            </span>
          ) : null}
        </label>
        <label className="block text-sm font-medium">
          Thumbnail URL
          <input
            className={`${field} mt-1`}
            value={thumbnailUrl}
            onChange={(event) => setThumbnailUrl(event.target.value)}
            placeholder="https://example.com/videos/walkthrough.jpg"
            inputMode="url"
            required
          />
          {thumbnailHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{thumbnailHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Upload date
          <input
            className={`${field} mt-1 font-mono text-[13px]`}
            value={uploadDate}
            onChange={(event) => setUploadDate(event.target.value)}
            placeholder="2024-03-31T08:00:00+08:00"
            spellCheck={false}
            required
          />
          <span className="mt-1 block text-xs font-normal text-ink-soft">
            ISO 8601. A timezone is useful. A date alone, 2024-03-31, is accepted.
          </span>
          {uploadHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{uploadHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Duration
          <input
            className={`${field} mt-1 font-mono text-[13px]`}
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            placeholder="PT1M54S"
            spellCheck={false}
            required
          />
          <span className="mt-1 block text-xs font-normal text-ink-soft">
            ISO 8601. PT1M54S is one minute and 54 seconds. PT1H2M3S is one hour, two minutes, and three seconds.
          </span>
          {durationHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{durationHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Content URL
          <input
            className={`${field} mt-1`}
            value={contentUrl}
            onChange={(event) => setContentUrl(event.target.value)}
            placeholder="https://example.com/video/walkthrough.mp4"
            inputMode="url"
          />
          <span className="mt-1 block text-xs font-normal text-ink-soft">
            The video file itself. Leave blank only when you provide an embed URL.
          </span>
          {contentHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{contentHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Embed URL
          <input
            className={`${field} mt-1`}
            value={embedUrl}
            onChange={(event) => setEmbedUrl(event.target.value)}
            placeholder="https://example.com/embed/walkthrough"
            inputMode="url"
          />
          <span className="mt-1 block text-xs font-normal text-ink-soft">
            The player for this video. Not the watch page. Optional when the content URL is set.
          </span>
          {embedHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{embedHint}</span> : null}
        </label>
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium">Publisher</legend>
          <p className="text-xs text-ink-soft">
            Optional Organization. Use the name on the page. A team byline such as CiteScore Team belongs here. A named
            person uses the Person schema generator.
          </p>
          <label className="block text-sm font-medium">
            Publisher name
            <input
              className={`${field} mt-1`}
              value={publisherName}
              onChange={(event) => setPublisherName(event.target.value)}
              placeholder="Example Studio"
            />
            {publisherNameHint ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">{publisherNameHint}</span>
            ) : null}
          </label>
          <label className="block text-sm font-medium">
            Publisher URL
            <input
              className={`${field} mt-1`}
              value={publisherUrl}
              onChange={(event) => setPublisherUrl(event.target.value)}
              placeholder="https://example.com"
              inputMode="url"
            />
            {publisherUrlHint ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">{publisherUrlHint}</span>
            ) : null}
          </label>
        </fieldset>
      </div>
      {started && missing.length > 0 ? (
        <p className="mt-4 text-xs text-ink-soft">Still needed: {missing.join(", ")}.</p>
      ) : null}
      <CopyBlock
        label="VideoObject JSON-LD"
        value={output}
        empty="Add the name, description, thumbnail URL, upload date, duration, and a content URL or embed URL."
      />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}

function thumbnailHintFor(value: string, started: boolean): string {
  if (!value.trim()) return started ? "Enter the thumbnail image URL the page shows." : "";
  return httpUrl(value) ? "" : "Enter an image URL, like https://example.com/videos/walkthrough.jpg.";
}

function uploadHintFor(value: string, started: boolean): string {
  if (!value.trim()) return started ? "Enter the upload date in ISO 8601, like 2024-03-31T08:00:00+08:00." : "";
  return isoDateTime(value) ? "" : "Use a real ISO 8601 date, like 2024-03-31 or 2024-03-31T08:00:00+08:00.";
}

function durationHintFor(value: string, started: boolean): string {
  if (!value.trim()) return started ? "Enter an ISO 8601 duration, like PT1M54S." : "";
  return videoIsoDuration(value) ? "" : "Use an ISO 8601 duration with a non-zero total, like PT1M54S or PT1H2M3S.";
}

function urlHintFor(value: string, requiredMissing: boolean, missing: string): string {
  if (!value.trim()) return requiredMissing ? missing : "";
  return httpUrl(value) ? "" : "Enter an http(s) URL, or clear this field.";
}
