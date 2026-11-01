import {
  contactEmail,
  fixPackIntroPriceLabel,
  site,
} from "@/lib/site";

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

/** Same description already used as the free snapshot page meta description. */
export const freeSnapshotServiceDescription = `Request a free AI Answer Snapshot for one local business. We ask logged-out ChatGPT and Perplexity who they name for that trade and city, and reply with a one-page snapshot. The ${fixPackIntroPriceLabel} Fix Pack is optional.`;

export function freeSnapshotServiceJsonLd(origin: string): Record<string, unknown> {
  const base = origin.replace(/\/$/, "");
  const url = `${base}/free-snapshot`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: "Free AI Answer Snapshot",
    description: freeSnapshotServiceDescription,
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
