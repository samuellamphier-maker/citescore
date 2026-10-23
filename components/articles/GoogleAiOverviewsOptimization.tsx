import Link from "next/link";
import { GuideOffers } from "@/components/articles/GuideOffers";

const preClass =
  "overflow-x-auto rounded-xl border border-rule bg-cream p-4 font-mono text-[13px] leading-6 text-ink";

const aiFeatures =
  "https://developers.google.com/search/docs/appearance/ai-features";
const aiGuide =
  "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";
const googleExtended =
  "https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers";
const searchControl =
  "https://support.google.com/webmasters/answer/16908024?hl=en";
const llmsTxtGoogle =
  "https://searchengineland.com/google-says-llms-txt-files-wont-harm-or-help-your-search-rankings-480264";

export function GoogleAiOverviewsOptimizationArticle() {
  return (
    <>
      <p>
        Google Search Central’s position is that AI Overviews and AI Mode
        are Search. The optimization guide says generative AI features on
        Google Search use the core ranking and quality systems, and that
        optimizing for them is still SEO. There is no separate AEO switch to
        flip, and Google says indexing is not guaranteed even when a page
        meets the requirements. CiteScore does not query Google. The product
        page for what our report infers is{" "}
        <Link href="/ai-overviews">AI Overviews visibility</Link>.
      </p>
      <p>
        The two documents to read are{" "}
        <a href={aiFeatures}>AI features and your website</a> and{" "}
        <a href={aiGuide}>
          optimizing your website for generative AI features on Google Search
        </a>
        . What is specific to AI Mode — subtopics searched at the same time,
        follow-up questions counted as new queries, and position — is on{" "}
        <Link href="/google-ai-mode-optimization">
          Google AI Mode optimization
        </Link>
        . ChatGPT and Perplexity publish different controls, covered on{" "}
        <Link href="/how-to-get-cited-by-chatgpt">
          how to get cited by ChatGPT
        </Link>{" "}
        and{" "}
        <Link href="/how-to-get-cited-by-perplexity">
          how to get cited by Perplexity
        </Link>
        .
      </p>

      <h2>What has to be true before an Overview can link you</h2>
      <p>
        Google’s AI features guide says a page must be indexed, and eligible
        to be shown in Google Search with a snippet, to be eligible as a
        supporting link in AI Overviews or AI Mode. There are no additional
        technical requirements. The optimization guide adds one site-level
        condition: the site must be included in Search generative AI
        features in Search Console.
      </p>
      <p>
        AI Overviews and AI Mode can use different models, so the links
        differ. Google says both may use query fan-out: the model issues
        related searches across subtopics, then attaches links. Their
        example starts from “how to fix a lawn that’s full of weeds” and
        fans out to herbicides, non-chemical removal, and prevention. AI
        Overviews are shown when Google’s systems decide an overview adds
        something beyond the classic results, and Google says they often do
        not trigger.
      </p>
      <p>
        Meeting the technical requirements does not promise a crawl, an
        index, or a place in the response. Google says that directly.
      </p>

      <h2>Four controls, four jobs</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Control</th>
              <th>What Google says it governs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Googlebot and robots.txt</th>
              <td>
                Crawling for Search. The AI features guide says robots.txt
                for Googlebot is how a site manages access for Search,
                because AI features are part of Search.
              </td>
            </tr>
            <tr>
              <th scope="row">Snippet and index tags</th>
              <td>
                <code>nosnippet</code>, <code>data-nosnippet</code>,{" "}
                <code>max-snippet</code>, and <code>noindex</code> limit what
                Search can show. A page that cannot show a snippet is not
                eligible as a supporting link.
              </td>
            </tr>
            <tr>
              <th scope="row">Search generative AI control</th>
              <td>
                Search Console, under Settings. Include is the default, and
                it lets links and content appear in AI Overviews, AI Mode,
                and generative AI features in Discover. Exclude keeps the
                site’s links and content out of those features. Google says
                this is not a ranking signal for the rest of Search, and it
                does not change AI training.
              </td>
            </tr>
            <tr>
              <th scope="row">Google-Extended</th>
              <td>
                A robots.txt token for whether crawled content may train
                later Gemini models and ground Gemini Apps and Vertex AI.
                Google says it does not change inclusion or ranking in
                Google Search, and it has no separate HTTP user-agent.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Search Console Help says the generative AI control was rolled out to
        all sites as of 31 August 2026. After you switch a site to exclude,
        Google says it generally takes a few days, with content excluded
        within 1–2 days and some URLs taking longer because of caching. To
        limit training of the models used in those Search features, the same
        help page points at Google-Extended, not at the Search control.
      </p>
      <p>
        This group is a Gemini training and grounding opt-out. It is the
        wrong group if the goal is to leave AI Overviews.
      </p>
      <pre className={preClass}>{`User-agent: Google-Extended
Disallow: /`}</pre>
      <p>
        The token’s write-up is{" "}
        <a href={googleExtended}>Google’s common crawlers</a>. The Search
        Console control is{" "}
        <a href={searchControl}>Search generative AI control</a>. How the
        CiteScore audit records the token, which is a different question
        from Google’s inclusion rule, is on the{" "}
        <Link href="/robots-txt-for-ai-crawlers">robots.txt guide</Link>.
      </p>

      <h2>What Google says is worth doing</h2>
      <p>
        The AI features guide lists the same fundamentals as the rest of
        Search. Crawling allowed in robots.txt and at the CDN. Internal
        links so pages can be found. A good page experience. Important
        content available as text. Images and video when they actually
        support that text. Structured data that matches the visible text.
        Merchant Center and Business Profile kept up to date when you use
        them.
      </p>
      <p>
        The optimization guide is more specific about the writing. Google
        says content people find unique, compelling, and useful is likely
        to matter more over time than the other suggestions in that guide:
        a first-hand review rather than a summary of pages that already
        exist, organized with headings a person can follow. Their commodity
        example is “7 Tips for First-Time Homebuyers.” Their non-commodity
        example is “Why We Waived the Inspection &amp; Saved Money: A Look
        Inside the Sewer Line.” If a generative model helped draft the
        page, Google says the result still has to meet Search Essentials
        and the spam policies.
      </p>
      <p>
        Fan-out is not a brief to publish one URL per variation. Google says
        that doing so to manipulate rankings or AI responses violates the
        scaled content abuse policy, and that the systems can match a page
        to a query without an exact phrase match. There is no ideal length,
        and Google says you do not need to rewrite the page in a special
        style for AI systems.
      </p>

      <h2>What Google says to skip</h2>
      <ul>
        <li>
          <strong>Special files.</strong> Google says you do not need a new
          machine-readable file, AI text file, markup, or Markdown file to
          appear in Google Search, including its generative features. An{" "}
          <code>llms.txt</code> file neither helps nor harms visibility or
          rankings in Google Search, because Google Search ignores it. It is
          optional; Google says it ignores{" "}
          <a href={llmsTxtGoogle}>llms.txt</a>. Keeping one for some other
          system is fine.
        </li>
        <li>
          <strong>Special schema.</strong> Structured data is not required
          for these features, and there is no schema.org type to add for
          them. Google still says structured data is worth using for rich
          results, and that any markup should match the text on the page.
        </li>
        <li>
          <strong>Chunking.</strong> Google says there is no requirement to
          break a page into tiny pieces for a model. The systems can use
          part of a longer page.
        </li>
        <li>
          <strong>Inauthentic mentions.</strong> Generative features can
          reflect what other pages say about a product. Google says chasing
          inauthentic mentions is not the way those systems work, because
          they depend on the same quality and spam systems as Search.
        </li>
      </ul>
      <p>
        JavaScript is allowed. Google says it can process content in
        JavaScript when the scripts are not blocked, and that JavaScript
        sites are more work to keep eligible. Semantic HTML does not have
        to be perfect. Google says the web is not valid HTML and that
        semantic markup mainly helps people, including people using screen
        readers.
      </p>

      <h2>How Google says to measure it</h2>
      <p>
        AI Overviews and AI Mode are included in the Search Console
        Performance report, under the Web search type. There is also a
        Generative AI performance report for generative AI features on
        Search and Discover. Google says clicks from results pages that
        include AI Overviews are higher quality, in the sense that people
        are more likely to spend more time on the site. The page does not
        give a percentage. Google also says no third-party tool has its
        internal ranking or AI metrics.
      </p>
      <p>
        A SaaS reading of the same rules is the{" "}
        <Link href="/ai-search-readiness-checklist-for-saas">
          AI search readiness checklist for SaaS
        </Link>
        . How GEO differs from a rank report is{" "}
        <Link href="/geo-vs-seo">GEO vs SEO</Link>.
      </p>

      <GuideOffers
        freeCheck={
          <>
            Run the <Link href="/free-check">free check</Link> first. It
            reports whether robots.txt allows or blocks Google-Extended,
            along with GPTBot and PerplexityBot. Google-Extended is the
            Gemini token in the table above. The free check does not read
            the Search Console generative AI control, and it does not query
            AI Overviews. A passing row means that token is not disallowed.
          </>
        }
      />

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={aiFeatures}>AI features and your website</a>, Google
          Search Central. Eligibility, snippet controls, the SEO
          fundamentals list, and where AI features show up in Search
          Console Performance.
        </li>
        <li>
          <a href={aiGuide}>
            Optimizing your website for generative AI features on Google
            Search
          </a>
          , Google Search Central. The Search Console inclusion requirement,
          non-commodity content, and the list of tactics Google says to
          ignore, including <code>llms.txt</code>.
        </li>
        <li>
          <a href={googleExtended}>Google’s common crawlers</a>. What
          Google-Extended controls, and that it is not a Search inclusion or
          ranking signal.
        </li>
        <li>
          <a href={searchControl}>Search generative AI control</a>, Search
          Console Help. The include and exclude choices, the 31 August 2026
          rollout, and the 1–2 day exclusion window.
        </li>
      </ul>
    </>
  );
}
