"use client";

import { useState } from "react";

type Props = {
  value: string;
  label: string;
};

export function CopySnippet({ value, label }: Props) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  async function copy() {
    setFailed(false);
    let ok = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        ok = true;
      }
    } catch {
      ok = false;
    }
    if (!ok) {
      try {
        const area = document.createElement("textarea");
        area.value = value;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.left = "-9999px";
        document.body.appendChild(area);
        area.select();
        ok = document.execCommand("copy");
        area.remove();
      } catch {
        ok = false;
      }
    }
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } else {
      setCopied(false);
      setFailed(true);
    }
  }

  return (
    <div className="mt-2">
      <button type="button" onClick={copy} className="rounded-lg bg-ink px-3 py-1.5 text-xs text-cream" aria-label={label}>
        {copied ? "Copied" : "Copy"}
      </button>
      {copied || failed ? (
        <p className="mt-1 text-xs text-ink-soft" role="status" aria-live="polite">
          {copied ? "Copied." : "Clipboard blocked. Select the snippet and copy it."}
        </p>
      ) : null}
    </div>
  );
}
