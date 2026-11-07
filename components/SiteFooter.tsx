import Link from "next/link";
import { Logo } from "@/components/Logo";
import {
  agencyKitLabel,
  agencyKitUrl,
  fixPackIntroPriceLabel,
  fixPackPageLinkLabel,
  snapshotRequestCtaLabel,
  templatePackLabel,
  templatePackUrl,
} from "@/lib/site";

const footerLink =
  "inline-flex min-h-11 min-w-11 items-center px-1 hover:text-ink";

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} prefetch={false} className={footerLink}>
      {children}
    </Link>
  );
}

function ExternalProductLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={footerLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

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
          <FooterLink href="/free-snapshot">{snapshotRequestCtaLabel}</FooterLink>
          <FooterLink href="/fix-pack">{fixPackPageLinkLabel()}</FooterLink>
          <FooterLink href="/sample-snapshot">Example snapshot</FooterLink>
          <FooterLink href="/guides">Guides</FooterLink>
          <FooterLink href="/industries">Industries</FooterLink>
          <FooterLink href="/tools">Tools</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="/checklist">Checklist</FooterLink>
          <FooterLink href="/for-agencies">For agencies</FooterLink>
          <FooterLink href="/chatgpt-citation-check">ChatGPT check</FooterLink>
          <FooterLink href="/ai-overviews">AI Overviews</FooterLink>
          <FooterLink href="/answer-engine-optimization">AEO</FooterLink>
          <FooterLink href="/alternatives/otterly">vs Otterly</FooterLink>
          <FooterLink href="/alternatives/profound">vs Profound</FooterLink>
          <FooterLink href="/alternatives/peec-ai">vs Peec AI</FooterLink>
          <FooterLink href="/how-it-works">How it works</FooterLink>
          <FooterLink href="/methodology">Methodology</FooterLink>
          <FooterLink href="/pricing">Pricing</FooterLink>
          <FooterLink href="/faq">FAQ</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/trust">Trust</FooterLink>
          <FooterLink href="/privacy">Privacy</FooterLink>
          <FooterLink href="/terms">Terms</FooterLink>
          <FooterLink href="/refunds">Refunds</FooterLink>
          <FooterLink href="/checkout">Checkout</FooterLink>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-5">
        <details className="group border-t border-rule/70">
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-4 py-3 marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="min-w-0">
              <span className="block text-sm font-medium text-ink">
                Other digital products
              </span>
              <span className="mt-0.5 block text-sm font-normal leading-6 text-ink-soft">
                Also available
              </span>
            </span>
            <span
              aria-hidden="true"
              className="ml-auto text-xl leading-none text-ink-soft group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="flex flex-wrap gap-x-5 gap-y-1 pb-4 text-sm text-ink-soft">
            <FooterLink href="/geo-audit">Self-serve PDF audit</FooterLink>
            <FooterLink href="/free-check">Public-file check</FooterLink>
            <ExternalProductLink href={templatePackUrl}>
              {templatePackLabel}
            </ExternalProductLink>
            <ExternalProductLink href={agencyKitUrl}>
              {agencyKitLabel}
            </ExternalProductLink>
          </div>
        </details>
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
