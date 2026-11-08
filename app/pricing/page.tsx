import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { InlineSnapshotRequest } from "@/components/InlineSnapshotRequest";
import { FixPackBuyLink } from "@/components/FixPackBuyLink";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { StickySnapshotOffer } from "@/components/StickySnapshotOffer";
import { SiteHeader } from "@/components/SiteHeader";
import { TrustLinks } from "@/components/TrustLinks";
import {
  pricingFixPackDeliveryDescription,
  pricingFixPackLimitDescription,
  pricingFixPackProductJsonLd,
  pricingSnapshotOfferDescription,
  pricingSnapshotServiceJsonLd,
} from "@/lib/core-offer-schema";
import { pageMeta } from "@/lib/content/meta";
import { fixPackDeliverables } from "@/lib/fix-pack-offer";
import {
  faqPageJsonLd,
  fixPackPurchaseFaqs,
  snapshotOfferFaqs,
  type FaqItem,
} from "@/lib/offer-faq";
import {
  agencyKitLabel,
  agencyKitUrl,
  contactEmail,
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  publicOrigin,
  sellerName,
  templatePackLabel,
  templatePackUrl,
} from "@/lib/site";

const pricingFaqQuestions = [
  "What is the difference between the free snapshot and the Fix Pack?",
  "What happens after I purchase?",
  "What if the Fix Pack is not useful?",
] as const;

const pricingFaqs: FaqItem[] = pricingFaqQuestions.map((question) => {
  const item = [...fixPackPurchaseFaqs, ...snapshotOfferFaqs].find(
    (faq) => faq.q === question,
  );
  if (!item) throw new Error(`Missing pricing FAQ: ${question}`);
  return item;
});

