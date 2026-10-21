import Link from "next/link";

const preClass =
  "overflow-x-auto rounded-xl border border-rule bg-cream p-4 font-mono text-[13px] leading-6 text-ink";

export const robotsFaqs = [
  {
    q: "If User-agent: * allows the site, are these five allowed?",
    a: "Only when they have no group of their own. A crawler uses the group that names its token. It uses User-agent: * when it has no group. An Allow on * does not override a Disallow: / written under GPTBot, ClaudeBot, PerplexityBot, Google-Extended, or CCBot.",
  },
  {
    q: "Does blocking GPTBot remove a site from ChatGPT search?",
    a: "OpenAI documents GPTBot and OAI-SearchBot as independent. GPTBot is the crawl that may be used to train generative models. OAI-SearchBot is the search crawler. OpenAI says a site opted out of OAI-SearchBot is not shown in ChatGPT search answers, though it can still appear as a navigational link. A GPTBot disallow does not set the OAI-SearchBot rule.",
  },
  {
    q: "Does Google-Extended remove a page from Google Search?",
    a: "Google says Google-Extended does not change inclusion in Google Search and is not a ranking signal in Google Search. It is a robots.txt control token for whether crawled content may be used to train later Gemini models and for grounding in Gemini Apps and Vertex AI. It has no separate HTTP user-agent. You will not see Google-Extended in an access log.",
  },
];

