import type { Metadata } from "next";
import Link from "next/link";
import { FixPackBuyLink } from "@/components/FixPackBuyLink";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TrustLinks } from "@/components/TrustLinks";
import { pageMeta } from "@/lib/content/meta";
import {
  contactEmail,
  fixPackIntroPriceLabel,
  fixPackListPriceLabel,
  sellerName,
} from "@/lib/site";

const sonickStudy = "https://sonickmarketing.com/blog/chatgpt-local-business-study/";

const faqs = [
  {
    q: "What is a free AI Answer Snapshot?",
    a: "For one business, we ask logged-out ChatGPT and Perplexity a local prompt such as “best {service} in {city},” plus one variant. The one-page snapshot records who is named, which sources are cited, and each named competitor’s Google rating and review count next to yours.",
  },
  {
    q: "What does the Fix Pack include?",
    a: "Five pieces: a Google Business Profile gap list against the businesses AI names; a review-gap plan with a copy-paste review-request script; the directories and trade bodies those answers cited, and where you are missing; paste-ready LocalBusiness and Service JSON-LD with install steps for WordPress, Wix, Squarespace, and Shopify; and a re-check of the same prompts 14 days later.",
  },
  {
    q: "When is the Fix Pack delivered?",
    a: "We email the Fix Pack after you request it. When a payment link exists, we email it after payment. The re-check in the pack is the same prompts, run again 14 days later.",
  },
  {
    q: "Will ChatGPT name my business after this?",
    a: "No. The Fix Pack is the work that matches what local AI answers tend to cite: the Google Business Profile, reviews, the directories the answer used, and clear service markup. It is not a promise that any assistant will name you.",
  },
  {
    q: "Do the answers stay the same if you ask again?",
    a: "No. AI answers vary run to run. This is a snapshot, not a ranking. A published UK test of local ChatGPT answers found that only 40% of businesses appeared in all three runs.",
  },
  {
    q: "What if the Fix Pack is not useful?",
    a: "Email us within 14 days of delivery and we refund the Fix Pack in full. You do not have to prove that you implemented anything.",
  },
  {
    q: "Does llms.txt get a local business named?",
    a: "No. llms.txt is optional; Google says it ignores llms.txt. The Fix Pack does not sell an llms.txt file as a citation tactic.",
  },
  {
    q: "How do I pay?",
    a: "There is no $49 checkout product yet. Request the Fix Pack by email. When a payment link exists, the same button goes to checkout.",
  },
  {
    q: "Who sells this?",
    a: `The seller is ${sellerName}. Questions and refunds go to ${contactEmail}.`,
  },
];

export const metadata: Metadata = pageMeta({
  title: `AI Visibility Fix Pack, ${fixPackIntroPriceLabel}`,
  description: `The AI Visibility Fix Pack is ${fixPackIntroPriceLabel} introductory (${fixPackListPriceLabel} list): Google Business Profile gaps, a review plan, cited directories, LocalBusiness JSON-LD, and a 14-day re-check.`,
  path: "/fix-pack",
});

const deliverables = [
  {
    title: "Google Business Profile gap list",
    body: "Category, services, hours, photos, and Q&A, compared with the businesses the snapshot says AI named.",
  },
  {
    title: "Review-gap plan and script",
    body: "How your Google rating and review count compare, plus a copy-paste SMS and email you can send to ask for a review.",
  },
  {
    title: "Directories the answer cited",
    body: "The specific directories and trade bodies named in the snapshot for your trade and city, and where your business is missing.",
  },
  {
    title: "Paste-ready LocalBusiness and Service JSON-LD",
    body: "Markup for your site, plus install steps for WordPress, Wix, Squarespace, and Shopify. The script matches the name, phone, and address already on the page.",
  },
  {
    title: "14-day re-check",
    body: "The same prompts, run again 14 days later, with who is named the second time written next to the first snapshot.",
  },
];

