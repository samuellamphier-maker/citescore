import type { Metadata } from "next";
import Link from "next/link";
import { FunnelCtaRow } from "@/components/FunnelCtaRow";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMeta } from "@/lib/content/meta";
import {
  agencyKitLabel,
  doneForYouAuditLabel,
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  payhipShopName,
  templatePackLabel,
  whiteLabelAuditLabel,
} from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Terms of Service",
  description:
    "Terms for CiteScore digital audits, the Fix Pack, and downloads sold by CiteScore.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-2xl flex-1 px-5 py-14">
        <p className="kicker">Terms</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-ink-soft">
          Effective 10 November 2026. Sold by CiteScore.
        </p>
        <FunnelCtaRow />
        <div className="mt-8 space-y-6 text-[15px] leading-7 text-ink-soft">
          <p>
            These terms cover the digital products CiteScore sells on this
            site. Paying, or asking us to produce a file, means you accept
            them. Questions and refund requests go to{" "}
            <a
              href="mailto:citescore@mail.grokbot.com"
              className="text-forest underline"
            >
              citescore@mail.grokbot.com
            </a>
            . How we handle a URL and an email is in the{" "}
            <Link href="/privacy" className="text-forest underline">
              Privacy
            </Link>{" "}
            page.
          </p>

          <h2 className="font-serif text-2xl text-ink">Who sells</h2>
          <p>
            The seller is CiteScore. Stripe, Polar, and Payhip process card
            payments for the products that use them. CiteScore does not see
            full card numbers. Payhip handles the AI Visibility Fix Pack ({fixPackIntroPriceLabel}). The shop name on that page is {payhipShopName}. Stripe handles the{" "}
            <Link href="/geo-audit" className="text-forest underline">
              GEO audit
            </Link>
            . Polar handles the{" "}
            {templatePackLabel}, the {agencyKitLabel}, the{" "}
            {doneForYouAuditLabel}, and the {whiteLabelAuditLabel}.
          </p>

          <h2 className="font-serif text-2xl text-ink">What you buy</h2>
          <p>
            The free AI Answer Snapshot is not a purchase. Each paid product
            is a digital file, not a subscription and not a seat.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-ink">AI Visibility Fix Pack.</strong>{" "}
              One business, one city, one service. A Google Business Profile
              gap list, a review-gap plan and script, the directories an AI
              answer cited, paste-ready LocalBusiness and Service JSON-LD
              with install steps, and a re-check 14 days later. Introductory
              price {fixPackIntroPriceLabel}, list price {fixPackListPriceLabel}. Paid through
              Payhip. It is not a promise that any assistant will name the
              business.
            </li>
            <li>
              <strong className="text-ink">
                <Link href="/geo-audit" className="text-forest underline">
                  GEO audit
                </Link>
                .
              </strong>{" "}
              One public URL. A 0–100 CiteScore and about ten fixes, as a PDF.
              Paid through Stripe. The price is the price on that page.
            </li>
            <li>
              <strong className="text-ink">{doneForYouAuditLabel}.</strong> A
              written walkthrough of one public URL. Paid through Polar.
            </li>
            <li>
              <strong className="text-ink">{whiteLabelAuditLabel}.</strong> An
              unbranded PDF of one public URL, with no CiteScore branding, so
              an agency can hand it to a client. Paid through Polar.
            </li>
            <li>
              <strong className="text-ink">{agencyKitLabel}.</strong> A client
              report template, a pitch email sequence, pricing tiers, a
              one-pager, and a 30-day delivery SOP. It is not a scored URL.
              Paid through Polar.
            </li>
            <li>
              <strong className="text-ink">{templatePackLabel}.</strong> A
              separate digital download. Paid through Polar.
            </li>
          </ul>
          <p>
            Weekly rescans are not for sale. The free check is not a purchase
            and does not create an order.
          </p>

          <h2 className="font-serif text-2xl text-ink">Delivery</h2>
          <p>
            The GEO audit is instant. After Stripe confirms
            payment, the self-serve PDF is produced automatically, usually
            within a few minutes. It is not held for a later business day.
          </p>
          <p>
            The {doneForYouAuditLabel} and the {whiteLabelAuditLabel} are
            delivered within 3 business days of the order. You send one public
            URL. Business days exclude weekends.
          </p>
          <p>
            The {agencyKitLabel} and the {templatePackLabel} are digital
            downloads delivered when Polar confirms payment.
          </p>
          <p>
            The Fix Pack is delivered by email within a few business days after
            payment, once we have the business name, city, service, and public
            site URL. After you pay, send those fields on the{" "}
            <Link href="/fix-pack/next-steps" className="text-forest underline">
              next-steps page
            </Link>
            , or email them. The free AI Answer Snapshot is not a purchase.
          </p>

          <h2 className="font-serif text-2xl text-ink">Refunds</h2>
          <p>
            Email{" "}
            <a
              href="mailto:citescore@mail.grokbot.com"
              className="text-forest underline"
            >
              citescore@mail.grokbot.com
            </a>{" "}
            within 14 days of payment if the file is missing, unreadable, or
            an audit is about the wrong URL. We refund that purchase. We do
            not refund because you dislike the score, disagree with a fix, or
            choose not to use the file. The Fix Pack is different: full
            refund within 14 days of delivery if it is not useful. The{" "}
            <Link href="/refunds" className="text-forest underline">
              refunds
            </Link>{" "}
            page states both rules.
          </p>

          <h2 className="font-serif text-2xl text-ink">Acceptable use</h2>
          <p>
            Submit only a public URL you are allowed to have processed. Do not
            send passwords, cookies, or pages behind a login. Do not use the
            service to overload a site, break into one, or collect data you
            are not allowed to collect.
          </p>
          <p>
            An audit PDF describes public pages and on-page signals. That
            PDF is not a live query of ChatGPT, Perplexity, Gemini, Copilot,
            or Google. Do not tell a client that an audit PDF is. The free
            AI Answer Snapshot is different: we ask logged-out ChatGPT and
            Perplexity who they name for that trade and city, and the
            one-page reply records who was named. AI answers vary run to
            run. This is a snapshot, not a ranking, and not a promise that
            any assistant will name the business. You may give the unbranded
            $149 PDF to your own client. Do not present CiteScore as your
            staff, and do not resell the kit or the template pack as a
            competing product.
          </p>

          <h2 className="font-serif text-2xl text-ink">Liability</h2>
          <p>
            Audits and downloads are information about public pages. They are
            not legal, financial, or ranking advice, and they are not a
            promise of citations, traffic, or revenue. Stripe, Polar, and
            Payhip are responsible for their own checkout. To the extent the law allows,
            CiteScore’s liability for a purchase is limited to the amount
            you paid for that purchase.
          </p>

          <h2 className="font-serif text-2xl text-ink">Changes</h2>
          <p>
            We may update these terms by posting a new version on this page.
            The version in force is the one posted when you pay. An order
            already placed keeps the delivery and refund rules from that day.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
