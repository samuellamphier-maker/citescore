import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { SpeakableSchemaGenerator } from "@/components/SpeakableSchemaGenerator";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/speakable-schema-generator");

const speakableType = "https://schema.org/SpeakableSpecification";
const speakableProperty = "https://schema.org/speakable";
const speakableDocs = "https://developers.google.com/search/docs/appearance/structured-data/speakable";
const policies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";

const faqs = [
  {
    q: "Does Speakable schema guarantee a Google Assistant readout or an AI citation?",
    a: "No. Google’s speakable documentation, read on 21 October 2026, says the feature is in beta and subject to change, and that Google does not guarantee that features which use structured data will show. The documented consumer is the Google Assistant answering topical news queries on Google Home devices, for users in the U.S. with the device set to English, from publishers that publish in English. The Assistant returns up to three articles and attributes the source. The script does not make ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, Meta AI, DeepSeek, Mistral, Brave Search, You.com, DuckDuckGo, or Google AI Overviews cite the page. Those products are not named on schema.org’s speakable page or on Google’s speakable page.",
  },
  {
    q: "When does speakable markup help a voice assistant?",
    a: "schema.org’s speakable property, read on 21 October 2026, marks sections of a Web page that are especially appropriate for text-to-speech. It is used on Article or WebPage. Google’s narrower beta uses that markup so the Google Assistant can read a short news passage aloud. The helpful case is an English news page whose headline or summary is already visible, concise, and not a dateline, a photo caption, or a source attribution. Google recommends around 20–30 seconds per section, or roughly two or three sentences, and says not to highlight the entire article. A product page, a local-business page, or a company FAQ is outside the news case that page describes.",
  },
  {
    q: "Should the locator be cssSelector or xpath, and which spelling?",
    a: "Google’s speakable page says to use either cssSelector or xPath, and not both. schema.org’s property name is xpath. Google’s page spells that key xPath. This form writes one SpeakableSpecification and one locator. When you choose XPath, you also choose the spelling. schema.org also allows a speakable value that is an id-value URL, such as a fragment. This form does not write that shape. A single locator is still written as an array, which is the shape of the examples on both pages.",
  },
  {
    q: "Where should the script go?",
    a: "On the page whose passage you are marking, in the HTML the server sends, where a person can already see that text. Google’s structured data policies say not to mark up content that is not visible to readers of the page. The script is built in the browser. Nothing is sent to CiteScore.",
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
  { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
  { href: "/ai-search-visibility-for-law-firms", label: "AI search visibility for law firms" },
  { href: "/ai-search-visibility-for-healthcare", label: "AI search visibility for healthcare" },
  { href: "/ai-search-visibility-for-real-estate", label: "AI search visibility for real estate" },
  { href: "/ai-search-visibility-for-restaurants", label: "AI search visibility for restaurants" },
  { href: "/ai-search-visibility-for-accountants", label: "AI search visibility for accountants" },
  { href: "/ai-search-visibility-for-dentists", label: "AI search visibility for dentists" },
  { href: "/ai-search-visibility-for-plumbers", label: "AI search visibility for plumbers" },
  { href: "/ai-search-visibility-for-hvac", label: "AI search visibility for HVAC" },
  { href: "/ai-search-visibility-for-roofers", label: "AI search visibility for roofers" },
  { href: "/ai-search-visibility-for-electricians", label: "AI search visibility for electricians" },
  { href: "/ai-search-visibility-for-landscapers", label: "AI search visibility for landscapers" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function SpeakableSchemaGeneratorPage() {
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
        ctaId="speakable-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <SpeakableSchemaGenerator />
        <h2>When a passage is speakable</h2>
        <p>
          A news page has a headline and a short summary a person can read. A text-to-speech system still has to decide
          which block to speak and which block to skip. <a href={speakableProperty}>schema.org speakable</a> is that
          decision written down. The value is a <a href={speakableType}>SpeakableSpecification</a> with{" "}
          <code>cssSelector</code> or <code>xpath</code>, or a URL that points at an element id. A parser can read the
          locator without guessing which paragraph was meant to be heard. The script does not create a citation, and it
          does not rank the page. A law firm’s office page is a different problem, on{" "}
          <Link href="/ai-search-visibility-for-law-firms">AI search visibility for law firms</Link>. A clinic or
          health-tech site is on{" "}
          <Link href="/ai-search-visibility-for-healthcare">AI search visibility for healthcare</Link>. A brokerage
          office is on <Link href="/ai-search-visibility-for-real-estate">AI search visibility for real estate</Link>. A restaurant location is on <Link href="/ai-search-visibility-for-restaurants">AI search visibility for restaurants</Link>. An accounting office is on <Link href="/ai-search-visibility-for-accountants">AI search visibility for accountants</Link>. A dental office is on <Link href="/ai-search-visibility-for-dentists">AI search visibility for dentists</Link>. A plumbing business’s office, service area, and hours are on <Link href="/ai-search-visibility-for-plumbers">AI search visibility for plumbers</Link>. An HVAC company’s office, service area, and hours are on <Link href="/ai-search-visibility-for-hvac">AI search visibility for HVAC</Link>. A roofing contractor’s office, service area, and hours are on <Link href="/ai-search-visibility-for-roofers">AI search visibility for roofers</Link>. An electrical contractor’s shop, service area, and hours are on <Link href="/ai-search-visibility-for-electricians">AI search visibility for electricians</Link>. A landscaping business’s office, service area, and hours are on <Link href="/ai-search-visibility-for-landscapers">AI search visibility for landscapers</Link>. A photo credit
          uses the <Link href="/image-object-schema-generator">ImageObject schema generator</Link>.
        </p>
        <p>
          Google’s <a href={speakableDocs}>speakable documentation</a>, read on 21 October 2026, says the feature is in
          beta. The Google Assistant uses the markup to answer topical news queries on smart speaker devices. It returns
          up to three articles from around the web, reads the marked sections with text-to-speech, attributes the
          source, and sends the full article URL to the user’s mobile device through the Google Assistant app. The same
          page limits that behavior to users in the U.S. who have Google Home devices set to English, and to publishers
          that publish content in English. It says the property works with <code>Article</code> or <code>Webpage</code>.
          schema.org says <code>Article</code> or <code>WebPage</code>. This form writes <code>WebPage</code>. An article
          that also needs a headline, a date, and a byline uses the{" "}
          <Link href="/article-schema-generator">Article schema generator</Link>. Add <code>speakable</code> to that
          script by hand if the page is an article and the passage is visible. This form does not write those article
          fields.
        </p>
        <p>
          The pages that document the property do not name ChatGPT, Perplexity, Claude, Gemini, Copilot, or Google AI
          Overviews as consumers of <code>speakable</code>. schema.org describes the property for text-to-speech in
          general. Google’s page describes one beta, for news, on Google Assistant. A selector on a product page or a
          firm homepage does not turn that page into the news case. Google’s troubleshooting note says that if a voice
          command does not play the story, ranking is algorithmic, and the Assistant provides up to three articles from
          different publications.
        </p>
        <h2>What the script includes</h2>
        <p>
          The script is written once the page name and at least one valid locator are present. <code>name</code> is the
          name a person can see. <code>url</code> is included when it is an http or https URL. A missing scheme is read
          as https. An invalid URL is left out, and the name can still be written.
        </p>
        <p>
          Google’s table says to use either <code>cssSelector</code> or <code>xPath</code>, and not both. schema.org’s
          property is <code>xpath</code>. The letters differ. This form writes one <code>SpeakableSpecification</code>.
          The locator you do not select is left out, even if those rows still have text. When the locator is XPath, the
          property name is the spelling you pick: <code>xpath</code> for schema.org, or <code>xPath</code> for the key
          on Google’s page. The form does not write both spellings. One locator is a one-item array. More than one is a
          longer array. That is the shape of the JSON-LD examples on both pages. A repeated row is written once. A blank
          row is left out.
        </p>
        <p>
          schema.org’s JSON-LD example uses <code>cssSelector</code> values <code>headline</code> and{" "}
          <code>summary</code>, without a dot. Google’s example uses <code>.headline</code> and <code>.summary</code>.
          This form keeps the text you type, so a class selector keeps its dot and a bare class name stays bare. Match
          the class or the id that is actually on the page. Google’s XPath example is{" "}
          <code>/html/head/title</code> and{" "}
          <code>{`/html/head/meta[@name='description']/@content`}</code>. An
          expression has to start with <code>/</code>, <code>./</code>, <code>../</code>, or <code>(</code>. A class
          selector typed into the XPath rows is left out.
        </p>
        <p>
          Google’s content guidelines say the marked text should be a concise headline or summary, and they recommend
          around 20–30 seconds per section, or roughly two or three sentences. The technical guidelines say not to mark
          a dateline, a photo caption, or a source attribution, because those sound confusing when only the voice is
          heard, and not to highlight the entire article. This form leaves out the CSS selectors <code>html</code>,{" "}
          <code>body</code>, <code>:root</code>, and <code>*</code>, and the XPath values <code>/html</code> and{" "}
          <code>/html/body</code>. It cannot see your template, so a selector such as <code>article</code> is kept when
          you type it. Use it only when that element is the short passage, not the whole story.
        </p>
        <p>
          schema.org also allows <code>speakable</code> to be an id-value URL, such as <code>#summary</code>, with no{" "}
          <code>SpeakableSpecification</code>. This form does not write that shape. Use a CSS id selector,{" "}
          <code>#summary</code>, when the element has that id and you want the specification type. Google’s{" "}
          <a href={policies}>structured data policies</a>, read on 21 October 2026, say not to mark up content that is
          not visible to readers of the page, and that the structured data must be a true representation of the page
          content. The copy block is one <code>script</code> tag. Paste it into the HTML the server sends for that
          page. Answer engines often skip text that only appears after JavaScript runs. The{" "}
          <Link href="/free-check">free check</Link> lists the JSON-LD <code>@type</code> values on the homepage. A
          news URL at another path is outside that fetch. The <Link href="/geo-audit">$39 audit</Link> looks for markup
          that matches the copy. The longer note on which facts to repeat is the{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link>.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for that page, in the head or the body.</li>
          <li>Confirm the same name is visible, and that each locator matches text a person can already read.</li>
          <li>
            If the page is English news you want the Google Assistant beta to read, choose the <code>xPath</code>{" "}
            spelling before you copy. schema.org’s spelling is <code>xpath</code>.
          </li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>The whole article. Mark the headline or a two-to-three sentence summary.</li>
          <li>A dateline, a photo caption, or a source line. Google’s page says those are a poor listen.</li>
          <li>Both a CSS selector and an XPath in one script. Google’s page says to use one.</li>
          <li>Both spellings of the XPath key. Pick the page you are following.</li>
          <li>A selector that does not match this URL. The same block on every page is a different document.</li>
          <li>A passage that exists only in the script. Leave the row blank.</li>
        </ul>
        <h2>Questions about Speakable schema</h2>
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
