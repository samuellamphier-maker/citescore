import type { Metadata } from "next";
import Link from "next/link";
import { FunnelCtaRow } from "@/components/FunnelCtaRow";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { pageMeta } from "@/lib/content/meta";
import { contactEmail, sellerName } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Privacy",
  description:
    `How ${sellerName} handles URLs, snapshot requests, and language-model processing. Contact ${contactEmail}.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-2xl flex-1 px-5 py-14">
        <p className="kicker">Privacy</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">
          What we collect, and what an LLM may see.
        </h1>
        <p className="mt-4 text-sm text-ink-soft">
          Sold by {sellerName}. Questions:{" "}
          <a href={`mailto:${contactEmail}`} className="text-forest underline">
            {contactEmail}
          </a>
          .
        </p>
        <FunnelCtaRow />
        <div className="mt-8 space-y-6 text-[15px] leading-7 text-ink-soft">
          <p>
            The free AI Answer Snapshot is not a purchase. The form sends the
            business name, city, service, website, and email so we can reply
            with the one-page snapshot. We ask logged-out ChatGPT and
            Perplexity who they name for that trade and city. The AI
            Visibility Fix Pack and the other digital files are separate. We
            collect the minimum needed to send that reply or to produce a
            file you paid for.
          </p>
          <h2 className="font-serif text-2xl text-ink">URL you submit</h2>
          <p>
            For the free AI Answer Snapshot, the website is sent with the
            business name, city, service, and email. For a paid audit, the
            site URL is stored with the order. If the GEO audit checkout is
            not configured, that URL can be stored with a waitlist entry
            instead. We fetch publicly available pages from that host to
            score AI-search visibility. Do not submit a URL you are not
            allowed to have processed.
          </p>
          <h2 className="font-serif text-2xl text-ink">Language models</h2>
          <p>
            The free AI Answer Snapshot asks logged-out ChatGPT and Perplexity
            who they name for that trade and city. Public page text, titles,
            and structured snippets from the submitted URL{" "}
            <strong className="text-ink">may be sent to a large language
            model</strong> (and related embedding or crawl services) to help
            score visibility and draft the fix list. That is inherent to the
            product. We do not ask for passwords,
            cookies, or content behind a login.
          </p>
          <h2 className="font-serif text-2xl text-ink">Email</h2>
          <p>
            We use the email address to reply with the free AI Answer
            Snapshot, to send the Fix Pack or a PDF, and to send a payment
            receipt. We do not sell emails. Paid jobs are stored in Supabase
            when configured, otherwise a JSON file (or{" "}
            <code className="font-mono text-xs">/tmp</code> on Vercel). If
            the GEO audit checkout is not configured, a waitlist row uses the
            same file-store pattern, and that address can receive a one-time
            notice that those audit payments are open.
          </p>
          <p>
            The free AI Answer Snapshot form sends the business name, city,
            service, website, and email through FlowForm to {contactEmail}.
            The browser posts that form directly to FlowForm. The subject
            is “Free AI Answer Snapshot.” The same email is set as the
            reply-to address. A hidden honeypot field is checked in the
            browser and is left out of the post when it is empty. After
            FlowForm accepts the post, it can send the visitor back
            to this site. If the post fails, the email button on the form
            opens your email app with those same fields, or you can copy the
            address and the request text. We receive the request when
            FlowForm delivers it, or when you send the email yourself. On a
            trade guide or a how-to-get-cited guide, the form also sends that
            page path so the request shows where it was submitted.
          </p>
          <p>
            After you pay for the AI Visibility Fix Pack, the form on the
            next-steps page sends the business name, city, main service,
            public site URL, and email through FlowForm to {contactEmail}.
            The browser posts that form directly to FlowForm. The subject is
            “Fix Pack intake after payment.” This is not a new free AI Answer
            Snapshot request. The same email is set as the reply-to address.
            A hidden honeypot field is checked in the browser and is left out
            of the post when it is empty. If the post fails, the email button
            opens your email app with those same fields, or you can copy the
            address and the request text. We receive the details when FlowForm
            delivers them, or when you send the email yourself.
          </p>
          <h2 className="font-serif text-2xl text-ink">Payments</h2>
          <p>
            Card data is handled by Stripe, Polar, or Payhip via a payment
            link. CiteScore never sees full card numbers.
          </p>
          <h2 className="font-serif text-2xl text-ink">Contact</h2>
          <p>
            Questions about a stored URL or a refund: email{" "}
            <a href={`mailto:${contactEmail}`} className="text-forest underline">
              {contactEmail}
            </a>
            . The{" "}
            <Link href="/refunds" className="text-forest underline">
              refunds
            </Link>{" "}
            page and the{" "}
            <Link href="/terms" className="text-forest underline">
              terms
            </Link>{" "}
            page say what a refund covers.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
