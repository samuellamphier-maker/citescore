import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { WebsiteSchemaGenerator } from "@/components/WebsiteSchemaGenerator";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/website-schema-generator");

const faqs = [
  {
    q: "Does WebSite schema bring back a Google sitelinks search box?",
    a: "No. Google’s Search Central post of 21 October 2024 says the sitelinks search box visual element stopped on 21 November 2024, in every language and country. Rankings were not part of that change. Google says unsupported structured data does not cause problems in Search and does not trigger Search Console errors, and that WebSite markup used for site names continues to be supported. A SearchAction in this script will not put a search box under a blue link.",
  },
  {
    q: "Does WebSite schema make an answer engine cite the site?",
    a: "No. The script repeats the name, an alternate name, the URL, an optional search template, and an optional publisher a person can already see. ChatGPT, Perplexity, Claude, Google AI Overviews, and Meta AI can use that label when they extract an entity. The script does not create a citation, and it does not rank the page. A name that exists only inside the script describes a site the page does not show.",
  },
  {
    q: "When should the search URL template be included?",
    a: "Only when the site has a real search URL and the template shows where the query is substituted, written as {search_term_string}. https://example.com/search?q={search_term_string} is that shape. Leave the field blank when there is no site search. Google no longer shows a sitelinks search box from this markup. The field is still the schema.org way to name the site’s own search URL.",
  },
  {
    q: "Where should the script go, and how does it relate to Organization?",
    a: "Put it on the homepage, in the HTML the server sends. WebSite names the site. Organization names the publisher. This generator nests a short publisher when you enter a name. Logo, profiles, and email belong on the Organization schema generator, which can also emit a smaller WebSite block with the same name and URL. The homepage should not publish two WebSite scripts that disagree.",
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
  { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
  { href: "/how-to-get-cited-by-meta-ai", label: "How to get cited by Meta AI" },
  { href: "/how-to-get-cited-by-deepseek", label: "How to get cited by DeepSeek" },
  { href: "/how-to-get-cited-by-mistral", label: "How to get cited by Mistral" },
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

export default function WebsiteSchemaGeneratorPage() {
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
        ctaId="website-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <WebsiteSchemaGenerator />
        <h2>Why the site name is written twice</h2>
        <p>
          An answer engine that mentions a site has to decide which string is the name, which host is canonical, and
          which organization publishes it. WebSite JSON-LD is that decision written down. schema.org defines the type
          as a website: a <code>name</code>, an optional <code>alternateName</code>, a <code>url</code>, an optional{" "}
          <code>publisher</code>, and an optional <code>potentialAction</code>. A SearchAction names the site’s own
          search with an <code>urlTemplate</code> and <code>query-input</code> of{" "}
          <code>required name=search_term_string</code>. A parser, including the ones behind ChatGPT, Perplexity,
          Claude, Google AI Overviews, and Meta AI, can read those labels without guessing which words in the header
          are the brand.
        </p>
        <p>
          Google’s{" "}
          <a href="https://developers.google.com/search/blog/2024/10/sitelinks-search-box">
            Search Central post of 21 October 2024
          </a>{" "}
          says the sitelinks search box stopped on 21 November 2024. The change does not affect rankings. Google says
          unsupported structured data does not cause problems in Search, and that WebSite markup used for site names
          continues to be supported. Keep the script when the homepage already shows the name. It will not put a search
          box under a blue link, and it does not create a citation.
        </p>
        <p>
          The copy block is one <code>script</code> tag. Paste it into the HTML the server sends for the homepage.
          Answer engines often skip text that only appears after JavaScript runs. An alternate name is included only
          when it differs from the site name. A search template is included only when it is an http(s) URL containing{" "}
          <code>{"{search_term_string}"}</code>. A publisher is included only when it has a name. A URL without a name
          is omitted, so the script does not invent an organization. The <Link href="/free-check">free check</Link>{" "}
          lists the JSON-LD <code>@type</code> values on the homepage. The <Link href="/geo-audit">$39 audit</Link>{" "}
          looks for markup that matches the copy. The publisher’s logo and profiles use the{" "}
          <Link href="/organization-schema-generator">Organization schema generator</Link>. The longer note on which
          facts to repeat is the <Link href="/schema-markup-for-ai-search">schema guide</Link>. Meta’s published
          crawlers, which do not require this script, are on{" "}
          <Link href="/how-to-get-cited-by-meta-ai">how to get cited by Meta AI</Link>.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for the homepage, in the head or the body.</li>
          <li>Confirm the same name, URL, alternate name, and publisher are visible on that page.</li>
          <li>If an Organization script is already on the page, keep one WebSite block so the two names do not disagree.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>A search template for a search the site does not have, or a template that omits {"{search_term_string}"}.</li>
          <li>An alternate name the site does not use in the header, the title, or the copy.</li>
          <li>A publisher the page does not name. Leave the field blank, and add the organization on its own page.</li>
          <li>The same WebSite script on every URL. The homepage is the page that names the site.</li>
        </ul>
        <h2>Questions about WebSite schema</h2>
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
