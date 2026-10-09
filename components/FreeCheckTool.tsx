"use client";

import { useState } from "react";
import Link from "next/link";

type Result = {
  origin: string;
  homepage: { reachable: boolean; status: number | null; title: string | null; hasMetaDescription: boolean };
  robots: { found: boolean; gptBot: string; perplexityBot: string; googleExtended: string; allowsGeneric: boolean };
  llmsTxt: { found: boolean };
  sitemap: { found: boolean };
  schema: { found: boolean; types: string[] };
};

function Row({ ok, label, detail }: { ok: boolean; label: string; detail: string }) {
  return (
    <li className="flex gap-3 border-b border-rule py-3">
      <span aria-hidden className={ok ? "text-green-700" : "text-red-700"}>{ok ? "✓" : "✗"}</span>
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-ink-soft">{detail}</p>
      </div>
    </li>
  );
}

const botLabel = (v: string) => (v === "disallow" ? "blocked" : v === "allow" ? "allowed" : "not mentioned (falls back to *)");

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
    ? [result.homepage.reachable, result.robots.found && blocked === 0, result.llmsTxt.found, result.sitemap.found, result.schema.found, result.homepage.hasMetaDescription].filter(Boolean).length
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
      <p className="mt-2 text-xs text-ink-soft">No signup, no email. We fetch four public files and your homepage, nothing else.</p>
      {error && <p className="mt-4 text-red-700">{error}</p>}
      {result && (
        <div className="mt-8">
          <p className="kicker">{result.origin}</p>
          <p className="mt-2 font-serif text-2xl">{passed} of 6 AI-readiness basics in place</p>
          <ul className="mt-4">
            <Row ok={result.homepage.reachable} label="Homepage reachable" detail={result.homepage.reachable ? `HTTP ${result.homepage.status}${result.homepage.title ? ` · “${result.homepage.title}”` : ""}` : "We could not load the homepage."} />
            <Row ok={result.robots.found && blocked === 0} label="robots.txt AI-crawler rules" detail={result.robots.found ? `GPTBot ${botLabel(result.robots.gptBot)} · PerplexityBot ${botLabel(result.robots.perplexityBot)} · Google-Extended ${botLabel(result.robots.googleExtended)}` : "No robots.txt found."} />
            <Row ok={result.llmsTxt.found} label="llms.txt" detail={result.llmsTxt.found ? "Found a non-empty /llms.txt." : "No /llms.txt. Optional, but a cheap signal."} />
            <Row ok={result.sitemap.found} label="Sitemap" detail={result.sitemap.found ? "Sitemap found or declared in robots.txt." : "No /sitemap.xml and none declared in robots.txt."} />
            <Row ok={result.schema.found} label="Structured data (JSON-LD)" detail={result.schema.found ? result.schema.types.join(", ") : "No JSON-LD on the homepage. FAQ/Organization schema helps answer engines."} />
            <Row ok={result.homepage.hasMetaDescription} label="Meta description" detail={result.homepage.hasMetaDescription ? "Present." : "Missing — answer engines often quote it."} />
          </ul>
          <aside className="mt-8 rounded-2xl border border-rule bg-cream p-6">
            <p className="kicker text-copper">Next step</p>
            <h2 className="mt-2 font-serif text-2xl">These are the plumbing checks. The $39 audit scores the content.</h2>
            <p className="mt-2 text-sm text-ink-soft">
              The full CiteScore audit grades one page across eight dimensions — answer fitness, evidence, entity clarity, ChatGPT / Perplexity / AI Overviews snapshots — and gives you a 0–100 score with about ten concrete fixes as a PDF.
            </p>
            <Link href={`/geo-audit?url=${encodeURIComponent(result.origin)}`} className="mt-4 inline-block rounded-lg bg-copper px-5 py-3 text-cream">
              Get the full $39 audit →
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
