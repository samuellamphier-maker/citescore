import type { Metadata } from "next";
import Link from "next/link";
import { FixPackBuyLink } from "@/components/FixPackBuyLink";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMeta } from "@/lib/content/meta";
import { faqPageJsonLd, type FaqItem } from "@/lib/offer-faq";
import { sampleFixPackExampleBanner } from "@/lib/sample-fix-pack-example";
import {
  agencyKitLabel,
  agencyKitUrl,
  contactEmail,
  doneForYouAuditLabel,
  doneForYouAuditUrl,
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  sellerName,
  site,
  templatePackLabel,
  templatePackUrl,
  whiteLabelAuditLabel,
  whiteLabelAuditUrl,
} from "@/lib/site";

const pages = [
  { href: "/sample-snapshot", label: "Example snapshot (fictional business)" },
  { href: "/sample-fix-pack", label: "Sample Fix Pack (fictional plumber)" },
  { href: "/methodology", label: "Methodology" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/refunds", label: "Refunds" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
  { href: "/free-snapshot", label: "Get a free AI Answer Snapshot" },
  { href: "/fix-pack", label: `Fix Pack, ${fixPackIntroPriceLabel}` },
  { href: "/checkout", label: "Checkout" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const trustPageFaqs: readonly FaqItem[] = [
  {
    q: "Who sells CiteScore?",
    a: `CiteScore is operated by the CiteScore Team. The seller name on this site is ${sellerName}. Questions go to ${contactEmail}.`,
  },
  {
    q: "What is for sale?",
    a: `The free AI Answer Snapshot has no charge. The AI Visibility Fix Pack is ${fixPackIntroPriceLabel} introductory (${fixPackListPriceLabel} list), for one business, one city, and one service. Checkout also lists the GEO audit, the ${agencyKitLabel}, the ${doneForYouAuditLabel}, and the ${whiteLabelAuditLabel}. The ${templatePackLabel} is a separate digital download. Each product is a digital file, not a subscription and not a seat.`,
  },
  {
    q: "What is not promised?",
    a: "AI answers vary run to run. This is a snapshot, not a ranking. It is not a promise that any assistant will name the business. Audits and downloads are not legal, financial, or ranking advice, and they are not a promise of citations, traffic, or revenue.",
  },
  {
    q: "When does the Fix Pack arrive?",
    a: "The Fix Pack is delivered by email within a few business days after payment, once we have the business name, city, service, and public site URL. The free AI Answer Snapshot is not a purchase.",
  },
  {
    q: "How do refunds work?",
    a: `If the AI Visibility Fix Pack (${fixPackIntroPriceLabel} introductory) is not useful, email ${contactEmail} within 14 days of delivery and ${sellerName} refunds that purchase in full. You do not need to show that you installed the markup or sent the review script. The 14 days start when the Fix Pack is delivered, not when you request the free snapshot. The free AI Answer Snapshot has no charge, so there is nothing to refund on it.`,
  },
  {
    q: "Do you sell emails or ask for a login?",
    a: "We do not sell emails. We do not ask for passwords, cookies, or content behind a login. Details are on the privacy page.",
  },
];

function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="text-forest underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export const metadata: Metadata = {
  ...pageMeta({
    title: "Trust",
    description: `Who sells CiteScore: the free AI Answer Snapshot and the ${fixPackIntroPriceLabel} Fix Pack, sold by ${sellerName}. Operated by the CiteScore Team. Contact ${contactEmail}.`,
    path: "/trust",
  }),
  authors: [{ name: "CiteScore Team" }],
  creator: sellerName,
};

export default function TrustPage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(trustPageFaqs)} />
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-2xl flex-1 px-5 py-14">
        <p className="kicker">Trust</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">
          Who sells CiteScore
        </h1>
        <p className="mt-4 text-sm leading-6 text-ink-soft">
          Who sells CiteScore: the free AI Answer Snapshot and the{" "}
          {fixPackIntroPriceLabel} Fix Pack, sold by {sellerName}. Operated
          by the CiteScore Team. Contact{" "}
          <a href={`mailto:${contactEmail}`} className="text-forest underline">
            {contactEmail}
          </a>
          . The{" "}
          <Link href="/about" className="text-forest underline">
            about
          </Link>{" "}
          page says who runs this. The{" "}
          <Link href="/contact" className="text-forest underline">
            contact
          </Link>{" "}
          page says what to include in a message.
        </p>
        <p className="mt-4 text-sm leading-6 text-ink">CiteScore Team</p>

        <div className="mt-8 space-y-6 text-[15px] leading-7 text-ink-soft">
          <h2 className="font-serif text-2xl text-ink">What we sell</h2>
          <p>
            CiteScore publishes a free AI Answer Snapshot for one local
            business. We ask logged-out ChatGPT and Perplexity who they name
            for that trade and city. The one-page reply lists who is named,
            which sources are cited, and how the Google rating and review
            count compare. No payment. AI answers vary run to run. This is a
            snapshot, not a ranking. Request it on the{" "}
            <Link href="/free-snapshot" className="text-forest underline">
              free snapshot
            </Link>{" "}
            page.
          </p>
          <p>
            The{" "}
            <Link href="/fix-pack" className="text-forest underline">
              AI Visibility Fix Pack
            </Link>{" "}
            is {fixPackIntroPriceLabel} introductory ({fixPackListPriceLabel}{" "}
            list). One business, one city, one service. It is a Google
            Business Profile gap list, a review-gap plan and script, the
            directories those answers cited, paste-ready LocalBusiness and
            Service JSON-LD with install steps, and a re-check of the same
            prompts 14 days later. It is not a promise that any assistant
            will name the business. The buy button opens{" "}
            {fixPackIntroPriceLabel} card checkout. The free snapshot comes
            first.
          </p>
          <h3 className="font-serif text-xl text-ink">
            Other products on checkout
          </h3>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-ink">{site.priceLabel} GEO audit.</strong>{" "}
              One public URL. A self-serve PDF with a 0–100 score and about
              ten fixes, usually a few minutes after payment. Paid through
              Stripe. The price is the price on the{" "}
              <Link href="/geo-audit" className="text-forest underline">
                GEO audit
              </Link>{" "}
              page.
            </li>
            <li>
              <strong className="text-ink">{agencyKitLabel}.</strong> Client
              report template, pitch email sequence, pricing tiers, a
              one-pager, and a 30-day delivery SOP. It is not a scored URL.
              Paid through Polar.
            </li>
            <li>
              <strong className="text-ink">{doneForYouAuditLabel}.</strong> A
              written walkthrough of one public URL, delivered within 3
              business days. Paid through Polar.
            </li>
            <li>
              <strong className="text-ink">{whiteLabelAuditLabel}.</strong> An
              unbranded PDF of one public URL, delivered within 3 business
              days, with no CiteScore branding. Paid through Polar.
            </li>
          </ul>
          <p>
            The {templatePackLabel} is a separate digital download. Paid
            through Polar. It is listed on the{" "}
            <Link href="/terms" className="text-forest underline">
              terms
            </Link>{" "}
            page. Each product is a digital file, not a subscription and not
            a seat. Weekly rescans are not for sale. The free check is not a
            purchase and does not create an order.
          </p>

          <h2 className="font-serif text-2xl text-ink">
            What we do not promise
          </h2>
          <p>
            AI answers vary run to run. This is a snapshot, not a ranking. It
            is not a promise that any assistant will name the business.
            Audits and downloads are information about public pages. They are
            not legal, financial, or ranking advice, and they are not a
            promise of citations, traffic, or revenue.
          </p>
          <p>
            An{" "}
            <Link href="/sample-snapshot" className="text-forest underline">
              example snapshot (fictional business)
            </Link>{" "}
            uses a fictional business. Example only: fictional business,
            fictional competitors, illustrative numbers. Not a customer
            result, and not a live ChatGPT or Perplexity answer. The{" "}
            <Link href="/sample-fix-pack" className="text-forest underline">
              sample Fix Pack (fictional plumber)
            </Link>
            . {sampleFixPackExampleBanner} How a snapshot is produced is on{" "}
            <Link href="/methodology" className="text-forest underline">
              methodology
            </Link>
            .
          </p>

          <h2 className="font-serif text-2xl text-ink">How money works</h2>
          <p>
            Stripe, Polar, and Payhip process card payments for the products
            that use them. {sellerName} does not see full card numbers.
            Payhip handles the AI Visibility Fix Pack ({fixPackIntroPriceLabel}
            ). Stripe handles the{" "}
            <Link href="/geo-audit" className="text-forest underline">
              GEO audit
            </Link>
            . Polar handles the {templatePackLabel}, the {agencyKitLabel}, the{" "}
            {doneForYouAuditLabel}, and the {whiteLabelAuditLabel}. The{" "}
            <Link href="/checkout" className="text-forest underline">
              checkout
            </Link>{" "}
            page lists the Fix Pack and the other paid files.
          </p>
          <div className="flex flex-col gap-3">
            <FixPackBuyLink />
            <ExternalLink href={agencyKitUrl}>{agencyKitLabel}</ExternalLink>
            <ExternalLink href={doneForYouAuditUrl}>
              {doneForYouAuditLabel}
            </ExternalLink>
            <ExternalLink href={whiteLabelAuditUrl}>
              {whiteLabelAuditLabel}
            </ExternalLink>
            <ExternalLink href={templatePackUrl}>{templatePackLabel}</ExternalLink>
          </div>
          <h3 className="font-serif text-xl text-ink">Delivery</h3>
          <p>
            The GEO audit is instant. After Stripe confirms payment, the
            self-serve PDF is produced automatically, usually within a few
            minutes. It is not held for a later business day.
          </p>
          <p>
            The {doneForYouAuditLabel} and the {whiteLabelAuditLabel} are
            delivered within 3 business days of the order. You send one
            public URL. Business days exclude weekends.
          </p>
          <p>
            The {agencyKitLabel} and the {templatePackLabel} are digital
            downloads delivered when Polar confirms payment.
          </p>
          <p>
            The Fix Pack is delivered by email within a few business days
            after payment, once we have the business name, city, service, and
            public site URL. After you pay, send those fields on the{" "}
            <Link href="/fix-pack/next-steps" className="text-forest underline">
              next-steps page
            </Link>
            , or email them. The free AI Answer Snapshot is not a purchase. We
            reply with the one-page snapshot. Do not send passwords, cookies,
            or pages behind a login.
          </p>

          <h3 className="font-serif text-xl text-ink">Refunds</h3>
          <p>
            If the AI Visibility Fix Pack ({fixPackIntroPriceLabel}{" "}
            introductory) is not useful, email{" "}
            <a href={`mailto:${contactEmail}`} className="text-forest underline">
              {contactEmail}
            </a>{" "}
            within 14 days of delivery and {sellerName} refunds that purchase
            in full. You do not need to show that you installed the markup or
            sent the review script.
          </p>
          <p>
            The 14 days start when the Fix Pack is delivered, not when you
            request the free snapshot. The free AI Answer Snapshot has no
            charge, so there is nothing to refund on it.
          </p>
          <p>
            For the{" "}
            <Link href="/geo-audit" className="text-forest underline">
              GEO audit
            </Link>{" "}
            and the other paid files listed on the{" "}
            <Link href="/terms" className="text-forest underline">
              terms
            </Link>
            , email {contactEmail} within 14 days of payment if the file is
            missing, unreadable, or an audit is about the wrong URL.{" "}
            {sellerName} refunds that purchase. Those files are not refunded
            because you dislike a score, disagree with a fix, or choose not
            to use the file.
          </p>
          <p>
            Send the order email, the product name, and the date you paid or
            received the file to{" "}
            <a href={`mailto:${contactEmail}`} className="text-forest underline">
              {contactEmail}
            </a>
            . Card payments are returned through the processor that took the
            payment. {sellerName} does not see full card numbers. The{" "}
            <Link href="/refunds" className="text-forest underline">
              refunds
            </Link>{" "}
            page states both rules.
          </p>

          <h2 className="font-serif text-2xl text-ink">Privacy</h2>
          <p>
            We do not sell emails. We do not ask for passwords, cookies, or
            content behind a login. How a URL and an email are handled is on
            the{" "}
            <Link href="/privacy" className="text-forest underline">
              privacy
            </Link>{" "}
            page.
          </p>

          <h2 className="font-serif text-2xl text-ink">Questions</h2>
          <div className="space-y-6">
            {trustPageFaqs.map((item) => (
              <div key={item.q}>
                <h3 className="font-serif text-xl text-ink">{item.q}</h3>
                <p className="mt-2">{item.a}</p>
              </div>
            ))}
          </div>
          <p>
            More answers are on the{" "}
            <Link href="/faq" className="text-forest underline">
              FAQ
            </Link>{" "}
            and on{" "}
            <Link href="/how-it-works" className="text-forest underline">
              how it works
            </Link>
            .
          </p>

          <h2 className="font-serif text-2xl text-ink">Pages</h2>
          <ul className="list-disc space-y-2 pl-5">
            {pages.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="text-forest underline">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="border-t border-rule pt-6 text-ink">CiteScore Team</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
