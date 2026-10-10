"use client";

import { useState } from "react";

type Props = {
  label: string;
  value: string;
  empty: string;
};

export function CopyBlock({ label, value, empty }: Props) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const ready = value.trim().length > 0;
  const shown = ready ? value : empty;
  const rows = Math.min(18, Math.max(8, shown.split("\n").length + 1));

  async function copy() {
    if (!ready) return;
    setFailed(false);
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setFailed(true);
    }
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between gap-3">
        <p className="kicker">{label}</p>
        <button
          type="button"
          onClick={copy}
          disabled={!ready}
          className="rounded-lg bg-ink px-4 py-2 text-sm text-cream disabled:opacity-50"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <textarea
        readOnly
        value={shown}
        rows={rows}
        aria-label={label}
        className="mt-3 w-full resize-y rounded-xl border border-rule bg-white p-4 font-mono text-[13px] leading-6 text-ink"
      />
      <p className="mt-2 text-xs text-ink-soft" role="status" aria-live="polite">
        {copied
          ? "Copied to the clipboard."
          : failed
            ? "Clipboard blocked. Select the text above and copy it manually."
            : "Generated in your browser. Nothing is uploaded."}
      </p>
    </div>
  );
}
