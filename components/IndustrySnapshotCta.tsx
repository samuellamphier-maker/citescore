import Link from "next/link";
import { EmailRequestFallback } from "@/components/EmailRequestFallback";
import { FixPackBuyLink } from "@/components/FixPackBuyLink";
import { LlmsTxtCaveat } from "@/components/LlmsTxtCaveat";
import { snapshotTemplateRequestText } from "@/lib/email-request";
import { contactEmail, fixPackGetCtaLabel, fixPackIntroPriceLabel } from "@/lib/site";

export function IndustrySnapshotCta({
  industry,
  snapshotHref = "/free-snapshot",
}: {
  industry?: string;
  /** Free-snapshot URL. Guides for one trade pass /free-snapshot?trade=… */
  snapshotHref?: string;
}) {
  return (
    <aside className="rounded-2xl border border-ink bg-ink px-5 py-6 text-cream">
      <p className="kicker text-[#d7c7b0]">Free</p>
      <h2 className="mt-2 font-serif text-2xl leading-snug tracking-tight text-cream">
        {industry
          ? `Free AI Answer Snapshot for ${industry} businesses in your city`
          : "Free AI Answer Snapshot"}
      </h2>
      <p className="mt-3 text-sm leading-6 text-[#d7c7b0]">
        Tell us the business, the city, the service, and the website. We ask
        who ChatGPT names and send the one-page snapshot. AI answers vary run
        to run.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Link
          href={snapshotHref}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-cream px-4 text-sm font-medium text-ink hover:bg-paper"
        >
          Get a free AI Answer Snapshot
        </Link>
        <FixPackBuyLink
          compact
          tone="dark"
          label={fixPackGetCtaLabel()}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-forest px-4 text-sm font-medium text-cream hover:bg-forest-deep"
        />
      </div>
      <EmailRequestFallback
        tone="dark"
        className="mt-4"
        requestText={snapshotTemplateRequestText(contactEmail, industry ?? "")}
      />
      <Link
        href="/sample-snapshot"
        className="mt-3 block text-sm font-medium text-cream underline underline-offset-4"
      >
        See an example snapshot
      </Link>
      <Link
        href="/fix-pack"
        className="mt-2 block text-sm font-medium text-cream underline underline-offset-4"
      >
        Fix Pack, {fixPackIntroPriceLabel}
      </Link>
      <p className="mt-4 text-xs leading-5 text-[#d7c7b0]">
        llms.txt is <LlmsTxtCaveat className="underline" />.
      </p>
    </aside>
  );
}
