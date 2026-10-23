import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { HotelSchemaGenerator } from "@/components/HotelSchemaGenerator";
import { JsonLd } from "@/components/JsonLd";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { pageMeta } from "@/lib/content/meta";
import { getTopic } from "@/lib/content/topics";

const topic = getTopic("/hotel-schema-generator");

const hotelType = "https://schema.org/Hotel";
const lodgingType = "https://schema.org/LodgingBusiness";
const starProp = "https://schema.org/starRating";
const amenityProp = "https://schema.org/amenityFeature";
const checkinProp = "https://schema.org/checkinTime";
const checkoutProp = "https://schema.org/checkoutTime";
const priceProp = "https://schema.org/priceRange";
const hotelsDoc = "https://schema.org/docs/hotels.html";
const localBusiness = "https://developers.google.com/search/docs/appearance/structured-data/local-business";
const gallery = "https://developers.google.com/search/docs/appearance/structured-data/search-gallery";
const vacationRental = "https://developers.google.com/search/docs/appearance/structured-data/vacation-rental";
const hotelPrices = "https://developers.google.com/hotels/hotel-prices/structured-data/hotel-price-structured-data";
const policies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";
const reviewDocs = "https://developers.google.com/search/docs/appearance/structured-data/review-snippet";
const aiGuide = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";

