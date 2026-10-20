import Link from "next/link";
import { CheckLinks, preClass } from "@/components/articles/guide-links";

const crawlersDoc =
  "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler";

export function HowToGetCitedByClaudeArticle() {
  return (
    <>
      <p>
        Anthropic’s public note for site owners is a crawler page, dated 7
        April 2026. It names three robots and says each one honors
        robots.txt. It does not publish a citation rate, a required schema
        type, or a word count. CiteScore does not log into Claude. The
        claims below are from{" "}
        <a href={crawlersDoc}>Anthropic’s crawler article</a>.
      </p>
      <p>
        The same kind of split exists for the other engines:{" "}
        <Link href="/how-to-get-cited-by-chatgpt">ChatGPT</Link>,{" "}
        <Link href="/how-to-get-cited-by-perplexity">Perplexity</Link>,{" "}
        <Link href="/how-to-get-cited-by-gemini">Gemini</Link>,{" "}
        <Link href="/how-to-get-cited-by-copilot">Microsoft Copilot</Link>,{" "}
        <Link href="/how-to-get-cited-by-grok">Grok</Link>,{" "}
        <Link href="/how-to-get-cited-by-meta-ai">Meta AI</Link>,{" "}
        <Link href="/how-to-get-cited-by-deepseek">DeepSeek</Link>,{" "}
        <Link href="/how-to-get-cited-by-mistral">Mistral</Link>, and{" "}
        <Link href="/how-to-get-cited-by-brave-search">Brave Search</Link>.
        The short cross-engine version is{" "}
        <Link href="/how-to-get-cited-by-ai-answer-engines">
          how to get cited by AI answer engines
        </Link>
        .
      </p>

      <h2>Three robots</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>What Anthropic says it does</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">ClaudeBot</th>
              <td>
                Collects web content that could contribute to training
                generative models. Restricting it signals that the site’s
                future materials should be excluded from those training
                datasets.
              </td>
            </tr>
            <tr>
              <th scope="row">Claude-SearchBot</th>
              <td>
                Navigates the web to improve search result quality. Anthropic
                says disabling it prevents indexing for search optimization,
                which may reduce the site’s visibility and accuracy in user
                search results.
              </td>
            </tr>
            <tr>
              <th scope="row">Claude-User</th>
              <td>
                Fetches pages when someone asks Claude a question. Anthropic
                says disabling it prevents retrieval in response to a user
                query, which may reduce visibility for user-directed web
                search. Unlike OpenAI’s ChatGPT-User note, this article says
                Anthropic’s bots honor robots.txt.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        A training opt-out is not a search opt-out. Allow Claude-SearchBot
        and Claude-User, and disallow ClaudeBot, when the policy is “cite
        the page, do not train on new copies.” Anthropic says the settings
        are separate robots.
      </p>

      <h2>Allow the search robot</h2>
      <p>
        This is the group that matches the search job Anthropic describes.
        A token with no group of its own follows <code>User-agent: *</code>,
        because Anthropic says the bots honor standard robots.txt directives.
        A blanket <code>Disallow: /</code> under <code>*</code> covers
        Claude-SearchBot until it has its own group.
      </p>
      <pre className={preClass}>{`User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /`}</pre>
      <p>
        Anthropic also supports the non-standard <code>Crawl-delay</code>{" "}
        extension, and the example they publish is on ClaudeBot. Repeat the
        file on every subdomain you want to control. Their article says an
        opt-out has to be in robots.txt, and that blocking the crawler’s IP
        addresses may not stick, because that block can stop the crawler
        from reading robots.txt.
      </p>
      <p>
        How these tokens sit next to GPTBot and Google-Extended is on the{" "}
        <Link href="/robots-txt-for-ai-crawlers">robots.txt guide</Link>. The
        three tokens CiteScore’s audit records — which do not include
        Claude-SearchBot — are on{" "}
        <Link href="/ai-crawlers">AI crawlers</Link>.
      </p>

      <h2>What the crawler page leaves out</h2>
      <p>
        Anthropic’s article does not list a schema type or an{" "}
        <code>llms.txt</code> file as the way into a Claude answer. A page
        the robot cannot fetch cannot be indexed from that fetch. Put the
        name of the business and the fact you want quoted in the HTML.
        Anthropic does not publish that as a score.
      </p>
      <p>
        The label for this work, and what it does not promise, is on{" "}
        <Link href="/answer-engine-optimization">
          answer engine optimization
        </Link>
        .
      </p>

      <CheckLinks>
        The free check reports GPTBot, PerplexityBot, and Google-Extended.
        It does not parse ClaudeBot, Claude-SearchBot, or Claude-User. A
        passing row on that check is not a Claude answer.
      </CheckLinks>

      <h2>Source</h2>
      <ul>
        <li>
          <a href={crawlersDoc}>
            Does Anthropic crawl data from the web, and how can site owners
            block the crawler?
          </a>{" "}
          Claude Help Center, 7 April 2026. The three robots, what disabling
          each one does, robots.txt, Crawl-delay, subdomains, and the note
          on IP blocks.
        </li>
      </ul>
    </>
  );
}
