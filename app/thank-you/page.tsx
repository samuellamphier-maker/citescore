import type { Metadata } from "next";
import Link from "next/link";
import { FixPackBuyLink } from "@/components/FixPackBuyLink";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMeta } from "@/lib/content/meta";
import {
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  sellerName,
} from "@/lib/site";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Free snapshot request received",
    description:
      "We received your free AI Answer Snapshot request. No payment.",
    path: "/thank-you",
  }),
  authors: [{ name: "CiteScore Team" }],
  creator: sellerName,
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-5 py-14">
        <p className="kicker">Free · no checkout</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
          Request received. We reply with your one-page snapshot by email.
        </h1>
        <p className="mt-4 leading-7 text-ink-soft">
          The CiteScore Team prepares the one-page snapshot and emails it.
        </p>
        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap">
          <div>
            <Link
              href="/sample-snapshot"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream hover:bg-forest-deep"
            >
              See an example snapshot
            </Link>
            <p className="mt-2 max-w-sm text-sm leading-6 text-ink-soft">
              Fictional business, illustrative numbers. Not a customer result,
              and not a live ChatGPT or Perplexity answer.
            </p>
          </div>
          <Link
            href="/fix-pack"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-ink/25 bg-cream px-5 text-base font-medium text-ink hover:border-ink"
          >
            See what&apos;s in the Fix Pack
          </Link>
        </div>

        <h2 className="mt-12 font-serif text-3xl tracking-tight">What happens next</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-ink-soft">
          <li>
            FlowForm delivers the business name, city, service, website, and email. No account and no paid checkout.
          </li>
          <li>
            The CiteScore Team asks logged-out ChatGPT and Perplexity who they
            name for that trade and city, and records who is named.
          </li>
          <li>
            The CiteScore Team emails the one-page snapshot: who is named,
            which sources are cited, and how the Google rating and review
            count compare. A real snapshot prints the day the prompts were
            asked. There is no set delivery time.
          </li>
        </ol>
        <p className="mt-4 text-sm leading-7 text-ink-soft">
          AI answers vary run to run. This is a snapshot, not a ranking.
        </p>

        <h2 className="mt-12 font-serif text-3xl tracking-tight">
          Optional next step: the Fix Pack
        </h2>
        <p className="mt-4 leading-7 text-ink-soft">
          The{" "}
          <Link href="/fix-pack" className="text-forest underline">
            Fix Pack
          </Link>{" "}
          is the done-for-you work after you have seen who was named.
          Introductory price {fixPackIntroPriceLabel}. List price{" "}
          {fixPackListPriceLabel}. We email the Fix Pack within a few business
          days after payment, once we have the business name, city, service,
          and public site URL. After you pay, send those fields on the{" "}
          <Link href="/fix-pack/next-steps" className="text-forest underline">
            next-steps page
          </Link>
          , or email them. It is not a promise that any assistant will name the business. The buy button opens {fixPackIntroPriceLabel} card
          checkout.
        </p>
        <div className="mt-6">
          <FixPackBuyLink />
        </div>
        <p className="mt-6 text-sm leading-6">
          <Link href="/sample-fix-pack" className="font-medium text-forest underline">
            See a sample Fix Pack
          </Link>
          <span className="text-ink-soft">
            . Illustrative example content, not a real client or real results.
          </span>
        </p>
        <p className="mt-6 text-sm leading-6 text-ink-soft">
          We email the snapshot to the address you submitted. We do not sell
          emails.{" "}
          <Link href="/privacy" className="text-forest underline">
            Privacy
          </Link>
          .
        </p>
        <p className="mt-4 text-sm leading-6 text-ink-soft">
          Prepared by the CiteScore Team. Sold by {sellerName}.
        </p>
        <p className="mt-8 text-sm leading-6">
          <Link href="/free-snapshot" className="font-medium text-forest underline">
            Back to the free snapshot
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
