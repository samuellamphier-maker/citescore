import Link from "next/link";
import { GuideOffers } from "@/components/articles/GuideOffers";
import { preClass } from "@/components/articles/guide-links";

const dentist = "https://schema.org/Dentist";
const medicalBusiness = "https://schema.org/MedicalBusiness";
const medicalOrganization = "https://schema.org/MedicalOrganization";
const medicalSpecialty = "https://schema.org/medicalSpecialty";
const dentistry = "https://schema.org/Dentistry";
const availableService = "https://schema.org/availableService";
const serviceType = "https://schema.org/Service";
const localBusiness =
  "https://developers.google.com/search/docs/appearance/structured-data/local-business";
const gallery = "https://developers.google.com/search/docs/appearance/structured-data/search-gallery";
const aiGuide = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";
const sdPolicies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";
const reviewDocs = "https://developers.google.com/search/docs/appearance/structured-data/review-snippet";
const helpful = "https://developers.google.com/search/docs/fundamentals/creating-helpful-content";
const spec = "https://llmstxt.org/";

const officeExample = `{
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "Example Dental",
  "url": "https://example.com/offices/springfield",
  "telephone": "+1-555-010-0142",
  "medicalSpecialty": "https://schema.org/Dentistry",
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
    "opens": "08:00",
    "closes": "17:00"
  }
}`;

const serviceExample = `{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Example cleaning",
  "serviceType": "Cleaning",
  "description": "A cleaning visit at the Springfield office. Example markup only. This is not dental advice.",
  "url": "https://example.com/services/cleaning",
  "provider": {
    "@type": "Organization",
    "name": "Example Dental",
    "url": "https://example.com/offices/springfield"
  },
  "areaServed": "Springfield"
}`;

const llmsExample = `# Example Dental

> Example Dental is one dental practice in Springfield, Illinois. This file is an example.

## Offices

- [Springfield](https://example.com/offices/springfield): The name, address, phone, and hours on that page

## Services

- [Cleaning](https://example.com/services/cleaning): The visit the page describes, and the Springfield office named there

## Optional

- [News](https://example.com/news): Practice announcements a reader can skip`;

export const dentistFaqs = [
  {
    q: "Does Dentist schema get a practice cited by ChatGPT, Perplexity, or AI Overviews?",
    a: "No. schema.org describes Dentist as a dentist, and it is a LocalBusiness, a MedicalBusiness, and a MedicalOrganization. Google’s local business documentation says name and address are required for a local business rich result, and that Google does not guarantee the feature will show. Google’s optimization guide, read on 22 October 2026, says structured data is not required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features. None of those pages publishes a citation rate for dentists or dental practices. The script has to match the visible page. This page is not dental, medical, or legal advice.",
  },
  {
    q: "When should the page be Dentist, and when a service, a clinic, or a person?",
    a: "Use Dentist for one public office that is a dental practice. MedicalBusiness is a business for medical purposes. MedicalClinic is a facility devoted to diagnosis or healthcare, and it fits when the page is a clinic and Dentist does not. Physician is a physician or a physician’s office, not a dental office. Organization or MedicalOrganization fits a group homepage that is not one street address. Use Service on the page for one offer the site actually publishes, such as a cleaning or an exam, with the place the page names in areaServed. Use Person on the page that names one dentist. schema.org availableService is defined for Hospital, MedicalClinic, and Physician, not for Dentist. Do not put it on the office script. Do not mark the patient portal, a chart, or a city page that only swaps the city name as another Dentist.",
  },
  {
    q: "Does llms.txt, a review star, or a Google Business Profile put a practice into ChatGPT or AI Overviews?",
    a: "No. The llms.txt proposal is a Markdown reading list. Google’s optimization guide says Google Search ignores special AI text files, including llms.txt, so the file neither helps nor harms AI Overviews or AI Mode. A missing file is not a block, and a present file is not a citation. The same guide says Business Profile information can be included in AI responses and in other Google Search results. A matching name, street, phone, and hours make one record. They do not create a citation. Google’s local business page recommends review and aggregateRating only for sites that capture reviews about other businesses. A practice marking up its own stars is outside that recommendation. The stars do not create a citation.",
  },
  {
    q: "Does the free check query ChatGPT, Perplexity, or Google AI Overviews, or open the patient portal?",
    a: "No. The free check reads the homepage, robots.txt for GPTBot, PerplexityBot, and Google-Extended, a non-empty llms.txt, a sitemap, and JSON-LD types on the homepage. It does not read OAI-SearchBot, it does not log into an answer engine, Search Console, or a patient portal, and it does not review clinical statements. The $39 audit scores one public URL from the HTML we fetch. The per-engine snapshot is an inference, and the report says so. An office URL or a service URL is outside the homepage check. CiteScore does not give dental or medical advice.",
  },
];