export const metadata: Metadata = {
  ...pageMeta({
    title: "Pricing",
    description: `The AI Answer Snapshot is free. The AI Visibility Fix Pack is ${fixPackIntroPriceLabel} introductory (${fixPackListPriceLabel} list) for one business, one city, and one service, emailed within a few business days after payment.`,
    path: "/pricing",
  }),
  authors: [{ name: "CiteScore Team" }],
  creator: sellerName,
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(pricingFaqs)} />
      <JsonLd data={pricingSnapshotServiceJsonLd(publicOrigin())} />
      <JsonLd data={pricingFixPackProductJsonLd(publicOrigin())} />
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-5 py-14">
        <p className="kicker">Pricing</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
          The snapshot is free. The Fix Pack is {fixPackIntroPriceLabel}.
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-soft">
          The Fix Pack is the done-for-you work after you have seen who was
          named. One business, one city, one service.
        </p>
        <p className="mt-4 text-sm leading-6 text-ink-soft">
          Prepared by the CiteScore Team. Sold by {sellerName}. The steps are
          on{" "}
          <Link href="/how-it-works" className="text-forest underline">
            how it works
          </Link>
          . Questions are on the{" "}
          <Link href="/faq" className="text-forest underline">
            FAQ
          </Link>
          .
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="/free-snapshot"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream hover:bg-forest-deep"
          >
            Get a free AI Answer Snapshot
          </Link>
          <FixPackBuyLink />
        </div>
        <p className="mt-4 text-sm leading-6">
          <Link href="/checkout" className="font-medium text-forest underline">
            Open checkout
          </Link>
          <span className="text-ink-soft">
            . The {fixPackIntroPriceLabel} Fix Pack is on that page.
          </span>
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-rule bg-cream px-5 py-6 sm:px-6">
            <p className="kicker">Free · no checkout</p>
            <h2 className="mt-2 font-serif text-3xl tracking-tight">
              AI Answer Snapshot
            </h2>
            <p className="mt-3 font-serif text-5xl tracking-tight">Free</p>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              No payment. No account.
            </p>
            <h3 className="mt-6 font-medium">What you get</h3>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              {pricingSnapshotOfferDescription}
            </p>
            <h3 className="mt-6 font-medium">How delivery works</h3>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              The form sends the business name, city, service, website, and
              email to {contactEmail} through FlowForm. We reply with the
              one-page snapshot. The free AI Answer Snapshot has no charge, so
              there is nothing to refund on it.
            </p>
            <div className="mt-6">
              <Link
                href="/free-snapshot"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream hover:bg-forest-deep"
              >
                Get a free AI Answer Snapshot
              </Link>
            </div>
            <p className="mt-4 text-sm leading-6">
              <Link href="/sample-snapshot" className="font-medium text-forest underline">
                See an example snapshot
              </Link>
              <span className="text-ink-soft">
                . Fictional business, illustrative numbers.
              </span>
            </p>
          </article>

          <article className="rounded-2xl border border-ink bg-ink px-5 py-6 text-cream sm:px-6">
            <p className="kicker on-ink">Introductory</p>
            <h2 className="mt-2 font-serif text-3xl tracking-tight">
              AI Visibility Fix Pack
            </h2>
            <p className="mt-3 font-serif text-5xl tracking-tight">
              {fixPackIntroPriceLabel}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#d7c7b0]">
              <span className="line-through">{fixPackListPriceLabel}</span>{" "}
              list · one business, one city, one service
            </p>
            <h3 className="mt-6 font-medium">What you get</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-[#d7c7b0]">
              {fixPackDeliverables.map((item) => (
                <li key={item.title}>{item.title}</li>
              ))}
            </ul>
            <h3 className="mt-6 font-medium">How delivery works</h3>
            <p className="mt-2 text-sm leading-6 text-[#d7c7b0]">
              {pricingFixPackDeliveryDescription}
            </p>
            <p className="mt-3 text-sm leading-6 text-[#d7c7b0]">
              {pricingFixPackLimitDescription}
            </p>
            <div className="mt-6">
              <FixPackBuyLink
                tone="dark"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-cream px-5 text-base font-medium text-ink hover:bg-paper"
              />
            </div>
            <p className="mt-4 text-sm leading-6">
              <Link href="/fix-pack" className="font-medium text-cream underline">
                See what&apos;s in the Fix Pack
              </Link>
            </p>
            <p className="mt-2 text-sm leading-6">
              <Link href="/sample-fix-pack" className="font-medium text-cream underline">
                See a sample Fix Pack
              </Link>
              <span className="text-[#d7c7b0]">
                . A filled example for the fictional plumber.
              </span>
            </p>
          </article>
        </div>

        <h2 className="mt-12 font-serif text-3xl tracking-tight">
          What the Fix Pack includes
        </h2>
        <ol className="mt-6 space-y-4">
          {fixPackDeliverables.map((item, index) => (
            <li key={item.title} className="rounded-2xl border border-rule bg-cream px-5 py-4">
              <p className="kicker text-copper">0{index + 1}</p>
              <h3 className="mt-2 font-serif text-2xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm leading-6 text-ink-soft">
          The{" "}
          <Link href="/free-check" className="text-forest underline">
            free signal check
          </Link>{" "}
          is still there if you only want a read of public files. It does not
          ask ChatGPT who it names. A separate{" "}
          <Link href="/geo-audit" className="text-forest underline">
            GEO audit
          </Link>{" "}
          PDF for one public URL is listed on{" "}
          <Link href="/checkout" className="text-forest underline">
            checkout
          </Link>
          .
        </p>

        <div className="mt-8">
          <TrustLinks />
        </div>

        <section id="faq" className="mt-12">
          <h2 className="font-serif text-3xl tracking-tight">FAQ</h2>
          <p className="mt-4 text-sm leading-7 text-ink-soft">
            The difference between the free snapshot and the Fix Pack, what
            happens after you pay, and the refund already stated on the
            refunds page.
          </p>
          <FaqList items={pricingFaqs} />
        </section>
        <div className="max-w-2xl">
          <InlineSnapshotRequest source="/pricing" caveat={false} />
        </div>

        <details className="group mt-12 border-t border-rule">
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-4 py-3 marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="min-w-0">
              <span className="block font-medium text-ink">
                Other digital products
              </span>
              <span className="mt-0.5 block text-sm font-normal leading-6 text-ink-soft">
                Also available. Separate from the free snapshot and the Fix
                Pack.
              </span>
            </span>
            <span
              aria-hidden="true"
              className="ml-auto text-xl leading-none text-ink-soft group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <ul className="space-y-1 pb-2 text-sm">
            <li>
              <a
                href={templatePackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-forest underline"
              >
                {templatePackLabel}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={agencyKitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-forest underline"
              >
                {agencyKitLabel}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </details>
      </main>
      <SiteFooter />
      <StickySnapshotOffer path="/pricing" />
    </>
  );
}
