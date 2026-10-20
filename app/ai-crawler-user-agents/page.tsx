import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { CopySnippet } from "@/components/CopySnippet";
import { JsonLd } from "@/components/JsonLd";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { aiCrawlerAgents } from "@/lib/content/ai-crawler-user-agents";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";
import { publicOrigin } from "@/lib/site";

const topic = getTopic("/ai-crawler-user-agents");

const faqs = [
  {
    q: "If User-agent: * allows the site, are these tokens allowed?",
    a: "Only when that token has no group of its own. A crawler that honors robots.txt uses the group that names it, and uses User-agent: * when it has no group. An Allow on * does not override a Disallow written under the token. Several user-triggered fetchers are a separate case: OpenAI says ChatGPT-User may not follow robots.txt, and Perplexity says Perplexity-User generally ignores it.",
  },
  {
    q: "Does blocking GPTBot remove a site from ChatGPT search?",
    a: "No. OpenAI documents GPTBot and OAI-SearchBot as independent. GPTBot is the crawl that may be used to train generative models. OAI-SearchBot is the search crawler. A site opted out of OAI-SearchBot is not shown in ChatGPT search answers, though it can still appear as a navigational link. The same split exists elsewhere: ClaudeBot does not write Claude-SearchBot or Claude-User, and PerplexityBot does not write Perplexity-User.",
  },
  {
    q: "Which of these tokens does the free check read?",
    a: "The free check reads GPTBot, PerplexityBot, and Google-Extended. The $39 audit scores that same trio. The robots.txt generator writes OAI-SearchBot, ChatGPT-User, GPTBot, PerplexityBot, ClaudeBot, and Google-Extended. This table is wider than both. A token that is not in the check can still be allow, disallow, or unspecified in your file.",
  },
  {
    q: "What should I do when the operator has not documented the token?",
    a: "Say so, and do not treat a third-party list as the operator’s promise. Bytespider and cohere-ai are in that state on this page. You can still publish a robots.txt group. Check your logs afterward. robots.txt is a request a well-behaved crawler can honor. It is not a firewall.",
  },
];

