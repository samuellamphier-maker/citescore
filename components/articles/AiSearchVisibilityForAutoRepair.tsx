import Link from "next/link";
import { GuideOffers } from "@/components/articles/GuideOffers";
import { preClass } from "@/components/articles/guide-links";

const autoRepair = "https://schema.org/AutoRepair";
const automotive = "https://schema.org/AutomotiveBusiness";
const autoBody = "https://schema.org/AutoBodyShop";
const autoDealer = "https://schema.org/AutoDealer";
const gasStation = "https://schema.org/GasStation";
const areaServed = "https://schema.org/areaServed";
const serviceType = "https://schema.org/Service";
const vehicleType = "https://schema.org/Vehicle";
const localBusiness =
  "https://developers.google.com/search/docs/appearance/structured-data/local-business";
const gallery = "https://developers.google.com/search/docs/appearance/structured-data/search-gallery";
const aiGuide = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";
const sdPolicies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";
const reviewDocs = "https://developers.google.com/search/docs/appearance/structured-data/review-snippet";
const searchUpdates = "https://developers.google.com/search/updates";
const spec = "https://llmstxt.org/";

const shopExample = `{
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "name": "Example Auto Repair",
  "url": "https://example.com/shops/springfield",
  "telephone": "+1-555-010-0202",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "18 Bay Street",
    "addressLocality": "Springfield",
    "addressRegion": "IL",
    "postalCode": "62702",
    "addressCountry": "US"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "07:30",
    "closes": "17:30"
  }
}`;

const serviceExample = `{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Example brake inspection",
  "serviceType": "Brake inspection",
  "description": "Brake inspection for vehicles the Springfield shop already services. Example markup only. This is not a price, and it is not a repair procedure.",
  "url": "https://example.com/services/brake-inspection",
  "provider": {
    "@type": "Organization",
    "name": "Example Auto Repair",
    "url": "https://example.com/shops/springfield"
  },
  "areaServed": "Springfield"
}`;

const llmsExample = `# Example Auto Repair

> Example Auto Repair is one auto repair shop in Springfield, Illinois. This file is an example.

## Shop

- [Springfield](https://example.com/shops/springfield): The name, address, phone, and hours on that page

## Services

- [Brake inspection](https://example.com/services/brake-inspection): The work the page describes, and the Springfield area named there

## Optional

- [News](https://example.com/news): Business announcements a reader can skip`;

export const autoRepairFaqs = [
  {
    q: "Does AutoRepair schema get an auto repair shop cited by ChatGPT, Perplexity, or AI Overviews?",
    a: "No. schema.org describes AutoRepair as a car repair business. It is an AutomotiveBusiness, which is car repair, sales, or parts, and a LocalBusiness. Google’s local business documentation says name and address are required for a local business rich result, and that Google does not guarantee the feature will show. Google’s optimization guide, read on 23 October 2026, says structured data is not required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features. None of those pages publishes a citation rate for auto repair shops. The script has to match the visible page. This page is not repair, diagnostic, or vehicle-safety advice.",
  },
  {
    q: "When should the page be AutoRepair, and when a dealer, a body shop, a service, or a vehicle?",
    a: "Use AutoRepair for one public page about a car repair shop, with the name and the address the page shows. AutomotiveBusiness is the parent type. Use it, or LocalBusiness, when no narrower automotive type fits. AutoBodyShop is a body shop. AutoDealer is a dealer. GasStation is a gas station. AutoPartsStore, AutoRental, AutoWash, MotorcycleDealer, and MotorcycleRepair are the other more specific types schema.org lists under AutomotiveBusiness. Organization fits a homepage that is not one street address. Use Service on the page for one offer the site actually publishes, such as a brake inspection, an oil change, or a state inspection, with the place the page names in areaServed. Use Vehicle or Car on a page about one vehicle the shop is offering, not on a repair order. A city page that only swaps the city name is not another AutoRepair, and it is not another Service. Do not mark a customer’s car, a plate, a VIN, or an invoice as the business.",
  },
  {
    q: "Does a review star, a matching phone number, a license line, or llms.txt put a shop into ChatGPT or AI Overviews?",
    a: "No. The same name, the same phone, and the same address, when you publish an address, make one record an assistant can match. They do not create a citation. A license number helps only when the page already shows that number and the jurisdiction that issued it. This page does not say which license a shop must hold. Google’s local business page recommends review and aggregateRating only for sites that capture reviews about other businesses. A shop marking up its own stars is outside that recommendation. The stars do not create a citation. The llms.txt proposal is a Markdown reading list. Google’s optimization guide says Google Search ignores special AI text files, including llms.txt, so the file neither helps nor harms AI Overviews or AI Mode. A missing file is not a block, and a present file is not a citation. Google-Extended, which covers Gemini Apps, is a separate robots.txt choice from whether Search includes the site in AI Overviews.",
  },
  {
    q: "Does the free check query ChatGPT, Perplexity, or Google AI Overviews, or open a customer file?",
    a: "No. The free check reads the homepage, robots.txt for GPTBot, PerplexityBot, and Google-Extended, a non-empty llms.txt, a sitemap, and JSON-LD types on the homepage. It does not read OAI-SearchBot, it does not log into an answer engine or Search Console, and it does not open estimates, repair orders, or a scheduling login. The $39 audit scores one public URL from the HTML we fetch. The per-engine snapshot is an inference, and the report says so. A shop URL or a service URL is outside the homepage check. CiteScore does not give repair, diagnostic, or vehicle-safety advice.",
  },
];

