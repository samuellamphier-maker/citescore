/**
 * Illustrative Fix Pack sample for Example Plumbing Co.
 * Names, the street, ratings, and review counts are the ones already
 * published on the example snapshot. They were invented to show the layout.
 * This module does not add a phone number, a postal code, or a figure the
 * example snapshot does not publish.
 */

export const sampleFixPackExampleBanner =
  "Illustrative example content for a fictional plumber, Example Plumbing Co. in Riverton, USA. Not a real client or real results.";

export const sampleLocalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Example Plumbing Co.",
  url: "https://example-plumbing.example",
  address: {
    "@type": "PostalAddress",
    streetAddress: "100 Example Street",
    addressLocality: "Riverton",
    addressCountry: "USA",
  },
} as const;

export const sampleServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Plumber",
  serviceType: "Plumber",
  areaServed: "Riverton, USA",
  provider: {
    "@type": "LocalBusiness",
    name: "Example Plumbing Co.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "100 Example Street",
      addressLocality: "Riverton",
      addressCountry: "USA",
    },
  },
} as const;

export function sampleJsonLdText(data: object) {
  return JSON.stringify(data, null, 2);
}

export const sampleReviewSms =
  "Hi, this is Example Plumbing Co. in Riverton, USA. If the job was what you expected, a Google review helps the next neighbor find a plumber. A real Fix Pack pastes the Google review link. This illustration does not invent one.";

export const sampleReviewEmailSubject = "A Google review for Example Plumbing Co.";

export const sampleReviewEmailBody =
  "Thank you for hiring Example Plumbing Co. in Riverton, USA. If you have a minute, a Google review tells the next person what the job was like. A real Fix Pack pastes the Google review link. This illustration does not invent one.";

export const sampleProfileGaps = [
  {
    check: "Category",
    prospect: "Plumber, as this illustration writes the trade.",
    named: "The example snapshot does not publish a separate Google category for the named businesses.",
  },
  {
    check: "Services",
    prospect: "Shorter service list than Sample Rooter Co., in this illustration.",
    named: "Sample Rooter Co. is written with the longer service list. The example does not name the services.",
  },
  {
    check: "Hours",
    prospect: "Hours in this illustration do not match example-plumbing.example.",
    named: "The example snapshot does not publish hours for the named businesses.",
  },
  {
    check: "Photos",
    prospect: "No photos, in this illustration.",
    named: "The example snapshot does not publish a photo count for the named businesses.",
  },
  {
    check: "Q&A",
    prospect: "The example snapshot does not publish questions on this profile.",
    named: "The example snapshot does not publish questions on the named profiles.",
  },
] as const;

export const sampleReviewRows = [
  {
    business: "Example Plumbing Co.",
    role: "Prospect in this illustration",
    rating: "4.6",
    reviews: "22",
  },
  {
    business: "Sample Rooter Co.",
    role: "Fictional competitor",
    rating: "4.9",
    reviews: "310",
  },
  {
    business: "Fictional Fixture Works",
    role: "Fictional competitor",
    rating: "4.8",
    reviews: "180",
  },
  {
    business: "Demo Drain Co.",
    role: "Fictional competitor",
    rating: "4.7",
    reviews: "95",
  },
] as const;

export const sampleDirectories = [
  {
    name: "Example Trades Directory",
    where: "example-trades.example/riverton",
    cited:
      "The example snapshot writes this directory as cited in both the ChatGPT example and the Perplexity example.",
    status: "Example Plumbing Co. is written as absent. Missing in this illustration.",
  },
  {
    name: "Example City List",
    where: "example.com/riverton-trades",
    cited:
      "The example snapshot writes this directory as cited in the Perplexity example only.",
    status: "Example Plumbing Co. is written as absent. Missing in this illustration.",
  },
] as const;

const sampleRecheckNotRun = "Not run. This is an example layout.";

export const sampleRecheckRows = [
  {
    engine: "ChatGPT, logged out",
    prompt: "best plumber in Riverton, USA",
    first:
      "Sample Rooter Co., Fictional Fixture Works, and Demo Drain Co. Example Plumbing Co. is not named.",
    later: sampleRecheckNotRun,
  },
  {
    engine: "ChatGPT, logged out",
    prompt: "best emergency plumber in Riverton, USA",
    first:
      "Sample Rooter Co., Fictional Fixture Works, and Demo Drain Co. Example Plumbing Co. is not named.",
    later: sampleRecheckNotRun,
  },
  {
    engine: "Perplexity",
    prompt: "best plumber in Riverton, USA",
    first: "Fictional Fixture Works and Sample Rooter Co. Example Plumbing Co. is not named.",
    later: sampleRecheckNotRun,
  },
  {
    engine: "Perplexity",
    prompt: "best emergency plumber in Riverton, USA",
    first: "Fictional Fixture Works and Sample Rooter Co. Example Plumbing Co. is not named.",
    later: sampleRecheckNotRun,
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
