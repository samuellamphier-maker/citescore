"use client";

import { useMemo, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import {
  WEEKDAYS,
  buildCourseSchema,
  clockTime,
  courseEndDate,
  courseEndTime,
  courseModeValue,
  httpUrl,
  isoCurrency,
  isoDay,
  nonNegativePrice,
} from "@/lib/generators";

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

export function CourseSchemaGenerator() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [providerName, setProviderName] = useState("");
  const [providerUrl, setProviderUrl] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [courseMode, setCourseMode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const output = useMemo(
    () =>
      buildCourseSchema({
        name,
        description,
        providerName,
        providerUrl,
        url,
        price,
        currency,
        courseMode,
        startDate,
        endDate,
        days,
        startTime,
        endTime,
      }),
    [
      name,
      description,
      providerName,
      providerUrl,
      url,
      price,
      currency,
      courseMode,
      startDate,
      endDate,
      days,
      startTime,
      endTime,
    ],
  );

  const started = [
    name,
    description,
    providerName,
    providerUrl,
    url,
    price,
    currency,
    courseMode,
    startDate,
    endDate,
    startTime,
    endTime,
  ].some((value) => value.trim()) || days.length > 0;

  const nameMissing = started && !name.trim();
  const descriptionHint =
    name.trim() && !description.trim()
      ? "Google’s course-list page lists a description as required for that rich result. This script can still be copied without one."
      : "";
  const urlHint = url.trim() && !httpUrl(url) ? "Enter the course page URL, or leave this blank." : "";
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
  const priceHint = price.trim() && !nonNegativePrice(price) ? "Enter a number, including 0 when the course is free." : "";
  const currencyHint = currency.trim() && !isoCurrency(currency) ? "Use a three-letter ISO 4217 code, like USD." : "";
  const offerHint =
    (price.trim() || currency.trim()) && !(priceReady && currencyReady) && !priceHint && !currencyHint
      ? "Add both a price and a currency, or clear both. The offer is left out until both are valid."
      : "";
  const modeHint =
    courseMode.trim() && !courseModeValue(courseMode)
      ? "Enter a mode such as online, or a full https URL, or leave this blank."
      : "";
  const startHint =
    startDate.trim() && !isoDay(startDate) ? "Use a real date, like 2026-11-03, or leave this blank." : "";
  const endHint =
    endDate.trim() && !isoDay(endDate)
      ? "Use a real date, like 2026-12-12, or leave this blank."
      : endDate.trim() && isoDay(endDate) && !courseEndDate(startDate, endDate)
        ? "The end date has to be on or after the start date, or leave it blank."
        : "";
  const startTimeHint =
    startTime.trim() && !clockTime(startTime) ? "Use a 24-hour time, like 18:00, or leave this blank." : "";
  const endTimeHint =
    endTime.trim() && !clockTime(endTime)
      ? "Use a 24-hour time, like 19:30, or leave this blank."
      : endTime.trim() && clockTime(endTime) && clockTime(startTime) && !courseEndTime(startTime, endTime)
        ? "The end time has to be later than the start time, or leave it blank."
        : "";

  function toggleDay(day: string) {
    setDays((current) => (current.includes(day) ? current.filter((item) => item !== day) : [...current, day]));
  }

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Use the name, provider, price, and schedule a person can already see on the
        course page. Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Course name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Introduction to generative engine optimization"
            required
          />
          {nameMissing ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">Add the course name shown on the page.</span>
          ) : null}
        </label>
        <label className="block text-sm font-medium">
          Description
          <textarea
            className={`${field} mt-1 min-h-24`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="A six-week course on how answer engines quote a page, with weekly live sessions."
          />
          {descriptionHint ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">{descriptionHint}</span>
          ) : null}
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
          Course URL
          <input
            className={`${field} mt-1`}
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com/courses/geo"
            inputMode="url"
          />
          {urlHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{urlHint}</span> : null}
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
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium">Course instance</legend>
          <p className="text-xs text-ink-soft">
            Optional. Leave this blank when the page does not show a session. schema.org examples use online, onsite,
            and blended.
          </p>
          <label className="block text-sm font-medium">
            Course mode
            <input
              className={`${field} mt-1`}
              value={courseMode}
              onChange={(event) => setCourseMode(event.target.value)}
              placeholder="online"
            />
            {modeHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{modeHint}</span> : null}
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Start date
              <input
                className={`${field} mt-1 font-mono text-[13px]`}
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                placeholder="2026-11-03"
                inputMode="numeric"
                spellCheck={false}
              />
              {startHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{startHint}</span> : null}
            </label>
            <label className="block text-sm font-medium">
              End date
              <input
                className={`${field} mt-1 font-mono text-[13px]`}
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                placeholder="2026-12-12"
                inputMode="numeric"
                spellCheck={false}
              />
              {endHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{endHint}</span> : null}
            </label>
          </div>
          <div>
            <p className="text-sm font-medium">Days</p>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-2">
              {WEEKDAYS.map((day) => (
                <label key={day} className="flex items-center gap-1 text-xs font-normal">
                  <input
                    type="checkbox"
                    checked={days.includes(day)}
                    aria-label={day}
                    onChange={() => toggleDay(day)}
                  />
                  {day.slice(0, 3)}
                </label>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Start time
              <input
                className={`${field} mt-1 font-mono text-[13px]`}
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                placeholder="18:00"
                inputMode="numeric"
                spellCheck={false}
              />
              {startTimeHint ? (
                <span className="mt-1 block text-xs font-normal text-ink-soft">{startTimeHint}</span>
              ) : null}
            </label>
            <label className="block text-sm font-medium">
              End time
              <input
                className={`${field} mt-1 font-mono text-[13px]`}
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                placeholder="19:30"
                inputMode="numeric"
                spellCheck={false}
              />
              {endTimeHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{endTimeHint}</span> : null}
            </label>
          </div>
        </fieldset>
      </div>
      <CopyBlock label="Course JSON-LD" value={output} empty="Add the course name shown on the page." />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}
