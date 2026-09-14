import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { blogPosts } from "@/lib/content/blog";
import { formatDisplayDate, pageMeta } from "@/lib/content/meta";
import { publicOrigin, site } from "@/lib/site";

const description =
  "Short explainers on generative engine optimization, ChatGPT citations, and when a $39 audit is enough versus an Otterly- or Profound-class platform.";

export const metadata: Metadata = pageMeta({
  title: "GEO guides",
  description,
  path: "/blog",
});

const extras = [
  {
    href: "/geo-audit",
    title: "GEO audit",
    dek: `The ${site.priceLabel} product page: what you get, how we score, and the checkout path.`,
  },
  {
    href: "/alternatives/otterly",
    title: "CiteScore vs Otterly",
    dek: "One-off punch list versus a monthly AI-search monitor. Different jobs.",
  },
  {
    href: "/sample",
    title: "Sample report",
    dek: "Fictional SaaS, real format. Labeled as a sample — not a testimonial.",
  },
];

export default function BlogIndexPage() {
  const origin = publicOrigin();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `${site.name} guides`,
          description,
          url: `${origin}/blog`,
          publisher: { "@type": "Organization", name: site.name, url: origin },
        }}
      />
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-14">
        <p className="kicker">Guides</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">
          GEO, written so a founder can finish the page.
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
          Editorial notes on generative engine optimization. No fake
          customer stories. No “we logged into ChatGPT for you.” If you
          already know you want the audit,{" "}
          <Link href="/#audit" className="text-forest underline">
            paste a URL
          </Link>
          .
        </p>

        <ol className="mt-10 divide-y divide-rule border-y border-rule">
          {blogPosts.map((post) => (
            <li key={post.slug} className="py-6">
              <p className="kicker">{post.kicker}</p>
              <h2 className="mt-2 font-serif text-2xl tracking-tight">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-forest"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                {post.description}
              </p>
              <p className="mt-3 text-xs text-ink-soft">
                {formatDisplayDate(post.publishedAt)} · {post.minutes} min
              </p>
            </li>
          ))}
        </ol>

        <section className="mt-12">
          <p className="kicker">Also on the site</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {extras.map((item) => (
              <li
                key={item.href}
                className="rounded-xl border border-rule bg-cream px-4 py-4"
              >
                <Link
                  href={item.href}
                  className="font-medium text-forest underline-offset-4 hover:underline"
                >
                  {item.title}
                </Link>
                <p className="mt-2 text-sm leading-6 text-ink-soft">
                  {item.dek}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
