import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { ElectricianSchemaGenerator } from "@/components/ElectricianSchemaGenerator";
import { JsonLd } from "@/components/JsonLd";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { pageMeta } from "@/lib/content/meta";
import { getTopic } from "@/lib/content/topics";

const topic = getTopic("/electrician-schema-generator");

const electrician = "https://schema.org/Electrician";
const homeBusiness = "https://schema.org/HomeAndConstructionBusiness";
const identifierProp = "https://schema.org/identifier";
const propertyId = "https://schema.org/propertyID";
const hasCredential = "https://schema.org/hasCredential";
const areaServed = "https://schema.org/areaServed";
const hasOfferCatalog = "https://schema.org/hasOfferCatalog";
const offerCatalog = "https://schema.org/OfferCatalog";
const priceRange = "https://schema.org/priceRange";
const hoursProp = "https://schema.org/openingHours";
const hoursObject = "https://schema.org/openingHoursSpecification";
const logoProp = "https://schema.org/logo";
const sameAsProp = "https://schema.org/sameAs";
const serviceType = "https://schema.org/Service";
const localBusiness = "https://developers.google.com/search/docs/appearance/structured-data/local-business";
const gallery = "https://developers.google.com/search/docs/appearance/structured-data/search-gallery";
const policies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";
const aiGuide = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";
const reviewDocs = "https://developers.google.com/search/docs/appearance/structured-data/review-snippet";

