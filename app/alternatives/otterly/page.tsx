import type { Metadata } from "next";
import Link from "next/link";
import { AuditSecondaryNote } from "@/components/AuditSecondaryNote";
import { IndustrySnapshotCta } from "@/components/IndustrySnapshotCta";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { StickySnapshotOffer } from "@/components/StickySnapshotOffer";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMeta } from "@/lib/content/meta";
import {
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  publicOrigin,
  site,
} from "@/lib/site";

const description =
  "CiteScore starts with a free AI Answer Snapshot and an optional Fix Pack. Otterly tracks live prompts on ChatGPT, AI Overviews, Perplexity, and Copilot.";

export const metadata: Metadata = pageMeta({
  title: "CiteScore vs Otterly",
  description,
  path: "/alternatives/otterly",
});

const rows = [
  ["Job", "Free AI Answer Snapshot, then the Fix Pack", "Ongoing AI-search visibility"],
  [
    "Live engine queries",
    "Yes for the snapshot: logged-out ChatGPT and Perplexity. Answers vary run to run",
    "Yes — for the prompts on your plan",
  ],
  [
    "Public price (2026)",
    `Free, then ${fixPackIntroPriceLabel}`,
    "Lite ~$29/mo · Standard $189/mo · Premium $489/mo",
  ],
  ["Seats / workspaces", "None. No account.", "Team and workspace features"],
  [
    "Best first purchase",
    "Who is named, then the Fix Pack",
    "Pages are already citable; you need a time series",
  ],
];

export default function OtterlyAlternativePage() {
  const origin = publicOrigin();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "CiteScore vs Otterly",
          description,
          url: `${origin}/alternatives/otterly`,
        }}
      />
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-2xl flex-1 px-5 py-14">
        <p className="kicker">Comparison</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">
          CiteScore vs Otterly
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          Different products. Otterly (OtterlyAI) is an AI-search monitoring
          platform: pick prompts, watch ChatGPT, Google AI Overviews,
          Perplexity, and Microsoft Copilot, and see whether you are
          mentioned. CiteScore starts with a free{" "}
          <Link href="/free-snapshot" className="text-forest underline">
            AI Answer Snapshot
          </Link>{" "}
          and an optional {fixPackIntroPriceLabel} Fix Pack.
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          We are not affiliated with Otterly. Prices below are what Otterly
          published in 2026 — confirm on their site before you budget.
        </p>

        <div className="article-prose mt-10">
          <h2>The short version</h2>
          <p>
            If you need to know “does ChatGPT mention us for these 40
            prompts this month?”, buy Otterly (or another monitor). If you
            need to know who is named for this business and city, start with
            the free snapshot, then the {fixPackIntroPriceLabel} Fix Pack.
            Doing the first job before the second is how GEO retainers get
            wasted.
          </p>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th> </th>
                  <th>CiteScore</th>
                  <th>Otterly</th>
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

          <h2>What Otterly is good at</h2>
          <p>
            Otterly’s public plans (Lite, Standard, Premium, plus Enterprise)
            are built around tracked search prompts, brand reports, and
            optional add-on engines (Gemini, Claude, Google AI Mode). Higher
            tiers add API / MCP access, Looker Studio, and thousands of GEO
            URL audits per month. Agencies get workspaces. That is a real
            measurement product for people who will look at it every week.
          </p>
          <p>
            Lite at about $29/month is still a subscription, and 15 prompts is
            a small sample. If your actual problem is a metaphorical H1, you
            do not need fifteen prompts yet.
          </p>

          <h2>What CiteScore is for</h2>
          <p>
            Local businesses start with the free{" "}
            <Link href="/free-snapshot">AI Answer Snapshot</Link>. CiteScore
            asks logged-out ChatGPT and Perplexity who they name for that
            trade and city and sends one page: who is named, which sources
            are cited, and how the Google rating and review count compare.
            AI answers vary run to run. This is a snapshot, not a ranking.
            No payment. The{" "}
            <Link href="/free-check">free signal check</Link> reads public
            files. It does not query ChatGPT.
          </p>
          <p>
            The <Link href="/fix-pack">Fix Pack</Link> is{" "}
            {fixPackIntroPriceLabel} introductory ({fixPackListPriceLabel}{" "}
            list): a Google Business Profile gap list, a review-gap plan and
            script, the directories an AI answer cited, paste-ready
            LocalBusiness and Service JSON-LD, and a re-check 14 days later.
            One business, one city, one service. It is not a promise that any
            assistant will name the business. There is no seat and no card on
            file after the one charge. Weekly rescans at{" "}
            {site.subscriptionPriceLabel} are planned, not sold. The{" "}
            <Link href="/sample-snapshot">example snapshot</Link> and the{" "}
            <Link href="/sample-fix-pack">sample Fix Pack</Link> are fictional
            and labeled that way.
          </p>

          <h2>Can you use both?</h2>
          <p>
            Yes, in order. See who is named with the free snapshot, then
            ship the Fix Pack or the{" "}
            <Link href="/blog/chatgpt-citation-checklist">
              citation checklist
            </Link>
            . Then, if you have budget and a prompt list, turn on Otterly to
            see whether mentions move. Measuring a page you have not changed
            will produce a very clean graph of “absent.”
          </p>
          <p>
            For Profound-class enterprise suites (citation share, SSO, SOC
            2), read{" "}
            <Link href="/alternatives/profound">CiteScore vs Profound</Link>,{" "}
            <Link href="/alternatives/peec-ai">CiteScore vs Peec AI</Link>, or the longer{" "}
            <Link href="/blog/citescore-vs-enterprise-geo-tools">
              enterprise comparison
            </Link>
            . The honest summary: they are not competing with a free
            snapshot or the {fixPackIntroPriceLabel} Fix Pack.
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
          <Link href="/blog" className="text-forest underline">
            guides
          </Link>
        </p>
      </main>
      <SiteFooter />
      <StickySnapshotOffer path="/alternatives/otterly" />
    </>
  );
}
