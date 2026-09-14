import Link from "next/link";
import { Logo } from "@/components/Logo";

export function SiteHeader() {
  return (
    <header className="no-print border-b border-rule/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="shrink-0" aria-label="CiteScore home">
          <Logo />
        </Link>
        <nav className="flex items-center gap-4 text-sm text-ink-soft sm:gap-6">
          <Link href="/sample" className="hover:text-ink">
            Sample
          </Link>
          <Link href="/blog" className="hover:text-ink">
            Guides
          </Link>
          <Link href="/#pricing" className="hidden hover:text-ink sm:inline">
            Pricing
          </Link>
          <Link href="/#faq" className="hidden hover:text-ink sm:inline">
            FAQ
          </Link>
          <Link
            href="/#audit"
            className="rounded-full bg-ink px-3.5 py-1.5 text-cream hover:bg-forest-deep"
          >
            Get audit
          </Link>
        </nav>
      </div>
    </header>
  );
}
