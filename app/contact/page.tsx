import type { Metadata } from "next";
import Link from "next/link";
import { InlineSnapshotRequest } from "@/components/InlineSnapshotRequest";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMeta } from "@/lib/content/meta";
import { contactEmail, fixPackIntroPriceLabel, sellerName } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Request a free AI Answer Snapshot",
  description: `Request a free AI Answer Snapshot. Email ${contactEmail}. The ${fixPackIntroPriceLabel} Fix Pack is optional. Include the business name, website, and city or trade.`,
  path: "/contact",
});

const include = ["Business name", "Website", "City or trade"] as const;

const pages = [
  { href: "/free-snapshot", label: "Get a free AI Answer Snapshot" },
  { href: "/fix-pack", label: `Fix Pack, ${fixPackIntroPriceLabel}` },
  { href: "/sample-snapshot", label: "Example snapshot" },
  { href: "/sample-fix-pack", label: "Example Fix Pack" },
  { href: "/refunds", label: "Refunds" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
] as const;

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-5 py-14">
        <p className="kicker">Contact</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">
          Request a free AI Answer Snapshot
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          Tell us the business, the city, the service, and the website.
          CiteScore asks logged-out ChatGPT and Perplexity who they name for
          that trade and city, and replies with a one-page snapshot. The{" "}
          <Link href="/fix-pack" className="text-forest underline">
            Fix Pack
          </Link>{" "}
          is {fixPackIntroPriceLabel}. AI answers vary run to run. This is a
          snapshot, not a ranking, and not a promise that any assistant will
          name the business.
        </p>
        <p className="mt-4 text-sm leading-6">
          <Link href="/sample-snapshot" className="font-medium text-forest underline">
            See an example snapshot
          </Link>
          <span className="text-ink-soft"> · </span>
          <Link href="/fix-pack" className="font-medium text-forest underline">
            See what&apos;s in the Fix Pack
          </Link>
          <span className="text-ink-soft">
            . Example pages use illustrative numbers.
          </span>
        </p>
        <InlineSnapshotRequest source="/contact" />

        <div className="mt-12 space-y-6 border-t border-rule pt-8 text-[15px] leading-7 text-ink-soft">
          <h2 className="font-serif text-2xl text-ink">Email</h2>
          <p>
            The form is the request. For anything else, email{" "}
            <a href={`mailto:${contactEmail}`} className="text-forest underline">
              {contactEmail}
            </a>
            . Sold by {sellerName}.
          </p>

          <h2 className="font-serif text-2xl text-ink">What to include</h2>
          <p>In your message, include:</p>
          <ul className="list-disc space-y-2 pl-5">
            {include.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="font-serif text-2xl text-ink">Pages</h2>
          <ul className="list-disc space-y-2 pl-5">
            {pages.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="text-forest underline">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="border-t border-rule pt-6 text-ink">CiteScore Team</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
