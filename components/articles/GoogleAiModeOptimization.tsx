import Link from "next/link";
import { CheckLinks, preClass } from "@/components/articles/guide-links";

const aiFeatures =
  "https://developers.google.com/search/docs/appearance/ai-features";
const aiGuide =
  "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";
const searchControl =
  "https://support.google.com/webmasters/answer/16908024?hl=en";
const impressions =
  "https://support.google.com/webmasters/answer/7042828";
const genAiReport =
  "https://support.google.com/webmasters/answer/16984139?hl=en";
const googleExtended =
  "https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers";
const llmsTxtGoogle =
  "https://searchengineland.com/google-says-llms-txt-files-wont-harm-or-help-your-search-rankings-480264";

export function GoogleAiModeOptimizationArticle() {
  return (
    <>
      <p>
        Google AI Mode is a Search feature. It is not a second index, and it
        is not the AI Overview block on a classic results page. Search
        Console Help says AI Mode expands on AI Overviews: a more interactive
        response, with links that support the information or send the person
        to a relevant page. It groups the question into subtopics, searches
        those subtopics at the same time, and lets the person go deeper.
        CiteScore does not query Google. The claims below are from Search
        Central and Search Console Help.
      </p>
      <p>
        The shared eligibility rules, and the tactics Google says to skip for
        both features, are already on{" "}
        <Link href="/google-ai-overviews-optimization">
          Google AI Overviews optimization
        </Link>
        . This page is the part that is easy to blur: how a supporting link
        in AI Mode is chosen, counted, and measured when the question keeps
        going. Gemini Apps are a different product, with a different control,
        on{" "}
        <Link href="/how-to-get-cited-by-gemini">how to get cited by Gemini</Link>.
      </p>

      <h2>Same door as an Overview, different room</h2>
      <p>
        Google’s <a href={aiFeatures}>AI features guide</a> says there are no
        additional technical requirements, and no special optimizations, to
        appear in AI Overviews or AI Mode. A page has to be indexed and
        eligible to show a snippet. Meeting that bar does not promise a
        crawl, an index, or a place in the response. Google says that
        directly.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Question</th>
              <th>AI Overviews</th>
              <th>AI Mode</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">What it is for</th>
              <td>
                A short path into a complicated topic, shown when Google’s
                systems decide an overview adds something beyond the classic
                results. Google says they often do not trigger.
              </td>
              <td>
                Questions that need more exploration, reasoning, or a
                comparison. Google’s example of the job is a nuanced question
                that might have taken several searches.
              </td>
            </tr>
            <tr>
              <th scope="row">How the links are picked</th>
              <td colSpan={2}>
                Both may fan out into related searches. They may use different
                models, so the links differ. AI Mode’s counting guide adds
                that the question is split into subtopics and each one is
                searched at the same time.
              </td>
            </tr>
            <tr>
              <th scope="row">Position in Search Console</th>
              <td>
                The overview occupies one position. Every link inside it is
                assigned that same position.
              </td>
              <td>
                Position follows the ordinary results-page method. Carousels
                and image blocks inside AI Mode use the usual rules for those
                elements.
              </td>
            </tr>
            <tr>
              <th scope="row">A follow-up question</th>
              <td>
                Not described as its own query in the counting guide. The
                overview is one block on the results page.
              </td>
              <td>
                A follow-up is a new query. Impressions, position, and clicks
                in the new response are counted under that new query.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The position row is why an average position from a page that only
        appears inside Overviews is not comparable, one for one, with a page
        that appears in AI Mode. Google assigns the whole Overview a single
        slot. AI Mode does not.
      </p>

      <h2>Fan-out is a subtopic search, not a brief for more URLs</h2>
      <p>
        The <a href={aiGuide}>optimization guide</a> defines query fan-out as
        concurrent related queries that fetch more results for the original
        question. Their example starts at “how to fix a lawn that’s full of
        weeds” and fans out to herbicides, non-chemical removal, and
        prevention. In AI Mode that pattern is the product: one broad
        question, several searches, then links.
      </p>
      <p>
        A page can be the supporting link for one subtopic without ranking
        first for the original wording. Google says its systems can match a
        page without an exact phrase match, and that there is no ideal
        length and no special style to rewrite into. The page that answers
        the subtopic in text is the one fan-out can attach.
      </p>
      <p>
        Publishing a new URL for every variation, in order to catch those
        queries, is the move Google says not to make. Doing it to manipulate
        rankings or generative responses violates the scaled content abuse
        policy. Google also says a non-commodity page — a specific account,
        not a generic “7 Tips” list — matters more over time than the other
        suggestions in that guide. AI Mode is described as a place for
        comparisons. The comparison still has to be that kind of page.
      </p>

      <h2>The controls that actually include or exclude you</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Control</th>
              <th>Effect on AI Mode</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Googlebot and snippet eligibility</th>
              <td>
                Required. Robots.txt for Googlebot controls crawling, because
                these features are Search. <code>noindex</code>,{" "}
                <code>nosnippet</code>, <code>data-nosnippet</code>, and{" "}
                <code>max-snippet</code> limit what can be shown. No snippet
                means no supporting link.
              </td>
            </tr>
            <tr>
              <th scope="row">Search generative AI control</th>
              <td>
                Search Console, under Settings. Include is the default, and
                it covers AI Overviews, AI Mode, and generative features in
                Discover. Exclude removes your links and your content from
                grounding those features. Google says it is not a ranking
                signal for the rest of Search, and it does not change
                training. Other sites can still appear.
              </td>
            </tr>
            <tr>
              <th scope="row">Google-Extended</th>
              <td>
                Not this switch. Google says the token does not change Search
                inclusion or ranking. It governs later Gemini training and
                grounding in Gemini Apps and Vertex AI.
              </td>
            </tr>
            <tr>
              <th scope="row">llms.txt, chunking, a special schema type</th>
              <td>
                Not required. llms.txt is optional; Google says it ignores{" "}
                <a href={llmsTxtGoogle}>llms.txt</a>. Google also says the
                file neither helps nor harms Google Search, and that there is
                no special markup and no need to break a page into tiny
                pieces.
                Structured data still has to match the visible text if you
                use it. There is no AI Mode type to add.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Search Console Help says the generative AI control was rolled out to
        all sites as of 31 August 2026. After you switch a site to exclude,
        Google says it generally takes a few days: content is excluded within
        1–2 days, and some URLs take longer because of caching. A URL-prefix
        property can inherit the choice from a parent property. Check the
        property you think you edited.
      </p>
      <p>This group is a Gemini opt-out. It does not add or remove AI Mode.</p>
      <pre className={preClass}>{`User-agent: Google-Extended
Disallow: /`}</pre>
      <p>
        The token’s write-up is{" "}
        <a href={googleExtended}>Google’s common crawlers</a>. The include
        or exclude choice is{" "}
        <a href={searchControl}>Search generative AI features</a>. Markup
        that matches the page, when you use it, is on{" "}
        <Link href="/schema-markup-for-ai-search">
          schema markup for AI search
        </Link>
        .
      </p>

      <h2>What the supporting page should contain</h2>
      <p>
        Google’s fundamentals are the same as for the rest of Search:
        Googlebot can fetch the URL, internal links make it findable, and the
        important sentences are text. Merchant Center and Business Profile
        can supply product and local details. They do not override a Search
        Console exclude. The files Google says to skip are on the{" "}
        <Link href="/google-ai-overviews-optimization">AI Overviews guide</Link>.
      </p>
      <p>
        A follow-up in AI Mode is a new query, so the page that answers the
        second question has to be retrievable on its own. It cannot rely on
        the person having already opened your first URL.
      </p>

      <h2>How Google says to measure AI Mode</h2>
      <p>
        The <a href={aiFeatures}>AI features guide</a> says AI Overviews and
        AI Mode are included in the Performance report, under the Web search
        type, together with the rest of web search. The{" "}
        <a href={impressions}>impressions, position, and clicks</a> page is
        where the counting rules are spelled out: a click is a click on a
        link to an external page, impressions follow the standard rules, and
        a follow-up is a new query. Search Console does not include Search
        Labs experiments.
      </p>
      <p>
        The <a href={genAiReport}>Generative AI performance report</a>{" "}
        includes impressions for AI Overviews and AI Mode in one report. It
        was rolled out to all sites as of 31 August 2026. A missing report
        usually means too few of those impressions, or that the site is
        excluded. The dimensions on the help page are pages, countries,
        dates, devices, and text versus multimodal search. That page does
        not describe a filter that separates AI Mode from AI Overviews. On
        the chart, two links from the same site in one generative feature
        count as one impression; a URL filter counts by URL.
      </p>
      <p>
        Google’s note that clicks from pages with AI Overviews tend toward
        more time on site is written about AI Overviews. The AI features page
        gives no percentage and does not repeat the sentence for AI Mode.
        Google also says no third-party tool has its internal ranking or AI
        metrics.
      </p>
      <CheckLinks>
        The free check reports whether robots.txt allows or blocks
        Google-Extended, along with GPTBot and PerplexityBot. Google-Extended
        is not the AI Mode control in the table above. The check does not
        read the Search Console generative AI setting, and it does not query
        AI Mode. The <Link href="/geo-audit">$39 GEO audit</Link> scores one
        public URL from the HTML we fetch. It does not open AI Mode.
      </CheckLinks>

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={aiFeatures}>AI features and your website</a>. What AI Mode
          is for, fan-out, and snippet eligibility.
        </li>
        <li>
          <a href={aiGuide}>
            Optimizing your website for generative AI features
          </a>
          . Search Console inclusion, and the fan-out pages Google says not
          to publish.
        </li>
        <li>
          <a href={impressions}>Impressions, position, and clicks</a>. AI
          Mode position, and follow-ups counted as new queries.
        </li>
        <li>
          <a href={genAiReport}>Generative AI performance report</a>. One
          impressions report for AI Overviews and AI Mode.
        </li>
        <li>
          <a href={searchControl}>Search generative AI control</a>. Include,
          exclude, and the 1–2 day window.
        </li>
        <li>
          <a href={googleExtended}>Google’s common crawlers</a>.
          Google-Extended is not a Search ranking signal.
        </li>
      </ul>
    </>
  );
}
