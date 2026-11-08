import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { SNAPSHOT_SUBJECT } from "./email-request.ts";
import {
  freeSnapshotRequestHref,
  snapshotBusinessPrefill,
  snapshotFieldErrors,
  snapshotFieldsComplete,
  snapshotFormEncoded,
  snapshotFormPageEndpoint,
  snapshotFormPayload,
  snapshotFormProvider,
  snapshotSendErrorMessage,
  snapshotSentMessage,
  snapshotSourceValue,
  snapshotSubmitSucceeded,
  snapshotWebsitePrefill,
  snapshotWebsiteValue,
} from "./snapshot-form.ts";

const fields = {
  business: " CiteScore Team activation test ",
  city: " Riverton ",
  service: " plumber ",
  website: " https://example-plumbing.example ",
  email: " citescore@mail.grokbot.com ",
};

test("snapshot payload posts the visitor fields through FlowForm", () => {
  assert.equal(snapshotFormProvider, "FlowForm");
  assert.equal(SNAPSHOT_SUBJECT, "Free AI Answer Snapshot");
  assert.equal(
    snapshotFormPageEndpoint,
    "https://flowform.to/citescore@mail.grokbot.com",
  );
  const payload = snapshotFormPayload(fields);
  assert.equal(payload._subject, "Free AI Answer Snapshot");
  assert.equal(payload._replyto, "citescore@mail.grokbot.com");
  assert.equal(payload["Business name"], "CiteScore Team activation test");
  assert.equal(payload.City, "Riverton");
  assert.equal(payload.Service, "plumber");
  assert.equal(payload.Website, "https://example-plumbing.example");
  assert.equal(payload.Email, "citescore@mail.grokbot.com");
  const encoded = snapshotFormEncoded(fields);
  assert.match(encoded, /_subject=Free\+AI\+Answer\+Snapshot/);
  assert.doesNotMatch(encoded, /_honey/);
  assert.equal(snapshotFieldsComplete(fields), true);
  assert.equal(snapshotWebsiteValue(" example.com "), "https://example.com");
  assert.equal(snapshotWebsiteValue("http://example.com"), "http://example.com");
  assert.equal(snapshotWebsiteValue("  "), "");
  assert.equal(
    snapshotFieldsComplete({ ...fields, website: "  " }),
    false,
  );
  assert.equal(
    snapshotFieldsComplete({ ...fields, email: "not-an-email" }),
    false,
  );
  assert.deepEqual(snapshotFieldErrors(fields), {});
  assert.deepEqual(
    snapshotFieldErrors({
      business: " ",
      city: "",
      service: "",
      website: " ",
      email: "not-an-email",
    }),
    {
      business: "Enter a business name.",
      city: "Enter a city.",
      service: "Enter a service.",
      website: "Enter a website.",
      email: "Enter an email address.",
    },
  );
  assert.equal(snapshotSubmitSucceeded(200, { success: "true" }), true);
  assert.equal(snapshotSubmitSucceeded(200, { success: true }), true);
  assert.equal(
    snapshotSubmitSucceeded(200, {
      success: "false",
      message: "This form needs Activation",
    }),
    false,
  );
  assert.equal(snapshotSubmitSucceeded(422, { success: "true" }), false);
  assert.equal(snapshotSentMessage, "Request sent. We reply with your one-page snapshot by email.");
  assert.match(snapshotSendErrorMessage, /email button/);
});

test("privacy names FlowForm and the fields that are sent", () => {
  const privacy = readFileSync(new URL("../app/privacy/page.tsx", import.meta.url), "utf8");
  assert.match(privacy, /through FlowForm to \{contactEmail\}/);
  assert.match(privacy, /business name, city,\s+service, website, and email/);
  assert.match(privacy, /page path/);
  assert.match(privacy, /honeypot/);
  assert.match(privacy, /reply-to address/);
  assert.doesNotMatch(privacy, /captcha is turned off/);
  assert.doesNotMatch(privacy, /does not post to a server/);
});

test("the request form posts, keeps mailto, and requires the website", () => {
  const form = readFileSync(
    new URL("../components/SnapshotRequestForm.tsx", import.meta.url),
    "utf8",
  );
  assert.match(form, /snapshotFormPageEndpoint/);
  assert.match(form, /name="_next"/);
  assert.match(form, /\/thank-you/);
  assert.doesNotMatch(form, /free-snapshot\/thanks/);
  assert.doesNotMatch(form, /free-snapshot\?sent=1/);
  assert.match(form, /form\.submit\(\)/);
  assert.match(form, /snapshotMailto/);
  assert.match(form, /Email this request instead/);
  assert.match(form, /name="_honey"/);
  assert.match(form, /name="_subject"/);
  assert.doesNotMatch(form, /name="_captcha"/);
  assert.match(form, /name="Website"/);
  assert.match(form, /type="url"/);
  assert.match(form, /type="email"/);
  assert.match(form, /inputMode="email"/);
  assert.match(form, /aria-invalid=\{fieldErrors\.email \? true : undefined\}/);
  assert.match(form, /snapshotFieldErrors/);
  assert.match(form, /autoComplete="organization"/);
  assert.match(form, /autoComplete="address-level2"/);
  assert.match(form, /autoComplete="url"/);
  assert.match(form, /autoComplete="email"/);
  assert.match(form, /htmlFor="snapshot-business"/);
  assert.match(form, /htmlFor="snapshot-city"/);
  assert.match(form, /htmlFor="snapshot-service"/);
  assert.match(form, /htmlFor="snapshot-website"/);
  assert.match(form, /htmlFor="snapshot-email"/);
  for (const id of [
    "snapshot-business",
    "snapshot-city",
    "snapshot-service",
    "snapshot-website",
    "snapshot-email",
  ]) {
    assert.match(form, new RegExp(`htmlFor="${id}"`));
    assert.match(form, new RegExp(`id="${id}"`));
  }
  assert.match(form, /href="\/privacy"/);
  assert.match(form, /We do not sell emails/);
  assert.match(form, /All fields are required/);
  assert.match(form, /We do not ask for passwords, cookies, or content behind a login/);
  assert.match(form, />Required</);
  assert.match(form, /snapshotWebsiteValue/);
  assert.doesNotMatch(form, /noValidate/);
  assert.match(form, /required/);
  assert.match(form, /snapshotSentMessage/);
  assert.match(form, /snapshotSendErrorMessage/);
  assert.match(form, /EmailRequestFallback/);
  assert.doesNotMatch(form, /useSearchParams|useEffect/);
  assert.match(form, /name="source"/);
  assert.match(form, /defaultService/);
  assert.match(form, /defaultWebsite/);
  assert.match(form, /defaultBusiness/);
  assert.match(form, /snapshotWebsitePrefill/);
  assert.match(form, /snapshotBusinessPrefill/);
  assert.match(form, /id="snapshot-prefill"/);
  assert.match(form, /snapshotSourceValue/);
  assert.match(form, /pageService \|\| trade\?\.service/);
});

