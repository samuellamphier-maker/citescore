import type { Metadata } from "next";
import Link from "next/link";
import { FixPackBuyLink } from "@/components/FixPackBuyLink";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { blogPosts } from "@/lib/content/blog";
import { guideGroups } from "@/lib/content/guides";
import { formatDisplayDate, pageMeta } from "@/lib/content/meta";
import {
  fixPackGetCtaLabel,
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  publicOrigin,
  sellerName,
  site,
} from "@/lib/site";

const path = "/guides";
const title = "Guides";
const description = `Guides from the CiteScore Team on answer-engine citations, industry pages, robots.txt, schema, and llms.txt. The free AI Answer Snapshot and the ${fixPackIntroPriceLabel} Fix Pack are on this site.`;

export const metadata: Metadata = {
  ...pageMeta({
    title,
    description,
    path,
  }),
  authors: [{ name: "CiteScore Team" }],
  creator: sellerName,
};

function GuideCtas() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <Link
        href="/free-snapshot"
        className="inline-flex h-12 items-center justify-center rounded-lg bg-forest px-5 text-base font-medium text-cream transition-colors hover:bg-forest-deep"
      >
        Get a free AI Answer Snapshot
      </Link>
      <FixPackBuyLink compact label={fixPackGetCtaLabel()} />
      <Link
        href="/fix-pack"
        className="inline-flex h-12 items-center justify-center rounded-lg border border-ink/25 bg-cream px-5 text-base font-medium text-ink transition-colors hover:border-ink"
      >
        Fix Pack, {fixPackIntroPriceLabel}
      </Link>
    </div>
  );
}

export default function GuidesPage() {
  const origin = publicOrigin();
  const groups = guideGroups();
  const pages = groups.flatMap((group) => group.pages);
  const guideCount = pages.length;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${title} · ${site.name}`,
          description,
          url: `${origin}${path}`,
          author: { "@type": "Organization", name: "CiteScore Team", url: origin },
          publisher: { "@type": "Organization", name: site.name, url: origin },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: guideCount,
            itemListElement: pages.map((page, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: page.title,
              url: `${origin}${page.path}`,
            })),
          },
        }}
      />
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-14">
        <p className="kicker">Guides</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">
          Guides from the CiteScore Team.
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          {guideCount} guides on answer engines, industries, and the public files
          a crawler can read. {site.tagline} The free AI Answer Snapshot asks
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
            <GuideCtas />
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
                    {page.title}
                  </Link>
                  <p className="mt-1 text-sm leading-6 text-ink-soft">{page.card}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="mt-12" id="essays">
          <h2 className="font-serif text-3xl tracking-tight">Essays</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-soft">
            Longer notes on the{" "}
            <Link href="/blog" className="text-forest underline">
              blog
            </Link>
            .
          </p>
          <ul className="mt-4 divide-y divide-rule border-y border-rule">
            {blogPosts.map((post) => (
              <li key={post.slug} className="py-4">
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-medium text-forest underline-offset-4 hover:underline"
                >
                  {post.title}
                </Link>
                <p className="mt-1 text-sm leading-6 text-ink-soft">{post.description}</p>
                <p className="mt-2 text-xs text-ink-soft">
                  {formatDisplayDate(post.publishedAt)} · {post.minutes} min
                </p>
              </li>
            ))}
          </ul>
        </section>

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
            <GuideCtas />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
