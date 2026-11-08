import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { register } from "node:module";
import { test } from "node:test";
import { FIX_PACK_DETAILS_SUBJECT, SNAPSHOT_SUBJECT } from "./email-request.ts";
import { postFlowForm, snapshotFormPageEndpoint } from "./snapshot-form.ts";

register("./alias-hook.mjs", import.meta.url);

const {
  fixPackIntakeEncoded,
  fixPackIntakeFieldErrors,
  fixPackIntakeFieldsComplete,
  fixPackIntakePayload,
  fixPackIntakeSendErrorMessage,
  postFixPackIntake,
} = await import("./fix-pack-intake.ts");

const fields = {
  business: " Example Plumbing Co. ",
  city: " Riverton ",
  service: " plumber ",
  website: " example-plumbing.example ",
  email: " owner@example.com ",
};

test("Fix Pack intake posts through the snapshot FlowForm path with a different subject", async () => {
  assert.equal(snapshotFormPageEndpoint, "https://flowform.to/citescore@mail.grokbot.com");
  assert.notEqual(FIX_PACK_DETAILS_SUBJECT, SNAPSHOT_SUBJECT);
  const payload = fixPackIntakePayload(fields);
  assert.equal(payload._subject, "Fix Pack intake after payment");
  assert.equal(payload._replyto, "owner@example.com");
  assert.equal(payload["Business name"], "Example Plumbing Co.");
  assert.equal(payload.City, "Riverton");
  assert.equal(payload["Main service"], "plumber");
  assert.equal(payload["Public site URL"], "https://example-plumbing.example");
  assert.equal(payload.Email, "owner@example.com");
  assert.equal(payload.source, "/fix-pack/next-steps");
  assert.match(payload.Request, /Fix Pack intake after payment/);
  assert.match(payload.Request, /not a new free AI Answer Snapshot request/);
  const encoded = fixPackIntakeEncoded(fields);
  assert.match(encoded, /_subject=Fix\+Pack\+intake\+after\+payment/);
  assert.doesNotMatch(encoded, /_subject=Free\+AI\+Answer\+Snapshot/);
  assert.doesNotMatch(encoded, /_honey/);
  assert.doesNotMatch(encoded, /_next/);
  assert.equal(fixPackIntakeFieldsComplete(fields), true);
  assert.equal(
    fixPackIntakeFieldErrors({ ...fields, service: " " }).service,
    "Enter a main service.",
  );
  assert.equal(
    fixPackIntakeFieldErrors({ ...fields, website: " " }).website,
    "Enter a public site URL.",
  );
  assert.match(fixPackIntakeSendErrorMessage, /email button/);

  const calls: Array<{ url: string; body: string; accept: string }> = [];
  const sent = await postFixPackIntake(fields, async (url, init) => {
    calls.push({ url, body: init.body, accept: init.headers.Accept });
    return { status: 200, json: async () => ({ success: true }) };
  });
  assert.equal(sent, "sent");
  assert.equal(calls[0]?.url, snapshotFormPageEndpoint);
  assert.equal(calls[0]?.accept, "application/json");
  assert.match(calls[0]?.body ?? "", /Main\+service=plumber/);
  assert.match(
    calls[0]?.body ?? "",
    /Public\+site\+URL=https%3A%2F%2Fexample-plumbing\.example/,
  );

  const failed = await postFlowForm("body=1", async () => ({
    status: 200,
    json: async () => ({ success: false }),
  }));
  assert.equal(failed, "error");

  const site = readFileSync(new URL("./site.ts", import.meta.url), "utf8");
  assert.match(
    site,
    /export const FIX_PACK_CHECKOUT_URL = "https:\/\/payhip\.com\/b\/AjFxC";/,
  );
  assert.doesNotMatch(site, /success_url|successUrl/);
  const buy = readFileSync(new URL("../components/FixPackBuyLink.tsx", import.meta.url), "utf8");
  assert.match(buy, /href=\{fixPackHref\(\)\}/);
  assert.doesNotMatch(buy, /success_url|successUrl/);
});
