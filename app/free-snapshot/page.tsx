import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { FixPackBuyLink } from "@/components/FixPackBuyLink";
import { FreeSnapshotLead } from "@/components/FreeSnapshotLead";
import { HowSnapshotIsMade } from "@/components/HowSnapshotIsMade";
import { JsonLd } from "@/components/JsonLd";
import { SampleSnapshotExcerpt } from "@/components/SampleSnapshotExcerpt";
import { SnapshotRequestForm } from "@/components/SnapshotRequestForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TrustLinks } from "@/components/TrustLinks";
import { freeSnapshotPageFixPackJsonLd, freeSnapshotPageFixPackRest } from "@/lib/core-offer-schema";
import { pageMeta } from "@/lib/content/meta";
import { faqPageJsonLd, freeSnapshotPageFaqs } from "@/lib/offer-faq";
import {
  contactEmail,
  fixPackIntroPriceLabel,
  publicOrigin,
  sellerName,
} from "@/lib/site";
import { freeSnapshotServiceJsonLd } from "@/lib/site-schema";
import { snapshotServicePrefill } from "@/lib/industry-snapshot";
import {
  snapshotBusinessPrefill,
  snapshotWebsitePrefill,
} from "@/lib/snapshot-form";

function firstQuery(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export const metadata: Metadata = {
  ...pageMeta({
    title: "Free AI Answer Snapshot",
    description: `Request a free AI Answer Snapshot for one local business. We ask logged-out ChatGPT and Perplexity who they name for that trade and city, and reply with a one-page snapshot. The ${fixPackIntroPriceLabel} Fix Pack is optional.`,
    path: "/free-snapshot",
  }),
  authors: [{ name: "CiteScore Team" }],
  creator: sellerName,
};

export default async function FreeSnapshotPage({
  searchParams,
}: {
  searchParams: Promise<{
    website?: string | string[];
    business?: string | string[];
    service?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const website = snapshotWebsitePrefill(firstQuery(params.website));
  const business = snapshotBusinessPrefill(firstQuery(params.business));
  const service = snapshotServicePrefill(firstQuery(params.service));

  return (
    <>
      <JsonLd data={faqPageJsonLd(freeSnapshotPageFaqs)} />
      <JsonLd data={freeSnapshotServiceJsonLd(publicOrigin())} />
      <JsonLd data={freeSnapshotPageFixPackJsonLd(publicOrigin())} />
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-5 py-2 lg:py-8">
        <div className="grid items-start gap-y-3 lg:grid-cols-[minmax(0,1fr)_min(26rem,42%)] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-6">
          <div className="min-w-0 max-lg:contents lg:col-start-1 lg:row-start-1">
            <p className="kicker max-lg:order-1">Free · no checkout</p>
            <FreeSnapshotLead service={service} />
          </div>

          <section
            aria-labelledby="free-snapshot-request"
            className="min-w-0 rounded-2xl border border-rule bg-cream px-4 py-3 max-lg:order-2 sm:px-6 sm:py-4 lg:col-start-2 lg:row-span-2 lg:row-start-1"
          >
            <h2 id="free-snapshot-request" className="sr-only">
              Request the free snapshot.
            </h2>
            <SnapshotRequestForm
              key={`${website}\n${business}\n${service}`}
              caveat={false}
              deliveryNote={false}
              privacyAfterSubmit
              hideRequiredNote
              defaultWebsite={website}
              defaultBusiness={business}
              defaultService={service || undefined}
              serviceNote={Boolean(service)}
            />
            <p className="mt-4 text-sm leading-6 text-ink-soft">
              Prepared by the CiteScore Team. Sold by {sellerName}.
            </p>
          </section>

          <aside
            className="min-w-0 max-lg:order-4 lg:col-start-1 lg:row-start-2"
            aria-labelledby="snapshot-sample-preview"
          >
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
          <section className="mt-8" aria-labelledby="after-submit">
            <h2 id="after-submit" className="font-serif text-2xl tracking-tight sm:text-3xl">
              What happens after you submit
            </h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-ink-soft">
              <li>
                You submit the form. The button sends the business name, city, service, website, and email to {contactEmail} through FlowForm. The subject is “Free AI Answer Snapshot.” No account and no paid checkout. If that send fails, the email button, the address, and the copy buttons stay on this page.
              </li>
              <li>
                We reply with the one-page snapshot by email. There is no set delivery time.
              </li>
            </ol>
          </section>

          <p className="mt-4 text-sm leading-6">
            <Link href="/fix-pack" className="font-medium text-forest underline">
              Skip straight to the {fixPackIntroPriceLabel} Fix Pack
            </Link>
            <span className="text-ink-soft">
              {" "}
              if you already want the done-for-you work.
            </span>
          </p>

          <HowSnapshotIsMade className="mt-6" />

          <h2 className="mt-12 font-serif text-3xl tracking-tight">
            Optional next step: the Fix Pack
          </h2>
        <p className="mt-4 leading-7 text-ink-soft">
          The{" "}
          <Link href="/fix-pack" className="text-forest underline">
            Fix Pack
          </Link>{" "}
          {freeSnapshotPageFixPackRest}
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
          <Link href="/fix-pack/next-steps" className="font-medium text-forest underline">
            What happens after you buy
          </Link>
          <span className="text-ink-soft">
            . Send the business name, city, service, and public site URL there,
            or email those fields.
          </span>
        </p>
        <p className="mt-4 text-sm leading-6">
          <Link href="/checkout" className="font-medium text-forest underline">
            Open checkout
          </Link>
          <span className="text-ink-soft">
            . The {fixPackIntroPriceLabel} Fix Pack is on that page.
          </span>
        </p>
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
