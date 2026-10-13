import Link from "next/link";
import { Logo } from "@/components/Logo";
import { templatePackLabel, templatePackUrl } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="no-print border-b border-rule/80">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 py-4">
        <Link href="/" className="shrink-0" aria-label="CiteScore home">
          <Logo />
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm text-ink-soft sm:gap-x-6">
          <Link href="/sample" className="hover:text-ink">
            Sample
          </Link>
          <Link href="/blog" className="hover:text-ink">
            Guides
          </Link>
          <Link href="/checklist" className="hover:text-ink">
            Checklist
          </Link>
          <Link href="/for-agencies" className="hover:text-ink">
            For agencies
          </Link>
          <a
            href={templatePackUrl}
            className="hover:text-ink"
            target="_blank"
            rel="noopener noreferrer"
          >
            {templatePackLabel}
          </a>
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
