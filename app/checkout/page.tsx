import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { WaitlistForm } from "@/components/WaitlistForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMeta } from "@/lib/content/meta";
import { FixPackBuyLink } from "@/components/FixPackBuyLink";
import { FixPackOfferFacts } from "@/components/FixPackOfferFacts";
import { TrustLinks } from "@/components/TrustLinks";
import {
  agencyKitLabel,
  agencyKitUrl,
  buildPaymentHref,
  checkoutUrl,
  doneForYouAuditLabel,
  doneForYouAuditUrl,
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  site,
  whiteLabelAuditUrl,
} from "@/lib/site";
import { normalizeSiteUrl } from "@/lib/urls";

const whiteLabelCheckoutLabel =
  "White-Label AI Search Audit for Agencies ($149)";

export const metadata: Metadata = pageMeta({
  title: "Checkout",
  description: `Buy the ${fixPackIntroPriceLabel} AI Visibility Fix Pack, or buy the ${site.priceLabel} CiteScore audit, the ${agencyKitLabel}, the ${doneForYouAuditLabel}, or the ${whiteLabelCheckoutLabel}.`,
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
      className="flex h-12 items-center justify-center rounded-lg bg-forest text-cream hover:bg-forest-deep"
    >
      {label}
    </a>
  );
}

function Offer({
  title,
  description,
  sampleHref = "/sample-audit.pdf",
  sampleLabel = "See a sample report (PDF)",
  children,
}: {
  title: string;
  description: string;
  sampleHref?: string;
  sampleLabel?: string;
  children: ReactNode;
}) {
  const sampleClass =
    "mt-3 inline-flex text-sm font-medium text-forest underline underline-offset-4 hover:underline";
  return (
    <article className="rounded-2xl border border-rule bg-cream p-6">
      <h2 className="font-serif text-2xl tracking-tight">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{description}</p>
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
  const paymentHref = buildPaymentHref(siteUrl || undefined);
  const paymentsLive = Boolean(checkoutUrl);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-14">
        <p className="kicker">Checkout</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">
          Choose a product
        </h1>
        <p className="mt-4 text-ink-soft leading-7">
          The AI Visibility Fix Pack is {fixPackIntroPriceLabel} introductory
          ({fixPackListPriceLabel} list), for one business. The{" "}
          {site.priceLabel} audit is a self-serve PDF. The $99 and $149
          audits are written for one public URL and delivered within 3
          business days. The {agencyKitLabel} is the writing around an audit.
        </p>

        <div className="mt-8 space-y-4">
          <Offer
            title={`AI Visibility Fix Pack (${fixPackIntroPriceLabel})`}
            description={`Introductory ${fixPackIntroPriceLabel}, list ${fixPackListPriceLabel}. One business, one city, one service. Card checkout is ${fixPackIntroPriceLabel}.`}
            sampleHref="/sample-snapshot"
            sampleLabel="See an example snapshot (fictional business)"
          >
            <p className="mb-3 text-sm leading-6 text-ink-soft">
              The free snapshot comes first.{" "}
              <Link href="/#snapshot" className="text-forest underline">
                Request it by email
              </Link>
              .
            </p>
            <FixPackBuyLink className="flex h-12 items-center justify-center rounded-lg bg-forest text-cream hover:bg-forest-deep" />
            <FixPackOfferFacts className="mt-4" />
            <p className="mt-3 text-sm leading-6">
              <Link href="/fix-pack" className="text-forest underline">
                What is in the pack
              </Link>
            </p>
          </Offer>

          <Offer
            title={`${site.priceLabel} GEO audit`}
            description="A self-serve PDF with a 0–100 score and about ten fixes, usually a few minutes after payment."
          >
            <p className="kicker">Site to audit</p>
            <p className="mt-2 break-all font-mono text-sm">
              {siteUrl || "No URL attached yet"}
            </p>
            {!siteUrl ? (
              <p className="mt-2 text-sm text-ink-soft">
                You can still continue.{" "}
                <Link href="/#audit" className="text-forest underline">
                  Paste a URL on the homepage
                </Link>{" "}
                if you have one.
              </p>
            ) : null}
            <div className="mt-5">
              {paymentsLive ? (
                <div className="space-y-4">
                  <a
                    href={paymentHref}
                    className="flex h-12 items-center justify-center rounded-lg bg-forest text-cream hover:bg-forest-deep"
                  >
                    Continue to payment · {site.priceLabel}
                  </a>
                  <p className="text-sm leading-6 text-ink-soft">
                    The Payment Link receives{" "}
                    <code className="font-mono text-xs">
                      client_reference_id
                    </code>{" "}
                    (the site URL, first 200 characters) so the webhook can
                    attach the right URL to the session. We also pass{" "}
                    <code className="font-mono text-xs">site_url</code>.
                  </p>
                </div>
              ) : (
                <WaitlistForm defaultUrl={siteUrl} />
              )}
            </div>
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
        <div className="mt-3">
          <TrustLinks />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
