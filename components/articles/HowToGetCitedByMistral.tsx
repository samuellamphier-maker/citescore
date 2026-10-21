import Link from "next/link";
import { CheckLinks } from "@/components/articles/guide-links";

const productPage = "https://mistral.ai/products/vibe/";
const webSearch = "https://docs.mistral.ai/vibe/work/web-search-open-url";
const crawlers = "https://docs.mistral.ai/robots";
const userIps = "https://mistral.ai/mistralai-user-ips.json";
const indexIps = "https://mistral.ai/mistralai-index-ips.json";

export const mistralFaqs = [
  {
    q: "Is Le Chat still the name of Mistral’s chat product?",
    a: "Mistral’s product page, read on 20 October 2026, says Le Chat is now Vibe, and that conversations, settings, and plans carry over. The same page describes Vibe for work, formerly Le Chat, as the chat assistant, alongside Vibe for code. The web-search instructions live on the Vibe Work docs. This page does not describe a second, separate Le Chat crawler.",
  },
  {
    q: "Does Mistral publish a citation rate, a required schema type, or an llms.txt rule?",
    a: "Not on the product page, the Vibe Work web-search page, or the crawler page read for this guide. Those pages describe web search, Open URL, and three robots.txt tokens. They do not list a schema type, an llms.txt file, or a word count. JSON-LD and llms.txt can still be useful to other readers. They are not a switch on these pages.",
  },
  {
    q: "Which robots.txt token is for answers, and which is for training?",
    a: "Mistral’s crawler page names three. MistralAI-User is a user-triggered visit in Vibe and may include a link to the source. MistralAI-Index crawls for indexing and feeds Mistral search, which the page says helps answer user questions in Vibe. MistralAI-Training builds datasets for training models. The Training section says that crawler is not used for search indexing or to answer live user queries, and it is the section that says webmasters can disallow the user agent.",
  },
  {
    q: "Does the free check look for Mistral’s tokens?",
    a: "No. The free check reads GPTBot, PerplexityBot, and Google-Extended, plus the homepage, llms.txt, a sitemap, and JSON-LD on the homepage. It does not read MistralAI-User, MistralAI-Index, or MistralAI-Training, and it does not log into Vibe or Le Chat. A clear row is not a Mistral citation.",
  },
];

