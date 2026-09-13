import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Payment received",
  description: `Thanks — your ${site.priceLabel} CiteScore audit is in the queue.`,
};

export default function ThanksPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-xl flex-1 px-5 py-14">
        <p className="kicker">Checkout</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">
          Payment received. The crawl is starting.
        </h1>
        <p className="mt-4 text-ink-soft leading-7">
          We just got the Stripe confirmation. Next we fetch the public URL you
          submitted, score on-page GEO signals, render the PDF, and email it to
          the address on the receipt. Typical turnaround is a few minutes.
        </p>
        <div className="mt-8 rounded-2xl border border-rule bg-cream p-6 text-sm leading-6 text-ink-soft">
          <p>
            We do <strong className="text-ink">not</strong> log into ChatGPT,
            Perplexity, or Google on your behalf. The engine snapshot is an
            inferred likelihood from what we can fetch — labeled that way in
            the report.
          </p>
          <p className="mt-3">
            If the PDF does not arrive, check spam, then reply to the receipt.
            Missing, unreadable, or wrong-URL files are refunded within 14 days.
          </p>
        </div>
        <div className="mt-8 flex gap-4 text-sm">
          <Link href="/sample" className="text-forest underline">
            Preview the sample format
          </Link>
          <Link href="/" className="text-forest underline">
            Back home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
