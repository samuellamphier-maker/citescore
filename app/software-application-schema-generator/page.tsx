import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { SoftwareApplicationSchemaGenerator } from "@/components/SoftwareApplicationSchemaGenerator";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/software-application-schema-generator");

const faqs = [
  {
    q: "Does SoftwareApplication schema guarantee a rich result or an AI citation?",
    a: "No. Google’s software app documentation says the markup can be eligible for a rich result when the name, the price, and a rating or a review are present, and that the rating has to be visible on the page. Google does not guarantee the rich result. The script does not make ChatGPT, Perplexity, Claude, or Google AI Overviews cite the page. A price that exists only in the script describes an offer the page does not show.",
  },
  {
    q: "How should a free app be priced?",
    a: "Set the price to 0. Google’s documentation says offers.price is 0 when the app is available without payment, and that a currency is recommended when the price is greater than 0. A currency is optional at 0. Do not leave the price blank and expect a crawler to infer free from a badge. If the page says free, the script should say 0. The price is written as a string, so 39.00 is not shortened.",
  },
  {
    q: "When should the aggregate rating be filled in?",
    a: "Only when the page shows the same rating value and the same review count. Leave the fields blank otherwise. Google’s rich result wants a rating or a review, and this generator does not invent either one. It does not emit a review. The review text uses the Review schema generator. schema.org treats a missing best rating as 5.",
  },
  {
    q: "Which application category should I use, and where does the script go?",
    a: "Use the type Google documents for the app, such as BusinessApplication, DeveloperApplication, or EducationalApplication. The select lists the supported values. Leave it on “Not stated on the page” when the page does not say, and a category outside that list is omitted. Put the script on the page for that one app, in the HTML the server sends. The script is built in the browser. Nothing is sent to CiteScore.",
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
  { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function SoftwareApplicationSchemaGeneratorPage() {
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
        ctaId="software-application-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <SoftwareApplicationSchemaGenerator />
        <h2>Why the price and the system are labeled</h2>
        <p>
          SoftwareApplication JSON-LD names one application the page already describes: the name, the operating system, the application category, the URL, a description, an Offer with the price, and an aggregate rating when the page shows one. An answer engine asked what the app costs, or which systems it runs on, otherwise has to pick those facts out of a hero, a pricing table, and a footer. The script puts them in one object a parser can read, which is how ChatGPT, Perplexity, Claude, and Google AI Overviews can tell the product from the surrounding page. It does not create a citation, and it does not rank the page.
        </p>
        <p>
          Google’s software app documentation says this markup can show rating information in Search. A rich result needs the name, a price, and either an aggregate rating or a review. Use 0 when the app is free. <code>applicationCategory</code> and <code>operatingSystem</code> are recommended, and the category has to be a type Google lists, such as BusinessApplication, DeveloperApplication, or EducationalApplication. Google does not guarantee the rich result.
        </p>
        <p>
          The copy block is one <code>script</code> tag. Paste it into the HTML the server sends on the page for that app, not on a post that only mentions it. The name has to match the H1. <code>operatingSystem</code> is the text the page already uses, such as Web, or Windows 11, macOS 14, Android. The category select writes one of Google’s supported types and no other. A price above zero needs an ISO 4217 currency such as USD. A free app is price 0, and Google does not require a currency then. The price is a string, so <code>39.00</code> is not shortened. A physical product uses the{" "}
          <Link href="/product-schema-generator">Product schema generator</Link>.
        </p>
        <p>
          <code>aggregateRating</code> is written only when the rating value and the review count are both filled in, and the rating is not higher than the best rating. schema.org treats a missing best rating as 5. This generator does not emit a review. The{" "}
          <Link href="/free-check">free check</Link> lists the JSON-LD <code>@type</code> values on the homepage. The{" "}
          <Link href="/geo-audit">$39 audit</Link> looks for markup that matches the copy. The publisher uses the{" "}
          <Link href="/organization-schema-generator">Organization schema generator</Link>. A procedure uses the{" "}
          <Link href="/howto-schema-generator">HowTo schema generator</Link>. An author profile uses the{" "}
          <Link href="/person-schema-generator">Person schema generator</Link>. The homepage uses the{" "}
          <Link href="/website-schema-generator">WebSite schema generator</Link>. A watch page uses the{" "}
          <Link href="/video-schema-generator">Video schema generator</Link>. An event page uses the{" "}
          <Link href="/event-schema-generator">Event schema generator</Link>. A page that shows reviews of a product or an app uses the <Link href="/review-schema-generator">Review schema generator</Link>. A service page uses the <Link href="/service-schema-generator">Service schema generator</Link>. A course page uses the <Link href="/course-schema-generator">Course schema generator</Link>.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for that app’s URL, in the head or the body.</li>
          <li>Confirm the same name, operating system, price, and any rating are visible on the page.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>A price, a currency, or a rating the page does not show. Use 0 only when the app is free on that page.</li>
          <li>An operating system or a category the page does not state. A category outside Google’s list is omitted.</li>
          <li>A URL for a different page than the one you want cited.</li>
          <li>
            <code>VideoGame</code> on its own. Google does not show a software app rich result for that type, and this generator does not emit it.
          </li>
          <li>The same SoftwareApplication block on every guide. One product URL is enough.</li>
        </ul>
        <h2>Questions about SoftwareApplication schema</h2>
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
