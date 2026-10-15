import Link from "next/link";
import { GuideOffers } from "@/components/articles/GuideOffers";

export function AiSearchReadinessChecklistForSaasArticle() {
  return (
    <>
      <p>
        This is a pass list for a SaaS marketing site. Each item is a
        control OpenAI, Perplexity, or Google Search Central has published,
        applied to a homepage, a pricing page, and a docs URL. It is not a
        citation forecast. None of the three publishes a rate for how often
        a passing page is quoted.
      </p>
      <p>
        The longer on-page list, forty checks including writing and markup
        that go past these vendor docs, is the{" "}
        <Link href="/checklist">AI Citation Readiness Checklist</Link>. Use
        both. Where a crawler token is described differently, the vendor
        page wins, and the items below follow the vendor page. The engine
        essays are{" "}
        <Link href="/how-to-get-cited-by-chatgpt">ChatGPT</Link>,{" "}
        <Link href="/how-to-get-cited-by-perplexity">Perplexity</Link>,{" "}
        <Link href="/google-ai-overviews-optimization">
          Google AI Overviews
        </Link>
        , and{" "}
        <Link href="/google-ai-mode-optimization">Google AI Mode</Link>.
        Grok’s documented web citations, which do not include a robots.txt
        token, are on{" "}
        <Link href="/how-to-get-cited-by-grok">how to get cited by Grok</Link>
        .
      </p>

      <h2>ChatGPT search</h2>
      <ul>
        <li>
          <strong>OAI-SearchBot may fetch the public host.</strong> OpenAI
          says a site opted out of OAI-SearchBot will not be shown in
          ChatGPT search answers, though it can still appear as a
          navigational link. Give the token its own group if{" "}
          <code>User-agent: *</code> disallows the whole site.
        </li>
        <li>
          <strong>GPTBot is a separate decision.</strong> OpenAI says the
          settings are independent. Disallowing GPTBot opts the site out of
          training use. It is not the search switch.
        </li>
        <li>
          <strong>ChatGPT-User is the person-triggered fetch.</strong>{" "}
          OpenAI says it is not an automatic crawl, robots.txt rules may not
          apply, and it is not used to decide Search appearance.
        </li>
        <li>
          <strong>The published IP ranges can connect.</strong> OpenAI
          recommends allowing OAI-SearchBot in robots.txt and allowing
          requests from{" "}
          <a href="https://openai.com/searchbot.json">searchbot.json</a>. A
          403 from the firewall is still a block. Search adjustments after
          a robots.txt change can take about 24 hours.
        </li>
      </ul>

      <h2>Perplexity search</h2>
      <ul>
        <li>
          <strong>PerplexityBot may fetch the public host.</strong>{" "}
          Perplexity says this is the crawler that surfaces and links sites
          in Perplexity search, and that it is not the training crawler.
          Perplexity recommends allowing it.
        </li>
        <li>
          <strong>The WAF allows the user-agent and the current IPs.</strong>{" "}
          Perplexity’s crawler page tells you to combine the user-agent with
          the ranges in{" "}
          <a href="https://www.perplexity.com/perplexitybot.json">
            perplexitybot.json
          </a>{" "}
          and{" "}
          <a href="https://www.perplexity.com/perplexity-user.json">
            perplexity-user.json
          </a>
          , and to refresh those ranges. Robots changes can take up to 24
          hours.
        </li>
        <li>
          <strong>Perplexity-User is not a second robots switch.</strong>{" "}
          Perplexity says that fetcher generally ignores robots.txt, because
          a person asked the question, and that it might visit a page and
          link it.
        </li>
      </ul>

      <h2>Google AI Overviews and AI Mode</h2>
      <ul>
        <li>
          <strong>Googlebot can crawl the page, and the page can show a snippet.</strong>{" "}
          Google says that is the eligibility rule for a supporting link in
          AI Overviews or AI Mode. <code>noindex</code> and{" "}
          <code>nosnippet</code> take a page out of that set. There is no
          extra technical requirement, and meeting the rule does not
          guarantee indexing.
        </li>
        <li>
          <strong>Search Console is set to include the site.</strong> The
          optimization guide says a site must be included in Search
          generative AI features in Search Console. Include is the default.
          The control covers AI Overviews, AI Mode, and generative AI
          features in Discover.
        </li>
        <li>
          <strong>Google-Extended is decided on its own.</strong> Google
          says that token does not change Search inclusion or ranking. It
          governs Gemini training and grounding. Leaving AI Overviews is
          the Search Console control, not this token.
        </li>
        <li>
          <strong>The important sentences are text.</strong> Google’s list
          for these features includes important content in textual form,
          internal links, and structured data that matches the visible text
          if you use structured data. There is no special schema type to
          add, and Google says an <code>llms.txt</code> file neither helps
          nor harms Google Search.
        </li>
        <li>
          <strong>The page is one a customer needed.</strong> Google says a
          unique, first-hand page does more over time than a commodity
          summary, and that publishing a URL for every query variation in
          order to chase fan-out queries violates the scaled content abuse
          policy.
        </li>
      </ul>

      <h2>On a SaaS site, that looks like this</h2>
      <ul>
        <li>
          <strong>One host.</strong> Google’s optimization guide says
          duplicate URLs waste crawling and make a worse page. The
          marketing site, the docs, and the pricing page should agree which
          host is canonical, and the homepage should link to the other two.
        </li>
        <li>
          <strong>The homepage says what the product is, in HTML.</strong>{" "}
          The name, who it is for, and what it does, as text. Google’s
          requirement is textual content, not a slogan inside an image. A
          login wall on that explanation means a crawler does not receive
          it.
        </li>
        <li>
          <strong>The price is text, if you publish a price.</strong> A
          number inside a screenshot is not the textual form Google
          describes. Docs that only render after JavaScript still need to
          follow Google’s JavaScript SEO guidance: Google says it can
          process JavaScript when the scripts are not blocked, and that
          those sites are harder to keep eligible.
        </li>
        <li>
          <strong>One comparison you can stand behind.</strong> Google’s
          example of non-commodity content is a specific account, not a
          rewritten list of tips. A single page about how your product
          differs, written from the product, fits that description. A
          cluster of near-duplicate “versus” URLs is the pattern the scaled
          content abuse note is about.
        </li>
        <li>
          <strong>Schema copies the page.</strong> If the homepage has
          Organization or Product JSON-LD, the name and the price in the
          script match the name and the price in the HTML. Google says
          markup is not required for AI Overviews. OpenAI’s crawler
          overview and Perplexity’s crawler page do not list a schema type.
        </li>
      </ul>
      <p>
        Walk the same ground in more detail on the{" "}
        <Link href="/checklist">40-point checklist</Link>. That page stores
        checkmarks in the browser and does not submit the URL.
      </p>

      <GuideOffers
        freeCheck={
          <>
            Run the <Link href="/free-check">free check</Link> on the
            marketing host. It reports homepage HTML, robots.txt for GPTBot,
            PerplexityBot, and Google-Extended, a non-empty{" "}
            <code>llms.txt</code>, a sitemap, and JSON-LD types on the
            homepage. It does not read OAI-SearchBot, Perplexity-User, or
            the Search Console generative AI control. Those three are still
            on you. A passing row is a signal on the file. It is not a live
            answer from any of the three engines.
          </>
        }
      />

      <h2>Sources</h2>
      <ul>
        <li>
          <a href="https://developers.openai.com/api/docs/bots">
            Overview of OpenAI Crawlers
          </a>
          . OAI-SearchBot, GPTBot, ChatGPT-User, and the published IP list.
        </li>
        <li>
          <a href="https://docs.perplexity.ai/docs/resources/perplexity-crawlers">
            Perplexity Crawlers
          </a>
          . PerplexityBot, Perplexity-User, and the WAF guidance.
        </li>
        <li>
          <a href="https://developers.google.com/search/docs/appearance/ai-features">
            AI features and your website
          </a>{" "}
          and{" "}
          <a href="https://developers.google.com/search/docs/fundamentals/ai-optimization-guide">
            optimizing for generative AI features on Google Search
          </a>
          , Google Search Central. Eligibility, textual content,{" "}
          <code>llms.txt</code>, schema, and scaled content abuse.
        </li>
        <li>
          <a href="https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers">
            Google-Extended
          </a>{" "}
          and the{" "}
          <a href="https://support.google.com/webmasters/answer/16908024?hl=en">
            Search generative AI control
          </a>
          .
        </li>
      </ul>
    </>
  );
}
