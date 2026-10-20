import Link from "next/link";
import { CheckLinks } from "@/components/articles/guide-links";

const webSearch = "https://docs.x.ai/developers/tools/web-search";
const citations = "https://docs.x.ai/developers/tools/citations";
const xSearch = "https://docs.x.ai/developers/tools/x-search";
const grokOverview = "https://docs.x.ai/grok/overview";
const grokFaq = "https://docs.x.ai/grok/faq";
const grokBot = "https://docs.x.ai/grok-bot/overview";
const docsIndex = "https://docs.x.ai/llms.txt";

export function HowToGetCitedByGrokArticle() {
  return (
    <>
      <p>
        xAI documents how Grok cites the web on two API pages:{" "}
        <a href={webSearch}>Web Search</a> and <a href={citations}>Citations</a>.
        Those pages describe a tool that searches and browses, then a list of
        URLs the agent encountered. They do not publish a citation rate, a
        required schema type, a word count, or a robots.txt token. CiteScore
        does not log into Grok, grok.com, or the xAI API. The claims below
        stay inside those pages, the{" "}
        <a href={xSearch}>X Search</a> tool, and the consumer notes at{" "}
        <a href={grokOverview}>Welcome to Grok</a> and the{" "}
        <a href={grokFaq}>Grok FAQ</a>.
      </p>
      <p>
        The docs live at docs.x.ai. The site header there also reads
        SpaceXSI. This page uses xAI for the company and Grok for the
        assistant those docs describe. The same kind of split — a published
        control, and the files the operator does not require — is written up
        for{" "}
        <Link href="/how-to-get-cited-by-chatgpt">ChatGPT</Link>,{" "}
        <Link href="/how-to-get-cited-by-perplexity">Perplexity</Link>,{" "}
        <Link href="/how-to-get-cited-by-claude">Claude</Link>,{" "}
        <Link href="/how-to-get-cited-by-gemini">Gemini</Link>,{" "}
        <Link href="/how-to-get-cited-by-copilot">Microsoft Copilot</Link>,{" "}
        <Link href="/how-to-get-cited-by-meta-ai">Meta AI</Link>, and{" "}
        <Link href="/how-to-get-cited-by-deepseek">DeepSeek</Link>.
        The short map is{" "}
        <Link href="/how-to-get-cited-by-ai-answer-engines">
          how to get cited by AI answer engines
        </Link>
        .
      </p>

      <h2>Two citation layers, and only one is a link in the answer</h2>
      <p>
        When Web Search runs, xAI’s Citations page describes two different
        records. A site can land in the first and never appear in the second.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Record</th>
              <th>What xAI says it contains</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">All citations</th>
              <td>
                The <code>citations</code> field on the response: URLs for
                sources the agent encountered. xAI says this list is returned
                by default. A URL can be on it because the agent opened the
                page and then decided the page was not relevant enough to
                use. Being on the list is not the same as a footnote in the
                answer.
              </td>
            </tr>
            <tr>
              <th scope="row">Inline citations</th>
              <td>
                Markdown links in the answer text, in the form{" "}
                <code>[[N]](url)</code>. xAI says enabling them does not
                guarantee a citation on every answer. The model decides when
                and where to include one. If the same URL is cited again, the
                original number is reused.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Whether those inline links are even requested is a switch on the API
        call, not a switch on your site. xAI says the Responses API includes
        them unless the caller passes <code>no_inline_citations</code>, and
        the Python SDK includes them only when the caller asks. A publisher
        cannot flip that switch. A page that was fetched can still come back
        with no inline link.
      </p>

      <h2>Web Search browses pages. It is not a published crawl token</h2>
      <p>
        The Web Search page says the tool lets Grok search the web in real
        time, browse pages, and extract information for the answer. It does
        not name the user-agent string on that fetch, and it does not say the
        fetch honors robots.txt. Treat that silence as a missing control, not
        as permission to invent one.
      </p>
      <p>
        The filters on the tool are set by whoever calls the API:
      </p>
      <ul>
        <li>
          <code>allowed_domains</code> limits search and browsing to the
          domains in the request, with a maximum of five. It cannot be set in
          the same request as <code>excluded_domains</code>.
        </li>
        <li>
          <code>excluded_domains</code> keeps those domains out of the tool’s
          searches, also with a maximum of five.
        </li>
        <li>
          <code>enable_image_understanding</code> is optional. Turning it on
          lets the agent inspect images it meets while browsing. The basic
          example on the page does not turn it on.
        </li>
        <li>
          <code>enable_image_search</code> is a separate option that searches
          for images and can embed them. xAI says that is not the same as
          reading images on an ordinary page.
        </li>
      </ul>
      <p>
        A site cannot add itself to someone else’s allowed list. If a caller
        passes five other domains, your host is outside that request no
        matter how the page is written. Exclusion works the same way, in the
        other direction: a caller can leave your domain out, and robots.txt
        is not the mechanism xAI documents for that.
      </p>

      <h2>What the docs index does not contain</h2>
      <p>
        OpenAI, Anthropic, Perplexity, and Google each publish a token and
        say what disallowing it does. xAI’s{" "}
        <a href={docsIndex}>documentation index</a> lists Web Search,
        Citations, X Search, the Grok overview, and the consumer FAQ. It does
        not list a crawler policy, a user-agent, or IP ranges. Public crawler
        directories sometimes name strings such as GrokBot. Those strings are
        not in xAI’s index. This page does not treat a directory entry as a
        robots.txt token.
      </p>
      <p>
        A <code>User-agent</code> group only matters for a client that reads
        robots.txt and identifies itself with that token. xAI has not said
        its Web Search fetch does either. Pasting an unpublished name into
        robots.txt does not recreate the control{" "}
        <Link href="/how-to-get-cited-by-chatgpt">OAI-SearchBot</Link> or{" "}
        <Link href="/how-to-get-cited-by-perplexity">PerplexityBot</Link>{" "}
        actually is. The tokens operators have published, and the jobs those
        tokens do, are on the{" "}
        <Link href="/robots-txt-for-ai-crawlers">robots.txt guide</Link>.
      </p>
      <p>
        The <a href={grokOverview}>consumer overview</a> describes Grok on
        grok.com and in the iOS and Android apps: chat, files, voice, image
        and video, and connectors. It does not describe how a public website
        becomes a source in those products. The FAQ does not add a crawler
        token either. Until xAI publishes a separate rule for the apps, the
        API pages are the mechanism on record, and the consumer product is
        undescribed on this point.
      </p>

      <h2>A post on X is a different source</h2>
      <p>
        <a href={xSearch}>X Search</a> is a second tool. It runs keyword
        search, semantic search, user search, and thread fetch on X, then
        answers with citations. Those citations can be posts, not pages on
        your domain. The handle and date limits on that tool are also caller
        parameters. A robots.txt file on your website does not govern which
        posts the tool fetches.
      </p>
      <p>
        A link to your domain and a link to a post are different events.
        xAI does not say that being talked about on X causes your page to be
        browsed, or the reverse.
      </p>

      <h2>Grok Bot is not this citation</h2>
      <p>
        The <a href={grokFaq}>Grok FAQ</a> says Grok Bot is not the same
        product as Grok on grok.com or in the Grok mobile apps.{" "}
        <a href={grokBot}>Grok Bot’s overview</a> describes teammates on a
        cloud computer with a browser. On the question of whether a Bot can
        use any website, xAI says a site can still block automation, expire a
        session, or require a human step, and that the Bot hands those steps
        back rather than working around them. That is a user-triggered
        browser session. It is not the citations list from Web Search, and
        xAI does not document a robots.txt token for it.
      </p>

      <h2>What you can actually change on the page</h2>
      <p>
        The documented fetch reads pages. Put the name of the business, what
        it does, and who it is for in HTML, not only in an image. Image
        understanding on Web Search is a caller option, and the basic example
        leaves it off, so a fact that exists only inside a picture is easy
        for that request to miss. xAI does not say the consumer apps use the
        same default. Text still travels in both cases.
      </p>
      <p>
        Nothing on the Web Search or Citations pages asks for a schema type,
        an <code>llms.txt</code> file, or a word count.{" "}
        <Link href="/schema-markup-for-ai-search">
          Schema that matches the visible page
        </Link>{" "}
        is for parsers that read JSON-LD. It is not a Grok switch xAI has
        published. An inline citation is the model’s decision after a fetch,
        and xAI does not publish how often that decision goes your way. If
        xAI later names a robots.txt token and says what disallowing it does,
        that page becomes the control. Until then, a robots.txt edit is not
        the Grok task.
      </p>

      <CheckLinks>
        The free check reports GPTBot, PerplexityBot, and Google-Extended. It
        does not look for a Grok token, because xAI has not published one for
        it to read. A clear row on that check is not a Grok citation. The{" "}
        <Link href="/geo-audit">$39 GEO audit</Link> scores one public URL
        from the HTML we fetch and returns about ten fixes. It does not call
        the xAI API or open grok.com.
      </CheckLinks>

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={webSearch}>Web Search</a>, xAI docs. Real-time search and
          page browsing, domain filters with a cap of five, and the optional
          image controls.
        </li>
        <li>
          <a href={citations}>Citations</a>, xAI docs. The full URL list
          versus inline <code>[[N]](url)</code> links, and the statement that
          the model decides when to cite.
        </li>
        <li>
          <a href={xSearch}>X Search</a>, xAI docs. Keyword, semantic, user,
          and thread fetch on X, separate from Web Search.
        </li>
        <li>
          <a href={grokOverview}>Welcome to Grok</a> and the{" "}
          <a href={grokFaq}>Grok FAQ</a>. What the consumer product page
          covers, and the note that Grok Bot is a different product.
        </li>
        <li>
          <a href={grokBot}>Grok Bot overview</a>. A cloud browser that can
          be blocked, logged out, or stopped at a human step. Not a citations
          API.
        </li>
        <li>
          <a href={docsIndex}>docs.x.ai/llms.txt</a>. The documentation index
          used to check that no crawler-policy page is listed.
        </li>
      </ul>
    </>
  );
}
