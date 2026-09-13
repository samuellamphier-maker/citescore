import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuditReport } from "@/components/AuditReport";
import { PrintButton } from "@/components/PrintButton";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getJobByDownloadToken } from "@/lib/jobs/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your CiteScore report",
  robots: { index: false, follow: false },
};

export default async function LiveReportPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const job = await getJobByDownloadToken(token);
  if (!job?.report) notFound();

  return (
    <>
      <SiteHeader />
      <main className="px-4 py-8 sm:px-6 sm:py-12">
        <div className="no-print mx-auto mb-6 flex max-w-[52rem] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-soft">
            Paid audit for {job.siteUrl}. Engine statuses are inferred — not live
            ChatGPT queries.
          </p>
          <div className="flex gap-3">
            <a
              href={`/api/reports/${token}/pdf`}
              className="rounded-lg bg-forest px-4 py-2 text-sm text-cream hover:bg-forest-deep"
            >
              Download PDF
            </a>
            <PrintButton />
          </div>
        </div>
        <AuditReport report={job.report} />
        <p className="no-print mx-auto mt-6 max-w-[52rem] text-center text-sm text-ink-soft">
          Need another URL?{" "}
          <Link href="/#audit" className="text-forest underline">
            Start a new {job.report.sample ? "sample" : "$39"} audit
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
