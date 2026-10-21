"use client";

import { useMemo, useRef, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import {
  QA_AUTHOR_KINDS,
  buildQaPageSchema,
  httpUrl,
  isoDateTime,
  nonNegativeInt,
  type QaAnswerInput,
  type QaAuthorKind,
} from "@/lib/generators";

type AnswerRow = QaAnswerInput & { id: string };

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

function emptyAnswer(id: string): AnswerRow {
  return {
    id,
    text: "",
    authorName: "",
    authorKind: "Person",
    authorUrl: "",
    datePublished: "",
    dateModified: "",
    url: "",
  };
}

function dateHint(raw: string) {
  if (!raw.trim()) return "";
  if (!isoDateTime(raw)) return "Enter YYYY-MM-DD, or a time such as 2026-10-21T15:04:00Z.";
  return "";
}

function orderHint(published: string, modified: string) {
  const pub = isoDateTime(published);
  const mod = isoDateTime(modified);
  if (!pub || !mod) return "";
  if (mod.slice(0, 10) < pub.slice(0, 10)) return "The modified date is earlier than the published date.";
  return "";
}

function authorUrlHint(url: string) {
  if (url.trim() && !httpUrl(url)) return "Enter the author’s URL, or leave it blank. The name is still included.";
  return "";
}

function authorNameHint(name: string, url: string) {
  if (!name.trim() && url.trim()) return "Add the author name, or clear the URL. A URL alone is left out.";
  return "";
}

function answerUrlHint(url: string) {
  if (url.trim() && !httpUrl(url)) return "Enter the answer URL, or leave it blank.";
  return "";
}

export function QaPageSchemaGenerator() {
  const seq = useRef(2);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [answerCount, setAnswerCount] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorKind, setAuthorKind] = useState<QaAuthorKind>("Person");
  const [authorUrl, setAuthorUrl] = useState("");
  const [datePublished, setDatePublished] = useState("");
  const [dateModified, setDateModified] = useState("");
  const [accepted, setAccepted] = useState<AnswerRow>(emptyAnswer("accepted"));
  const [suggested, setSuggested] = useState<AnswerRow[]>([emptyAnswer("suggested-1")]);

  const output = useMemo(
    () =>
      buildQaPageSchema({
        name,
        text,
        answerCount,
        authorName,
        authorKind,
        authorUrl,
        datePublished,
        dateModified,
        accepted,
        suggested,
      }),
    [name, text, answerCount, authorName, authorKind, authorUrl, datePublished, dateModified, accepted, suggested],
  );

  function nextId() {
    seq.current += 1;
    return `suggested-${seq.current}`;
  }

  const included =
    (accepted.text.trim() ? 1 : 0) + suggested.filter((row) => row.text.trim()).length;
  const typedCount = nonNegativeInt(answerCount);
  const countHint =
    answerCount.trim() && !typedCount
      ? "Enter a whole number, or leave this blank. A blank count uses the answers in this form."
      : typedCount && Number(typedCount) < included
        ? "Google’s page says answerCount is the total, which can be higher than the answers in the script. A number below the answers included here is replaced with that included count."
        : "";
  const answerHint =
    name.trim() && included === 0
      ? "Google’s QA page says a question needs an accepted answer or a suggested answer to be eligible for the rich result. A question with no answers can still be marked up with answerCount 0."
      : "";

  const started =
    [name, text, answerCount, authorName, authorUrl, datePublished, dateModified].some((value) => value.trim()) ||
    answerStarted(accepted) ||
    suggested.some(answerStarted);
  const nameMissing = started && !name.trim();

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Use the question, the answers, the authors, and the dates a person can already
        see on that one page. Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Question
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="How do I export a workspace?"
            required
          />
          {nameMissing ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">Add the question shown on the page.</span>
          ) : null}
        </label>
        <label className="block text-sm font-medium">
          Longer question text
          <textarea
            className={`${field} mt-1 min-h-24`}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="I need a file of every project on this workspace. Where is the export?"
            rows={3}
          />
        </label>
        <label className="block text-sm font-medium">
          Total answers
          <input
            className={`${field} mt-1`}
            value={answerCount}
            onChange={(event) => setAnswerCount(event.target.value)}
            placeholder="3"
            inputMode="numeric"
          />
          <span className="mt-1 block text-xs font-normal text-ink-soft">
            Leave blank to count the answers in this form, including zero. Use a higher number only when the page has
            more answers than the ones you are marking up.
          </span>
          {countHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{countHint}</span> : null}
          {answerHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{answerHint}</span> : null}
        </label>
        <AuthorFields
          legend="Question author"
          name={authorName}
          kind={authorKind}
          url={authorUrl}
          onName={setAuthorName}
          onKind={setAuthorKind}
          onUrl={setAuthorUrl}
        />
        <DateFields
          published={datePublished}
          modified={dateModified}
          onPublished={setDatePublished}
          onModified={setDateModified}
          publishedLabel="Question posted"
          modifiedLabel="Question edited"
        />
        <AnswerFields
          legend="Accepted answer"
          row={accepted}
          onChange={setAccepted}
          extraHint={
            !accepted.text.trim() && answerStarted(accepted)
              ? "Add the accepted answer text, or clear the other fields. An answer without text is left out."
              : ""
          }
        />
        <fieldset className="grid gap-4">
          <legend className="text-sm font-medium">Suggested answers</legend>
          <p className="text-xs text-ink-soft">
            Other replies on the same page. A suggested answer is not the accepted one. A row without text is left out.
          </p>
          {suggested.map((row, index) => (
            <div key={row.id} className="grid gap-3 rounded-xl border border-rule bg-white p-4">
              <AnswerFields
                legend={`Suggested answer ${index + 1}`}
                row={row}
                onChange={(next) => setSuggested(suggested.map((item) => (item.id === row.id ? next : item)))}
                extraHint={
                  !row.text.trim() && answerStarted(row)
                    ? "Add the answer text, or clear the other fields. An answer without text is left out."
                    : ""
                }
              />
              <button
                type="button"
                className="justify-self-start text-sm text-ink-soft underline-offset-4 hover:underline"
                onClick={() =>
                  setSuggested(
                    suggested.length === 1 ? [emptyAnswer(row.id)] : suggested.filter((item) => item.id !== row.id),
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
            onClick={() => setSuggested([...suggested, emptyAnswer(nextId())])}
          >
            Add a suggested answer
          </button>
        </fieldset>
      </div>
      <CopyBlock
        label="QAPage JSON-LD"
        value={output}
        empty="Add the question to generate the script tag."
      />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}

function answerStarted(row: QaAnswerInput) {
  return [row.text, row.authorName, row.authorUrl, row.datePublished, row.dateModified, row.url].some((value) =>
    value.trim(),
  );
}

function AuthorFields({
  legend,
  name,
  kind,
  url,
  onName,
  onKind,
  onUrl,
}: {
  legend: string;
  name: string;
  kind: QaAuthorKind;
  url: string;
  onName: (value: string) => void;
  onKind: (value: QaAuthorKind) => void;
  onUrl: (value: string) => void;
}) {
  const urlHint = authorUrlHint(url);
  const nameHint = authorNameHint(name, url);
  return (
    <fieldset className="grid gap-3">
      <legend className="text-sm font-medium">{legend}</legend>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => onName(event.target.value)}
            placeholder="Example author"
          />
          {nameHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{nameHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Type
          <select
            className={`${field} mt-1`}
            value={kind}
            onChange={(event) => onKind(event.target.value as QaAuthorKind)}
          >
            {QA_AUTHOR_KINDS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="block text-sm font-medium">
        URL
        <input
          className={`${field} mt-1`}
          value={url}
          onChange={(event) => onUrl(event.target.value)}
          placeholder="https://example.com/profiles/example-author"
          inputMode="url"
        />
        {urlHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{urlHint}</span> : null}
      </label>
    </fieldset>
  );
}

function DateFields({
  published,
  modified,
  onPublished,
  onModified,
  publishedLabel,
  modifiedLabel,
}: {
  published: string;
  modified: string;
  onPublished: (value: string) => void;
  onModified: (value: string) => void;
  publishedLabel: string;
  modifiedLabel: string;
}) {
  const publishedHint = dateHint(published);
  const modifiedHint = dateHint(modified);
  const order = orderHint(published, modified);
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="block text-sm font-medium">
        {publishedLabel}
        <input
          className={`${field} mt-1`}
          value={published}
          onChange={(event) => onPublished(event.target.value)}
          placeholder="2026-10-21T15:04:00Z"
        />
        {publishedHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{publishedHint}</span> : null}
      </label>
      <label className="block text-sm font-medium">
        {modifiedLabel}
        <input
          className={`${field} mt-1`}
          value={modified}
          onChange={(event) => onModified(event.target.value)}
          placeholder="2026-10-21"
        />
        {modifiedHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{modifiedHint}</span> : null}
        {order ? <span className="mt-1 block text-xs font-normal text-ink-soft">{order}</span> : null}
      </label>
    </div>
  );
}

function AnswerFields({
  legend,
  row,
  onChange,
  extraHint,
}: {
  legend: string;
  row: AnswerRow;
  onChange: (row: AnswerRow) => void;
  extraHint: string;
}) {
  const urlHint = answerUrlHint(row.url);
  return (
    <fieldset className="grid gap-3">
      <legend className="text-sm font-medium">{legend}</legend>
      <label className="block text-sm font-medium">
        Answer text
        <textarea
          className={`${field} mt-1 min-h-24`}
          value={row.text}
          onChange={(event) => onChange({ ...row, text: event.target.value })}
          placeholder="Open Settings, choose Export, and download the file."
          rows={3}
        />
        {extraHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{extraHint}</span> : null}
      </label>
      <AuthorFields
        legend="Answer author"
        name={row.authorName}
        kind={row.authorKind === "Organization" ? "Organization" : "Person"}
        url={row.authorUrl}
        onName={(authorName) => onChange({ ...row, authorName })}
        onKind={(authorKind) => onChange({ ...row, authorKind })}
        onUrl={(authorUrl) => onChange({ ...row, authorUrl })}
      />
      <DateFields
        published={row.datePublished}
        modified={row.dateModified}
        onPublished={(datePublished) => onChange({ ...row, datePublished })}
        onModified={(dateModified) => onChange({ ...row, dateModified })}
        publishedLabel="Answer posted"
        modifiedLabel="Answer edited"
      />
      <label className="block text-sm font-medium">
        Answer URL
        <input
          className={`${field} mt-1`}
          value={row.url}
          onChange={(event) => onChange({ ...row, url: event.target.value })}
          placeholder="https://example.com/questions/export#accepted"
          inputMode="url"
        />
        {urlHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{urlHint}</span> : null}
      </label>
    </fieldset>
  );
}
