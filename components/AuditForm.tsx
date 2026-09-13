"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { normalizeSiteUrl } from "@/lib/urls";

type Props = {
  id?: string;
  size?: "hero" | "compact";
  defaultUrl?: string;
};

export function AuditForm({ id, size = "hero", defaultUrl = "" }: Props) {
  const router = useRouter();
  const [value, setValue] = useState(defaultUrl);
  const [error, setError] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = normalizeSiteUrl(value);
    if (!url) {
      setError("Enter a full site URL, like https://yourproduct.com");
      return;
    }
    setError("");
    router.push(`/checkout?url=${encodeURIComponent(url)}`);
  }

  const hero = size === "hero";

  return (
    <form id={id} onSubmit={onSubmit} className="w-full">
      <div
        className={`flex w-full flex-col gap-2 rounded-xl border border-rule bg-cream p-2 shadow-[0_1px_0_rgba(27,24,20,0.04)] sm:flex-row sm:items-stretch ${
          hero ? "sm:p-2" : ""
        }`}
      >
        <label className="sr-only" htmlFor={id ? `${id}-url` : "audit-url"}>
          Site URL
        </label>
        <input
          id={id ? `${id}-url` : "audit-url"}
          name="url"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="https://yourproduct.com"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError("");
          }}
          className={`min-w-0 flex-1 rounded-lg bg-transparent px-3 text-ink outline-none placeholder:text-ink-soft/70 ${
            hero ? "h-12 text-base" : "h-11 text-sm"
          }`}
        />
        <button
          type="submit"
          className={`rounded-lg bg-forest px-5 font-medium text-cream transition-colors hover:bg-forest-deep ${
            hero ? "h-12 text-base" : "h-11 text-sm"
          }`}
        >
          Get the $39 audit
        </button>
      </div>
      {error ? (
        <p className="mt-2 text-sm text-copper" role="alert">
          {error}
        </p>
      ) : (
        <p className="mt-2 text-sm text-ink-soft">
          One-time PDF report. No login. No subscription required.
        </p>
      )}
    </form>
  );
}
