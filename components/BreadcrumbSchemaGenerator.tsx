"use client";

import { useMemo, useRef, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { buildBreadcrumbSchema, httpUrl } from "@/lib/generators";

type Row = { id: string; name: string; url: string };

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

function emptyRow(id: string): Row {
  return { id, name: "", url: "" };
}

export function BreadcrumbSchemaGenerator() {
  const seq = useRef(2);
  const [rows, setRows] = useState<Row[]>([emptyRow("crumb-1"), emptyRow("crumb-2")]);
  const output = useMemo(
    () => buildBreadcrumbSchema(rows.map((row) => ({ name: row.name, url: row.url }))),
    [rows],
  );
  const positions = new Map<string, number>();
  let nextPosition = 0;
  for (const row of rows) {
    if (row.name.trim()) {
      nextPosition += 1;
      positions.set(row.id, nextPosition);
    }
  }

  function nextId() {
    seq.current += 1;
    return `crumb-${seq.current}`;
  }

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Add the crumbs a person can already see, in that order. Blank rows are skipped,
        and position starts at 1. Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        {rows.map((row, index) => {
          const pos = positions.get(row.id) ?? null;
          const urlHint = row.url.trim() && !httpUrl(row.url) ? "Enter a full URL, like https://example.com/guides." : "";
          return (
            <fieldset key={row.id} className="grid gap-2">
              <legend className="text-sm font-medium">{pos ? `Crumb ${pos}` : `Row ${index + 1}`}</legend>
              <input
                className={field}
                value={row.name}
                aria-label={`Crumb name ${index + 1}`}
                placeholder={index === 0 ? "Home" : "Locations"}
                onChange={(event) =>
                  setRows(rows.map((item) => (item.id === row.id ? { ...item, name: event.target.value } : item)))
                }
              />
              <input
                className={field}
                value={row.url}
                aria-label={`Crumb URL ${index + 1}`}
                placeholder={index === 0 ? "https://example.com/" : "https://example.com/locations/main-street"}
                inputMode="url"
                onChange={(event) =>
                  setRows(rows.map((item) => (item.id === row.id ? { ...item, url: event.target.value } : item)))
                }
              />
              {urlHint ? <p className="text-xs text-ink-soft">{urlHint}</p> : null}
              <button
                type="button"
                className="justify-self-start text-sm text-ink-soft underline-offset-4 hover:underline"
                onClick={() => setRows(rows.length === 1 ? [emptyRow(row.id)] : rows.filter((item) => item.id !== row.id))}
              >
                Remove
              </button>
            </fieldset>
          );
        })}
      </div>
      <button
        type="button"
        className="mt-4 rounded-lg border border-rule bg-white px-4 py-2 text-sm"
        onClick={() => setRows([...rows, emptyRow(nextId())])}
      >
        Add a crumb
      </button>
      <CopyBlock
        label="BreadcrumbList JSON-LD"
        value={output}
        empty="Add a crumb name to generate the script tag."
      />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}
