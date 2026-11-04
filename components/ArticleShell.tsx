import type { ReactNode } from "react";
import Link from "next/link";
import { AuditSecondaryNote } from "@/components/AuditSecondaryNote";
import { HomeServiceGuideCallout } from "@/components/HomeServiceGuideCallout";
import { IndustrySnapshotCta } from "@/components/IndustrySnapshotCta";
import { RelatedGuides } from "@/components/RelatedGuides";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SnapshotRequestForm } from "@/components/SnapshotRequestForm";
import { TradeGuideStickyCta } from "@/components/TradeGuideStickyCta";
import type { BlogPost } from "@/lib/content/blog";
import { formatDisplayDate } from "@/lib/content/meta";
import { freeSnapshotPath, homeServiceTradeForGuide } from "@/lib/home-service-trade";
import {
  contentStickySnapshotHref,
  inlineSnapshotRequestForPath,
  showsGuideSnapshotCallout,
  snapshotOfferForPage,
} from "@/lib/industry-snapshot";
import { fixPackIntroPriceLabel } from "@/lib/site";

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
  /** Smaller $39 mention under the snapshot close. Guides that already link the audit set this false. */
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
  const inlineSnapshot = inlineSnapshotRequestForPath(guidePath);
  const stickyHref = contentStickySnapshotHref({ guidePath, ctaId });
  const generalSnapshot =
    !snapshotOffer &&
    !homeService &&
    (showsGuideSnapshotCallout({ guidePath, ctaId }) ||
      showAuditCta ||
      Boolean(guidePath));
  const listed =
    related.length === 0
      ? related
      : [
          { href: "/free-snapshot", label: "Free AI Answer Snapshot" },
          {
            href: "/fix-pack",
            label: `Fix Pack (${fixPackIntroPriceLabel})`,
          },
          ...related.filter(
            (item) => item.href !== "/free-snapshot" && item.href !== "/fix-pack",
          ),
        ];
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-2xl flex-1 px-5 py-14">
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
        {snapshotOffer || generalSnapshot ? (
          <div className="mt-12">
            <IndustrySnapshotCta
              industry={snapshotOffer?.industry}
              snapshotHref={homeService ? freeSnapshotPath(homeService.id) : undefined}
              variant={generalSnapshot ? "general" : "industry"}
            />
          </div>
        ) : null}
        {inlineSnapshot ? (
          <section className="mt-12" aria-labelledby="guide-snapshot-request" data-funnel-cta>
            <h2 id="guide-snapshot-request" className="font-serif text-2xl tracking-tight">
              Request a free AI Answer Snapshot
            </h2>
            <p className="mt-3 text-sm leading-6 text-ink-soft">
              Same request as the{" "}
              <Link
                href={homeService ? freeSnapshotPath(homeService.id) : "/free-snapshot"}
                className="text-forest underline"
              >
                free snapshot page
              </Link>
              . AI answers vary run to run. This is a snapshot, not a ranking,
              and not a promise that any assistant will name the business.
            </p>
            <div className="mt-5">
              <SnapshotRequestForm
                defaultService={inlineSnapshot.service}
                source={inlineSnapshot.source}
              />
            </div>
            <p className="mt-4 text-sm leading-6 text-ink-soft">
              Prepared by the CiteScore Team.
            </p>
          </section>
        ) : null}
        {showAuditCta ? (
          <AuditSecondaryNote includeDoneForYou={Boolean(guidePath)} />
        ) : null}
        {guidePath ? <RelatedGuides current={guidePath} /> : null}
        {related.length > 0 ? (
          <nav className="mt-10 border-t border-rule pt-6" aria-label="Related">
            <p className="kicker">Keep reading</p>
            <ul className="mt-3 space-y-2">
              {listed.map((item) => (
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
