import {
  freeSnapshotHeadingDefault,
  freeSnapshotLeadDefault,
} from "@/lib/home-service-trade";
import { contactEmail, site } from "@/lib/site";

/** Brand icon already published from `public/icon-512.png` and the web manifest. */
export const organizationLogoPath = "/icon-512.png";

/**
 * Same fragment the Organization schema generator writes: origin plus `#organization`.
 * Other nodes reference this id instead of repeating a second Organization.
 */
export function organizationId(origin: string) {
  return `${origin.replace(/\/$/, "")}#organization`;
}

export function websiteId(origin: string) {
  return `${origin.replace(/\/$/, "")}#website`;
}

export function citeScoreOrganizationJsonLd(origin: string): Record<string, unknown> {
  const base = origin.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId(base),
    name: site.name,
    url: base,
    logo: `${base}${organizationLogoPath}`,
    description: site.description,
    email: contactEmail,
    contactPoint: {
      "@type": "ContactPoint",
      email: contactEmail,
      url: `${base}/contact`,
    },
  };
}

export function citeScoreWebsiteJsonLd(origin: string): Record<string, unknown> {
  const base = origin.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(base),
    name: site.name,
    url: base,
    description: site.description,
    publisher: { "@id": organizationId(base) },
  };
}

/** Seller / provider pointer. The full Organization node lives once, in the root layout. */
export function organizationRef(origin: string): Record<string, unknown> {
  return { "@id": organizationId(origin) };
}

/**
 * Sentences already visible on /free-snapshot: the default heading and lead,
 * then the “what happens after you submit” steps. Not the meta description.
 */
export const freeSnapshotServiceDescription = [
  freeSnapshotHeadingDefault,
  freeSnapshotLeadDefault,
  "We ask logged-out ChatGPT and Perplexity who they name for that trade and city, and record who is named.",
  "We reply with the one-page snapshot by email: who is named, which sources are cited, and how the Google rating and review count compare.",
  "A real snapshot prints the day the prompts were asked.",
  "There is no set delivery time.",
].join(" ");

export function freeSnapshotServiceJsonLd(
  origin: string,
  copy: { name?: string; description?: string } = {},
): Record<string, unknown> {
  const base = origin.replace(/\/$/, "");
  const url = `${base}/free-snapshot`;
  const name = copy.name ?? "Free AI Answer Snapshot";
  const description = copy.description ?? freeSnapshotServiceDescription;
  const canonical =
    name === "Free AI Answer Snapshot" && description === freeSnapshotServiceDescription;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    ...(canonical ? { "@id": `${url}#service` } : {}),
    name,
    description,
    url,
    provider: organizationRef(base),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      url,
      seller: organizationRef(base),
    },
  };
}
