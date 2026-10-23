import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { DatasetSchemaGenerator } from "@/components/DatasetSchemaGenerator";
import { JsonLd } from "@/components/JsonLd";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { pageMeta } from "@/lib/content/meta";
import { getTopic } from "@/lib/content/topics";

const topic = getTopic("/dataset-schema-generator");

const datasetType = "https://schema.org/Dataset";
const distributionProp = "https://schema.org/distribution";
const downloadType = "https://schema.org/DataDownload";
const licenseProp = "https://schema.org/license";
const creatorProp = "https://schema.org/creator";
const keywordsProp = "https://schema.org/keywords";
const temporalProp = "https://schema.org/temporalCoverage";
const datasetDocs = "https://developers.google.com/search/docs/appearance/structured-data/dataset";
const gallery = "https://developers.google.com/search/docs/appearance/structured-data/search-gallery";
const policies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";
const aiGuide = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";

const faqs = [
  {
    q: "Does Dataset schema guarantee a place in Google Dataset Search, a rich result, or an AI citation?",
    a: "No. schema.org Dataset is a body of structured information. Google’s dataset documentation, read on 22 October 2026, says datasets are easier to find in Dataset Search when the page provides name, description, creator, and distribution formats, and that the actual appearance in search results might be different. The structured data gallery, read the same day, lists Dataset and describes it as large data sets that appear in Google Dataset Search. Google’s structured data policies say using structured data does not guarantee that a feature will be present. Google’s optimization guide, read the same day, says structured data is not required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features. The script does not make ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, Meta AI, DeepSeek, Mistral, Brave Search, You.com, DuckDuckGo, or Google AI Overviews cite the page.",
  },
  {
    q: "Which fields does this form require?",
    a: "schema.org does not list a required property for Dataset. This generator writes a script once the name is present. description, url, license, creator, keywords, temporalCoverage, and distribution are included only when they are valid. A creator URL without a name is left out. One named creator is one object. Two become an array. A license token without a URL is left out. A download is written only when contentUrl is an http(s) URL. encodingFormat is included only when it is short text or a URL. Google’s dataset page requires name and description, and the description must be 50 to 5000 characters. This form still writes a script from the name alone, and it still writes a summary outside that length, because the page may not be aiming at Dataset Search.",
  },
  {
    q: "Why is temporalCoverage written as 2011/2012 for a single year, and why is the license a URL?",
    a: "schema.org temporalCoverage is the period the content describes, in ISO 8601. Its dataset example writes the year 2011 as 2011/2012. An open end uses two dots, as in 2013-12-19/.. Google’s dataset page shows a single year as 2008, a closed interval as 1950-01-01/2013-12-18, and an open interval as 2013-12-19/.. This form accepts those shapes. It does not accept a sentence such as “the 2011 census.” schema.org license is a CreativeWork or a URL. Google’s dataset page recommends a URL that identifies a specific license version, and its example is a string URL, not a license name. This form writes that URL. Add a CreativeWork by hand only when the page shows a custom license name and that URL.",
  },
  {
    q: "Where should the script go, and can one page list every file in the repository?",
    a: "On the page for that dataset, in the HTML the server sends, where a person can already see the name and the other facts you mark up. Google’s structured data policies say not to mark up content that is not visible to readers of the page. Google’s dataset page says to add the markup on the canonical landing page, and to use sameAs when the same dataset is also marked up on a listing page. The script is built in the browser. Nothing is sent to CiteScore. One script is one dataset. A second dataset is a second page. This form does not write sameAs, and it does not write an ItemList of every file. A distribution row is one download of this dataset.",
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
  { href: "/attorney-schema-generator", label: "Attorney schema generator" },
  { href: "/dentist-schema-generator", label: "Dentist schema generator" },
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
  { href: "/ai-search-visibility-for-landscapers", label: "AI search visibility for landscapers" },
  { href: "/ai-search-visibility-for-auto-repair", label: "AI search visibility for auto repair" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function DatasetSchemaGeneratorPage() {
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
        ctaId="dataset-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <DatasetSchemaGenerator />
        <h2>Why the dataset is labeled</h2>
        <p>
          A dataset page can put the title in the H1, a paragraph of summary under it, a license link in the footer,
          and a CSV link in a button. An answer engine that quotes the page still has to decide which string is the
          name, which URL is the license, and which link is the file. <a href={datasetType}>schema.org Dataset</a> is
          that decision written down. A parser, including the ones behind ChatGPT, Perplexity, Claude, Gemini, and
          Google AI Overviews, can read those labels without guessing which link was the download. The script does not
          create a citation, and it does not rank the page.
        </p>
        <p>
          Google’s <a href={aiGuide}>optimization guide</a>, read on 22 October 2026, says structured data is not
          required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features.
          The useful part is the same as for any other labeled fact: the name, the summary, the license, and the file
          are in the HTML, in words a person can read. The longer note on which facts to repeat is the{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link>.
        </p>
        <p>
          Google’s <a href={datasetDocs}>dataset documentation</a>, read on 22 October 2026, says this markup is for
          discovery of datasets, including life sciences, social sciences, machine learning, and civic and government
          data. A table, a CSV, a collection of files, or a file of trained parameters can be a dataset on that page.
          The feature it describes is Dataset Search. The <a href={gallery}>structured data gallery</a>, read the same
          day, lists Dataset and describes it as large data sets that appear in Google Dataset Search. Listing the
          feature is not a placement. This form writes one Dataset for one landing page. It does not write DCAT, and
          it does not write CSVW. A film page uses the <Link href="/movie-schema-generator">Movie schema generator</Link>.
          A vehicle page uses the <Link href="/vehicle-schema-generator">Vehicle schema generator</Link>. A hotel page uses the <Link href="/hotel-schema-generator">Hotel schema generator</Link>. A restaurant page uses the <Link href="/restaurant-schema-generator">Restaurant schema generator</Link>. A clinic page uses the <Link href="/medical-clinic-schema-generator">Medical clinic schema generator</Link>. A law office page uses the <Link href="/attorney-schema-generator">Attorney schema generator</Link>. A dental office page uses the <Link href="/dentist-schema-generator">Dentist schema generator</Link>.
          A dental office is a different page, on{" "}
          <Link href="/ai-search-visibility-for-dentists">AI search visibility for dentists</Link>.
          A plumbing business is on{" "}
          <Link href="/ai-search-visibility-for-plumbers">AI search visibility for plumbers</Link>.
          An HVAC company is on{" "}
          <Link href="/ai-search-visibility-for-hvac">AI search visibility for HVAC</Link>. A roofing contractor’s office, service area, and hours are on <Link href="/ai-search-visibility-for-roofers">AI search visibility for roofers</Link>. An electrical contractor’s shop, service area, and hours are on <Link href="/ai-search-visibility-for-electricians">AI search visibility for electricians</Link>. A landscaping business’s office, service area, and hours are on <Link href="/ai-search-visibility-for-landscapers">AI search visibility for landscapers</Link>. An auto repair business’s shop, service area, and hours are on <Link href="/ai-search-visibility-for-auto-repair">AI search visibility for auto repair</Link>.
        </p>
        <h2>What each field is</h2>
        <p>
          The script needs the name a person can see. Google’s dataset page says to use a distinct name for a distinct
          dataset. <code>description</code> is the summary on that page. Google requires it, at 50 to 5000 characters,
          and says a summary may include Markdown. The same page recommends keeping every textual property to 5000
          characters or fewer, because Dataset Search uses the first 5000. This form collapses the summary to one line
          and writes it even when it is shorter or longer than Google’s range. The character count under the field is
          the length that will be written. Add Markdown newlines by hand only when the page shows them.
        </p>
        <p>
          <code>url</code> is the landing page that describes the dataset. Google lists it as recommended. It is not
          the file. <a href={licenseProp}>schema.org license</a> is a license document, typically a URL. Google’s
          example is a string such as <code>https://creativecommons.org/licenses/by/4.0</code>, and the page says to
          identify a specific version. A token such as <code>CC-BY-4.0</code> is left out, so the script does not
          invent a host. A license the page does not show does not belong in the script.
        </p>
        <p>
          <a href={creatorProp}>schema.org creator</a> is the Person or Organization that created the dataset. It is
          the same property as author. This form writes a creator only when you enter a name. A URL without a name is
          omitted. One named row is one object. Two rows are an array. An unknown type is written as Organization.
          This page does not print a sample personal name. Type the name that is already on the dataset page. Google’s
          dataset page recommends an ORCID <code>sameAs</code> for a person and a ROR <code>sameAs</code> for an
          organization. This form does not write <code>sameAs</code>. Add it by hand only when the page shows that
          identifier, and do not invent one.
        </p>
        <p>
          <a href={keywordsProp}>schema.org keywords</a> are tags. One keyword is a string. Two become an array. A
          repeated keyword is written once. Separate them with commas or new lines. A keyword that is itself an
          http(s) URL is written as that URL. <a href={temporalProp}>schema.org temporalCoverage</a> is the period the
          dataset describes. A year, <code>YYYY-MM</code>, a calendar date, a date-time, or a slash interval is
          accepted. schema.org’s census note writes the year 2011 as <code>2011/2012</code>. Google’s page also
          accepts a bare year such as <code>2008</code>, and an open end written as <code>..</code>. A sentence is
          left out. Include the property only when the page shows that the dataset has a time range.
        </p>
        <p>
          <a href={distributionProp}>schema.org distribution</a> is a downloadable form of the dataset, at a specific
          location, in a specific format. The value is a <a href={downloadType}>DataDownload</a>. Google’s dataset
          page says <code>contentUrl</code> is required on that download, and <code>encodingFormat</code> is
          recommended. <code>CSV</code> and <code>text/csv</code> are both text. A format URL is kept as a URL. One
          download is one object. Two become an array. A second row with the same <code>contentUrl</code> is written
          once. A format without a download URL is left out. The landing-page <code>url</code> is not a substitute for{" "}
          <code>contentUrl</code>. This form does not write <code>sameAs</code>, <code>identifier</code>,{" "}
          <code>citation</code>, <code>hasPart</code>, <code>spatialCoverage</code>, <code>variableMeasured</code>, or{" "}
          <code>includedInDataCatalog</code>. Add any of those by hand only when the page shows the fact.
        </p>
        <p>
          Google’s <a href={policies}>structured data policies</a>, read on 22 October 2026, say not to mark up content
          that is not visible to readers of the page, and that the structured data must be a true representation of the
          page content. The copy block is one <code>script</code> tag. Paste it into the HTML the server sends. Answer
          engines often skip text that only appears after JavaScript runs. The <Link href="/free-check">free check</Link>{" "}
          lists the JSON-LD <code>@type</code> values on the homepage. A dataset URL at another path is outside that
          fetch. The <Link href="/geo-audit">$39 audit</Link> looks for markup that matches the copy.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for that dataset page, in the head or the body.</li>
          <li>Confirm the same name, summary, page URL, license, creators, keywords, time range, and download links are visible on that page.</li>
          <li>Leave the license blank when the page does not link to one. Leave a download row blank when the page does not offer that file.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>A creator, a license, a keyword, a time range, or a file the page does not show.</li>
          <li>A creator URL without the name. Clear the URL or add the name.</li>
          <li>A license token without a URL. CC-BY-4.0 is not a link.</li>
          <li>The file URL in the page url field. url is the landing page. contentUrl is the download.</li>
          <li>sameAs, a DOI, a citation, or a catalog this form does not write. Add them by hand only when the page shows them.</li>
          <li>A second dataset inside this script. A second dataset is a second page.</li>
          <li>The same Dataset block on every URL of the site.</li>
        </ul>
        <h2>Questions about dataset schema</h2>
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
