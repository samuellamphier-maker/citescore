import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { SNAPSHOT_SUBJECT } from "./email-request.ts";
import {
  freeSnapshotRequestHref,
  snapshotBusinessPrefill,
  postSnapshotForm,
  snapshotDeliveredToMessage,
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
  snapshotValidationSummary,
  snapshotWebsiteAccepted,
  snapshotWebsiteInvalidMessage,
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
  assert.equal(
    snapshotSentMessage,
    "Request received. We reply with your one-page snapshot by email.",
  );
  assert.equal(
    snapshotDeliveredToMessage(" owner@example.com "),
    "We email the snapshot to owner@example.com.",
  );
  assert.match(snapshotSendErrorMessage, /email button/);
  assert.equal(snapshotWebsiteAccepted(" example.com "), true);
  assert.equal(snapshotWebsiteAccepted("http://example.com/services"), true);
  assert.equal(snapshotWebsiteAccepted("not a url"), false);
  assert.equal(snapshotWebsiteAccepted("https://localhost/admin"), false);
  assert.equal(snapshotWebsiteAccepted("https://user:pass@example.com"), false);
  assert.equal(snapshotWebsiteAccepted(""), false);
  assert.equal(
    snapshotFieldsComplete({ ...fields, website: "example.com" }),
    true,
  );
  assert.equal(
    snapshotFieldsComplete({ ...fields, website: "not a url" }),
    false,
  );
  assert.equal(snapshotFieldErrors({ ...fields, website: "example.com" }).website, undefined);
  assert.equal(
    snapshotFieldErrors({ ...fields, website: "notaurl" }).website,
    snapshotWebsiteInvalidMessage,
  );
  assert.equal(
    snapshotWebsiteInvalidMessage,
    "Enter a website, with or without https://.",
  );
  const serviceOnly = snapshotFieldErrors({ ...fields, service: " " });
  assert.equal(snapshotValidationSummary(serviceOnly), "Enter a service.");
  assert.equal(
    snapshotValidationSummary(
      snapshotFieldErrors({ ...fields, website: "notaurl", email: "not-an-email" }),
    ),
    "Enter a website, with or without https://. Enter an email address.",
  );
  assert.equal(snapshotValidationSummary({}), "");
});

test("postSnapshotForm stays on the FlowForm path and reports failures", async () => {
  const calls: Array<{ url: string; body: string; accept: string }> = [];
  const sent = await postSnapshotForm(fields, "/free-check", async (url, init) => {
    calls.push({
      url,
      body: init.body,
      accept: init.headers.Accept,
    });
    return {
      status: 200,
      json: async () => ({ success: true }),
    };
  });
  assert.equal(sent, "sent");
  assert.equal(calls.length, 1);
  assert.equal(calls[0]?.url, "https://flowform.to/citescore@mail.grokbot.com");
  assert.equal(calls[0]?.accept, "application/json");
  assert.match(calls[0]?.body ?? "", /Business\+name=CiteScore\+Team\+activation\+test/);
  assert.match(calls[0]?.body ?? "", /City=Riverton/);
  assert.match(calls[0]?.body ?? "", /Service=plumber/);
  assert.match(calls[0]?.body ?? "", /Website=https%3A%2F%2Fexample-plumbing\.example/);
  assert.match(calls[0]?.body ?? "", /Email=citescore%40mail\.grokbot\.com/);
  assert.match(calls[0]?.body ?? "", /source=%2Ffree-check/);
  assert.match(calls[0]?.body ?? "", /_subject=Free\+AI\+Answer\+Snapshot/);
  assert.match(calls[0]?.body ?? "", /_replyto=citescore%40mail\.grokbot\.com/);
  assert.doesNotMatch(calls[0]?.body ?? "", /_honey/);
  assert.doesNotMatch(calls[0]?.body ?? "", /_next/);

  const rejected = await postSnapshotForm(fields, undefined, async () => ({
    status: 200,
    json: async () => ({ success: "false", message: "This form needs Activation" }),
  }));
  assert.equal(rejected, "error");

  const badStatus = await postSnapshotForm(fields, undefined, async () => ({
    status: 500,
    json: async () => ({ success: true }),
  }));
  assert.equal(badStatus, "error");

  const badJson = await postSnapshotForm(fields, undefined, async () => ({
    status: 200,
    json: async () => {
      throw new Error("not json");
    },
  }));
  assert.equal(badJson, "error");

  const network = await postSnapshotForm(fields, undefined, async () => {
    throw new Error("network down");
  });
  assert.equal(network, "error");
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
  assert.match(privacy, /The free AI Answer Snapshot is not a purchase/);
  assert.match(privacy, /logged-out ChatGPT and\s+Perplexity/);
  assert.doesNotMatch(privacy, /one-time audit product/);
  assert.doesNotMatch(privacy, /if checkout is not live/);
  assert.doesNotMatch(privacy, /Samuel|Lamphier/);
});

