import {
  fixPackPageSnapshotServiceJsonLd,
  freeSnapshotPageFixPackJsonLd,
  homeFixPackProductJsonLd,
  homeSnapshotServiceJsonLd,
  pricingFixPackProductJsonLd,
  pricingSnapshotServiceJsonLd,
} from "@/lib/core-offer-schema";
import { fixPackProductJsonLd } from "@/lib/fix-pack-offer";
import {
  faqPageJsonLd,
  fixPackFaqs,
  fixPackPurchaseFaqs,
  freeSnapshotPageFaqs,
  snapshotOfferFaqs,
  type FaqItem,
} from "@/lib/offer-faq";
import { FIX_PACK_CHECKOUT_URL, productionOrigin } from "@/lib/site";
import {
  citeScoreOrganizationJsonLd,
  citeScoreWebsiteJsonLd,
  freeSnapshotServiceJsonLd,
  organizationId,
} from "@/lib/site-schema";

const invented =
  /Samuel|Lamphier|aggregateRating|reviewCount|ratingValue|AggregateRating|testimonial/i;

function originOf(url: string) {
  return new URL(url).origin;
}

function checkOffer(offer: Record<string, unknown>, path: string, errors: string[]) {
  if (offer["@type"] !== "Offer") errors.push(`${path} @type must be Offer`);
  const price = offer.price;
  if (price !== "0" && price !== "49") {
    errors.push(`${path} price must be "0" or "49"`);
  }
  if (offer.priceCurrency !== "USD") errors.push(`${path} priceCurrency must be USD`);
  if (typeof offer.url !== "string" || !offer.url.startsWith("https://")) {
    errors.push(`${path} url must be an https URL`);
    return;
  }
  const url = offer.url;
  const allowedFixPack = new Set([`${originOf(url)}/fix-pack`, FIX_PACK_CHECKOUT_URL]);
  if (price === "49" && !allowedFixPack.has(url)) {
    errors.push(`${path} $49 offer url must be /fix-pack or the Payhip link`);
  }
  if (price === "0" && url !== `${originOf(url)}/free-snapshot`) {
    errors.push(`${path} free offer url must be /free-snapshot`);
  }
  const seller = offer.seller as Record<string, unknown> | undefined;
  if (!seller || seller["@id"] !== organizationId(originOf(url))) {
    errors.push(`${path} seller must reference the CiteScore organization`);
  }
}

function walk(value: unknown, path: string, errors: string[]) {
  if (value === null || value === undefined) {
    errors.push(`${path} is empty`);
    return;
  }
  if (typeof value === "function") {
    errors.push(`${path} is a function`);
    return;
  }
  if (typeof value === "string") {
    if (invented.test(value)) errors.push(`${path} contains a forbidden claim`);
    if (/<[a-z/]/i.test(value)) errors.push(`${path} contains HTML`);
    return;
  }
  if (typeof value === "number" || typeof value === "boolean") return;
  if (Array.isArray(value)) {
    if (value.length === 0) errors.push(`${path} is an empty array`);
    value.forEach((item, index) => walk(item, `${path}[${index}]`, errors));
    return;
  }
  if (typeof value !== "object") {
    errors.push(`${path} has an unexpected type`);
    return;
  }

  const record = value as Record<string, unknown>;
  if ("@context" in record && record["@context"] !== "https://schema.org") {
    errors.push(`${path} @context must be https://schema.org`);
  }
  if ("@type" in record && (typeof record["@type"] !== "string" || record["@type"] === "")) {
    errors.push(`${path} @type must be a non-empty string`);
  }
  if (record["@type"] === "AggregateRating" || record["@type"] === "Review") {
    errors.push(`${path} must not be a rating or review`);
  }
  if (record["@type"] === "Organization" && "name" in record && record.name !== "CiteScore") {
    errors.push(`${path} organization name must be CiteScore`);
  }
  if (record["@type"] === "Offer") checkOffer(record, path, errors);
  if (record["@type"] === "FAQPage") {
    const main = record.mainEntity;
    if (!Array.isArray(main) || main.length === 0) {
      errors.push(`${path} FAQPage needs questions`);
    }
  }
  if (record["@type"] === "Question") {
    if (typeof record.name !== "string" || record.name.trim() === "") {
      errors.push(`${path} question name is empty`);
    }
    const answer = record.acceptedAnswer as Record<string, unknown> | undefined;
    if (
      !answer ||
      answer["@type"] !== "Answer" ||
      typeof answer.text !== "string" ||
      answer.text.trim() === ""
    ) {
      errors.push(`${path} question needs an answer`);
    }
  }
  for (const [key, child] of Object.entries(record)) {
    if (key.startsWith("@")) continue;
    walk(child, `${path}.${key}`, errors);
  }
}

export function lintJsonLd(data: Record<string, unknown>, label: string): string[] {
  const errors: string[] = [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(JSON.stringify(data));
  } catch (error) {
    return [`${label} is not JSON: ${error instanceof Error ? error.message : "unknown"}`];
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return [`${label} must be a JSON object`];
  }
  const record = parsed as Record<string, unknown>;
  if (record["@context"] !== "https://schema.org") errors.push(`${label} missing @context`);
  if (typeof record["@type"] !== "string") errors.push(`${label} missing @type`);
  walk(record, label, errors);
  return errors;
}

export function pricingFaqItems(): FaqItem[] {
  const questions = [
    "What is the difference between the free snapshot and the Fix Pack?",
    "What happens after I purchase?",
    "What if the Fix Pack is not useful?",
  ];
  return questions.map((question) => {
    const item = [...fixPackPurchaseFaqs, ...snapshotOfferFaqs].find((faq) => faq.q === question);
    if (!item) throw new Error(`Missing pricing FAQ: ${question}`);
    return item;
  });
}

/** JSON-LD the layout and the four core offer pages emit for the commercial offer. */
export function coreOfferJsonLd(origin = productionOrigin) {
  return {
    organization: citeScoreOrganizationJsonLd(origin),
    website: citeScoreWebsiteJsonLd(origin),
    home: [homeSnapshotServiceJsonLd(origin), homeFixPackProductJsonLd(origin)],
    freeSnapshot: [
      freeSnapshotServiceJsonLd(origin),
      freeSnapshotPageFixPackJsonLd(origin),
      faqPageJsonLd(freeSnapshotPageFaqs),
    ],
    fixPack: [
      fixPackProductJsonLd(origin),
      fixPackPageSnapshotServiceJsonLd(origin),
      faqPageJsonLd(fixPackFaqs()),
    ],
    pricing: [
      pricingSnapshotServiceJsonLd(origin),
      pricingFixPackProductJsonLd(origin),
      faqPageJsonLd(pricingFaqItems()),
    ],
  };
}

export function assertCoreOfferSchema(origin = productionOrigin) {
  const graph = coreOfferJsonLd(origin);
  const errors = [
    ...lintJsonLd(graph.organization, "organization"),
    ...lintJsonLd(graph.website, "website"),
    ...graph.home.flatMap((node, index) => lintJsonLd(node, `home[${index}]`)),
    ...graph.freeSnapshot.flatMap((node, index) => lintJsonLd(node, `freeSnapshot[${index}]`)),
    ...graph.fixPack.flatMap((node, index) => lintJsonLd(node, `fixPack[${index}]`)),
    ...graph.pricing.flatMap((node, index) => lintJsonLd(node, `pricing[${index}]`)),
  ];
  if (graph.organization.name !== "CiteScore") errors.push("organization name");
  if (errors.length > 0) throw new Error(errors.join("\n"));
}
