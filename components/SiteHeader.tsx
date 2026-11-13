"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { fixPackPageLinkLabel, snapshotRequestCtaLabel } from "@/lib/site";
import {
  firstSnapshotFieldError,
  snapshotWebsiteAccepted,
  snapshotWebsiteValue,
  type SnapshotFields,
} from "@/lib/snapshot-form";

const navItem =
  "min-h-11 min-w-11 items-center justify-center px-2 hover:text-ink";
const navLink = `inline-flex ${navItem}`;
const menuLink = `flex w-full justify-start rounded-lg px-3 ${navItem} hover:bg-paper`;

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

const snapshotFieldNames: Record<keyof SnapshotFields, string> = {
  business: "Business name",
  city: "City",
  service: "Service",
  website: "Website",
  email: "Email",
};

function readSnapshotInput(form: HTMLFormElement, name: string) {
  const input = form.elements.namedItem(name);
  return input instanceof HTMLInputElement ? input.value : "";
}

function onSnapshotCtaClick(event: React.MouseEvent<HTMLButtonElement>) {
  const form = document.getElementById("snapshot");
  if (!(form instanceof HTMLFormElement)) return;

  const website = form.elements.namedItem("Website");
  if (website instanceof HTMLInputElement && snapshotWebsiteAccepted(website.value)) {
    const next = snapshotWebsiteValue(website.value);
    if (next !== website.value) website.value = next;
  }

  const fields: SnapshotFields = {
    business: readSnapshotInput(form, snapshotFieldNames.business),
    city: readSnapshotInput(form, snapshotFieldNames.city),
    service: readSnapshotInput(form, snapshotFieldNames.service),
    website: readSnapshotInput(form, snapshotFieldNames.website),
    email: readSnapshotInput(form, snapshotFieldNames.email),
  };
  const first = firstSnapshotFieldError(fields);
  const details = event.currentTarget.closest("details");
  if (details) details.open = false;
  if (!first) return;

  event.preventDefault();
  const input = form.elements.namedItem(snapshotFieldNames[first]);
  if (input instanceof HTMLInputElement) input.focus();
}

function SnapshotCta({ className }: { className: string }) {
  const pathname = usePathname();
  // Homepage and the request page already render the snapshot form.
  // A link to /free-snapshot on that page reloads the page and does not send it.
  // An incomplete form focuses the first empty field. Listing every error on
  // this click covers the City and Service labels before the visitor has typed.
  const submitsPageForm = pathname === "/" || pathname === "/free-snapshot";
  if (submitsPageForm) {
    return (
      <button
        type="submit"
        form="snapshot"
        data-snapshot-cta="focus-first"
        onClick={onSnapshotCtaClick}
        className={className}
      >
        {snapshotRequestCtaLabel}
      </button>
    );
  }
  return (
    <NavLink href="/free-snapshot" prefetch className={className}>
      {snapshotRequestCtaLabel}
    </NavLink>
  );
}

function SecondaryLinks({ linkClass }: { linkClass: string }) {
  return (
    <>
      <NavLink href="/sample-snapshot" className={linkClass}>
        Example snapshot
      </NavLink>
      <NavLink href="/guides" className={linkClass}>
        Guides
      </NavLink>
      <NavLink href="/industries" className={linkClass}>
        Industries
      </NavLink>
      <NavLink href="/tools" className={linkClass}>
        Tools
      </NavLink>
      <NavLink href="/checklist" className={linkClass}>
        Checklist
      </NavLink>
      <NavLink href="/for-agencies" className={linkClass}>
        For agencies
      </NavLink>
      <NavLink href="/how-it-works" className={linkClass}>
        How it works
      </NavLink>
      <NavLink href="/pricing" className={linkClass}>
        Pricing
      </NavLink>
      <NavLink href="/faq" className={linkClass}>
        FAQ
      </NavLink>
      <NavLink href="/fix-pack" className={linkClass}>
        {fixPackPageLinkLabel()}
      </NavLink>
      <NavLink href="/trust" className={linkClass}>
        Trust
      </NavLink>
      <NavLink href="/contact" className={linkClass}>
        Contact
      </NavLink>
    </>
  );
}

export function SiteHeader() {
  return (
    <header className="no-print border-b border-rule/80" data-snapshot-cta="focus-first">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:inline-flex focus:h-11 focus:items-center focus:rounded-lg focus:bg-ink focus:px-4 focus:text-cream"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-5xl flex-nowrap items-center justify-between gap-3 px-5 py-2 sm:flex-wrap sm:gap-x-4 sm:gap-y-2">
        <NavLink
          href="/"
          className="inline-flex min-h-11 shrink-0 items-center"
          aria-label="CiteScore home"
        >
          <Logo />
        </NavLink>
        <div className="flex shrink-0 items-center sm:hidden">
          <details className="relative">
            <summary className="flex h-11 cursor-pointer list-none items-center rounded-lg border border-ink/25 px-3 text-sm font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <nav
              aria-label="Pages"
              className="absolute right-0 z-50 mt-2 flex max-h-[70vh] w-64 flex-col gap-1 overflow-y-auto rounded-xl border border-rule bg-cream p-2 text-sm text-ink-soft shadow-[0_16px_40px_-24px_rgba(27,24,20,0.45)]"
            >
              <SnapshotCta className="inline-flex h-11 items-center justify-center rounded-lg bg-ink px-3 text-center text-sm font-medium text-cream hover:bg-forest-deep" />
              <SecondaryLinks linkClass={menuLink} />
            </nav>
          </details>
        </div>
        <nav
          aria-label="Pages"
          className="hidden flex-wrap items-center justify-end gap-x-2 gap-y-1 text-sm text-ink-soft sm:flex sm:gap-x-3"
        >
          <SecondaryLinks linkClass={navLink} />
          <SnapshotCta className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-4 text-cream hover:bg-forest-deep" />
        </nav>
      </div>
    </header>
  );
}
