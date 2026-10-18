"use client";

import { useMemo, useRef, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { buildPersonSchema, httpUrl } from "@/lib/generators";

type Row = { id: string; url: string };

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

export function PersonSchemaGenerator() {
  const seq = useRef(1);
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [sameAs, setSameAs] = useState<Row[]>([{ id: "same-1", url: "" }]);
  const [worksForName, setWorksForName] = useState("");
  const [worksForUrl, setWorksForUrl] = useState("");
  const [alumniOfName, setAlumniOfName] = useState("");
  const [alumniOfUrl, setAlumniOfUrl] = useState("");
  const [knowsAbout, setKnowsAbout] = useState("");

  const output = useMemo(
    () =>
      buildPersonSchema({
        name,
        jobTitle,
        url,
        imageUrl,
        sameAs: sameAs.map((row) => row.url),
        worksForName,
        worksForUrl,
        alumniOfName,
        alumniOfUrl,
        knowsAbout: knowsAbout.split(/\r?\n/),
      }),
    [name, jobTitle, url, imageUrl, sameAs, worksForName, worksForUrl, alumniOfName, alumniOfUrl, knowsAbout],
  );

  function nextId() {
    seq.current += 1;
    return `same-${seq.current}`;
  }

  const urlHint = url.trim() && !httpUrl(url) ? "Enter the person’s URL, like https://example.com/about/jane-example." : "";
  const imageHint = imageUrl.trim() && !httpUrl(imageUrl) ? "Enter an image URL the page shows, or leave this blank." : "";
  const sameAsInvalid = sameAs.some((row) => row.url.trim() && !httpUrl(row.url));
  const worksUrlHint =
    worksForUrl.trim() && !httpUrl(worksForUrl) ? "Enter the employer’s URL, or leave it blank. The name is still included." : "";
  const worksNameHint =
    !worksForName.trim() && worksForUrl.trim() ? "Add the employer name, or clear the URL. A URL alone is left out." : "";
  const alumniUrlHint =
    alumniOfUrl.trim() && !httpUrl(alumniOfUrl) ? "Enter the school’s URL, or leave it blank. The name is still included." : "";
  const alumniNameHint =
    !alumniOfName.trim() && alumniOfUrl.trim() ? "Add the school name, or clear the URL. A URL alone is left out." : "";

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Use the name, job, and profiles a person can already read on the page. A team
        byline such as CiteScore Team is an Organization, not a Person. Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Jane Example"
            autoComplete="name"
            required
          />
        </label>
        <label className="block text-sm font-medium">
          Job title
          <input
            className={`${field} mt-1`}
            value={jobTitle}
            onChange={(event) => setJobTitle(event.target.value)}
            placeholder="Editor"
          />
        </label>
        <label className="block text-sm font-medium">
          URL
          <input
            className={`${field} mt-1`}
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com/about/jane-example"
            inputMode="url"
            autoComplete="url"
          />
          {urlHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{urlHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Image URL
          <input
            className={`${field} mt-1`}
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://example.com/photos/jane-example.jpg"
            inputMode="url"
          />
          {imageHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{imageHint}</span> : null}
        </label>
        <fieldset className="grid gap-2">
          <legend className="text-sm font-medium">Profile URLs (sameAs)</legend>
          <p className="text-xs text-ink-soft">Only profiles this person controls. A row that is not an http(s) URL is left out.</p>
          {sameAs.map((row, index) => (
            <div key={row.id} className="grid gap-2">
              <input
                className={field}
                value={row.url}
                aria-label={`Profile URL ${index + 1}`}
                placeholder="https://example.com/jane-example"
                inputMode="url"
                onChange={(event) =>
                  setSameAs(sameAs.map((item) => (item.id === row.id ? { ...item, url: event.target.value } : item)))
                }
              />
              <button
                type="button"
                className="justify-self-start text-sm text-ink-soft underline-offset-4 hover:underline"
                onClick={() =>
                  setSameAs(sameAs.length === 1 ? [{ id: row.id, url: "" }] : sameAs.filter((item) => item.id !== row.id))
                }
              >
                Remove
              </button>
            </div>
          ))}
          {sameAsInvalid ? (
            <p className="text-xs text-ink-soft">One profile URL is not a full http(s) URL. That row is left out.</p>
          ) : null}
          <button
            type="button"
            className="justify-self-start rounded-lg border border-rule bg-white px-4 py-2 text-sm"
            onClick={() => setSameAs([...sameAs, { id: nextId(), url: "" }])}
          >
            Add a profile URL
          </button>
        </fieldset>
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium">Works for</legend>
          <label className="block text-sm font-medium">
            Employer name
            <input
              className={`${field} mt-1`}
              value={worksForName}
              onChange={(event) => setWorksForName(event.target.value)}
              placeholder="Example Studio"
            />
            {worksNameHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{worksNameHint}</span> : null}
          </label>
          <label className="block text-sm font-medium">
            Employer URL
            <input
              className={`${field} mt-1`}
              value={worksForUrl}
              onChange={(event) => setWorksForUrl(event.target.value)}
              placeholder="https://example.com"
              inputMode="url"
            />
            {worksUrlHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{worksUrlHint}</span> : null}
          </label>
        </fieldset>
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium">Alumni of</legend>
          <label className="block text-sm font-medium">
            School name
            <input
              className={`${field} mt-1`}
              value={alumniOfName}
              onChange={(event) => setAlumniOfName(event.target.value)}
              placeholder="Example University"
            />
            {alumniNameHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{alumniNameHint}</span> : null}
          </label>
          <label className="block text-sm font-medium">
            School URL
            <input
              className={`${field} mt-1`}
              value={alumniOfUrl}
              onChange={(event) => setAlumniOfUrl(event.target.value)}
              placeholder="https://example.edu"
              inputMode="url"
            />
            {alumniUrlHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{alumniUrlHint}</span> : null}
          </label>
        </fieldset>
        <label className="block text-sm font-medium">
          Knows about
          <textarea
            className={`${field} mt-1`}
            value={knowsAbout}
            onChange={(event) => setKnowsAbout(event.target.value)}
            placeholder={"AI visibility\nrobots.txt"}
            rows={3}
          />
          <span className="mt-1 block text-xs font-normal text-ink-soft">One topic per line. A blank line is skipped. A repeated line is kept once.</span>
        </label>
      </div>
      <CopyBlock label="Person JSON-LD" value={output} empty="Add a name to generate the script tag." />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}
