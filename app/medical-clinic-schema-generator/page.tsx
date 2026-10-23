import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { MedicalClinicSchemaGenerator } from "@/components/MedicalClinicSchemaGenerator";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { pageMeta } from "@/lib/content/meta";
import { getTopic } from "@/lib/content/topics";
import { MEDICAL_SERVICE_TYPES, MEDICAL_SPECIALTIES } from "@/lib/generators";

const topic = getTopic("/medical-clinic-schema-generator");

const clinicType = "https://schema.org/MedicalClinic";
const medicalBusiness = "https://schema.org/MedicalBusiness";
const medicalOrganization = "https://schema.org/MedicalOrganization";
const specialtyProp = "https://schema.org/medicalSpecialty";
const specialtyType = "https://schema.org/MedicalSpecialty";
const serviceProp = "https://schema.org/availableService";
const hoursProp = "https://schema.org/openingHours";
const hoursObject = "https://schema.org/openingHoursSpecification";
const logoProp = "https://schema.org/logo";
const sameAsProp = "https://schema.org/sameAs";
const localBusiness = "https://developers.google.com/search/docs/appearance/structured-data/local-business";
const gallery = "https://developers.google.com/search/docs/appearance/structured-data/search-gallery";
const policies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";
const aiGuide = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";
const reviewDocs = "https://developers.google.com/search/docs/appearance/structured-data/review-snippet";

const faqs = [
  {
    q: "Does MedicalClinic schema guarantee a Google listing, a knowledge panel, or an AI citation?",
    a: "No. schema.org MedicalClinic is a facility devoted to diagnosis or healthcare. It is a MedicalBusiness, which is a LocalBusiness, and it is also a MedicalOrganization. Google’s local business documentation says name and address are required for a local business rich result, and that Google does not guarantee the feature will show. Google’s structured data gallery, read on 23 October 2026, lists Local business. It does not list a separate MedicalClinic rich result. Google’s optimization guide says structured data is not required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features. The script does not make ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, Meta AI, DeepSeek, Mistral, Brave Search, You.com, DuckDuckGo, or Google AI Overviews cite the page. CiteScore does not give medical advice.",
  },
  {
    q: "Which fields does this form require?",
    a: "schema.org does not list a required property for MedicalClinic. This generator writes a script once the name is present. url, logo, telephone, address, geo, openingHours, medicalSpecialty, availableService, and sameAs are included only when they are valid. Google’s local business page requires name and address for that rich result. This form still writes a script from the name alone, because the page may not be aiming at that feature. An address is written when any address field is filled. Geo is written only when latitude and longitude are both in range. A specialty is written only when it is a schema.org MedicalSpecialty name. A service is written only when the name is short and the type is MedicalProcedure, MedicalTest, or MedicalTherapy.",
  },
  {
    q: "Why does the script write openingHours text instead of openingHoursSpecification?",
    a: "schema.org openingHours is text, such as Mo-Fr 09:00-17:00. Consecutive days in one row become a range. Two rows become an array of those strings. schema.org openingHoursSpecification is a different property, an object with a day and a clock time. Google’s local business documentation, read on 23 October 2026, lists openingHoursSpecification for hours. It does not list the text property openingHours. This form writes the text property. It does not also write openingHoursSpecification. The local business schema generator writes the object, and it lists MedicalClinic. It does not write medicalSpecialty or availableService. Do not paste both MedicalClinic scripts on the same URL. Add the object by hand on this script only when you want the property Google’s table lists and the page shows those hours.",
  },
  {
    q: "Where should the script go, and what should it leave out?",
    a: "On the page for that clinic, in the HTML the server sends, where a person can already see the name and the other facts you mark up. Google’s structured data policies say not to mark up content that is not visible to readers of the page. The script is built in the browser. Nothing is sent to CiteScore. One script is one clinic. A second location is a second page. Leave out a specialty, a service, a phone, a coordinate, a logo, or a profile the page does not show. Leave out a patient’s name, a visit, a diagnosis, and an insurance member number. Dentist, Physician, and Hospital are different types. A dental office uses Dentist. This form writes MedicalClinic.",
  },
];

