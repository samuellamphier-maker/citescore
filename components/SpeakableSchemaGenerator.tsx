"use client";

import { useMemo, useRef, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import {
  XPATH_KEYS,
  buildSpeakableSchema,
  cssSelectorIssue,
  cssSelectorValue,
  httpUrl,
  xpathIssue,
  xpathValue,
  type SpeakableLocator,
  type XPathKey,
} from "@/lib/generators";

type SelectorRow = { id: string; value: string };

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

function emptyRow(id: string): SelectorRow {
  return { id, value: "" };
}

export function SpeakableSchemaGenerator() {
  const seq = useRef(1);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [locator, setLocator] = useState<SpeakableLocator>("cssSelector");
  const [xpathKey, setXpathKey] = useState<XPathKey>("xpath");
  const [cssRows, setCssRows] = useState<SelectorRow[]>([emptyRow("css-1")]);
  const [xpathRows, setXpathRows] = useState<SelectorRow[]>([emptyRow("xpath-1")]);

  const activeRows = locator === "xpath" ? xpathRows : cssRows;
  const output = useMemo(
    () =>
      buildSpeakableSchema({
        name,
        url,
        locator,
        selectors: activeRows.map((row) => row.value),
        xpathKey,
      }),
    [name, url, locator, activeRows, xpathKey],
  );

  function nextId(prefix: string) {
    seq.current += 1;
    return `${prefix}-${seq.current}`;
  }

  const urlHint = url.trim() && !httpUrl(url) ? "Enter the page URL, or leave it blank." : "";
  const validCount = activeRows.filter((row) =>
    locator === "xpath" ? xpathValue(row.value) : cssSelectorValue(row.value),
  ).length;
  const otherRows = locator === "xpath" ? cssRows : xpathRows;
  const otherHasText = otherRows.some((row) => row.value.trim());
  const started = Boolean(name.trim() || url.trim() || activeRows.some((row) => row.value.trim()) || otherHasText);
  const nameMissing = started && !name.trim();
  const locatorMissing = Boolean(name.trim()) && validCount === 0;

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Name the page, then point at a short passage a person can already read.
        Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Page name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Example news brief"
            required
          />
          {nameMissing ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">Add the name shown on the page.</span>
          ) : null}
        </label>
        <label className="block text-sm font-medium">
          Page URL
          <input
            className={`${field} mt-1`}
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com/news/example-brief"
            inputMode="url"
            autoComplete="url"
          />
          {urlHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{urlHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Locator
          <select
            className={`${field} mt-1`}
            value={locator}
            onChange={(event) => setLocator(event.target.value === "xpath" ? "xpath" : "cssSelector")}
          >
            <option value="cssSelector">CSS selectors</option>
            <option value="xpath">XPath</option>
          </select>
          <span className="mt-1 block text-xs font-normal text-ink-soft">
            Google’s speakable page says to use cssSelector or xPath, not both. The method you do not select stays in
            the form and is left out of the script.
          </span>
          {otherHasText ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              The other method has text. It is not in this script.
            </span>
          ) : null}
        </label>
        {locator === "xpath" ? (
          <label className="block text-sm font-medium">
            XPath property name
            <select
              className={`${field} mt-1 font-mono text-[13px]`}
              value={xpathKey}
              onChange={(event) => setXpathKey(event.target.value === "xPath" ? "xPath" : "xpath")}
            >
              {XPATH_KEYS.map((key) => (
                <option key={key} value={key}>
                  {key === "xPath" ? "Google speakable page: xPath" : "schema.org: xpath"}
                </option>
              ))}
            </select>
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              schema.org names the property xpath. Google’s speakable page spells it xPath. This form writes the
              spelling you pick, and only that spelling.
            </span>
          </label>
        ) : null}
        <SelectorList
          legend={locator === "xpath" ? "XPath expressions" : "CSS selectors"}
          rows={activeRows}
          placeholder={locator === "xpath" ? "/html/head/title" : ".summary"}
          issue={locator === "xpath" ? xpathIssue : cssSelectorIssue}
          onChange={locator === "xpath" ? setXpathRows : setCssRows}
          onAdd={() => {
            const prefix = locator === "xpath" ? "xpath" : "css";
            const add = locator === "xpath" ? setXpathRows : setCssRows;
            add([...activeRows, emptyRow(nextId(prefix))]);
          }}
          missingHint={
            locatorMissing
              ? locator === "xpath"
                ? "Add one XPath that matches visible text. The script is written once a valid expression is present."
                : "Add one CSS selector that matches visible text. The script is written once a valid selector is present."
              : ""
          }
        />
      </div>
      <CopyBlock
        label="Speakable JSON-LD"
        value={output}
        empty="Add the page name and one CSS selector or XPath to generate the script tag."
      />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}

function SelectorList({
  legend,
  rows,
  placeholder,
  issue,
  onChange,
  onAdd,
  missingHint,
}: {
  legend: string;
  rows: SelectorRow[];
  placeholder: string;
  issue: (value: string) => string;
  onChange: (rows: SelectorRow[]) => void;
  onAdd: () => void;
  missingHint: string;
}) {
  return (
    <fieldset className="grid gap-3">
      <legend className="text-sm font-medium">{legend}</legend>
      <p className="text-xs text-ink-soft">
        One locator per row. A blank row is left out. Duplicates are written once. Google’s example uses about two or
        three sentences, or around 20–30 seconds of speech, and it says not to mark the whole article.
      </p>
      {missingHint ? <p className="text-xs text-ink-soft">{missingHint}</p> : null}
      {rows.map((row, index) => {
        const rowIssue = issue(row.value);
        return (
          <div key={row.id} className="grid gap-2">
            <label className="block text-sm font-medium">
              {legend.replace(/s$/, "")} {index + 1}
              <input
                className={`${field} mt-1 font-mono text-[13px]`}
                value={row.value}
                onChange={(event) =>
                  onChange(rows.map((item) => (item.id === row.id ? { ...item, value: event.target.value } : item)))
                }
                placeholder={placeholder}
                spellCheck={false}
              />
              {rowIssue ? <span className="mt-1 block text-xs font-normal text-ink-soft">{rowIssue}</span> : null}
            </label>
            <button
              type="button"
              className="justify-self-start text-sm text-ink-soft underline-offset-4 hover:underline"
              onClick={() => onChange(rows.length === 1 ? [emptyRow(row.id)] : rows.filter((item) => item.id !== row.id))}
            >
              Remove
            </button>
          </div>
        );
      })}
      <button
        type="button"
        className="justify-self-start rounded-lg border border-rule bg-white px-4 py-2 text-sm"
        onClick={onAdd}
      >
        Add another
      </button>
    </fieldset>
  );
}
