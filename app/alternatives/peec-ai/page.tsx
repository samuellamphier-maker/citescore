import Link from "next/link";
import { AuditSecondaryNote } from "@/components/AuditSecondaryNote";
import { IndustrySnapshotCta } from "@/components/IndustrySnapshotCta";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { StickySnapshotOffer } from "@/components/StickySnapshotOffer";
import { SiteHeader } from "@/components/SiteHeader";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";
import {
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  publicOrigin,
  site,
} from "@/lib/site";

const topic = getTopic("/alternatives/peec-ai");

const rows = [
  ["Job", "Free AI Answer Snapshot, then the Fix Pack", "Ongoing AI-search analytics for a marketing team"],
  [
    "Live engine queries",
    "Yes for the snapshot: logged-out ChatGPT and Perplexity. Answers vary run to run",
    "Yes. Prompts tracked on the engines included in the plan",
  ],
  [
    "Public price (15 Oct 2026)",
    `Free, then ${fixPackIntroPriceLabel}`,
    "Starter, Pro, Advanced, and Enterprise on peec.ai/pricing, plus a free trial. This page does not quote a dollar amount",
  ],
  [
    "Plan shape we could read",
    "No account. One business, one city, one service.",
    "Starter 50 prompts / 3 models / 1 project. Pro 150 / 3 / 2. Advanced 350 / 3 / 5. Unlimited users on those three. Enterprise is custom",
  ],
  [
    "Best first purchase",
    "Who is named, then the Fix Pack",
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
      <main id="main" className="mx-auto w-full max-w-2xl flex-1 px-5 py-14">
        <p className="kicker">Comparison</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">CiteScore vs Peec AI</h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          Peec AI is AI search analytics for marketing teams. Its homepage says it tracks brand performance across ChatGPT, Perplexity, and Gemini: visibility, competitors, and how the brand shows up in AI search. CiteScore starts with a free{" "}
          <Link href="/free-snapshot" className="text-forest underline">
            AI Answer Snapshot
          </Link>{" "}
          and an optional {fixPackIntroPriceLabel} Fix Pack. The snapshot shows who is named. Peec measures whether engines mention the brand over time.
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          We are not affiliated with Peec AI, and we do not have affiliate links. Details below are what peec.ai and peec.ai/pricing showed on 15 October 2026. Their homepage says the product is trusted by 3,500+ brands and agencies, and the site footer says it is rated 4.7/5 on G2. Confirm the current plans before you budget.
        </p>

        <div className="article-prose mt-10">
          <h2>The short version</h2>
          <p>
            If you need a weekly read of which prompts mention the brand, where it sits against competitors, and how the wording sounds, Peec is built for that job. If you need to know who is named for this business and city, start with the free snapshot, then the {fixPackIntroPriceLabel} Fix Pack. Those jobs are sequential. A monitor on a page you have not changed produces a clean chart of absence.
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
            Local businesses start with the free{" "}
            <Link href="/free-snapshot">AI Answer Snapshot</Link>. CiteScore asks logged-out ChatGPT and Perplexity who they name for that trade and city and sends one page: who is named, which sources are cited, and how the Google rating and review count compare. AI answers vary run to run. This is a snapshot, not a ranking. No payment. The{" "}
            <Link href="/free-check">free signal check</Link> reads public files. It does not query ChatGPT.
          </p>
          <p>
            The <Link href="/fix-pack">Fix Pack</Link> is {fixPackIntroPriceLabel} introductory ({fixPackListPriceLabel} list): a Google Business Profile gap list, a review-gap plan and script, the directories an AI answer cited, paste-ready LocalBusiness and Service JSON-LD, and a re-check 14 days later. One business, one city, one service. It is not a promise that any assistant will name the business. There is no seat and no card on file after the one charge. Weekly rescans at {site.subscriptionPriceLabel} are planned, not sold. The{" "}
            <Link href="/sample-snapshot">example snapshot</Link> and the{" "}
            <Link href="/sample-fix-pack">sample Fix Pack</Link> are fictional and labeled that way.
          </p>

          <h2>Use them in order, if you use both</h2>
          <p>
            See who is named with the free snapshot, then ship the Fix Pack or rewrite from the <Link href="/blog/chatgpt-citation-checklist">checklist</Link>. Then, if a team will actually open a prompt dashboard, start Peec’s trial and see whether mentions move. The <Link href="/alternatives/otterly">Otterly comparison</Link> and the <Link href="/alternatives/profound">Profound comparison</Link> are the same split against other monitors. The longer three-way note stays on the{" "}
            <Link href="/blog/citescore-vs-enterprise-geo-tools">enterprise guide</Link>.
          </p>
        </div>

        <div className="mt-12">
          <IndustrySnapshotCta variant="general" />
        </div>
        <AuditSecondaryNote />

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
      <StickySnapshotOffer path="/alternatives/peec-ai" />
    </>
  );
}
