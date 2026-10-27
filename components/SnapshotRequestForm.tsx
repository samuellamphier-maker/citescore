"use client";

import { useState } from "react";
import { EmailRequestFallback } from "@/components/EmailRequestFallback";
import { useHomeServiceTradeParam } from "@/components/useHomeServiceTrade";
import {
  snapshotMailto,
  snapshotRequestBody,
  snapshotRequestClipboard,
  snapshotSubjectForTrade,
} from "@/lib/email-request";
import { contactEmail } from "@/lib/site";

function openMailto(href: string) {
  window.location.assign(href);
}

export function SnapshotRequestForm() {
  const [business, setBusiness] = useState("");
  const [city, setCity] = useState("");
  // null means the visitor has not edited service, so an allowlisted ?trade= can fill it.
  const [service, setService] = useState<string | null>(null);
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const trade = useHomeServiceTradeParam();
  const serviceValue = service ?? trade?.service ?? "";

  const fields = {
    business: business.trim(),
    city: city.trim(),
    service: serviceValue.trim(),
    website: website.trim(),
    email: email.trim(),
  };
  const ready = Boolean(fields.business && fields.city && fields.service && fields.email);
  const body = snapshotRequestBody(fields);
  const subject = snapshotSubjectForTrade(trade?.service);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    openMailto(snapshotMailto(contactEmail, body, subject));
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
          value={business}
          onChange={(event) => setBusiness(event.target.value)}
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
            value={city}
            onChange={(event) => setCity(event.target.value)}
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
          value={serviceValue}
          onChange={(event) => setService(event.target.value)}
            className="mt-1 h-11 w-full rounded-lg border border-rule bg-cream px-3 text-ink outline-none placeholder:text-ink-soft/70"
          />
        </div>
      </div>
      <div>
        <label htmlFor="snapshot-website" className="text-sm font-medium">
          Website
        </label>
        <input
          id="snapshot-website"
          name="website"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="https://"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          className="mt-1 h-11 w-full rounded-lg border border-rule bg-cream px-3 text-ink outline-none placeholder:text-ink-soft/70"
        />
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
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-1 h-11 w-full rounded-lg border border-rule bg-cream px-3 text-ink outline-none"
        />
      </div>
      <button
        type="submit"
        className="flex h-12 w-full items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream hover:bg-forest-deep"
      >
        Get a free AI Answer Snapshot
      </button>
      <EmailRequestFallback
        requestText={snapshotRequestClipboard(contactEmail, fields, subject)}
        requestReady={ready}
      />
      <p className="text-xs leading-5 text-ink-soft">
        Opens your email app to {contactEmail}. No account and no paid
        checkout. AI answers vary run to run. This is a snapshot, not a
        ranking.
      </p>
    </form>
  );
}
