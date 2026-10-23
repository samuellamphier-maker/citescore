import Link from "next/link";
import { GuideOffers } from "@/components/articles/GuideOffers";
import { preClass } from "@/components/articles/guide-links";

const roofer = "https://schema.org/RoofingContractor";
const homeBusiness = "https://schema.org/HomeAndConstructionBusiness";
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
  "@type": "RoofingContractor",
  "name": "Example Roofing",
  "url": "https://example.com/offices/springfield",
  "telephone": "+1-555-010-0196",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "418 Cedar Street",
    "addressLocality": "Springfield",
    "addressRegion": "IL",
    "postalCode": "62704",
    "addressCountry": "US"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "07:00",
    "closes": "17:00"
  }
}`;

const serviceExample = `{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Example roof inspection",
  "serviceType": "Roof inspection",
  "description": "Roof inspection for homes in Springfield. Example markup only. This is not a quote, and it is not an insurance outcome.",
  "url": "https://example.com/services/roof-inspection",
  "provider": {
    "@type": "Organization",
    "name": "Example Roofing",
    "url": "https://example.com/offices/springfield"
  },
  "areaServed": "Springfield"
}`;

const llmsExample = `# Example Roofing

> Example Roofing is one roofing business in Springfield, Illinois. This file is an example.

## Office

