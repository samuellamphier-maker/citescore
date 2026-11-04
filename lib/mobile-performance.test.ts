import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
const config = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
const header = readFileSync(new URL("../components/SiteHeader.tsx", import.meta.url), "utf8");
const footer = readFileSync(new URL("../components/SiteFooter.tsx", import.meta.url), "utf8");

test("the italic headline face is not preloaded", () => {
  assert.match(layout, /const newsreader = Newsreader\([\s\S]*preload: true/);
  assert.match(layout, /const newsreaderItalic = Newsreader\([\s\S]*preload: false/);
  assert.match(layout, /--font-newsreader-italic/);
  assert.doesNotMatch(layout, /style: \["normal", "italic"\]/);
  assert.doesNotMatch(layout, /const geistSans = Geist\(\{[^}]*preload: false/);
  assert.doesNotMatch(layout, /const geistMono = Geist_Mono\(\{[^}]*preload: false/);
});

test("the legacy module polyfill is replaced for modern browsers", () => {
  assert.match(config, /modern-browser-polyfill/);
});

test("chrome nav does not prefetch the whole site on first paint", () => {
  assert.match(header, /prefetch = false/);
  assert.match(header, /href="\/free-snapshot"[\s\S]*prefetch/);
  assert.match(footer, /prefetch=\{false\}/);
});
