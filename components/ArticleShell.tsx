import type { ReactNode } from "react";
import Link from "next/link";
import { AuditCta } from "@/components/AuditCta";
import { RelatedGuides } from "@/components/RelatedGuides";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { BlogPost } from "@/lib/content/blog";
import { formatDisplayDate } from "@/lib/content/meta";
import { doneForYouAuditLabel, doneForYouAuditPath } from "@/lib/site";

type Related = {
  href: string;
  label: string;
};

type Props = {
  kicker: string;
  title: string;
  dek: string;
  publishedAt?: string;
  minutes?: number;
  author?: string;
  children: ReactNode;
  related?: Related[];
  ctaId?: string;
  /** When set, render the shared Related guides list for this path. */
  guidePath?: string;
  /** Paid audit box. Guides that only link the free check and checkout set this false. */
  showAuditCta?: boolean;
};

export function ArticleShell({
  kicker,
  title,
  dek,
  publishedAt,
  minutes,
  author,
  children,
  related = [],
  ctaId,
  guidePath,
  showAuditCta = true,
}: Props) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-14">
        <p className="kicker">{kicker}</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">{title}</h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">{dek}</p>
        {publishedAt ? (
          <p className="mt-3 text-sm text-ink-soft">
            {formatDisplayDate(publishedAt)}
            {author ? ` · ${author}` : null}
            {minutes ? ` · ${minutes} min read` : null}
          </p>
        ) : null}
        <div className="article-prose mt-10">{children}</div>
        {showAuditCta ? (
          <AuditCta
            id={ctaId}
            footer={
              guidePath ? (
                <p className="text-sm leading-6 text-ink-soft">
                  <Link
                    href={doneForYouAuditPath}
                    className="font-medium text-forest underline underline-offset-4"
                  >
                    {doneForYouAuditLabel}
                  </Link>
                  . A written walkthrough, delivered within 3 business days.
                </p>
              ) : null
            }
          />
        ) : null}
        {guidePath ? <RelatedGuides current={guidePath} /> : null}
        {related.length > 0 ? (
          <nav className="mt-10 border-t border-rule pt-6" aria-label="Related">
            <p className="kicker">Keep reading</p>
            <ul className="mt-3 space-y-2">
              {related.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-forest underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}

export function relatedFromPosts(posts: BlogPost[], extra: Related[] = []) {
  return [
    ...posts.map((post) => ({
      href: `/blog/${post.slug}`,
      label: post.title,
    })),
    ...extra,
  ];
}
