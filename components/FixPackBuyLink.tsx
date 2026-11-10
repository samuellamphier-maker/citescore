import Link from "next/link";
import { EmailRequestFallback } from "@/components/EmailRequestFallback";
import { fixPackRequestText } from "@/lib/email-request";
import { fixPackBuyAssurance, fixPackPayhipCheckoutNote } from "@/lib/fix-pack-offer";
import { contactEmail, fixPackCtaLabel, fixPackHref, FIX_PACK_CHECKOUT_URL } from "@/lib/site";

export function FixPackBuyLink({
  className = "inline-flex h-12 items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream hover:bg-forest-deep",
  tone = "light",
  label,
  compact = false,
}: {
  className?: string;
  tone?: "light" | "dark";
  /** Overrides the default checkout label. The href stays the Payhip buy link. */
  label?: string;
  /** Size the control to its label so it can sit beside another CTA. */
  compact?: boolean;
}) {
  const checkout = FIX_PACK_CHECKOUT_URL.trim();
  const noteClass =
    tone === "dark"
      ? "max-w-xs text-xs leading-5 text-[#d7c7b0]"
      : "max-w-xs text-xs leading-5 text-ink-soft";
  const assuranceClass =
    tone === "dark"
      ? "text-sm leading-6 text-[#d7c7b0]"
      : "text-sm leading-6 text-ink-soft";
  const noteLinkClass =
    tone === "dark"
      ? "font-medium text-cream underline underline-offset-4"
      : "font-medium text-forest underline underline-offset-4";
  const assurance = (
    <p className={assuranceClass}>
      {fixPackBuyAssurance}{" "}
      <Link href="/refunds" className={noteLinkClass}>
        Refund policy
      </Link>
      .
    </p>
  );
  return (
    <div
      data-funnel-cta
      className={
        compact
          ? "flex w-full min-w-0 basis-full flex-col gap-2"
          : "flex min-w-0 flex-col gap-2"
      }
    >
      <a
        href={fixPackHref()}
        className={className}
        {...(checkout ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {label ?? fixPackCtaLabel()}
        {checkout ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </a>
      {assurance}
      {checkout ? (
        <p className={noteClass}>
          {fixPackPayhipCheckoutNote}{" "}
          <Link href="/fix-pack/next-steps" className={noteLinkClass}>
            What happens after you buy
          </Link>
          .
        </p>
      ) : (
        <EmailRequestFallback tone={tone} requestText={fixPackRequestText(contactEmail)} />
      )}
    </div>
  );
}
