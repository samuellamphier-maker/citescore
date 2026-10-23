import Link from "next/link";
import { CheckLinks } from "@/components/articles/guide-links";

const searchProduct = "https://brave.com/search/";
const answerPost = "https://brave.com/blog/answer-with-ai/";
const askPost = "https://brave.com/blog/ask-brave/";
const aiHelp = "https://search.brave.com/help/ai";
const crawlerHelp = "https://search.brave.com/help/brave-search-crawler";
const independence = "https://search.brave.com/help/independence";
const fallback = "https://search.brave.com/help/google-fallback";
const submitUrl = "https://search.brave.com/submit-url";
const apiPage = "https://brave.com/search/api/";
const wdp =
  "https://support.brave.app/hc/en-us/articles/4409406835469-What-is-the-Web-Discovery-Project-";

export const braveFaqs = [
  {
    q: "Does Brave Search use Google or Bing for its AI answers?",
    a: "Brave’s search product page, read on 20 October 2026, says results come from its own built-from-scratch index. The Answer with AI post, published 17 April 2024 and updated 23 August 2024, says the answers come from that independent index and cite sources. A separate help page describes an optional Google fallback mixer in the Brave browser: if a person turns it on, the browser can check Google when Brave may not return enough results. That option is not a ranking requirement for publishers. The Brave Search API page says the API does not fall back to Google or Bing. Those are three statements. This page does not collapse them into one.",
  },
  {
    q: "What user agent should robots.txt allow for Brave?",
    a: "Brave’s crawler page, read on 20 October 2026, says the crawler does not advertise a differentiated user agent, and that if a page is not crawlable by Googlebot, Brave’s bot will not crawl it either. This guide does not add a token such as BraveBot. The condition that page states is that Googlebot is allowed to crawl the URL. A third-party list that names a Brave token is not the crawler page.",
  },
  {
    q: "Does Brave publish a citation rate, a required schema type, or an llms.txt rule?",
    a: "Not on the search product page, the AI help page, the Answer with AI post, or the crawler page read for this guide. Those pages describe the index, AI Answers, Ask Brave, featured snippets, and the crawler. They do not list a schema type, an llms.txt file, or a word count. JSON-LD and llms.txt can still be useful to other readers. They are not a switch on these pages.",
  },
  {
    q: "Does the free check query Brave Search?",
    a: "No. The free check reads GPTBot, PerplexityBot, and Google-Extended, plus the homepage, llms.txt, a sitemap, and JSON-LD on the homepage. It does not log into Brave Search, and it does not look for a Brave user-agent token, because the crawler page does not publish one. A clear row is not a Brave citation.",
  },
];

