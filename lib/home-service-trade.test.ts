import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { SNAPSHOT_SUBJECT, snapshotMailto, snapshotRequestClipboard, snapshotSubjectForTrade } from "./email-request.ts";
import {
  freeSnapshotHeading,
  freeSnapshotHeadingDefault,
  freeSnapshotLead,
  freeSnapshotLeadDefault,
  freeSnapshotPath,
  homeServiceTradeForGuide,
  parseHomeServiceTrade,
} from "./home-service-trade.ts";

const contactEmail = "citescore@mail.grokbot.com";

test("trade query allowlist is exact", () => {
  assert.equal(parseHomeServiceTrade("plumber")?.service, "plumber");
  assert.equal(parseHomeServiceTrade("hvac")?.service, "HVAC");
  assert.equal(parseHomeServiceTrade("roofer")?.service, "roofer");
  assert.equal(parseHomeServiceTrade("electrician")?.service, "electrician");
  for (const value of ["", "plumber ", "Plumber", "HVAC", "roofers", "dentist", "constructor", "__proto__"]) {
    assert.equal(parseHomeServiceTrade(value), null, value);
  }
  assert.equal(parseHomeServiceTrade(null), null);
  assert.equal(parseHomeServiceTrade(undefined), null);
});

test("only the four home-service guides get the short callout", () => {
  assert.equal(
    homeServiceTradeForGuide("/ai-search-visibility-for-plumbers")?.id,
    "plumber",
  );
  assert.equal(homeServiceTradeForGuide("/ai-search-visibility-for-hvac")?.id, "hvac");
  assert.equal(homeServiceTradeForGuide("/ai-search-visibility-for-roofers")?.id, "roofer");
  assert.equal(
    homeServiceTradeForGuide("/ai-search-visibility-for-electricians")?.id,
    "electrician",
  );
  assert.equal(homeServiceTradeForGuide("/ai-search-visibility-for-landscapers"), null);
  assert.equal(homeServiceTradeForGuide("/ai-search-visibility-for-dentists"), null);
  assert.equal(freeSnapshotPath("plumber"), "/free-snapshot?trade=plumber");
  assert.equal(freeSnapshotPath("hvac"), "/free-snapshot?trade=hvac");
  assert.equal(freeSnapshotPath("roofer"), "/free-snapshot?trade=roofer");
  assert.equal(freeSnapshotPath("electrician"), "/free-snapshot?trade=electrician");

  const plumber = parseHomeServiceTrade("plumber");
  assert.match(
    plumber?.question ?? "",
    /Does ChatGPT name your plumbing company when someone asks for a plumber in your city\?/,
  );
  assert.doesNotMatch(
    [
      plumber?.question,
      parseHomeServiceTrade("hvac")?.question,
      parseHomeServiceTrade("roofer")?.question,
      parseHomeServiceTrade("electrician")?.question,
    ].join("\n"),
    /guarantee|testimonial|customers served|% of|Samuel|Lamphier/i,
  );
});

test("snapshot subject and clipboard mention the trade only when one is set", () => {
  assert.equal(snapshotSubjectForTrade(null), SNAPSHOT_SUBJECT);
  assert.equal(snapshotSubjectForTrade(undefined), SNAPSHOT_SUBJECT);
  assert.equal(snapshotSubjectForTrade(""), SNAPSHOT_SUBJECT);
  assert.equal(snapshotSubjectForTrade("   "), SNAPSHOT_SUBJECT);
  assert.equal(snapshotSubjectForTrade("plumber"), `${SNAPSHOT_SUBJECT} - plumber`);
  assert.equal(snapshotSubjectForTrade("HVAC"), `${SNAPSHOT_SUBJECT} - HVAC`);

  const fields = {
    business: "Example Plumbing Co.",
    city: "Riverton",
    service: "plumber",
    website: "https://example-plumbing.example",
    email: "owner@example.com",
  };
  const plain = snapshotRequestClipboard(contactEmail, fields);
  assert.match(plain, new RegExp(`Subject: ${SNAPSHOT_SUBJECT}\\n`));
  assert.doesNotMatch(plain, /Subject: .* - plumber/);

  const tagged = snapshotRequestClipboard(contactEmail, fields, snapshotSubjectForTrade("plumber"));
  assert.match(tagged, /Subject: Free AI Answer Snapshot - plumber/);
  assert.match(tagged, /Service: plumber/);
  const href = snapshotMailto(contactEmail, "Service: plumber", snapshotSubjectForTrade("plumber"));
  assert.match(href, /subject=Free%20AI%20Answer%20Snapshot%20-%20plumber/);
  assert.equal(snapshotMailto(contactEmail, "body"), snapshotMailto(contactEmail, "body", SNAPSHOT_SUBJECT));
});

