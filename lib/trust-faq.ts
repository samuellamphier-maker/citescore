import type { FaqItem } from "@/lib/offer-faq";
import {
  contactEmail,
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  sellerName,
  site,
} from "@/lib/site";

/**
 * Questions for /faq. The wording is not the same as the FAQPage items
 * already on the homepage, the example snapshot, the free snapshot page,
 * the Fix Pack page, or pricing. Those pages keep their own FAQ.
 * The free snapshot has no clock-time turnaround.
 */
export const snapshotTrustFaqs: readonly FaqItem[] = [
  {
    q: "What is the free AI Answer Snapshot?",
    a: "For one local business, CiteScore asks logged-out ChatGPT and Perplexity who they name for that trade and city. The business receives a one-page snapshot: who is named, which sources are cited, and how the Google rating and review count compare. A real snapshot prints the day the prompts were asked. AI answers vary run to run. This is a snapshot, not a ranking. No payment. An example on this site uses a fictional business and illustrative numbers. It is not a customer result, and not a live ChatGPT or Perplexity answer. Prepared by the CiteScore Team.",
  },
  {
    q: "What does the snapshot check?",
    a: "We ask logged-out ChatGPT and Perplexity a local prompt such as “best {service} in {city},” plus one variant, and record who they name. The one-page snapshot records who is named, which sources are cited, and each named competitor’s Google rating and review count next to yours. The free signal check is separate. It reads public files and does not ask ChatGPT who it names.",
  },
  {
    q: "How do I request the free AI Answer Snapshot?",
    a: `Use the form on the free snapshot page. Submit the business name, city, service, website, and email. The button sends that request through FlowForm to ${contactEmail}. The subject is “Free AI Answer Snapshot.” No account and no paid checkout. If that send fails, the email button, the address, and the copy buttons stay on that page. You can also copy the request and email it to ${contactEmail} from any inbox. We reply with the one-page snapshot. The free snapshot comes first.`,
  },
  {
    q: "What happens after I submit the free snapshot form?",
    a: "You submit the form. FlowForm delivers the business name, city, service, website, and email. No account and no paid checkout. We ask logged-out ChatGPT and Perplexity who they name for that trade and city, and record who is named. We reply with the one-page snapshot by email. After FlowForm accepts the post, it can send the visitor back to this site. We receive the request when FlowForm delivers it, or when you send the email yourself. AI answers vary run to run. This is a snapshot, not a ranking.",
  },
  {
    q: "How is a free snapshot request handled?",
    a: `The free AI Answer Snapshot form sends the business name, city, service, website, and email through FlowForm to ${contactEmail}. The browser posts that form directly to FlowForm. The subject is “Free AI Answer Snapshot.” The same email is set as the reply-to address. A hidden honeypot field is checked in the browser and is left out of the post when it is empty. We do not ask for passwords, cookies, or content behind a login. We do not sell emails. Do not submit a URL you are not allowed to have processed. Questions go to ${contactEmail}. Details are on the privacy page.`,
  },
];

export const fixPackTrustFaqs: readonly FaqItem[] = [
  {
    q: "Who are the free snapshot and the Fix Pack for?",
    a: `The free AI Answer Snapshot is for one local business. CiteScore is for local service businesses that want to know who ChatGPT names for their trade and city, and the small agencies that serve them. The Fix Pack is the done-for-you work after you have seen who was named. One business, one city, one service. Introductory price ${fixPackIntroPriceLabel}. List price ${fixPackListPriceLabel}. It is not a promise that any assistant will name the business. The ${site.priceLabel} GEO audit is a separate product: one public URL, a 0–100 score, and about ten fixes, as a PDF.`,
  },
  {
    q: "Which pieces are in the AI Visibility Fix Pack?",
    a: `Five pieces, for one business, one city, and one service. Introductory price ${fixPackIntroPriceLabel}. List price ${fixPackListPriceLabel}. A Google Business Profile gap list (category, services, hours, photos, and Q&A) compared with the businesses the snapshot names. A review-gap plan with a copy-paste SMS and email you can send to ask for a Google review. The directories and trade bodies those answers cited, and where you are missing. Paste-ready LocalBusiness and Service JSON-LD that matches the name, phone, and address already on the page, plus install steps for WordPress, Wix, Squarespace, and Shopify. You paste the script into the head of the public site and keep every field visible on the page. A re-check of the same prompts 14 days later, with who is named the second time written next to the first snapshot. It is not a promise that any assistant will name the business. The free snapshot comes first. The buy button opens card checkout. The full list is on the Fix Pack page.`,
  },
  {
    q: "How is the Fix Pack delivered?",
    a: `The buy button opens ${fixPackIntroPriceLabel} card checkout. Payhip handles the AI Visibility Fix Pack. After you pay, email the business name, city, main service, and public site URL to ${contactEmail}. We email the Fix Pack within a few business days after payment, once we have the business name, city, service, and public site URL. Do not send passwords, cookies, or pages behind a login. ${sellerName} does not see full card numbers.`,
  },
  {
    q: "What if I want a refund on the Fix Pack?",
    a: `If the AI Visibility Fix Pack (${fixPackIntroPriceLabel} introductory) is not useful, email ${contactEmail} within 14 days of delivery and ${sellerName} refunds that purchase in full. You do not need to show that you installed the markup or sent the review script. The 14 days start when the Fix Pack is delivered, not when you request the free snapshot. The free AI Answer Snapshot has no charge, so there is nothing to refund on it. Send the order email, the product name, and the date you paid or received the file. Card payments are returned through the processor that took the payment. ${sellerName} does not see full card numbers. Details are on the refunds page.`,
  },
];

export const trustFaqs: readonly FaqItem[] = [
  ...snapshotTrustFaqs,
  ...fixPackTrustFaqs,
];
