export type LlmsLink = {
  title: string;
  url: string;
  note: string;
};

export type LlmsInput = {
  name: string;
  siteUrl: string;
  summary: string;
  details: string;
  section: string;
  pages: LlmsLink[];
  optional: LlmsLink[];
};

export type CrawlerId =
  | "oai-searchbot"
  | "chatgpt-user"
  | "gptbot"
  | "perplexitybot"
  | "claudebot"
  | "google-extended";

export type CrawlerPolicy = "allow" | "disallow";

export type CrawlerKind = "search" | "fetch" | "training";

export const AI_CRAWLERS: {
  id: CrawlerId;
  token: string;
  kind: CrawlerKind;
  blurb: string;
}[] = [
  {
    id: "oai-searchbot",
    token: "OAI-SearchBot",
    kind: "search",
    blurb:
      "ChatGPT search. OpenAI says a site that disallows this token is not shown in ChatGPT search answers.",
  },
  {
    id: "chatgpt-user",
    token: "ChatGPT-User",
    kind: "fetch",
    blurb:
      "A fetch started by a person in ChatGPT. OpenAI says robots.txt may not apply, because a person started it.",
  },
  {
    id: "gptbot",
    token: "GPTBot",
    kind: "training",
    blurb:
      "OpenAI training crawl. Independent of OAI-SearchBot. Blocking it does not block ChatGPT search.",
  },
  {
    id: "perplexitybot",
    token: "PerplexityBot",
    kind: "search",
    blurb: "Perplexity’s crawler. Perplexity-User is a different token and is not listed here.",
  },
  {
    id: "claudebot",
    token: "ClaudeBot",
    kind: "training",
    blurb: "Anthropic’s crawler. Claude-SearchBot is a different token and is not listed here.",
  },
  {
    id: "google-extended",
    token: "Google-Extended",
    kind: "training",
    blurb:
      "Gemini Apps and Vertex AI training. Google says this token does not change Google Search or AI Overviews.",
  },
];

export type RobotsPreset = "allow" | "search" | "block";

export type RobotsInput = {
  policies: Record<CrawlerId, CrawlerPolicy>;
  privatePaths: string;
  sitemap: string;
};

export type FaqPair = {
  question: string;
  answer: string;
};

const EMPTY_SUMMARY = "One sentence on what this site is and who it is for.";

export function policiesForPreset(preset: RobotsPreset): Record<CrawlerId, CrawlerPolicy> {
  const policies = {} as Record<CrawlerId, CrawlerPolicy>;
  for (const crawler of AI_CRAWLERS) {
    if (preset === "block") policies[crawler.id] = "disallow";
    else if (preset === "search" && crawler.kind === "training") policies[crawler.id] = "disallow";
    else policies[crawler.id] = "allow";
  }
  return policies;
}

export function matchingPreset(policies: Record<CrawlerId, CrawlerPolicy>): RobotsPreset | "custom" {
  const presets: RobotsPreset[] = ["allow", "search", "block"];
  for (const preset of presets) {
    const target = policiesForPreset(preset);
    if (AI_CRAWLERS.every((crawler) => policies[crawler.id] === target[crawler.id])) return preset;
  }
  return "custom";
}

function siteOrigin(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (!url.hostname.includes(".") && url.hostname !== "localhost") return null;
    return url.origin;
  } catch {
    return null;
  }
}

function absoluteUrl(site: string, href: string): string {
  const value = href.trim();
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  const origin = siteOrigin(site);
  if (!origin) return value;
  if (value.startsWith("/")) return `${origin}${value}`;
  if (/^[^/\s]+\.[^/\s]+/.test(value)) return `https://${value}`;
  return `${origin}/${value.replace(/^\.\//, "")}`;
}

function markdownLabel(label: string) {
  return label.replace(/[\[\]]/g, "").trim();
}

function markdownUrl(url: string) {
  return url.replace(/ /g, "%20").replace(/\(/g, "%28").replace(/\)/g, "%29");
}

function linkLine(link: LlmsLink, site: string): string | null {
  const url = absoluteUrl(site, link.url);
  const title = markdownLabel(link.title);
  if (!title && !url) return null;
  const label = title || url;
  const target = markdownUrl(url || label);
  const note = link.note.trim().replace(/\s+/g, " ");
  return note ? `- [${label}](${target}): ${note}` : `- [${label}](${target})`;
}

function blockquote(summary: string) {
  const lines = (summary.trim() || EMPTY_SUMMARY)
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/^>\s?/, ""))
    .filter(Boolean);
  return lines.map((line) => `> ${line}`).join("\n");
}

function plainDetails(raw: string) {
  return raw
    .split(/\r?\n/)
    .map((line) => line.replace(/^#{1,6}\s*/, ""))
    .join("\n")
    .trim();
}

export function buildLlmsTxt(input: LlmsInput): string {
  const name = input.name.trim().replace(/^#\s*/, "") || "Site name";
  const lines = [`# ${name}`, "", blockquote(input.summary)];
  const details = plainDetails(input.details);
  if (details) {
    lines.push("", details);
  }
  const pages = input.pages.map((link) => linkLine(link, input.siteUrl)).filter((line): line is string => Boolean(line));
  if (pages.length > 0) {
    lines.push("", `## ${input.section.trim() || "Docs"}`, ...pages);
  }
  const optional = input.optional
    .map((link) => linkLine(link, input.siteUrl))
    .filter((line): line is string => Boolean(line));
  if (optional.length > 0) {
    lines.push("", "## Optional", ...optional);
  }
  return `${lines.join("\n")}\n`;
}

export function parsePrivatePaths(raw: string) {
  const seen = new Set<string>();
  const paths: string[] = [];
  let ignoredRoot = false;
  for (const line of raw.split(/\r?\n/)) {
    let path = line.replace(/#.*$/, "").trim().split(/\s+/)[0] ?? "";
    if (!path) continue;
    if (!path.startsWith("/")) path = `/${path}`;
    if (path === "/") {
      ignoredRoot = true;
      continue;
    }
    if (seen.has(path)) continue;
    seen.add(path);
    paths.push(path);
  }
  return { paths, ignoredRoot };
}

/** Absolute sitemap URL. A bare host becomes https://host/sitemap.xml. */
export function normalizeSitemap(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (!url.hostname.includes(".")) return null;
    if (url.pathname === "/" && !/sitemap/i.test(trimmed)) url.pathname = "/sitemap.xml";
    return url.toString();
  } catch {
    return null;
  }
}

export function buildRobotsTxt(input: RobotsInput) {
  const { paths, ignoredRoot } = parsePrivatePaths(input.privatePaths);
  const blocks: string[] = [];
  for (const crawler of AI_CRAWLERS) {
    const lines = [`User-agent: ${crawler.token}`];
    if (input.policies[crawler.id] === "disallow") {
      lines.push("Disallow: /");
    } else {
      lines.push("Allow: /");
      for (const path of paths) lines.push(`Disallow: ${path}`);
    }
    blocks.push(lines.join("\n"));
  }

  const star = ["User-agent: *"];
  if (paths.length === 0) star.push("Allow: /");
  else for (const path of paths) star.push(`Disallow: ${path}`);
  blocks.push(star.join("\n"));

  const sitemapRaw = input.sitemap.trim();
  const sitemap = sitemapRaw ? normalizeSitemap(sitemapRaw) : null;
  const sitemapError = sitemapRaw && !sitemap ? "Enter a sitemap URL, like https://example.com/sitemap.xml." : null;
  const text = `${blocks.join("\n\n")}\n${sitemap ? `\nSitemap: ${sitemap}\n` : ""}`;
  return { text, sitemapError, ignoredRoot };
}

function stripTags(value: string) {
  return value.replace(/<[^>]*>/g, "");
}

export function buildFaqSchema(pairs: FaqPair[]): string {
  const mainEntity = pairs
    .map((pair) => ({
      question: pair.question.trim().replace(/\s+/g, " "),
      answer: stripTags(pair.answer).trim(),
    }))
    .filter((pair) => pair.question && pair.answer)
    .map((pair) => ({
      "@type": "Question",
      name: pair.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: pair.answer,
      },
    }));

  if (mainEntity.length === 0) return "";

  const json = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity,
    },
    null,
    2,
  ).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");

  return `<script type="application/ld+json">\n${json}\n</script>\n`;
}

