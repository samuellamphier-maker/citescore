import { organizationRef } from "@/lib/site-schema";
import {
  FIX_PACK_CHECKOUT_URL,
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  payhipShopName,
  sellerName,
} from "@/lib/site";

/**
 * Facts already stated on the Fix Pack, terms, refunds, and next-steps pages.
 * The charged price is the introductory price. The list price stays in the
 * description. No rating, review count, or customer count.
 */
export const fixPackDeliverables = [
  {
    title: "Google Business Profile gap list",
    body: "Category, services, hours, photos, and Q&A, compared with the businesses the snapshot says AI named.",
  },
  {
    title: "Review-gap plan and script",
    body: "How your Google rating and review count compare, plus a copy-paste SMS and email you can send to ask for a review.",
  },
  {
    title: "Directories the answer cited",
    body: "The specific directories and trade bodies named in the snapshot for your trade and city, and where your business is missing.",
  },
  {
    title: "Paste-ready LocalBusiness and Service JSON-LD",
    body: "Markup for your site, plus install steps for WordPress, Wix, Squarespace, and Shopify. The script matches the name, phone, and address already on the page.",
  },
  {
    title: "14-day re-check",
    body: "The same prompts, run again 14 days later, with who is named the second time written next to the first snapshot.",
  },
] as const;

export const fixPackWhatYouGet = `Introductory price ${fixPackIntroPriceLabel}. List price ${fixPackListPriceLabel}. One business, one city, one service. A Google Business Profile gap list, a review-gap plan and script, the directories an AI answer cited, paste-ready LocalBusiness and Service JSON-LD with install steps, and a re-check 14 days later. It is not a promise that any assistant will name the business.`;

export const fixPackAfterPayIntake =
  "After you pay, send the business name, city, service, and public site URL on the next-steps page, or email those fields.";

export const fixPackHowDeliveryWorks =
  `The buy button opens card checkout. ${fixPackAfterPayIntake} We email the Fix Pack. Do not send passwords, cookies, or pages behind a login.`;

export const fixPackTurnaround =
  "Within a few business days after payment, once we have the business name, city, service, and public site URL.";

/** Same sentence as the delivery FAQ. It is not the refund window. */
export const fixPackRecheckTiming =
  "The re-check in the pack is the same prompts, run again 14 days later.";

/**
 * Sits under the buy button. The live Payhip product page lists a text file
 * with the order. The Fix Pack itself is the email described on this site.
 */
export const fixPackPayhipCheckoutNote =
  `Opens Payhip in a new tab. The shop name on that page is ${payhipShopName}. Payhip lists a text file with the order. We email the Fix Pack.`;

export const fixPackRefund =
  "Full refund within 14 days of delivery if the Fix Pack is not useful. You do not need to show that you installed the markup or sent the review script. The 14 days start when the Fix Pack is delivered, not when you request the free snapshot. The free AI Answer Snapshot has no charge.";

/**
 * Sits above the Payhip note, in the same view as the buy button.
 * The re-check sentence is the delivery FAQ, so it is not read as the refund.
 */
export const fixPackBuyAssurance = `We email the Fix Pack ${fixPackTurnaround.replace(/^Within/, "within")} ${fixPackRecheckTiming} ${fixPackRefund.slice(0, fixPackRefund.indexOf(". ") + 1)}`;

export function fixPackProductJsonLd(
  origin: string,
  copy: { name?: string; description?: string } = {},
): Record<string, unknown> {
  const offer: Record<string, unknown> = {
    "@type": "Offer",
    price: fixPackIntroPriceLabel.replace(/^\$/, ""),
    priceCurrency: "USD",
    url: `${origin}/fix-pack`,
    seller: organizationRef(origin),
  };
  // The GEO audit omits availability because its checkout is optional per deploy.
  // The Fix Pack buy link is a fixed product URL, so in-stock matches that page.
  if (FIX_PACK_CHECKOUT_URL.trim()) {
    offer.availability = "https://schema.org/InStock";
  }

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: copy.name ?? "AI Visibility Fix Pack",
    description: copy.description ?? `${fixPackWhatYouGet} ${fixPackTurnaround}`,
    brand: {
      "@type": "Brand",
      name: sellerName,
    },
    url: `${origin}/fix-pack`,
    offers: offer,
  };
}
