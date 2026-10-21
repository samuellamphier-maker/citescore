import Link from "next/link";
import { CheckLinks } from "@/components/articles/guide-links";

const assistant =
  "https://www.perplexity.ai/help-center/comet/en/articles/11734688-assistant-panel";
const privacy =
  "https://www.perplexity.ai/help-center/comet/en/articles/12867415-comet-assistant-privacy-data-use";
const crawlers = "https://docs.perplexity.ai/docs/resources/perplexity-crawlers";
const howItWorks = "https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work";

export const perplexityCometFaqs = [
  {
    q: "Does Comet have its own robots.txt user agent?",
    a: "Not on the pages read for this guide. Perplexity’s crawler documentation, read on 21 October 2026, names PerplexityBot and Perplexity-User. It does not name a Comet token. The Comet assistant panel article and the Comet assistant privacy article do not name one either. PerplexityBot is the token Perplexity says to allow when you want a site in Perplexity search results. A CometBot group would be a token this guide invented, so this page does not publish one.",
  },
  {
    q: "Does Comet’s assistant cite the page a person already has open?",
    a: "The assistant panel article says the assistant pulls the visible text, headlines, and website metadata from the open page each time a person submits a request, and that it can also use a tab the person names with @. That article does not say this extraction is published as a numbered citation to other people. Perplexity’s how-it-works page says Perplexity answers include numbered citations to sources. Those are two descriptions. This guide does not merge them into one rate, and it does not claim the open-tab summary is the same event as a search footnote.",
  },
  {
    q: "Does Perplexity publish a citation rate, a required schema type, or a freshness score for Comet?",
    a: "Not on the assistant panel article, the assistant privacy article, the crawler documentation, or the how-it-works page read for this guide. Those pages do not list a schema type, an llms.txt file, a word count, or a citation rate. JSON-LD that matches the visible page can still help other readers. It is not a switch on these pages. The privacy article’s 30-day figure is a retention window for assistant context, not a ranking interval.",
  },
  {
    q: "Does the free check query Comet?",
    a: "No. The free check reads GPTBot, PerplexityBot, and Google-Extended, plus the homepage, llms.txt, a sitemap, and JSON-LD on the homepage. It does not open Comet, and it does not look for a Comet user agent, because the pages read here do not publish one. A clear PerplexityBot row means that robots group is not a disallow. It is not a Comet citation.",
  },
];

