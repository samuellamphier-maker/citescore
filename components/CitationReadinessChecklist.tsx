"use client";

import { useEffect, useState } from "react";
import {
  citationCheckGroups,
  citationChecks,
} from "@/lib/content/citation-checklist";

const STORAGE_KEY = "citescore-citation-checklist";

function loadStored(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const known = new Set(citationChecks.map((item) => item.id));
    return parsed.filter(
      (id): id is string => typeof id === "string" && known.has(id),
    );
  } catch {
    return [];
  }
}

export function CitationReadinessChecklist() {
  const [checked, setChecked] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setChecked(loadStored());
    setReady(true);
  }, []);

  function toggle(id: string) {
    setChecked((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Private mode and blocked storage still leave the list readable.
      }
      return next;
    });
  }

  function clearMarks() {
    setChecked([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // The boxes still clear for this view.
    }
  }

  const done = checked.length;
  const total = citationChecks.length;
  let index = 0;

  return (
    <div>
      <div className="rounded-2xl border border-rule bg-cream p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="text-sm font-medium text-ink">
            {ready ? `${done} of ${total} marked in this browser` : `${total} checks`}
          </p>
          <button
            type="button"
            onClick={clearMarks}
            className="text-sm text-forest underline-offset-4 hover:underline"
          >
            Clear marks
          </button>
        </div>
        <div
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-paper-2"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={ready ? done : 0}
          aria-label="Checklist progress on this browser"
        >
          <div
            className="h-full bg-forest"
            style={{ width: `${ready ? (done / total) * 100 : 0}%` }}
          />
        </div>
        <p className="mt-3 text-sm leading-6 text-ink-soft">
          Marks stay in this browser. Nothing is submitted, and a checked box
          is not a score.
        </p>
      </div>

      <div className="mt-10 space-y-12">
        {citationCheckGroups.map((group) => (
          <section key={group.id} aria-labelledby={`group-${group.id}`}>
            <h2 id={`group-${group.id}`} className="font-serif text-2xl tracking-tight text-ink">
              {group.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-ink-soft">{group.intro}</p>
            <ol className="mt-5 space-y-3">
              {group.items.map((item) => {
                index += 1;
                const number = String(index).padStart(2, "0");
                const isChecked = checked.includes(item.id);
                return (
                  <li key={item.id}>
                    <label className="flex cursor-pointer gap-3 rounded-2xl border border-rule bg-cream p-4 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-forest">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 shrink-0 accent-forest"
                        checked={isChecked}
                        onChange={() => toggle(item.id)}
                      />
                      <span>
                        <span className="kicker text-copper">{number}</span>
                        <span className="mt-1 block font-medium text-ink">
                          {item.title}
                        </span>
                        <span className="mt-2 block text-sm leading-6 text-ink-soft">
                          {item.body}
                        </span>
                      </span>
                    </label>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
