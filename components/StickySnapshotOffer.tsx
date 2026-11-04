import { TradeGuideStickyCta } from "@/components/TradeGuideStickyCta";
import { contentStickySnapshotHref } from "@/lib/industry-snapshot";

/**
 * The same bottom bar ArticleShell renders, for pages that do not use that shell.
 * The href is the on-page form when this page already has one.
 */
export function StickySnapshotOffer({ path }: { path: string }) {
  const href = contentStickySnapshotHref({ guidePath: path });
  if (!href) return null;
  return <TradeGuideStickyCta href={href} />;
}
