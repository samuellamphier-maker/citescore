"use client";

import { useMemo, useRef, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import {
  BOOK_FORMATS,
  BOOK_PARTY_KINDS,
  bcp47Language,
  bookDate,
  bookPageCount,
  buildBookSchema,
  httpUrl,
  isbn10Converted,
  isbn13,
  type BookEditionInput,
  type BookPartyKind,
} from "@/lib/generators";

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

type EditionRow = BookEditionInput & { id: string };

function emptyEdition(id: string): EditionRow {
  return {
    id,
    bookEdition: "",
    bookFormat: "",
    isbn: "",
    inLanguage: "",
    numberOfPages: "",
    datePublished: "",
    url: "",
  };
}

function partyUrlHint(url: string, name: string, label: string) {
  if (url.trim() && !httpUrl(url)) return `Enter the ${label} URL, or leave it blank. The name is still included.`;
  if (!name.trim() && url.trim()) return `Add the ${label} name, or clear the URL. A URL alone is left out.`;
  return "";
}

function isbnHint(value: string) {
  if (!value.trim() || isbn13(value)) {
    return isbn10Converted(value)
      ? "This ISBN-10 is written as ISBN-13. Google’s book-actions page does not accept ISBN-10."
      : "";
  }
  return "Enter an ISBN-13, or an ISBN-10 with a valid check digit. Hyphens are removed. A failed check digit is left out.";
}

function pagesHint(value: string) {
  if (!value.trim() || bookPageCount(value) !== null) return "";
  return "Enter the number of pages, such as 224.";
}

function dateHint(value: string) {
  if (!value.trim() || bookDate(value)) return "";
  return "Use YYYY-MM-DD, or a four-digit year. Anything else is left out.";
}

function languageHint(value: string) {
  if (!value.trim() || bcp47Language(value)) return "";
  return "Use a BCP 47 tag, such as en or en-US.";
}

export function BookSchemaGenerator() {
  const seq = useRef(2);
  const [name, setName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorKind, setAuthorKind] = useState<BookPartyKind>("Person");
  const [authorUrl, setAuthorUrl] = useState("");
  const [isbn, setIsbn] = useState("");
  const [bookFormat, setBookFormat] = useState("");
  const [numberOfPages, setNumberOfPages] = useState("");
  const [datePublished, setDatePublished] = useState("");
  const [bookEdition, setBookEdition] = useState("");
  const [publisherName, setPublisherName] = useState("");
  const [publisherKind, setPublisherKind] = useState<BookPartyKind>("Organization");
  const [publisherUrl, setPublisherUrl] = useState("");
  const [inLanguage, setInLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [url, setUrl] = useState("");
  const [editions, setEditions] = useState<EditionRow[]>([emptyEdition("edition-1")]);

  const output = useMemo(
    () =>
      buildBookSchema({
        name,
        authorName,
        authorKind,
        authorUrl,
        isbn,
        bookFormat,
        numberOfPages,
        datePublished,
        bookEdition,
        publisherName,
        publisherKind,
        publisherUrl,
        inLanguage,
        description,
        imageUrl,
        url,
        editions,
      }),
    [
      name,
      authorName,
      authorKind,
      authorUrl,
      isbn,
      bookFormat,
      numberOfPages,
      datePublished,
      bookEdition,
      publisherName,
      publisherKind,
      publisherUrl,
      inLanguage,
      description,
      imageUrl,
      url,
      editions,
    ],
  );

  const started = [
    name,
    authorName,
    authorUrl,
    isbn,
    bookFormat,
    numberOfPages,
    datePublished,
    bookEdition,
    publisherName,
    publisherUrl,
    inLanguage,
    description,
    imageUrl,
    url,
    ...editions.flatMap((row) => [
      row.bookEdition,
      row.bookFormat,
      row.isbn,
      row.inLanguage,
      row.numberOfPages,
      row.datePublished,
      row.url,
    ]),
  ].some((value) => value.trim());

  function nextId() {
    seq.current += 1;
    return `edition-${seq.current}`;
  }

  function patchEdition(id: string, patch: Partial<EditionRow>) {
    setEditions(editions.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Use the title, author, ISBN, format, page count, date, publisher, language,
        description, cover, and page URL a person can already see. Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Title (name)
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Example Field Guide"
            required
          />
          {started && !name.trim() ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              Add the title. The script is written once the book name is present.
            </span>
          ) : null}
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Author name
            <input
              className={`${field} mt-1`}
              value={authorName}
              onChange={(event) => setAuthorName(event.target.value)}
              placeholder={authorKind === "Organization" ? "Example Press" : "Name on the title page"}
            />
            {partyUrlHint(authorUrl, authorName, "author") && !authorName.trim() ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">
                {partyUrlHint(authorUrl, authorName, "author")}
              </span>
            ) : null}
          </label>
          <label className="block text-sm font-medium">
            Author type
            <select
              className={`${field} mt-1`}
              value={authorKind}
              onChange={(event) => setAuthorKind(event.target.value as BookPartyKind)}
            >
              {BOOK_PARTY_KINDS.map((kind) => (
                <option key={kind} value={kind}>
                  {kind}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="block text-sm font-medium">
          Author URL
          <input
            className={`${field} mt-1`}
            value={authorUrl}
            onChange={(event) => setAuthorUrl(event.target.value)}
            placeholder="https://example.com"
            inputMode="url"
          />
          {authorUrl.trim() && !httpUrl(authorUrl) ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              {partyUrlHint(authorUrl, authorName, "author")}
            </span>
          ) : null}
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            ISBN
            <input
              className={`${field} mt-1`}
              value={isbn}
              onChange={(event) => setIsbn(event.target.value)}
              placeholder="978-0-306-40615-7"
              inputMode="text"
              autoComplete="off"
            />
            {isbnHint(isbn) ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">{isbnHint(isbn)}</span>
            ) : null}
          </label>
          <label className="block text-sm font-medium">
            Format (bookFormat)
            <select className={`${field} mt-1`} value={bookFormat} onChange={(event) => setBookFormat(event.target.value)}>
              <option value="">Leave out</option>
              {BOOK_FORMATS.map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Number of pages
            <input
              className={`${field} mt-1`}
              value={numberOfPages}
              onChange={(event) => setNumberOfPages(event.target.value)}
              placeholder="224"
              inputMode="numeric"
            />
            {pagesHint(numberOfPages) ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">{pagesHint(numberOfPages)}</span>
            ) : null}
          </label>
          <label className="block text-sm font-medium">
            Date published
            <input
              className={`${field} mt-1`}
              value={datePublished}
              onChange={(event) => setDatePublished(event.target.value)}
              placeholder="1991-05-01"
            />
            {dateHint(datePublished) ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">{dateHint(datePublished)}</span>
            ) : null}
          </label>
        </div>
        <label className="block text-sm font-medium">
          Edition label
          <input
            className={`${field} mt-1`}
            value={bookEdition}
            onChange={(event) => setBookEdition(event.target.value)}
            placeholder="2nd edition"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Publisher name
            <input
              className={`${field} mt-1`}
              value={publisherName}
              onChange={(event) => setPublisherName(event.target.value)}
              placeholder={publisherKind === "Person" ? "Name on the copyright page" : "Example Press"}
            />
            {!publisherName.trim() && publisherUrl.trim() ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">
                {partyUrlHint(publisherUrl, publisherName, "publisher")}
              </span>
            ) : null}
          </label>
          <label className="block text-sm font-medium">
            Publisher type
            <select
              className={`${field} mt-1`}
              value={publisherKind}
              onChange={(event) => setPublisherKind(event.target.value as BookPartyKind)}
            >
              {BOOK_PARTY_KINDS.map((kind) => (
                <option key={kind} value={kind}>
                  {kind}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="block text-sm font-medium">
          Publisher URL
          <input
            className={`${field} mt-1`}
            value={publisherUrl}
            onChange={(event) => setPublisherUrl(event.target.value)}
            placeholder="https://example.com"
            inputMode="url"
          />
          {publisherUrl.trim() && !httpUrl(publisherUrl) ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              {partyUrlHint(publisherUrl, publisherName, "publisher")}
            </span>
          ) : null}
        </label>
        <label className="block text-sm font-medium">
          Language (inLanguage)
          <input
            className={`${field} mt-1`}
            value={inLanguage}
            onChange={(event) => setInLanguage(event.target.value)}
            placeholder="en"
          />
          {languageHint(inLanguage) ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">{languageHint(inLanguage)}</span>
          ) : null}
        </label>
        <label className="block text-sm font-medium">
          Description
          <textarea
            className={`${field} mt-1 min-h-24`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="The description already on the book page."
            rows={3}
          />
        </label>
        <label className="block text-sm font-medium">
          Cover image URL
          <input
            className={`${field} mt-1`}
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://example.com/covers/guide.jpg"
            inputMode="url"
          />
          {imageUrl.trim() && !httpUrl(imageUrl) ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              Enter an image URL a crawler can fetch, or leave this blank.
            </span>
          ) : null}
        </label>
        <label className="block text-sm font-medium">
          Book page URL
          <input
            className={`${field} mt-1`}
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com/books/guide"
            inputMode="url"
          />
          {url.trim() && !httpUrl(url) ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              Enter the book page URL, or leave this blank.
            </span>
          ) : null}
        </label>
        <fieldset className="grid gap-4">
          <legend className="text-sm font-medium">Editions (workExample)</legend>
          <p className="text-xs text-ink-soft">
            Optional. One row is one edition of the same work. A blank row is left out. Leave this blank when the page
            is already one edition and the fields above are that edition.
          </p>
          {editions.map((row, index) => (
            <div key={row.id} className="grid gap-3 rounded-xl border border-rule bg-white p-3">
              <p className="text-sm font-medium">Edition {index + 1}</p>
              <label className="block text-sm font-medium">
                Edition label
                <input
                  className={`${field} mt-1`}
                  value={row.bookEdition}
                  aria-label={`Edition ${index + 1} label`}
                  placeholder="Paperback"
                  onChange={(event) => patchEdition(row.id, { bookEdition: event.target.value })}
                />
              </label>
              <label className="block text-sm font-medium">
                Format
                <select
                  className={`${field} mt-1`}
                  value={row.bookFormat}
                  aria-label={`Edition ${index + 1} format`}
                  onChange={(event) => patchEdition(row.id, { bookFormat: event.target.value })}
                >
                  <option value="">Leave out</option>
                  {BOOK_FORMATS.map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium">
                ISBN
                <input
                  className={`${field} mt-1`}
                  value={row.isbn}
                  aria-label={`Edition ${index + 1} ISBN`}
                  placeholder="978-0-306-40615-7"
                  onChange={(event) => patchEdition(row.id, { isbn: event.target.value })}
                />
                {isbnHint(row.isbn) ? (
                  <span className="mt-1 block text-xs font-normal text-ink-soft">{isbnHint(row.isbn)}</span>
                ) : null}
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-sm font-medium">
                  Language
                  <input
                    className={`${field} mt-1`}
                    value={row.inLanguage}
                    aria-label={`Edition ${index + 1} language`}
                    placeholder="en"
                    onChange={(event) => patchEdition(row.id, { inLanguage: event.target.value })}
                  />
                  {languageHint(row.inLanguage) ? (
                    <span className="mt-1 block text-xs font-normal text-ink-soft">{languageHint(row.inLanguage)}</span>
                  ) : null}
                </label>
                <label className="block text-sm font-medium">
                  Pages
                  <input
                    className={`${field} mt-1`}
                    value={row.numberOfPages}
                    aria-label={`Edition ${index + 1} pages`}
                    placeholder="224"
                    inputMode="numeric"
                    onChange={(event) => patchEdition(row.id, { numberOfPages: event.target.value })}
                  />
                  {pagesHint(row.numberOfPages) ? (
                    <span className="mt-1 block text-xs font-normal text-ink-soft">{pagesHint(row.numberOfPages)}</span>
                  ) : null}
                </label>
              </div>
              <label className="block text-sm font-medium">
                Date published
                <input
                  className={`${field} mt-1`}
                  value={row.datePublished}
                  aria-label={`Edition ${index + 1} date`}
                  placeholder="1991"
                  onChange={(event) => patchEdition(row.id, { datePublished: event.target.value })}
                />
                {dateHint(row.datePublished) ? (
                  <span className="mt-1 block text-xs font-normal text-ink-soft">{dateHint(row.datePublished)}</span>
                ) : null}
              </label>
              <label className="block text-sm font-medium">
                Edition URL
                <input
                  className={`${field} mt-1`}
                  value={row.url}
                  aria-label={`Edition ${index + 1} URL`}
                  placeholder="https://example.com/books/guide/paperback"
                  inputMode="url"
                  onChange={(event) => patchEdition(row.id, { url: event.target.value })}
                />
                {row.url.trim() && !httpUrl(row.url) ? (
                  <span className="mt-1 block text-xs font-normal text-ink-soft">
                    Enter the edition page URL, or leave it blank.
                  </span>
                ) : null}
              </label>
              <button
                type="button"
                className="justify-self-start text-sm text-ink-soft underline-offset-4 hover:underline"
                onClick={() =>
                  setEditions(editions.length === 1 ? [emptyEdition(row.id)] : editions.filter((item) => item.id !== row.id))
                }
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="justify-self-start rounded-lg border border-rule bg-white px-4 py-2 text-sm"
            onClick={() => setEditions([...editions, emptyEdition(nextId())])}
          >
            Add an edition
          </button>
        </fieldset>
      </div>
      <CopyBlock label="Book JSON-LD" value={output} empty="Add a title to generate the script tag." />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}
