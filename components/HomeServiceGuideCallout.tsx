import Link from "next/link";
import { freeSnapshotPath, type HomeServiceTradeInfo } from "@/lib/home-service-trade";

export function HomeServiceGuideCallout({ trade }: { trade: HomeServiceTradeInfo }) {
  return (
    <aside className="rounded-2xl border border-rule bg-cream px-5 py-4 sm:px-6">
      <p className="text-lg leading-7 text-ink">{trade.question}</p>
      <p className="mt-2 text-sm leading-6 text-ink-soft">
        Free AI Answer Snapshot. We ask logged-out ChatGPT and Perplexity who
        they name and reply with one page. AI answers vary run to run. No
        payment.
      </p>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={freeSnapshotPath(trade.id)}
          className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream transition-colors hover:bg-forest-deep sm:w-auto"
        >
          Get a free AI Answer Snapshot
        </Link>
        <Link
          href="/sample-snapshot"
          className="text-sm font-medium text-forest underline underline-offset-4 hover:underline"
        >
          See an example snapshot
        </Link>
      </div>
    </aside>
  );
}
