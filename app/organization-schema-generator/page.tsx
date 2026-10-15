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
    a: "Include it when this URL is the site itself and the name matches the site name in the header. WebSite names the site. Organization names the publisher. The generator emits them as two script tags so each one can be checked on its own.",
  },
];

const related = [
  { href: "/llms-txt-generator", label: "llms.txt generator" },
  { href: "/robots-txt-ai-crawler-generator", label: "robots.txt AI crawler generator" },
  { href: "/faq-schema-generator", label: "FAQ schema generator" },
  { href: "/organization-schema-generator", label: "Organization schema generator" },
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
          The copy block is one <code>script</code> tag for Organization. Check “Also generate a WebSite script” when the page is the site itself, and a second tag is added for WebSite, with <code>publisher</code> pointing at the organization <code>@id</code>. Paste both into the HTML the server sends. The <Link href="/free-check">free check</Link> lists the JSON-LD <code>@type</code> values on the homepage. The <Link href="/geo-audit">$39 audit</Link> looks for markup that matches the copy.
        </p>
        <h2>What to leave out</h2>
        <ul>
          <li>A logo URL that is not an image file, or that the page does not show.</li>
          <li>A <code>sameAs</code> profile the organization does not control.</li>
          <li>An email address that is not a published contact on that page.</li>
          <li>
            <code>aggregateRating</code> and <code>review</code>. This generator does not emit them. The <Link href="/faq-schema-generator">FAQ schema generator</Link> is the separate tool for questions that are already on the page.
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
