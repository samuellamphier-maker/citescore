export type TopicPage = {
  path: string;
  title: string;
  description: string;
  kicker: string;
  card: string;
  /** Short label in the Related guides list. Falls back to the full title. */
  navLabel?: string;
  priority: number;
  publishedAt: string;
  minutes: number;
};

/** Indexable pages for searches the blog, /geo-audit, and /alternatives do not already own. */
export const topicPages: TopicPage[] = [
  {
    path: "/robots-txt-for-ai-crawlers",
    title:
      "robots.txt for AI crawlers: GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and CCBot",
    description:
      "What GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and CCBot each control, with copy-paste robots.txt groups. A disallow is a policy choice, not a citation.",
    kicker: "Guide",
    card: "Five tokens, the job each one does, and robots.txt you can paste without blocking the wrong crawler.",
    navLabel: "robots.txt for AI crawlers",
    priority: 0.8,
    publishedAt: "2026-10-13",
    minutes: 12,
  },
  {
    path: "/schema-markup-for-ai-search",
    title: "Schema markup for AI search: Organization, Product, FAQ, and Article",
    description:
      "JSON-LD examples for Organization, Product, FAQPage, and Article. The markup has to match the page. No invented ratings. Google stopped showing FAQ rich results on 7 May 2026.",
    kicker: "Guide",
    card: "Copy-paste JSON-LD for Organization, Product, FAQ, and Article, and the fields you should leave out.",
    navLabel: "Schema markup for AI search",
    priority: 0.8,
    publishedAt: "2026-10-13",
    minutes: 11,
  },
  {
    path: "/llms-txt-examples",
    title: "llms.txt examples: 10 real SaaS sites and what they get right",
    description:
      "Ten SaaS llms.txt files fetched on 13 October 2026 — Vercel, Stripe, Cloudflare, Anthropic, and six others — and the specific choice each file gets right.",
    kicker: "Guide",
    card: "Ten live files, fetched 13 October 2026, and the one choice each file makes well.",
    navLabel: "llms.txt examples from 10 SaaS sites",
    priority: 0.8,
    publishedAt: "2026-10-13",
    minutes: 16,
  },
  {
    path: "/geo-vs-seo",
    title: "GEO vs SEO: what changes when AI answers the question",
    description:
      "GEO and SEO answer different questions. What changes when the result is a quoted answer, what stays the same, and what a free check or a $39 audit can see.",
    kicker: "Guide",
    card: "What changes when the result is a quoted answer, and what a rank report still does not say.",
    navLabel: "GEO vs SEO",
    priority: 0.8,
    publishedAt: "2026-10-13",
    minutes: 12,
  },
  {
    path: "/how-to-get-cited-by-perplexity",
    title: "How to get cited by Perplexity",
    description:
      "What Perplexity publishes: allow PerplexityBot and its IP ranges if you want the site in search results. Perplexity-User is a separate, user-triggered fetch.",
    kicker: "Guide",
    card: "PerplexityBot, Perplexity-User, and the firewall rule Perplexity actually publishes.",
    navLabel: "How to get cited by Perplexity",
    priority: 0.9,
    publishedAt: "2026-10-13",
    minutes: 10,
  },
  {
    path: "/how-to-get-cited-by-perplexity-comet",
    title: "How to get cited by Perplexity Comet",
    description:
      "What Perplexity publishes for Comet’s browser assistant: it reads the open page’s visible text, headlines, and metadata. Search citations still use PerplexityBot. No separate Comet token, and no citation rate.",
    kicker: "Guide",
    card: "The open tab’s visible text, and why Comet does not add a second robots.txt token.",
    navLabel: "How to get cited by Perplexity Comet",
    priority: 0.8,
    publishedAt: "2026-10-21",
    minutes: 11,
  },
  {
    path: "/how-to-get-cited-by-claude",
    title: "How to get cited by Claude",
    description:
      "What Anthropic publishes: ClaudeBot, Claude-SearchBot, and Claude-User are separate robots.txt controls. A training opt-out is not a search opt-out.",
    kicker: "Guide",
    card: "The three Anthropic robots, which one indexes pages for search, and what the crawler page does not require.",
    navLabel: "How to get cited by Claude",
    priority: 0.8,
    publishedAt: "2026-10-14",
    minutes: 9,
  },
  {
    path: "/how-to-get-cited-by-gemini",
    title: "How to get cited by Gemini",
    description:
      "Google-Extended controls Gemini Apps grounding and future Gemini training. AI Overviews stay a Google Search feature with a different control.",
    kicker: "Guide",
    card: "The Gemini Apps token, and why it does not add or remove AI Overviews.",
    navLabel: "How to get cited by Gemini",
    priority: 0.8,
    publishedAt: "2026-10-14",
    minutes: 9,
  },
  {
    path: "/how-to-get-cited-by-copilot",
    title: "How to get cited by Microsoft Copilot",
    description:
      "Bing’s guidelines put Copilot on the same crawl and index as Bing search. Bingbot, noindex, noarchive, and nocache are the controls Microsoft publishes.",
    kicker: "Guide",
    card: "Bingbot, and the meta tags Bing says change Copilot answers.",
    navLabel: "How to get cited by Microsoft Copilot",
    priority: 0.8,
    publishedAt: "2026-10-14",
    minutes: 10,
  },
  {
    path: "/how-to-get-cited-by-grok",
    title: "How to get cited by Grok",
    description:
      "What xAI documents for Grok web citations: the Web Search tool, sources encountered versus inline links, and the robots.txt token xAI does not publish.",
    kicker: "Guide",
    card: "Web Search citations, X posts as a separate source, and the crawler token xAI does not publish.",
    navLabel: "How to get cited by Grok",
    priority: 0.8,
    publishedAt: "2026-10-15",
    minutes: 11,
  },
  {
    path: "/how-to-get-cited-by-meta-ai",
    title: "How to get cited by Meta AI",
    description:
      "What Meta publishes for Meta AI: Meta-WebIndexer is the crawler Meta ties to citations. Meta-ExternalAgent is a separate training and indexing crawl. Meta does not publish a citation rate.",
    kicker: "Guide",
    card: "Meta-WebIndexer, Meta-ExternalAgent, and the robots.txt tokens Meta’s crawler page actually lists.",
    navLabel: "How to get cited by Meta AI",
    priority: 0.8,
    publishedAt: "2026-10-18",
    minutes: 11,
  },
  {
    path: "/how-to-get-cited-by-deepseek",
    title: "How to get cited by DeepSeek",
    description:
      "What DeepSeek’s Search and Fetch guide publishes: an in-house search API, a Markdown fetch, authority and snippet fields, and no robots.txt token. A search result is not a chat citation.",
    kicker: "Guide",
    card: "The Search API’s authority tier and snippet, and the crawler token DeepSeek does not publish.",
    navLabel: "How to get cited by DeepSeek",
    priority: 0.8,
    publishedAt: "2026-10-20",
    minutes: 11,
  },
  {
    path: "/how-to-get-cited-by-mistral",
    title: "How to get cited by Mistral",
    description:
      "Le Chat is now Vibe. What Mistral publishes for web search, Open URL, and the robots.txt tokens MistralAI-User, MistralAI-Index, and MistralAI-Training. No citation rate.",
    kicker: "Guide",
    card: "Le Chat is now Vibe. Three robots.txt tokens, source links in web search, and the files Mistral does not require.",
    navLabel: "How to get cited by Mistral",
    priority: 0.8,
    publishedAt: "2026-10-20",
    minutes: 12,
  },
  {
    path: "/how-to-get-cited-by-brave-search",
    title: "How to get cited by Brave Search",
    description:
      "What Brave publishes for AI Answers and Answer with AI: an independent index, source references, and a crawler that does not advertise its own user agent. No citation rate.",
    kicker: "Guide",
    card: "Brave’s independent index, AI Answers with sources, and the crawl rule the crawler page actually states.",
    navLabel: "How to get cited by Brave Search",
    priority: 0.8,
    publishedAt: "2026-10-20",
    minutes: 12,
  },
  {
    path: "/how-to-get-cited-by-you-com",
    title: "How to get cited by You.com",
    description:
      "What You.com publishes for cited answers: its own crawler and index, verbatim excerpts in the Answer API, a freshness filter, and no robots.txt token. No citation rate.",
    kicker: "Guide",
    card: "You.com’s own index, verbatim excerpts, and the crawler token the docs do not name.",
    navLabel: "How to get cited by You.com",
    priority: 0.8,
    publishedAt: "2026-10-20",
    minutes: 11,
  },
  {
    path: "/how-to-get-cited-by-duckduckgo-ai",
    title: "How to get cited by DuckDuckGo",
    description:
      "What DuckDuckGo publishes for Search Assist and Duck.ai: DuckAssistBot for AI-assisted answers that cite one or two sources, DuckDuckBot for search, organic links largely from Bing, and no citation rate.",
    kicker: "Guide",
    card: "Search Assist’s one or two sources, DuckAssistBot, and the Bing links those pages do not assign to the answer.",
    navLabel: "How to get cited by DuckDuckGo",
    priority: 0.8,
    publishedAt: "2026-10-20",
    minutes: 12,
  },
  {
    path: "/geo-for-local-businesses",
    title: "GEO for local businesses",
    description:
      "What Google requires on LocalBusiness markup: name and address, hours and geo when they are true, and why a business should not mark up its own reviews.",
    kicker: "Guide",
    card: "The location page, the Business Profile, and the fields Google lists as required.",
    navLabel: "GEO for local businesses",
    priority: 0.8,
    publishedAt: "2026-10-14",
    minutes: 9,
  },
  {
    path: "/llms-txt-best-practices",
    title: "llms.txt best practices",
    description:
      "The llms.txt v2 section order, the mistakes that break it, and a validation pass the CiteScore fetch does not do. Includes the free generator.",
    kicker: "Guide",
    card: "Common mistakes against the v2 spec, and how to check the file before you upload it.",
    navLabel: "llms.txt best practices",
    priority: 0.8,
    publishedAt: "2026-10-14",
    minutes: 10,
  },
  {
    path: "/ai-search-visibility-for-ecommerce",
    title: "AI search visibility for ecommerce",
    description:
      "Product snippets versus merchant listings: the price, image, and availability fields Google requires on a page where the shopper can buy.",
    kicker: "Guide",
    card: "Product schema for a page someone can buy from, and what an AI shopping answer can repeat.",
    navLabel: "AI search visibility for ecommerce",
    priority: 0.8,
    publishedAt: "2026-10-14",
    minutes: 11,
  },
  {
    path: "/ai-search-visibility-for-b2b-saas",
    title: "AI search visibility for B2B SaaS",
    description:
      "How a B2B SaaS site can be fetched and quoted by ChatGPT, Perplexity, Google AI Overviews, and Claude: comparison pages, docs and pricing in HTML, llms.txt, schema, crawler access, and third-party mentions. No citation rate.",
    kicker: "Guide",
    card: "Comparison pages, public docs, crawler access, and the mentions you do not control.",
    navLabel: "AI search visibility for B2B SaaS",
    priority: 0.8,
    publishedAt: "2026-10-21",
    minutes: 11,
  },
  {
    path: "/google-ai-overviews-optimization",
    title: "Google AI Overviews optimization",
    description:
      "What Google Search Central says about AI Overviews and AI Mode: snippet-eligible pages, the Search Console control, and the tactics Google says to skip.",
    kicker: "Guide",
    card: "Eligibility, the Search Console control, and the tactics Google says to ignore.",
    navLabel: "Google AI Overviews optimization",
    priority: 0.9,
    publishedAt: "2026-10-13",
    minutes: 12,
  },
  {
    path: "/google-ai-mode-optimization",
    title: "Google AI Mode optimization",
    description:
      "How Google AI Mode differs from AI Overviews: subtopic searches, follow-up queries, position, and the same snippet and Search Console controls.",
    kicker: "Guide",
    card: "Subtopic fan-out, follow-ups counted as new queries, and the controls that do not change AI Mode.",
    navLabel: "Google AI Mode optimization",
    priority: 0.8,
    publishedAt: "2026-10-15",
    minutes: 12,
  },
  {
    path: "/ai-search-readiness-checklist-for-saas",
    title: "AI search readiness checklist for SaaS",
    description:
      "A SaaS checklist drawn from OpenAI, Perplexity, and Google Search Central: crawler tokens, snippet eligibility, and a link to the 40-point checklist.",
    kicker: "Guide",
    card: "Cross-engine checks for a SaaS site. The longer on-page list is the 40-point checklist.",
    navLabel: "AI search readiness checklist for SaaS",
    priority: 0.9,
    publishedAt: "2026-10-13",
    minutes: 9,
  },
  {
    path: "/how-to-get-cited-by-ai-answer-engines",
    title: "How to get your site cited by AI answer engines",
    description:
      "Which control OpenAI, Perplexity, and Google publish for ChatGPT search, Perplexity search, and AI Overviews, and which files they do not require.",
    kicker: "Guide",
    card: "The published control for each engine, and the files they do not require.",
    navLabel: "How to get cited by AI answer engines",
    priority: 0.9,
    publishedAt: "2026-10-12",
    minutes: 8,
  },
  {
    path: "/free-check",
    title: "Free AI citation-readiness check",
    description:
      "Free, no-signup check of crawler access and citation-readiness signals: robots.txt, llms.txt, sitemap, JSON-LD, and the homepage. We do not query live ChatGPT or Perplexity.",
    kicker: "Free tool",
    card: "Instant signal check of llms.txt, robots.txt, sitemap, and schema. Not a live ChatGPT query.",
    priority: 1.0,
    publishedAt: "2026-10-09",
    minutes: 4,
  },
  {
    path: "/how-to-check-if-chatgpt-mentions-your-brand",
    title: "How to check if ChatGPT mentions your brand",
    description:
      "A practical way to see whether ChatGPT and other assistants name or link your brand: the same prompts, a log over time, robots.txt, llms.txt, structured data, and pages you do not control.",
    kicker: "Guide",
    card: "The prompts to repeat, the log to keep, and the public files that are not a mention.",
    navLabel: "How to check if ChatGPT mentions your brand",
    priority: 0.8,
    publishedAt: "2026-10-20",
    minutes: 11,
  },
  {
    path: "/how-to-get-cited-by-chatgpt",
    title: "How to get cited by ChatGPT",
    description:
      "What OpenAI documents for ChatGPT search: OAI-SearchBot, GPTBot, and ChatGPT-User are separate controls. Allowing search is a different decision from allowing training.",
    kicker: "Guide",
    card: "The three OpenAI tokens, which one controls ChatGPT search answers, and what OpenAI does not publish.",
    navLabel: "How to get cited by ChatGPT",
    priority: 0.9,
    publishedAt: "2026-10-13",
    minutes: 11,
  },
  {
    path: "/ai-crawler-robots-txt-checker",
    title: "AI crawler robots.txt checker",
    description:
      "Check whether your robots.txt allows or blocks GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot and Google-Extended, with copy-paste rules for each.",
    kicker: "robots.txt",
    card: "Which AI user agents your robots.txt lets in, and the exact lines to change.",
    priority: 0.9,
    publishedAt: "2026-10-09",
    minutes: 6,
  },
  {
    path: "/llms-txt-generator",
    title: "Free llms.txt generator",
    description:
      "Free, no-signup llms.txt generator. Add your site name, a one-line summary and the canonical URLs worth reading, then copy Markdown for /llms.txt. It stays in your browser.",
    kicker: "llms.txt",
    card: "Copy a /llms.txt: site name, one-line summary, and the URLs worth reading.",
    priority: 0.9,
    publishedAt: "2026-10-10",
    minutes: 4,
  },
  {
    path: "/robots-txt-ai-crawler-generator",
    title: "Free robots.txt AI crawler generator",
    description:
      "Free, no-signup robots.txt generator for GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot and Google-Extended. Choose allow or block, then copy the file.",
    kicker: "robots.txt",
    card: "Copy allow or block rules for GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot and Google-Extended.",
    priority: 0.9,
    publishedAt: "2026-10-10",
    minutes: 5,
  },
  {
    path: "/faq-schema-generator",
    title: "Free FAQ schema generator",
    description:
      "Free, no-signup FAQPage JSON-LD generator. Add the questions already visible on the page and copy a script tag. Nothing is uploaded. Not a Google FAQ rich result.",
    kicker: "FAQ schema",
    card: "Copy FAQPage JSON-LD for questions that are already visible on the page.",
    priority: 0.9,
    publishedAt: "2026-10-10",
    minutes: 4,
  },
  {
    path: "/organization-schema-generator",
    title: "Free Organization schema generator",
    description:
      "Free, no-signup Organization JSON-LD generator. Add the name, URL, logo, description, profile URLs, and contact email, and optionally a WebSite block. Copy the script. Nothing is uploaded.",
    kicker: "Organization schema",
    card: "Copy Organization JSON-LD, and an optional WebSite block, from facts already on the page.",
    navLabel: "Organization schema generator",
    priority: 0.9,
    publishedAt: "2026-10-15",
    minutes: 5,
  },
  {
    path: "/product-schema-generator",
    title: "Free Product schema generator",
    description:
      "Free, no-signup Product JSON-LD generator. Add the name, description, image, brand, SKU, price, currency, and availability, plus an optional rating the page already shows. Copy the script. Nothing is uploaded.",
    kicker: "Product schema",
    card: "Copy Product JSON-LD from the name, price, and availability already on the page.",
    navLabel: "Product schema generator",
    priority: 0.9,
    publishedAt: "2026-10-17",
    minutes: 5,
  },
  {
    path: "/article-schema-generator",
    title: "Free Article schema generator",
    description:
      "Free, no-signup Article and BlogPosting JSON-LD generator. Add the headline, description, author, publisher, dates, image, and canonical URL. Copy the script. Nothing is uploaded.",
    kicker: "Article schema",
    card: "Copy Article or BlogPosting JSON-LD from the headline, dates, and byline already on the page.",
    navLabel: "Article schema generator",
    priority: 0.9,
    publishedAt: "2026-10-17",
    minutes: 5,
  },
  {
    path: "/local-business-schema-generator",
    title: "Free LocalBusiness schema generator",
    description:
      "Free, no-signup LocalBusiness JSON-LD generator. Add the name, type, URL, phone, address, hours, and optional geo, profiles, logo, and image. Copy the script. Nothing is uploaded.",
    kicker: "LocalBusiness schema",
    card: "Copy LocalBusiness JSON-LD from the name, address, and hours already on the page.",
    navLabel: "Local business schema generator",
    priority: 0.9,
    publishedAt: "2026-10-17",
    minutes: 6,
  },
  {
    path: "/breadcrumb-schema-generator",
    title: "Free breadcrumb schema generator",
    description:
      "Free, no-signup BreadcrumbList JSON-LD generator. Add each crumb name and URL. Positions are numbered from 1 in order. Copy the script. Nothing is uploaded.",
    kicker: "Breadcrumb schema",
    card: "Copy BreadcrumbList JSON-LD from the names and URLs of the trail already on the page.",
    navLabel: "Breadcrumb schema generator",
    priority: 0.9,
    publishedAt: "2026-10-17",
    minutes: 4,
  },
  {
    path: "/howto-schema-generator",
    title: "Free HowTo schema generator",
    description:
      "Free, no-signup HowTo JSON-LD generator. Add the name, time, cost, supplies, tools, and ordered steps already on the page, then copy a script tag. Nothing is uploaded.",
    kicker: "HowTo schema",
    card: "Copy HowTo JSON-LD from the steps, time, and supplies already on the page.",
    navLabel: "HowTo schema generator",
    priority: 0.9,
    publishedAt: "2026-10-18",
    minutes: 6,
  },
  {
    path: "/software-application-schema-generator",
    title: "Free SoftwareApplication schema generator",
    description:
      "Free, no-signup SoftwareApplication JSON-LD generator. Add the name, operating system, category, price, URL, and an optional rating the page already shows. Copy the script. Nothing is uploaded.",
    kicker: "SoftwareApplication schema",
    card: "Copy SoftwareApplication JSON-LD from the name, price, and operating system already on the page.",
    navLabel: "Software application schema generator",
    priority: 0.9,
    publishedAt: "2026-10-18",
    minutes: 6,
  },
  {
    path: "/person-schema-generator",
    title: "Free Person schema generator",
    description:
      "Free, no-signup Person JSON-LD generator. Add the name, job title, URL, image, profile URLs, employer, school, and topics already on the page. Copy the script. Nothing is uploaded.",
    kicker: "Person schema",
    card: "Copy Person JSON-LD from the byline, job, and profiles already on the page.",
    navLabel: "Person schema generator",
    priority: 0.9,
    publishedAt: "2026-10-18",
    minutes: 5,
  },
  {
    path: "/website-schema-generator",
    title: "Free WebSite schema generator",
    description:
      "Free, no-signup WebSite JSON-LD generator. Add the site name, alternate name, URL, an optional search URL template, and an optional publisher. Copy the script. Nothing is uploaded.",
    kicker: "WebSite schema",
    card: "Copy WebSite JSON-LD from the site name, URL, and search template already on the page.",
    navLabel: "WebSite schema generator",
    priority: 0.9,
    publishedAt: "2026-10-18",
    minutes: 5,
  },
  {
    path: "/video-schema-generator",
    title: "Free Video schema generator",
    description:
      "Free, no-signup VideoObject JSON-LD generator. Add the name, description, thumbnail URL, upload date, ISO 8601 duration, and a content URL or embed URL, plus an optional publisher. Copy the script. Nothing is uploaded.",
    kicker: "Video schema",
    card: "Copy VideoObject JSON-LD from the title, thumbnail, and duration already on the watch page.",
    navLabel: "Video schema generator",
    priority: 0.9,
    publishedAt: "2026-10-20",
    minutes: 6,
  },
  {
    path: "/event-schema-generator",
    title: "Free Event schema generator",
    description:
      "Free, no-signup Event JSON-LD generator. Add the name, start and end, status, attendance mode, place or virtual URL, image, description, organizer, and offer already on the page. Copy the script. Nothing is uploaded.",
    kicker: "Event schema",
    card: "Copy Event JSON-LD from the name, date, place, and price already on the event page.",
    navLabel: "Event schema generator",
    priority: 0.9,
    publishedAt: "2026-10-20",
    minutes: 6,
  },
  {
    path: "/review-schema-generator",
    title: "Free Review schema generator",
    description:
      "Free, no-signup Review and AggregateRating JSON-LD for a Product or SoftwareApplication. Copy the script from ratings and review text already on the page. Nothing is uploaded. Not for self-serving LocalBusiness reviews.",
    kicker: "Review schema",
    card: "Copy Review and AggregateRating JSON-LD from the rating and review text already on the page.",
    navLabel: "Review schema generator",
    priority: 0.9,
    publishedAt: "2026-10-20",
    minutes: 7,
  },
  {
    path: "/service-schema-generator",
    title: "Free Service schema generator",
    description:
      "Free, no-signup Service JSON-LD generator. Add the service name, service type, description, provider, area served, URL, and an optional price already on the page. Copy the script. Nothing is uploaded.",
    kicker: "Service schema",
    card: "Copy Service JSON-LD from the name, provider, area, and price already on the service page.",
    navLabel: "Service schema generator",
    priority: 0.9,
    publishedAt: "2026-10-20",
    minutes: 6,
  },
  {
    path: "/course-schema-generator",
    title: "Free Course schema generator",
    description:
      "Free, no-signup Course JSON-LD generator. Add the course name, description, provider, URL, an optional price, and an optional session with mode and schedule already on the page. Copy the script. Nothing is uploaded.",
    kicker: "Course schema",
    card: "Copy Course JSON-LD from the name, provider, price, and schedule already on the course page.",
    navLabel: "Course schema generator",
    priority: 0.9,
    publishedAt: "2026-10-20",
    minutes: 6,
  },
  {
    path: "/job-posting-schema-generator",
    title: "Free JobPosting schema generator",
    description:
      "Free, no-signup JobPosting JSON-LD generator. Add the title, description, date posted, hiring organization, and an office address or a 100% remote location, plus optional salary and direct apply. Copy the script. Nothing is uploaded.",
    kicker: "JobPosting schema",
    card: "Copy JobPosting JSON-LD from the title, employer, location, and salary already on the job page.",
    navLabel: "Job posting schema generator",
    priority: 0.9,
    publishedAt: "2026-10-20",
    minutes: 7,
  },
  {
    path: "/recipe-schema-generator",
    title: "Free Recipe schema generator",
    description:
      "Free, no-signup Recipe JSON-LD generator. Add the dish name, description, image, author, prep, cook, and total time, yield, ingredients, steps, calories, and an optional rating already on the page. Copy the script. Nothing is uploaded.",
    kicker: "Recipe schema",
    card: "Copy Recipe JSON-LD from the name, image, ingredients, steps, and time already on the recipe page.",
    navLabel: "Recipe schema generator",
    priority: 0.9,
    publishedAt: "2026-10-21",
    minutes: 7,
  },
  {
    path: "/qa-page-schema-generator",
    title: "Free QAPage schema generator",
    description:
      "Free, no-signup QAPage JSON-LD generator. Add one question, an accepted answer, suggested answers, authors, and dates already on the page. Copy the script. Nothing is uploaded. A site-written FAQ uses FAQPage.",
    kicker: "QAPage schema",
    card: "Copy QAPage JSON-LD from the question, the answers, the authors, and the dates already on the page.",
    navLabel: "QAPage schema generator",
    priority: 0.9,
    publishedAt: "2026-10-21",
    minutes: 8,
  },
  {
    path: "/speakable-schema-generator",
    title: "Free Speakable schema generator",
    description:
      "Free, no-signup SpeakableSpecification JSON-LD generator. Add a page name and the CSS selectors or XPath for a short passage already on the page. Copy the WebPage script. Nothing is uploaded.",
    kicker: "Speakable schema",
    card: "Copy WebPage JSON-LD that points speakable at a short passage already on the page.",
    navLabel: "Speakable schema generator",
    priority: 0.9,
    publishedAt: "2026-10-21",
    minutes: 8,
  },
  {
    path: "/ai-search-visibility-for-law-firms",
    title: "AI search visibility for law firms",
    description:
      "How a law firm site can be fetched and quoted by ChatGPT, Perplexity, and Google AI Overviews: LegalService markup, practice-area pages, local signals, robots.txt, and llms.txt. No citation rate.",
    kicker: "Guide",
    card: "Practice-area pages, LegalService markup, local signals, and the crawler files a firm actually controls.",
    navLabel: "AI search visibility for law firms",
    priority: 0.8,
    publishedAt: "2026-10-21",
    minutes: 12,
  },
  {
    path: "/image-object-schema-generator",
    title: "Free ImageObject schema generator",
    description:
      "Free, no-signup ImageObject JSON-LD generator. Add the image URL, name, caption, creator, license, acquire-license page, credit line, and copyright notice already on the page. Copy the script. Nothing is uploaded.",
    kicker: "ImageObject schema",
    card: "Copy ImageObject JSON-LD from the image URL, caption, credit, and license already on the page.",
    navLabel: "ImageObject schema generator",
    priority: 0.9,
    publishedAt: "2026-10-21",
    minutes: 7,
  },
  {
    path: "/ai-search-visibility-for-healthcare",
    title: "AI search visibility for healthcare",
    description:
      "How a clinic, practice, or health-tech site can be fetched and quoted by ChatGPT, Perplexity, and Google AI Overviews: E-E-A-T, MedicalOrganization and Physician markup, reviewed-by credits, local signals, robots.txt, and llms.txt. No medical advice and no citation rate.",
    kicker: "Guide",
    card: "Reviewed-by credits, MedicalOrganization markup, local signals, and the crawler files a clinic or health-tech site controls.",
    navLabel: "AI search visibility for healthcare",
    priority: 0.8,
    publishedAt: "2026-10-21",
    minutes: 12,
  },
  {
    path: "/book-schema-generator",
    title: "Free Book schema generator",
    description:
      "Free, no-signup Book JSON-LD generator. Add the title, author, ISBN, format, page count, publication date, publisher, language, description, cover, page URL, and optional editions already on the page. Copy the script. Nothing is uploaded.",
    kicker: "Book schema",
    card: "Copy Book JSON-LD from the title, author, ISBN, format, and editions already on the page.",
    navLabel: "Book schema generator",
    priority: 0.9,
    publishedAt: "2026-10-21",
    minutes: 8,
  },
  {
    path: "/ai-search-visibility-for-real-estate",
    title: "AI search visibility for real estate",
    description:
      "How a brokerage, agent, or property manager site can be fetched and quoted by ChatGPT, Perplexity, and Google AI Overviews: RealEstateAgent markup, listing pages, local signals, reviews, robots.txt, and llms.txt. No citation rate.",
    kicker: "Guide",
    card: "Office pages, listing URLs, RealEstateAgent markup, and the crawler files a brokerage controls.",
    navLabel: "AI search visibility for real estate",
    priority: 0.8,
    publishedAt: "2026-10-21",
    minutes: 12,
  },
  {
    path: "/podcast-schema-generator",
    title: "Free Podcast schema generator",
    description:
      "Free, no-signup PodcastSeries and PodcastEpisode JSON-LD generator. Add the show or episode name, the page URL, the RSS feed, and the audio file already on the page. Copy the script. Nothing is uploaded.",
    kicker: "Podcast schema",
    card: "Copy PodcastSeries or PodcastEpisode JSON-LD from the name, feed, and audio file already on the page.",
    navLabel: "Podcast schema generator",
    priority: 0.9,
    publishedAt: "2026-10-21",
    minutes: 8,
  },
  {
    path: "/ai-search-visibility-for-restaurants",
    title: "AI search visibility for restaurants",
    description:
      "How a restaurant site can be fetched and quoted by ChatGPT, Perplexity, and Google AI Overviews: Restaurant markup, a menu URL, hours, reviews, robots.txt, and llms.txt. No citation rate.",
    kicker: "Guide",
    card: "Location pages, a menu URL, Restaurant markup, hours, and the crawler files a restaurant controls.",
    navLabel: "AI search visibility for restaurants",
    priority: 0.8,
    publishedAt: "2026-10-21",
    minutes: 12,
  },
  {
    path: "/movie-schema-generator",
    title: "Free Movie schema generator",
    description:
      "Free, no-signup Movie JSON-LD generator. Add the title, description, director, actors, publication date, genre, image, duration, and an optional rating already on the page. Copy the script. Nothing is uploaded.",
    kicker: "Movie schema",
    card: "Copy Movie JSON-LD from the title, director, actors, and duration already on the page.",
    navLabel: "Movie schema generator",
    priority: 0.9,
    publishedAt: "2026-10-22",
    minutes: 8,
  },
  {
    path: "/ai-search-visibility-for-accountants",
    title: "AI search visibility for accountants",
    description:
      "How an accounting, CPA, or bookkeeping firm site can be fetched and quoted by ChatGPT, Perplexity, and Google AI Overviews: AccountingService markup, service pages, local signals, robots.txt, and llms.txt. No citation rate.",
    kicker: "Guide",
    card: "Office pages, service URLs, AccountingService markup, and the crawler files a firm controls.",
    navLabel: "AI search visibility for accountants",
    priority: 0.8,
    publishedAt: "2026-10-22",
    minutes: 12,
  },
  {
    path: "/dataset-schema-generator",
    title: "Free Dataset schema generator",
    description:
      "Free, no-signup Dataset JSON-LD generator. Add the name, description, page URL, license, creator, keywords, temporal coverage, and download URL already on the page. Copy the script. Nothing is uploaded.",
    kicker: "Dataset schema",
    card: "Copy Dataset JSON-LD from the name, license, creator, and download URL already on the page.",
    navLabel: "Dataset schema generator",
    priority: 0.9,
    publishedAt: "2026-10-22",
    minutes: 8,
  },
  {
    path: "/ai-search-visibility-for-dentists",
    title: "AI search visibility for dentists",
    description:
      "How a dental practice site can be fetched and quoted by ChatGPT, Perplexity, and Google AI Overviews: Dentist markup, service pages, Google Business Profile, reviews, robots.txt, and llms.txt. No citation rate.",
    kicker: "Guide",
    card: "Office pages, service URLs, Dentist markup, and the crawler files a practice controls.",
    navLabel: "AI search visibility for dentists",
    priority: 0.8,
    publishedAt: "2026-10-22",
    minutes: 12,
  },
  {
    path: "/aeo-checklist",
    title: "Answer engine optimization (AEO) checklist",
    description:
      "A practical AEO / GEO checklist for small sites: crawler access, answer-first copy, schema, evidence, llms.txt, and how to verify each item for free.",
    kicker: "Checklist",
    card: "Twelve checks for answer engine optimization, each with a free way to verify it.",
    priority: 0.8,
    publishedAt: "2026-10-09",
    minutes: 7,
  },
  {
    path: "/chatgpt-citation-check",
    title: "ChatGPT citation check",
    description:
      "A ChatGPT citation check for one public URL: a 0–100 score and about ten fixes. On-page signals plus an optional LLM review of the HTML — not a live ChatGPT login.",
    kicker: "Citation check",
    card: "What the ChatGPT row in the report means, and the three things it cannot see.",
    priority: 0.9,
    publishedAt: "2026-10-03",
    minutes: 8,
  },
  {
    path: "/ai-overviews",
    title: "Google AI Overviews visibility",
    description:
      "How a $39 audit estimates Google AI Overviews visibility from answer-shaped copy and FAQ markup. Not a live Google Search scrape.",
    kicker: "AI Overviews",
    card: "What the AI Overviews row uses, and what Google-Extended does not control.",
    priority: 0.9,
    publishedAt: "2026-10-03",
    minutes: 8,
  },
  {
    path: "/perplexity-citations",
    title: "Perplexity citations",
    description:
      "Why a Perplexity footnote often goes to a competitor, and what a $39 audit infers from public HTML. We do not log into Perplexity.",
    kicker: "Perplexity",
    card: "How the Perplexity snapshot is inferred, including PerplexityBot in robots.txt.",
    priority: 0.8,
    publishedAt: "2026-10-03",
    minutes: 7,
  },
  {
    path: "/llms-txt",
    title: "llms.txt checker",
    description:
      "What llms.txt is, the exact check CiteScore runs on /llms.txt, and why a missing file does not zero a $39 AI-visibility score.",
    kicker: "llms.txt",
    card: "A non-empty /llms.txt is a crawler-access signal. It is not a citation guarantee.",
    priority: 0.8,
    publishedAt: "2026-10-03",
    minutes: 7,
  },
  {
    path: "/ai-crawlers",
    title: "GPTBot, PerplexityBot, and Google-Extended",
    description:
      "How the audit reads robots.txt for GPTBot, PerplexityBot, and Google-Extended: allow, disallow, or unspecified. What each token does not control.",
    kicker: "Crawlers",
    card: "The three robots.txt tokens the audit records, and the user-agents it ignores.",
    priority: 0.8,
    publishedAt: "2026-10-03",
    minutes: 8,
  },
  {
    path: "/ai-crawler-user-agents",
    title: "AI crawler user agents: GPTBot, ClaudeBot, PerplexityBot, and the rest",
    description:
      "A reference table of AI crawler and assistant user-agent tokens, with operator, purpose, whether public docs say they honor robots.txt, and a copyable robots.txt group. Unconfirmed cells say so.",
    kicker: "Crawlers",
    card: "Operator, purpose, robots.txt behavior, and a copyable group for each documented AI user-agent token.",
    navLabel: "AI crawler user agents",
    priority: 0.9,
    publishedAt: "2026-10-18",
    minutes: 14,
  },
  {
    path: "/answer-engine-optimization",
    title: "Answer engine optimization (AEO)",
    description:
      "Answer engine optimization, GEO, and an AI-visibility audit are overlapping labels. CiteScore is the $39 version: one URL, one PDF, no live prompt tracker.",
    kicker: "AEO",
    card: "AEO, GEO, and LLMO are labels. This page says which label the $39 PDF matches.",
    priority: 0.8,
    publishedAt: "2026-10-03",
    minutes: 7,
  },
  {
    path: "/alternatives/profound",
    title: "CiteScore vs Profound",
    description:
      "CiteScore is a $39 one-off GEO audit of one URL. Profound is an enterprise AI-visibility platform with citation share, seats, and custom pricing.",
    kicker: "Comparison",
    card: "A punch-list PDF versus a Profound-class citation dashboard.",
    priority: 0.8,
    publishedAt: "2026-10-03",
    minutes: 7,
  },
  {
    path: "/alternatives/peec-ai",
    title: "CiteScore vs Peec AI",
    description:
      "CiteScore is a $39 one-time GEO audit of one URL. Peec AI is ongoing AI-search analytics for marketing teams: prompts, visibility, position, and sentiment. Different jobs.",
    kicker: "Comparison",
    card: "A one-time punch-list PDF versus Peec AI’s ongoing AI-search analytics.",
    navLabel: "CiteScore vs Peec AI",
    priority: 0.8,
    publishedAt: "2026-10-15",
    minutes: 7,
  },
];

