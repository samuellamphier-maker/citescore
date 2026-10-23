import { fixPackCtaLabel, fixPackHref, FIX_PACK_CHECKOUT_URL } from "@/lib/site";

export function FixPackBuyLink({
  className = "inline-flex h-12 items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream hover:bg-forest-deep",
}: {
  className?: string;
}) {
  const checkout = FIX_PACK_CHECKOUT_URL.trim();
  return (
    <a
      href={fixPackHref()}
      className={className}
      {...(checkout
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {fixPackCtaLabel()}
    </a>
  );
}
