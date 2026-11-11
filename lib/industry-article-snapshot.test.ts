import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { industrySnapshotLabel } from "./industry-snapshot.ts";

const invented =
  /Samuel|Lamphier|testimonial|customers served|guarantee|\b(John|Jane)\b|% of/i;

const component = readFileSync(
  new URL("../components/IndustryArticleSnapshot.tsx", import.meta.url),
  "utf8",
);
const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const industryCta = readFileSync(
  new URL("../components/IndustrySnapshotCta.tsx", import.meta.url),
  "utf8",
);

const appDir = new URL("../app/", import.meta.url);

test("the mid-article snapshot card repeats the industry offer and stays a real button", () => {
  assert.match(
    industryCta,
    /Tell us the business, the city, the service, and the website\. We ask who ChatGPT names and send the one-page snapshot\. AI answers vary run to run\./,
  );
  assert.match(component, /Tell us the business, the city, the service, and the website\. We ask who ChatGPT names and send the one-page snapshot\. AI answers vary run to run\./);
  assert.match(component, /No payment\./);
  assert.match(component, /Free AI Answer Snapshot for \{industry\} businesses in your city/);
  assert.match(component, /\{snapshotRequestCtaLabel\}/);
  assert.match(component, /\{fixPackPageLinkLabel\(\)\}/);
  assert.match(component, /href=\{freeSnapshotHrefForIndustry\(industry\)\}/);
  assert.match(component, /href="\/sample-snapshot"/);
  assert.match(component, /href="\/fix-pack"/);
  assert.match(component, /Fictional business, illustrative numbers\./);
  assert.match(component, /data-funnel-cta/);
  assert.match(component, /id="industry-article-snapshot"/);
  assert.match(component, /className="snapshot-button[^"]*h-12/);
  assert.match(component, /className="snapshot-quiet/);
  assert.match(css, /\.article-prose \.industry-article-snapshot a\.snapshot-button:hover/);
  assert.match(css, /color:\s*var\(--color-cream\)/);
  assert.match(css, /text-decoration:\s*none/);
  assert.match(css, /min-height:\s*2\.75rem/);
  assert.doesNotMatch(component, invented);
  assert.doesNotMatch(component, /payhip|FIX_PACK_CHECKOUT_URL|few minutes|24 hours|48 hours/i);
});

test("each industry guide places one snapshot card between the opening and the close", () => {
  const pages = readdirSync(appDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("ai-search-visibility-for-"))
    .map((entry) => `/${entry.name}`);
  assert.equal(pages.length, 17);

  for (const path of pages) {
    const page = readFileSync(new URL(`../app${path}/page.tsx`, import.meta.url), "utf8");
    const imported = page.match(/@\/components\/articles\/(AiSearchVisibilityFor[A-Za-z0-9]+)/);
    assert.ok(imported, path);
    const article = readFileSync(
      new URL(`../components/articles/${imported[1]}.tsx`, import.meta.url),
      "utf8",
    );
    const industry = industrySnapshotLabel(path);
    assert.ok(industry, path);
    const tag = `<IndustryArticleSnapshot industry="${industry}" />`;
    assert.equal((article.match(/<IndustryArticleSnapshot /g) ?? []).length, 1, path);
    assert.ok(article.includes(tag), `${path} expected ${tag}`);
    assert.match(article, /import \{ IndustryArticleSnapshot \} from "@\/components\/IndustryArticleSnapshot"/);

    const h2s = [...article.matchAll(/^[ \t]*<h2[\s>]/gm)];
    assert.ok(h2s.length >= 4, path);
    const at = article.indexOf(tag);
    const before = h2s.filter((match) => (match.index ?? 0) < at).length;
    assert.equal(before, Math.floor(h2s.length / 2), `${path} headings before card`);
    assert.ok(at < (h2s[h2s.length - 1].index ?? 0), path);
  }
});
