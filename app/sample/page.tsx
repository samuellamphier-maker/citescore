import type { Metadata } from "next";
import Link from "next/link";
import { AuditReport } from "@/components/AuditReport";
import { PrintButton } from "@/components/PrintButton";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMeta } from "@/lib/content/meta";
import { sampleReport } from "@/lib/sample-report";

export const metadata: Metadata = pageMeta({
  title: "Sample report — Northbound",
  description:
    "A fictional CiteScore audit for Northbound, a sample SaaS product. Labeled as a sample throughout.",
  path: "/sample",
});

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
            <a
              href="/api/reports/sample/pdf"
              className="rounded-lg border border-rule bg-cream px-4 py-2 text-sm hover:border-ink/30"
            >
              Download sample PDF
            </a>
            <PrintButton />
          </div>
        </div>
        <AuditReport report={sampleReport} />
      </main>
      <SiteFooter />
    </>
  );
}
