import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { register } from "node:module";
import { test } from "node:test";

register("./alias-hook.mjs", import.meta.url);

const { marketingPaths } = await import("./content/blog.ts");
const { expectedIndustryHubPaths, industryGroups, industryHubSnapshotLink, industryPageLabel } =
  await import("./content/industries.ts");
const { topicPages } = await import("./content/topics.ts");
const {
  freeSnapshotHrefForIndustry,
  industrySchemaGeneratorPaths,
  industrySnapshotLabel,
  schemaIndustries,
  snapshotServicePrefill,
} = await import("./industry-snapshot.ts");
const { parseHomeServiceTrade } = await import("./home-service-trade.ts");

const page = readFileSync(new URL("../app/industries/page.tsx", import.meta.url), "utf8");
const nextConfig = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
const header = readFileSync(new URL("../components/SiteHeader.tsx", import.meta.url), "utf8");
const footer = readFileSync(new URL("../components/SiteFooter.tsx", import.meta.url), "utf8");
const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const guides = readFileSync(new URL("../app/guides/page.tsx", import.meta.url), "utf8");
const notFound = readFileSync(new URL("../app/not-found.tsx", import.meta.url), "utf8");

const invented =
  /Samuel|Lamphier|testimonial|customers served|guarantee|\b(John|Jane)\b|% of/i;

test("industries hub lists every existing industry and local-business page", () => {
  const groups = industryGroups();
  const listed = groups.flatMap((group) => group.pages.map((item) => item.path));
  const expected = expectedIndustryHubPaths();
  assert.equal(listed.length, expected.length);
  assert.deepEqual(new Set(listed), new Set(expected));
  assert.equal(new Set(listed).size, listed.length);
  for (const group of groups) {
    assert.ok(group.pages.length > 0, group.id);
    assert.doesNotMatch(group.intro, invented);
  }

  const schemaPaths = industrySchemaGeneratorPaths();
  for (const schemaPath of [
    "/plumber-schema-generator",
    "/restaurant-schema-generator",
    "/real-estate-agent-schema-generator",
    "/local-business-schema-generator",
    "/hotel-schema-generator",
  ]) {
    assert.equal(schemaPaths.includes(schemaPath), true, schemaPath);
    assert.equal(listed.includes(schemaPath), true, schemaPath);
  }
  assert.equal(listed.includes("/faq-schema-generator"), false);
  assert.equal(listed.includes("/vehicle-schema-generator"), false);
  assert.equal(listed.includes("/service-schema-generator"), false);
  assert.equal(listed.includes("/geo-for-local-businesses"), true);
  assert.ok(listed.some((item) => item.startsWith("/ai-search-visibility-for-")));

  for (const itemPath of listed) {
    const topic = topicPages.find((item) => item.path === itemPath);
    assert.ok(topic, itemPath);
    assert.ok(topic.card.length > 0, itemPath);
    assert.equal(industryPageLabel(topic), topic.navLabel ?? topic.title);
    assert.equal(existsSync(new URL(`../app${itemPath}/page.tsx`, import.meta.url)), true, itemPath);
  }
});

