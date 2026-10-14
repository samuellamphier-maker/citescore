/**
 * Submit every URL from the production sitemap to IndexNow.
 * Bing, Yandex, Seznam, and other IndexNow engines share this endpoint.
 *
 * Run after https://citescore.vercel.app/<key>.txt is live, or the API rejects the key.
 */

const SITEMAP_URL = "https://citescore.vercel.app/sitemap.xml";
const HOST = "citescore.vercel.app";
const KEY = "3bd2d5338141c6c8b119d67c40a3901b";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS_PER_REQUEST = 10_000;

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function parseLocs(xml) {
  const urls = [];
  const pattern = /<loc>([^<]+)<\/loc>/gi;
  for (const match of xml.matchAll(pattern)) {
    const url = decodeXml(match[1].trim());
    if (url) urls.push(url);
  }
  return urls;
}

async function fetchText(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`);
  }
  return response.text();
}

async function collectUrls(url, seen = new Set()) {
  if (seen.has(url)) return [];
  seen.add(url);

  const xml = await fetchText(url);
  const locs = parseLocs(xml);
  if (!/<sitemapindex[\s>]/i.test(xml)) return locs;

  const pages = [];
  for (const child of locs) {
    pages.push(...(await collectUrls(child, seen)));
  }
  return pages;
}

async function submit(urlList) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
    signal: AbortSignal.timeout(30_000),
  });

  const body = (await response.text()).trim();
  console.log(response.status);
  if (body) console.log(body);
  return response.status;
}

const urls = [...new Set(await collectUrls(SITEMAP_URL))];
if (urls.length === 0) {
  console.error("No URLs found in the production sitemap.");
  process.exit(1);
}

console.error(`Submitting ${urls.length} URL${urls.length === 1 ? "" : "s"} to IndexNow`);

let failed = false;
for (let index = 0; index < urls.length; index += MAX_URLS_PER_REQUEST) {
  const status = await submit(urls.slice(index, index + MAX_URLS_PER_REQUEST));
  if (status !== 200 && status !== 202) failed = true;
}

if (failed) process.exit(1);
