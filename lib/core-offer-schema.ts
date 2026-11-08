import { fixPackProductJsonLd } from "@/lib/fix-pack-offer";
import { snapshotOfferFaqs } from "@/lib/offer-faq";
import { fixPackIntroPriceLabel, fixPackListPriceLabel } from "@/lib/site";
import { freeSnapshotServiceJsonLd } from "@/lib/site-schema";

/**
 * Visible offer copy for the four core pages. Each string is rendered on
 * that page, and the JSON-LD description is that same string.
 */

export const homeSnapshotOfferDescription =
  "Submit the business name, city, service, website, and email. We ask logged-out ChatGPT and Perplexity who they name for that trade and city. No payment.";

export const pricingSnapshotOfferDescription =
  "CiteScore asks logged-out ChatGPT and Perplexity who they name for that trade and city. The business receives a one-page snapshot: who is named, which sources are cited, and how the Google rating and review count compare. A real snapshot prints the day the prompts were asked. AI answers vary run to run. This is a snapshot, not a ranking.";

export const pricingFixPackDeliveryDescription = `The free snapshot comes first. The buy button opens ${fixPackIntroPriceLabel} card checkout. After you pay, send the business name, city, service, and public site URL on the next-steps page, or email those fields. We email the Fix Pack within a few business days after payment, once we have the business name, city, service, and public site URL. Do not send passwords, cookies, or pages behind a login.`;

export const pricingFixPackLimitDescription =
  "It is not a promise that any assistant will name the business. Full refund within 14 days of delivery if the Fix Pack is not useful.";

/** Text after the linked words “Fix Pack” on /free-snapshot. */
export const freeSnapshotPageFixPackRest = `is the done-for-you work after you have seen who was named. Introductory price ${fixPackIntroPriceLabel}. List price ${fixPackListPriceLabel}. We email the Fix Pack within a few business days after payment, once we have the business name, city, service, and public site URL. After you pay, send those fields on the next-steps page, or email them. It is not a promise that any assistant will name the business. The buy button opens ${fixPackIntroPriceLabel} card checkout.`;

export const freeSnapshotPageFixPackDescription = `The Fix Pack ${freeSnapshotPageFixPackRest}`;

function snapshotShowsAnswer() {
  const item = snapshotOfferFaqs.find(
    (faq) => faq.q === "What does the free AI Answer Snapshot show?",
  );
  if (!item) throw new Error("Missing snapshot FAQ");
  return item.a;
}

export function homeSnapshotServiceJsonLd(origin: string) {
  return freeSnapshotServiceJsonLd(origin, {
    description: homeSnapshotOfferDescription,
  });
}

/** Homepage heading is “Fix Pack”, not the longer product name. */
export function homeFixPackProductJsonLd(origin: string) {
  return fixPackProductJsonLd(origin, { name: "Fix Pack" });
}

/** Pricing card heading is “AI Answer Snapshot”. */
export function pricingSnapshotServiceJsonLd(origin: string) {
  return freeSnapshotServiceJsonLd(origin, {
    name: "AI Answer Snapshot",
    description: pricingSnapshotOfferDescription,
  });
}

export function pricingFixPackProductJsonLd(origin: string) {
  return fixPackProductJsonLd(origin, {
    description: `${pricingFixPackDeliveryDescription} ${pricingFixPackLimitDescription}`,
  });
}

export function freeSnapshotPageFixPackJsonLd(origin: string) {
  return fixPackProductJsonLd(origin, {
    name: "Fix Pack",
    description: freeSnapshotPageFixPackDescription,
  });
}

/** Answer already rendered in the Fix Pack FAQ. */
export function fixPackPageSnapshotServiceJsonLd(origin: string) {
  return freeSnapshotServiceJsonLd(origin, { description: snapshotShowsAnswer() });
}
