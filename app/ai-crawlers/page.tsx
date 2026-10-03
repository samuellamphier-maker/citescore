import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";
import { publicOrigin } from "@/lib/site";

const topic = getTopic("/ai-crawlers");

const faqs = [
  {
    q: "What does unspecified mean?",
    a: "We did not find a matching group for that agent, and there was no User-agent: * group to fall back to. A missing robots.txt also comes back unspecified. Unspecified is not the same as Disallow.",
  },
  {
    q: "If User-agent: * allows the site, do the three tokens show allow?",
    a: "Yes. When an agent has no group of its own, we apply the * group. An Allow, or a * group that does not block /, is recorded as allow. A * group with Disallow: / is recorded as disallow for each of the three tokens.",
  },
  {
    q: "Will you tell me to block training bots?",
    a: "No. Opting out of GPTBot or Google-Extended is a policy choice. The audit records it and, for a disallow, lowers the crawler dimension. If the block is intentional, ignore that slice of the score. If it is a leftover from a staging template, remove it before you read the ChatGPT row as a verdict on your copy.",
  },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function AiCrawlersPage() {
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
        title="Three robots.txt tokens the audit actually reads"
        dek={topic.description}
        publishedAt={topic.publishedAt}
        minutes={topic.minutes}
        ctaId="ai-crawlers"
        related={[
          { href: "/llms-txt", label: "llms.txt — the other crawler-access check" },
          { href: "/chatgpt-citation-check", label: "How GPTBot affects the ChatGPT row" },
          { href: "/ai-overviews", label: "Google-Extended and AI Overviews" },
          { href: "/perplexity-citations", label: "Perplexity citations" },
          { href: "/geo-audit", label: "GEO audit" },
        ]}
      >
        <p>
          A <Link href="/geo-audit">CiteScore audit</Link> requests{" "}
          <code>/robots.txt</code> on the host you paid for and records three
          policies: GPTBot, PerplexityBot, and Google-Extended. Each one is
          allow, disallow, or unspecified. That trio is the AI-crawler
          dimension, together with whether <Link href="/llms-txt">/llms.txt</Link>{" "}
          returned a non-empty body. We do not crawl the internet looking for
          who linked to you, and we do not pretend a robots.txt edit is a
          citation.
        </p>

        <h2>The tokens, and the ones we skip</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>What the vendor says it is</th>
                <th>In this audit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">GPTBot</th>
                <td>
                  OpenAI’s crawler for content that may be used in training.
                  Separate from ChatGPT-User (a person clicked something that
                  fetches) and OAI-SearchBot (search).
                </td>
                <td>
                  Parsed. A disallow lowers the crawler dimension. When that
                  dimension is poor, the{" "}
                  <Link href="/chatgpt-citation-check">ChatGPT row</Link> is
                  Absent. ChatGPT-User and OAI-SearchBot are not parsed.
                </td>
              </tr>
              <tr>
                <th scope="row">PerplexityBot</th>
                <td>
                  Perplexity’s crawler. Perplexity-User is the separate agent
                  for fetches a person triggered.
                </td>
                <td>
                  Parsed. Perplexity-User is not. The{" "}
                  <Link href="/perplexity-citations">Perplexity row</Link> is
                  still mostly evidence and markup. The bot policy is the
                  crawler dimension, not the footnote status by itself.
                </td>
              </tr>
              <tr>
                <th scope="row">Google-Extended</th>
                <td>
                  Google’s token for whether content helps improve Gemini Apps
                  and Vertex AI generative APIs. Google says it does not
                  change inclusion or ranking in Google Search.
                </td>
                <td>
                  Parsed, and a disallow lowers the crawler dimension. The{" "}
                  <Link href="/ai-overviews">AI Overviews row</Link> does not
                  read this token. It reads answer-shaped copy and FAQ /
                  entity markup.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          We also note whether <code>User-agent: *</code> blocks{" "}
          <code>/</code>. A blanket disallow is recorded, and we still fetch
          the URL you paid to audit — you asked us to — with a warning on the
          crawl. Googlebot, Bingbot, ClaudeBot, Applebot-Extended, and
          CCBot are not in the three-token list. If your only question is
          “does Googlebot index this?”, use Search Console.
        </p>

        <h2>Allow, disallow, unspecified</h2>
        <p>
          The parser is ordinary robots.txt, applied to the path <code>/</code>.
          An agent-specific group wins. If that agent has no group, we use{" "}
          <code>User-agent: *</code>. If neither exists, the result is
          unspecified. An empty <code>Disallow:</code> is treated as allow,
          which matches the robots rule that an empty disallow means
          “nothing is disallowed.”
        </p>
        <p>
          A file that only names GPTBot, with no <code>*</code> group, leaves
          PerplexityBot and Google-Extended unspecified. Unspecified does not
          subtract the disallow penalty. It also does not earn the allow
          bonus. Silence is a third state, and the report should show it as
          silence.
        </p>

        <h2>A block that matches “we want to be fetched”</h2>
        <p>
          This is an illustration, not a requirement. Leave Googlebot’s rules
          alone while you edit these. If you already opt out of a training
          crawler on purpose, do not paste an Allow over that decision to
          chase a dimension score.
        </p>
        <pre className="overflow-x-auto rounded-xl border border-rule bg-cream p-4 text-sm leading-6 text-ink">
          {`User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /`}
        </pre>
        <p>
          The own-goal we see in audits is the inverse, copied from a staging
          template and left in production:
        </p>
        <pre className="overflow-x-auto rounded-xl border border-rule bg-cream p-4 text-sm leading-6 text-ink">
          {`User-agent: GPTBot
Disallow: /

User-agent: *
Disallow: /`}
        </pre>
        <p>
          The second group blocks everyone who falls through to{" "}
          <code>*</code>, including the two tokens you did not name. Fix the
          file, then re-read the copy. A crawler score cannot compensate for
          a homepage that never defines the product.
        </p>

        <h2>What else the crawl fetches</h2>
        <p>
          Besides <code>robots.txt</code> and <code>llms.txt</code>, we
          request <code>/sitemap.xml</code> and treat a response that
          contains a <code>urlset</code> as a freshness signal. We do not
          walk every URL in the sitemap. The page set is the URL you
          submitted plus a short list of same-host candidates (about,
          pricing, FAQ, and similar) capped so the audit stays a single
          report. Login walls and private docs are out of scope.{" "}
          <Link href="/privacy">Privacy</Link> covers what an optional
          language model is allowed to see: the public extract, not your
          passwords.
        </p>

        <h2>Questions about the tokens</h2>
        {faqs.map((item) => (
          <div key={item.q}>
            <h3 className="mt-6 font-serif text-xl text-ink">{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}
      </ArticleShell>
    </>
  );
}
