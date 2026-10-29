import type { Metadata } from "next";
import Link from "next/link";
import { FixPackBuyLink } from "@/components/FixPackBuyLink";
import { FixPackOfferFacts } from "@/components/FixPackOfferFacts";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TrustLinks } from "@/components/TrustLinks";
import { pageMeta } from "@/lib/content/meta";
import { fixPackDeliverables } from "@/lib/fix-pack-offer";
import {
  contactEmail,
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  sellerName,
} from "@/lib/site";

export const metadata: Metadata = {
  ...pageMeta({
    title: "How it works",
    description: `Request a free AI Answer Snapshot by email. CiteScore asks logged-out ChatGPT and Perplexity who they name, then replies with a one-page snapshot. The ${fixPackIntroPriceLabel} Fix Pack is optional.`,
    path: "/how-it-works",
  }),
  authors: [{ name: "CiteScore Team" }],
  creator: sellerName,
};

export default function HowItWorksPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-14">
        <p className="kicker">How it works</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
          Request a snapshot. Read who was named. The Fix Pack is optional.
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          CiteScore asks logged-out ChatGPT and Perplexity who they name for
          that trade and city. The business receives a one-page snapshot. No
          payment. The Fix Pack is the done-for-you work after you have seen
          who was named.
        </p>
        <p className="mt-4 text-sm leading-6 text-ink-soft">
          Prepared by the CiteScore Team. Sold by {sellerName}. Prices are on{" "}
          <Link href="/pricing" className="text-forest underline">
            pricing
          </Link>
          .
        </p>

        <ol className="mt-10 space-y-4">
          <li className="rounded-2xl border border-rule bg-cream px-5 py-5">
            <p className="kicker text-copper">01</p>
            <h2 className="mt-2 font-serif text-2xl tracking-tight">
              Request a free AI Answer Snapshot
            </h2>
            <p className="mt-3 text-sm leading-7 text-ink-soft">
              You send the email. No account and no paid checkout. The button
              on the{" "}
              <Link href="/free-snapshot" className="text-forest underline">
                free snapshot
              </Link>{" "}
              page opens your email app to {contactEmail} with the subject
              “Free AI Answer Snapshot.” The message asks for the business
              name, city, service, website, and email. The form does not post
              to a server. We receive those only if you send that message. If
              no mail app opens, the address and the copy buttons stay on that
              page.
            </p>
            <p className="mt-4">
              <Link
                href="/free-snapshot"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream hover:bg-forest-deep"
              >
                Get a free AI Answer Snapshot
              </Link>
            </p>
          </li>

          <li className="rounded-2xl border border-rule bg-cream px-5 py-5">
            <p className="kicker text-copper">02</p>
            <h2 className="mt-2 font-serif text-2xl tracking-tight">
              Receive the one-page findings
            </h2>
            <p className="mt-3 text-sm leading-7 text-ink-soft">
              We ask logged-out ChatGPT and Perplexity who they name for that
              trade and city, and record who is named. We reply with the
              one-page snapshot: who is named, which sources are cited, and
              how the Google rating and review count compare. A real snapshot
              prints the day the prompts were asked. AI answers vary run to
              run. This is a snapshot, not a ranking.
            </p>
            <p className="mt-4 text-sm leading-6">
              <Link href="/sample-snapshot" className="font-medium text-forest underline">
                See an example snapshot
              </Link>
              <span className="text-ink-soft">
                . Fictional business, illustrative numbers. Not a customer
                result, and not a live ChatGPT or Perplexity answer.
              </span>
            </p>
          </li>

          <li className="rounded-2xl border border-rule bg-cream px-5 py-5">
            <p className="kicker text-copper">03</p>
            <h2 className="mt-2 font-serif text-2xl tracking-tight">
              Optional: the {fixPackIntroPriceLabel} Fix Pack
            </h2>
            <p className="mt-3 text-sm leading-7 text-ink-soft">
              The snapshot is free. The{" "}
              <Link href="/fix-pack" className="text-forest underline">
                Fix Pack
              </Link>{" "}
              is the done-for-you work after you have seen who was named.
              Introductory price {fixPackIntroPriceLabel}. List price{" "}
              {fixPackListPriceLabel}. One business, one city, one service.
              The free snapshot comes first. The buy button opens{" "}
              {fixPackIntroPriceLabel} card checkout. We email the Fix Pack
              within a few business days after payment, once we have the
              business name, city, service, and public site URL. It is not a
              promise that any assistant will name the business. Do not send
              passwords, cookies, or pages behind a login.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-soft">
              {fixPackDeliverables.map((item) => (
                <li key={item.title}>
                  <span className="text-ink">{item.title}.</span> {item.body}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <FixPackBuyLink />
              <Link
                href="/fix-pack"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-ink/25 bg-paper px-5 text-base font-medium text-ink hover:border-ink"
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
          </li>
        </ol>

        <FixPackOfferFacts className="mt-8" />
        <div className="mt-4">
          <TrustLinks />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
