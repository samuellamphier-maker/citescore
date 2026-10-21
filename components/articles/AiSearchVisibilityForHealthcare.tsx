import Link from "next/link";
import { GuideOffers } from "@/components/articles/GuideOffers";
import { preClass } from "@/components/articles/guide-links";

const medicalOrganization = "https://schema.org/MedicalOrganization";
const medicalClinic = "https://schema.org/MedicalClinic";
const physician = "https://schema.org/Physician";
const reviewedBy = "https://schema.org/reviewedBy";
const lastReviewed = "https://schema.org/lastReviewed";
const localBusiness =
  "https://developers.google.com/search/docs/appearance/structured-data/local-business";
const helpful =
  "https://developers.google.com/search/docs/fundamentals/creating-helpful-content";
const aiGuide = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";
const sdPolicies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";
const spec = "https://llmstxt.org/";

const clinicExample = `{
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "name": "Example Clinic",
  "url": "https://example.com/offices/springfield",
  "telephone": "+1-555-010-0100",
  "medicalSpecialty": "https://schema.org/PrimaryCare",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "100 Main Street",
    "addressLocality": "Springfield",
    "addressRegion": "IL",
    "postalCode": "62701",
    "addressCountry": "US"
  }
}`;

const serviceExample = `{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "New patient registration",
  "serviceType": "New patient registration",
  "description": "How to register at the Springfield office. Example markup only.",
  "url": "https://example.com/patients/registration",
  "provider": {
    "@type": "MedicalOrganization",
    "name": "Example Clinic",
    "url": "https://example.com"
  },
  "areaServed": "Springfield, Illinois"
}`;

const reviewedExample = `{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "What to bring to the Springfield office",
  "url": "https://example.com/patients/what-to-bring",
  "reviewedBy": {
    "@type": "Organization",
    "name": "Example Clinic",
    "url": "https://example.com"
  },
  "lastReviewed": "2026-10-01"
}`;

const llmsExample = `# Example Clinic

> Example Clinic is a clinic with one office in Springfield, Illinois. This file is an example.

## Patients

- [What to bring](https://example.com/patients/what-to-bring): The hours, address, and the items the page lists

## Offices

- [Springfield office](https://example.com/offices/springfield): The name, address, phone, and hours on that page

## Optional

- [News](https://example.com/news): Clinic announcements an agent can skip`;

export const healthcareFaqs = [
  {
    q: "Does MedicalOrganization, MedicalClinic, or Physician schema get a clinic cited by ChatGPT, Perplexity, or AI Overviews?",
    a: "No. schema.org describes MedicalOrganization as a medical organization such as a hospital, institution, or clinic, MedicalClinic as a facility devoted to diagnosis or healthcare, and Physician as an individual physician or a physician’s office. Google’s local business documentation says name and address are required for a local business rich result, and that Google does not guarantee the feature will show. Google’s optimization guide, read on 21 October 2026, says structured data is not required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features. None of those pages publishes a citation rate for clinics or health-tech sites. The script has to match the visible page. This page does not give medical advice.",
  },
  {
    q: "When should the page be MedicalOrganization, MedicalClinic, or Physician?",
    a: "Use MedicalClinic, or a more specific LocalBusiness subtype such as Hospital, Dentist, or Pharmacy, for one public location. Google’s local business page says to use the most specific LocalBusiness subtype, and MedicalClinic and Physician are LocalBusiness subtypes on schema.org. Use Physician when the page is one practitioner’s office or one named practitioner. Use MedicalOrganization for a medical organization that is not one storefront, including a health system page that is not a single address. A health-tech company that sells software is an Organization, and the product page is a SoftwareApplication, unless the company is itself a medical organization. Do not mark a software homepage up as a clinic.",
  },
  {
    q: "Does a reviewed-by line or llms.txt put a health site into ChatGPT or AI Overviews?",
    a: "No. schema.org’s reviewedBy property is the person or organization that reviewed the page for accuracy or completeness, and lastReviewed is the date of that review. Google’s local business and image-metadata pages do not list either property as a rich-result field. The line helps when a reader can see the same credit and the same date on the page. Google’s helpful-content page says trust matters more on topics that can affect health, and that fabricated bylines are deceptive. It does not say a reviewed-by credit produces a citation. The llms.txt proposal is a Markdown reading list. Google’s optimization guide says Google Search ignores llms.txt, so the file neither helps nor harms AI Overviews or AI Mode. A missing file is not a block, and a present file is not a citation.",
  },
  {
    q: "Does the free check query ChatGPT, Perplexity, or Google AI Overviews, or check medical accuracy?",
    a: "No. The free check reads the homepage, robots.txt for GPTBot, PerplexityBot, and Google-Extended, a non-empty llms.txt, a sitemap, and JSON-LD types on the homepage. It does not read OAI-SearchBot, it does not log into an answer engine or Search Console, and it does not review clinical statements. The $39 audit scores one public URL from the HTML we fetch. The per-engine snapshot is an inference, and the report says so. An office or service URL is outside the homepage check. CiteScore does not give medical advice.",
  },
];

