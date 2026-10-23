import Link from "next/link";
import { GuideOffers } from "@/components/articles/GuideOffers";
import { preClass } from "@/components/articles/guide-links";

const insuranceAgency = "https://schema.org/InsuranceAgency";
const financialService = "https://schema.org/FinancialService";
const fees = "https://schema.org/feesAndCommissionsSpecification";
const areaServed = "https://schema.org/areaServed";
const serviceType = "https://schema.org/Service";
const localBusiness =
  "https://developers.google.com/search/docs/appearance/structured-data/local-business";
const gallery = "https://developers.google.com/search/docs/appearance/structured-data/search-gallery";
const aiGuide = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";
const sdPolicies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";
const reviewDocs = "https://developers.google.com/search/docs/appearance/structured-data/review-snippet";
const searchUpdates = "https://developers.google.com/search/updates";
const spec = "https://llmstxt.org/";

const officeExample = `{
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  "name": "Example Insurance",
  "url": "https://example.com/offices/springfield",
  "telephone": "+1-555-010-0216",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "40 Market Street",
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
  "name": "Example home policy review",
  "serviceType": "Home policy review",
  "description": "A review of a home policy the Springfield office already describes. Example markup only. This is not a quote, and it is not a coverage decision.",
  "url": "https://example.com/services/home-policy-review",
  "provider": {
    "@type": "Organization",
    "name": "Example Insurance",
    "url": "https://example.com/offices/springfield"
  },
  "areaServed": "Springfield"
}`;

const llmsExample = `# Example Insurance

> Example Insurance is one insurance agency in Springfield, Illinois. This file is an example.

## Office

- [Springfield](https://example.com/offices/springfield): The name, address, phone, and hours on that page

## Services

- [Home policy review](https://example.com/services/home-policy-review): The review the page describes, and the Springfield office named there

## Optional

- [News](https://example.com/news): Agency announcements a reader can skip`;

export const insuranceAgentFaqs = [
  {
    q: "Does InsuranceAgency schema get an insurance agency cited by ChatGPT, Perplexity, or AI Overviews?",
    a: "No. schema.org describes InsuranceAgency as an insurance agency. It is a FinancialService, which is a financial services business and a LocalBusiness. schema.org does not define a type named InsuranceAgent. Google’s local business documentation says name and address are required for a local business rich result, and that Google does not guarantee the feature will show. Google’s optimization guide, read on 23 October 2026, says structured data is not required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features. None of those pages publishes a citation rate for insurance agencies or insurance agents. The script has to match the visible page. This page is not insurance, licensing, or legal advice.",
  },
  {
    q: "When should the page be InsuranceAgency, and when a service, a person, or a carrier page?",
    a: "Use InsuranceAgency for one public page about the agency office, with the name and the address the page shows. FinancialService is the parent type. Use it, or LocalBusiness, when the page is a financial business and InsuranceAgency does not fit. AccountingService, BankOrCreditUnion, and Attorney are different types. There is no InsuranceAgent type. Use Person on the page that names one person the site already credits. Use Organization for a homepage that is not one street address. Use Service on the page for one offer the site actually publishes, such as a home policy review or a commercial lines page, with the place the page names in areaServed. A carrier’s corporate page is not the agency. A city page that only swaps the city name is not another InsuranceAgency, and it is not another Service. Do not mark a customer’s policy, a quote, or a claim file as the business.",
  },
  {
    q: "Does a review star, a license line, a carrier logo, or llms.txt put an agency into ChatGPT or AI Overviews?",
    a: "No. The same name, the same phone, and the same address, when you publish an address, make one record an assistant can match. They do not create a citation. A license number helps only when the page already shows that number and the jurisdiction that issued it. This page does not say which license an agency or an agent must hold. A carrier name helps only when the page already lists that appointment. Google’s local business page recommends review and aggregateRating only for sites that capture reviews about other businesses. An agency marking up its own stars is outside that recommendation. The stars do not create a citation. The llms.txt proposal is a Markdown reading list. Google’s optimization guide says Google Search ignores special AI text files, including llms.txt, so the file neither helps nor harms AI Overviews or AI Mode. A missing file is not a block, and a present file is not a citation. Google-Extended, which covers Gemini Apps, is a separate robots.txt choice from whether Search includes the site in AI Overviews.",
  },
  {
    q: "Does the free check query ChatGPT, Perplexity, or Google AI Overviews, or open a customer file?",
    a: "No. The free check reads the homepage, robots.txt for GPTBot, PerplexityBot, and Google-Extended, a non-empty llms.txt, a sitemap, and JSON-LD types on the homepage. It does not read OAI-SearchBot, it does not log into an answer engine or Search Console, and it does not open quotes, applications, policy documents, or a client login. The $39 audit scores one public URL from the HTML we fetch. The per-engine snapshot is an inference, and the report says so. An office URL or a service URL is outside the homepage check. CiteScore does not give insurance, licensing, or legal advice.",
  },
];

