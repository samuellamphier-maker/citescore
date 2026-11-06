import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { FixPackBuyLink } from "@/components/FixPackBuyLink";
import { FixPackOfferFacts } from "@/components/FixPackOfferFacts";
import { InlineSnapshotRequest } from "@/components/InlineSnapshotRequest";
import { JsonLd } from "@/components/JsonLd";
import { OlderAudits } from "@/components/OlderAudits";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StickySnapshotOffer } from "@/components/StickySnapshotOffer";
import { TrustLinks } from "@/components/TrustLinks";
import { pageMeta } from "@/lib/content/meta";
import { fixPackProductJsonLd } from "@/lib/fix-pack-offer";
import { faqPageJsonLd, freeSnapshotPageFaqs } from "@/lib/offer-faq";
import {
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  publicOrigin,
  sellerName,
  site,
} from "@/lib/site";

const path = "/done-for-you-audit";
const title = `Free snapshot first, then the Fix Pack, ${fixPackIntroPriceLabel}`;
const description = `Start with a free AI Answer Snapshot, then the ${fixPackIntroPriceLabel} AI Visibility Fix Pack. One business, one city, one service. The older written audit stays below.`;

export const metadata: Metadata = {
  ...pageMeta({
    title,
    description,
    path,
  }),
  authors: [{ name: "CiteScore Team" }],
  creator: sellerName,
};

export default function DoneForYouAuditPage() {
  const origin = publicOrigin();

  return (
    <>
      <JsonLd data={faqPageJsonLd(freeSnapshotPageFaqs)} />
      <JsonLd data={fixPackProductJsonLd(origin)} />
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-5 py-14">
        <p className="kicker">Free AI Answer Snapshot</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
          The free snapshot comes first. The Fix Pack is next.
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          This page used to open with a written audit. Start with who ChatGPT
          and Perplexity name, then the AI Visibility Fix Pack if you want
          the gaps closed. Introductory price {fixPackIntroPriceLabel}. List
          price {fixPackListPriceLabel}. One business, one city, one service.
        </p>
        <p className="mt-4 text-sm leading-6 text-ink-soft">
          The snapshot is a one-page reply: who is named, which sources are
          cited, and how the Google rating and review count compare. AI
          answers vary run to run. This is a snapshot, not a ranking. It is
          not a promise that any assistant will name the business. The Fix
          Pack is the done-for-you work after you have seen who was named.
        </p>
        <p className="mt-4 text-sm leading-6 text-ink-soft">
          Prepared by the CiteScore Team. Sold by {sellerName}.
        </p>
        <div
          data-funnel-cta
          className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <Link
            href="/free-snapshot"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream hover:bg-forest-deep"
          >
            Get a free AI Answer Snapshot
          </Link>
          <FixPackBuyLink
            compact
            className="inline-flex h-12 items-center justify-center rounded-lg border border-ink/25 bg-cream px-5 text-base font-medium text-ink hover:border-ink"
          />
        </div>
        <p className="mt-4 text-sm leading-6">
          <Link href="/fix-pack" className="font-medium text-forest underline">
            See what&apos;s in the Fix Pack
          </Link>
          <span className="text-ink-soft"> · </span>
          <Link href="/sample-snapshot" className="font-medium text-forest underline">
            See an example snapshot
          </Link>
          <span className="text-ink-soft">
            . Fictional business, illustrative numbers.
          </span>
        </p>
        <p className="mt-3 text-sm leading-6">
          <Link href="/checkout" className="font-medium text-forest underline">
            Open checkout
          </Link>
          <span className="text-ink-soft">
            . The {fixPackIntroPriceLabel} Fix Pack is on that page.
          </span>
        </p>
        <FixPackOfferFacts className="mt-6" />
        <div className="mt-4">
          <TrustLinks />
        </div>

        <OlderAudits>
          <article className="rounded-2xl border border-rule bg-cream p-6">
            <p className="font-serif text-2xl tracking-tight text-ink">
              {site.priceLabel} self-serve PDF
            </p>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              A self-serve PDF with a 0–100 score and about ten fixes, usually
              a few minutes after payment. It does not log into ChatGPT,
              Perplexity, or Google AI Overviews. The form is on the GEO audit
              page.
            </p>
            <p className="mt-4">
              <Link
                href="/geo-audit#audit"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-ink/30 bg-cream px-5 text-ink hover:border-ink hover:bg-paper-2"
              >
                Open the self-serve PDF
              </Link>
            </p>
          </article>
        </OlderAudits>

        <section id="faq" className="mt-12">
          <h2 className="font-serif text-3xl tracking-tight">FAQ</h2>
          <p className="mt-4 text-sm leading-7 text-ink-soft">
            What the one-page snapshot shows, how to ask, and when the{" "}
            {fixPackIntroPriceLabel} Fix Pack is emailed.
          </p>
          <FaqList items={freeSnapshotPageFaqs} />
        </section>
        <p className="mt-8 text-sm text-ink-soft">
          Further reading:{" "}
          <Link href="/pricing" className="text-forest underline">
            Pricing
          </Link>
          {" · "}
          <Link href="/how-it-works" className="text-forest underline">
            How it works
          </Link>
          {" · "}
          <Link href="/fix-pack" className="text-forest underline">
            Fix Pack
          </Link>
        </p>
        <div className="max-w-2xl">
          <InlineSnapshotRequest source="/done-for-you-audit" />
        </div>
      </main>
      <SiteFooter />
      <StickySnapshotOffer path="/done-for-you-audit" />
    </>
  );
}
