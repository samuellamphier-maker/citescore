"use client";

import { useMemo, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { ARTICLE_TYPES, buildArticleSchema, httpUrl, isoDay } from "@/lib/generators";

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

export function ArticleSchemaGenerator() {
  const [type, setType] = useState<(typeof ARTICLE_TYPES)[number]>("Article");
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorKind, setAuthorKind] = useState<"Person" | "Organization">("Organization");
  const [publisherName, setPublisherName] = useState("");
  const [publisherLogoUrl, setPublisherLogoUrl] = useState("");
  const [datePublished, setDatePublished] = useState("");
  const [dateModified, setDateModified] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");

  const output = useMemo(
    () =>
      buildArticleSchema({
        type,
        headline,
        description,
        authorName,
        authorKind,
        publisherName,
        publisherLogoUrl,
        datePublished,
        dateModified,
        imageUrl,
        canonicalUrl,
      }),
    [
      type,
      headline,
      description,
      authorName,
      authorKind,
      publisherName,
      publisherLogoUrl,
      datePublished,
      dateModified,
      imageUrl,
      canonicalUrl,
    ],
  );

  const imageHint =
    imageUrl.trim() && !httpUrl(imageUrl) ? "Enter an image URL the article shows, or leave this blank." : "";
  const logoHint =
    publisherLogoUrl.trim() && !httpUrl(publisherLogoUrl)
      ? "Enter an image URL a crawler can fetch, or leave this blank."
      : "";
  const publisherHint =
    publisherLogoUrl.trim() && httpUrl(publisherLogoUrl) && !publisherName.trim()
      ? "Add the publisher name, or clear the logo."
      : "";
  const urlHint =
    canonicalUrl.trim() && !httpUrl(canonicalUrl) ? "Enter the article URL, like https://example.com/blog/post." : "";
  const dateHint =
    isoDay(datePublished) && isoDay(dateModified) && isoDay(dateModified) < isoDay(datePublished)
      ? "The modified date is earlier than the published date."
      : "";

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Use the headline, dates, and byline a person can already read on the page.
        Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Type
          <select className={`${field} mt-1`} value={type} onChange={(event) => setType(event.target.value as typeof type)}>
            {ARTICLE_TYPES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium">
          Headline
          <input
            className={`${field} mt-1`}
            value={headline}
            onChange={(event) => setHeadline(event.target.value)}
            placeholder="How the audit is scored"
            required
          />
        </label>
        <label className="block text-sm font-medium">
          Description
          <textarea
            className={`${field} mt-1`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="What the 0–100 score is built from."
            rows={3}
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Author name
            <input
              className={`${field} mt-1`}
              value={authorName}
              onChange={(event) => setAuthorName(event.target.value)}
              placeholder="CiteScore Team"
            />
          </label>
          <label className="block text-sm font-medium">
            Author type
            <select
              className={`${field} mt-1`}
              value={authorKind}
              onChange={(event) => setAuthorKind(event.target.value as typeof authorKind)}
            >
              <option value="Organization">Organization</option>
              <option value="Person">Person</option>
            </select>
          </label>
        </div>
        <label className="block text-sm font-medium">
          Publisher name
          <input
            className={`${field} mt-1`}
            value={publisherName}
            onChange={(event) => setPublisherName(event.target.value)}
            placeholder="CiteScore"
          />
          {publisherHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{publisherHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Publisher logo URL
          <input
            className={`${field} mt-1`}
            value={publisherLogoUrl}
            onChange={(event) => setPublisherLogoUrl(event.target.value)}
            placeholder="https://example.com/logo.png"
            inputMode="url"
          />
          {logoHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{logoHint}</span> : null}
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Date published
            <input
              className={`${field} mt-1`}
              type="date"
              value={datePublished}
              onChange={(event) => setDatePublished(event.target.value)}
            />
          </label>
          <label className="block text-sm font-medium">
            Date modified
            <input
              className={`${field} mt-1`}
              type="date"
              value={dateModified}
              onChange={(event) => setDateModified(event.target.value)}
            />
            {dateHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{dateHint}</span> : null}
          </label>
        </div>
        <label className="block text-sm font-medium">
          Image URL
          <input
            className={`${field} mt-1`}
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://example.com/photos/audit.jpg"
            inputMode="url"
          />
          {imageHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{imageHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Canonical URL
          <input
            className={`${field} mt-1`}
            value={canonicalUrl}
            onChange={(event) => setCanonicalUrl(event.target.value)}
            placeholder="https://example.com/blog/how-the-audit-is-scored"
            inputMode="url"
            autoComplete="url"
          />
          {urlHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{urlHint}</span> : null}
        </label>
      </div>
      <CopyBlock
        label="Article JSON-LD"
        value={output}
        empty="Add a headline to generate the script tag."
      />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}
