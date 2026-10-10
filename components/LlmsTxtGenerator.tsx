"use client";

import { useMemo, useRef, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { buildLlmsTxt, type LlmsLink } from "@/lib/generators";

type Row = LlmsLink & { id: string };

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

function emptyRow(id: string): Row {
  return { id, title: "", url: "", note: "" };
}

export function LlmsTxtGenerator() {
  const seq = useRef(4);
  const [name, setName] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [section, setSection] = useState("Docs");
  const [pages, setPages] = useState<Row[]>([emptyRow("page-1")]);
  const [optional, setOptional] = useState<Row[]>([emptyRow("opt-1")]);

  const output = useMemo(
    () => buildLlmsTxt({ name, siteUrl, summary, details, section, pages, optional }),
    [name, siteUrl, summary, details, section, pages, optional],
  );

  function nextId() {
    seq.current += 1;
    return `row-${seq.current}`;
  }

  function update(rows: Row[], id: string, patch: Partial<LlmsLink>, setRows: (rows: Row[]) => void) {
    setRows(rows.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }

  return (
    <form
      className="rounded-2xl border border-rule bg-cream p-5 text-ink"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="text-sm text-ink-soft">
        The file updates as you type. Paths like <code>/pricing</code> are joined to the site URL.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Site name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Northbound"
            required
          />
        </label>
        <label className="block text-sm font-medium">
          Site URL
          <input
            className={`${field} mt-1`}
            value={siteUrl}
            onChange={(event) => setSiteUrl(event.target.value)}
            placeholder="https://example.com"
            inputMode="url"
            autoComplete="url"
          />
        </label>
        <label className="block text-sm font-medium">
          One-line summary
          <textarea
            className={`${field} mt-1`}
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            placeholder="Customer-interview repository for product teams."
            rows={2}
          />
        </label>
        <label className="block text-sm font-medium">
          Extra detail
          <span className="mt-0.5 block text-xs font-normal text-ink-soft">Optional. No headings — those belong in the sections below.</span>
          <textarea
            className={`${field} mt-1`}
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            rows={3}
          />
        </label>
        <label className="block text-sm font-medium">
          Section heading
          <input
            className={`${field} mt-1`}
            value={section}
            onChange={(event) => setSection(event.target.value)}
            placeholder="Docs"
          />
        </label>
      </div>

      <LinkRows
        legend="Pages to list"
        rows={pages}
        onChange={(id, patch) => update(pages, id, patch, setPages)}
        onAdd={() => setPages([...pages, emptyRow(nextId())])}
        onRemove={(id) => setPages(pages.length === 1 ? [emptyRow(id)] : pages.filter((row) => row.id !== id))}
      />
      <LinkRows
        legend="Optional — secondary links a model can skip"
        rows={optional}
        onChange={(id, patch) => update(optional, id, patch, setOptional)}
        onAdd={() => setOptional([...optional, emptyRow(nextId())])}
        onRemove={(id) =>
          setOptional(optional.length === 1 ? [emptyRow(id)] : optional.filter((row) => row.id !== id))
        }
      />

      <CopyBlock label="llms.txt" value={output} empty="" />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}

function LinkRows({
  legend,
  rows,
  onChange,
  onAdd,
  onRemove,
}: {
  legend: string;
  rows: Row[];
  onChange: (id: string, patch: Partial<LlmsLink>) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}) {
  return (
    <fieldset className="mt-6">
      <legend className="text-sm font-medium">{legend}</legend>
      <div className="mt-3 grid gap-3">
        {rows.map((row, index) => (
          <div key={row.id} className="grid gap-2 sm:grid-cols-[1fr_1.2fr_1fr_auto] sm:items-start">
            <input
              className={field}
              value={row.title}
              aria-label={`Link title ${index + 1}`}
              placeholder="Pricing"
              onChange={(event) => onChange(row.id, { title: event.target.value })}
            />
            <input
              className={field}
              value={row.url}
              aria-label={`URL ${index + 1}`}
              placeholder="/pricing"
              inputMode="url"
              onChange={(event) => onChange(row.id, { url: event.target.value })}
            />
            <input
              className={field}
              value={row.note}
              aria-label={`Note ${index + 1}`}
              placeholder="Public plans"
              onChange={(event) => onChange(row.id, { note: event.target.value })}
            />
            <button
              type="button"
              className="rounded-lg px-2 py-2 text-sm text-ink-soft underline-offset-4 hover:underline"
              onClick={() => onRemove(row.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-3 rounded-lg border border-rule bg-white px-4 py-2 text-sm"
        onClick={onAdd}
      >
        Add a URL
      </button>
    </fieldset>
  );
}
