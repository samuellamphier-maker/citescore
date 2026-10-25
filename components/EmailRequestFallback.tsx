"use client";

import { useEffect, useId, useRef, useState } from "react";
import { noMailAppInstruction } from "@/lib/email-request";
import { contactEmail } from "@/lib/site";

const instruction = noMailAppInstruction(contactEmail);

type Tone = "light" | "dark";

type Props = {
  tone?: Tone;
  className?: string;
  /**
   * Clipboard payload for "Copy request text".
   * Omit to hide that button. Pass a string to show it.
   */
  requestText?: string;
  /** When false, the request button stays visible but does not copy yet. */
  requestReady?: boolean;
};

async function writeClipboard(value: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Permission denied or unavailable. Try the selection fallback.
  }

  const area = document.createElement("textarea");
  area.value = value;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.top = "0";
  area.style.left = "0";
  area.style.opacity = "0";
  document.body.appendChild(area);
  try {
    area.focus();
    area.select();
    area.setSelectionRange(0, value.length);
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    area.remove();
  }
}

function selectContents(node: HTMLElement | null) {
  if (!node) return;
  const range = document.createRange();
  range.selectNodeContents(node);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

export function EmailRequestFallback({
  tone = "light",
  className = "",
  requestText,
  requestReady = true,
}: Props) {
  const addressRef = useRef<HTMLSpanElement>(null);
  const requestRef = useRef<HTMLTextAreaElement>(null);
  const resetTimer = useRef<number | null>(null);
  const instructionId = useId();
  const [copied, setCopied] = useState<"address" | "request" | null>(null);
  const [status, setStatus] = useState("");
  const [requestVisible, setRequestVisible] = useState(false);

  const showRequest = requestText !== undefined;
  const canCopyRequest = showRequest && requestReady && requestText.trim().length > 0;
  const dark = tone === "dark";

  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    };
  }, []);

  function note(next: string, which: "address" | "request" | null) {
    setStatus(next);
    setCopied(which);
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    if (which) {
      resetTimer.current = window.setTimeout(() => {
        setCopied(null);
        resetTimer.current = null;
      }, 2000);
    }
  }

  async function copyAddress() {
    setRequestVisible(false);
    const ok = await writeClipboard(contactEmail);
    if (ok) {
      note("Address copied.", "address");
      return;
    }
    selectContents(addressRef.current);
    note("Clipboard blocked. Select the address and copy it.", null);
  }

  async function copyRequest() {
    if (!canCopyRequest || !requestText) {
      note("Fill in business name, city, service, and email first.", null);
      return;
    }
    const ok = await writeClipboard(requestText);
    if (ok) {
      setRequestVisible(false);
      note("Request text copied.", "request");
      return;
    }
    setRequestVisible(true);
    note("Clipboard blocked. Select the request text and copy it.", null);
    window.setTimeout(() => {
      requestRef.current?.focus();
      requestRef.current?.select();
    }, 0);
  }

  const buttonClass = dark
    ? "rounded-lg border border-cream/40 px-3 py-1.5 text-xs font-medium text-cream hover:border-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream disabled:cursor-not-allowed disabled:opacity-50"
    : "rounded-lg border border-ink/25 bg-cream px-3 py-1.5 text-xs font-medium text-ink hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className={className}>
      <div
        className={
          dark
            ? "rounded-lg border border-cream/25 px-3 py-2"
            : "rounded-lg border border-rule bg-cream px-3 py-2"
        }
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            ref={addressRef}
            translate="no"
            className={
              dark
                ? "min-w-0 font-mono text-sm break-all text-cream select-all"
                : "min-w-0 font-mono text-sm break-all text-ink select-all"
            }
          >
            {contactEmail}
          </span>
          <button type="button" onClick={copyAddress} className={buttonClass}>
            {copied === "address" ? "Copied" : "Copy address"}
          </button>
        </div>
        {showRequest ? (
          <div
            className={
              dark ? "mt-2 border-t border-cream/20 pt-2" : "mt-2 border-t border-rule pt-2"
            }
          >
            <button
              type="button"
              onClick={copyRequest}
              disabled={!canCopyRequest}
              aria-describedby={instructionId}
              className={buttonClass}
            >
              {copied === "request" ? "Copied" : "Copy request text"}
            </button>
            <p
              id={instructionId}
              className={
                dark
                  ? "mt-1 text-xs leading-5 text-[#d7c7b0]"
                  : "mt-1 text-xs leading-5 text-ink-soft"
              }
            >
              {instruction}
            </p>
            {requestVisible && requestText ? (
              <textarea
                ref={requestRef}
                readOnly
                value={requestText}
                rows={Math.min(12, requestText.split("\n").length + 1)}
                aria-label="Request text"
                className="mt-2 w-full resize-y rounded-lg border border-rule bg-white p-3 font-mono text-[13px] leading-5 text-ink"
              />
            ) : null}
          </div>
        ) : null}
      </div>
      <p
        className={
          status
            ? dark
              ? "mt-2 text-xs leading-5 text-[#d7c7b0]"
              : "mt-2 text-xs leading-5 text-ink-soft"
            : "sr-only"
        }
        role="status"
        aria-live="polite"
      >
        {status}
      </p>
    </div>
  );
}
