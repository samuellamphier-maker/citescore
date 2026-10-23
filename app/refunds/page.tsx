import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMeta } from "@/lib/content/meta";
import {
  contactEmail,
  fixPackIntroPriceLabel,
  sellerName,
  site,
} from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Refunds",
  description: `Full refund within 14 days if the CiteScore Fix Pack is not useful. Sold by ${sellerName}. Contact ${contactEmail}.`,
  path: "/refunds",
});

export default function RefundsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-14">
        <p className="kicker">Refunds</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">Refunds</h1>
        <p className="mt-4 text-sm text-ink-soft">
          Sold by {sellerName}. Effective 23 October 2026.
        </p>
        <div className="mt-8 space-y-6 text-[15px] leading-7 text-ink-soft">
          <h2 className="font-serif text-2xl text-ink">Fix Pack</h2>
          <p>
            If the AI Visibility Fix Pack ({fixPackIntroPriceLabel}{" "}
            introductory) is not useful, email{" "}
            <a href={`mailto:${contactEmail}`} className="text-forest underline">
              {contactEmail}
            </a>{" "}
            within 14 days of delivery and {sellerName} refunds that purchase
            in full. You do not need to show that you installed the markup or
            sent the review script.
          </p>
          <p>
            The 14 days start when the Fix Pack is delivered, not when you
            request the free snapshot. The free AI Answer Snapshot has no
            charge, so there is nothing to refund on it.
          </p>

          <h2 className="font-serif text-2xl text-ink">Other digital files</h2>
          <p>
            For the {site.priceLabel} audit and the other paid files listed
            on the{" "}
            <Link href="/terms" className="text-forest underline">
              terms
            </Link>
            , email {contactEmail} within 14 days of payment if the file is
            missing, unreadable, or an audit is about the wrong URL.{" "}
            {sellerName} refunds that purchase. Those files are not refunded
            because you dislike a score, disagree with a fix, or choose not
            to use the file.
          </p>

          <h2 className="font-serif text-2xl text-ink">How to ask</h2>
          <p>
            Send the order email, the product name, and the date you paid or
            received the file to{" "}
            <a href={`mailto:${contactEmail}`} className="text-forest underline">
              {contactEmail}
            </a>
            . Card payments, when a checkout link is in use, are returned
            through the processor that took the payment. {sellerName} does
            not see full card numbers.
          </p>
          <p>
            Questions about what we store are on the{" "}
            <Link href="/privacy" className="text-forest underline">
              privacy
            </Link>{" "}
            page. The purchase rules are on the{" "}
            <Link href="/terms" className="text-forest underline">
              terms
            </Link>{" "}
            page.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