const faqs = [
  {
    q: "Does Hotel schema guarantee a Google hotel listing, a knowledge panel, or an AI citation?",
    a: "No. schema.org Hotel is an establishment that provides lodging paid on a short-term basis. It is a LodgingBusiness, which is a LocalBusiness. Google’s local business documentation says name and address are required for a local business rich result, and that Google does not guarantee the feature will show. Google’s structured data gallery, read on 22 October 2026, lists Local business and Vacation rental. It does not list a separate Hotel rich result. Vacation rental is a different type, and this form does not write it. Google’s hotel price documentation, read the same day, says JSON-LD is deprecated for hotel price accuracy validation and that Microdata is the format for that check. This script is JSON-LD. It does not write makesOffer, identifier, or HotelRoom, so it does not satisfy that price check. Google’s optimization guide says structured data is not required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features. The script does not make ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, Meta AI, DeepSeek, Mistral, Brave Search, You.com, DuckDuckGo, or Google AI Overviews cite the page.",
  },
  {
    q: "Which fields does this form require?",
    a: "schema.org does not list a required property for Hotel. This generator writes a script once the name is present. description, address, geo, telephone, url, image, priceRange, starRating, checkinTime, checkoutTime, amenityFeature, and aggregateRating are included only when they are valid. Google’s local business page requires name and address for that rich result. This form still writes a script from the name alone, because the page may not be aiming at that feature. An address is written when any address field is filled. Geo is written only when latitude and longitude are both in range. A star rating is written only when the value is a number greater than zero and, if you set a best rating, the value is not above it. An aggregate rating is written only when the rating and the review count are both valid.",
  },
  {
    q: "What is the difference between starRating and aggregateRating?",
    a: "schema.org starRating is an official rating for a lodging business, for example from a national association or a standards body. The value is a Rating. Use author for the organization that issued the stars, such as Hotelstars. It is not the average of guest reviews. aggregateRating is that guest average, with a rating value and a review count. Google’s local business documentation recommends review and aggregateRating only for sites that capture reviews about other businesses. A hotel marking up guest stars it collected about itself is outside that recommendation, and it does not create a star rich result. Leave aggregateRating blank unless the page shows the average and you still want the label. The two properties are not substitutes. This form can write both only when the page shows both.",
  },
  {
    q: "Where should the script go, and does it write a room price?",
    a: "On the page for that hotel, in the HTML the server sends, where a person can already see the name and the other facts you mark up. Google’s structured data policies say not to mark up content that is not visible to readers of the page. The script is built in the browser. Nothing is sent to CiteScore. One script is one hotel. A second property is a second page. schema.org’s hotel markup notes say a price belongs on the offer for a room, not on the hotel itself, and that a room offered for rent is both HotelRoom and Product. This form writes priceRange, which is text such as $$$ or $100 - $240. It does not write an Offer, a makesOffer, a HotelRoom, or a nightly rate. The local business schema generator already lists Hotel, and it writes hours, a logo, and profile URLs. It does not write these lodging fields. Do not paste both Hotel scripts on the same URL.",
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
  { href: "/real-estate-agent-schema-generator", label: "Real estate agent schema generator" },
  { href: "/plumber-schema-generator", label: "Plumber schema generator" },
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
  { href: "/ai-search-visibility-for-chiropractors", label: "AI search visibility for chiropractors" },
  { href: "/ai-search-visibility-for-insurance-agents", label: "AI search visibility for insurance agents" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function HotelSchemaGeneratorPage() {
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
        ctaId="hotel-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <HotelSchemaGenerator />
        <h2>Why the hotel is labeled</h2>
        <p>
          A hotel page can put the name in the H1, the address in the footer, the official stars beside a badge, and
          the check-in time in a policy paragraph. An answer engine that quotes the page still has to decide which
          string is the name, which number is the star class, and which clock time is check-in.{" "}
          <a href={hotelType}>schema.org Hotel</a> is that decision written down. A parser, including the ones behind
          ChatGPT, Perplexity, Claude, Gemini, and Google AI Overviews, can read those labels without guessing which
          number was the guest average. The script does not create a citation, and it does not rank the page.
        </p>
        <p>
          Google’s <a href={aiGuide}>optimization guide</a>, read on 22 October 2026, says structured data is not
          required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features.
          The useful part is the same as for any other labeled fact: the name, the address, the stars, and the times
          are in the HTML, in words a person can read. The longer note on which facts to repeat is the{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link>.
        </p>
        <p>
          <a href={hotelType}>schema.org Hotel</a>, read on 22 October 2026, is an establishment that provides lodging
          paid on a short-term basis. The Hotel page points to the{" "}
          <a href={hotelsDoc}>schema.org hotel markup notes</a>. Hotel is a <a href={lodgingType}>LodgingBusiness</a>.
          That type is a LocalBusiness. Use Hotel when the page is a hotel. Motel, Resort, Hostel, BedAndBreakfast,
          Campground, and LodgingBusiness are different types. They are already in the{" "}
          <Link href="/local-business-schema-generator">Local business schema generator</Link>, which also lists Hotel.
          That form writes the name, the address, the phone, the hours, geo, a logo, an image, and profile URLs. It does
          not write <code>priceRange</code>, <code>starRating</code>, <code>checkinTime</code>, <code>checkoutTime</code>,{" "}
          <code>amenityFeature</code>, or <code>aggregateRating</code>. This form writes those lodging fields. Do not
          paste both Hotel scripts on the same URL. Add hours, a logo, or <code>sameAs</code> by hand on this script
          only when the page shows them.
        </p>
        <p>
          Google’s <a href={localBusiness}>local business documentation</a>, read on 22 October 2026, says to use the
          most specific subtype, and it requires <code>name</code> and <code>address</code> for a local business rich
          result. Its examples are Restaurant, DaySpa, and HealthClub. It does not name Hotel. The subtype still
          applies, because that is the type schema.org defines for this business. Google does not guarantee that the
          panel or the list will show. The <a href={gallery}>structured data gallery</a>, read the same day, lists Local
          business and Vacation rental. It does not list a separate Hotel feature.{" "}
          <a href={vacationRental}>Vacation rental</a> is its own Search documentation and its own type. This form does
          not write <code>VacationRental</code>. A vehicle page uses the{" "}
          <Link href="/vehicle-schema-generator">Vehicle schema generator</Link>. An HVAC company is a different page, on{" "}
          <Link href="/ai-search-visibility-for-hvac">AI search visibility for HVAC</Link>. A roofing contractor’s office, service area, and hours are on <Link href="/ai-search-visibility-for-roofers">AI search visibility for roofers</Link>. An electrical contractor’s shop, service area, and hours are on <Link href="/ai-search-visibility-for-electricians">AI search visibility for electricians</Link>. A landscaping business’s office, service area, and hours are on <Link href="/ai-search-visibility-for-landscapers">AI search visibility for landscapers</Link>. An auto repair business’s shop, service area, and hours are on <Link href="/ai-search-visibility-for-auto-repair">AI search visibility for auto repair</Link>. A chiropractic office’s office, services, and hours are on <Link href="/ai-search-visibility-for-chiropractors">AI search visibility for chiropractors</Link>. An insurance agency’s office, lines of coverage, and hours are on <Link href="/ai-search-visibility-for-insurance-agents">AI search visibility for insurance agents</Link>. A plumbing business is on{" "}
          <Link href="/ai-search-visibility-for-plumbers">AI search visibility for plumbers</Link>.
        </p>
        <h2>What each field is</h2>
        <p>
          The script needs the name a person can see. <code>description</code> is the sentence on that page.{" "}
          <code>url</code> is the hotel page. <code>image</code> is one photo URL, written as an array of one item, the
          same shape the local business form uses. Google’s local business page says an image can be repeated. This
          form writes one URL. It cannot measure the file. Add further images by hand as more items in that array only
          when the page shows them. A photo that also shows a credit or a license can use the{" "}
          <Link href="/image-object-schema-generator">ImageObject schema generator</Link> as a second script. schema.org’s
          Hotel example also shows a <code>photo</code> property. This form writes <code>image</code>. It does not also
          write <code>photo</code>.
        </p>
        <p>
          <code>address</code> is a PostalAddress: street, locality, region, postal code, and country. Any one of those
          is enough for this form to write the object, and empty parts are left out. A two-letter country code is
          uppercased. Google’s local business page says to include as many address properties as possible. Google’s{" "}
          <a href={hotelPrices}>hotel price documentation</a> says the postal fields are mandatory if you choose to
          specify <code>address</code> for that price check. This form does not invent a street the page does not show.
          If the page does not show a street address, leave it blank.
        </p>
        <p>
          <code>geo</code> is a GeoCoordinates pair. Latitude runs from -90 to 90. Longitude runs from -180 to 180. One
          without the other is left out. Google’s local business page recommends at least five decimal places. This
          form still writes a shorter pair, because that is the number the page shows. Do not add coordinates the page
          does not publish.
        </p>
        <p>
          <code>telephone</code> keeps the formatting you type when the string has 7 to 15 digits and no other letters.
          A sentence is left out. The number is the one on the hotel page, not a different desk the page does not show.
        </p>
        <p>
          <a href={priceProp}>schema.org priceRange</a> is the price range of the business, for example <code>$$$</code>.
          The Hotel example also uses <code>$100 - $240</code>. This form writes that text, up to 80 characters. It does
          not write an Offer, a currency code, or a nightly rate. The{" "}
          <a href={hotelsDoc}>schema.org hotel notes</a> say a price sits on the offer for a room, and that a room for
          rent is both HotelRoom and Product. Add that pair by hand only when the page is a room a guest can book on
          that URL. This form does not write it.
        </p>
        <p>
          Google’s <a href={hotelPrices}>hotel price structured data</a>, read on 22 October 2026, is a price-accuracy
          check for Google Hotels. It recommends Microdata. It says JSON-LD is deprecated for that validation, and that
          this limit does not change other Google Search uses of structured data. The check uses <code>name</code>, an{" "}
          <code>identifier</code> that matches the hotel’s price-feed id, and <code>makesOffer</code>. Its example puts
          a date and time for one stay on that offer. <a href={checkinProp}>schema.org checkinTime</a> on a
          LodgingBusiness is the earliest someone may check in, and <a href={checkoutProp}>checkoutTime</a> is the
          latest someone may check out. This form writes those two as a 24-hour clock time on the Hotel, such as{" "}
          <code>15:00</code> and <code>11:00</code>. It does not write a stay date, <code>makesOffer</code>,{" "}
          <code>identifier</code>, or <code>priceSpecification</code>. A sentence such as “mid-afternoon” is left out.
          Do not put a guest’s reservation time in the script.
        </p>
        <p>
          <a href={starProp}>schema.org starRating</a> is an official rating. The value is a Rating. This form writes{" "}
          <code>ratingValue</code>, and <code>bestRating</code> only when you enter one. <code>author</code> is an
          Organization, and only when you enter a name. schema.org’s example names organizations such as HOTREC, DEHOGA,
          WHR, and Hotelstars. A URL without a name is left off the rating. A name longer than 80 characters is left
          off. This page does not print a personal name. The field is the organization that issued the stars, not a
          guest and not a staff member. A value above the best rating is left out entirely.
        </p>
        <p>
          <a href={amenityProp}>schema.org amenityFeature</a> is a LocationFeatureSpecification. schema.org’s example is
          a feature such as a sauna, with <code>value</code> true. The property does not say whether the feature is
          included in the room rate or offered at an extra cost. Say that in the HTML if the page states it. This form
          writes one feature per line. A line with no pipe is <code>value: true</code>. After a pipe, <code>true</code>{" "}
          and <code>yes</code> are true, <code>false</code> and <code>no</code> are false, a number is a number, and
          other short text is text. One feature is one object. Two become an array. A repeated name is written once. A
          name or a note longer than 80 characters is left out. This form does not write <code>hoursAvailable</code>.
          Add hours for one amenity by hand only when the page shows them.
        </p>
        <p>
          <code>aggregateRating</code> is optional. It needs a rating greater than zero and a review count of at least
          1. A best rating is included only when it is valid and the rating is not above it. One field without the
          other is left out. Google’s <a href={reviewDocs}>review snippet guidelines</a> and the local business page,
          read on 22 October 2026, say self-serving reviews of a local business are outside the star feature. Writing
          the property does not make Google show stars. Leave it blank when the page does not show the average. The{" "}
          <Link href="/review-schema-generator">Review schema generator</Link> is for a page that shows reviews of a
          product or an app. It does not write Hotel.
        </p>
        <p>
          Google’s <a href={policies}>structured data policies</a>, read on 22 October 2026, say not to mark up content
          that is not visible to readers of the page, and that the structured data must be a true representation of the
          page content. The copy block is one <code>script</code> tag. Paste it into the HTML the server sends. Answer
          engines often skip text that only appears after JavaScript runs. The <Link href="/free-check">free check</Link>{" "}
          lists the JSON-LD <code>@type</code> values on the homepage. A hotel URL at another path is outside that
          fetch. The <Link href="/geo-audit">$39 audit</Link> looks for markup that matches the copy.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for that hotel page, in the head or the body.</li>
          <li>Confirm the same name, description, address, coordinates, phone, price range, stars, check-in, check-out, amenities, rating, image, and page URL are visible on that page.</li>
          <li>Leave starRating blank when the page does not show an official classification. Leave aggregateRating blank when the page does not show a guest average.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>An address, a phone, a coordinate, a price range, a star class, a time, an amenity, or a rating the page does not show.</li>
          <li>A guest’s reservation, a room number, or a stay date. This form writes the hotel’s clock times, not one booking.</li>
          <li>makesOffer, identifier, HotelRoom, and priceSpecification. This form does not write the Google Hotels price check, and JSON-LD is deprecated for that check.</li>
          <li>photo beside image. This form writes image.</li>
          <li>A second Hotel script from the local business generator on the same URL.</li>
          <li>VacationRental, Motel, or Resort in this script. This form writes Hotel.</li>
          <li>A starRating author that is a personal name or a URL. The author is the rating organization.</li>
          <li>aggregateRating when the hotel is marking up reviews it controls and you do not want a property Google’s star feature will not use.</li>
          <li>The same Hotel block on every URL of the site.</li>
        </ul>
        <h2>Questions about hotel schema</h2>
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
