import Link from "next/link";
import { CheckLinks } from "@/components/articles/guide-links";

const assist = "https://duckduckgo.com/duckduckgo-help-pages/results/ai-assisted-answers";
const assistBot = "https://duckduckgo.com/duckduckgo-help-pages/results/duckassistbot";
const sources = "https://duckduckgo.com/duckduckgo-help-pages/results/sources";
const duckBot = "https://duckduckgo.com/duckduckgo-help-pages/results/duckduckbot";
const safety = "https://duckduckgo.com/duckduckgo-help-pages/r-legal/online-safety";
const duckAi = "https://duckduckgo.com/duckduckgo-help-pages/privacy-pro/duckai";
const duckAiPrivacy = "https://duckduckgo.com/duckduckgo-help-pages/duckai/ai-chat-privacy";

export const duckDuckGoFaqs = [
  {
    q: "What user agent should robots.txt allow for DuckDuckGo’s AI answers?",
    a: "DuckAssistBot. DuckDuckGo’s DuckAssistBot page, read on 20 October 2026, says that crawler fetches pages in real time for AI-assisted answers that cite sources, and that a Disallow for the DuckAssistBot user agent stops the crawl after 72 hours. The same page says opting out does not change organic rankings and does not change whether the site appears in DuckDuckGo search results. DuckDuckBot is a different token. DuckDuckGo’s DuckDuckBot page says that crawler improves search results and respects WWW::RobotRules. A DuckAssistBot block does not write a DuckDuckBot block.",
  },
  {
    q: "Does DuckDuckGo publish a citation rate, a required schema type, or an llms.txt rule?",
    a: "Not on the Search Assist page, the DuckAssistBot page, the sources page, the DuckDuckBot page, or the online safety statement read for this guide. Search Assist says an answer links to one or two sources. Those pages do not list a schema type, an llms.txt file, a word count, or a citation rate. JSON-LD and llms.txt can still be useful to other readers. They are not a switch on these pages.",
  },
  {
    q: "Do DuckDuckGo’s AI answers come from Bing?",
    a: "DuckDuckGo’s sources page and its online safety statement, read on 20 October 2026, say most of the organic links and images in search results come from Bing. The sources page also says DuckDuckGo maintains its own crawler, DuckDuckBot, and many indexes, and that Instant Answers draw on specialized sources. Search Assist says its answers are based on crawling the web. The DuckAssistBot page says that crawler fetches pages in real time for those AI-assisted answers. Those pages do not say Search Assist reads Bing’s index, and they do not say it never does. This guide does not collapse the link list and the AI answer into one source.",
  },
  {
    q: "Does the free check query DuckDuckGo or Duck.ai?",
    a: "No. The free check reads GPTBot, PerplexityBot, and Google-Extended, plus the homepage, llms.txt, a sitemap, and JSON-LD on the homepage. It does not read DuckAssistBot or DuckDuckBot, and it does not log into DuckDuckGo or Duck.ai. A clear row is not a DuckDuckGo citation.",
  },
];

