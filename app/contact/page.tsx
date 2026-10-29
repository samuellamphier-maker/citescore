import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMeta } from "@/lib/content/meta";
import { contactEmail, sellerName } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description: `Questions about CiteScore: email ${contactEmail}. Include the business name, website, and city or trade.`,
  path: "/contact",
});

const include = ["Business name", "Website", "City or trade"] as const;

const pages = [
  { href: "/free-snapshot", label: "Free AI Answer Snapshot" },
  { href: "/fix-pack", label: "AI Visibility Fix Pack" },
  { href: "/sample-snapshot", label: "Example snapshot" },
  { href: "/refunds", label: "Refunds" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
] as const;

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-14">
        <p className="kicker">Contact</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">Contact</h1>
        <p className="mt-4 text-sm text-ink-soft">
          Sold by {sellerName}. Email{" "}
          <a href={`mailto:${contactEmail}`} className="text-forest underline">
            {contactEmail}
          </a>
          .
        </p>
        <div className="mt-8 space-y-6 text-[15px] leading-7 text-ink-soft">
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