- [Springfield](https://example.com/offices/springfield): The name, address, phone, and hours on that page

## Services

- [Roof inspection](https://example.com/services/roof-inspection): The work the page describes, and the Springfield area named there

## Optional

- [News](https://example.com/news): Business announcements a reader can skip`;

export const rooferFaqs = [
  {
    q: "Does RoofingContractor schema get a roofing contractor cited by ChatGPT, Perplexity, or AI Overviews?",
    a: "No. schema.org describes RoofingContractor as a roofing contractor. It is a HomeAndConstructionBusiness, which is a LocalBusiness that provides services around homes and buildings. Google’s local business documentation says name and address are required for a local business rich result, and that Google does not guarantee the feature will show. Google’s optimization guide, read on 22 October 2026, says structured data is not required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features. None of those pages publishes a citation rate for roofing contractors. The script has to match the visible page. This page is not roofing, licensing, insurance, or legal advice.",
  },
  {
    q: "When should the page be RoofingContractor, and when a service or a service-area page?",
    a: "Use RoofingContractor for one public page about the roofing business, with the name and the address the page shows. HomeAndConstructionBusiness is the parent type. Use it, or LocalBusiness, when the page is a home-services business and RoofingContractor does not fit. Plumber, Electrician, and HVACBusiness are different trades. Organization fits a homepage that is not one street address. Use Service on the page for one offer the site actually publishes, such as a repair, a replacement, or an inspection, with the place the page names in areaServed. A city page that only swaps the city name is not another RoofingContractor, and it is not another Service. Do not mark a customer’s home, an invoice, or a job photo as the business.",
  },
  {
    q: "Does a review star, a matching phone number, a license line, or llms.txt put a roofer into ChatGPT or AI Overviews?",
    a: "No. The same name, the same phone, and the same address, when you publish an address, make one record an assistant can match. They do not create a citation. A license number helps only when the page already shows that number and the jurisdiction. This page does not say which license a contractor must hold. Google’s local business page recommends review and aggregateRating only for sites that capture reviews about other businesses. A roofing contractor marking up its own stars is outside that recommendation. The stars do not create a citation. The llms.txt proposal is a Markdown reading list. Google’s optimization guide says Google Search ignores special AI text files, including llms.txt, so the file neither helps nor harms AI Overviews or AI Mode. A missing file is not a block, and a present file is not a citation. Google-Extended, which covers Gemini Apps, is a separate robots.txt choice from whether Search includes the site in AI Overviews.",
  },
  {
    q: "Does the free check query ChatGPT, Perplexity, or Google AI Overviews, or open a customer file?",
    a: "No. The free check reads the homepage, robots.txt for GPTBot, PerplexityBot, and Google-Extended, a non-empty llms.txt, a sitemap, and JSON-LD types on the homepage. It does not read OAI-SearchBot, it does not log into an answer engine or Search Console, and it does not open invoices, estimates, or a scheduling login. The $39 audit scores one public URL from the HTML we fetch. The per-engine snapshot is an inference, and the report says so. An office URL or a service URL is outside the homepage check. CiteScore does not give roofing, licensing, insurance, or legal advice.",
  },
];

export function AiSearchVisibilityForRoofersArticle() {
  return (
    <>
      <p>
        A roofing contractor is cited when an answer engine can fetch a page and find a sentence that states the
        business, the work, the place served, or the limit of that page. ChatGPT search, Perplexity search, and Google
        AI Overviews each publish a crawler or indexing control. None of those pages publishes a citation rate for
        roofing contractors, a required word count, or a schema type that turns a homepage into a footnote. CiteScore
        does not log into those products, and it does not give roofing, licensing, insurance, or legal advice. It does
        not say which license a business must hold, and it does not say what an insurance claim will pay. The work
        here is how those products pick a source, the business record, service-area pages that say something distinct,
        one URL per service, the name and phone a person can already read, reviews, questions the page already
        answers, <code>robots.txt</code>, and <code>llms.txt</code> as a reading list.
      </p>
      <p>
        The local markup rules are on <Link href="/geo-for-local-businesses">GEO for local businesses</Link>. The
        engine pages are <Link href="/how-to-get-cited-by-chatgpt">ChatGPT</Link>,{" "}
        <Link href="/how-to-get-cited-by-perplexity">Perplexity</Link>, and{" "}
        <Link href="/google-ai-overviews-optimization">Google AI Overviews</Link>. A plumbing business’s office,
        service area, and hours are on{" "}
        <Link href="/ai-search-visibility-for-plumbers">AI search visibility for plumbers</Link>. An HVAC company’s
        office, service area, and hours are on{" "}
        <Link href="/ai-search-visibility-for-hvac">AI search visibility for HVAC</Link>. A restaurant’s location,
        menu, and hours are on{" "}
        <Link href="/ai-search-visibility-for-restaurants">AI search visibility for restaurants</Link>. A dental
        practice’s office, services, and hours are on{" "}
        <Link href="/ai-search-visibility-for-dentists">AI search visibility for dentists</Link>. An accounting, CPA,
        or bookkeeping firm is on{" "}
        <Link href="/ai-search-visibility-for-accountants">AI search visibility for accountants</Link>. A law firm’s
        office page is on <Link href="/ai-search-visibility-for-law-firms">AI search visibility for law firms</Link>. A
        brokerage, an agent, or a property manager is on{" "}
        <Link href="/ai-search-visibility-for-real-estate">AI search visibility for real estate</Link>. A store’s price
        problem is on <Link href="/ai-search-visibility-for-ecommerce">AI search visibility for ecommerce</Link>. A
        software company’s comparison page is on{" "}
        <Link href="/ai-search-visibility-for-b2b-saas">AI search visibility for B2B SaaS</Link>.
      </p>

      <h2>How an assistant picks a source</h2>
      <p>
        An assistant can quote a page it is allowed to fetch, when that page states the fact in a sentence. Blocking
        the search crawler keeps the site out of that product’s answers. Allowing the crawler does not promise a
        citation. There is no published rate for how often a roofing contractor, a business, or a service is named.
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
          Gemini Apps and Grounding with Google Search on Vertex AI use the <code>Google-Extended</code> token. AI
          Overviews and AI Mode are Google Search. Allowing Google-Extended does not, by itself, put a page into AI
          Overviews, and blocking it does not remove a page from Search. The split is on{" "}
          <Link href="/how-to-get-cited-by-gemini">how to get cited by Gemini</Link>.
        </li>
        <li>
          Google AI Overviews are a Search feature. The page has to be indexed and snippet-eligible, and the site has
          to be included in Search generative AI features in Search Console. Google-Extended does not change that
          inclusion. See <Link href="/google-ai-overviews-optimization">Google AI Overviews optimization</Link>.
        </li>
      </ul>
      <p>
        Google’s <a href={aiGuide}>optimization guide</a>, read on 22 October 2026, says structured data is not
        required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features.
        The same guide says a unique page does more over time than a commodity summary, and that a separate URL for
        every query variation, written to manipulate rankings or generative AI responses, violates the scaled content
        abuse policy. A folder of city pages that only swap the city name is that pattern. A folder of “roofing near
        me” pages that only swap the neighborhood name is the same pattern. Write the places and the services the site
        actually covers.
      </p>
      <p>
        A directory or a review site can be the page an answer quotes. You can keep one business name so a mention and
        your H1 match. You cannot edit their page from your deploy. To see whether ChatGPT names the business, repeat
        the same prompts and keep a log, as on{" "}
        <Link href="/how-to-check-if-chatgpt-mentions-your-brand">how to check if ChatGPT mentions your brand</Link>.
        The free check does not run those prompts.
      </p>

      <h2>RoofingContractor for the business</h2>
      <p>
        <a href={roofer}>schema.org RoofingContractor</a>, read on 22 October 2026, is a roofing contractor. It is a{" "}
        <a href={homeBusiness}>HomeAndConstructionBusiness</a>. That type, read the same day, is a LocalBusiness that
        provides services around homes and buildings, and it can be described as a provider of one or more services.
        Use RoofingContractor for the page about the roofing business. Use <code>HomeAndConstructionBusiness</code> or{" "}
        <code>LocalBusiness</code> when the page is a home-services business and RoofingContractor does not fit. Do not
        use <code>Plumber</code>, <code>Electrician</code>, or <code>HVACBusiness</code> for a roofing contractor. An
        electrical contractor’s pages are on{" "}
        <Link href="/ai-search-visibility-for-electricians">AI search visibility for electricians</Link>. A landscaping
        business’s pages are on{" "}
        <Link href="/ai-search-visibility-for-landscapers">AI search visibility for landscapers</Link>. An auto repair shop’s pages are on <Link href="/ai-search-visibility-for-auto-repair">AI search visibility for auto repair</Link>. A chiropractic office’s pages are on <Link href="/ai-search-visibility-for-chiropractors">AI search visibility for chiropractors</Link>. An insurance agency’s office, lines of coverage, and hours are on <Link href="/ai-search-visibility-for-insurance-agents">AI search visibility for insurance agents</Link>. A veterinary clinic’s office, services, and hours are on <Link href="/ai-search-visibility-for-veterinarians">AI search visibility for veterinarians</Link>. Use{" "}
        <code>Organization</code> for a homepage that is not one street address. Google’s{" "}
        <a href={localBusiness}>local business documentation</a>, read on 22 October 2026, says to use the most
        specific subtype. Its examples are Restaurant, DaySpa, and HealthClub. It does not name RoofingContractor. The
        subtype still applies, because that is the type schema.org defines for this business.
      </p>
      <p>
        That same Google page requires <code>name</code> and <code>address</code> for a local business rich result.
        Recommended fields, when the page shows them, include <code>geo</code> to at least five decimal places,{" "}
        <code>openingHoursSpecification</code>, <code>telephone</code> with country code and area code, and the{" "}
        <code>url</code> of that page. Google does not guarantee that the panel or the list will show. If the page
        does not show a street address, do not invent one to qualify. A rich result that requires an address is then
        outside what this page can honestly mark up. Google’s <a href={gallery}>structured data gallery</a>, read on
        22 October 2026, lists Local business. It does not list a separate roofing rich result.
      </p>
      <pre className={preClass}>{officeExample}</pre>
      <p>
        That block is an example, not a business. <a href={sdPolicies}>Google’s structured data policies</a> say the
        markup has to describe content people can see. The{" "}
        <Link href="/local-business-schema-generator">Local business schema generator</Link> already lists
        RoofingContractor. It copies the name, the address, the phone, the hours, and optional geo into one script in
        the browser. It does not emit <code>areaServed</code>, <code>review</code>, or <code>aggregateRating</code>.
        The address in that script is the address the page shows. It is not a customer’s street, and it is not the
        street of a second shop you left off the page.
      </p>
      <p>
        <a href={areaServed}>schema.org areaServed</a> is the geographic area where a service or offered item is
        provided. It supersedes <code>serviceArea</code>. Add it by hand on the RoofingContractor script only when the
        page names the places served. A list of every city you hope to rank for is not that property. A page that names
        one person the site already credits uses <code>Person</code>. The{" "}
        <Link href="/person-schema-generator">Person schema generator</Link> builds that script. This guide does not
        print a personal name. A group homepage that is not one office can use the{" "}
        <Link href="/organization-schema-generator">Organization schema generator</Link>. A photo that shows a credit
        or a license uses the <Link href="/image-object-schema-generator">ImageObject schema generator</Link>. A
        restaurant the business publishes, on its own URL, uses the{" "}
        <Link href="/restaurant-schema-generator">Restaurant schema generator</Link>. The restaurant page is not the
        roofing business.
      </p>

      <h2>Service-area pages</h2>
      <p>
        A roofing contractor often works at the customer’s address and also publishes pages for the cities or counties
        it covers. Publish a separate URL only when that page states something a person in that place can check: which
        services are offered there, which shop or crew covers it, the hours, and a limit the page is willing to state.
        A page that changes only the city name is the scaled-content pattern in Google’s optimization guide. Leave
        that page unpublished. A draft city page does not belong in the sitemap.
      </p>
      <p>
        Say the area in a sentence, then repeat that place in <code>areaServed</code> on the service that page
        describes. Do not mark the city page as a second RoofingContractor with a fake street address. Do not paste a
        customer’s home address into the script to prove you work there. The business address, when you publish one,
        stays the address on the business page. The service area stays the places the page names. A storm in one
        county is not a reason to publish a copy of the same page for every town in that county.
      </p>

      <h2>One URL per service</h2>
      <p>
        A repair, a replacement, an inspection, and a leak call are different offers when the site publishes them as
        different pages. Put the name of the work, who it is for, and the place it covers in the HTML the server
        sends. Say the limit the page is willing to state, such as which area or which hours, and leave out a price, a
        response time, a material brand, or a result the page does not show. This guide does not say which services a
        business should offer, and it does not describe a repair. A draft service that is not public does not belong
        in the sitemap.
      </p>
      <p>
        A page about one system the company installs belongs on its own URL only when the site already does that work
        and the page says so. Do not add a manufacturer name the page does not show. Do not promise an insurance
        payment, a storm settlement, or a code outcome. If the page describes an inspection after a storm, the
        sentence can say what the inspection is. It should not say what a carrier will pay. CiteScore does not give
        insurance advice.
      </p>
      <p>
        <a href={serviceType}>schema.org Service</a> is that offer. <code>serviceType</code> is the label.{" "}
        <code>provider</code> is the business. <code>areaServed</code> is the place the page names. The{" "}
        <Link href="/service-schema-generator">Service schema generator</Link> copies that shape, with the provider as
        an Organization. It writes an Offer only when you enter both a price and a currency. Do not mark every city as
        its own Service when the page does not describe a different offer. Do not mark the whole homepage as one
        Service that lists every job. A fee the page does not show does not belong in the Offer.
      </p>
      <pre className={preClass}>{serviceExample}</pre>
      <p>
        Questions the business itself answers, visible on the page, can use the{" "}
        <Link href="/faq-schema-generator">FAQ schema generator</Link>. Google’s{" "}
        <a href={searchUpdates}>Search updates</a>, read on 22 October 2026, say the FAQ rich result stopped appearing
        on 7 May 2026, and that the documentation for that feature was later removed. Keep the questions when they are
        real and visible. The markup does not bring the accordion back, and it does not create a citation. Other types
        are on the <Link href="/schema-markup-for-ai-search">schema guide</Link>.
      </p>

      <h2>The name, the address, and the phone</h2>
      <p>
        People call that trio NAP: the name, the address, and the phone. The business page, the JSON-LD, and Google
        Business Profile are three records of one business. Google’s optimization guide says Business Profile
        information can be included in AI responses and in other Google Search results. Use one spelling of the name,
        one phone, and, when you publish a street, that same street. A profile that says “Example Roofing” and a site
        that says “Example Roofing LLC” are two names an assistant can split. Pick the spelling the page is willing to
        keep, and use it in the H1, the script, and the profile.
      </p>
      <p>
        If you do not publish a street address, leave <code>streetAddress</code> empty. Do not borrow a home address,
        a PO box the page does not show, or the address of a supplier. The city, the phone, and the hours the page
        shows are the record. An office line that closes at 17:00 and an after-hours line that answers later are two
        phones. Write the number the page is about. Use <code>department</code> only when a unit has its own phone or
        its own hours, and add it by hand. The local business generator does not write <code>department</code>. The
        longer local note is <Link href="/geo-for-local-businesses">GEO for local businesses</Link>.
      </p>
      <p>
        Google’s local business page shows a closed day as <code>opens</code> and <code>closes</code> both set to{" "}
        <code>00:00</code>. The local business generator writes the times you enter, including that pair, on the days
        you select. It does not invent a closed day you left blank. Leaving Sunday out of the script does not tell a
        reader the shop is closed. Say so in the HTML. Google’s page also documents <code>validFrom</code> and{" "}
        <code>validThrough</code> for a seasonal closure. Add those dates by hand only when the page shows the dates.
        If the page shows a license number and the jurisdiction, repeat that license and the jurisdiction in a
        sentence a person can read. Do not add a license the page does not show. This guide does not say which license
        a business must hold.
      </p>

      <h2>Reviews and job photos</h2>
      <p>
        Google’s local business documentation recommends <code>review</code> and <code>aggregateRating</code> only for
        sites that capture reviews about other businesses. A roofing contractor marking up its own stars is outside
        that recommendation. Leave both properties off the RoofingContractor script. The local business generator
        already leaves them off. Google’s <a href={reviewDocs}>review snippet guidelines</a>, read on 22 October 2026,
        say the same limit for a local business or an organization that controls the reviews about itself. A page that
        shows reviews of a product or an app uses the <Link href="/review-schema-generator">Review schema generator</Link>,
        which does not write LocalBusiness. A star count copied from a review site into JSON-LD, when the business
        page does not show those reviews, describes a rating the reader cannot see.
      </p>
      <p>
        A review a customer wrote on your site can stay on the page when it is real and the page shows it. Do not
        invent a customer, a quote, or a star rating. A photo of a finished roof can stay on the page when the page
        shows it. Do not put the customer’s name, the street, or the inside of the home in the caption, the script, or{" "}
        <code>llms.txt</code>. A photo that shows a credit or a license uses the{" "}
        <Link href="/image-object-schema-generator">ImageObject schema generator</Link>. An assistant can quote a
        sentence you wrote about the work. It should not receive a customer’s address from your markup.
      </p>

      <h2>Questions the page already answers</h2>
      <p>
        The questions worth publishing are the ones the business already answers: which area the page covers, what the
        visit includes, which hours are the office and which are the after-hours line, and what the page will not
        promise. Put the question and the answer in the HTML a person can read. Then, if you want the labels, use the{" "}
        <Link href="/faq-schema-generator">FAQ schema generator</Link>. One question without an answer is left out of
        that script. A question you do not actually answer does not belong on the page. Google’s{" "}
        <a href={searchUpdates}>Search updates</a> say the FAQ rich result stopped appearing on 7 May 2026, so the
        reason to keep the block is the visible answer, not an accordion under a Google listing.
      </p>

      <h2>Customer files stay out</h2>
      <p>
        An estimate, an invoice, a scheduling login, a photo that shows a customer’s street, a form that only works
        after sign-in, and a draft page are not public pages. Disallow them in <code>robots.txt</code>, leave them out
        of the sitemap, and do not link them from <code>llms.txt</code>. A portal URL that only works after a login is
        not a page a crawler can quote. The public business page and the public service pages have to be allowed if
        you want them fetched.
      </p>

      <h2>robots.txt for the search crawlers</h2>
      <p>
        Give each token its own group when <code>User-agent: *</code> already disallows the host. The token list is{" "}
        <Link href="/robots-txt-for-ai-crawlers">robots.txt for AI crawlers</Link>, and the copy-paste file is the{" "}
        <Link href="/robots-txt-ai-crawler-generator">robots.txt generator</Link>. An Allow line can still sit behind a
        firewall 403. Staff pages and anything that is not public stay disallowed. Decide GPTBot, Google-Extended, and
        the search crawlers separately. Blocking the training token does not, by itself, block the search token.
        Blocking Google-Extended does not, by itself, remove the site from AI Overviews. The user-agent reference,
        including tokens this site has not confirmed, is{" "}
        <Link href="/ai-crawler-user-agents">AI crawler user agents</Link>.
      </p>

      <h2>llms.txt is a reading list</h2>
      <p>
        <a href={spec}>The llms.txt proposal</a>, v2, updated 10 August 2026 and read on 22 October 2026, is an optional
        Markdown file, usually at <code>/llms.txt</code>. The H1 is the only required section. Google’s optimization
        guide says Google Search ignores the file, so it neither helps nor harms AI Overviews, AI Mode, or other
        Google Search rankings. A missing file is not a block, and a present file is not a citation.
      </p>
      <p>
        For a roofing contractor, link the homepage, the public business page, and the public services you want read.
        Use canonical URLs. Link a city page only when that page states a distinct fact. Leave out estimates, invoices,
        customer names, home addresses, and any page that asks the reader to sign in. Do not paste every city when the
        site already has one service URL. The proposal says the links should point at a Markdown version of the page
        when you publish one. Until you do, link the public HTML URL. Section order and the mistakes that break a read
        of the spec are on <Link href="/llms-txt-best-practices">llms.txt best practices</Link>. The{" "}
        <Link href="/llms-txt-generator">llms.txt generator</Link> copies a starter file in the browser. The{" "}
        <Link href="/llms-txt">checker</Link> only looks for a non-empty file. Worked files are on{" "}
        <Link href="/llms-txt-examples">llms.txt examples</Link>.
      </p>
      <pre className={preClass}>{llmsExample}</pre>

      <h2>What you can measure</h2>
      <p>
        Google’s optimization guide tells a site owner to use the Generative AI performance report in Search Console
        for AI Overviews and AI Mode on Google Search. CiteScore does not read Search Console. AI Mode uses the same
        eligibility as AI Overviews, on <Link href="/google-ai-mode-optimization">Google AI Mode optimization</Link>.
        Meeting the indexing rules does not guarantee indexing. A prompt you type into ChatGPT, Perplexity, or Gemini
        is a sample, not a share of voice. Keep the wording the same if you repeat it, and write down the date. The
        free check does not run that sample.
      </p>

      <h2>A workable order</h2>
      <ol>
        <li>Publish one business URL with the name, the phone, the hours, and the street if you show one, and the same facts on the Business Profile.</li>
        <li>Add RoofingContractor JSON-LD from those visible facts. Leave the street out when the page does not show one. Leave reviews and ratings off that script.</li>
        <li>Publish one URL per service the site actually offers. State the work and the place in text. Point the service script at that URL, with areaServed set to the place the page names.</li>
        <li>Publish a city or county page only when it states a distinct fact. Do not swap the city name across an otherwise identical page.</li>
        <li>Publish the questions the business already answers, in HTML. Add FAQ markup only for those visible pairs.</li>
        <li>Allow OAI-SearchBot, PerplexityBot, and Googlebot on the public pages. Decide GPTBot and Google-Extended separately. Keep estimates, invoices, customer files, and drafts disallowed.</li>
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
            OAI-SearchBot, and it does not query ChatGPT, Perplexity, or Google AI Overviews. For a business or service
            URL, use the <Link href="/geo-audit">$39 GEO audit</Link>. The homepage check does not open that path.
          </>
        }
      />

      <h2>Questions about roofing contractor visibility</h2>
      {rooferFaqs.map((item) => (
        <div key={item.q}>
          <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={roofer}>schema.org RoofingContractor</a>, read 22 October 2026. A roofing contractor. It is a
          HomeAndConstructionBusiness.
        </li>
        <li>
          <a href={homeBusiness}>schema.org HomeAndConstructionBusiness</a>, read 22 October 2026. A LocalBusiness that
          provides services around homes and buildings.
        </li>
        <li>
          <a href={areaServed}>schema.org areaServed</a>, read 22 October 2026. The geographic area where a service or
          offered item is provided. It supersedes serviceArea.
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
          roofing rich result is not.
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
          <a href={searchUpdates}>Google’s Search updates</a>, read 22 October 2026. The FAQ rich result stopped
          appearing on 7 May 2026. The documentation for that feature was removed afterward.
        </li>
        <li>
          <a href={spec}>The llms.txt proposal</a>, updated 10 August 2026, read 22 October 2026.
        </li>
      </ul>
    </>
  );
}
