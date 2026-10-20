"use client";

import { useMemo, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { buildServiceSchema, httpUrl, isoCurrency, nonNegativePrice } from "@/lib/generators";

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

export function ServiceSchemaGenerator() {
  const [name, setName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [providerName, setProviderName] = useState("");
  const [providerUrl, setProviderUrl] = useState("");
  const [areaServed, setAreaServed] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [url, setUrl] = useState("");

  const output = useMemo(
    () =>
      buildServiceSchema({
        name,
        serviceType,
        description,
        providerName,
        providerUrl,
        areaServed,
        price,
        currency,
        url,
      }),
    [name, serviceType, description, providerName, providerUrl, areaServed, price, currency, url],
  );

  const started = [name, serviceType, description, providerName, providerUrl, areaServed, price, currency, url].some(
    (value) => value.trim(),
  );

  const nameMissing = started && !name.trim();
  const urlHint = url.trim() && !httpUrl(url) ? "Enter the service page URL, or leave this blank." : "";
  const providerUrlHint =
    providerUrl.trim() && !httpUrl(providerUrl)
      ? "Enter the provider’s URL, or leave it blank. The name is still included."
      : "";
  const providerNameHint =
    !providerName.trim() && providerUrl.trim()
      ? "Add the provider name, or clear the URL. A URL alone is left out."
      : "";
  const priceReady = Boolean(price.trim() && nonNegativePrice(price));
  const currencyReady = Boolean(currency.trim() && isoCurrency(currency));
  const priceHint = price.trim() && !nonNegativePrice(price) ? "Enter a number, including 0 when the service is free." : "";
  const currencyHint = currency.trim() && !isoCurrency(currency) ? "Use a three-letter ISO 4217 code, like USD." : "";
  const offerHint =
    (price.trim() || currency.trim()) && !(priceReady && currencyReady) && !priceHint && !currencyHint
      ? "Add both a price and a currency, or clear both. The offer is left out until both are valid."
      : "";

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Use the name, provider, area, and price a person can already see on the service
        page. Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Service name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="GEO audit"
            required
          />
          {nameMissing ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">Add the service name shown on the page.</span>
          ) : null}
        </label>
        <label className="block text-sm font-medium">
          Service type
          <input
            className={`${field} mt-1`}
            value={serviceType}
            onChange={(event) => setServiceType(event.target.value)}
            placeholder="Generative engine optimization"
          />
          <span className="mt-1 block text-xs font-normal text-ink-soft">
            The category, such as consulting or home cleaning. Leave it blank if the page does not name one.
          </span>
        </label>
        <label className="block text-sm font-medium">
          Description
          <textarea
            className={`${field} mt-1 min-h-24`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="A one-time audit of one public URL, with a score and a short list of fixes."
          />
        </label>
        <label className="block text-sm font-medium">
          Provider name
          <input
            className={`${field} mt-1`}
            value={providerName}
            onChange={(event) => setProviderName(event.target.value)}
            placeholder="CiteScore"
          />
          {providerNameHint ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">{providerNameHint}</span>
          ) : null}
        </label>
        <label className="block text-sm font-medium">
          Provider URL
          <input
            className={`${field} mt-1`}
            value={providerUrl}
            onChange={(event) => setProviderUrl(event.target.value)}
            placeholder="https://example.com"
            inputMode="url"
            autoComplete="url"
          />
          {providerUrlHint ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">{providerUrlHint}</span>
          ) : null}
        </label>
        <label className="block text-sm font-medium">
          Area served
          <input
            className={`${field} mt-1`}
            value={areaServed}
            onChange={(event) => setAreaServed(event.target.value)}
            placeholder="United States"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Price
            <input
              className={`${field} mt-1 font-mono text-[13px]`}
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="39"
              inputMode="decimal"
            />
            {priceHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{priceHint}</span> : null}
          </label>
          <label className="block text-sm font-medium">
            Currency
            <input
              className={`${field} mt-1 font-mono text-[13px] uppercase`}
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
              placeholder="USD"
              maxLength={3}
              autoCapitalize="characters"
            />
            {currencyHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{currencyHint}</span> : null}
          </label>
        </div>
        {offerHint ? <p className="text-xs text-ink-soft">{offerHint}</p> : null}
        <label className="block text-sm font-medium">
          Service URL
          <input
            className={`${field} mt-1`}
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com/services/geo-audit"
            inputMode="url"
          />
          {urlHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{urlHint}</span> : null}
        </label>
      </div>
      <CopyBlock
        label="Service JSON-LD"
        value={output}
        empty="Add the service name shown on the page."
      />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}
