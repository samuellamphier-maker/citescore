import Link from "next/link";
import { GuideOffers } from "@/components/articles/GuideOffers";
import { preClass } from "@/components/articles/guide-links";

const restaurant = "https://schema.org/Restaurant";
const hasMenu = "https://schema.org/hasMenu";
const menuType = "https://schema.org/Menu";
const localBusiness =
  "https://developers.google.com/search/docs/appearance/structured-data/local-business";
const gallery = "https://developers.google.com/search/docs/appearance/structured-data/search-gallery";
const aiGuide = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";
const sdPolicies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";
const spec = "https://llmstxt.org/";

const locationExample = `{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Example Cafe",
  "url": "https://example.com/locations/springfield",
  "telephone": "+1-555-010-0140",
  "servesCuisine": "Coffee",
  "priceRange": "$$",
  "menu": "https://example.com/locations/springfield/menu",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "100 Main Street",
    "addressLocality": "Springfield",
    "addressRegion": "IL",
    "postalCode": "62701",
    "addressCountry": "US"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "07:00",
    "closes": "15:00"
  }
}`;

const llmsExample = `# Example Cafe

> Example Cafe is one cafe in Springfield, Illinois. This file is an example.

## Locations

- [Springfield](https://example.com/locations/springfield): The name, address, phone, hours, and cuisine on that page

## Menu

- [Springfield menu](https://example.com/locations/springfield/menu): The dishes and prices on that page

## Optional

- [News](https://example.com/news): Cafe announcements a reader can skip`;

export const restaurantFaqs = [
  {
    q: "Does Restaurant schema get a cafe cited by ChatGPT, Perplexity, or AI Overviews?",
    a: "No. schema.org describes Restaurant as a restaurant, and it is a FoodEstablishment and a LocalBusiness. Google’s local business documentation says name and address are required for a local business rich result, and that Google does not guarantee the feature will show. Google’s optimization guide, read on 21 October 2026, says structured data is not required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features. None of those pages publishes a citation rate for restaurants. The script has to match the visible page.",
  },
  {
    q: "When should the page be Restaurant, and when a menu or a recipe?",
    a: "Use Restaurant, or a more specific food type such as CafeOrCoffeeShop, BarOrPub, Bakery, or FastFoodRestaurant, for one public location. Google’s local business page says to use the most specific LocalBusiness subtype, and it lists menu as a recommended URL for a food establishment. The menu itself is its own URL, with the dish names and prices in the HTML. Use Recipe only on a page that is a recipe, with ingredients and steps. Do not mark the whole menu up as one Recipe. A ticketed dinner on its own URL is an Event, not another copy of the everyday hours.",
  },
  {
    q: "Does llms.txt or a review star put a restaurant into ChatGPT or AI Overviews?",
    a: "No. The llms.txt proposal is a Markdown reading list. Google’s optimization guide says Google Search ignores special AI text files, including llms.txt, so the file neither helps nor harms AI Overviews or AI Mode. A missing file is not a block, and a present file is not a citation. Google’s local business page recommends review and aggregateRating only for sites that capture reviews about other businesses. A restaurant marking up its own stars is outside that recommendation. The stars do not create a citation.",
  },
  {
    q: "Does the free check query ChatGPT, Perplexity, or Google AI Overviews, or open the menu URL?",
    a: "No. The free check reads the homepage, robots.txt for GPTBot, PerplexityBot, and Google-Extended, a non-empty llms.txt, a sitemap, and JSON-LD types on the homepage. It does not read OAI-SearchBot, and it does not log into an answer engine or Search Console. The $39 audit scores one public URL from the HTML we fetch. The per-engine snapshot is an inference, and the report says so. A location URL or a menu URL is outside the homepage check.",
  },
];

