import Link from "next/link";
import { CheckLinks, preClass } from "@/components/articles/guide-links";

const guidelines =
  "https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a";
const crawlers =
  "https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0";
const robotsMeta =
  "https://www.bing.com/webmasters/help/robots-meta-tags-and-attributes-that-bing-supports-5198d240";
const removal =
  "https://www.bing.com/webmasters/help/how-to-permanently-remove-a-url-or-page-from-bing-or-copilot-37c07477";
const robotsNote =
  "https://blogs.bing.com/webmaster/May-2012/To-crawl-or-not-to-crawl,-that-is-BingBot-s-questi";

export function HowToGetCitedByCopilotArticle() {
  return (
    <>
      <p>
        Microsoft Copilot’s web answers sit on Bing’s crawl and index. Bing’s
        webmaster guidelines describe one foundation for Bing search,
        Copilot, and grounding API results. There is no separate Copilot
        crawler token in Bing’s crawler list. CiteScore does not log into
        Copilot or Bing. The claims below are from Bing Webmaster Tools.
      </p>
      <p>
        ChatGPT, Perplexity, Claude, and Gemini publish their own controls.
        xAI’s Web Search tool, which does not come with a robots.txt token,
        is on{" "}
        <Link href="/how-to-get-cited-by-grok">how to get cited by Grok</Link>.
        The map is{" "}
        <Link href="/how-to-get-cited-by-ai-answer-engines">
          how to get cited by AI answer engines
        </Link>
        . What “answer engine optimization” does and does not mean is on{" "}
        <Link href="/answer-engine-optimization">
          answer engine optimization
        </Link>
        .
      </p>

      <h2>Bingbot is the crawl</h2>
      <p>
        Bing’s{" "}
        <a href={crawlers}>crawler overview</a> says Bingbot is the standard
        crawler and handles most crawling. AdIdxBot is for ads. BingPreview
        and MicrosoftPreview build page snapshots. None of those is a second
        index for Copilot. The guidelines say Copilot search experiences use
        the same crawling, indexing, and ranking foundation as Bing search.
      </p>
      <p>
        Robots.txt tells Bing’s crawlers how to interact with the site. It
        does not, by itself, decide indexing. Bing’s{" "}
        <a href={robotsNote}>robots.txt note</a> says that when there is no
        bingbot or msnbot group, Bingbot honors the wildcard group, and that
        a bingbot group replaces the other groups. Copy any disallow you
        still want into that group. An old msnbot disallow, with no bingbot
        group of its own, still applies to Bingbot.
      </p>
      <pre className={preClass}>{`User-agent: bingbot
Allow: /`}</pre>
      <p>
        User-agent strings can be spoofed. Bing says to confirm an IP with
        the Verify Bingbot tool before treating a request as theirs. The
        three tokens CiteScore records — GPTBot, PerplexityBot, and
        Google-Extended — do not include bingbot. That page is{" "}
        <Link href="/ai-crawlers">AI crawlers</Link>.
      </p>

      <h2>Meta tags that change Copilot</h2>
      <p>
        Bing’s guidelines and{" "}
        <a href={robotsMeta}>robots meta tag list</a> separate crawl from
        what Copilot may quote:
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Directive</th>
              <th>What Bing says it does</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">noindex</th>
              <td>
                Keeps the URL out of Bing search, Copilot experiences, and
                grounding API results. Bingbot still has to crawl the page
                to see the tag. The{" "}
                <a href={removal}>removal guide</a> says the same tag is how
                a page that stays online leaves Bing and Copilot.
              </td>
            </tr>
            <tr>
              <th scope="row">noarchive</th>
              <td>
                Prevents the content from being used in Copilot responses
                and grounding results.
              </td>
            </tr>
            <tr>
              <th scope="row">nocache</th>
              <td>
                Limits Copilot to the URL, title, and snippet, which Bing
                says reduces citation depth. If both nocache and noarchive
                are present, Bing treats the page as nocache.
              </td>
            </tr>
            <tr>
              <th scope="row">nosnippet</th>
              <td>
                Stops captions. Bing says that may limit Copilot citation
                quality. <code>data-nosnippet</code> works the same way on
                the marked section.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        A page you want quoted should be crawlable by Bingbot, indexable,
        and free of noarchive and nocache. Bing does not publish a citation
        rate for Copilot.
      </p>

      <h2>What the guidelines leave out</h2>
      <p>
        The Copilot section of the guidelines does not require a schema type
        or an <code>llms.txt</code> file. It does say SEO practices that
        help discovery and content clarity also support eligibility for
        grounding and citations. Put the fact in HTML Bingbot can render.
        Hiding the only copy of a price or a policy inside client-side
        script is one of the discovery problems the guidelines list.
      </p>
      <p>
        Google’s version of the same split — Search features versus a
        training token — is{" "}
        <Link href="/google-ai-overviews-optimization">
          Google AI Overviews optimization
        </Link>
        .
      </p>

      <CheckLinks>
        The free check does not parse bingbot, noarchive, or nocache. A
        clear Google-Extended row says nothing about Copilot.
      </CheckLinks>

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={guidelines}>Bing webmaster guidelines</a>. One crawl and
          index for Bing search, Copilot, and grounding.
        </li>
        <li>
          <a href={crawlers}>Which crawlers does Bing use?</a> Bingbot, and
          robots.txt as the crawl control.
        </li>
        <li>
          <a href={robotsMeta}>Robots meta tags Bing supports</a>. noindex,
          noarchive, nocache, and nosnippet.
        </li>
        <li>
          <a href={removal}>
            How to permanently remove a URL from Bing or Copilot
          </a>
          . noindex, seen on a later crawl.
        </li>
        <li>
          <a href={robotsNote}>
            To crawl or not to crawl, that is BingBot’s question
          </a>
          . Wildcard groups, and a bingbot group that replaces them.
        </li>
      </ul>
    </>
  );
}
