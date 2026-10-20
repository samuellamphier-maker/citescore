import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { ArticleSchemaGenerator } from "@/components/ArticleSchemaGenerator";
import { JsonLd } from "@/components/JsonLd";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/article-schema-generator");

const faqs = [
  {
    q: "Does Article schema make Google or an answer engine cite the page?",
    a: "No. Google’s article documentation says Article, NewsArticle, or BlogPosting can help Google understand a news, blog, or sports article and show better title text, images, and date information in Search. Google does not guarantee that those features appear. The script does not make ChatGPT, Perplexity, Claude, or Google AI Overviews cite the page.",
  },
  {
    q: "When should the type be BlogPosting instead of Article?",
    a: "Google’s article documentation accepts Article, NewsArticle, and BlogPosting. Use BlogPosting when the page is a blog post. Use Article for another article page. This generator does not emit NewsArticle. The headline, the dates, and the byline still have to be visible on the page.",
  },
  {
    q: "Should the author be a Person or an Organization?",
    a: "Google says to use Person for a person and Organization for an organization. This site’s guides use Organization and the byline CiteScore Team, because that byline is a team name, not a person. Use Person only when the page names a person. The publisher’s name belongs in the publisher field, not in the author name.",
  },
  {
    q: "When should the image and the publisher logo be filled in?",
    a: "Google recommends an image that represents the article, not a logo or a caption, and the URL has to be crawlable. Add it only when the page shows that image. The publisher logo is separate: it belongs on the publisher when the URL is an image file of that publisher. This generator writes one article image. Google recommends several aspect ratios when you have the files. It does not invent them.",
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
  { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function ArticleSchemaGeneratorPage() {
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
        ctaId="article-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <ArticleSchemaGenerator />
        <h2>Why the headline is written twice</h2>
        <p>
          Google’s article documentation says <code>Article</code>, <code>NewsArticle</code>, or <code>BlogPosting</code> structured data can help Google understand a news, blog, or sports article and show better title text, images, and date information. There are no required properties. The recommended ones include the headline, an image, the published and modified dates, and the author. Google does not guarantee that those features appear. An answer engine still has to tell the headline from the navigation. The script repeats the headline, the dates, and the byline a person can already see. It does not create a citation, and it does not rank the page.
        </p>
        <p>
          Choose Article or BlogPosting. The copy block is one <code>script</code> tag. Paste it into the HTML the server sends. Dates are the calendar day you enter, which is valid ISO 8601. Google recommends a timezone as well, and this generator does not invent one. The{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link> shows the Article this site publishes, with the byline CiteScore Team as an Organization. The{" "}
          <Link href="/free-check">free check</Link> lists the JSON-LD <code>@type</code> values on the homepage. The{" "}
          <Link href="/geo-audit">$39 audit</Link> looks for markup that matches the copy. A product page uses the{" "}
          <Link href="/product-schema-generator">Product schema generator</Link>. A location page uses the{" "}
          <Link href="/local-business-schema-generator">Local business schema generator</Link>. A visible trail uses the{" "}
          <Link href="/breadcrumb-schema-generator">Breadcrumb schema generator</Link>. A procedure uses the{" "}
          <Link href="/howto-schema-generator">HowTo schema generator</Link>. An app page uses the{" "}
          <Link href="/software-application-schema-generator">Software application schema generator</Link>. An author profile uses the <Link href="/person-schema-generator">Person schema generator</Link>. The homepage uses the <Link href="/website-schema-generator">WebSite schema generator</Link>. A watch page uses the <Link href="/video-schema-generator">Video schema generator</Link>. An event page uses the <Link href="/event-schema-generator">Event schema generator</Link>.
        </p>
        <h2>What to leave out</h2>
        <ul>
          <li>A headline or a date that is not visible on the page.</li>
          <li>An author type of Person when the byline is a team. Use Organization, as this site does for CiteScore Team.</li>
          <li>An article image the page does not show, or a publisher logo that is not an image file.</li>
          <li>A canonical URL for a different page. Point it at the URL a person is reading.</li>
        </ul>
        <h2>Questions about Article schema</h2>
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
