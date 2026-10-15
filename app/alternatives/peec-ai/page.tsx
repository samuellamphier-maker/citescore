import Link from "next/link";
import { AuditCta } from "@/components/AuditCta";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";
import { publicOrigin, site } from "@/lib/site";

const topic = getTopic("/alternatives/peec-ai");

const rows = [
  ["Job", "One scored PDF, about ten fixes, one URL", "Ongoing AI-search analytics for a marketing team"],
  [
    "Live engine queries",
    "No. On-page signals plus an optional LLM review of fetched HTML",
    "Yes. Prompts tracked on the engines included in the plan",
  ],
  [
    "Public price (15 Oct 2026)",
    `${site.priceLabel} once`,
    "Starter, Pro, Advanced, and Enterprise on peec.ai/pricing, plus a free trial. This page does not quote a dollar amount",
  ],
  [
    "Plan shape we could read",
    "No account. One URL per audit",
    "Starter 50 prompts / 3 models / 1 project. Pro 150 / 3 / 2. Advanced 350 / 3 / 5. Unlimited users on those three. Enterprise is custom",
  ],
  [
    "Best first purchase",
    "The homepage still reads like a slogan",
    "A team that will review visibility, position, and sentiment every week",
  ],
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function PeecAlternativePage() {
  const origin = publicOrigin();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "CiteScore vs Peec AI",
          description: topic.description,
          url: `${origin}${topic.path}`,
          publisher: {
            "@type": "Organization",
            name: "CiteScore Team",
            url: origin,
          },
        }}
      />
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-14">
        <p className="kicker">Comparison</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">CiteScore vs Peec AI</h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          Peec AI is AI search analytics for marketing teams. Its homepage says it tracks brand performance across ChatGPT, Perplexity, and Gemini: visibility, competitors, and how the brand shows up in AI search. CiteScore is a {site.priceLabel} one-time{" "}
          <Link href="/geo-audit" className="text-forest underline">
            GEO audit
          </Link>{" "}
          of one public URL. The audit explains what to change on the page. Peec measures whether engines mention the brand after that work exists.
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          We are not affiliated with Peec AI, and we do not have affiliate links. Details below are what peec.ai and peec.ai/pricing showed on 15 October 2026. Their homepage says the product is trusted by 3,500+ brands and agencies, and the site footer says it is rated 4.7/5 on G2. Confirm the current plans before you budget.
        </p>

        <div className="article-prose mt-10">
          <h2>The short version</h2>
          <p>
            If you need a weekly read of which prompts mention the brand, where it sits against competitors, and how the wording sounds, Peec is built for that job. If you need to know why a model would skip this homepage, and what to rewrite by Friday, buy CiteScore. Those jobs are sequential. A monitor on a slogan produces a clean chart of absence.
          </p>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th> </th>
                  <th>CiteScore</th>
                  <th>Peec AI</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>What Peec AI publishes</h2>
          <p>
            The brand pricing page lists four plans: Starter, Pro, Advanced, and Enterprise, and it offers a free trial. Starter is 50 prompts, a choice of 3 models, unlimited users, and 1 project, described for SEO and content managers getting started. Pro is 150 prompts, 3 models, unlimited users, and 2 projects. Advanced is 350 prompts, 3 models, unlimited users, and 5 projects, described for teams managing multiple projects. Enterprise adds custom prompt tracking, a choice of all models, unlimited projects, custom prompt setup, and up to 13 LLM models.
          </p>
          <p>
            The same page says visibility, position, sentiment, and share of voice are tracked daily against competitors. Beside Starter, Pro, and Advanced it lists ChatGPT, Google AI Mode, Google AI Overviews, Microsoft Copilot, Gemini, and Naver AI, with the card line “Choose 3 models.” The Enterprise row adds further models, including Claude Sonnet 4, GPT 5 Search, Grok, Deepseek, Qwen, Mistral, and Meta Spark, marked as API. The homepage also describes CSV export, a Looker Studio connector, an API, and an MCP connection. Agency plans (Essential, Growth, and Scale) are on a separate pricing page. Dollar amounts were not in the pricing HTML we fetched, so this page does not invent one.
          </p>

          <h2>What CiteScore is for</h2>
          <p>
            We crawl the URL you paid for, score on-page GEO signals (definitions, entities, evidence, schema, freshness, crawler access), and email a PDF with about ten fixes. The engine snapshot — ChatGPT, Perplexity, Google AI Overviews — is inferred. An LLM may rewrite the summary from the public HTML. We do not claim a live login.{" "}
            <Link href="/privacy">Privacy</Link> says what that model may see. The <Link href="/sample">sample report</Link> is a fictional company in the real format.
          </p>
          <p>
            There is no workspace and no card on file after the charge. Weekly rescans at {site.subscriptionPriceLabel} are planned, not sold. The <Link href="/chatgpt-citation-check">ChatGPT</Link>, <Link href="/ai-overviews">AI Overviews</Link>, and <Link href="/perplexity-citations">Perplexity</Link> pages explain each row.{" "}
            <Link href="/answer-engine-optimization">Answer engine optimization</Link> is the same audit under the other common label.
          </p>

          <h2>Use them in order, if you use both</h2>
          <p>
            Rewrite the page from the <Link href="/blog/chatgpt-citation-checklist">checklist</Link> or from a CiteScore report. Then, if a team will actually open a prompt dashboard, start Peec’s trial and see whether mentions move. The <Link href="/alternatives/otterly">Otterly comparison</Link> and the <Link href="/alternatives/profound">Profound comparison</Link> are the same split against other monitors. The longer three-way note stays on the{" "}
            <Link href="/blog/citescore-vs-enterprise-geo-tools">enterprise guide</Link>.
          </p>
        </div>

        <AuditCta
          id="peec-audit"
          title={`Fix the page before you subscribe to a monitor — ${site.priceLabel}`}
        />

        <p className="mt-8 text-sm text-ink-soft">
          More comparisons:{" "}
          <Link href="/alternatives" className="text-forest underline">
            alternatives index
          </Link>
          {" · "}
          <Link href="/alternatives/otterly" className="text-forest underline">
            vs Otterly
          </Link>
          {" · "}
          <Link href="/alternatives/profound" className="text-forest underline">
            vs Profound
          </Link>
          {" · "}
          <Link href="/blog" className="text-forest underline">
            guides
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
