import { resolveHttpOrigin } from "@/lib/urls";

export const site = {
  name: "CiteScore",
  tagline: "GEO / AI-visibility audits",
  price: 39,
  priceLabel: "$39",
  subscriptionPriceLabel: "$29/mo",
  description:
    "Check crawler access and AI citation-readiness signals for free. The $39 audit is a prioritized, page-specific action plan from those signals — not a live ChatGPT or Perplexity query.",
} as const;

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
