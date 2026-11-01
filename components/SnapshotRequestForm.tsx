"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { EmailRequestFallback } from "@/components/EmailRequestFallback";
import { useHomeServiceTradeParam } from "@/components/useHomeServiceTrade";
import {
  SNAPSHOT_SUBJECT,
  snapshotMailto,
  snapshotRequestBody,
  snapshotRequestClipboard,
  snapshotSubjectForTrade,
} from "@/lib/email-request";
import { contactEmail, productionOrigin } from "@/lib/site";
import {
  snapshotFieldsComplete,
  snapshotFormPageEndpoint,
  snapshotSendErrorMessage,
  snapshotSentMessage,
  snapshotValidationMessage,
  snapshotWebsiteValue,
} from "@/lib/snapshot-form";

function subscribeSent() {
  return () => {};
}

function sentFromRedirect() {
  return new URLSearchParams(window.location.search).get("sent") === "1";
}

function sentOnServer() {
  return false;
}

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
  const returned = useSyncExternalStore(subscribeSent, sentFromRedirect, sentOnServer);
  const trade = useHomeServiceTradeParam();
  const serviceValue = service ?? trade?.service ?? "";

  const fields = {
    business: business.trim(),
    city: city.trim(),
    service: serviceValue.trim(),
    website: snapshotWebsiteValue(website),
    email: email.trim(),
  };
  const ready = snapshotFieldsComplete(fields);
  const subject = snapshotSubjectForTrade(trade?.service);
  const mailto = snapshotMailto(contactEmail, snapshotRequestBody(fields), subject);

  function writeWebsite(form: HTMLFormElement) {
    const input = form.elements.namedItem("Website");
    if (!(input instanceof HTMLInputElement)) return "";
    const next = snapshotWebsiteValue(input.value);
    if (next !== input.value) input.value = next;
    if (next !== website) setWebsite(next);
    return next;
  }

  function onSubmitClick(event: React.MouseEvent<HTMLButtonElement>) {
    const form = event.currentTarget.form;
    if (!form) return;
    writeWebsite(form);
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLock.current || phase === "sent" || returned) return;

    const form = event.currentTarget;
    const websiteValue = writeWebsite(form);
    const posted = { ...fields, website: websiteValue };
    if (!form.checkValidity() || !snapshotFieldsComplete(posted)) {
      setValidationMessage(snapshotValidationMessage);
      setPhase("idle");
      form.reportValidity();
      return;
    }

    const honeyInput = form.elements.namedItem("_honey");
    const honey = honeyInput instanceof HTMLInputElement ? honeyInput.value : "";
    if (honey.trim()) {
      submitLock.current = true;
      setValidationMessage("");
      setPhase("sent");
      return;
    }
    if (honeyInput instanceof HTMLInputElement) honeyInput.disabled = true;

    submitLock.current = true;
    setValidationMessage("");
    setPhase("sending");
    const next = form.elements.namedItem("_next");
    if (next instanceof HTMLInputElement) {
      next.value = new URL("/free-snapshot/thanks", window.location.origin).toString();
    }
    try {
      form.submit();
    } catch {
      submitLock.current = false;
      setPhase("error");
    }
  }

  const sent = phase === "sent" || returned;

  return (
    <form
      id="snapshot"
      action={snapshotFormPageEndpoint}
      method="POST"
      onSubmit={onSubmit}
      className="scroll-mt-24 space-y-3"
    >
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
          type="url"
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
      <input
        type="hidden"
        name="_next"
        value={`${productionOrigin}/free-snapshot/thanks`}
      />
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
      <p id="snapshot-privacy" className="text-xs leading-5 text-ink-soft">
        We email the snapshot to this address. We do not sell emails.{" "}
        <Link href="/privacy" className="text-forest underline">
          Privacy
        </Link>
        .
      </p>
      <button
        type="submit"
        aria-describedby="snapshot-privacy"
        onClick={onSubmitClick}
        disabled={phase === "sending" || sent}
        className="flex h-12 w-full items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {phase === "sending"
          ? "Sending…"
          : sent
            ? "Request sent"
            : "Get a free AI Answer Snapshot"}
      </button>
      {validationMessage ? (
        <p role="alert" className="text-sm leading-6 text-ink">
          {validationMessage}
        </p>
      ) : null}
      {sent ? (
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
        {contactEmail} through FlowForm. No account and no paid checkout.
        If that send fails, use the email button or the copy buttons. AI
        answers vary run to run. This is a snapshot, not a ranking.
      </p>
    </form>
  );
}
