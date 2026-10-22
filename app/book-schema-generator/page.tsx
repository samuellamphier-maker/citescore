import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { BookSchemaGenerator } from "@/components/BookSchemaGenerator";
import { JsonLd } from "@/components/JsonLd";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { pageMeta } from "@/lib/content/meta";
import { getTopic } from "@/lib/content/topics";

const topic = getTopic("/book-schema-generator");

const bookType = "https://schema.org/Book";
const bookFormatType = "https://schema.org/BookFormatType";
const workExample = "https://schema.org/workExample";
const isbnProp = "https://schema.org/isbn";
const graphicNovel = "https://schema.org/GraphicNovel";
const bookDocs = "https://developers.google.com/search/docs/appearance/structured-data/book";
const policies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";
const aiGuide = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";

const faqs = [
  {
    q: "Does Book schema guarantee a Google knowledge panel, a book action, or an AI citation?",
    a: "No. schema.org Book is a book. Google’s book-actions documentation, read on 21 October 2026, describes a DataFeed for book providers with a wide selection, and it says indicating interest does not guarantee participation. The same page says the appearance in search results might be different. This form writes one Book script for a page. It does not write that feed, and it does not write ReadAction or BorrowAction. Google’s optimization guide says structured data is not required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features. The script does not make ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, Meta AI, DeepSeek, Mistral, Brave Search, You.com, DuckDuckGo, or Google AI Overviews cite the page.",
  },
  {
    q: "Which fields does this form require?",
    a: "schema.org does not list a required property for Book. This generator writes a script once the title is present. author, isbn, bookFormat, numberOfPages, datePublished, bookEdition, publisher, inLanguage, description, image, and url are included only when they are valid. An author or publisher URL without a name is left out. isbn is written as ISBN-13. A valid ISBN-10 is converted, because Google’s book-actions page says Google Search does not accept ISBN-10. A failed check digit is left out. workExample is written only for an edition row that has at least one valid fact.",
  },
  {
    q: "When should the ISBN sit on the Book, and when on workExample?",
    a: "Put the ISBN, the format, and the page count on the Book when the page is one edition and those facts are the facts of that page. Use workExample when the page is the work and it lists more than one edition, such as a hardcover and an ebook. schema.org describes workExample as an example of the work, for instance the paperback edition or the ebook. Google’s book-actions page uses the same split for a provider feed: the work has the title and the author, and each edition is a Book under workExample. Do not repeat one edition in both places. This form does not write the provider feed.",
  },
  {
    q: "Where should the script go?",
    a: "On the page for that book, in the HTML the server sends, where a person can already see the title and the other facts you mark up. Google’s structured data policies say not to mark up content that is not visible to readers of the page. The script is built in the browser. Nothing is sent to CiteScore. One script is one work. A second book is a second page.",
  },
];

