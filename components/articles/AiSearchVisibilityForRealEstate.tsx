import Link from "next/link";
import { GuideOffers } from "@/components/articles/GuideOffers";
import { preClass } from "@/components/articles/guide-links";

const realEstateAgent = "https://schema.org/RealEstateAgent";
const singleFamily = "https://schema.org/SingleFamilyResidence";
const apartment = "https://schema.org/Apartment";
const localBusiness =
  "https://developers.google.com/search/docs/appearance/structured-data/local-business";
const aiGuide = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";
const sdPolicies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";
const spec = "https://llmstxt.org/";

const officeExample = `{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Example Brokerage",
  "url": "https://example.com/offices/springfield",
  "telephone": "+1-555-010-0100",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "100 Main Street",
    "addressLocality": "Springfield",
    "addressRegion": "IL",
    "postalCode": "62701",
    "addressCountry": "US"
  }
}`;

const listingExample = `{
  "@context": "https://schema.org",
  "@type": "SingleFamilyResidence",
  "name": "Example house",
  "url": "https://example.com/listings/200-oak",
  "numberOfBedrooms": 3,
  "numberOfBathroomsTotal": 2,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "200 Oak Street",
    "addressLocality": "Springfield",
    "addressRegion": "IL",
    "postalCode": "62701",
    "addressCountry": "US"
  }
}`;

const serviceExample = `{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Residential property management",
  "serviceType": "Residential property management",
  "description": "Management for the Springfield rentals the page lists. Example markup only.",
  "url": "https://example.com/services/property-management",
  "provider": {
    "@type": "Organization",
    "name": "Example Brokerage",
    "url": "https://example.com"
  },
  "areaServed": "Springfield, Illinois"
}`;

const llmsExample = `# Example Brokerage

> Example Brokerage is a brokerage with one office in Springfield, Illinois. This file is an example.

## Listings

- [200 Oak Street](https://example.com/listings/200-oak): The address, status, and price on that page

## Offices

- [Springfield office](https://example.com/offices/springfield): The name, address, phone, and hours on that page

## Optional

- [News](https://example.com/news): Brokerage announcements an agent can skip`;

export const realEstateFaqs = [
  {
    q: "Does RealEstateAgent schema get a brokerage cited by ChatGPT, Perplexity, or AI Overviews?",
    a: "No. schema.org describes RealEstateAgent as a real-estate agent, and it is a LocalBusiness. Google’s local business documentation says name and address are required for a local business rich result, and that Google does not guarantee the feature will show. Google’s optimization guide, read on 21 October 2026, says structured data is not required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features. None of those pages publishes a citation rate for brokerages, agents, or property managers. The script has to match the visible page.",
  },
  {
    q: "When should the page be RealEstateAgent, and when a listing type?",
    a: "Use RealEstateAgent for the office of an agent or a brokerage acting as an agent. schema.org’s definition is a real-estate agent, and the type is a LocalBusiness, so Google’s local business fields apply: name and address are required for the rich result, and hours, geo, telephone, and the location URL are recommended when the page shows them. Use LocalBusiness or Organization when the page is a company that is not an agent office. Use Service for a property-management service on its own URL. Use SingleFamilyResidence for a house the listing page describes, and Apartment for a self-contained unit that occupies part of a building. Do not mark a house up as a Product, and do not put the listing’s street address on the office script.",
  },
  {
    q: "Does llms.txt or a review star put a listing into ChatGPT or AI Overviews?",
    a: "No. The llms.txt proposal is a Markdown reading list. Google’s optimization guide says Google Search ignores special AI text files, including llms.txt, so the file neither helps nor harms AI Overviews or AI Mode. A missing file is not a block, and a present file is not a citation. Google’s local business page recommends review and aggregateRating only for sites that capture reviews about other businesses. A brokerage marking up its own stars is outside that recommendation. The stars do not create a citation.",
  },
  {
    q: "Does the free check query ChatGPT, Perplexity, or Google AI Overviews, or open a listing URL?",
    a: "No. The free check reads the homepage, robots.txt for GPTBot, PerplexityBot, and Google-Extended, a non-empty llms.txt, a sitemap, and JSON-LD types on the homepage. It does not read OAI-SearchBot, and it does not log into an answer engine or Search Console. The $39 audit scores one public URL from the HTML we fetch. The per-engine snapshot is an inference, and the report says so. An office URL or a listing URL is outside the homepage check.",
  },
];

