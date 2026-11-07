"use client";

import { useRef, useState } from "react";
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
  snapshotFieldErrors,
  snapshotFieldsComplete,
  snapshotFormPageEndpoint,
  snapshotSendErrorMessage,
  snapshotSentMessage,
  snapshotSourceValue,
  snapshotValidationMessage,
  snapshotWebsiteValue,
} from "@/lib/snapshot-form";

const fieldClass =
  "mt-1 h-11 w-full rounded-lg border border-rule bg-cream px-3 text-ink placeholder:text-ink-soft";

function describedBy(hintId: string, errorId?: string) {
  return [hintId, errorId].filter(Boolean).join(" ");
}

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex items-baseline justify-between gap-3 text-sm font-medium">
      <span>{children}</span>
      <span className="shrink-0 text-xs font-normal text-ink-soft">Required</span>
    </label>
  );
}

type FieldKey = "business" | "city" | "service" | "website" | "email";

const fieldIds: Record<FieldKey, string> = {
  business: "snapshot-business",
  city: "snapshot-city",
  service: "snapshot-service",
  website: "snapshot-website",
  email: "snapshot-email",
};

export function SnapshotRequestForm({
  defaultService,
  source,
}: {
  /** Prefills Service when the page is already about one trade. */
  defaultService?: string;
  /** Page path posted as a hidden source field. */
  source?: string;
} = {}) {
  const [business, setBusiness] = useState("");
  const [city, setCity] = useState("");
  // null means the visitor has not edited service, so the page trade or ?trade= can fill it.
  const [service, setService] = useState<string | null>(null);
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [validationMessage, setValidationMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const submitLock = useRef(false);
  const trade = useHomeServiceTradeParam();
  const pageService = defaultService?.trim() ?? "";
  const sourceValue = snapshotSourceValue(source);
  // The page trade wins over ?trade=. A citation guide has neither until the URL has one.
  const serviceValue = service ?? (pageService || trade?.service || "");

  const fields = {
    business: business.trim(),
    city: city.trim(),
    service: serviceValue.trim(),
    website: snapshotWebsiteValue(website),
    email: email.trim(),
  };
  const ready = snapshotFieldsComplete(fields);
  const subject = snapshotSubjectForTrade(pageService || trade?.service);
  const requestFields = sourceValue ? { ...fields, source: sourceValue } : fields;
  const mailto = snapshotMailto(contactEmail, snapshotRequestBody(requestFields), subject);

  function writeWebsite(form: HTMLFormElement) {
    const input = form.elements.namedItem("Website");
    if (!(input instanceof HTMLInputElement)) return "";
    const next = snapshotWebsiteValue(input.value);
    if (next !== input.value) input.value = next;
    if (next !== website) setWebsite(next);
    return next;
  }

  function clearFieldError(key: FieldKey) {
    setFieldErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function revealErrors(websiteValue: string) {
    const errors = snapshotFieldErrors({ ...fields, website: websiteValue });
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) setValidationMessage(snapshotValidationMessage);
    return errors;
  }

  function onInvalid(event: React.FormEvent<HTMLInputElement>) {
    const form = event.currentTarget.form;
    const websiteValue = form ? writeWebsite(form) : snapshotWebsiteValue(website);
    revealErrors(websiteValue);
  }

  function onSubmitClick(event: React.MouseEvent<HTMLButtonElement>) {
    const form = event.currentTarget.form;
    if (!form) return;
    revealErrors(writeWebsite(form));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLock.current || phase === "sent") return;

    const form = event.currentTarget;
    const websiteValue = writeWebsite(form);
    const posted = { ...fields, website: websiteValue };
    const errors = snapshotFieldErrors(posted);
    if (!form.checkValidity() || Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setValidationMessage(snapshotValidationMessage);
      setPhase("idle");
      const first = (Object.keys(fieldIds) as FieldKey[]).find((key) => errors[key]);
      if (first) {
        const invalid = document.getElementById(fieldIds[first]);
        if (invalid instanceof HTMLInputElement) invalid.focus();
      }
      form.reportValidity();
      return;
    }
    setFieldErrors({});

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
      next.value = new URL("/thank-you", window.location.origin).toString();
    }
    try {
      form.submit();
    } catch {
      submitLock.current = false;
      setPhase("error");
    }
  }

  const sent = phase === "sent";

  return (
    <form
      id="snapshot"
      action={snapshotFormPageEndpoint}
      method="POST"
      onSubmit={onSubmit}
      className="scroll-mt-24 space-y-3"
    >
      <p id="snapshot-required-note" className="text-sm leading-6 text-ink-soft">
        All fields are required.
      </p>
      <div>
        <FieldLabel htmlFor="snapshot-business">Business name</FieldLabel>
        <input
          id="snapshot-business"
          name="Business name"
          required
          autoComplete="organization"
          onInvalid={onInvalid}
          aria-invalid={fieldErrors.business ? true : undefined}
          aria-describedby={describedBy(
            "snapshot-required-note",
            fieldErrors.business ? "snapshot-business-error" : undefined,
          )}
          value={business}
          onChange={(event) => {
            setBusiness(event.target.value);
            clearFieldError("business");
          }}
          className={fieldClass}
        />
        {fieldErrors.business ? (
          <p id="snapshot-business-error" className="mt-1 text-sm leading-6 text-ink">
            {fieldErrors.business}
          </p>
        ) : null}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="snapshot-city">City</FieldLabel>
          <input
            id="snapshot-city"
            name="City"
            required
            autoComplete="address-level2"
            onInvalid={onInvalid}
            aria-invalid={fieldErrors.city ? true : undefined}
            aria-describedby={describedBy(
              "snapshot-required-note",
              fieldErrors.city ? "snapshot-city-error" : undefined,
            )}
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
              clearFieldError("city");
            }}
            className={fieldClass}
          />
          {fieldErrors.city ? (
            <p id="snapshot-city-error" className="mt-1 text-sm leading-6 text-ink">
              {fieldErrors.city}
            </p>
          ) : null}
        </div>
        <div>
          <FieldLabel htmlFor="snapshot-service">Service</FieldLabel>
          <input
            id="snapshot-service"
            name="Service"
            required
            autoComplete="off"
            onInvalid={onInvalid}
            placeholder="Plumber"
            aria-invalid={fieldErrors.service ? true : undefined}
            aria-describedby={describedBy(
              "snapshot-required-note",
              fieldErrors.service ? "snapshot-service-error" : undefined,
            )}
            value={serviceValue}
            onChange={(event) => {
              setService(event.target.value);
              clearFieldError("service");
            }}
            className={fieldClass}
          />
          {fieldErrors.service ? (
            <p id="snapshot-service-error" className="mt-1 text-sm leading-6 text-ink">
              {fieldErrors.service}
            </p>
          ) : null}
        </div>
      </div>
      <div>
        <FieldLabel htmlFor="snapshot-website">Website</FieldLabel>
        <input
          id="snapshot-website"
          name="Website"
          type="url"
          inputMode="url"
          required
          autoComplete="url"
          onInvalid={onInvalid}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder="https://"
          aria-invalid={fieldErrors.website ? true : undefined}
          aria-describedby={describedBy(
            "snapshot-required-note",
            fieldErrors.website ? "snapshot-website-error" : undefined,
          )}
          value={website}
          onChange={(event) => {
            setWebsite(event.target.value);
            clearFieldError("website");
          }}
          className={fieldClass}
        />
        {fieldErrors.website ? (
          <p id="snapshot-website-error" className="mt-1 text-sm leading-6 text-ink">
            {fieldErrors.website}
          </p>
        ) : null}
      </div>
      <div>
        <FieldLabel htmlFor="snapshot-email">Email</FieldLabel>
        <input
          id="snapshot-email"
          name="Email"
          type="email"
          inputMode="email"
          required
          autoComplete="email"
          onInvalid={onInvalid}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          aria-invalid={fieldErrors.email ? true : undefined}
          aria-describedby={describedBy(
            "snapshot-privacy",
            fieldErrors.email ? "snapshot-email-error" : undefined,
          )}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            clearFieldError("email");
          }}
          className={fieldClass}
        />
        {fieldErrors.email ? (
          <p id="snapshot-email-error" className="mt-1 text-sm leading-6 text-ink">
            {fieldErrors.email}
          </p>
        ) : null}
      </div>
      {sourceValue ? <input type="hidden" name="source" value={sourceValue} /> : null}
      <input type="hidden" name="_subject" value={SNAPSHOT_SUBJECT} />
      <input
        type="hidden"
        name="_next"
        value={`${productionOrigin}/thank-you`}
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
      <p
        id="snapshot-privacy"
        className="rounded-lg border border-rule bg-paper px-3 py-2 text-sm leading-6 text-ink-soft"
      >
        We email the snapshot to this address. We do not ask for passwords, cookies, or content behind a login. We do not sell emails.{" "}
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
        requestText={snapshotRequestClipboard(contactEmail, requestFields, subject)}
        requestReady={ready}
      />
      <p className="text-xs leading-5 text-ink-soft">
        Sends the business name, city, service, website, and email to{" "}
        {contactEmail} through FlowForm.
        {sourceValue ? " This page path is included." : ""} No account and no
        paid checkout. If that send fails, use the email button or the copy
        buttons. AI answers vary run to run. This is a snapshot, not a
        ranking, and not a promise that any assistant will name the business.
      </p>
    </form>
  );
}
