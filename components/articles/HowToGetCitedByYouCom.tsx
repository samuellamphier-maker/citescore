import Link from "next/link";
import { CheckLinks } from "@/components/articles/guide-links";

const productPage = "https://you.com/product/web-search-api";
const answerDocs = "https://you.com/docs/guides/answer";
const searchDocs = "https://you.com/docs/guides/search";

export const youComFaqs = [
  {
    q: "What user agent should robots.txt allow for You.com?",
    a: "You.com’s Web Search API page and its Answer API guide, read on 20 October 2026, do not name a robots.txt user-agent. This guide does not add a token from a third-party list. Those pages also do not say whether the crawler honors robots.txt. A User-agent: * group that disallows the path is a request to crawlers that follow that group. It is not a promise those pages publish.",
  },
  {
    q: "Does You.com publish a citation rate, a required schema type, or an llms.txt rule?",
    a: "Not on the Web Search API page, the Answer API guide, or the Web Search API guide read for this page. Those pages describe an index, cited answers, excerpts, and a freshness filter. They do not list a schema type, an llms.txt file, a word count, or a citation rate. JSON-LD and llms.txt can still be useful to other readers. They are not a switch on these pages.",
  },
  {
    q: "Can a publisher add their own domain to include_domains?",
    a: "No. include_domains, exclude_domains, and boost_domains are filters on a request to You.com’s API. The person or product making that request sets them. A publisher does not get a control panel for someone else’s query. Being eligible to be fetched is not the same as being on an allowlist a caller chose.",
  },
  {
    q: "Does the free check query You.com?",
    a: "No. The free check reads GPTBot, PerplexityBot, and Google-Extended, plus the homepage, llms.txt, a sitemap, and JSON-LD on the homepage. It does not look for a You.com user-agent, because the pages read here do not publish one, and it does not log into You.com. A clear row is not a You.com citation.",
  },
];