export function AiSearchVisibilityForRealEstateArticle() {
  return (
    <>
      <p>
        A brokerage, an agent, or a property manager is cited when an answer engine can fetch a page and find a
        sentence that states the office, the listing, or the service, and the limit of that page. ChatGPT search,
        Perplexity search, and Google AI Overviews each publish a crawler or indexing control. None of those pages
        publishes a citation rate for real estate, a required word count, or a schema type that turns a homepage into a
        footnote. CiteScore does not log into those products. The work on this page is how those products pick a
        source, the office record, one listing URL, local signals, reviews, <code>robots.txt</code>, and{" "}
        <code>llms.txt</code> as a reading list.
      </p>
      <p>
        The local markup rules are on <Link href="/geo-for-local-businesses">GEO for local businesses</Link>. The
        engine pages are <Link href="/how-to-get-cited-by-chatgpt">ChatGPT</Link>,{" "}
        <Link href="/how-to-get-cited-by-perplexity">Perplexity</Link>, and{" "}
        <Link href="/google-ai-overviews-optimization">Google AI Overviews</Link>. A law firm’s office page is on{" "}
        <Link href="/ai-search-visibility-for-law-firms">AI search visibility for law firms</Link>. A clinic or
        health-tech site is on{" "}
        <Link href="/ai-search-visibility-for-healthcare">AI search visibility for healthcare</Link>. A store’s price
        problem is on <Link href="/ai-search-visibility-for-ecommerce">AI search visibility for ecommerce</Link>. A
        software company’s comparison page is on{" "}
        <Link href="/ai-search-visibility-for-b2b-saas">AI search visibility for B2B SaaS</Link>. A restaurant’s location, menu, and hours are on <Link href="/ai-search-visibility-for-restaurants">AI search visibility for restaurants</Link>. An accounting, CPA, or bookkeeping firm is on <Link href="/ai-search-visibility-for-accountants">AI search visibility for accountants</Link>. A dental practice’s office, services, and hours are on <Link href="/ai-search-visibility-for-dentists">AI search visibility for dentists</Link>. A plumbing business’s office, service area, and hours are on <Link href="/ai-search-visibility-for-plumbers">AI search visibility for plumbers</Link>.
      </p>

      <h2>How an assistant picks a source</h2>
      <p>
        An assistant can quote a page it is allowed to fetch, when that page states the fact in a sentence. Blocking
        the search crawler keeps the site out of that product’s answers. Allowing the crawler does not promise a
        citation. There is no published rate for how often a brokerage, an agent, or a listing is named.
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
        abuse policy. A folder of city pages that only swap the city name is that pattern. A folder of neighborhood
        pages that only swap the neighborhood name is the same pattern. Write the office, the services, and the
        listings the site actually publishes.
      </p>
      <p>
        A listing portal, a county property record, or a publisher can be the page an answer quotes. You can keep one
        brokerage name so a mention and your H1 match. You cannot edit their page from your deploy. To see whether
        ChatGPT names the brokerage, repeat the same prompts and keep a log, as on{" "}
        <Link href="/how-to-check-if-chatgpt-mentions-your-brand">how to check if ChatGPT mentions your brand</Link>.
        The free check does not run those prompts.
      </p>

      <h2>RealEstateAgent for the office</h2>
      <p>
        <a href={realEstateAgent}>schema.org RealEstateAgent</a>, read on 21 October 2026, is a real-estate agent. It
        is a <code>LocalBusiness</code>. Use it for the page about one agent’s office or one brokerage office that
        acts as an agent. A property-management company whose page does not describe an agent is not that type. Use{" "}
        <code>LocalBusiness</code> or <code>Organization</code> for that company, and <code>Service</code> for the
        management offer on its own URL.
      </p>
      <p>
        Google’s <a href={localBusiness}>local business documentation</a>, read on 21 October 2026, requires{" "}
        <code>name</code> and <code>address</code> for a local business rich result. It says to use the most specific{" "}
        <code>LocalBusiness</code> subtype. Recommended fields, when the page shows them, include <code>geo</code> to
        at least five decimal places, <code>openingHoursSpecification</code>, <code>telephone</code> with country code
        and area code, and the <code>url</code> of that location. <code>priceRange</code> has to be shorter than 100
        characters when you include it. Google does not guarantee that the panel or the list will show.
      </p>
      <pre className={preClass}>{officeExample}</pre>
      <p>
        That block is an example, not a brokerage. <a href={sdPolicies}>Google’s structured data policies</a> say the
        markup has to describe content people can see. The{" "}
        <Link href="/local-business-schema-generator">Local business schema generator</Link> already lists
        RealEstateAgent. It copies the name, the address, the phone, the hours, and optional geo into one script in
        the browser. It does not emit <code>review</code> or <code>aggregateRating</code>. The address in that script
        is the office. It is not the street of a listing.
      </p>
      <p>
        A page that names one agent uses <code>Person</code>: the name, the job, the brokerage as{" "}
        <code>worksFor</code>, and the profile URLs the page already shows. The{" "}
        <Link href="/person-schema-generator">Person schema generator</Link> builds that script. This guide does not
        print a personal name. A team name is an Organization. The homepage can use the{" "}
        <Link href="/organization-schema-generator">Organization schema generator</Link>. A photo that shows a credit
        or a license uses the <Link href="/image-object-schema-generator">ImageObject schema generator</Link>.
      </p>

      <h2>One URL per listing</h2>
      <p>
        Put the question in a heading and the answer in the first text the server sends. The answer is the address,
        the status the page is allowed to state, and the price when the page shows a price. A hero image is not that
        answer. Say whether the page is a public listing, a rental, or a sold record, and leave out a status the page
        does not show. A coming-soon page that is not public does not belong in the sitemap.
      </p>
      <p>
        <a href={singleFamily}>schema.org SingleFamilyResidence</a>, read on 21 October 2026, is a single-family home.
        The page lists <code>address</code>, <code>numberOfBedrooms</code>, <code>numberOfBathroomsTotal</code>,{" "}
        <code>numberOfRooms</code>, <code>floorSize</code>, and <code>yearBuilt</code>.{" "}
        <code>numberOfRooms</code> excludes bathrooms and closets. <code>numberOfBathroomsTotal</code> is the integer
        sum of bathrooms, and schema.org’s note says two full bathrooms and one half bathroom is 3.{" "}
        <a href={apartment}>schema.org Apartment</a>, read the same day, is a self-contained housing unit that occupies
        only part of a building. Use the type the page names. A house is not an Apartment. An apartment is not a
        SingleFamilyResidence.
      </p>
      <pre className={preClass}>{listingExample}</pre>
      <p>
        That block is an example, not a house. The bedroom and bathroom counts are there only because the example page
        would show them. Leave a count out when the page does not state it. schema.org’s SingleFamilyResidence page
        does not list <code>offers</code>. This guide does not put a price on the residence, and it does not tell you
        to mark the house up as a Product so a price can sit on an Offer. The price stays in the HTML the server
        sends. If the page stops showing a price, the HTML stops showing it too. A tour URL is schema.org’s{" "}
        <code>tourBookingPage</code>. Add it by hand only when the listing page shows that URL.
      </p>
      <p>
        Each public service the company sells, such as property management, is its own URL. <code>Service</code> is
        the schema.org type for that page. <code>provider</code> is the company. <code>areaServed</code> is the place
        the page names. <code>offers</code> belongs only when the page shows a price and a currency.
      </p>
      <pre className={preClass}>{serviceExample}</pre>
      <p>
        The <Link href="/service-schema-generator">Service schema generator</Link> copies that shape in the browser.
        One service per page. Questions the company itself answers, visible on the page, can use the{" "}
        <Link href="/faq-schema-generator">FAQ schema generator</Link>. Google stopped showing FAQ rich results in May
        2026. Other types are on the <Link href="/schema-markup-for-ai-search">schema guide</Link>.
      </p>

      <h2>Reviews</h2>
      <p>
        Google’s local business documentation recommends <code>review</code> and <code>aggregateRating</code> only for
        sites that capture reviews about other businesses. A brokerage marking up its own stars is outside that
        recommendation. Leave both properties off the office script. The local business generator already leaves them
        off. A page that shows reviews of a product or an app uses the{" "}
        <Link href="/review-schema-generator">Review schema generator</Link>, which does not write LocalBusiness. A
        star count copied from a portal into JSON-LD, when the office page does not show those reviews, describes a
        rating the reader cannot see.
      </p>

      <h2>Local signals</h2>
      <p>
        The office page, the JSON-LD, and Google Business Profile are three records of one place. Google’s optimization
        guide says Business Profile information can be included in AI responses and in other Google Search results.
        Use the same name, street, and phone in all three. A suite number on the profile and a different suite on the
        site is two addresses. Hours belong in <code>openingHoursSpecification</code> only when the page shows those
        hours.
      </p>
      <p>
        Each office is its own <code>RealEstateAgent</code>. A team that shares the address and the phone is a page on
        the site, not a second location. Google’s <code>department</code> property is for a nested unit with its own
        phone or hours. A listing address is a different place. It does not go in the office script. The profile is
        not a substitute for the HTML. A page behind a client login is one the crawler does not receive. The longer
        local note is <Link href="/geo-for-local-businesses">GEO for local businesses</Link>.
      </p>

      <h2>robots.txt for the search crawlers</h2>
      <p>
        Give each token its own group when <code>User-agent: *</code> already disallows the host. The token list is{" "}
        <Link href="/robots-txt-for-ai-crawlers">robots.txt for AI crawlers</Link>, and the copy-paste file is the{" "}
        <Link href="/robots-txt-ai-crawler-generator">robots.txt generator</Link>. An Allow line can still sit behind a
        firewall 403. A client portal, an owner document, a draft listing, and any page that is not public stay
        disallowed. The public office page and the public listing page have to be allowed if you want them fetched.
      </p>

      <h2>llms.txt is a reading list</h2>
      <p>
        <a href={spec}>The llms.txt proposal</a>, v2, updated 10 August 2026 and read on 21 October 2026, is an optional
        Markdown file, usually at <code>/llms.txt</code>. The H1 is the only required section. Google’s optimization
        guide says Google Search ignores the file, so it neither helps nor harms AI Overviews, AI Mode, or other
        Google Search rankings. A missing file is not a block, and a present file is not a citation.
      </p>
      <p>
        For a brokerage, link the homepage, each office, the public service pages, and the public listings you want
        read. Use canonical URLs. Leave out the client portal, owner names, and any page that asks the reader to sign
        in. Do not paste an entire feed of listings into the file when the site already has a listing URL for each
        one. The proposal says the links should point at a Markdown version of the page when you publish one. Until
        you do, link the public HTML URL. Section order and the mistakes that break a read of the spec are on{" "}
        <Link href="/llms-txt-best-practices">llms.txt best practices</Link>. The{" "}
        <Link href="/llms-txt-generator">llms.txt generator</Link> copies a starter file in the browser. The{" "}
        <Link href="/llms-txt">checker</Link> only looks for a non-empty file.
      </p>
      <pre className={preClass}>{llmsExample}</pre>

      <h2>What you can measure</h2>
      <p>
        Google’s optimization guide tells a site owner to use the Generative AI performance report in Search Console
        for AI Overviews and AI Mode on Google Search. CiteScore does not read Search Console. AI Mode uses the same
        eligibility as AI Overviews, on{" "}
        <Link href="/google-ai-mode-optimization">Google AI Mode optimization</Link>. Meeting the indexing rules does
        not guarantee indexing.
      </p>

      <h2>A workable order</h2>
      <ol>
        <li>Publish one office URL with the name, street, phone, and hours in the HTML, and the same facts on the Business Profile.</li>
        <li>Add RealEstateAgent JSON-LD from those visible facts. Leave reviews, ratings, and listing addresses off that script.</li>
        <li>Publish one URL per listing. State the address, the status, and the price in text. Use SingleFamilyResidence or Apartment only for the type the page is. Leave counts the page does not show out of the script.</li>
        <li>Publish one URL per management service. Add Service markup from that page.</li>
        <li>Publish a Person page only for an agent the site names, and link it from the office page.</li>
        <li>Allow OAI-SearchBot, PerplexityBot, and Googlebot on the public pages. Decide GPTBot and Google-Extended separately. Keep portals, owner documents, and drafts disallowed.</li>
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
            OAI-SearchBot, and it does not query an answer engine. For an office or listing URL, use the{" "}
            <Link href="/geo-audit">$39 GEO audit</Link>. The homepage check does not open that path.
          </>
        }
      />

      <h2>Questions about real estate visibility</h2>
      {realEstateFaqs.map((item) => (
        <div key={item.q}>
          <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={realEstateAgent}>schema.org RealEstateAgent</a>, read 21 October 2026. A real-estate agent, and a
          LocalBusiness.
        </li>
        <li>
          <a href={singleFamily}>schema.org SingleFamilyResidence</a>, read 21 October 2026. A single-family home.
          Address, room counts, floor size, and year built. No offers property on that page.
        </li>
        <li>
          <a href={apartment}>schema.org Apartment</a>, read 21 October 2026. A self-contained unit that occupies part
          of a building.
        </li>
        <li>
          <a href={localBusiness}>Local business structured data</a>, read 21 October 2026. Required name and address,
          the most specific subtype, and the review limit.
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
