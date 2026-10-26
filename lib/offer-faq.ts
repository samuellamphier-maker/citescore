import {
  contactEmail,
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  sellerName,
} from "@/lib/site";

export const sonickStudyUrl =
  "https://sonickmarketing.com/blog/chatgpt-local-business-study/";

export const llmsTxtSourceUrl =
  "https://searchengineland.com/google-says-llms-txt-files-wont-harm-or-help-your-search-rankings-480264";

export type FaqItem = {
  q: string;
  a: string;
};

/**
 * Questions a local-business owner can already answer from this site.
 * The free snapshot has no clock-time turnaround. The Fix Pack is emailed
 * within a few business days after payment and intake.
 */
export const snapshotOfferFaqs: readonly FaqItem[] = [
  {
    q: "What does the free AI Answer Snapshot show?",
    a: "For one business, the one-page snapshot records who is named, which sources are cited, and each named competitor’s Google rating and review count next to yours. A real snapshot prints the day the prompts were asked. AI answers vary run to run. This is a snapshot, not a ranking.",
  },
  {
    q: "How is the snapshot produced?",
    a: "We ask logged-out ChatGPT and Perplexity a local prompt such as “best {service} in {city},” plus one variant, and record who they name. The request form does not post to a server. It opens your email app. We receive the business name, city, service, and email only if you send that message.",
  },
  {
    q: "Do the answers stay the same if you ask again?",
    a: "No. AI answers vary run to run. This is a snapshot, not a ranking. A published UK test of local ChatGPT answers found that only 40% of businesses appeared in all three runs (SoNick Marketing).",
  },
  {
    q: "When is the Fix Pack delivered?",
    a: "We email the Fix Pack within a few business days after payment, once we have the business name, city, service, and public site URL. The re-check in the pack is the same prompts, run again 14 days later.",
  },
  {
    q: "What is in the Fix Pack, and what do I do with it?",
    a: `Five pieces, for one business, one city, and one service. A Google Business Profile gap list (category, services, hours, photos, and Q&A) compared with the businesses the snapshot names. A review-gap plan with a copy-paste SMS and email you can send to ask for a Google review. The directories and trade bodies those answers cited, and where you are missing. Paste-ready LocalBusiness and Service JSON-LD that matches the name, phone, and address already on the page, plus install steps for WordPress, Wix, Squarespace, and Shopify. You paste the script into the head of the public site and keep every field visible on the page. A re-check of the same prompts 14 days later, with who is named the second time written next to the first snapshot. Introductory price ${fixPackIntroPriceLabel}. List price ${fixPackListPriceLabel}. It is not a promise that any assistant will name you.`,
  },
  {
    q: "Will ChatGPT name my business after this?",
    a: "No. The Fix Pack is the work that matches what local AI answers tend to cite: the Google Business Profile, reviews, the directories the answer used, and clear service markup. It is not a promise that any assistant will name you.",
  },
  {
    q: "Do I need to give a login or site access?",
    a: "No. The snapshot request has no account and no paid checkout. The form does not post to a server. It opens your email app with the business name, city, service, and email. We receive those only if you send that message. Do not send passwords, cookies, or pages behind a login. We email the Fix Pack. You paste the JSON-LD into the head of the public site and keep every field visible on the page. The review script is a copy-paste SMS and email you can send.",
  },
  {
    q: "How do I request the snapshot or the Fix Pack?",
    a: `The snapshot is free. Send the business name, city, service, and email. The button opens an email to ${contactEmail}. If no mail app opens, copy the request and email it to ${contactEmail} from any inbox. We reply with the one-page snapshot. The Fix Pack is ${fixPackIntroPriceLabel}. The buy button opens card checkout. The free snapshot comes first.`,
  },
  {
    q: "What if the Fix Pack is not useful?",
    a: "Email us within 14 days of delivery and we refund the Fix Pack in full. You do not have to prove that you implemented anything. The 14 days start when the Fix Pack is delivered, not when you request the free snapshot. The free AI Answer Snapshot has no charge, so there is nothing to refund on it. Details are on the refunds page.",
  },
  {
    q: "Who runs CiteScore?",
    a: `CiteScore is operated by the CiteScore Team. The seller name on this site is ${sellerName}. Questions go to ${contactEmail}. The About page describes who operates the site.`,
  },
];

const fixPackOnlyFaqs: readonly FaqItem[] = [
  {
    q: "Does llms.txt get a local business named?",
    a: "No. llms.txt is optional; Google says it ignores llms.txt (Search Engine Land). The Fix Pack does not sell an llms.txt file as a citation tactic.",
  },
];

export function fixPackFaqs(): FaqItem[] {
  return [...snapshotOfferFaqs, ...fixPackOnlyFaqs];
}

export function faqPageJsonLd(items: readonly FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