test("without a trade the free snapshot heading stays the current sentence", () => {
  assert.equal(freeSnapshotHeading(null), freeSnapshotHeadingDefault);
  assert.equal(freeSnapshotHeading(null), "Request a free AI Answer Snapshot.");
  assert.equal(freeSnapshotLead(null), freeSnapshotLeadDefault);
  assert.match(freeSnapshotLead(null), /a plumber \(or your trade\)/);
  const plumber = parseHomeServiceTrade("plumber");
  assert.match(freeSnapshotHeading(plumber), /plumbing company/);
  assert.match(freeSnapshotLead(plumber), /for a plumber in your city/);
  const hvac = parseHomeServiceTrade("hvac");
  assert.match(freeSnapshotHeading(hvac), /HVAC company/);
  assert.equal(freeSnapshotHeadingDefault, "Request a free AI Answer Snapshot.");
});

test("guides render the short callout and the snapshot page reads trade on the client", () => {
  const shell = readFileSync(new URL("../components/ArticleShell.tsx", import.meta.url), "utf8");
  const callout = readFileSync(
    new URL("../components/HomeServiceGuideCallout.tsx", import.meta.url),
    "utf8",
  );
  const lead = readFileSync(new URL("../components/FreeSnapshotLead.tsx", import.meta.url), "utf8");
  const form = readFileSync(
    new URL("../components/SnapshotRequestForm.tsx", import.meta.url),
    "utf8",
  );
  const page = readFileSync(new URL("../app/free-snapshot/page.tsx", import.meta.url), "utf8");

  assert.match(shell, /HomeServiceGuideCallout/);
  assert.match(shell, /homeServiceTradeForGuide/);
  assert.match(shell, /TradeGuideStickyCta/);
  assert.match(shell, /stickyHref \? <TradeGuideStickyCta href=\{stickyHref\} \/> : null/);
  assert.match(callout, /freeSnapshotPath\(trade\.id\)/);
  assert.match(callout, /href="\/sample-snapshot"/);
  assert.match(callout, /Get a free AI Answer Snapshot/);
  assert.match(callout, /See an example snapshot/);
  assert.doesNotMatch(callout, /useSearchParams|searchParams/);
  const hook = readFileSync(
    new URL("../components/useHomeServiceTrade.ts", import.meta.url),
    "utf8",
  );
  assert.match(lead, /useHomeServiceTradeParam/);
  assert.match(hook, /readHomeServiceTradeParam/);
  assert.match(hook, /useSyncExternalStore/);
  assert.match(hook, /getServerSnapshot/);
  assert.doesNotMatch(lead, /useSearchParams|useEffect/);
  assert.match(form, /useHomeServiceTradeParam/);
  assert.match(form, /snapshotSubjectForTrade/);
  assert.doesNotMatch(form, /useSearchParams|useEffect/);
  assert.match(page, /<FreeSnapshotLead \/>/);
  assert.doesNotMatch(page, /searchParams|useSearchParams/);
  assert.equal((shell.match(/<IndustrySnapshotCta/g) ?? []).length, 2);
});
