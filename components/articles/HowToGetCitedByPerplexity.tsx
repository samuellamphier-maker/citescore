import Link from "next/link";
import { GuideOffers } from "@/components/articles/GuideOffers";

const preClass =
  "overflow-x-auto rounded-xl border border-rule bg-cream p-4 font-mono text-[13px] leading-6 text-ink";

const crawlersDoc =
  "https://docs.perplexity.ai/docs/resources/perplexity-crawlers";

export function HowToGetCitedByPerplexityArticle() {
  return (
    <>
      <p>
        Perplexity’s public documentation for publishers is a crawler page,
        not a ranking formula. It names two user agents, says they are
        independent, and tells you how to let them through a firewall.
        Perplexity does not publish a citation rate or a schema requirement
        on that page. CiteScore does not log into Perplexity. The claims
        below are from{" "}
        <a href={crawlersDoc}>Perplexity’s crawler documentation</a>.
      </p>
      <p>
        The matching pages for the other engines are{" "}
        <Link href="/how-to-get-cited-by-chatgpt">
          how to get cited by ChatGPT
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
        , and{" "}
        <Link href="/how-to-get-cited-by-duckduckgo-ai">
          how to get cited by DuckDuckGo
        </Link>
        , and{" "}
        <Link href="/how-to-get-cited-by-perplexity-comet">
          how to get cited by Perplexity Comet
        </Link>
        .
      </p>
      <p>
        Comet is Perplexity’s browser. The assistant in that browser can read
        a page a person already has open. That path is separate from the two
        crawler tokens below. The note is{" "}
        <Link href="/how-to-get-cited-by-perplexity-comet">
          how to get cited by Perplexity Comet
        </Link>
        .
      </p>

      <h2>Two tokens</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>What Perplexity says it does</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">PerplexityBot</th>
              <td>
                Surfaces and links websites in search results on Perplexity.
                Perplexity says it is not used to crawl content for AI
                foundation models. To have the site appear in search results,
                Perplexity recommends allowing this token in robots.txt and
                permitting requests from the{" "}
                <a href="https://www.perplexity.com/perplexitybot.json">
                  published IP ranges
                </a>
                .
              </td>
            </tr>
            <tr>
              <th scope="row">Perplexity-User</th>
              <td>
                Supports a user action. When someone asks Perplexity a
                question, it might visit a page to answer and include a link
                to that page. It is not used for automatic web crawling, and
                it is not used to collect content for training foundation
                models. Perplexity says this fetcher generally ignores
                robots.txt, because a user requested the fetch. The IP list
                is{" "}
                <a href="https://www.perplexity.com/perplexity-user.json">
                  perplexity-user.json
                </a>
                .
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Perplexity says each setting works independently, and that a change
        can take up to 24 hours to show up in their systems. The full
        user-agent strings on the doc:
      </p>
      <pre className={preClass}>{`Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)

Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Perplexity-User/1.0; +https://perplexity.ai/perplexity-user)`}</pre>

      <h2>Allow the search crawler</h2>
      <p>
        This is the group Perplexity asks for when you want the site eligible
        to be surfaced in search results. Merge it into the file you already
        have. A token with no group of its own follows{" "}
        <code>User-agent: *</code>, so a blanket{" "}
        <code>Disallow: /</code> under <code>*</code> covers PerplexityBot
        until you give it a group.
      </p>
      <pre className={preClass}>{`User-agent: PerplexityBot
Allow: /`}</pre>
      <p>
        Robots.txt is the file. The firewall is the other gate. Perplexity
        says a WAF may need an explicit allow, and that the safe rule
        combines the user-agent with the current IP ranges. For Cloudflare,
        the doc describes a custom WAF rule: user-agent contains{" "}
        <code>PerplexityBot</code> or <code>Perplexity-User</code>, and the
        source IP is in the official ranges, with the action set to Allow.
        For AWS WAF, it describes an IP set plus a user-agent string match,
        allowed at a higher priority than blocking rules. The ranges come
        from{" "}
        <a href="https://www.perplexity.com/perplexitybot.json">
          perplexitybot.json
        </a>{" "}
        and{" "}
        <a href="https://www.perplexity.com/perplexity-user.json">
          perplexity-user.json
        </a>
        . Perplexity says those addresses change and should be fetched
        again, not pasted once and forgotten.
      </p>
      <p>
        The same page says Perplexity-User generally ignores robots.txt. A
        Disallow under Perplexity-User is not the control Perplexity
        documents for user-triggered fetches. The control they do document
        for those fetches is which hosts the fetcher can reach, including
        through the WAF rule above. The{" "}
        <Link href="/robots-txt-for-ai-crawlers">robots.txt guide</Link>{" "}
        covers how this token sits next to GPTBot and Google-Extended. What
        the $39 report infers about Perplexity, without a Perplexity login,
        is on <Link href="/perplexity-citations">Perplexity citations</Link>.
      </p>

      <h2>What the crawler page leaves out</h2>
      <p>
        Perplexity’s crawler page does not list a schema type, an{" "}
        <code>llms.txt</code> file, or a content template as the way into a
        footnote. This page does not add one. A page the crawler cannot
        fetch cannot be linked from a crawl of that page. Put the product
        name and the fact you want quoted in the HTML. That is a property of
        a fetch, and Perplexity does not publish it as a score.
      </p>
      <p>
        The cross-engine list for a product site is the{" "}
        <Link href="/ai-search-readiness-checklist-for-saas">
          AI search readiness checklist for SaaS
        </Link>
        .
      </p>

      <GuideOffers
        freeCheck={
          <>
            Run the <Link href="/free-check">free check</Link> first. It
            reports whether robots.txt allows or blocks PerplexityBot, along
            with GPTBot and Google-Extended. It does not read
            Perplexity-User, and it does not check your WAF against
            Perplexity’s IP list. A passing PerplexityBot row means the
            robots group is not a disallow. It is not a live Perplexity
            answer.
          </>
        }
      />

      <h2>Source</h2>
      <ul>
        <li>
          <a href={crawlersDoc}>Perplexity Crawlers</a>. Both user agents,
          the up-to-24-hour note, the user-agent strings, the IP lists, and
          the Cloudflare and AWS WAF guidance.
        </li>
      </ul>
    </>
  );
}
