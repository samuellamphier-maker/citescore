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
import { fixPackPageSnapshotServiceJsonLd } from "@/lib/core-offer-schema";
import { pageMeta } from "@/lib/content/meta";
import {
  fixPackDeliverables,
  fixPackHowDeliveryWorks,
  fixPackProductJsonLd,
  fixPackRefund,
  fixPackTurnaround,
} from "@/lib/fix-pack-offer";
import {
  faqPageJsonLd,
  fixPackFaqs,
  fixPackMoreFaqs,
  fixPackPurchaseFaqs,
  sonickStudyUrl,
} from "@/lib/offer-faq";
import {
  contactEmail,
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  publicOrigin,
} from "@/lib/site";

const buyLinkClassName =
  "inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-transparent bg-forest px-5 py-3 text-center text-base font-medium leading-6 text-cream hover:bg-forest-deep sm:w-auto";

export const metadata: Metadata = pageMeta({
  title: `AI Visibility Fix Pack, ${fixPackIntroPriceLabel}`,
  description: `The AI Visibility Fix Pack is ${fixPackIntroPriceLabel} introductory (${fixPackListPriceLabel} list): Google Business Profile gaps, a review plan, cited directories, LocalBusiness JSON-LD, and a 14-day re-check.`,
  path: "/fix-pack",
});

export default function FixPackPage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(fixPackFaqs())} />
      <JsonLd data={fixPackProductJsonLd(publicOrigin())} />
      <JsonLd data={fixPackPageSnapshotServiceJsonLd(publicOrigin())} />
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-5 py-14">
        <p className="kicker">AI Visibility Fix Pack</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
          Who AI recommends instead of you, and the fixes.
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          The snapshot is free. The Fix Pack is the done-for-you work after
          you have seen who was named.
        </p>
        <div
          data-funnel-cta
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <FixPackBuyLink className={buyLinkClassName} />
          <Link
            href="/free-snapshot"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-ink/25 bg-cream px-5 py-3 text-center text-base font-medium leading-6 text-ink hover:border-ink sm:w-auto"
          >
            Get a free AI Answer Snapshot
          </Link>
        </div>
        <p className="mt-4 text-sm leading-6">
          <Link href="/sample-fix-pack" className="font-medium text-forest underline">
            See a sample Fix Pack
          </Link>
          <span className="text-ink-soft">
            . Illustrative example content, not a real client or real results.
            The example is filled in for the same fictional plumber.
          </span>
        </p>

        <h2 className="mt-12 font-serif text-3xl tracking-tight">What you get</h2>
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
          It is not a promise that any assistant will name the business.
        </p>
        <p className="mt-4 text-sm leading-6 text-ink-soft">
          AI answers vary run to run. This is a snapshot, not a ranking. A
          published test of local ChatGPT answers found that only 40% of
          businesses appeared in all three runs (
          <a href={sonickStudyUrl} className="text-forest underline">
            SoNick Marketing
          </a>
          ).
        </p>

        <h2 className="mt-12 font-serif text-3xl tracking-tight">After you pay</h2>
        <p className="mt-4 text-sm leading-7 text-ink-soft">
          {fixPackHowDeliveryWorks} {fixPackTurnaround}{" "}
          <Link href="/fix-pack/next-steps" className="text-forest underline">
            What happens after you buy
          </Link>
          .
        </p>

        <h2 className="mt-12 font-serif text-3xl tracking-tight">Refunds</h2>
        <p className="mt-4 text-sm leading-7 text-ink-soft">
          {fixPackRefund}{" "}
          <Link href="/refunds" className="text-forest underline">
            Refund policy
          </Link>
          .
        </p>
        <p className="mt-3 text-sm leading-6 text-ink-soft">
          Operated by the CiteScore Team.{" "}
          <Link href="/about" className="text-forest underline underline-offset-4">
            Who runs this
          </Link>
          {" · "}
          <a
            href={`mailto:${contactEmail}`}
            className="text-forest underline underline-offset-4"
          >
            {contactEmail}
          </a>
        </p>
        <p className="mt-4 text-sm leading-6">
          <Link href="/contact" className="font-medium text-forest underline">
            Questions before you buy
          </Link>
        </p>

        <h2 className="mt-12 font-serif text-3xl tracking-tight">Where the JSON-LD goes</h2>
        <p className="mt-4 text-sm leading-7 text-ink-soft">
          The pack includes the script and these install steps. Paste it in
          the head of the public site, and keep every field visible on the
          page.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-soft">
          <li>
            <strong className="text-ink">WordPress.</strong> Add the script to
            the site header through the theme header setting or a
            header-scripts plugin. Do not drop it into a visible paragraph.
          </li>
          <li>
            <strong className="text-ink">Wix.</strong> Settings, Custom Code,
            Add Custom Code, place it in the Head, and apply it to all pages
            that describe the business.
          </li>
          <li>
            <strong className="text-ink">Squarespace.</strong> Settings,
            Advanced, Code Injection, Header. On sites that show Developer
            Tools, use Code Injection there.
          </li>
          <li>
            <strong className="text-ink">Shopify.</strong> Online Store,
            Themes, Edit code, then paste the script before the closing head
            tag in theme.liquid.
          </li>
        </ul>

        <h2 id="sample" className="mt-12 font-serif text-3xl tracking-tight">
          Example (fictional business)
        </h2>
        <p className="mt-4 text-sm leading-7 text-ink-soft">
          The one-page example is{" "}
          <Link href="/sample-snapshot" className="text-forest underline">
            Example Plumbing Co. in Riverton, USA
          </Link>
          . The business, the competitors, the directories, and the ratings
          on that page were written to show the layout. They are not a live
          ChatGPT or Perplexity answer, and they are not a customer result.
        </p>
        <p className="mt-4">
          <Link
            href="/sample-snapshot"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-ink/25 bg-cream px-5 text-base font-medium text-ink hover:border-ink"
          >
            See the example AI Answer Snapshot
          </Link>
        </p>

        <h2 id="faq" className="mt-12 font-serif text-3xl tracking-tight">
          FAQ
        </h2>
        <p className="mt-4 text-sm leading-7 text-ink-soft">
          What is included, what happens after you pay, what to send, and how
          to ask.
        </p>
        <FaqList items={fixPackPurchaseFaqs} />

        <h2 className="mt-12 font-serif text-3xl tracking-tight">More questions</h2>
        <p className="mt-4 text-sm leading-7 text-ink-soft">
          What the snapshot shows, what you do with the Fix Pack, and how to
          ask.
        </p>
        <FaqList items={fixPackMoreFaqs()} />

        <h2 className="mt-12 font-serif text-3xl tracking-tight">Price</h2>
        <p className="mt-4 text-ink-soft leading-7">
          <span className="font-serif text-5xl text-ink">{fixPackIntroPriceLabel}</span>{" "}
          <span className="text-ink-soft line-through">{fixPackListPriceLabel}</span>{" "}
          introductory. One business, one city, one service. The free
          snapshot comes first. The{" "}
          <Link href="/free-check" className="text-forest underline">
            free signal check
          </Link>{" "}
          is still there if you only want a read of public files. It does not
          ask ChatGPT who it names.
        </p>
        <div className="mt-6" data-funnel-cta>
          <FixPackBuyLink className={buyLinkClassName} />
        </div>
        <div className="mt-4">
          <TrustLinks />
        </div>
        <div className="max-w-2xl">
          <InlineSnapshotRequest source="/fix-pack" caveat={false} />
        </div>
      </main>
      <SiteFooter />
      <StickySnapshotOffer path="/fix-pack" />
    </>
  );
}
