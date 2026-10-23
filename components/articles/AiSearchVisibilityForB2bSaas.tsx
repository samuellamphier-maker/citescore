import Link from "next/link";
import { GuideOffers } from "@/components/articles/GuideOffers";

const botsDoc = "https://developers.openai.com/api/docs/bots";
const perplexityCrawlers = "https://docs.perplexity.ai/docs/resources/perplexity-crawlers";
const aiGuide = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";
const claudeCrawlers =
  "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler";
const qaDocs = "https://developers.google.com/search/docs/appearance/structured-data/qapage";

export const b2bSaasFaqs = [
  {
    q: "Does a comparison page get a B2B product cited?",
    a: "No. It gives a crawler a sentence about a real difference. None of the four operators publishes a citation rate for that page. Google’s optimization guide says near-duplicate URLs written to chase query variations violate the scaled content abuse policy.",
  },
  {
    q: "Does llms.txt put a SaaS site into ChatGPT or AI Overviews?",
    a: "No. Google’s optimization guide, read on 21 October 2026, says Google Search ignores llms.txt. The file neither helps nor harms Google Search, including AI Overviews and AI Mode. OpenAI’s crawler overview and Anthropic’s crawler article do not require it. Keep it as a list for other readers. A missing file is not a block, and a present file is not a citation.",
  },
  {
    q: "Which schema type belongs on a SaaS homepage?",
    a: "Organization names the company. SoftwareApplication or Product names the product, using only a name and a price the page already shows. Google’s optimization guide says structured data is not required for AI Overviews. FAQPage fits questions the site itself answers. QAPage fits one support thread where people can submit answers. The script has to match the visible HTML.",
  },
  {
    q: "Does the free check query ChatGPT, Perplexity, Claude, or AI Overviews?",
    a: "No. The free check reads the homepage, robots.txt for GPTBot, PerplexityBot, and Google-Extended, a non-empty llms.txt, a sitemap, and JSON-LD types on the homepage. It does not read OAI-SearchBot or Claude-SearchBot, and it does not log into an answer engine. The $39 audit scores one public URL from the HTML we fetch. The per-engine snapshot is an inference, and the report says so.",
  },
];

