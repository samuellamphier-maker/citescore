import Link from "next/link";
import { GuideOffers } from "@/components/articles/GuideOffers";
import { preClass } from "@/components/articles/guide-links";

const legalService = "https://schema.org/LegalService";
const attorney = "https://schema.org/Attorney";
const localBusiness =
  "https://developers.google.com/search/docs/appearance/structured-data/local-business";
const aiGuide = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";
const sdPolicies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";
const spec = "https://llmstxt.org/";

const officeExample = `{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Example Law Firm",
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

const practiceExample = `{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Example estate administration",
  "serviceType": "Estate administration",
  "description": "Counsel for estate administration in Illinois. Example markup only.",
  "url": "https://example.com/practice/estate-administration",
  "provider": {
    "@type": "Organization",
    "name": "Example Law Firm",
    "url": "https://example.com"
  },
  "areaServed": "Illinois"
}`;

const llmsExample = `# Example Law Firm

> Example Law Firm is a law firm with one office in Springfield, Illinois. This file is an example.

## Practice

- [Estate administration](https://example.com/practice/estate-administration): The work the page describes, and the Illinois limit stated there

## Offices

- [Springfield office](https://example.com/offices/springfield): The name, address, phone, and hours on that page

## Optional

- [News](https://example.com/news): Firm announcements an agent can skip`;

export const lawFirmFaqs = [
  {
    q: "Does LegalService schema get a law firm cited by ChatGPT, Perplexity, or AI Overviews?",
    a: "No. schema.org describes LegalService as a business that provides legally-oriented services, such as a law firm. Google’s local business documentation says name and address are required for a local business rich result, and that Google does not guarantee the feature will show. Google’s optimization guide, read on 21 October 2026, says structured data is not required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features. None of those pages publishes a citation rate for law firms. The script has to match the visible page.",
  },
  {
    q: "Should the firm mark itself up as Attorney or as LegalService?",
    a: "Use LegalService for the firm. schema.org’s Attorney page, read on 21 October 2026, says the type is deprecated and that LegalService is more inclusive and less ambiguous. LegalService is a LocalBusiness, so Google’s local business fields still apply: name and address are required for the rich result, and hours, geo, telephone, and the location URL are recommended when the page shows them. A page about one named lawyer is a Person. The local business generator still lists Attorney because the type exists. The attorney schema generator writes LegalService or Attorney, plus areaServed, knowsAbout, priceRange, and openingHours text. It does not write openingHoursSpecification. Do not paste both scripts on the same URL. Prefer LegalService for the office.",
  },
  {
    q: "Does llms.txt put a law firm into ChatGPT or AI Overviews?",
    a: "No. The llms.txt proposal, updated 10 August 2026 and read on 21 October 2026, is a Markdown reading list. Google’s optimization guide says Google Search ignores special AI text files, including llms.txt, so the file neither helps nor harms Google Search, including AI Overviews and AI Mode. OpenAI’s and Perplexity’s crawler pages, as covered on the ChatGPT and Perplexity guides, do not list the file as the control for search. Keep it as a curated list for other readers. A missing file is not a block, and a present file is not a citation.",
  },
  {
    q: "Does the free check query ChatGPT, Perplexity, or Google AI Overviews?",
    a: "No. The free check reads the homepage, robots.txt for GPTBot, PerplexityBot, and Google-Extended, a non-empty llms.txt, a sitemap, and JSON-LD types on the homepage. It does not read OAI-SearchBot, and it does not log into an answer engine or Search Console. The $39 audit scores one public URL from the HTML we fetch. The per-engine snapshot is an inference, and the report says so. A practice-area URL is outside the homepage check.",
  },
];

export function AiSearchVisibilityForLawFirmsArticle() {
  return (
    <>
      <p>
        A law firm is cited when an answer engine can fetch a page and find a sentence that states the place, the work,
        and the limit of that page. ChatGPT search, Perplexity search, and Google AI Overviews each publish a crawler
        or indexing control. None of those pages publishes a citation rate for law firms, a required word count, or a
        schema type that turns a homepage into a footnote. CiteScore does not log into those products, and it does not
        give legal advice. The work on this page is the office record, one practice-area URL, local signals,{" "}
        <code>robots.txt</code>, and <code>llms.txt</code> as a reading list.
      </p>
      <p>
        The local markup rules are on <Link href="/geo-for-local-businesses">GEO for local businesses</Link>. The
        engine pages are <Link href="/how-to-get-cited-by-chatgpt">ChatGPT</Link>,{" "}
        <Link href="/how-to-get-cited-by-perplexity">Perplexity</Link>, and{" "}
        <Link href="/google-ai-overviews-optimization">Google AI Overviews</Link>. A store’s price problem is on{" "}
        <Link href="/ai-search-visibility-for-ecommerce">AI search visibility for ecommerce</Link>. A software
        company’s comparison page is on{" "}
        <Link href="/ai-search-visibility-for-b2b-saas">AI search visibility for B2B SaaS</Link>. A clinic or
        health-tech site is on{" "}
        <Link href="/ai-search-visibility-for-healthcare">AI search visibility for healthcare</Link>. A brokerage, an agent, or a property manager is on <Link href="/ai-search-visibility-for-real-estate">AI search visibility for real estate</Link>. A restaurant’s location, menu, and hours are on <Link href="/ai-search-visibility-for-restaurants">AI search visibility for restaurants</Link>. An accounting, CPA, or bookkeeping firm is on <Link href="/ai-search-visibility-for-accountants">AI search visibility for accountants</Link>. A dental practice’s office, services, and hours are on <Link href="/ai-search-visibility-for-dentists">AI search visibility for dentists</Link>. A plumbing business’s office, service area, and hours are on <Link href="/ai-search-visibility-for-plumbers">AI search visibility for plumbers</Link>. An HVAC company’s office, service area, and hours are on <Link href="/ai-search-visibility-for-hvac">AI search visibility for HVAC</Link>. A roofing contractor’s office, service area, and hours are on <Link href="/ai-search-visibility-for-roofers">AI search visibility for roofers</Link>. An electrical contractor’s shop, service area, and hours are on <Link href="/ai-search-visibility-for-electricians">AI search visibility for electricians</Link>. A landscaping business’s office, service area, and hours are on <Link href="/ai-search-visibility-for-landscapers">AI search visibility for landscapers</Link>. An auto repair business’s shop, service area, and hours are on <Link href="/ai-search-visibility-for-auto-repair">AI search visibility for auto repair</Link>.
      </p>

      <h2>One page per practice the firm actually does</h2>
      <p>
        Google’s <a href={aiGuide}>optimization guide</a>, read on 21 October 2026, says a unique page does more over
        time than a commodity summary, and that a separate URL for every query variation, written to manipulate
        rankings or generative AI responses, violates the scaled content abuse policy. A folder of city pages that only
        swap the city name is that pattern. Write the practice areas the firm handles, each on one URL.
      </p>
      <p>
        Name the jurisdiction in the HTML. A sentence that never says which state or country it describes answers a
        different question than the one a person asked. Put the question in a heading and the answer in the first text
        the server sends. A hero image is not that answer. Say who the page is for, and say the limit the page can
        support, including that the page is general information when that is what the firm means. Leave out a result, a
        fee, a recovery amount, and a license the page does not show.
      </p>
      <p>
        Link the office page and the lawyer pages for the people who do that work, using the same name as each H1.
        Google’s guide says there is no ideal length and no requirement to break a page into tiny chunks. One clear
        page is enough. AI Overviews and AI Mode still require the page to be indexed and eligible for a snippet, and
        the site to be included in Search generative AI features in Search Console. Meeting those rules does not
        guarantee indexing. AI Mode uses the same eligibility, on{" "}
        <Link href="/google-ai-mode-optimization">Google AI Mode optimization</Link>.
      </p>

      <h2>LegalService for the office, Person for a named lawyer</h2>
      <p>
        <a href={legalService}>schema.org LegalService</a>, read on 21 October 2026, is a business that provides
        legally-oriented services, advice, and representation, for example law firms. It is a{" "}
        <code>LocalBusiness</code>, so it can also be described as a provider of one or more services.{" "}
        <a href={attorney}>schema.org Attorney</a> says that type is deprecated, and that LegalService is more inclusive
        and less ambiguous.
      </p>
      <p>
        Google’s <a href={localBusiness}>local business documentation</a>, read on 21 October 2026, requires{" "}
        <code>name</code> and <code>address</code> for a local business rich result. It says to use the most specific{" "}
        <code>LocalBusiness</code> subtype that fits. Recommended fields, when the page shows them, include{" "}
        <code>geo</code> to at least five decimal places, <code>openingHoursSpecification</code>,{" "}
        <code>telephone</code> with country code and area code, and the <code>url</code> of that location.{" "}
        <code>priceRange</code> has to be shorter than 100 characters when you include it. Google does not guarantee
        that the panel or the list will show.
      </p>
      <pre className={preClass}>{officeExample}</pre>
      <p>
        That block is an example, not a firm. <a href={sdPolicies}>Google’s structured data policies</a> say the markup
        has to describe content people can see. The{" "}
        <Link href="/local-business-schema-generator">Local business schema generator</Link> includes LegalService and
        still lists Attorney. It copies the name, the address, the phone, the hours as{" "}
        <code>openingHoursSpecification</code>, and optional geo into one script in the browser. It does not write{" "}
        <code>areaServed</code>, <code>knowsAbout</code>, <code>priceRange</code>, or the text property{" "}
        <code>openingHours</code>. The <Link href="/attorney-schema-generator">Attorney schema generator</Link> writes
        those fields, and it writes LegalService unless you choose the deprecated Attorney type. Do not paste both
        scripts on the same URL. Choose LegalService for the office. Neither form emits <code>review</code> or{" "}
        <code>aggregateRating</code>. Google recommends those properties only for sites that capture reviews about
        other businesses. A firm marking up its own stars is outside that recommendation.
      </p>
      <p>
        A page that names one lawyer uses <code>Person</code>: the name, the job, the firm as <code>worksFor</code>,
        and the profile URLs the page already shows. The{" "}
        <Link href="/person-schema-generator">Person schema generator</Link> builds that script. A team name is an
        Organization. The homepage can use the{" "}
        <Link href="/organization-schema-generator">Organization schema generator</Link>. Speakable markup is a
        different feature. Google’s speakable page is a beta for English news on Google Assistant, not a type for a
        firm. A news post the firm publishes can use the{" "}
        <Link href="/speakable-schema-generator">Speakable schema generator</Link> on that post. It does not make the
        office page a citation. A photo that shows a credit or a license uses the{" "}
        <Link href="/image-object-schema-generator">ImageObject schema generator</Link>.
      </p>

      <h2>Practice-area pages</h2>
      <p>
        Each practice URL states the work, the place, and the provider. <code>Service</code> is the schema.org type for
        that page. The local business rich result is the office, with the name and address Google’s local business
        page requires. Service is still a labeled copy of the practice page. <code>provider</code> is the firm.{" "}
        <code>areaServed</code> is the place the page names. <code>offers</code> belongs only when the page shows a
        price and a currency.
      </p>
      <pre className={preClass}>{practiceExample}</pre>
      <p>
        The <Link href="/service-schema-generator">Service schema generator</Link> copies that shape in the browser.
        One service per page. A second practice is a second URL, not a second name stuffed into the first script.
        Questions the firm itself answers, visible on the page, can use the{" "}
        <Link href="/faq-schema-generator">FAQ schema generator</Link>. Google stopped showing FAQ rich results in May
        2026. A forum where people submit answers is a QAPage, on the{" "}
        <Link href="/qa-page-schema-generator">QAPage schema generator</Link>, and a firm-written FAQ is not that page.
        Other types are on the <Link href="/schema-markup-for-ai-search">schema guide</Link>.
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
        Each office is its own <code>LegalService</code>. A practice group that shares the address and the phone is a
        page on the site, not a second location. Google’s <code>department</code> property is for a nested unit with
        its own phone or hours. The profile is not a substitute for the HTML. A page behind a consultation form is one
        the crawler does not receive. The longer local note is{" "}
        <Link href="/geo-for-local-businesses">GEO for local businesses</Link>.
      </p>

      <h2>robots.txt for the search crawlers</h2>
      <p>
        Blocking the search crawler keeps the site out of that product’s answers. Allowing it does not promise a
        citation.
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
          inclusion. See <Link href="/how-to-get-cited-by-gemini">how to get cited by Gemini</Link>.
        </li>
      </ul>
      <p>
        Give each token its own group when <code>User-agent: *</code> already disallows the host. The token list is{" "}
        <Link href="/robots-txt-for-ai-crawlers">robots.txt for AI crawlers</Link>, and the copy-paste file is the{" "}
        <Link href="/robots-txt-ai-crawler-generator">robots.txt generator</Link>. An Allow line can still sit behind a
        firewall 403. A client portal, a matter file, and an intake draft that is not a public page stay disallowed.
        The public practice page has to be allowed if you want it fetched.
      </p>

      <h2>llms.txt is a reading list</h2>
      <p>
        <a href={spec}>The llms.txt proposal</a>, v2, updated 10 August 2026 and read on 21 October 2026, is an optional
        Markdown file, usually at <code>/llms.txt</code>. The H1 is the only required section. Google’s optimization
        guide says Google Search ignores the file, so it neither helps nor harms AI Overviews, AI Mode, or other
        Google Search rankings. A missing file is not a block, and a present file is not a citation.
      </p>
      <p>
        For a firm, link the homepage, each office, the practice pages, and the public lawyer profiles. Use canonical
        URLs. Leave out the client portal, matter names, and any page that asks the reader to sign in. The proposal
        says the links should point at a Markdown version of the page when you publish one. Until you do, link the
        public HTML URL. Section order and the mistakes that break a read of the spec are on{" "}
        <Link href="/llms-txt-best-practices">llms.txt best practices</Link>. The{" "}
        <Link href="/llms-txt-generator">llms.txt generator</Link> copies a starter file in the browser. The{" "}
        <Link href="/llms-txt">checker</Link> only looks for a non-empty file.
      </p>
      <pre className={preClass}>{llmsExample}</pre>

      <h2>What you can measure</h2>
      <p>
        Google’s optimization guide tells a site owner to use the Generative AI performance report in Search Console
        for AI Overviews and AI Mode on Google Search. CiteScore does not read Search Console. To see whether ChatGPT
        names the firm, repeat the same prompts and keep a log, as on{" "}
        <Link href="/how-to-check-if-chatgpt-mentions-your-brand">how to check if ChatGPT mentions your brand</Link>.
        The free check does not run those prompts. Pages you do not control — a court site, a bar directory, a
        publisher — are often the source an answer quotes. You can keep one firm name so their mention and your H1
        match. You cannot edit their page from your deploy.
      </p>

      <h2>A workable order</h2>
      <ol>
        <li>Publish one office URL with the name, street, phone, and hours in the HTML, and the same facts on the Business Profile.</li>
        <li>Add LegalService JSON-LD from those visible facts. Leave Attorney, reviews, and ratings off.</li>
        <li>Publish one URL per practice the firm handles. State the jurisdiction and the limit in text. Add Service markup from that page.</li>
        <li>Publish a Person page only for a lawyer the site names, and link it from the practice page.</li>
        <li>Allow OAI-SearchBot, PerplexityBot, and Googlebot on the public pages. Decide GPTBot and Google-Extended separately. Keep private paths disallowed.</li>
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
            OAI-SearchBot, and it does not query an answer engine. For an office or practice URL, use the{" "}
            <Link href="/geo-audit">$39 GEO audit</Link>. The homepage check does not open that path.
          </>
        }
      />

      <h2>Questions about law firm visibility</h2>
      {lawFirmFaqs.map((item) => (
        <div key={item.q}>
          <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={legalService}>schema.org LegalService</a>, read 21 October 2026. A business that provides legal
          services, for example a law firm.
        </li>
        <li>
          <a href={attorney}>schema.org Attorney</a>, read 21 October 2026. Deprecated in favor of LegalService.
        </li>
        <li>
          <a href={localBusiness}>Local business structured data</a>, read 21 October 2026. Required name and address,
          and the review limit.
        </li>
        <li>
          <a href={aiGuide}>Google’s generative AI optimization guide</a>, read 21 October 2026. Snippets, Business
          Profile, <code>llms.txt</code>, and schema.
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
