import Link from "next/link";
import { GuideOffers } from "@/components/articles/GuideOffers";
import { preClass } from "@/components/articles/guide-links";

const accountingService = "https://schema.org/AccountingService";
const financialService = "https://schema.org/FinancialService";
const fees = "https://schema.org/feesAndCommissionsSpecification";
const serviceType = "https://schema.org/Service";
const knowsAbout = "https://schema.org/knowsAbout";
const localBusiness =
  "https://developers.google.com/search/docs/appearance/structured-data/local-business";
const gallery = "https://developers.google.com/search/docs/appearance/structured-data/search-gallery";
const aiGuide = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";
const sdPolicies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";
const reviewDocs = "https://developers.google.com/search/docs/appearance/structured-data/review-snippet";
const spec = "https://llmstxt.org/";

const officeExample = `{
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "name": "Example Accounting",
  "url": "https://example.com/offices/springfield",
  "telephone": "+1-555-010-0188",
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
    "opens": "09:00",
    "closes": "17:00"
  }
}`;

const serviceExample = `{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Example bookkeeping",
  "serviceType": "Bookkeeping",
  "description": "Monthly bookkeeping for businesses in Illinois. Example markup only.",
  "url": "https://example.com/services/bookkeeping",
  "provider": {
    "@type": "Organization",
    "name": "Example Accounting",
    "url": "https://example.com"
  },
  "areaServed": "Illinois"
}`;

const llmsExample = `# Example Accounting

> Example Accounting is one accounting firm in Springfield, Illinois. This file is an example.

## Offices

- [Springfield](https://example.com/offices/springfield): The name, address, phone, and hours on that page

## Services

- [Bookkeeping](https://example.com/services/bookkeeping): The work the page describes, and the Illinois limit stated there

## Optional

- [News](https://example.com/news): Firm announcements a reader can skip`;

export const accountantFaqs = [
  {
    q: "Does AccountingService schema get a firm cited by ChatGPT, Perplexity, or AI Overviews?",
    a: "No. schema.org describes AccountingService as an accountancy business, and it is a FinancialService and a LocalBusiness. Google’s local business documentation says name and address are required for a local business rich result, and that Google does not guarantee the feature will show. Google’s optimization guide, read on 22 October 2026, says structured data is not required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features. None of those pages publishes a citation rate for accounting firms, CPA firms, or bookkeepers. The script has to match the visible page. This page is not tax, accounting, or legal advice.",
  },
  {
    q: "When should the page be AccountingService, and when a service or a person?",
    a: "Use AccountingService for one public office that is an accountancy business. FinancialService is the parent type. ProfessionalService is broader. Organization fits a firm homepage that is not one street address. Use Service on the page for one offer the site actually publishes, such as bookkeeping or tax preparation, with the place the page names in areaServed. Use Person on the page that names one accountant. Do not mark the client portal, a tax return, or a city page that only swaps the city name as another AccountingService.",
  },
  {
    q: "Does llms.txt or a review star put a firm into ChatGPT or AI Overviews?",
    a: "No. The llms.txt proposal is a Markdown reading list. Google’s optimization guide says Google Search ignores special AI text files, including llms.txt, so the file neither helps nor harms AI Overviews or AI Mode. A missing file is not a block, and a present file is not a citation. Google’s local business page recommends review and aggregateRating only for sites that capture reviews about other businesses. A firm marking up its own stars is outside that recommendation. The stars do not create a citation.",
  },
  {
    q: "Does the free check query ChatGPT, Perplexity, or Google AI Overviews, or open the client portal?",
    a: "No. The free check reads the homepage, robots.txt for GPTBot, PerplexityBot, and Google-Extended, a non-empty llms.txt, a sitemap, and JSON-LD types on the homepage. It does not read OAI-SearchBot, and it does not log into an answer engine, Search Console, or a client portal. The $39 audit scores one public URL from the HTML we fetch. The per-engine snapshot is an inference, and the report says so. An office URL or a service URL is outside the homepage check.",
  },
];

