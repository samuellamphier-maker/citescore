import type { CrawlResult } from "@/lib/crawl/types";
import type { AuditReport, Dimension, EngineSnapshot, Fix } from "@/lib/sample-report";
import {
  anthropicApiKey,
  anthropicModel,
  openaiApiKey,
  openaiModel,
} from "@/lib/env";
import { gradeFromScore } from "@/lib/sample-report";
import { heuristicReport, weightedOverall } from "@/lib/score/heuristic";

const SYSTEM = `You are a GEO / AI-visibility auditor writing a CiteScore report.
You receive crawl extracts from public pages plus a heuristic baseline.
Return a single JSON object only.

Honesty rules:
- Do NOT claim you queried ChatGPT, Perplexity, Google AI Overviews, or any live AI UI.
- Engine snapshots are inferred likelihoods from on-page signals. Status must be one of: Cited, Mentioned, Absent, Competitor cited.
- Prefer "Mentioned" or "Absent" unless the HTML itself shows a third-party citation. Never invent "Cited" from marketing copy alone.
- Fixes must be specific to THIS site (use real paths, product name, missing schema types, robots/llms.txt findings).
- Do not invent customer quotes, traffic, or rankings.
- Keep the editorial, citation-desk tone. No hype.

JSON shape:
{
  "product": string,
  "oneLiner": string,
  "overall": number,
  "grade": string,
  "summary": string,
  "engines": [{"engine":"ChatGPT"|"Perplexity"|"Google AI Overviews","status":"Cited"|"Mentioned"|"Absent"|"Competitor cited","detail":string}],
  "dimensions": [{"id":string,"name":string,"score":number,"weight":"High"|"Medium"|"Low","note":string}],
  "fixes": [{"rank":number,"title":string,"effort":"Half day"|"1–2 days"|"This week","impact":"High"|"Medium","where":string,"why":string,"doThis":string}]
}

Keep the same 8 dimension ids as the baseline: answer, entity, evidence, structure, authority, freshness, crawlers, share.
Provide exactly 10 fixes.
You may adjust baseline scores by at most 15 points when the prose quality clearly disagrees with the heuristic.
overall should be consistent with the weighted dimensions (High=3, Medium=2, Low=1).`;

function compactCrawl(crawl: CrawlResult) {
  return {
    homepageUrl: crawl.homepageUrl,
    finalHomepageUrl: crawl.finalHomepageUrl,
    warnings: crawl.warnings,
    robots: {
      fetched: crawl.robots.fetched,
      allowsGeneric: crawl.robots.allowsGeneric,
      gptBot: crawl.robots.gptBot,
      perplexityBot: crawl.robots.perplexityBot,
      googleExtended: crawl.robots.googleExtended,
    },
    llmsTxt: {
      found: crawl.llmsTxt.found,
      sample: crawl.llmsTxt.sample.slice(0, 600),
    },
    sitemap: crawl.sitemap.found,
    pages: crawl.pages.map((page) => ({
      url: page.url,
      status: page.status,
      title: page.title,
      description: page.description,
      h1: page.h1,
      headings: page.headings.slice(0, 16),
      schemaTypes: page.schemaTypes,
      faq: page.faq.slice(0, 6),
      dateHints: page.dateHints.slice(0, 8),
      numberHints: page.numberHints.slice(0, 8),
      wordCount: page.wordCount,
      textSample: page.textSample.slice(0, 1800),
    })),
  };
}

