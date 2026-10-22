"use client";

import { useMemo, useRef, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import {
  DATASET_CREATOR_KINDS,
  buildDatasetSchema,
  datasetDescription,
  datasetEncodingFormat,
  datasetLicenseUrl,
  datasetTemporalCoverage,
  httpUrl,
  type DatasetCreatorInput,
  type DatasetCreatorKind,
  type DatasetDistributionInput,
} from "@/lib/generators";

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

type CreatorRow = DatasetCreatorInput & { id: string };
type DownloadRow = DatasetDistributionInput & { id: string };

function emptyCreator(id: string): CreatorRow {
  return { id, name: "", kind: "Organization", url: "" };
}

function emptyDownload(id: string): DownloadRow {
  return { id, contentUrl: "", encodingFormat: "" };
}

function partyUrlHint(url: string, name: string, label: string) {
  if (url.trim() && !httpUrl(url)) return `Enter the ${label} URL, or leave it blank. The name is still included.`;
  if (!name.trim() && url.trim()) return `Add the ${label} name, or clear the URL. A URL alone is left out.`;
  return "";
}

export function DatasetSchemaGenerator() {
  const creatorSeq = useRef(2);
  const downloadSeq = useRef(2);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [license, setLicense] = useState("");
  const [creators, setCreators] = useState<CreatorRow[]>([emptyCreator("creator-1")]);
  const [keywords, setKeywords] = useState("");
  const [temporalCoverage, setTemporalCoverage] = useState("");
  const [distributions, setDistributions] = useState<DownloadRow[]>([emptyDownload("download-1")]);

  const output = useMemo(
    () =>
      buildDatasetSchema({
        name,
        description,
        url,
        license,
        creators,
        keywords,
        temporalCoverage,
        distributions,
      }),
    [name, description, url, license, creators, keywords, temporalCoverage, distributions],
  );

  const started = [
    name,
    description,
    url,
    license,
    keywords,
    temporalCoverage,
    ...creators.flatMap((row) => [row.name, row.url]),
    ...distributions.flatMap((row) => [row.contentUrl, row.encodingFormat]),
  ].some((value) => value.trim());
  const summary = datasetDescription(description);
  const descriptionHint =
    summary && (summary.length < 50 || summary.length > 5000)
      ? `Google’s dataset page asks for 50 to 5000 characters. This summary is ${summary.length}. The script still includes it.`
      : "";
  const licenseHint =
    license.trim() && !datasetLicenseUrl(license)
      ? "Enter a license URL, such as https://creativecommons.org/licenses/by/4.0, or leave it blank. A token such as CC-BY-4.0 is left out."
      : "";
  const temporalHint =
    temporalCoverage.trim() && !datasetTemporalCoverage(temporalCoverage)
      ? "Use a year, YYYY-MM, YYYY-MM-DD, or an interval such as 1950-01-01/2013-12-18. An open end is .."
      : "";

  function nextCreatorId() {
    const id = `creator-${creatorSeq.current}`;
    creatorSeq.current += 1;
    return id;
  }

  function nextDownloadId() {
    const id = `download-${downloadSeq.current}`;
    downloadSeq.current += 1;
    return id;
  }

  function patchCreator(id: string, patch: Partial<CreatorRow>) {
    setCreators((rows) => rows.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }

  function patchDownload(id: string, patch: Partial<DownloadRow>) {
    setDistributions((rows) => rows.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Use the name, the summary, the license, and the download URL a person can
        already see. Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Example Dataset"
            required
          />
          {started && !name.trim() ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              Add the name. The script is written once the dataset name is present.
            </span>
          ) : null}
        </label>
        <label className="block text-sm font-medium">
          Description
          <textarea
            className={`${field} mt-1 min-h-24`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="The summary already on the page."
            rows={3}
          />
          {descriptionHint ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">{descriptionHint}</span>
          ) : (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              Google’s dataset page asks for 50 to 5000 characters. This form writes the summary you enter.
            </span>
          )}
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Page URL
            <input
              className={`${field} mt-1`}
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://example.com/data/example"
              inputMode="url"
              autoComplete="url"
            />
            {url.trim() && !httpUrl(url) ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">Enter the page URL, or leave it blank.</span>
            ) : null}
          </label>
          <label className="block text-sm font-medium">
            License URL
            <input
              className={`${field} mt-1`}
              value={license}
              onChange={(event) => setLicense(event.target.value)}
              placeholder="https://creativecommons.org/licenses/by/4.0"
              inputMode="url"
            />
            {licenseHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{licenseHint}</span> : null}
          </label>
        </div>
        <fieldset className="grid gap-4 rounded-xl border border-rule bg-white/60 p-4">
          <legend className="px-1 text-sm font-medium">Creators</legend>
          <p className="text-xs text-ink-soft">
            One named creator is one Organization or Person. A URL without a name is left out. A second row becomes an
            array.
          </p>
          {creators.map((row, index) => {
            const hint = partyUrlHint(row.url, row.name, "creator");
            return (
              <div key={row.id} className="grid gap-3 border-t border-rule pt-4 first:border-t-0 first:pt-0">
                <p className="text-sm font-medium">Creator {index + 1}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block text-sm font-medium">
                    Name
                    <input
                      className={`${field} mt-1`}
                      value={row.name}
                      aria-label={`Creator ${index + 1} name`}
                      placeholder="Name on the dataset page"
                      onChange={(event) => patchCreator(row.id, { name: event.target.value })}
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
                      aria-label={`Creator ${index + 1} type`}
                      onChange={(event) => patchCreator(row.id, { kind: event.target.value as DatasetCreatorKind })}
                    >
                      {DATASET_CREATOR_KINDS.map((kind) => (
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
                    aria-label={`Creator ${index + 1} URL`}
                    placeholder="https://example.com/orgs/example"
                    inputMode="url"
                    onChange={(event) => patchCreator(row.id, { url: event.target.value })}
                  />
                  {row.url.trim() && !httpUrl(row.url) ? (
                    <span className="mt-1 block text-xs font-normal text-ink-soft">{hint}</span>
                  ) : null}
                </label>
                <button
                  type="button"
                  className="justify-self-start text-sm text-ink-soft underline-offset-4 hover:underline"
                  onClick={() =>
                    setCreators(
                      creators.length === 1 ? [emptyCreator(row.id)] : creators.filter((item) => item.id !== row.id),
                    )
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
            onClick={() => setCreators([...creators, emptyCreator(nextCreatorId())])}
          >
            Add a creator
          </button>
        </fieldset>
        <label className="block text-sm font-medium">
          Keywords
          <textarea
            className={`${field} mt-1 min-h-20`}
            value={keywords}
            onChange={(event) => setKeywords(event.target.value)}
            placeholder={"climate\nwater vapor"}
            rows={2}
          />
          <span className="mt-1 block text-xs font-normal text-ink-soft">
            One keyword per line, or separate them with commas. One keyword is a string. Two become an array.
          </span>
        </label>
        <label className="block text-sm font-medium">
          Temporal coverage
          <input
            className={`${field} mt-1`}
            value={temporalCoverage}
            onChange={(event) => setTemporalCoverage(event.target.value)}
            placeholder="1950-01-01/2013-12-18"
          />
          {temporalHint ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">{temporalHint}</span>
          ) : (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              A year, a month, a date, or an interval. 2011/2012 is the year 2011 in schema.org’s census example. An
              open end is two dots, as in 2013-12-19/..
            </span>
          )}
        </label>
        <fieldset className="grid gap-4 rounded-xl border border-rule bg-white/60 p-4">
          <legend className="px-1 text-sm font-medium">Distribution</legend>
          <p className="text-xs text-ink-soft">
            One download is one DataDownload. contentUrl is the file. encodingFormat is the format, such as CSV or
            text/csv. A format without a download URL is left out. A second row becomes an array.
          </p>
          {distributions.map((row, index) => {
            const urlInvalid = row.contentUrl.trim() && !httpUrl(row.contentUrl);
            const formatWithoutUrl = row.encodingFormat.trim() && !row.contentUrl.trim();
            const formatDropped = row.encodingFormat.trim() && row.contentUrl.trim() && !datasetEncodingFormat(row.encodingFormat);
            return (
              <div key={row.id} className="grid gap-3 border-t border-rule pt-4 first:border-t-0 first:pt-0">
                <p className="text-sm font-medium">Download {index + 1}</p>
                <label className="block text-sm font-medium">
                  contentUrl
                  <input
                    className={`${field} mt-1`}
                    value={row.contentUrl}
                    aria-label={`Download ${index + 1} content URL`}
                    placeholder="https://example.com/data/example.csv"
                    inputMode="url"
                    onChange={(event) => patchDownload(row.id, { contentUrl: event.target.value })}
                  />
                  {urlInvalid ? (
                    <span className="mt-1 block text-xs font-normal text-ink-soft">
                      Enter the download URL, or leave this row blank.
                    </span>
                  ) : null}
                  {formatWithoutUrl ? (
                    <span className="mt-1 block text-xs font-normal text-ink-soft">
                      Add the download URL, or clear the format. A format alone is left out.
                    </span>
                  ) : null}
                </label>
                <label className="block text-sm font-medium">
                  encodingFormat
                  <input
                    className={`${field} mt-1`}
                    value={row.encodingFormat}
                    aria-label={`Download ${index + 1} encoding format`}
                    placeholder="CSV"
                    onChange={(event) => patchDownload(row.id, { encodingFormat: event.target.value })}
                  />
                  {formatDropped ? (
                    <span className="mt-1 block text-xs font-normal text-ink-soft">
                      Use a short format name or a format URL. A value longer than 100 characters is left out.
                    </span>
                  ) : null}
                </label>
                <button
                  type="button"
                  className="justify-self-start text-sm text-ink-soft underline-offset-4 hover:underline"
                  onClick={() =>
                    setDistributions(
                      distributions.length === 1
                        ? [emptyDownload(row.id)]
                        : distributions.filter((item) => item.id !== row.id),
                    )
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
            onClick={() => setDistributions([...distributions, emptyDownload(nextDownloadId())])}
          >
            Add a download
          </button>
        </fieldset>
      </div>
      <CopyBlock label="Dataset JSON-LD" value={output} empty="Add a name to generate the script tag." />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}
