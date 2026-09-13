"use client";

import { useState } from "react";
import { isValidEmail, normalizeSiteUrl } from "@/lib/urls";

export function WaitlistForm({ defaultUrl = "" }: { defaultUrl?: string }) {
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState(defaultUrl);
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanUrl = normalizeSiteUrl(url);
    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Use a real email so we can reach you when checkout is live.");
      return;
    }
    if (!cleanUrl) {
      setStatus("error");
      setMessage("Enter the site URL you want audited.");
      return;
    }

    setStatus("saving");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, url: cleanUrl }),
      });
      const body = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(body.error || "Could not save your request.");
      }
      setStatus("done");
      setMessage(
        "You're on the list. We'll email you when the $39 checkout is online.",
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-xl border border-forest/30 bg-[#e7efe9] px-5 py-6">
        <p className="font-serif text-xl text-forest-deep">Saved.</p>
        <p className="mt-2 text-sm leading-6 text-ink-soft">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="waitlist-email" className="kicker">
          Email
        </label>
        <input
          id="waitlist-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 h-12 w-full rounded-lg border border-rule bg-cream px-3 text-ink outline-none focus:border-forest"
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label htmlFor="waitlist-url" className="kicker">
          Site to audit
        </label>
        <input
          id="waitlist-url"
          type="text"
          inputMode="url"
          autoComplete="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mt-2 h-12 w-full rounded-lg border border-rule bg-cream px-3 text-ink outline-none focus:border-forest"
          placeholder="https://yourproduct.com"
        />
      </div>
      <button
        type="submit"
        disabled={status === "saving"}
        className="h-12 w-full rounded-lg bg-ink text-cream hover:bg-forest-deep disabled:opacity-60"
      >
        {status === "saving" ? "Saving…" : "Notify me when checkout is live"}
      </button>
      {message ? (
        <p className="text-sm text-copper" role="alert">
          {message}
        </p>
      ) : (
        <p className="text-sm text-ink-soft">
          We store email + URL so we can open checkout with your site already
          attached. No marketing list.
        </p>
      )}
    </form>
  );
}
