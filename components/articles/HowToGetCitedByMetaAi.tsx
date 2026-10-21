import Link from "next/link";
import { CheckLinks, preClass } from "@/components/articles/guide-links";

const crawlersDoc =
  "https://developers.facebook.com/documentation/sharing/webmasters/web-crawlers";

export const metaAiFaqs = [
  {
    q: "Does allowing Meta-WebIndexer guarantee a citation in Meta AI?",
    a: "No. Meta’s crawler page says allowing Meta-WebIndexer helps Meta cite and link to your content in Meta AI’s responses. It does not publish a citation rate, a required schema type, or a word count, and it does not say that an allowed page is quoted in WhatsApp, Instagram, Facebook, and on meta.ai. An allow is permission to fetch. The mention is still the model’s decision after a fetch.",
  },
  {
    q: "Is FacebookBot the robots.txt token for Meta AI?",
    a: "Not on the crawler page read for this guide. On 18 October 2026 that page lists FacebookExternalHit, Meta-WebIndexer, Meta-ExternalAds, Meta-ExternalAgent, and Meta-ExternalFetcher. It does not list FacebookBot. A group written for a name Meta does not publish is not the control on that page. If Meta later documents FacebookBot and says what disallowing it does, that page becomes the source.",
  },
  {
    q: "Does blocking Meta-ExternalAgent remove a site from Meta AI answers?",
    a: "Meta does not say that. Meta-ExternalAgent is the crawler Meta describes for training foundation models or improving products by indexing content directly. Meta-WebIndexer is the crawler Meta ties to citations in Meta AI responses. A robots.txt group for one token does not write the other. Meta does not say Meta-WebIndexer ignores robots.txt. Meta does say Meta-ExternalFetcher may bypass the file because a person requested the fetch, and that FacebookExternalHit might bypass it for security checks.",
  },
  {
    q: "Does Meta require WebSite schema or an llms.txt file?",
    a: "No. Meta’s crawler page does not list a schema type or an llms.txt file. WebSite and Organization JSON-LD repeat the name and URL a person can already see. They are not a Meta switch. The free check reads GPTBot, PerplexityBot, and Google-Extended. It does not read meta-webindexer, and it does not log into Meta AI.",
  },
];

