import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { register } from "node:module";
import { test } from "node:test";

register("./alias-hook.mjs", import.meta.url);

const { contactEmail, productionOrigin, site } = await import("./site.ts");
const {
  citeScoreOrganizationJsonLd,
  citeScoreWebsiteJsonLd,
  freeSnapshotServiceDescription,
  freeSnapshotServiceJsonLd,
  organizationId,
  organizationLogoPath,
  websiteId,
} = await import("./site-schema.ts");

const invented =
  /Samuel|Lamphier|aggregateRating|reviewCount|ratingValue|testimonial|customers served/i;

function parsed(data: Record<string, unknown>) {
  return JSON.parse(JSON.stringify(data)) as Record<string, unknown>;
}

test("organization and website JSON-LD parse and share one organization id", () => {
  const origin = productionOrigin;
  const organization = parsed(citeScoreOrganizationJsonLd(origin));
  const website = parsed(citeScoreWebsiteJsonLd(origin));
  const contactPoint = organization.contactPoint as Record<string, unknown>;
  const publisher = website.publisher as Record<string, unknown>;

  assert.equal(organization["@context"], "https://schema.org");
  assert.equal(organization["@type"], "Organization");
  assert.equal(organization["@id"], organizationId(origin));
  assert.equal(organization["@id"], `${origin}#organization`);
  assert.equal(organization.name, "CiteScore");
  assert.equal(organization.name, site.name);
  assert.equal(organization.url, origin);
  assert.equal(organization.logo, `${origin}${organizationLogoPath}`);
  assert.equal(organization.description, site.description);
  assert.equal(organization.email, contactEmail);
  assert.equal(contactPoint["@type"], "ContactPoint");
  assert.equal(contactPoint.email, contactEmail);
  assert.equal(contactPoint.url, `${origin}/contact`);
  assert.equal("sameAs" in organization, false);
  assert.equal("telephone" in organization, false);

  assert.equal(website["@type"], "WebSite");
  assert.equal(website["@id"], websiteId(origin));
  assert.equal(website.name, site.name);
  assert.equal(website.url, origin);
  assert.deepEqual(publisher, { "@id": organization["@id"] });
  assert.equal("potentialAction" in website, false);

  assert.doesNotMatch(JSON.stringify({ organization, website }), invented);
  assert.equal(existsSync(new URL(`../public${organizationLogoPath}`, import.meta.url)), true);

  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(layout, /citeScoreOrganizationJsonLd\(publicOrigin\(\)\)/);
  assert.match(layout, /citeScoreWebsiteJsonLd\(publicOrigin\(\)\)/);
  assert.doesNotMatch(layout, invented);
});

test("free snapshot service JSON-LD parses as a price-0 offer", () => {
  const origin = productionOrigin;
  const service = parsed(freeSnapshotServiceJsonLd(origin));
  const provider = service.provider as Record<string, unknown>;
  const offers = service.offers as Record<string, unknown>;
  const seller = offers.seller as Record<string, unknown>;

  assert.equal(service["@type"], "Service");
  assert.equal(service.name, "Free AI Answer Snapshot");
  assert.equal(service.description, freeSnapshotServiceDescription);
  assert.match(freeSnapshotServiceDescription, /Request a free AI Answer Snapshot\./);
  assert.match(freeSnapshotServiceDescription, /logged-out ChatGPT and Perplexity/);
  assert.match(freeSnapshotServiceDescription, /There is no set delivery time\./);
  assert.doesNotMatch(freeSnapshotServiceDescription, /for one local business/);
  assert.equal(service.url, `${origin}/free-snapshot`);
  assert.equal(service["@id"], `${origin}/free-snapshot#service`);
  assert.deepEqual(provider, { "@id": organizationId(origin) });
  assert.equal(offers["@type"], "Offer");
  assert.equal(offers.price, "0");
  assert.equal(offers.priceCurrency, "USD");
  assert.equal(offers.url, `${origin}/free-snapshot`);
  assert.deepEqual(seller, { "@id": organizationId(origin) });
  assert.equal("aggregateRating" in service, false);
  assert.doesNotMatch(JSON.stringify(service), invented);

  const page = readFileSync(new URL("../app/free-snapshot/page.tsx", import.meta.url), "utf8");
  assert.match(page, /freeSnapshotServiceJsonLd\(publicOrigin\(\)\)/);
  assert.match(
    page,
    /Request a free AI Answer Snapshot for one local business\. We ask logged-out ChatGPT and Perplexity/,
  );
});

test("/ai-visibility-checklist permanently redirects to /checklist", () => {
  const nextConfig = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
  assert.match(
    nextConfig,
    /source:\s*"\/ai-visibility-checklist",\s*destination:\s*"\/checklist",\s*permanent:\s*true/,
  );
  assert.equal(
    existsSync(new URL("../app/ai-visibility-checklist/page.tsx", import.meta.url)),
    false,
  );
  assert.equal(existsSync(new URL("../app/checklist/page.tsx", import.meta.url)), true);
});
