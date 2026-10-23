import Link from "next/link";
import { GuideOffers } from "@/components/articles/GuideOffers";
import { preClass } from "@/components/articles/guide-links";

const medicalClinic = "https://schema.org/MedicalClinic";
const medicalBusiness = "https://schema.org/MedicalBusiness";
const physician = "https://schema.org/Physician";
const physiotherapy = "https://schema.org/Physiotherapy";
const chiropractic = "https://schema.org/Chiropractic";
const medicineSystem = "https://schema.org/medicineSystem";
const medicalSpecialty = "https://schema.org/medicalSpecialty";
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
  "@type": "MedicalClinic",
  "name": "Example Chiropractic",
  "url": "https://example.com/offices/springfield",
  "telephone": "+1-555-010-0188",
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
    "opens": "08:00",
    "closes": "17:00"
  }
}`;

const serviceExample = `{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Example office visit",
  "serviceType": "Office visit",
  "description": "An office visit at the Springfield office. Example markup only. This is not chiropractic or medical advice.",
  "url": "https://example.com/services/office-visit",
  "provider": {
    "@type": "Organization",
    "name": "Example Chiropractic",
    "url": "https://example.com/offices/springfield"
  },
  "areaServed": "Springfield"
}`;

const llmsExample = `# Example Chiropractic

> Example Chiropractic is one chiropractic office in Springfield, Illinois. This file is an example.

## Offices

