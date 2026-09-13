import * as cheerio from "cheerio";
import type { CrawlResult, FaqItem, PageExtract } from "@/lib/crawl/types";
import { robotsSignals } from "@/lib/crawl/robots";
import { assertSafePublicUrl } from "@/lib/crawl/ssrf";
import { nowIso } from "@/lib/jobs/types";

const FETCH_MS = 10_000;
const MAX_BYTES = 1_500_000;
const MAX_PAGES = 6;
const USER_AGENT =
  "CiteScoreBot/1.0 (+https://citescore.app; GEO audit crawler; respects robots where reasonable)";

const PRIORITY_PATHS = [
  "/llms.txt",
  "/about",
  "/pricing",
  "/faq",
  "/docs",
  "/blog",
  "/ai",
  "/product",
  "/features",
  "/compare",
  "/changelog",
  "/research",
  "/method",
];

async function readLimited(response: Response) {
  const declared = Number(response.headers.get("content-length") || "0");
  if (declared > MAX_BYTES) {
    throw new Error("Response exceeded size limit.");
  }
  const text = await response.text();
  return text.length > MAX_BYTES ? text.slice(0, MAX_BYTES) : text;
}

async function fetchPublic(url: string, accept: string) {
  const safe = await assertSafePublicUrl(url);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_MS);
  try {
    const response = await fetch(safe.toString(), {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        Accept: accept,
        "User-Agent": USER_AGENT,
      },
    });
    return response;
  } finally {
    clearTimeout(timer);
  }
}

function unique(values: string[]) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function extractNumbers(text: string) {
  const matches = text.match(/\b\d{1,3}(?:,\d{3})+(?:\.\d+)?%?|\b\d+(?:\.\d+)?%\b|\b\d{4}\b/g);
  return unique(matches ?? []).slice(0, 20);
}

function extractDates(text: string) {
  const matches = text.match(
    /\b(?:19|20)\d{2}[-/]\d{1,2}[-/]\d{1,2}\b|\b(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+\d{1,2},?\s+(?:19|20)\d{2}\b|\b(?:updated|published|last\s+modified|lastmod)\b/gi,
  );
  return unique(matches ?? []).slice(0, 16);
}

function schemaTypesFromJson(raw: string): string[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    const types: string[] = [];
    const walk = (node: unknown) => {
      if (!node) return;
      if (Array.isArray(node)) {
        node.forEach(walk);
        return;
      }
      if (typeof node !== "object") return;
      const record = node as Record<string, unknown>;
      const type = record["@type"];
      if (typeof type === "string") types.push(type);
      if (Array.isArray(type)) {
        for (const item of type) if (typeof item === "string") types.push(item);
      }
      if (record["@graph"]) walk(record["@graph"]);
      for (const value of Object.values(record)) {
        if (value && typeof value === "object") walk(value);
      }
    };
    walk(parsed);
    return unique(types);
  } catch {
    return [];
  }
}

function faqFromSchema(raw: string): FaqItem[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    const items: FaqItem[] = [];
    const walk = (node: unknown) => {
      if (!node) return;
      if (Array.isArray(node)) {
        node.forEach(walk);
        return;
      }
      if (typeof node !== "object") return;
      const record = node as Record<string, unknown>;
      if (record["@type"] === "Question" || record.name && record.acceptedAnswer) {
        const q = typeof record.name === "string" ? record.name : "";
        const answer = record.acceptedAnswer;
        let a = "";
        if (typeof answer === "string") a = answer;
        if (answer && typeof answer === "object") {
          const text = (answer as { text?: unknown }).text;
          if (typeof text === "string") a = text;
        }
        if (q) items.push({ q, a: a.slice(0, 400) });
      }
      for (const value of Object.values(record)) {
        if (value && typeof value === "object") walk(value);
      }
    };
    walk(parsed);
    return items;
  } catch {
    return [];
  }
}

function visibleText($: cheerio.CheerioAPI) {
  $("script, style, noscript, svg, canvas").remove();
  return $("body").text().replace(/\s+/g, " ").trim();
}

function extractPage(url: string, status: number, contentType: string, html: string): PageExtract {
  const $ = cheerio.load(html);
  const title = $("title").first().text().trim();
  const description =
    $('meta[name="description"]').attr("content")?.trim() ||
    $('meta[property="og:description"]').attr("content")?.trim() ||
    "";
  const canonical = $('link[rel="canonical"]').attr("href")?.trim() || null;
  const h1 = unique($("h1").map((_, el) => $(el).text()).get());
  const headings = unique(
    $("h1, h2, h3")
      .map((_, el) => $(el).text())
      .get(),
  ).slice(0, 40);

  const jsonLd = $("script[type='application/ld+json']")
    .map((_, el) => $(el).text())
    .get();
  const schemaTypes = unique(jsonLd.flatMap(schemaTypesFromJson));
  const faq = jsonLd.flatMap(faqFromSchema).slice(0, 12);

  $("details").each((_, el) => {
    const q = $(el).find("summary").first().text().trim();
    const a = $(el).text().replace(q, "").trim();
    if (q) faq.push({ q, a: a.slice(0, 400) });
  });

  const text = visibleText($);
  return {
    url,
    status,
    contentType,
    title,
    description,
    canonical,
    h1,
    headings,
    schemaTypes,
    faq: faq.slice(0, 16),
    dateHints: extractDates(`${title} ${description} ${text.slice(0, 4000)}`),
    numberHints: extractNumbers(text.slice(0, 8000)),
    wordCount: text ? text.split(/\s+/).length : 0,
    textSample: text.slice(0, 4000),
    ogTitle: $('meta[property="og:title"]').attr("content")?.trim() || "",
    ogType: $('meta[property="og:type"]').attr("content")?.trim() || "",
  };
}

