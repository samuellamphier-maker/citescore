import Link from "next/link";
import { EmailRequestFallback } from "@/components/EmailRequestFallback";
import { FixPackBuyLink } from "@/components/FixPackBuyLink";
import { snapshotTemplateRequestText } from "@/lib/email-request";
import { contactEmail, fixPackGetCtaLabel, fixPackIntroPriceLabel } from "@/lib/site";

const industryLead =
  "Tell us the business, the city, the service, and the website. We ask who ChatGPT names and send the one-page snapshot. AI answers vary run to run.";

const generalLead =
  "See which local competitors ChatGPT and Perplexity name instead of the business. We ask logged-out ChatGPT and Perplexity who they name and send the one-page snapshot. AI answers vary run to run. No payment.";

export function IndustrySnapshotCta({
  industry,
  snapshotHref = "/free-snapshot",
  variant = "industry",
}: {
  industry?: string;
  /** Free-snapshot URL. Guides for one trade pass /free-snapshot?trade=… */
  snapshotHref?: string;
  /** General guides use the local-competitor invitation. Trade guides keep the industry line. */
  variant?: "industry" | "general";
}) {
  const general = variant === "general";
  return (
    <aside className="rounded-2xl border border-ink bg-ink px-5 py-4 text-cream">
      <p className="kicker on-ink">Free</p>
      <h2 className="mt-2 font-serif text-2xl leading-snug tracking-tight text-cream">
        {!general && industry
          ? `Free AI Answer Snapshot for ${industry} businesses in your city`
          : "Free AI Answer Snapshot"}
      </h2>
      <p className="mt-3 text-sm leading-6 text-[#d7c7b0]">
        {general ? generalLead : industryLead}
      </p>
      <div data-funnel-cta className="mt-4">
        <Link
          href={snapshotHref}
          className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-cream px-4 text-base font-medium text-ink hover:bg-paper"
        >
          Get a free AI Answer Snapshot
        </Link>
      </div>
      <p className="mt-3 text-sm leading-6">
        <Link
          href="/sample-snapshot"
          className="font-medium text-cream underline underline-offset-4"
        >
          See an example snapshot
        </Link>
        <span className="text-[#d7c7b0]"> · </span>
        <Link href="/fix-pack" className="font-medium text-cream underline underline-offset-4">
          Fix Pack, {fixPackIntroPriceLabel}
        </Link>
      </p>
      <FixPackBuyLink
        compact
        showAssurance={false}
        payhipNote="shop"
        tone="dark"
        label={fixPackGetCtaLabel()}
        className="text-sm font-medium text-cream underline underline-offset-4"
      />
      <details className="mt-1">
        <summary className="flex min-h-11 cursor-pointer list-none items-center text-sm font-medium text-cream marker:content-none [&::-webkit-details-marker]:hidden">
          Email this request instead
        </summary>
        <EmailRequestFallback
          tone="dark"
          className="mt-2"
          requestText={snapshotTemplateRequestText(contactEmail, industry ?? "")}
        />
      </details>
    </aside>
  );
}
