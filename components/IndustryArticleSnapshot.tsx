import Link from "next/link";
import { freeSnapshotHrefForIndustry } from "@/lib/industry-snapshot";
import { fixPackPageLinkLabel, snapshotRequestCtaLabel } from "@/lib/site";

/** Same industry sentence as IndustrySnapshotCta, plus the published no-charge fact. */
const industryLead =
  "Tell us the business, the city, the service, and the website. We ask who ChatGPT names and send the one-page snapshot. AI answers vary run to run. No payment.";

/**
 * Snapshot offer in the middle of an industry guide.
 * The shell already offers the snapshot before the article and after it.
 */
export function IndustryArticleSnapshot({ industry }: { industry: string }) {
  return (
    <aside
      id="industry-article-snapshot"
      className="industry-article-snapshot rounded-2xl border border-rule bg-cream px-5 py-5 text-ink"
      aria-label="Free AI Answer Snapshot"
    >
      <p className="kicker">Free</p>
      <h2 className="font-serif text-2xl leading-snug tracking-tight text-ink">
        Free AI Answer Snapshot for {industry} businesses in your city
      </h2>
      <p className="mt-3 text-sm leading-6 text-ink-soft">{industryLead}</p>
      <div
        data-funnel-cta
        className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
      >
        <Link
          href={freeSnapshotHrefForIndustry(industry)}
          className="snapshot-button inline-flex h-12 w-full items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream hover:bg-forest-deep sm:w-auto"
        >
          {snapshotRequestCtaLabel}
        </Link>
        <Link
          href="/fix-pack"
          className="snapshot-quiet text-sm font-medium text-forest underline underline-offset-4"
        >
          {fixPackPageLinkLabel()}
        </Link>
      </div>
      <p className="mt-3 text-sm leading-6 text-ink-soft">
        <Link
          href="/sample-snapshot"
          className="snapshot-quiet font-medium text-forest underline underline-offset-4"
        >
          See an example snapshot
        </Link>
        <span>. Fictional business, illustrative numbers.</span>
      </p>
    </aside>
  );
}