export function HowToGetCitedByMetaAiArticle() {
  return (
    <>
      <p>
        Meta publishes a crawler page for the user agents that fetch other
        people’s sites. That page is the public rule for how Meta prefers to
        be told yes or no. It is not a ranking formula. Meta does not publish
        a citation rate, a required schema type, or a word count. CiteScore
        does not log into Meta AI, WhatsApp, Instagram, Facebook, or meta.ai.
        The claims below are from{" "}
        <a href={crawlersDoc}>Meta’s web crawlers documentation</a>, read on
        18 October 2026.
      </p>
      <p>
        Meta AI answers in WhatsApp, Instagram, Facebook, and on meta.ai.
        Meta’s crawler page describes one set of crawlers for Meta AI
        responses. It does not publish a separate robots.txt token for each
        of those products, and it does not say that a page allowed for one
        crawler is quoted in every app. The same kind of split — a published
        control, and the files the operator does not require — is written up
        for{" "}
        <Link href="/how-to-get-cited-by-chatgpt">ChatGPT</Link>,{" "}
        <Link href="/how-to-get-cited-by-perplexity">Perplexity</Link>,{" "}
        <Link href="/how-to-get-cited-by-claude">Claude</Link>,{" "}
        <Link href="/how-to-get-cited-by-gemini">Gemini</Link>,{" "}
        <Link href="/how-to-get-cited-by-copilot">Microsoft Copilot</Link>,{" "}
        <Link href="/how-to-get-cited-by-grok">Grok</Link>,{" "}
        <Link href="/how-to-get-cited-by-deepseek">DeepSeek</Link>,{" "}
        <Link href="/how-to-get-cited-by-mistral">Mistral</Link>,{" "}
        <Link href="/how-to-get-cited-by-brave-search">Brave Search</Link>, and{" "}
        <Link href="/how-to-get-cited-by-you-com">You.com</Link>, and{" "}
        <Link href="/how-to-get-cited-by-duckduckgo-ai">DuckDuckGo</Link>, and{" "}<Link href="/how-to-get-cited-by-perplexity-comet">Perplexity Comet</Link>. The short map
        is{" "}
        <Link href="/how-to-get-cited-by-ai-answer-engines">
          how to get cited by AI answer engines
        </Link>
        .
      </p>

      <h2>Five crawlers, and only one is tied to a citation</h2>
      <p>
        The page names five user agents. The product token in a heading is
        not always the spelling in robots.txt. Meta’s own example uses the
        lowercase token <code>meta-externalagent</code>. robots.txt matching
        is case-insensitive. The groups below use the spelling Meta
        publishes in that example and in the user-agent strings.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>What Meta says it does</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">meta-webindexer</th>
              <td>
                Navigates the web to improve Meta AI search result quality.
                Meta says allowing Meta-WebIndexer in robots.txt helps Meta
                cite and link to your content in Meta AI’s responses. The
                user-agent string begins <code>meta-webindexer/1.1</code>.
              </td>
            </tr>
            <tr>
              <th scope="row">meta-externalagent</th>
              <td>
                Crawls for uses such as training foundation models or
                improving products by indexing content directly. Meta does
                not describe this token as the citation switch. The string
                begins <code>meta-externalagent/1.1</code>.
              </td>
            </tr>
            <tr>
              <th scope="row">meta-externalfetcher</th>
              <td>
                Fetches individual links a person requested, including
                agentic tasks. Meta says this crawler may bypass robots.txt.
                A disallow is not a lock.
              </td>
            </tr>
            <tr>
              <th scope="row">facebookexternalhit</th>
              <td>
                Builds the title, description, and thumbnail when a link is
                shared on Facebook, Instagram, or Messenger. Meta says it
                might bypass robots.txt for security or integrity checks,
                such as looking for malware. That is a preview fetch, not a
                Meta AI citation.
              </td>
            </tr>
            <tr>
              <th scope="row">meta-externalads</th>
              <td>
                Crawls for advertising and other business products. Meta
                does not tie this token to citations in Meta AI answers.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Allow the crawler Meta names for citations</h2>
      <p>
        A crawler that honors robots.txt uses the group that names its
        token. It uses <code>User-agent: *</code> only when it has no group
        of its own. If the wildcard group already allows the host, you do
        not need a second group to allow Meta-WebIndexer. If the wildcard
        group is <code>Disallow: /</code>, add a group that names the token
        or the disallow applies to it.
      </p>
      <pre className={preClass}>{`User-agent: meta-webindexer
Allow: /

User-agent: meta-externalagent
Allow: /
Disallow: /private/`}</pre>
      <p>
        The first group is the citation request: let Meta-WebIndexer fetch
        the host. The second group is Meta’s own example for
        Meta-ExternalAgent, which allows the host and disallows one private
        path. Copy any private path you still want blocked into a named
        group. A named group does not inherit the wildcard rules. Meta says
        to allow up to 24 hours for a robots.txt change, because crawlers
        may cache the file for that long.
      </p>
      <p>
        Allowing Meta-WebIndexer does not require a decision about training.
        Meta describes Meta-ExternalAgent separately, and a group for one
        token does not write the other. Meta does not say the two share a
        crawl, and it does not say that blocking Meta-ExternalAgent removes
        a page from Meta AI answers. Treat them as two requests. Meta does
        not say Meta-WebIndexer or Meta-ExternalAgent bypass robots.txt. It
        does say Meta-ExternalFetcher may, because a person asked for the
        fetch, and that FacebookExternalHit might, for a security check.
        robots.txt is not a firewall. A WAF can still return 403 after the
        file says allow.
      </p>
      <p>
        The wider token list, including Meta-ExternalAgent as it was
        recorded for the reference table, is the{" "}
        <Link href="/ai-crawler-user-agents">AI crawler user-agent reference</Link>.
        The five tokens on the{" "}
        <Link href="/robots-txt-for-ai-crawlers">robots.txt guide</Link> are
        GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and CCBot. Meta’s
        tokens are not in that list.
      </p>

      <h2>FacebookBot is not on the current page</h2>
      <p>
        Older publisher notes sometimes tell you to allow or block{" "}
        <code>FacebookBot</code> for Meta’s AI crawl. Meta’s crawler page,
        read on 18 October 2026, does not list that token. It lists the five
        above. This guide does not treat FacebookBot as the control for Meta
        AI citations, and it does not invent a robots.txt behavior for a
        name the page does not document. If your logs show a client calling
        itself FacebookBot, that string can be spoofed. Confirm it the way
        you would confirm any other user agent before you write a rule for
        it. If Meta later publishes FacebookBot and says what a disallow
        does, that documentation replaces this paragraph.
      </p>

      <h2>Put the entity in the HTML</h2>
      <p>
        Meta’s page describes a fetch of public pages. It does not describe
        a preferred heading length. Put the site name, what the site does,
        and who it is for in the HTML of the homepage, in the title, the
        first paragraph, and the footer, using the same name in each place.
        A fact that exists only in an image, or only after JavaScript runs,
        is a fact many crawlers never read. Meta does not say its crawlers
        execute JavaScript. Text in the server HTML still travels either
        way.
      </p>
      <p>
        WebSite JSON-LD repeats that name, the canonical URL, an alternate
        name the page already uses, and the publisher. Organization JSON-LD
        repeats the publisher’s logo and profiles. Meta does not require
        either script. They are labels for a parser, not a switch on
        meta.ai. The{" "}
        <Link href="/website-schema-generator">WebSite schema generator</Link>{" "}
        and the{" "}
        <Link href="/organization-schema-generator">
          Organization schema generator
        </Link>{" "}
        copy those fields in the browser. The field list, and what to leave
        out, is the{" "}
        <Link href="/schema-markup-for-ai-search">schema guide</Link>.
      </p>

      <h2>Answer the question in the first paragraph</h2>
      <p>
        A page that is fetched still has to contain the sentence an answer
        could quote. State the answer before the navigation, the pricing
        table, or a story about the company. Use the question a person would
        ask as a heading when that question is the point of the page. Meta
        does not publish a word count for that sentence, and this page does
        not invent one. Specific names, dates, and the source of a number
        are easier to attribute than a slogan.
      </p>

      <h2>Third-party mentions are not a documented switch</h2>
      <p>
        Meta’s crawler page does not say that a Wikipedia article, a review,
        or a directory listing causes a citation in Meta AI. A page someone
        else publishes can be fetched on its own. That is a separate URL,
        not a ranking factor Meta has written down. What you can control is
        consistency: the same name on your homepage and on profiles you
        actually own, linked with <code>sameAs</code> only when the profile
        is yours. Two sites that describe the same product under two names
        give a model two entities to choose from. Aligning the name is
        entity clarity. It is not a citation guarantee.
      </p>

      <CheckLinks>
        The free check reports GPTBot, PerplexityBot, and Google-Extended.
        It does not read meta-webindexer, meta-externalagent, or
        FacebookBot. A clear row on that check is not a Meta AI citation.
        The <Link href="/geo-audit">$39 GEO audit</Link> scores one public
        URL from the HTML we fetch and returns about ten fixes. It does not
        open WhatsApp, Instagram, Facebook, or meta.ai.
      </CheckLinks>

      <h2>Questions about Meta AI citations</h2>
      {metaAiFaqs.map((item) => (
        <div key={item.q}>
          <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}

      <h2>Sources</h2>
      <ul>
        <li>
          <a href={crawlersDoc}>Meta web crawlers</a>. FacebookExternalHit,
          Meta-WebIndexer, Meta-ExternalAds, Meta-ExternalAgent, and
          Meta-ExternalFetcher, including the sentence that allowing
          Meta-WebIndexer helps Meta cite and link in Meta AI responses, the
          robots.txt example, and the note that changes can take up to 24
          hours. Read 18 October 2026.
        </li>
      </ul>
    </>
  );
}