const guideNavOrder = [
  "/how-to-get-cited-by-chatgpt",
  "/how-to-check-if-chatgpt-mentions-your-brand",
  "/how-to-get-cited-by-perplexity",
  "/how-to-get-cited-by-perplexity-comet",
  "/how-to-get-cited-by-claude",
  "/how-to-get-cited-by-gemini",
  "/how-to-get-cited-by-copilot",
  "/how-to-get-cited-by-grok",
  "/how-to-get-cited-by-meta-ai",
  "/how-to-get-cited-by-deepseek",
  "/how-to-get-cited-by-mistral",
  "/how-to-get-cited-by-brave-search",
  "/how-to-get-cited-by-you-com",
  "/how-to-get-cited-by-duckduckgo-ai",
  "/google-ai-overviews-optimization",
  "/google-ai-mode-optimization",
  "/ai-search-readiness-checklist-for-saas",
  "/ai-search-visibility-for-b2b-saas",
  "/geo-vs-seo",
  "/geo-for-local-businesses",
  "/ai-search-visibility-for-ecommerce",
  "/ai-search-visibility-for-law-firms",
  "/ai-search-visibility-for-healthcare",
  "/ai-search-visibility-for-real-estate",
  "/ai-search-visibility-for-restaurants",
  "/ai-search-visibility-for-accountants",
  "/ai-search-visibility-for-dentists",
  "/how-to-get-cited-by-ai-answer-engines",
  "/robots-txt-for-ai-crawlers",
  "/schema-markup-for-ai-search",
  "/llms-txt-examples",
  "/llms-txt-best-practices",
];

export function getTopic(path: string) {
  const topic = topicPages.find((page) => page.path === path);
  if (!topic) throw new Error(`Unknown topic page: ${path}`);
  return topic;
}

/** Other pages with the Guide kicker, in a stable reading order. */
export function relatedGuidePages(current: string) {
  return topicPages
    .filter((page) => page.kicker === "Guide" && page.path !== current)
    .slice()
    .sort((a, b) => {
      const ai = guideNavOrder.indexOf(a.path);
      const bi = guideNavOrder.indexOf(b.path);
      const aRank = ai === -1 ? guideNavOrder.length : ai;
      const bRank = bi === -1 ? guideNavOrder.length : bi;
      return aRank - bRank;
    });
}
