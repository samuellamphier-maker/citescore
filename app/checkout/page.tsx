import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { AuditCheckout } from "@/components/AuditCheckout";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMeta } from "@/lib/content/meta";
import { FixPackBuyLink } from "@/components/FixPackBuyLink";
import { FixPackOfferFacts } from "@/components/FixPackOfferFacts";
import { TrustLinks } from "@/components/TrustLinks";
import {
  agencyKitLabel,
  agencyKitUrl,
  doneForYouAuditLabel,
  doneForYouAuditUrl,
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  sellerName,
  site,
  whiteLabelAuditUrl,
} from "@/lib/site";
import { normalizeSiteUrl } from "@/lib/urls";

const whiteLabelCheckoutLabel =
  "White-Label AI Search Audit for Agencies ($149)";

export const metadata: Metadata = pageMeta({
  title: `Free snapshot and ${fixPackIntroPriceLabel} Fix Pack`,
  description: `Request a free AI Answer Snapshot, then buy the ${fixPackIntroPriceLabel} AI Visibility Fix Pack (${fixPackListPriceLabel} list) for one business. Sold by ${sellerName}.`,
  path: "/checkout",
});

function firstString(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function buyButton(href: string, label: string) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-12 items-center justify-center rounded-lg border border-ink/30 bg-cream text-ink hover:border-ink hover:bg-paper-2"
    >
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function Offer({
  title,
  description,
  sampleHref = "/sample-audit.pdf",
  sampleLabel = "See a sample report (PDF)",
  emphasis = "secondary",
  children,
}: {
  title: string;
  description: string;
  sampleHref?: string;
  sampleLabel?: string;
  emphasis?: "primary" | "secondary";
  children: ReactNode;
}) {
  const primary = emphasis === "primary";
  const Heading = primary ? "h2" : "h3";
  const sampleClass = primary
    ? "mt-3 inline-flex min-h-11 items-center text-sm font-medium text-cream underline underline-offset-4 hover:underline"
    : "mt-3 inline-flex min-h-11 items-center text-sm font-medium text-forest underline underline-offset-4 hover:underline";
  return (
    <article
      className={
        primary
          ? "rounded-2xl border border-ink bg-ink p-5 text-cream shadow-[0_24px_60px_-32px_rgba(27,24,20,0.55)] sm:p-8"
          : "rounded-2xl border border-rule bg-cream p-6"
      }
    >
      {primary ? <p className="kicker on-ink">Start here</p> : null}
      <Heading
        className={
          primary
            ? "mt-2 font-serif text-2xl leading-tight tracking-tight sm:mt-3 sm:text-4xl"
            : "font-serif text-2xl tracking-tight"
        }
      >
        {title}
      </Heading>
      {primary ? (
        <p className="mt-2 font-serif text-4xl tracking-tight sm:mt-4 sm:text-5xl">
          {fixPackIntroPriceLabel}
          <span className="ml-3 align-middle font-sans text-base font-normal tracking-normal text-[#d7c7b0]">
            <span className="line-through">{fixPackListPriceLabel}</span> list
          </span>
        </p>
      ) : null}
      <p
        className={
          primary
            ? "mt-2 text-sm leading-6 text-[#d7c7b0]"
            : "mt-2 text-sm leading-6 text-ink-soft"
        }
      >
        {description}
      </p>
      <div className="mt-5">{children}</div>
      {sampleHref.endsWith(".pdf") ? (
        <a href={sampleHref} className={sampleClass}>
          {sampleLabel}
        </a>
      ) : (
        <Link href={sampleHref} className={sampleClass}>
          {sampleLabel}
        </Link>
      )}
    </article>
  );
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const requested = firstString(params.url) ?? "";
  const siteUrl = normalizeSiteUrl(requested) ?? "";

  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-2xl flex-1 px-5 pb-10 pt-4 sm:py-10">
        <p className="kicker">Checkout</p>
        <h1 className="mt-2 font-serif text-3xl tracking-tight sm:mt-3 sm:text-4xl">
          Free snapshot, then the Fix Pack
        </h1>
        <p className="mt-2 text-ink-soft leading-6 sm:leading-7">
          See who ChatGPT names for your trade and city. The free snapshot
          comes first.
        </p>

        <div className="mt-4 sm:mt-6">
          <Offer
            emphasis="primary"
            title={`AI Visibility Fix Pack (${fixPackIntroPriceLabel})`}
            description="One business, one city, one service."
            sampleHref="/sample-snapshot"
            sampleLabel="See an example snapshot (fictional business)"
          >
            <div className="flex flex-col gap-3">
              <Link
                href="/free-snapshot"
                className="flex h-12 items-center justify-center rounded-lg bg-cream font-medium text-ink hover:bg-paper"
              >
                Get a free AI Answer Snapshot
              </Link>
              <FixPackBuyLink
                tone="dark"
                className="flex h-12 items-center justify-center rounded-lg border border-cream/50 bg-forest font-medium text-cream hover:bg-forest-deep"
              />
            </div>
            <FixPackOfferFacts tone="dark" className="mt-5" />
            <p className="mt-3 text-sm leading-6">
              <Link href="/fix-pack" className="text-cream underline">
                See what&apos;s in the Fix Pack
              </Link>
            </p>
          </Offer>
        </div>

        <div className="mt-5">
          <TrustLinks />
        </div>

        <details className="group mt-8 border-t border-rule">
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-4 py-3 marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="min-w-0">
              <span className="block font-medium text-ink">
                Other CiteScore products
              </span>
              <span className="mt-0.5 block text-sm font-normal leading-6 text-ink-soft">
                Looking for the older audit products?
              </span>
            </span>
            <span
              aria-hidden="true"
              className="ml-auto text-xl leading-none text-ink-soft group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            The {site.priceLabel} audit is a self-serve PDF. The $99 and $149
            audits are written for one public URL and delivered within 3
            business days. The {agencyKitLabel} is the writing around an audit.
          </p>
          <div className="mt-5 space-y-4 pb-2">
            <Offer
              title={`${site.priceLabel} GEO audit`}
              description="A self-serve PDF with a 0–100 score and about ten fixes, usually a few minutes after payment."
            >
              <AuditCheckout defaultUrl={siteUrl} />
            </Offer>

            <Offer
              title={agencyKitLabel}
              description="Client report template, pitch email sequence, pricing tiers, a one-pager, and a 30-day delivery SOP."
            >
              {buyButton(agencyKitUrl, "Buy the GEO Agency Kit")}
            </Offer>

            <Offer
              title={doneForYouAuditLabel}
              description="A written walkthrough of one public URL, delivered within 3 business days."
            >
              {buyButton(doneForYouAuditUrl, "Buy the $99 audit")}
            </Offer>

            <Offer
              title={whiteLabelCheckoutLabel}
              description="An unbranded PDF of one public URL, delivered within 3 business days, with no CiteScore branding."
            >
              {buyButton(whiteLabelAuditUrl, "Buy the white-label audit")}
            </Offer>
          </div>
        </details>

        <p className="mt-8 text-sm leading-6 text-ink-soft">
          By continuing you agree that the public URL may be fetched and sent
          to a language model to produce the audit.{" "}
          <Link href="/privacy" className="text-forest underline">
            Privacy
          </Link>
          . Other paid files: refund within 14 days if the file is missing,
          unreadable, or about the wrong URL. The Fix Pack: full refund
          within 14 days if it is not useful.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
