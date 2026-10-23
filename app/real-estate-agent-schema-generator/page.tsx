import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { RealEstateAgentSchemaGenerator } from "@/components/RealEstateAgentSchemaGenerator";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { pageMeta } from "@/lib/content/meta";
import { getTopic } from "@/lib/content/topics";

const topic = getTopic("/real-estate-agent-schema-generator");

const realEstateAgent = "https://schema.org/RealEstateAgent";
const areaServed = "https://schema.org/areaServed";
const knowsAbout = "https://schema.org/knowsAbout";
const priceRange = "https://schema.org/priceRange";
const hoursProp = "https://schema.org/openingHours";
const hoursObject = "https://schema.org/openingHoursSpecification";
const logoProp = "https://schema.org/logo";
const sameAsProp = "https://schema.org/sameAs";
const singleFamily = "https://schema.org/SingleFamilyResidence";
const apartment = "https://schema.org/Apartment";
const localBusiness = "https://developers.google.com/search/docs/appearance/structured-data/local-business";
const gallery = "https://developers.google.com/search/docs/appearance/structured-data/search-gallery";
const policies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";
const aiGuide = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";
const reviewDocs = "https://developers.google.com/search/docs/appearance/structured-data/review-snippet";

const faqs = [
  {
    q: "Does RealEstateAgent schema guarantee a Google listing, a knowledge panel, or an AI citation?",
    a: "No. schema.org RealEstateAgent is a real-estate agent. It is a LocalBusiness. Google’s local business documentation says name and address are required for a local business rich result, and that Google does not guarantee the feature will show. Google’s structured data gallery, read on 23 October 2026, lists Local business. It does not list a separate RealEstateAgent rich result. Google’s optimization guide says structured data is not required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features. The script does not make ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, Meta AI, DeepSeek, Mistral, Brave Search, You.com, DuckDuckGo, or Google AI Overviews cite the page. CiteScore does not give real-estate, legal, or financial advice.",
  },
  {
    q: "Which fields does this form require?",
    a: "schema.org does not list a required property for RealEstateAgent. This generator writes a script once the name is present. url, logo, telephone, address, geo, openingHours, areaServed, knowsAbout, priceRange, and sameAs are included only when they are valid. Google’s local business page requires name and address for that rich result. This form still writes a script from the name alone, because the page may not be aiming at that feature. An address is written when any address field is filled. Geo is written only when latitude and longitude are both in range. The address in the script is the office. It is not the street of a listing.",
  },
  {
    q: "Why does the script write openingHours text instead of openingHoursSpecification?",
    a: "schema.org openingHours is text, such as Mo-Fr 09:00-17:00. Consecutive days in one row become a range. Two rows become an array of those strings. schema.org openingHoursSpecification is a different property, an object with a day and a clock time. Google’s local business documentation, read on 23 October 2026, lists openingHoursSpecification for hours. It does not list the text property openingHours. This form writes the text property. It does not also write openingHoursSpecification. The local business schema generator writes the object, and it lists RealEstateAgent. It does not write areaServed, knowsAbout, priceRange, or the text property openingHours. Do not paste both RealEstateAgent scripts on the same URL. Add the object by hand on this script only when you want the property Google’s table lists and the page shows those hours.",
  },
  {
    q: "Where should the script go, and what should it leave out?",
    a: "On the page for that office, in the HTML the server sends, where a person can already see the name and the other facts you mark up. Google’s structured data policies say not to mark up content that is not visible to readers of the page. The script is built in the browser. Nothing is sent to CiteScore. One script is one office. A second office is a second page. Leave out a place, a topic, a phone, a coordinate, a logo, a price range, or a profile the page does not show. Leave out a client’s name, a listing’s street address, an offer price, and a coming-soon address that is not public. A property-management offer on its own URL uses Service. A house the listing page describes uses SingleFamilyResidence. An apartment uses Apartment. A page about one named agent is a Person. This form writes RealEstateAgent for the office.",
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
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function RealEstateAgentSchemaGeneratorPage() {
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
        ctaId="real-estate-agent-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <RealEstateAgentSchemaGenerator />
        <h2>Why the office is labeled</h2>
        <p>
          An agent office page can put the name in the H1, the places it serves in a sentence, the hours in a footer,
          and the phone in a header. An answer engine that quotes the page still has to decide which string is the
          office, which words are a place served, and which clock time is the public hours.{" "}
          <a href={realEstateAgent}>schema.org RealEstateAgent</a> is that decision written down. A parser, including
          the ones behind ChatGPT, Perplexity, Claude, Gemini, and Google AI Overviews, can read those labels without
          guessing which URL was a listing. The script does not create a citation, and it does not rank the page.
          CiteScore does not give real-estate, legal, or financial advice.
        </p>
        <p>
          Google’s <a href={aiGuide}>optimization guide</a>, read on 23 October 2026, says structured data is not
          required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features.
          The useful part is the same as for any other labeled fact: the name, the address, the places served, the
          hours, and the topics are in the HTML, in words a person can read. The longer note on which facts to repeat
          is the <Link href="/schema-markup-for-ai-search">schema guide</Link>. The practical page for a brokerage, an
          agent, or a property manager is{" "}
          <Link href="/ai-search-visibility-for-real-estate">AI search visibility for real estate</Link>. A law office
          is a different type, on the <Link href="/attorney-schema-generator">Attorney schema generator</Link>. A
          chiropractic office is a different page, on{" "}
          <Link href="/ai-search-visibility-for-chiropractors">AI search visibility for chiropractors</Link>.
        </p>
        <p>
          <a href={realEstateAgent}>schema.org RealEstateAgent</a>, read on 23 October 2026, is a real-estate agent. It
          is a LocalBusiness. Use it for the page about one agent’s office or one brokerage office that acts as an
          agent. A property-management company whose page does not describe an agent is not that type. Use{" "}
          <code>LocalBusiness</code> or <code>Organization</code> for that company, and <code>Service</code> for the
          management offer on its own URL. RealEstateAgent is already in the{" "}
          <Link href="/local-business-schema-generator">Local business schema generator</Link>. That form writes the
          name, the address, the phone, the hours as <code>openingHoursSpecification</code>, geo, a logo, an image, and
          profile URLs. It does not write <code>areaServed</code>, <code>knowsAbout</code>, <code>priceRange</code>, or
          the text property <code>openingHours</code>. This form writes those office fields, and it also writes the
          name, the address, the phone, geo, a logo, and profile URLs, so one script is enough. Do not paste both
          RealEstateAgent scripts on the same URL.
        </p>
        <p>
          Google’s <a href={localBusiness}>local business documentation</a>, read on 23 October 2026, says to use the
          most specific subtype, and it requires <code>name</code> and <code>address</code> for a local business rich
          result. Its examples are Restaurant, DaySpa, and HealthClub. It does not name RealEstateAgent. The subtype
          still applies, because that is the type schema.org defines for this place. Google does not guarantee that the
          panel or the list will show. The <a href={gallery}>structured data gallery</a>, read the same day, lists
          Local business. It does not list a separate real-estate feature. A house the listing page describes uses{" "}
          <a href={singleFamily}>SingleFamilyResidence</a>. An apartment uses <a href={apartment}>Apartment</a>. Do not
          mark a house up as a Product, and do not put the listing’s street address on this office script. A dental
          office is a different page, on the <Link href="/dentist-schema-generator">Dentist schema generator</Link>.
        </p>
        <h2>What each field is</h2>
        <p>
          The script needs the name a person can see. The name is the office, not a client and not one agent’s name
          unless that string is the name of the office the page shows. <code>url</code> is the office page.{" "}
          <a href={logoProp}>logo</a> is an ImageObject or a URL. This form writes one http(s) URL, the same shape the
          local business form uses for a logo. It does not wrap that URL in an ImageObject, and it does not write{" "}
          <code>image</code>. It cannot measure the file. A logo file that also shows a credit or a license can use the{" "}
          <Link href="/image-object-schema-generator">ImageObject schema generator</Link> as a second script. Do not put
          a listing photo in the logo field.
        </p>
        <p>
          <code>address</code> is a PostalAddress: street, locality, region, postal code, and country. Any one of those
          is enough for this form to write the object, and empty parts are left out. A two-letter country code is
          uppercased. Google’s local business page says to include as many address properties as possible. This form
          does not invent a street the page does not show. If the page does not show a street address, leave it blank.
          A listing’s street address, and a client’s home address, do not belong in the script.
        </p>
        <p>
          <code>geo</code> is a GeoCoordinates pair. Latitude runs from -90 to 90. Longitude runs from -180 to 180. One
          without the other is left out. Google’s local business page says the precision must be at least five decimal
          places. This form still writes a shorter pair, because that is the number the page shows. Do not add
          coordinates the page does not publish. The coordinates are the office, not a listing.
        </p>
        <p>
          <code>telephone</code> keeps the formatting you type when the string has 7 to 15 digits and no other letters.
          A sentence is left out. Google’s local business page says to include the country code and area code. The
          number is the one on the office page, not a different desk the page does not show, and not a client’s phone.
        </p>
        <p>
          <a href={hoursProp}>schema.org openingHours</a> is text. Days use <code>Mo</code>, <code>Tu</code>,{" "}
          <code>We</code>, <code>Th</code>, <code>Fr</code>, <code>Sa</code>, and <code>Su</code>. A comma separates
          days. A hyphen marks a range. This form writes one string per row. Consecutive days in that row become a
          range, so Monday through Friday at 09:00 to 17:00 is <code>Mo-Fr 09:00-17:00</code>. Monday, Wednesday, and
          Friday stay <code>Mo,We,Fr</code>. Two different rows become an array. A repeated string is written once. A
          row without a day or a valid 24-hour time is left out. Seconds are kept when you type them. A day you do not
          check is omitted. The text property has no separate closed flag.{" "}
          <a href={hoursObject}>openingHoursSpecification</a> is the object Google’s local business table lists, with{" "}
          <code>dayOfWeek</code>, <code>opens</code>, and <code>closes</code>. This form does not write it.
        </p>
        <p>
          <a href={areaServed}>schema.org areaServed</a> is the geographic area where a service or offered item is
          provided. It supersedes <code>serviceArea</code>. The expected types include Text. This form writes the text
          you type, one place per line, at most 80 characters. One place is one value. Two become an array. A repeated
          place is written once. A longer line is left out. Add a place only when the page names it. A list of every
          city you hope to rank for is not that property. This form does not build an AdministrativeArea, a GeoShape,
          or a Place object. A city page that only swaps the city name is not another RealEstateAgent.
        </p>
        <p>
          <a href={knowsAbout}>schema.org knowsAbout</a>, read on 23 October 2026, is of a Person, and less typically of
          an Organization, to indicate a topic that is known about. It suggests possible expertise and does not imply
          it. The expected types include Text. This form writes one topic per line, at most 80 characters, for the
          topics the office page already names. One topic is one value. Two become an array. A repeated topic is
          written once. The line is the topic, such as residential sales. It is not a fee, a closing date, a license
          number, or a client’s transaction. A page that describes one offer, such as property management, with a
          provider and the place that page names, can use the{" "}
          <Link href="/service-schema-generator">Service schema generator</Link> on that URL instead. Do not put both a
          Service and this office script’s topics on a page that is only one offer. A page that names one agent uses
          the <Link href="/person-schema-generator">Person schema generator</Link>. This form does not write{" "}
          <code>employee</code>.
        </p>
        <p>
          <a href={priceRange}>schema.org priceRange</a> is the price range of the business, for example{" "}
          <code>$$$</code>. Google’s local business page says a price range of 100 characters or longer is not shown.
          This form leaves out a blank value and a value of 100 characters or more. Write it only when the page shows
          that range. A commission, an offer price, or a fee the page does not publish does not belong in the field.
        </p>
        <p>
          <a href={sameAsProp}>schema.org sameAs</a> is a URL that unambiguously indicates the item, such as a profile
          the office controls. One valid URL is a single value. Two become an array. A repeated URL is written once. A
          sentence is left out. Do not add a directory you do not control, a hashtag, a listing portal page, or a
          client’s page.
        </p>
        <p>
          Google’s <a href={policies}>structured data policies</a>, read on 23 October 2026, say not to mark up content
          that is not visible to readers of the page, and that the structured data must be a true representation of the
          page content. Google’s local business page recommends <code>review</code> and <code>aggregateRating</code>{" "}
          only for sites that capture reviews about other local businesses. Google’s{" "}
          <a href={reviewDocs}>review snippet guidelines</a> are the same limit. This form does not write either
          property. An office marking up stars it collected about itself is outside that recommendation. The copy block
          is one <code>script</code> tag. Paste it into the HTML the server sends. Answer engines often skip text that
          only appears after JavaScript runs. The <Link href="/free-check">free check</Link> lists the JSON-LD{" "}
          <code>@type</code> values on the homepage. An office URL at another path is outside that fetch. The{" "}
          <Link href="/geo-audit">$39 audit</Link> looks for markup that matches the copy.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for that office page, in the head or the body.</li>
          <li>Confirm the same name, page URL, logo, phone, address, coordinates, hours, places served, topics, price range, and profile URLs are visible on that page.</li>
          <li>Leave a place, a topic, or the price range blank when the page does not show it. Leave the street blank when the page does not show one. Leave a listing address off this script.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>A client’s name, a listing’s street address, an offer price, a document, a phone number, or a home address.</li>
          <li>A place, a topic, a logo, a coordinate, a price range, or a profile the page does not show.</li>
          <li>openingHoursSpecification, image, review, aggregateRating, and employee. This form does not write them.</li>
          <li>A second RealEstateAgent script from the local business generator on the same URL.</li>
          <li>SingleFamilyResidence, Apartment, or Product in this script. This form writes RealEstateAgent.</li>
          <li>A license number, a commission, or a fee the page does not show. knowsAbout is the topic the page names.</li>
          <li>The same office block on every URL of the site, including every listing.</li>
        </ul>
        <h2>Questions about real estate agent schema</h2>
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
