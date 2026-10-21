import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { ServiceSchemaGenerator } from "@/components/ServiceSchemaGenerator";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/service-schema-generator");

const serviceType = "https://schema.org/Service";
const gallery = "https://developers.google.com/search/docs/appearance/structured-data/search-gallery";
const policies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";

const faqs = [
  {
    q: "Does Service schema guarantee a Google rich result or an AI citation?",
    a: "No. Google’s structured-data gallery, read on 20 October 2026, does not list a Service feature. schema.org defines the type, including name, serviceType, provider, areaServed, and offers. The script does not make ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, Meta AI, DeepSeek, Mistral, Brave Search, or Google AI Overviews cite the page. A price that exists only in the script describes an offer the page does not show.",
  },
  {
    q: "Which fields does this form require?",
    a: "schema.org does not list a required property for Service, and Google’s gallery does not add one. This generator writes a script once the service name is present. serviceType, description, the provider, areaServed, and the service URL are included only when you fill them in. An offer is written only when both a price and a three-letter currency are valid. 0 is a free service. A provider URL without a provider name is left out, so the script does not invent an organization.",
  },
  {
    q: "When should this be Service, and when should it be LocalBusiness, Organization, or Product?",
    a: "Service is the offering: the audit, the retainership, the cleaning, the legal matter. Organization is the business itself, usually on the homepage. LocalBusiness is a place with a name and an address, which is what Google’s local business documentation uses for a business rich result. Product is a thing you ship or a license you sell as a product. A shop with a street address uses the Local business schema generator. A page that sells one product uses the Product schema generator.",
  },
  {
    q: "Where should the script go?",
    a: "On the page for that one service, in the HTML the server sends, where a person can already see the name, the description, the provider, the area, and any price. Google’s structured data policies say not to mark up content that is not visible to readers of the page. The script is built in the browser. Nothing is sent to CiteScore.",
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
  { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
  { href: "/ai-search-visibility-for-law-firms", label: "AI search visibility for law firms" },
  { href: "/ai-search-visibility-for-healthcare", label: "AI search visibility for healthcare" },
  { href: "/how-to-get-cited-by-brave-search", label: "How to get cited by Brave Search" },
  { href: "/how-to-get-cited-by-you-com", label: "How to get cited by You.com" },
  { href: "/how-to-get-cited-by-duckduckgo-ai", label: "How to get cited by DuckDuckGo" },
  { href: "/how-to-get-cited-by-perplexity-comet", label: "How to get cited by Perplexity Comet" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function ServiceSchemaGeneratorPage() {
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
        ctaId="service-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <ServiceSchemaGenerator />
        <h2>Why the service is labeled</h2>
        <p>
          An agency or a service business often has no product to unbox. The page says what the work is, who does it,
          where it is offered, and what it costs. An answer engine that quotes that page still has to decide which
          string is the service, which string is the firm, and which number is the price.{" "}
          <a href={serviceType}>schema.org Service</a> is that decision written down. It defines <code>name</code>,{" "}
          <code>serviceType</code>, <code>description</code>, <code>provider</code>, <code>areaServed</code>,{" "}
          <code>url</code>, and <code>offers</code>. A parser, including the ones behind ChatGPT, Perplexity, Claude,
          Gemini, and Google AI Overviews, can read those labels without guessing which line is the fee. The script
          does not create a citation, and it does not rank the page. The same point, for Brave Search’s AI answers, is
          on <Link href="/how-to-get-cited-by-brave-search">how to get cited by Brave Search</Link>.
        </p>
        <p>
          Google’s{" "}
          <a href={gallery}>structured-data gallery</a>, read on 20 October 2026, does not list Service among the
          features that can become a rich result. Organization, Local business, and Product are on that list. Service
          is still schema.org. Google’s{" "}
          <a href="https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data">
            introduction to structured data
          </a>
          , read on 20 October 2026, says Google uses structured data it finds to understand the content of the page.
          Understanding is not a placement. A firm that wants the local business rich result, with
          a name and a street address, uses the{" "}
          <Link href="/local-business-schema-generator">Local business schema generator</Link>. A law firm’s practice
          page is the case on <Link href="/ai-search-visibility-for-law-firms">AI search visibility for law firms</Link>.
          A clinic service page is the case on{" "}
          <Link href="/ai-search-visibility-for-healthcare">AI search visibility for healthcare</Link>.
          The company itself, on
          the homepage, uses the{" "}
          <Link href="/organization-schema-generator">Organization schema generator</Link>. A shipped product uses the{" "}
          <Link href="/product-schema-generator">Product schema generator</Link>.
        </p>
        <p>
          <code>provider</code> is an Organization. It is included only when you enter a name. A URL without a name is
          omitted. <code>areaServed</code> is the place name you type. schema.org allows text for that property, and
          this generator writes the text rather than inventing a State or a Country type the page did not name.{" "}
          <code>offers</code> is an Offer. It is written only when both the price and the currency are valid, because a
          currency with no price, or a price with no currency, is not an offer a person can read. Price <code>0</code>{" "}
          is a free service. The digits you typed are kept, so <code>39.00</code> is not shortened.
        </p>
        <p>
          Google’s{" "}
          <a href={policies}>structured data policies</a>, read on 20 October 2026, say not to mark up content that is
          not visible to readers of the page, and that the structured data must be a true representation of the page
          content. The copy block is one <code>script</code> tag. Paste it into the HTML the server sends for that
          service. Answer engines often skip text that only appears after JavaScript runs. The{" "}
          <Link href="/free-check">free check</Link> lists the JSON-LD <code>@type</code> values on the homepage. A
          service URL at another path is outside that fetch. The <Link href="/geo-audit">$39 audit</Link> looks for
          markup that matches the copy. The longer note on which facts to repeat is the{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link>.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for that service page, in the head or the body.</li>
          <li>Confirm the same name, provider, area, and price are visible on that page.</li>
          <li>Confirm a physical location, if you also describe one, is on the Local business script and not stuffed into the service name.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>A price, a currency, or an area the page does not show. Use 0 only when the service is free.</li>
          <li>A provider the page does not name. Leave the field blank.</li>
          <li>A review of your own business. Google’s star feature excludes that self-serving LocalBusiness case. This generator does not write review or aggregateRating.</li>
          <li>A catalog of every service on one script. One page for the service is enough.</li>
          <li>The same Service block on every URL of the site.</li>
        </ul>
        <h2>Questions about Service schema</h2>
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
