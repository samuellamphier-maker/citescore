import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const offerFaq = readFileSync(new URL("./offer-faq.ts", import.meta.url), "utf8");
const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const sample = readFileSync(new URL("../app/sample-snapshot/page.tsx", import.meta.url), "utf8");
const fixPack = readFileSync(new URL("../app/fix-pack/page.tsx", import.meta.url), "utf8");
const list = readFileSync(new URL("../components/FaqList.tsx", import.meta.url), "utf8");

const required = [
  "What does the free AI Answer Snapshot show?",
  "How is the snapshot produced?",
  "When is the Fix Pack delivered?",
  "What is in the Fix Pack, and what do I do with it?",
  "Will ChatGPT name my business after this?",
  "Do I need to give a login or site access?",
  "How do I request the snapshot or the Fix Pack?",
  "What if the Fix Pack is not useful?",
  "Who runs CiteScore?",
];

test("snapshot FAQ uses only stated offer facts", () => {
  for (const question of required) {
    assert.match(offerFaq, new RegExp(question.replaceAll("?", "\\?")));
  }
  assert.match(offerFaq, /CiteScore Team/);
  assert.match(offerFaq, /\$\{sellerName\}/);
  assert.match(offerFaq, /About page/);
  assert.match(offerFaq, /\$\{contactEmail\}/);
  assert.match(offerFaq, /no account and no paid checkout/);
  assert.match(offerFaq, /does not post to a server/);
  assert.match(offerFaq, /passwords, cookies, or pages behind a login/);
  assert.match(offerFaq, /There is no \$\{fixPackIntroPriceLabel\} checkout product yet/);
  assert.match(offerFaq, /copy the request and email it/);
  assert.match(offerFaq, /refund the Fix Pack in full/);
  assert.match(offerFaq, /We reply with the one-page snapshot/);
  assert.match(offerFaq, /"@type": "FAQPage"/);
  assert.match(offerFaq, /text: item\.a/);
  assert.match(offerFaq, /Does llms\.txt get a local business named\?/);
  assert.match(offerFaq, /Search Engine Land/);
  assert.doesNotMatch(
    offerFaq,
    /few minutes|business day|24 hours|48 hours|guarantee|testimonial|Payhip|customers served/i,
  );
  assert.doesNotMatch(offerFaq, /\b(John|Jane|Samuel|Lamphier)\b/);
});

test("homepage, example snapshot, and Fix Pack render the FAQ and schema", () => {
  for (const source of [home, sample]) {
    assert.match(source, /snapshotOfferFaqs/);
    assert.match(source, /faqPageJsonLd/);
    assert.match(source, /<FaqList/);
  }
  assert.match(fixPack, /fixPackFaqs\(\)/);
  assert.match(fixPack, /faqPageJsonLd/);
  assert.match(fixPack, /<FaqList/);
  assert.match(home, /id="faq"/);
  assert.match(list, /"\/about"/);
  assert.match(list, /"\/refunds"/);
  assert.match(list, /mailto:/);
  assert.match(list, /sonickStudyUrl/);
  assert.match(list, /llmsTxtSourceUrl/);
});
