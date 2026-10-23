import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { BreadcrumbSchemaGenerator } from "@/components/BreadcrumbSchemaGenerator";
import { JsonLd } from "@/components/JsonLd";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/breadcrumb-schema-generator");

const faqs = [
  {
    q: "Does BreadcrumbList schema guarantee a breadcrumb in Google Search?",
    a: "No. Google’s breadcrumb documentation says the markup can show the path in Search on desktop. Google does not guarantee that the trail appears. The script does not make ChatGPT, Perplexity, Claude, or Google AI Overviews cite the page.",
  },
  {
    q: "How is position numbered?",
    a: "Position 1 is the first crumb that has a name. The next named crumb is 2, and so on. Empty rows are skipped, so a blank row in the middle does not leave a gap.",
  },
  {
    q: "Does the last crumb need a URL?",
    a: "Google says item is not required on the last crumb. If you leave that URL blank, the script omits item, and Google uses the URL of the page that contains the script. Every earlier crumb needs a URL.",
  },
  {
    q: "Where should the script go?",
    a: "On the page that shows that trail, in the HTML the server sends. The names and URLs have to match the breadcrumb a person can see. This generator emits one trail. It does not invent crumbs that are not on the page.",
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
  { href: "/real-estate-agent-schema-generator", label: "Real estate agent schema generator" },
  { href: "/plumber-schema-generator", label: "Plumber schema generator" },
  { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function BreadcrumbSchemaGeneratorPage() {
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
        ctaId="breadcrumb-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <BreadcrumbSchemaGenerator />
        <h2>Why the trail is written twice</h2>
        <p>
          Google’s breadcrumb documentation says a trail shows the page’s place in the site, and that Google Search may show that path on desktop. The markup needs a BreadcrumbList with at least two items. Each item has a position, starting at 1, a name, and a URL. The URL is not required on the last item. Google does not guarantee that the trail appears. The script repeats the names and URLs a person can already see. It does not create a citation, and it does not rank the page.
        </p>
        <p>
          Add a row for each crumb, in the order a person reads them. Blank rows are skipped, and position is numbered again from 1. The copy block is one <code>script</code> tag. Paste it into the HTML the server sends on the page that shows the trail. Answer engines often skip text that only appears after JavaScript runs. The{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link> shows the other JSON-LD blocks on this site. The{" "}
          <Link href="/free-check">free check</Link> lists the JSON-LD <code>@type</code> values on the homepage. The{" "}
          <Link href="/geo-audit">$39 audit</Link> looks for markup that matches the copy. A location page uses the{" "}
          <Link href="/local-business-schema-generator">Local business schema generator</Link>. A procedure uses the{" "}
          <Link href="/howto-schema-generator">HowTo schema generator</Link>. An app page uses the{" "}
          <Link href="/software-application-schema-generator">Software application schema generator</Link>. An author profile uses the <Link href="/person-schema-generator">Person schema generator</Link>. The homepage uses the <Link href="/website-schema-generator">WebSite schema generator</Link>. A watch page uses the <Link href="/video-schema-generator">Video schema generator</Link>. An event page uses the <Link href="/event-schema-generator">Event schema generator</Link>. A page that shows reviews of a product or an app uses the <Link href="/review-schema-generator">Review schema generator</Link>. A service page uses the <Link href="/service-schema-generator">Service schema generator</Link>. A course page uses the <Link href="/course-schema-generator">Course schema generator</Link>. A job page uses the <Link href="/job-posting-schema-generator">Job posting schema generator</Link>. A recipe page uses the <Link href="/recipe-schema-generator">Recipe schema generator</Link>. A forum or support page where people can submit answers uses the <Link href="/qa-page-schema-generator">QAPage schema generator</Link>. A page that names a short passage for text-to-speech uses the <Link href="/speakable-schema-generator">Speakable schema generator</Link>. An image with a visible credit, caption, or license uses the <Link href="/image-object-schema-generator">ImageObject schema generator</Link>. A book page uses the <Link href="/book-schema-generator">Book schema generator</Link>. A show page or an episode page uses the <Link href="/podcast-schema-generator">Podcast schema generator</Link>. A film page uses the <Link href="/movie-schema-generator">Movie schema generator</Link>. A dataset page uses the <Link href="/dataset-schema-generator">Dataset schema generator</Link>. A vehicle page uses the <Link href="/vehicle-schema-generator">Vehicle schema generator</Link>. A hotel page uses the <Link href="/hotel-schema-generator">Hotel schema generator</Link>. A restaurant page uses the <Link href="/restaurant-schema-generator">Restaurant schema generator</Link>. A clinic page uses the <Link href="/medical-clinic-schema-generator">Medical clinic schema generator</Link>. A law office page uses the <Link href="/attorney-schema-generator">Attorney schema generator</Link>. A dental office page uses the <Link href="/dentist-schema-generator">Dentist schema generator</Link>. An agent office page uses the <Link href="/real-estate-agent-schema-generator">Real estate agent schema generator</Link>. A plumbing business page uses the <Link href="/plumber-schema-generator">Plumber schema generator</Link>.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for the page that shows the trail, in the head or the body.</li>
          <li>Confirm the same names and URLs are visible in the breadcrumb on that page.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>A crumb that is not visible on the page.</li>
          <li>A URL for a different page than the crumb’s name.</li>
          <li>A second trail. This generator emits one BreadcrumbList.</li>
          <li>A URL on a crumb that is not a real page. Leave the last URL blank when the crumb is the page itself and the name is already visible.</li>
        </ul>
        <h2>Questions about breadcrumb schema</h2>
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
