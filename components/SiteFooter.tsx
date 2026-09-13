import Link from "next/link";
import { Logo } from "@/components/Logo";

export function SiteFooter() {
  return (
    <footer className="no-print mt-auto border-t border-rule/80">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm leading-6 text-ink-soft">
            A one-time GEO audit for indie SaaS founders and small SEO
            agencies. Built to get you cited — not to sell you another
            dashboard.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
          <Link href="/sample" className="hover:text-ink">
            Sample report
          </Link>
          <Link href="/#pricing" className="hover:text-ink">
            Pricing
          </Link>
          <Link href="/#faq" className="hover:text-ink">
            FAQ
          </Link>
          <Link href="/privacy" className="hover:text-ink">
            Privacy
          </Link>
          <Link href="/checkout" className="hover:text-ink">
            Checkout
          </Link>
        </div>
      </div>
      <div className="border-t border-rule/70">
        <p className="mx-auto max-w-5xl px-5 py-4 text-xs text-ink-soft">
          © {new Date().getFullYear()} CiteScore. Pre-sell MVP — reports are
          fulfilled as the audit engine ships.
        </p>
      </div>
    </footer>
  );
}
