import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import {
  FIX_PACK_DETAILS_SUBJECT,
  fixPackDetailsBody,
  fixPackDetailsMailto,
  fixPackDetailsRequestText,
  fixPackRequestText,
  mailtoHref,
  noMailAppInstruction,
  SNAPSHOT_SUBJECT,
  snapshotMailto,
  snapshotRequestBody,
  snapshotRequestClipboard,
  snapshotTemplateRequestText,
} from "./email-request.ts";
const contactEmail = "citescore@mail.grokbot.com";

test("snapshot request text carries the business fields", () => {
  const body = snapshotRequestBody({
    business: "Example Plumbing Co.",
    city: "Riverton",
    service: "plumber",
    email: "owner@example.com",
  });
  assert.equal(
    body,
    [
      "Business name: Example Plumbing Co.",
      "City: Riverton",
      "Service: plumber",
      "Email: owner@example.com",
      "",
      "Please send a free AI Answer Snapshot.",
    ].join("\n"),
  );
  const clip = snapshotRequestClipboard(contactEmail, {
    business: "Example Plumbing Co.",
    city: "Riverton",
    service: "plumber",
    email: "owner@example.com",
  });
  assert.match(clip, new RegExp(`^To: ${contactEmail}`));
  assert.match(clip, new RegExp(`Subject: ${SNAPSHOT_SUBJECT}`));
  assert.match(clip, /Business name: Example Plumbing Co\./);
  const href = snapshotMailto(contactEmail, body);
  assert.equal(href, mailtoHref(contactEmail, SNAPSHOT_SUBJECT, body));
  assert.match(href, new RegExp(`^mailto:${contactEmail.replaceAll(".", "\\.")}\\?`));
  assert.match(href, /subject=/);
  assert.match(href, /body=/);
  assert.equal(
    noMailAppInstruction(contactEmail),
    `No mail app opened? Copy this and email it to ${contactEmail} from any inbox.`,
  );
  const site = readFileSync(new URL("./site.ts", import.meta.url), "utf8");
  assert.match(site, new RegExp(`export const contactEmail = "${contactEmail}";`));
});

test("fix pack and industry templates use the same inbox", () => {
  const fixPack = fixPackRequestText(contactEmail);
  assert.match(fixPack, new RegExp(`To: ${contactEmail}`));
  assert.match(fixPack, /Subject: Fix Pack request/);
  assert.match(fixPack, /Please send the AI Visibility Fix Pack\./);
  assert.match(fixPack, /Business name:\nCity:\nService:\nEmail:/);
  assert.match(snapshotTemplateRequestText(contactEmail, "plumber"), /Service: plumber/);
  assert.match(snapshotTemplateRequestText(contactEmail), /Service: \nEmail:/);
  const details = fixPackDetailsBody();
  assert.equal(
    details,
    ["Business name:", "City:", "Main service:", "Public site URL:"].join("\n"),
  );
  const detailsClip = fixPackDetailsRequestText(contactEmail);
  assert.match(detailsClip, new RegExp(`^To: ${contactEmail}`));
  assert.match(detailsClip, new RegExp(`Subject: ${FIX_PACK_DETAILS_SUBJECT}`));
  assert.match(detailsClip, /Main service:/);
  assert.match(detailsClip, /Public site URL:/);
  const detailsHref = fixPackDetailsMailto(contactEmail);
  assert.equal(detailsHref, mailtoHref(contactEmail, FIX_PACK_DETAILS_SUBJECT, details));
  assert.match(detailsHref, /subject=/);
  assert.match(detailsHref, /body=/);
});

test("snapshot, fix pack, and industry CTAs share one email fallback", () => {
  const fallback = readFileSync(
    new URL("../components/EmailRequestFallback.tsx", import.meta.url),
    "utf8",
  );
  assert.match(fallback, /Copy address/);
  assert.match(fallback, /Copy request text/);
  assert.match(fallback, /noMailAppInstruction/);
  assert.match(fallback, /type="button"/);
  for (const file of [
    "../components/SnapshotRequestForm.tsx",
    "../components/FixPackBuyLink.tsx",
    "../components/IndustrySnapshotCta.tsx",
  ]) {
    const source = readFileSync(new URL(file, import.meta.url), "utf8");
    assert.match(source, /EmailRequestFallback/);
  }
  const fixPackLink = readFileSync(
    new URL("../components/FixPackBuyLink.tsx", import.meta.url),
    "utf8",
  );
  assert.match(fixPackLink, /checkout \? null :/);
  assert.match(fixPackLink, /fixPackRequestText\(contactEmail\)/);
});
