import Link from "next/link";
import { GuideOffers } from "@/components/articles/GuideOffers";
import { preClass } from "@/components/articles/guide-links";

const veterinaryCare = "https://schema.org/VeterinaryCare";
const medicalOrganization = "https://schema.org/MedicalOrganization";
const medicalClinic = "https://schema.org/MedicalClinic";
const localBusinessType = "https://schema.org/LocalBusiness";
const areaServed = "https://schema.org/areaServed";
const identifierProp = "https://schema.org/identifier";
const accepting = "https://schema.org/isAcceptingNewPatients";
const openingHoursSpec = "https://schema.org/openingHoursSpecification";
const priceRange = "https://schema.org/priceRange";
const serviceType = "https://schema.org/Service";
const localBusiness =
  "https://developers.google.com/search/docs/appearance/structured-data/local-business";
const gallery = "https://developers.google.com/search/docs/appearance/structured-data/search-gallery";
const aiGuide = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";
const sdPolicies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";
const reviewDocs = "https://developers.google.com/search/docs/appearance/structured-data/review-snippet";
const searchUpdates = "https://developers.google.com/search/updates";
const spec = "https://llmstxt.org/";

const clinicExample = `{
  "@context": "https://schema.org",
  "@type": ["VeterinaryCare", "LocalBusiness"],
  "name": "Example Animal Clinic",
  "url": "https://example.com/clinics/springfield",
  "telephone": "+1-555-010-0218",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "18 Market Street",
    "addressLocality": "Springfield",
    "addressRegion": "IL",
    "postalCode": "62701",
    "addressCountry": "US"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "18:00"
  },
  "areaServed": "Springfield",
  "isAcceptingNewPatients": true
}`;

const serviceExample = `{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Example wellness visit",
  "serviceType": "Wellness visit",
  "description": "A wellness visit the Springfield clinic already describes. Example markup only. This is not a diagnosis, and it is not a treatment plan.",
  "url": "https://example.com/services/wellness-visit",
  "provider": {
    "@type": "VeterinaryCare",
    "name": "Example Animal Clinic",
    "url": "https://example.com/clinics/springfield"
  },
  "areaServed": "Springfield"
}`;

const llmsExample = `# Example Animal Clinic

> Example Animal Clinic is one veterinary clinic in Springfield, Illinois. This file is an example.

## Clinic

- [Springfield](https://example.com/clinics/springfield): The name, address, phone, and hours on that page

## Services

- [Wellness visit](https://example.com/services/wellness-visit): The visit the page describes, and the Springfield clinic named there

## Optional

- [News](https://example.com/news): Clinic announcements a reader can skip`;

