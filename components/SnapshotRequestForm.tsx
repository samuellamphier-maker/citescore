"use client";

import { useRef, useState } from "react";
import { EmailRequestFallback } from "@/components/EmailRequestFallback";
import { useHomeServiceTradeParam } from "@/components/useHomeServiceTrade";
import {
  SNAPSHOT_SUBJECT,
  snapshotMailto,
  snapshotRequestBody,
  snapshotRequestClipboard,
  snapshotSubjectForTrade,
} from "@/lib/email-request";
import { contactEmail } from "@/lib/site";
import {
  snapshotFieldsComplete,
  snapshotFormEncoded,
  snapshotFormEndpoint,
  snapshotSendErrorMessage,
  snapshotSentMessage,
  snapshotSubmitSucceeded,
  snapshotValidationMessage,
} from "@/lib/snapshot-form";

export function SnapshotRequestForm() {
  const [business, setBusiness] = useState("");
  const [city, setCity] = useState("");
  // null means the visitor has not edited service, so an allowlisted ?trade= can fill it.
  const [service, setService] = useState<string | null>(null);
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [validationMessage, setValidationMessage] = useState("");
  const submitLock = useRef(false);
  const trade = useHomeServiceTradeParam();
  const serviceValue = service ?? trade?.service ?? "";

  const fields = {
    business: business.trim(),
    city: city.trim(),
    service: serviceValue.trim(),
    website: website.trim(),
    email: email.trim(),
  };
  const ready = snapshotFieldsComplete(fields);
  const subject = snapshotSubjectForTrade(trade?.service);
  const mailto = snapshotMailto(contactEmail, snapshotRequestBody(fields), subject);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLock.current || phase === "sent") return;

    const form = event.currentTarget;
    if (!form.checkValidity() || !snapshotFieldsComplete(fields)) {
      setValidationMessage(snapshotValidationMessage);
      setPhase("idle");
      form.reportValidity();
      return;
    }

    const honey = String(new FormData(form).get("_honey") ?? "");
    if (honey.trim()) {
      submitLock.current = true;
      setValidationMessage("");
      setPhase("sent");
      return;
    }

    submitLock.current = true;
    setValidationMessage("");
    setPhase("sending");
    try {
      const response = await fetch(snapshotFormEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: snapshotFormEncoded(fields),
      });
      const body = await response.json().catch(() => null);
      if (!snapshotSubmitSucceeded(response.status, body)) {
        submitLock.current = false;
        setPhase("error");
        return;
      }
      setPhase("sent");
    } catch {
      submitLock.current = false;
      setPhase("error");
    }
  }

  return (
    <form id="snapshot" onSubmit={onSubmit} className="scroll-mt-24 space-y-3" noValidate>
      <div>
        <label htmlFor="snapshot-business" className="text-sm font-medium">
          Business name
        </label>
        <input
          id="snapshot-business"
          name="Business name"
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
            name="City"
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
            name="Service"
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
          name="Website"
          type="text"
          inputMode="url"
          required
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
          name="Email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-1 h-11 w-full rounded-lg border border-rule bg-cream px-3 text-ink outline-none"
        />
      </div>
      <input type="hidden" name="_subject" value={SNAPSHOT_SUBJECT} />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_replyto" value={fields.email} />
      <input
        type="text"
        name="_honey"
        defaultValue=""
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />
      <button
        type="submit"
        disabled={phase === "sending" || phase === "sent"}
        className="flex h-12 w-full items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {phase === "sending"
          ? "Sending…"
          : phase === "sent"
            ? "Request sent"
            : "Get a free AI Answer Snapshot"}
      </button>
      {validationMessage ? (
        <p role="alert" className="text-sm leading-6 text-ink">
          {validationMessage}
        </p>
      ) : null}
      {phase === "sent" ? (
        <p role="status" aria-live="polite" className="text-sm font-medium leading-6 text-forest">
          {snapshotSentMessage}
        </p>
      ) : null}
      {phase === "error" ? (
        <p id="snapshot-send-error" role="alert" className="text-sm leading-6 text-ink">
          {snapshotSendErrorMessage}
        </p>
      ) : null}
      <a
        id="snapshot-mailto"
        href={mailto}
        aria-describedby={phase === "error" ? "snapshot-send-error" : undefined}
        className="flex h-12 w-full items-center justify-center rounded-lg border border-ink/25 bg-cream px-5 text-base font-medium text-ink hover:border-ink"
      >
        Email this request instead
      </a>
      <EmailRequestFallback
        requestText={snapshotRequestClipboard(contactEmail, fields, subject)}
        requestReady={ready}
      />
      <p className="text-xs leading-5 text-ink-soft">
        Sends the business name, city, service, website, and email to{" "}
        {contactEmail} through FormSubmit. No account and no paid checkout.
        If that send fails, use the email button or the copy buttons. AI
        answers vary run to run. This is a snapshot, not a ranking.
      </p>
    </form>
  );
}
