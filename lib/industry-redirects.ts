/**
 * Guessed trade URLs that 404 today, pointed at the published industry guides.
 * `/geo-for-local-businesses` and `/for-agencies` are real pages and are not
 * in this list. Bare slugs such as `/plumbers` do not match a generator or
 * another app route, so they alias the same guide.
 */
export const industryGuideSlugs = [
  "plumbers",
  "dentists",
  "roofers",
  "hvac",
  "electricians",
  "landscapers",
  "chiropractors",
  "veterinarians",
  "auto-repair",
  "accountants",
  "law-firms",
  "healthcare",
  "real-estate",
  "restaurants",
  "insurance-agents",
  "ecommerce",
  "b2b-saas",
] as const;

export type IndustryGuideRedirect = {
  source: string;
  destination: string;
  permanent: true;
};

export function industryGuideRedirects(): IndustryGuideRedirect[] {
  return industryGuideSlugs.flatMap((slug) => {
    const destination = `/ai-search-visibility-for-${slug}`;
    return [`/geo-for-${slug}`, `/for-${slug}`, `/${slug}`].map((source) => ({
      source,
      destination,
      permanent: true as const,
    }));
  });
}
