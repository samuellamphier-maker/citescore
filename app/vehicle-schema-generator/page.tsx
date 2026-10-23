import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { VehicleSchemaGenerator } from "@/components/VehicleSchemaGenerator";
import { pageMeta } from "@/lib/content/meta";
import { getTopic } from "@/lib/content/topics";

const topic = getTopic("/vehicle-schema-generator");

const vehicleType = "https://schema.org/Vehicle";
const carType = "https://schema.org/Car";
const modelDateProp = "https://schema.org/vehicleModelDate";
const modelDateAlias = "https://schema.org/modelDate";
const odometerProp = "https://schema.org/mileageFromOdometer";
const fuelProp = "https://schema.org/fuelType";
const vinProp = "https://schema.org/vehicleIdentificationNumber";
const brandProp = "https://schema.org/brand";
const modelProp = "https://schema.org/model";
const colorProp = "https://schema.org/color";
const offersProp = "https://schema.org/offers";
const merchantDocs = "https://developers.google.com/search/docs/appearance/structured-data/merchant-listing";
const searchUpdates = "https://developers.google.com/search/updates";
const policies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";
const aiGuide = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";
const vehicleFeed = "https://developers.google.com/vehicle-listings";

const faqs = [
  {
    q: "Does Vehicle or Car schema guarantee a Google vehicle listing, a merchant listing, or an AI citation?",
    a: "No. schema.org Vehicle is a device designed or used to transport people or cargo. schema.org Car is a wheeled, self-powered motor vehicle, and the Car page includes the Vehicle properties. Google’s Search updates page, read on 22 October 2026, says that on 9 September 2025 Google removed the vehicle listing structured data documentation because those structured data types are no longer shown in Google Search results. This script does not bring that feature back. Google’s merchant listing documentation, read on 22 October 2026, says Car is not supported automatically as a subtype of Product, and that you include both Product and Car if you want to attach ratings and be eligible for that Search feature. That page requires name, image, and offers for a Product, and a merchant listing price greater than zero. This form writes one type, Car or Vehicle. It does not write the Product array, and it does not write a rating. Google’s structured data policies say using structured data does not guarantee that a feature will be present. Google’s optimization guide, read the same day, says structured data is not required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features. The script does not make ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, Meta AI, DeepSeek, Mistral, Brave Search, You.com, DuckDuckGo, or Google AI Overviews cite the page.",
  },
  {
    q: "Which fields does this form require?",
    a: "schema.org does not list a required property for Vehicle or Car. This generator writes a script once the name is present and the type is Car or Vehicle. description, brand, model, vehicleModelDate, mileageFromOdometer, fuelType, color, vehicleIdentificationNumber, image, url, and offers are included only when they are valid. A brand URL without a name is left out. An odometer reading without miles or kilometers is left out, and a unit without a reading is left out. Zero miles is kept. An offer is written only when the price is greater than zero and the currency is a three-letter ISO 4217 code. A VIN is written only when it is 17 characters, excludes I, O, and Q, and the check digit matches. Google’s merchant listing page requires name, image, and offers for that experience. This form still writes a script from the name alone, because the page may not be a merchant listing.",
  },
  {
    q: "Why does the script say vehicleModelDate, and why is a VIN with a bad check digit left out?",
    a: "schema.org vehicleModelDate is the release date of a vehicle model, often used to tell versions of the same make and model apart. schema.org modelDate uses the same description. This form writes vehicleModelDate. It does not write modelDate, so the script does not carry two dates. A year, YYYY-MM, a calendar date, or a date and time is accepted. A sentence is left out. schema.org vehicleIdentificationNumber is text, and it describes the VIN as the serial number the automotive industry uses for one vehicle. This form writes a 17-character VIN whose check digit matches, after spaces and hyphens are removed. I, O, and Q are left out. A shorter identifier, including one a pre-1981 vehicle may show on the page, is left out so the script does not invent a 17-character VIN. Add that identifier by hand only when the page shows it.",
  },
  {
    q: "Where should the script go, and can one page list every vehicle?",
    a: "On the page for that vehicle, in the HTML the server sends, where a person can already see the name and the other facts you mark up. Google’s structured data policies say not to mark up content that is not visible to readers of the page. The script is built in the browser. Nothing is sent to CiteScore. One script is one vehicle. A second vehicle is a second page. This form does not write an ItemList. Google’s vehicle listings program for dealership inventory is a feed. This form does not write that feed, a store code, or a dealership address. A product that is not a vehicle uses Product.",
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

export default function VehicleSchemaGeneratorPage() {
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
        ctaId="vehicle-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <VehicleSchemaGenerator />
        <h2>Why the vehicle is labeled</h2>
        <p>
          A vehicle page can put the name in the H1, the brand in a caption, the model year beside the price, and the
          VIN in a specification table. An answer engine that quotes the page still has to decide which string is the
          name, which number is the odometer, and which code is the VIN. <a href={vehicleType}>schema.org Vehicle</a>{" "}
          is that decision written down. A parser, including the ones behind ChatGPT, Perplexity, Claude, Gemini, and
          Google AI Overviews, can read those labels without guessing which number was the price. The script does not
          create a citation, and it does not rank the page.
        </p>
        <p>
          Google’s <a href={aiGuide}>optimization guide</a>, read on 22 October 2026, says structured data is not
          required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features.
          The useful part is the same as for any other labeled fact: the name, the brand, the model, the date, and the
          price are in the HTML, in words a person can read. The longer note on which facts to repeat is the{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link>.
        </p>
        <p>
          <a href={carType}>schema.org Car</a>, read on 22 October 2026, is a wheeled, self-powered motor vehicle used
          for transportation. The Car page includes the Vehicle properties, and the Vehicle page includes the Product
          properties, so brand, model, color, image, and offers sit on either type. Use Car when the page is a car. Use
          Vehicle when the page is a vehicle and Car does not fit. Google’s <a href={searchUpdates}>Search updates</a>,
          read on 22 October 2026, say that on 9 September 2025 Google removed the vehicle listing structured data
          documentation because those structured data types are no longer shown in Google Search results. This form
          does not restore that feature. Google’s <a href={merchantDocs}>merchant listing documentation</a>, read the
          same day, says <code>Car</code> is not supported automatically as a subtype of Product. Include both{" "}
          <code>Product</code> and <code>Car</code> if you want to attach ratings and be eligible for that Search
          feature. This form writes one <code>@type</code>. Add <code>Product</code> by hand, as the first value in an
          array, only when the page is a car a shopper can buy on that URL. This form does not write a rating. A
          product that is not a vehicle uses the <Link href="/product-schema-generator">Product schema generator</Link>.
          A dataset page uses the <Link href="/dataset-schema-generator">Dataset schema generator</Link>. A film page
          uses the <Link href="/movie-schema-generator">Movie schema generator</Link>. A plumbing business is a
          different page, on{" "}
          <Link href="/ai-search-visibility-for-plumbers">AI search visibility for plumbers</Link>. An HVAC company is on{" "}
          <Link href="/ai-search-visibility-for-hvac">AI search visibility for HVAC</Link>. A roofing contractor’s office, service area, and hours are on <Link href="/ai-search-visibility-for-roofers">AI search visibility for roofers</Link>. An electrical contractor’s shop, service area, and hours are on <Link href="/ai-search-visibility-for-electricians">AI search visibility for electricians</Link>. A landscaping business’s office, service area, and hours are on <Link href="/ai-search-visibility-for-landscapers">AI search visibility for landscapers</Link>. An auto repair business’s shop, service area, and hours are on <Link href="/ai-search-visibility-for-auto-repair">AI search visibility for auto repair</Link>. A dental practice’s
          office is on <Link href="/ai-search-visibility-for-dentists">AI search visibility for dentists</Link>.
        </p>
        <h2>What each field is</h2>
        <p>
          The script needs the name a person can see. <code>description</code> is the sentence on that page.{" "}
          <code>url</code> is the vehicle page. <code>image</code> is one photo URL. Google’s merchant listing page says
          an image can be repeated, and it recommends more than one high-resolution photo for a product. This form
          writes one URL. It cannot measure the file. Add further images by hand as an array only when the page shows
          them, and do not describe a different picture. A photo that also shows a credit or a license can use the{" "}
          <Link href="/image-object-schema-generator">ImageObject schema generator</Link> as a second script.
        </p>
        <p>
          <a href={brandProp}>schema.org brand</a> is a Brand or an Organization. This form writes one Brand, and only
          when you enter a name. A URL without a name is omitted, so the script does not invent a brand. Google’s
          merchant listing page recommends at most one brand name. A second brand has to be added by hand, and only
          when the page names that second brand. <a href={modelProp}>schema.org model</a> is text or the URL of a
          ProductModel. A host with a path is written as an https URL. Other text is the model identifier the page
          shows. This page does not print a sample personal name. Type the brand and the model that are already on the
          vehicle page.
        </p>
        <p>
          <a href={modelDateProp}>schema.org vehicleModelDate</a> is the release date of a vehicle model.{" "}
          <a href={modelDateAlias}>schema.org modelDate</a> uses the same description. This form writes{" "}
          <code>vehicleModelDate</code>. A four-digit year, <code>YYYY-MM</code>, a calendar date, or a date and time
          is accepted. Do not also write <code>modelDate</code> with a different value. A model year the page does not
          show does not belong in the script.
        </p>
        <p>
          <a href={odometerProp}>schema.org mileageFromOdometer</a> is the distance the vehicle has travelled since it
          was produced, as read from its odometer. The value is a QuantitativeValue. Typical unit codes are{" "}
          <code>KMT</code> for kilometers and <code>SMI</code> for statute miles. This form writes <code>value</code>{" "}
          and <code>unitCode</code>, and only when both are valid. Zero is kept, because a new vehicle can show a zero
          reading. A reading without a unit is left out. A unit without a reading is left out. A sentence such as
          “low miles” is left out.
        </p>
        <p>
          <a href={fuelProp}>schema.org fuelType</a> is the fuel suitable for the engine. It can be text or a URL. One
          value is one string. A value longer than 80 characters is left out. This form does not write{" "}
          <code>vehicleEngine</code>. Add that by hand only when the page shows the engine. <a href={colorProp}>schema.org color</a>{" "}
          is the color of the product, as text. Google’s merchant listing page gives “red” and “yellow/sky blue” as
          examples of a color or a color combination. <code>vehicleInteriorColor</code> is a different property. This
          form writes <code>color</code>. It does not write the interior color. Add that by hand only when the page
          shows it, and do not put a different color in the two properties.
        </p>
        <p>
          <a href={vinProp}>schema.org vehicleIdentificationNumber</a> is the VIN, the serial number used to identify
          one vehicle. This form removes spaces and hyphens, rejects I, O, and Q, and writes the value only when the
          17-character check digit matches. A VIN that fails that check is left out, including an identifier a
          pre-1981 vehicle may show. Add that text by hand only when the page shows it. Do not invent a check digit.
          The same VIN on two URLs is two pages. This form does not dedupe a site.
        </p>
        <p>
          <a href={offersProp}>schema.org offers</a> is an offer to provide the item. This form writes one Offer, and
          only when the price is greater than zero and the currency is a three-letter ISO 4217 code. Google’s merchant
          listing page says a merchant listing price has to be greater than zero, and that <code>priceCurrency</code>{" "}
          is required when <code>price</code> is set. A price without a currency is left out. A currency without a
          price is left out. The price is the figure the page shows, not a figure from another site. This form does
          not write <code>availability</code>, <code>itemCondition</code>, <code>priceValidUntil</code>, or{" "}
          <code>priceSpecification</code>. Add any of those by hand only when the page shows the fact. A price of zero
          is left out.
        </p>
        <p>
          Google’s <a href={vehicleFeed}>vehicle listings</a> program for a dealership inventory is a feed. This form
          does not write that feed. It does not write a store code, a place id, or a dealership address. The dealership
          itself, when the page is the business, uses the{" "}
          <Link href="/local-business-schema-generator">Local business schema generator</Link>. AutoDealer is one of
          the types that form already lists.
        </p>
        <p>
          Google’s <a href={policies}>structured data policies</a>, read on 22 October 2026, say not to mark up content
          that is not visible to readers of the page, and that the structured data must be a true representation of the
          page content. The copy block is one <code>script</code> tag. Paste it into the HTML the server sends. Answer
          engines often skip text that only appears after JavaScript runs. The <Link href="/free-check">free check</Link>{" "}
          lists the JSON-LD <code>@type</code> values on the homepage. A vehicle URL at another path is outside that
          fetch. The <Link href="/geo-audit">$39 audit</Link> looks for markup that matches the copy.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for that vehicle page, in the head or the body.</li>
          <li>Confirm the same name, description, brand, model, model date, odometer, fuel, color, VIN, price, image, and page URL are visible on that page.</li>
          <li>Leave the offer blank when the page does not show both a price and a currency. Leave the VIN blank when the page does not show one that passes the check.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>A brand, a model, a date, an odometer reading, a fuel, a color, a VIN, or a price the page does not show.</li>
          <li>A brand URL without the name. Clear the URL or add the name.</li>
          <li>modelDate beside vehicleModelDate. This form writes vehicleModelDate.</li>
          <li>An odometer unit without the reading, or a reading without miles or kilometers.</li>
          <li>A VIN whose check digit does not match. Do not invent a 17-character code for an older identifier.</li>
          <li>A price without a currency, or a currency without a price.</li>
          <li>availability, itemCondition, or a rating. This form does not write them.</li>
          <li>A Product and Car array, unless you add Product by hand for a car a shopper can buy on that page.</li>
          <li>A dealership feed, a store code, or a second vehicle inside this script.</li>
          <li>The same Vehicle block on every URL of the site.</li>
        </ul>
        <h2>Questions about vehicle schema</h2>
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
