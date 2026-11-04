import { fixPackIntroPriceLabel, fixPackListPriceLabel, site } from "@/lib/site";

/**
 * Search-snippet overrides. `pageMeta` applies these to the document title,
 * meta description, and Open Graph / Twitter title and description.
 * On-page headings, deks, and JSON-LD stay on the original copy.
 *
 * Titles are the metadata title before the layout suffix ` · CiteScore`.
 * Descriptions are the meta description, aimed at 120–155 characters.
 */
export type SearchSnippetOverride = {
  title?: string;
  description?: string;
  /** Use this title as the full document title, with no layout suffix. */
  absolute?: boolean;
};

export const searchSnippetOverrides: Record<string, SearchSnippetOverride> = {
  "/guides": {
    description: `Free AI Answer Snapshot and the ${fixPackIntroPriceLabel} Fix Pack, plus CiteScore Team guides on citations, industry pages, robots.txt, schema, and llms.txt.`,
  },
  "/industries": {
    description: `Free AI Answer Snapshot and the ${fixPackIntroPriceLabel} Fix Pack for local businesses. Industry pages cover plumbers, restaurants, real estate, and other trades.`,
  },
  "/tools": {
    description: `Free AI Answer Snapshot and the ${fixPackIntroPriceLabel} Fix Pack, plus free schema generators, an llms.txt generator, and a robots.txt checker on CiteScore.`,
  },
  "/geo-audit": {
    description: `A ${site.priceLabel} GEO audit of one URL: on-page signals, an LLM review of public HTML, a 0-100 score, and about ten fixes in a PDF. Not a live ChatGPT login.`,
  },
  "/alternatives/otterly": {
    title: `CiteScore vs Otterly: ${site.priceLabel} audit`,
    description: `A ${site.priceLabel} one-off GEO audit of one URL. Otterly is a subscription that tracks live prompts on ChatGPT, Google AI Overviews, Perplexity, and Copilot.`,
  },
  "/sample-snapshot": {
    description:
      "Example only: a fictional AI Answer Snapshot for Example Plumbing in Riverton. Prompts, names, and review counts are illustrative. Not a customer result.",
  },
  "/sample-fix-pack": {
    description: `Illustrative ${fixPackIntroPriceLabel} Fix Pack before you pay: profile gaps, a review script, cited directories, placeholder JSON-LD, and a 14-day re-check. Not real results.`,
  },
  "/free-snapshot": {
    description: `Request a free AI Answer Snapshot. Logged-out ChatGPT and Perplexity are asked who they name for that trade and city. The ${fixPackIntroPriceLabel} Fix Pack is optional.`,
  },
  "/checklist": {
    description: `Forty checks for crawlers, schema, copy, evidence, and entities. llms.txt is optional. Start with a free AI Answer Snapshot, or the ${site.priceLabel} audit of one URL.`,
  },
  "/for-agencies": {
    description: `Agencies start a local client with the free AI Answer Snapshot and the ${fixPackIntroPriceLabel} Fix Pack. The check, ${site.priceLabel} audit, $149 white-label PDF, and $29 kit are separate.`,
  },
  "/done-for-you-audit": {
    description:
      "A $99 Done-For-You AI Search Audit: a written walkthrough of one public URL, within 3 business days. No live ChatGPT, Perplexity, or AI Overviews query.",
  },
  "/pricing": {
    description: `The AI Answer Snapshot is free. The Fix Pack is ${fixPackIntroPriceLabel} introductory (${fixPackListPriceLabel} list) for one business, one city, and one service, emailed in a few business days.`,
  },
  "/how-it-works": {
    description: `Request a free AI Answer Snapshot. CiteScore asks logged-out ChatGPT and Perplexity who they name, then emails a snapshot. The ${fixPackIntroPriceLabel} Fix Pack is optional.`,
  },
  "/methodology": {
    description: `Free AI Answer Snapshot: logged-out ChatGPT and Perplexity get a prompt such as best {service} in {city}, plus one variant. The ${fixPackIntroPriceLabel} Fix Pack is optional.`,
  },
  "/faq": {
    description: `Answers about the free AI Answer Snapshot and the ${fixPackIntroPriceLabel} Fix Pack: what the snapshot checks, how to request it, what the pack includes, delivery, and refunds.`,
  },
  "/fix-pack": {
    description: `The ${fixPackIntroPriceLabel} AI Visibility Fix Pack (${fixPackListPriceLabel} list): Google Business Profile gaps, a review plan, cited directories, LocalBusiness JSON-LD, and a 14-day re-check.`,
  },
  "/blog/what-is-geo": {
    description:
      `Generative engine optimization, in plain language: how it differs from classic SEO, what answer engines cite, and what a ${site.priceLabel} audit can and cannot tell you.`,
  },
  "/blog/chatgpt-citation-checklist": {
    description:
      "Twelve on-page checks that make a SaaS homepage easier for ChatGPT, Perplexity, and Google AI Overviews to quote. Nobody logs into ChatGPT for you.",
  },
  "/blog/citescore-vs-enterprise-geo-tools": {
    description:
      `A ${site.priceLabel} one-off GEO audit compared with Otterly- and Profound-class platforms: live prompt tracking, seats, and monthly dashboards versus a punch-list PDF.`,
  },
  "/robots-txt-for-ai-crawlers": {
    title: "robots.txt for GPTBot, ClaudeBot, PerplexityBot",
    description:
      "What GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and CCBot each control, with copy-paste robots.txt groups. A disallow is a policy, not a citation.",
  },
  "/schema-markup-for-ai-search": {
    title: "Schema markup for AI search",
    description:
      "JSON-LD for Organization, Product, FAQPage, and Article. Markup has to match the page. No invented ratings. FAQ rich results ended on 7 May 2026.",
  },
  "/llms-txt-examples": {
    title: "llms.txt examples from 10 SaaS sites",
  },
  "/geo-vs-seo": {
    title: "GEO vs SEO: what changes when AI answers",
  },
  "/free-check": {
    description:
      "Free, no-signup check of robots.txt, sitemap, and JSON-LD. llms.txt is optional; Google says it ignores it. No live ChatGPT or Perplexity query.",
  },
  "/how-to-get-cited-by-chatgpt": {
    description:
      "Free AI Answer Snapshot. OAI-SearchBot, GPTBot, and ChatGPT-User are separate OpenAI controls. Allowing search is not the same as allowing training.",
  },
  "/llms-txt-generator": {
    description:
      "Free, no-signup llms.txt generator. Add a site name, a summary, and the URLs worth reading, then copy Markdown for /llms.txt. It stays in your browser.",
  },
  "/robots-txt-ai-crawler-generator": {
    description:
      "Free, no-signup robots.txt generator for GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, and Google-Extended. Choose allow or block.",
  },
  "/faq-schema-generator": {
    description:
      "Free, no-signup FAQPage JSON-LD generator. Add questions already visible on the page and copy a script. Nothing is uploaded. Not a Google FAQ rich result.",
  },
  "/organization-schema-generator": {
    description:
      "Free, no-signup Organization JSON-LD generator. Add the name, URL, and logo already on the page, plus an optional WebSite block. Nothing is uploaded.",
  },
  "/product-schema-generator": {
    description:
      "Free, no-signup Product JSON-LD generator. Add the name, image, brand, price, and availability already on the page. Nothing is uploaded.",
  },
  "/article-schema-generator": {
    description:
      "Free, no-signup Article and BlogPosting JSON-LD generator. Add the headline, author, dates, image, and canonical URL from the page. Nothing is uploaded.",
  },
  "/local-business-schema-generator": {
    description:
      "Free, no-signup LocalBusiness JSON-LD generator. Add the name, phone, address, and hours already on the page. Nothing is uploaded.",
  },
  "/howto-schema-generator": {
    description:
      "Free, no-signup HowTo JSON-LD generator. Add the name, time, supplies, tools, and ordered steps already on the page. Nothing is uploaded.",
  },
  "/software-application-schema-generator": {
    description:
      "Free, no-signup SoftwareApplication JSON-LD generator. Add the name, operating system, category, price, and URL. Nothing is uploaded.",
  },
  "/person-schema-generator": {
    description:
      "Free, no-signup Person JSON-LD generator. Add the name, job title, URL, image, and profiles already on the page. Copy the script. Nothing is uploaded.",
  },
  "/aeo-checklist": {
    description:
      "An AEO and GEO checklist: crawler access, answer-first copy, schema, and evidence, with a free way to verify each item. Free AI Answer Snapshot to start.",
  },
  "/chatgpt-citation-check": {
    description:
      "A ChatGPT citation check for one public URL: a 0-100 score and about ten fixes from on-page signals and an optional HTML review. Not a live ChatGPT login.",
  },
  "/ai-crawler-user-agents": {
    title: "AI crawler user-agent tokens",
    description:
      "Table of AI crawler user-agent tokens: operator, purpose, whether docs say they honor robots.txt, and a copyable group. Unconfirmed cells say so.",
  },
  "/alternatives/peec-ai": {
    description: `CiteScore is a ${site.priceLabel} one-time GEO audit of one URL. Peec AI is ongoing AI-search analytics: prompts, visibility, position, and sentiment. Different jobs.`,
  },
  "/how-to-get-cited-by-meta-ai": {
    description:
      "Free AI Answer Snapshot. Meta ties citations to Meta-WebIndexer. Meta-ExternalAgent is a separate training crawl. Meta does not publish a citation rate.",
  },
  "/how-to-get-cited-by-deepseek": {
    description:
      "Free AI Answer Snapshot. DeepSeek publishes an in-house search API, a Markdown fetch, and no robots.txt token. A search result is not a chat citation.",
  },
  "/how-to-get-cited-by-mistral": {
    description:
      "Free AI Answer Snapshot. Le Chat is now Vibe. Mistral publishes web search, Open URL, and tokens MistralAI-User, MistralAI-Index, and MistralAI-Training.",
  },
  "/how-to-get-cited-by-brave-search": {
    description:
      "Free AI Answer Snapshot. Brave AI Answers cite an independent index. The crawler does not advertise its own user agent. No citation rate.",
  },
  "/how-to-get-cited-by-you-com": {
    description:
      "Free AI Answer Snapshot. You.com publishes its own index, excerpts in the Answer API, a freshness filter, and no robots.txt token. No citation rate.",
  },
  "/how-to-get-cited-by-duckduckgo-ai": {
    description:
      "Free AI Answer Snapshot. DuckDuckGo Search Assist uses DuckAssistBot for answers citing one or two sources. DuckDuckBot is for search. No citation rate.",
  },
  "/how-to-get-cited-by-perplexity-comet": {
    description:
      "Free AI Answer Snapshot. Perplexity Comet reads visible text, headlines, and metadata. Search citations still use PerplexityBot. No separate Comet token.",
  },
  "/how-to-check-if-chatgpt-mentions-your-brand": {
    description:
      "Free AI Answer Snapshot. Repeat the same prompts and log whether ChatGPT names your brand. robots.txt and schema are not a mention. llms.txt is optional.",
  },
  "/website-schema-generator": {
    description:
      "Free, no-signup WebSite JSON-LD generator. Add the site name, URL, an optional search URL template, and an optional publisher. Nothing is uploaded.",
  },
  "/video-schema-generator": {
    description:
      "Free, no-signup VideoObject JSON-LD generator. Add the name, thumbnail, upload date, ISO 8601 duration, and a content or embed URL. Nothing is uploaded.",
  },
  "/event-schema-generator": {
    description:
      "Free, no-signup Event JSON-LD generator. Add the name, start, end, status, attendance mode, place or virtual URL, and offer. Nothing is uploaded.",
  },
  "/review-schema-generator": {
    description:
      "Free, no-signup Review JSON-LD for a Product or app, from ratings already on the page. Nothing is uploaded. Not for self-serving LocalBusiness reviews.",
  },
  "/service-schema-generator": {
    description:
      "Free, no-signup Service JSON-LD generator. Add the service name, provider, area served, and an optional price already on the page. Nothing is uploaded.",
  },
  "/course-schema-generator": {
    description:
      "Free, no-signup Course JSON-LD generator. Add the course name, provider, URL, and an optional session with mode and schedule. Nothing is uploaded.",
  },
  "/job-posting-schema-generator": {
    description:
      "Free, no-signup JobPosting JSON-LD generator. Add the title, employer, and an office or a 100% remote location, plus optional salary. Nothing is uploaded.",
  },
  "/recipe-schema-generator": {
    description:
      "Free, no-signup Recipe JSON-LD generator. Add the dish name, image, times, ingredients, and steps already on the page. Nothing is uploaded.",
  },
  "/qa-page-schema-generator": {
    description:
      "Free, no-signup QAPage JSON-LD generator. Add one question, answers, authors, and dates already on the page. Nothing is uploaded. A site FAQ uses FAQPage.",
  },
  "/speakable-schema-generator": {
    description:
      "Free, no-signup Speakable JSON-LD generator. Add a page name and the CSS selectors or XPath for a short passage already on the page. Nothing is uploaded.",
  },
  "/ai-search-visibility-for-b2b-saas": {
    description:
      "Free AI Answer Snapshot for B2B SaaS. Comparison pages, public docs, schema, and crawler access for ChatGPT, Perplexity, and Claude. No citation rate.",
  },
  "/ai-search-visibility-for-law-firms": {
    description:
      "Free AI Answer Snapshot for law firms. LegalService markup, practice-area pages, local signals, and robots.txt. No citation rate.",
  },
  "/image-object-schema-generator": {
    description:
      "Free, no-signup ImageObject JSON-LD generator. Add the image URL, caption, creator, license, and copyright notice already on the page. Nothing is uploaded.",
  },
  "/ai-search-visibility-for-healthcare": {
    description:
      "Free AI Answer Snapshot for clinics. MedicalOrganization and Physician markup, reviewed-by credits, and robots.txt. No medical advice and no citation rate.",
  },
  "/book-schema-generator": {
    description:
      "Free, no-signup Book JSON-LD generator. Add the title, author, ISBN, format, publisher, and optional editions already on the page. Nothing is uploaded.",
  },
  "/ai-search-visibility-for-real-estate": {
    description:
      "Free AI Answer Snapshot for real estate. RealEstateAgent markup, listing pages, reviews, and robots.txt. No citation rate.",
  },
  "/podcast-schema-generator": {
    description:
      "Free, no-signup PodcastSeries and PodcastEpisode JSON-LD generator. Add the name, RSS feed, and audio file already on the page. Nothing is uploaded.",
  },
  "/ai-search-visibility-for-restaurants": {
    description:
      "Free AI Answer Snapshot for restaurants. Restaurant markup, a menu URL, hours, reviews, and robots.txt for ChatGPT and Perplexity. No citation rate.",
  },
  "/movie-schema-generator": {
    description:
      "Free, no-signup Movie JSON-LD generator. Add the title, director, actors, image, duration, and an optional rating already on the page. Nothing is uploaded.",
  },
  "/ai-search-visibility-for-accountants": {
    description:
      "Free AI Answer Snapshot for accountants. AccountingService markup, service pages, local signals, and robots.txt. No citation rate.",
  },
  "/dataset-schema-generator": {
    description:
      "Free, no-signup Dataset JSON-LD generator. Add the name, URL, license, creator, and download URL already on the page. Nothing is uploaded.",
  },
  "/ai-search-visibility-for-dentists": {
    description:
      "Free AI Answer Snapshot for dentists. Dentist markup, service pages, the Google Business Profile, reviews, and robots.txt. No citation rate.",
  },
  "/vehicle-schema-generator": {
    description:
      "Free, no-signup Vehicle and Car JSON-LD generator. Add the name, brand, model, VIN, odometer, and price already on the page. Nothing is uploaded.",
  },
  "/ai-search-visibility-for-plumbers": {
    description:
      "Free AI Answer Snapshot for plumbers. Plumber markup, service-area pages, reviews, NAP consistency, FAQ content, and robots.txt. No citation rate.",
  },
  "/hotel-schema-generator": {
    description:
      "Free, no-signup Hotel JSON-LD generator. Add the name, address, star rating, check-in, check-out, and amenities already on the page. Nothing is uploaded.",
  },
  "/ai-search-visibility-for-hvac": {
    description:
      "Free AI Answer Snapshot for HVAC. HVACBusiness markup, service-area pages, reviews, and FAQs for ChatGPT, Perplexity, and Gemini. No citation rate.",
  },
  "/restaurant-schema-generator": {
    description:
      "Free, no-signup Restaurant JSON-LD generator. Add the name, cuisine, hours, menu URL, and acceptsReservations already on the page. Nothing is uploaded.",
  },
  "/ai-search-visibility-for-roofers": {
    description:
      "Free AI Answer Snapshot for roofers. RoofingContractor markup, service-area pages, reviews, FAQs, and robots.txt. No citation rate.",
  },
  "/medical-clinic-schema-generator": {
    description:
      "Free, no-signup MedicalClinic JSON-LD generator. Add the name, hours, medical specialty, and available service already on the page. Nothing is uploaded.",
  },
  "/ai-search-visibility-for-electricians": {
    description:
      "Free AI Answer Snapshot for electricians. Electrician markup, service-area pages, reviews, FAQs, and robots.txt. No citation rate.",
  },
  "/attorney-schema-generator": {
    description:
      "Free, no-signup LegalService JSON-LD generator. Add the name, hours, area served, and practice topics already on the page. Nothing is uploaded.",
  },
  "/ai-search-visibility-for-landscapers": {
    description:
      "Free AI Answer Snapshot for landscapers. HomeAndConstructionBusiness markup, service-area pages, reviews, FAQs, and robots.txt. No citation rate.",
  },
  "/dentist-schema-generator": {
    description:
      "Free, no-signup Dentist JSON-LD generator. Add the name, address, hours, specialty, and whether the office is accepting new patients. Nothing is uploaded.",
  },
  "/ai-search-visibility-for-auto-repair": {
    description:
      "Free AI Answer Snapshot for auto repair. AutoRepair markup, service-area pages, reviews, FAQs, and robots.txt. No citation rate.",
  },
  "/real-estate-agent-schema-generator": {
    description:
      "Free, no-signup RealEstateAgent JSON-LD generator. Add the name, address, hours, area served, and topics already on the page. Nothing is uploaded.",
  },
  "/ai-search-visibility-for-chiropractors": {
    description:
      "Free AI Answer Snapshot for chiropractors. MedicalClinic markup, service pages, the Google Business Profile, reviews, and robots.txt. No citation rate.",
  },
  "/plumber-schema-generator": {
    description:
      "Free, no-signup Plumber JSON-LD generator. Add the name, phone, address, hours, service area, and services already on the page. Nothing is uploaded.",
  },
  "/ai-search-visibility-for-insurance-agents": {
    description:
      "Free AI Answer Snapshot for insurance agents. InsuranceAgency markup, service pages, reviews, FAQs, and robots.txt. No citation rate.",
  },
  "/electrician-schema-generator": {
    description:
      "Free, no-signup Electrician JSON-LD generator. Add the name, hours, service area, services, and license number already on the page. Nothing is uploaded.",
  },
  "/ai-search-visibility-for-veterinarians": {
    description:
      "Free AI Answer Snapshot for veterinarians. VeterinaryCare markup, service pages, reviews, FAQs, robots.txt, and llms.txt. No citation rate.",
  },
};

export function applySearchSnippet(path: string, title: string, description: string) {
  const override = searchSnippetOverrides[path];
  const nextTitle = override?.title ?? title;
  const nextDescription = override?.description ?? description;
  const absolute = override?.absolute === true;
  const renderedTitle = absolute ? nextTitle : `${nextTitle} · ${site.name}`;
  return {
    title: nextTitle,
    description: nextDescription,
    absolute,
    renderedTitle,
  };
}
