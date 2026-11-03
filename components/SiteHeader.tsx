import Link from "next/link";
import { Logo } from "@/components/Logo";
import { templatePackLabel, templatePackUrl } from "@/lib/site";

const navItem =
  "min-h-11 min-w-11 items-center justify-center px-2 hover:text-ink";
const navLink = `inline-flex ${navItem}`;

export function SiteHeader() {
  return (
    <header className="no-print border-b border-rule/80">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:inline-flex focus:h-11 focus:items-center focus:rounded-lg focus:bg-ink focus:px-4 focus:text-cream"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-2">
        <Link
          href="/"
          className="inline-flex min-h-11 shrink-0 items-center"
          aria-label="CiteScore home"
        >
          <Logo />
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-2 gap-y-1 text-sm text-ink-soft sm:gap-x-3">
          <Link href="/sample" className={navLink}>
            Sample
          </Link>
          <Link href="/sample-snapshot" className={navLink}>
            Example snapshot
          </Link>
          <Link href="/guides" className={navLink}>
            Guides
          </Link>
          <Link href="/industries" className={navLink}>
            Industries
          </Link>
          <Link href="/tools" className={navLink}>
            Tools
          </Link>
          <Link href="/checklist" className={navLink}>
            Checklist
          </Link>
          <Link href="/for-agencies" className={navLink}>
            For agencies
          </Link>
          <a
            href={templatePackUrl}
            className={navLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {templatePackLabel}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link href="/how-it-works" className={`hidden sm:inline-flex ${navItem}`}>
            How it works
          </Link>
          <Link href="/pricing" className={`hidden sm:inline-flex ${navItem}`}>
            Pricing
          </Link>
          <Link href="/faq" className={`hidden sm:inline-flex ${navItem}`}>
            FAQ
          </Link>
          <Link href="/fix-pack" className={navLink}>
            Fix Pack
          </Link>
          <Link href="/contact" className={navLink}>
            Contact
          </Link>
          <Link
            href="/free-snapshot"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-4 text-cream hover:bg-forest-deep"
          >
            Free snapshot
          </Link>
        </nav>
      </div>
    </header>
  );
}