export type OrganizationInput = {
  name: string;
  url: string;
  logoUrl: string;
  description: string;
  sameAs: string[];
  email: string;
  includeWebsite: boolean;
};

/** Absolute http(s) URL, or null. A missing scheme is treated as https. */
export function httpUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed || /\s/.test(trimmed)) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (!url.hostname.includes(".") && url.hostname !== "localhost") return null;
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

export function organizationEmail(raw: string): string {
  const value = raw.trim().replace(/^mailto:/i, "");
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : "";
}

function jsonLdScript(data: unknown): string {
  const json = JSON.stringify(data, null, 2)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
  return `<script type="application/ld+json">\n${json}\n</script>\n`;
}

function plainLine(raw: string) {
  return stripTags(raw).trim().replace(/\s+/g, " ");
}

export function buildOrganizationSchema(input: OrganizationInput): string {
  const name = plainLine(input.name);
  if (!name) return "";

  const url = httpUrl(input.url);
  const logo = httpUrl(input.logoUrl);
  const description = plainLine(input.description);
  const email = organizationEmail(input.email);
  const sameAs = [
    ...new Set(
      input.sameAs
        .map((item) => httpUrl(item))
        .filter((item): item is string => Boolean(item)),
    ),
  ];

  const organization: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
  };
  if (url) {
    organization["@id"] = `${url.replace(/\/$/, "")}#organization`;
    organization.url = url;
  }
  if (logo) organization.logo = logo;
  if (description) organization.description = description;
  if (sameAs.length > 0) organization.sameAs = sameAs;
  if (email) organization.email = email;

  const blocks = [jsonLdScript(organization)];

  if (input.includeWebsite) {
    const website: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name,
    };
    if (url) {
      website["@id"] = `${url.replace(/\/$/, "")}#website`;
      website.url = url;
      if (typeof organization["@id"] === "string") {
        website.publisher = { "@id": organization["@id"] };
      }
    }
    blocks.push(jsonLdScript(website));
  }

  return `${blocks.join("\n")}\n`;
}

/** schema.org ItemAvailability members. The value is written as a full schema.org URL. */
export const PRODUCT_AVAILABILITY = [
  "InStock",
  "OutOfStock",
  "PreOrder",
  "BackOrder",
  "Discontinued",
  "LimitedAvailability",
  "InStoreOnly",
  "OnlineOnly",
  "SoldOut",
  "PreSale",
] as const;

export type ProductAvailability = (typeof PRODUCT_AVAILABILITY)[number];

export type ProductInput = {
  name: string;
  description: string;
  imageUrl: string;
  brand: string;
  sku: string;
  price: string;
  currency: string;
  availability: string;
  ratingValue: string;
  reviewCount: string;
  bestRating: string;
};

export const ARTICLE_TYPES = ["Article", "BlogPosting"] as const;

export type ArticleType = (typeof ARTICLE_TYPES)[number];

export type AuthorKind = "Person" | "Organization";

export type ArticleInput = {
  type: string;
  headline: string;
  description: string;
  authorName: string;
  authorKind: string;
  publisherName: string;
  publisherLogoUrl: string;
  datePublished: string;
  dateModified: string;
  imageUrl: string;
  canonicalUrl: string;
};

/** Three-letter ISO 4217 code, or empty. */
export function isoCurrency(raw: string): string {
  const value = raw.trim().toUpperCase();
  return /^[A-Z]{3}$/.test(value) ? value : "";
}

function stripThousands(raw: string): string {
  const value = raw.trim();
  if (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(value)) return value.replace(/,/g, "");
  return value;
}

/** A number greater than zero, thousands commas removed, or empty. */
export function productPrice(raw: string): string {
  const value = stripThousands(raw);
  if (!/^\d+(\.\d+)?$/.test(value)) return "";
  if (!(Number(value) > 0)) return "";
  return value;
}

/** A number greater than zero, or empty. Commas are not treated as separators. */
export function ratingDecimal(raw: string): string {
  const value = raw.trim();
  if (!/^\d+(\.\d+)?$/.test(value)) return "";
  if (!(Number(value) > 0)) return "";
  return value;
}

/** A positive integer, thousands commas removed, or empty. */
export function reviewCountValue(raw: string): string {
  const value = stripThousands(raw);
  if (!/^[1-9]\d*$/.test(value)) return "";
  return value;
}

/** A real YYYY-MM-DD calendar date, or empty. */
export function isoDay(raw: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw.trim());
  if (!match) return "";
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return "";
  return `${match[1]}-${match[2]}-${match[3]}`;
}

function availabilityUrl(raw: string): string {
  return PRODUCT_AVAILABILITY.some((item) => item === raw) ? `https://schema.org/${raw}` : "";
}

export function buildProductSchema(input: ProductInput): string {
  const name = plainLine(input.name);
  if (!name) return "";

  const product: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
  };

  const description = plainLine(input.description);
  if (description) product.description = description;

  const image = httpUrl(input.imageUrl);
  if (image) product.image = [image];

  const brand = plainLine(input.brand);
  if (brand) product.brand = { "@type": "Brand", name: brand };

  const sku = plainLine(input.sku);
  if (sku) product.sku = sku;

  const price = productPrice(input.price);
  const currency = isoCurrency(input.currency);
  const availability = availabilityUrl(input.availability);
  if (price || currency || availability) {
    const offer: Record<string, unknown> = { "@type": "Offer" };
    if (price) offer.price = price;
    if (currency) offer.priceCurrency = currency;
    if (availability) offer.availability = availability;
    product.offers = offer;
  }

  const rating = ratingDecimal(input.ratingValue);
  const reviews = reviewCountValue(input.reviewCount);
  const bestRaw = input.bestRating.trim();
  const best = bestRaw ? ratingDecimal(input.bestRating) : "";
  if (rating && reviews && (!bestRaw || best)) {
    const ceiling = best ? Number(best) : 5;
    if (Number(rating) <= ceiling) {
      const aggregateRating: Record<string, unknown> = {
        "@type": "AggregateRating",
        ratingValue: rating,
        reviewCount: reviews,
      };
      if (best) aggregateRating.bestRating = best;
      product.aggregateRating = aggregateRating;
    }
  }

  return jsonLdScript(product);
}

