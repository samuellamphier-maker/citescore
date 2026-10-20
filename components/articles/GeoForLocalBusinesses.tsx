import Link from "next/link";
import { CheckLinks, preClass } from "@/components/articles/guide-links";

const localBusiness =
  "https://developers.google.com/search/docs/appearance/structured-data/local-business";
const aiFeatures =
  "https://developers.google.com/search/docs/appearance/ai-features";
const sdPolicies =
  "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";

const example = `{
  "@context": "https://schema.org",
  "@type": "Bakery",
  "name": "Example Bakery",
  "url": "https://example.com/locations/main-street",
  "telephone": "+1-555-010-0100",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "100 Main Street",
    "addressLocality": "Springfield",
    "addressRegion": "IL",
    "postalCode": "62701",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 39.78172,
    "longitude": -89.65015
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "07:00",
    "closes": "15:00"
  }
}`;

export function GeoForLocalBusinessesArticle() {
  return (
    <>
      <p>
        A local business page has the same fetch problem as any other page,
        plus a place. Google Search and Maps can show a knowledge panel or a
        list of businesses. Google’s{" "}
        <a href={localBusiness}>LocalBusiness structured data</a> is how a
        site states the name, the address, and the hours. It does not
        publish a rate for how often an AI answer cites that panel. CiteScore
        does not query Google, Maps, or an answer engine.
      </p>
      <p>
        The engine controls are separate from the address block. Start with{" "}
        <Link href="/how-to-get-cited-by-ai-answer-engines">
          how to get cited by AI answer engines
        </Link>
        , then the{" "}
        <Link href="/google-ai-overviews-optimization">
          AI Overviews
        </Link>{" "}
        page if the surface is Google Search. Markup that is not specific to
        a storefront is on{" "}
        <Link href="/schema-markup-for-ai-search">
          schema markup for AI search
        </Link>
        .
      </p>

      <h2>Name and address are the required fields</h2>
      <p>
        Google says a LocalBusiness rich result needs <code>name</code> and{" "}
        <code>address</code>. Use the most specific subtype that fits —
        Bakery, Dentist, Restaurant — rather than a generic LocalBusiness
        when one exists. Each location is its own entity. A department can
        be nested, and Google’s example of the name format is the store name
        plus the department name.
      </p>
      <p>
        Recommended fields, when they are true on the page, are{" "}
        <code>geo</code> to at least five decimal places,{" "}
        <code>openingHoursSpecification</code>, <code>telephone</code> with
        country code and area code, <code>url</code> of that location, and{" "}
        <code>priceRange</code> under 100 characters. Food businesses can add{" "}
        <code>servesCuisine</code> and a <code>menu</code> URL. The
        Restaurant carousel is limited to a small set of providers. A single
        bakery page does not opt into it by adding carousel markup.
      </p>
      <pre className={preClass}>{example}</pre>
      <p>
        That block is an example, not a business.{" "}
        <a href={sdPolicies}>Google’s structured data policies</a> say the
        markup has to describe content people can see on the page. If the
        HTML says one street and the JSON-LD says another, the markup is
        describing a different place.
      </p>
      <p>
        The{" "}
        <Link href="/local-business-schema-generator">
          Local business schema generator
        </Link>{" "}
        copies a script from the name, type, address, phone, hours, and
        optional geo, profiles, logo, and image. It stays in the browser.
        Paste it into the HTML the server sends for that location. A trail
        on the same page can use the{" "}
        <Link href="/breadcrumb-schema-generator">
          breadcrumb schema generator
        </Link>
        . A service that business offers, on its own page, can use the{" "}
        <Link href="/service-schema-generator">Service schema generator</Link>.
      </p>

      <h2>Reviews of your own business</h2>
      <p>
        Google’s LocalBusiness document says <code>review</code> and{" "}
        <code>aggregateRating</code> are recommended only for sites that
        capture reviews about other businesses. A shop marking up its own
        stars is outside that recommendation. Leave both properties off the
        page you control, unless the page is a directory of other
        businesses and the reviews follow the review-snippet guidelines. A
        product or an app that already shows reviews uses the{" "}
        <Link href="/review-schema-generator">Review schema generator</Link>,
        which does not write LocalBusiness or Organization.
      </p>

      <h2>The profile is a second record</h2>
      <p>
        Structured data on the site is not Google Business Profile. The{" "}
        <a href={aiFeatures}>AI features guide</a> lists keeping Business
        Profile — and Merchant Center, if you sell online — up to date among
        the same fundamentals as the rest of Search. The name, address, and
        phone on the site, in the JSON-LD, and on the profile should be the
        same words. Google does not publish that match as an AI citation
        score. It does say AI Overviews and AI Mode only link pages that are
        indexed and eligible for a snippet.
      </p>
      <p>
        Crawler access still applies. A disallow on Googlebot keeps the
        location page out of Search. <code>Google-Extended</code> is a
        different decision, covered on{" "}
        <Link href="/how-to-get-cited-by-gemini">
          how to get cited by Gemini
        </Link>{" "}
        and <Link href="/ai-crawlers">AI crawlers</Link>. The label for the
        work is on{" "}
        <Link href="/answer-engine-optimization">
          answer engine optimization
        </Link>
        .
      </p>

      <CheckLinks>
        The free check reads JSON-LD on the homepage. A location page at
        another path is not that check. Confirm the location URL itself is
        the one you care about.
      </CheckLinks>

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={localBusiness}>Local business structured data</a>.
          Required name and address, recommended hours and geo, and the
          review limit.
        </li>
        <li>
          <a href={sdPolicies}>Structured data general guidelines</a>.
          Markup matches the visible page.
        </li>
        <li>
          <a href={aiFeatures}>AI features and your website</a>. Business
          Profile, indexing, and snippets.
        </li>
      </ul>
    </>
  );
}