test("terms and the footer do not describe the snapshot as an audit that skips ChatGPT", () => {
  const terms = readFileSync(new URL("../app/terms/page.tsx", import.meta.url), "utf8");
  const footer = readFileSync(new URL("../components/SiteFooter.tsx", import.meta.url), "utf8");
  assert.match(terms, /The free AI Answer Snapshot is not a purchase/);
  assert.match(terms, /That\s+PDF is not a live query of ChatGPT/);
  assert.match(terms, /The free\s+AI Answer Snapshot is different/);
  assert.match(terms, /we ask logged-out ChatGPT and\s+Perplexity who they name/);
  assert.match(terms, /Payhip are responsible for their own checkout/);
  assert.match(terms, /Effective 10 November 2026/);
  assert.doesNotMatch(terms, /It is not a live query of ChatGPT/);
  assert.doesNotMatch(terms, /Samuel|Lamphier/);
  assert.match(
    footer,
    /A free AI Answer Snapshot asks logged-out ChatGPT and Perplexity\s+who they name/,
  );
  assert.match(footer, /Operated by the CiteScore Team/);
  assert.match(footer, /Sold by CiteScore/);
  assert.doesNotMatch(footer, /Samuel|Lamphier/);
});

test("the request form posts, keeps mailto, and requires the website", () => {
  const form = readFileSync(
    new URL("../components/SnapshotRequestForm.tsx", import.meta.url),
    "utf8",
  );
  assert.match(form, /snapshotFormPageEndpoint/);
  assert.match(form, /postSnapshotForm/);
  assert.doesNotMatch(form, /form\.submit\(\)/);
  assert.match(form, /name="_next"/);
  assert.match(form, /\/thank-you/);
  assert.doesNotMatch(form, /free-snapshot\/thanks/);
  assert.doesNotMatch(form, /free-snapshot\?sent=1/);
  assert.match(form, /snapshotMailto/);
  assert.match(form, /Email this request instead/);
  const errorMailto = form.indexOf("Email this request instead");
  const idleMailto = form.indexOf("email this request instead");
  assert.ok(errorMailto !== -1 && idleMailto > errorMailto);
  const errorControl = form.slice(errorMailto - 500, errorMailto);
  const idleControl = form.slice(idleMailto - 220, idleMailto);
  assert.match(errorControl, /phase === "error"/);
  assert.match(errorControl, /flex h-12 w-full/);
  assert.match(idleControl, /font-medium text-forest underline/);
  assert.doesNotMatch(idleControl, /h-12 w-full/);
  assert.match(form, /If that send fails,/);
  assert.match(form, /or use the copy buttons\./);
  assert.match(form, /\{sent \? null : \(/);
  assert.equal((form.match(/id="snapshot-mailto"/g) ?? []).length, 2);
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
  assert.match(form, /grid grid-cols-2 gap-3/);
  assert.match(form, /htmlFor="snapshot-city"/);
  assert.match(form, /htmlFor="snapshot-service"/);
  assert.match(form, /snapshotValidationSummary/);
  assert.doesNotMatch(form, /placeholder="Plumber"/);
  assert.doesNotMatch(form, /snapshotValidationMessage/);
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
  assert.match(form, /hideRequiredNote/);
  assert.match(form, /hideRequiredNote \|\| prefillVisible/);
  assert.match(form, /prefillVisible/);
  assert.match(form, /requiredNoteId \? \(/);
  assert.match(
    form,
    /hideRequiredNote\s+\? "scroll-mt-24 space-y-2 max-\[359px\]:space-y-1"\s+: "scroll-mt-24 space-y-3"/,
  );
  assert.match(form, /We do not ask for passwords, cookies, or content behind a login/);
  assert.match(form, />Required</);
  assert.match(form, /snapshotWebsiteValue/);
  assert.doesNotMatch(form, /noValidate/);
  assert.match(form, /required/);
  assert.match(form, /snapshotSentMessage/);
  assert.match(form, /snapshotDeliveredToMessage/);
  assert.match(form, /id="snapshot-received"/);
  assert.match(form, /What happens next/);
  assert.match(form, /There is no set delivery time/);
  assert.match(form, /replyTiming\?: boolean/);
  assert.match(form, /replyTiming && !sent/);
  assert.match(
    form,
    /The one-page snapshot lists who is named, which sources are cited, and\s+how your Google rating and review count compare\. There is no set\s+delivery time\./,
  );
  assert.match(form, /href="\/sample-snapshot"/);
  assert.match(form, /Fictional business, illustrative numbers/);
  assert.match(form, /href="\/fix-pack"/);
  assert.match(form, /fixPackPageLinkLabel/);
  assert.match(form, /snapshotSendErrorMessage/);
  assert.match(form, /id="snapshot-send-error"/);
  assert.match(form, /mailto:\$\{contactEmail\}/);
  assert.match(form, /snapshotWebsiteAccepted/);
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
