import assert from "node:assert/strict";
import { test } from "node:test";
import { bcp47Language, bookDate, buildBookSchema, isbn13 } from "./generators.ts";

function parse(script: string) {
  const json = script.replace(/^<script type="application\/ld\+json">\n/, "").replace(/\n<\/script>\n$/, "");
  return JSON.parse(json) as Record<string, unknown>;
}

const emptyEdition = {
  bookEdition: "",
  bookFormat: "",
  isbn: "",
  inLanguage: "",
  numberOfPages: "",
  datePublished: "",
  url: "",
};

test("Book is empty until the title is present", () => {
  assert.equal(
    buildBookSchema({
      name: "  ",
      authorName: "Example Press",
      authorKind: "Organization",
      authorUrl: "https://example.com",
      isbn: "9780306406157",
      bookFormat: "Paperback",
      numberOfPages: "224",
      datePublished: "1991-05-01",
      bookEdition: "2nd edition",
      publisherName: "Example Press",
      publisherKind: "Organization",
      publisherUrl: "",
      inLanguage: "en",
      description: "A field guide.",
      imageUrl: "https://example.com/covers/guide.jpg",
      url: "https://example.com/books/guide",
      editions: [{ ...emptyEdition, isbn: "9780306406157" }],
    }),
    "",
  );
});

test("isbn13 keeps a valid ISBN-13, converts ISBN-10, and drops a bad check digit", () => {
  assert.equal(isbn13("978-0-306-40615-7"), "9780306406157");
  assert.equal(isbn13("ISBN-10 0-306-40615-2"), "9780306406157");
  assert.equal(isbn13("9780306406158"), "");
  assert.equal(isbn13("0-306-40615-3"), "");
  assert.equal(bcp47Language("en-us"), "en-US");
  assert.equal(bcp47Language("zh-hant-tw"), "zh-Hant-TW");
  assert.equal(bcp47Language("english"), "");
  assert.equal(bookDate("1991"), "1991");
  assert.equal(bookDate("1991-05-01"), "1991-05-01");
  assert.equal(bookDate("1991-02-31"), "");
});

test("Book writes the visible fields and one workExample", () => {
  const data = parse(
    buildBookSchema({
      name: "  Example   Field Guide ",
      authorName: "Example Press",
      authorKind: "Organization",
      authorUrl: "https://example.com",
      isbn: "0-306-40615-2",
      bookFormat: "Paperback",
      numberOfPages: "224",
      datePublished: "1991-05-01",
      bookEdition: "2nd edition",
      publisherName: "Example Press",
      publisherKind: "Organization",
      publisherUrl: "not a url",
      inLanguage: "en-us",
      description: "<b>A field guide</b> already on the page.",
      imageUrl: "example.com/covers/guide.jpg",
      url: "https://example.com/books/guide",
      editions: [
        {
          bookEdition: "Paperback",
          bookFormat: "Paperback",
          isbn: "9780306406157",
          inLanguage: "en",
          numberOfPages: "224",
          datePublished: "1991",
          url: "https://example.com/books/guide/paperback",
        },
      ],
    }),
  );

  assert.equal(data["@type"], "Book");
  assert.equal(data.name, "Example Field Guide");
  assert.equal(data.isbn, "9780306406157");
  assert.equal(data.bookFormat, "https://schema.org/Paperback");
  assert.equal(data.numberOfPages, 224);
  assert.equal(data.datePublished, "1991-05-01");
  assert.equal(data.bookEdition, "2nd edition");
  assert.equal(data.inLanguage, "en-US");
  assert.equal(data.description, "A field guide already on the page.");
  assert.equal(data.image, "https://example.com/covers/guide.jpg");
  assert.equal(data.url, "https://example.com/books/guide");
  assert.equal(data["@id"], "https://example.com/books/guide");
  assert.deepEqual(data.author, {
    "@type": "Organization",
    name: "Example Press",
    url: "https://example.com/",
  });
  assert.deepEqual(data.publisher, { "@type": "Organization", name: "Example Press" });
  assert.equal("potentialAction" in data, false);
  const edition = data.workExample as Record<string, unknown>;
  assert.equal(edition["@type"], "Book");
  assert.equal(edition.isbn, "9780306406157");
  assert.equal(edition.bookFormat, "https://schema.org/Paperback");
  assert.equal(edition.numberOfPages, 224);
  assert.equal(edition.datePublished, "1991");
  assert.equal(edition.inLanguage, "en");
  assert.equal(edition.url, "https://example.com/books/guide/paperback");
  assert.equal(Array.isArray(data.workExample), false);
});

test("a URL without a name is left out, and two editions become an array", () => {
  const data = parse(
    buildBookSchema({
      name: "Example Field Guide",
      authorName: "",
      authorKind: "Person",
      authorUrl: "https://example.com/authors/ignored",
      isbn: "9780306406158",
      bookFormat: "GraphicNovel",
      numberOfPages: "0",
      datePublished: "May 1991",
      bookEdition: "",
      publisherName: "",
      publisherKind: "Organization",
      publisherUrl: "https://example.com/publishers",
      inLanguage: "english",
      description: "",
      imageUrl: "not a url",
      url: "",
      editions: [
        emptyEdition,
        {
          ...emptyEdition,
          bookFormat: "Hardcover",
          isbn: "9780306406157",
        },
        {
          ...emptyEdition,
          bookFormat: "EBook",
          inLanguage: "fr",
          url: "https://example.com/books/guide/ebook",
        },
      ],
    }),
  );

  assert.equal("author" in data, false);
  assert.equal("publisher" in data, false);
  assert.equal("isbn" in data, false);
  assert.equal("bookFormat" in data, false);
  assert.equal("numberOfPages" in data, false);
  assert.equal("datePublished" in data, false);
  assert.equal("inLanguage" in data, false);
  assert.equal("image" in data, false);
  assert.equal("url" in data, false);
  assert.equal("potentialAction" in data, false);
  assert.ok(Array.isArray(data.workExample));
  const editions = data.workExample as Record<string, unknown>[];
  assert.equal(editions.length, 2);
  assert.equal(editions[0].bookFormat, "https://schema.org/Hardcover");
  assert.equal(editions[0].isbn, "9780306406157");
  assert.equal(editions[1].bookFormat, "https://schema.org/EBook");
  assert.equal(editions[1].inLanguage, "fr");
  assert.equal(editions[1]["@id"], "https://example.com/books/guide/ebook");
});
