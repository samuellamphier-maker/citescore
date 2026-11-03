import Link from "next/link";
import { Logo } from "@/components/Logo";
import {
  agencyKitLabel,
  agencyKitUrl,
  fixPackIntroPriceLabel,
  templatePackLabel,
  templatePackUrl,
} from "@/lib/site";

const footerLink =
  "inline-flex min-h-11 min-w-11 items-center px-1 hover:text-ink";

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
          <Link href="/sample" className={footerLink}>
            Sample report
          </Link>
          <Link href="/free-snapshot" className={footerLink}>
            Free snapshot
          </Link>
          <Link href="/sample-snapshot" className={footerLink}>
            Example snapshot
          </Link>
          <Link href="/guides" className={footerLink}>
            Guides
          </Link>
          <Link href="/industries" className={footerLink}>
            Industries
          </Link>
          <Link href="/blog" className={footerLink}>
            Blog
          </Link>
          <Link href="/checklist" className={footerLink}>
            Checklist
          </Link>
          <a
            href={templatePackUrl}
            className={footerLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {templatePackLabel}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link href="/for-agencies" className={footerLink}>
            For agencies
          </Link>
          <a
            href={agencyKitUrl}
            className={footerLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {agencyKitLabel}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link href="/geo-audit" className={footerLink}>
            GEO audit
          </Link>
          <Link href="/chatgpt-citation-check" className={footerLink}>
            ChatGPT check
          </Link>
          <Link href="/ai-overviews" className={footerLink}>
            AI Overviews
          </Link>
          <Link href="/answer-engine-optimization" className={footerLink}>
            AEO
          </Link>
          <Link href="/alternatives/otterly" className={footerLink}>
            vs Otterly
          </Link>
          <Link href="/alternatives/profound" className={footerLink}>
            vs Profound
          </Link>
          <Link href="/alternatives/peec-ai" className={footerLink}>
            vs Peec AI
          </Link>
          <Link href="/fix-pack" className={footerLink}>
            Fix Pack
          </Link>
          <Link href="/free-check" className={footerLink}>
            Free signal check
          </Link>
          <Link href="/how-it-works" className={footerLink}>
            How it works
          </Link>
          <Link href="/methodology" className={footerLink}>
            Methodology
          </Link>
          <Link href="/pricing" className={footerLink}>
            Pricing
          </Link>
          <Link href="/faq" className={footerLink}>
            FAQ
          </Link>
          <Link href="/contact" className={footerLink}>
            Contact
          </Link>
          <Link href="/about" className={footerLink}>
            About
          </Link>
          <Link href="/privacy" className={footerLink}>
            Privacy
          </Link>
          <Link href="/terms" className={footerLink}>
            Terms
          </Link>
          <Link href="/refunds" className={footerLink}>
            Refunds
          </Link>
          <Link href="/checkout" className={footerLink}>
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