export function AiSearchVisibilityForInsuranceAgentsArticle() {
  return (
    <>
      <p>
        An insurance agency is cited when an answer engine can fetch a page and find a sentence that states the
        agency, the line of coverage, the place served, or the limit of that page. ChatGPT search, Perplexity search,
        and Google AI Overviews each publish a crawler or indexing control. None of those pages publishes a citation
        rate for insurance agencies, a required word count, or a schema type that turns a homepage into a footnote.
        CiteScore does not log into those products, and it does not give insurance, licensing, or legal advice. It does
        not say which license a business must hold, which carrier to name, or what a policy will pay. The work here is
        how those products pick a source, the office record, one URL per line the site actually publishes, the person
        the page already names, the hours a person can already read, <code>robots.txt</code>, and <code>llms.txt</code>{" "}
        as a reading list.
      </p>
      <p>
        The local markup rules are on <Link href="/geo-for-local-businesses">GEO for local businesses</Link>. The
        engine pages are <Link href="/how-to-get-cited-by-chatgpt">ChatGPT</Link>,{" "}
        <Link href="/how-to-get-cited-by-perplexity">Perplexity</Link>, and{" "}
        <Link href="/google-ai-overviews-optimization">Google AI Overviews</Link>. An accounting firm’s office is on{" "}
        <Link href="/ai-search-visibility-for-accountants">AI search visibility for accountants</Link>. A law firm’s
        office page is on <Link href="/ai-search-visibility-for-law-firms">AI search visibility for law firms</Link>. A
        brokerage, an agent, or a property manager is on{" "}
        <Link href="/ai-search-visibility-for-real-estate">AI search visibility for real estate</Link>, and the office
        script is the{" "}
        <Link href="/real-estate-agent-schema-generator">Real estate agent schema generator</Link>. A plumbing
        business’s office, service area, hours, and services are on the{" "}
        <Link href="/plumber-schema-generator">Plumber schema generator</Link>, and the longer note is{" "}
        <Link href="/ai-search-visibility-for-plumbers">AI search visibility for plumbers</Link>. An electrical
        contractor’s shop, service area, hours, and license number are on the{" "}
        <Link href="/electrician-schema-generator">Electrician schema generator</Link>. A veterinary clinic is not an
        insurance office. That case is{" "}
        <Link href="/ai-search-visibility-for-veterinarians">AI search visibility for veterinarians</Link>. A chiropractic
        office’s pages are on{" "}
        <Link href="/ai-search-visibility-for-chiropractors">AI search visibility for chiropractors</Link>. A health
        insurance page is not a clinic. That case is{" "}
        <Link href="/ai-search-visibility-for-healthcare">AI search visibility for healthcare</Link>.
      </p>

      <h2>How an assistant picks a source</h2>
      <p>
        An assistant can quote a page it is allowed to fetch, when that page states the fact in a sentence. Blocking
        the search crawler keeps the site out of that product’s answers. Allowing the crawler does not promise a
        citation. There is no published rate for how often an agency, an office, or a line of coverage is named.
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
        abuse policy. A folder of city pages that only swap the city name is that pattern. A folder of “cheap insurance
        near me” pages that only swap the product name is the same pattern. Write the offices, the places, and the
        lines the site actually offers.
      </p>
      <p>
        A directory, a carrier page, or a review site can be the page an answer quotes. You can keep one agency name
        so a mention and your H1 match. You cannot edit their page from your deploy. To see whether ChatGPT names the
        agency, repeat the same prompts and keep a log, as on{" "}
        <Link href="/how-to-check-if-chatgpt-mentions-your-brand">how to check if ChatGPT mentions your brand</Link>.
        The free check does not run those prompts.
      </p>

      <h2>InsuranceAgency for the office</h2>
      <p>
        <a href={insuranceAgency}>schema.org InsuranceAgency</a>, read on 23 October 2026, is an insurance agency. It
        is a <a href={financialService}>FinancialService</a>. That type, read the same day, is a financial services
        business, and it is a LocalBusiness. Use InsuranceAgency for the page about the agency office. Use{" "}
        <code>FinancialService</code> or <code>LocalBusiness</code> when the page is a financial business and
        InsuranceAgency does not fit. Do not use <code>AccountingService</code>, <code>BankOrCreditUnion</code>, or{" "}
        <code>Attorney</code> for a page that is an insurance office. schema.org/InsuranceAgent, requested on 23
        October 2026, is not a type page. A page that names one person uses <code>Person</code>. Use{" "}
        <code>Organization</code> for a homepage that is not one street address.
      </p>
      <p>
        Google’s <a href={localBusiness}>local business documentation</a>, read on 23 October 2026, says to use the
        most specific subtype. Its examples are Restaurant, DaySpa, and HealthClub. It does not name InsuranceAgency.
        The subtype still applies when the page is an insurance agency, because that is a LocalBusiness subtype
        schema.org defines. The same Google page requires <code>name</code> and <code>address</code> for a local
        business rich result. Recommended fields, when the page shows them, include <code>geo</code> to at least five
        decimal places, <code>openingHoursSpecification</code>, <code>telephone</code> with country code and area code,
        and the <code>url</code> of that office. Google does not guarantee that the panel or the list will show. If
        the page does not show a street address, do not invent one to qualify. Google’s{" "}
        <a href={gallery}>structured data gallery</a>, read on 23 October 2026, lists Local business. It does not list
        a separate insurance rich result.
      </p>
      <p>
        <a href={fees}>schema.org feesAndCommissionsSpecification</a>, read on 23 October 2026, is a description of
        fees, commissions, and other terms applied either to a class of financial product, or by a financial service
        organization. The expected types are Text and URL. InsuranceAgency can carry it because InsuranceAgency is a
        FinancialService. Add it by hand only when the page already shows that fee, that commission, or those terms,
        as the text itself or as a URL to that statement. A percentage the page does not publish, and a premium the
        page does not show, are not that property. This guide does not write the property, and the local business
        generator does not write it either.
      </p>
      <pre className={preClass}>{officeExample}</pre>
      <p>
        That block is an example, not an agency. <a href={sdPolicies}>Google’s structured data policies</a> say the
        markup has to describe content people can see. The example does not include{" "}
        <code>feesAndCommissionsSpecification</code>, <code>review</code>, or <code>aggregateRating</code>. The{" "}
        <Link href="/local-business-schema-generator">Local business schema generator</Link> already lists
        InsuranceAgency. It copies the name, the address, the phone, the hours as{" "}
        <code>openingHoursSpecification</code>, and optional geo into one script in the browser. It does not write{" "}
        <code>areaServed</code>, <code>feesAndCommissionsSpecification</code>, <code>priceRange</code>, or the text
        property <code>openingHours</code>. It does not emit <code>review</code> or <code>aggregateRating</code>. The
        address in that script is the office. It is not a customer’s home, and it is not a carrier’s headquarters. A
        plumbing business is a different script, on the{" "}
        <Link href="/plumber-schema-generator">Plumber schema generator</Link>. An electrical contractor is a different
        script, on the <Link href="/electrician-schema-generator">Electrician schema generator</Link>.
      </p>
      <p>
        <a href={areaServed}>schema.org areaServed</a> is the geographic area where a service or offered item is
        provided. It supersedes <code>serviceArea</code>. Add it by hand on the InsuranceAgency script only when the
        page names the places served. A list of every city you hope to rank for is not that property. A page that
        names one person the site already credits uses <code>Person</code>. The{" "}
        <Link href="/person-schema-generator">Person schema generator</Link> builds that script. This guide does not
        print a personal name. A group homepage that is not one office can use the{" "}
        <Link href="/organization-schema-generator">Organization schema generator</Link>. A photo that shows a credit
        or a license for the file uses the{" "}
        <Link href="/image-object-schema-generator">ImageObject schema generator</Link>. An auto policy page is not an
        auto repair shop. That case is{" "}
        <Link href="/ai-search-visibility-for-auto-repair">AI search visibility for auto repair</Link>.
      </p>

      <h2>One URL per line the site publishes</h2>
      <p>
        A home policy review, a personal auto page, a life page, and a commercial lines page are different offers when
        the site publishes them as different pages. Put the name of the work, who it is for, and the place it covers
        in the first sentences. Say what the meeting or the review includes, and say what it does not include, when
        the page is willing to state that limit. A premium that depends on an application is not a fixed price. Leave
        the price off the script when the page does not show one. This guide does not say which lines an agency should
        offer, and it does not compare carriers.
      </p>
      <p>
        A page that only swaps the product name, or only swaps the city name, is the scaled-content pattern in
        Google’s optimization guide. Leave that page unpublished. A draft city page does not belong in the sitemap. Do
        not mark the city page as a second InsuranceAgency with a made-up street address. The office address, when you
        publish one, stays the address on the office page. The service area stays the places the page names.
      </p>
      <pre className={preClass}>{serviceExample}</pre>
      <p>
        <a href={serviceType}>schema.org Service</a> is that offer. <code>serviceType</code> is the short name.{" "}
        <code>provider</code> points at the office page. <code>areaServed</code> is the place the page names. The{" "}
        <Link href="/service-schema-generator">Service schema generator</Link> copies that shape in the browser. One
        service per page. A second service is a second URL. Do not stuff every line of coverage into the first script.
        Do not mark a carrier’s product as a Service the agency provides unless the page is the agency’s own page
        about that offer. A page of questions the agency already answers can use the{" "}
        <Link href="/faq-schema-generator">FAQ schema generator</Link> for those visible pairs.
      </p>

      <h2>The person the page already names</h2>
      <p>
        A page about one person is a Person, not a second copy of the office. The person generator writes{" "}
        <code>jobTitle</code>, <code>worksFor</code>, and <code>knowsAbout</code> when you enter them. Use{" "}
        <code>worksFor</code> for the agency the page already names. Use <code>knowsAbout</code> for a topic the bio
        already states, such as personal lines, when those words are on the page. Do not use it as a list of every
        product the office hopes to rank for. This guide does not print a personal name.
      </p>
      <p>
        If the page shows a license number, repeat the number and the jurisdiction in a sentence a person can read. Do
        not add a number the page does not show. A license is not a citation, and this guide does not say which one an
        agency or a person must hold. If the page lists carriers the office is appointed with, keep that list in the
        HTML. Do not add a carrier the page does not name. A carrier logo is not <code>sameAs</code> for the agency
        unless that URL is a profile the agency controls.
      </p>

      <h2>The name, the address, and the phone</h2>
      <p>
        The office page, the JSON-LD, and Google Business Profile are three records of one place. Google’s
        optimization guide says Business Profile information can be included in AI responses and in other Google Search
        results. Use the same name, the same phone, and, when you publish one, the same street. A second phone belongs
        in the script only when the page shows it. If the page says the office is open weekdays and a different line
        answers after hours, do not mark the office as open all night. The hours in{" "}
        <code>openingHoursSpecification</code> are the hours a person can read. A profile category does not write the
        JSON-LD, and the JSON-LD does not edit the profile.
      </p>
      <p>
        Google’s local business page recommends <code>review</code> and <code>aggregateRating</code> only for sites
        that capture reviews about other local businesses. Google’s{" "}
        <a href={reviewDocs}>review snippet guidelines</a> are the same limit. Leave both properties off the
        InsuranceAgency script. The stars an agency shows about its own work do not become a rich result by being
        copied into JSON-LD, and they do not create a citation. A page that shows reviews of a product or an app uses
        the <Link href="/review-schema-generator">Review schema generator</Link>, which does not write LocalBusiness.
      </p>

      <h2>Questions the page already answers</h2>
      <p>
        The useful questions are the ones the agency already answers in public: which places it serves, which lines it
        writes, whether a first meeting is at the office or by phone, and what a caller should bring when the page
        says so. Put the question and the answer in HTML. FAQ markup is optional, and only for those visible pairs.
        Google’s <a href={searchUpdates}>Search updates</a>, read on 23 October 2026, say the FAQ rich result is no
        longer shown, as announced in the changelog entry for 7 May 2026. The documentation for that feature was
        removed afterward. The markup does not bring the accordion back, and it does not create a citation.
      </p>
      <p>
        Do not add a page that tells a reader which policy to buy, which claim to file, or which exclusion to ignore.
        The sentence an assistant should be able to quote, when the agency is willing to say it, is what the office
        does and where it does it. If that sentence is not on the page, do not hide it in the script. This guide does
        not describe a coverage decision.
      </p>

      <h2>Customer files stay out</h2>
      <p>
        Quotes, applications, policy documents, claim numbers, and a client login are not public source pages.
        Disallow them in <code>robots.txt</code>, leave them out of the sitemap, and do not link them from{" "}
        <code>llms.txt</code>. A portal URL that only works after a login is not a page an answer engine can cite. A
        quote form that posts to a carrier can stay on a public page when the page itself is public. The filled
        application is not that page.
      </p>

      <h2>robots.txt for the search crawlers</h2>
      <p>
        Allow OAI-SearchBot, PerplexityBot, and Googlebot on the public office and service pages if you want those
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
        For an agency, link the homepage, the public office page, and the public services you want read. Use canonical
        URLs. Link a city page only when that page states a distinct fact. Leave out quotes, applications, policy
        documents, claim numbers, customer names, and any page that asks the reader to sign in. Do not paste every
        city when the site already has one service URL. Section order and the mistakes that break a read of the spec
        are on <Link href="/llms-txt-best-practices">llms.txt best practices</Link>. The{" "}
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
        <li>Publish one office URL with the name, the phone, the hours, and the street if you show one, and the same facts on the Business Profile.</li>
        <li>Add InsuranceAgency JSON-LD from those visible facts. Leave the street out when the page does not show one. Leave reviews, ratings, and unpublished fees off that script. Do not invent an InsuranceAgent type.</li>
        <li>Publish one URL per line the site actually offers. State the work and the place in text. Point the service script at that URL, with areaServed set to the place the page names.</li>
        <li>Publish a person URL only for a person the site already names. Repeat the license the page already shows, with the jurisdiction. Repeat a carrier only when the page already names that appointment.</li>
        <li>Publish a city or county page only when it states a distinct fact. Do not swap the city name, or the product name, across an otherwise identical page.</li>
        <li>Allow OAI-SearchBot, PerplexityBot, and Googlebot on the public pages. Decide GPTBot and Google-Extended separately. Keep quotes, applications, policy files, and drafts disallowed.</li>
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

      <h2>Questions about insurance agency visibility</h2>
      {insuranceAgentFaqs.map((item) => (
        <div key={item.q}>
          <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={insuranceAgency}>schema.org InsuranceAgency</a>, read 23 October 2026. An insurance agency. It is a
          FinancialService. There is no type named InsuranceAgent.
        </li>
        <li>
          <a href={financialService}>schema.org FinancialService</a>, read 23 October 2026. A financial services
          business. A LocalBusiness.
        </li>
        <li>
          <a href={fees}>schema.org feesAndCommissionsSpecification</a>, read 23 October 2026. Fees, commissions, and
          other terms, as text or as a URL. Defined on FinancialService.
        </li>
        <li>
          <a href={areaServed}>schema.org areaServed</a>, read 23 October 2026. The geographic area where a service or
          offered item is provided. It supersedes serviceArea.
        </li>
        <li>
          <a href={localBusiness}>Local business structured data</a>, read 23 October 2026. Required name and address,
          the most specific subtype, hours, telephone, and the review limit.
        </li>
        <li>
          <a href={reviewDocs}>Review snippet structured data</a>, read 23 October 2026. Self-serving reviews are
          outside the star feature. The local business page limits review and aggregateRating to sites that capture
          reviews about other businesses.
        </li>
        <li>
          <a href={gallery}>Structured data gallery</a>, read 23 October 2026. Local business is listed. A separate
          insurance rich result is not.
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
