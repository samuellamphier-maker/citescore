import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMeta } from "@/lib/content/meta";
import {
  contactEmail,
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  sellerName,
  site,
} from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "About",
  description: `CiteScore is operated by the CiteScore Team. The free AI Answer Snapshot and the ${fixPackIntroPriceLabel} Fix Pack are sold by ${sellerName}. Contact ${contactEmail}.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-14">
        <p className="kicker">About</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">
          Operated by the CiteScore Team.
        </h1>
        <p className="mt-4 text-sm text-ink-soft">
          The seller name on this site is {sellerName}. Questions:{" "}
          <a href={`mailto:${contactEmail}`} className="text-forest underline">
            {contactEmail}
          </a>
          .
        </p>
        <div className="mt-8 space-y-6 text-[15px] leading-7 text-ink-soft">
          <p>
            CiteScore publishes a free AI Answer Snapshot for one local
            business. We ask logged-out ChatGPT and Perplexity who they name
            for that trade and city. The one-page reply lists who is named,
            which sources are cited, and how the Google rating and review
            count compare. AI answers vary run to run. This is a snapshot,
            not a ranking.
          </p>
          <p>
            The{" "}
            <Link href="/fix-pack" className="text-forest underline">
              AI Visibility Fix Pack
            </Link>{" "}
            is {fixPackIntroPriceLabel} introductory ({fixPackListPriceLabel}{" "}
            list). It is a Google Business Profile gap list, a review-gap
            plan and script, the directories those answers cited, paste-ready
            LocalBusiness and Service JSON-LD with install steps, and a
            re-check of the same prompts 14 days later. It is not a promise
            that any assistant will name the business. The buy button opens{" "}
            {fixPackIntroPriceLabel} card checkout. The free snapshot still
            starts by email. An{" "}
            <Link href="/sample-snapshot" className="text-forest underline">
              example snapshot
            </Link>{" "}
            uses a fictional business.
          </p>
          <p>
            The {site.priceLabel} GEO audit is a separate product: one public
            URL, a 0–100 score, and about ten fixes, as a PDF. Other digital
            files are listed on the{" "}
            <Link href="/terms" className="text-forest underline">
              terms
            </Link>{" "}
            page. Refunds are on the{" "}
            <Link href="/refunds" className="text-forest underline">
              refunds
            </Link>{" "}
            page. How a URL and an email are handled is on the{" "}
            <Link href="/privacy" className="text-forest underline">
              privacy
            </Link>{" "}
            page.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