export function AiSearchVisibilityForDentistsArticle() {
  return (
    <>
      <p>
        A dental practice is cited when an answer engine can fetch a page and find a sentence that states the office,
        the service, the place served, or the limit of that page. ChatGPT search, Perplexity search, and Google AI
        Overviews each publish a crawler or indexing control. None of those pages publishes a citation rate for
        dentists, a required word count, or a schema type that turns a homepage into a footnote. CiteScore does not
        log into those products, and it does not give dental or medical advice. It does not say which credential a
        practice must hold. The work here is how those products pick a source, the office record, one URL per service,
        the person the page already names, the hours a person can already read, Google Business Profile as the same
        public record, <code>robots.txt</code>, and <code>llms.txt</code> as a reading list.
      </p>
      <p>
        The local markup rules are on <Link href="/geo-for-local-businesses">GEO for local businesses</Link>. The
        engine pages are <Link href="/how-to-get-cited-by-chatgpt">ChatGPT</Link>,{" "}
        <Link href="/how-to-get-cited-by-perplexity">Perplexity</Link>, and{" "}
        <Link href="/google-ai-overviews-optimization">Google AI Overviews</Link>. A clinic or health-tech site that is
        not this dental office is on{" "}
        <Link href="/ai-search-visibility-for-healthcare">AI search visibility for healthcare</Link>. A law firm’s
        office page is on <Link href="/ai-search-visibility-for-law-firms">AI search visibility for law firms</Link>. A
        brokerage, an agent, or a property manager is on{" "}
        <Link href="/ai-search-visibility-for-real-estate">AI search visibility for real estate</Link>. A restaurant’s
        location, menu, and hours are on{" "}
        <Link href="/ai-search-visibility-for-restaurants">AI search visibility for restaurants</Link>. An accounting,
        CPA, or bookkeeping firm is on{" "}
        <Link href="/ai-search-visibility-for-accountants">AI search visibility for accountants</Link>. A store’s price
        problem is on <Link href="/ai-search-visibility-for-ecommerce">AI search visibility for ecommerce</Link>. A
        software company’s comparison page is on{" "}
        <Link href="/ai-search-visibility-for-b2b-saas">AI search visibility for B2B SaaS</Link>.
      </p>

      <h2>How an assistant picks a source</h2>
      <p>
        An assistant can quote a page it is allowed to fetch, when that page states the fact in a sentence. Blocking
        the search crawler keeps the site out of that product’s answers. Allowing the crawler does not promise a
        citation. There is no published rate for how often a dentist, a practice, or a service is named.
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
        abuse policy. A folder of city pages that only swap the city name is that pattern. A folder of condition pages
        that only swap the condition name is the same pattern. Write the offices and the services the site actually
        provides.
      </p>
      <p>
        A directory, a review site, or a health agency page can be the page an answer quotes. You can keep one
        practice name so a mention and your H1 match. You cannot edit their page from your deploy. To see whether
        ChatGPT names the practice, repeat the same prompts and keep a log, as on{" "}
        <Link href="/how-to-check-if-chatgpt-mentions-your-brand">how to check if ChatGPT mentions your brand</Link>.
        The free check does not run those prompts.
      </p>

      <h2>Dentist for the office</h2>
      <p>
        <a href={dentist}>schema.org Dentist</a>, read on 22 October 2026, is a dentist. It is a{" "}
        <a href={medicalBusiness}>MedicalBusiness</a>, a LocalBusiness, and a{" "}
        <a href={medicalOrganization}>MedicalOrganization</a>. MedicalBusiness is a physical or virtual business for
        medical purposes. Use Dentist for the page about one public office that is a dental practice. Use{" "}
        <code>MedicalClinic</code> when the page is a clinic and Dentist does not fit. Use <code>Physician</code> for a
        physician or a physician’s office. Do not use it for a dental office. Use <code>Organization</code> or{" "}
        <code>MedicalOrganization</code> for a group homepage that is not one street address. Google’s{" "}
        <a href={localBusiness}>local business documentation</a>, read on 22 October 2026, says to use the most specific
        subtype. Its examples are Restaurant, DaySpa, and HealthClub. It does not name Dentist. The subtype still
        applies, because that is the type schema.org defines for this business.
      </p>
      <p>
        That same Google page requires <code>name</code> and <code>address</code> for a local business rich result.
        Recommended fields, when the page shows them, include <code>geo</code> to at least five decimal places,{" "}
        <code>openingHoursSpecification</code>, <code>telephone</code> with country code and area code, and the{" "}
        <code>url</code> of that office. Google does not guarantee that the panel or the list will show. Google’s{" "}
        <a href={gallery}>structured data gallery</a>, read on 22 October 2026, lists Local business. It does not list
        a separate dentist rich result.
      </p>
      <p>
        <a href={medicalSpecialty}>schema.org medicalSpecialty</a> is a medical specialty of the provider. Its domain
        includes MedicalOrganization, so a Dentist can carry it. <a href={dentistry}>schema.org Dentistry</a> is that
        specialty. Add <code>https://schema.org/Dentistry</code> only when the page shows that this office is a dental
        practice. Do not add a more specific specialty the page does not name.{" "}
        <a href={availableService}>schema.org availableService</a> is a medical service, and schema.org defines it for
        Hospital, MedicalClinic, and Physician. It is not defined for Dentist. Leave it off the office script. The
        service page, below, is the place for one offer.
      </p>
      <pre className={preClass}>{officeExample}</pre>
      <p>
        That block is an example, not a practice. <a href={sdPolicies}>Google’s structured data policies</a> say the
        markup has to describe content people can see. The{" "}
        <Link href="/local-business-schema-generator">Local business schema generator</Link> already lists Dentist. It
        copies the name, the address, the phone, the hours, and optional geo into one script in the browser. It does
        not emit <code>medicalSpecialty</code>, <code>review</code>, or <code>aggregateRating</code>. Add the
        specialty by hand only when the page shows it. The address in that script is this office. It is not the street
        of a second office.
      </p>
      <p>
        A page that names one person, such as the dentist the site already credits, uses <code>Person</code>. The{" "}
        <Link href="/person-schema-generator">Person schema generator</Link> builds that script. This guide does not
        print a personal name. A group homepage that is not one office can use the{" "}
        <Link href="/organization-schema-generator">Organization schema generator</Link>. A photo that shows a credit
        or a license uses the <Link href="/image-object-schema-generator">ImageObject schema generator</Link>. A
        dataset the practice publishes, on its own URL, uses the{" "}
        <Link href="/dataset-schema-generator">Dataset schema generator</Link>. A film the practice publishes, on its
        own URL, uses the <Link href="/movie-schema-generator">Movie schema generator</Link>. A vehicle the practice publishes, on its
        own URL, uses the <Link href="/vehicle-schema-generator">Vehicle schema generator</Link>. A hotel the practice publishes, on its
        own URL, uses the <Link href="/hotel-schema-generator">Hotel schema generator</Link>. A restaurant page uses the <Link href="/restaurant-schema-generator">Restaurant schema generator</Link>. The dataset page is not
        the office, the film page is not the office, the vehicle page is not the office, and the hotel page is not the office.
      </p>

      <h2>One URL per service</h2>
      <p>
        A cleaning, an exam, a consultation, and emergency hours are different offers when the site publishes them as
        different pages. Put the name of the visit, who it is for, and the office it belongs to in the HTML the server
        sends. Say the limit the page is willing to state, such as which office provides it, and leave out a clinical
        claim, a fee, or a result the page does not show. This guide does not say which services a practice should
        offer, and it does not describe a treatment. A draft service that is not public does not belong in the
        sitemap.
      </p>
      <p>
        <a href={serviceType}>schema.org Service</a> is that offer. <code>serviceType</code> is the label.{" "}
        <code>provider</code> is the practice. <code>areaServed</code> is the place the page names. The{" "}
        <Link href="/service-schema-generator">Service schema generator</Link> copies that shape, with the provider as
        an Organization. It writes an Offer only when you enter both a price and a currency. Do not mark every city as
        its own Service when the page does not describe a different offer. Do not mark the whole practice homepage as
        one Service that lists every visit. Do not nest those visits in <code>availableService</code> on the Dentist
        script.
      </p>
      <pre className={preClass}>{serviceExample}</pre>
      <p>
        A one-day clinic or a community screening, on its own URL, can be an event when the page is about that date.
        The <Link href="/event-schema-generator">Event schema generator</Link> copies that shape. The everyday hours
        stay on the office page. Questions the practice itself answers, visible on the page, can use the{" "}
        <Link href="/faq-schema-generator">FAQ schema generator</Link>. Google stopped showing FAQ rich results in May
        2026. Other types are on the <Link href="/schema-markup-for-ai-search">schema guide</Link>.
      </p>

      <h2>The person the page already names</h2>
      <p>
        A page about one dentist is a Person, not a second copy of the office. The person generator writes{" "}
        <code>jobTitle</code>, <code>worksFor</code>, <code>alumniOf</code>, and <code>knowsAbout</code> when you enter
        them. Use <code>knowsAbout</code> for a topic the bio already states. Do not use it as a list of every
        condition the practice hopes to rank for.         Google’s <a href={helpful}>helpful-content page</a> says trust is the most important part of E-E-A-T, that
        systems give more weight to strong E-E-A-T on topics that can affect health, and that fabricated authorship is
        deceptive. It does not say a byline produces a citation.
      </p>
      <p>
        If the page shows a credential, such as a degree or a license, and the jurisdiction, repeat that credential
        and the jurisdiction in a sentence a person can read. Do not add a credential the page does not show. A
        credential is not a citation, and this guide does not say which one a practice must hold. The same sentence
        should match the Google Business Profile name for that person when the practice publishes one. Two different
        titles for the same person are two records an assistant can mix up.
      </p>

      <h2>Hours and Google Business Profile</h2>
      <p>
        The office page, the JSON-LD, and Google Business Profile are three records of one place. Google’s
        optimization guide says Business Profile information can be included in AI responses and in other Google Search
        results. Use the same name, street, phone, and hours in all three. A profile category does not write the
        JSON-LD, and the JSON-LD does not edit the profile. A front desk that closes at 17:00 and a phone line that
        answers later are two hours. Write the hours the page is willing to state, and use <code>department</code>{" "}
        only when a unit has its own phone or its own hours. The longer local note is{" "}
        <Link href="/geo-for-local-businesses">GEO for local businesses</Link>.
      </p>
      <p>
        Google’s local business page shows a closed day as <code>opens</code> and <code>closes</code> both set to{" "}
        <code>00:00</code>. The local business generator writes the times you enter, including that pair, on the days
        you select. It does not invent a closed day you left blank. Leaving Sunday out of the script does not tell a
        reader the office is closed. Say so in the HTML. Overnight hours, on Google’s page, are one specification whose
        close is after midnight. Confirm the script matches the sentence on the page.
      </p>

      <h2>Reviews</h2>
      <p>
        Google’s local business documentation recommends <code>review</code> and <code>aggregateRating</code> only for
        sites that capture reviews about other businesses. A practice marking up its own stars is outside that
        recommendation. Leave both properties off the office script. The local business generator already leaves them
        off. Google’s <a href={reviewDocs}>review snippet guidelines</a>, read on 22 October 2026, say the same limit
        for a local business or an organization that controls the reviews about itself. A page that shows reviews of a
        product or an app uses the <Link href="/review-schema-generator">Review schema generator</Link>, which does
        not write LocalBusiness. A star count copied from a review site into JSON-LD, when the office page does not
        show those reviews, describes a rating the reader cannot see. A patient story that includes health details
        does not belong in the script or in <code>llms.txt</code>.
      </p>

      <h2>The patient portal stays out</h2>
      <p>
        A patient login, a chart, an image, a form that only works after sign-in, and a draft page are not public
        pages. Disallow them in <code>robots.txt</code>, leave them out of the sitemap, and do not link them from{" "}
        <code>llms.txt</code>. A portal URL that only works after a login is not a page a crawler can quote. The
        public office page and the public service pages have to be allowed if you want them fetched. Confirm the same
        name, street, phone, and hours on the office page and on the Google Business Profile.
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
        For a practice, link the homepage, each public office, and the public services you want read. Use canonical
        URLs. Leave out the patient portal, draft pages, and any page that asks the reader to sign in. Do not paste
        patient names, chart numbers, or clinical notes into the file. Do not paste every city when the site already
        has one service URL. The proposal says the links should point at a Markdown version of the page when you
        publish one. Until you do, link the public HTML URL. Section order and the mistakes that break a read of the
        spec are on <Link href="/llms-txt-best-practices">llms.txt best practices</Link>. The{" "}
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
        <li>Add Dentist JSON-LD from those visible facts. Add https://schema.org/Dentistry only when the page shows that specialty. Leave reviews and ratings off that script.</li>
        <li>Publish one URL per service the site actually offers. State the visit and the office in text. Point the service script at that URL. Leave availableService off the Dentist script.</li>
        <li>Publish a person URL only for a dentist the site already names. Repeat the credential the page already shows, with the jurisdiction.</li>
        <li>Allow OAI-SearchBot, PerplexityBot, and Googlebot on the public pages. Decide GPTBot and Google-Extended separately. Keep the portal, drafts, and patient files disallowed.</li>
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

      <h2>Questions about dental practice visibility</h2>
      {dentistFaqs.map((item) => (
        <div key={item.q}>
          <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={dentist}>schema.org Dentist</a>, read 22 October 2026. A dentist. It is a LocalBusiness, a
          MedicalBusiness, and a MedicalOrganization.
        </li>
        <li>
          <a href={medicalBusiness}>schema.org MedicalBusiness</a>, read 22 October 2026. A business for medical
          purposes, and a LocalBusiness.
        </li>
        <li>
          <a href={medicalSpecialty}>schema.org medicalSpecialty</a> and <a href={dentistry}>schema.org Dentistry</a>,
          read 22 October 2026. The specialty property includes MedicalOrganization. Dentistry is that specialty.
          availableService is defined for Hospital, MedicalClinic, and Physician.
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
          dentist rich result is not.
        </li>
        <li>
          <a href={aiGuide}>Google’s generative AI optimization guide</a>, read 22 October 2026. Snippets, Business
          Profile, <code>llms.txt</code>, schema, and scaled content abuse.
        </li>
        <li>
          <a href={helpful}>Creating helpful content</a>, read 22 October 2026. Trust is the most important part of
          E-E-A-T, and health topics get more weight. Fabricated authorship is deceptive.
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