export function HowToGetCitedByBraveSearchArticle() {
  return (
    <>
      <p>
        Brave Search can answer a question in the results and point at the
        pages the answer used. The help page calls the short form AI Answers.
        The announcement from 17 April 2024, updated 23 August 2024, calls the
        same idea Answer with AI. A longer follow-up is Ask Brave. The index
        claim is on the <a href={searchProduct}>Brave Search product page</a>.
        The crawler rule is on the{" "}
        <a href={crawlerHelp}>Brave Search crawler page</a>. None of those
        pages publishes a citation rate, a required schema type, a word count,
        or an <code>llms.txt</code> rule. CiteScore does not query Brave
        Search. The claims below are from those pages, read on 20 October
        2026.
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
        <Link href="/how-to-get-cited-by-mistral">Mistral</Link>, and{" "}
        <Link href="/how-to-get-cited-by-you-com">You.com</Link>, and{" "}
        <Link href="/how-to-get-cited-by-duckduckgo-ai">DuckDuckGo</Link>, and{" "}<Link href="/how-to-get-cited-by-perplexity-comet">Perplexity Comet</Link>. The short
        map is{" "}
        <Link href="/how-to-get-cited-by-ai-answer-engines">
          how to get cited by AI answer engines
        </Link>
        .
      </p>

      <h2>The answer is drawn from Brave’s own index</h2>
      <p>
        The product page says Brave delivers results from its own,
        built-from-scratch index, and that the results page includes
        AI-powered answers. The FAQ on that page says Brave Search operates
        from a fully independent search index: the list of pages the engine
        draws from, kept by Brave, not rented from another engine. The{" "}
        <a href={independence}>independence help page</a> says Brave Search is
        fully independent. Ranking on Google is not the same fact as being in
        that index.
      </p>
      <p>
        The <a href={answerPost}>Answer with AI post</a> says the answers come
        from that independent index, with sources cited, next to the ordinary
        results. It says the feature is on the web at search.brave.com, on
        desktop and mobile, and that it supports languages besides English.
        The same post gives counts — almost 10 billion queries a year, 27
        million queries a day, an index of 20 billion pages — as of that
        announcement. This page does not treat those counts as a current
        total.
      </p>
      <p>
        Two later pages narrow the “never Google” reading. The{" "}
        <a href={fallback}>Google fallback mixing</a> help page says Brave
        Search is still refining its index, and that a person can let the
        Brave browser anonymously check Google when a query may not have
        enough Brave results. The sets are mixed in the browser. That is an
        option the person turns on. It is not a file a publisher submits, and
        the page does not say a site must rank on Google to be eligible. The{" "}
        <a href={apiPage}>Brave Search API</a> page answers a different
        question: it says every API result comes from Brave’s own index, and
        that there is no fallback to another search engine for any API query.
        A citation in the consumer results page and a hit from the API are
        not the same surface.
      </p>

      <h2>What a cited answer looks like</h2>
      <p>
        The <a href={aiHelp}>AI in Brave Search</a> help page, read on 20
        October 2026, lists four user-facing features. It does not publish a
        selection rule or a citation rate.
      </p>
      <ul>
        <li>
          AI Answers: a concise summary, plus references to sources for the
          key claims. The page says provenance matters, and that Brave always
          shows where the information comes from. Parts of the feature use
          open-source models. The “read the announcement” link on that bullet
          is the Answer with AI post.
        </li>
        <li>
          Ask Brave: a longer answer, follow-up chat, and a Deep Research
          mode. The same bullet says it can add videos, news, products,
          businesses, and shopping. The announcement it links is{" "}
          <a href={askPost}>Ask Brave</a>. The help page does not say how a
          site is chosen for Deep Research.
        </li>
        <li>
          Featured snippets: for some questions, one source answers directly.
          Brave says it analyzes that page and extracts the most relevant
          snippet of text.
        </li>
        <li>
          AI-powered descriptions: where possible, a question-answering model
          writes the result description. That is a description of a result,
          not a promise that the result is quoted inside the summary.
        </li>
      </ul>
      <p>
        A page can be in the index and still not be the source of a summary.
        The help page does not say every question gets AI Answers. The
        practical reading of the featured-snippet bullet is the one this
        guide will use: the sentence that answers the question has to be text
        on the page, because that feature extracts text. Brave does not say
        whether the crawler runs JavaScript. Put the sentence in the title
        and the first paragraph of the HTML the server sends. A price, a
        place, or a named provider that exists only in an image, a widget, or
        a script the server never sends is a fact those pages do not promise
        to read.
      </p>

      <h2>The crawler does not publish its own user agent</h2>
      <p>
        The crawler page says Brave has a crawler to discover pages and index
        their content. It then says the crawler does not advertise a
        differentiated user agent, because sites that allow only Google would
        otherwise refuse it. The next sentence is the control: if a domain or
        a page is not crawlable by Googlebot, Brave’s bot will not crawl it
        either.
      </p>
      <p>
        This guide does not print a Brave user-agent string, because that
        page does not publish one. It also does not say the crawler sends the
        string <code>Googlebot</code>. The published rule is about crawl
        permission. A <code>robots.txt</code> group that disallows Googlebot,
        or a <code>User-agent: *</code> group that disallows the path, is a
        block Brave says it will honor. Allowing Googlebot to fetch the URL
        is the condition that page states. The wider token list, for
        operators that do publish a name, is the{" "}
        <Link href="/ai-crawler-user-agents">AI crawler user-agent reference</Link>.
        How a disallow is written for those tokens is the{" "}
        <Link href="/robots-txt-for-ai-crawlers">robots.txt guide</Link>.
      </p>
      <p>
        The same page says <code>robots.txt</code> is not how you stop a page
        from being indexed. The delist control it names is the robots{" "}
        <code>noindex</code> directive. After you add it, Brave has to
        re-fetch the page before the delist applies. The form that page links
        for a re-fetch, and again for a URL that no longer exists, is{" "}
        <a href={submitUrl}>search.brave.com/submit-url</a>. A page that is
        gone can also be reported to not-found@brave.com. Personal-data
        removal is a different process, the Right to be Forgotten, linked
        from the same page. For a page you want cited, the inverse is the
        useful half: do not <code>noindex</code> it, and do not block the
        crawl that has to see the change.
      </p>
      <p>
        The crawler page also says the crawl is partly powered by people who
        opt in to the Web Discovery Project in Brave’s search settings. That
        option is off by default. The page says the project is built so Brave
        does not learn who contributed which page, and it links the{" "}
        <a href={wdp}>Web Discovery Project</a> explanation. This is not a
        publisher program, and it is not a user agent you can allow.
      </p>

      <h2>What to change on the page</h2>
      <ol>
        <li>
          Let Googlebot crawl the URL. In <code>robots.txt</code>, confirm
          that neither a Googlebot group nor <code>User-agent: *</code>{" "}
          disallows the path. Brave’s crawler page says a page Googlebot
          cannot crawl is a page Brave will not crawl.
        </li>
        <li>
          Leave <code>noindex</code> off that URL. The crawler page names
          noindex as the way to leave the index, and it says robots.txt does
          not do that job.
        </li>
        <li>
          Write the answer in the HTML the server sends. One sentence in the
          title and the first paragraph: what the service is, who provides
          it, where it is offered, and the price if you publish one. Featured
          snippets extract text. Brave does not publish a word count, and
          this page does not invent one.
        </li>
        <li>
          After the page changes, ask for a re-fetch at the form the crawler
          page links. A change Brave has not fetched again is a change the
          delist note says has not been applied. The same wait applies to a
          page you want added or updated.
        </li>
        <li>
          Repeat the visible facts in JSON-LD if you want the labels. A
          service page can use the{" "}
          <Link href="/service-schema-generator">Service schema generator</Link>. A course page uses the <Link href="/course-schema-generator">Course schema generator</Link>. A job page uses the <Link href="/job-posting-schema-generator">Job posting schema generator</Link>. A recipe page uses the <Link href="/recipe-schema-generator">Recipe schema generator</Link>. A forum or support page where people can submit answers uses the <Link href="/qa-page-schema-generator">QAPage schema generator</Link>. A page that names a short passage for text-to-speech uses the <Link href="/speakable-schema-generator">Speakable schema generator</Link>. An image with a visible credit, caption, or license uses the <Link href="/image-object-schema-generator">ImageObject schema generator</Link>. A book page uses the <Link href="/book-schema-generator">Book schema generator</Link>. A show page or an episode page uses the <Link href="/podcast-schema-generator">Podcast schema generator</Link>. A film page uses the <Link href="/movie-schema-generator">Movie schema generator</Link>. A dataset page uses the <Link href="/dataset-schema-generator">Dataset schema generator</Link>. A vehicle page uses the <Link href="/vehicle-schema-generator">Vehicle schema generator</Link>. A hotel page uses the <Link href="/hotel-schema-generator">Hotel schema generator</Link>. A restaurant page uses the <Link href="/restaurant-schema-generator">Restaurant schema generator</Link>. A clinic page uses the <Link href="/medical-clinic-schema-generator">Medical clinic schema generator</Link>. A law office page uses the <Link href="/attorney-schema-generator">Attorney schema generator</Link>.
          The firm on the homepage can use the{" "}
          <Link href="/organization-schema-generator">
            Organization schema generator
          </Link>{" "}
          and the{" "}
          <Link href="/website-schema-generator">WebSite schema generator</Link>.
          The field list is the{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link>. None
          of those scripts is a Brave requirement.
        </li>
        <li>
          Add <Link href="/llms-txt">/llms.txt</Link> only if some other
          reader should have a curated list. The{" "}
          <Link href="/llms-txt-generator">llms.txt generator</Link> and the{" "}
          <Link href="/llms-txt-best-practices">llms.txt best practices</Link>{" "}
          page describe that file. The Brave pages read here do not ask for
          it.
        </li>
      </ol>

      <CheckLinks>
        The free check reports GPTBot, PerplexityBot, and Google-Extended. It
        does not look for a Brave token, and the crawler page does not
        publish one to look for. A clear row on that check is not an AI
        Answer citation. The <Link href="/geo-audit">$39 GEO audit</Link>{" "}
        scores one public URL from the HTML we fetch and returns about ten
        fixes. It does not open Brave Search.
      </CheckLinks>

      <h2>Questions about Brave Search citations</h2>
      {braveFaqs.map((item) => (
        <div key={item.q}>
          <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={searchProduct}>What is Brave Search?</a>, Brave. Results
          from a built-from-scratch index, AI-powered answers, and the FAQ
          statement that the index is fully independent. Read 20 October 2026.
        </li>
        <li>
          <a href={aiHelp}>AI in Brave Search</a>, Brave Search Help. AI
          Answers with source references, Ask Brave, featured snippets that
          extract text, and AI-powered descriptions. Read 20 October 2026.
        </li>
        <li>
          <a href={answerPost}>Answer with AI</a>, Brave blog. Published 17
          April 2024, updated 23 August 2024. Answers with sources from the
          independent index, available at search.brave.com. Query and index
          counts on this page are quoted from that post, not updated.
        </li>
        <li>
          <a href={askPost}>Ask Brave</a>, the announcement linked from the AI
          help page’s Ask Brave bullet. This guide uses the help page for what
          Ask Brave does, and does not add claims from the post.
        </li>
        <li>
          <a href={crawlerHelp}>Brave Search crawler</a>, Brave Search Help.
          No differentiated user agent. A page Googlebot cannot crawl is a
          page Brave will not crawl. noindex is the delist control, and a
          re-fetch is required before it applies. Read 20 October 2026.
        </li>
        <li>
          <a href={independence}>Search results independence</a> and{" "}
          <a href={fallback}>Google fallback mixing</a>, Brave Search Help.
          The first says Brave Search is fully independent. The second
          describes the optional browser mixer. Read 20 October 2026.
        </li>
        <li>
          <a href={apiPage}>Brave Search API</a>. The FAQ says API results
          come from Brave’s own index, with no fallback to Google or Bing.
          Read 20 October 2026.
        </li>
        <li>
          <a href={wdp}>What is the Web Discovery Project?</a>, linked from
          the crawler page as the opt-in contribution the crawl partly uses.
        </li>
      </ul>
    </>
  );
}
