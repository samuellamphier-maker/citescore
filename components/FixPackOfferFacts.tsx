import Link from "next/link";
import {
  fixPackHowDeliveryWorks,
  fixPackRefund,
  fixPackTurnaround,
  fixPackWhatYouGet,
} from "@/lib/fix-pack-offer";
import { contactEmail } from "@/lib/site";

const rows = [
  { term: "What you get", body: fixPackWhatYouGet },
  {
    term: "How delivery works",
    body: fixPackHowDeliveryWorks,
    href: "/fix-pack/next-steps",
    link: "What happens after you buy",
  },
  { term: "How long it takes", body: fixPackTurnaround },
  {
    term: "Refunds",
    body: fixPackRefund,
    href: "/refunds",
    link: "Refund policy",
  },
] as const;

export function FixPackOfferFacts({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const muted = tone === "dark" ? "text-[#d7c7b0]" : "text-ink-soft";
  const strong = tone === "dark" ? "text-cream" : "text-ink";
  const linkClass =
    tone === "dark"
      ? "text-cream underline underline-offset-4"
      : "text-forest underline underline-offset-4";

  return (
    <div className={className}>
      <dl className="space-y-3 text-sm leading-6">
        {rows.map((row) => (
          <div key={row.term}>
            <dt className={`font-medium ${strong}`}>{row.term}</dt>
            <dd className={muted}>
              {row.body}
              {"href" in row ? (
                <>
                  {" "}
                  <Link href={row.href} className={linkClass}>
                    {row.link}
                  </Link>
                  .
                </>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
      <p className={`mt-3 text-sm leading-6 ${muted}`}>
        Operated by the CiteScore Team.{" "}
        <Link href="/about" className={linkClass}>
          Who runs this
        </Link>
        {" · "}
        <a href={`mailto:${contactEmail}`} className={linkClass}>
          {contactEmail}
        </a>
      </p>
    </div>
  );
}
