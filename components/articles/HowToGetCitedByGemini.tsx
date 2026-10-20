import Link from "next/link";
import { CheckLinks, preClass } from "@/components/articles/guide-links";

const googleExtended =
  "https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers";
const aiFeatures =
  "https://developers.google.com/search/docs/appearance/ai-features";
const aiGuide =
  "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";
const searchControl =
  "https://support.google.com/webmasters/answer/16908024?hl=en";

export function HowToGetCitedByGeminiArticle() {
  return (
    <>
      <p>
        “Gemini” covers two different Google products, and they do not share
        one robots.txt switch. Gemini Apps and Grounding with Google Search
        on Vertex AI use the <code>Google-Extended</code> token. AI Overviews
        and AI Mode are Google Search. CiteScore does not query Gemini or
        Google. The claims below are from Google’s crawler page and Search
        Central.
      </p>
      <p>
        The Search half of this is{" "}
        <Link href="/google-ai-overviews-optimization">
          Google AI Overviews optimization
        </Link>{" "}
        and{" "}
        <Link href="/google-ai-mode-optimization">
          Google AI Mode optimization
        </Link>
        . AI Mode uses the same snippet and Search Console rules, and a
        different position rule. ChatGPT, Perplexity, Claude, Copilot, and{" "}
        <Link href="/how-to-get-cited-by-meta-ai">Meta AI</Link> publish
        different controls. DeepSeek’s Search and Fetch guide, which does
        not name a robots.txt token, is{" "}
        <Link href="/how-to-get-cited-by-deepseek">how to get cited by DeepSeek</Link>.
        Mistral’s Le Chat, now Vibe, is{" "}
        <Link href="/how-to-get-cited-by-mistral">how to get cited by Mistral</Link>.
        Brave Search’s crawler page, which does not publish its own user
        agent, is{" "}
        <Link href="/how-to-get-cited-by-brave-search">how to get cited by Brave Search</Link>.
        You.com’s Answer API guide, which cites a source URL and a verbatim
        excerpt and does not name a robots.txt token, is{" "}
        <Link href="/how-to-get-cited-by-you-com">how to get cited by You.com</Link>.
        DuckDuckGo’s Search Assist page, which cites one or two sources and
        names DuckAssistBot for that crawl, is{" "}
        <Link href="/how-to-get-cited-by-duckduckgo-ai">how to get cited by DuckDuckGo</Link>.
        The others are linked from{" "}
        <Link href="/how-to-get-cited-by-ai-answer-engines">
          how to get cited by AI answer engines
        </Link>
        .
      </p>

      <h2>Two products, two controls</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Surface</th>
              <th>What Google says governs it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Gemini Apps and Vertex grounding</th>
              <td>
                <code>Google-Extended</code> in robots.txt. Google’s common
                crawlers page says this token manages whether crawled content
                may train future Gemini models, and whether it may ground
                answers in Gemini Apps and Grounding with Google Search on
                Vertex AI. Grounding means providing content from the Google
                Search index to the model at prompt time.
              </td>
            </tr>
            <tr>
              <th scope="row">AI Overviews and AI Mode</th>
              <td>
                Google Search. The{" "}
                <a href={aiFeatures}>AI features guide</a> says a page has to
                be indexed and eligible for a snippet. Googlebot, snippet
                controls, and the Search Console generative AI setting are
                the controls. <code>Google-Extended</code> is not one of
                them.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Google says <code>Google-Extended</code> does not change inclusion or
        ranking in Google Search, and it has no separate HTTP user-agent.
        Crawling is done with existing Google user-agents. The token only
        exists as a robots.txt control. Disallowing it opts the site out of
        that Gemini training and grounding use. It does not remove the site
        from AI Overviews.
      </p>

      <h2>Leave Gemini Apps able to ground</h2>
      <p>
        If the goal is grounding in Gemini Apps, do not publish this group.
        A disallow is the opt-out Google documents:
      </p>
      <pre className={preClass}>{`User-agent: Google-Extended
Disallow: /`}</pre>
      <p>
        The write-up is{" "}
        <a href={googleExtended}>Google’s common crawlers</a>. To limit the
        models used inside Search’s generative features, Search Console Help
        points at this same token, not at the Search inclusion control. That
        Search control — include or exclude links in AI Overviews, AI Mode,
        and generative features in Discover — is{" "}
        <a href={searchControl}>Search generative AI features</a>. Include is
        the default. Google says the control is not a ranking signal for the
        rest of Search.
      </p>
      <p>
        The{" "}
        <a href={aiGuide}>optimization guide</a> says there is no special
        markup or Markdown file required to appear in Google Search,
        including its generative features. An <code>llms.txt</code> file
        neither helps nor harms that visibility. Structured data still has
        to match the visible page. The markup examples are on{" "}
        <Link href="/schema-markup-for-ai-search">
          schema markup for AI search
        </Link>
        .
      </p>

      <h2>What a robots line does not do</h2>
      <p>
        Allowing <code>Google-Extended</code> does not publish a Gemini
        citation. Google does not give a rate. A page that is not in the
        Search index is not available as Search-index grounding. Fetch
        access for Googlebot, a snippet, and the Search Console include
        setting are the Search side. The token above is the Gemini Apps
        side. The three tokens the CiteScore audit records, and what
        Google-Extended does not control, are on{" "}
        <Link href="/ai-crawlers">AI crawlers</Link>.
      </p>

      <CheckLinks>
        The free check does read Google-Extended, and reports allow,
        disallow, or not mentioned. It does not query Gemini, and it does
        not read the Search Console generative AI setting.
      </CheckLinks>

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={googleExtended}>Google’s common crawlers</a>.
          Google-Extended: training, grounding, no separate user-agent, no
          effect on Search inclusion or ranking.
        </li>
        <li>
          <a href={aiFeatures}>AI features and your website</a> and{" "}
          <a href={aiGuide}>
            optimizing your website for generative AI features
          </a>
          . Indexing, snippets, and the files Google says you do not need.
        </li>
        <li>
          <a href={searchControl}>
            Search generative AI features in Search Console
          </a>
          . The include or exclude control for AI Overviews and AI Mode.
        </li>
      </ul>
    </>
  );
}
