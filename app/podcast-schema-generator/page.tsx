import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { PodcastSchemaGenerator } from "@/components/PodcastSchemaGenerator";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { pageMeta } from "@/lib/content/meta";
import { getTopic } from "@/lib/content/topics";

const topic = getTopic("/podcast-schema-generator");

const seriesType = "https://schema.org/PodcastSeries";
const episodeType = "https://schema.org/PodcastEpisode";
const webFeed = "https://schema.org/webFeed";
const durationProp = "https://schema.org/duration";
const timeRequired = "https://schema.org/timeRequired";
const associatedMedia = "https://schema.org/associatedMedia";
const partOfSeries = "https://schema.org/partOfSeries";
const gallery = "https://developers.google.com/search/docs/appearance/structured-data/search-gallery";
const policies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";
const aiGuide = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";

const faqs = [
  {
    q: "Does PodcastSeries or PodcastEpisode schema guarantee an AI citation or a Google rich result?",
    a: "No. schema.org defines PodcastSeries as an episodic series of digital audio or video files a person can download, and PodcastEpisode as one episode of that series. Google’s structured data gallery, read on 21 October 2026, lists the rich results Google Search documents, including Video and Article. That list does not name PodcastSeries or PodcastEpisode. Google’s optimization guide, read the same day, says structured data is not required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features. The script does not make ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, Meta AI, DeepSeek, Mistral, Brave Search, You.com, DuckDuckGo, or Google AI Overviews cite the page.",
  },
  {
    q: "Which fields does this form require?",
    a: "schema.org does not list a required property for PodcastSeries or PodcastEpisode. This generator writes a script once the name is present and the type is one of those two. description, url, image, author, webFeed, datePublished, duration, episodeNumber, and the audio file are included only when they are valid. An author URL without a name is left out. On an episode, a series URL or an RSS URL without a series name is left out, so the script does not invent a show.",
  },
  {
    q: "When should the page be PodcastSeries, and when PodcastEpisode?",
    a: "Use PodcastSeries on the show page. webFeed is the RSS or Atom URL schema.org describes for that show. Use PodcastEpisode on the page for one episode. partOfSeries names the show. One episode is one script. A second episode is a second page. This form does not write a list of every episode inside the series script.",
  },
  {
    q: "Where should the script go, and why does it write duration instead of timeRequired?",
    a: "On the page for that show or that episode, in the HTML the server sends, where a person can already see the name and the other facts you mark up. Google’s structured data policies say not to mark up content that is not visible to readers of the page. The script is built in the browser. Nothing is sent to CiteScore. duration is the Episode property schema.org defines as the ISO 8601 length of the item. The JSON-LD example on schema.org’s PodcastEpisode page uses timeRequired for the same clock time. This form writes duration. Add timeRequired by hand only when you want that example’s property name, and do not write two different lengths. The example’s associatedMedia is a MediaObject. This form writes AudioObject, which is a MediaObject, because the field is the audio file. A watch page for a video episode uses VideoObject.",
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
  { href: "/ai-search-visibility-for-law-firms", label: "AI search visibility for law firms" },
  { href: "/ai-search-visibility-for-healthcare", label: "AI search visibility for healthcare" },
  { href: "/ai-search-visibility-for-real-estate", label: "AI search visibility for real estate" },
  { href: "/ai-search-visibility-for-restaurants", label: "AI search visibility for restaurants" },
  { href: "/ai-search-visibility-for-accountants", label: "AI search visibility for accountants" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function PodcastSchemaGeneratorPage() {
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
        ctaId="podcast-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <PodcastSchemaGenerator />
        <h2>Why the show is labeled</h2>
        <p>
          A show page can put the title in the H1, a one-sentence description under it, an RSS link in the subscribe
          list, and a host credit in the footer. An episode page can add a date, a length, and a download. An answer
          engine that quotes the page still has to decide which string is the show, which URL is the feed, and which
          file is that episode. <a href={seriesType}>schema.org PodcastSeries</a> and{" "}
          <a href={episodeType}>schema.org PodcastEpisode</a> are that decision written down. A parser, including the
          ones behind ChatGPT, Perplexity, Claude, Gemini, and Google AI Overviews, can read those labels without
          guessing which link was the RSS feed. The script does not create a citation, and it does not rank the page.
        </p>
        <p>
          Google’s <a href={aiGuide}>optimization guide</a>, read on 21 October 2026, says structured data is not
          required for AI Overviews or AI Mode, and that there is no special schema.org type to add for those features.
          The useful part is the same as for any other labeled fact: the show name, the episode name, the date, and the
          feed URL are in the HTML, in words a person can read. The longer note on which facts to repeat is the{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link>.
        </p>
        <p>
          Google’s <a href={gallery}>structured data gallery</a>, read on 21 October 2026, lists the rich results Google
          Search documents. Video and Article are on that list. PodcastSeries and PodcastEpisode are not. schema.org’s
          PodcastSeries page, read the same day, says the term is in the “new” area, where feedback from sites can
          improve the definition. A podcast app still subscribes to the RSS or Atom feed. <a href={webFeed}>webFeed</a>{" "}
          points at that file. This script does not replace the feed, and it does not submit the show to a directory. A
          restaurant that also publishes a show is a different page, on{" "}
          <Link href="/ai-search-visibility-for-restaurants">AI search visibility for restaurants</Link>. The show still
          gets its own script.
        </p>
        <h2>What each field is</h2>
        <p>
          PodcastSeries is the show. The script needs the name a person can see. <code>description</code> is the
          sentence on that page. <code>url</code> is the show page. <code>image</code> is the cover file.{" "}
          <code>webFeed</code> is the feed URL, usually RSS or Atom. <code>author</code> is a Person or an Organization.
          schema.org’s own series example uses a person. This form writes the author only when you enter a name. A URL
          without a name is omitted, so the script does not invent a host. This page does not print a sample personal
          name. Type the name that is already on the show page, or use the studio when the credit is the studio. One
          author is one party. A second host has to be added by hand as an array, and only when the page names that
          second host.
        </p>
        <p>
          PodcastEpisode is one episode. <code>datePublished</code> is <code>YYYY-MM-DD</code>, or a date and time.{" "}
          <a href={durationProp}>schema.org duration</a> is the length in ISO 8601. Thirty-two minutes and fifteen
          seconds is <code>PT32M15S</code>. A zero length is left out. <code>episodeNumber</code> is an integer when
          you enter a whole number, and text when the page shows a label such as <code>S2E4</code>.{" "}
          <a href={associatedMedia}>schema.org associatedMedia</a> is a media object that encodes the work. The JSON-LD
          example on the PodcastEpisode page uses a MediaObject and a <code>contentUrl</code>. This form writes an
          AudioObject, which is a MediaObject, because the field is the audio file. A video file does not belong there.
          A watch page uses the <Link href="/video-schema-generator">Video schema generator</Link>.
        </p>
        <p>
          <a href={partOfSeries}>schema.org partOfSeries</a> is the series this episode belongs to. This form writes a
          PodcastSeries with the show name, and the show URL and <code>webFeed</code> when those are valid. The feed
          stays on the series. It is not a property of the episode. A series URL without a show name is left out.{" "}
          <a href={timeRequired}>schema.org timeRequired</a> is the approximate time it takes to get through the work.
          The PodcastEpisode JSON-LD example uses it for the running time. This form writes <code>duration</code>{" "}
          instead, because that is the Episode property defined as the length of the item. Do not paste{" "}
          <code>timeRequired</code> next to it with a different length.
        </p>
        <p>
          Google’s <a href={policies}>structured data policies</a>, read on 21 October 2026, say not to mark up content
          that is not visible to readers of the page, and that the structured data must be a true representation of the
          page content. The copy block is one <code>script</code> tag. Paste it into the HTML the server sends. Answer
          engines often skip text that only appears after JavaScript runs. Show notes that are an article, with a
          headline and a byline, can also use the <Link href="/article-schema-generator">Article schema generator</Link>
          . Do not describe the same date in two scripts that disagree. The <Link href="/free-check">free check</Link>{" "}
          lists the JSON-LD <code>@type</code> values on the homepage. A show URL at another path is outside that
          fetch. The <Link href="/geo-audit">$39 audit</Link> looks for markup that matches the copy.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for that show page or that episode page, in the head or the body.</li>
          <li>Confirm the same name, description, page URL, image, feed, date, length, episode number, and audio file are visible on that page.</li>
          <li>Use PodcastSeries on the show. Use PodcastEpisode on each episode. Leave the series name blank only when the episode page does not name the show.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>A host, a date, a length, or an episode number the page does not show.</li>
          <li>An author URL without the name. Clear the URL or add the name.</li>
          <li>A series URL or an RSS URL on an episode when the series name is blank.</li>
          <li>A video file in the audio URL. A watch page uses VideoObject.</li>
          <li>timeRequired with a different length than duration.</li>
          <li>One series script that lists every episode. This form does not write that list.</li>
          <li>The same episode block on every URL of the site.</li>
        </ul>
        <h2>Questions about podcast schema</h2>
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
