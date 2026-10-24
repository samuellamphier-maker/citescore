import Link from "next/link";
import { LlmsTxtCaveat } from "@/components/LlmsTxtCaveat";

export function IndustrySnapshotCta({ industry }: { industry: string }) {
  return (
    <aside className="rounded-2xl border border-ink bg-ink px-5 py-6 text-cream">
      <p className="kicker text-[#d7c7b0]">Free</p>
      <h2 className="mt-2 font-serif text-2xl leading-snug tracking-tight text-cream">
        Free AI Answer Snapshot for {industry} businesses in your city
      </h2>
      <p className="mt-3 text-sm leading-6 text-[#d7c7b0]">
        Tell us the business, the city, and the service. We ask who ChatGPT
        names and send the one-page snapshot. AI answers vary run to run.
      </p>
      <Link
        href="/#snapshot"
        className="mt-5 inline-flex h-11 items-center justify-center rounded-lg bg-cream px-4 text-sm font-medium text-ink hover:bg-paper"
      >
        Get a free AI Answer Snapshot
      </Link>
      <Link
        href="/sample-snapshot"
        className="mt-3 block text-sm font-medium text-cream underline underline-offset-4"
      >
        See an example snapshot
      </Link>
      <p className="mt-4 text-xs leading-5 text-[#d7c7b0]">
        llms.txt is <LlmsTxtCaveat className="underline" />.
      </p>
    </aside>
  );
}
