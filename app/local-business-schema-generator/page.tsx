import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { LocalBusinessSchemaGenerator } from "@/components/LocalBusinessSchemaGenerator";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/local-business-schema-generator");

const faqs = [
  {
    q: "Does LocalBusiness schema make Google or an answer engine cite the page?",
    a: "No. Google’s local business documentation says the markup can tell Google the hours, the address, and department details, and that Search or Maps may show a knowledge panel or a list of businesses. Google does not guarantee that those features appear. The script does not make ChatGPT, Perplexity, Claude, or Google AI Overviews cite the page.",
  },
  {
    q: "Which type should I pick?",
    a: "Google says to use the most specific LocalBusiness subtype that fits, such as Restaurant, Dentist, or Bakery, and to use LocalBusiness when none of those fit. The type still has to describe the business the page shows.",
  },
  {
    q: "Where should the script go?",
    a: "On the page for that one location, in the HTML the server sends. Answer engines often skip text that appears only after JavaScript runs. Every value in the script has to be visible on that same URL. A second location is a second entity.",
  },
  {
    q: "What about reviews and ratings?",
    a: "Google recommends review and aggregateRating only for sites that capture reviews about other businesses. This generator does not emit them. A shop marking up its own stars is outside that recommendation.",
  },
  {
    q: "Is the address uploaded?",
    a: "No. The script is built in the browser as you type. Nothing is sent to CiteScore.",
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
  { href: "/geo-for-local-businesses", label: "GEO for local businesses" },
  { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function LocalBusinessSchemaGeneratorPage() {
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
        ctaId="local-business-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <LocalBusinessSchemaGenerator />
        <h2>Why the address is written twice</h2>
        <p>
          Google’s local business documentation says structured data can tell Google the hours, the address, and departments, and that Search or Maps may show a knowledge panel or a list of businesses. A rich result needs the name and the address. Google does not guarantee that the panel appears. An answer engine still has to tell the street address from the rest of the page. The script repeats the name, the address, the phone, and the hours a person can already see. It does not create a citation, and it does not rank the page.
        </p>
        <p>
          Choose the most specific type that fits, such as Restaurant, Dentist, or Bakery. Use LocalBusiness when none of those fit. The copy block is one <code>script</code> tag. Paste it into the HTML the server sends for that location. Answer engines often skip text that only appears after JavaScript runs. The{" "}
          <Link href="/geo-for-local-businesses">local business guide</Link> shows the same fields, including the limit on reviews of your own business. The{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link> covers Organization, Product, FAQ, and Article. The{" "}
          <Link href="/free-check">free check</Link> lists the JSON-LD <code>@type</code> values on the homepage. A location URL at another path is outside that fetch. The{" "}
          <Link href="/geo-audit">$39 audit</Link> looks for markup that matches the copy. A visible trail uses the{" "}
          <Link href="/breadcrumb-schema-generator">breadcrumb schema generator</Link>. A homepage that identifies the publisher uses the{" "}
          <Link href="/organization-schema-generator">Organization schema generator</Link>.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for that location URL, in the head or the body.</li>
          <li>Confirm the same name, address, phone, and hours are visible on the page.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>An address, a phone number, or hours that are not on the page.</li>
          <li>
            <code>review</code> and <code>aggregateRating</code>. This generator does not emit them. Google recommends those properties only for sites that capture reviews about other businesses.
          </li>
          <li>A logo or an image the page does not show, or a file a crawler cannot fetch.</li>
          <li>A <code>sameAs</code> profile the business does not control.</li>
          <li>Geo coordinates when the page does not publish them. Google recommends at least five decimal places when you do have a pair.</li>
        </ul>
        <h2>Questions about LocalBusiness schema</h2>
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
