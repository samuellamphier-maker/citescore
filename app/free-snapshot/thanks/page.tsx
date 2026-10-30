import type { Metadata } from "next";
import Link from "next/link";
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
      "We received your free AI Answer Snapshot request. We ask logged-out ChatGPT and Perplexity who they name, then reply with a one-page snapshot by email. No payment.",
    path: "/free-snapshot/thanks",
  }),
  robots: { index: false, follow: false },
};

export default function FreeSnapshotThanksPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-14">
        <p className="kicker">Free · no checkout</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
          Request received. We reply with your one-page snapshot by email.
        </h1>
        <p className="mt-4 leading-7 text-ink-soft">
          You submitted the form. FlowForm delivers the business name, city,
          service, website, and email. No account and no paid checkout. We ask
          logged-out ChatGPT and Perplexity who they name for that trade and
          city, and record who is named. We reply with the one-page snapshot
          by email.
        </p>
        <p className="mt-4 leading-7 text-ink-soft">
          The one-page snapshot records who is named, which sources are cited,
          and how the Google rating and review count compare. A real snapshot
          prints the day the prompts were asked. AI answers vary run to run.
          This is a snapshot, not a ranking. No payment. The free snapshot
          comes first.
        </p>

        <h2 className="mt-12 font-serif text-3xl tracking-tight">What happens next</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-ink-soft">
          <li>
            You submit the form. FlowForm delivers the business name, city,
            service, website, and email. No account and no paid checkout.
          </li>
          <li>
            We ask logged-out ChatGPT and Perplexity who they name for that
            trade and city, and record who is named.
          </li>
          <li>We reply with the one-page snapshot by email.</li>
        </ol>
        <p className="mt-4 text-sm leading-7 text-ink-soft">
          AI answers vary run to run. This is a snapshot, not a ranking.
        </p>

        <p className="mt-8 text-sm leading-6">
          <Link href="/sample-snapshot" className="font-medium text-forest underline">
            See an example snapshot
          </Link>
          <span className="text-ink-soft">
            . Fictional business, illustrative numbers. Not a customer result,
            and not a live ChatGPT or Perplexity answer.
          </span>
        </p>

        <h2 className="mt-12 font-serif text-3xl tracking-tight">
          Optional next step: the Fix Pack
        </h2>
        <p className="mt-4 leading-7 text-ink-soft">
          The snapshot is free. The{" "}
          <Link href="/fix-pack" className="text-forest underline">
            Fix Pack
          </Link>{" "}
          is the done-for-you work after you have seen who was named.
          Introductory price {fixPackIntroPriceLabel}. List price{" "}
          {fixPackListPriceLabel}. We email the Fix Pack within a few business
          days after payment, once we have the business name, city, service,
          and public site URL. It is not a promise that any assistant will name
          the business.
        </p>
        <p className="mt-6 text-sm leading-6 text-ink-soft">
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
