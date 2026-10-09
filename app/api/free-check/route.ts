import { assertSafePublicUrl } from "@/lib/crawl/ssrf";
import { robotsSignals } from "@/lib/crawl/robots";
import { normalizeSiteUrl } from "@/lib/urls";

export const runtime = "nodejs";
export const maxDuration = 20;

const UA = "CiteScoreFreeCheck/1.0 (+https://citescore.vercel.app/free-check)";

async function grab(url: string, limit = 400_000) {
  try {
    await assertSafePublicUrl(url);
    const res = await fetch(url, {
      headers: { "user-agent": UA },
      redirect: "follow",
      signal: AbortSignal.timeout(6000),
    });
    const text = (await res.text()).slice(0, limit);
    return { status: res.status, ok: res.ok, text };
  } catch {
    return { status: null as number | null, ok: false, text: "" };
  }
}

export async function POST(request: Request) {
  let payload: { url?: unknown };
  try {
    payload = (await request.json()) as { url?: unknown };
  } catch {
    return Response.json({ error: "Send JSON with a url." }, { status: 400 });
  }
  const normalized = normalizeSiteUrl(typeof payload.url === "string" ? payload.url : "");
  if (!normalized) return Response.json({ error: "Enter a domain like example.com." }, { status: 400 });

  let origin: string;
  try {
    origin = (await assertSafePublicUrl(normalized)).origin;
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "That URL cannot be checked." }, { status: 400 });
  }

  const [home, robots, llms, sitemap] = await Promise.all([
    grab(`${origin}/`),
    grab(`${origin}/robots.txt`, 100_000),
    grab(`${origin}/llms.txt`, 20_000),
    grab(`${origin}/sitemap.xml`, 50_000),
  ]);

  const robotsOk = robots.ok && robots.text.trim().length > 0 && !/<html/i.test(robots.text);
  const signals = robotsSignals(robotsOk ? robots.text : null, robots.status);
  const llmsOk = llms.ok && llms.text.trim().length > 0 && !/<html/i.test(llms.text.slice(0, 500));
  const sitemapDeclared = robotsOk && /^\s*sitemap:/im.test(robots.text);
  const sitemapOk = (sitemap.ok && /<(urlset|sitemapindex)/i.test(sitemap.text)) || sitemapDeclared;
  const schemaTypes = Array.from(
    home.text.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi),
  ).flatMap((m) => Array.from(m[1].matchAll(/"@type"\s*:\s*"([^"]+)"/g)).map((t) => t[1]));
  const titleMatch = home.text.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const hasMetaDescription = /<meta[^>]+name=["']description["'][^>]*>/i.test(home.text);

  return Response.json({
    origin,
    homepage: { reachable: home.ok, status: home.status, title: titleMatch?.[1].trim().slice(0, 120) ?? null, hasMetaDescription },
    robots: { found: robotsOk, gptBot: signals.gptBot, perplexityBot: signals.perplexityBot, googleExtended: signals.googleExtended, allowsGeneric: signals.allowsGeneric },
    llmsTxt: { found: llmsOk },
    sitemap: { found: sitemapOk },
    schema: { found: schemaTypes.length > 0, types: Array.from(new Set(schemaTypes)).slice(0, 12) },
  });
}
