import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("the signal check result ends by carrying the checked site into the snapshot request", () => {
  const tool = readFileSync(new URL("../components/FreeCheckTool.tsx", import.meta.url), "utf8");
  const funnel = readFileSync(new URL("../components/FunnelCtaRow.tsx", import.meta.url), "utf8");

  assert.match(tool, /freeSnapshotRequestHref\(\{/);
  assert.match(tool, /website: result\.origin/);
  assert.match(tool, /business: result\.homepage\.title/);
  assert.match(tool, /The site you checked is filled in on the request/);
  assert.match(tool, /The free snapshot\s+shows who is named/);
  assert.match(tool, /The Fix Pack is the done-for-you work after that/);
  const handoff = tool.indexOf("The site you checked is filled in on the request");
  const cta = tool.indexOf("<FunnelCtaRow");
  assert.ok(handoff > -1 && cta > handoff);
  assert.equal(tool.indexOf("<FunnelCtaRow", cta + 1), -1);
  assert.match(tool, /snapshotHref=\{snapshotHref\}/);
  assert.doesNotMatch(tool, /href="\/free-snapshot"/);
  assert.doesNotMatch(tool, /Samuel|Lamphier|testimonial|customers served|guarantee/i);

  assert.match(funnel, /\{snapshotRequestCtaLabel\}/);
  assert.match(funnel, /fixPackGetCtaLabel\(\)/);
  assert.match(funnel, /FixPackBuyLink/);
  assert.match(funnel, /snapshotHref = "\/free-snapshot"/);
});
