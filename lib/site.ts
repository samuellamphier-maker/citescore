export const site = {
  name: "CiteScore",
  tagline: "GEO / AI-visibility audits",
  price: 39,
  priceLabel: "$39",
  subscriptionPriceLabel: "$29/mo",
  description:
    "Paste a URL. Get a scored AI-search visibility report for ChatGPT, Perplexity, and Google AI Overviews — plus the concrete fixes that would get the site cited.",
} as const;

/** Canonical public origin. Prefer an explicit env, then Vercel production. */
export const productionOrigin = "https://citescore.vercel.app";

export function publicOrigin() {
  const explicit =
    process.env.NEXT_PUBLIC_APP_URL?.trim() || process.env.APP_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return productionOrigin;
}

export const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL?.trim() || "";

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
