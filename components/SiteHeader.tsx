import Link from "next/link";
import { Logo } from "@/components/Logo";

const navItem =
  "min-h-11 min-w-11 items-center justify-center px-2 hover:text-ink";
const navLink = `inline-flex ${navItem}`;

function NavLink({
  href,
  className,
  children,
  prefetch = false,
  "aria-label": ariaLabel,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
  prefetch?: boolean;
  "aria-label"?: string;
}) {
  return (
    <Link href={href} prefetch={prefetch} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

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
        <NavLink
          href="/"
          className="inline-flex min-h-11 shrink-0 items-center"
          aria-label="CiteScore home"
        >
          <Logo />
        </NavLink>
        <nav className="flex flex-wrap items-center justify-end gap-x-2 gap-y-1 text-sm text-ink-soft sm:gap-x-3">
          <NavLink href="/sample-snapshot" className={navLink}>
            Example snapshot
          </NavLink>
          <NavLink href="/guides" className={navLink}>
            Guides
          </NavLink>
          <NavLink href="/industries" className={navLink}>
            Industries
          </NavLink>
          <NavLink href="/tools" className={navLink}>
            Tools
          </NavLink>
          <NavLink href="/checklist" className={navLink}>
            Checklist
          </NavLink>
          <NavLink href="/for-agencies" className={navLink}>
            For agencies
          </NavLink>
          <NavLink href="/how-it-works" className={`hidden sm:inline-flex ${navItem}`}>
            How it works
          </NavLink>
          <NavLink href="/pricing" className={`hidden sm:inline-flex ${navItem}`}>
            Pricing
          </NavLink>
          <NavLink href="/faq" className={`hidden sm:inline-flex ${navItem}`}>
            FAQ
          </NavLink>
          <NavLink href="/fix-pack" className={navLink}>
            Fix Pack
          </NavLink>
          <NavLink href="/trust" className={navLink}>
            Trust
          </NavLink>
          <NavLink href="/contact" className={navLink}>
            Contact
          </NavLink>
          <NavLink
            href="/free-snapshot"
            prefetch
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-4 text-cream hover:bg-forest-deep"
          >
            Free snapshot
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
