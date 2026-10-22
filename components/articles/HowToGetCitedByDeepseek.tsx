import Link from "next/link";
import { CheckLinks } from "@/components/articles/guide-links";

const searchGuide = "https://api-docs.deepseek.com/guides/search/";
const searchReference = "https://api-docs.deepseek.com/api/search/";
const crawlerIssue = "https://github.com/deepseek-ai/DeepSeek-LLM/issues/53";

export const deepseekFaqs = [
  {
    q: "Does DeepSeek publish a robots.txt token for citations?",
    a: "Not on the Search and Fetch guide read for this page on 20 October 2026. That guide describes a Search API and a Fetch API. It does not name a user-agent, an IP range, or a robots.txt group. Third-party crawler lists sometimes use the string DeepSeekBot. This page does not treat that string as a control DeepSeek has documented. A January 2025 issue on the DeepSeek-LLM repository asks for the crawler name behind a line about self-collected data respecting robots.txt. The thread is still open and does not supply a name.",
  },
  {
    q: "Does a hit in the Search API mean DeepSeek’s chat product will cite the page?",
    a: "No. The Search API returns a ranked list for a query: a title, a URL, a short snippet, a longer summary, an optional page body, a date that can be null, and an authority tier. The guide says that API is for agents and RAG applications, powered by DeepSeek’s in-house search engine. It does not say the consumer chat product uses the same index, the same tier, or the same ranking, and it does not say that a returned URL is quoted in an answer. A caller can also limit or exclude a site. Being returned is not a citation.",
  },
  {
    q: "Does Event schema, or any JSON-LD, make DeepSeek cite a page?",
    a: "No. The Search and Fetch guide does not list a schema type, an llms.txt file, or a word count. JSON-LD repeats facts a person can already read. It is not a switch on that guide. The free check reads GPTBot, PerplexityBot, and Google-Extended. It does not read a DeepSeek token, and it does not log into DeepSeek.",
  },
  {
    q: "Can a site raise the authority tier from the documentation?",
    a: "The guide does not say how. authority is an integer from 0 to 4, and -1 means unknown. Values of 3 or above are described as highly authoritative sources. rerank_score runs from 0 to 3 and combines signals such as relevance, authority, and freshness, with 1.5 or above called high quality. The guide and the API reference do not publish the inputs to either number. Treat the fields as labels on a result, not as a checklist you can complete.",
  },
];

