"use client";

import { useState } from "react";
import { contactEmail } from "@/lib/site";

const SUBJECT = "Free AI Answer Snapshot";

export function SnapshotRequestForm() {
  const [opened, setOpened] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const business = String(data.get("business") ?? "").trim();
    const city = String(data.get("city") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const body = [
      `Business name: ${business}`,
      `City: ${city}`,
      `Service: ${service}`,
      `Email: ${email}`,
      "",
      "Please send a free AI Answer Snapshot.",
    ].join("\n");
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  return (
    <form id="snapshot" onSubmit={onSubmit} className="scroll-mt-24 space-y-3">
      <div>
        <label htmlFor="snapshot-business" className="text-sm font-medium">
          Business name
        </label>
        <input
          id="snapshot-business"
          name="business"
          required
          autoComplete="organization"
          className="mt-1 h-11 w-full rounded-lg border border-rule bg-cream px-3 text-ink outline-none"
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="snapshot-city" className="text-sm font-medium">
            City
          </label>
          <input
            id="snapshot-city"
            name="city"
            required
            autoComplete="address-level2"
            className="mt-1 h-11 w-full rounded-lg border border-rule bg-cream px-3 text-ink outline-none"
          />
        </div>
        <div>
          <label htmlFor="snapshot-service" className="text-sm font-medium">
            Service
          </label>
          <input
            id="snapshot-service"
            name="service"
            required
            placeholder="Plumber"
            className="mt-1 h-11 w-full rounded-lg border border-rule bg-cream px-3 text-ink outline-none placeholder:text-ink-soft/70"
          />
        </div>
      </div>
      <div>
        <label htmlFor="snapshot-email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="snapshot-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 h-11 w-full rounded-lg border border-rule bg-cream px-3 text-ink outline-none"
        />
      </div>
      <button
        type="submit"
        className="flex h-12 w-full items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream hover:bg-forest-deep"
      >
        Get a free AI Answer Snapshot
      </button>
      <p className="text-xs leading-5 text-ink-soft">
        Opens your email app to {contactEmail}. No account and no paid
        checkout. AI answers vary run to run. This is a snapshot, not a
        ranking.
      </p>
      {opened ? (
        <p className="text-sm leading-6 text-ink" role="status">
          If your email app did not open, send the same details to{" "}
          <a className="text-forest underline" href={`mailto:${contactEmail}?subject=Free%20AI%20Answer%20Snapshot`}>
            {contactEmail}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
