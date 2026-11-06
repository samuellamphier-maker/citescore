import type { Metadata } from "next";
import Link from "next/link";
import { AuditForm } from "@/components/AuditForm";
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
import { normalizeSiteUrl } from "@/lib/urls";

const path = "/geo-audit";
const title = `Free AI Answer Snapshot and Fix Pack, ${fixPackIntroPriceLabel}`;
const description = `Request a free AI Answer Snapshot, then the ${fixPackIntroPriceLabel} AI Visibility Fix Pack for one business. The older self-serve PDF stays on this page.`;
const legacyDescription =
  "A one-time generative engine optimization audit. On-page GEO signals plus an LLM review of public HTML — not a live ChatGPT login. PDF with a 0–100 score and about ten fixes.";

export const metadata: Metadata = {
  ...pageMeta({
    title,
    description,
    path,
  }),
  authors: [{ name: "CiteScore Team" }],
  creator: sellerName,
};

function firstString(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function GeoAuditPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string | string[] }>;
}) {
  const params = await searchParams;
  const siteUrl = normalizeSiteUrl(firstString(params.url) ?? "") ?? "";
  const origin = publicOrigin();

  return (
    <>
      <JsonLd data={faqPageJsonLd(freeSnapshotPageFaqs)} />
      <JsonLd data={fixPackProductJsonLd(origin)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `${site.name} GEO audit`,
          provider: { "@type": "Organization", name: site.name, url: origin },
          description: legacyDescription,
          offers: {
            "@type": "Offer",
            price: String(site.price),
            priceCurrency: "USD",
            url: `${origin}/checkout`,
          },
        }}
      />
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-5 py-14">
        <p className="kicker">Free AI Answer Snapshot</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
          See who AI names, then get the Fix Pack.
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          This page used to open with a self-serve PDF. The path now is a
          free AI Answer Snapshot, then the AI Visibility Fix Pack if you
          want the gaps closed. Introductory price {fixPackIntroPriceLabel}.
          List price {fixPackListPriceLabel}. One business, one city, one
          service.
        </p>
        <p className="mt-4 text-sm leading-6 text-ink-soft">
          CiteScore asks logged-out ChatGPT and Perplexity who they name for
          that trade and city. AI answers vary run to run. This is a
          snapshot, not a ranking. It is not a promise that any assistant
          will name the business.
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
              {site.priceLabel} GEO audit
            </p>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              A self-serve PDF with a 0–100 score and about ten fixes, usually
              a few minutes after payment. We fetch publicly available HTML
              and score definitions, entities, evidence, schema, freshness,
              and crawler access. A language model, when configured, rewrites
              the summary and the fix list. This PDF does not claim a
              screenshot of ChatGPT, Perplexity, or Google AI Overviews.
            </p>
            <div id="audit" className="mt-5">
              <AuditForm id="geo-audit-form" defaultUrl={siteUrl} size="compact" />
            </div>
            <p className="mt-4 text-sm leading-6">
              <Link href="/sample" className="font-medium text-forest underline">
                Northbound sample
              </Link>
              <span className="text-ink-soft">
                . Fictional company, labeled throughout.
              </span>
            </p>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              Refund within 14 days if the file is missing, unreadable, or
              about the wrong URL — not if you dislike the score. The{" "}
              <Link href="/refunds" className="text-forest underline">
                refunds
              </Link>{" "}
              page has the rules.
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
          <Link href="/blog/what-is-geo" className="text-forest underline">
            What is GEO?
          </Link>
          {" · "}
          <Link href="/answer-engine-optimization" className="text-forest underline">
            AEO
          </Link>
          {" · "}
          <Link href="/chatgpt-citation-check" className="text-forest underline">
            ChatGPT citation check
          </Link>
          {" · "}
          <Link href="/ai-overviews" className="text-forest underline">
            AI Overviews
          </Link>
          {" · "}
          <Link href="/blog/chatgpt-citation-checklist" className="text-forest underline">
            Citation checklist
          </Link>
        </p>
        <div className="max-w-2xl">
          <InlineSnapshotRequest source="/geo-audit" />
        </div>
      </main>
      <SiteFooter />
      <StickySnapshotOffer path="/geo-audit" />
    </>
  );
}
