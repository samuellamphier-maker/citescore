import { AuditForm } from "@/components/AuditForm";
import { site } from "@/lib/site";

type Props = {
  id?: string;
  title?: string;
  body?: string;
};

export function AuditCta({
  id = "article-audit",
  title = `Get the ${site.priceLabel} GEO audit`,
  body = "One public URL. A 0–100 CiteScore and about ten concrete fixes, as a PDF. We score on-page signals and run an LLM review of the HTML we fetched — we do not log into ChatGPT on your behalf.",
}: Props) {
  return (
    <aside className="mt-12 rounded-2xl border border-rule bg-cream p-6 report-sheet">
      <p className="kicker text-copper">One-time audit</p>
      <h2 className="mt-3 font-serif text-2xl tracking-tight sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-ink-soft">{body}</p>
      <div className="mt-5">
        <AuditForm id={id} size="compact" />
      </div>
    </aside>
  );
}
