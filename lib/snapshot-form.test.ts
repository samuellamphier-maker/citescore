import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { SNAPSHOT_SUBJECT } from "./email-request.ts";
import {
  snapshotFieldsComplete,
  snapshotFormEncoded,
  snapshotFormPageEndpoint,
  snapshotFormPayload,
  snapshotFormProvider,
  snapshotSendErrorMessage,
  snapshotSentMessage,
  snapshotSubmitSucceeded,
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
  assert.equal(
    snapshotFieldsComplete({ ...fields, website: "  " }),
    false,
  );
  assert.equal(
    snapshotFieldsComplete({ ...fields, email: "not-an-email" }),
    false,
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
  assert.match(form, /form\.submit\(\)/);
  assert.match(form, /snapshotMailto/);
  assert.match(form, /Email this request instead/);
  assert.match(form, /name="_honey"/);
  assert.match(form, /name="_subject"/);
  assert.doesNotMatch(form, /name="_captcha"/);
  assert.match(form, /name="Website"/);
  assert.match(form, /required/);
  assert.match(form, /snapshotSentMessage/);
  assert.match(form, /snapshotSendErrorMessage/);
  assert.match(form, /EmailRequestFallback/);
  assert.doesNotMatch(form, /useSearchParams|useEffect/);
});
