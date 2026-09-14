import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMeta } from "@/lib/content/meta";

export const metadata: Metadata = pageMeta({
  title: "Privacy",
  description:
    "How CiteScore handles URLs, emails, and language-model processing.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-14">
        <p className="kicker">Privacy</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">
          What we collect, and what an LLM may see.
        </h1>
        <div className="mt-8 space-y-6 text-[15px] leading-7 text-ink-soft">
          <p>
            CiteScore is a one-time audit product. We collect the minimum
            needed to take an order and produce a report.
          </p>
          <h2 className="font-serif text-2xl text-ink">URL you submit</h2>
          <p>
            The site URL is stored with your order or waitlist entry. We fetch
            publicly available pages from that host to score AI-search
            visibility. Do not submit a URL you are not allowed to have
            processed.
          </p>
          <h2 className="font-serif text-2xl text-ink">Language models</h2>
          <p>
            Public page text, titles, and structured snippets from the
            submitted URL <strong className="text-ink">may be sent to a
            large language model</strong> (and related embedding or crawl
            services) to help score visibility and draft the fix list. That
            is inherent to the product. We do not ask for passwords, cookies,
            or content behind a login.
          </p>
          <h2 className="font-serif text-2xl text-ink">Email</h2>
          <p>
            Used to send the PDF, payment receipts, and — if checkout is not
            live — a one-time notice that payments are open. We do not sell
            emails. Paid jobs are stored in Supabase when configured, otherwise
            a JSON file (or <code className="font-mono text-xs">/tmp</code> on
            Vercel). Waitlist rows use the same file-store pattern.
          </p>
          <h2 className="font-serif text-2xl text-ink">Payments</h2>
          <p>
            Card data is handled by Stripe or Lemon Squeezy via a payment
            link. CiteScore never sees full card numbers.
          </p>
          <h2 className="font-serif text-2xl text-ink">Contact</h2>
          <p>
            Questions about a stored URL or a refund: start from the{" "}
            <Link href="/#faq" className="text-forest underline">
              FAQ
            </Link>{" "}
            and reply to the receipt or waitlist confirmation once email is
            wired.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
