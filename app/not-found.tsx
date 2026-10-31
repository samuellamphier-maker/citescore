import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { fixPackIntroPriceLabel } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-xl flex-1 px-5 py-20">
        <p className="kicker">404</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">
          That page is not in the report.
        </h1>
        <p className="mt-4 text-ink-soft leading-7">
          The URL you opened is not part of this site.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="/free-snapshot"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream transition-colors hover:bg-forest-deep"
          >
            Get a free AI Answer Snapshot
          </Link>
          <Link
            href="/fix-pack"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-ink/25 bg-cream px-5 text-base font-medium text-ink transition-colors hover:border-ink"
          >
            Fix Pack, {fixPackIntroPriceLabel}
          </Link>
        </div>
        <p className="mt-4 text-sm leading-6">
          <Link
            href="/sample-snapshot"
            className="font-medium text-forest underline underline-offset-4 hover:underline"
          >
            See an example snapshot
          </Link>
          <span className="text-ink-soft">
            . Fictional business, illustrative numbers.
          </span>
        </p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link href="/" className="text-forest underline">
            Home
          </Link>
          <Link href="/blog" className="text-forest underline">
            Guides
          </Link>
          <Link href="/geo-audit" className="text-forest underline">
            GEO audit
          </Link>
          <Link href="/chatgpt-citation-check" className="text-forest underline">
            ChatGPT citation check
          </Link>
          <Link href="/ai-overviews" className="text-forest underline">
            AI Overviews
          </Link>
          <Link href="/sample" className="text-forest underline">
            Sample report
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