export const veterinarianFaqs = [
  {
    q: "Does VeterinaryCare schema get a veterinary clinic cited by ChatGPT, Perplexity, or AI Overviews?",
    a: "No. schema.org describes VeterinaryCare as a vet's office. It is a MedicalOrganization, which is an Organization and not a LocalBusiness. Google’s local business documentation says name and address are required for a local business rich result, and that Google does not guarantee the feature will show. Google’s optimization guide, read on 23 October 2026, says structured data is not required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features. None of those pages publishes a citation rate for veterinary clinics. The script has to match the visible page. This page is not veterinary, licensing, or medical advice.",
  },
  {
    q: "When should the page be VeterinaryCare, and when a service, a person, or a human clinic?",
    a: "Use VeterinaryCare for one public page about the veterinary clinic. MedicalOrganization is the parent type. Use it when the page is a medical organization and VeterinaryCare does not fit. MedicalClinic, Dentist, Physician, and Hospital are different types. Do not use them for a veterinary office. schema.org/Veterinarian, requested on 23 October 2026, is not a type page. Use Person on the page that names one person the site already credits. Use Organization for a homepage that is not one street address. Use Service on the page for one offer the site actually publishes, such as a wellness visit or a dentistry page, with the place the page names in areaServed. A city page that only swaps the city name is not another VeterinaryCare, and it is not another Service. Do not mark a patient’s record, a client’s home, or an invoice as the clinic.",
  },
  {
    q: "Does a review star, a license line, a directory listing, or llms.txt put a clinic into ChatGPT or AI Overviews?",
    a: "No. The same name, the same phone, and the same address, when you publish an address, make one record an assistant can match. They do not create a citation. A license number helps only when the page already shows that number and the jurisdiction that issued it. This page does not say which license a clinic or a veterinarian must hold. A directory or a review site can be the page an answer quotes. You can keep one clinic name so a mention and your H1 match. You cannot edit their page from your deploy. Google’s local business page recommends review and aggregateRating only for sites that capture reviews about other businesses. A clinic marking up its own stars is outside that recommendation. The stars do not create a citation. The llms.txt proposal is a Markdown reading list. Google’s optimization guide says Google Search ignores special AI text files, including llms.txt, so the file neither helps nor harms AI Overviews or AI Mode. A missing file is not a block, and a present file is not a citation. Google-Extended, which covers Gemini Apps, is a separate robots.txt choice from whether Search includes the site in AI Overviews.",
  },
  {
    q: "Does the free check query ChatGPT, Perplexity, or Google AI Overviews, or open a patient record?",
    a: "No. The free check reads the homepage, robots.txt for GPTBot, PerplexityBot, and Google-Extended, a non-empty llms.txt, a sitemap, and JSON-LD types on the homepage. It does not read OAI-SearchBot, it does not log into an answer engine or Search Console, and it does not open records, invoices, or a client login. The $39 audit scores one public URL from the HTML we fetch. The per-engine snapshot is an inference, and the report says so. A clinic URL or a service URL is outside the homepage check. CiteScore does not give veterinary, licensing, or medical advice.",
  },
];

