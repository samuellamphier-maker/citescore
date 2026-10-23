import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { MovieSchemaGenerator } from "@/components/MovieSchemaGenerator";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { pageMeta } from "@/lib/content/meta";
import { getTopic } from "@/lib/content/topics";

const topic = getTopic("/movie-schema-generator");

const movieType = "https://schema.org/Movie";
const actorProp = "https://schema.org/actor";
const directorProp = "https://schema.org/director";
const durationProp = "https://schema.org/duration";
const datePublished = "https://schema.org/datePublished";
const dateCreated = "https://schema.org/dateCreated";
const genreProp = "https://schema.org/genre";
const aggregateRating = "https://schema.org/aggregateRating";
const movieDocs = "https://developers.google.com/search/docs/appearance/structured-data/movie";
const reviewDocs = "https://developers.google.com/search/docs/appearance/structured-data/review-snippet";
const gallery = "https://developers.google.com/search/docs/appearance/structured-data/search-gallery";
const policies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";
const aiGuide = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";

const faqs = [
  {
    q: "Does Movie schema guarantee a Google movie carousel, a review snippet, or an AI citation?",
    a: "No. schema.org Movie is a movie. Google’s movie documentation, read on 22 October 2026, describes a movie carousel built as an ItemList, available on mobile devices, and says the carousel guidelines, Search Essentials, and general structured data guidelines apply. Google’s structured data policies say using structured data does not guarantee that a feature will be present. The gallery lists Movie and lists Review snippet, which can be about a Movie. This form writes one Movie script for one page. It does not write the ItemList, and it does not write a Review. Google’s optimization guide, read the same day, says structured data is not required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features. The script does not make ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, Meta AI, DeepSeek, Mistral, Brave Search, You.com, DuckDuckGo, or Google AI Overviews cite the page.",
  },
  {
    q: "Which fields does this form require?",
    a: "schema.org does not list a required property for Movie. This generator writes a script once the name is present. description, director, actor, datePublished, genre, image, duration, url, and aggregateRating are included only when they are valid. A director or actor URL without a name is left out. One named actor is one object. Two become an array. aggregateRating is written only when the rating value and the rating count are both valid, and the value is not higher than the best rating. A missing best rating uses 5 as the ceiling. Google’s movie page requires image and name for the carousel. This form still writes a script from the name alone, because the page may not be a carousel.",
  },
  {
    q: "Why does the script say datePublished and actor, when Google’s example uses dateCreated?",
    a: "schema.org datePublished is the date of first publication or broadcast. Google’s movie page recommends dateCreated and describes it as the date the movie was released. This form writes datePublished. Add dateCreated by hand only when the page shows that release date, and do not write two different dates. schema.org actor supersedes actors, and director supersedes directors. actor is a Person or a PerformingGroup. director is a Person. This form writes those current names. It does not write the plural properties.",
  },
  {
    q: "Where should the script go, and can one page list every film?",
    a: "On the page for that film, in the HTML the server sends, where a person can already see the title and the other facts you mark up. Google’s structured data policies say not to mark up content that is not visible to readers of the page. The script is built in the browser. Nothing is sent to CiteScore. One script is one film. A second film is a second page. Google’s carousel is an ItemList of movies. This form does not write that list. A watch page for a trailer uses VideoObject.",
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
  { href: "/vehicle-schema-generator", label: "Vehicle schema generator" },
  { href: "/hotel-schema-generator", label: "Hotel schema generator" },
  { href: "/restaurant-schema-generator", label: "Restaurant schema generator" },
  { href: "/medical-clinic-schema-generator", label: "Medical clinic schema generator" },
  { href: "/attorney-schema-generator", label: "Attorney schema generator" },
  { href: "/dentist-schema-generator", label: "Dentist schema generator" },
  { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
  { href: "/ai-search-visibility-for-law-firms", label: "AI search visibility for law firms" },
  { href: "/ai-search-visibility-for-healthcare", label: "AI search visibility for healthcare" },
  { href: "/ai-search-visibility-for-real-estate", label: "AI search visibility for real estate" },
  { href: "/ai-search-visibility-for-restaurants", label: "AI search visibility for restaurants" },
  { href: "/ai-search-visibility-for-accountants", label: "AI search visibility for accountants" },
  { href: "/ai-search-visibility-for-dentists", label: "AI search visibility for dentists" },
  { href: "/ai-search-visibility-for-plumbers", label: "AI search visibility for plumbers" },
  { href: "/ai-search-visibility-for-hvac", label: "AI search visibility for HVAC" },
  { href: "/ai-search-visibility-for-roofers", label: "AI search visibility for roofers" },
  { href: "/ai-search-visibility-for-electricians", label: "AI search visibility for electricians" },
  { href: "/ai-search-visibility-for-landscapers", label: "AI search visibility for landscapers" },
  { href: "/ai-search-visibility-for-auto-repair", label: "AI search visibility for auto repair" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function MovieSchemaGeneratorPage() {
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
        ctaId="movie-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <MovieSchemaGenerator />
        <h2>Why the film is labeled</h2>
        <p>
          A film page can put the title in the H1, a one-sentence description under it, a director credit in the
          footer, and a running time next to the poster. An answer engine that quotes the page still has to decide
          which string is the title, which name is the director, and which number is the length.{" "}
          <a href={movieType}>schema.org Movie</a> is that decision written down. A parser, including the ones behind
          ChatGPT, Perplexity, Claude, Gemini, and Google AI Overviews, can read those labels without guessing which
          credit was the director. The script does not create a citation, and it does not rank the page.
        </p>
        <p>
          Google’s <a href={aiGuide}>optimization guide</a>, read on 22 October 2026, says structured data is not
          required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features.
          The useful part is the same as for any other labeled fact: the title, the director, the date, and the length
          are in the HTML, in words a person can read. The longer note on which facts to repeat is the{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link>.
        </p>
        <p>
          Google’s <a href={gallery}>structured data gallery</a>, read on 22 October 2026, lists Movie. The feature is
          the movie carousel, which Google’s <a href={movieDocs}>movie documentation</a>, read the same day, says is
          available on mobile devices. That page builds the carousel as an ItemList. A summary page points at detail
          pages, or one page holds every film. Required Movie properties on that page are <code>image</code> and{" "}
          <code>name</code>. Recommended properties are <code>aggregateRating</code>, <code>dateCreated</code>,{" "}
          <code>director</code>, and <code>review</code>. This form writes one Movie for one film page. It does not
          write the ItemList. A watch page for a trailer uses the{" "}
          <Link href="/video-schema-generator">Video schema generator</Link>. A show page uses the{" "}
          <Link href="/podcast-schema-generator">Podcast schema generator</Link>. A dataset page uses the{" "}
          <Link href="/dataset-schema-generator">Dataset schema generator</Link>. A vehicle page uses the{" "}
          <Link href="/vehicle-schema-generator">Vehicle schema generator</Link>. A hotel page uses the <Link href="/hotel-schema-generator">Hotel schema generator</Link>. A restaurant page uses the <Link href="/restaurant-schema-generator">Restaurant schema generator</Link>. A clinic page uses the <Link href="/medical-clinic-schema-generator">Medical clinic schema generator</Link>. A law office page uses the <Link href="/attorney-schema-generator">Attorney schema generator</Link>. A dental office page uses the <Link href="/dentist-schema-generator">Dentist schema generator</Link>. An accounting firm’s office is a
          different page, on{" "}
          <Link href="/ai-search-visibility-for-accountants">AI search visibility for accountants</Link>. A dental
          practice’s office is on{" "}
          <Link href="/ai-search-visibility-for-dentists">AI search visibility for dentists</Link>. A plumbing business’s office, service area, and hours are on <Link href="/ai-search-visibility-for-plumbers">AI search visibility for plumbers</Link>. An HVAC company’s office, service area, and hours are on <Link href="/ai-search-visibility-for-hvac">AI search visibility for HVAC</Link>. A roofing contractor’s office, service area, and hours are on <Link href="/ai-search-visibility-for-roofers">AI search visibility for roofers</Link>. An electrical contractor’s shop, service area, and hours are on <Link href="/ai-search-visibility-for-electricians">AI search visibility for electricians</Link>. A landscaping business’s office, service area, and hours are on <Link href="/ai-search-visibility-for-landscapers">AI search visibility for landscapers</Link>. An auto repair business’s shop, service area, and hours are on <Link href="/ai-search-visibility-for-auto-repair">AI search visibility for auto repair</Link>.
        </p>
        <h2>What each field is</h2>
        <p>
          The script needs the name a person can see. <code>description</code> is the sentence on that page.{" "}
          <code>url</code> is the film page. <code>image</code> is the poster or still. Google’s movie page says a
          carousel image has to be crawlable, in .jpg, .png, or .gif, and at a 6:9 aspect ratio. Images that depart
          from that ratio are not eligible for the carousel. This form cannot measure the file. It writes the URL you
          enter. A poster that also shows a credit or a license can use the{" "}
          <Link href="/image-object-schema-generator">ImageObject schema generator</Link> as a second script. Do not
          describe a different picture in the two scripts.
        </p>
        <p>
          <a href={directorProp}>schema.org director</a> is a Person. It supersedes <code>directors</code>. This form
          writes one director, and only when you enter a name. A URL without a name is omitted, so the script does not
          invent a credit. This page does not print a sample personal name. Type the name that is already on the film
          page. A second director has to be added by hand as an array, and only when the page names that second
          director. <a href={actorProp}>schema.org actor</a> is a Person or a PerformingGroup. It supersedes{" "}
          <code>actors</code>. One named row is one object. Two rows are an array. A blank row is left out. A cast
          company is a PerformingGroup. A character name is a PerformanceRole on schema.org’s actor examples. This form
          does not write that role. Add it by hand only when the page shows the character, and do not invent one.
        </p>
        <p>
          <a href={datePublished}>schema.org datePublished</a> is the date of first publication or broadcast. A full
          day is <code>YYYY-MM-DD</code>. A date and time is accepted. A four-digit year is accepted. Anything else is
          left out. <a href={dateCreated}>schema.org dateCreated</a> is the date the work was created. Google’s movie
          page recommends <code>dateCreated</code> and describes it as the release date. This form writes{" "}
          <code>datePublished</code>. Add <code>dateCreated</code> by hand only when you want that property, and use
          the same date the page shows. Do not write two different dates. <a href={genreProp}>schema.org genre</a> is
          text or a URL. One genre is a string. Two become an array. A repeated genre is written once.
        </p>
        <p>
          <a href={durationProp}>schema.org duration</a> is the length in ISO 8601. Two hours and five minutes is{" "}
          <code>PT2H5M</code>. A zero length is left out. Google’s movie property table does not list duration. The
          property is still the length schema.org defines, so this form writes it when the page shows a running time.
          Do not also paste a different length under another name.
        </p>
        <p>
          <a href={aggregateRating}>schema.org aggregateRating</a> is the overall rating from a collection of ratings.
          Google’s <a href={reviewDocs}>review snippet documentation</a>, read on 22 October 2026, lists Movie as a type
          that can show a review snippet. For an AggregateRating nested on the film, that page requires{" "}
          <code>ratingValue</code> and at least one of <code>ratingCount</code> or <code>reviewCount</code>. A missing{" "}
          <code>bestRating</code> is treated as 5. This form writes <code>ratingCount</code>. It does not write{" "}
          <code>reviewCount</code>. Add that second count by hand only when the page shows it, and do not write two
          different counts. The same Google page says not to aggregate reviews or ratings from other websites, and the
          rating has to be visible on the page. A score copied from another site, when this page does not show it, is
          left out. This form does not write a <code>Review</code>. A page that shows a review of a product or an app
          uses the <Link href="/review-schema-generator">Review schema generator</Link>.
        </p>
        <p>
          Google’s <a href={policies}>structured data policies</a>, read on 22 October 2026, say not to mark up content
          that is not visible to readers of the page, and that the structured data must be a true representation of the
          page content. The copy block is one <code>script</code> tag. Paste it into the HTML the server sends. Answer
          engines often skip text that only appears after JavaScript runs. The <Link href="/free-check">free check</Link>{" "}
          lists the JSON-LD <code>@type</code> values on the homepage. A film URL at another path is outside that
          fetch. The <Link href="/geo-audit">$39 audit</Link> looks for markup that matches the copy.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for that film page, in the head or the body.</li>
          <li>Confirm the same title, description, director, actors, date, genres, image, length, page URL, and rating are visible on that page.</li>
          <li>Leave the rating blank when the page does not show both the value and the count. Leave the director blank when the page does not name one.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>A director, an actor, a date, a genre, a length, or a rating the page does not show.</li>
          <li>A director or actor URL without the name. Clear the URL or add the name.</li>
          <li>The plural properties actors and directors. This form writes actor and director.</li>
          <li>dateCreated with a different date than datePublished.</li>
          <li>An ItemList of every film. This form does not write that list.</li>
          <li>A Review, or a rating copied from another site.</li>
          <li>A trailer file in this script. A watch page uses VideoObject.</li>
          <li>The same Movie block on every URL of the site.</li>
        </ul>
        <h2>Questions about movie schema</h2>
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
