"use client";

import { useMemo, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import {
  IMAGE_CREATOR_KINDS,
  buildImageObjectSchema,
  httpUrl,
  type ImageCreatorKind,
} from "@/lib/generators";

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

export function ImageObjectSchemaGenerator() {
  const [contentUrl, setContentUrl] = useState("");
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [creatorKind, setCreatorKind] = useState<ImageCreatorKind>("Organization");
  const [creatorUrl, setCreatorUrl] = useState("");
  const [license, setLicense] = useState("");
  const [acquireLicensePage, setAcquireLicensePage] = useState("");
  const [creditText, setCreditText] = useState("");
  const [copyrightNotice, setCopyrightNotice] = useState("");

  const output = useMemo(
    () =>
      buildImageObjectSchema({
        contentUrl,
        name,
        caption,
        creatorName,
        creatorKind,
        creatorUrl,
        license,
        acquireLicensePage,
        creditText,
        copyrightNotice,
      }),
    [
      contentUrl,
      name,
      caption,
      creatorName,
      creatorKind,
      creatorUrl,
      license,
      acquireLicensePage,
      creditText,
      copyrightNotice,
    ],
  );

  const started = [
    contentUrl,
    name,
    caption,
    creatorName,
    creatorUrl,
    license,
    acquireLicensePage,
    creditText,
    copyrightNotice,
  ].some((value) => value.trim());
  const urlMissing = started && !contentUrl.trim();
  const urlInvalid = Boolean(contentUrl.trim() && !httpUrl(contentUrl));
  const creatorUrlHint =
    creatorUrl.trim() && !httpUrl(creatorUrl)
      ? "Enter the creator’s URL, or leave it blank. The name is still included."
      : "";
  const creatorNameHint =
    !creatorName.trim() && creatorUrl.trim()
      ? "Add the creator name, or clear the URL. A URL alone is left out."
      : "";
  const licenseHint =
    license.trim() && !httpUrl(license) ? "Enter the license page URL, or leave it blank." : "";
  const acquireHint =
    acquireLicensePage.trim() && !httpUrl(acquireLicensePage)
      ? "Enter the page where someone can learn how to license the image, or leave it blank."
      : "";
  const urlOk = Boolean(httpUrl(contentUrl));
  const attributionStarted = [creatorName, creditText, copyrightNotice, license].some((value) => value.trim());
  const validAttribution = Boolean(
    creatorName.trim() || creditText.trim() || copyrightNotice.trim() || httpUrl(license),
  );
  const attributionMissing =
    urlOk && !attributionStarted
      ? "Google’s image metadata page requires creator, creditText, copyrightNotice, or license in addition to contentUrl. This script can still be copied."
      : "";
  const licenseBadgeHint =
    urlOk && !license.trim() && (creatorName.trim() || creditText.trim() || copyrightNotice.trim())
      ? "Google’s page says the license property is what makes an image eligible for the Licensable badge. The other credit fields can still be written. The badge is not guaranteed."
      : urlOk && license.trim() && !httpUrl(license) && !validAttribution
        ? "That license URL is left out, and the script does not yet include creator, creditText, or copyrightNotice."
        : "";

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Use the image file URL and the name, caption, creator, credit, copyright
        notice, and license a person can already see on the page. Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Image URL (contentUrl)
          <input
            className={`${field} mt-1`}
            value={contentUrl}
            onChange={(event) => setContentUrl(event.target.value)}
            placeholder="https://example.com/photos/clinic-front.jpg"
            inputMode="url"
            autoComplete="url"
            required
          />
          {urlMissing ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              Add the image file URL. The script is written once contentUrl is a URL a crawler can fetch.
            </span>
          ) : null}
          {urlInvalid ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              Enter the image file URL, like https://example.com/photos/clinic-front.jpg.
            </span>
          ) : null}
        </label>
        <label className="block text-sm font-medium">
          Name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Clinic entrance"
          />
        </label>
        <label className="block text-sm font-medium">
          Caption
          <textarea
            className={`${field} mt-1 min-h-24`}
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            placeholder="The front of the clinic on Main Street."
            rows={3}
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Creator name
            <input
              className={`${field} mt-1`}
              value={creatorName}
              onChange={(event) => setCreatorName(event.target.value)}
              placeholder={creatorKind === "Organization" ? "Example Studio" : "Name on the credit line"}
            />
            {creatorNameHint ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">{creatorNameHint}</span>
            ) : null}
          </label>
          <label className="block text-sm font-medium">
            Creator type
            <select
              className={`${field} mt-1`}
              value={creatorKind}
              onChange={(event) => setCreatorKind(event.target.value as ImageCreatorKind)}
            >
              {IMAGE_CREATOR_KINDS.map((kind) => (
                <option key={kind} value={kind}>
                  {kind}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="block text-sm font-medium">
          Creator URL
          <input
            className={`${field} mt-1`}
            value={creatorUrl}
            onChange={(event) => setCreatorUrl(event.target.value)}
            placeholder="https://example.com"
            inputMode="url"
          />
          {creatorUrlHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{creatorUrlHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          License URL
          <input
            className={`${field} mt-1`}
            value={license}
            onChange={(event) => setLicense(event.target.value)}
            placeholder="https://example.com/license"
            inputMode="url"
          />
          {licenseHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{licenseHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Acquire license page
          <input
            className={`${field} mt-1`}
            value={acquireLicensePage}
            onChange={(event) => setAcquireLicensePage(event.target.value)}
            placeholder="https://example.com/how-to-license"
            inputMode="url"
          />
          {acquireHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{acquireHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Credit text
          <input
            className={`${field} mt-1`}
            value={creditText}
            onChange={(event) => setCreditText(event.target.value)}
            placeholder="Example Studio"
          />
        </label>
        <label className="block text-sm font-medium">
          Copyright notice
          <input
            className={`${field} mt-1`}
            value={copyrightNotice}
            onChange={(event) => setCopyrightNotice(event.target.value)}
            placeholder="© 2026 Example Studio"
          />
        </label>
        {attributionMissing ? <p className="text-xs text-ink-soft">{attributionMissing}</p> : null}
        {licenseBadgeHint ? <p className="text-xs text-ink-soft">{licenseBadgeHint}</p> : null}
      </div>
      <CopyBlock label="ImageObject JSON-LD" value={output} empty="Add an image URL to generate the script tag." />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}