test("industries page leads with the snapshot and Fix Pack and uses existing blurbs", () => {
  assert.match(page, /pageMeta\(\{/);
  assert.match(page, /path,/);
  assert.match(page, /title = "Industries"/);
  assert.match(page, /"@type": "BreadcrumbList"/);
  assert.match(page, /"@type": "ItemList"/);
  assert.match(page, /name: "Home"/);
  assert.match(page, /name: "Industries"/);
  assert.match(page, /aria-label="Breadcrumb"/);
  assert.match(page, /aria-current="page">Industries/);
  assert.match(page, /Get a free AI Answer Snapshot/);
  assert.match(page, /href="\/free-snapshot"/);
  assert.match(page, /href="\/fix-pack"/);
  assert.match(page, /Fix Pack, \$\{fixPackIntroPriceLabel\}/);
  assert.match(page, /industryPageLabel\(page\)/);
  assert.match(page, /\{page\.card\}/);
  assert.match(page, /industryHubSnapshotLink\(page\.path\)/);
  assert.match(page, /Free snapshot for \$\{snapshot\.trade\}/);
  assert.match(page, /href=\{snapshot\.href\}/);
  assert.match(page, /industryGroups\(\)/);
  assert.match(page, /id=\{group\.id\}/);
  assert.doesNotMatch(page, invented);
  assert.equal(marketingPaths.some((item) => item.path === "/industries"), true);
  assert.equal(marketingPaths.some((item) => item.path === "/industry"), false);
  assert.equal(marketingPaths.some((item) => item.path === "/examples"), false);
  assert.equal(marketingPaths.some((item) => item.path === "/example"), false);
  assert.match(header, /href="\/industries"/);
  assert.match(footer, /href="\/industries"/);
  assert.match(home, /href="\/industries"/);
  assert.match(guides, /href="\/industries"/);
  const snapshotAt = page.indexOf('href="/free-snapshot"');
  const fixPackAt = page.indexOf('href="/fix-pack"');
  assert.ok(snapshotAt > -1 && fixPackAt > snapshotAt);
});

test("each industry row reuses that page's snapshot CTA and the form accepts it", () => {
  const listed = industryGroups().flatMap((group) => group.pages.map((item) => item.path));
  const linked = listed.filter((itemPath) => industryHubSnapshotLink(itemPath));
  assert.ok(linked.length >= 17);

  for (const itemPath of listed) {
    const link = industryHubSnapshotLink(itemPath);
    const guideTrade = industrySnapshotLabel(itemPath);
    const schemaTrade = schemaIndustries[itemPath.slice(1)];
    const trade = guideTrade ?? schemaTrade;

    if (!trade || freeSnapshotHrefForIndustry(trade) === "/free-snapshot") {
      assert.equal(link, null, itemPath);
      continue;
    }

    assert.deepEqual(link, { href: freeSnapshotHrefForIndustry(trade), trade }, itemPath);
    const url = new URL(link.href, "https://citescore.vercel.app");
    const tradeId = url.searchParams.get("trade");
    if (tradeId) {
      const parsed = parseHomeServiceTrade(tradeId);
      assert.ok(parsed, itemPath);
      assert.equal(parsed.service.length > 0, true, itemPath);
      assert.equal(url.searchParams.get("service"), null, itemPath);
      continue;
    }
    const service = url.searchParams.get("service");
    assert.equal(snapshotServicePrefill(service), service, itemPath);
  }

  assert.equal(industryHubSnapshotLink("/geo-for-local-businesses"), null);
  assert.equal(industryHubSnapshotLink("/local-business-schema-generator"), null);
  assert.equal(
    industryHubSnapshotLink("/ai-search-visibility-for-plumbers")?.href,
    "/free-snapshot?trade=plumber",
  );
  assert.equal(
    industryHubSnapshotLink("/plumber-schema-generator")?.href,
    "/free-snapshot?trade=plumber",
  );
  assert.equal(
    industryHubSnapshotLink("/ai-search-visibility-for-dentists")?.href,
    "/free-snapshot?service=dental",
  );
  assert.equal(
    industryHubSnapshotLink("/ai-search-visibility-for-law-firms")?.href,
    "/free-snapshot?service=law+firm",
  );
  assert.equal(
    industryHubSnapshotLink("/hotel-schema-generator")?.href,
    "/free-snapshot?service=hotel",
  );
  assert.equal(
    industryHubSnapshotLink("/medical-clinic-schema-generator")?.href,
    "/free-snapshot?service=clinic",
  );
  assert.doesNotMatch(page, invented);
});

test("/examples, /example, and /industry permanently redirect", () => {
  const aliases = [
    { source: "/examples", destination: "/sample-snapshot" },
    { source: "/example", destination: "/sample-snapshot" },
    { source: "/industry", destination: "/industries" },
  ] as const;
  for (const { source, destination } of aliases) {
    assert.match(
      nextConfig,
      new RegExp(
        `source:\\s*"${source}",\\s*destination:\\s*"${destination}",\\s*permanent:\\s*true`,
      ),
    );
    assert.equal(existsSync(new URL(`../app${source}/page.tsx`, import.meta.url)), false);
    assert.equal(existsSync(new URL(`../app${source}/route.ts`, import.meta.url)), false);
    assert.equal(existsSync(new URL(`../app${destination}/page.tsx`, import.meta.url)), true);
  }
  assert.match(notFound, /That page is not in the report\./);
  assert.match(notFound, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/);
});
