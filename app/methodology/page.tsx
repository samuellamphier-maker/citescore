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
  site,
} from "@/lib/site";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Methodology",
    description: `Methodology for the free AI Answer Snapshot. We ask logged-out ChatGPT and Perplexity a local prompt such as “best {service} in {city},” plus one variant, and record who they name. The ${fixPackIntroPriceLabel} Fix Pack is optional.`,
    path: "/methodology",
  }),
  authors: [{ name: "CiteScore Team" }],
  creator: sellerName,
};

export default function MethodologyPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-14">
        <p className="kicker">Methodology</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
          How the AI Answer Snapshot and the Fix Pack are produced.
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          For one local business, CiteScore asks logged-out ChatGPT and
          Perplexity who they name for that trade and city. The business
          receives a one-page snapshot. No payment. The Fix Pack is the
          done-for-you work after you have seen who was named.
        </p>
        <p className="mt-4 text-sm leading-6 text-ink-soft">
          Prepared by the CiteScore Team. Sold by {sellerName}. AI answers
          vary run to run. This is a snapshot, not a ranking.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="/free-snapshot"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream hover:bg-forest-deep"
          >
            Get a free AI Answer Snapshot
          </Link>
          <Link
            href="/fix-pack"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-ink/25 bg-cream px-5 text-base font-medium text-ink hover:border-ink"
          >
            See the Fix Pack
          </Link>
        </div>

        <section className="mt-12">
          <h2 className="font-serif text-3xl tracking-tight">
            What we ask
          </h2>
          <p className="mt-4 text-sm leading-7 text-ink-soft">
            We ask logged-out ChatGPT and Perplexity a local prompt such as
            “best {"{service}"} in {"{city}"},” plus one variant, and record
            who they name. A real snapshot records logged-out ChatGPT and
            Perplexity, one local prompt, and one variant. The one-page
            snapshot records who is named, which sources are cited, and each
            named competitor’s Google rating and review count next to yours.
            A real snapshot prints the day the prompts were asked.
          </p>
          <p className="mt-4 text-sm leading-7 text-ink-soft">
            The{" "}
            <Link href="/free-check" className="text-forest underline">
              free signal check
            </Link>{" "}
            is separate. It reads public files and does not ask ChatGPT who
            it names. The {site.priceLabel} GEO audit is a separate product:
            one public URL, a 0–100 score, and about ten fixes, as a PDF.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-3xl tracking-tight">
            How a request is sent
          </h2>
          <p className="mt-4 text-sm leading-7 text-ink-soft">
            Use the form on the{" "}
            <Link href="/free-snapshot" className="text-forest underline">
              free snapshot
            </Link>{" "}
            page. Submit the business name, city, service, website, and
            email. The button sends that request through FlowForm to{" "}
            {contactEmail}. The subject is “Free AI Answer Snapshot.” No
            account and no paid checkout. If that send fails, the email
            button, the address, and the copy buttons stay on that page. You
            can also copy the request and email it to {contactEmail} from any
            inbox.
          </p>
          <p className="mt-4 text-sm leading-7 text-ink-soft">
            The browser posts that form directly to FlowForm. The same email
            is set as the reply-to address. A hidden honeypot field is
            checked in the browser and is left out of the post when it is
            empty. We do not ask for passwords, cookies, or content behind a
            login. We do not sell emails. Do not submit a URL you are not
            allowed to have processed.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-3xl tracking-tight">
            What we send back
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-ink-soft">
            <li>
              You submit the form. FlowForm delivers the business name, city,
              service, website, and email. No account and no paid checkout.
            </li>
            <li>
              We ask logged-out ChatGPT and Perplexity who they name for that
              trade and city, and record who is named.
            </li>
            <li>We reply with the one-page snapshot by email.</li>
          </ol>
          <p className="mt-4 text-sm leading-7 text-ink-soft">
            After FlowForm accepts the post, it can send the visitor back to
            this site. We receive the request when FlowForm delivers it, or
            when you send the email yourself. The free snapshot comes first.
          </p>
          <p className="mt-4 text-sm leading-6">
            <Link href="/sample-snapshot" className="font-medium text-forest underline">
              See an example snapshot
            </Link>
            <span className="text-ink-soft">
              . Fictional business, illustrative numbers. Not a customer
              result, and not a live ChatGPT or Perplexity answer. Same
              layout as the snapshot CiteScore sends. The business, the
              competitors, the city, the sources, the date, and every figure
              on that page were invented to show that layout.
            </span>
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-3xl tracking-tight">
            Optional: the {fixPackIntroPriceLabel} Fix Pack
          </h2>
          <p className="mt-4 text-sm leading-7 text-ink-soft">
            The snapshot is free. The{" "}
            <Link href="/fix-pack" className="text-forest underline">
              Fix Pack
            </Link>{" "}
            is the done-for-you work after you have seen who was named.
            Introductory price {fixPackIntroPriceLabel}. List price{" "}
            {fixPackListPriceLabel}. One business, one city, one service. It
            is not a promise that any assistant will name the business.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-soft">
            {fixPackDeliverables.map((item) => (
              <li key={item.title}>
                <span className="text-ink">{item.title}.</span> {item.body}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-7 text-ink-soft">
            The buy button opens {fixPackIntroPriceLabel} card checkout.
            Payhip handles the AI Visibility Fix Pack. After you pay, email
            the business name, city, main service, and public site URL to{" "}
            {contactEmail}. We email the Fix Pack within a few business days after payment, once we have the business name, city, service, and
            public site URL. Do not send passwords, cookies, or pages behind
            a login. {sellerName} does not see full card numbers.
          </p>
          <p className="mt-4 text-sm leading-7 text-ink-soft">
            Full refund within 14 days of delivery if the Fix Pack is not
            useful. You do not need to show that you installed the markup or
            sent the review script. The 14 days start when the Fix Pack is
            delivered, not when you request the free snapshot. The free AI
            Answer Snapshot has no charge. Details are on the{" "}
            <Link href="/refunds" className="text-forest underline">
              refunds
            </Link>{" "}
            page.
          </p>
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
              . The {fixPackIntroPriceLabel} Fix Pack is on that page. The
              steps after you pay are on{" "}
              <Link href="/how-it-works" className="text-forest underline">
                how it works
              </Link>{" "}
              and{" "}
              <Link href="/pricing" className="text-forest underline">
                pricing
              </Link>
              . Questions are on the{" "}
              <Link href="/faq" className="text-forest underline">
                FAQ
              </Link>
              .
            </span>
          </p>
          <FixPackOfferFacts className="mt-8" />
        </section>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="/free-snapshot"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream hover:bg-forest-deep"
          >
            Get a free AI Answer Snapshot
          </Link>
          <Link
            href="/fix-pack"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-ink/25 bg-cream px-5 text-base font-medium text-ink hover:border-ink"
          >
            See the Fix Pack
          </Link>
        </div>
        <div className="mt-6">
          <TrustLinks />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
