import type { Metadata } from "next";
import Link from "next/link";
import { AuditCta } from "@/components/AuditCta";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMeta } from "@/lib/content/meta";
import { publicOrigin, site } from "@/lib/site";

const description =
  "Honest comparison: CiteScore is a $39 one-off GEO audit of one URL. Otterly is a subscription that tracks live prompts across ChatGPT, Google AI Overviews, Perplexity, and Copilot.";

export const metadata: Metadata = pageMeta({
  title: "CiteScore vs Otterly — $39 audit vs AI-search monitoring",
  description,
  path: "/alternatives/otterly",
});

const rows = [
  ["Job", "One scored PDF, ~10 fixes", "Ongoing AI-search visibility"],
  [
    "Live engine queries",
    "No — inferred from on-page signals + LLM review",
    "Yes — for the prompts on your plan",
  ],
  [
    "Public price (2026)",
    `${site.priceLabel} once`,
    "Lite ~$29/mo · Standard $189/mo · Premium $489/mo",
  ],
  ["Seats / workspaces", "None. No account.", "Team and workspace features"],
  [
    "Best first purchase",
    "Homepage still reads like a slogan",
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
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-14">
        <p className="kicker">Comparison</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">
          CiteScore vs Otterly
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          Different products. Otterly (OtterlyAI) is an AI-search monitoring
          platform: pick prompts, watch ChatGPT, Google AI Overviews,
          Perplexity, and Microsoft Copilot, and see whether you are
          mentioned. CiteScore is a {site.priceLabel} one-time{" "}
          <Link href="/geo-audit" className="text-forest underline">
            GEO audit
          </Link>{" "}
          of one public URL.
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
            need to know “why would a model skip this homepage, and what do
            I change by Friday?”, buy CiteScore. Doing the first job before
            the second is how GEO retainers get wasted.
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
            Lite at about $29/month is the closest sticker to CiteScore’s{" "}
            {site.priceLabel}. It is still a subscription, and 15 prompts is
            a small sample. If your actual problem is a metaphorical H1, you
            do not need fifteen prompts yet.
          </p>

          <h2>What CiteScore is good at</h2>
          <p>
            We crawl the URL you paid for, score{" "}
            <Link href="/blog/what-is-geo">GEO</Link> signals (definitions,
            entities, evidence, schema, freshness, crawler access), and
            email a PDF with about ten fixes. An LLM may rewrite the summary
            from the public HTML — disclosed on{" "}
            <Link href="/privacy">Privacy</Link>. We never claim a live
            ChatGPT session.
          </p>
          <p>
            There is no seat, no prompt pack, and no card-on-file after the
            one charge. Weekly rescans at {site.subscriptionPriceLabel} are
            planned, not sold. See the{" "}
            <Link href="/sample">sample report</Link> for the artifact
            (fictional company).
          </p>

          <h2>Can you use both?</h2>
          <p>
            Yes, in order. Rewrite the page using the{" "}
            <Link href="/blog/chatgpt-citation-checklist">
              citation checklist
            </Link>{" "}
            or a CiteScore report. Then, if you have budget and a prompt
            list, turn on Otterly to see whether mentions move. Measuring a
            slogan you have not replaced will produce a very clean graph of
            “absent.”
          </p>
          <p>
            For Profound-class enterprise suites (citation share, SSO, SOC
            2), read{" "}
            <Link href="/blog/citescore-vs-enterprise-geo-tools">
              CiteScore vs enterprise GEO tools
            </Link>
            . The honest summary: they are not competing with a{" "}
            {site.priceLabel} PDF.
          </p>
        </div>

        <AuditCta
          id="otterly-audit"
          title={`Skip the monitor until the page is citable — ${site.priceLabel}`}
        />

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
    </>
  );
}
