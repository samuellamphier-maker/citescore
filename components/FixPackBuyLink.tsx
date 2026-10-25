import { EmailRequestFallback } from "@/components/EmailRequestFallback";
import { fixPackRequestText } from "@/lib/email-request";
import { contactEmail, fixPackCtaLabel, fixPackHref, FIX_PACK_CHECKOUT_URL } from "@/lib/site";

export function FixPackBuyLink({
  className = "inline-flex h-12 items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream hover:bg-forest-deep",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const checkout = FIX_PACK_CHECKOUT_URL.trim();
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <a
        href={fixPackHref()}
        className={className}
        {...(checkout ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {fixPackCtaLabel()}
      </a>
      {checkout ? null : (
        <EmailRequestFallback tone={tone} requestText={fixPackRequestText(contactEmail)} />
      )}
    </div>
  );
}