export function AiSearchVisibilityForAccountantsArticle() {
  return (
    <>
      <p>
        An accounting firm, a CPA firm, or a bookkeeping practice is cited when an answer engine can fetch a page and
        find a sentence that states the office, the service, the place served, or the limit of that page. ChatGPT
        search, Perplexity search, and Google AI Overviews each publish a crawler or indexing control. None of those
        pages publishes a citation rate for accountants, a required word count, or a schema type that turns a homepage
        into a footnote. CiteScore does not log into those products. This page is not tax, accounting, or legal advice.
        It does not say which credential a firm must hold. The work here is how those products pick a source, the
        office record, one URL per service, the person the page already names, fees the page already shows,{" "}
        <code>robots.txt</code>, and <code>llms.txt</code> as a reading list.
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
        <Link href="/ai-search-visibility-for-real-estate">AI search visibility for real estate</Link>. A restaurant’s
        location, menu, and hours are on{" "}
        <Link href="/ai-search-visibility-for-restaurants">AI search visibility for restaurants</Link>. A store’s price
        problem is on <Link href="/ai-search-visibility-for-ecommerce">AI search visibility for ecommerce</Link>. A
        software company’s comparison page is on{" "}
        <Link href="/ai-search-visibility-for-b2b-saas">AI search visibility for B2B SaaS</Link>. A dental
        practice’s office, services, and hours are on{" "}
        <Link href="/ai-search-visibility-for-dentists">AI search visibility for dentists</Link>. A plumbing business’s office, service area, and hours are on <Link href="/ai-search-visibility-for-plumbers">AI search visibility for plumbers</Link>. An HVAC company’s office, service area, and hours are on <Link href="/ai-search-visibility-for-hvac">AI search visibility for HVAC</Link>. A roofing contractor’s office, service area, and hours are on <Link href="/ai-search-visibility-for-roofers">AI search visibility for roofers</Link>. An electrical contractor’s shop, service area, and hours are on <Link href="/ai-search-visibility-for-electricians">AI search visibility for electricians</Link>. A landscaping business’s office, service area, and hours are on <Link href="/ai-search-visibility-for-landscapers">AI search visibility for landscapers</Link>.
      </p>

      <h2>How an assistant picks a source</h2>
      <p>
        An assistant can quote a page it is allowed to fetch, when that page states the fact in a sentence. Blocking
        the search crawler keeps the site out of that product’s answers. Allowing the crawler does not promise a
        citation. There is no published rate for how often a firm, a CPA, or a bookkeeping service is named.
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
        Google’s <a href={aiGuide}>optimization guide</a>, read on 22 October 2026, says structured data is not
        required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features.
        The same guide says a unique page does more over time than a commodity summary, and that a separate URL for
        every query variation, written to manipulate rankings or generative AI responses, violates the scaled content
        abuse policy. A folder of city pages that only swap the city name is that pattern. A folder of “CPA near me”
        pages that only swap the neighborhood name is the same pattern. Write the offices, the services, and the
        places the site actually serves.
      </p>
      <p>
        A directory, a review site, or a primary source such as a statute or an agency page can be the page an answer
        quotes. You can keep one firm name so a mention and your H1 match. You cannot edit their page from your
        deploy. To see whether ChatGPT names the firm, repeat the same prompts and keep a log, as on{" "}
        <Link href="/how-to-check-if-chatgpt-mentions-your-brand">how to check if ChatGPT mentions your brand</Link>.
        The free check does not run those prompts.
      </p>

      <h2>AccountingService for the office</h2>
      <p>
        <a href={accountingService}>schema.org AccountingService</a>, read on 22 October 2026, is an accountancy
        business. As a LocalBusiness it can be described as a provider of one or more services. It is a{" "}
        <a href={financialService}>FinancialService</a>. Use it for the page about one public office that is an
        accounting, CPA, or bookkeeping firm. Use <code>FinancialService</code> when the page is a financial business
        and AccountingService does not fit. Use <code>ProfessionalService</code> when the page is a professional office
        and neither of those fits. Use <code>Organization</code> for a firm homepage that is not one street address.
        Do not use <code>LegalService</code> or <code>Attorney</code> for an accounting office. Google’s{" "}
        <a href={localBusiness}>local business documentation</a>, read on 22 October 2026, says to use the most specific
        subtype. Its examples are Restaurant, DaySpa, and HealthClub. It does not name AccountingService. The subtype
        still applies, because that is the type schema.org defines for this business.
      </p>
      <p>
        That same Google page requires <code>name</code> and <code>address</code> for a local business rich result.
        Recommended fields, when the page shows them, include <code>geo</code> to at least five decimal places,{" "}
        <code>openingHoursSpecification</code>, <code>telephone</code> with country code and area code, and the{" "}
        <code>url</code> of that office. Google does not guarantee that the panel or the list will show. Google’s{" "}
        <a href={gallery}>structured data gallery</a>, read on 22 October 2026, lists Local business. It does not list
        a separate accounting rich result.
      </p>
      <pre className={preClass}>{officeExample}</pre>
      <p>
        That block is an example, not a firm. <a href={sdPolicies}>Google’s structured data policies</a> say the markup
        has to describe content people can see. The{" "}
        <Link href="/local-business-schema-generator">Local business schema generator</Link> already lists
        AccountingService. It copies the name, the address, the phone, the hours, and optional geo into one script in
        the browser. It does not emit <code>feesAndCommissionsSpecification</code>, <code>review</code>, or{" "}
        <code>aggregateRating</code>. The address in that script is this office. It is not the street of a second
        office.
      </p>
      <p>
        <a href={fees}>schema.org feesAndCommissionsSpecification</a> is the FinancialService property for a
        description of fees, commissions, and other terms. Add it by hand on the office script only when the page shows
        that text. A fee the page does not show does not belong there. A page that names one person, such as the
        accountant the site already credits, uses <code>Person</code>. The{" "}
        <Link href="/person-schema-generator">Person schema generator</Link> builds that script. This guide does not
        print a personal name. A group homepage that is not one office can use the{" "}
        <Link href="/organization-schema-generator">Organization schema generator</Link>. A photo that shows a credit
        or a license uses the <Link href="/image-object-schema-generator">ImageObject schema generator</Link>. A dataset
        the firm publishes, on its own URL, uses the{" "}
        <Link href="/dataset-schema-generator">Dataset schema generator</Link>. A film the firm publishes, on its own
        URL, uses the <Link href="/movie-schema-generator">Movie schema generator</Link>. A vehicle the firm publishes, on its own
        URL, uses the <Link href="/vehicle-schema-generator">Vehicle schema generator</Link>. A hotel the firm publishes, on its own
        URL, uses the <Link href="/hotel-schema-generator">Hotel schema generator</Link>. A restaurant page uses the <Link href="/restaurant-schema-generator">Restaurant schema generator</Link>. A clinic page uses the <Link href="/medical-clinic-schema-generator">Medical clinic schema generator</Link>. A law office page uses the <Link href="/attorney-schema-generator">Attorney schema generator</Link>. The dataset page is not the
        office, the film page is not the office, the vehicle page is not the office, and the hotel page is not the office.
      </p>

      <h2>One URL per service</h2>
      <p>
        Bookkeeping, tax preparation, payroll, a compilation, a review, an audit, and advisory work are different
        offers when the site publishes them as different pages. Put the name of the work, who it is for, and the place
        it covers in the HTML the server sends. Say the limit the page is willing to state, such as a state or a kind
        of client, and leave out a promise the page does not make. A draft service that is not public does not belong
        in the sitemap.
      </p>
      <p>
        <a href={serviceType}>schema.org Service</a> is that offer. <code>serviceType</code> is the label.{" "}
        <code>provider</code> is the firm. <code>areaServed</code> is the place the page names. The{" "}
        <Link href="/service-schema-generator">Service schema generator</Link> copies that shape. It writes an Offer
        only when you enter both a price and a currency. Do not mark every city as its own Service when the page does
        not describe a different offer. Do not mark the whole firm homepage as one Service that lists every fee.
      </p>
      <pre className={preClass}>{serviceExample}</pre>
      <p>
        A seasonal deadline, on its own URL, can be an event when the page is about that date. The{" "}
        <Link href="/event-schema-generator">Event schema generator</Link> copies that shape. The everyday hours stay
        on the office page. Questions the firm itself answers, visible on the page, can use the{" "}
        <Link href="/faq-schema-generator">FAQ schema generator</Link>. Google stopped showing FAQ rich results in May
        2026. Other types are on the <Link href="/schema-markup-for-ai-search">schema guide</Link>.
      </p>

      <h2>The person the page already names</h2>
      <p>
        A page about one accountant is a Person, not a second copy of the office. The person generator writes{" "}
        <code>jobTitle</code>, <code>worksFor</code>, <code>alumniOf</code>, and <code>knowsAbout</code> when you enter
        them. <a href={knowsAbout}>schema.org knowsAbout</a> is a topic the person or organization is described as
        knowing about. schema.org says it suggests possible expertise and does not imply it. Use it for a topic the
        bio already states. Do not use it as a list of every keyword the firm hopes to rank for.
      </p>
      <p>
        If the page shows a credential, such as CPA, enrolled agent, or a state license, repeat that credential and
        the jurisdiction in a sentence a person can read. Do not add a credential the page does not show. A credential
        is not a citation, and this guide does not say which one a firm must hold. The same sentence should match the
        Google Business Profile name for that person when the firm publishes one. Two different titles for the same
        person are two records an assistant can mix up.
      </p>

      <h2>Fees, jurisdictions, and dates</h2>
      <p>
        A page that explains a rule should name the jurisdiction and the date the firm checked it, and it should link
        the primary source the page already cites. An answer engine can quote that primary source instead of the
        firm’s summary. The firm’s own page can still be the source for what the firm does, where it does it, and
        which clients it accepts. Write that in a sentence. A page that only restates a commodity checklist, with the
        city name swapped, is the pattern Google’s optimization guide calls out.
      </p>
      <p>
        A price belongs in the service script only when the page shows that price. A “free consultation” that is not
        free is a mismatch between the HTML and the JSON-LD. <code>feesAndCommissionsSpecification</code> is text or a
        URL. It is not a second, hidden price. Leave a fee off both the page and the script when the firm is not
        willing to state it.
      </p>

      <h2>Reviews</h2>
      <p>
        Google’s local business documentation recommends <code>review</code> and <code>aggregateRating</code> only for
        sites that capture reviews about other businesses. A firm marking up its own stars is outside that
        recommendation. Leave both properties off the office script. The local business generator already leaves them
        off. Google’s <a href={reviewDocs}>review snippet guidelines</a>, read on 22 October 2026, say the same limit
        for a local business or an organization that controls the reviews about itself. A page that shows reviews of a
        product or an app uses the <Link href="/review-schema-generator">Review schema generator</Link>, which does
        not write LocalBusiness. A star count copied from a review site into JSON-LD, when the office page does not
        show those reviews, describes a rating the reader cannot see.
      </p>

      <h2>The client portal stays out</h2>
      <p>
        A client login, a tax return, an engagement file, and a draft memo are not public pages. Disallow them in{" "}
        <code>robots.txt</code>, leave them out of the sitemap, and do not link them from <code>llms.txt</code>. A
        portal URL that only works after a login is not a page a crawler can quote. The public office page and the
        public service pages have to be allowed if you want them fetched. Confirm the same name, street, phone, and
        hours on the office page and on the Google Business Profile. Google’s optimization guide says Business Profile
        information can be included in AI responses and in other Google Search results.
      </p>

      <h2>robots.txt for the search crawlers</h2>
      <p>
        Give each token its own group when <code>User-agent: *</code> already disallows the host. The token list is{" "}
        <Link href="/robots-txt-for-ai-crawlers">robots.txt for AI crawlers</Link>, and the copy-paste file is the{" "}
        <Link href="/robots-txt-ai-crawler-generator">robots.txt generator</Link>. An Allow line can still sit behind a
        firewall 403. Staff pages and anything that is not public stay disallowed. Decide GPTBot and Google-Extended
        separately from the search crawlers. Blocking the training token does not, by itself, block the search token.
      </p>

      <h2>llms.txt is a reading list</h2>
      <p>
        <a href={spec}>The llms.txt proposal</a>, v2, updated 10 August 2026 and read on 22 October 2026, is an optional
        Markdown file, usually at <code>/llms.txt</code>. The H1 is the only required section. Google’s optimization
        guide says Google Search ignores the file, so it neither helps nor harms AI Overviews, AI Mode, or other
        Google Search rankings. A missing file is not a block, and a present file is not a citation.
      </p>
      <p>
        For a firm, link the homepage, each public office, and the public services you want read. Use canonical URLs.
        Leave out the client portal, draft pages, and any page that asks the reader to sign in. Do not paste client
        names into the file. Do not paste every city when the site already has one service URL. The proposal says the
        links should point at a Markdown version of the page when you publish one. Until you do, link the public HTML
        URL. Section order and the mistakes that break a read of the spec are on{" "}
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
        <li>Publish one office URL with the name, street, phone, and hours in the HTML, and the same facts on the Business Profile.</li>
        <li>Add AccountingService JSON-LD from those visible facts. Add a fee description only when the page shows it. Leave reviews and ratings off that script.</li>
        <li>Publish one URL per service the site actually offers. State the work, the client, and the place in text. Point the service script at that URL.</li>
        <li>Publish a person URL only for an accountant the site already names. Repeat the credential the page already shows, with the jurisdiction.</li>
        <li>Allow OAI-SearchBot, PerplexityBot, and Googlebot on the public pages. Decide GPTBot and Google-Extended separately. Keep the portal, drafts, and client files disallowed.</li>
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
            OAI-SearchBot, and it does not query an answer engine. For an office or service URL, use the{" "}
            <Link href="/geo-audit">$39 GEO audit</Link>. The homepage check does not open that path.
          </>
        }
      />

      <h2>Questions about accounting firm visibility</h2>
      {accountantFaqs.map((item) => (
        <div key={item.q}>
          <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={accountingService}>schema.org AccountingService</a>, read 22 October 2026. An accountancy business,
          and a LocalBusiness that can be described as a provider of services.
        </li>
        <li>
          <a href={financialService}>schema.org FinancialService</a>, read 22 October 2026. The parent type.
          feesAndCommissionsSpecification is defined there.
        </li>
        <li>
          <a href={knowsAbout}>schema.org knowsAbout</a>, read 22 October 2026. A topic known about. It suggests
          expertise and does not imply it.
        </li>
        <li>
          <a href={localBusiness}>Local business structured data</a>, read 22 October 2026. Required name and address,
          the most specific subtype, hours, and the review limit.
        </li>
        <li>
          <a href={reviewDocs}>Review snippet structured data</a>, read 22 October 2026. Self-serving reviews of a
          local business or organization are ineligible for the star feature.
        </li>
        <li>
          <a href={gallery}>Structured data gallery</a>, read 22 October 2026. Local business is listed. A separate
          accounting rich result is not.
        </li>
        <li>
          <a href={aiGuide}>Google’s generative AI optimization guide</a>, read 22 October 2026. Snippets, Business
          Profile, <code>llms.txt</code>, schema, and scaled content abuse.
        </li>
        <li>
          <a href={sdPolicies}>Structured data general guidelines</a>, read 22 October 2026. Markup matches the visible
          page.
        </li>
        <li>
          <a href={spec}>The llms.txt proposal</a>, updated 10 August 2026, read 22 October 2026.
        </li>
      </ul>
    </>
  );
}