function clamp(n: unknown) {
  const value = typeof n === "number" ? n : Number(n);
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

const ENGINE_STATUSES = new Set(["Cited", "Mentioned", "Absent", "Competitor cited"]);
const EFFORTS = new Set(["Half day", "1–2 days", "This week"]);
const IMPACTS = new Set(["High", "Medium"]);
const WEIGHTS = new Set(["High", "Medium", "Low"]);

function mergeLlmReport(baseline: AuditReport, parsed: Record<string, unknown>): AuditReport {
  const dimById = new Map(baseline.dimensions.map((d) => [d.id, d]));
  const rawDims = Array.isArray(parsed.dimensions) ? parsed.dimensions : [];
  const dimensions: Dimension[] = baseline.dimensions.map((base) => {
    const raw = rawDims.find(
      (item) => typeof item === "object" && item && (item as { id?: string }).id === base.id,
    ) as Partial<Dimension> | undefined;
    if (!raw) return base;
    const score = clamp(raw.score ?? base.score);
    const delta = Math.max(-15, Math.min(15, score - base.score));
    return {
      ...base,
      score: base.score + delta,
      note: asString(raw.note, base.note),
      weight: WEIGHTS.has(String(raw.weight)) ? (raw.weight as Dimension["weight"]) : base.weight,
      name: asString(raw.name, base.name),
    };
  });
  for (const [id, dim] of dimById) {
    if (!dimensions.some((item) => item.id === id)) dimensions.push(dim);
  }

  const rawEngines = Array.isArray(parsed.engines) ? parsed.engines : [];
  const engines: EngineSnapshot[] = baseline.engines.map((base) => {
    const raw = rawEngines.find(
      (item) =>
        typeof item === "object" &&
        item &&
        (item as { engine?: string }).engine === base.engine,
    ) as Partial<EngineSnapshot> | undefined;
    if (!raw) return base;
    const status = ENGINE_STATUSES.has(String(raw.status))
      ? (raw.status as EngineSnapshot["status"])
      : base.status;
    return {
      engine: base.engine,
      status: status === "Cited" ? "Mentioned" : status,
      detail: asString(raw.detail, base.detail),
    };
  });

  const rawFixes = Array.isArray(parsed.fixes) ? parsed.fixes : [];
  const fixes: Fix[] = rawFixes
    .map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const raw = item as Record<string, unknown>;
      const title = asString(raw.title);
      const why = asString(raw.why);
      const doThis = asString(raw.doThis);
      if (!title || !why || !doThis) return null;
      return {
        rank: index + 1,
        title,
        effort: EFFORTS.has(String(raw.effort)) ? (raw.effort as Fix["effort"]) : "1–2 days",
        impact: IMPACTS.has(String(raw.impact)) ? (raw.impact as Fix["impact"]) : "Medium",
        where: asString(raw.where, baseline.url),
        why,
        doThis,
      };
    })
    .filter((item): item is Fix => Boolean(item))
    .slice(0, 10);

  while (fixes.length < 10 && baseline.fixes[fixes.length]) {
    const next = baseline.fixes[fixes.length];
    fixes.push({ ...next, rank: fixes.length + 1 });
  }

  const overall = clamp(parsed.overall ?? weightedOverall(dimensions));
  return {
    product: asString(parsed.product, baseline.product),
    oneLiner: asString(parsed.oneLiner, baseline.oneLiner).slice(0, 180),
    url: baseline.url,
    auditedAt: baseline.auditedAt,
    overall,
    grade: asString(parsed.grade, gradeFromScore(overall)),
    summary: asString(parsed.summary, baseline.summary),
    methodology: baseline.methodology,
    engines,
    dimensions,
    fixes,
  };
}

function extractJson(text: string) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("Model did not return JSON.");
  return JSON.parse(text.slice(start, end + 1)) as Record<string, unknown>;
}

async function completeOpenAI(user: string) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openaiApiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: openaiModel(),
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: user },
      ],
    }),
  });
  const body = (await response.json()) as {
    error?: { message?: string };
    choices?: { message?: { content?: string } }[];
  };
  if (!response.ok) {
    throw new Error(body.error?.message || `OpenAI ${response.status}`);
  }
  return body.choices?.[0]?.message?.content || "";
}

async function completeAnthropic(user: string) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": anthropicApiKey(),
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: anthropicModel(),
      max_tokens: 3500,
      temperature: 0.3,
      system: SYSTEM,
      messages: [{ role: "user", content: user }],
    }),
  });
  const body = (await response.json()) as {
    error?: { message?: string };
    content?: { type: string; text?: string }[];
  };
  if (!response.ok) {
    throw new Error(body.error?.message || `Anthropic ${response.status}`);
  }
  return body.content?.find((part) => part.type === "text")?.text || "";
}

export function llmProvider(): "openai" | "anthropic" | null {
  if (openaiApiKey()) return "openai";
  if (anthropicApiKey()) return "anthropic";
  return null;
}

export async function refineReportWithLlm(
  crawl: CrawlResult,
  baseline: AuditReport,
): Promise<AuditReport> {
  const provider = llmProvider();
  if (!provider) return baseline;

  const user = JSON.stringify(
    {
      baseline,
      crawl: compactCrawl(crawl),
    },
    null,
    2,
  );

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25_000);
  try {
    const raw = provider === "openai" ? await completeOpenAI(user) : await completeAnthropic(user);
    return mergeLlmReport(baseline, extractJson(raw));
  } finally {
    clearTimeout(timer);
  }
}

export async function scoreSite(crawl: CrawlResult): Promise<{
  report: AuditReport;
  usedLlm: boolean;
  provider: "openai" | "anthropic" | null;
}> {
  const baseline = heuristicReport(crawl);
  const provider = llmProvider();
  if (!provider) {
    return { report: baseline, usedLlm: false, provider: null };
  }
  try {
    const report = await refineReportWithLlm(crawl, baseline);
    return { report, usedLlm: true, provider };
  } catch (error) {
    const reason = error instanceof Error ? error.message : "LLM failed";
    return {
      report: {
        ...baseline,
        summary: `${baseline.summary} (Model review skipped: ${reason}.)`,
      },
      usedLlm: false,
      provider,
    };
  }
}
