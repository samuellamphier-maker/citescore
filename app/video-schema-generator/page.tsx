import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { VideoSchemaGenerator } from "@/components/VideoSchemaGenerator";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/video-schema-generator");

const faqs = [
  {
    q: "Does VideoObject schema guarantee a video result or an AI citation?",
    a: "No. Google’s video documentation says marking a watch page with VideoObject can influence the description, thumbnail URL, upload date, and duration shown in video results, and can make the video easier for Google to find. Google does not guarantee that a video feature appears. The script does not make ChatGPT, Perplexity, Claude, or Google AI Overviews cite the page. A title that exists only in the script describes a video the page does not show.",
  },
  {
    q: "Which fields does Google require, and which does this form require?",
    a: "Google’s VideoObject documentation lists name, thumbnailUrl, and uploadDate as required. description, duration, and contentUrl are recommended. Google says to provide embedUrl when a contentUrl is not available. This generator also requires the description, an ISO 8601 duration, and at least one of those URLs before it writes a script, so the tag is not a title with no file and no length. A timezone on the upload date is recommended by Google. A date alone is still accepted here.",
  },
  {
    q: "What is the difference between contentUrl and embedUrl?",
    a: "contentUrl is the video file itself, such as an mp4. embedUrl is the player for that video, usually the src of an embed element. Google says not to put the watch page in either property. Provide the file URL when you have it. Provide the player URL when you do not. Both are included when both are real http(s) URLs.",
  },
  {
    q: "Where should the script go, and what does publisher mean?",
    a: "Put it on the watch page, in the HTML the server sends, where a person can already see the title, description, thumbnail, date, and duration. Publisher is optional. It is an Organization, and it is included only when you enter a name. Google’s recommended property for who made the video is creator or author. This generator writes publisher, the schema.org property for the organization that published the video. It does not invent a person. A team byline such as CiteScore Team stays an Organization.",
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
  { href: "/hotel-schema-generator", label: "Hotel schema generator" },
  { href: "/restaurant-schema-generator", label: "Restaurant schema generator" },
  { href: "/medical-clinic-schema-generator", label: "Medical clinic schema generator" },
  { href: "/attorney-schema-generator", label: "Attorney schema generator" },
  { href: "/dentist-schema-generator", label: "Dentist schema generator" },
  { href: "/real-estate-agent-schema-generator", label: "Real estate agent schema generator" },
  { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function VideoSchemaGeneratorPage() {
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
        ctaId="video-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <VideoSchemaGenerator />
        <h2>Why the video is labeled</h2>
        <p>
          Google’s{" "}
          <a href="https://developers.google.com/search/docs/appearance/structured-data/video">video documentation</a>{" "}
          says Google tries to understand a video on its own, and that VideoObject can influence the description,
          thumbnail URL, upload date, and duration shown in video results. The same page says the markup can make the
          video easier for Google to find. Videos can appear in the main search results, Video mode, Google Images, and
          Google Discover. Google does not guarantee a placement.
        </p>
        <p>
          An answer engine that quotes a watch page still has to decide which string is the title, which image is the
          thumbnail, how long the video is, and which URL is the file. VideoObject is that decision written down.
          schema.org defines the type with a <code>name</code>, a <code>description</code>, a <code>thumbnailUrl</code>
          , an <code>uploadDate</code>, a <code>duration</code>, a <code>contentUrl</code>, an <code>embedUrl</code>,
          and an optional <code>publisher</code>. A parser, including the ones behind ChatGPT, Perplexity, Claude, and
          Google AI Overviews, can read those labels without guessing which link is the player. The script does not
          create a citation, and it does not rank the page.
        </p>
        <p>
          Google lists <code>name</code>, <code>thumbnailUrl</code>, and <code>uploadDate</code> as required.
          <code>description</code>, <code>duration</code>, and <code>contentUrl</code> are recommended. Google says to
          provide <code>embedUrl</code> when a file URL is not available, and that neither URL should be the watch page
          itself. <code>duration</code> is an ISO 8601 duration. Google’s example of one minute and 54 seconds is{" "}
          <code>PT1M54S</code>. Thirty minutes and five seconds can be written <code>PT00H30M5S</code>. This form
          requires the recommended description, duration, and at least one URL before it emits a script. A timezone on
          the upload date is recommended. <code>2024-03-31T08:00:00+08:00</code> is that shape. A date alone is
          accepted.
        </p>
        <p>
          The copy block is one <code>script</code> tag. Paste it into the HTML the server sends for the watch page.
          Answer engines often skip text that only appears after JavaScript runs. The thumbnail is written as a
          one-item list, which matches Google’s repeated <code>thumbnailUrl</code> example. A publisher is an
          Organization, included only when it has a name. A URL without a name is omitted, so the script does not invent
          an organization. Google’s recommended property for who made the video is <code>creator</code> or{" "}
          <code>author</code>. This generator writes <code>publisher</code>. It does not emit <code>Clip</code>,{" "}
          <code>SeekToAction</code>, or <code>BroadcastEvent</code>. The <Link href="/free-check">free check</Link>{" "}
          lists the JSON-LD <code>@type</code> values on the homepage. The <Link href="/geo-audit">$39 audit</Link>{" "}
          looks for markup that matches the copy. A procedure uses the{" "}
          <Link href="/howto-schema-generator">HowTo schema generator</Link>. An article uses the{" "}
          <Link href="/article-schema-generator">Article schema generator</Link>. The publisher’s logo and profiles use
          the <Link href="/organization-schema-generator">Organization schema generator</Link>. The homepage uses the{" "}
          <Link href="/website-schema-generator">WebSite schema generator</Link>. An event page uses the{" "}
          <Link href="/event-schema-generator">Event schema generator</Link>. A page that shows reviews of a product or an app uses the <Link href="/review-schema-generator">Review schema generator</Link>. A service page uses the <Link href="/service-schema-generator">Service schema generator</Link>. A course page uses the <Link href="/course-schema-generator">Course schema generator</Link>. A job page uses the <Link href="/job-posting-schema-generator">Job posting schema generator</Link>. A recipe page uses the <Link href="/recipe-schema-generator">Recipe schema generator</Link>. A forum or support page where people can submit answers uses the <Link href="/qa-page-schema-generator">QAPage schema generator</Link>. A page that names a short passage for text-to-speech uses the <Link href="/speakable-schema-generator">Speakable schema generator</Link>. An image with a visible credit, caption, or license uses the <Link href="/image-object-schema-generator">ImageObject schema generator</Link>. A book page uses the <Link href="/book-schema-generator">Book schema generator</Link>. A show page or an episode page uses the <Link href="/podcast-schema-generator">Podcast schema generator</Link>. A film page uses the <Link href="/movie-schema-generator">Movie schema generator</Link>. A dataset page uses the <Link href="/dataset-schema-generator">Dataset schema generator</Link>. A vehicle page uses the <Link href="/vehicle-schema-generator">Vehicle schema generator</Link>. A hotel page uses the <Link href="/hotel-schema-generator">Hotel schema generator</Link>. A restaurant page uses the <Link href="/restaurant-schema-generator">Restaurant schema generator</Link>. A clinic page uses the <Link href="/medical-clinic-schema-generator">Medical clinic schema generator</Link>. A law office page uses the <Link href="/attorney-schema-generator">Attorney schema generator</Link>. A dental office page uses the <Link href="/dentist-schema-generator">Dentist schema generator</Link>. An agent office page uses the <Link href="/real-estate-agent-schema-generator">Real estate agent schema generator</Link>. The longer note on which facts to
          repeat is the <Link href="/schema-markup-for-ai-search">schema guide</Link>.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for the watch page, in the head or the body.</li>
          <li>Confirm the same title, description, thumbnail, date, and duration are visible on that page.</li>
          <li>Confirm the content URL fetches the file, or the embed URL loads the player, and that neither is only the watch page.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>A thumbnail that is a logo, a different video, or a URL that is not an image file.</li>
          <li>A content URL or embed URL that points at the watch page instead of the file or the player.</li>
          <li>A duration or an upload date the page does not show. A zero duration is omitted.</li>
          <li>A publisher the page does not name. Leave the field blank.</li>
          <li>The same VideoObject on every URL. One watch page per video is enough.</li>
        </ul>
        <h2>Questions about Video schema</h2>
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
