import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JobPostingSchemaGenerator } from "@/components/JobPostingSchemaGenerator";
import { JsonLd } from "@/components/JsonLd";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/job-posting-schema-generator");

const jobType = "https://schema.org/JobPosting";
const jobDocs = "https://developers.google.com/search/docs/appearance/structured-data/job-posting";
const policies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";

const faqs = [
  {
    q: "Does JobPosting schema guarantee a Google for Jobs result or an AI citation?",
    a: "No. Google’s job posting documentation, read on 20 October 2026, says adding JobPosting structured data makes the posting eligible for the job search experience in Google Search. Google does not guarantee that any structured-data feature will show. The script does not make ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, Meta AI, DeepSeek, Mistral, Brave Search, You.com, DuckDuckGo, or Google AI Overviews cite the page. A salary, a location, or a direct-apply flag that exists only in the script describes a job the page does not show.",
  },
  {
    q: "Which fields does this form require?",
    a: "schema.org does not list a required property for JobPosting. Google’s table lists datePosted, description, hiringOrganization, jobLocation, and title as required for the job experience. For a job that is remote 100% of the time, that page says jobLocation is not required when applicantLocationRequirements is present, and jobLocationType must be TELECOMMUTE. This generator writes a script when the title, a description that is not the title, a valid date posted, the hiring organization’s name, and a valid location for the mode you chose are all present. validThrough, employmentType, the organization URL, the logo, the salary, and directApply are included only when they are valid. A salary is written only when the currency, the pay period, and a minimum are valid. 0 is an unpaid role. directApply is written only when you choose yes or no.",
  },
  {
    q: "When should this be JobPosting, and when should it be Event, Course, or Organization?",
    a: "JobPosting is one open job a person can apply for. Google’s content policies say the markup belongs on the page for that one job, not on a list of jobs, and not on a page that is not a job. A career-fair invitation is not a job posting. An event uses the Event schema generator. A course uses the Course schema generator. The company on the homepage uses the Organization schema generator.",
  },
  {
    q: "Where should the script go?",
    a: "On the page for that one job, in the HTML the server sends, where a person can already see the title, the description, the employer, the location, and any salary. Google’s structured data policies say not to mark up content that is not visible to readers of the page. The script is built in the browser. Nothing is sent to CiteScore.",
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

export default function JobPostingSchemaGeneratorPage() {
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
        ctaId="job-posting-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <JobPostingSchemaGenerator />
        <h2>Why the job is labeled</h2>
        <p>
          A job page says what the role is, who is hiring, where the work happens, when it was posted, and what it
          pays. An answer engine that quotes that page still has to decide which string is the title, which string is
          the employer, and which number is the salary. <a href={jobType}>schema.org JobPosting</a> is that decision
          written down. It defines <code>title</code>, <code>description</code>, <code>datePosted</code>,{" "}
          <code>validThrough</code>, <code>employmentType</code>, <code>hiringOrganization</code>,{" "}
          <code>jobLocation</code>, <code>jobLocationType</code>, <code>applicantLocationRequirements</code>,{" "}
          <code>baseSalary</code>, and <code>directApply</code>. A parser, including the ones behind ChatGPT,
          Perplexity, Claude, Gemini, and Google AI Overviews, can read those labels without guessing which line is
          the pay. The script does not create a citation, and it does not rank the page. The same point, for
          DuckDuckGo’s AI-assisted answers, is on{" "}
          <Link href="/how-to-get-cited-by-duckduckgo-ai">how to get cited by DuckDuckGo</Link>.
          The same point for Comet’s browser assistant is on{" "}
          <Link href="/how-to-get-cited-by-perplexity-comet">how to get cited by Perplexity Comet</Link>.
        </p>
        <p>
          Google’s <a href={jobDocs}>job posting documentation</a>, read on 20 October 2026, says the markup makes a
          posting eligible for the job search experience in Google Search. Eligibility is not a placement. The required
          properties on that page are <code>datePosted</code>, <code>description</code>, <code>hiringOrganization</code>
          , <code>jobLocation</code>, and <code>title</code>. The description has to be HTML, and it cannot be the same
          string as the title. That page says a paragraph break can be a <code>br</code>, a <code>p</code>, or a
          newline, and that the feature recognizes <code>p</code>, <code>ul</code>, and <code>li</code>. It does not
          recognize header and character-level tags such as <code>h1</code>, <code>strong</code>, and <code>em</code>.
          This generator wraps each blank-line paragraph in <code>p</code> and turns a single line break into{" "}
          <code>br</code>. It removes tags you paste, so the script is the text you typed, not a second page of markup.
        </p>
        <p>
          The title is the role. Google’s best practices say not to put a job code, an address, a date, a salary, or
          the company name in <code>title</code>, and not to use <code>name</code> in place of <code>title</code>. This
          form writes <code>title</code>. <code>hiringOrganization</code> is an Organization. Google’s example uses the
          company name, <code>sameAs</code> for the company site, and <code>logo</code> as a URL. schema.org also has{" "}
          <code>url</code>. When you enter a URL, this generator writes it as both <code>url</code> and{" "}
          <code>sameAs</code>. A URL without a name is left out, because the script does not invent an employer. The
          name is the company, not one office. Google’s page says a confidential employer uses the word{" "}
          <code>confidential</code> in the name, and only when that is the truth on the page. The logo note on that
          page says the width-to-height ratio for a third-party job site should be between 0.75 and 2.5. This form
          cannot measure the image. It writes the URL you enter.
        </p>
        <p>
          Location has three honest shapes, matching the cases Google’s page lists. An office or a worksite is{" "}
          <code>jobLocation</code>, a Place with a PostalAddress. Google says <code>addressCountry</code> has to be
          there. Street, city, region, and postal code are included when you type them. A job that is remote 100% of
          the time uses <code>jobLocationType</code> with the value <code>TELECOMMUTE</code> and{" "}
          <code>applicantLocationRequirements</code>. Google says that property is required for a 100% remote job, that
          the description must say the job is 100% remote, and that you must name at least one country where applicants
          may be. This form’s remote mode does not also write a street address, because a street address says there is
          a worksite. A job that can be done at an office or from a named place uses both, which is the hybrid example
          on Google’s page. Occasional work-from-home is not <code>TELECOMMUTE</code>. Google says not to mark a job as
          fully remote when remote work is a negotiable benefit. One form writes one location. A second worksite is a
          second <code>jobLocation</code>, and this form does not invent it.
        </p>
        <p>
          <code>baseSalary</code> is a MonetaryAmount. Google’s page says only the employer provides it, and that it is
          the actual base salary, not an estimate. <code>unitText</code> is one of <code>HOUR</code>, <code>DAY</code>,{" "}
          <code>WEEK</code>, <code>MONTH</code>, or <code>YEAR</code>. A single number is <code>value</code>. A range is{" "}
          <code>minValue</code> and <code>maxValue</code>. The salary is left out until the currency, the unit, and a
          minimum are all valid. A maximum below the minimum is left out. Price <code>0</code> is an unpaid role. The
          digits you typed are kept, so <code>40.00</code> is not shortened. <code>employmentType</code> is one of the
          eight case-sensitive values on Google’s page, or an array when you select more than one.{" "}
          <code>validThrough</code> is the expiration. Google says it is required when the posting has an expiration
          date, and that you should omit it when the job does not expire. An expiration before the date posted is left
          out. <code>directApply</code> is a boolean. Google says it is still being developed, so you may not see an
          effect in Search, and that “yes” means a short application on the page, or instructions that reach the
          employer directly. A second login is not direct apply. The field is omitted until you choose yes or no.
        </p>
        <p>
          Google’s <a href={policies}>structured data policies</a>, read on 20 October 2026, say not to mark up content
          that is not visible to readers of the page, and that the structured data must be a true representation of the
          page content. Google’s job posting content policies say the markup is for one open job, with a complete
          description and a way to apply, and that an expired job has to be removed, returned as 404 or 410, or given a{" "}
          <code>validThrough</code> date in the past. The copy block is one <code>script</code> tag. Paste it into the
          HTML the server sends for that job. Answer engines often skip text that only appears after JavaScript runs.
          The <Link href="/free-check">free check</Link> lists the JSON-LD <code>@type</code> values on the homepage. A
          job URL at another path is outside that fetch. The <Link href="/geo-audit">$39 audit</Link> looks for markup
          that matches the copy. The longer note on which facts to repeat is the{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link>. The company itself, on the homepage, uses the{" "}
          <Link href="/organization-schema-generator">Organization schema generator</Link>. A course page uses the{" "}
          <Link href="/course-schema-generator">Course schema generator</Link>.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for that job page, in the head or the body.</li>
          <li>Confirm the same title, description, employer, location, and salary are visible on that page.</li>
          <li>Confirm a list of jobs, if you publish one, does not carry this block. One page, one job.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>A salary, a logo, or a location the page does not show. Use 0 only when the role is unpaid.</li>
          <li>An employer the page does not name. Leave the field blank. Use confidential only when the page says so.</li>
          <li>TELECOMMUTE on a job that is not 100% remote. Use the office, or the office and the remote location.</li>
          <li>A career fair, a course, or a list of openings. Use the generator for that page, or no JobPosting at all.</li>
          <li>The same JobPosting block on every URL of the site.</li>
        </ul>
        <h2>Questions about JobPosting schema</h2>
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
