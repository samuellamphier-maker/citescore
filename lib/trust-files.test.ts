import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { register } from "node:module";
import { test } from "node:test";

register("./alias-hook.mjs", import.meta.url);

const { contactEmail, productionOrigin, site } = await import("./site.ts");
const { citeScoreSecurityTxt, securityTxtExpires } = await import("./security-txt.ts");
const { citeScoreHumansTxt } = await import("./humans-txt.ts");

const nextConfig = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
const securityRoute = readFileSync(
  new URL("../app/.well-known/security.txt/route.ts", import.meta.url),
  "utf8",
);
const securityAlias = readFileSync(
  new URL("../app/security.txt/route.ts", import.meta.url),
  "utf8",
);
const humansRoute = readFileSync(new URL("../app/humans.txt/route.ts", import.meta.url), "utf8");

const invented =
  /Samuel|Lamphier|testimonial|customers served|guarantee|\b(John|Jane)\b/i;

test("security.txt follows RFC 9116 and is served as text/plain", () => {
  const text = citeScoreSecurityTxt();
  assert.match(text, new RegExp(`^Contact: mailto:${contactEmail}$`, "m"));
  assert.match(text, new RegExp(`^Expires: ${securityTxtExpires}$`, "m"));
  assert.match(text, /^Preferred-Languages: en$/m);
  assert.match(
    text,
    new RegExp(`^Canonical: ${productionOrigin}/\\.well-known/security\\.txt$`, "m"),
  );
  assert.equal(text.endsWith("\n"), true);
  const published = Date.parse("2026-10-31T00:00:00.000Z");
  const expires = Date.parse(securityTxtExpires);
  const days = (expires - published) / 86_400_000;
  assert.ok(days >= 360 && days <= 370, `expires is ${days} days out`);
  assert.doesNotMatch(text, invented);
  for (const route of [securityRoute, securityAlias]) {
    assert.match(route, /text\/plain; charset=utf-8/);
    assert.match(route, /citeScoreSecurityTxt/);
    assert.match(route, /dynamic = "force-static"/);
  }
});

test("humans.txt credits the CiteScore Team and restates the site description", () => {
  const text = citeScoreHumansTxt();
  assert.match(text, /^CiteScore Team$/m);
  assert.match(text, new RegExp(`^Contact: ${contactEmail}$`, "m"));
  assert.match(text, new RegExp(site.description.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.deepEqual(
    [...new Set(text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g))],
    [contactEmail],
  );
  assert.doesNotMatch(text, invented);
  assert.match(humansRoute, /text\/plain; charset=utf-8/);
  assert.match(humansRoute, /citeScoreHumansTxt/);
  assert.match(humansRoute, /dynamic = "force-static"/);
});

const sampleAliases = [
  "/example-snapshot",
  "/snapshot-example",
  "/sample-report",
  "/example-report",
  "/demo",
];

test("sample snapshot guesses permanently redirect and are not existing pages", () => {
  for (const source of sampleAliases) {
    assert.match(
      nextConfig,
      new RegExp(
        `source:\\s*"${source}",\\s*destination:\\s*"/sample-snapshot",\\s*permanent:\\s*true`,
      ),
    );
    assert.equal(existsSync(new URL(`../app${source}/page.tsx`, import.meta.url)), false);
    assert.equal(existsSync(new URL(`../app${source}/route.ts`, import.meta.url)), false);
  }
  assert.equal(existsSync(new URL("../app/sample-snapshot/page.tsx", import.meta.url)), true);
});