export function AiSearchVisibilityForRestaurantsArticle() {
  return (
    <>
      <p>
        A restaurant is cited when an answer engine can fetch a page and find a sentence that states the location, the
        hours, the cuisine, or the dish, and the limit of that page. ChatGPT search, Perplexity search, and Google AI
        Overviews each publish a crawler or indexing control. None of those pages publishes a citation rate for
        restaurants, a required word count, or a schema type that turns a homepage into a footnote. CiteScore does not
        log into those products. The work on this page is how those products pick a source, the location record, one
        menu URL, hours, reviews, <code>robots.txt</code>, and <code>llms.txt</code> as a reading list.
      </p>
      <p>
        The local markup rules are on <Link href="/geo-for-local-businesses">GEO for local businesses</Link>. The
        engine pages are <Link href="/how-to-get-cited-by-chatgpt">ChatGPT</Link>,{" "}
        <Link href="/how-to-get-cited-by-perplexity">Perplexity</Link>, and{" "}
        <Link href="/google-ai-overviews-optimization">Google AI Overviews</Link>. A law firm’s office page is on{" "}
        <Link href="/ai-search-visibility-for-law-firms">AI search visibility for law firms</Link>. A clinic or
        health-tech site is on{" "}
        <Link href="/ai-search-visibility-for-healthcare">AI search visibility for healthcare</Link>. A brokerage, an
        agent, or a property manager is on{" "}
        <Link href="/ai-search-visibility-for-real-estate">AI search visibility for real estate</Link>. A store’s price
        problem is on <Link href="/ai-search-visibility-for-ecommerce">AI search visibility for ecommerce</Link>. A
        software company’s comparison page is on{" "}
        <Link href="/ai-search-visibility-for-b2b-saas">AI search visibility for B2B SaaS</Link>. An accounting,
        CPA, or bookkeeping firm is on{" "}
        <Link href="/ai-search-visibility-for-accountants">AI search visibility for accountants</Link>. A dental
        practice’s office, services, and hours are on{" "}
        <Link href="/ai-search-visibility-for-dentists">AI search visibility for dentists</Link>. A plumbing business’s office, service area, and hours are on <Link href="/ai-search-visibility-for-plumbers">AI search visibility for plumbers</Link>. An HVAC company’s office, service area, and hours are on <Link href="/ai-search-visibility-for-hvac">AI search visibility for HVAC</Link>. A roofing contractor’s office, service area, and hours are on <Link href="/ai-search-visibility-for-roofers">AI search visibility for roofers</Link>.
      </p>

      <h2>How an assistant picks a source</h2>
      <p>
        An assistant can quote a page it is allowed to fetch, when that page states the fact in a sentence. Blocking
        the search crawler keeps the site out of that product’s answers. Allowing the crawler does not promise a
        citation. There is no published rate for how often a restaurant, a menu, or a dish is named.
      </p>
      <ul>
        <li>
          ChatGPT search depends on OAI-SearchBot. GPTBot is the separate training crawler. The split is on{" "}
          <Link href="/how-to-get-cited-by-chatgpt">how to get cited by ChatGPT</Link>.
        </li>
        <li>
          Perplexity search depends on PerplexityBot, and on the IP ranges Perplexity publishes. See{" "}
          <Link href="/how-to-get-cited-by-perplexity">how to get cited by Perplexity</Link>.
        </li>
        <li>
          Google AI Overviews are a Search feature. The page has to be indexed and snippet-eligible, and the site has
          to be included in Search generative AI features in Search Console. Google-Extended does not change that
          inclusion. See <Link href="/how-to-get-cited-by-gemini">how to get cited by Gemini</Link> and{" "}
          <Link href="/google-ai-overviews-optimization">Google AI Overviews optimization</Link>.
        </li>
      </ul>
      <p>
        Google’s <a href={aiGuide}>optimization guide</a>, read on 21 October 2026, says structured data is not
        required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features.
        The same guide says a unique page does more over time than a commodity summary, and that a separate URL for
        every query variation, written to manipulate rankings or generative AI responses, violates the scaled content
        abuse policy. A folder of city pages that only swap the city name is that pattern. A folder of “best brunch”
        pages that only swap the neighborhood name is the same pattern. Write the locations, the hours, and the menu
        the site actually publishes.
      </p>
      <p>
        A magazine, a review site, or a delivery app can be the page an answer quotes. You can keep one restaurant
        name so a mention and your H1 match. You cannot edit their page from your deploy. To see whether ChatGPT names
        the restaurant, repeat the same prompts and keep a log, as on{" "}
        <Link href="/how-to-check-if-chatgpt-mentions-your-brand">how to check if ChatGPT mentions your brand</Link>.
        The free check does not run those prompts.
      </p>

      <h2>Restaurant for the location</h2>
      <p>
        <a href={restaurant}>schema.org Restaurant</a>, read on 21 October 2026, is a restaurant. It is a{" "}
        <code>FoodEstablishment</code> and a <code>LocalBusiness</code>. Use it for the page about one public location
        that is a restaurant. A cafe can use <code>CafeOrCoffeeShop</code>. A bar can use <code>BarOrPub</code>. A
        bakery, a fast-food counter, an ice-cream shop, a brewery, or a winery has its own subtype. Use{" "}
        <code>FoodEstablishment</code> when the page is a food business and none of those subtypes fit. Use{" "}
        <code>LocalBusiness</code> when the page is a place that does not serve food. Google’s{" "}
        <a href={localBusiness}>local business documentation</a>, read on 21 October 2026, says to use the most specific
        subtype.
      </p>
      <p>
        That same Google page requires <code>name</code> and <code>address</code> for a local business rich result.
        Recommended fields, when the page shows them, include <code>geo</code> to at least five decimal places,{" "}
        <code>openingHoursSpecification</code>, <code>telephone</code> with country code and area code, and the{" "}
        <code>url</code> of that location. <code>menu</code> is the recommended property for a food establishment: the
        fully qualified URL of the menu. <code>servesCuisine</code> is the cuisine the page names.{" "}
        <code>priceRange</code> has to be shorter than 100 characters when you include it. A string of dollar signs, or
        a range such as “$10-15”, is the shape Google’s page describes. Google does not guarantee that the panel or
        the list will show.
      </p>
      <pre className={preClass}>{locationExample}</pre>
      <p>
        That block is an example, not a cafe. <a href={sdPolicies}>Google’s structured data policies</a> say the markup
        has to describe content people can see. The{" "}
        <Link href="/local-business-schema-generator">Local business schema generator</Link> already lists Restaurant
        and the other food subtypes. It copies the name, the address, the phone, the hours, and optional geo into one
        script in the browser. It does not emit <code>menu</code>, <code>servesCuisine</code>, <code>priceRange</code>,{" "}
        <code>acceptsReservations</code>, <code>review</code>, or <code>aggregateRating</code>. The{" "}
        <Link href="/restaurant-schema-generator">Restaurant schema generator</Link> writes those food fields, and it
        also writes the name, the address, the phone, the hours, and geo. It writes <code>menu</code> and does not also
        write <code>hasMenu</code>. Do not paste both Restaurant scripts on one URL. Add a field only when the page
        shows it. The address in that script is this location. It is not the street of a second cafe.
      </p>
      <p>
        <a href={hasMenu}>schema.org hasMenu</a> is the menu as a Menu, as text, or as a URL, and schema.org says it
        supersedes <code>menu</code>. Google’s local business table and its Restaurant example still use{" "}
        <code>menu</code> for the URL. This guide’s example uses <code>menu</code> because that is the property on
        Google’s page. A second property with the same URL is not required. Google’s page also says the Restaurant
        carousel is limited to a small set of restaurant providers. A single cafe page is not that carousel. Google’s{" "}
        <a href={gallery}>structured data gallery</a>, read on 21 October 2026, lists Local business, and it lists
        Carousel combined with Restaurant. It does not list a separate menu rich result.
      </p>
      <p>
        A page that names one person, such as the chef the site already credits, uses <code>Person</code>. The{" "}
        <Link href="/person-schema-generator">Person schema generator</Link> builds that script. This guide does not
        print a personal name. A group homepage that is not one location can use the{" "}
        <Link href="/organization-schema-generator">Organization schema generator</Link>. A photo that shows a credit
        or a license uses the <Link href="/image-object-schema-generator">ImageObject schema generator</Link>. A show
        the restaurant publishes, on its own URL, uses the{" "}
        <Link href="/podcast-schema-generator">Podcast schema generator</Link>. A film the restaurant publishes, on its own URL, uses the{" "}
        <Link href="/movie-schema-generator">Movie schema generator</Link>. A dataset the restaurant publishes, on its own URL, uses the{" "}
        <Link href="/dataset-schema-generator">Dataset schema generator</Link>. A vehicle the restaurant publishes, on its own URL, uses the{" "}
        <Link href="/vehicle-schema-generator">Vehicle schema generator</Link>. A hotel the restaurant publishes, on its own URL, uses the{" "}
        <Link href="/hotel-schema-generator">Hotel schema generator</Link>. The location itself uses the{" "}
        <Link href="/restaurant-schema-generator">Restaurant schema generator</Link>. The show page is not the menu, the film
        page is not the menu, the dataset page is not the menu, the vehicle page is not the menu, and the hotel page is not the menu.
      </p>

      <h2>One URL for the menu</h2>
      <p>
        Put the dish name and the price in the HTML the server sends. A hero photo of a chalkboard is not that list.
        Say whether the page is the current menu, a dinner menu, or a special, and leave out a price the page does not
        show. A draft menu that is not public does not belong in the sitemap. If the only public menu is a PDF, link
        that file and also put the dishes in HTML on a page you control. The <code>menu</code> value is a URL. It is
        not the dish list.
      </p>
      <p>
        <a href={menuType}>schema.org Menu</a>, read on 21 October 2026, is a structured list of food or drink items.{" "}
        <code>hasMenuSection</code> is a grouping, such as a course. <code>hasMenuItem</code> is one dish. Use that
        tree only when the page shows those sections and those dishes. A price on a <code>MenuItem</code> has to be the
        price on the page. This guide does not paste a full menu into JSON-LD. The location script’s job is to point
        at the menu URL. The menu page’s job is to state the dishes in text.
      </p>
      <p>
        A signature dish with ingredients and steps, on its own URL, is a recipe. The{" "}
        <Link href="/recipe-schema-generator">Recipe schema generator</Link> copies that shape. Do not mark the whole
        menu up as one Recipe, and do not mark every dish as a Recipe when the page does not show ingredients and
        steps. A catering offer on its own URL can use the{" "}
        <Link href="/service-schema-generator">Service schema generator</Link>. A ticketed dinner or a one-night
        pop-up, on its own URL, uses the <Link href="/event-schema-generator">Event schema generator</Link>. The
        everyday hours stay on the location page. Questions the restaurant itself answers, visible on the page, can
        use the <Link href="/faq-schema-generator">FAQ schema generator</Link>. Google stopped showing FAQ rich
        results in May 2026. Other types are on the{" "}
        <Link href="/schema-markup-for-ai-search">schema guide</Link>.
      </p>

      <h2>Hours</h2>
      <p>
        The location page, the JSON-LD, and Google Business Profile are three records of one place. Google’s
        optimization guide says Business Profile information can be included in AI responses and in other Google Search
        results. Use the same name, street, phone, and hours in all three. A kitchen that closes at 14:00 and a dining
        room that closes at 15:00 are two hours. Write the hours the page is willing to state, and use{" "}
        <code>department</code> only when a unit has its own phone or its own hours. The longer local note is{" "}
        <Link href="/geo-for-local-businesses">GEO for local businesses</Link>.
      </p>
      <p>
        Google’s local business page shows a closed day as <code>opens</code> and <code>closes</code> both set to{" "}
        <code>00:00</code>. The local business generator writes the times you enter, including that pair, on the days
        you select. It does not invent a closed day you left blank. Leaving Monday out of the script does not tell a
        reader the cafe is closed. Say so in the HTML. Overnight hours, on Google’s page, are one specification whose
        close is after midnight. Confirm the script matches the sentence on the page. Seasonal hours use{" "}
        <code>validFrom</code> and <code>validThrough</code>. The generator does not write those two properties. Add
        them by hand only when the page shows the season.
      </p>

      <h2>Reviews</h2>
      <p>
        Google’s local business documentation recommends <code>review</code> and <code>aggregateRating</code> only for
        sites that capture reviews about other businesses. A restaurant marking up its own stars is outside that
        recommendation. Leave both properties off the location script. The local business generator already leaves them
        off. A page that shows reviews of a product or an app uses the{" "}
        <Link href="/review-schema-generator">Review schema generator</Link>, which does not write LocalBusiness. A
        star count copied from a review site into JSON-LD, when the location page does not show those reviews,
        describes a rating the reader cannot see. schema.org’s <code>starRating</code> is an official rating from a
        standards body, not that average. Leave it out unless the page shows that rating and names the body.
      </p>

      <h2>Reservations and orders</h2>
      <p>
        Google’s local business page says a site that wants a reservation or an order inside Search results can use
        the Maps Booking API. That is a separate product. This guide does not turn it on, and the JSON-LD example does
        not include it. schema.org’s <code>acceptsReservations</code> can be a boolean, the text “Yes” or “No”, or a
        URL where a person makes a reservation. Google’s supported-properties table does not list that property. Add
        it by hand only when the page shows the same fact. A reservation link that only works after a login is not a
        public page for a crawler.
      </p>

      <h2>robots.txt for the search crawlers</h2>
      <p>
        Give each token its own group when <code>User-agent: *</code> already disallows the host. The token list is{" "}
        <Link href="/robots-txt-for-ai-crawlers">robots.txt for AI crawlers</Link>, and the copy-paste file is the{" "}
        <Link href="/robots-txt-ai-crawler-generator">robots.txt generator</Link>. An Allow line can still sit behind a
        firewall 403. A staff login, a reservation admin, a draft menu, and any page that is not public stay
        disallowed. The public location page and the public menu page have to be allowed if you want them fetched.
      </p>

      <h2>llms.txt is a reading list</h2>
      <p>
        <a href={spec}>The llms.txt proposal</a>, v2, updated 10 August 2026 and read on 21 October 2026, is an optional
        Markdown file, usually at <code>/llms.txt</code>. The H1 is the only required section. Google’s optimization
        guide says Google Search ignores the file, so it neither helps nor harms AI Overviews, AI Mode, or other
        Google Search rankings. A missing file is not a block, and a present file is not a citation.
      </p>
      <p>
        For a restaurant, link the homepage, each public location, and the public menu you want read. Use canonical
        URLs. Leave out the staff login, the draft menu, and any page that asks the reader to sign in. Do not paste
        every dish into the file when the site already has a menu URL. The proposal says the links should point at a
        Markdown version of the page when you publish one. Until you do, link the public HTML URL. Section order and
        the mistakes that break a read of the spec are on{" "}
        <Link href="/llms-txt-best-practices">llms.txt best practices</Link>. The{" "}
        <Link href="/llms-txt-generator">llms.txt generator</Link> copies a starter file in the browser. The{" "}
        <Link href="/llms-txt">checker</Link> only looks for a non-empty file.
      </p>
      <pre className={preClass}>{llmsExample}</pre>

      <h2>What you can measure</h2>
      <p>
        Google’s optimization guide tells a site owner to use the Generative AI performance report in Search Console
        for AI Overviews and AI Mode on Google Search. CiteScore does not read Search Console. AI Mode uses the same
        eligibility as AI Overviews, on <Link href="/google-ai-mode-optimization">Google AI Mode optimization</Link>.
        Meeting the indexing rules does not guarantee indexing.
      </p>

      <h2>A workable order</h2>
      <ol>
        <li>Publish one location URL with the name, street, phone, hours, and cuisine in the HTML, and the same facts on the Business Profile.</li>
        <li>Add Restaurant JSON-LD, or the more specific food type, from those visible facts. Add the menu URL, the cuisine, and the price range only when the page shows them. Leave reviews and ratings off that script.</li>
        <li>Publish one menu URL. State each dish and its price in text. Point the location script at that URL.</li>
        <li>Publish a recipe URL only for a dish that has ingredients and steps. Publish an event URL only for a ticketed date.</li>
        <li>Allow OAI-SearchBot, PerplexityBot, and Googlebot on the public pages. Decide GPTBot and Google-Extended separately. Keep staff pages and drafts disallowed.</li>
        <li>Add <code>/llms.txt</code> only as a curated list for readers other than Google Search.</li>
        <li>Submit the sitemap, and confirm Search Console includes the site in generative AI features.</li>
      </ol>
      <p>
        These steps make a sentence fetchable. They are not a citation. The longer on-page list is the{" "}
        <Link href="/checklist">AI Citation Readiness Checklist</Link>.
      </p>

      <GuideOffers
        freeCheck={
          <>
            Run the <Link href="/free-check">free check</Link> on the public host. It reads the homepage, GPTBot,
            PerplexityBot, Google-Extended, <code>llms.txt</code>, a sitemap, and homepage JSON-LD. It does not read
            OAI-SearchBot, and it does not query an answer engine. For a location or menu URL, use the{" "}
            <Link href="/geo-audit">$39 GEO audit</Link>. The homepage check does not open that path.
          </>
        }
      />

      <h2>Questions about restaurant visibility</h2>
      {restaurantFaqs.map((item) => (
        <div key={item.q}>
          <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={restaurant}>schema.org Restaurant</a>, read 21 October 2026. A restaurant, and a FoodEstablishment.
          Cuisine, menu, and reservations are defined on that type.
        </li>
        <li>
          <a href={hasMenu}>schema.org hasMenu</a>, read 21 October 2026. A menu as a Menu, as text, or as a URL.
          Supersedes menu.
        </li>
        <li>
          <a href={menuType}>schema.org Menu</a>, read 21 October 2026. A structured list of food or drink items, with
          sections and items.
        </li>
        <li>
          <a href={localBusiness}>Local business structured data</a>, read 21 October 2026. Required name and address,
          the menu URL, hours, the review limit, and the limited Restaurant carousel.
        </li>
        <li>
          <a href={gallery}>Structured data gallery</a>, read 21 October 2026. Local business is listed. A separate
          menu rich result is not.
        </li>
        <li>
          <a href={aiGuide}>Google’s generative AI optimization guide</a>, read 21 October 2026. Snippets, Business
          Profile, <code>llms.txt</code>, schema, and scaled content abuse.
        </li>
        <li>
          <a href={sdPolicies}>Structured data general guidelines</a>, read 21 October 2026. Markup matches the visible
          page.
        </li>
        <li>
          <a href={spec}>The llms.txt proposal</a>, updated 10 August 2026, read 21 October 2026.
        </li>
      </ul>
    </>
  );
}
