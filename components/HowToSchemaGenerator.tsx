"use client";

import { useMemo, useRef, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import {
  buildHowToSchema,
  httpUrl,
  isoCurrency,
  isoDuration,
  nonNegativePrice,
  type HowToStepInput,
} from "@/lib/generators";

type NamedRow = { id: string; name: string };
type StepRow = HowToStepInput & { id: string };

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

function emptyNamed(id: string): NamedRow {
  return { id, name: "" };
}

function emptyStep(id: string): StepRow {
  return { id, name: "", text: "", imageUrl: "" };
}

export function HowToSchemaGenerator() {
  const seq = useRef(4);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [cost, setCost] = useState("");
  const [currency, setCurrency] = useState("");
  const [supplies, setSupplies] = useState<NamedRow[]>([emptyNamed("supply-1")]);
  const [tools, setTools] = useState<NamedRow[]>([emptyNamed("tool-1")]);
  const [steps, setSteps] = useState<StepRow[]>([emptyStep("step-1"), emptyStep("step-2")]);

  const output = useMemo(
    () =>
      buildHowToSchema({
        name,
        description,
        days,
        hours,
        minutes,
        cost,
        currency,
        supplies: supplies.map((row) => row.name),
        tools: tools.map((row) => row.name),
        steps,
      }),
    [name, description, days, hours, minutes, cost, currency, supplies, tools, steps],
  );

  function nextId(prefix: string) {
    seq.current += 1;
    return `${prefix}-${seq.current}`;
  }

  const timeHint = durationHint(days, hours, minutes);
  const costHint = estimatedCostHint(cost, currency);

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Use the name, time, cost, supplies, tools, and steps a person can already read
        on the page. Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Change a flat tire"
            required
          />
        </label>
        <label className="block text-sm font-medium">
          Description
          <textarea
            className={`${field} mt-1`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="How to change a flat tire with the spare in the trunk."
            rows={3}
          />
        </label>
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium">Total time</legend>
          <p className="text-xs text-ink-soft">Written as an ISO 8601 duration, such as PT45M or P1DT2H.</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block text-sm font-medium">
              Days
              <input
                className={`${field} mt-1`}
                value={days}
                onChange={(event) => setDays(event.target.value)}
                placeholder="1"
                inputMode="numeric"
              />
            </label>
            <label className="block text-sm font-medium">
              Hours
              <input
                className={`${field} mt-1`}
                value={hours}
                onChange={(event) => setHours(event.target.value)}
                placeholder="1"
                inputMode="numeric"
              />
            </label>
            <label className="block text-sm font-medium">
              Minutes
              <input
                className={`${field} mt-1`}
                value={minutes}
                onChange={(event) => setMinutes(event.target.value)}
                placeholder="30"
                inputMode="numeric"
              />
            </label>
          </div>
          {timeHint ? <span className="text-xs font-normal text-ink-soft">{timeHint}</span> : null}
        </fieldset>
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium">Estimated cost</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Amount
              <input
                className={`${field} mt-1`}
                value={cost}
                onChange={(event) => setCost(event.target.value)}
                placeholder="20"
                inputMode="decimal"
              />
            </label>
            <label className="block text-sm font-medium">
              Currency
              <input
                className={`${field} mt-1`}
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
                placeholder="USD"
                maxLength={3}
                autoCapitalize="characters"
              />
            </label>
          </div>
          {costHint ? <span className="text-xs font-normal text-ink-soft">{costHint}</span> : null}
        </fieldset>
        <NameRows
          legend="Supplies"
          hint="Materials the procedure uses up. A repeated name is kept once."
          rows={supplies}
          label="Supply"
          placeholder="Flares"
          addLabel="Add a supply"
          onChange={(id, value) => setSupplies(supplies.map((row) => (row.id === id ? { ...row, name: value } : row)))}
          onRemove={(id) =>
            setSupplies(supplies.length === 1 ? [emptyNamed(id)] : supplies.filter((row) => row.id !== id))
          }
          onAdd={() => setSupplies([...supplies, emptyNamed(nextId("supply"))])}
        />
        <NameRows
          legend="Tools"
          hint="Equipment the procedure uses and does not consume."
          rows={tools}
          label="Tool"
          placeholder="Lug wrench"
          addLabel="Add a tool"
          onChange={(id, value) => setTools(tools.map((row) => (row.id === id ? { ...row, name: value } : row)))}
          onRemove={(id) => setTools(tools.length === 1 ? [emptyNamed(id)] : tools.filter((row) => row.id !== id))}
          onAdd={() => setTools([...tools, emptyNamed(nextId("tool"))])}
        />
        <fieldset className="grid gap-4">
          <legend className="text-sm font-medium">Steps</legend>
          <p className="text-xs text-ink-soft">
            A step is included only when it has instruction text. Position starts at 1 and skips a blank row.
          </p>
          {steps.map((row, index) => {
            const imageHint =
              row.imageUrl.trim() && !httpUrl(row.imageUrl)
                ? "Enter an image URL a crawler can fetch, or leave this blank."
                : "";
            const textHint =
              !row.text.trim() && (row.name.trim() || row.imageUrl.trim())
                ? "Add the instruction for this step. A name or an image alone is left out."
                : "";
            return (
              <div key={row.id} className="grid gap-2">
                <p className="text-sm font-medium">Step {index + 1}</p>
                <input
                  className={field}
                  value={row.name}
                  aria-label={`Step ${index + 1} name`}
                  placeholder="Loosen the lug nuts"
                  onChange={(event) =>
                    setSteps(steps.map((item) => (item.id === row.id ? { ...item, name: event.target.value } : item)))
                  }
                />
                <textarea
                  className={field}
                  value={row.text}
                  aria-label={`Step ${index + 1} instruction`}
                  placeholder="Turn each lug nut one half turn counterclockwise while the tire is still on the ground."
                  rows={3}
                  onChange={(event) =>
                    setSteps(steps.map((item) => (item.id === row.id ? { ...item, text: event.target.value } : item)))
                  }
                />
                <input
                  className={field}
                  value={row.imageUrl}
                  aria-label={`Step ${index + 1} image URL`}
                  placeholder="https://example.com/photos/lug-nuts.jpg"
                  inputMode="url"
                  onChange={(event) =>
                    setSteps(steps.map((item) => (item.id === row.id ? { ...item, imageUrl: event.target.value } : item)))
                  }
                />
                {imageHint ? <p className="text-xs text-ink-soft">{imageHint}</p> : null}
                {textHint ? <p className="text-xs text-ink-soft">{textHint}</p> : null}
                <button
                  type="button"
                  className="justify-self-start text-sm text-ink-soft underline-offset-4 hover:underline"
                  onClick={() => setSteps(steps.length === 1 ? [emptyStep(row.id)] : steps.filter((item) => item.id !== row.id))}
                >
                  Remove
                </button>
              </div>
            );
          })}
          <button
            type="button"
            className="justify-self-start rounded-lg border border-rule bg-white px-4 py-2 text-sm"
            onClick={() => setSteps([...steps, emptyStep(nextId("step"))])}
          >
            Add a step
          </button>
        </fieldset>
      </div>
      <CopyBlock label="HowTo JSON-LD" value={output} empty="Add a name to generate the script tag." />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}

function NameRows({
  legend,
  hint,
  rows,
  label,
  placeholder,
  addLabel,
  onChange,
  onRemove,
  onAdd,
}: {
  legend: string;
  hint: string;
  rows: NamedRow[];
  label: string;
  placeholder: string;
  addLabel: string;
  onChange: (id: string, name: string) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
}) {
  return (
    <fieldset className="grid gap-3">
      <legend className="text-sm font-medium">{legend}</legend>
      <p className="text-xs text-ink-soft">{hint}</p>
      {rows.map((row, index) => (
        <div key={row.id} className="grid gap-2">
          <input
            className={field}
            value={row.name}
            aria-label={`${label} ${index + 1}`}
            placeholder={placeholder}
            onChange={(event) => onChange(row.id, event.target.value)}
          />
          <button
            type="button"
            className="justify-self-start text-sm text-ink-soft underline-offset-4 hover:underline"
            onClick={() => onRemove(row.id)}
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="justify-self-start rounded-lg border border-rule bg-white px-4 py-2 text-sm" onClick={onAdd}>
        {addLabel}
      </button>
    </fieldset>
  );
}

function durationHint(days: string, hours: string, minutes: string) {
  const fields = [days, hours, minutes];
  if (fields.some((value) => value.trim() && !/^\d{1,6}$/.test(value.trim()))) {
    return "Enter a whole number up to 999999, or leave the field blank.";
  }
  if (isoDuration({ days, hours, minutes })) return "";
  if (fields.some((value) => value.trim())) return "Enter a time greater than zero, or leave the fields blank.";
  return "";
}

function estimatedCostHint(cost: string, currency: string) {
  if (cost.trim() && !nonNegativePrice(cost)) return "Enter a cost of zero or more, like 0 or 25.";
  if (currency.trim() && !isoCurrency(currency)) return "Use a three-letter ISO 4217 code, like USD.";
  const amount = nonNegativePrice(cost);
  const code = isoCurrency(currency);
  if (amount && !code) return "Add a three-letter currency, like USD, or clear the cost.";
  if (code && !cost.trim()) return "Add the cost, or clear the currency. Use 0 when the procedure is free.";
  return "";
}
