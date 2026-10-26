import type { Metadata } from "next";
import Link from "next/link";
import { EmailRequestFallback } from "@/components/EmailRequestFallback";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMeta } from "@/lib/content/meta";
import {
  fixPackDetailsMailto,
  fixPackDetailsRequestText,
} from "@/lib/email-request";
import { contactEmail, fixPackIntroPriceLabel, sellerName } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMeta({
    title: "What happens after you buy the Fix Pack",
    description: `After you pay for the ${fixPackIntroPriceLabel} AI Visibility Fix Pack, email the business name, city, main service, and public site URL to ${contactEmail}. The pack is emailed within a few business days. Full refund within 14 days of delivery if it is not useful.`,
    path: "/fix-pack/next-steps",
  }),
  robots: { index: false, follow: false },
};

const details = [
  "Business name",
  "City",
  "Main service",
  "Public site URL",
];

export default function FixPackNextStepsPage() {
  const mailto = fixPackDetailsMailto(contactEmail);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-14">
        <p className="kicker">AI Visibility Fix Pack</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">
          What happens after you buy
        </h1>
        <p className="mt-4 text-ink-soft leading-7">
          After you pay for the AI Visibility Fix Pack ({fixPackIntroPriceLabel}),
          send the business name, city, main service, and public site URL to{" "}
          <a href={mailto} className="text-forest underline">
            {contactEmail}
          </a>
          .
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-[15px] leading-7 text-ink-soft">
          {details.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-6 text-ink-soft">
          Do not send passwords, cookies, or pages behind a login.
        </p>
        <div className="mt-6">
          <a
            href={mailto}
            className="inline-flex h-12 items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream hover:bg-forest-deep"
          >
            Email these details
          </a>
        </div>
        <div className="mt-4">
          <EmailRequestFallback requestText={fixPackDetailsRequestText(contactEmail)} />
        </div>

        <h2 className="mt-12 font-serif text-3xl tracking-tight">Delivery</h2>
        <p className="mt-4 text-ink-soft leading-7">
          We email the Fix Pack within a few business days after payment, once
          we have the business name, city, service, and public site URL.
        </p>

        <h2 className="mt-12 font-serif text-3xl tracking-tight">Refund</h2>
        <p className="mt-4 text-ink-soft leading-7">
          If the AI Visibility Fix Pack is not useful, email {contactEmail}{" "}
          within 14 days of delivery and {sellerName} refunds that purchase in
          full. You do not need to show that you installed the markup or sent
          the review script. The 14 days start when the Fix Pack is delivered,
          not when you request the free snapshot. The free AI Answer Snapshot
          has no charge, so there is nothing to refund on it. Details are on
          the{" "}
          <Link href="/refunds" className="text-forest underline">
            refunds
          </Link>{" "}
          page.
        </p>
        <p className="mt-8 text-sm leading-6">
          <Link href="/fix-pack" className="font-medium text-forest underline">
            What is in the Fix Pack
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