test("a checked site can be carried into the snapshot request", () => {
  assert.equal(snapshotWebsitePrefill(" https://example.com/ "), "https://example.com");
  assert.equal(snapshotWebsitePrefill("example.com"), "https://example.com");
  assert.equal(
    snapshotWebsitePrefill("http://example.com/services/"),
    "http://example.com/services",
  );
  assert.equal(
    snapshotWebsitePrefill("https://example.com/a?utm=1#section"),
    "https://example.com/a",
  );
  assert.equal(snapshotWebsitePrefill("https://user:pass@example.com/path"), "");
  assert.equal(snapshotWebsitePrefill("javascript:alert(1)"), "");
  assert.equal(snapshotWebsitePrefill("http://localhost/admin"), "");
  assert.equal(snapshotWebsitePrefill("https://printer.local"), "");
  assert.equal(snapshotWebsitePrefill(""), "");
  assert.equal(snapshotWebsitePrefill(null), "");
  assert.equal(snapshotWebsitePrefill("not a url"), "");
  assert.equal(
    snapshotWebsitePrefill(snapshotWebsitePrefill("https://example.com/path/")),
    "https://example.com/path",
  );

  assert.equal(snapshotBusinessPrefill(" Acme Plumbing "), "Acme Plumbing");
  assert.equal(snapshotBusinessPrefill("Acme   Plumbing\nCo"), "Acme Plumbing Co");
  assert.equal(snapshotBusinessPrefill("Home | Acme &amp; Sons"), "Acme & Sons");
  assert.equal(snapshotBusinessPrefill("Welcome"), "");
  assert.equal(snapshotBusinessPrefill("Home"), "");
  assert.equal(snapshotBusinessPrefill("https://example.com"), "");
  assert.equal(snapshotBusinessPrefill("<script>alert(1)</script>"), "");
  assert.equal(snapshotBusinessPrefill("x".repeat(501)), "");
  assert.equal(
    snapshotBusinessPrefill(
      "Acme Plumbing | 24/7 emergency plumber in a city name that is far too long to use as a business name",
    ),
    "Acme Plumbing",
  );
  assert.equal(snapshotBusinessPrefill("A".repeat(81)), "");

  assert.equal(freeSnapshotRequestHref(), "/free-snapshot");
  assert.equal(freeSnapshotRequestHref({ website: "not a url" }), "/free-snapshot");
  assert.equal(
    freeSnapshotRequestHref({ website: "example.com" }),
    "/free-snapshot?website=https%3A%2F%2Fexample.com",
  );
  assert.equal(
    freeSnapshotRequestHref({
      website: "https://example.com/path?utm=1#section",
      business: "Home | Acme &amp; Sons",
    }),
    "/free-snapshot?website=https%3A%2F%2Fexample.com%2Fpath&business=Acme+%26+Sons",
  );
});

test("a guide form can post its page path and drops unsafe source values", () => {
  assert.equal(
    snapshotSourceValue("/ai-search-visibility-for-plumbers"),
    "/ai-search-visibility-for-plumbers",
  );
  assert.equal(snapshotSourceValue("/how-to-get-cited-by-chatgpt"), "/how-to-get-cited-by-chatgpt");
  assert.equal(snapshotSourceValue(" https://evil.example/path "), "");
  assert.equal(snapshotSourceValue("/free-snapshot?trade=plumber"), "");
  assert.equal(snapshotSourceValue("//evil.example"), "");
  assert.equal(snapshotSourceValue("plumber"), "");
  assert.equal(snapshotSourceValue(undefined), "");
  const withSource = snapshotFormPayload(fields, "/ai-search-visibility-for-plumbers");
  assert.equal(withSource.source, "/ai-search-visibility-for-plumbers");
  assert.equal(withSource.Service, "plumber");
  assert.equal(snapshotFormPayload(fields).source, undefined);
  assert.match(
    snapshotFormEncoded(fields, "/how-to-get-cited-by-chatgpt"),
    /source=%2Fhow-to-get-cited-by-chatgpt/,
  );
  assert.doesNotMatch(snapshotFormEncoded(fields), /source=/);
  assert.doesNotMatch(snapshotFormEncoded(fields, "https://evil.example"), /source=/);
});
