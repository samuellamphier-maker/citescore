import Link from "next/link";
import { GuideOffers } from "@/components/articles/GuideOffers";

const preClass =
  "overflow-x-auto rounded-xl border border-rule bg-cream p-4 font-mono text-[13px] leading-6 text-ink";

const botsDoc = "https://developers.openai.com/api/docs/bots";

export function HowToGetCitedByChatgptArticle() {
  return (
    <>
      <p>
        OpenAI publishes a crawler overview, and that overview is the public
        rule for whether a site can show up in ChatGPT search answers. It is
        not a ranking formula. OpenAI does not publish a citation rate, a
        required schema type, or a word count. CiteScore does not log into
        ChatGPT. This page stays inside{" "}
        <a href={botsDoc}>OpenAI’s crawler documentation</a> and says so when
        a step is only a fetch limitation.
      </p>
      <p>
        Three tokens do three jobs. Mixing them up is how a training opt-out
        gets described as a search opt-out.         The Perplexity, Google, and Meta AI
        equivalents are on{" "}
        <Link href="/how-to-get-cited-by-perplexity">
          how to get cited by Perplexity
        </Link>
        ,{" "}
        <Link href="/google-ai-overviews-optimization">
          Google AI Overviews optimization
        </Link>
        ,{" "}
        <Link href="/how-to-get-cited-by-meta-ai">
          how to get cited by Meta AI
        </Link>
        ,{" "}
        <Link href="/how-to-get-cited-by-deepseek">
          how to get cited by DeepSeek
        </Link>
        , and{" "}
        <Link href="/how-to-get-cited-by-mistral">
          how to get cited by Mistral
        </Link>
        , and{" "}
        <Link href="/how-to-get-cited-by-brave-search">
          how to get cited by Brave Search
        </Link>
        , and{" "}
        <Link href="/how-to-get-cited-by-you-com">
          how to get cited by You.com
        </Link>
        .
      </p>

      <h2>Three tokens</h2>
      <p>
        OpenAI says each robots.txt setting is independent. A site can allow
        OAI-SearchBot and disallow GPTBot. When both are allowed, OpenAI may
        reuse one crawl for both jobs, so it does not have to fetch the site
        twice.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>What OpenAI says it does</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">OAI-SearchBot</th>
              <td>
                Surfaces websites in search results in ChatGPT’s search
                features. A site opted out of OAI-SearchBot will not be shown
                in ChatGPT search answers. It can still appear as a
                navigational link. OpenAI recommends allowing this token in
                robots.txt, and allowing requests from the{" "}
                <a href="https://openai.com/searchbot.json">
                  published IP ranges
                </a>
                .
              </td>
            </tr>
            <tr>
              <th scope="row">GPTBot</th>
              <td>
                Crawls content that may be used to train OpenAI’s generative
                AI foundation models. Disallowing GPTBot tells OpenAI that
                the content should not be used for that training. The IP list
                is <a href="https://openai.com/gptbot.json">gptbot.json</a>.
              </td>
            </tr>
            <tr>
              <th scope="row">ChatGPT-User</th>
              <td>
                Visits a page when a person asks ChatGPT or a Custom GPT to
                do something that needs the web, including GPT Actions. It is
                not an automatic crawl. OpenAI says robots.txt rules may not
                apply, because a person started the action, and that this
                token is not used to decide whether content appears in
                Search. The IP list is{" "}
                <a href="https://openai.com/chatgpt-user.json">
                  chatgpt-user.json
                </a>
                .
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        For search results, OpenAI says it can take about 24 hours after a
        robots.txt update for their systems to adjust. That figure is theirs.
      </p>

      <h2>The group that controls search answers</h2>
      <p>
        The search opt-out is an OAI-SearchBot group. OpenAI’s example
        user-agent string can change version number. The current example is
        below. When the crawler fetches robots.txt itself, the string may
        also include a <code>robots.txt</code> marker so the request is
        easier to spot in a log that does not store the path.
      </p>
      <pre className={preClass}>{`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36; compatible; OAI-SearchBot/1.4; +https://openai.com/searchbot`}</pre>
      <p>
        Paste this when ChatGPT search may fetch the public site. It is a
        group, not a whole file. Keep any Sitemap line and any private-path
        rules you already rely on.
      </p>
      <pre className={preClass}>{`User-agent: OAI-SearchBot
Allow: /`}</pre>
      <p>
        A training opt-out is a second group. It leaves the search group
        alone.
      </p>
      <pre className={preClass}>{`User-agent: GPTBot
Disallow: /`}</pre>
      <p>
        GPTBot’s example user-agent, version subject to change, and
        ChatGPT-User’s full string:
      </p>
      <pre className={preClass}>{`Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.4; +https://openai.com/gptbot

Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot`}</pre>
      <p>
        A named group does not inherit <code>User-agent: *</code>. The
        reverse matters more often: a token with no group of its own follows{" "}
        <code>*</code>. This block asks every unnamed agent, including
        OAI-SearchBot, to stay out.
      </p>
      <pre className={preClass}>{`User-agent: *
Disallow: /`}</pre>
      <p>
        Robots.txt is only half of what OpenAI asks for. The overview also
        says to allow requests from the published IP ranges. A file that
        says Allow can still sit behind a firewall that returns 403. Check
        the live ranges at{" "}
        <a href="https://openai.com/searchbot.json">
          openai.com/searchbot.json
        </a>{" "}
        rather than a copied list, because the list moves. The longer note
        on how groups interact is{" "}
        <Link href="/robots-txt-for-ai-crawlers">robots.txt for AI crawlers</Link>
        . The{" "}
        <Link href="/robots-txt-ai-crawler-generator">robots.txt generator</Link>{" "}
        can write OAI-SearchBot, GPTBot, and ChatGPT-User.
      </p>

      <h2>What OpenAI does not publish</h2>
      <p>
        The crawler overview does not mention FAQPage, Organization markup,
        an <code>llms.txt</code> file, a backlink count, or a heading
        formula. Those are absent from the document, so this page does not
        turn them into ChatGPT requirements. Google has its own statement
        about <code>llms.txt</code> and schema, on the{" "}
        <Link href="/google-ai-overviews-optimization">AI Overviews guide</Link>
        . That statement is Google’s, for Google Search.
      </p>
      <p>
        What a fetch still requires is ordinary: the sentence has to be in
        the response the crawler receives. A product name, what the product
        does, who it is for, and a price, written as text in the HTML, are
        sentences a fetch can carry. The same words only inside an image, or
        only behind a login, are words that fetch does not get. That is a
        limit on what the crawler can see. OpenAI does not publish it as a
        ranking boost.
      </p>
      <p>
        A SaaS pass across ChatGPT, Perplexity, and Google is the{" "}
        <Link href="/ai-search-readiness-checklist-for-saas">
          AI search readiness checklist for SaaS
        </Link>
        . A practical log of whether the name shows up in answers is{" "}
        <Link href="/how-to-check-if-chatgpt-mentions-your-brand">
          how to check if ChatGPT mentions your brand
        </Link>
        . The longer on-page list is the{" "}
        <Link href="/checklist">40-point checklist</Link>.
      </p>

      <GuideOffers
        freeCheck={
          <>
            Run the <Link href="/free-check">free check</Link> first. It
            looks at one host and reports whether the homepage responded,
            whether robots.txt allows or blocks GPTBot, PerplexityBot, and
            Google-Extended, whether <code>/llms.txt</code> is a non-empty
            text file, whether a sitemap is present, and which JSON-LD types
            appear on the homepage. It does not read OAI-SearchBot. You
            still open the robots file for that group. A passing row means
            the signal is present. It is not a live ChatGPT answer.
          </>
        }
      />

      <h2>Source</h2>
      <ul>
        <li>
          <a href={botsDoc}>Overview of OpenAI Crawlers</a>. The three
          tokens, the independence of the settings, the about-24-hour note
          for search, the example user-agent strings, and the published IP
          lists.
        </li>
      </ul>
    </>
  );
}
