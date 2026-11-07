import Link from "next/link";

/**
 * Short visual excerpt of the example on /sample-snapshot.
 * Every name, figure, and label below is copied from that page.
 * Nothing here is a live answer or a customer result.
 */
const exampleBanner =
  "Example only: fictional business, fictional competitors, illustrative numbers.";

const named = [
  {
    engine: "ChatGPT example",
    names: ["Sample Rooter Co.", "Fictional Fixture Works", "Demo Drain Co."],
    absent: "Example Plumbing Co. is not named on either prompt.",
  },
  {
    engine: "Perplexity example",
    names: ["Fictional Fixture Works", "Sample Rooter Co."],
    absent: "Example Plumbing Co. is not named on either prompt.",
  },
] as const;

const comparisons = [
  {
    business: "Example Plumbing Co.",
    named: "Not named",
    rating: "4.6",
    reviews: "22",
  },
  {
    business: "Sample Rooter Co.",
    named: "ChatGPT and Perplexity",
    rating: "4.9",
    reviews: "310",
  },
  {
    business: "Fictional Fixture Works",
    named: "ChatGPT and Perplexity",
    rating: "4.8",
    reviews: "180",
  },
  {
    business: "Demo Drain Co.",
    named: "ChatGPT only",
    rating: "4.7",
    reviews: "95",
  },
] as const;

export function SampleSnapshotExcerpt({
  variant = "full",
}: {
  /** Short card for a narrow screen. Full card is the layout excerpt. */
  variant?: "compact" | "full";
} = {}) {
  if (variant === "compact") {
    return (
      <article className="report-sheet rounded-xl border border-rule px-3 py-2 text-sm leading-5">
        <p className="kicker text-copper">Example only · fictional business</p>
        <p className="mt-1">
          <span className="font-medium">Example Plumbing Co.</span>
          <span className="text-ink-soft"> is not named on either prompt. </span>
          <Link href="/sample-snapshot" className="font-medium text-forest underline">
            See the full example snapshot
          </Link>
        </p>
      </article>
    );
  }

  return (
    <article className="report-sheet overflow-hidden rounded-2xl border border-rule">
      <header className="border-b border-rule px-4 py-4">
        <p className="rounded-xl border border-copper/50 bg-paper px-3 py-2 text-sm font-medium leading-6 text-ink">
          {exampleBanner}
        </p>
        <p className="kicker mt-4 text-copper">Example only · fictional business</p>
        <h3 className="mt-2 font-serif text-2xl tracking-tight">Example Plumbing Co.</h3>
        <p className="mt-2 text-sm leading-6 text-ink-soft">
          Plumber · Riverton, USA (a made-up place) · 100 Example Street
        </p>
        <p className="mt-1 font-mono text-xs text-ink-soft">example-plumbing.example</p>
        <p className="mt-3 text-sm leading-6 text-ink-soft">
          24 October 2026. A real snapshot prints the day the prompts were asked. This
          date is a placeholder. These prompts were not run.
        </p>
        <p className="mt-2 text-sm leading-6 text-ink-soft">
          CiteScore Team, as an example.
        </p>
      </header>

      <section className="border-b border-rule px-4 py-4">
        <p className="kicker text-copper">Example only · prompts asked</p>
        <h3 className="mt-2 font-serif text-xl">Prompts asked</h3>
        <p className="mt-2 text-sm leading-6">
          <span className="font-medium">ChatGPT, logged out</span>
          <span className="mt-1 block text-xs text-ink-soft">Primary prompt</span>
        </p>
        <p className="mt-2 text-sm leading-6 text-ink-soft">
          “best plumber in Riverton, USA”
        </p>
      </section>

      <section className="border-b border-rule px-4 py-4">
        <p className="kicker text-copper">Example only · who was named</p>
        <h3 className="mt-2 font-serif text-xl">Who was named</h3>
        <p className="mt-2 text-sm leading-6 text-ink-soft">
          Written for this example. Not a transcript of an assistant.
        </p>
        <div className="mt-3 space-y-3">
          {named.map((block) => (
            <div key={block.engine} className="rounded-xl border border-rule px-3 py-3">
              <h4 className="text-sm font-medium">{block.engine}</h4>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-6">
                {block.names.map((name) => (
                  <li key={`${block.engine}-${name}`}>{name}</li>
                ))}
              </ol>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{block.absent}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-rule px-4 py-4">
        <p className="kicker text-copper">Example only · sources cited</p>
        <h3 className="mt-2 font-serif text-xl">Sources and directories cited</h3>
        <ul className="mt-3 space-y-3">
          <li className="rounded-xl border border-rule px-3 py-3 text-sm leading-6">
            <p className="font-medium">Example Trades Directory</p>
            <p className="font-mono text-xs text-ink-soft">example-trades.example/riverton</p>
            <p className="mt-1 text-ink-soft">
              Cited in both the ChatGPT example and the Perplexity example.
            </p>
          </li>
          <li className="rounded-xl border border-rule px-3 py-3 text-sm leading-6">
            <p className="font-medium">Example City List</p>
            <p className="font-mono text-xs text-ink-soft">example.com/riverton-trades</p>
            <p className="mt-1 text-ink-soft">Cited in the Perplexity example only.</p>
          </li>
        </ul>
      </section>

      <section className="px-4 py-4">
        <p className="kicker text-copper">Example only · ratings and reviews</p>
        <h3 className="mt-2 font-serif text-xl">Rating and review comparison</h3>
        <p className="mt-2 text-sm leading-6 text-ink-soft">
          Illustrative Google rating and review count, written so the comparison is
          visible. Not looked up. Not a research finding.
        </p>
        <ul className="mt-3 space-y-2">
          {comparisons.map((row) => (
            <li
              key={row.business}
              className="rounded-xl border border-rule px-3 py-3 text-sm leading-6"
            >
              <p className="font-medium">{row.business}</p>
              <p className="text-ink-soft">
                {row.named} · Illustrative Google rating {row.rating} · Illustrative
                reviews {row.reviews}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-6">
          <Link href="/sample-snapshot" className="font-medium text-forest underline">
            See the full example snapshot
          </Link>
        </p>
      </section>
    </article>
  );
}
