import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { QaPageSchemaGenerator } from "@/components/QaPageSchemaGenerator";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/qa-page-schema-generator");

const qaType = "https://schema.org/QAPage";
const qaDocs = "https://developers.google.com/search/docs/appearance/structured-data/qapage";
const faqDocs = "https://developers.google.com/search/docs/appearance/structured-data/faqpage";
const policies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";

const faqs = [
  {
    q: "Does QAPage schema guarantee a Google rich result or an AI citation?",
    a: "No. Google’s QAPage documentation, read on 21 October 2026, says a properly marked-up page is eligible for a rich result, and that Google does not guarantee that a feature which uses structured data will show. The script does not make ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, Meta AI, DeepSeek, Mistral, Brave Search, You.com, DuckDuckGo, or Google AI Overviews cite the page. A question, an answer, an author, or a date that exists only in the script describes a thread the page does not show.",
  },
  {
    q: "When should this be QAPage, and when should it be FAQPage?",
    a: "QAPage is one question that is the focus of the page, followed by its answers, on a page where people can submit answers. Google’s content guidelines name a forum thread and a product support page as valid, and they name a site-written FAQ, a product page with many questions, a how-to, a blog post, and an essay as invalid. An education page where experts select one answer to a user-submitted question is the exception that page allows. FAQPage is the list of questions the site itself answers, one accepted answer each. Google stopped showing FAQ rich results in May 2026. schema.org’s QAPage description also mentions documenting FAQs, which is wider than Google’s rule. Use the FAQ schema generator for a company-written FAQ.",
  },
  {
    q: "Which fields does this form require?",
    a: "The script is written once the question is present. Google’s QAPage table lists mainEntity as a Question, and on that Question it lists name, answerCount, and either acceptedAnswer or suggestedAnswer. Answer text is required on each answer that is included. A question with no answers is still written, with answerCount 0 unless you enter a higher total. The long question text, the authors, the dates, and the answer URLs are included only when they are valid. An author URL without a name is left out. upvoteCount, comments, images, video, and digitalSourceType are not in this form. Add those by hand only when the page shows them.",
  },
  {
    q: "Where should the script go?",
    a: "On the page for that one question, in the HTML the server sends, where a person can already see the question, the answers, and any author or date you mark up. Google’s structured data policies say not to mark up content that is not visible to readers of the page. Google’s QAPage page says there must be only one QAPage type on the page, and only one Question. The script is built in the browser. Nothing is sent to CiteScore.",
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
  { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
  { href: "/ai-search-visibility-for-b2b-saas", label: "AI search visibility for B2B SaaS" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function QaPageSchemaGeneratorPage() {
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
        ctaId="qa-page-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <QaPageSchemaGenerator />
        <h2>When the page is a QAPage</h2>
        <p>
          A support thread has one question and the replies under it. An answer engine that quotes that page still has
          to decide which block is the question, which reply was accepted, and which replies are only suggestions.{" "}
          <a href={qaType}>schema.org QAPage</a> is that decision written down. The question is{" "}
          <code>mainEntity</code>. The short form is <code>name</code>. The longer form, when the page has one, is{" "}
          <code>text</code>. The accepted reply is <code>acceptedAnswer</code>. The other replies are{" "}
          <code>suggestedAnswer</code>. A parser, including the ones behind ChatGPT, Perplexity, Claude, and Google AI
          Overviews, can read those labels without guessing. The script does not create a citation, and it does not
          rank the page. The practical version for a software company is{" "}
          <Link href="/ai-search-visibility-for-b2b-saas">AI search visibility for B2B SaaS</Link>.
        </p>
        <p>
          Google’s <a href={qaDocs}>QAPage documentation</a>, last updated 8 September 2026 and read on 21 October 2026,
          says the markup is for a page with one question followed by its answers. Users must be able to submit
          answers. The valid cases on that page are a forum thread and a product support page. The invalid cases are an
          FAQ written by the site with no way to add another answer, a product page where people post many questions, a
          how-to, a blog post, and an essay. Education pages, where the point is a correct answer to a homework
          question and experts select that answer, are the exception that page allows. Those pages may have a single
          answer. This form can still write that one accepted answer. It does not decide whether your page is the
          education case.
        </p>
        <p>
          <a href={faqDocs}>FAQPage</a> is the other type. It is a list of questions the site itself answers, one
          accepted answer each. Use the <Link href="/faq-schema-generator">FAQ schema generator</Link> for that page.
          Google’s Search Central changelog says FAQ rich results stopped appearing in Google Search in May 2026. The
          FAQ script will not bring back an accordion under a listing. Keep it when the questions are visible.{" "}
          <a href="https://schema.org/QAPage">schema.org’s QAPage description</a> also mentions documenting frequently
          asked questions, which is wider than Google’s content guidelines. If you want Google’s QA rich result, follow
          Google’s narrower rule. A company-written FAQ stays on the FAQ generator.
        </p>
        <h2>What the script includes</h2>
        <p>
          Google’s table lists <code>mainEntity</code> as required on QAPage, and it says there is one QAPage and one
          Question on the page. On the Question, <code>name</code> is the full short text. <code>answerCount</code> is
          the total number of answers. That page says the total can be higher than the answers you mark up, for
          example when a thread is paginated. It can be 0 when nobody has answered. A question with no answer is not
          eligible for the rich result. This form writes the script once the question is filled in. If you leave the
          count blank, the script uses the number of answers that have text, including zero. If you type a whole
          number that is at least that count, the script uses your number. A number below the answers in the form is
          replaced with the included count, and the form says so.
        </p>
        <p>
          <code>acceptedAnswer</code> is a reply the site treats as accepted: the asker, a moderator, or a vote. That
          page says another sort, such as most recent, is not how to pick it. <code>suggestedAnswer</code> is a
          possible reply that is not the accepted one. Each one needs <code>text</code>, the full answer. One suggested
          answer is a single Answer. More than one is an array. A row without text is left out, even if you typed an
          author or a date.
        </p>
        <p>
          <code>author</code> is a Person or an Organization, on the question and on each answer, and only when you
          enter a name. A URL without a name is omitted, so the script does not invent a byline. Google’s page
          recommends a URL that identifies the author, usually a profile on the same site. <code>datePublished</code>{" "}
          and <code>dateModified</code> are ISO 8601. A calendar day is <code>2026-10-21</code>. A time is{" "}
          <code>2026-10-21T15:04:00Z</code>, or the same shape with an offset. An impossible date is left out. An answer{" "}
          <code>url</code> is included when it is an http or https URL. Google’s page says that link is worth adding
          because it can point at the answer on your site.
        </p>
        <p>
          This form leaves out <code>upvoteCount</code>, <code>comment</code>, <code>commentCount</code>,{" "}
          <code>image</code>, <code>video</code>, and <code>digitalSourceType</code>. Google lists them as recommended
          when the page has them, and says to omit a property the site does not support. A comment on a question is not
          an answer. Add a <code>Comment</code> by hand only when the page shows that comment. The publisher on the
          homepage uses the <Link href="/organization-schema-generator">Organization schema generator</Link>. A
          procedure uses the <Link href="/howto-schema-generator">HowTo schema generator</Link>.
        </p>
        <p>
          Google’s <a href={policies}>structured data policies</a> say not to mark up content that is not visible to
          readers of the page, and that the structured data must be a true representation of the page content. The copy
          block is one <code>script</code> tag. Paste it into the HTML the server sends for that thread. Answer engines
          often skip text that only appears after JavaScript runs. The <Link href="/free-check">free check</Link> lists
          the JSON-LD <code>@type</code> values on the homepage. A support URL at another path is outside that fetch.
          The <Link href="/geo-audit">$39 audit</Link> looks for markup that matches the copy. The longer note on which
          facts to repeat is the <Link href="/schema-markup-for-ai-search">schema guide</Link>.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for that one question, in the head or the body.</li>
          <li>Confirm the same question, answers, authors, and dates are visible on that page.</li>
          <li>Confirm people can submit an answer, unless the page is the education case Google describes.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>A site-written FAQ with no way for someone else to answer. Use the FAQ generator.</li>
          <li>Several questions on one URL. Google’s page says QAPage is for a single question.</li>
          <li>An author, a date, or a vote the page does not show. Leave the field blank.</li>
          <li>A comment marked up as an answer. Google’s page says comments use Comment.</li>
          <li>The same QAPage block on every URL of the site.</li>
        </ul>
        <h2>Questions about QAPage schema</h2>
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
