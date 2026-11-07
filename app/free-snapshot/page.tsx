import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { FixPackBuyLink } from "@/components/FixPackBuyLink";
import { FixPackOfferFacts } from "@/components/FixPackOfferFacts";
import { FreeSnapshotLead } from "@/components/FreeSnapshotLead";
import { JsonLd } from "@/components/JsonLd";
import { SampleSnapshotExcerpt } from "@/components/SampleSnapshotExcerpt";
import { SnapshotRequestForm } from "@/components/SnapshotRequestForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TrustLinks } from "@/components/TrustLinks";
import { pageMeta } from "@/lib/content/meta";
import { faqPageJsonLd, freeSnapshotPageFaqs } from "@/lib/offer-faq";
import {
  contactEmail,
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  publicOrigin,
  sellerName,
} from "@/lib/site";
import { freeSnapshotServiceJsonLd } from "@/lib/site-schema";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Free AI Answer Snapshot",
    description: `Request a free AI Answer Snapshot for one local business. We ask logged-out ChatGPT and Perplexity who they name for that trade and city, and reply with a one-page snapshot. The ${fixPackIntroPriceLabel} Fix Pack is optional.`,
    path: "/free-snapshot",
  }),
  authors: [{ name: "CiteScore Team" }],
  creator: sellerName,
};

export default function FreeSnapshotPage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(freeSnapshotPageFaqs)} />
      <JsonLd data={freeSnapshotServiceJsonLd(publicOrigin())} />
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-5 py-4 sm:py-14">
        <p className="kicker">Free · no checkout</p>
        <FreeSnapshotLead />

        <div className="mt-3 lg:hidden">
          <SampleSnapshotExcerpt variant="compact" />
          <p className="mt-1 text-xs leading-5 text-ink-soft">
            Fictional business, illustrative numbers. Not a customer result, and not a live ChatGPT or Perplexity answer.
          </p>
        </div>

        <div className="mt-4 grid items-start gap-6 lg:mt-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(16rem,0.95fr)] lg:gap-8">
          <div className="min-w-0">
            <section className="rounded-2xl border border-rule bg-cream px-4 py-4 sm:px-6 sm:py-5">
              <p className="kicker">Request</p>
              <h2 className="mt-2 font-serif text-2xl tracking-tight">
                Request the free snapshot.
              </h2>
              <div className="mt-3">
                <SnapshotRequestForm />
              </div>
              <p className="mt-4 text-sm leading-6 text-ink-soft">
                Prepared by the CiteScore Team. Sold by {sellerName}.
              </p>
            </section>

            <p className="mt-4 text-sm leading-6">
              <Link href="/fix-pack" className="font-medium text-forest underline">
                Skip straight to the {fixPackIntroPriceLabel} Fix Pack
              </Link>
              <span className="text-ink-soft">
                . The Fix Pack is the done-for-you work after you have seen who
                was named. Introductory price {fixPackIntroPriceLabel}. List
                price {fixPackListPriceLabel}. It is not a promise that any
                assistant will name the business.
              </span>
            </p>

            <section className="mt-6" aria-labelledby="after-submit">
              <h2 id="after-submit" className="font-serif text-2xl tracking-tight sm:text-3xl">
                What happens after you submit
              </h2>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-ink-soft">
                <li>
                  You submit the form. The button sends the business name, city, service, website, and email to {contactEmail} through FlowForm. The subject is “Free AI Answer Snapshot.” No account and no paid checkout. If that send fails, the email button, the address, and the copy buttons stay on this page.
                </li>
                <li>
                  We ask logged-out ChatGPT and Perplexity who they name for
                  that trade and city, and record who is named.
                </li>
                <li>
                  We reply with the one-page snapshot by email. There is no set delivery time.
                </li>
              </ol>
              <p className="mt-4 text-sm leading-7 text-ink-soft">
                AI answers vary run to run. This is a snapshot, not a ranking.
                The free snapshot comes first.
              </p>
            </section>
          </div>

          <aside className="min-w-0" aria-labelledby="snapshot-sample-preview">
            <p className="kicker">Sample</p>
            <h2
              id="snapshot-sample-preview"
              className="mt-2 font-serif text-2xl tracking-tight sm:text-3xl"
            >
              What the one-page snapshot looks like
            </h2>
            <p className="mt-3 text-sm leading-6">
              <Link href="/sample-snapshot" className="font-medium text-forest underline">
                See the full example snapshot
              </Link>
              <span className="text-ink-soft">
                . Fictional business, illustrative numbers. Not a customer
                result, and not a live ChatGPT or Perplexity answer.
              </span>
            </p>
            <div className="mt-4">
              <SampleSnapshotExcerpt />
            </div>
          </aside>
        </div>

        <div className="max-w-3xl">
        <p className="mt-12 leading-7 text-ink-soft">
          CiteScore asks logged-out ChatGPT and Perplexity who they name for
          that trade and city. The business receives a one-page snapshot: who
          is named, which sources are cited, and how the Google rating and
          review count compare. A real snapshot prints the day the prompts
          were asked. AI answers vary run to run. This is a snapshot, not a
          ranking. No payment.
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
          {fixPackListPriceLabel}. We email the Fix Pack within a few
          business days after payment, once we have the business name, city,
          service, and public site URL. It is not a promise that any assistant
          will name the business. The buy button opens {fixPackIntroPriceLabel}{" "}
          card checkout.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <FixPackBuyLink />
          <Link
            href="/fix-pack"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-ink/25 bg-cream px-5 text-base font-medium text-ink hover:border-ink"
          >
            See what&apos;s in the Fix Pack
          </Link>
        </div>
        <p className="mt-4 text-sm leading-6">
          <Link href="/checkout" className="font-medium text-forest underline">
            Open checkout
          </Link>
          <span className="text-ink-soft">
            . The {fixPackIntroPriceLabel} Fix Pack is on that page.
          </span>
        </p>
        <FixPackOfferFacts className="mt-4" />
        <div className="mt-6">
          <TrustLinks />
        </div>

        <section id="faq" className="mt-12">
          <h2 className="font-serif text-3xl tracking-tight">FAQ</h2>
          <p className="mt-4 text-sm leading-7 text-ink-soft">
            What the one-page snapshot shows, how to ask, and when the{" "}
            {fixPackIntroPriceLabel} Fix Pack is emailed.
          </p>
          <FaqList items={freeSnapshotPageFaqs} />
        </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
