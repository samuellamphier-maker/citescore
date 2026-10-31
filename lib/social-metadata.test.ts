import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const meta = readFileSync(new URL("./content/meta.ts", import.meta.url), "utf8");
const image = readFileSync(new URL("../app/opengraph-image.tsx", import.meta.url), "utf8");
const sample = readFileSync(new URL("../app/sample-snapshot/page.tsx", import.meta.url), "utf8");
const fixPack = readFileSync(new URL("../app/fix-pack/page.tsx", import.meta.url), "utf8");
const pricing = readFileSync(new URL("../app/pricing/page.tsx", import.meta.url), "utf8");
const siteSource = readFileSync(new URL("./site.ts", import.meta.url), "utf8");

test("default Open Graph and Twitter cards use the generated image", () => {
  assert.match(meta, /socialImagePath = "\/opengraph-image"/);
  assert.match(meta, /card: "summary_large_image"/);
  assert.match(meta, /images: \[socialImage\]/);
  assert.match(meta, /images: \[socialImagePath\]/);
  assert.match(layout, /openGraph: rootOpenGraph/);
  assert.match(layout, /twitter: rootTwitter/);
  assert.match(home, /openGraph: \{ \.\.\.rootOpenGraph, url: "\/" \}/);
  assert.match(home, /twitter: rootTwitter/);
  assert.match(image, /export const contentType = "image\/png"/);
  assert.match(image, /export const alt = socialImageAlt/);
  assert.match(image, /ImageResponse/);
  assert.match(image, /\{site\.name\}/);
  assert.match(image, /\{site\.tagline\}/);
  assert.match(siteSource, /tagline: "Who does ChatGPT name in your city\?"/);
  assert.doesNotMatch(image, /Samuel|Lamphier|testimonial|customers served/);
  for (const source of [sample, fixPack, pricing]) {
    assert.match(source, /pageMeta\(/);
  }
});