- [Springfield](https://example.com/offices/springfield): The name, address, phone, and hours on that page

## Services

- [Office visit](https://example.com/services/office-visit): The visit the page describes, and the Springfield office named there

## Optional

- [News](https://example.com/news): Office announcements a reader can skip`;

export const chiropractorFaqs = [
  {
    q: "Does a schema type get a chiropractic office cited by ChatGPT, Perplexity, or AI Overviews?",
    a: "No. schema.org does not define a type named Chiropractor. Chiropractic is a MedicineSystem, a system of medicine focused on the relationship between the body’s structure, mainly the spine, and its functioning. It is not a LocalBusiness, and it is not a MedicalSpecialty. MedicalClinic is a facility devoted to diagnosis or healthcare, and it is a LocalBusiness. Google’s local business documentation says name and address are required for a local business rich result, and that Google does not guarantee the feature will show. Google’s optimization guide, read on 23 October 2026, says structured data is not required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features. None of those pages publishes a citation rate for chiropractic offices. The script has to match the visible page. This page is not chiropractic, medical, or legal advice.",
  },
  {
    q: "When should the page be MedicalClinic, and when Physician, Physiotherapy, a service, or a person?",
    a: "Use MedicalClinic for one public page about a clinic, including a chiropractic office whose page describes a clinic. There is no Chiropractor type to choose instead. Use MedicalBusiness or LocalBusiness when the page is a medical business and MedicalClinic does not fit. Physician is an individual physician or a physician’s office. Use it only when the page is that. This guide does not say a chiropractic office is a physician’s office. Physiotherapy is a MedicalBusiness and a MedicalSpecialty. Its definition is treatment by physical methods such as massage, heat treatment, and exercise rather than by drugs or surgery. Use it only when the page is a physiotherapy practice. Do not use Dentist. Use Organization for a homepage that is not one street address. Use Service on the page for one offer the site actually publishes, with the place the page names in areaServed. Use Person on the page that names one practitioner. Do not put Chiropractic in medicalSpecialty. medicineSystem is defined for MedicalEntity, not for MedicalClinic, so this guide does not put it on the office script. Do not mark the patient portal, a chart, or a city page that only swaps the city name as another MedicalClinic.",
  },
  {
    q: "Does llms.txt, a review star, or a Google Business Profile put an office into ChatGPT or AI Overviews?",
    a: "No. The llms.txt proposal is a Markdown reading list. Google’s optimization guide says Google Search ignores special AI text files, including llms.txt, so the file neither helps nor harms AI Overviews or AI Mode. A missing file is not a block, and a present file is not a citation. The same guide says Business Profile information can be included in AI responses and in other Google Search results. A matching name, street, phone, and hours make one record. They do not create a citation. Google’s local business page recommends review and aggregateRating only for sites that capture reviews about other businesses. An office marking up its own stars is outside that recommendation. The stars do not create a citation.",
  },
  {
    q: "Does the free check query ChatGPT, Perplexity, or Google AI Overviews, or open the patient portal?",
    a: "No. The free check reads the homepage, robots.txt for GPTBot, PerplexityBot, and Google-Extended, a non-empty llms.txt, a sitemap, and JSON-LD types on the homepage. It does not read OAI-SearchBot, it does not log into an answer engine, Search Console, or a patient portal, and it does not review clinical statements. The $39 audit scores one public URL from the HTML we fetch. The per-engine snapshot is an inference, and the report says so. An office URL or a service URL is outside the homepage check. CiteScore does not give chiropractic or medical advice.",
  },
];

export function AiSearchVisibilityForChiropractorsArticle() {
  return (
    <>
      <p>
        A chiropractic office is cited when an answer engine can fetch a page and find a sentence that states the
        office, the service, the place served, or the limit of that page. ChatGPT search, Perplexity search, and Google
        AI Overviews each publish a crawler or indexing control. None of those pages publishes a citation rate for
        chiropractic offices, a required word count, or a schema type that turns a homepage into a footnote. CiteScore
        does not log into those products, and it does not give chiropractic or medical advice. It does not describe a
        visit, a technique, or a result, and it does not say which credential an office must hold. The work here is how
        those products pick a source, the office record, one URL per service, the person the page already names, the
        hours a person can already read, Google Business Profile as the same public record, <code>robots.txt</code>,
        and <code>llms.txt</code> as a reading list.
      </p>
      <p>
        The local markup rules are on <Link href="/geo-for-local-businesses">GEO for local businesses</Link>. The
        engine pages are <Link href="/how-to-get-cited-by-chatgpt">ChatGPT</Link>,{" "}
        <Link href="/how-to-get-cited-by-perplexity">Perplexity</Link>, and{" "}
        <Link href="/google-ai-overviews-optimization">Google AI Overviews</Link>. A clinic or health-tech site that is
        not this office is on{" "}
        <Link href="/ai-search-visibility-for-healthcare">AI search visibility for healthcare</Link>. A dental
        practice’s office, services, and hours are on{" "}
        <Link href="/ai-search-visibility-for-dentists">AI search visibility for dentists</Link>. A law firm’s office
        page is on <Link href="/ai-search-visibility-for-law-firms">AI search visibility for law firms</Link>. A
        brokerage, an agent, or a property manager is on{" "}
        <Link href="/ai-search-visibility-for-real-estate">AI search visibility for real estate</Link>, and the office
        script is the{" "}
        <Link href="/real-estate-agent-schema-generator">Real estate agent schema generator</Link>. A plumbing business page uses the <Link href="/plumber-schema-generator">Plumber schema generator</Link>. An auto repair
        shop’s pages are on <Link href="/ai-search-visibility-for-auto-repair">AI search visibility for auto repair</Link>.
      </p>

      <h2>How an assistant picks a source</h2>
      <p>
        An assistant can quote a page it is allowed to fetch, when that page states the fact in a sentence. Blocking
        the search crawler keeps the site out of that product’s answers. Allowing the crawler does not promise a
        citation. There is no published rate for how often a chiropractic office, a practitioner, or a service is
        named.
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
        abuse policy. A folder of city pages that only swap the city name is that pattern. A folder of condition pages
        that only swap the condition name is the same pattern. Write the offices and the services the site actually
        provides.
      </p>
      <p>
        A directory, a review site, or a health agency page can be the page an answer quotes. You can keep one office
        name so a mention and your H1 match. You cannot edit their page from your deploy. To see whether ChatGPT names
        the office, repeat the same prompts and keep a log, as on{" "}
        <Link href="/how-to-check-if-chatgpt-mentions-your-brand">how to check if ChatGPT mentions your brand</Link>.
        The free check does not run those prompts.
      </p>

      <h2>There is no Chiropractor type</h2>
      <p>
        <a href={chiropractic}>schema.org Chiropractic</a>, read on 23 October 2026, is a system of medicine focused on
        the relationship between the body’s structure, mainly the spine, and its functioning. It is a MedicineSystem.
        It is not a business type. schema.org’s full type list, read the same day, has no type named Chiropractor under
        MedicalBusiness or anywhere else. <a href={medicineSystem}>schema.org medicineSystem</a>, read the same day, is
        the system of medicine that includes a MedicalEntity. Its examples include chiropractic. The property is used
        on MedicalEntity. <a href={medicalClinic}>schema.org MedicalClinic</a> is not a MedicalEntity. This guide does
        not put <code>medicineSystem</code> on the office script.
      </p>
      <p>
        <a href={medicalClinic}>schema.org MedicalClinic</a>, read on 23 October 2026, is a facility, often associated
        with a hospital or medical school, that is devoted to the specific diagnosis and/or healthcare. It is a{" "}
        <a href={medicalBusiness}>MedicalBusiness</a> and a LocalBusiness. Use MedicalClinic when the page is one
        chiropractic office that describes a clinic. Use <code>MedicalBusiness</code> or <code>LocalBusiness</code>{" "}
        when the page is a medical business and MedicalClinic does not fit.{" "}
        <a href={physician}>schema.org Physician</a>, read the same day, is an individual physician or a physician’s
        office considered as a MedicalOrganization. Use Physician only when the page is that. This guide does not say
        a chiropractic office is a physician’s office. <a href={physiotherapy}>schema.org Physiotherapy</a> is both a
        MedicalBusiness and a MedicalSpecialty. The enumeration, read the same day, is the practice of treatment of
        disease, injury, or deformity by physical methods such as massage, heat treatment, and exercise rather than by
        drugs or surgery. Use Physiotherapy only when the page is a physiotherapy practice. Do not use it as a stand-in
        for a chiropractic office. Do not use <code>Dentist</code>. Use <code>Organization</code> for a homepage that
        is not one street address.
      </p>
      <p>
        Google’s <a href={localBusiness}>local business documentation</a>, read on 23 October 2026, says to use the
        most specific subtype. Its examples are Restaurant, DaySpa, and HealthClub. It does not name MedicalClinic, and
        it does not name a chiropractic type, because schema.org does not define one. MedicalClinic still applies when
        the page is a clinic, because that is a LocalBusiness subtype schema.org defines. The same Google page requires{" "}
        <code>name</code> and <code>address</code> for a local business rich result. Recommended fields, when the page
        shows them, include <code>geo</code> to at least five decimal places, <code>openingHoursSpecification</code>,{" "}
        <code>telephone</code> with country code and area code, and the <code>url</code> of that office. Google does
        not guarantee that the panel or the list will show. Google’s <a href={gallery}>structured data gallery</a>,
        read on 23 October 2026, lists Local business. It does not list a separate chiropractic rich result.
      </p>
      <p>
        <a href={medicalSpecialty}>schema.org medicalSpecialty</a> is a medical specialty of the provider. The expected
        type is MedicalSpecialty. Chiropractic is not on that list. The{" "}
        <Link href="/medical-clinic-schema-generator">Medical clinic schema generator</Link> leaves a Chiropractic line
        out. Do not add Musculoskeletal, or any other specialty, unless the page states that specialty in words a
        person can read. A specialty the page does not name is not a way to label the office.{" "}
        <a href={availableService}>schema.org availableService</a> is a medical service available from a MedicalClinic,
        a Hospital, or a Physician. The clinic generator writes it only as a MedicalProcedure, a MedicalTest, or a
        MedicalTherapy, and only from a line you enter. Leave it off when the page does not name that service. A visit
        the site publishes on its own URL uses <a href={serviceType}>Service</a>, below. This guide does not describe
        how a visit is performed.
      </p>
      <pre className={preClass}>{officeExample}</pre>
      <p>
        That block is an example, not an office. <a href={sdPolicies}>Google’s structured data policies</a> say the
        markup has to describe content people can see. The example does not include <code>medicalSpecialty</code>,{" "}
        <code>medicineSystem</code>, <code>review</code>, or <code>aggregateRating</code>. The{" "}
        <Link href="/local-business-schema-generator">Local business schema generator</Link> already lists
        MedicalClinic and Physician. It does not list a Chiropractor type. It copies the name, the address, the phone,
        the hours as <code>openingHoursSpecification</code>, and optional geo into one script in the browser. The
        clinic generator writes <code>medicalSpecialty</code>, <code>availableService</code>, and the text property{" "}
        <code>openingHours</code>. Do not paste both MedicalClinic scripts on the same URL. Add a specialty only when
        the page shows a name on the MedicalSpecialty list. The address in either script is this office. It is not a
        patient’s home.
      </p>
      <p>
        A page that names one person, such as the practitioner the site already credits, uses <code>Person</code>. The{" "}
        <Link href="/person-schema-generator">Person schema generator</Link> builds that script. This guide does not
        print a personal name. A group homepage that is not one office can use the{" "}
        <Link href="/organization-schema-generator">Organization schema generator</Link>. A photo that shows a credit
        or a license uses the <Link href="/image-object-schema-generator">ImageObject schema generator</Link>. A
        dental office uses the <Link href="/dentist-schema-generator">Dentist schema generator</Link>. An agent office
        uses the <Link href="/real-estate-agent-schema-generator">Real estate agent schema generator</Link>. A plumbing business page uses the <Link href="/plumber-schema-generator">Plumber schema generator</Link>. Those
        pages are not this office.
      </p>

      <h2>One URL per service</h2>
      <p>
        An office visit, a consultation, and a new-patient visit are different offers when the site publishes them as
        different pages. Put the name of the visit, who it is for, and the office it belongs to in the HTML the server
        sends. Say the limit the page is willing to state, such as which office provides it, and leave out a clinical
        claim, a fee, or a result the page does not show. This guide does not say which services an office should
        offer, and it does not describe a technique. A draft service that is not public does not belong in the
        sitemap.
      </p>
      <p>
        <a href={serviceType}>schema.org Service</a> is that offer. <code>serviceType</code> is the label.{" "}
        <code>provider</code> is the office. <code>areaServed</code> is the place the page names. The{" "}
        <Link href="/service-schema-generator">Service schema generator</Link> copies that shape, with the provider as
        an Organization. It writes an Offer only when you enter both a price and a currency. Do not mark every city as
        its own Service when the page does not describe a different offer. Do not mark the whole office homepage as
        one Service that lists every visit. Do not hide a step-by-step in the script so a crawler has more text.
      </p>
      <pre className={preClass}>{serviceExample}</pre>
      <p>
        Questions the office itself answers, visible on the page, can use the{" "}
        <Link href="/faq-schema-generator">FAQ schema generator</Link>. Google stopped showing FAQ rich results in May
        2026. Other types are on the <Link href="/schema-markup-for-ai-search">schema guide</Link>. The longer clinic
        note is <Link href="/ai-search-visibility-for-healthcare">AI search visibility for healthcare</Link>.
      </p>

      <h2>The person the page already names</h2>
      <p>
        A page about one practitioner is a Person, not a second copy of the office. The person generator writes{" "}
        <code>jobTitle</code>, <code>worksFor</code>, <code>alumniOf</code>, and <code>knowsAbout</code> when you enter
        them. Use <code>knowsAbout</code> for a topic the bio already states. Do not use it as a list of every
        condition the office hopes to rank for. Google’s <a href={helpful}>helpful-content page</a> says trust is the
        most important part of E-E-A-T, that systems give more weight to strong E-E-A-T on topics that can affect
        health, and that fabricated authorship is deceptive. It does not say a byline produces a citation.
      </p>
      <p>
        If the page shows a credential, such as a degree or a license, and the jurisdiction, repeat that credential
        and the jurisdiction in a sentence a person can read. Do not add a credential the page does not show. A
        credential is not a citation, and this guide does not say which one an office must hold. The same sentence
        should match the Google Business Profile name for that person when the office publishes one. Two different
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
        sites that capture reviews about other businesses. An office marking up its own stars is outside that
        recommendation. Leave both properties off the office script. The local business generator already leaves them
        off. Google’s <a href={reviewDocs}>review snippet guidelines</a>, read on 23 October 2026, say the same limit
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
        For an office, link the homepage, each public office, and the public services you want read. Use canonical
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
        <li>Add MedicalClinic JSON-LD from those visible facts when the page is a clinic. Do not invent a Chiropractor type. Do not put Chiropractic in medicalSpecialty. Leave reviews and ratings off that script.</li>
        <li>Publish one URL per service the site actually offers. State the visit and the office in text. Point the service script at that URL. Leave a procedure the page does not show out of the script.</li>
        <li>Publish a person URL only for a practitioner the site already names. Repeat the credential the page already shows, with the jurisdiction.</li>
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

      <h2>Questions about chiropractic office visibility</h2>
      {chiropractorFaqs.map((item) => (
        <div key={item.q}>
          <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={chiropractic}>schema.org Chiropractic</a>, read 23 October 2026. A MedicineSystem. A system of
          medicine focused on the relationship between the body’s structure, mainly the spine, and its functioning. Not
          a LocalBusiness type.
        </li>
        <li>
          <a href={medicineSystem}>schema.org medicineSystem</a>, read 23 October 2026. The system of medicine that
          includes a MedicalEntity. Used on MedicalEntity. Not a property of MedicalClinic.
        </li>
        <li>
          <a href={medicalClinic}>schema.org MedicalClinic</a>, read 23 October 2026. A facility devoted to diagnosis
          or healthcare. A MedicalBusiness and a LocalBusiness. It can carry medicalSpecialty and availableService.
        </li>
        <li>
          <a href={physician}>schema.org Physician</a>, read 23 October 2026. An individual physician or a physician’s
          office.
        </li>
        <li>
          <a href={physiotherapy}>schema.org Physiotherapy</a>, read 23 October 2026. A MedicalBusiness and a
          MedicalSpecialty. Treatment by physical methods such as massage, heat treatment, and exercise rather than by
          drugs or surgery.
        </li>
        <li>
          <a href={medicalSpecialty}>schema.org medicalSpecialty</a>, read 23 October 2026. A MedicalSpecialty of the
          provider. Chiropractic is not on that enumeration.
        </li>
        <li>
          <a href={localBusiness}>Local business structured data</a>, read 23 October 2026. Required name and address,
          the most specific subtype, hours, and the review limit.
        </li>
        <li>
          <a href={reviewDocs}>Review snippet structured data</a>, read 23 October 2026. Self-serving reviews of a
          local business or organization are ineligible for the star feature.
        </li>
        <li>
          <a href={gallery}>Structured data gallery</a>, read 23 October 2026. Local business is listed. A separate
          chiropractic rich result is not.
        </li>
        <li>
          <a href={aiGuide}>Google’s generative AI optimization guide</a>, read 23 October 2026. Snippets, Business
          Profile, <code>llms.txt</code>, schema, and scaled content abuse.
        </li>
        <li>
          <a href={helpful}>Creating helpful content</a>, read 22 October 2026. Trust is the most important part of
          E-E-A-T, and health topics get more weight. Fabricated authorship is deceptive.
        </li>
        <li>
          <a href={sdPolicies}>Structured data general guidelines</a>, read 23 October 2026. Markup matches the visible
          page.
        </li>
        <li>
          <a href={spec}>The llms.txt proposal</a>, updated 10 August 2026, read 22 October 2026.
        </li>
      </ul>
    </>
  );
}
