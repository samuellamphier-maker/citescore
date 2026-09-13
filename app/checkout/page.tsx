import type { Metadata } from "next";
import Link from "next/link";
import { WaitlistForm } from "@/components/WaitlistForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { buildPaymentHref, checkoutUrl, site } from "@/lib/site";
import { normalizeSiteUrl } from "@/lib/urls";

export const metadata: Metadata = {
  title: "Checkout",
  description: `Pay ${site.priceLabel} for a CiteScore audit, or join the waitlist if checkout is not live yet.`,
};

function firstString(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
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
      <main className="mx-auto w-full max-w-xl flex-1 px-5 py-14">
        <p className="kicker">Checkout</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">
          {paymentsLive
            ? `Pay ${site.priceLabel} for the audit`
            : "Checkout is coming online"}
        </h1>
        <p className="mt-4 text-ink-soft leading-7">
          {paymentsLive
            ? "You’ll complete payment on a Stripe or Lemon Squeezy payment link. After we confirm the charge, we crawl the URL and email the PDF. This pre-sell does not generate the report in the browser."
            : "A payment link is not configured on this deploy. Leave your email and the URL you want audited — we will notify you the moment the $39 checkout is live."}
        </p>

        <div className="mt-8 rounded-2xl border border-rule bg-cream p-6">
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

          <div className="mt-6 border-t border-rule pt-6">
            {paymentsLive ? (
              <div className="space-y-4">
                <a
                  href={paymentHref}
                  className="flex h-12 items-center justify-center rounded-lg bg-forest text-cream hover:bg-forest-deep"
                >
                  Continue to payment · {site.priceLabel}
                </a>
                <p className="text-sm leading-6 text-ink-soft">
                  The payment link receives{" "}
                  <code className="font-mono text-xs">site_url</code> as a
                  query parameter so you can map it to a custom field in Stripe
                  or Lemon Squeezy.
                </p>
                <Link href="/sample" className="block text-sm text-forest underline">
                  Preview the sample report first
                </Link>
              </div>
            ) : (
              <WaitlistForm defaultUrl={siteUrl} />
            )}
          </div>
        </div>

        <p className="mt-8 text-sm leading-6 text-ink-soft">
          By continuing you agree that the public URL may be fetched and sent
          to a language model to produce the audit.{" "}
          <Link href="/privacy" className="text-forest underline">
            Privacy
          </Link>
          . Refunds: 14 days if the file is missing, unreadable, or about the
          wrong URL.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