export function buildArticleSchema(input: ArticleInput): string {
  const headline = plainLine(input.headline);
  if (!headline) return "";

  const article: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": input.type === "BlogPosting" ? "BlogPosting" : "Article",
    headline,
  };

  const description = plainLine(input.description);
  if (description) article.description = description;

  const image = httpUrl(input.imageUrl);
  if (image) article.image = [image];

  const datePublished = isoDay(input.datePublished);
  if (datePublished) article.datePublished = datePublished;
  const dateModified = isoDay(input.dateModified);
  if (dateModified) article.dateModified = dateModified;

  const authorName = plainLine(input.authorName);
  if (authorName) {
    article.author = {
      "@type": input.authorKind === "Person" ? "Person" : "Organization",
      name: authorName,
    };
  }

  const publisherName = plainLine(input.publisherName);
  if (publisherName) {
    const publisher: Record<string, unknown> = {
      "@type": "Organization",
      name: publisherName,
    };
    const logo = httpUrl(input.publisherLogoUrl);
    if (logo) publisher.logo = { "@type": "ImageObject", url: logo };
    article.publisher = publisher;
  }

  const url = httpUrl(input.canonicalUrl);
  if (url) {
    article.url = url;
    article.mainEntityOfPage = url;
  }

  return jsonLdScript(article);
}

/** schema.org LocalBusiness and common subtypes. The value is the @type. */
export const LOCAL_BUSINESS_TYPE_GROUPS = [
  { label: "General", types: ["LocalBusiness"] },
  {
    label: "Food",
    types: [
      "Restaurant",
      "Bakery",
      "BarOrPub",
      "Brewery",
      "CafeOrCoffeeShop",
      "FastFoodRestaurant",
      "FoodEstablishment",
      "IceCreamShop",
      "Winery",
    ],
  },
  {
    label: "Health",
    types: ["Dentist", "Hospital", "MedicalClinic", "Optician", "Pharmacy", "Physician", "VeterinaryCare"],
  },
  {
    label: "Professional services",
    types: [
      "AccountingService",
      "Attorney",
      "EmploymentAgency",
      "FinancialService",
      "InsuranceAgency",
      "LegalService",
      "Notary",
      "ProfessionalService",
      "RealEstateAgent",
      "TravelAgency",
    ],
  },
  {
    label: "Home and repair",
    types: [
      "Electrician",
      "GeneralContractor",
      "HVACBusiness",
      "HomeAndConstructionBusiness",
      "HousePainter",
      "Locksmith",
      "MovingCompany",
      "Plumber",
      "RoofingContractor",
    ],
  },
  {
    label: "Beauty and fitness",
    types: ["BeautySalon", "DaySpa", "ExerciseGym", "HairSalon", "HealthClub", "NailSalon", "SportsActivityLocation"],
  },
  {
    label: "Lodging",
    types: ["BedAndBreakfast", "Campground", "Hostel", "Hotel", "LodgingBusiness", "Motel", "Resort"],
  },
  {
    label: "Automotive",
    types: ["AutoBodyShop", "AutoDealer", "AutoRepair", "AutomotiveBusiness", "GasStation"],
  },
  {
    label: "Store",
    types: [
      "BookStore",
      "ClothingStore",
      "ConvenienceStore",
      "ElectronicsStore",
      "Florist",
      "FurnitureStore",
      "GroceryStore",
      "HardwareStore",
      "JewelryStore",
      "PetStore",
      "ShoeStore",
      "ShoppingCenter",
      "Store",
    ],
  },
  { label: "Other", types: ["ChildCare", "DryCleaningOrLaundry", "Library", "SelfStorage"] },
] as const;

export const LOCAL_BUSINESS_TYPES = LOCAL_BUSINESS_TYPE_GROUPS.flatMap((group) => [...group.types]);

export const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

export type Weekday = (typeof WEEKDAYS)[number];

export type OpeningHoursInput = {
  days: string[];
  opens: string;
  closes: string;
};

export type LocalBusinessInput = {
  name: string;
  type: string;
  url: string;
  telephone: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  hours: OpeningHoursInput[];
  latitude: string;
  longitude: string;
  sameAs: string[];
  logoUrl: string;
  imageUrl: string;
};

export type BreadcrumbCrumb = {
  name: string;
  url: string;
};