export function HowToGetCitedByYouComArticle() {
  return (
    <>
      <p>
        You.com can return an answer that points at the pages the answer used.
        The public description of that citation is the{" "}
        <a href={answerDocs}>Answer API guide</a>: a Markdown answer, a source
        URL, and verbatim excerpts from that source. The index behind the
        retrieval is described on the{" "}
        <a href={productPage}>Web Search API page</a>. None of those pages
        publishes a citation rate, a required schema type, a word count, an{" "}
        <code>llms.txt</code> rule, or a robots.txt user-agent. CiteScore does
        not query You.com. The claims below are from those pages, and from the{" "}
        <a href={searchDocs}>Web Search API guide</a>, read on 20 October
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
        <Link href="/how-to-get-cited-by-deepseek">DeepSeek</Link>,{" "}
        <Link href="/how-to-get-cited-by-mistral">Mistral</Link>, and{" "}
        <Link href="/how-to-get-cited-by-brave-search">Brave Search</Link>, and{" "}
        <Link href="/how-to-get-cited-by-duckduckgo-ai">DuckDuckGo</Link>, and{" "}<Link href="/how-to-get-cited-by-perplexity-comet">Perplexity Comet</Link>. The
        short map is{" "}
        <Link href="/how-to-get-cited-by-ai-answer-engines">
          how to get cited by AI answer engines
        </Link>
        .
      </p>

      <h2>The index is You.com’s</h2>
      <p>
        The Web Search API page says You.com operates its own web crawler, web
        index, and news index, and that results are not resold from Google,
        Bing, or another search engine. The same page says the index is
        continuously recrawled. This guide does not turn that sentence into a
        number of days, and it does not repeat the benchmark scores on that
        page. Those scores measure the API. They are not a publisher citation
        rate.
      </p>
      <p>
        A result, on that page, includes a URL, a title, a description,
        snippets, and a publication age. When the caller asks for content
        extraction, the result can also include query-relevant highlights or
        the full page as Markdown or HTML. The Answer API guide says it runs
        on the same retrieval and extraction infrastructure. A page that is
        not in that index is not a page those answers can quote. Ranking on
        another engine is not the same fact as being in this index.
      </p>

      <h2>A citation is a URL plus the words on the page</h2>
      <p>
        The Answer API guide says a response includes three things.{" "}
        <code>answer</code> is Markdown with numbered inline citations.{" "}
        <code>citations</code> lists each source in citation order. Each item
        has a <code>source</code> URL and <code>excerpts</code>, which the
        guide calls the verbatim passages used to construct the answer. The
        guide says the API checks that every citation exists in the source
        text and supports the answer. <code>results.web</code> lists the web
        results considered, including ones that were not cited.
      </p>
      <p>
        Verbatim means the sentence has to be text. A price, a provider, or a
        date that exists only in an image, a widget, or a script the server
        never sends is not an excerpt those pages describe. You.com does not
        publish whether the crawler runs JavaScript, and it does not publish
        a word count. Put the sentence that answers the question in the title
        and the first paragraph of the HTML the server sends. The Web Search
        API guide describes snippets as the default text and highlights as
        the passages that address the query. Both are drawn from the page.
      </p>
      <p>
        The guide does not say every query returns a citation.{" "}
        <code>include_domains</code> can restrict a single API request to an
        allowlist, <code>exclude_domains</code> can drop a domain, and{" "}
        <code>boost_domains</code> can prefer one. Those are choices the
        caller makes. A publisher cannot set them on someone else’s request.
        Being crawlable is the part the publisher controls. Being the domain
        a product chose to boost is not.
      </p>

      <h2>No crawler token is published</h2>
      <p>
        The product page names a crawler. It does not name the user-agent
        string that crawler sends. The Answer API guide and the Web Search
        API guide do not name one either. This page does not print a token,
        because those pages do not. A third-party crawler list is not a
        substitute for the operator’s page. The wider list, for operators
        that do publish a name, is the{" "}
        <Link href="/ai-crawler-user-agents">AI crawler user-agent reference</Link>.
        How a disallow is written for those tokens is the{" "}
        <Link href="/robots-txt-for-ai-crawlers">robots.txt guide</Link>.
      </p>
      <p>
        Those You.com pages also do not say that the crawler honors{" "}
        <code>robots.txt</code>. A <code>User-agent: *</code> group that
        disallows the path asks crawlers which follow that group to stay out.
        This guide does not upgrade that file into a You.com promise. The
        practical half, which the docs do support, is crawlability: the URL
        has to be a public page their crawler can fetch. A login wall, a
        paywall that hides the answer, or a path that never returns the
        sentence keeps that sentence out of an excerpt.
      </p>
      <p>
        The same pages do not name <code>noindex</code> as a delist control.
        This guide does not invent one. If the page should be eligible for
        an index that reads public HTML, leave the answer in the response
        and do not hide it behind a control those pages have not described.
      </p>

      <h2>Freshness is a filter, and a date on the page</h2>
      <p>
        The Answer API guide and the product page both describe a{" "}
        <code>freshness</code> parameter: <code>day</code>, <code>week</code>,{" "}
        <code>month</code>, <code>year</code>, or a date range. The product
        page says every result includes <code>page_age</code>. The Answer API
        guide says source metadata can include <code>page_age</code> as an
        ISO 8601 publication timestamp. A caller who asks for the last week
        is asking for recent pages. A page with no date the crawler can read
        is a page that filter cannot place.
      </p>
      <p>
        What a publisher can do is show the date a person can already see:
        published, updated, or both, in the HTML, and keep it honest when the
        page changes. You.com does not publish a recrawl interval beyond
        “continuously recrawled,” and this page does not add one. A sitemap
        helps discovery for crawlers that read one. You.com’s pages read here
        do not say a sitemap is required.
      </p>

      <h2>What to change on the page</h2>
      <ol>
        <li>
          Keep the URL publicly fetchable. The product page says You.com runs
          its own crawler and index. A page that returns the answer only after
          a login is not a page those excerpts describe.
        </li>
        <li>
          Do not add a robots.txt token these pages do not name. Leave{" "}
          <code>User-agent: *</code> able to fetch the path unless you mean to
          ask every crawler that honors that group to skip it. You.com has not
          published that it honors the group.
        </li>
        <li>
          Write the answer in the HTML the server sends. One sentence in the
          title and the first paragraph: what the thing is, who provides it,
          and the fact a question would quote. Excerpts are verbatim. You.com
          does not publish a word count, and this page does not invent one.
        </li>
        <li>
          Put a visible date on the page when the fact is time-sensitive.
          Callers can filter on freshness, and results can carry{" "}
          <code>page_age</code>. A date that exists only in a script the
          server never sends is a date those fields do not promise to read.
        </li>
        <li>
          Name the organization that stands behind the page. These docs do
          not publish an authority score. They do return a source URL. A page
          that says who is speaking, and links the source of a number, is the
          version of authority a person can check. The homepage can use the{" "}
          <Link href="/organization-schema-generator">
            Organization schema generator
          </Link>
          .
        </li>
        <li>
          Repeat the visible facts in JSON-LD if you want the labels. A course
          page can use the{" "}
          <Link href="/course-schema-generator">Course schema generator</Link>. A job page uses the <Link href="/job-posting-schema-generator">Job posting schema generator</Link>. A recipe page uses the <Link href="/recipe-schema-generator">Recipe schema generator</Link>. A forum or support page where people can submit answers uses the <Link href="/qa-page-schema-generator">QAPage schema generator</Link>. A page that names a short passage for text-to-speech uses the <Link href="/speakable-schema-generator">Speakable schema generator</Link>. An image with a visible credit, caption, or license uses the <Link href="/image-object-schema-generator">ImageObject schema generator</Link>. A book page uses the <Link href="/book-schema-generator">Book schema generator</Link>. A show page or an episode page uses the <Link href="/podcast-schema-generator">Podcast schema generator</Link>. A film page uses the <Link href="/movie-schema-generator">Movie schema generator</Link>. A dataset page uses the <Link href="/dataset-schema-generator">Dataset schema generator</Link>. A vehicle page uses the <Link href="/vehicle-schema-generator">Vehicle schema generator</Link>. A hotel page uses the <Link href="/hotel-schema-generator">Hotel schema generator</Link>. A restaurant page uses the <Link href="/restaurant-schema-generator">Restaurant schema generator</Link>.
          A service page can use the{" "}
          <Link href="/service-schema-generator">Service schema generator</Link>.
          The field list is the{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link>. None
          of those scripts is a You.com requirement.
        </li>
        <li>
          Add <Link href="/llms-txt">/llms.txt</Link> only if some other
          reader should have a curated list. The{" "}
          <Link href="/llms-txt-generator">llms.txt generator</Link> and the{" "}
          <Link href="/llms-txt-best-practices">llms.txt best practices</Link>{" "}
          page describe that file. The You.com pages read here do not ask a
          publisher for it.
        </li>
      </ol>

      <CheckLinks>
        The free check reports GPTBot, PerplexityBot, and Google-Extended. It
        does not look for a You.com token, and the pages read here do not
        publish one to look for. A clear row on that check is not a You.com
        citation. The <Link href="/geo-audit">$39 GEO audit</Link> scores one
        public URL from the HTML we fetch and returns about ten fixes. It
        does not open You.com.
      </CheckLinks>

      <h2>Questions about You.com citations</h2>
      {youComFaqs.map((item) => (
        <div key={item.q}>
          <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={productPage}>Web Search API</a>, You.com. Own web crawler,
          web index, and news index. Results are not resold from another
          engine. Snippets, publication age, highlights or full-page
          extraction, and a freshness filter. Read 20 October 2026. Benchmark
          scores on that page are not quoted here.
        </li>
        <li>
          <a href={answerDocs}>Answer API overview</a>, You.com documentation.
          A synthesized answer with inline citations, a source URL, and
          verbatim excerpts that the API says it checks against the source
          text. Freshness, domain filters, and <code>page_age</code>. Read 20
          October 2026.
        </li>
        <li>
          <a href={searchDocs}>Web Search API overview</a>, You.com
          documentation. Snippets by default, and highlights or full-page
          content when extraction is requested. Read 20 October 2026.
        </li>
      </ul>
    </>
  );
}
