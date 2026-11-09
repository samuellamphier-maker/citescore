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
import { contactEmail, fixPackPageLinkLabel, productionOrigin } from "@/lib/site";
import {
  postSnapshotForm,
  snapshotBusinessPrefill,
  snapshotDeliveredToMessage,
  snapshotFieldErrors,
  snapshotFieldsComplete,
  snapshotFormPageEndpoint,
  snapshotSendErrorMessage,
  snapshotSentMessage,
  snapshotSourceValue,
  snapshotValidationMessage,
  snapshotWebsiteAccepted,
  snapshotWebsitePrefill,
  snapshotWebsiteValue,
} from "@/lib/snapshot-form";

const fieldClass =
  "mt-1 h-11 w-full rounded-lg border border-rule bg-cream px-3 text-ink placeholder:text-ink-soft";

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
  defaultWebsite,
  defaultBusiness,
  source,
  caveat = true,
  deliveryNote = true,
  serviceNote = false,
}: {
  /** Prefills Service when the page is already about one trade. */
  defaultService?: string;
  /** Website carried from the signal check. Invalid values stay blank. */
  defaultWebsite?: string;
  /** Business name carried from the checked homepage title. */
  defaultBusiness?: string;
  /** Page path posted as a hidden source field. */
  source?: string;
  /** Omit when the page already states that answers vary and this is not a ranking. */
  caveat?: boolean;
  /** Omit when the page already says where the form sends the fields. */
  deliveryNote?: boolean;
  /** Explain a service value carried from another page. Guide forms already name the trade. */
  serviceNote?: boolean;
} = {}) {
  const carriedWebsite = snapshotWebsitePrefill(defaultWebsite);
  const carriedBusiness = snapshotBusinessPrefill(defaultBusiness);
  const [business, setBusiness] = useState(carriedBusiness);
  const [city, setCity] = useState("");
  // null means the visitor has not edited service, so the page trade or ?trade= can fill it.
  const [service, setService] = useState<string | null>(null);
  const [website, setWebsite] = useState(carriedWebsite);
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [sentEmail, setSentEmail] = useState("");
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

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLock.current || phase === "sent") return;

    const form = event.currentTarget;
    const websiteValue = writeWebsite(form);
    const posted = { ...fields, website: websiteValue };
    const errors = snapshotFieldErrors(posted);
    if (Object.keys(errors).length > 0) {
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
      setSentEmail(posted.email.trim());
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
    const result = await postSnapshotForm(
      posted,
      sourceValue || undefined,
      (url, init) =>
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
    setSentEmail(posted.email.trim());
    setPhase("sent");
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
      {carriedWebsite || carriedBusiness ? (
        <p id="snapshot-prefill" className="text-sm leading-6 text-ink-soft">
          Filled in from the site you checked. Change anything that is wrong.
        </p>
      ) : null}
      {serviceNote && pageService ? (
        <p id="snapshot-service-prefill" className="text-sm leading-6 text-ink-soft">
          Service filled in from the page you came from. Change anything that is wrong.
        </p>
      ) : null}
      <div>
        <FieldLabel htmlFor="snapshot-business">Business name</FieldLabel>
        <input
          id="snapshot-business"
          name="Business name"
          required
          autoComplete="organization"
          autoFocus={Boolean(carriedWebsite) && !carriedBusiness}
          onInvalid={onInvalid}
          aria-invalid={fieldErrors.business ? true : undefined}
          aria-describedby={describedBy(
            "snapshot-required-note",
            carriedWebsite || carriedBusiness ? "snapshot-prefill" : undefined,
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
            autoFocus={Boolean(carriedBusiness)}
            onInvalid={onInvalid}
            aria-invalid={fieldErrors.city ? true : undefined}
            aria-describedby={describedBy(
              "snapshot-required-note",
              carriedBusiness ? "snapshot-prefill" : undefined,
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
              serviceNote && pageService ? "snapshot-service-prefill" : undefined,
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
            carriedWebsite ? "snapshot-prefill" : undefined,
            fieldErrors.website ? "snapshot-website-error" : undefined,
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
        <div
          id="snapshot-received"
          role="status"
          aria-live="polite"
          className="rounded-lg border border-rule bg-paper px-3 py-3 text-sm leading-6 text-ink"
        >
          <p className="font-medium text-forest">{snapshotSentMessage}</p>
          {sentEmail ? <p className="mt-2">{snapshotDeliveredToMessage(sentEmail)}</p> : null}
          <p className="mt-2 text-ink-soft">
            The CiteScore Team prepares the one-page snapshot and emails it.
          </p>
          <p className="mt-4 font-medium text-ink">What happens next</p>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-ink-soft">
            <li>
              FlowForm delivers the business name, city, service, website, and email. No account and no paid checkout.
            </li>
            <li>
              The CiteScore Team asks logged-out ChatGPT and Perplexity who they
              name for that trade and city, and records who is named.
            </li>
            <li>
              The CiteScore Team emails the one-page snapshot: who is named,
              which sources are cited, and how the Google rating and review
              count compare. A real snapshot prints the day the prompts were
              asked. There is no set delivery time.
            </li>
          </ol>
          <p className="mt-3 text-ink-soft">
            AI answers vary run to run. This is a snapshot, not a ranking.
          </p>
          <p className="mt-3">
            <Link href="/sample-snapshot" className="font-medium text-forest underline">
              See an example snapshot
            </Link>
            <span className="text-ink-soft">
              . Fictional business, illustrative numbers. Not a customer result,
              and not a live ChatGPT or Perplexity answer.
            </span>
          </p>
          <p className="mt-2">
            <Link href="/fix-pack" className="font-medium text-forest underline">
              {fixPackPageLinkLabel()}
            </Link>
          </p>
        </div>
      ) : null}
      {phase === "error" ? (
        <p id="snapshot-send-error" role="alert" className="text-sm leading-6 text-ink">
          {snapshotSendErrorMessage} Email{" "}
          <a href={`mailto:${contactEmail}`} className="text-forest underline">
            {contactEmail}
          </a>
          .
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
        {deliveryNote ? (
          <>
            Sends the business name, city, service, website, and email to{" "}
            {contactEmail} through FlowForm.
            {sourceValue ? " This page path is included." : ""} No account and no paid checkout.{" "}
          </>
        ) : null}
        If that send fails, use the email button or the copy buttons.
        {caveat ? (
          <>
            {" "}
            AI answers vary run to run. This is a snapshot, not a ranking, and
            not a promise that any assistant will name the business.
          </>
        ) : null}
      </p>
    </form>
  );
}