/** 24-hour clock. A single-digit hour is padded. HH:MM:SS is kept. Empty when invalid. */
export function clockTime(raw: string): string {
  const match = /^([01]?\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/.exec(raw.trim());
  if (!match) return "";
  const hour = match[1].padStart(2, "0");
  return match[3] ? `${hour}:${match[2]}:${match[3]}` : `${hour}:${match[2]}`;
}

/** A phone string with 7–15 digits, or empty. Formatting characters are kept. */
export function telephoneValue(raw: string): string {
  const value = plainLine(raw);
  if (!value || !/^[+().\-\s\d]+$/.test(value)) return "";
  const digits = value.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return "";
  return value;
}

/** Two-letter codes are uppercased. Any other non-empty country text is kept. */
export function addressCountryValue(raw: string): string {
  const value = plainLine(raw);
  if (!value) return "";
  return /^[A-Za-z]{2}$/.test(value) ? value.toUpperCase() : value;
}

/** A finite number inside the range, or null. */
export function geoNumber(raw: string, min: number, max: number): number | null {
  const value = raw.trim();
  if (!/^-?\d+(\.\d+)?$/.test(value)) return null;
  const number = Number(value);
  if (!Number.isFinite(number) || number < min || number > max) return null;
  return number;
}

/** Digits after the decimal point. A whole number is 0. */
export function geoDecimalPlaces(raw: string): number {
  const match = /\.(\d+)$/.exec(raw.trim());
  return match ? match[1].length : 0;
}

function businessType(raw: string): string {
  return LOCAL_BUSINESS_TYPES.some((type) => type === raw) ? raw : "LocalBusiness";
}

export function buildLocalBusinessSchema(input: LocalBusinessInput): string {
  const name = plainLine(input.name);
  if (!name) return "";

  const business: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": businessType(input.type),
    name,
  };

  const url = httpUrl(input.url);
  if (url) business.url = url;

  const telephone = telephoneValue(input.telephone);
  if (telephone) business.telephone = telephone;

  const image = httpUrl(input.imageUrl);
  if (image) business.image = [image];

  const logo = httpUrl(input.logoUrl);
  if (logo) business.logo = logo;

  const streetAddress = plainLine(input.streetAddress);
  const addressLocality = plainLine(input.addressLocality);
  const addressRegion = plainLine(input.addressRegion);
  const postalCode = plainLine(input.postalCode);
  const addressCountry = addressCountryValue(input.addressCountry);
  if (streetAddress || addressLocality || addressRegion || postalCode || addressCountry) {
    const address: Record<string, unknown> = { "@type": "PostalAddress" };
    if (streetAddress) address.streetAddress = streetAddress;
    if (addressLocality) address.addressLocality = addressLocality;
    if (addressRegion) address.addressRegion = addressRegion;
    if (postalCode) address.postalCode = postalCode;
    if (addressCountry) address.addressCountry = addressCountry;
    business.address = address;
  }

  const latitude = geoNumber(input.latitude, -90, 90);
  const longitude = geoNumber(input.longitude, -180, 180);
  if (latitude !== null && longitude !== null) {
    business.geo = { "@type": "GeoCoordinates", latitude, longitude };
  }

  const specs: Record<string, unknown>[] = [];
  for (const row of input.hours) {
    const days = WEEKDAYS.filter((day) => row.days.includes(day));
    const opens = clockTime(row.opens);
    const closes = clockTime(row.closes);
    if (days.length === 0 || !opens || !closes) continue;
    specs.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: days.length === 1 ? days[0] : [...days],
      opens,
      closes,
    });
  }
  if (specs.length === 1) business.openingHoursSpecification = specs[0];
  else if (specs.length > 1) business.openingHoursSpecification = specs;

  const sameAs = [
    ...new Set(input.sameAs.map((item) => httpUrl(item)).filter((item): item is string => Boolean(item))),
  ];
  if (sameAs.length > 0) business.sameAs = sameAs;

  return jsonLdScript(business);
}

export function buildBreadcrumbSchema(crumbs: BreadcrumbCrumb[]): string {
  const items = crumbs
    .map((crumb) => ({
      name: plainLine(crumb.name),
      url: httpUrl(crumb.url),
    }))
    .filter((crumb) => crumb.name);

  if (items.length === 0) return "";

  return jsonLdScript({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => {
      const item: Record<string, unknown> = {
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
      };
      if (crumb.url) item.item = crumb.url;
      return item;
    }),
  });
}

export type DurationParts = {
  days: string;
  hours: string;
  minutes: string;
};

/** A whole number from 0 to 999999, or null when the field is filled but invalid. Empty is undefined. */
function durationPart(raw: string): number | null | undefined {
  const value = raw.trim();
  if (!value) return undefined;
  if (!/^\d{1,6}$/.test(value)) return null;
  return Number(value);
}

/**
 * ISO 8601 duration from days, hours, and minutes.
 * Empty when any filled field is invalid or the total is zero.
 * 45 minutes is PT45M. One day and two hours is P1DT2H.
 */
export function isoDuration(parts: DurationParts): string {
  const days = durationPart(parts.days);
  const hours = durationPart(parts.hours);
  const minutes = durationPart(parts.minutes);
  if (days === null || hours === null || minutes === null) return "";
  const d = days ?? 0;
  const h = hours ?? 0;
  const m = minutes ?? 0;
  if (d + h + m === 0) return "";
  const date = d > 0 ? `${d}D` : "";
  let time = "";
  if (h > 0) time += `${h}H`;
  if (m > 0) time += `${m}M`;
  if (date && time) return `P${date}T${time}`;
  if (date) return `P${date}`;
  return `PT${time}`;
}

/** A number greater than or equal to zero, thousands commas removed, or empty. */
export function nonNegativePrice(raw: string): string {
  const value = stripThousands(raw);
  if (!/^\d+(\.\d+)?$/.test(value)) return "";
  if (!(Number(value) >= 0)) return "";
  return value;
}

export type HowToStepInput = {
  name: string;
  text: string;
  imageUrl: string;
};

export type HowToInput = {
  name: string;
  description: string;
  days: string;
  hours: string;
  minutes: string;
  cost: string;
  currency: string;
  supplies: string[];
  tools: string[];
  steps: HowToStepInput[];
};

function namedItems(type: string, names: string[]): Record<string, unknown>[] {
  const seen = new Set<string>();
  const items: Record<string, unknown>[] = [];
  for (const raw of names) {
    const name = plainLine(raw);
    if (!name || seen.has(name)) continue;
    seen.add(name);
    items.push({ "@type": type, name });
  }
  return items;
}

export function buildHowToSchema(input: HowToInput): string {
  const name = plainLine(input.name);
  if (!name) return "";

  const howto: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
  };

  const description = plainLine(input.description);
  if (description) howto.description = description;

  const totalTime = isoDuration({ days: input.days, hours: input.hours, minutes: input.minutes });
  if (totalTime) howto.totalTime = totalTime;

  const cost = nonNegativePrice(input.cost);
  const currency = isoCurrency(input.currency);
  if (cost && currency) {
    howto.estimatedCost = {
      "@type": "MonetaryAmount",
      currency,
      value: cost,
    };
  }

  const supply = namedItems("HowToSupply", input.supplies);
  if (supply.length > 0) howto.supply = supply;

  const tool = namedItems("HowToTool", input.tools);
  if (tool.length > 0) howto.tool = tool;

  const steps: Record<string, unknown>[] = [];
  for (const step of input.steps) {
    const text = plainLine(step.text);
    if (!text) continue;
    const item: Record<string, unknown> = {
      "@type": "HowToStep",
      position: steps.length + 1,
      text,
    };
    const stepName = plainLine(step.name);
    if (stepName) item.name = stepName;
    const image = httpUrl(step.imageUrl);
    if (image) item.image = image;
    steps.push(item);
  }
  if (steps.length > 0) howto.step = steps;

  return jsonLdScript(howto);
}

/** Google’s documented SoftwareApplication applicationCategory values. */
export const SOFTWARE_APPLICATION_CATEGORIES = [
  "GameApplication",
  "SocialNetworkingApplication",
  "TravelApplication",
  "ShoppingApplication",
  "SportsApplication",
  "LifestyleApplication",
  "BusinessApplication",
  "DesignApplication",
  "DeveloperApplication",
  "DriverApplication",
  "EducationalApplication",
  "HealthApplication",
  "FinanceApplication",
  "SecurityApplication",
  "BrowserApplication",
  "CommunicationApplication",
  "DesktopEnhancementApplication",
  "EntertainmentApplication",
  "MultimediaApplication",
  "HomeApplication",
  "UtilitiesApplication",
  "ReferenceApplication",
] as const;

export type SoftwareApplicationCategory = (typeof SOFTWARE_APPLICATION_CATEGORIES)[number];

