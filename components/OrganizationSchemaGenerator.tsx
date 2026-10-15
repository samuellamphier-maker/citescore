"use client";

import { useMemo, useRef, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { buildOrganizationSchema, httpUrl, organizationEmail } from "@/lib/generators";

type Row = { id: string; url: string };

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

export function OrganizationSchemaGenerator() {
  const seq = useRef(1);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [includeWebsite, setIncludeWebsite] = useState(false);
  const [sameAs, setSameAs] = useState<Row[]>([{ id: "same-1", url: "" }]);

  const output = useMemo(
    () =>
      buildOrganizationSchema({
        name,
        url,
        logoUrl,
        description,
        sameAs: sameAs.map((row) => row.url),
        email,
        includeWebsite,
      }),
    [name, url, logoUrl, description, sameAs, email, includeWebsite],
  );

  function nextId() {
    seq.current += 1;
    return `same-${seq.current}`;
  }

  const urlHint = url.trim() && !httpUrl(url) ? "Enter a full site URL, like https://example.com." : "";
  const logoHint =
    logoUrl.trim() && !httpUrl(logoUrl) ? "Enter an image URL a crawler can fetch, or leave this blank." : "";
  const emailHint = email.trim() && !organizationEmail(email) ? "Enter a contact email, or leave this blank." : "";

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Use facts a person can already read on the page. Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Organization name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Northbound"
            required
          />
        </label>
        <label className="block text-sm font-medium">
          URL
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
          Logo URL
          <input
            className={`${field} mt-1`}
            value={logoUrl}
            onChange={(event) => setLogoUrl(event.target.value)}
            placeholder="https://example.com/logo.png"
            inputMode="url"
          />
          {logoHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{logoHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Description
          <textarea
            className={`${field} mt-1`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Customer-interview repository for product teams."
            rows={3}
          />
        </label>
        <fieldset className="grid gap-2">
          <legend className="text-sm font-medium">Profile URLs (sameAs)</legend>
          <p className="text-xs text-ink-soft">Only profiles this organization controls.</p>
          {sameAs.map((row, index) => (
            <div key={row.id} className="grid gap-2">
              <input
                className={field}
                value={row.url}
                aria-label={`Profile URL ${index + 1}`}
                placeholder="https://www.linkedin.com/company/example"
                inputMode="url"
                onChange={(event) =>
                  setSameAs(sameAs.map((item) => (item.id === row.id ? { ...item, url: event.target.value } : item)))
                }
              />
              <button
                type="button"
                className="justify-self-start text-sm text-ink-soft underline-offset-4 hover:underline"
                onClick={() =>
                  setSameAs(
                    sameAs.length === 1 ? [{ id: row.id, url: "" }] : sameAs.filter((item) => item.id !== row.id),
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
            onClick={() => setSameAs([...sameAs, { id: nextId(), url: "" }])}
          >
            Add a profile URL
          </button>
        </fieldset>
        <label className="block text-sm font-medium">
          Contact email
          <input
            className={`${field} mt-1`}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="hello@example.com"
            inputMode="email"
            autoComplete="email"
          />
          {emailHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{emailHint}</span> : null}
        </label>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            className="mt-1"
            checked={includeWebsite}
            onChange={(event) => setIncludeWebsite(event.target.checked)}
          />
          <span>Also generate a WebSite script for the same name and URL.</span>
        </label>
      </div>
      <CopyBlock
        label="Organization JSON-LD"
        value={output}
        empty="Add an organization name to generate the script tag."
      />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}
