import Link from "next/link";
import { GuideOffers } from "@/components/articles/GuideOffers";
import { preClass } from "@/components/articles/guide-links";

const electrician = "https://schema.org/Electrician";
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

const shopExample = `{
  "@context": "https://schema.org",
  "@type": "Electrician",
  "name": "Example Electric",
  "url": "https://example.com/shops/springfield",
  "telephone": "+1-555-010-0198",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "512 Maple Street",
    "addressLocality": "Springfield",
    "addressRegion": "IL",
    "postalCode": "62704",
    "addressCountry": "US"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "07:00",
    "closes": "16:00"
  }
}`;

const serviceExample = `{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Example panel upgrade",
  "serviceType": "Electrical panel upgrade",
  "description": "Panel upgrade for homes in Springfield. Example markup only. This is not a quote, and it is not a wiring instruction.",
  "url": "https://example.com/services/panel-upgrade",
  "provider": {
    "@type": "Organization",
    "name": "Example Electric",
    "url": "https://example.com/shops/springfield"
  },
  "areaServed": "Springfield"
}`;

const llmsExample = `# Example Electric

> Example Electric is one electrical contractor in Springfield, Illinois. This file is an example.

## Shop

- [Springfield](https://example.com/shops/springfield): The name, address, phone, and hours on that page

## Services

- [Panel upgrade](https://example.com/services/panel-upgrade): The work the page describes, and the Springfield area named there

## Optional

- [News](https://example.com/news): Business announcements a reader can skip`;

export const electricianFaqs = [
  {
    q: "Does Electrician schema get an electrical contractor cited by ChatGPT, Perplexity, or AI Overviews?",
    a: "No. schema.org describes Electrician as an electrician. It is a HomeAndConstructionBusiness, which is a LocalBusiness that provides services around homes and buildings. Google’s local business documentation says name and address are required for a local business rich result, and that Google does not guarantee the feature will show. That page, read on 23 October 2026, also shows a multi-type example that lists Electrician with Plumber and Locksmith for a business that offers those services together. The array does not create a citation, and it does not belong on a page that is only electrical work. Google’s optimization guide, read the same day, says structured data is not required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features. None of those pages publishes a citation rate for electrical contractors. The script has to match the visible page. This page is not electrical, licensing, or code advice.",
  },
  {
    q: "When should the page be Electrician, and when a service or a service-area page?",
    a: "Use Electrician for one public page about the electrical contractor, with the name and the address the page shows. HomeAndConstructionBusiness is the parent type. Use it, or LocalBusiness, when the page is a home-services business and Electrician does not fit. Plumber, HVACBusiness, RoofingContractor, and GeneralContractor are different trades. Organization fits a homepage that is not one street address. Use Service on the page for one offer the site actually publishes, such as a panel upgrade, an EV charger installation, or an inspection, with the place the page names in areaServed. A city page that only swaps the city name is not another Electrician, and it is not another Service. Do not mark a customer’s home, a panel photo, or an invoice as the business.",
  },
  {
    q: "Does a review star, a matching phone number, a license line, or llms.txt put an electrician into ChatGPT or AI Overviews?",
    a: "No. The same name, the same phone, and the same address, when you publish an address, make one record an assistant can match. They do not create a citation. A license number helps only when the page already shows that number and the jurisdiction that issued it. This page does not say which license a contractor must hold, and it does not say which code applies. Google’s local business page recommends review and aggregateRating only for sites that capture reviews about other businesses. An electrical contractor marking up its own stars is outside that recommendation. The stars do not create a citation. The llms.txt proposal is a Markdown reading list. Google’s optimization guide says Google Search ignores special AI text files, including llms.txt, so the file neither helps nor harms AI Overviews or AI Mode. A missing file is not a block, and a present file is not a citation. Google-Extended, which covers Gemini Apps, is a separate robots.txt choice from whether Search includes the site in AI Overviews.",
  },
  {
    q: "Does the free check query ChatGPT, Perplexity, or Google AI Overviews, or open a customer file?",
    a: "No. The free check reads the homepage, robots.txt for GPTBot, PerplexityBot, and Google-Extended, a non-empty llms.txt, a sitemap, and JSON-LD types on the homepage. It does not read OAI-SearchBot, it does not log into an answer engine or Search Console, and it does not open estimates, panel photos, or a scheduling login. The $39 audit scores one public URL from the HTML we fetch. The per-engine snapshot is an inference, and the report says so. A shop URL or a service URL is outside the homepage check. CiteScore does not give electrical, licensing, or code advice.",
  },
];