export function AiSearchVisibilityForAutoRepairArticle() {
  return (
    <>
      <p>
        An auto repair shop is cited when an answer engine can fetch a page and find a sentence that states the
        business, the work, the place served, or the limit of that page. ChatGPT search, Perplexity search, and Google
        AI Overviews each publish a crawler or indexing control. None of those pages publishes a citation rate for
        auto repair shops, a required word count, or a schema type that turns a homepage into a footnote. CiteScore
        does not log into those products, and it does not give repair, diagnostic, or vehicle-safety advice. It does
        not say which fluid to use, which part to replace, or how to work on a brake, an engine, or an airbag. The
        work here is how those products pick a source, the shop record, service-area pages that say something
        distinct, one URL per service, the name and phone a person can already read, reviews, questions the page
        already answers, <code>robots.txt</code>, and <code>llms.txt</code> as a reading list.
      </p>
      <p>
        The local markup rules are on <Link href="/geo-for-local-businesses">GEO for local businesses</Link>. The
        engine pages are <Link href="/how-to-get-cited-by-chatgpt">ChatGPT</Link>,{" "}
        <Link href="/how-to-get-cited-by-perplexity">Perplexity</Link>, and{" "}
        <Link href="/google-ai-overviews-optimization">Google AI Overviews</Link>. A plumbing business’s office,
        service area, and hours are on{" "}
        <Link href="/ai-search-visibility-for-plumbers">AI search visibility for plumbers</Link>. An HVAC company’s
        office, service area, and hours are on{" "}
        <Link href="/ai-search-visibility-for-hvac">AI search visibility for HVAC</Link>. A roofing contractor’s
        office, service area, and hours are on{" "}
        <Link href="/ai-search-visibility-for-roofers">AI search visibility for roofers</Link>. An electrical
        contractor’s shop, service area, and hours are on{" "}
        <Link href="/ai-search-visibility-for-electricians">AI search visibility for electricians</Link>. A landscaping
        business’s office, service area, and hours are on{" "}
        <Link href="/ai-search-visibility-for-landscapers">AI search visibility for landscapers</Link>. A dental
        office’s specialty and hours are on the{" "}
        <Link href="/dentist-schema-generator">Dentist schema generator</Link>, and the longer practice note is{" "}
        <Link href="/ai-search-visibility-for-dentists">AI search visibility for dentists</Link>. A chiropractic
        office’s office, services, and hours are on{" "}
        <Link href="/ai-search-visibility-for-chiropractors">AI search visibility for chiropractors</Link>. An insurance agency’s office, lines of coverage, and hours are on <Link href="/ai-search-visibility-for-insurance-agents">AI search visibility for insurance agents</Link>. A veterinary clinic’s office, services, and hours are on <Link href="/ai-search-visibility-for-veterinarians">AI search visibility for veterinarians</Link>.
      </p>

      <h2>How an assistant picks a source</h2>
      <p>
        An assistant can quote a page it is allowed to fetch, when that page states the fact in a sentence. Blocking
        the search crawler keeps the site out of that product’s answers. Allowing the crawler does not promise a
        citation. There is no published rate for how often a shop, a bay, or a service is named.
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
        Google’s <a href={aiGuide}>optimization guide</a>, read on 23 October 2026, says structured data is not
        required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features.
        The same guide says a unique page does more over time than a commodity summary, and that a separate URL for
        every query variation, written to manipulate rankings or generative AI responses, violates the scaled content
        abuse policy. A folder of city pages that only swap the city name is that pattern. A folder of “brake shop
        near me” pages that only swap the neighborhood name is the same pattern. Write the places and the services the
        site actually covers.
      </p>
      <p>
        A directory or a review site can be the page an answer quotes. You can keep one business name so a mention and
        your H1 match. You cannot edit their page from your deploy. To see whether ChatGPT names the business, repeat
        the same prompts and keep a log, as on{" "}
        <Link href="/how-to-check-if-chatgpt-mentions-your-brand">how to check if ChatGPT mentions your brand</Link>.
        The free check does not run those prompts.
      </p>

      <h2>AutoRepair for the shop</h2>
      <p>
        <a href={autoRepair}>schema.org AutoRepair</a>, read on 23 October 2026, is a car repair business. It is an{" "}
        <a href={automotive}>AutomotiveBusiness</a>. That type, read the same day, is car repair, sales, or parts, and
        it is a LocalBusiness. The more specific types under AutomotiveBusiness, read the same day, are AutoBodyShop,
        AutoDealer, AutoPartsStore, AutoRental, AutoRepair, AutoWash, GasStation, MotorcycleDealer, and
        MotorcycleRepair. Use AutoRepair for the page about the car repair shop. Use{" "}
        <a href={autoBody}>AutoBodyShop</a> when the page is a body shop. Use <a href={autoDealer}>AutoDealer</a> when
        the page is a dealer. Use <a href={gasStation}>GasStation</a> when the page is a gas station. Use{" "}
        <code>AutomotiveBusiness</code> or <code>LocalBusiness</code> when the page is an automotive business and no
        narrower type fits. Do not use <code>Electrician</code>, <code>Plumber</code>, or <code>HVACBusiness</code>{" "}
        for a page that is only auto repair. Use <code>Organization</code> for a homepage that is not one street
        address.
      </p>
      <p>
        Google’s <a href={localBusiness}>local business documentation</a>, read on 23 October 2026, says to use the
        most specific subtype. Its examples are Restaurant, DaySpa, and HealthClub. The same page says a business with
        multiple types should list them as an array, because <code>additionalType</code> is not supported, and it
        shows <code>Electrician</code>, <code>Plumber</code>, and <code>Locksmith</code> together. Use that array only
        when the page is honestly those businesses. A repair shop that does not publish dealer inventory or fuel sales
        should be <code>AutoRepair</code> alone. Adding AutoDealer or GasStation to look broader describes a business
        the page does not operate.
      </p>
      <p>
        That same Google page requires <code>name</code> and <code>address</code> for a local business rich result.
        Recommended fields, when the page shows them, include <code>geo</code> to at least five decimal places,{" "}
        <code>openingHoursSpecification</code>, <code>telephone</code> with country code and area code, and the{" "}
        <code>url</code> of that page. Google does not guarantee that the panel or the list will show. If the page
        does not show a street address, do not invent one to qualify. A rich result that requires an address is then
        outside what this page can honestly mark up. Google’s <a href={gallery}>structured data gallery</a>, read on
        23 October 2026, lists Local business. It does not list a separate auto repair rich result.
      </p>
      <pre className={preClass}>{shopExample}</pre>
      <p>
        That block is an example, not a shop. <a href={sdPolicies}>Google’s structured data policies</a> say the
        markup has to describe content people can see. The{" "}
        <Link href="/local-business-schema-generator">Local business schema generator</Link> already lists AutoRepair,
        AutoBodyShop, AutoDealer, AutomotiveBusiness, and GasStation. It does not list AutoPartsStore, AutoRental,
        AutoWash, MotorcycleDealer, or MotorcycleRepair. It copies the name, the address, the phone, the hours, and
        optional geo into one script in the browser. It does not emit <code>areaServed</code>, <code>review</code>, or{" "}
        <code>aggregateRating</code>. The address in that script is the address the page shows. It is not a customer’s
        street, and it is not the street of a second shop you left off the page.
      </p>
      <p>
        <a href={areaServed}>schema.org areaServed</a> is the geographic area where a service or offered item is
        provided. It supersedes <code>serviceArea</code>. Add it by hand on the AutoRepair script only when the page
        names the places served. A list of every city you hope to rank for is not that property. A page that names one
        person the site already credits uses <code>Person</code>. The{" "}
        <Link href="/person-schema-generator">Person schema generator</Link> builds that script. This guide does not
        print a personal name. A group homepage that is not one shop can use the{" "}
        <Link href="/organization-schema-generator">Organization schema generator</Link>. A photo that shows a credit
        or a license for the file uses the{" "}
        <Link href="/image-object-schema-generator">ImageObject schema generator</Link>. A page about one vehicle the
        shop is offering, on its own URL, uses <a href={vehicleType}>Vehicle</a> or Car. The{" "}
        <Link href="/vehicle-schema-generator">Vehicle schema generator</Link> builds that script. A customer’s car, a
        plate, and a VIN are not that page. A dental office is not this script. A dental office uses the{" "}
        <Link href="/dentist-schema-generator">Dentist schema generator</Link>. An agent office uses the{" "}
        <Link href="/real-estate-agent-schema-generator">Real estate agent schema generator</Link>. A plumbing business page uses the <Link href="/plumber-schema-generator">Plumber schema generator</Link>. An electrical contractor page uses the <Link href="/electrician-schema-generator">Electrician schema generator</Link>.
      </p>

      <h2>Service-area pages</h2>
      <p>
        A shop often works on vehicles brought to the bay and also publishes pages for the cities or counties it
        covers, or for mobile service when the site actually offers that. Publish a separate URL only when that page
        states something a person in that place can check: which services are offered there, which shop covers it, the
        hours, and a limit the page is willing to state, such as no heavy-truck work in that county when that limit is
        true. A page that changes only the city name is the scaled-content pattern in Google’s optimization guide.
        Leave that page unpublished. A draft city page does not belong in the sitemap.
      </p>
      <p>
        Say the area in a sentence, then repeat that place in <code>areaServed</code> on the service that page
        describes. Do not mark the city page as a second AutoRepair with a made-up street address. Do not paste a
        customer’s home address into the script to prove you pick up cars there. The shop address, when you publish
        one, stays the address on the shop page. The service area stays the places the page names.
      </p>

      <h2>One URL per service</h2>
      <p>
        A brake inspection, an oil change, a diagnostic visit, a state inspection, tires, and a shuttle the page
        already describes are different offers when the site publishes them as different pages. Put the name of the
        work, who it is for, and the place it covers in the first sentences. Say what the visit includes, and say
        what it does not include, when the page is willing to state that limit. An estimate that depends on the
        vehicle is not a fixed price. Leave the price off the script when the page does not show one.
      </p>
      <p>
        This guide does not give a procedure for repairing a brake, an engine, a battery, or an airbag. A service page
        can tell a reader what the shop will look at on site, and it can say which vehicles the page already lists.
        A step-by-step for taking a system apart is not a service page, and an assistant that quotes it would be
        quoting the wrong kind of page. If the site does not publish that procedure, do not add it so a crawler has
        more text.
      </p>
      <pre className={preClass}>{serviceExample}</pre>
      <p>
        <a href={serviceType}>schema.org Service</a> is that offer. <code>serviceType</code> is the short name.{" "}
        <code>provider</code> points at the shop page. <code>areaServed</code> is the place the page names. The{" "}
        <Link href="/service-schema-generator">Service schema generator</Link> copies that shape in the browser. One
        service per page. A second service is a second URL. Do not stuff every job name into the first script. A page
        of questions the business already answers can use the{" "}
        <Link href="/faq-schema-generator">FAQ schema generator</Link> for those visible pairs.
      </p>

      <h2>The name, the address, and the phone</h2>
      <p>
        The shop page, the JSON-LD, and Google Business Profile are three records of one place. Use the same name, the
        same phone, and, when you publish one, the same street. A second phone belongs in the script only when the
        page shows it. If the page says the shop is open weekdays and a different line answers after hours, do not
        mark the shop as open all night. The hours in <code>openingHoursSpecification</code> are the hours a person
        can read.
      </p>
      <p>
        A license number, a permit note, or an insurance line helps a reader only when the page already shows it,
        including the jurisdiction. This guide does not say which license a shop must hold, and it does not say that a
        number in the footer makes an assistant prefer the page. Do not invent a number to fill a field. Do not mark a
        customer’s registration as the shop’s credential.
      </p>
      <p>
        Google’s local business page recommends <code>review</code> and <code>aggregateRating</code> only for sites
        that capture reviews about other local businesses. Google’s{" "}
        <a href={reviewDocs}>review snippet guidelines</a> are the same limit. Leave both properties off the AutoRepair
        script. The stars a shop shows about its own work do not become a rich result by being copied into JSON-LD,
        and they do not create a citation.
      </p>

      <h2>Reviews and job photos</h2>
      <p>
        A review the business wants quoted is a sentence on a page a crawler can fetch, with the business name and the
        work in the text. A star widget that loads after JavaScript, or a review that lives only inside a login, is
        not that sentence. You can ask a customer to post on a profile you already link. You cannot mark those stars
        up as your own rich result.
      </p>
      <p>
        A job photo needs the same care as the address. The caption, the alt text, and any ImageObject should not
        include a license plate, a VIN, or the customer’s street. A photo of a car in a driveway that still shows the
        house number is a customer address. Publish the photo of the work, and name the city only when the page
        already does. The file credit, when the page shows one, is the ImageObject. The customer’s car is not.
      </p>

      <h2>Questions the page already answers</h2>
      <p>
        The useful questions are the ones the business already answers in public: which places it covers, what an
        inspection visit includes, whether it works on the vehicle types the page names, and whether it offers a
        shuttle when the page says so. Put the question and the answer in HTML. FAQ markup is optional, and only for
        those visible pairs. Google’s <a href={searchUpdates}>Search updates</a>, read on 23 October 2026, say the FAQ
        rich result is no longer shown, as announced in the changelog entry for 7 May 2026. The documentation for that
        feature was removed afterward. The markup does not bring the accordion back, and it does not create a
        citation.
      </p>
      <p>
        Do not add a troubleshooting tree for a warning light, a noise, or a DIY repair so the page matches a query.
        The sentence an assistant should be able to quote, when the business is willing to say it, is what the shop
        will look at and which vehicles the page already lists. If that sentence is not on the page, do not hide it
        in the script.
      </p>

      <h2>Customer files stay out</h2>
      <p>
        Estimates, invoices, repair orders, plate numbers, VINs, and a scheduling login are not public source pages.
        Disallow them in <code>robots.txt</code>, leave them out of the sitemap, and do not link them from{" "}
        <code>llms.txt</code>. A portal URL that only works after a login is not a page an answer engine can cite.
      </p>

      <h2>robots.txt for the search crawlers</h2>
      <p>
        Allow OAI-SearchBot, PerplexityBot, and Googlebot on the public shop and service pages if you want those
        products to be able to fetch them. Allowing a crawler is not a citation. Give each token its own group when{" "}
        <code>User-agent: *</code> already disallows the host. The token list is{" "}
        <Link href="/robots-txt-for-ai-crawlers">robots.txt for AI crawlers</Link>, and the copy-paste file is the{" "}
        <Link href="/robots-txt-ai-crawler-generator">robots.txt generator</Link>. An Allow line can still sit behind a
        firewall 403. Staff pages and anything that is not public stay disallowed. Decide GPTBot and Google-Extended
        separately from the search crawlers. Blocking the training token does not, by itself, block the search token.
      </p>

      <h2>llms.txt is a reading list</h2>
      <p>
        <a href={spec}>The llms.txt proposal</a> is an optional Markdown file, usually at <code>/llms.txt</code>.
        Google’s optimization guide, read on 23 October 2026, says Google Search ignores special AI text files,
        including <code>llms.txt</code>, so the file neither helps nor harms AI Overviews, AI Mode, or other Google
        Search rankings. A missing file is not a block, and a present file is not a citation.
      </p>
      <p>
        For an auto repair shop, link the homepage, the public shop page, and the public services you want read. Use
        canonical URLs. Link a city page only when that page states a distinct fact. Leave out estimates, customer
        names, plates, VINs, home addresses, and any page that asks the reader to sign in. Do not paste every city
        when the site already has one service URL. Section order and the mistakes that break a read of the spec are
        on <Link href="/llms-txt-best-practices">llms.txt best practices</Link>. The{" "}
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
        <li>Publish one shop URL with the name, the phone, the hours, and the street if you show one, and the same facts on the Business Profile.</li>
        <li>Add AutoRepair JSON-LD from those visible facts. Leave the street out when the page does not show one. Leave reviews and ratings off that script. Do not add AutoDealer or GasStation unless the page is that business.</li>
        <li>Publish one URL per service the site actually offers. State the work and the place in text. Point the service script at that URL, with areaServed set to the place the page names.</li>
        <li>Publish a city or county page only when it states a distinct fact. Do not swap the city name across an otherwise identical page.</li>
        <li>Publish a vehicle page only for a vehicle the shop is offering in public. Leave the customer’s plate and VIN off the site.</li>
        <li>Publish the questions the business already answers, in HTML. Leave repair procedures off the site unless you are willing to stand behind them in public, and do not add them only for a crawler.</li>
        <li>Allow OAI-SearchBot, PerplexityBot, and Googlebot on the public pages. Decide GPTBot and Google-Extended separately. Keep estimates, repair orders, and drafts disallowed.</li>
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
            OAI-SearchBot, and it does not query an answer engine. For a shop or service URL, use the{" "}
            <Link href="/geo-audit">$39 GEO audit</Link>. The homepage check does not open that path.
          </>
        }
      />

      <h2>Questions about auto repair visibility</h2>
      {autoRepairFaqs.map((item) => (
        <div key={item.q}>
          <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={autoRepair}>schema.org AutoRepair</a>, read 23 October 2026. A car repair business. It is an
          AutomotiveBusiness.
        </li>
        <li>
          <a href={automotive}>schema.org AutomotiveBusiness</a>, read 23 October 2026. Car repair, sales, or parts.
          The more specific types are AutoBodyShop, AutoDealer, AutoPartsStore, AutoRental, AutoRepair, AutoWash,
          GasStation, MotorcycleDealer, and MotorcycleRepair.
        </li>
        <li>
          <a href={areaServed}>schema.org areaServed</a>, read 23 October 2026. The geographic area where a service or
          offered item is provided. It supersedes serviceArea.
        </li>
        <li>
          <a href={vehicleType}>schema.org Vehicle</a>, read 23 October 2026. A vehicle is a device that is designed
          or used to transport people or cargo over land, water, air, or through space. Car is a more specific type.
          Use it on a page about one vehicle, not on a customer’s repair order.
        </li>
        <li>
          <a href={localBusiness}>Local business structured data</a>, read 23 October 2026. Required name and address,
          the most specific subtype, the multi-type example, hours, and the review limit.
        </li>
        <li>
          <a href={reviewDocs}>Review snippet structured data</a>, read 23 October 2026. Self-serving reviews are
          outside the star feature. The local business page limits review and aggregateRating to sites that capture
          reviews about other businesses.
        </li>
        <li>
          <a href={gallery}>Structured data gallery</a>, read 23 October 2026. Local business is listed. A separate
          auto repair rich result is not.
        </li>
        <li>
          <a href={aiGuide}>Google’s generative AI optimization guide</a>, read 23 October 2026. Snippets, Business
          Profile, <code>llms.txt</code>, schema, and scaled content abuse.
        </li>
        <li>
          <a href={sdPolicies}>Structured data general guidelines</a>, read 23 October 2026. Markup matches the visible
          page.
        </li>
        <li>
          <a href={searchUpdates}>Google’s Search updates</a>, read 23 October 2026. The FAQ rich result stopped
          appearing on 7 May 2026. The documentation for that feature was removed afterward.
        </li>
        <li>
          <a href={spec}>The llms.txt proposal</a>. An optional Markdown reading list. Google’s optimization guide says
          Google Search ignores it.
        </li>
      </ul>
    </>
  );
}