export type SoftwareApplicationInput = {
  name: string;
  operatingSystem: string;
  applicationCategory: string;
  price: string;
  currency: string;
  ratingValue: string;
  reviewCount: string;
  bestRating: string;
  url: string;
  description: string;
};

function applicationCategory(raw: string): string {
  return SOFTWARE_APPLICATION_CATEGORIES.some((item) => item === raw) ? raw : "";
}

function aggregateRatingBlock(
  ratingValue: string,
  reviewCount: string,
  bestRating: string,
): Record<string, unknown> | null {
  const rating = ratingDecimal(ratingValue);
  const reviews = reviewCountValue(reviewCount);
  const bestRaw = bestRating.trim();
  const best = bestRaw ? ratingDecimal(bestRating) : "";
  if (!(rating && reviews && (!bestRaw || best))) return null;
  const ceiling = best ? Number(best) : 5;
  if (Number(rating) > ceiling) return null;
  const aggregateRating: Record<string, unknown> = {
    "@type": "AggregateRating",
    ratingValue: rating,
    reviewCount: reviews,
  };
  if (best) aggregateRating.bestRating = best;
  return aggregateRating;
}

export function buildSoftwareApplicationSchema(input: SoftwareApplicationInput): string {
  const name = plainLine(input.name);
  if (!name) return "";

  const application: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
  };

  const description = plainLine(input.description);
  if (description) application.description = description;

  const url = httpUrl(input.url);
  if (url) application.url = url;

  const operatingSystem = plainLine(input.operatingSystem);
  if (operatingSystem) application.operatingSystem = operatingSystem;

  const category = applicationCategory(input.applicationCategory);
  if (category) application.applicationCategory = category;

  const price = nonNegativePrice(input.price);
  const currency = isoCurrency(input.currency);
  if (price || currency) {
    const offer: Record<string, unknown> = { "@type": "Offer" };
    if (price) offer.price = price;
    if (currency) offer.priceCurrency = currency;
    application.offers = offer;
  }

  const aggregateRating = aggregateRatingBlock(input.ratingValue, input.reviewCount, input.bestRating);
  if (aggregateRating) application.aggregateRating = aggregateRating;

  return jsonLdScript(application);
}

export type PersonInput = {
  name: string;
  jobTitle: string;
  url: string;
  imageUrl: string;
  sameAs: string[];
  worksForName: string;
  worksForUrl: string;
  alumniOfName: string;
  alumniOfUrl: string;
  knowsAbout: string[];
};

function uniqueLines(values: string[]): string[] {
  const seen = new Set<string>();
  const lines: string[] = [];
  for (const raw of values) {
    const line = plainLine(raw);
    if (!line || seen.has(line)) continue;
    seen.add(line);
    lines.push(line);
  }
  return lines;
}

function uniqueHttpUrls(values: string[]): string[] {
  return [
    ...new Set(values.map((item) => httpUrl(item)).filter((item): item is string => Boolean(item))),
  ];
}

/** Named organization. A URL without a name is omitted so the script does not invent an entity. */
function organizationNode(type: string, nameRaw: string, urlRaw: string): Record<string, unknown> | null {
  const name = plainLine(nameRaw);
  if (!name) return null;
  const node: Record<string, unknown> = { "@type": type, name };
  const url = httpUrl(urlRaw);
  if (url) node.url = url;
  return node;
}

export function buildPersonSchema(input: PersonInput): string {
  const name = plainLine(input.name);
  if (!name) return "";

  const person: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
  };

  const jobTitle = plainLine(input.jobTitle);
  if (jobTitle) person.jobTitle = jobTitle;

  const url = httpUrl(input.url);
  if (url) person.url = url;

  const image = httpUrl(input.imageUrl);
  if (image) person.image = image;

  const sameAs = uniqueHttpUrls(input.sameAs);
  if (sameAs.length > 0) person.sameAs = sameAs;

  const worksFor = organizationNode("Organization", input.worksForName, input.worksForUrl);
  if (worksFor) person.worksFor = worksFor;

  const alumniOf = organizationNode("EducationalOrganization", input.alumniOfName, input.alumniOfUrl);
  if (alumniOf) person.alumniOf = alumniOf;

  const knowsAbout = uniqueLines(input.knowsAbout);
  if (knowsAbout.length === 1) person.knowsAbout = knowsAbout[0];
  else if (knowsAbout.length > 1) person.knowsAbout = knowsAbout;

  return jsonLdScript(person);
}

export type WebsiteInput = {
  name: string;
  alternateName: string;
  url: string;
  searchUrlTemplate: string;
  publisherName: string;
  publisherUrl: string;
};

const SEARCH_PROBE = "citescore-search-probe";

function substituteToken(value: string, token: string, replacement: string): string {
  return value.split(token).join(replacement);
}

/**
 * Absolute http(s) URL template that still contains {search_term_string}, or empty.
 * A missing scheme is treated as https. A template without the token is rejected.
 */
export function searchUrlTemplate(raw: string): string {
  const value = raw.trim();
  if (!value || /\s/.test(value) || value.includes(SEARCH_PROBE)) return "";
  if (!value.includes("{search_term_string}")) return "";
  const probed = substituteToken(value, "{search_term_string}", SEARCH_PROBE);
  if (probed.includes("{") || probed.includes("}")) return "";
  const url = httpUrl(probed);
  if (!url || !url.includes(SEARCH_PROBE)) return "";
  return substituteToken(url, SEARCH_PROBE, "{search_term_string}");
}

function entityId(url: string, fragment: string): string {
  return `${url.replace(/\/$/, "")}#${fragment}`;
}

export function buildWebsiteSchema(input: WebsiteInput): string {
  const name = plainLine(input.name);
  if (!name) return "";

  const website: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
  };

  const alternateName = plainLine(input.alternateName);
  if (alternateName && alternateName !== name) website.alternateName = alternateName;

  const url = httpUrl(input.url);
  if (url) {
    website["@id"] = entityId(url, "website");
    website.url = url;
  }

  const template = searchUrlTemplate(input.searchUrlTemplate);
  if (template) {
    website.potentialAction = {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: template,
      },
      "query-input": "required name=search_term_string",
    };
  }

  const publisherName = plainLine(input.publisherName);
  if (publisherName) {
    const publisher: Record<string, unknown> = {
      "@type": "Organization",
      name: publisherName,
    };
    const publisherUrl = httpUrl(input.publisherUrl);
    if (publisherUrl) {
      publisher["@id"] = entityId(publisherUrl, "organization");
      publisher.url = publisherUrl;
    }
    website.publisher = publisher;
  }

  return jsonLdScript(website);
}

export type VideoInput = {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  contentUrl: string;
  embedUrl: string;
  publisherName: string;
  publisherUrl: string;
};

function durationNumber(raw: string | undefined): number {
  return raw ? Number(raw) : 0;
}