export function AiSearchVisibilityForB2bSaasArticle() {
  return (
    <>
      <p>
        A B2B SaaS site is cited when an answer engine can fetch a page and find a sentence that answers the question.
        ChatGPT search, Perplexity search, Google AI Overviews, and Claude search each publish a crawler control. None
        of those pages publishes a citation rate for software companies, a required word count, or a schema type that
        turns a homepage into a footnote. CiteScore does not log into those products. The work on this page is crawler
        access, one comparison, docs and pricing in HTML, <code>llms.txt</code>, schema that matches the page, and a
        clear view of mentions you do not control.
      </p>
      <p>
        The shorter pass list is the{" "}
        <Link href="/ai-search-readiness-checklist-for-saas">AI search readiness checklist for SaaS</Link>. The engine
        pages are <Link href="/how-to-get-cited-by-chatgpt">ChatGPT</Link>,{" "}
        <Link href="/how-to-get-cited-by-perplexity">Perplexity</Link>,{" "}
        <Link href="/google-ai-overviews-optimization">Google AI Overviews</Link>, and{" "}
        <Link href="/how-to-get-cited-by-claude">Claude</Link>. A store’s markup problem is different, on{" "}
        <Link href="/ai-search-visibility-for-ecommerce">AI search visibility for ecommerce</Link>. A law
        firm’s office and practice pages are on{" "}
        <Link href="/ai-search-visibility-for-law-firms">AI search visibility for law firms</Link>. A clinic
        or health-tech site is on{" "}
        <Link href="/ai-search-visibility-for-healthcare">AI search visibility for healthcare</Link>. A brokerage, an agent, or a property manager is on <Link href="/ai-search-visibility-for-real-estate">AI search visibility for real estate</Link>. A restaurant’s location, menu, and hours are on <Link href="/ai-search-visibility-for-restaurants">AI search visibility for restaurants</Link>. An accounting, CPA, or bookkeeping firm is on <Link href="/ai-search-visibility-for-accountants">AI search visibility for accountants</Link>. A dental practice’s office, services, and hours are on <Link href="/ai-search-visibility-for-dentists">AI search visibility for dentists</Link>. A plumbing business’s office, service area, and hours are on <Link href="/ai-search-visibility-for-plumbers">AI search visibility for plumbers</Link>. An HVAC company’s office, service area, and hours are on <Link href="/ai-search-visibility-for-hvac">AI search visibility for HVAC</Link>. A roofing contractor’s office, service area, and hours are on <Link href="/ai-search-visibility-for-roofers">AI search visibility for roofers</Link>. An electrical contractor’s shop, service area, and hours are on <Link href="/ai-search-visibility-for-electricians">AI search visibility for electricians</Link>. A landscaping business’s office, service area, and hours are on <Link href="/ai-search-visibility-for-landscapers">AI search visibility for landscapers</Link>. An auto repair business’s shop, service area, and hours are on <Link href="/ai-search-visibility-for-auto-repair">AI search visibility for auto repair</Link>. A chiropractic office’s office, services, and hours are on <Link href="/ai-search-visibility-for-chiropractors">AI search visibility for chiropractors</Link>. An insurance agency’s office, lines of coverage, and hours are on <Link href="/ai-search-visibility-for-insurance-agents">AI search visibility for insurance agents</Link>.
      </p>

      <h2>Let the search crawler in</h2>
      <p>
        Blocking the search token keeps the site out of that product’s search answers. Allowing it does not promise a
        citation.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>What the operator page says</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">ChatGPT</th>
              <td>
                <a href={botsDoc}>OpenAI’s crawler overview</a>, read on 21 October 2026, says OAI-SearchBot is the
                search crawler. Opting out keeps a site out of ChatGPT search answers, though a navigational link can
                remain. GPTBot is the separate training crawler. ChatGPT-User is a person-triggered fetch, and OpenAI
                says it does not decide Search appearance. A robots.txt change can take about 24 hours.
              </td>
            </tr>
            <tr>
              <th scope="row">Perplexity</th>
              <td>
                Perplexity’s <a href={perplexityCrawlers}>crawler documentation</a> tells a publisher to allow
                PerplexityBot, and requests from its published IP ranges, for search results. Perplexity-User is a
                user-triggered fetch. The firewall files are on{" "}
                <Link href="/how-to-get-cited-by-perplexity">how to get cited by Perplexity</Link>.
              </td>
            </tr>
            <tr>
              <th scope="row">Google AI Overviews</th>
              <td>
                Google’s <a href={aiGuide}>optimization guide</a>, read on 21 October 2026, requires an indexed,
                snippet-eligible page and inclusion in Search generative AI features in Search Console. That does not
                guarantee indexing. AI Mode uses the same rule. Google-Extended does not change Search inclusion. See{" "}
                <Link href="/google-ai-overviews-optimization">AI Overviews</Link> and{" "}
                <Link href="/google-ai-mode-optimization">AI Mode</Link>.
              </td>
            </tr>
            <tr>
              <th scope="row">Claude</th>
              <td>
                <a href={claudeCrawlers}>Anthropic’s crawler article</a>, dated 7 April 2026, says the bots honor
                robots.txt. Claude-SearchBot is the search index. Disabling it may reduce visibility in search results.
                ClaudeBot is training. Claude-User fetches a page when a person asks. The split is{" "}
                <Link href="/how-to-get-cited-by-claude">how to get cited by Claude</Link>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Give each token its own group when <code>User-agent: *</code> already disallows the host. See{" "}
        <Link href="/robots-txt-for-ai-crawlers">robots.txt for AI crawlers</Link> and the{" "}
        <Link href="/robots-txt-ai-crawler-generator">robots.txt generator</Link>. An Allow line can still sit behind a
        firewall 403. OpenAI’s IP list for OAI-SearchBot is on the crawler overview. The wider table is{" "}
        <Link href="/ai-crawler-user-agents">AI crawler user agents</Link>.
      </p>

      <h2>One comparison a buyer can quote</h2>
      <p>
        Google’s optimization guide says a unique page does more over time than a commodity summary, and that a URL for
        every query variation violates the scaled content abuse policy. A folder of “versus” pages that only swap the
        competitor’s name is that pattern. Write one comparison you can stand behind.
      </p>
      <p>
        Name both products and say what each one does in sentences, not in a screenshot. Put the question in a heading,
        say who the page is for, and state a true limit. Leave out a competitor’s price, a rating, and a quote you do
        not have. None of the four operator pages publishes a freshness score.
      </p>
      <p>
        Put the comparison in the first HTML response. Google’s guide wants that content as text, and a page behind a
        demo form is one the crawler does not receive. Link one canonical URL from the homepage and from pricing. This
        site’s <Link href="/alternatives">alternatives</Link> index is one page per real difference.
      </p>

      <h2>Docs and pricing in the HTML</h2>
      <p>
        Buyers ask what the product does, what it costs, and where the limit is. Put those answers on the homepage, the
        pricing page, and the docs, under one product name. A marketing host, a docs host, and an app host can coexist
        when the homepage links to the other two and each page says what it is. “Acme” in the logo and “Acme Platform”
        in the H1 is a mismatch a quote will repeat.
      </p>
      <p>
        Publish a price as text. A number inside a screenshot is not the form Google describes, and a sales
        conversation should be a sentence that says who it is for. Do not invent a dollar amount in the HTML or in
        schema. A login-only docs article is not a public answer. If the docs app renders only in the browser, confirm
        the server still sends the HTML.
      </p>

      <h2>llms.txt is a reading list</h2>
      <p>
        <code>llms.txt</code>, usually at <code>/llms.txt</code>, is an optional Markdown list of URLs. Google’s
        optimization guide says Google Search ignores it, so the file neither helps nor harms AI Overviews, AI Mode, or
        other Google Search rankings. OpenAI’s overview and Anthropic’s article do not require it. A missing file is
        not a block, and a present file is not a citation.
      </p>
      <p>
        For a SaaS list, link the homepage, pricing, the docs index, one comparison, and a public security page. Use
        canonical URLs, and leave out login walls and tag pages. The{" "}
        <Link href="/llms-txt-generator">llms.txt generator</Link> copies the shape in the browser. Section order is on{" "}
        <Link href="/llms-txt-best-practices">llms.txt best practices</Link>. The{" "}
        <Link href="/llms-txt">checker</Link> only looks for a non-empty file. Ten live files are on{" "}
        <Link href="/llms-txt-examples">llms.txt examples</Link>.
      </p>

      <h2>Schema that copies the page</h2>
      <p>
        Google’s optimization guide says structured data is not required for AI Overviews, and that there is no special
        schema.org type to add. Use it when it repeats a visible fact, including the price. The crawler pages above do
        not list a required type, and the script does not create a citation.
      </p>
      <p>
        Organization names the company. SoftwareApplication names the app. Product names an offer. The{" "}
        <Link href="/organization-schema-generator">Organization</Link>,{" "}
        <Link href="/software-application-schema-generator">software application</Link>, and{" "}
        <Link href="/product-schema-generator">product</Link> generators build those scripts in the browser. Leave a
        rating or a price blank when the page does not show it.
      </p>
      <p>
        FAQPage is for questions the site itself answers, visible on the page. Google stopped showing FAQ rich results
        in May 2026. The <Link href="/faq-schema-generator">FAQ schema generator</Link> writes that script. QAPage is
        one question followed by answers people can submit. Google’s <a href={qaDocs}>QAPage documentation</a>, last
        updated 8 September 2026 and read on 21 October 2026, allows a forum or support thread and rejects a
        company-written FAQ, a blog post, a how-to, and a product page full of questions. schema.org also mentions
        FAQs, which is wider than Google’s rule. Use the{" "}
        <Link href="/qa-page-schema-generator">QAPage schema generator</Link> only on a forum you run. Other types are
        on the <Link href="/schema-markup-for-ai-search">schema guide</Link>. A docs page with a visible headline, date,
        and byline can use Article. A team name such as CiteScore Team is an Organization.
      </p>

      <h2>Mentions on pages you do not control</h2>
      <p>
        Google’s optimization guide says AI features can repeat what blogs, videos, and forums say about a product, and
        that seeking inauthentic mentions is a weak tactic. Ranking systems prefer high-quality pages, and other
        systems block spam. CiteScore does not sell mentions.
      </p>
      <p>
        “Best tool for X” is often answered from a review, a forum, or a partner’s docs. You cannot edit those from
        your deploy. You can keep one product name so their mention and your H1 match, and a public reply from your
        team can state the product and its limit without handing customers a line to paste. That thread’s QAPage
        belongs on their site. To see whether ChatGPT names the brand, repeat the same prompts and keep a log, as on{" "}
        <Link href="/how-to-check-if-chatgpt-mentions-your-brand">how to check if ChatGPT mentions your brand</Link>.
        The free check does not run those prompts.
      </p>

      <h2>A workable order</h2>
      <ol>
        <li>
          Allow OAI-SearchBot, PerplexityBot, Claude-SearchBot, and Googlebot on purpose. Decide GPTBot, ClaudeBot, and
          Google-Extended separately, and confirm the firewall is not returning 403.
        </li>
        <li>State the name, the audience, and what the product does in homepage HTML, and link pricing and docs.</li>
        <li>Publish the price as text, or say that the price is a conversation.</li>
        <li>Publish one comparison, on one URL.</li>
        <li>
          Add Organization plus SoftwareApplication or Product JSON-LD from visible facts. Use FAQPage for the site’s
          own questions, and QAPage only where people can answer.
        </li>
        <li>Add <code>/llms.txt</code> only as a curated list for readers other than Google Search.</li>
        <li>Submit the sitemap, and confirm Search Console includes the site in generative AI features.</li>
        <li>Where a third-party page is wrong, fix the fact on your URL, and correct theirs only if you can.</li>
      </ol>
      <p>
        These steps make a sentence fetchable. They are not a citation. The longer on-page list is the{" "}
        <Link href="/checklist">AI Citation Readiness Checklist</Link>.
      </p>

      <GuideOffers
        freeCheck={
          <>
            Run the <Link href="/free-check">free check</Link> on the marketing host. It reads the homepage, GPTBot,
            PerplexityBot, Google-Extended, <code>llms.txt</code>, a sitemap, and homepage JSON-LD. It does not read
            OAI-SearchBot or Claude-SearchBot, and it does not query an answer engine. For a pricing or comparison URL,
            use the <Link href="/geo-audit">$39 GEO audit</Link>. The homepage check does not open that path.
          </>
        }
      />

      <h2>Questions about B2B SaaS visibility</h2>
      {b2bSaasFaqs.map((item) => (
        <div key={item.q}>
          <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={botsDoc}>Overview of OpenAI Crawlers</a>, read 21 October 2026. OAI-SearchBot, GPTBot, and
          ChatGPT-User.
        </li>
        <li>
          <a href={perplexityCrawlers}>Perplexity Crawlers</a>. PerplexityBot and Perplexity-User.
        </li>
        <li>
          <a href={aiGuide}>Google’s generative AI optimization guide</a>, read 21 October 2026. Snippets,{" "}
          <code>llms.txt</code>, schema, and mentions.
        </li>
        <li>
          <a href={claudeCrawlers}>Anthropic’s crawler article</a>, dated 7 April 2026. ClaudeBot, Claude-SearchBot, and
          Claude-User.
        </li>
        <li>
          <a href={qaDocs}>QAPage structured data</a>, last updated 8 September 2026, read 21 October 2026.
        </li>
      </ul>
    </>
  );
}
