import Link from "next/link";
import { EmailRequestFallback } from "@/components/EmailRequestFallback";
import { fixPackRequestText } from "@/lib/email-request";
import {
  fixPackBuyAssurance,
  fixPackPayhipCheckoutNote,
  fixPackPayhipShopNote,
} from "@/lib/fix-pack-offer";
import {
  contactEmail,
  fixPackCtaLabel,
  fixPackHref,
  FIX_PACK_CHECKOUT_URL,
  payhipShopName,
} from "@/lib/site";

function PayhipCheckoutNote({
  noteClass,
  note = fixPackPayhipCheckoutNote,
}: {
  noteClass: string;
  note?: string;
}) {
  const at = note.indexOf(payhipShopName);
  if (at === -1) return note;
  return (
    <>
      {note.slice(0, at)}
      <a href={FIX_PACK_CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className={noteClass}>
        {payhipShopName}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      {note.slice(at + payhipShopName.length)}
    </>
  );
}

export function FixPackBuyLink({
  className = "inline-flex h-12 items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream hover:bg-forest-deep",
  tone = "light",
  label,
  compact: _compact = false,
  showAssurance = true,
  payhipNote = "full",
}: {
  className?: string;
  tone?: "light" | "dark";
  /** Overrides the default checkout label. The href stays the Payhip buy link. */
  label?: string;
  /** Kept for existing call sites. The refund and Payhip lines use their own row. */
  compact?: boolean;
  /**
   * Guide cards pass false. The refund paragraph stays under buy buttons on
   * the homepage, Fix Pack page, and checkout.
   */
  showAssurance?: boolean;
  /**
   * "shop" is the shop-name sentence only. The text-file line and the
   * next-steps link stay on the full note used at checkout.
   */
  payhipNote?: "full" | "shop";
}) {
  const checkout = FIX_PACK_CHECKOUT_URL.trim();
  const noteClass =
    tone === "dark"
      ? "text-xs leading-5 text-[#d7c7b0]"
      : "text-xs leading-5 text-ink-soft";
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
    <div data-funnel-cta className="w-full basis-full">
      <div className="flex w-full max-w-xl flex-col gap-2">
        <a
          href={fixPackHref()}
          className={className}
          {...(checkout ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {label ?? fixPackCtaLabel()}
          {checkout ? <span className="sr-only"> (opens in a new tab)</span> : null}
        </a>
        {showAssurance ? assurance : null}
        {checkout ? (
          <p className={noteClass}>
            <PayhipCheckoutNote
              noteClass={noteLinkClass}
              note={payhipNote === "shop" ? fixPackPayhipShopNote : fixPackPayhipCheckoutNote}
            />
            {payhipNote === "full" ? (
              <>
                {" "}
                <Link href="/fix-pack/next-steps" className={noteLinkClass}>
                  What happens after you buy
                </Link>
                .
              </>
            ) : null}
          </p>
        ) : (
          <EmailRequestFallback tone={tone} requestText={fixPackRequestText(contactEmail)} />
        )}
      </div>
    </div>
  );
}