export function AiSearchVisibilityForElectriciansArticle() {
  return (
    <>
      <p>
        An electrical contractor is cited when an answer engine can fetch a page and find a sentence that states the
        business, the work, the place served, or the limit of that page. ChatGPT search, Perplexity search, and Google
        AI Overviews each publish a crawler or indexing control. None of those pages publishes a citation rate for
        electrical contractors, a required word count, or a schema type that turns a homepage into a footnote.
        CiteScore does not log into those products, and it does not give electrical, licensing, or code advice. It does
        not say which license a business must hold, and it does not describe how to open a panel. The work here is how
        those products pick a source, the business record, service-area pages that say something distinct, one URL per
        service, the name and phone a person can already read, reviews, questions the page already answers,{" "}
        <code>robots.txt</code>, and <code>llms.txt</code> as a reading list.
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
        <Link href="/ai-search-visibility-for-roofers">AI search visibility for roofers</Link>. A landscaping business’s
        office, service area, and hours are on{" "}
        <Link href="/ai-search-visibility-for-landscapers">AI search visibility for landscapers</Link>. An auto repair business’s shop, service area, and hours are on <Link href="/ai-search-visibility-for-auto-repair">AI search visibility for auto repair</Link>. A chiropractic office’s office, services, and hours are on <Link href="/ai-search-visibility-for-chiropractors">AI search visibility for chiropractors</Link>. A clinic’s name,
        specialty, and hours are on the{" "}
        <Link href="/medical-clinic-schema-generator">Medical clinic schema generator</Link>, and the longer healthcare
        note is <Link href="/ai-search-visibility-for-healthcare">AI search visibility for healthcare</Link>.
      </p>

      <h2>How an assistant picks a source</h2>
      <p>
        An assistant can quote a page it is allowed to fetch, when that page states the fact in a sentence. Blocking
        the search crawler keeps the site out of that product’s answers. Allowing the crawler does not promise a
        citation. There is no published rate for how often an electrician, a shop, or a service is named.
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
        abuse policy. A folder of city pages that only swap the city name is that pattern. A folder of “electrician
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

      <h2>Electrician for the business</h2>
      <p>
        <a href={electrician}>schema.org Electrician</a>, read on 23 October 2026, is an electrician. It is a{" "}
        <a href={homeBusiness}>HomeAndConstructionBusiness</a>. That type, read the same day, is a construction
        business, and a LocalBusiness that provides services around homes and buildings. Use Electrician for the page
        about the electrical contractor. Use <code>HomeAndConstructionBusiness</code> or <code>LocalBusiness</code>{" "}
        when the page is a home-services business and Electrician does not fit. Do not use <code>Plumber</code>,{" "}
        <code>HVACBusiness</code>, <code>RoofingContractor</code>, or <code>GeneralContractor</code> for a page that is
        only electrical work. A plumbing business’s pages are on{" "}
        <Link href="/ai-search-visibility-for-plumbers">AI search visibility for plumbers</Link>. Use{" "}
        <code>Organization</code> for a homepage that is not one street address.
      </p>
      <p>
        Google’s <a href={localBusiness}>local business documentation</a>, read on 23 October 2026, says to use the
        most specific subtype. Its examples are Restaurant, DaySpa, and HealthClub. The same page says a business with
        multiple types should list them as an array, because <code>additionalType</code> is not supported, and it
        shows <code>Electrician</code>, <code>Plumber</code>, and <code>Locksmith</code> together. Use that array only
        when the page is honestly those trades. An electrical contractor that does not publish plumbing or locksmith
        work should be <code>Electrician</code> alone. Adding the other types to match the example describes work the
        page does not offer.
      </p>
      <p>
        That same Google page requires <code>name</code> and <code>address</code> for a local business rich result.
        Recommended fields, when the page shows them, include <code>geo</code> to at least five decimal places,{" "}
        <code>openingHoursSpecification</code>, <code>telephone</code> with country code and area code, and the{" "}
        <code>url</code> of that page. Google does not guarantee that the panel or the list will show. If the page
        does not show a street address, do not invent one to qualify. A rich result that requires an address is then
        outside what this page can honestly mark up. Google’s <a href={gallery}>structured data gallery</a>, read on
        23 October 2026, lists Local business. It does not list a separate electrician rich result.
      </p>
      <pre className={preClass}>{shopExample}</pre>
      <p>
        That block is an example, not a business. <a href={sdPolicies}>Google’s structured data policies</a> say the
        markup has to describe content people can see. The{" "}
        <Link href="/local-business-schema-generator">Local business schema generator</Link> already lists Electrician.
        It copies the name, the address, the phone, the hours, and optional geo into one script in the browser. It
        does not emit <code>areaServed</code>, <code>review</code>, or <code>aggregateRating</code>. The address in
        that script is the address the page shows. It is not a customer’s street, and it is not the street of a second
        shop you left off the page.
      </p>
      <p>
        <a href={areaServed}>schema.org areaServed</a> is the geographic area where a service or offered item is
        provided. It supersedes <code>serviceArea</code>. Add it by hand on the Electrician script only when the page
        names the places served. A list of every city you hope to rank for is not that property. A page that names one
        person the site already credits uses <code>Person</code>. The{" "}
        <Link href="/person-schema-generator">Person schema generator</Link> builds that script. This guide does not
        print a personal name. A group homepage that is not one shop can use the{" "}
        <Link href="/organization-schema-generator">Organization schema generator</Link>. A photo that shows a credit
        or a license for the file uses the{" "}
        <Link href="/image-object-schema-generator">ImageObject schema generator</Link>. A clinic the business does not
        operate is not this script. A clinic page uses the{" "}
        <Link href="/medical-clinic-schema-generator">Medical clinic schema generator</Link>.
      </p>

      <h2>Service-area pages</h2>
      <p>
        An electrical contractor often works at the customer’s panel and also publishes pages for the cities or
        counties it covers. Publish a separate URL only when that page states something a person in that place can
        check: which services are offered there, which shop or dispatch covers it, the hours, and a limit the page is
        willing to state, such as no new commercial switchgear in that county when that limit is true. A page that
        changes only the city name is the scaled-content pattern in Google’s optimization guide. Leave that page
        unpublished. A draft city page does not belong in the sitemap.
      </p>
      <p>
        Say the area in a sentence, then repeat that place in <code>areaServed</code> on the service that page
        describes. Do not mark the city page as a second Electrician with a made-up street address. Do not paste a
        customer’s home address into the script to prove you work there. The shop address, when you publish one, stays
        the address on the shop page. The service area stays the places the page names.
      </p>

      <h2>One URL per service</h2>
      <p>
        A panel upgrade, an EV charger installation, a lighting job, a standby generator, an inspection, a rewire, and
        an after-hours call are different offers when the site publishes them as different pages. Put the name of the
        work, who it is for, and the place it covers in the first sentences. Say what the visit includes, and say
        what it does not include, when the page is willing to state that limit. An estimate that depends on the panel
        is not a fixed price. Leave the price off the script when the page does not show one.
      </p>
      <p>
        This guide does not give a procedure for working inside a panel. A service page can tell a reader to stop and
        call, and it can say what the contractor will look at on site. A step-by-step for opening a live panel is not
        a service page, and an assistant that quotes it would be quoting the wrong kind of page. If the site does not
        publish that procedure, do not add it so a crawler has more text.
      </p>
      <pre className={preClass}>{serviceExample}</pre>
      <p>
        <a href={serviceType}>schema.org Service</a> is that offer. <code>serviceType</code> is the short name.{" "}
        <code>provider</code> points at the business page. <code>areaServed</code> is the place the page names. The{" "}
        <Link href="/service-schema-generator">Service schema generator</Link> copies that shape in the browser. One
        service per page. A second service is a second URL. Do not stuff every trade name into the first script. A
        page of questions the business already answers can use the{" "}
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
        including the jurisdiction. This guide does not say which license an electrical contractor must hold, and it
        does not say that a number in the footer makes an assistant prefer the page. Do not invent a number to fill a
        field. Do not mark a customer’s permit as the contractor’s credential.
      </p>
      <p>
        Google’s local business page recommends <code>review</code> and <code>aggregateRating</code> only for sites
        that capture reviews about other local businesses. Google’s{" "}
        <a href={reviewDocs}>review snippet guidelines</a> are the same limit. Leave both properties off the
        Electrician script. The stars a contractor shows about its own work do not become a rich result by being
        copied into JSON-LD, and they do not create a citation.
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
        include the customer’s street or a house number. A close photo of a panel that still shows the address is a
        customer address. Publish the photo of the work, and name the city only when the page already does. The file
        credit, when the page shows one, is the ImageObject. The customer’s home is not.
      </p>

      <h2>Questions the page already answers</h2>
      <p>
        The useful questions are the ones the business already answers in public: which places it covers, what an
        estimate visit includes, whether it takes commercial work, and whether it pulls the permit when the page says
        so. Put the question and the answer in HTML. FAQ markup is optional, and only for those visible pairs. Google’s{" "}
        <a href={searchUpdates}>Search updates</a>, read on 23 October 2026, say the FAQ rich result is no longer
        shown, as announced in the changelog entry for 7 May 2026. The documentation for that feature was removed
        afterward. The markup does not bring the accordion back, and it does not create a citation.
      </p>
      <p>
        Do not add a troubleshooting tree for a burning smell, a tripped breaker, or a DIY repair so the page matches
        a query. The sentence an assistant should be able to quote, when the business is willing to say it, is to
        stop and call. If that sentence is not on the page, do not hide it in the script.
      </p>

      <h2>Customer files stay out</h2>
      <p>
        Estimates, invoices, panel photos tied to an address, and a scheduling login are not public source pages.
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
        For an electrical contractor, link the homepage, the public shop page, and the public services you want read.
        Use canonical URLs. Link a city page only when that page states a distinct fact. Leave out estimates, customer
        names, home addresses, panel photos tied to an address, and any page that asks the reader to sign in. Do not
        paste every city when the site already has one service URL. Section order and the mistakes that break a read
        of the spec are on <Link href="/llms-txt-best-practices">llms.txt best practices</Link>. The{" "}
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
        <li>Add Electrician JSON-LD from those visible facts. Leave the street out when the page does not show one. Leave reviews and ratings off that script. Do not add Plumber or Locksmith unless the page offers that work.</li>
        <li>Publish one URL per service the site actually offers. State the work and the place in text. Point the service script at that URL, with areaServed set to the place the page names.</li>
        <li>Publish a city or county page only when it states a distinct fact. Do not swap the city name across an otherwise identical page.</li>
        <li>Publish the questions the business already answers, in HTML. Leave wiring instructions off the site unless you are willing to stand behind them in public, and do not add them only for a crawler.</li>
        <li>Allow OAI-SearchBot, PerplexityBot, and Googlebot on the public pages. Decide GPTBot and Google-Extended separately. Keep estimates, customer files, and drafts disallowed.</li>
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

      <h2>Questions about electrical contractor visibility</h2>
      {electricianFaqs.map((item) => (
        <div key={item.q}>
          <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={electrician}>schema.org Electrician</a>, read 23 October 2026. An electrician. It is a
          HomeAndConstructionBusiness.
        </li>
        <li>
          <a href={homeBusiness}>schema.org HomeAndConstructionBusiness</a>, read 23 October 2026. A construction
          business. A LocalBusiness that provides services around homes and buildings.
        </li>
        <li>
          <a href={areaServed}>schema.org areaServed</a>, read 23 October 2026. The geographic area where a service or
          offered item is provided. It supersedes serviceArea.
        </li>
        <li>
          <a href={localBusiness}>Local business structured data</a>, read 23 October 2026. Required name and address,
          the most specific subtype, the Electrician example inside a multi-type array, hours, and the review limit.
        </li>
        <li>
          <a href={reviewDocs}>Review snippet structured data</a>, read 23 October 2026. Self-serving reviews are
          outside the star feature. The local business page limits review and aggregateRating to sites that capture
          reviews about other businesses.
        </li>
        <li>
          <a href={gallery}>Structured data gallery</a>, read 23 October 2026. Local business is listed. A separate
          electrician rich result is not.
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