/** Seconds token with trailing zeros removed. 1.50 becomes 1.5. 10.0 becomes 10. */
function secondsToken(raw: string): string {
  if (!raw.includes(".")) return String(Number(raw));
  return raw.replace(/0+$/, "").replace(/\.$/, "");
}

/**
 * ISO 8601 duration with a non-zero total.
 * PT1M54S and PT00H30M5S are accepted. Zero parts are dropped, so PT00H30M5S is PT30M5S.
 * Empty when the string is not a duration or the total is zero.
 */
export function videoIsoDuration(raw: string): string {
  const value = raw.trim().toUpperCase().replace(/\s+/g, "");
  if (!value) return "";
  const match = /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/.exec(value);
  if (!match) return "";
  const days = match[1];
  const hours = match[2];
  const minutes = match[3];
  const seconds = match[4];
  if (value.includes("T") && !hours && !minutes && !seconds) return "";
  const d = durationNumber(days);
  const h = durationNumber(hours);
  const m = durationNumber(minutes);
  const s = durationNumber(seconds);
  if (!(d + h + m + s > 0)) return "";
  let time = "";
  if (h > 0) time += `${h}H`;
  if (m > 0) time += `${m}M`;
  if (s > 0 && seconds) time += `${secondsToken(seconds)}S`;
  const date = d > 0 ? `${d}D` : "";
  if (date && time) return `P${date}T${time}`;
  if (date) return `P${date}`;
  return time ? `PT${time}` : "";
}

/**
 * ISO 8601 date or date-time. A date is YYYY-MM-DD.
 * A time may include seconds, a fraction, and Z or ±HH:MM. A missing timezone is kept.
 * Empty when the calendar date is impossible.
 */
export function isoDateTime(raw: string): string {
  const value = raw.trim();
  if (!value) return "";
  const day = isoDay(value);
  if (day) return day;
  const match =
    /^(\d{4}-\d{2}-\d{2})T([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d)(?:\.(\d+))?)?(Z|[+-]([01]\d|2[0-3]):?([0-5]\d))?$/.exec(
      value,
    );
  if (!match || !isoDay(match[1])) return "";
  const seconds = match[4] ? `:${match[4]}` : "";
  const fractionDigits = match[5]?.replace(/0+$/, "") ?? "";
  const fraction = fractionDigits ? `.${fractionDigits}` : "";
  let zone = "";
  if (match[6] === "Z") zone = "Z";
  else if (match[7] && match[8]) zone = `${match[6][0]}${match[7]}:${match[8]}`;
  return `${match[1]}T${match[2]}:${match[3]}${seconds}${fraction}${zone}`;
}

/**
 * VideoObject JSON-LD. Empty until name, description, thumbnail, upload date,
 * duration, and a content URL or an embed URL are all valid.
 */
export function buildVideoSchema(input: VideoInput): string {
  const name = plainLine(input.name);
  const description = plainLine(input.description);
  const thumbnail = httpUrl(input.thumbnailUrl);
  const uploadDate = isoDateTime(input.uploadDate);
  const duration = videoIsoDuration(input.duration);
  const contentUrl = httpUrl(input.contentUrl);
  const embedUrl = httpUrl(input.embedUrl);
  if (!name || !description || !thumbnail || !uploadDate || !duration || !(contentUrl || embedUrl)) return "";

  const video: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: [thumbnail],
    uploadDate,
    duration,
  };
  if (contentUrl) video.contentUrl = contentUrl;
  if (embedUrl) video.embedUrl = embedUrl;

  const publisherName = plainLine(input.publisherName);
  if (publisherName) {
    const publisher: Record<string, unknown> = {
      "@type": "Organization",
      name: publisherName,
    };
    const publisherUrl = httpUrl(input.publisherUrl);
    if (publisherUrl) publisher.url = publisherUrl;
    video.publisher = publisher;
  }

  return jsonLdScript(video);
}

/** schema.org EventStatusType values this generator will write. */
export const EVENT_STATUSES = [
  "EventScheduled",
  "EventCancelled",
  "EventPostponed",
  "EventRescheduled",
  "EventMovedOnline",
] as const;

/** schema.org EventAttendanceModeEnumeration values this generator will write. */
export const EVENT_ATTENDANCE_MODES = [
  "OfflineEventAttendanceMode",
  "OnlineEventAttendanceMode",
  "MixedEventAttendanceMode",
] as const;

/** ItemAvailability values Google’s event documentation lists for offers. */
export const EVENT_OFFER_AVAILABILITY = ["InStock", "SoldOut", "PreOrder"] as const;

export type EventInput = {
  name: string;
  startDate: string;
  endDate: string;
  eventStatus: string;
  attendanceMode: string;
  placeName: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  virtualUrl: string;
  imageUrl: string;
  description: string;
  organizerName: string;
  organizerUrl: string;
  price: string;
  currency: string;
  offerUrl: string;
  availability: string;
};

/** A price of zero or more, thousands commas removed, or empty. Zero is a free event. */
export function eventPrice(raw: string): string {
  const value = stripThousands(raw);
  if (!/^\d+(\.\d+)?$/.test(value)) return "";
  if (!(Number(value) >= 0)) return "";
  return value;
}

function schemaOrgUrl(name: string, allowed: readonly string[]): string {
  return allowed.some((item) => item === name) ? `https://schema.org/${name}` : "";
}

function timePart(value: string): string {
  const index = value.indexOf("T");
  return index === -1 ? "" : value.slice(index + 1);
}

function zonePart(value: string): string {
  const match = /(Z|[+-]\d{2}:\d{2})$/.exec(value);
  return match ? match[1] : "";
}

/**
 * True when end is on or after start.
 * The same calendar day with no clock time is an all-day event.
 * A clock time that is earlier than the start, on that day, is rejected.
 */
export function eventEndOk(start: string, end: string): boolean {
  if (end.slice(0, 10) > start.slice(0, 10)) return true;
  if (end.slice(0, 10) < start.slice(0, 10)) return false;
  const startTime = timePart(start);
  const endTime = timePart(end);
  if (!startTime || !endTime) return true;
  const startZone = zonePart(start);
  const endZone = zonePart(end);
  if (startZone && endZone) {
    const startMs = Date.parse(start);
    const endMs = Date.parse(end);
    if (Number.isFinite(startMs) && Number.isFinite(endMs)) return endMs >= startMs;
  }
  return endTime >= startTime;
}

function eventPlace(input: EventInput): Record<string, unknown> | null {
  const placeName = plainLine(input.placeName);
  const street = plainLine(input.streetAddress);
  const locality = plainLine(input.addressLocality);
  const region = plainLine(input.addressRegion);
  const postal = plainLine(input.postalCode);
  const country = addressCountryValue(input.addressCountry);
  if (!placeName || !(street || locality) || !country) return null;
  const address: Record<string, unknown> = { "@type": "PostalAddress" };
  if (street) address.streetAddress = street;
  if (locality) address.addressLocality = locality;
  if (region) address.addressRegion = region;
  if (postal) address.postalCode = postal;
  address.addressCountry = country;
  return { "@type": "Place", name: placeName, address };
}

