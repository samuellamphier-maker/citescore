"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { LlmsTxtCaveat } from "@/components/LlmsTxtCaveat";
import { freeCheckAuditPitch } from "@/lib/free-check-pitch";

type Result = {
  origin: string;
  homepage: { reachable: boolean; status: number | null; title: string | null; hasMetaDescription: boolean };
  robots: { found: boolean; gptBot: string; perplexityBot: string; googleExtended: string; allowsGeneric: boolean };
  llmsTxt: { found: boolean };
  sitemap: { found: boolean };
  schema: { found: boolean; types: string[] };
};

function Row({
  ok,
  label,
  detail,
}: {
  ok: boolean | "note";
  label: string;
  detail: ReactNode;
}) {
  const mark = ok === "note" ? "–" : ok ? "✓" : "✗";
  const color = ok === "note" ? "text-ink-soft" : ok ? "text-green-700" : "text-red-700";
  return (
    <li className="flex gap-3 border-b border-rule py-3">
      <span aria-hidden className={color}>{mark}</span>
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-ink-soft">{detail}</p>
      </div>
    </li>
  );
}

const botLabel = (v: string) => (v === "disallow" ? "blocked" : v === "allow" ? "allowed" : "not mentioned (falls back to *)");

function AuditUpsell({
  origin,
  pitch,
}: {
  origin: string;
  pitch: ReturnType<typeof freeCheckAuditPitch>;
}) {
  return (
    <aside className="mt-8 rounded-2xl border border-rule bg-cream p-6">
      <p className="kicker text-copper">$39 audit</p>
      <h2 className="mt-2 font-serif text-2xl">{pitch.heading}</h2>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{pitch.detail}</p>
      <Link
        href={`/geo-audit?url=${encodeURIComponent(origin)}`}
        className="mt-4 inline-flex h-12 items-center justify-center rounded-lg bg-forest px-5 font-medium text-cream hover:bg-forest-deep"
      >
        Get the $39 audit
      </Link>
    </aside>
  );
}

export function FreeCheckTool() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  async function run(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/free-check", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Check failed.");
      setResult(data as Result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Check failed.");
    } finally {
      setLoading(false);
    }
  }

  const blocked = result
    ? [result.robots.gptBot, result.robots.perplexityBot, result.robots.googleExtended].filter((v) => v === "disallow").length
    : 0;
  const passed = result
    ? [result.homepage.reachable, result.robots.found && blocked === 0, result.sitemap.found, result.homepage.reachable && result.schema.found, result.homepage.reachable && result.homepage.hasMetaDescription].filter(Boolean).length
    : 0;

  return (
    <div>
      <form onSubmit={run} className="flex flex-col gap-3 sm:flex-row">
        <input
          className="flex-1 rounded-lg border border-rule bg-white px-4 py-3"
          placeholder="example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          aria-label="Domain to check"
          required
        />
        <button className="rounded-lg bg-ink px-5 py-3 text-cream disabled:opacity-60" disabled={loading}>
          {loading ? "Checking…" : "Run free check"}
        </button>
      </form>
      <p className="mt-2 text-xs text-ink-soft">
        No signup, no email. We fetch public files and your homepage. This is a file check — we do not query live ChatGPT, Perplexity, or Google AI Overviews. llms.txt is <LlmsTxtCaveat />.
      </p>
      {error && <p className="mt-4 text-red-700">{error}</p>}
      {result && (
        <div className="mt-8">
          <p className="kicker">{result.origin}</p>
          <p className="mt-2 font-serif text-2xl">{passed} of 5 public-file basics in place</p>
          <ul className="mt-4">
            <Row ok={result.homepage.reachable} label="Homepage reachable" detail={result.homepage.reachable ? `HTTP ${result.homepage.status}${result.homepage.title ? ` · “${result.homepage.title}”` : ""}` : "We could not load the homepage."} />
            <Row ok={result.robots.found && blocked === 0} label="robots.txt AI-crawler rules" detail={result.robots.found ? `GPTBot ${botLabel(result.robots.gptBot)} · PerplexityBot ${botLabel(result.robots.perplexityBot)} · Google-Extended ${botLabel(result.robots.googleExtended)}` : "No robots.txt found."} />
            <Row
              ok="note"
              label="llms.txt"
              detail={
                <>
                  {result.llmsTxt.found ? "A non-empty /llms.txt is on the site. " : "No /llms.txt. "}
                  It is <LlmsTxtCaveat />. A missing file is not a failed check.
                </>
              }
            />
            <Row ok={result.sitemap.found} label="Sitemap" detail={result.sitemap.found ? "Sitemap found or declared in robots.txt." : "No /sitemap.xml and none declared in robots.txt."} />
            <Row ok={result.homepage.reachable && result.schema.found} label="Structured data (JSON-LD)" detail={!result.homepage.reachable ? "Not checked — the homepage did not load." : result.schema.found ? result.schema.types.join(", ") : "No JSON-LD on the homepage. FAQ or Organization schema is a citation-readiness signal."} />
            <Row ok={result.homepage.reachable && result.homepage.hasMetaDescription} label="Meta description" detail={!result.homepage.reachable ? "Not checked — the homepage did not load." : result.homepage.hasMetaDescription ? "Present." : "Missing. Answer engines often quote a meta description when one is present."} />
          </ul>
          <AuditUpsell origin={result.origin} pitch={freeCheckAuditPitch(result)} />
        </div>
      )}
    </div>
  );
}
