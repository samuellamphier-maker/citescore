import Link from "next/link";
import { Logo } from "@/components/Logo";
import {
  agencyKitLabel,
  agencyKitUrl,
  fixPackIntroPriceLabel,
  templatePackLabel,
  templatePackUrl,
} from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="no-print mt-auto border-t border-rule/80">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm leading-6 text-ink-soft">
            A free AI Answer Snapshot for local service businesses, and a{" "}
            {fixPackIntroPriceLabel} Fix Pack when you want the gaps fixed.
            Sold by CiteScore.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
          <Link href="/sample" className="hover:text-ink">
            Sample report
          </Link>
          <Link href="/free-snapshot" className="hover:text-ink">
            Free snapshot
          </Link>
          <Link href="/sample-snapshot" className="hover:text-ink">
            Example snapshot
          </Link>
          <Link href="/blog" className="hover:text-ink">
            Guides
          </Link>
          <Link href="/checklist" className="hover:text-ink">
            Checklist
          </Link>
          <a
            href={templatePackUrl}
            className="hover:text-ink"
            target="_blank"
            rel="noopener noreferrer"
          >
            {templatePackLabel}
          </a>
          <Link href="/for-agencies" className="hover:text-ink">
            For agencies
          </Link>
          <a
            href={agencyKitUrl}
            className="hover:text-ink"
            target="_blank"
            rel="noopener noreferrer"
          >
            {agencyKitLabel}
          </a>
          <Link href="/geo-audit" className="hover:text-ink">
            GEO audit
          </Link>
          <Link href="/chatgpt-citation-check" className="hover:text-ink">
            ChatGPT check
          </Link>
          <Link href="/ai-overviews" className="hover:text-ink">
            AI Overviews
          </Link>
          <Link href="/answer-engine-optimization" className="hover:text-ink">
            AEO
          </Link>
          <Link href="/alternatives/otterly" className="hover:text-ink">
            vs Otterly
          </Link>
          <Link href="/alternatives/profound" className="hover:text-ink">
            vs Profound
          </Link>
          <Link href="/alternatives/peec-ai" className="hover:text-ink">
            vs Peec AI
          </Link>
          <Link href="/fix-pack" className="hover:text-ink">
            Fix Pack
          </Link>
          <Link href="/free-check" className="hover:text-ink">
            Free signal check
          </Link>
          <Link href="/#pricing" className="hover:text-ink">
            Pricing
          </Link>
          <Link href="/#faq" className="hover:text-ink">
            FAQ
          </Link>
          <Link href="/about" className="hover:text-ink">
            About
          </Link>
          <Link href="/privacy" className="hover:text-ink">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-ink">
            Terms
          </Link>
          <Link href="/refunds" className="hover:text-ink">
            Refunds
          </Link>
          <Link href="/checkout" className="hover:text-ink">
            Checkout
          </Link>
        </div>
      </div>
      <div className="border-t border-rule/70">
        <p className="mx-auto max-w-5xl px-5 py-4 text-xs text-ink-soft">
          © {new Date().getFullYear()} CiteScore. Free AI Answer Snapshot
          and the {fixPackIntroPriceLabel} Fix Pack. Sold by CiteScore.
        </p>
      </div>
    </footer>
  );
}
