"use client";

import { useId, useState } from "react";
import { WaitlistForm } from "@/components/WaitlistForm";
import { buildPaymentHref, checkoutUrl, site } from "@/lib/site";
import { normalizeSiteUrl } from "@/lib/urls";

export function AuditCheckout({ defaultUrl = "" }: { defaultUrl?: string }) {
  const inputId = useId();
  const hintId = useId();
  const [value, setValue] = useState(defaultUrl);
  const attached = normalizeSiteUrl(value) ?? "";
  const invalid = value.trim().length > 0 && !attached;
  const paymentsLive = Boolean(checkoutUrl);
  const paymentHref = buildPaymentHref(attached || undefined);

  if (!paymentsLive) {
    return <WaitlistForm defaultUrl={defaultUrl} />;
  }

  const hint = attached
    ? `We'll audit ${attached}. You can change it before you pay.`
    : invalid
      ? "Enter a full site URL, like https://yourproduct.com. You can still pay and send the URL afterward."
      : "No URL yet. Add the public site here, or send it after you pay.";

  return (
    <div>
      <label htmlFor={inputId} className="kicker">
        Site to audit
      </label>
      <input
        id={inputId}
        name="url"
        type="url"
        inputMode="url"
        autoComplete="url"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        placeholder="https://yourproduct.com"
        aria-invalid={invalid ? true : undefined}
        aria-describedby={hintId}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && paymentHref) {
            event.preventDefault();
            window.location.assign(paymentHref);
          }
        }}
        className="mt-2 h-12 w-full rounded-lg border border-rule bg-cream px-3 text-ink placeholder:text-ink-soft"
      />
      <p
        id={hintId}
        className={`mt-2 break-all text-sm leading-6 ${invalid ? "text-ink" : "text-ink-soft"}`}
        role={invalid ? "alert" : undefined}
      >
        {hint}
      </p>
      <a
        href={paymentHref}
        className="mt-5 flex h-12 items-center justify-center rounded-lg bg-ink text-cream hover:bg-forest-deep"
      >
        Continue to payment · {site.priceLabel}
      </a>
    </div>
  );
}
