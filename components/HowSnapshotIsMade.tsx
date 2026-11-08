import {
  howSnapshotIsMadeBody,
  howSnapshotIsMadeTitle,
} from "@/lib/snapshot-method";

/** Short method note. One per page, beside the snapshot request. */
export function HowSnapshotIsMade({ className = "" }: { className?: string }) {
  return (
    <section className={className} aria-labelledby="how-the-snapshot-is-made">
      <h2
        id="how-the-snapshot-is-made"
        className="font-serif text-2xl tracking-tight"
      >
        {howSnapshotIsMadeTitle}
      </h2>
      <p className="mt-3 text-sm leading-7 text-ink-soft">{howSnapshotIsMadeBody}</p>
    </section>
  );
}
