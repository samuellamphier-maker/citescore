import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { PersonSchemaGenerator } from "@/components/PersonSchemaGenerator";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/person-schema-generator");

const faqs = [
  {
    q: "Does Person schema make an answer engine cite the author?",
    a: "No. The script repeats the name, job title, URL, image, profiles, employer, school, and topics a person can already see. ChatGPT, Perplexity, Claude, and Google AI Overviews can use that label when they extract an entity. The script does not create expertise, and it does not create a citation. A fact that exists only inside the script describes a person the page does not show.",
  },
  {
    q: "How does a Person block relate to E-E-A-T?",
    a: "Google’s helpful-content guidance says a clear “who” helps a visitor judge experience, expertise, authoritativeness, and trust: a byline, where one is expected, that leads to background and the areas the author writes about. Person JSON-LD is that same “who” in a shape a parser can read. Trust still comes from the page, the sources, and the reputation. The markup does not add any of those.",
  },
  {
    q: "When should the author be an Organization instead?",
    a: "When the byline is a team, not a person. This site’s guides use Organization and the byline CiteScore Team. Use Person only when the page names a person. The publisher’s name belongs on the publisher, usually via the Organization schema generator, not in the person’s name field.",
  },
  {
    q: "What belongs in sameAs, worksFor, alumniOf, and knowsAbout?",
    a: "sameAs is an absolute URL of a profile the person controls. worksFor is the employer the page names, as an Organization. alumniOf is the school the page names, as an EducationalOrganization. knowsAbout is a topic the page already says the person knows, one per line. Leave a field blank when the page does not state it. A URL without a name is omitted.",
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
  { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function PersonSchemaGeneratorPage() {
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
        ctaId="person-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <PersonSchemaGenerator />
        <h2>Why the byline is written twice</h2>
        <p>
          Google’s helpful-content guidance says something that helps people understand E-E-A-T is when it is clear who
          created the content. The questions Google poses are practical: is the author self-evident, does the page carry
          a byline where one is expected, and does that byline lead to background and the areas the author writes about.
          Google encourages accurate authorship information and says to avoid deceptive authorship. Person JSON-LD
          repeats the byline a visitor can already read, plus the job, the employer, the school, the topics, and the
          profile URLs on that same page.
        </p>
        <p>
          An answer engine that cites a page still has to attach the sentence to an entity. The script is one labeled
          copy of that person. It does not make ChatGPT, Perplexity, Claude, or Google AI Overviews cite the page, and
          it does not rank it. A team name is not a person. This site’s guides use Organization and the byline CiteScore
          Team. The form’s sample name, Jane Example, is a placeholder. Replace it with the person the page names.
        </p>
        <p>
          The copy block is one <code>script</code> tag. Paste it into the HTML the server sends, on the bio or the
          article that shows those facts. Answer engines often skip text that only appears after JavaScript runs.{" "}
          <code>worksFor</code> is an Organization. <code>alumniOf</code> is an EducationalOrganization.{" "}
          <code>sameAs</code> keeps only absolute http(s) URLs, once each. <code>knowsAbout</code> is one string when
          you enter one topic, and a list when you enter more. A URL with no name is omitted, so the script does not
          invent an employer or a school. The <Link href="/article-schema-generator">Article schema generator</Link>{" "}
          can point an article’s author at a Person or an Organization. The publisher uses the{" "}
          <Link href="/organization-schema-generator">Organization schema generator</Link>. The{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link> shows the Article this site publishes. The{" "}
          <Link href="/free-check">free check</Link> lists the JSON-LD <code>@type</code> values on the homepage. The{" "}
          <Link href="/geo-audit">$39 audit</Link> looks for markup that matches the copy.
        </p>
        <h2>What to leave out</h2>
        <ul>
          <li>A team name in the Person name field. Use Organization for CiteScore Team and any other team byline.</li>
          <li>A job title, an employer, a school, or a topic the page does not state.</li>
          <li>A profile URL the person does not control, including a competitor or a directory listing.</li>
          <li>An image the page does not show, or a URL that is not the person’s own page.</li>
        </ul>
        <h2>Questions about Person schema</h2>
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