function sameHost(base: URL, href: string) {
  try {
    const next = new URL(href, base);
    return next.host === base.host ? next : null;
  } catch {
    return null;
  }
}

function scoreCandidate(url: URL) {
  const path = url.pathname.toLowerCase();
  const index = PRIORITY_PATHS.findIndex((prefix) => path === prefix || path.startsWith(`${prefix}/`));
  if (index >= 0) return 100 - index;
  if (path.includes("compare") || path.includes("vs")) return 40;
  if (path.includes("faq") || path.includes("docs")) return 30;
  return 0;
}

function collectCandidates(homepage: URL, html: string) {
  const $ = cheerio.load(html);
  const found = new Map<string, number>();
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (!href) return;
    const url = sameHost(homepage, href);
    if (!url) return;
    url.hash = "";
    if (url.pathname === homepage.pathname && url.search === "") return;
    const score = scoreCandidate(url);
    if (score <= 0) return;
    const key = url.toString();
    found.set(key, Math.max(found.get(key) ?? 0, score));
  });
  return [...found.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([href]) => href);
}

async function fetchOptional(url: string, accept: string) {
  try {
    const response = await fetchPublic(url, accept);
    const text = await readLimited(response);
    return { status: response.status, text, ok: response.ok, finalUrl: response.url };
  } catch {
    return { status: null, text: "", ok: false, finalUrl: url };
  }
}

export async function crawlSite(siteUrl: string): Promise<CrawlResult> {
  const startedAt = nowIso();
  const warnings: string[] = [];
  const start = await assertSafePublicUrl(siteUrl);
  const origin = `${start.protocol}//${start.host}`;

  const robotsHit = await fetchOptional(new URL("/robots.txt", origin).toString(), "text/plain");
  const robots = robotsSignals(
    robotsHit.ok ? robotsHit.text : null,
    robotsHit.status,
  );
  if (robots.fetched && !robots.allowsGeneric) {
    warnings.push(
      "robots.txt disallows generic crawlers. We still fetched the URL you paid to audit (owner-requested) and recorded the block as a signal.",
    );
  }

  const llmsUrl = new URL("/llms.txt", origin).toString();
  const llmsHit = await fetchOptional(llmsUrl, "text/plain");
  const sitemapHit = await fetchOptional(new URL("/sitemap.xml", origin).toString(), "application/xml");

  let homepageHtml = "";
  let homepageStatus = 0;
  let homepageType = "";
  let finalHomepageUrl = start.toString();
  try {
    const homepage = await fetchPublic(start.toString(), "text/html");
    homepageStatus = homepage.status;
    homepageType = homepage.headers.get("content-type") || "";
    finalHomepageUrl = homepage.url || start.toString();
    homepageHtml = await readLimited(homepage);
    if (!homepage.ok) {
      warnings.push(`Homepage returned HTTP ${homepage.status}.`);
    }
  } catch (error) {
    warnings.push(error instanceof Error ? error.message : "Homepage fetch failed.");
  }

  const pages: PageExtract[] = [];
  if (homepageHtml) {
    pages.push(extractPage(finalHomepageUrl, homepageStatus, homepageType, homepageHtml));
  }

  const home = new URL(finalHomepageUrl);
  const extras = collectCandidates(home, homepageHtml).slice(0, MAX_PAGES - 1);
  for (const href of extras) {
    try {
      const response = await fetchPublic(href, "text/html");
      const type = response.headers.get("content-type") || "";
      if (!type.includes("html") && !type.includes("text/")) continue;
      const html = await readLimited(response);
      pages.push(extractPage(response.url || href, response.status, type, html));
    } catch (error) {
      warnings.push(
        `Skipped ${href}: ${error instanceof Error ? error.message : "fetch failed"}`,
      );
    }
  }

  return {
    startedAt,
    finishedAt: nowIso(),
    homepageUrl: start.toString(),
    finalHomepageUrl,
    robots,
    llmsTxt: {
      url: llmsUrl,
      found: Boolean(llmsHit.ok && llmsHit.text.trim()),
      status: llmsHit.status,
      sample: llmsHit.text.slice(0, 1500),
    },
    sitemap: {
      url: new URL("/sitemap.xml", origin).toString(),
      found: Boolean(sitemapHit.ok && sitemapHit.text.includes("<urlset")),
      status: sitemapHit.status,
    },
    pages,
    warnings,
  };
}