const related = [
  { href: "/ai-crawlers", label: "GPTBot, PerplexityBot, and Google-Extended" },
  { href: "/ai-crawler-robots-txt-checker", label: "AI crawler robots.txt checker" },
  { href: "/robots-txt-ai-crawler-generator", label: "robots.txt AI crawler generator" },
  { href: "/robots-txt-for-ai-crawlers", label: "robots.txt for AI crawlers" },
  { href: "/how-to-get-cited-by-mistral", label: "How to get cited by Mistral" },
  { href: "/how-to-get-cited-by-brave-search", label: "How to get cited by Brave Search" },
  { href: "/how-to-get-cited-by-you-com", label: "How to get cited by You.com" },
  { href: "/how-to-get-cited-by-duckduckgo-ai", label: "How to get cited by DuckDuckGo" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function AiCrawlerUserAgentsPage() {
  const origin = publicOrigin();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: topic.title,
          description: topic.description,
          url: `${origin}${topic.path}`,
        }}
      />
      <ArticleShell
        kicker={topic.kicker}
        title={topic.title}
        dek={topic.description}
        publishedAt={topic.publishedAt}
        minutes={topic.minutes}
        author="CiteScore Team"
        ctaId="ai-crawler-user-agents"
        related={related}
      >
        <p>
          Each row is a user-agent token an operator has published, or a token people write when the operator has not
          published one. The purpose and the robots.txt cell are limited to what that operator’s public docs say.
          Operator pages linked from the table were read on 18 October 2026. A vendor can change a token without notice.
        </p>
        <p>
          The <Link href="/ai-crawler-robots-txt-checker">robots.txt checker</Link> sends you to the{" "}
          <Link href="/free-check">free check</Link>, which reads GPTBot, PerplexityBot, and Google-Extended on the live
          file. The <Link href="/robots-txt-ai-crawler-generator">robots.txt generator</Link> writes allow or block
          groups for OAI-SearchBot, ChatGPT-User, GPTBot, PerplexityBot, ClaudeBot, and Google-Extended. The{" "}
          <Link href="/geo-audit">$39 audit</Link> scores that same three-token crawler dimension. It does not log into
          ChatGPT, Claude, Perplexity, or Google.
        </p>

        <h2>The tokens</h2>
        <p>
          A named group does not inherit <code>User-agent: *</code>. If you disallow a private path for everyone, repeat
          that path inside the named group. The snippet is one group, not a complete file. Merge it with the Sitemap
          line and the Googlebot rules you already have. Replacing the whole file can drop a rule you meant to keep.
          robots.txt user-agent matching is case-insensitive. The snippet uses the spelling the operator publishes.
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Operator</th>
                <th>Purpose</th>
                <th>robots.txt</th>
                <th>Snippet</th>
              </tr>
            </thead>
            <tbody>
              {aiCrawlerAgents.map((agent) => (
                <tr key={agent.token}>
                  <th scope="row">{agent.token}</th>
                  <td>
                    {agent.operator}
                    <div className="mt-2">
                      <a href={agent.sourceHref} target="_blank" rel="noopener noreferrer">
                        {agent.sourceLabel}
                      </a>
                    </div>
                  </td>
                  <td>{agent.purpose}</td>
                  <td>{agent.robots}</td>
                  <td>
                    <pre className="whitespace-pre-wrap font-mono text-xs leading-5 text-ink">{agent.snippet}</pre>
                    <p className="mt-2 text-xs text-ink-soft">{agent.snippetNote}</p>
                    <CopySnippet value={agent.snippet} label={`Copy the robots.txt group for ${agent.token}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>What the docs do not settle</h2>
        <p>
          Perplexity’s crawler documentation is the source for the PerplexityBot and Perplexity-User rows. Their help
          center article, “How does Perplexity follow robots.txt?”, adds a detail the crawler page does not: PerplexityBot
          will not index the full or partial text of a page disallowed in robots.txt, and may still index the domain, the
          title, and a short factual summary. The English URL of that article returned an access challenge on 18 October
          2026. The sentence is from the Spanish and Chinese versions of the same article, which say they were last
          modified on 14 September 2026. If those versions and the English page ever disagree, use the English page.
        </p>
        <p>
          Bytespider is included because server logs and third-party lists use the token. ByteDance’s public webmaster
          site did not return a readable crawler policy in the HTML, so the purpose and the robots.txt promise are
          blank on purpose. cohere-ai is included for the same reason. Cohere’s crawler page says they do not currently
          crawl to train foundation models, lists no live bot, and the example they publish is <code>Coherebot</code>.
          Writing <code>cohere-ai</code> into robots.txt is a request to a token Cohere has not documented.
        </p>
        <p>
          Bingbot is Microsoft’s search crawler. This table does not call it a generative-model training token, because
          Microsoft’s crawler docs do not. Google-Extended and Applebot-Extended are control tokens. They do not show up
          as their own user-agent in an access log. Meta’s user-triggered fetcher is Meta-ExternalFetcher, which Meta
          says may bypass robots.txt. It is a different token from Meta-ExternalAgent and is not a row above. The token
          Meta’s crawler page ties to citations in Meta AI responses is Meta-WebIndexer, also not a row above. The
          longer note, including why this page does not treat FacebookBot as that control, is{" "}
          <Link href="/how-to-get-cited-by-meta-ai">how to get cited by Meta AI</Link>.
          DeepSeek is not a row in the table. The Search and Fetch guide does not name a user-agent, and this page
          does not add one from a third-party list. The note is{" "}
          <Link href="/how-to-get-cited-by-deepseek">how to get cited by DeepSeek</Link>.
          Mistral’s crawler page names MistralAI-User, MistralAI-Index, and MistralAI-Training. The note is{" "}
          <Link href="/how-to-get-cited-by-mistral">how to get cited by Mistral</Link>.
          Brave’s crawler page does not advertise a differentiated user agent.
          It says a page Googlebot cannot crawl is a page Brave will not crawl.
          This table does not add a Brave token. The note is{" "}
          <Link href="/how-to-get-cited-by-brave-search">how to get cited by Brave Search</Link>.
          You.com’s Web Search API page and Answer API guide do not name a robots.txt token.
          This table does not add one. The note is{" "}
          <Link href="/how-to-get-cited-by-you-com">how to get cited by You.com</Link>.
          DuckAssistBot is the token DuckDuckGo publishes for AI-assisted answers.
          DuckDuckBot is the search crawler. The note is{" "}
          <Link href="/how-to-get-cited-by-duckduckgo-ai">how to get cited by DuckDuckGo</Link>.
        </p>

        <h2>Questions about the tokens</h2>
        {faqs.map((item) => (
          <div key={item.q}>
            <h3 className="font-serif text-xl text-ink">{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}
        <ToolNextLinks />
      </ArticleShell>
    </>
  );
}
