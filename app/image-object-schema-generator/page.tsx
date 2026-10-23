import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { ImageObjectSchemaGenerator } from "@/components/ImageObjectSchemaGenerator";
import { JsonLd } from "@/components/JsonLd";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { pageMeta } from "@/lib/content/meta";
import { getTopic } from "@/lib/content/topics";

const topic = getTopic("/image-object-schema-generator");

const imageType = "https://schema.org/ImageObject";
const imageDocs =
  "https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata";
const imageSeo = "https://developers.google.com/search/docs/appearance/google-images";
const policies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";

const faqs = [
  {
    q: "Does ImageObject schema guarantee a Licensable badge, a Google Images placement, or an AI citation?",
    a: "No. Google’s image metadata documentation, last updated 10 December 2025 and read on 21 October 2026, says Google Images can show the creator, how someone can use the image, and credit information, and that a license can make the image eligible for the Licensable badge. The same page says Google does not guarantee that structured data or IPTC photo metadata will show. The script does not make ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, Meta AI, DeepSeek, Mistral, Brave Search, You.com, DuckDuckGo, or Google AI Overviews cite the page. Those products are not named on that Google page or on schema.org’s ImageObject page.",
  },
  {
    q: "Which fields does this form require?",
    a: "schema.org does not list a required property for ImageObject. Google’s image metadata table lists contentUrl as required, and it also supports url when contentUrl is absent. This form writes contentUrl only, because Google says url is less precise. In addition to contentUrl, Google requires one of creator, creditText, copyrightNotice, or license. Once one of those is present, the other three become recommended. license is the property Google requires for the Licensable badge, and acquireLicensePage is recommended when you have a page that explains how to license the image. name and caption are written when you enter them. Google’s examples include a name. Google’s supported-properties table does not list name or caption. schema.org defines both.",
  },
  {
    q: "When should the creator be a Person, and when an Organization?",
    a: "schema.org’s creator property, read on 21 October 2026, expects an Organization or a Person. Google’s image metadata page says the creator is usually the photographer, and that it may be a company or organization when that is the right credit. Use the type the page already shows. A name is required before the creator is written. A URL without a name is left out, so the script does not invent a byline. This page does not print a sample personal name. Type the name that is already on the page.",
  },
  {
    q: "Where should the script go?",
    a: "On the page that shows that image, in the HTML the server sends, where a person can already see the image and the credit, caption, or license you mark up. Google says to add the structured data for every instance of an image, including when the same file appears on more than one page. Google’s structured data policies say not to mark up content that is not visible to readers of the page. The script is built in the browser. Nothing is sent to CiteScore. One script is one image. A second image is a second script.",
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

export default function ImageObjectSchemaGeneratorPage() {
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
        ctaId="image-object-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <ImageObjectSchemaGenerator />
        <h2>Why the image is labeled</h2>
        <p>
          A page can show a photograph, a caption under it, and a credit line in the footer. An answer engine that
          quotes the page still has to decide which URL is the file, which string is the caption, who the credit names,
          and which page describes the license. <a href={imageType}>schema.org ImageObject</a> is that decision written
          down. It is an image file. <code>contentUrl</code> is the bytes. <code>name</code> and <code>caption</code>{" "}
          name what a person sees. <code>creator</code>, <code>creditText</code>, <code>copyrightNotice</code>,{" "}
          <code>license</code>, and <code>acquireLicensePage</code> are the rights fields. A parser can read those
          labels without guessing which nearby sentence was the credit. The script does not create a citation, and it
          does not rank the page.
        </p>
        <p>
          Google’s <a href={imageDocs}>image metadata documentation</a>, last updated 10 December 2025 and read on 21
          October 2026, says that when you specify image metadata, Google Images can show more detail, such as the
          creator, how people can use the image, and credit information. A license can make the image eligible for the
          Licensable badge, which links to the license and to more detail on use. The feature is available on mobile
          and desktop, in the regions and languages where Google Search is available. Eligibility is not a placement.
          The troubleshooting note says Google does not guarantee that structured data or IPTC photo metadata will
          show.
        </p>
        <p>
          That Google page does not name ChatGPT, Perplexity, Claude, Gemini, Copilot, or Google AI Overviews as
          consumers of <code>ImageObject</code>. The useful part for those products is the same as for any other
          labeled fact: the credit and the license are in the HTML, next to the image, in words a person can read. A
          clinic photo and a practice page are a different problem, on{" "}
          <Link href="/ai-search-visibility-for-healthcare">AI search visibility for healthcare</Link>. A law firm’s
          office page is on <Link href="/ai-search-visibility-for-law-firms">AI search visibility for law firms</Link>. A brokerage
          office is on <Link href="/ai-search-visibility-for-real-estate">AI search visibility for real estate</Link>. A restaurant photo is on <Link href="/ai-search-visibility-for-restaurants">AI search visibility for restaurants</Link>. An accounting office is on <Link href="/ai-search-visibility-for-accountants">AI search visibility for accountants</Link>. A dental office is on <Link href="/ai-search-visibility-for-dentists">AI search visibility for dentists</Link>. A plumbing business’s office, service area, and hours are on <Link href="/ai-search-visibility-for-plumbers">AI search visibility for plumbers</Link>. An HVAC company’s office, service area, and hours are on <Link href="/ai-search-visibility-for-hvac">AI search visibility for HVAC</Link>. A roofing contractor’s office, service area, and hours are on <Link href="/ai-search-visibility-for-roofers">AI search visibility for roofers</Link>. An electrical contractor’s shop, service area, and hours are on <Link href="/ai-search-visibility-for-electricians">AI search visibility for electricians</Link>.
        </p>
        <h2>What Google requires</h2>
        <p>
          Google’s table says <code>contentUrl</code> is a URL to the actual image content. Google uses it to decide
          which image the metadata applies to. Google also accepts <code>url</code> when <code>contentUrl</code> is
          absent, and says <code>url</code> is less precise. This form writes <code>contentUrl</code> only. A page URL
          that is not the image file does not belong in that field. A missing scheme is read as https. An invalid URL
          is left out, and the script stays empty until the image URL is valid.
        </p>
        <p>
          In addition to <code>contentUrl</code>, Google requires one of <code>creator</code>, <code>creditText</code>,{" "}
          <code>copyrightNotice</code>, or <code>license</code>. After one of those is present, the other three are
          recommended. <code>creator</code> is an Organization or a Person, and <code>creator.name</code> is the name.
          This form writes the creator only when you enter a name. A URL without a name is omitted. <code>creditText</code>{" "}
          is the credit line used when the image is published. <code>copyrightNotice</code> is the notice that
          identifies the copyright owner. <code>license</code> is a URL to a page that describes the license, such as
          your terms or a Creative Commons license. Google says the <code>license</code> property is required for the
          Licensable badge. <code>acquireLicensePage</code> is recommended: a URL to a page where someone can find out
          how to license the image, such as a checkout for a resolution or a page that explains how to get in touch.
        </p>
        <p>
          There are two ways to give Google the same facts. Structured data is tied to the page where the image
          appears, and Google says to add it for every instance, even when the file is the same. IPTC photo metadata
          lives in the file and travels with it. You only need one of the two for eligibility. If both are present and
          they conflict, Google uses the structured data. This form does not edit the file. Google also says that if an
          image contains C2PA metadata from a signer on the C2PA trust list, using C2PA 2.1 or later, Google can show
          details in About this image, including whether the image was edited with AI tools. This form does not write
          C2PA. Removing metadata can shrink a file. Google recommends keeping the IPTC creator, credit line, and
          copyright notice when you can, because those fields are the rights record. The{" "}
          <a href={imageSeo}>image SEO best practices</a> are the separate checklist for crawlable image files.
        </p>
        <h2>What this form adds, and what it leaves out</h2>
        <p>
          schema.org’s ImageObject page, read on 21 October 2026, defines <code>caption</code> as text, or as a
          MediaObject when the caption is a downloadable format such as subtitles. This form writes a text caption when
          you enter one. It does not write a MediaObject caption. Google’s supported-properties table does not list{" "}
          <code>caption</code> or <code>name</code>. Google’s own examples still include a name on the image. Write
          both only when the page shows them. The form also leaves out <code>exifData</code>,{" "}
          <code>representativeOfPage</code>, <code>copyrightHolder</code>, <code>copyrightYear</code>, and{" "}
          <code>embeddedTextCaption</code>. Add those by hand only when the page shows them.
        </p>
        <p>
          Google’s <a href={policies}>structured data policies</a>, read on 21 October 2026, say not to mark up content
          that is not visible to readers of the page, and that the structured data must be a true representation of the
          page content. The copy block is one <code>script</code> tag for one image. Paste it into the HTML the server
          sends. Answer engines often skip text that only appears after JavaScript runs. The{" "}
          <Link href="/free-check">free check</Link> lists the JSON-LD <code>@type</code> values on the homepage. An
          image URL at another path is outside that fetch. The <Link href="/geo-audit">$39 audit</Link> looks for
          markup that matches the copy. An article that also needs a headline and a byline uses the{" "}
          <Link href="/article-schema-generator">Article schema generator</Link>. The longer note on which facts to
          repeat is the <Link href="/schema-markup-for-ai-search">schema guide</Link>.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for the page that shows that image, in the head or the body.</li>
          <li>Confirm the same file URL, name, caption, creator, credit, copyright notice, and license are visible on that page.</li>
          <li>Repeat for each image. Google’s page says every instance needs its own structured data, even when the file is reused.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>A creator, credit, copyright notice, or license the page does not show.</li>
          <li>A creator URL without the creator name. Clear the URL or add the name.</li>
          <li>The page URL in contentUrl when that URL is not the image file.</li>
          <li>One shared ImageObject for every photo on the site when the credits differ.</li>
          <li>A caption that exists only in the script.</li>
          <li>Stripping the IPTC creator, credit line, and copyright notice from the file only to shrink it.</li>
        </ul>
        <h2>Questions about ImageObject schema</h2>
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