export function AiSearchVisibilityForVeterinariansArticle() {
  return (
    <>
      <p>
        A veterinary clinic is cited when an answer engine can fetch a page and find a sentence that states the clinic,
        the service, the species or the place that page already names, or the limit of that page. ChatGPT search,
        Perplexity search, and Google AI Overviews each publish a crawler or indexing control. None of those pages
        publishes a citation rate for veterinary clinics, a required word count, or a schema type that turns a homepage
        into a footnote. CiteScore does not log into those products, and it does not give veterinary, licensing, or
        medical advice. It does not say which license a clinic must hold, which species to treat, or how to diagnose an
        animal. The work here is how those products pick a source, the clinic record, one URL per service the site
        actually publishes, the person the page already names, the hours a person can already read, the same name on
        the profiles and directories the clinic already has, <code>robots.txt</code>, and <code>llms.txt</code> as a
        reading list.
      </p>
      <p>
        The local markup rules are on <Link href="/geo-for-local-businesses">GEO for local businesses</Link>. The
        engine pages are <Link href="/how-to-get-cited-by-chatgpt">ChatGPT</Link>,{" "}
        <Link href="/how-to-get-cited-by-perplexity">Perplexity</Link>, and{" "}
        <Link href="/google-ai-overviews-optimization">Google AI Overviews</Link>. A human clinic’s pages are on{" "}
        <Link href="/ai-search-visibility-for-healthcare">AI search visibility for healthcare</Link>. A dental office
        is on <Link href="/ai-search-visibility-for-dentists">AI search visibility for dentists</Link>. A chiropractic
        office is on <Link href="/ai-search-visibility-for-chiropractors">AI search visibility for chiropractors</Link>.
        Those types are not a vet’s office. An electrical contractor’s shop, service area, hours, and license number
        are on the <Link href="/electrician-schema-generator">Electrician schema generator</Link>, and the longer note
        is <Link href="/ai-search-visibility-for-electricians">AI search visibility for electricians</Link>. A plumbing
        business is on the <Link href="/plumber-schema-generator">Plumber schema generator</Link>. Pet insurance is not
        the clinic. An insurance agency’s pages are on{" "}
        <Link href="/ai-search-visibility-for-insurance-agents">AI search visibility for insurance agents</Link>.
      </p>

      <h2>How an assistant picks a source</h2>
      <p>
        An assistant can quote a page it is allowed to fetch, when that page states the fact in a sentence. Blocking
        the search crawler keeps the site out of that product’s answers. Allowing the crawler does not promise a
        citation. There is no published rate for how often a clinic, a service, or a place is named.
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
        abuse policy. A folder of city pages that only swap the city name is that pattern. A folder of “emergency vet
        near me” pages that only swap the species is the same pattern. Write the clinics, the places, and the services
        the site actually offers.
      </p>
      <p>
        A directory, a review site, or an association page can be the page an answer quotes. You can keep one clinic
        name so a mention and your H1 match. You cannot edit their page from your deploy. To see whether ChatGPT names
        the clinic, repeat the same prompts and keep a log, as on{" "}
        <Link href="/how-to-check-if-chatgpt-mentions-your-brand">how to check if ChatGPT mentions your brand</Link>.
        The free check does not run those prompts.
      </p>

      <h2>VeterinaryCare for the clinic</h2>
      <p>
        <a href={veterinaryCare}>schema.org VeterinaryCare</a>, read on 23 October 2026, is a vet’s office. It is a{" "}
        <a href={medicalOrganization}>MedicalOrganization</a>. That type, read the same day, is a medical organization,
        physical or not, such as a hospital, an institution, or a clinic. It is an Organization. It is not a{" "}
        <a href={localBusinessType}>LocalBusiness</a>. Use VeterinaryCare for the page about the veterinary clinic. Use{" "}
        <code>MedicalOrganization</code> when the page is a medical organization and VeterinaryCare does not fit. Do
        not use <a href={medicalClinic}>MedicalClinic</a>, <code>Dentist</code>, <code>Physician</code>, or{" "}
        <code>Hospital</code> for a veterinary office. schema.org/Veterinarian, requested on 23 October 2026, is not a
        type page. A page that names one person uses <code>Person</code>. Use <code>Organization</code> for a homepage
        that is not one street address.
      </p>
      <p>
        Google’s <a href={localBusiness}>local business documentation</a>, read on 23 October 2026, says to use the
        most specific LocalBusiness subtype. Its examples are Restaurant, DaySpa, and HealthClub. It does not name
        VeterinaryCare. VeterinaryCare is not a LocalBusiness subtype. The same Google page requires <code>name</code>{" "}
        and <code>address</code> for a local business rich result, and it says a business with multiple types should
        list them as an array, because <code>additionalType</code> is not supported. The published example is{" "}
        <code>Electrician</code>, <code>Plumber</code>, and <code>Locksmith</code>. It is not a veterinary example. If
        the page is a vet’s office and also a local place of business, one script can list both:{" "}
        <code>{'["VeterinaryCare", "LocalBusiness"]'}</code>. That array is a reading of the two
        documents. It is not a Google-published veterinary sample, and it does not create a citation. Google does not
        guarantee that the panel or the list will show. If the page does not show a street address, do not invent one
        to qualify. Google’s <a href={gallery}>structured data gallery</a>, read on 23 October 2026, lists Local
        business. It does not list a separate veterinary rich result.
      </p>
      <p>
        <a href={openingHoursSpec}>schema.org openingHoursSpecification</a> and <code>geo</code> are defined on Place.
        <a href={priceRange}>schema.org priceRange</a> is defined on LocalBusiness. VeterinaryCare does not inherit
        those properties. <a href={areaServed}>schema.org areaServed</a> is defined on Organization, so VeterinaryCare
        can carry the places the page names. <a href={accepting}>schema.org isAcceptingNewPatients</a> is a boolean
        defined on MedicalOrganization. Add it only when the page states whether the clinic is accepting new patients.{" "}
        <code>medicalSpecialty</code> expects a MedicalSpecialty value. The vocabulary read on 23 October 2026 does not
        define a veterinary specialty. Do not invent one. <code>availableService</code> is defined for Hospital,
        MedicalClinic, and Physician. It is not defined for VeterinaryCare. A service the site publishes on its own URL
        uses Service. A list of services the clinic page already names can use <code>hasOfferCatalog</code>, which
        Organization defines. <a href={identifierProp}>schema.org identifier</a> is any kind of identifier. A license
        number the page shows can be a PropertyValue there. It is not <code>taxID</code> or <code>vatID</code>.{" "}
        <code>hasCredential</code> is a Credential, not the number by itself.
      </p>
      <pre className={preClass}>{clinicExample}</pre>
      <p>
        That block is an example, not a clinic. <a href={sdPolicies}>Google’s structured data policies</a> say the
        markup has to describe content people can see. The example includes <code>LocalBusiness</code> beside{" "}
        <code>VeterinaryCare</code> so the hours property has a type that defines it. It includes{" "}
        <code>isAcceptingNewPatients</code> only as an illustration of a fact the page would already state. It does not
        include <code>medicalSpecialty</code>, <code>review</code>, <code>aggregateRating</code>, or a license number.
        The <Link href="/local-business-schema-generator">Local business schema generator</Link> already lists
        VeterinaryCare. It writes that one type, the name, the address, the phone, the hours as{" "}
        <code>openingHoursSpecification</code>, and optional geo. Those hours and coordinates are defined on Place, not
        on VeterinaryCare alone. The generator does not add <code>LocalBusiness</code> as a second type. It does not
        write <code>areaServed</code>, <code>priceRange</code>, <code>isAcceptingNewPatients</code>, or{" "}
        <code>identifier</code>. It does not emit <code>review</code> or <code>aggregateRating</code>. Do not paste a
        second script on the same URL. If you need both types, edit the <code>@type</code> array on one script. The
        address in that script is the clinic. It is not a client’s home. A human clinic is a different script, on the{" "}
        <Link href="/medical-clinic-schema-generator">Medical clinic schema generator</Link>. An electrical contractor
        is a different script, on the{" "}
        <Link href="/electrician-schema-generator">Electrician schema generator</Link>.
      </p>

      <h2>One URL per service the site publishes</h2>
      <p>
        A wellness visit, a dentistry page, a surgery page, and an after-hours page are different offers when the site
        publishes them as different pages. Put the name of the work, who it is for, and the place it covers in the
        first sentences. Say what the visit includes, and say what it does not include, when the page is willing to
        state that limit. A fee that depends on the animal is not a fixed price. Leave the price off the script when
        the page does not show one. This guide does not say which services a clinic should offer, and it does not
        describe a procedure.
      </p>
      <p>
        A page that only swaps the species name, or only swaps the city name, is the scaled-content pattern in
        Google’s optimization guide. Leave that page unpublished. A draft city page does not belong in the sitemap. Do
        not mark the city page as a second VeterinaryCare with a made-up street address. The clinic address, when you
        publish one, stays the address on the clinic page. The service area stays the places the page names.
      </p>
      <pre className={preClass}>{serviceExample}</pre>
      <p>
        <a href={serviceType}>schema.org Service</a> is that offer. <code>serviceType</code> is the short name.{" "}
        <code>provider</code> points at the clinic page. <code>areaServed</code> is the place the page names. The{" "}
        <Link href="/service-schema-generator">Service schema generator</Link> copies that shape in the browser. One
        service per page. A second service is a second URL. Do not stuff every service into the first script. Do not
        mark a product the clinic does not sell as a Service. A page of questions the clinic already answers can use
        the <Link href="/faq-schema-generator">FAQ schema generator</Link> for those visible pairs.
      </p>

      <h2>The person the page already names</h2>
      <p>
        A page about one person is a Person, not a second copy of the clinic. There is no Veterinarian type. The
        person generator writes <code>jobTitle</code>, <code>worksFor</code>, and <code>knowsAbout</code> when you
        enter them. Use <code>worksFor</code> for the clinic the page already names. Use <code>knowsAbout</code> for a
        topic the bio already states, when those words are on the page. Do not use it as a list of every species the
        clinic hopes to rank for. This guide does not print a personal name.
      </p>
      <p>
        If the page shows a license number, repeat the number and the jurisdiction in a sentence a person can read. Do
        not add a number the page does not show. A license is not a citation, and this guide does not say which one a
        clinic or a person must hold. On the clinic script, <code>identifier</code> can repeat that same number as a
        PropertyValue. The <Link href="/electrician-schema-generator">Electrician schema generator</Link> writes that
        shape for a contractor. This clinic page does not have a separate generator for it. Add the property by hand
        only when the clinic page shows the number. The <Link href="/person-schema-generator">Person schema generator</Link>{" "}
        builds the person script. A group homepage that is not one clinic can use the{" "}
        <Link href="/organization-schema-generator">Organization schema generator</Link>.
      </p>

      <h2>The name, the address, the phone, and other listings</h2>
      <p>
        The clinic page, the JSON-LD, and Google Business Profile are three records of one place. Google’s
        optimization guide says Business Profile information can be included in AI responses and in other Google Search
        results. Use the same name, the same phone, and, when you publish one, the same street. A second phone belongs
        in the script only when the page shows it. If the page says the clinic is open weekdays and a different line
        answers after hours, do not mark the clinic as open all night. The hours in{" "}
        <code>openingHoursSpecification</code> are the hours a person can read. A profile category does not write the
        JSON-LD, and the JSON-LD does not edit the profile.
      </p>
      <p>
        A directory, a map listing, or an association page is a local citation only when that page already exists and
        the name, the phone, and the address match the clinic page. The match makes one record easier to recognize. It
        does not create a citation. <code>sameAs</code> is a URL that unambiguously indicates the clinic, such as a
        profile the clinic controls. A directory you do not control is not <code>sameAs</code>. You cannot edit that
        directory from your deploy. Do not add a listing the clinic does not have.
      </p>
      <p>
        Google’s local business page recommends <code>review</code> and <code>aggregateRating</code> only for sites
        that capture reviews about other local businesses. Google’s{" "}
        <a href={reviewDocs}>review snippet guidelines</a> are the same limit. Leave both properties off the
        VeterinaryCare script. The stars a clinic shows about its own work do not become a rich result by being copied
        into JSON-LD, and they do not create a citation. A page that shows reviews of a product or an app uses the{" "}
        <Link href="/review-schema-generator">Review schema generator</Link>, which does not write LocalBusiness. A
        review the clinic wants quoted is a sentence on a page a crawler can fetch, with the clinic name in the text. A
        star widget that loads after JavaScript, or a review that lives only inside a login, is not that sentence.
      </p>

      <h2>Questions the page already answers</h2>
      <p>
        The useful questions are the ones the clinic already answers in public: which places it serves, which species
        the page names, whether it is accepting new patients, whether a first visit is at the clinic, and what a caller
        should bring when the page says so. Put the question and the answer in HTML. FAQ markup is optional, and only
        for those visible pairs. Google’s <a href={searchUpdates}>Search updates</a>, read on 23 October 2026, say the
        FAQ rich result is no longer shown, as announced in the changelog entry for 7 May 2026. The documentation for
        that feature was removed afterward. The markup does not bring the accordion back, and it does not create a
        citation.
      </p>
      <p>
        Do not add a page that tells a reader which drug to give, which diagnosis to assume, or which emergency to
        wait out. The sentence an assistant should be able to quote, when the clinic is willing to say it, is what the
        clinic does and where it does it. If that sentence is not on the page, do not hide it in the script. This guide
        does not describe a diagnosis or a treatment.
      </p>

      <h2>Patient records stay out</h2>
      <p>
        Records, invoices, lab results, and a client login are not public source pages. Disallow them in{" "}
        <code>robots.txt</code>, leave them out of the sitemap, and do not link them from <code>llms.txt</code>. A
        portal URL that only works after a login is not a page an answer engine can cite. A public contact form can
        stay on a public page. The filled record is not that page. A photo of an animal should not include a client’s
        street or a house number.
      </p>

      <h2>robots.txt for the search crawlers</h2>
      <p>
        Allow OAI-SearchBot, PerplexityBot, and Googlebot on the public clinic and service pages if you want those
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
        For a clinic, link the homepage, the public clinic page, and the public services you want read. Use canonical
        URLs. Link a city page only when that page states a distinct fact. Leave out records, invoices, client names,
        and any page that asks the reader to sign in. Do not paste every city when the site already has one service
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
        <li>Publish one clinic URL with the name, the phone, the hours, and the street if you show one, and the same facts on the Business Profile and on directories the clinic already has.</li>
        <li>Add VeterinaryCare JSON-LD from those visible facts. Add LocalBusiness in the same @type array when the page is also a local place of business and you are marking up hours or a price range. Leave the street out when the page does not show one. Leave reviews, ratings, an invented specialty, and an unpublished license off that script. Do not use MedicalClinic, and do not invent a Veterinarian type.</li>
        <li>Publish one URL per service the site actually offers. State the work and the place in text. Point the service script at that URL, with areaServed set to the place the page names.</li>
        <li>Publish a person URL only for a person the site already names. Repeat the license the page already shows, with the jurisdiction.</li>
        <li>Publish a city page only when it states a distinct fact. Do not swap the city name, or the species name, across an otherwise identical page.</li>
        <li>Allow OAI-SearchBot, PerplexityBot, and Googlebot on the public pages. Decide GPTBot and Google-Extended separately. Keep records, invoices, and drafts disallowed.</li>
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
            OAI-SearchBot, and it does not query an answer engine. For a clinic or service URL, use the{" "}
            <Link href="/geo-audit">$39 GEO audit</Link>. The homepage check does not open that path.
          </>
        }
      />

      <h2>Questions about veterinary clinic visibility</h2>
      {veterinarianFaqs.map((item) => (
        <div key={item.q}>
          <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={veterinaryCare}>schema.org VeterinaryCare</a>, read 23 October 2026. A vet’s office. It is a
          MedicalOrganization. There is no type named Veterinarian.
        </li>
        <li>
          <a href={medicalOrganization}>schema.org MedicalOrganization</a>, read 23 October 2026. A medical
          organization. An Organization. Not a LocalBusiness.
        </li>
        <li>
          <a href={localBusinessType}>schema.org LocalBusiness</a>, read 23 October 2026. A particular physical
          business. priceRange is defined here. openingHoursSpecification and geo are defined on Place.
        </li>
        <li>
          <a href={areaServed}>schema.org areaServed</a>, read 23 October 2026. The geographic area where a service or
          offered item is provided. It supersedes serviceArea.
        </li>
        <li>
          <a href={accepting}>schema.org isAcceptingNewPatients</a>, read 23 October 2026. A boolean on
          MedicalOrganization.
        </li>
        <li>
          <a href={identifierProp}>schema.org identifier</a>, read 23 October 2026. Any kind of identifier, as
          PropertyValue, Text, or URL.
        </li>
        <li>
          <a href={localBusiness}>Local business structured data</a>, read 23 October 2026. Required name and address,
          the most specific subtype, an array of types, hours, telephone, and the review limit.
        </li>
        <li>
          <a href={reviewDocs}>Review snippet structured data</a>, read 23 October 2026. Self-serving reviews are
          outside the star feature. The local business page limits review and aggregateRating to sites that capture
          reviews about other businesses.
        </li>
        <li>
          <a href={gallery}>Structured data gallery</a>, read 23 October 2026. Local business is listed. A separate
          veterinary rich result is not.
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