export function HowToGetCitedByDuckDuckGoArticle() {
  return (
    <>
      <p>
        DuckDuckGo can show an AI-assisted answer above the links and point at
        the pages the answer used. The help page calls that feature Search
        Assist. A follow-up from that answer opens Duck.ai, which DuckDuckGo
        describes as a private chat. The crawl named for the AI-assisted
        answers is on the <a href={assistBot}>DuckAssistBot page</a>. The
        index claim for ordinary results is on the{" "}
        <a href={sources}>sources page</a>. None of those pages publishes a
        citation rate, a required schema type, a word count, or an{" "}
        <code>llms.txt</code> rule. CiteScore does not query DuckDuckGo or
        Duck.ai. The claims below are from those pages, and from the{" "}
        <a href={assist}>Search Assist page</a>, the{" "}
        <a href={duckBot}>DuckDuckBot page</a>, the{" "}
        <a href={safety}>online safety statement</a>, and the{" "}
        <a href={duckAi}>Duck.ai page</a>, read on 20 October 2026.
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
        <Link href="/how-to-get-cited-by-deepseek">DeepSeek</Link>,{" "}
        <Link href="/how-to-get-cited-by-mistral">Mistral</Link>,{" "}
        <Link href="/how-to-get-cited-by-brave-search">Brave Search</Link>, and{" "}
        <Link href="/how-to-get-cited-by-you-com">You.com</Link>. The short
        map is{" "}
        <Link href="/how-to-get-cited-by-ai-answer-engines">
          how to get cited by AI answer engines
        </Link>
        .
      </p>

      <h2>Search Assist cites one or two sources</h2>
      <p>
        The Search Assist page says the feature is optional. It scans the web
        for relevant content and uses AI to generate a brief answer from what
        it found. It says responses always link directly to one or two
        sources, so a person can open them. It also says the responses are
        auto-generated from those cited sources, based on crawling the web.
        “Always” on that page is about the answer box: when an answer is
        shown, it links to one or two sources. It is not a rate for how often
        a given site is chosen, and this guide does not turn it into one.
      </p>
      <p>
        A person can set how often Search Assist appears: often, sometimes
        (the default), on demand, or never. That control belongs to the
        person searching. A publisher does not get a switch that forces the
        box on. The page says a “More” control expands the answer, and that
        a follow-up question goes to Duck.ai. Being the page Search Assist
        linked is not the same fact as being the page a later chat repeats.
      </p>
      <p>
        The online safety statement says DuckDuckGo currently offers two AI
        features. Duck.ai provides access to popular chatbots, anonymized by
        DuckDuckGo. AI-assisted answers are sourced from the web and shown
        alongside traditional search results. The same statement says the web
        sources linked in those AI features are primarily selected based on
        their relevance to the query or prompt. Relevance is the criterion
        that page names. It does not publish a score, a domain allowlist, or
        a schema type that raises it.
      </p>

      <h2>DuckAssistBot is the crawl for those answers</h2>
      <p>
        The DuckAssistBot page says DuckAssistBot is a web crawler for
        DuckDuckGo Search that crawls pages in real time for AI-assisted
        answers, which prominently cite their sources. It says that data is
        not used to train AI models. The user agent it publishes is{" "}
        <code>DuckAssistBot/1.2; (+http://duckduckgo.com/duckassistbot.html)</code>
        . The robots.txt token is <code>DuckAssistBot</code>. The wider table,
        including the group DuckDuckGo documents for an opt-out, is the{" "}
        <Link href="/ai-crawler-user-agents">AI crawler user-agent reference</Link>.
        How a disallow is written is the{" "}
        <Link href="/robots-txt-for-ai-crawlers">robots.txt guide</Link>.
      </p>
      <p>
        A publisher who does not want to be a potential source for those
        answers disallows <code>DuckAssistBot</code>. DuckDuckGo says the
        change takes effect after 72 hours, and that the crawler then stops.
        The same page says the opt-out does not change organic rankings and
        does not change whether the site appears in search results. Allowing
        the token is the published way to stay eligible for that crawl. It is
        not a promise the answer will cite the page. This guide does not
        reprint the IP list. DuckDuckGo publishes it on that page and at{" "}
        <code>https://duckduckgo.com/duckassistbot.json</code>.
      </p>
      <p>
        The practical half is the page itself. Search Assist’s description is
        a crawl of web pages and a short answer drawn from them. A sentence
        that exists only in an image, a widget, or a script the server never
        sends is not text those pages describe the crawler as reading.
        DuckDuckGo does not publish whether DuckAssistBot runs JavaScript, and
        it does not publish a word count. Put the sentence that answers the
        question in the title and the first paragraph of the HTML the server
        sends.
      </p>

      <h2>DuckDuckBot is a different crawler</h2>
      <p>
        The DuckDuckBot page says DuckDuckBot is DuckDuckGo’s web crawler, and
        that its job is to improve search results. The user agent it publishes
        is <code>DuckDuckBot/1.1; (+http://duckduckgo.com/duckduckbot.html)</code>
        . It says the crawler respects <code>WWW::RobotRules</code>, a
        robots.txt parser. That is a different sentence from the DuckAssistBot
        opt-out. A <code>Disallow</code> under <code>DuckAssistBot</code> does
        not name <code>DuckDuckBot</code>. The DuckDuckBot page does not print
        a sample group, so this guide does not add one. A crawler that honors
        robots.txt and has no group of its own uses <code>User-agent: *</code>.
        This guide does not upgrade either file into a citation switch.
      </p>
      <p>
        The sources page says DuckDuckGo maintains DuckDuckBot and many
        indexes, and that Instant Answers also come from specialized sources
        and from sites such as Wikipedia. It then says traditional links and
        images are largely sourced from Bing. The online safety statement
        says most of the organic links and images come from Bing, and that
        content Bing removes is excluded from DuckDuckGo’s results as well.
        Ranking in Bing can therefore change the link list DuckDuckGo shows.
        Microsoft’s note on Copilot, which sits on Bing’s crawl, is{" "}
        <Link href="/how-to-get-cited-by-copilot">how to get cited by Microsoft Copilot</Link>.
        Those Bing pages are not DuckDuckGo’s description of Search Assist.
        Search Assist’s own page says the answer is based on crawling the
        web, and DuckAssistBot is the crawler named for that job.
      </p>

      <h2>Duck.ai is the follow-up chat</h2>
      <p>
        The Search Assist page says follow-up questions go to Duck.ai, and
        that Duck.ai supports chat models from OpenAI, Anthropic, and more.
        The Duck.ai page says it is private conversations with third-party
        chat models, anonymized by DuckDuckGo, and that the chats are not
        used to train AI models. The{" "}
        <a href={duckAiPrivacy}>Duck.ai privacy page</a> names the same idea
        and lists providers including OpenAI, Anthropic, Mistral, and Azure.
        Those pages do not name a robots.txt token for the chat, and they do
        not say every chat cites a page.
      </p>
      <p>
        The online safety statement is the page that covers both features
        when it talks about linked sources. It says the web sources linked in
        DuckDuckGo’s AI features are primarily selected by relevance to the
        query or prompt. It does not say Duck.ai uses DuckAssistBot, and it
        does not say a Search Assist citation is replayed in the chat. A
        publisher who wants the AI-assisted answer to be able to fetch the
        page uses the DuckAssistBot rule above. A publisher who wants a chat
        product to quote the page still has to put the answer in text those
        pages can describe as a source. Duck.ai’s help pages do not publish a
        second lever.
      </p>

      <h2>What to change on the page</h2>
      <ol>
        <li>
          Keep the URL publicly fetchable. Search Assist says the answer is
          based on crawling the web. A page that returns the sentence only
          after a login is not a page that description covers.
        </li>
        <li>
          Leave <code>DuckAssistBot</code> able to fetch the path if you want
          the page eligible as a source for AI-assisted answers. A Disallow
          stops that crawl after 72 hours. DuckDuckGo says that opt-out does
          not remove the site from organic results.
        </li>
        <li>
          Treat <code>DuckDuckBot</code> as the search crawler, not as a
          second name for Search Assist. The DuckDuckBot page says it respects
          robots.txt rules. Do not assume a Bing allow, or a Bing disallow, is
          the Search Assist control. Organic links are largely from Bing.
          Search Assist’s pages describe their own crawl.
        </li>
        <li>
          Write the answer in the HTML the server sends. One sentence in the
          title and the first paragraph: what the thing is, who provides it,
          and the fact a question would quote. Search Assist cites one or two
          sources. DuckDuckGo does not publish a word count, and this page
          does not invent one.
        </li>
        <li>
          Name the organization that stands behind the page. These docs do
          not publish an authority score. They do link a source. A page that
          says who is speaking, and links the source of a number, is the
          version of authority a person can check. The homepage can use the{" "}
          <Link href="/organization-schema-generator">
            Organization schema generator
          </Link>
          .
        </li>
        <li>
          Repeat the visible facts in JSON-LD if you want the labels. A job
          page can use the{" "}
          <Link href="/job-posting-schema-generator">Job posting schema generator</Link>.
          A course page can use the{" "}
          <Link href="/course-schema-generator">Course schema generator</Link>.
          The field list is the{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link>. None
          of those scripts is a DuckDuckGo requirement.
        </li>
        <li>
          Add <Link href="/llms-txt">/llms.txt</Link> only if some other
          reader should have a curated list. The{" "}
          <Link href="/llms-txt-generator">llms.txt generator</Link> and the{" "}
          <Link href="/llms-txt-best-practices">llms.txt best practices</Link>{" "}
          page describe that file. The DuckDuckGo pages read here do not ask
          a publisher for it.
        </li>
      </ol>

      <CheckLinks>
        The free check reports GPTBot, PerplexityBot, and Google-Extended. It
        does not look for DuckAssistBot or DuckDuckBot. A clear row on that
        check is not a DuckDuckGo citation. The{" "}
        <Link href="/geo-audit">$39 GEO audit</Link> scores one public URL
        from the HTML we fetch and returns about ten fixes. It does not open
        DuckDuckGo or Duck.ai.
      </CheckLinks>

      <h2>Questions about DuckDuckGo citations</h2>
      {duckDuckGoFaqs.map((item) => (
        <div key={item.q}>
          <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={assist}>About DuckDuckGo Search Assist</a>, DuckDuckGo Help
          Pages. Optional answers, one or two cited sources, a crawl of the
          web, frequency settings, and follow-ups in Duck.ai. Read 20 October
          2026.
        </li>
        <li>
          <a href={assistBot}>DuckAssistBot</a>, DuckDuckGo Help Pages.
          Real-time crawl for AI-assisted answers that cite sources. Not used
          to train models. Robots.txt opt-out after 72 hours, with no change
          to organic rankings or inclusion in search results. Read 20 October
          2026.
        </li>
        <li>
          <a href={duckBot}>DuckDuckBot</a>, DuckDuckGo Help Pages. A separate
          crawler for search results. The page says it respects
          WWW::RobotRules. Read 20 October 2026.
        </li>
        <li>
          <a href={sources}>Where do DuckDuckGo search results come from?</a>,
          DuckDuckGo Help Pages. DuckDuckBot, other indexes, Instant Answers,
          and traditional links and images largely sourced from Bing. Read 20
          October 2026.
        </li>
        <li>
          <a href={safety}>Online Safety Statement</a>, DuckDuckGo Help Pages.
          Two AI features. Linked web sources are primarily selected by
          relevance. Most organic links and images come from Bing. Read 20
          October 2026.
        </li>
        <li>
          <a href={duckAi}>Duck.ai</a> and <a href={duckAiPrivacy}>How does Duck.ai protect my privacy?</a>,
          DuckDuckGo Help Pages. Private chats with third-party models. No
          robots.txt token on those pages. Read 20 October 2026.
        </li>
      </ul>
    </>
  );
}
