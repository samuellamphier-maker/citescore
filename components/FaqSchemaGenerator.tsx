"use client";

import { useMemo, useRef, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { buildFaqSchema, type FaqPair } from "@/lib/generators";

type Row = FaqPair & { id: string };

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

function emptyRow(id: string): Row {
  return { id, question: "", answer: "" };
}

export function FaqSchemaGenerator() {
  const seq = useRef(3);
  const [rows, setRows] = useState<Row[]>([emptyRow("faq-1"), emptyRow("faq-2")]);
  const output = useMemo(() => buildFaqSchema(rows), [rows]);

  function nextId() {
    seq.current += 1;
    return `faq-${seq.current}`;
  }

  return (
    <form
      className="rounded-2xl border border-rule bg-cream p-5 text-ink"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="text-sm text-ink-soft">
        One question, one answer. Only include pairs a person can already read on the page.
      </p>
      <div className="mt-4 grid gap-4">
        {rows.map((row, index) => (
          <fieldset key={row.id} className="grid gap-2">
            <legend className="text-sm font-medium">Question {index + 1}</legend>
            <input
              className={field}
              value={row.question}
              aria-label={`Question ${index + 1}`}
              placeholder="What is CiteScore?"
              onChange={(event) =>
                setRows(rows.map((item) => (item.id === row.id ? { ...item, question: event.target.value } : item)))
              }
            />
            <textarea
              className={field}
              value={row.answer}
              aria-label={`Answer ${index + 1}`}
              placeholder="A one-time GEO audit of one public URL."
              rows={3}
              onChange={(event) =>
                setRows(rows.map((item) => (item.id === row.id ? { ...item, answer: event.target.value } : item)))
              }
            />
            <button
              type="button"
              className="justify-self-start text-sm text-ink-soft underline-offset-4 hover:underline"
              onClick={() =>
                setRows(rows.length === 1 ? [emptyRow(row.id)] : rows.filter((item) => item.id !== row.id))
              }
            >
              Remove
            </button>
          </fieldset>
        ))}
      </div>
      <button
        type="button"
        className="mt-4 rounded-lg border border-rule bg-white px-4 py-2 text-sm"
        onClick={() => setRows([...rows, emptyRow(nextId())])}
      >
        Add a question
      </button>
      <CopyBlock
        label="FAQPage JSON-LD"
        value={output}
        empty="Add a question and an answer to generate the script tag."
      />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}
