import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { howSnapshotIsMadeBody, howSnapshotIsMadeTitle } from "./snapshot-method.ts";

const component = readFileSync(
  new URL("../components/HowSnapshotIsMade.tsx", import.meta.url),
  "utf8",
);
const freeSnapshot = readFileSync(
  new URL("../app/free-snapshot/page.tsx", import.meta.url),
  "utf8",
);
const sample = readFileSync(
  new URL("../app/sample-snapshot/page.tsx", import.meta.url),
  "utf8",
);
const trust = readFileSync(new URL("../app/trust/page.tsx", import.meta.url), "utf8");
const methodology = readFileSync(
  new URL("../app/methodology/page.tsx", import.meta.url),
  "utf8",
);
const offerFaq = readFileSync(new URL("./offer-faq.ts", import.meta.url), "utf8");

const invented =
  /Samuel|Lamphier|testimonial|customers served|guarantee|few minutes|24 hours|48 hours|\b(John|Jane)\b/i;

test("the snapshot method note uses only sentences already on the site", () => {
  assert.equal(howSnapshotIsMadeTitle, "How the snapshot is made");
  assert.match(howSnapshotIsMadeBody, /logged-out ChatGPT and Perplexity/);
  assert.match(howSnapshotIsMadeBody, /best \{service\} in \{city\}/);
  assert.match(howSnapshotIsMadeBody, /plus one variant/);
  assert.match(
    howSnapshotIsMadeBody,
    /The one-page snapshot records who is named, which sources are cited, and each named competitor’s Google rating and review count next to yours\./,
  );
  assert.match(howSnapshotIsMadeBody, /A real snapshot prints the day the prompts were asked\./);
  assert.match(
    howSnapshotIsMadeBody,
    /AI answers vary run to run\. This is a snapshot, not a ranking\./,
  );
  assert.doesNotMatch(howSnapshotIsMadeBody, invented);
  assert.doesNotMatch(howSnapshotIsMadeBody, /\d+%/);
  assert.doesNotMatch(howSnapshotIsMadeBody, /business days/);

  const flat = (source: string) => source.replace(/\s+/g, " ");
  const published = flat(`${methodology}\n${offerFaq}\n${freeSnapshot}`);
  for (const sentence of howSnapshotIsMadeBody.split(/(?<=\.)\s+/)) {
    assert.equal(published.includes(sentence), true, sentence);
  }
});

test("the method note is rendered once beside each request, and trust links to it", () => {
  assert.match(component, /howSnapshotIsMadeTitle/);
  assert.match(component, /howSnapshotIsMadeBody/);
  assert.match(component, /id="how-the-snapshot-is-made"/);
  assert.equal((freeSnapshot.match(/<HowSnapshotIsMade/g) ?? []).length, 1);
  assert.equal((sample.match(/<HowSnapshotIsMade/g) ?? []).length, 1);
  assert.match(trust, /href="\/free-snapshot#how-the-snapshot-is-made"/);
  assert.match(trust, /href="\/sample-snapshot#how-the-snapshot-is-made"/);
  assert.match(trust, /href="\/methodology"/);
  assert.doesNotMatch(component, invented);
});
