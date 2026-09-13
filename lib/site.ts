export const site = {
  name: "CiteScore",
  tagline: "GEO / AI-visibility audits",
  price: 39,
  priceLabel: "$39",
  subscriptionPriceLabel: "$29/mo",
  description:
    "Paste a URL. Get a scored AI-search visibility report for ChatGPT, Perplexity, and Google AI Overviews — plus the concrete fixes that would get the site cited.",
} as const;

export const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL?.trim() || "";

export function buildPaymentHref(siteUrl?: string) {
  if (!checkoutUrl) return "";
  try {
    const url = new URL(checkoutUrl);
    if (siteUrl) url.searchParams.set("site_url", siteUrl);
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}