export function AiSearchVisibilityForHealthcareArticle() {
  return (
    <>
      <p>
        A clinic, a practice, or a health-tech site is cited when an answer engine can fetch a page and find a sentence
        that states who the organization is, what the page covers, and the limit of that page. ChatGPT search,
        Perplexity search, and Google AI Overviews each publish a crawler or indexing control. None of those pages
        publishes a citation rate for healthcare, a required word count, or a schema type that turns a homepage into a
        footnote. CiteScore does not log into those products, and it does not give medical advice. The work on this
        page is the public record of the organization, one service URL, a visible review credit, local signals,{" "}
        <code>robots.txt</code>, and <code>llms.txt</code> as a reading list.
      </p>
      <p>
        The local markup rules are on <Link href="/geo-for-local-businesses">GEO for local businesses</Link>. The
        engine pages are <Link href="/how-to-get-cited-by-chatgpt">ChatGPT</Link>,{" "}
        <Link href="/how-to-get-cited-by-perplexity">Perplexity</Link>, and{" "}
        <Link href="/google-ai-overviews-optimization">Google AI Overviews</Link>. A law firm’s office page is on{" "}
        <Link href="/ai-search-visibility-for-law-firms">AI search visibility for law firms</Link>. A software
        company’s comparison page is on{" "}
        <Link href="/ai-search-visibility-for-b2b-saas">AI search visibility for B2B SaaS</Link>. A store’s price
        problem is on <Link href="/ai-search-visibility-for-ecommerce">AI search visibility for ecommerce</Link>. A brokerage, an agent, or a property manager is on <Link href="/ai-search-visibility-for-real-estate">AI search visibility for real estate</Link>. A restaurant’s location, menu, and hours are on <Link href="/ai-search-visibility-for-restaurants">AI search visibility for restaurants</Link>.
      </p>

      <h2>One page per service the site actually offers</h2>
      <p>
        Google’s <a href={aiGuide}>optimization guide</a>, read on 21 October 2026, says a unique page does more over
        time than a commodity summary, and that a separate URL for every query variation, written to manipulate
        rankings or generative AI responses, violates the scaled content abuse policy. A folder of city pages that only
        swap the city name is that pattern. A folder of condition pages that only swap the condition name is the same
        pattern. Write the services the organization actually offers, each on one URL.
      </p>
      <p>
        Name the place in the HTML when the page is about one office. A sentence that never says which city it
        describes answers a different question than the one a person asked. Put the question in a heading and the
        answer in the first text the server sends. A hero image is not that answer. Say who the page is for, and say
        the limit the page can support, including that the page is general information about the office when that is
        what the organization means. Leave out a result, a fee, a credential, and a clinical claim the page does not
        show. This guide does not say what a clinic should tell a patient about a condition.
      </p>
      <p>
        Link the office page and the about page with the same name as each H1. Google’s guide says there is no ideal
        length and no requirement to break a page into tiny chunks. One clear page is enough. AI Overviews and AI Mode
        still require the page to be indexed and eligible for a snippet, and the site to be included in Search
        generative AI features in Search Console. Meeting those rules does not guarantee indexing. AI Mode uses the
        same eligibility, on <Link href="/google-ai-mode-optimization">Google AI Mode optimization</Link>.
      </p>

      <h2>E-E-A-T is the visible credit</h2>
      <p>
        Google’s <a href={helpful}>helpful-content page</a>, read on 21 October 2026, says ranking systems use a mix of
        factors that can identify experience, expertise, authoritativeness, and trustworthiness, which Google calls
        E-E-A-T. Trust is the important one. E-E-A-T is not itself a ranking factor, and there is no schema type named
        E-E-A-T. The same page says systems give more weight to content with strong E-E-A-T on topics that could
        significantly affect health, financial stability, or safety, which Google calls Your Money or Your Life. A page
        that states health information is in that set. A page of office hours is still a page a reader has to be able
        to trust.
      </p>
      <p>
        The practical questions on that page are who created the content, how it was produced, and why. A byline where
        a reader would expect one, and a link to background about that author or about the organization, is the “who.”
        Google says fabricated profiles, made-up names, and false credentials are deceptive. Do not invent a reviewer
        to satisfy a form. If automation drafted the page, say so where a reader would ask how it was made. The “why”
        is a page that helps someone who already meant to visit the site. A page written to chase a query is the
        pattern Google tells sites to avoid. For YMYL topics, Google’s page also says the main content has to be highly
        accurate and consistent with expert consensus. CiteScore does not judge that consensus, and this guide does
        not state it.
      </p>

      <h2>MedicalOrganization, MedicalClinic, and Physician</h2>
      <p>
        <a href={medicalOrganization}>schema.org MedicalOrganization</a>, read on 21 October 2026, is a medical
        organization, physical or not, such as a hospital, an institution, or a clinic. It is an Organization. It is
        not a LocalBusiness. <a href={medicalClinic}>schema.org MedicalClinic</a> is a facility devoted to diagnosis or
        healthcare, and it is a LocalBusiness. <a href={physician}>schema.org Physician</a> is an individual physician
        or a physician’s office considered as a MedicalOrganization, and it is also a LocalBusiness.
      </p>
      <p>
        Google’s <a href={localBusiness}>local business documentation</a>, read on 21 October 2026, requires{" "}
        <code>name</code> and <code>address</code> for a local business rich result. It says to use the most specific{" "}
        <code>LocalBusiness</code> subtype. Recommended fields, when the page shows them, include <code>geo</code> to
        at least five decimal places, <code>openingHoursSpecification</code>, <code>telephone</code> with country code
        and area code, and the <code>url</code> of that location. <code>priceRange</code> has to be shorter than 100
        characters when you include it. Google does not guarantee that the panel or the list will show. A health-tech
        site with no public clinic address does not meet that rich result, and it should not pretend to.
      </p>
      <pre className={preClass}>{clinicExample}</pre>
      <p>
        That block is an example, not a clinic. <code>medicalSpecialty</code> is included only because the example page
        would state primary care. schema.org’s value is a MedicalSpecialty URL, such as{" "}
        <code>https://schema.org/PrimaryCare</code>. Leave it out when the page does not name a specialty.{" "}
        <code>isAcceptingNewPatients</code> belongs only when the page says whether the office is accepting new
        patients. <code>usNPI</code> belongs only when the page shows that identifier. Do not invent one.{" "}
        <a href={sdPolicies}>Google’s structured data policies</a> say the markup has to describe content people can
        see. The <Link href="/local-business-schema-generator">Local business schema generator</Link> already lists
        MedicalClinic, Physician, Hospital, Dentist, and Pharmacy. Choose the one the page is. It copies the name, the
        address, the phone, the hours, and optional geo into one script in the browser. It does not emit{" "}
        <code>review</code> or <code>aggregateRating</code>. Google recommends those properties only for sites that
        capture reviews about other businesses. A clinic marking up its own stars is outside that recommendation.
      </p>
      <p>
        Use <code>Physician</code> for the page about one office or one named practitioner. The name in the script is
        the name on the page. This guide does not print a personal name. A profile that is not the office uses{" "}
        <code>Person</code>: the name, the role, the organization as <code>worksFor</code>, and the profile URLs the
        page already shows. The <Link href="/person-schema-generator">Person schema generator</Link> builds that
        script. A health system that is not one address can use <code>MedicalOrganization</code> on the page that
        describes the organization. A software company uses the{" "}
        <Link href="/organization-schema-generator">Organization schema generator</Link> and, for the product, the{" "}
        <Link href="/software-application-schema-generator">Software application schema generator</Link>. Do not mark
        the product up as a clinic.
      </p>

      <h2>Reviewed-by credits</h2>
      <p>
        <a href={reviewedBy}>schema.org reviewedBy</a>, read on 21 October 2026, is the person or organization that
        reviewed the page for accuracy or completeness. <a href={lastReviewed}>lastReviewed</a> is the date of that
        review. Both are properties of <code>WebPage</code>. Google’s local business table does not list them, and
        this guide does not claim a rich result for them. The credit is useful when the HTML shows the same
        organization or the same role, and the same date. A credit that exists only in the script describes a review
        the reader cannot see.
      </p>
      <pre className={preClass}>{reviewedExample}</pre>
      <p>
        Use <code>Organization</code> when the credit is the clinic or the health-tech company. Use <code>Person</code>{" "}
        only when the page names a person, and link that name to the profile. Do not invent a person, a credential, or
        a date. A photo on the page uses the{" "}
        <Link href="/image-object-schema-generator">ImageObject schema generator</Link> for the file URL, the caption,
        and the license the page already shows. Questions the organization itself answers, visible on the page, can
        use the <Link href="/faq-schema-generator">FAQ schema generator</Link>. Google stopped showing FAQ rich results
        in May 2026. A forum where people submit answers is a QAPage, on the{" "}
        <Link href="/qa-page-schema-generator">QAPage schema generator</Link>, and an organization-written FAQ is not
        that page.
      </p>

      <h2>Service pages, without a procedure type</h2>
      <p>
        Each public service URL states the work, the place, and the provider. <code>Service</code> is the schema.org
        type for that page. schema.org also defines <code>availableService</code> on MedicalClinic and Physician, with
        values such as MedicalProcedure. This guide does not write a procedure, a test, or a therapy. If the page is
        about registration, hours, or what to bring, Service is the labeled copy. <code>provider</code> is the
        organization. <code>areaServed</code> is the place the page names. <code>offers</code> belongs only when the
        page shows a price and a currency.
      </p>
      <pre className={preClass}>{serviceExample}</pre>
      <p>
        The <Link href="/service-schema-generator">Service schema generator</Link> copies that shape in the browser.
        One service per page. A second service is a second URL, not a second name stuffed into the first script. Other
        types are on the <Link href="/schema-markup-for-ai-search">schema guide</Link>.
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
        Each office is its own <code>MedicalClinic</code> or <code>Physician</code>. A department that shares the
        address and the phone is a page on the site, not a second location. Google’s <code>department</code> property
        is for a nested unit with its own phone or hours, and the department name should include the organization name
        unless the department is its own brand. The profile is not a substitute for the HTML. A page behind a portal
        login is one the crawler does not receive. A health-tech product with no public address skips this section.
        The longer local note is <Link href="/geo-for-local-businesses">GEO for local businesses</Link>.
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
        firewall 403. A patient portal, a record, and an intake draft that is not a public page stay disallowed. The
        public office page has to be allowed if you want it fetched.
      </p>

      <h2>llms.txt is a reading list</h2>
      <p>
        <a href={spec}>The llms.txt proposal</a>, v2, updated 10 August 2026 and read on 21 October 2026, is an optional
        Markdown file, usually at <code>/llms.txt</code>. The H1 is the only required section. Google’s optimization
        guide says Google Search ignores the file, so it neither helps nor harms AI Overviews, AI Mode, or other
        Google Search rankings. A missing file is not a block, and a present file is not a citation.
      </p>
      <p>
        For a clinic, link the homepage, each office, the public service pages, and the public about page. For a
        health-tech site, link the product page, the docs, and the about page. Use canonical URLs. Leave out the
        portal, records, and any page that asks the reader to sign in. The proposal says the links should point at a
        Markdown version of the page when you publish one. Until you do, link the public HTML URL. Section order and
        the mistakes that break a read of the spec are on{" "}
        <Link href="/llms-txt-best-practices">llms.txt best practices</Link>. The{" "}
        <Link href="/llms-txt-generator">llms.txt generator</Link> copies a starter file in the browser. The{" "}
        <Link href="/llms-txt">checker</Link> only looks for a non-empty file.
      </p>
      <pre className={preClass}>{llmsExample}</pre>

      <h2>What you can measure</h2>
      <p>
        Google’s optimization guide tells a site owner to use the Generative AI performance report in Search Console
        for AI Overviews and AI Mode on Google Search. CiteScore does not read Search Console. To see whether ChatGPT
        names the organization, repeat the same prompts and keep a log, as on{" "}
        <Link href="/how-to-check-if-chatgpt-mentions-your-brand">how to check if ChatGPT mentions your brand</Link>.
        The free check does not run those prompts. Pages you do not control — a directory, a hospital system, a
        publisher — are often the source an answer quotes. You can keep one organization name so their mention and
        your H1 match. You cannot edit their page from your deploy.
      </p>

      <h2>A workable order</h2>
      <ol>
        <li>Publish one office URL with the name, street, phone, and hours in the HTML, and the same facts on the Business Profile. Skip this when the site has no public address.</li>
        <li>Add MedicalClinic or Physician JSON-LD from those visible facts. Leave reviews, ratings, and any identifier the page does not show off the script.</li>
        <li>Publish one URL per service the organization offers. State the place and the limit in text. Add Service markup from that page. Do not invent a procedure type.</li>
        <li>Put a reviewed-by credit and a review date on any page a reader would expect someone to have checked, and repeat that credit in WebPage markup only when it is visible.</li>
        <li>Allow OAI-SearchBot, PerplexityBot, and Googlebot on the public pages. Decide GPTBot and Google-Extended separately. Keep portals and records disallowed.</li>
        <li>Add <code>/llms.txt</code> only as a curated list for readers other than Google Search.</li>
        <li>Submit the sitemap, and confirm Search Console includes the site in generative AI features.</li>
      </ol>
      <p>
        These steps make a sentence fetchable. They are not a citation, and they are not medical advice. The longer
        on-page list is the <Link href="/checklist">AI Citation Readiness Checklist</Link>.
      </p>

      <GuideOffers
        freeCheck={
          <>
            Run the <Link href="/free-check">free check</Link> on the public host. It reads the homepage, GPTBot,
            PerplexityBot, Google-Extended, <code>llms.txt</code>, a sitemap, and homepage JSON-LD. It does not read
            OAI-SearchBot, it does not query an answer engine, and it does not review clinical statements. For an
            office or service URL, use the <Link href="/geo-audit">$39 GEO audit</Link>. The homepage check does not
            open that path.
          </>
        }
      />

      <h2>Questions about healthcare visibility</h2>
      {healthcareFaqs.map((item) => (
        <div key={item.q}>
          <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={medicalOrganization}>schema.org MedicalOrganization</a>, read 21 October 2026. A medical
          organization, such as a hospital, institution, or clinic.
        </li>
        <li>
          <a href={medicalClinic}>schema.org MedicalClinic</a>, read 21 October 2026. A LocalBusiness facility.
        </li>
        <li>
          <a href={physician}>schema.org Physician</a>, read 21 October 2026. A physician or a physician’s office.
        </li>
        <li>
          <a href={reviewedBy}>schema.org reviewedBy</a> and <a href={lastReviewed}>lastReviewed</a>, read 21 October
          2026. The reviewer and the review date on a WebPage.
        </li>
        <li>
          <a href={localBusiness}>Local business structured data</a>, read 21 October 2026. Required name and address,
          the most specific subtype, and the review limit.
        </li>
        <li>
          <a href={helpful}>Creating helpful, reliable, people-first content</a>, read 21 October 2026. E-E-A-T, YMYL,
          and who created the page.
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