export function RobotsTxtForAiCrawlersArticle() {
  return (
    <>
      <p>
        <code>robots.txt</code> is a request a well-behaved crawler can honor.
        It is not a firewall, and it is not a citation. The five tokens on
        this page do different jobs. Pasting one <code>Disallow: /</code>{" "}
        under <code>User-agent: *</code> opts every unnamed agent out,
        including the ones you meant to keep.
      </p>
      <p>
        The lines below are groups you can paste into the file at the root
        of the host, for example <code>https://example.com/robots.txt</code>.
        They are not a complete file. If you already have a Sitemap line, a
        Googlebot group, or private paths, merge these groups in. Replacing
        the whole file can drop a rule you still want. The{" "}
        <Link href="/free-check">free check</Link> reads the live file. The{" "}
        <Link href="/geo-audit">$39 audit</Link> scores the HTML a crawler
        would fetch. Neither one logs into ChatGPT, Claude, Perplexity, or
        Google.
      </p>

      <h2>Five tokens, five jobs</h2>
      <p>
        The operators publish these distinctions. CiteScore does not add a
        sixth meaning. A blank cell in your own file is not the same as a
        disallow: if the token has no group, it follows <code>*</code>. The
        wider set, with a copyable group and a note when the operator does
        not document compliance, is the{" "}
        <Link href="/ai-crawler-user-agents">AI crawler user-agent reference</Link>.
        Meta’s crawler page, including the token Meta ties to citations in
        Meta AI, is{" "}
        <Link href="/how-to-get-cited-by-meta-ai">how to get cited by Meta AI</Link>.
        DeepSeek’s Search and Fetch guide does not name a robots.txt token.
        That note is{" "}
        <Link href="/how-to-get-cited-by-deepseek">how to get cited by DeepSeek</Link>.
        Mistral’s three tokens are on{" "}
        <Link href="/how-to-get-cited-by-mistral">how to get cited by Mistral</Link>.
        Brave’s crawler page does not publish a separate token. That note is{" "}
        <Link href="/how-to-get-cited-by-brave-search">how to get cited by Brave Search</Link>.
        You.com’s product page and Answer API guide do not name a token either.
        That note is{" "}
        <Link href="/how-to-get-cited-by-you-com">how to get cited by You.com</Link>.
        DuckDuckGo publishes DuckAssistBot for AI-assisted answers and
        DuckDuckBot for search results. That note is{" "}
        <Link href="/how-to-get-cited-by-duckduckgo-ai">how to get cited by DuckDuckGo</Link>.
        Comet does not add a robots.txt token on the pages Perplexity publishes for the browser assistant. That note is{" "}
        <Link href="/how-to-get-cited-by-perplexity-comet">how to get cited by Perplexity Comet</Link>.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>Who publishes it</th>
              <th>What a disallow is asking for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">GPTBot</th>
              <td>OpenAI</td>
              <td>
                Do not use the site’s content to train generative models.
                OpenAI says this setting is independent of OAI-SearchBot,
                which is the crawler for ChatGPT search.
              </td>
            </tr>
            <tr>
              <th scope="row">ClaudeBot</th>
              <td>Anthropic</td>
              <td>
                Exclude future material from model-training datasets.
                Anthropic also documents Claude-SearchBot and Claude-User.
                A ClaudeBot rule does not write those two.
              </td>
            </tr>
            <tr>
              <th scope="row">PerplexityBot</th>
              <td>Perplexity</td>
              <td>
                Do not use the site for Perplexity search results.
                Perplexity says this crawler is not used to collect content
                for foundation models. Perplexity-User is a separate token.
              </td>
            </tr>
            <tr>
              <th scope="row">Google-Extended</th>
              <td>Google</td>
              <td>
                Do not use content Google has crawled to train later Gemini
                models, or for grounding in Gemini Apps and Vertex AI.
                Google says this token does not change Google Search
                inclusion or ranking. It is not a separate crawler.
              </td>
            </tr>
            <tr>
              <th scope="row">CCBot</th>
              <td>Common Crawl</td>
              <td>
                Do not fetch the site for Common Crawl’s open web archive.
                Common Crawl’s documented block is a CCBot group with{" "}
                <code>Disallow: /</code>. That does not delete a copy already
                in an older crawl.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Copy-paste: allow these five</h2>
      <p>
        Use this when you want each of the five to fetch public pages, and
        you still want <code>/admin/</code> and <code>/api/</code> left
        alone. A named group does not inherit <code>User-agent: *</code>.
        The private paths are repeated on every group, including{" "}
        <code>*</code>, so an agent with its own group still skips them.
        Change the paths to the ones that are actually private on your host.
      </p>
      <pre className={preClass}>{`User-agent: GPTBot
Allow: /
Disallow: /admin/
Disallow: /api/

User-agent: ClaudeBot
Allow: /
Disallow: /admin/
Disallow: /api/

User-agent: PerplexityBot
Allow: /
Disallow: /admin/
Disallow: /api/

User-agent: Google-Extended
Allow: /
Disallow: /admin/
Disallow: /api/

User-agent: CCBot
Allow: /
Disallow: /admin/
Disallow: /api/

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/`}</pre>
      <p>
        An explicit <code>Allow: /</code> is optional when nothing is
        disallowed. It is useful next to a path disallow, because it records
        the rest of the host as allowed inside that group. Do not paste{" "}
        <code>Disallow: /</code> into one of these groups by habit. That
        line opts that token out of the whole host.
      </p>

      <h2>Copy-paste: opt out of training, keep Perplexity search</h2>
      <p>
        Use this when the policy is “search crawlers may fetch the site;
        training crawlers and the open crawl may not.” PerplexityBot is the
        search token in this set. GPTBot, ClaudeBot, and CCBot are the
        training or archive crawlers. Google-Extended is the Gemini training
        and grounding control, not a Google Search block.
      </p>
      <pre className={preClass}>{`User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: PerplexityBot
Allow: /`}</pre>
      <p>
        Read what this block does not touch. It does not disallow
        OAI-SearchBot, so it is not an opt-out of ChatGPT search. It does
        not disallow Claude-SearchBot or Claude-User. It does not disallow
        Googlebot, and Google says Google-Extended is not a Search ranking
        switch. If those other tokens matter, give each one its own group.
        The <Link href="/robots-txt-ai-crawler-generator">robots.txt generator</Link>{" "}
        writes OAI-SearchBot, ChatGPT-User, GPTBot, PerplexityBot, ClaudeBot,
        and Google-Extended. It does not write CCBot. Add the CCBot group
        yourself if you use the generator and you also want a Common Crawl
        rule.
      </p>
      <p>
        OpenAI says that when both GPTBot and OAI-SearchBot are allowed, it
        may reuse one crawl for both jobs. Allowing GPTBot is a training
        decision, not a free extra on top of search.
      </p>

      <h2>Copy-paste: block one token</h2>
      <p>
        Common Crawl’s own example for a full opt-out is the first group.
        The same shape works for any one of the five. Anthropic asks you to
        put the rule on every subdomain you want to opt out. A file on{" "}
        <code>www</code> does not cover a bare host, or the reverse.
      </p>
      <pre className={preClass}>{`User-agent: CCBot
Disallow: /

User-agent: ClaudeBot
Disallow: /`}</pre>
      <p>
        Anthropic and Common Crawl both document <code>Crawl-delay</code> as
        a way to slow a crawler instead of blocking it. Anthropic’s example
        is <code>Crawl-delay: 1</code> under ClaudeBot. Common Crawl’s
        example for “no more than once every 2 seconds” is{" "}
        <code>Crawl-delay: 2</code> under CCBot. <code>Crawl-delay</code> is
        not part of the robots exclusion standard, and Google’s crawlers do
        not document it as a rule they honor. Use it only as a request to
        an operator that documents it, and only with the number you actually
        want.
      </p>

      <h2>The accident that blocks everyone</h2>
      <p>
        This is the group we tell people to read before they read a score.
        It does not name GPTBot or anyone else. Every token without its own
        group, including the five on this page, falls through to it.
      </p>
      <pre className={preClass}>{`User-agent: *
Disallow: /`}</pre>
      <p>
        A staging template left in production looks like a policy. It is
        often a leftover. If the disallow is intentional, leave it and
        ignore a crawler score that punishes it. If it is not, replace it
        before you treat a missing citation as a writing problem. The longer
        note on how the audit records allow, disallow, and unspecified is
        the <Link href="/ai-crawlers">crawler page</Link>. That page’s trio
        is GPTBot, PerplexityBot, and Google-Extended. ClaudeBot and CCBot
        are not in it. You read those two in the file.
      </p>

      <h2>What you still cannot see from the file</h2>
      <ul>
        <li>
          A CDN or bot fight can return 403 after robots.txt says allow. The
          free check fetches the file. It does not impersonate each crawler.
        </li>
        <li>
          ChatGPT-User is a fetch a person started in ChatGPT. OpenAI says
          robots.txt may not apply, because a person started it. OAI-SearchBot
          is the token for ChatGPT search.
        </li>
        <li>
          Google-Extended will not show up as its own user-agent in logs.
          Googlebot (and Google’s other crawlers) do the fetch. The token
          only changes downstream use.
        </li>
        <li>
          An allow is not a citation. The page still needs a sentence a
          model can lift. That comparison is{" "}
          <Link href="/geo-vs-seo">GEO vs SEO</Link>.
        </li>
      </ul>

      <h2>Questions about the tokens</h2>
      {robotsFaqs.map((item) => (
        <div key={item.q}>
          <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Free check, then the $39 audit</h2>
      <p>
        Run the <Link href="/free-check">free check</Link> first. It looks
        at one host and reports whether the homepage responded, whether
        robots.txt allows or blocks GPTBot, PerplexityBot, and
        Google-Extended, whether <code>/llms.txt</code> is a non-empty text
        file, whether a sitemap is present, and which JSON-LD types appear
        on the homepage. A passing robots row means those three tokens are
        not disallowed. It does not mention ClaudeBot or CCBot, and it is
        not a live answer from ChatGPT or Perplexity.
      </p>
      <p>
        The <Link href="/geo-audit">$39 GEO audit</Link> is one public URL,
        a 0–100 CiteScore, and about ten prioritized fixes, as a PDF. The
        score comes from on-page signals — definitions, entities, evidence,
        schema, freshness, crawler access — and, when a language-model key
        is configured, a review of the HTML we fetched. We do not log into
        ChatGPT, Perplexity, Claude, or Google AI Overviews. The per-engine
        snapshot is an inference, and the report says so.
      </p>
      <p>
        Markup for the page those crawlers fetch is the other half of the
        same job. Organization, Product, FAQ, and Article JSON-LD examples
        are on the{" "}
        <Link href="/schema-markup-for-ai-search">schema guide</Link>.
      </p>
    </>
  );
}
