/**
 * Illustrative Fix Pack sample for Example Plumbing Co.
 * Bracketed strings are placeholders. This module has no ratings,
 * review counts, prices, or other digits.
 */

export const sampleFixPackExampleBanner =
  "Illustrative example content for a fictional plumber, Example Plumbing Co. in Riverton, USA. Not a real client or real results.";

export const sampleLocalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "[business name]",
  url: "[public site URL]",
  telephone: "[phone on the page]",
  address: {
    "@type": "PostalAddress",
    streetAddress: "[street on the page]",
    addressLocality: "[city]",
    addressRegion: "[region]",
    postalCode: "[postal code]",
  },
} as const;

export const sampleServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "[service name]",
  serviceType: "[service]",
  areaServed: "[city]",
  provider: {
    "@type": "LocalBusiness",
    name: "[business name]",
    telephone: "[phone on the page]",
    address: {
      "@type": "PostalAddress",
      streetAddress: "[street on the page]",
      addressLocality: "[city]",
      addressRegion: "[region]",
      postalCode: "[postal code]",
    },
  },
} as const;

export function sampleJsonLdText(data: object) {
  return JSON.stringify(data, null, 2);
}

export const sampleReviewSms =
  "Hi, this is [business name] in [city]. If the job was what you expected, a Google review helps the next neighbor find a plumber. The link is [Google review link].";

export const sampleReviewEmailSubject = "A Google review for [business name]";

export const sampleReviewEmailBody =
  "Thank you for hiring [business name] in [city]. If you have a minute, a Google review tells the next person what the job was like. The link is [Google review link].";

export const sampleProfileGaps = [
  {
    check: "Category",
    prospect: "[category on the profile]",
    named: "[category the named businesses use]",
  },
  {
    check: "Services",
    prospect: "[services listed]",
    named: "[services the named businesses list]",
  },
  {
    check: "Hours",
    prospect: "[hours on the profile]",
    named: "[hours on their profiles]",
  },
  {
    check: "Photos",
    prospect: "[their photo count]",
    named: "[competitor photo count]",
  },
  {
    check: "Q&A",
    prospect: "[questions on the profile]",
    named: "[questions on the named profiles]",
  },
] as const;

export const sampleReviewRows = [
  {
    business: "Example Plumbing Co.",
    role: "Prospect in this illustration",
    rating: "[their rating]",
    reviews: "[their review count]",
  },
  {
    business: "Sample Rooter Co.",
    role: "Fictional competitor",
    rating: "[competitor rating]",
    reviews: "[competitor review count]",
  },
  {
    business: "Fictional Fixture Works",
    role: "Fictional competitor",
    rating: "[competitor rating]",
    reviews: "[competitor review count]",
  },
  {
    business: "Demo Drain Co.",
    role: "Fictional competitor",
    rating: "[competitor rating]",
    reviews: "[competitor review count]",
  },
] as const;

export const sampleDirectories = [
  {
    name: "Example Trades Directory",
    where: "example-trades.example/riverton",
    cited:
      "The example snapshot writes this directory as cited in both the ChatGPT example and the Perplexity example.",
    status: "Missing in this illustration.",
  },
  {
    name: "Example City List",
    where: "example.com/riverton-trades",
    cited:
      "The example snapshot writes this directory as cited in the Perplexity example only.",
    status: "Missing in this illustration.",
  },
] as const;

export const sampleRecheckRows = [
  {
    engine: "ChatGPT, logged out",
    prompt: "best plumber in Riverton, USA",
    first: "[who was named]",
    later: "[who is named the second time]",
  },
  {
    engine: "ChatGPT, logged out",
    prompt: "best emergency plumber in Riverton, USA",
    first: "[who was named]",
    later: "[who is named the second time]",
  },
  {
    engine: "Perplexity",
    prompt: "best plumber in Riverton, USA",
    first: "[who was named]",
    later: "[who is named the second time]",
  },
  {
    engine: "Perplexity",
    prompt: "best emergency plumber in Riverton, USA",
    first: "[who was named]",
    later: "[who is named the second time]",
  },
] as const;

/** Same install steps already published on the Fix Pack page. */
export const sampleJsonLdInstallSteps = [
  {
    platform: "WordPress",
    body: "Add the script to the site header through the theme header setting or a header-scripts plugin. Do not drop it into a visible paragraph.",
  },
  {
    platform: "Wix",
    body: "Settings, Custom Code, Add Custom Code, place it in the Head, and apply it to all pages that describe the business.",
  },
  {
    platform: "Squarespace",
    body: "Settings, Advanced, Code Injection, Header. On sites that show Developer Tools, use Code Injection there.",
  },
  {
    platform: "Shopify",
    body: "Online Store, Themes, Edit code, then paste the script before the closing head tag in theme.liquid.",
  },
] as const;