export function HowToGetCitedByPerplexityCometArticle() {
  return (
    <>
      <p>
        Comet is Perplexity’s browser. The assistant sits in a panel beside
        the page a person is already reading. Perplexity’s{" "}
        <a href={assistant}>assistant panel article</a> calls that assistant a
        Perplexity service, and says it can pull the open page, or a tab the
        person names with @. That is a different path from Perplexity search,
        where <a href={crawlers}>Perplexity’s crawler documentation</a> tells
        a publisher to allow PerplexityBot. CiteScore does not open Comet.
        The claims below are from those two pages, the{" "}
        <a href={privacy}>Comet assistant privacy article</a>, and
        Perplexity’s <a href={howItWorks}>how-it-works page</a>, read on 21
        October 2026. None of them publishes a citation rate.
      </p>
      <p>
        The search-crawler page, including the firewall rule and the
        user-triggered fetcher, is{" "}
        <Link href="/how-to-get-cited-by-perplexity">
          how to get cited by Perplexity
        </Link>
        . This page stays on the browser assistant. The same kind of split
        for other products is written up for{" "}
        <Link href="/how-to-get-cited-by-chatgpt">ChatGPT</Link>,{" "}
        <Link href="/how-to-get-cited-by-claude">Claude</Link>,{" "}
        <Link href="/how-to-get-cited-by-gemini">Gemini</Link>,{" "}
        <Link href="/how-to-get-cited-by-copilot">Microsoft Copilot</Link>,{" "}
        <Link href="/how-to-get-cited-by-grok">Grok</Link>,{" "}
        <Link href="/how-to-get-cited-by-meta-ai">Meta AI</Link>,{" "}
        <Link href="/how-to-get-cited-by-deepseek">DeepSeek</Link>,{" "}
        <Link href="/how-to-get-cited-by-mistral">Mistral</Link>,{" "}
        <Link href="/how-to-get-cited-by-brave-search">Brave Search</Link>,{" "}
        <Link href="/how-to-get-cited-by-you-com">You.com</Link>, and{" "}
        <Link href="/how-to-get-cited-by-duckduckgo-ai">DuckDuckGo</Link>. The
        short map is{" "}
        <Link href="/how-to-get-cited-by-ai-answer-engines">
          how to get cited by AI answer engines
        </Link>
        .
      </p>

      <h2>The open page is what the assistant can read</h2>
      <p>
        The assistant panel article says the assistant runs beside the main
        browser window. It describes the assistant as context-aware: it can
        use the tab the person is viewing, or a tab they mention with @. The
        section on context extraction says the assistant pulls in the visible
        text, the headlines, and the website metadata from the open page
        every time the person submits a request. A summary, a question about
        that page, and an action on the site are the uses that article names.
      </p>
      <p>
        “Visible text” and “headlines” are the words that page uses. A
        sentence that exists only inside a script, or only after a control
        the person has not opened, is not text that description covers. Put
        the answer in the HTML the browser shows: what the thing is, who
        provides it, and the fact a question would quote, in the title and
        the first paragraph, and again in a heading when the heading is the
        question. The article also says the assistant pulls website metadata.
        It does not list which tags. A title and a meta description are
        metadata a publisher can see in the page source. This guide does not
        turn “metadata” into a list of headers Perplexity did not publish.
      </p>
      <p>
        The privacy article says Comet Assistant helps a person summarize
        pages, automate tasks, and retrieve information. By default it does
        not upload browsing history, the full list of open tabs, cookies,
        passwords, local files, or text the person typed into a site unless
        they send that text in a request. It sends page content when the
        request needs it, including a summary of the current tab, selected
        text, or a tab named with @tab. The article says only the context
        the request needs is sent. A publisher cannot flip that send on for
        someone else’s browser. The person asks.
      </p>

      <h2>Search citations still use PerplexityBot</h2>
      <p>
        The assistant is a Perplexity service. When the question is a search
        of the web, the crawler page is the control Perplexity publishes.
        PerplexityBot is the user agent that page says surfaces and links
        websites in Perplexity search results. Perplexity recommends allowing
        it in robots.txt and permitting the published IP ranges. The full
        group, the WAF note, and the up-to-24-hour delay are on{" "}
        <Link href="/how-to-get-cited-by-perplexity">
          how to get cited by Perplexity
        </Link>
        . The token table is the{" "}
        <Link href="/ai-crawler-user-agents">AI crawler user-agent reference</Link>.
        How a disallow is written is the{" "}
        <Link href="/robots-txt-for-ai-crawlers">robots.txt guide</Link>.
      </p>
      <p>
        That crawler page also names Perplexity-User. It says this fetcher
        supports a user action: when someone asks Perplexity a question, it
        might visit a page and include a link. It says the fetcher generally
        ignores robots.txt because a person requested the fetch. The Comet
        articles read here do not say the assistant panel is that fetcher,
        and they do not say it is a different one. This guide does not invent
        the missing sentence. A page PerplexityBot is forbidden to crawl is
        a page the crawler documentation does not promise to surface in
        search. An open tab is the other path: the person already loaded it,
        and the assistant panel article describes reading what is visible.
      </p>
      <p>
        Perplexity’s how-it-works page says each answer includes numbered
        citations linking to the original sources. That page is about
        Perplexity’s answers. It is not the assistant panel article, and it
        does not mention Comet. A numbered citation in a Perplexity answer
        and a summary of a tab the person already has open can both happen
        inside a Perplexity product. They are not the same claim, and this
        page does not publish a rate for either one.
      </p>

      <h2>What the Comet articles leave out</h2>
      <p>
        The assistant panel article and the privacy article do not list a
        schema type, an <code>llms.txt</code> file, a word count, or a
        freshness score. The privacy article says assistant context that
        includes page content can be stored for up to 30 days for Library
        and query history, and then deleted. That is retention. It is not a
        statement that a page updated 30 days ago is preferred, and this
        guide does not turn it into one. A visible updated date is still a
        fact a person can check on the page. These articles do not say Comet
        ranks by it.
      </p>
      <p>
        The privacy article also says a person can turn the assistant off, or
        block it on specific websites, under Settings, Privacy and security,
        Comet Assistant. That control belongs to the person using Comet. A
        publisher does not get a switch in robots.txt from that paragraph.
        Blocking the assistant on your own browser does not remove your site
        from Perplexity search. Allowing PerplexityBot does not force
        someone else’s assistant to open your URL.
      </p>

      <h2>What to change on the page</h2>
      <ol>
        <li>
          Keep the URL publicly fetchable if you want it eligible for
          Perplexity search. The crawler page recommends allowing
          PerplexityBot. A login wall is a page the search crawler cannot
          quote from the public HTML. The open-tab path is separate: the
          assistant reads the visible text of a page the person has open.
        </li>
        <li>
          Leave <code>PerplexityBot</code> able to fetch the path when you
          want the site in Perplexity search results. Do not add a Comet
          user-agent group. The pages read here do not name one. The search
          write-up is{" "}
          <Link href="/how-to-get-cited-by-perplexity">
            how to get cited by Perplexity
          </Link>
          .
        </li>
        <li>
          Write the answer in the visible text and in the headlines. The
          assistant panel article says those are what the assistant pulls
          from the open page, along with website metadata. Perplexity does
          not publish a word count, and this page does not invent one.
        </li>
        <li>
          Repeat the visible facts in JSON-LD if you want the labels. A
          recipe page can use the{" "}
          <Link href="/recipe-schema-generator">Recipe schema generator</Link>.
          The field list is the{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link>. The
          Comet articles do not require either script. The markup has to
          match the copy a person can see.
        </li>
        <li>
          Put a visible updated date on the page when the page has one. The
          Comet articles do not publish a freshness score. A date the page
          shows is still the date a reader can check. Do not invent a
          “recently updated” line to chase a recrawl interval these pages do
          not state.
        </li>
        <li>
          Add <Link href="/llms-txt">/llms.txt</Link> only if some other
          reader should have a curated list. The{" "}
          <Link href="/llms-txt-generator">llms.txt generator</Link> and the{" "}
          <Link href="/llms-txt-best-practices">llms.txt best practices</Link>{" "}
          page describe that file. The Comet articles read here do not ask a
          publisher for it.
        </li>
      </ol>

      <CheckLinks>
        The free check reports GPTBot, PerplexityBot, and Google-Extended. It
        does not open Comet, and it does not look for a Comet token. A clear
        PerplexityBot row is not a Comet citation. The{" "}
        <Link href="/geo-audit">$39 GEO audit</Link> scores one public URL
        from the HTML we fetch and returns about ten fixes. It does not open
        Comet or Perplexity.
      </CheckLinks>

      <h2>Questions about Comet citations</h2>
      {perplexityCometFaqs.map((item) => (
        <div key={item.q}>
          <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={assistant}>Assistant Panel</a>, Comet Browser Help Center.
          The assistant is a Perplexity service in a side panel. It can use
          the open tab or a tab named with @, and it pulls visible text,
          headlines, and website metadata on each request. Last modified 14
          September 2026. Read 21 October 2026.
        </li>
        <li>
          <a href={privacy}>Comet Assistant Privacy & Data Use</a>, Comet
          Browser Help Center. What stays on the device, when page content is
          sent, the 30-day retention for that context, and the setting that
          blocks the assistant on a site. Last modified 30 August 2026. Read
          21 October 2026.
        </li>
        <li>
          <a href={crawlers}>Perplexity Crawlers</a>, Perplexity docs.
          PerplexityBot for search results, Perplexity-User for a
          user-triggered fetch, and no Comet user agent. Read 21 October
          2026.
        </li>
        <li>
          <a href={howItWorks}>How does Perplexity work?</a>, Perplexity Help
          Center. Perplexity answers include numbered citations to sources.
          The page does not mention Comet. Last modified 28 August 2026. Read
          21 October 2026.
        </li>
      </ul>
    </>
  );
}
