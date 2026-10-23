import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { ProductSchemaGenerator } from "@/components/ProductSchemaGenerator";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/product-schema-generator");

const faqs = [
  {
    q: "Does Product schema guarantee a rich result or an AI citation?",
    a: "No. Google’s product documentation says structured data can show price, availability, and ratings in Search, including Google Images and Google Lens, and that each experience decides whether to show them. The script does not make ChatGPT, Perplexity, Claude, or Google AI Overviews cite the page. A price that exists only in the script describes a product the page does not show.",
  },
  {
    q: "Where should the Product script go?",
    a: "On the page for that one product, in the HTML the server sends. Google’s merchant listings are for a page where the customer can purchase from you. A page of links to other stores is not that page. The ecommerce guide lists the buying-page rules. Every value in the script has to be visible on the same URL.",
  },
  {
    q: "When should the aggregate rating be filled in?",
    a: "Only when the page shows the same rating value and the same review count. Leave the fields blank otherwise. schema.org treats a missing best rating as 5. This generator does not emit a review, a pros-and-cons list, or a GTIN. The review text uses the Review schema generator.",
  },
  {
    q: "What does the availability field write?",
    a: "One schema.org ItemAvailability URL, such as https://schema.org/InStock or https://schema.org/OutOfStock. Use one value. Leave the select on “Not stated on the page” when the page does not say.",
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
  { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
  { href: "/ai-search-visibility-for-ecommerce", label: "AI search visibility for ecommerce" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function ProductSchemaGeneratorPage() {
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
        ctaId="product-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <ProductSchemaGenerator />
        <h2>Why the price is written twice</h2>
        <p>
          Google’s product documentation says structured data on a product page can show price, availability, and ratings in Search results, including Google Images and Google Lens. Each experience decides whether to show them. Product JSON-LD is the labeled copy: the name, the image, the brand, the SKU, and an Offer with the price, an ISO 4217 currency, and one availability URL. A parser extracting a product from HTML can read the same labels, which is the habit that helps an answer engine tell the price from the surrounding page. The script does not create a citation, and it does not rank the page.
        </p>
        <p>
          The copy block is one <code>script</code> tag. Paste it into the HTML the server sends on the product URL, not on every guide. The{" "}
          <Link href="/ai-search-visibility-for-ecommerce">ecommerce guide</Link> lists what Google requires on a page where the shopper can buy. The{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link> shows the Product block this site publishes for the $39 audit, which has no rating. The{" "}
          <Link href="/free-check">free check</Link> lists the JSON-LD <code>@type</code> values on the homepage. A product URL at another path is outside that fetch. The{" "}
          <Link href="/geo-audit">$39 audit</Link> looks for markup that matches the copy. A location page uses the{" "}
          <Link href="/local-business-schema-generator">Local business schema generator</Link>. A visible trail uses the{" "}
          <Link href="/breadcrumb-schema-generator">Breadcrumb schema generator</Link>. A procedure uses the{" "}
          <Link href="/howto-schema-generator">HowTo schema generator</Link>. An app page uses the{" "}
          <Link href="/software-application-schema-generator">Software application schema generator</Link>. An author profile uses the <Link href="/person-schema-generator">Person schema generator</Link>. The homepage uses the <Link href="/website-schema-generator">WebSite schema generator</Link>. A watch page uses the <Link href="/video-schema-generator">Video schema generator</Link>. An event page uses the <Link href="/event-schema-generator">Event schema generator</Link>. A page that shows reviews of a product or an app uses the <Link href="/review-schema-generator">Review schema generator</Link>. A service page uses the <Link href="/service-schema-generator">Service schema generator</Link>. A course page uses the <Link href="/course-schema-generator">Course schema generator</Link>. A job page uses the <Link href="/job-posting-schema-generator">Job posting schema generator</Link>. A recipe page uses the <Link href="/recipe-schema-generator">Recipe schema generator</Link>. A forum or support page where people can submit answers uses the <Link href="/qa-page-schema-generator">QAPage schema generator</Link>. A page that names a short passage for text-to-speech uses the <Link href="/speakable-schema-generator">Speakable schema generator</Link>. An image with a visible credit, caption, or license uses the <Link href="/image-object-schema-generator">ImageObject schema generator</Link>. A book page uses the <Link href="/book-schema-generator">Book schema generator</Link>. A show page or an episode page uses the <Link href="/podcast-schema-generator">Podcast schema generator</Link>. A film page uses the <Link href="/movie-schema-generator">Movie schema generator</Link>. A dataset page uses the <Link href="/dataset-schema-generator">Dataset schema generator</Link>. A vehicle page uses the <Link href="/vehicle-schema-generator">Vehicle schema generator</Link>. A hotel page uses the <Link href="/hotel-schema-generator">Hotel schema generator</Link>. A restaurant page uses the <Link href="/restaurant-schema-generator">Restaurant schema generator</Link>. A clinic page uses the <Link href="/medical-clinic-schema-generator">Medical clinic schema generator</Link>. A law office page uses the <Link href="/attorney-schema-generator">Attorney schema generator</Link>.
        </p>
        <h2>What to leave out</h2>
        <ul>
          <li>A price, a currency, or an availability the page does not show. One currency per URL.</li>
          <li>An image URL that is not a picture of the product, or that a crawler cannot fetch.</li>
          <li>A SKU or a brand the page does not print. This generator does not emit a GTIN.</li>
          <li>
            <code>aggregateRating</code> unless the page shows that rating and that review count. Leave the rating fields blank when it does not.
          </li>
        </ul>
        <h2>Questions about Product schema</h2>
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