const related = [
  { href: "/llms-txt-generator", label: "llms.txt generator" },
  { href: "/robots-txt-ai-crawler-generator", label: "robots.txt AI crawler generator" },
  { href: "/faq-schema-generator", label: "FAQ schema generator" },
  { href: "/organization-schema-generator", label: "Organization schema generator" },
  { href: "/product-schema-generator", label: "Product schema generator" },
  { href: "/article-schema-generator", label: "Article schema generator" },
  { href: "/local-business-schema-generator", label: "Local business schema generator" },
  { href: "/breadcrumb-schema-generator", label: "Breadcrumb schema generator" },
  { href: "/howto-schema-generator", label: "HowTo schema generator" },
  { href: "/software-application-schema-generator", label: "Software application schema generator" },
  { href: "/person-schema-generator", label: "Person schema generator" },
  { href: "/website-schema-generator", label: "WebSite schema generator" },
  { href: "/video-schema-generator", label: "Video schema generator" },
  { href: "/event-schema-generator", label: "Event schema generator" },
  { href: "/review-schema-generator", label: "Review schema generator" },
  { href: "/service-schema-generator", label: "Service schema generator" },
  { href: "/course-schema-generator", label: "Course schema generator" },
  { href: "/job-posting-schema-generator", label: "Job posting schema generator" },
  { href: "/recipe-schema-generator", label: "Recipe schema generator" },
  { href: "/qa-page-schema-generator", label: "QAPage schema generator" },
  { href: "/speakable-schema-generator", label: "Speakable schema generator" },
  { href: "/image-object-schema-generator", label: "ImageObject schema generator" },
  { href: "/book-schema-generator", label: "Book schema generator" },
  { href: "/podcast-schema-generator", label: "Podcast schema generator" },
  { href: "/movie-schema-generator", label: "Movie schema generator" },
  { href: "/dataset-schema-generator", label: "Dataset schema generator" },
  { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
  { href: "/ai-search-visibility-for-law-firms", label: "AI search visibility for law firms" },
  { href: "/ai-search-visibility-for-healthcare", label: "AI search visibility for healthcare" },
  { href: "/ai-search-visibility-for-real-estate", label: "AI search visibility for real estate" },
  { href: "/ai-search-visibility-for-restaurants", label: "AI search visibility for restaurants" },
  { href: "/ai-search-visibility-for-accountants", label: "AI search visibility for accountants" },
  { href: "/ai-search-visibility-for-dentists", label: "AI search visibility for dentists" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function BookSchemaGeneratorPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }}
      />
      <ArticleShell
        kicker={topic.kicker}
        title={topic.title}
        dek={topic.description}
        publishedAt={topic.publishedAt}
        minutes={topic.minutes}
        author="CiteScore Team"
        ctaId="book-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <BookSchemaGenerator />
        <h2>Why the book is labeled</h2>
        <p>
          A book page can show a title, a byline, an ISBN on the copyright line, a page count, and a publisher. An
          answer engine that quotes the page still has to decide which string is the title, which string is the author,
          and which number is the ISBN. <a href={bookType}>schema.org Book</a> is that decision written down. It
          defines <code>name</code>, <code>author</code>, <code>isbn</code>, <code>bookFormat</code>,{" "}
          <code>numberOfPages</code>, <code>datePublished</code>, <code>publisher</code>, <code>inLanguage</code>,{" "}
          <code>description</code>, <code>image</code>, <code>url</code>, and <code>workExample</code>. A parser,
          including the ones behind ChatGPT, Perplexity, Claude, Gemini, and Google AI Overviews, can read those labels
          without guessing which line was the ISBN. The script does not create a citation, and it does not rank the
          page.
        </p>
        <p>
          Google’s <a href={bookDocs}>book-actions documentation</a>, read on 21 October 2026, is a different object. It
          tells a book provider how to upload a <code>DataFeed</code> so Search can offer a buy or borrow link. The
          feature is limited to providers with a wide selection of books. The page says that indicating interest does
          not guarantee participation, and that the appearance in search results might be different. The work in that
          feed needs <code>@id</code>, <code>author</code>, <code>name</code>, <code>url</code>, and at least one{" "}
          <code>workExample</code>. Each edition needs <code>@id</code>, <code>bookFormat</code>, <code>inLanguage</code>
          , <code>isbn</code>, and <code>potentialAction</code>. This form does not write the feed, the action, or a
          price. A provider that has been onboarded still has to build that feed. A publisher page, an author page, or
          a single book URL can still use Book for the facts the page shows.
        </p>
        <p>
          Google’s <a href={aiGuide}>optimization guide</a>, read on 21 October 2026, says structured data is not
          required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features.
          The useful part is the same as for any other labeled fact: the title, the author, and the ISBN are in the
          HTML, in words a person can read. The longer note on which facts to repeat is the{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link>.
        </p>
        <h2>What each field is</h2>
        <p>
          <a href={isbnProp}>schema.org isbn</a> is the ISBN of the book, as text. This form checks the digit and writes
          13 digits with no hyphens. Google’s book-actions page says Google Search prefers ISBN-13 and does not accept
          ISBN-10, and that an ISBN-10 should be converted before it is sent. A valid ISBN-10 is rewritten here with
          the 978 prefix and a new check digit. A failed check digit is left out, so the script does not invent an
          identifier. The same ISBN should not be copied onto an edition row unless the page shows that edition
          separately.
        </p>
        <p>
          <a href={bookFormatType}>schema.org BookFormatType</a>, read on 21 October 2026, is the publication format.
          This form writes <code>https://schema.org/AudiobookFormat</code>, <code>https://schema.org/EBook</code>,{" "}
          <code>https://schema.org/Hardcover</code>, or <code>https://schema.org/Paperback</code>. Those four are the
          values Google’s edition table requires. <a href={graphicNovel}>schema.org GraphicNovel</a> says that value is
          deprecated, because a graphic novel can be a hardcover or an ebook and is not mutually exclusive with the
          other formats. This form does not write it. <code>numberOfPages</code> is an integer. A word such as “pages”
          is left out. <code>datePublished</code> is <code>YYYY-MM-DD</code> or a four-digit year. Google’s edition
          table allows either. A month name is left out.
        </p>
        <p>
          <code>author</code> and <code>publisher</code> are a Person or an Organization. schema.org allows either.
          Google’s book-actions page says the same, and it says to use an organization when the author is an
          organization. This form writes the party only when you enter a name. A URL without a name is omitted, so the
          script does not invent a byline. This page does not print a sample personal name. Type the name that is
          already on the title page or the copyright page. One author is one party. A second author has to be added by
          hand as an array, and only when the page names that second author. <code>inLanguage</code> is a BCP 47 tag.
          schema.org asks for that standard. <code>en-us</code> is written as <code>en-US</code>. Google’s edition
          property asks for a two-letter ISO 639-1 code. A region subtag is still valid schema.org. This form keeps it
          when you enter it. <code>description</code> and <code>image</code> are the text and the cover URL the page
          shows. <code>url</code> is the page URL. When it is valid, it is also the <code>@id</code>.
        </p>
        <p>
          <a href={workExample}>schema.org workExample</a> is an example of the work, such as the paperback edition, the
          first edition, or the ebook. One edition row becomes one Book. Two rows become an array. A row with no valid
          fact is left out. <code>bookEdition</code> is the label, such as “2nd edition”, when the page shows that
          label. The edition URL, when you enter one, is that edition’s <code>url</code> and <code>@id</code>. This
          form does not copy the work’s author onto the edition. Google’s page says to add an edition author only when
          it differs. Add that by hand, and only when the page shows it.
        </p>
        <p>
          Google’s <a href={policies}>structured data policies</a>, read on 21 October 2026, say not to mark up content
          that is not visible to readers of the page, and that the structured data must be a true representation of the
          page content. The copy block is one <code>script</code> tag. Paste it into the HTML the server sends. Answer
          engines often skip text that only appears after JavaScript runs. A price the page shows is not a field in
          this script. Google’s book-actions price sits on <code>potentialAction</code>, which this form does not
          write. A shop page that needs an Offer uses the{" "}
          <Link href="/product-schema-generator">Product schema generator</Link>. Do not describe the same price in two
          scripts that disagree, and do not mark a book page up as a product when the page is the book. A cover with a
          credit or a license uses the <Link href="/image-object-schema-generator">ImageObject schema generator</Link>.
          The <Link href="/free-check">free check</Link> lists the JSON-LD <code>@type</code> values on the homepage. A
          book URL at another path is outside that fetch. The <Link href="/geo-audit">$39 audit</Link> looks for markup
          that matches the copy.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for that book page, in the head or the body.</li>
          <li>Confirm the same title, author, ISBN, format, page count, date, publisher, language, description, and cover are visible on that page.</li>
          <li>Use workExample only for editions the page actually lists. Leave it blank when the page is one edition.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>An author, an ISBN, a page count, or a date the page does not show.</li>
          <li>An author or publisher URL without the name. Clear the URL or add the name.</li>
          <li>An ISBN whose check digit fails. Do not invent a replacement.</li>
          <li>GraphicNovel. schema.org marks that value deprecated.</li>
          <li>ReadAction, BorrowAction, or a DataFeed. Those belong to Google’s provider feed, not this page script.</li>
          <li>The same edition both on the Book and again under workExample.</li>
          <li>The same Book block on every URL of the site.</li>
        </ul>
        <h2>Questions about Book schema</h2>
        {faqs.map((item) => (
          <div key={item.q}>
            <h3 className="font-serif text-xl text-ink">{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}
        <ToolNextLinks />
      </ArticleShell>
    </>
  );
}