export default function FixPackPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-14">
        <p className="kicker">AI Visibility Fix Pack</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
          Who AI recommends instead of you, and the fixes.
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          The snapshot is free. The Fix Pack is the done-for-you work after
          you have seen who was named. Introductory price{" "}
          {fixPackIntroPriceLabel}. List price {fixPackListPriceLabel}.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <FixPackBuyLink />
          <Link
            href="/#snapshot"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-ink/25 bg-cream px-5 text-base font-medium text-ink hover:border-ink"
          >
            Get a free AI Answer Snapshot
          </Link>
        </div>
        <p className="mt-4 text-sm leading-6">
          <Link href="/sample-snapshot" className="font-medium text-forest underline">
            See an example snapshot
          </Link>
          <span className="text-ink-soft">
            . Fictional business, illustrative numbers.
          </span>
        </p>
        <p className="mt-4 text-sm leading-6 text-ink-soft">
          AI answers vary run to run. This is a snapshot, not a ranking. A
          published test of local ChatGPT answers found that only 40% of
          businesses appeared in all three runs (
          <a href={sonickStudy} className="text-forest underline">
            SoNick Marketing
          </a>
          ).
        </p>

        <h2 className="mt-12 font-serif text-3xl tracking-tight">What you get</h2>
        <ol className="mt-6 space-y-4">
          {deliverables.map((item, index) => (
            <li key={item.title} className="rounded-2xl border border-rule bg-cream px-5 py-4">
              <p className="kicker text-copper">0{index + 1}</p>
              <h3 className="mt-2 font-serif text-2xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ol>

        <h2 className="mt-12 font-serif text-3xl tracking-tight">Where the JSON-LD goes</h2>
        <p className="mt-4 text-sm leading-7 text-ink-soft">
          The pack includes the script and these install steps. Paste it in
          the head of the public site, and keep every field visible on the
          page.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-soft">
          <li>
            <strong className="text-ink">WordPress.</strong> Add the script to
            the site header through the theme header setting or a
            header-scripts plugin. Do not drop it into a visible paragraph.
          </li>
          <li>
            <strong className="text-ink">Wix.</strong> Settings, Custom Code,
            Add Custom Code, place it in the Head, and apply it to all pages
            that describe the business.
          </li>
          <li>
            <strong className="text-ink">Squarespace.</strong> Settings,
            Advanced, Code Injection, Header. On sites that show Developer
            Tools, use Code Injection there.
          </li>
          <li>
            <strong className="text-ink">Shopify.</strong> Online Store,
            Themes, Edit code, then paste the script before the closing head
            tag in theme.liquid.
          </li>
        </ul>

        <h2 id="sample" className="mt-12 font-serif text-3xl tracking-tight">
          Example (fictional business)
        </h2>
        <p className="mt-4 text-sm leading-7 text-ink-soft">
          The one-page example is{" "}
          <Link href="/sample-snapshot" className="text-forest underline">
            Example Plumbing Co. in Riverton, USA
          </Link>
          . The business, the competitors, the directories, and the ratings
          on that page were written to show the layout. They are not a live
          ChatGPT or Perplexity answer, and they are not a customer result.
        </p>
        <p className="mt-4">
          <Link
            href="/sample-snapshot"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-ink/25 bg-cream px-5 text-base font-medium text-ink hover:border-ink"
          >
            See the example AI Answer Snapshot
          </Link>
        </p>

        <h2 className="mt-12 font-serif text-3xl tracking-tight">Price</h2>
        <p className="mt-4 text-ink-soft leading-7">
          <span className="font-serif text-5xl text-ink">{fixPackIntroPriceLabel}</span>{" "}
          <span className="text-ink-soft line-through">{fixPackListPriceLabel}</span>{" "}
          introductory. One business, one city, one service. The free
          snapshot comes first. The{" "}
          <Link href="/free-check" className="text-forest underline">
            free signal check
          </Link>{" "}
          is still there if you only want a read of public files. It does not
          ask ChatGPT who it names.
        </p>
        <div className="mt-6">
          <FixPackBuyLink />
        </div>
        <div className="mt-4">
          <TrustLinks />
        </div>
        <p className="mt-3 text-sm leading-6 text-ink-soft">
          Full refund within 14 days if the Fix Pack is not useful. Details
          are on the{" "}
          <Link href="/refunds" className="text-forest underline">
            refunds
          </Link>{" "}
          page.
        </p>

        <h2 className="mt-12 font-serif text-3xl tracking-tight">FAQ</h2>
        <div className="mt-6 divide-y divide-rule border-y border-rule">
          {faqs.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="cursor-pointer list-none font-medium leading-7 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-6">
                  {item.q}
                  <span className="text-ink-soft group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
                {item.a}{" "}
                {item.q.includes("llms.txt") ? (
                  <a
                    href="https://searchengineland.com/google-says-llms-txt-files-wont-harm-or-help-your-search-rankings-480264"
                    className="text-forest underline"
                  >
                    Search Engine Land
                  </a>
                ) : null}
                {item.q.startsWith("Do the answers") ? (
                  <a href={sonickStudy} className="text-forest underline">
                    SoNick Marketing
                  </a>
                ) : null}
                {item.q.startsWith("What if") ? (
                  <Link href="/refunds" className="text-forest underline">
                    Refunds
                  </Link>
                ) : null}
              </p>
            </details>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
