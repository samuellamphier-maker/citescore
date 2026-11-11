import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { marketingPaths } from "./content/blog.ts";

const page = readFileSync(new URL("../app/free-snapshot/page.tsx", import.meta.url), "utf8");
const nextConfig = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const fixPack = readFileSync(new URL("../app/fix-pack/page.tsx", import.meta.url), "utf8");
const sample = readFileSync(new URL("../app/sample-snapshot/page.tsx", import.meta.url), "utf8");
const industry = readFileSync(
  new URL("../components/IndustrySnapshotCta.tsx", import.meta.url),
  "utf8",
);
const form = readFileSync(
  new URL("../components/SnapshotRequestForm.tsx", import.meta.url),
  "utf8",
);
const trust = readFileSync(new URL("../components/TrustLinks.tsx", import.meta.url), "utf8");

function occurrences(source: string, needle: string) {
  return source.split(needle).length - 1;
}
const offerFaq = readFileSync(new URL("./offer-faq.ts", import.meta.url), "utf8");

test("free snapshot page is the linkable request, with the existing email path", () => {
  assert.match(page, /path: "\/free-snapshot"/);
  assert.match(page, /title: "Free AI Answer Snapshot"/);
  assert.match(page, /faqPageJsonLd\(freeSnapshotPageFaqs\)/);
  assert.match(page, /freeSnapshotServiceJsonLd\(publicOrigin\(\)\)/);
  assert.match(page, /<SnapshotRequestForm/);
  assert.match(page, /id="free-snapshot-request"/);
  assert.match(page, /className="sr-only"/);
  assert.doesNotMatch(page, /kicker">Request/);
  assert.match(page, /caveat=\{false\}/);
  assert.match(page, /deliveryNote=\{false\}/);
  assert.match(page, /privacyAfterSubmit/);
  assert.match(page, /defaultWebsite=\{website\}/);
  assert.match(page, /defaultBusiness=\{business\}/);
  assert.match(page, /defaultService=\{service \|\| undefined\}/);
  assert.match(page, /serviceNote=\{Boolean\(service\)\}/);
  assert.match(form, /Service filled in from the page you came from/);
  assert.match(page, /snapshotServicePrefill/);
  assert.match(page, /<FreeSnapshotLead service=\{service\} \/>/);
  assert.match(page, /snapshotWebsitePrefill/);
  assert.match(page, /snapshotBusinessPrefill/);
  assert.match(page, /href="\/sample-snapshot"/);
  assert.match(page, /Fictional business, illustrative numbers/);
  assert.match(page, /href="\/fix-pack"/);
  assert.match(page, /href="\/checkout"/);
  assert.match(page, /<FixPackBuyLink \/>/);
  assert.match(page, /<TrustLinks \/>/);
  assert.match(page, /CiteScore Team/);
  assert.match(page, /We reply with the one-page snapshot/);
  assert.match(page, /What happens after you submit/);
  assert.match(page, /There is no set delivery time/);
  assert.equal((page.match(/<HowSnapshotIsMade/g) ?? []).length, 1);
  const leadAt = page.indexOf("<FreeSnapshotLead");
  const formAt = page.indexOf("<SnapshotRequestForm");
  const afterSubmitAt = page.indexOf('id="after-submit"');
  const skipAt = page.indexOf("Skip straight to the");
  const methodAt = page.indexOf("<HowSnapshotIsMade");
  const sampleAt = page.indexOf("<SampleSnapshotExcerpt");
  assert.ok(leadAt !== -1 && formAt > leadAt);
  assert.ok(formAt < afterSubmitAt && afterSubmitAt < skipAt);
  assert.ok(skipAt < methodAt);
  assert.ok(formAt < sampleAt);
  assert.equal((page.match(/<SampleSnapshotExcerpt/g) ?? []).length, 1);
  assert.doesNotMatch(page, /variant="compact"/);
  assert.equal(
    occurrences(page, "AI answers vary run to run. This is a snapshot, not a ranking."),
    0,
  );
  assert.equal(
    occurrences(
      page,
      "We ask logged-out ChatGPT and Perplexity who they name for that trade and city, and record who is named.",
    ),
    0,
  );
  assert.match(page, /SampleSnapshotExcerpt/);
  assert.match(page, /See the full example snapshot/);
  assert.match(page, /Skip straight to the \{fixPackIntroPriceLabel\} Fix Pack/);
  assert.match(page, /\{freeSnapshotPageFixPackRest\}/);
  const offerCopy = readFileSync(new URL("./core-offer-schema.ts", import.meta.url), "utf8");
  assert.match(offerCopy, /within a few business days after payment/);
  assert.match(page, /business name, city, service, website, and email/);
  assert.match(page, /through FlowForm/);
  assert.doesNotMatch(page, /does not post to a server/);
  assert.match(form, /through FlowForm/);
  assert.match(form, /snapshotSentMessage/);
  assert.doesNotMatch(page, /Samuel|Lamphier|testimonial|customers served|guarantee/i);
  assert.doesNotMatch(page, /few minutes|24 hours|48 hours/);
  assert.match(form, /snapshotMailto/);
  assert.match(form, /EmailRequestFallback/);
  assert.match(form, /Website/);
  assert.match(form, /All fields are required/);
  assert.match(form, /We do not ask for passwords, cookies, or content behind a login/);
  assert.match(trust, /href="\/about"/);
  assert.match(trust, /href="\/refunds"/);
  assert.match(trust, /href="\/privacy"/);
  assert.match(offerFaq, /export const freeSnapshotPageFaqs/);
  assert.match(offerFaq, /What does the free AI Answer Snapshot show\?/);
  assert.match(offerFaq, /How do I request the snapshot or the Fix Pack\?/);
  assert.match(offerFaq, /When is the Fix Pack delivered\?/);
  assert.equal(
    marketingPaths.some((item) => item.path === "/free-snapshot"),
    true,
  );
});

test("homepage shows the request form before the Payhip buy on a phone", () => {
  const hero = home.slice(home.indexOf("<main"), home.indexOf("</section>"));
  const heading = hero.indexOf("When customers ask ChatGPT");
  const cardHeading = hero.indexOf("Request the snapshot");
  const form = hero.indexOf("<SnapshotRequestForm");
  const buy = hero.indexOf("<FixPackBuyLink");
  const lead = hero.indexOf("Get a one-page snapshot of who is named");
  assert.ok(heading !== -1 && cardHeading !== -1 && heading < cardHeading, "h1 is the first heading");
  assert.ok(heading < form, "headline comes before the form in DOM order");
  assert.ok(form < lead, "lead copy sits below the form");
  assert.ok(form < buy, "request form stays before the Payhip buy");
  assert.match(hero, /lg:grid-cols-\[minmax\(0,1fr\)_min\(26rem,42%\)\]/);
  assert.match(hero, /lg:grid-rows-\[auto_1fr\]/);
  assert.match(hero, /lg:col-start-2/);
  assert.match(hero, /lg:row-start-1/);
  assert.match(hero, /lg:row-span-2/);
  assert.doesNotMatch(hero, /order-[123]/);
  assert.doesNotMatch(hero, /lg:float-right/);
  assert.match(hero, /min-h-12/);
  assert.doesNotMatch(hero, /sm:flex-row/);
  assert.doesNotMatch(hero, /(?<!min-)h-12/);
  assert.match(
    hero,
    /<SnapshotRequestForm\s+caveat=\{false\}\s+privacyAfterSubmit\s+replyTiming\s+hideRequiredNote\s+\/>/,
  );
  assert.match(hero, /gap-2 px-5 py-2 sm:gap-6 sm:py-10/);
  assert.match(hero, /p-3 sm:p-4/);
  assert.doesNotMatch(
    hero,
    /href="\/free-snapshot"[^>]*>\s*Get a free AI Answer Snapshot\s*</,
  );
  assert.match(hero, /No checkout\. We email the one-page snapshot\./);
});

test("main snapshot CTAs point at the free snapshot page", () => {
  for (const source of [home, fixPack, sample]) {
    assert.match(source, /href="\/free-snapshot"/);
  }
  assert.match(industry, /snapshotHref = "\/free-snapshot"/);
  assert.match(industry, /href=\{snapshotHref\}/);
  assert.doesNotMatch(home, /href="\/#snapshot"/);
  assert.doesNotMatch(fixPack, /href="\/#snapshot"/);
  assert.doesNotMatch(sample, /href="#snapshot"/);
  assert.doesNotMatch(industry, /href="\/#snapshot"/);
  assert.match(industry, /EmailRequestFallback/);
  assert.match(sample, /<SnapshotRequestForm caveat=\{false\} source="\/sample-snapshot" \/>/);
});

test("/free-snapshot/thanks permanently redirects to /thank-you and stays out of the index", () => {
  assert.equal(
    existsSync(new URL("../app/free-snapshot/thanks/page.tsx", import.meta.url)),
    false,
  );
  assert.equal(
    existsSync(new URL("../app/free-snapshot/thanks/route.ts", import.meta.url)),
    false,
  );
  assert.match(
    nextConfig,
    /source:\s*"\/free-snapshot\/thanks",\s*destination:\s*"\/thank-you",\s*permanent:\s*true/,
  );
  assert.equal(
    marketingPaths.some((item) => item.path === "/free-snapshot/thanks"),
    false,
  );
  const sitemap = readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8");
  assert.doesNotMatch(sitemap, /free-snapshot\/thanks/);
  assert.doesNotMatch(sitemap, /\/thank-you/);
  assert.match(form, /\/thank-you/);
  assert.doesNotMatch(form, /free-snapshot\/thanks/);
  assert.doesNotMatch(form, /free-snapshot\?sent=1/);
});

test("/thank-you confirms the snapshot request, stays out of the index, and aliases redirect", () => {
  const thankYou = readFileSync(new URL("../app/thank-you/page.tsx", import.meta.url), "utf8");
  const sitemap = readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8");
  assert.match(thankYou, /robots: \{ index: false, follow: false \}/);
  assert.match(thankYou, /path: "\/thank-you"/);
  assert.match(thankYou, /authors: \[\{ name: "CiteScore Team" \}\]/);
  assert.match(thankYou, /Request received\. We reply with your one-page snapshot by email\./);
  assert.match(thankYou, /The CiteScore Team prepares the one-page snapshot and emails it\./);
  assert.equal(
    occurrences(
      thankYou,
      "FlowForm delivers the business name, city, service, website, and email. No account and no paid checkout.",
    ),
    1,
  );
  assert.equal(occurrences(thankYou, "There is no set delivery time."), 1);
  assert.equal(
    occurrences(thankYou, "AI answers vary run to run. This is a snapshot, not a ranking."),
    1,
  );
  assert.equal(
    occurrences(thankYou, "It is not a promise that any assistant will name the business."),
    1,
  );
  assert.equal(occurrences(thankYou, "Fictional business, illustrative numbers."), 1);
  assert.match(thankYou, /What happens next/);
  assert.match(thankYou, /href="\/sample-snapshot"/);
  assert.match(thankYou, /Fictional business, illustrative numbers/);
  assert.match(thankYou, /href="\/sample-fix-pack"/);
  assert.match(thankYou, /Illustrative example content, not a real client or real results/);
  assert.match(thankYou, /href="\/fix-pack"/);
  assert.match(thankYou, /<FixPackBuyLink \/>/);
  assert.match(thankYou, /within a few business\s+days after payment/);
  assert.match(thankYou, /href="\/privacy"/);
  assert.match(thankYou, /CiteScore Team/);
  assert.match(thankYou, /Sold by \{sellerName\}/);
  assert.doesNotMatch(thankYou, /Samuel|Lamphier|testimonial|customers served|guarantee/i);
  assert.doesNotMatch(thankYou, /few minutes|24 hours|48 hours|Payment received/);
  assert.equal(marketingPaths.some((item) => item.path === "/thank-you"), false);
  assert.equal(marketingPaths.some((item) => item.path === "/thanks"), false);
  assert.equal(marketingPaths.some((item) => item.path === "/confirmation"), false);
  assert.doesNotMatch(sitemap, /\/thank-you/);
  assert.match(
    nextConfig,
    /source:\s*"\/thanks",\s*destination:\s*"\/thank-you",\s*permanent:\s*true/,
  );
  assert.match(
    nextConfig,
    /source:\s*"\/confirmation",\s*destination:\s*"\/thank-you",\s*permanent:\s*true/,
  );
  assert.match(
    nextConfig,
    /source:\s*"\/free-snapshot\/thanks",\s*destination:\s*"\/thank-you",\s*permanent:\s*true/,
  );
  assert.equal(
    existsSync(new URL("../app/confirmation/page.tsx", import.meta.url)),
    false,
  );
  assert.equal(
    existsSync(new URL("../app/thank-you/page.tsx", import.meta.url)),
    true,
  );
});

test("/snapshot permanently redirects to the free snapshot page", () => {
  assert.match(
    nextConfig,
    /source:\s*"\/snapshot",\s*destination:\s*"\/free-snapshot",\s*permanent:\s*true/,
  );
  assert.match(
    nextConfig,
    /source:\s*"\/ai-answer-snapshot",\s*destination:\s*"\/free-snapshot",\s*permanent:\s*true/,
  );
  assert.match(
    nextConfig,
    /source:\s*"\/free-ai-answer-snapshot",\s*destination:\s*"\/free-snapshot",\s*permanent:\s*true/,
  );
  assert.doesNotMatch(nextConfig, /source:\s*"\/free-snapshot"\s*,/);
});
