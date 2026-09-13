"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-lg border border-rule bg-cream px-4 py-2 text-sm hover:border-ink/30"
    >
      Print / save PDF
    </button>
  );
}