const related = [
  { href: "/llms-txt-generator", label: "llms.txt generator" },
  { href: "/robots-txt-ai-crawler-generator", label: "robots.txt AI crawler generator" },
  { href: "/faq-schema-generator", label: "FAQ schema generator" },
  { href: "/organization-schema-generator", label: "Organization schema generator" },
  { href: "/product-schema-generator", label: "Product schema generator" },
  { href: "/article-schema-generator", label: "Article schema generator" },
  { href: "/local-business-schema-generator", label: "Local business schema generator" },
  { href: "/breadcrumb-schema-generator", label: "Breadcrumb schema generator" },
  { href: "/howto-schema-generator", label: "HowTo schema generator" },
  { href: "/software-application-schema-generator", label: "Software application schema generator" },
  { href: "/person-schema-generator", label: "Person schema generator" },
  { href: "/website-schema-generator", label: "WebSite schema generator" },
  { href: "/video-schema-generator", label: "Video schema generator" },
  { href: "/event-schema-generator", label: "Event schema generator" },
  { href: "/review-schema-generator", label: "Review schema generator" },
  { href: "/service-schema-generator", label: "Service schema generator" },
  { href: "/course-schema-generator", label: "Course schema generator" },
  { href: "/job-posting-schema-generator", label: "Job posting schema generator" },
  { href: "/recipe-schema-generator", label: "Recipe schema generator" },
  { href: "/qa-page-schema-generator", label: "QAPage schema generator" },
  { href: "/speakable-schema-generator", label: "Speakable schema generator" },
  { href: "/image-object-schema-generator", label: "ImageObject schema generator" },
  { href: "/book-schema-generator", label: "Book schema generator" },
  { href: "/podcast-schema-generator", label: "Podcast schema generator" },
  { href: "/movie-schema-generator", label: "Movie schema generator" },
  { href: "/dataset-schema-generator", label: "Dataset schema generator" },
  { href: "/vehicle-schema-generator", label: "Vehicle schema generator" },
  { href: "/hotel-schema-generator", label: "Hotel schema generator" },
  { href: "/restaurant-schema-generator", label: "Restaurant schema generator" },
  { href: "/medical-clinic-schema-generator", label: "Medical clinic schema generator" },
  { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
  { href: "/ai-search-visibility-for-law-firms", label: "AI search visibility for law firms" },
  { href: "/ai-search-visibility-for-healthcare", label: "AI search visibility for healthcare" },
  { href: "/ai-search-visibility-for-real-estate", label: "AI search visibility for real estate" },
  { href: "/ai-search-visibility-for-restaurants", label: "AI search visibility for restaurants" },
  { href: "/ai-search-visibility-for-accountants", label: "AI search visibility for accountants" },
  { href: "/ai-search-visibility-for-dentists", label: "AI search visibility for dentists" },
  { href: "/ai-search-visibility-for-plumbers", label: "AI search visibility for plumbers" },
  { href: "/ai-search-visibility-for-hvac", label: "AI search visibility for HVAC" },
  { href: "/ai-search-visibility-for-roofers", label: "AI search visibility for roofers" },
  { href: "/ai-search-visibility-for-electricians", label: "AI search visibility for electricians" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function MedicalClinicSchemaGeneratorPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }}
      />
      <ArticleShell
        kicker={topic.kicker}
        title={topic.title}
        dek={topic.description}
        publishedAt={topic.publishedAt}
        minutes={topic.minutes}
        author="CiteScore Team"
        ctaId="medical-clinic-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <MedicalClinicSchemaGenerator />
        <h2>Why the clinic is labeled</h2>
        <p>
          A clinic page can put the name in the H1, the specialty in a sentence, the hours in a footer, and the phone
          in a header. An answer engine that quotes the page still has to decide which string is the clinic, which
          words are the specialty, and which clock time is the public hours.{" "}
          <a href={clinicType}>schema.org MedicalClinic</a> is that decision written down. A parser, including the ones
          behind ChatGPT, Perplexity, Claude, Gemini, and Google AI Overviews, can read those labels without guessing
          which URL was a patient portal. The script does not create a citation, and it does not rank the page.
          CiteScore does not give medical advice.
        </p>
        <p>
          Google’s <a href={aiGuide}>optimization guide</a>, read on 23 October 2026, says structured data is not
          required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features.
          The useful part is the same as for any other labeled fact: the name, the address, the specialty, the hours,
          and the services are in the HTML, in words a person can read. The longer note on which facts to repeat is the{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link>. The practical page for a clinic, a physician,
          or a health-tech site is{" "}
          <Link href="/ai-search-visibility-for-healthcare">AI search visibility for healthcare</Link>. A dental office
          is a different type, on{" "}
          <Link href="/ai-search-visibility-for-dentists">AI search visibility for dentists</Link>.
        </p>
        <p>
          <a href={clinicType}>schema.org MedicalClinic</a>, read on 23 October 2026, is a facility, often associated
          with a hospital or medical school, that is devoted to the specific diagnosis and/or healthcare. It was
          previously limited to outpatients, and with evolution it may be open to inpatients as well. MedicalClinic is
          a <a href={medicalBusiness}>MedicalBusiness</a>, and MedicalBusiness is a LocalBusiness. MedicalClinic is also
          a <a href={medicalOrganization}>MedicalOrganization</a>. Use MedicalClinic when the page is a clinic. Dentist,
          Physician, Hospital, Pharmacy, and Optician are different types. They are already in the{" "}
          <Link href="/local-business-schema-generator">Local business schema generator</Link>, which also lists
          MedicalClinic. That form writes the name, the address, the phone, the hours as{" "}
          <code>openingHoursSpecification</code>, geo, a logo, an image, and profile URLs. It does not write{" "}
          <code>medicalSpecialty</code>, <code>availableService</code>, or the text property <code>openingHours</code>.
          This form writes those clinic fields, and it also writes the name, the address, the phone, geo, a logo, and
          profile URLs, so one script is enough. Do not paste both MedicalClinic scripts on the same URL.
        </p>
        <p>
          Google’s <a href={localBusiness}>local business documentation</a>, read on 23 October 2026, says to use the
          most specific subtype, and it requires <code>name</code> and <code>address</code> for a local business rich
          result. Its examples are Restaurant, DaySpa, and HealthClub. It does not name MedicalClinic. The subtype
          still applies, because that is the type schema.org defines for this place. Google does not guarantee that
          the panel or the list will show. The <a href={gallery}>structured data gallery</a>, read the same day, lists
          Local business. It does not list a separate clinic feature. A restaurant page uses the{" "}
          <Link href="/restaurant-schema-generator">Restaurant schema generator</Link>. An electrical contractor is a
          different page, on{" "}
          <Link href="/ai-search-visibility-for-electricians">AI search visibility for electricians</Link>.
        </p>
        <h2>What each field is</h2>
        <p>
          The script needs the name a person can see. <code>url</code> is the clinic page. <a href={logoProp}>logo</a>{" "}
          is an ImageObject or a URL. This form writes one http(s) URL, the same shape the local business form uses
          for a logo. It does not wrap that URL in an ImageObject, and it does not write <code>image</code>. It cannot
          measure the file. A logo file that also shows a credit or a license can use the{" "}
          <Link href="/image-object-schema-generator">ImageObject schema generator</Link> as a second script. Do not
          put a patient photo in the logo field.
        </p>
        <p>
          <code>address</code> is a PostalAddress: street, locality, region, postal code, and country. Any one of those
          is enough for this form to write the object, and empty parts are left out. A two-letter country code is
          uppercased. Google’s local business page says to include as many address properties as possible. This form
          does not invent a street the page does not show. If the page does not show a street address, leave it blank.
          A patient’s home address does not belong in the script.
        </p>
        <p>
          <code>geo</code> is a GeoCoordinates pair. Latitude runs from -90 to 90. Longitude runs from -180 to 180. One
          without the other is left out. Google’s local business page says the precision must be at least five decimal
          places. This form still writes a shorter pair, because that is the number the page shows. Do not add
          coordinates the page does not publish.
        </p>
        <p>
          <code>telephone</code> keeps the formatting you type when the string has 7 to 15 digits and no other letters.
          A sentence is left out. Google’s local business page says to include the country code and area code. The
          number is the one on the clinic page, not a different desk the page does not show, and not a patient’s phone.
        </p>
        <p>
          <a href={hoursProp}>schema.org openingHours</a> is text. Days use <code>Mo</code>, <code>Tu</code>,{" "}
          <code>We</code>, <code>Th</code>, <code>Fr</code>, <code>Sa</code>, and <code>Su</code>. A comma separates
          days. A hyphen marks a range. schema.org’s pharmacy example is <code>Mo,Tu,We,Th 09:00-12:00</code>. A second
          example uses an array, including <code>Mo-Fr 10:00-19:00</code>. This form writes one string per row.
          Consecutive days in that row become a range, so Monday through Friday at 09:00 to 17:00 is{" "}
          <code>Mo-Fr 09:00-17:00</code>. Monday, Wednesday, and Friday stay <code>Mo,We,Fr</code>. Two different rows
          become an array. A repeated string is written once. A row without a day or a valid 24-hour time is left out.
          Seconds are kept when you type them. A day you do not check is omitted. The text property has no separate
          closed flag. <a href={hoursObject}>openingHoursSpecification</a> is the object Google’s local business table
          lists, with <code>dayOfWeek</code>, <code>opens</code>, and <code>closes</code>. This form does not write it.
        </p>
        <p>
          <a href={specialtyProp}>schema.org medicalSpecialty</a> is a medical specialty of the provider. The expected
          type is <a href={specialtyType}>MedicalSpecialty</a>, an enumeration. This form writes the https URL for a
          name on that list, such as <code>https://schema.org/PrimaryCare</code>. One specialty is one URL. Two become
          an array. A repeated name is written once. <code>Cardiology</code> is left out, because the enumeration name
          is <code>Cardiovascular</code>. A sentence is left out. The names, read on 23 October 2026, are{" "}
          {MEDICAL_SPECIALTIES.join(", ")}. Add one only when the page names that specialty. Do not add every name to
          look complete.
        </p>
        <p>
          <a href={serviceProp}>schema.org availableService</a> is a medical service available from this provider.
          schema.org expects a MedicalProcedure, a MedicalTest, or a MedicalTherapy. The property is defined for
          Hospital, MedicalClinic, and Physician. This form writes <code>@type</code> and <code>name</code>. A line
          with no pipe is a MedicalProcedure. After a pipe, the type is one of {MEDICAL_SERVICE_TYPES.join(", ")}. One
          service is one object. Two become an array. A name longer than 80 characters, any other type, or a repeated
          pair is left out. The name is the service the page offers, such as an annual physical. It is not one
          patient’s appointment, a diagnosis, a price, or a billing code. This form does not write <code>code</code>,{" "}
          <code>bodyLocation</code>, <code>howPerformed</code>, or <code>preparation</code>. A page that describes one
          non-clinical offer, such as new-patient registration, can use the{" "}
          <Link href="/service-schema-generator">Service schema generator</Link> on that URL instead. Do not put both a
          MedicalProcedure and a Service on a page that is only the registration form.
        </p>
        <p>
          <a href={sameAsProp}>schema.org sameAs</a> is a URL that unambiguously indicates the item, such as a profile
          the clinic controls. One valid URL is a single value. Two become an array. A repeated URL is written once. A
          sentence is left out. Do not add a directory you do not control, a hashtag, or a patient’s page.
        </p>
        <p>
          Google’s <a href={policies}>structured data policies</a>, read on 23 October 2026, say not to mark up content
          that is not visible to readers of the page, and that the structured data must be a true representation of the
          page content. Google’s local business page recommends <code>review</code> and <code>aggregateRating</code>{" "}
          only for sites that capture reviews about other local businesses. Google’s{" "}
          <a href={reviewDocs}>review snippet guidelines</a> are the same limit. This form does not write either
          property. A clinic marking up stars it collected about itself is outside that recommendation. The copy block
          is one <code>script</code> tag. Paste it into the HTML the server sends. Answer engines often skip text that
          only appears after JavaScript runs. The <Link href="/free-check">free check</Link> lists the JSON-LD{" "}
          <code>@type</code> values on the homepage. A clinic URL at another path is outside that fetch. The{" "}
          <Link href="/geo-audit">$39 audit</Link> looks for markup that matches the copy.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for that clinic page, in the head or the body.</li>
          <li>Confirm the same name, page URL, logo, phone, address, coordinates, hours, specialties, services, and profile URLs are visible on that page.</li>
          <li>Leave a specialty or a service blank when the page does not name it. Leave the street blank when the page does not show one.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>A patient’s name, a visit, a diagnosis, a photo, a phone number, or a home address.</li>
          <li>A specialty, a service, a logo, a coordinate, or a profile the page does not show.</li>
          <li>openingHoursSpecification, image, review, and aggregateRating. This form does not write them.</li>
          <li>A second MedicalClinic script from the local business generator on the same URL.</li>
          <li>Dentist, Physician, or Hospital in this script. This form writes MedicalClinic.</li>
          <li>A billing code, a price, or how a procedure is performed. The name is the service the page offers.</li>
          <li>The same MedicalClinic block on every URL of the site.</li>
        </ul>
        <h2>Questions about clinic schema</h2>
        {faqs.map((item) => (
          <div key={item.q}>
            <h3 className="font-serif text-xl text-ink">{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}
        <ToolNextLinks />
      </ArticleShell>
    </>
  );
}
