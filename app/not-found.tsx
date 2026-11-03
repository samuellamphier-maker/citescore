import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { fixPackIntroPriceLabel } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

const usefulLinks = [
  { href: "/sample-snapshot", label: "Example snapshot" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
  { href: "/ai-search-visibility-for-plumbers", label: "AI search visibility for plumbers" },
  { href: "/ai-search-visibility-for-hvac", label: "AI search visibility for HVAC" },
  { href: "/ai-search-visibility-for-dentists", label: "AI search visibility for dentists" },
] as const;

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-xl flex-1 px-5 py-20">
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
        <p className="mt-4 leading-7 text-ink-soft">
          The free AI Answer Snapshot asks logged-out ChatGPT and Perplexity
          who they name for one local business. No payment. The Fix Pack is{" "}
          {fixPackIntroPriceLabel} introductory, and it is optional.
        </p>
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
        <h2 className="mt-10 font-serif text-2xl tracking-tight">Useful pages</h2>
        <ul className="mt-3 divide-y divide-rule border-y border-rule text-sm">
          {usefulLinks.map((link) => (
            <li key={link.href} className="py-3">
              <Link
                href={link.href}
                className="font-medium text-forest underline-offset-4 hover:underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 border-t border-rule pt-6 text-sm text-ink">CiteScore Team</p>
      </main>
      <SiteFooter />
    </>
  );
}