function eventVirtual(raw: string): Record<string, unknown> | null {
  const url = httpUrl(raw);
  if (!url) return null;
  return { "@type": "VirtualLocation", url };
}

/**
 * Event JSON-LD. Empty until name, start date, attendance mode, and the
 * location that mode requires are valid. Offline needs a place. Online needs
 * a virtual URL. Mixed needs both.
 */
export function buildEventSchema(input: EventInput): string {
  const name = plainLine(input.name);
  const startDate = isoDateTime(input.startDate);
  const attendance = schemaOrgUrl(input.attendanceMode, EVENT_ATTENDANCE_MODES);
  if (!name || !startDate || !attendance) return "";

  const offline = input.attendanceMode === "OfflineEventAttendanceMode";
  const online = input.attendanceMode === "OnlineEventAttendanceMode";
  const mixed = input.attendanceMode === "MixedEventAttendanceMode";
  const place = eventPlace(input);
  const virtual = eventVirtual(input.virtualUrl);
  if ((offline || mixed) && !place) return "";
  if ((online || mixed) && !virtual) return "";

  const event: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    startDate,
    eventAttendanceMode: attendance,
  };

  const endDate = isoDateTime(input.endDate);
  if (endDate && eventEndOk(startDate, endDate)) event.endDate = endDate;

  const status = schemaOrgUrl(input.eventStatus, EVENT_STATUSES);
  if (status) event.eventStatus = status;

  if (mixed && place && virtual) event.location = [place, virtual];
  else if (offline && place) event.location = place;
  else if (online && virtual) event.location = virtual;

  const image = httpUrl(input.imageUrl);
  if (image) event.image = [image];

  const description = plainLine(input.description);
  if (description) event.description = description;

  const organizerName = plainLine(input.organizerName);
  if (organizerName) {
    const organizer: Record<string, unknown> = {
      "@type": "Organization",
      name: organizerName,
    };
    const organizerUrl = httpUrl(input.organizerUrl);
    if (organizerUrl) organizer.url = organizerUrl;
    event.organizer = organizer;
  }

  const price = eventPrice(input.price);
  const currency = isoCurrency(input.currency);
  const offerUrl = httpUrl(input.offerUrl);
  const availability = schemaOrgUrl(input.availability, EVENT_OFFER_AVAILABILITY);
  if (price || currency || offerUrl || availability) {
    const offer: Record<string, unknown> = { "@type": "Offer" };
    if (price) offer.price = price;
    if (currency) offer.priceCurrency = currency;
    if (offerUrl) offer.url = offerUrl;
    if (availability) offer.availability = availability;
    event.offers = offer;
  }

  return jsonLdScript(event);
}

/** Item types this generator will nest a review in. LocalBusiness and Organization are omitted. */
export const REVIEW_ITEM_TYPES = ["Product", "SoftwareApplication"] as const;

export type ReviewItemType = (typeof REVIEW_ITEM_TYPES)[number];

export type ReviewEntryInput = {
  authorName: string;
  authorKind: string;
  name: string;
  reviewBody: string;
  ratingValue: string;
  datePublished: string;
};

export type ReviewSchemaInput = {
  itemType: string;
  name: string;
  description: string;
  url: string;
  ratingValue: string;
  reviewCount: string;
  ratingCount: string;
  bestRating: string;
  worstRating: string;
  reviews: ReviewEntryInput[];
};

/** A number that is zero or greater, or empty. A worst rating may be 0. */
export function ratingFloor(raw: string): string {
  const value = raw.trim();
  if (!/^\d+(\.\d+)?$/.test(value)) return "";
  return value;
}

type RatingScale = {
  best: string;
  worst: string;
  ceiling: number;
  floor: number;
};

/** Blank best means 5. Blank worst means 1. An unreadable bound, or a floor that is not below the ceiling, is no scale. */
function ratingScale(bestRaw: string, worstRaw: string): RatingScale | null {
  const bestProvided = bestRaw.trim();
  const worstProvided = worstRaw.trim();
  const best = bestProvided ? ratingFloor(bestRaw) : "";
  const worst = worstProvided ? ratingFloor(worstRaw) : "";
  if (bestProvided && !best) return null;
  if (worstProvided && !worst) return null;
  const ceiling = best ? Number(best) : 5;
  const floor = worst ? Number(worst) : 1;
  if (!(floor < ceiling)) return null;
  return { best, worst, ceiling, floor };
}

export function reviewScaleOk(bestRaw: string, worstRaw: string): boolean {
  return ratingScale(bestRaw, worstRaw) !== null;
}

/** A rating on the scale, or empty. The digits you typed are kept. */
export function ratingOnScale(raw: string, bestRaw: string, worstRaw: string): string {
  const rating = ratingDecimal(raw);
  const scale = ratingScale(bestRaw, worstRaw);
  if (!rating || !scale) return "";
  const value = Number(rating);
  if (value < scale.floor || value > scale.ceiling) return "";
  return rating;
}

function writeRatingBounds(node: Record<string, unknown>, scale: RatingScale) {
  if (scale.best) node.bestRating = scale.best;
  if (scale.worst) node.worstRating = scale.worst;
}

function buildReviewEntry(
  entry: ReviewEntryInput,
  bestRaw: string,
  worstRaw: string,
): Record<string, unknown> | null {
  const scale = ratingScale(bestRaw, worstRaw);
  if (!scale) return null;
  const authorName = plainLine(entry.authorName);
  if (!authorName || authorName.length >= 100) return null;
  const reviewBody = plainLine(entry.reviewBody);
  if (!reviewBody) return null;
  const ratingValue = ratingOnScale(entry.ratingValue, bestRaw, worstRaw);
  if (!ratingValue) return null;
  const dateRaw = entry.datePublished.trim();
  if (dateRaw && !isoDay(entry.datePublished)) return null;

  const reviewRating: Record<string, unknown> = {
    "@type": "Rating",
    ratingValue,
  };
  writeRatingBounds(reviewRating, scale);

  const review: Record<string, unknown> = {
    "@type": "Review",
    author: {
      "@type": entry.authorKind === "Organization" ? "Organization" : "Person",
      name: authorName,
    },
    reviewBody,
    reviewRating,
  };
  const name = plainLine(entry.name);
  if (name) review.name = name;
  const datePublished = isoDay(entry.datePublished);
  if (datePublished) review.datePublished = datePublished;
  return review;
}

export function reviewEntryComplete(entry: ReviewEntryInput, bestRaw: string, worstRaw: string): boolean {
  return Boolean(buildReviewEntry(entry, bestRaw, worstRaw));
}

