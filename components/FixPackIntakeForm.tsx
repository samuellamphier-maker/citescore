"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { EmailRequestFallback } from "@/components/EmailRequestFallback";
import {
  FIX_PACK_DETAILS_SUBJECT,
  FIX_PACK_INTAKE_NOTE,
  fixPackDetailsMailto,
  fixPackDetailsRequestText,
} from "@/lib/email-request";
import {
  fixPackIntakeFieldErrors,
  fixPackIntakeSendErrorMessage,
  fixPackIntakeSentLead,
  postFixPackIntake,
} from "@/lib/fix-pack-intake";
import { contactEmail, productionOrigin } from "@/lib/site";
import {
  snapshotFormPageEndpoint,
  snapshotWebsiteAccepted,
  snapshotWebsiteValue,
} from "@/lib/snapshot-form";

const fieldClass =
  "mt-1 h-11 w-full rounded-lg border border-rule bg-cream px-3 text-ink placeholder:text-ink-soft";

const fieldIds = {
  business: "fix-pack-business",
  city: "fix-pack-city",
  service: "fix-pack-service",
  website: "fix-pack-website",
  email: "fix-pack-email",
} as const;

type FieldKey = keyof typeof fieldIds;

function describedBy(...ids: Array<string | undefined>) {
  return ids.filter(Boolean).join(" ");
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

export function FixPackIntakeForm({ initialSent = false }: { initialSent?: boolean }) {
  const [business, setBusiness] = useState("");
  const [city, setCity] = useState("");
  const [service, setService] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [validationMessage, setValidationMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const submitLock = useRef(false);

  const fields = {
    business: business.trim(),
    city: city.trim(),
    service: service.trim(),
    website: snapshotWebsiteAccepted(website) ? snapshotWebsiteValue(website) : website.trim(),
    email: email.trim(),
  };
  const mailto = fixPackDetailsMailto(contactEmail, fields);
  const requestText = fixPackDetailsRequestText(contactEmail, fields);
  const showSent = phase === "sent" || (initialSent && phase !== "error" && phase !== "sending");

  function writeWebsite(form: HTMLFormElement) {
    const input = form.elements.namedItem("Public site URL");
    if (!(input instanceof HTMLInputElement)) return "";
    const next = snapshotWebsiteValue(input.value);
    if (snapshotWebsiteAccepted(input.value)) {
      if (next !== input.value) input.value = next;
      if (next !== website) setWebsite(next);
    }
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
    const errors = fixPackIntakeFieldErrors({ ...fields, website: websiteValue });
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setValidationMessage("Enter a business name, city, main service, public site URL, and email.");
    }
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

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLock.current || phase === "sent") return;

    const form = event.currentTarget;
    const websiteValue = writeWebsite(form);
    const posted = { ...fields, website: websiteValue };
    const errors = fixPackIntakeFieldErrors(posted);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setValidationMessage("Enter a business name, city, main service, public site URL, and email.");
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
    const result = await postFixPackIntake(posted, (url, init) =>
      fetch(url, init).then((response) => ({
        status: response.status,
        json: () => response.json() as Promise<unknown>,
      })),
    );
    if (result !== "sent") {
      submitLock.current = false;
      setPhase("error");
      return;
    }
    setPhase("sent");
  }

  return (
    <form
      id="fix-pack-intake"
      action={snapshotFormPageEndpoint}
      method="POST"
      onSubmit={onSubmit}
      className="scroll-mt-24 space-y-3"
    >
      <p id="fix-pack-required-note" className="text-sm leading-6 text-ink-soft">
        All fields are required.
      </p>
      <div>
        <FieldLabel htmlFor="fix-pack-business">Business name</FieldLabel>
        <input
          id="fix-pack-business"
          name="Business name"
          required
          autoComplete="organization"
          autoFocus
          onInvalid={onInvalid}
          aria-invalid={fieldErrors.business ? true : undefined}
          aria-describedby={describedBy(
            "fix-pack-required-note",
            fieldErrors.business ? "fix-pack-business-error" : undefined,
          )}
          value={business}
          onChange={(event) => {
            setBusiness(event.target.value);
            clearFieldError("business");
          }}
          className={fieldClass}
        />
        {fieldErrors.business ? (
          <p id="fix-pack-business-error" className="mt-1 text-sm leading-6 text-ink">
            {fieldErrors.business}
          </p>
        ) : null}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="fix-pack-city">City</FieldLabel>
          <input
            id="fix-pack-city"
            name="City"
            required
            autoComplete="address-level2"
            onInvalid={onInvalid}
            aria-invalid={fieldErrors.city ? true : undefined}
            aria-describedby={describedBy(
              "fix-pack-required-note",
              fieldErrors.city ? "fix-pack-city-error" : undefined,
            )}
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
              clearFieldError("city");
            }}
            className={fieldClass}
          />
          {fieldErrors.city ? (
            <p id="fix-pack-city-error" className="mt-1 text-sm leading-6 text-ink">
              {fieldErrors.city}
            </p>
          ) : null}
        </div>
        <div>
          <FieldLabel htmlFor="fix-pack-service">Main service</FieldLabel>
          <input
            id="fix-pack-service"
            name="Main service"
            required
            autoComplete="off"
            onInvalid={onInvalid}
            placeholder="Plumber"
            aria-invalid={fieldErrors.service ? true : undefined}
            aria-describedby={describedBy(
              "fix-pack-required-note",
              fieldErrors.service ? "fix-pack-service-error" : undefined,
            )}
            value={service}
            onChange={(event) => {
              setService(event.target.value);
              clearFieldError("service");
            }}
            className={fieldClass}
          />
          {fieldErrors.service ? (
            <p id="fix-pack-service-error" className="mt-1 text-sm leading-6 text-ink">
              {fieldErrors.service}
            </p>
          ) : null}
        </div>
      </div>
      <div>
        <FieldLabel htmlFor="fix-pack-website">Public site URL</FieldLabel>
        <input
          id="fix-pack-website"
          name="Public site URL"
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
            "fix-pack-required-note",
            fieldErrors.website ? "fix-pack-website-error" : undefined,
          )}
          value={website}
          onBlur={(event) => {
            if (!snapshotWebsiteAccepted(event.target.value)) return;
            const next = snapshotWebsiteValue(event.target.value);
            if (next !== website) setWebsite(next);
          }}
          onChange={(event) => {
            setWebsite(event.target.value);
            clearFieldError("website");
          }}
          className={fieldClass}
        />
        {fieldErrors.website ? (
          <p id="fix-pack-website-error" className="mt-1 text-sm leading-6 text-ink">
            {fieldErrors.website}
          </p>
        ) : null}
      </div>
      <div>
        <FieldLabel htmlFor="fix-pack-email">Email</FieldLabel>
        <input
          id="fix-pack-email"
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
            "fix-pack-privacy",
            fieldErrors.email ? "fix-pack-email-error" : undefined,
          )}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            clearFieldError("email");
          }}
          className={fieldClass}
        />
        {fieldErrors.email ? (
          <p id="fix-pack-email-error" className="mt-1 text-sm leading-6 text-ink">
            {fieldErrors.email}
          </p>
        ) : null}
      </div>
      <input type="hidden" name="_subject" value={FIX_PACK_DETAILS_SUBJECT} />
      <input type="hidden" name="Request" value={FIX_PACK_INTAKE_NOTE} />
      <input type="hidden" name="source" value="/fix-pack/next-steps" />
      <input
        type="hidden"
        name="_next"
        value={`${productionOrigin}/fix-pack/next-steps?sent=1`}
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
        id="fix-pack-privacy"
        className="rounded-lg border border-rule bg-paper px-3 py-2 text-sm leading-6 text-ink-soft"
      >
        The button sends the business name, city, main service, public site URL, and email to {contactEmail} through FlowForm. The subject is “{FIX_PACK_DETAILS_SUBJECT}.” This is not a new free AI Answer Snapshot request. We do not ask for passwords, cookies, or pages behind a login. We do not sell emails.{" "}
        <Link href="/privacy" className="text-forest underline">
          Privacy
        </Link>
        .
      </p>
      <button
        type="submit"
        aria-describedby="fix-pack-privacy"
        onClick={onSubmitClick}
        disabled={phase === "sending" || phase === "sent"}
        className="flex h-12 w-full items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {phase === "sending" ? "Sending…" : phase === "sent" ? "Details sent" : "Send Fix Pack details"}
      </button>
      {validationMessage ? (
        <p role="alert" className="text-sm leading-6 text-ink">
          {validationMessage}
        </p>
      ) : null}
      {showSent ? (
        <div
          id="fix-pack-received"
          role="status"
          aria-live="polite"
          className="rounded-lg border border-rule bg-paper px-3 py-3 text-sm leading-6 text-ink"
        >
          <p className="font-medium text-forest">{fixPackIntakeSentLead}</p>
          <p className="mt-2">
            We email the Fix Pack within a few business days after payment, once we have the business name, city, service, and public site URL.
          </p>
          <p className="mt-2">
            Full refund within 14 days of delivery if the Fix Pack is not useful.
          </p>
          <p className="mt-2">
            It is not a promise that any assistant will name the business.
          </p>
          <p className="mt-2">Do not send passwords, cookies, or pages behind a login.</p>
        </div>
      ) : null}
      {phase === "error" ? (
        <p id="fix-pack-send-error" role="alert" className="text-sm leading-6 text-ink">
          {fixPackIntakeSendErrorMessage} Email{" "}
          <a href={`mailto:${contactEmail}`} className="text-forest underline">
            {contactEmail}
          </a>
          .
        </p>
      ) : null}
      <a
        id="fix-pack-mailto"
        href={mailto}
        aria-describedby={phase === "error" ? "fix-pack-send-error" : undefined}
        className="flex h-12 w-full items-center justify-center rounded-lg border border-ink/25 bg-cream px-5 text-base font-medium text-ink hover:border-ink"
      >
        Email these details instead
      </a>
      <EmailRequestFallback requestText={requestText} />
      <p className="text-xs leading-5 text-ink-soft">
        If that send fails, use the email button or the copy buttons. The email and the copied text include the same fields.
      </p>
    </form>
  );
}
