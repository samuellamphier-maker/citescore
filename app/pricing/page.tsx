import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { FixPackBuyLink } from "@/components/FixPackBuyLink";
import { FixPackOfferFacts } from "@/components/FixPackOfferFacts";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TrustLinks } from "@/components/TrustLinks";
import { pageMeta } from "@/lib/content/meta";
import { fixPackDeliverables } from "@/lib/fix-pack-offer";
import {
  faqPageJsonLd,
  fixPackPurchaseFaqs,
  snapshotOfferFaqs,
  type FaqItem,
} from "@/lib/offer-faq";
import {
  contactEmail,
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  sellerName,
  site,
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
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-14">
        <p className="kicker">Pricing</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
          The snapshot is free. The Fix Pack is {fixPackIntroPriceLabel}.
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-soft">
          The snapshot is free. The Fix Pack is the done-for-you work after
          you have seen who was named. Introductory price{" "}
          {fixPackIntroPriceLabel}. List price {fixPackListPriceLabel}. One
          business, one city, one service.
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
              CiteScore asks logged-out ChatGPT and Perplexity who they name
              for that trade and city. The business receives a one-page
              snapshot: who is named, which sources are cited, and how the
              Google rating and review count compare. A real snapshot prints
              the day the prompts were asked. AI answers vary run to run.
              This is a snapshot, not a ranking.
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
            <p className="kicker text-[#d7c7b0]">Introductory</p>
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
            <p className="mt-3 text-sm leading-6 text-[#d7c7b0]">
              It is not a promise that any assistant will name the business.
            </p>
            <h3 className="mt-6 font-medium">How delivery works</h3>
            <p className="mt-2 text-sm leading-6 text-[#d7c7b0]">
              The free snapshot comes first. The buy button opens{" "}
              {fixPackIntroPriceLabel} card checkout. We email the Fix Pack
              within a few business days after payment, once we have the
              business name, city, service, and public site URL. Do not send
              passwords, cookies, or pages behind a login.
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
          ask ChatGPT who it names. The {site.priceLabel} GEO audit is a
          separate product: one public URL, a 0–100 score, and about ten
          fixes, as a PDF. It is listed on{" "}
          <Link href="/checkout" className="text-forest underline">
            checkout
          </Link>
          .
        </p>

        <h2 className="mt-12 font-serif text-3xl tracking-tight">
          Price, delivery, and refunds
        </h2>
        <FixPackOfferFacts className="mt-4" />
        <div className="mt-4">
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
      </main>
      <SiteFooter />
    </>
  );
}
