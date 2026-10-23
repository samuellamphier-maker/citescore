import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { OrganizationSchemaGenerator } from "@/components/OrganizationSchemaGenerator";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/organization-schema-generator");

const faqs = [
  {
    q: "Why does Organization schema help an answer engine identify a brand?",
    a: "It repeats the name, canonical URL, logo, description, and profiles the page already shows, in a shape a parser can read without guessing which words are the brand. ChatGPT, Perplexity, Claude, and Google AI Overviews can use that label when they extract an entity. The script does not create a citation, and it does not rank the page. A name that exists only inside the script describes a brand the page does not show.",
  },
  {
    q: "Where should the Organization script go?",
    a: "Put it on the page that identifies the organization, usually the homepage or an About page, inside the HTML the server sends. Answer engines often skip text that appears only after JavaScript runs. Every fact in the script has to be visible on that same URL.",
  },
  {
    q: "When should the logo field be filled in?",
    a: "Only when the URL is an image file a crawler can fetch, and that image is the logo on the page. Leave it blank for a mark drawn in CSS, or for a file that 404s. A broken logo URL is a worse signal than an omitted logo.",
  },
  {
    q: "What belongs in sameAs?",
    a: "Absolute URLs of profiles the organization controls, such as its LinkedIn page, YouTube channel, or a Wikipedia article about the organization. Leave the row empty when there is no profile. A competitor, a directory you do not own, and a personal profile do not belong there.",
  },
  {
    q: "When should the optional WebSite block be included?",
    a: "Include it when this URL is the site itself and the name matches the site name in the header. WebSite names the site. Organization names the publisher. The generator emits them as two script tags so each one can be checked on its own. An alternate name, a search URL template, and a publisher block are on the WebSite schema generator.",
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
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function OrganizationSchemaGeneratorPage() {
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
        ctaId="organization-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <OrganizationSchemaGenerator />
        <h2>Why answer engines use the name</h2>
        <p>
          An answer engine has to decide which string is the brand before it can mention the brand. Organization JSON-LD is that label: the name, the canonical URL, and the profiles that are actually yours, copied from the page into{" "}
          <code>application/ld+json</code>. Google’s structured-data docs describe JSON-LD as a way to state facts that are already visible. The same habit helps a model that is extracting an entity from HTML. The{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link> shows the fields CiteScore publishes on its own pages, and the fields it leaves out.
        </p>
        <p>
          The copy block is one <code>script</code> tag for Organization. Check “Also generate a WebSite script” when the page is the site itself, and a second tag is added for WebSite, with <code>publisher</code> pointing at the organization <code>@id</code>. That WebSite block is the name and URL only. An alternate name, a search URL template, and a publisher use the <Link href="/website-schema-generator">WebSite schema generator</Link>. Paste both into the HTML the server sends. The <Link href="/free-check">free check</Link> lists the JSON-LD <code>@type</code> values on the homepage. The <Link href="/geo-audit">$39 audit</Link> looks for markup that matches the copy.
        </p>
        <h2>What to leave out</h2>
        <ul>
          <li>A logo URL that is not an image file, or that the page does not show.</li>
          <li>A <code>sameAs</code> profile the organization does not control.</li>
          <li>An email address that is not a published contact on that page.</li>
          <li>
            <code>aggregateRating</code> and <code>review</code>. This generator does not emit them. A product page that already shows a rating uses the <Link href="/product-schema-generator">Product schema generator</Link>. Questions that are already on the page use the <Link href="/faq-schema-generator">FAQ schema generator</Link>. An article uses the <Link href="/article-schema-generator">Article schema generator</Link>. A location page uses the <Link href="/local-business-schema-generator">Local business schema generator</Link>. A visible trail uses the <Link href="/breadcrumb-schema-generator">Breadcrumb schema generator</Link>. A procedure uses the <Link href="/howto-schema-generator">HowTo schema generator</Link>. An app page uses the <Link href="/software-application-schema-generator">Software application schema generator</Link>. An author profile uses the <Link href="/person-schema-generator">Person schema generator</Link>. The homepage uses the <Link href="/website-schema-generator">WebSite schema generator</Link>. A watch page uses the <Link href="/video-schema-generator">Video schema generator</Link>. An event page uses the <Link href="/event-schema-generator">Event schema generator</Link>. A page that shows reviews of a product or an app uses the <Link href="/review-schema-generator">Review schema generator</Link>. A service page uses the <Link href="/service-schema-generator">Service schema generator</Link>. A course page uses the <Link href="/course-schema-generator">Course schema generator</Link>. A job page uses the <Link href="/job-posting-schema-generator">Job posting schema generator</Link>. A recipe page uses the <Link href="/recipe-schema-generator">Recipe schema generator</Link>. A forum or support page where people can submit answers uses the <Link href="/qa-page-schema-generator">QAPage schema generator</Link>. A page that names a short passage for text-to-speech uses the <Link href="/speakable-schema-generator">Speakable schema generator</Link>. An image with a visible credit, caption, or license uses the <Link href="/image-object-schema-generator">ImageObject schema generator</Link>. A book page uses the <Link href="/book-schema-generator">Book schema generator</Link>. A show page or an episode page uses the <Link href="/podcast-schema-generator">Podcast schema generator</Link>. A film page uses the <Link href="/movie-schema-generator">Movie schema generator</Link>. A dataset page uses the <Link href="/dataset-schema-generator">Dataset schema generator</Link>. A vehicle page uses the <Link href="/vehicle-schema-generator">Vehicle schema generator</Link>. A hotel page uses the <Link href="/hotel-schema-generator">Hotel schema generator</Link>. A restaurant page uses the <Link href="/restaurant-schema-generator">Restaurant schema generator</Link>. A clinic page uses the <Link href="/medical-clinic-schema-generator">Medical clinic schema generator</Link>. A law office page uses the <Link href="/attorney-schema-generator">Attorney schema generator</Link>.
          </li>
        </ul>
        <h2>Questions about Organization schema</h2>
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
