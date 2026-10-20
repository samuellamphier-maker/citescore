import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { HowToSchemaGenerator } from "@/components/HowToSchemaGenerator";
import { JsonLd } from "@/components/JsonLd";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/howto-schema-generator");

const faqs = [
  {
    q: "Does HowTo schema bring back a Google rich result?",
    a: "No. Google’s Search Central update of 14 September 2023 says How-to rich results stopped on 13 September 2023, on desktop as well as mobile, and that the result type is deprecated. The How-to documentation was removed. Google also said structured data that is not used does not cause problems for Search. Keep the script when the steps are visible. It does not make ChatGPT, Perplexity, Claude, or Google AI Overviews cite the page.",
  },
  {
    q: "How is total time written?",
    a: "As an ISO 8601 duration. The form turns days, hours, and minutes into that string. Forty-five minutes becomes PT45M. Two days becomes P2D. One day and 30 minutes becomes P1DT30M. Seconds are not collected. Leave the fields blank when the page does not state a time, and totalTime is omitted.",
  },
  {
    q: "When should a step image be included?",
    a: "Only when that image is on the page, shows that step, and the URL is a file a crawler can fetch. A logo, a photo of a different step, and a URL that does not resolve should be left blank. The step is still emitted from its instruction text.",
  },
  {
    q: "Where should the script go?",
    a: "On the one page that shows the procedure, in the HTML the server sends. The names, the time, the cost, and the step text have to be visible on that same URL. The script is built in the browser as you type. Nothing is sent to CiteScore.",
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
  { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function HowToSchemaGeneratorPage() {
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
        ctaId="howto-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <HowToSchemaGenerator />
        <h2>Why the steps are written twice</h2>
        <p>
          An answer engine asked how to do something has to decide which sentences are steps, which words are supplies, and which sentences are asides. HowTo JSON-LD is that decision written down. schema.org defines the type as a procedure: a name, a description, <code>totalTime</code> as an ISO 8601 duration, <code>estimatedCost</code> as a MonetaryAmount, each supply as a HowToSupply, each tool as a HowToTool, and an ordered list of HowToStep values. A parser, including the ones behind ChatGPT, Perplexity, Claude, and Google AI Overviews, can read those labels without guessing which paragraph is step two.
        </p>
        <p>
          Google Search stopped showing How-to rich results on 13 September 2023, on desktop and on mobile. The Search Central post of 14 September 2023 calls the result type deprecated, and the How-to documentation was removed. This script will not put a step list under a blue link. Keep it when a person can already read the steps. It does not create a citation, and it does not rank the page.
        </p>
        <p>
          The copy block is one <code>script</code> tag. Paste it into the HTML the server sends for the page that shows the procedure. Answer engines often skip text that only appears after JavaScript runs. Days, hours, and minutes become one duration. Forty-five minutes is <code>PT45M</code>. One day and two hours is <code>P1DT2H</code>. Leave the fields blank when the page states no duration, and <code>totalTime</code> is omitted. A cost is included only when both a number and an ISO 4217 currency are valid. A free procedure is 0 plus a currency, not an empty field.
        </p>
        <p>
          Each supply and each tool is the name you type. The same name twice is kept once. Each step needs instruction text. A short name and an image URL are optional. Position starts at 1, and a blank row is skipped. An image is included only when the URL is http or https. This generator emits one flat list, not HowToSection groups. The{" "}
          <Link href="/free-check">free check</Link> lists the JSON-LD <code>@type</code> values on the homepage. The{" "}
          <Link href="/geo-audit">$39 audit</Link> looks for markup that matches the copy. Questions already on the page use the{" "}
          <Link href="/faq-schema-generator">FAQ schema generator</Link>. An article uses the{" "}
          <Link href="/article-schema-generator">Article schema generator</Link>. An app page uses the{" "}
          <Link href="/software-application-schema-generator">Software application schema generator</Link>. An author profile uses the <Link href="/person-schema-generator">Person schema generator</Link>. The homepage uses the <Link href="/website-schema-generator">WebSite schema generator</Link>. A watch page uses the <Link href="/video-schema-generator">Video schema generator</Link>. An event page uses the <Link href="/event-schema-generator">Event schema generator</Link>. A page that shows reviews of a product or an app uses the <Link href="/review-schema-generator">Review schema generator</Link>.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for the page that shows the steps, in the head or the body.</li>
          <li>Confirm the same name, time, cost, supplies, tools, and step text are visible on that page.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>A step, a supply, or a tool the page does not show.</li>
          <li>A time or a cost you added to fill the form. Leave the fields blank when the page does not state them.</li>
          <li>A step image that is a logo, a photo of a different step, or a URL that does not resolve.</li>
          <li>The same HowTo script on every URL. One page that actually teaches the procedure is enough.</li>
        </ul>
        <h2>Questions about HowTo schema</h2>
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
