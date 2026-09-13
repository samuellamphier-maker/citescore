import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/PrintButton";
import { ScoreRing } from "@/components/ScoreRing";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { sampleReport, scoreTone } from "@/lib/sample-report";

export const metadata: Metadata = {
  title: "Sample report — Northbound",
  description:
    "A fictional CiteScore audit for Northbound, a sample SaaS product. Labeled as a sample throughout.",
};

const toneClass = {
  low: "text-copper",
  mid: "text-ochre",
  high: "text-forest",
} as const;

export default function SampleReportPage() {
  return (
    <>
      <SiteHeader />
      <main className="px-4 py-8 sm:px-6 sm:py-12">
        <div className="no-print mx-auto mb-6 flex max-w-[52rem] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-soft">
            Fictional company. Illustrative scores. Not a customer story.
          </p>
          <div className="flex gap-3">
            <Link
              href="/#audit"
              className="rounded-lg bg-forest px-4 py-2 text-sm text-cream hover:bg-forest-deep"
            >
              Audit your URL · $39
            </Link>
            <PrintButton />
          </div>
        </div>

        <article className="report-sheet mx-auto max-w-[52rem] rounded-2xl border border-rule px-5 py-8 sm:px-10 sm:py-12 print:border-0 print:px-0 print:py-0">
          <header className="border-b border-rule pb-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="kicker text-copper">CiteScore audit · Sample</p>
              <p className="kicker">{sampleReport.auditedAt}</p>
            </div>
            <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">
                  {sampleReport.product}
                </h1>
                <p className="mt-2 text-lg text-ink-soft">
                  {sampleReport.oneLiner}
                </p>
                <p className="mt-4 font-mono text-xs tracking-wide text-ink-soft">
                  {sampleReport.url}
                </p>
              </div>
              <div className="text-center sm:text-right">
                <ScoreRing score={sampleReport.overall} />
                <p className="mt-2 font-serif text-xl">{sampleReport.grade}</p>
              </div>
            </div>
          </header>

          <section className="border-b border-rule py-8">
            <h2 className="font-serif text-2xl">Executive read</h2>
            <p className="mt-3 text-[15px] leading-7 text-ink-soft">
              {sampleReport.summary}
            </p>
          </section>

          <section className="border-b border-rule py-8">
            <h2 className="font-serif text-2xl">Engine snapshot</h2>
            <div className="mt-5 overflow-hidden rounded-xl border border-rule">
              <table className="w-full text-left text-sm">
                <thead className="bg-paper-2/80 text-xs uppercase tracking-[0.12em] text-ink-soft">
                  <tr>
                    <th className="px-4 py-3 font-medium">Engine</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="hidden px-4 py-3 font-medium sm:table-cell">
                      Note
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sampleReport.engines.map((engine) => (
                    <tr key={engine.engine} className="border-t border-rule">
                      <td className="px-4 py-3 font-medium">{engine.engine}</td>
                      <td className="px-4 py-3">{engine.status}</td>
                      <td className="hidden px-4 py-3 text-ink-soft sm:table-cell">
                        {engine.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft sm:hidden">
              {sampleReport.engines.map((engine) => (
                <li key={`${engine.engine}-detail`}>{engine.detail}</li>
              ))}
            </ul>
          </section>

          <section className="border-b border-rule py-8">
            <h2 className="font-serif text-2xl">Dimension breakdown</h2>
            <ol className="mt-5 divide-y divide-rule border-y border-rule">
              {sampleReport.dimensions.map((dimension) => (
                <li
                  key={dimension.id}
                  className="grid gap-2 py-4 sm:grid-cols-[8rem_1fr_4rem] sm:items-baseline"
                >
                  <p className="text-sm font-medium">{dimension.name}</p>
                  <p className="text-sm leading-6 text-ink-soft">
                    {dimension.note}{" "}
                    <span className="text-ink/70">Weight {dimension.weight}.</span>
                  </p>
                  <p
                    className={`font-serif text-3xl sm:text-right ${toneClass[scoreTone(dimension.score)]}`}
                  >
                    {dimension.score}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className="py-8">
            <h2 className="font-serif text-2xl">Ten fixes that would get this site cited</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Ranked by expected citation lift, not by how good they look on a
              launch tweet.
            </p>
            <ol className="mt-6 space-y-6">
              {sampleReport.fixes.map((fix) => (
                <li
                  key={fix.rank}
                  className="break-inside-avoid rounded-xl border border-rule px-4 py-5 sm:px-5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-serif text-xl">
                      <span className="mr-2 text-ink-soft">{fix.rank}.</span>
                      {fix.title}
                    </p>
                    <p className="kicker">
                      {fix.impact} impact · {fix.effort}
                    </p>
                  </div>
                  <p className="mt-2 font-mono text-[11px] text-ink-soft">
                    {fix.where}
                  </p>
                  <p className="mt-3 text-sm leading-6">
                    <span className="font-medium">Why it matters. </span>
                    <span className="text-ink-soft">{fix.why}</span>
                  </p>
                  <p className="mt-2 text-sm leading-6">
                    <span className="font-medium">Do this. </span>
                    <span className="text-ink-soft">{fix.doThis}</span>
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <footer className="border-t border-rule pt-6 text-xs leading-5 text-ink-soft">
            This is a CiteScore sample report for a fictional product. Scores
            and recommendations are illustrative of format and depth, not a
            live crawl. A paid audit uses the same structure on your URL.
          </footer>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
