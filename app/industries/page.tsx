import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { industryGroups, industryPageLabel } from "@/lib/content/industries";
import { pageMeta } from "@/lib/content/meta";
import {
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  publicOrigin,
  sellerName,
  site,
} from "@/lib/site";

const path = "/industries";
const title = "Industries";
const description = `Industry and local-business pages already on CiteScore, including plumbers, restaurants, and real estate. The free AI Answer Snapshot and the ${fixPackIntroPriceLabel} Fix Pack are on this site.`;

export const metadata: Metadata = {
  ...pageMeta({
    title,
    description,
    path,
  }),
  authors: [{ name: "CiteScore Team" }],
  creator: sellerName,
};

function IndustryCtas() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <Link
        href="/free-snapshot"
        className="inline-flex h-12 items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream transition-colors hover:bg-forest-deep"
      >
        Get a free AI Answer Snapshot
      </Link>
      <Link
        href="/fix-pack"
        className="inline-flex h-12 items-center justify-center rounded-lg border border-ink/25 bg-cream px-5 text-base font-medium text-ink transition-colors hover:border-ink"
      >
        {`Fix Pack, ${fixPackIntroPriceLabel}`}
      </Link>
    </div>
  );
}

export default function IndustriesPage() {
  const origin = publicOrigin();
  const groups = industryGroups();
  const pages = groups.flatMap((group) => group.pages);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: origin,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Industries",
              item: `${origin}${path}`,
            },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${title} · ${site.name}`,
          numberOfItems: pages.length,
          itemListElement: pages.map((page, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: industryPageLabel(page),
            url: `${origin}${page.path}`,
          })),
        }}
      />
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-5 py-14">
        <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="underline-offset-4 hover:text-ink hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Industries</li>
          </ol>
        </nav>
        <p className="kicker mt-6">Industries</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">
          Industry and local-business pages.
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          {pages.length} pages already on this site: a visibility guide, a schema
          generator, or both. {site.tagline} The free AI Answer Snapshot asks
          logged-out ChatGPT and Perplexity who they name for that trade and
          city. The {fixPackIntroPriceLabel} Fix Pack ({fixPackListPriceLabel}{" "}
          list) is optional.
        </p>

        <section className="mt-8 rounded-2xl border border-ink bg-cream px-5 py-6">
          <p className="kicker">Free AI Answer Snapshot</p>
          <h2 className="mt-2 font-serif text-3xl tracking-tight">{site.tagline}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-soft">
            Request a free AI Answer Snapshot for one local business. The{" "}
            <Link href="/fix-pack" className="text-forest underline">
              AI Visibility Fix Pack
            </Link>{" "}
            is {fixPackIntroPriceLabel} introductory ({fixPackListPriceLabel}{" "}
            list). Sold by {sellerName}.
          </p>
          <div className="mt-5">
            <IndustryCtas />
          </div>
        </section>

        {groups.map((group) => (
          <section key={group.id} id={group.id} className="mt-12">
            <h2 className="font-serif text-3xl tracking-tight">{group.title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-soft">{group.intro}</p>
            <ul className="mt-4 divide-y divide-rule border-y border-rule">
              {group.pages.map((page) => (
                <li key={page.path} className="py-4">
                  <Link
                    href={page.path}
                    className="font-medium text-forest underline-offset-4 hover:underline"
                  >
                    {industryPageLabel(page)}
                  </Link>
                  <p className="mt-1 text-sm leading-6 text-ink-soft">{page.card}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="mt-10 text-sm leading-6 text-ink-soft">
          The wider list, including answer engines and schema that is not tied
          to one trade, is on the{" "}
          <Link href="/guides" className="text-forest underline">
            guides
          </Link>{" "}
          page.
        </p>

        <section className="mt-12 rounded-2xl border border-ink bg-cream px-5 py-6">
          <p className="kicker">Next step</p>
          <h2 className="mt-2 font-serif text-3xl tracking-tight">
            See who is named, then decide on the Fix Pack.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-soft">
            The snapshot is free. AI answers vary run to run. This is a
            snapshot, not a ranking. The Fix Pack is not a promise that any
            assistant will name the business.
          </p>
          <div className="mt-5">
            <IndustryCtas />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
