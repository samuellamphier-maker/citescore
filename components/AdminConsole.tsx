"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { JobPublic } from "@/lib/jobs/types";

type ListResponse = {
  store?: string;
  jobs?: JobPublic[];
  error?: string;
};

const TOKEN_KEY = "citescore-admin-token";

export function AdminConsole() {
  const [token, setToken] = useState("");
  const [draft, setDraft] = useState("");
  const [jobs, setJobs] = useState<JobPublic[]>([]);
  const [store, setStore] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  const [email, setEmail] = useState("");
  const [siteUrl, setSiteUrl] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem(TOKEN_KEY) || "";
    if (saved) {
      setToken(saved);
      setDraft(saved);
    }
  }, []);

  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
    [token],
  );

  const load = useCallback(async () => {
    if (!token) return;
    setBusy("load");
    setError("");
    try {
      const response = await fetch("/api/jobs", { headers });
      const body = (await response.json()) as ListResponse;
      if (!response.ok) throw new Error(body.error || "Could not load jobs.");
      setJobs(body.jobs ?? []);
      setStore(body.store ?? "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Load failed.");
    } finally {
      setBusy("");
    }
  }, [headers, token]);

  useEffect(() => {
    if (token) void load();
  }, [token, load]);

  async function retry(id: string) {
    setBusy(id);
    setError("");
    try {
      const response = await fetch(`/api/jobs/${id}/process`, {
        method: "POST",
        headers,
      });
      const body = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(body.error || "Retry failed.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Retry failed.");
    } finally {
      setBusy("");
    }
  }

  async function createManual(event: React.FormEvent) {
    event.preventDefault();
    setBusy("create");
    setError("");
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers,
        body: JSON.stringify({ email, site_url: siteUrl, process: true }),
      });
      const body = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(body.error || "Create failed.");
      setEmail("");
      setSiteUrl("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed.");
    } finally {
      setBusy("");
    }
  }

  if (!token) {
    return (
      <form
        className="mt-8 space-y-4 rounded-2xl border border-rule bg-cream p-6"
        onSubmit={(event) => {
          event.preventDefault();
          sessionStorage.setItem(TOKEN_KEY, draft.trim());
          setToken(draft.trim());
        }}
      >
        <label className="kicker" htmlFor="admin-token">
          Admin token
        </label>
        <input
          id="admin-token"
          type="password"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="mt-2 h-12 w-full rounded-lg border border-rule bg-paper px-3 outline-none focus:border-forest"
          placeholder="ADMIN_TOKEN"
        />
        <button
          type="submit"
          className="h-11 w-full rounded-lg bg-ink text-cream hover:bg-forest-deep"
        >
          Open the queue
        </button>
      </form>
    );
  }

  return (
    <div className="mt-8 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-soft">
          Store: <span className="font-mono">{store || "—"}</span>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void load()}
            className="rounded-lg border border-rule px-3 py-2 text-sm hover:border-ink/30"
          >
            {busy === "load" ? "Loading…" : "Refresh"}
          </button>
          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem(TOKEN_KEY);
              setToken("");
            }}
            className="rounded-lg border border-rule px-3 py-2 text-sm hover:border-ink/30"
          >
            Lock
          </button>
        </div>
      </div>

      {error ? (
        <p className="text-sm text-copper" role="alert">
          {error}
        </p>
      ) : null}

      <form
        onSubmit={(event) => void createManual(event)}
        className="grid gap-3 rounded-2xl border border-rule bg-cream p-5 sm:grid-cols-[1fr_1fr_auto]"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="buyer@email.com"
          className="h-11 rounded-lg border border-rule bg-paper px-3 text-sm outline-none focus:border-forest"
        />
        <input
          type="url"
          required
          value={siteUrl}
          onChange={(e) => setSiteUrl(e.target.value)}
          placeholder="https://example.com"
          className="h-11 rounded-lg border border-rule bg-paper px-3 text-sm outline-none focus:border-forest"
        />
        <button
          type="submit"
          disabled={busy === "create"}
          className="h-11 rounded-lg bg-forest px-4 text-sm text-cream hover:bg-forest-deep disabled:opacity-60"
        >
          {busy === "create" ? "Queuing…" : "Run audit"}
        </button>
      </form>

      <div className="overflow-hidden rounded-2xl border border-rule">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper-2/80 text-xs uppercase tracking-[0.12em] text-ink-soft">
            <tr>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-3 py-3 font-medium">Site</th>
              <th className="hidden px-3 py-3 font-medium sm:table-cell">Email</th>
              <th className="px-3 py-3 font-medium">Score</th>
              <th className="px-3 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td className="px-3 py-6 text-ink-soft" colSpan={5}>
                  No jobs yet. Refresh after a Stripe payment or queue a manual run.
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="border-t border-rule align-top">
                  <td className="px-3 py-3 font-mono text-xs">{job.status}</td>
                  <td className="px-3 py-3">
                    <p className="break-all font-mono text-xs">{job.siteUrl || "—"}</p>
                    {job.error ? (
                      <p className="mt-1 text-xs text-copper">{job.error}</p>
                    ) : null}
                  </td>
                  <td className="hidden px-3 py-3 font-mono text-xs sm:table-cell">
                    {job.email}
                  </td>
                  <td className="px-3 py-3 font-serif text-xl">
                    {job.report?.overall ?? "—"}
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="flex flex-col items-end gap-2">
                      {job.report ? (
                        <a
                          className="text-xs text-forest underline"
                          href={`/r/${job.downloadToken}`}
                        >
                          Report
                        </a>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => void retry(job.id)}
                        className="text-xs text-ink-soft underline"
                      >
                        {busy === job.id ? "Running…" : "Retry"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