function buildAggregateRating(input: ReviewSchemaInput): Record<string, unknown> | null {
  const scale = ratingScale(input.bestRating, input.worstRating);
  if (!scale) return null;
  const ratingValue = ratingOnScale(input.ratingValue, input.bestRating, input.worstRating);
  const reviewCount = reviewCountValue(input.reviewCount);
  const ratingCount = reviewCountValue(input.ratingCount);
  if (!ratingValue || (!reviewCount && !ratingCount)) return null;
  const aggregate: Record<string, unknown> = {
    "@type": "AggregateRating",
    ratingValue,
  };
  if (reviewCount) aggregate.reviewCount = reviewCount;
  if (ratingCount) aggregate.ratingCount = ratingCount;
  writeRatingBounds(aggregate, scale);
  return aggregate;
}

export function buildReviewSchema(input: ReviewSchemaInput): string {
  const name = plainLine(input.name);
  if (!name) return "";
  const itemType = REVIEW_ITEM_TYPES.find((item) => item === input.itemType);
  if (!itemType) return "";

  const reviews = input.reviews
    .map((entry) => buildReviewEntry(entry, input.bestRating, input.worstRating))
    .filter((entry): entry is Record<string, unknown> => Boolean(entry));
  const aggregateRating = buildAggregateRating(input);
  if (reviews.length === 0 && !aggregateRating) return "";
  if (reviews.length >= 2 && !aggregateRating) return "";

  const item: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": itemType,
    name,
  };
  const description = plainLine(input.description);
  if (description) item.description = description;
  const url = httpUrl(input.url);
  if (url) item.url = url;
  if (aggregateRating) item.aggregateRating = aggregateRating;
  if (reviews.length === 1) item.review = reviews[0];
  else if (reviews.length > 1) item.review = reviews;

  return jsonLdScript(item);
}

export type ServiceInput = {
  name: string;
  serviceType: string;
  description: string;
  providerName: string;
  providerUrl: string;
  areaServed: string;
  price: string;
  currency: string;
  url: string;
};

/**
 * Service JSON-LD. Empty until the service name is present.
 * An offer is written only when both a price (0 is free) and a currency are valid.
 * A provider URL without a name is omitted.
 */
export function buildServiceSchema(input: ServiceInput): string {
  const name = plainLine(input.name);
  if (!name) return "";

  const service: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
  };

  const serviceType = plainLine(input.serviceType);
  if (serviceType) service.serviceType = serviceType;

  const description = plainLine(input.description);
  if (description) service.description = description;

  const url = httpUrl(input.url);
  if (url) service.url = url;

  const provider = organizationNode("Organization", input.providerName, input.providerUrl);
  if (provider) service.provider = provider;

  const areaServed = plainLine(input.areaServed);
  if (areaServed) service.areaServed = areaServed;

  const price = nonNegativePrice(input.price);
  const currency = isoCurrency(input.currency);
  if (price && currency) {
    service.offers = {
      "@type": "Offer",
      price,
      priceCurrency: currency,
    };
  }

  return jsonLdScript(service);
}

export type CourseInput = {
  name: string;
  description: string;
  providerName: string;
  providerUrl: string;
  url: string;
  price: string;
  currency: string;
  courseMode: string;
  startDate: string;
  endDate: string;
  days: string[];
  startTime: string;
  endTime: string;
};

function timeSortKey(value: string): string {
  return value.length === 5 ? `${value}:00` : value;
}

/**
 * courseMode text, or an absolute http(s) URL.
 * A value that starts with a scheme is a URL and is omitted when it is not http(s).
 * schema.org examples use online, onsite, and blended. Other visible labels are kept.
 */
export function courseModeValue(raw: string): string {
  const text = plainLine(raw);
  if (!text) return "";
  if (/^[a-z][a-z0-9+.-]*:/i.test(text)) {
    try {
      const url = new URL(text);
      if (url.protocol !== "http:" && url.protocol !== "https:") return "";
      if (!url.hostname.includes(".") && url.hostname !== "localhost") return "";
      return url.toString();
    } catch {
      return "";
    }
  }
  return text;
}

/** A real end date on or after the start date. An end date with no valid start is kept. */
export function courseEndDate(startRaw: string, endRaw: string): string {
  const end = isoDay(endRaw);
  if (!end) return "";
  const start = isoDay(startRaw);
  if (start && end < start) return "";
  return end;
}

/** A clock time later than the start. An end time with no valid start is kept. */
export function courseEndTime(startRaw: string, endRaw: string): string {
  const end = clockTime(endRaw);
  if (!end) return "";
  const start = clockTime(startRaw);
  if (start && timeSortKey(end) <= timeSortKey(start)) return "";
  return end;
}

function dayOfWeekUrl(day: Weekday): string {
  return `https://schema.org/${day}`;
}

function courseInstance(input: CourseInput): Record<string, unknown> | null {
  const mode = courseModeValue(input.courseMode);
  const startDate = isoDay(input.startDate);
  const endDate = courseEndDate(input.startDate, input.endDate);
  const days = WEEKDAYS.filter((day) => input.days.includes(day));
  const startTime = clockTime(input.startTime);
  const endTime = courseEndTime(input.startTime, input.endTime);
  const hasSchedule = days.length > 0 || Boolean(startTime) || Boolean(endTime);
  if (!mode && !startDate && !endDate && !hasSchedule) return null;

  const instance: Record<string, unknown> = { "@type": "CourseInstance" };
  if (mode) instance.courseMode = mode;
  if (startDate) instance.startDate = startDate;
  if (endDate) instance.endDate = endDate;
  if (hasSchedule) {
    const schedule: Record<string, unknown> = { "@type": "Schedule" };
    if (days.length === 1) schedule.byDay = dayOfWeekUrl(days[0]);
    else if (days.length > 1) schedule.byDay = days.map((day) => dayOfWeekUrl(day));
    if (startTime) schedule.startTime = startTime;
    if (endTime) schedule.endTime = endTime;
    instance.courseSchedule = schedule;
  }
  return instance;
}

/**
 * Course JSON-LD. Empty until the course name is present.
 * An offer is written only when both a price (0 is free) and a currency are valid.
 * A provider URL without a name is omitted. The URL is written as both url and sameAs.
 * hasCourseInstance is written only when courseMode, a date, or a schedule is valid.
 */
export function buildCourseSchema(input: CourseInput): string {
  const name = plainLine(input.name);
  if (!name) return "";

  const course: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
  };

  const description = plainLine(input.description);
  if (description) course.description = description;

  const url = httpUrl(input.url);
  if (url) course.url = url;

  const provider = organizationNode("Organization", input.providerName, input.providerUrl);
  if (provider) {
    if (typeof provider.url === "string") provider.sameAs = provider.url;
    course.provider = provider;
  }

  const price = nonNegativePrice(input.price);
  const currency = isoCurrency(input.currency);
  if (price && currency) {
    course.offers = {
      "@type": "Offer",
      price,
      priceCurrency: currency,
    };
  }

  const instance = courseInstance(input);
  if (instance) course.hasCourseInstance = instance;

  return jsonLdScript(course);
}
