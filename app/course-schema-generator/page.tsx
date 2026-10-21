import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { CourseSchemaGenerator } from "@/components/CourseSchemaGenerator";
import { JsonLd } from "@/components/JsonLd";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/course-schema-generator");

const courseType = "https://schema.org/Course";
const courseDocs = "https://developers.google.com/search/docs/appearance/structured-data/course";
const policies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";

const faqs = [
  {
    q: "Does Course schema guarantee a Google rich result or an AI citation?",
    a: "No. Google’s course-list documentation, read on 20 October 2026, says a course list rich result is available in English where Google Search is available. Google does not guarantee that any structured-data feature will show. The feature also needs at least three courses and ItemList markup on a summary page or an all-in-one page. This generator writes one Course, not that list. The script does not make ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, Meta AI, DeepSeek, Mistral, Brave Search, You.com, or Google AI Overviews cite the page. A price that exists only in the script describes an offer the page does not show.",
  },
  {
    q: "Which fields does this form require?",
    a: "schema.org does not list a required property for Course. Google’s course-list table lists name and description as required for that rich result, and lists provider as recommended. The technical guidelines on the same page say each course must have a valid name and provider. This generator writes a script once the course name is present. The description, the course URL, the provider, the offer, and the course instance are included only when you fill them in. An offer is written only when both a price and a three-letter currency are valid. 0 is a free course. A provider URL without a provider name is left out, so the script does not invent an organization.",
  },
  {
    q: "When should this be Course, and when should it be Event, Service, or a video?",
    a: "Course is a series or unit of curriculum with an educational outcome, led by one or more instructors, with a roster of students. Google’s content guidelines say a general public event such as Astronomy Day is not a course, and a single short how-to video is not a course. An event page uses the Event schema generator. A service that is not a course uses the Service schema generator. A watch page uses the Video schema generator. A price in the course title, and a promotional phrase in place of the course name, are examples Google’s technical guidelines call invalid for the course-list feature.",
  },
  {
    q: "Where should the script go?",
    a: "On the page for that one course, in the HTML the server sends, where a person can already see the name, the description, the provider, the price, and any session. Google’s structured data policies say not to mark up content that is not visible to readers of the page. The script is built in the browser. Nothing is sent to CiteScore.",
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

export default function CourseSchemaGeneratorPage() {
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
        ctaId="course-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <CourseSchemaGenerator />
        <h2>Why the course is labeled</h2>
        <p>
          A course page says what the curriculum is, who offers it, what it costs, and when a session runs. An answer
          engine that quotes that page still has to decide which string is the course, which string is the school, and
          which number is the price. <a href={courseType}>schema.org Course</a> is that decision written down. It
          defines <code>name</code>, <code>description</code>, <code>provider</code>, <code>url</code>,{" "}
          <code>offers</code>, and <code>hasCourseInstance</code>. A parser, including the ones behind ChatGPT,
          Perplexity, Claude, Gemini, and Google AI Overviews, can read those labels without guessing which line is the
          fee. The script does not create a citation, and it does not rank the page. The same point, for You.com’s
          cited answers, is on <Link href="/how-to-get-cited-by-you-com">how to get cited by You.com</Link>.
          DuckDuckGo’s Search Assist answers are on{" "}
          <Link href="/how-to-get-cited-by-duckduckgo-ai">how to get cited by DuckDuckGo</Link>.
          Comet’s browser assistant is on{" "}
          <Link href="/how-to-get-cited-by-perplexity-comet">how to get cited by Perplexity Comet</Link>.
        </p>
        <p>
          Google’s <a href={courseDocs}>course-list documentation</a>, read on 20 October 2026, lists <code>name</code>{" "}
          and <code>description</code> as required for the course-list rich result, and lists <code>provider</code> as
          recommended. The description line on that table says the display limit is 60 characters. This generator keeps
          the full description you type, because the page a person reads is not limited to that display. Put the
          sentence that should appear in the feature in the first 60 characters, and leave the rest for the page. The
          technical guidelines on the same page say each course must have a valid name and a valid provider, and that
          you must mark up at least three courses. The list itself is an <code>ItemList</code> on a summary page or an
          all-in-one page, with a unique URL for each course. This form writes one <code>Course</code>. It does not
          write the carousel. One script on one course page is the piece that page can honestly carry.
        </p>
        <p>
          Google’s content guidelines limit the type. A course is a series or unit of curriculum, with an educational
          outcome, led by one or more instructors, with a roster of students. A public event is not a course. A single
          short video is not a course. A title that is a promotion, a price, or a discount is an example that page calls
          invalid. An event page uses the <Link href="/event-schema-generator">Event schema generator</Link>. A service
          that is not a course uses the <Link href="/service-schema-generator">Service schema generator</Link>. A watch
          page uses the <Link href="/video-schema-generator">Video schema generator</Link>. The school itself, on the
          homepage, uses the <Link href="/organization-schema-generator">Organization schema generator</Link>.
        </p>
        <p>
          <code>provider</code> is an Organization. It is included only when you enter a name. A URL without a name is
          omitted. When you enter a URL, the script writes it as both <code>url</code> and <code>sameAs</code>.
          schema.org’s course examples use <code>url</code>. Google’s course-list example uses <code>sameAs</code> for
          the provider’s site. Writing both keeps the same address for both readers. <code>offers</code> is an Offer on
          the course. It is written only when both the price and the currency are valid, because a currency with no
          price, or a price with no currency, is not an offer a person can read. Price <code>0</code> is a free course.
          The digits you typed are kept, so <code>39.00</code> is not shortened.
        </p>
        <p>
          <code>hasCourseInstance</code> is a <a href="https://schema.org/CourseInstance">CourseInstance</a>. It is
          written only when at least one of the session fields is valid. <code>courseMode</code> is the text you type.
          schema.org’s examples use online, onsite, and blended, and they also allow a URL for a controlled term. A
          value that starts with a scheme is kept only when it is an http or https URL. <code>startDate</code> and{" "}
          <code>endDate</code> are calendar dates on the instance, which is where schema.org’s own example puts them.
          An end date before the start date is left out. <code>courseSchedule</code> is a{" "}
          <a href="https://schema.org/Schedule">Schedule</a>. Days become schema.org DayOfWeek URLs, such as{" "}
          <code>https://schema.org/Monday</code>. Start and end times are 24-hour clock times. An end time that is not
          later than the start time is left out. Google’s course-list table does not list the instance. The fields are
          still schema.org, and they belong in the script only when the page shows them.
        </p>
        <p>
          Google’s <a href={policies}>structured data policies</a>, read on 20 October 2026, say not to mark up content
          that is not visible to readers of the page, and that the structured data must be a true representation of the
          page content. The copy block is one <code>script</code> tag. Paste it into the HTML the server sends for that
          course. Answer engines often skip text that only appears after JavaScript runs. The{" "}
          <Link href="/free-check">free check</Link> lists the JSON-LD <code>@type</code> values on the homepage. A
          course URL at another path is outside that fetch. The <Link href="/geo-audit">$39 audit</Link> looks for
          markup that matches the copy. The longer note on which facts to repeat is the{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link>.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for that course page, in the head or the body.</li>
          <li>Confirm the same name, description, provider, price, and session are visible on that page.</li>
          <li>Confirm a list of courses, if you publish one, is a separate ItemList and not stuffed into this name.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>A price, a currency, a mode, or a date the page does not show. Use 0 only when the course is free.</li>
          <li>A provider the page does not name. Leave the field blank.</li>
          <li>A public event, a single video, or a service that is not a course. Use the generator for that type.</li>
          <li>A price or a slogan in the course name. Google’s technical guidelines call those titles invalid for the course-list feature.</li>
          <li>The same Course block on every URL of the site.</li>
        </ul>
        <h2>Questions about Course schema</h2>
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