const faqs = [
  {
    q: "Does Electrician schema guarantee a Google listing, a knowledge panel, or an AI citation?",
    a: "No. schema.org Electrician is an electrician. It is a HomeAndConstructionBusiness, which is a LocalBusiness that provides services around homes and buildings. Google’s local business documentation says name and address are required for a local business rich result, and that Google does not guarantee the feature will show. That page, read on 23 October 2026, also shows a multi-type example that lists Electrician with Plumber and Locksmith for a business that offers those services together. The array does not create a citation, and it does not belong on a page that is only electrical work. Google’s structured data gallery, read the same day, lists Local business. It does not list a separate Electrician rich result. Google’s optimization guide says structured data is not required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features. The script does not make ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, Meta AI, DeepSeek, Mistral, Brave Search, You.com, DuckDuckGo, or Google AI Overviews cite the page. CiteScore does not give electrical, licensing, or code advice.",
  },
  {
    q: "Which fields does this form require, and how is a license number written?",
    a: "schema.org does not list a required property for Electrician. This generator writes a script once the name is present. url, logo, telephone, address, geo, openingHours, areaServed, hasOfferCatalog, identifier, priceRange, and sameAs are included only when they are valid. Google’s local business page requires name and address for that rich result. This form still writes a script from the name alone, because the page may not be aiming at that feature. An address is written when any address field is filled. Geo is written only when latitude and longitude are both in range. The address in the script is the business. It is not a customer’s street. A service line longer than 80 characters is left out. The Offer does not include a price. identifier is written only when the license number is present and at most 80 characters. It is a PropertyValue whose propertyID is the text License number. A trade license is not taxID, vatID, leiCode, duns, or a global location number. hasCredential is a Credential awarded to a person or an organization, not the number by itself. This form does not write those properties. The jurisdiction stays in the sentence a person can read. This form does not invent one.",
  },
  {
    q: "Why does the script write openingHours text instead of openingHoursSpecification?",
    a: "schema.org openingHours is text, such as Mo-Fr 07:00-16:00. Consecutive days in one row become a range. Two rows become an array of those strings. schema.org openingHoursSpecification is a different property, an object with a day and a clock time. Google’s local business documentation, read on 23 October 2026, lists openingHoursSpecification for hours. It does not list the text property openingHours. This form writes the text property. It does not also write openingHoursSpecification. The local business schema generator writes the object, and it lists Electrician. It does not write areaServed, hasOfferCatalog, priceRange, identifier, or the text property openingHours. Do not paste both Electrician scripts on the same URL. Add the object by hand on this script only when you want the property Google’s table lists and the page shows those hours.",
  },
  {
    q: "Where should the script go, and what should it leave out?",
    a: "On the page for that business, in the HTML the server sends, where a person can already see the name and the other facts you mark up. Google’s structured data policies say not to mark up content that is not visible to readers of the page. The script is built in the browser. Nothing is sent to CiteScore. One script is one business. A second shop is a second page. Leave out a place, a service, a phone, a coordinate, a logo, a price range, a license number, or a profile the page does not show. Leave out a customer’s name, a customer’s street address, an invoice, a permit that belongs to the customer, and a photo that shows a house number. A page about one job the site publishes on its own URL uses Service. Plumber, HVACBusiness, RoofingContractor, and Locksmith are different trades. This form writes Electrician.",
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
  { href: "/electrician-schema-generator", label: "Electrician schema generator" },
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
  { href: "/ai-search-visibility-for-veterinarians", label: "AI search visibility for veterinarians" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function ElectricianSchemaGeneratorPage() {
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
        ctaId="electrician-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <ElectricianSchemaGenerator />
        <h2>Why the business is labeled</h2>
        <p>
          An electrical contractor’s page can put the name in the H1, the places it serves in a sentence, the hours in
          a footer, the phone in a header, and a license number in a line under the name. An answer engine that quotes
          the page still has to decide which string is the business, which words are a place served, which clock time
          is the public hours, and which token is the license. <a href={electrician}>schema.org Electrician</a> is that
          decision written down. A parser, including the ones behind ChatGPT, Perplexity, Claude, Gemini, and Google AI
          Overviews, can read those labels without guessing which URL was a customer’s invoice. The script does not
          create a citation, and it does not rank the page. CiteScore does not give electrical, licensing, or code
          advice.
        </p>
        <p>
          Google’s <a href={aiGuide}>optimization guide</a>, read on 23 October 2026, says structured data is not
          required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features.
          The useful part is the same as for any other labeled fact: the name, the address, the places served, the
          services, the license the page already shows, and the hours are in the HTML, in words a person can read. The
          longer note on which facts to repeat is the{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link>. The practical page for an electrical
          contractor is{" "}
          <Link href="/ai-search-visibility-for-electricians">AI search visibility for electricians</Link>. A plumbing
          business is a different type, on the{" "}
          <Link href="/plumber-schema-generator">Plumber schema generator</Link> and{" "}
          <Link href="/ai-search-visibility-for-plumbers">AI search visibility for plumbers</Link>. A veterinary clinic
          is a different page, on{" "}
          <Link href="/ai-search-visibility-for-veterinarians">AI search visibility for veterinarians</Link>.
        </p>
        <p>
          <a href={electrician}>schema.org Electrician</a>, read on 23 October 2026, is an electrician. It is a{" "}
          <a href={homeBusiness}>HomeAndConstructionBusiness</a>. That type, read the same day, is a construction
          business, and a LocalBusiness that provides services around homes and buildings. As a LocalBusiness it can be
          described as a provider of one or more services. Use Electrician when the page is one electrical contractor.
          Plumber, HVACBusiness, RoofingContractor, and Locksmith are different trades. Use{" "}
          <code>HomeAndConstructionBusiness</code> or <code>LocalBusiness</code> when the page is a home-services
          business and Electrician does not fit. Electrician is already in the{" "}
          <Link href="/local-business-schema-generator">Local business schema generator</Link>. That form writes the
          name, the address, the phone, the hours as <code>openingHoursSpecification</code>, geo, a logo, an image, and
          profile URLs. It does not write <code>areaServed</code>, <code>hasOfferCatalog</code>, <code>priceRange</code>
          , <code>identifier</code>, or the text property <code>openingHours</code>. This form writes those business
          fields, and it also writes the name, the address, the phone, geo, a logo, and profile URLs, so one script is
          enough. Do not paste both Electrician scripts on the same URL.
        </p>
        <p>
          Google’s <a href={localBusiness}>local business documentation</a>, read on 23 October 2026, says to use the
          most specific subtype, and it requires <code>name</code> and <code>address</code> for a local business rich
          result. Its examples are Restaurant, DaySpa, and HealthClub. The same page says a business with multiple
          types should list them as an array, because <code>additionalType</code> is not supported, and it shows{" "}
          <code>Electrician</code>, <code>Plumber</code>, and <code>Locksmith</code> together. Use that array only when
          the page is honestly those trades. An electrical contractor that does not publish plumbing or locksmith work
          should be <code>Electrician</code> alone. This form writes Electrician alone. Google does not guarantee that
          the panel or the list will show. The <a href={gallery}>structured data gallery</a>, read the same day, lists
          Local business. It does not list a separate electrician feature. A job the site publishes on its own URL uses{" "}
          <a href={serviceType}>Service</a>, on the <Link href="/service-schema-generator">Service schema generator</Link>
          . Do not put a customer’s street on this business script.
        </p>
        <h2>What each field is</h2>
        <p>
          The script needs the name a person can see. The name is the business, not a customer and not one person’s
          name unless that string is the name of the business the page shows. <code>url</code> is the business page.{" "}
          <a href={logoProp}>logo</a> is an ImageObject or a URL. This form writes one http(s) URL, the same shape the
          local business form uses for a logo. It does not wrap that URL in an ImageObject, and it does not write{" "}
          <code>image</code>. It cannot measure the file. A logo file that also shows a credit or a license for the
          file can use the <Link href="/image-object-schema-generator">ImageObject schema generator</Link> as a second
          script. That license is a credit for the file. It is not the contractor’s license number. Do not put a job
          photo in the logo field.
        </p>
        <p>
          <code>address</code> is a PostalAddress: street, locality, region, postal code, and country. Any one of those
          is enough for this form to write the object, and empty parts are left out. A two-letter country code is
          uppercased. Google’s local business page says to include as many address properties as possible. This form
          does not invent a street the page does not show. If the page does not show a street address, leave it blank.
          A customer’s home address does not belong in the script.
        </p>
        <p>
          <code>geo</code> is a GeoCoordinates pair. Latitude runs from -90 to 90. Longitude runs from -180 to 180. One
          without the other is left out. Google’s local business page says the precision must be at least five decimal
          places. This form still writes a shorter pair, because that is the number the page shows. Do not add
          coordinates the page does not publish. The coordinates are the business, not a customer’s house.
        </p>
        <p>
          <code>telephone</code> keeps the formatting you type when the string has 7 to 15 digits and no other letters.
          A sentence is left out. Google’s local business page says to include the country code and area code. The
          number is the one on the business page, not a different desk the page does not show, and not a customer’s
          phone.
        </p>
        <p>
          <a href={hoursProp}>schema.org openingHours</a> is text. Days use <code>Mo</code>, <code>Tu</code>,{" "}
          <code>We</code>, <code>Th</code>, <code>Fr</code>, <code>Sa</code>, and <code>Su</code>. A comma separates
          days. A hyphen marks a range. This form writes one string per row. Consecutive days in that row become a
          range, so Monday through Friday at 07:00 to 16:00 is <code>Mo-Fr 07:00-16:00</code>. Monday, Wednesday, and
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
          or a Place object. A city page that only swaps the city name is not another Electrician.
        </p>
        <p>
          <a href={hasOfferCatalog}>schema.org hasOfferCatalog</a>, read on 23 October 2026, indicates an OfferCatalog
          listing for this Organization, Person, or Service. Electrician can carry it because Electrician is an
          Organization. <a href={offerCatalog}>schema.org OfferCatalog</a>, read the same day, is an ItemList that
          contains related Offers and/or further OfferCatalogs that are offered by the same provider. This form writes
          one catalog. It does not write a catalog name, and it does not nest catalogs. Each line you type, at most 80
          characters, becomes one Offer. The item offered is a <a href={serviceType}>Service</a> whose name is that
          line. One service is one <code>itemListElement</code>. Two become an array. A repeated name is written once.
          A longer line is left out. The Offer does not include a price. Add a service only when the page names it. A
          list of every trade you hope to rank for is not that property. A page that describes one job, with a provider
          and the place that page names, can use the{" "}
          <Link href="/service-schema-generator">Service schema generator</Link> on that URL instead. Do not put both a
          Service and this business script’s catalog on a page that is only one job. This form does not write{" "}
          <code>availableService</code>. That property is defined for Hospital, MedicalClinic, and Physician. It is not
          defined for Electrician.
        </p>
        <p>
          <a href={identifierProp}>schema.org identifier</a>, read on 23 October 2026, is any kind of identifier for any
          kind of Thing, such as ISBNs, GTIN codes, and UUIDs. The expected types are PropertyValue, Text, and URL.
          The same page says schema.org provides dedicated properties for many identifiers. A contractor license number
          is not <code>taxID</code>, <code>vatID</code>, <code>leiCode</code>, <code>duns</code>, or{" "}
          <code>globalLocationNumber</code>. <a href={hasCredential}>schema.org hasCredential</a>, read the same day, is
          a credential awarded to the Person or Organization. The expected type is Credential. That is the credential,
          not the number by itself. This form does not write <code>hasCredential</code>, <code>hasCertification</code>,
          or <code>companyRegistration</code>. It writes one <code>identifier</code> when you enter a license number of
          at most 80 characters. The value is a PropertyValue. <a href={propertyId}>schema.org propertyID</a>, read the
          same day, can be a site-specific, non-prefixed string. This form sets that string to{" "}
          <code>License number</code> and sets <code>value</code> to the number you type. A blank field and a longer
          value are left out. Write it only when the page shows that number. Repeat the jurisdiction in the sentence a
          person can read. This form does not add a jurisdiction the field does not have. A customer’s permit is not
          the contractor’s license.
        </p>
        <p>
          <a href={priceRange}>schema.org priceRange</a> is the price range of the business, for example{" "}
          <code>$$</code>. Google’s local business page says a price range of 100 characters or longer is not shown.
          This form leaves out a blank value and a value of 100 characters or more. Write it only when the page shows
          that range. A quote, an invoice total, or a fee the page does not publish does not belong in the field.
        </p>
        <p>
          <a href={sameAsProp}>schema.org sameAs</a> is a URL that unambiguously indicates the item, such as a profile
          the business controls. One valid URL is a single value. Two become an array. A repeated URL is written once.
          A sentence is left out. Do not add a directory you do not control, a hashtag, a customer’s page, or a review
          site you do not control.
        </p>
        <p>
          Google’s <a href={policies}>structured data policies</a>, read on 23 October 2026, say not to mark up content
          that is not visible to readers of the page, and that the structured data must be a true representation of the
          page content. Google’s local business page recommends <code>review</code> and <code>aggregateRating</code>{" "}
          only for sites that capture reviews about other local businesses. Google’s{" "}
          <a href={reviewDocs}>review snippet guidelines</a> are the same limit. This form does not write either
          property. A business marking up stars it collected about itself is outside that recommendation. The copy
          block is one <code>script</code> tag. Paste it into the HTML the server sends. Answer engines often skip text
          that only appears after JavaScript runs. The <Link href="/free-check">free check</Link> lists the JSON-LD{" "}
          <code>@type</code> values on the homepage. A shop URL at another path is outside that fetch. The{" "}
          <Link href="/geo-audit">$39 audit</Link> looks for markup that matches the copy.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for that business page, in the head or the body.</li>
          <li>Confirm the same name, page URL, logo, phone, address, coordinates, hours, places served, services, license number, price range, and profile URLs are visible on that page.</li>
          <li>Leave a place, a service, the license number, or the price range blank when the page does not show it. Leave the street blank when the page does not show one. Leave a customer’s address off this script.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>A customer’s name, a customer’s street address, an invoice, a job photo that shows a house number, a customer’s permit, or a phone number that is not the business number.</li>
          <li>A place, a service, a logo, a coordinate, a license number, a price range, or a profile the page does not show.</li>
          <li>A catalog name, an offer price, openingHoursSpecification, image, review, aggregateRating, hasCredential, taxID, and vatID. This form does not write them.</li>
          <li>A second Electrician script from the local business generator on the same URL.</li>
          <li>Plumber, HVACBusiness, RoofingContractor, or Locksmith in this script. This form writes Electrician.</li>
          <li>A jurisdiction the page does not show. identifier is the license number the page names.</li>
          <li>How a repair is performed. This form does not write a procedure.</li>
          <li>The same business block on every URL of the site, including every city page.</li>
        </ul>
        <h2>Questions about electrician schema</h2>
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
