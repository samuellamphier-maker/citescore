import type { ReactNode } from "react";
import Link from "next/link";
import { AuditCta } from "@/components/AuditCta";
import { HomeServiceGuideCallout } from "@/components/HomeServiceGuideCallout";
import { IndustrySnapshotCta } from "@/components/IndustrySnapshotCta";
import { RelatedGuides } from "@/components/RelatedGuides";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TradeGuideStickyCta } from "@/components/TradeGuideStickyCta";
import type { BlogPost } from "@/lib/content/blog";
import { formatDisplayDate } from "@/lib/content/meta";
import { freeSnapshotPath, homeServiceTradeForGuide } from "@/lib/home-service-trade";
import {
  showsGuideSnapshotCallout,
  snapshotOfferForPage,
  tradeGuideStickySnapshotHref,
} from "@/lib/industry-snapshot";
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
  const snapshotOffer = snapshotOfferForPage({ guidePath, ctaId });
  const homeService = guidePath ? homeServiceTradeForGuide(guidePath) : null;
  const stickyHref = guidePath ? tradeGuideStickySnapshotHref(guidePath) : null;
  const generalSnapshot =
    !snapshotOffer &&
    !homeService &&
    showsGuideSnapshotCallout({ guidePath, ctaId });
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-14">
        <p className="kicker">{kicker}</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">{title}</h1>
        {homeService ? (
          <div className="mt-6">
            <HomeServiceGuideCallout trade={homeService} />
          </div>
        ) : null}
        <p className="mt-4 text-lg leading-8 text-ink-soft">{dek}</p>
        {publishedAt ? (
          <p className="mt-3 text-sm text-ink-soft">
            {formatDisplayDate(publishedAt)}
            {author ? ` · ${author}` : null}
            {minutes ? ` · ${minutes} min read` : null}
          </p>
        ) : null}
        {!homeService && (snapshotOffer || generalSnapshot) ? (
          <div className="mt-8">
            <IndustrySnapshotCta
              industry={snapshotOffer?.industry}
              variant={generalSnapshot ? "general" : "industry"}
            />
          </div>
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
        {snapshotOffer ? (
          <div className="mt-12">
            <IndustrySnapshotCta
              industry={snapshotOffer.industry}
              snapshotHref={homeService ? freeSnapshotPath(homeService.id) : undefined}
            />
          </div>
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
      {stickyHref ? <TradeGuideStickyCta href={stickyHref} /> : null}
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
