import Link from "next/link";
import { FixPackBuyLink } from "@/components/FixPackBuyLink";
import { fixPackGetCtaLabel, snapshotRequestCtaLabel } from "@/lib/site";

/** Primary snapshot request plus the Fix Pack buy link, same labels as the rest of the site. */
export function FunnelCtaRow({
  className = "mt-8",
  snapshotHref = "/free-snapshot",
}: {
  className?: string;
  /** Free-snapshot URL. The signal check passes the site that was just checked. */
  snapshotHref?: string;
}) {
  return (
    <div
      data-funnel-cta
      className={`${className} flex max-w-xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center`}
    >
      <Link
        href={snapshotHref}
        className="inline-flex h-12 items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream hover:bg-forest-deep"
      >
        {snapshotRequestCtaLabel}
      </Link>
      <FixPackBuyLink
        compact
        label={fixPackGetCtaLabel()}
        className="inline-flex h-11 items-center justify-center rounded-lg border border-ink/25 bg-cream px-4 text-sm font-medium text-ink hover:border-ink"
      />
    </div>
  );
}