export function HowToGetCitedByMistralArticle() {
  return (
    <>
      <p>
        Mistral’s chat assistant can search the web and link a source. The
        product page calls that assistant Vibe for work, formerly Le Chat, and
        says Le Chat is now Vibe. The instructions for turning web search on,
        and for what a sourced answer looks like, are on the{" "}
        <a href={webSearch}>Vibe Work web-search page</a>. The crawler tokens
        are on <a href={crawlers}>Mistral’s crawler page</a>. None of those
        pages publishes a citation rate, a required schema type, a word count,
        or an <code>llms.txt</code> rule. CiteScore does not log into Vibe, Le
        Chat, or the Mistral API. The claims below are from those three pages,
        read on 20 October 2026.
      </p>
      <p>
        The same kind of split — a published control, and the files the
        operator does not require — is written up for{" "}
        <Link href="/how-to-get-cited-by-chatgpt">ChatGPT</Link>,{" "}
        <Link href="/how-to-get-cited-by-perplexity">Perplexity</Link>,{" "}
        <Link href="/how-to-get-cited-by-claude">Claude</Link>,{" "}
        <Link href="/how-to-get-cited-by-gemini">Gemini</Link>,{" "}
        <Link href="/how-to-get-cited-by-copilot">Microsoft Copilot</Link>,{" "}
        <Link href="/how-to-get-cited-by-grok">Grok</Link>,{" "}
        <Link href="/how-to-get-cited-by-meta-ai">Meta AI</Link>,{" "}
        <Link href="/how-to-get-cited-by-deepseek">DeepSeek</Link>, and{" "}
        <Link href="/how-to-get-cited-by-brave-search">Brave Search</Link>, and{" "}
        <Link href="/how-to-get-cited-by-you-com">You.com</Link>, and{" "}
        <Link href="/how-to-get-cited-by-duckduckgo-ai">DuckDuckGo</Link>, and{" "}<Link href="/how-to-get-cited-by-perplexity-comet">Perplexity Comet</Link>. The short
        map is{" "}
        <Link href="/how-to-get-cited-by-ai-answer-engines">
          how to get cited by AI answer engines
        </Link>
        .
      </p>

      <h2>A source link appears when someone turns web search on</h2>
      <p>
        The <a href={productPage}>Vibe product page</a> says the free plan can
        search the web. It does not publish a daily cap. The Work docs say web
        search is a tool: click the <code>+</code> icon or type <code>/</code>,
        choose Tools, and enable Web search. A publisher cannot flip that
        switch. When the person asks a question that needs current information,
        Work searches the web and weaves the findings into the response.
      </p>
      <p>
        The same page says a web-sourced response shows three things: a globe
        icon, inline links back to the original sources, and a Sources button
        that lists every reference. That is the documented shape of a mention.
        The page does not say every answer includes one. News queries are a
        narrower set. Work draws those from Agence France-Presse and the
        Associated Press. The page does not say a site outside those two
        agencies is dropped from other queries.
      </p>
      <p>
        Deep Research is a separate skill in Work for a multi-source cited
        report. It is a feature the person chooses. It is not a publisher
        program, and the page does not say how a site is selected for it.
      </p>

      <h2>What the fetch can and cannot read</h2>
      <p>
        Open URL is the other documented fetch. The person pastes a URL, with
        Web search enabled, and Work reads that page. The limitations on that
        page are the closest description Mistral publishes of what a fetch
        keeps:
      </p>
      <ul>
        <li>Open URL fetches the single page at that URL. It does not crawl the site or follow links.</li>
        <li>A page behind a login or a paywall cannot be accessed.</li>
        <li>Some highly interactive sites may not load fully, which can leave the content incomplete.</li>
        <li>Web search can return outdated or incomplete content, depending on what the source page exposes.</li>
      </ul>
      <p>
        A fact that lives only on a page this URL links to, only behind a
        login, or only inside a widget that never becomes text, is a fact
        those limits say can be missed. Mistral does not say whether the
        fetcher runs JavaScript. The note about highly interactive sites is
        the published clue. Put the sentence that answers the question in the
        title and the first paragraph of the HTML the server sends. Mistral
        does not publish a word count, and this page does not invent one.
      </p>

      <h2>Three robots.txt tokens</h2>
      <p>
        The crawler page says Mistral uses specific <code>robots.txt</code>{" "}
        tags so webmasters can manage how sites interact with its AI. It names
        three user agents. It does not include a sample Allow or Disallow
        block. The token strings below are the ones that page publishes.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>What the crawler page says it does</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">MistralAI-User</th>
              <td>
                User actions in Vibe. When someone asks Vibe a question, it may
                visit a web page to help answer and include a link to the
                source. The token governs which sites those requests can be
                made to. It is not an automatic crawl, and it is not used to
                crawl content for generative AI training.
              </td>
            </tr>
            <tr>
              <th scope="row">MistralAI-Index</th>
              <td>
                Automated crawling for indexing only. It indexes content for
                Mistral search, which helps answer user questions in Vibe.
                Content it crawls is not used for generative AI training.
              </td>
            </tr>
            <tr>
              <th scope="row">MistralAI-Training</th>
              <td>
                Crawls web content to help build datasets for training Mistral
                models. Webmasters can disallow this user agent in robots.txt.
                It is not used for search indexing or to answer live user
                queries in Vibe.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The Training section is the only one that says webmasters can disallow
        the user agent. A disallow there is the opt-out that page describes,
        and that section says the crawler is not the one answering live
        queries. The User section says the token governs which sites user
        requests can reach. It does not say, as OpenAI says about
        ChatGPT-User, that robots.txt may not apply. The Index section names
        the indexing crawler and does not repeat the disallow sentence. This
        page does not invent what a Disallow does to <code>MistralAI-Index</code>.
        If you write a group, the token to write is the one in the table, not
        a name from a third-party crawler list.
      </p>
      <p>
        Each token has a full user-agent string on the crawler page. The
        string opens a parenthesis after <code>AppleWebKit/537.36</code> and
        does not close it. A log line can be compared with these. A client can
        still send a string it does not own, so a matching user agent is not
        proof of Mistral.
      </p>
      <ul>
        <li>
          <code>
            Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; MistralAI-User/1.0; +https://docs.mistral.ai/robots
          </code>
        </li>
        <li>
          <code>
            Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; MistralAI-Index/1.0; +https://docs.mistral.ai/robots
          </code>
        </li>
        <li>
          <code>
            Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; MistralAI-Training/1.0; +https://docs.mistral.ai/robots
          </code>
        </li>
      </ul>
      <p>
        The User and Index sections link to published IP lists:{" "}
        <a href={userIps}>mistralai-user-ips.json</a> and{" "}
        <a href={indexIps}>mistralai-index-ips.json</a>. Read on 20 October
        2026, each file is a JSON object with <code>creationTime</code> and a{" "}
        <code>prefixes</code> array of <code>ipv4Prefix</code> values. The user
        file’s <code>creationTime</code> was 2025-02-19 and it listed four
        prefixes. The index file’s <code>creationTime</code> was 2026-04-19 and
        it listed two. The Training section of the crawler page does not link
        an IP list. This page does not paste the prefixes. Use the files
        Mistral hosts if you are matching an address, and treat a later{" "}
        <code>creationTime</code> as the newer list.
      </p>
      <p>
        The wider set of tokens other operators publish, including the
        MistralAI-User row already in that table, is the{" "}
        <Link href="/ai-crawler-user-agents">AI crawler user-agent reference</Link>.
        How a disallow is written for the tokens that page covers is the{" "}
        <Link href="/robots-txt-for-ai-crawlers">robots.txt guide</Link>.
      </p>

      <h2>Files these pages do not ask for</h2>
      <p>
        Nothing on the product page, the web-search page, or the crawler page
        asks for a schema type or an <code>llms.txt</code> file. A non-empty{" "}
        <Link href="/llms-txt">/llms.txt</Link> is a reading list some other
        clients look for. The <Link href="/llms-txt-generator">llms.txt generator</Link>{" "}
        and the{" "}
        <Link href="/llms-txt-best-practices">llms.txt best practices</Link>{" "}
        page describe that file. They are not a Mistral requirement, and a
        missing file is not a penalty these three pages describe.
      </p>
      <p>
        JSON-LD repeats facts a person can already read. It does not make Vibe
        cite the page. A product or an app that already shows reviews can use
        the <Link href="/review-schema-generator">Review schema generator</Link>.
        A service page can use the{" "}
        <Link href="/service-schema-generator">Service schema generator</Link>. A course page uses the <Link href="/course-schema-generator">Course schema generator</Link>. A job page uses the <Link href="/job-posting-schema-generator">Job posting schema generator</Link>. A recipe page uses the <Link href="/recipe-schema-generator">Recipe schema generator</Link>. A forum or support page where people can submit answers uses the <Link href="/qa-page-schema-generator">QAPage schema generator</Link>. A page that names a short passage for text-to-speech uses the <Link href="/speakable-schema-generator">Speakable schema generator</Link>.
        The homepage can use the{" "}
        <Link href="/website-schema-generator">WebSite schema generator</Link>.
        The field list is the{" "}
        <Link href="/schema-markup-for-ai-search">schema guide</Link>. None of
        those scripts is a Mistral switch.
      </p>

      <CheckLinks>
        The free check reports GPTBot, PerplexityBot, and Google-Extended. It
        does not look for MistralAI-User, MistralAI-Index, or
        MistralAI-Training. A clear row on that check is not a Vibe citation.
        The <Link href="/geo-audit">$39 GEO audit</Link> scores one public URL
        from the HTML we fetch and returns about ten fixes. It does not open
        Vibe or Le Chat.
      </CheckLinks>

      <h2>Questions about Mistral citations</h2>
      {mistralFaqs.map((item) => (
        <div key={item.q}>
          <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={productPage}>Mistral Vibe</a>, product page. Le Chat is now
          Vibe. Vibe for work was formerly Le Chat. The free plan includes
          searching the web. Read 20 October 2026.
        </li>
        <li>
          <a href={webSearch}>Search the web</a>, Mistral Docs, Vibe Work. How
          web search is enabled, the globe icon, inline links, and the Sources
          button, Open URL, AFP and AP for news queries, and the fetch
          limitations. Read 20 October 2026.
        </li>
        <li>
          <a href={crawlers}>Mistral crawlers</a>, Mistral Docs. MistralAI-User,
          MistralAI-Index, and MistralAI-Training, the full user-agent strings,
          and the statement that webmasters can disallow the training user
          agent. Read 20 October 2026.
        </li>
        <li>
          <a href={userIps}>MistralAI-User IP list</a> and{" "}
          <a href={indexIps}>MistralAI-Index IP list</a>. JSON files linked from
          the crawler page. creationTime and prefix counts above are from the
          files fetched on 20 October 2026.
        </li>
      </ul>
    </>
  );
}
