import Link from "next/link";
import { SnapshotRequestForm } from "@/components/SnapshotRequestForm";

/**
 * The guide snapshot request: same FlowForm fields, with this page's path
 * as the hidden source. Placement only. The form implementation stays in
 * SnapshotRequestForm.
 */
export function InlineSnapshotRequest({
  source,
  defaultService,
  snapshotHref = "/free-snapshot",
  caveat = true,
}: {
  source: string;
  /** Service field prefill. Omit unless the page is about one trade. */
  defaultService?: string;
  snapshotHref?: string;
  /** Set false when the page already states the snapshot limits. */
  caveat?: boolean;
}) {
  return (
    <section className="mt-12" aria-labelledby="guide-snapshot-request" data-funnel-cta>
      <h2 id="guide-snapshot-request" className="font-serif text-2xl tracking-tight">
        Request a free AI Answer Snapshot
      </h2>
      <p className="mt-3 text-sm leading-6 text-ink-soft">
        Same request as the{" "}
        <Link href={snapshotHref} className="text-forest underline">
          free snapshot page
        </Link>
        .
        {caveat ? (
          <>
            {" "}
            AI answers vary run to run. This is a snapshot, not a ranking, and
            not a promise that any assistant will name the business.
          </>
        ) : null}
      </p>
      <div className="mt-5">
        <SnapshotRequestForm
          defaultService={defaultService}
          source={source}
          caveat={false}
        />
      </div>
      <p className="mt-4 text-sm leading-6 text-ink-soft">Prepared by the CiteScore Team.</p>
    </section>
  );
}