export function HowToGetCitedByDeepseekArticle() {
  return (
    <>
      <p>
        DeepSeek publishes a{" "}
        <a href={searchGuide}>Search and Fetch guide</a> for two APIs that
        return live web content. Search finds pages. Fetch reads one URL and
        returns Markdown. The guide does not publish a citation rate, a
        required schema type, a word count, or a robots.txt token. CiteScore
        does not log into DeepSeek, chat.deepseek.com, or the DeepSeek API.
        The claims below are from that guide and the{" "}
        <a href={searchReference}>Search API reference</a>, read on 20
        October 2026.
      </p>
      <p>
        The guide says the Search API is powered by DeepSeek’s in-house
        search engine and is for agents and RAG applications. It does not
        say the consumer chat product uses that engine, those authority
        tiers, or those fetch errors. Until DeepSeek publishes that link,
        the chat product is undescribed on this point. The same kind of
        split — a published control, and the files the operator does not
        require — is written up for{" "}
        <Link href="/how-to-get-cited-by-chatgpt">ChatGPT</Link>,{" "}
        <Link href="/how-to-get-cited-by-perplexity">Perplexity</Link>,{" "}
        <Link href="/how-to-get-cited-by-claude">Claude</Link>,{" "}
        <Link href="/how-to-get-cited-by-gemini">Gemini</Link>,{" "}
        <Link href="/how-to-get-cited-by-copilot">Microsoft Copilot</Link>,{" "}
        <Link href="/how-to-get-cited-by-grok">Grok</Link>,{" "}
        <Link href="/how-to-get-cited-by-meta-ai">Meta AI</Link>,{" "}
        <Link href="/how-to-get-cited-by-mistral">Mistral</Link>,{" "}
        <Link href="/how-to-get-cited-by-brave-search">Brave Search</Link>, and{" "}
        <Link href="/how-to-get-cited-by-you-com">You.com</Link>, and{" "}
        <Link href="/how-to-get-cited-by-duckduckgo-ai">DuckDuckGo</Link>, and{" "}<Link href="/how-to-get-cited-by-perplexity-comet">Perplexity Comet</Link>. The short
        map is{" "}
        <Link href="/how-to-get-cited-by-ai-answer-engines">
          how to get cited by AI answer engines
        </Link>
        .
      </p>

      <h2>A search result is not a citation</h2>
      <p>
        Search returns a <code>results</code> array. An empty array is a
        normal response when nothing matched, and that response is not
        billed. Each item is a page the engine chose to return for that
        query. The guide does not say the model then quotes it.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>What the guide says it is</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">title, url</th>
              <td>The title and the URL of the result.</td>
            </tr>
            <tr>
              <th scope="row">snippet</th>
              <td>
                A short summary related to the query, typically 100 to 200
                characters, intended for display in a UI.
              </td>
            </tr>
            <tr>
              <th scope="row">summary</th>
              <td>
                A longer summary related to the query, typically 600 to 800
                characters, intended to be read by a model.
              </td>
            </tr>
            <tr>
              <th scope="row">content</th>
              <td>
                The page body. Empty when the caller did not ask for it, or
                when the content is unavailable.
              </td>
            </tr>
            <tr>
              <th scope="row">date</th>
              <td>
                The publication time in UTC, or null when unknown. The guide
                does not say which HTML field that time is read from.
              </td>
            </tr>
            <tr>
              <th scope="row">authority</th>
              <td>
                An integer from 0 to 4. -1 means unknown. 3 or above means
                a highly authoritative source. The guide does not say how a
                page receives the tier.
              </td>
            </tr>
            <tr>
              <th scope="row">rerank_score</th>
              <td>
                A score from 0 to 3 that combines signals such as relevance,
                authority, and freshness. 1.5 or above is called high
                quality. The formula is not published.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <code>site_name</code> can be null. The guide does not say how the
        name is chosen. A caller sets <code>count</code> from 1 to 50. A
        larger count does not change the price, and it does not put your
        URL into a query that did not match it.
      </p>

      <h2>The caller decides which sites are in the query</h2>
      <p>
        The query is forwarded with its search syntax. A caller can restrict
        results with <code>site:</code>, exclude a host with{" "}
        <code>-site:</code>, require a phrase, drop a phrase, limit
        language with <code>lang:</code>, and limit dates with{" "}
        <code>after:</code> and <code>before:</code>. Those operators are on
        the request. A publisher cannot add a host to someone else’s query,
        and cannot remove it from an exclusion. robots.txt is not the
        mechanism the guide documents for that.
      </p>
      <p>
        <code>ori_question</code> is optional. The guide says providing the
        user’s original question can improve query understanding. That is a
        field on the API call, not a tag on your page.{" "}
        <code>localization</code> is an optional IP address used to localize
        results. It is also the caller’s, and this page does not guess what
        a given IP changes.
      </p>

      <h2>Fetch reads one page, and it can fail</h2>
      <p>
        Fetch takes one http(s) URL and returns a title and Markdown. The
        guide says fetching is subject to the target site’s availability
        and access policies. HTTP 404 on that API includes an unavailable
        URL, a URL blocked by site policy, an error from the target site, an
        unsupported content type, or a page with no extractable Markdown.
        HTTP 403 means DeepSeek’s security policy rejected the fetch. The
        guide does not publish the rules of that policy.
      </p>
      <p>
        A fact that exists only in an image, or only after JavaScript runs,
        is a fact that can miss a Markdown extract. The guide does not say
        Fetch executes JavaScript. Text in the HTML the server sends is the
        part a Markdown conversion can keep. A login wall is an access
        policy. A page the public cannot open is a page Fetch is allowed to
        fail on.
      </p>

      <h2>There is no published robots.txt token</h2>
      <p>
        OpenAI, Anthropic, Perplexity, Google, and Meta each publish a token
        and say what disallowing it does. DeepSeek’s Search and Fetch guide
        does not. It does not name a user-agent for Search or for Fetch.
        Public crawler directories sometimes name DeepSeekBot. That string
        is not in the guide or the API reference. This page does not treat
        a directory entry as a robots.txt token.
      </p>
      <p>
        A group in robots.txt matters for a client that reads the file and
        identifies itself with that token. DeepSeek has not said its Search
        or Fetch clients do either. Pasting an unpublished name into
        robots.txt does not recreate the control{" "}
        <Link href="/how-to-get-cited-by-chatgpt">OAI-SearchBot</Link> or{" "}
        <Link href="/how-to-get-cited-by-perplexity">PerplexityBot</Link>{" "}
        actually is. If your logs show a client calling itself DeepSeekBot,
        that string can be spoofed. Confirm it the way you would confirm any
        other user agent before you write a rule for it.
      </p>
      <p>
        Training data is a separate question, and it is also unpublished.{" "}
        <a href={crawlerIssue}>Issue 53</a> on the DeepSeek-LLM repository,
        opened in January 2025 and still open, quotes a line about
        self-collected data respecting robots.txt and asks for the crawler
        name. The thread does not give one. A sentence that says a crawl
        respects robots.txt, without a token, is not a control you can set.
        If DeepSeek later names a token and says what disallowing it does,
        that page becomes the control. The tokens operators have published
        are on the{" "}
        <Link href="/robots-txt-for-ai-crawlers">robots.txt guide</Link> and
        the{" "}
        <Link href="/ai-crawler-user-agents">AI crawler user-agent reference</Link>.
      </p>

      <h2>What you can actually change on the page</h2>
      <p>
        Put the name of the business, what it does, and the sentence that
        answers the question in the title and the first paragraph of the
        HTML. The documented snippet is typically 100 to 200 characters, and
        the summary a model is meant to read is typically 600 to 800. Those
        lengths describe the API fields. They are not a promise about how a
        chat answer quotes you. A fact that starts after a long preamble is
        easier for a short extract to miss. DeepSeek does not publish a
        word count, and this page does not invent one.
      </p>
      <p>
        Use one name for the site in the title, the first paragraph, and the
        footer. <code>site_name</code> can come back null, and the guide
        does not say it reads your logo or your schema. A visible
        publication date gives a parser a date to find. The result’s{" "}
        <code>date</code> is null when unknown. The guide does not say that
        date is read from <code>datePublished</code>. Write the date where a
        person can see it. Schema can repeat it. It cannot supply a date the
        page hides.
      </p>
      <p>
        Relevance, authority, and freshness are the signals the guide names
        inside <code>rerank_score</code>. It does not say which sentence
        raises relevance, which link raises authority, or which date format
        raises freshness. A page that answers the query in plain text is the
        part you control. A page that stuffs the query is not a method this
        guide recommends, and DeepSeek has not published a spam rule on
        these two pages for this page to quote.
      </p>
      <p>
        Nothing on the Search and Fetch guide asks for a schema type or an{" "}
        <code>llms.txt</code> file.{" "}
        <Link href="/schema-markup-for-ai-search">
          Schema that matches the visible page
        </Link>{" "}
        is for parsers that read JSON-LD. An event page can use the{" "}
        <Link href="/event-schema-generator">Event schema generator</Link>. A page that shows reviews of a product or an app uses the <Link href="/review-schema-generator">Review schema generator</Link>. A service page uses the <Link href="/service-schema-generator">Service schema generator</Link>. A course page uses the <Link href="/course-schema-generator">Course schema generator</Link>. A job page uses the <Link href="/job-posting-schema-generator">Job posting schema generator</Link>. A recipe page uses the <Link href="/recipe-schema-generator">Recipe schema generator</Link>. A forum or support page where people can submit answers uses the <Link href="/qa-page-schema-generator">QAPage schema generator</Link>. A page that names a short passage for text-to-speech uses the <Link href="/speakable-schema-generator">Speakable schema generator</Link>. An image with a visible credit, caption, or license uses the <Link href="/image-object-schema-generator">ImageObject schema generator</Link>. A book page uses the <Link href="/book-schema-generator">Book schema generator</Link>. A show page or an episode page uses the <Link href="/podcast-schema-generator">Podcast schema generator</Link>. A film page uses the <Link href="/movie-schema-generator">Movie schema generator</Link>. A dataset page uses the <Link href="/dataset-schema-generator">Dataset schema generator</Link>. A vehicle page uses the <Link href="/vehicle-schema-generator">Vehicle schema generator</Link>. A hotel page uses the <Link href="/hotel-schema-generator">Hotel schema generator</Link>.
        The homepage can use the{" "}
        <Link href="/website-schema-generator">WebSite schema generator</Link>.
        None of those scripts is a DeepSeek switch. A mention on someone else’s
        site is a different URL. The guide does not say that a directory
        listing, a Wikipedia article, or a review causes your page to be
        returned.
      </p>

      <CheckLinks>
        The free check reports GPTBot, PerplexityBot, and Google-Extended. It
        does not look for a DeepSeek token, because DeepSeek has not
        published one for it to read. A clear row on that check is not a
        DeepSeek citation. The <Link href="/geo-audit">$39 GEO audit</Link>{" "}
        scores one public URL from the HTML we fetch and returns about ten
        fixes. It does not call the DeepSeek API or open the chat product.
      </CheckLinks>

      <h2>Questions about DeepSeek citations</h2>
      {deepseekFaqs.map((item) => (
        <div key={item.q}>
          <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={searchGuide}>Search and Fetch</a>, DeepSeek API docs. The
          in-house search engine, query operators, result fields, Fetch
          errors, and the statement that fetching follows the target site’s
          availability and access policies. Read 20 October 2026.
        </li>
        <li>
          <a href={searchReference}>Search API reference</a>, DeepSeek API
          docs. The same result fields, including authority from -1 to 4 and
          rerank_score up to 3. Read 20 October 2026.
        </li>
        <li>
          <a href={crawlerIssue}>DeepSeek-LLM issue 53</a>. An open request
          for the crawler name behind a robots.txt line. The thread does not
          name one. Checked 20 October 2026.
        </li>
      </ul>
    </>
  );
}
