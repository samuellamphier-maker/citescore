import Link from "next/link";
import { FixPackBuyLink } from "@/components/FixPackBuyLink";
import { schemaGeneratorAudience } from "@/lib/industry-snapshot";
import {
  fixPackDetailsCtaLabel,
  fixPackIntroPriceLabel,
  snapshotRequestCtaLabel,
} from "@/lib/site";

/**
 * Above-the-fold offer on schema generator pages.
 * The generator stays below this block.
 */
export function SchemaGeneratorLead({ industry }: { industry?: string }) {
  const audience = schemaGeneratorAudience(industry);
  return (
    <section className="mt-8" aria-labelledby="schema-snapshot-lead">
      <h2 id="schema-snapshot-lead" className="font-serif text-3xl tracking-tight">
        Free AI Answer Snapshot
      </h2>
      <p className="mt-4 text-lg leading-8 text-ink-soft">
        When customers ask ChatGPT or Perplexity for {audience}, who do they
        name? The free AI Answer Snapshot asks logged-out ChatGPT and
        Perplexity and records the answer. The{" "}
        <Link href="/fix-pack" className="text-forest underline">
          Fix Pack
        </Link>{" "}
        is {fixPackIntroPriceLabel}. This generator copies facts the page
        already shows. It does not make an assistant name the business.
      </p>
      <p className="mt-4 text-sm leading-6 text-ink-soft">
        AI answers vary run to run. This is a snapshot, not a ranking, and not
        a promise that any assistant will name the business.
      </p>
      <p className="mt-4 text-sm leading-6">
        <Link href="/sample-snapshot" className="font-medium text-forest underline">
          See an example snapshot
        </Link>
        <span className="text-ink-soft"> · </span>
        <Link href="/fix-pack" className="font-medium text-forest underline">
          {fixPackDetailsCtaLabel}
        </Link>
        <span className="text-ink-soft">
          . Example pages use illustrative numbers. Not a customer result.
        </span>
      </p>
      <p className="mt-3 text-sm leading-6 text-ink-soft">Prepared by the CiteScore Team.</p>
      <div
        data-funnel-cta
        className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
      >
        <Link
          href="#snapshot"
          className="inline-flex h-12 items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream hover:bg-forest-deep"
        >
          {snapshotRequestCtaLabel}
        </Link>
        <FixPackBuyLink
          compact
          className="inline-flex h-12 items-center justify-center rounded-lg border border-ink/25 bg-cream px-5 text-base font-medium text-ink hover:border-ink"
        />
      </div>
    </section>
  );
}
