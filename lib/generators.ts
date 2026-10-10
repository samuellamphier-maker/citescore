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
