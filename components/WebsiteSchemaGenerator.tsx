"use client";

import { useMemo, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { buildWebsiteSchema, httpUrl, searchUrlTemplate } from "@/lib/generators";

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

export function WebsiteSchemaGenerator() {
  const [name, setName] = useState("");
  const [alternateName, setAlternateName] = useState("");
  const [url, setUrl] = useState("");
  const [searchTemplate, setSearchTemplate] = useState("");
  const [publisherName, setPublisherName] = useState("");
  const [publisherUrl, setPublisherUrl] = useState("");

  const output = useMemo(
    () =>
      buildWebsiteSchema({
        name,
        alternateName,
        url,
        searchUrlTemplate: searchTemplate,
        publisherName,
        publisherUrl,
      }),
    [name, alternateName, url, searchTemplate, publisherName, publisherUrl],
  );

  const urlHint = url.trim() && !httpUrl(url) ? "Enter the site URL, like https://example.com." : "";
  const alternateHint =
    alternateName.trim() && alternateName.trim().replace(/\s+/g, " ") === name.trim().replace(/\s+/g, " ")
      ? "This matches the site name, so it is left out."
      : "";
  const searchHint =
    searchTemplate.trim() && !searchUrlTemplate(searchTemplate)
      ? "Use a full search URL with {search_term_string} where the query goes, like https://example.com/search?q={search_term_string}. Or leave this blank."
      : "";
  const publisherUrlHint =
    publisherUrl.trim() && !httpUrl(publisherUrl)
      ? "Enter the publisher’s URL, or leave it blank. The name is still included."
      : "";
  const publisherNameHint =
    !publisherName.trim() && publisherUrl.trim()
      ? "Add the publisher name, or clear the URL. A URL alone is left out."
      : "";

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Use the site name, URL, and publisher a person can already read on the
        homepage. Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Site name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Example"
            required
          />
        </label>
        <label className="block text-sm font-medium">
          Alternate name
          <input
            className={`${field} mt-1`}
            value={alternateName}
            onChange={(event) => setAlternateName(event.target.value)}
            placeholder="Example App"
          />
          {alternateHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{alternateHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Site URL
          <input
            className={`${field} mt-1`}
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com"
            inputMode="url"
            autoComplete="url"
          />
          {urlHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{urlHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Search URL template
          <input
            className={`${field} mt-1 font-mono text-[13px]`}
            value={searchTemplate}
            onChange={(event) => setSearchTemplate(event.target.value)}
            placeholder="https://example.com/search?q={search_term_string}"
            inputMode="url"
            spellCheck={false}
          />
          <span className="mt-1 block text-xs font-normal text-ink-soft">
            Optional. Include {"{search_term_string}"} where the visitor’s query is substituted. Leave blank when the
            site has no search URL.
          </span>
          {searchHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{searchHint}</span> : null}
        </label>
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium">Publisher</legend>
          <p className="text-xs text-ink-soft">
            Optional Organization. Use the name on the page. Logo, profiles, and email belong on the Organization schema
            generator.
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
      <CopyBlock label="WebSite JSON-LD" value={output} empty="Add a site name to generate the script tag." />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}
