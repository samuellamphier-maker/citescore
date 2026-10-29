import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TrustLinks } from "@/components/TrustLinks";
import { pageMeta } from "@/lib/content/meta";
import { faqPageJsonLd } from "@/lib/offer-faq";
import {
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  sellerName,
} from "@/lib/site";
import { fixPackTrustFaqs, snapshotTrustFaqs, trustFaqs } from "@/lib/trust-faq";

const elsewhere = [
  { href: "/free-snapshot#faq", label: "Free snapshot FAQ" },
  { href: "/fix-pack#faq", label: "Fix Pack FAQ" },
  { href: "/pricing#faq", label: "Pricing FAQ" },
  { href: "/sample-snapshot#faq", label: "Example snapshot FAQ" },
  { href: "/#faq", label: "Homepage FAQ" },
  { href: "/refunds", label: "Refunds" },
  { href: "/privacy", label: "Privacy" },
  { href: "/how-it-works", label: "How it works" },
] as const;

export const metadata: Metadata = {
  ...pageMeta({
    title: "FAQ",
    description: `Answers about the free AI Answer Snapshot and the ${fixPackIntroPriceLabel} AI Visibility Fix Pack: what the snapshot checks, how to request it, how the form is handled, what the pack includes, delivery, and refunds.`,
    path: "/faq",
  }),
  authors: [{ name: "CiteScore Team" }],
  creator: sellerName,
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(trustFaqs)} />
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-14">
        <p className="kicker">FAQ</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
          Questions before the free snapshot or the {fixPackIntroPriceLabel} Fix Pack.
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          The snapshot is free. The Fix Pack is the done-for-you work after
          you have seen who was named. Introductory price{" "}
          {fixPackIntroPriceLabel}. List price {fixPackListPriceLabel}.
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
        <p className="mt-4 text-sm leading-6">
          <Link href="/sample-snapshot" className="font-medium text-forest underline">
            See an example snapshot
          </Link>
          <span className="text-ink-soft">
            . Fictional business, illustrative numbers.
          </span>
        </p>

        <section id="snapshot" className="mt-12">
          <h2 className="font-serif text-3xl tracking-tight">
            Free AI Answer Snapshot
          </h2>
          <p className="mt-4 text-sm leading-7 text-ink-soft">
            What it is, what we check, how to request it, what happens after
            you submit the form, and how that request is handled.
          </p>
          <FaqList items={snapshotTrustFaqs} />
        </section>

        <section id="fix-pack" className="mt-12">
          <h2 className="font-serif text-3xl tracking-tight">
            AI Visibility Fix Pack
          </h2>
          <p className="mt-4 text-sm leading-7 text-ink-soft">
            Who it is for, what is included, how it is delivered, and the
            refund.
          </p>
          <FaqList items={fixPackTrustFaqs} />
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-3xl tracking-tight">
            Answers already on these pages
          </h2>
          <p className="mt-4 text-sm leading-7 text-ink-soft">
            The free snapshot page, the Fix Pack page, pricing, and the
            homepage each keep their own FAQ. This page does not repeat those
            questions.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6">
            {elsewhere.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-forest underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
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
