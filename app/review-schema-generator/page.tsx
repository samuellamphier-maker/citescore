import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { ReviewSchemaGenerator } from "@/components/ReviewSchemaGenerator";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/review-schema-generator");

const reviewDocs = "https://developers.google.com/search/docs/appearance/structured-data/review-snippet";

const faqs = [
  {
    q: "Does Review schema guarantee stars in Google or a citation in an AI answer?",
    a: "No. Google’s review snippet documentation says that when it finds valid review or rating markup, it may show a rich snippet with stars and other summary information, in rich results or in a Knowledge Panel. Google does not guarantee that appearance. The script does not make ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, Meta AI, DeepSeek, Mistral, or Google AI Overviews cite the page. A rating that exists only in the script describes a review the page does not show.",
  },
  {
    q: "When is review markup appropriate, and when is a review of your own business ineligible?",
    a: "Google’s review snippet page, read on 20 October 2026, lists Product and Software App among the types that can carry a review snippet. It also lists Local business and Organization, with a limit: only sites that capture reviews about other local businesses, or about other organizations. If the entity being reviewed controls the reviews about itself, pages that use LocalBusiness or any other Organization type are ineligible for the star review feature. That includes a review of entity A placed on entity A’s own site, in the structured data or through an embedded third-party widget. This generator writes Product or SoftwareApplication only. It does not write LocalBusiness or Organization.",
  },
  {
    q: "Which fields does Google require, and which does this form require?",
    a: "For a review nested in the item, Google requires the parent name, an author whose name is a Person or Organization and is shorter than 100 characters, and reviewRating.ratingValue. itemReviewed is omitted on a nested review. For a nested aggregate rating, Google requires the parent name, ratingValue, and at least one of ratingCount or reviewCount. A missing best rating means 5. A missing worst rating means 1. This generator also requires the review text before it writes a Review, because Google’s technical guidelines say the review text has to be obvious on the page. schema.org’s property for that text is reviewBody. Google’s property table does not list reviewBody as required. Two or more reviews are written only together with an aggregate rating, which is the multiple-review rule on that page.",
  },
  {
    q: "Where should the script go?",
    a: "On the page for that one product or app, in the HTML the server sends, where a person can already see the name, the rating, and any review text. Do not mark up a category or a list of items. Do not copy ratings from another website. The script is built in the browser. Nothing is sent to CiteScore.",
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
  { href: "/how-to-get-cited-by-mistral", label: "How to get cited by Mistral" },
  { href: "/how-to-get-cited-by-brave-search", label: "How to get cited by Brave Search" },
  { href: "/how-to-get-cited-by-you-com", label: "How to get cited by You.com" },
  { href: "/how-to-get-cited-by-duckduckgo-ai", label: "How to get cited by DuckDuckGo" },
  { href: "/how-to-get-cited-by-perplexity-comet", label: "How to get cited by Perplexity Comet" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function ReviewSchemaGeneratorPage() {
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
        ctaId="review-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <ReviewSchemaGenerator />
        <h2>When a review snippet is allowed</h2>
        <p>
          Google’s{" "}
          <a href={reviewDocs}>review snippet documentation</a>, read on 20 October 2026, says a review snippet is a
          short excerpt of a review or a rating, usually an average from many reviewers. When Google finds valid markup,
          it may show stars and other summary information in rich results or in a Knowledge Panel. The same page lists
          Book, Course, Event, Local business, Movie, Product, Recipe, and Software App, plus a second list that
          includes Organization. Local business is limited to sites that capture reviews about other local businesses.
          Organization is limited to sites that capture reviews about other organizations.
        </p>
        <p>
          The self-serving rule on that page is specific. If the entity being reviewed controls the reviews about
          itself, pages that use <code>LocalBusiness</code> or any other <code>Organization</code> type are ineligible
          for the star review feature. The example is a review of entity A placed on the website of entity A, either in
          the structured data or through an embedded third-party widget such as a Google Business reviews widget or a
          Facebook reviews widget. Ratings for a local business have to be sourced directly from users. Google says not
          to rely on human editors to create, curate, or compile those ratings. This generator does not emit{" "}
          <code>LocalBusiness</code> or <code>Organization</code> as the reviewed item. A business writing about itself
          uses the <Link href="/organization-schema-generator">Organization schema generator</Link> or the{" "}
          <Link href="/local-business-schema-generator">Local business schema generator</Link>, which leave{" "}
          <code>review</code> and <code>aggregateRating</code> out.
        </p>
        <p>
          A product page or an app page is a different case. Nest the review in <code>Product</code> or{" "}
          <code>SoftwareApplication</code> when that page already shows the rating and the review text. Google says to
          refer to one specific item, not a category or a list. The review content has to be readily available on the
          marked-up page: a person can see the review text and the rating, and a person can see an aggregate rating if
          you mark one up. Google recommends accepting ratings that come with a review comment and an author name. It
          says not to aggregate reviews from other websites, and not to mark up fake reviews or undisclosed incentivized
          reviews. A price and an offer stay on the{" "}
          <Link href="/product-schema-generator">Product schema generator</Link> or the{" "}
          <Link href="/software-application-schema-generator">Software application schema generator</Link>. Those tools
          can write an aggregate rating. They do not write the review text.
        </p>
        <h2>Why the rating is labeled</h2>
        <p>
          An answer engine that quotes a product page still has to decide which number is the average, how many people
          it came from, and which paragraph is one person’s review. <code>AggregateRating</code> and <code>Review</code>{" "}
          are that decision written down. schema.org defines <code>ratingValue</code>, <code>reviewCount</code>,{" "}
          <code>ratingCount</code>, <code>bestRating</code>, <code>worstRating</code>, <code>reviewBody</code>,{" "}
          <code>author</code>, and <code>datePublished</code>. A parser, including the ones behind ChatGPT, Perplexity,
          Claude, and Google AI Overviews, can read those labels without guessing which number is the price. The script
          does not create a citation, and it does not rank the page. The same point, for the other answer engines, is
          on <Link href="/how-to-get-cited-by-mistral">how to get cited by Mistral</Link> and the{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link>.
        </p>
        <p>
          Google’s nested review omits <code>itemReviewed</code>. The parent item’s <code>name</code> is the thing being
          reviewed. <code>author</code> is a <code>Person</code> or an <code>Organization</code>. The name has to be a
          real name, shorter than 100 characters. A promotional string is not an author. <code>reviewRating</code> is a{" "}
          <code>Rating</code> with <code>ratingValue</code>. A number uses a dot, not a comma. The default scale is 1 to
          5. Set <code>bestRating</code> and <code>worstRating</code> when the page uses another scale. For an aggregate
          rating, at least one of <code>ratingCount</code> or <code>reviewCount</code> is required. Google says that if
          you include multiple individual reviews, also include an aggregate rating of those reviews. This form withholds
          the script until that aggregate rating is valid.
        </p>
        <p>
          The copy block is one <code>script</code> tag. Paste it into the HTML the server sends for that product or
          app. Answer engines often skip text that only appears after JavaScript runs. One review is a single{" "}
          <code>Review</code> object, which matches Google’s nested example. Two or more are a list. The rating is
          written as the digits you typed, so <code>4.60</code> is not shortened. A best or worst rating is written only
          when you enter it. A URL that is not http(s) is left out. The <Link href="/free-check">free check</Link> lists
          the JSON-LD <code>@type</code> values on the homepage. A product URL at another path is outside that fetch.
          The <Link href="/geo-audit">$39 audit</Link> looks for markup that matches the copy.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for that product or app, in the head or the body.</li>
          <li>Confirm the same name, rating, counts, and review text are visible on that page.</li>
          <li>Confirm the reviews are about that item, and that the page is not reviewing your own business as a LocalBusiness or Organization.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>A rating, a count, or a review the page does not show.</li>
          <li>A review of your own business on a LocalBusiness or Organization page. Google’s star feature excludes that self-serving case.</li>
          <li>Reviews copied from another website, or a rating an editor compiled for a local business.</li>
          <li>A category page or a list of products. Mark up one item.</li>
          <li>An author name the page does not print, or a name of 100 characters or more.</li>
          <li>The same Review block on every URL. One page for the item is enough.</li>
        </ul>
        <h2>Questions about Review schema</h2>
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
