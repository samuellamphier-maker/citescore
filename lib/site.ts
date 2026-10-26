import { resolveHttpOrigin } from "@/lib/urls";

export const site = {
  name: "CiteScore",
  tagline: "Who does ChatGPT name in your city?",
  price: 39,
  priceLabel: "$39",
  subscriptionPriceLabel: "$29/mo",
  description:
    "When customers ask ChatGPT for a plumber (or your trade) in your city, who does it name? Get a free AI Answer Snapshot. The AI Visibility Fix Pack is $49.",
} as const;

export const sellerName = "CiteScore";

export const contactEmail = "citescore@mail.grokbot.com";

export const fixPackIntroPriceLabel = "$49";
export const fixPackListPriceLabel = "$97";

/**
 * Live $49 Fix Pack card checkout. An empty string falls back to a mailto request.
 */
export const FIX_PACK_CHECKOUT_URL = "https://payhip.com/b/AjFxC";

export function fixPackHref() {
  const checkout = FIX_PACK_CHECKOUT_URL.trim();
  if (checkout) return checkout;
  return `mailto:${contactEmail}?subject=${encodeURIComponent("Fix Pack request")}`;
}

export function fixPackCtaLabel() {
  return FIX_PACK_CHECKOUT_URL.trim()
    ? `Buy the Fix Pack · ${fixPackIntroPriceLabel}`
    : "Request the Fix Pack";
}

/** Direct Payhip purchase label used beside a free-snapshot CTA. */
export function fixPackGetCtaLabel() {
  return `Get the Fix Pack · ${fixPackIntroPriceLabel}`;
}

/** Canonical public origin. Prefer an explicit env, then Vercel production. */
export const productionOrigin = "https://citescore.vercel.app";

export function publicOrigin() {
  return (
    resolveHttpOrigin(process.env.NEXT_PUBLIC_APP_URL) ||
    resolveHttpOrigin(process.env.APP_URL) ||
    resolveHttpOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
    productionOrigin
  );
}

export const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL?.trim() || "";

export const templatePackUrl =
  "https://buy.polar.sh/polar_cl_mxMcM1rQQ51e3dEJLagfjHsG4ziOrxLXF4vC6416Zfi";

export const templatePackLabel = "GEO Content Template Pack ($19)";

export const agencyKitUrl =
  "https://buy.polar.sh/polar_cl_uy56d9a8UROOTnRqnqzGYgDVv0SlA47ymXKox008zil";

export const agencyKitLabel = "GEO Agency Kit ($29)";

export const whiteLabelAuditUrl =
  "https://buy.polar.sh/polar_cl_4ixeoD1VrmaShwkSL60gREF6CT2o9LBv4UGrS2AlPoA";

export const whiteLabelAuditLabel = "White-Label AI Search Audit ($149)";

export const doneForYouAuditUrl =
  "https://buy.polar.sh/polar_cl_wrxkQcHorscqB0oSBLLNLAU7cpFt4YBZ26D1q0SCh6C";

export const doneForYouAuditPath = "/done-for-you-audit";

export const doneForYouAuditLabel = "Done-For-You AI Search Audit ($99)";

/**
 * Stripe Payment Links persist `client_reference_id` onto the Checkout
 * Session (200-char limit). That is how the webhook recovers `site_url`.
 * `site_url` is also set for thank-you pages and Lemon Squeezy-style links.
 */
export function buildPaymentHref(siteUrl?: string) {
  if (!checkoutUrl) return "";
  try {
    const url = new URL(checkoutUrl);
    if (siteUrl) {
      url.searchParams.set("site_url", siteUrl);
      url.searchParams.set("client_reference_id", siteUrl.slice(0, 200));
    }
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}
