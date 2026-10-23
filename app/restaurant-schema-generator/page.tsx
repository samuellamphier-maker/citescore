import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { RestaurantSchemaGenerator } from "@/components/RestaurantSchemaGenerator";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { pageMeta } from "@/lib/content/meta";
import { getTopic } from "@/lib/content/topics";

const topic = getTopic("/restaurant-schema-generator");

const restaurantType = "https://schema.org/Restaurant";
const foodType = "https://schema.org/FoodEstablishment";
const cuisineProp = "https://schema.org/servesCuisine";
const priceProp = "https://schema.org/priceRange";
const hoursProp = "https://schema.org/openingHoursSpecification";
const menuProp = "https://schema.org/menu";
const hasMenuProp = "https://schema.org/hasMenu";
const reservationsProp = "https://schema.org/acceptsReservations";
const localBusiness = "https://developers.google.com/search/docs/appearance/structured-data/local-business";
const gallery = "https://developers.google.com/search/docs/appearance/structured-data/search-gallery";
const policies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";
const reviewDocs = "https://developers.google.com/search/docs/appearance/structured-data/review-snippet";
const aiGuide = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";

const faqs = [
  {
    q: "Does Restaurant schema guarantee a Google listing, a knowledge panel, a restaurant carousel, or an AI citation?",
    a: "No. schema.org Restaurant is a restaurant. It is a FoodEstablishment, which is a LocalBusiness. Google’s local business documentation says name and address are required for a local business rich result, and that Google does not guarantee the feature will show. That page, read on 22 October 2026, includes a Restaurant carousel limited to a small set of restaurant providers. This form does not write Carousel markup. It writes one Restaurant. Google’s structured data gallery, read the same day, lists Local business, and it lists Carousel combined with Restaurant. It does not list a separate menu rich result. Google’s optimization guide says structured data is not required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features. The script does not make ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, Meta AI, DeepSeek, Mistral, Brave Search, You.com, DuckDuckGo, or Google AI Overviews cite the page.",
  },
  {
    q: "Which fields does this form require?",
    a: "schema.org does not list a required property for Restaurant. This generator writes a script once the name is present. description, address, geo, telephone, url, image, servesCuisine, priceRange, openingHoursSpecification, menu, and acceptsReservations are included only when they are valid. Google’s local business page requires name and address for that rich result. This form still writes a script from the name alone, because the page may not be aiming at that feature. An address is written when any address field is filled. Geo is written only when latitude and longitude are both in range. A menu URL is written only when it is an http(s) URL. acceptsReservations is written only for yes, no, or a URL.",
  },
  {
    q: "Why does the script write menu instead of hasMenu?",
    a: "schema.org hasMenu is a Menu, text, or a URL, and schema.org says it supersedes menu. menu is still a schema.org property. Google’s local business documentation, read on 22 October 2026, lists menu as the recommended property for a food establishment: the fully qualified URL of the menu. This form writes that URL as menu. It does not also write hasMenu. A second property with the same URL is not required. It does not write a Menu object, a MenuSection, or a MenuItem. The dish names stay in the HTML of the menu page. The longer note is on AI search visibility for restaurants.",
  },
  {
    q: "Where should the script go, and how is it different from the local business generator?",
    a: "On the page for that restaurant, in the HTML the server sends, where a person can already see the name and the other facts you mark up. Google’s structured data policies say not to mark up content that is not visible to readers of the page. The script is built in the browser. Nothing is sent to CiteScore. One script is one restaurant. A second location is a second page. The local business schema generator already lists Restaurant, CafeOrCoffeeShop, BarOrPub, Bakery, and the other food subtypes. It writes the name, the address, the phone, the hours, geo, a logo, an image, and profile URLs. It does not write servesCuisine, priceRange, menu, or acceptsReservations. This form writes those food fields, and it also writes the name, the address, the phone, the hours, and geo, so one script is enough. Do not paste both Restaurant scripts on the same URL. This form writes Restaurant only. Change the type by hand only when the page is a more specific food subtype, and do not keep both scripts.",
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
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function RestaurantSchemaGeneratorPage() {
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
        ctaId="restaurant-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <RestaurantSchemaGenerator />
        <h2>Why the restaurant is labeled</h2>
        <p>
          A restaurant page can put the name in the H1, the cuisine in a sentence, the hours in a footer, and the menu
          on another URL. An answer engine that quotes the page still has to decide which string is the name, which
          words are the cuisine, and which link is the menu. <a href={restaurantType}>schema.org Restaurant</a> is that
          decision written down. A parser, including the ones behind ChatGPT, Perplexity, Claude, Gemini, and Google AI
          Overviews, can read those labels without guessing which number was a dish price. The script does not create a
          citation, and it does not rank the page.
        </p>
        <p>
          Google’s <a href={aiGuide}>optimization guide</a>, read on 22 October 2026, says structured data is not
          required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features.
          The useful part is the same as for any other labeled fact: the name, the address, the cuisine, the hours, and
          the menu URL are in the HTML, in words a person can read. The longer note on which facts to repeat is the{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link>. The practical page for a restaurant’s location,
          menu, and hours is <Link href="/ai-search-visibility-for-restaurants">AI search visibility for restaurants</Link>.
        </p>
        <p>
          <a href={restaurantType}>schema.org Restaurant</a>, read on 22 October 2026, is a restaurant. It is a{" "}
          <a href={foodType}>FoodEstablishment</a>. That type is a LocalBusiness. Use Restaurant when the page is a
          restaurant. CafeOrCoffeeShop, BarOrPub, Bakery, FastFoodRestaurant, IceCreamShop, Brewery, Winery, and
          FoodEstablishment are different types. They are already in the{" "}
          <Link href="/local-business-schema-generator">Local business schema generator</Link>, which also lists
          Restaurant. That form writes the name, the address, the phone, the hours, geo, a logo, an image, and profile
          URLs. It does not write <code>servesCuisine</code>, <code>priceRange</code>, <code>menu</code>, or{" "}
          <code>acceptsReservations</code>. This form writes those food fields, and it also writes the name, the
          address, the phone, the hours, and geo, so one script is enough. Do not paste both Restaurant scripts on the
          same URL. Add a logo or <code>sameAs</code> by hand on this script only when the page shows them.
        </p>
        <p>
          Google’s <a href={localBusiness}>local business documentation</a>, read on 22 October 2026, says to use the
          most specific subtype, and it requires <code>name</code> and <code>address</code> for a local business rich
          result. Its examples include Restaurant. Google does not guarantee that the panel or the list will show. That
          page also describes a Restaurant carousel limited to a small set of restaurant providers. This form does not
          write <code>Carousel</code> or <code>ItemList</code>. A single restaurant page is not that carousel. The{" "}
          <a href={gallery}>structured data gallery</a>, read the same day, lists Local business, and it lists Carousel
          combined with Restaurant. It does not list a separate menu feature. A hotel page uses the{" "}
          <Link href="/hotel-schema-generator">Hotel schema generator</Link>. A roofing contractor is a different page,
          on <Link href="/ai-search-visibility-for-roofers">AI search visibility for roofers</Link>.
        </p>
        <h2>What each field is</h2>
        <p>
          The script needs the name a person can see. <code>description</code> is the sentence on that page.{" "}
          <code>url</code> is the restaurant page. <code>image</code> is one photo URL, written as an array of one item,
          the same shape the local business form uses. Google’s local business page says an image can be repeated, and
          the limited Restaurant carousel asks for images of the restaurant. This form writes one URL. It cannot
          measure the file. Add further images by hand as more items in that array only when the page shows them. A
          photo that also shows a credit or a license can use the{" "}
          <Link href="/image-object-schema-generator">ImageObject schema generator</Link> as a second script.
        </p>
        <p>
          <code>address</code> is a PostalAddress: street, locality, region, postal code, and country. Any one of those
          is enough for this form to write the object, and empty parts are left out. A two-letter country code is
          uppercased. Google’s local business page says to include as many address properties as possible. This form
          does not invent a street the page does not show. If the page does not show a street address, leave it blank.
        </p>
        <p>
          <code>geo</code> is a GeoCoordinates pair. Latitude runs from -90 to 90. Longitude runs from -180 to 180. One
          without the other is left out. Google’s local business page recommends at least five decimal places. This
          form still writes a shorter pair, because that is the number the page shows. Do not add coordinates the page
          does not publish.
        </p>
        <p>
          <code>telephone</code> keeps the formatting you type when the string has 7 to 15 digits and no other letters.
          A sentence is left out. The number is the one on the restaurant page, not a different desk the page does not
          show.
        </p>
        <p>
          <a href={cuisineProp}>schema.org servesCuisine</a> is the cuisine of the restaurant, as text. One line is one
          value. Two or more lines become an array, which is the shape in schema.org’s Restaurant example. A line
          longer than 80 characters is left out. A repeated name is written once. Write the cuisines the page names.
          Do not add a cuisine to chase a query the page does not answer.
        </p>
        <p>
          <a href={priceProp}>schema.org priceRange</a> is the price range of the business, for example <code>$$$</code>.
          Google’s local business page, read on 22 October 2026, describes a string of currency signs or a range such
          as <code>$10-15</code>, and it says a value of 100 characters or longer is not shown. This form writes text
          shorter than 100 characters. It does not write an Offer, a currency code, or a dish price. A price for one
          dish belongs on the menu page, in the HTML a person can read.
        </p>
        <p>
          <a href={hoursProp}>schema.org openingHoursSpecification</a> is the hours for the location. Google’s local
          business page recommends it, and its examples use one object or an array. This form writes one row as one
          object and two rows as an array. <code>dayOfWeek</code> is one day, or an array when you select more than
          one. <code>opens</code> and <code>closes</code> are the 24-hour times you enter. Google’s examples use{" "}
          <code>00:00</code> to <code>00:00</code> for a closed day and <code>00:00</code> to <code>23:59</code> for a
          day that is open all day. A sentence such as “lunch and dinner” is left out. schema.org <code>openingHours</code>{" "}
          is the older text form. This form does not write it. Google’s page also documents <code>validFrom</code> and{" "}
          <code>validThrough</code> for a seasonal closure. Add those dates by hand only when the page shows them.
        </p>
        <p>
          <a href={menuProp}>schema.org menu</a> is the menu as text or as a URL. schema.org says{" "}
          <a href={hasMenuProp}>hasMenu</a> supersedes it. <code>hasMenu</code> is a Menu, text, or a URL. Google’s
          local business table still lists <code>menu</code> as a URL. This form writes that URL. It does not also
          write <code>hasMenu</code>, and it does not write a Menu, a MenuSection, or a MenuItem. The menu page itself
          has the dish names and the prices. A page that is a recipe, with ingredients and steps, uses the{" "}
          <Link href="/recipe-schema-generator">Recipe schema generator</Link>. Do not mark the whole menu up as one
          Recipe.
        </p>
        <p>
          <a href={reservationsProp}>schema.org acceptsReservations</a> says whether a food establishment accepts
          reservations. The value can be a boolean, a URL where a person makes a reservation, or, for backwards
          compatibility, the strings Yes or No. This form writes <code>true</code> for yes, <code>false</code> for no,
          and an http(s) URL when you enter one. A sentence is left out. The property is not one guest’s booking, a
          party size, or a table number. Leave it blank when the page does not say whether the restaurant takes
          reservations.
        </p>
        <p>
          This form does not write <code>review</code> or <code>aggregateRating</code>. Google’s{" "}
          <a href={reviewDocs}>review snippet guidelines</a> and the local business page, read on 22 October 2026, say
          self-serving reviews of a local business are outside the star feature. The{" "}
          <Link href="/review-schema-generator">Review schema generator</Link> is for a page that shows reviews of a
          product or an app. It does not write Restaurant. <code>starRating</code> on a FoodEstablishment is an official
          rating, with the organization that issued it, not a guest average. This form does not write it. Add it by
          hand only when the page shows that official rating.
        </p>
        <p>
          Google’s <a href={policies}>structured data policies</a>, read on 22 October 2026, say not to mark up content
          that is not visible to readers of the page, and that the structured data must be a true representation of the
          page content. The copy block is one <code>script</code> tag. Paste it into the HTML the server sends. Answer
          engines often skip text that only appears after JavaScript runs. The <Link href="/free-check">free check</Link>{" "}
          lists the JSON-LD <code>@type</code> values on the homepage. A restaurant URL at another path is outside that
          fetch. The <Link href="/geo-audit">$39 audit</Link> looks for markup that matches the copy.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for that restaurant page, in the head or the body.</li>
          <li>Confirm the same name, description, address, coordinates, phone, cuisine, price range, hours, menu URL, reservation note, image, and page URL are visible on that page.</li>
          <li>Leave menu blank when the page does not link a menu. Leave acceptsReservations blank when the page does not say.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>An address, a phone, a coordinate, a cuisine, a price range, a set of hours, a menu URL, or a reservation note the page does not show.</li>
          <li>A guest’s reservation, a party size, or a table number. acceptsReservations is whether the restaurant takes reservations, or the URL where a person books.</li>
          <li>hasMenu beside menu. This form writes menu.</li>
          <li>openingHours beside openingHoursSpecification. This form writes the specification.</li>
          <li>A Menu object, a dish price, or an Offer. The menu page has the dishes.</li>
          <li>review, aggregateRating, and starRating. This form does not write them.</li>
          <li>A second Restaurant script from the local business generator on the same URL.</li>
          <li>CafeOrCoffeeShop, BarOrPub, or Bakery in this script. This form writes Restaurant.</li>
          <li>Carousel or ItemList. This form does not write the limited Restaurant carousel.</li>
          <li>The same Restaurant block on every URL of the site.</li>
        </ul>
        <h2>Questions about restaurant schema</h2>
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
