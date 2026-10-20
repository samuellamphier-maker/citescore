"use client";

import { useMemo, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import {
  EVENT_ATTENDANCE_MODES,
  EVENT_OFFER_AVAILABILITY,
  EVENT_STATUSES,
  buildEventSchema,
  eventEndOk,
  eventPrice,
  httpUrl,
  isoCurrency,
  isoDateTime,
} from "@/lib/generators";

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

const attendanceLabel: Record<(typeof EVENT_ATTENDANCE_MODES)[number], string> = {
  OfflineEventAttendanceMode: "Offline — in person",
  OnlineEventAttendanceMode: "Online",
  MixedEventAttendanceMode: "Mixed — in person and online",
};

const statusLabel: Record<(typeof EVENT_STATUSES)[number], string> = {
  EventScheduled: "Scheduled",
  EventCancelled: "Cancelled",
  EventPostponed: "Postponed",
  EventRescheduled: "Rescheduled",
  EventMovedOnline: "Moved online",
};

const availabilityLabel: Record<(typeof EVENT_OFFER_AVAILABILITY)[number], string> = {
  InStock: "In stock",
  SoldOut: "Sold out",
  PreOrder: "Pre-order",
};

export function EventSchemaGenerator() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventStatus, setEventStatus] = useState("");
  const [attendanceMode, setAttendanceMode] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [addressLocality, setAddressLocality] = useState("");
  const [addressRegion, setAddressRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressCountry, setAddressCountry] = useState("");
  const [virtualUrl, setVirtualUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [organizerUrl, setOrganizerUrl] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [offerUrl, setOfferUrl] = useState("");
  const [availability, setAvailability] = useState("");

  const output = useMemo(
    () =>
      buildEventSchema({
        name,
        startDate,
        endDate,
        eventStatus,
        attendanceMode,
        placeName,
        streetAddress,
        addressLocality,
        addressRegion,
        postalCode,
        addressCountry,
        virtualUrl,
        imageUrl,
        description,
        organizerName,
        organizerUrl,
        price,
        currency,
        offerUrl,
        availability,
      }),
    [
      name,
      startDate,
      endDate,
      eventStatus,
      attendanceMode,
      placeName,
      streetAddress,
      addressLocality,
      addressRegion,
      postalCode,
      addressCountry,
      virtualUrl,
      imageUrl,
      description,
      organizerName,
      organizerUrl,
      price,
      currency,
      offerUrl,
      availability,
    ],
  );

  const started = [
    name,
    startDate,
    endDate,
    eventStatus,
    attendanceMode,
    placeName,
    streetAddress,
    addressLocality,
    addressRegion,
    postalCode,
    addressCountry,
    virtualUrl,
    imageUrl,
    description,
    organizerName,
    organizerUrl,
    price,
    currency,
    offerUrl,
    availability,
  ].some((value) => value.trim());

  const needsPlace = attendanceMode === "OfflineEventAttendanceMode" || attendanceMode === "MixedEventAttendanceMode";
  const needsVirtual = attendanceMode === "OnlineEventAttendanceMode" || attendanceMode === "MixedEventAttendanceMode";
  const placeReady = Boolean(placeName.trim() && (streetAddress.trim() || addressLocality.trim()) && addressCountry.trim());
  const virtualReady = Boolean(virtualUrl.trim() && httpUrl(virtualUrl));
  const startReady = Boolean(isoDateTime(startDate));
  const endReady = Boolean(isoDateTime(endDate));

  const nameMissing = started && !name.trim();
  const startHint = startHintFor(startDate, started);
  const endHint = endHintFor(endDate, startDate, started);
  const modeHint = started && !attendanceMode ? "Choose offline, online, or mixed." : "";
  const placeHint = placeHintFor(needsPlace, placeReady, started, attendanceMode, placeName || streetAddress || addressLocality);
  const virtualHint = virtualHintFor(needsVirtual, virtualUrl, started, attendanceMode);
  const imageHint = imageUrl.trim() && !httpUrl(imageUrl) ? "Enter an image URL, or leave this blank." : "";
  const organizerUrlHint =
    organizerUrl.trim() && !httpUrl(organizerUrl)
      ? "Enter the organizer’s URL, or leave it blank. The name is still included."
      : "";
  const organizerNameHint =
    !organizerName.trim() && organizerUrl.trim() ? "Add the organizer name, or clear the URL. A URL alone is left out." : "";
  const priceHint = price.trim() && !eventPrice(price) ? "Enter a number, including 0 when the event is free." : "";
  const currencyHint = currency.trim() && !isoCurrency(currency) ? "Use a three-letter ISO 4217 code, like USD." : "";
  const offerUrlHint = offerUrl.trim() && !httpUrl(offerUrl) ? "Enter the ticket URL, or leave it blank." : "";

  const missing = [
    name.trim() ? "" : "name",
    startReady ? "" : "start date",
    attendanceMode ? "" : "attendance mode",
    needsPlace && !placeReady ? "place" : "",
    needsVirtual && !virtualReady ? "virtual URL" : "",
  ].filter(Boolean);

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Use the name, dates, place, and price a person can already see on the event
        page. Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Autumn product briefing"
            required
          />
          {nameMissing ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">Add the event name shown on the page.</span>
          ) : null}
        </label>
        <label className="block text-sm font-medium">
          Start
          <input
            className={`${field} mt-1 font-mono text-[13px]`}
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            placeholder="2026-10-21T19:00:00-04:00"
            spellCheck={false}
            required
          />
          <span className="mt-1 block text-xs font-normal text-ink-soft">
            ISO 8601. A timezone offset is useful. A date alone, 2026-10-21, is accepted for an all-day event.
          </span>
          {startHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{startHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          End
          <input
            className={`${field} mt-1 font-mono text-[13px]`}
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            placeholder="2026-10-21T21:00:00-04:00"
            spellCheck={false}
          />
          <span className="mt-1 block text-xs font-normal text-ink-soft">
            Optional. The same date as the start, with no clock time, is an all-day event.
          </span>
          {endHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{endHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Event status
          <select className={`${field} mt-1`} value={eventStatus} onChange={(event) => setEventStatus(event.target.value)}>
            <option value="">Not stated — left out of the script</option>
            {EVENT_STATUSES.map((item) => (
              <option key={item} value={item}>
                {statusLabel[item]}
              </option>
            ))}
          </select>
          <span className="mt-1 block text-xs font-normal text-ink-soft">
            Leave this blank when the page does not say. Google treats a missing status as scheduled.
          </span>
        </label>
        <label className="block text-sm font-medium">
          Attendance mode
          <select
            className={`${field} mt-1`}
            value={attendanceMode}
            onChange={(event) => setAttendanceMode(event.target.value)}
            required
          >
            <option value="">Choose one</option>
            {EVENT_ATTENDANCE_MODES.map((item) => (
              <option key={item} value={item}>
                {attendanceLabel[item]}
              </option>
            ))}
          </select>
          {modeHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{modeHint}</span> : null}
        </label>
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium">Place</legend>
          <p className="text-xs text-ink-soft">
            Required for offline and mixed. Left out when attendance is online. Use the venue name and the address on
            the page.
          </p>
          <label className="block text-sm font-medium">
            Venue name
            <input
              className={`${field} mt-1`}
              value={placeName}
              onChange={(event) => setPlaceName(event.target.value)}
              placeholder="Example Hall"
            />
          </label>
          <label className="block text-sm font-medium">
            Street address
            <input
              className={`${field} mt-1`}
              value={streetAddress}
              onChange={(event) => setStreetAddress(event.target.value)}
              placeholder="100 West Example St"
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Locality
              <input
                className={`${field} mt-1`}
                value={addressLocality}
                onChange={(event) => setAddressLocality(event.target.value)}
                placeholder="Example City"
              />
            </label>
            <label className="block text-sm font-medium">
              Region
              <input
                className={`${field} mt-1`}
                value={addressRegion}
                onChange={(event) => setAddressRegion(event.target.value)}
                placeholder="CA"
              />
            </label>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Postal code
              <input
                className={`${field} mt-1`}
                value={postalCode}
                onChange={(event) => setPostalCode(event.target.value)}
                placeholder="94107"
              />
            </label>
            <label className="block text-sm font-medium">
              Country
              <input
                className={`${field} mt-1`}
                value={addressCountry}
                onChange={(event) => setAddressCountry(event.target.value)}
                placeholder="US"
              />
            </label>
          </div>
          {placeHint ? <span className="text-xs font-normal text-ink-soft">{placeHint}</span> : null}
        </fieldset>
        <label className="block text-sm font-medium">
          Virtual location URL
          <input
            className={`${field} mt-1`}
            value={virtualUrl}
            onChange={(event) => setVirtualUrl(event.target.value)}
            placeholder="https://example.com/events/briefing"
            inputMode="url"
          />
          <span className="mt-1 block text-xs font-normal text-ink-soft">
            Required for online and mixed. The page where someone attends online, not a different event.
          </span>
          {virtualHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{virtualHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Image URL
          <input
            className={`${field} mt-1`}
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://example.com/events/briefing.jpg"
            inputMode="url"
          />
          {imageHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{imageHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Description
          <textarea
            className={`${field} mt-1`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="A two-hour briefing on the product, held at Example Hall and online."
            rows={3}
          />
        </label>
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium">Organizer</legend>
          <p className="text-xs text-ink-soft">
            Optional Organization. Use the name on the page. A team byline such as CiteScore Team belongs here.
          </p>
          <label className="block text-sm font-medium">
            Organizer name
            <input
              className={`${field} mt-1`}
              value={organizerName}
              onChange={(event) => setOrganizerName(event.target.value)}
              placeholder="Example Org"
            />
            {organizerNameHint ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">{organizerNameHint}</span>
            ) : null}
          </label>
          <label className="block text-sm font-medium">
            Organizer URL
            <input
              className={`${field} mt-1`}
              value={organizerUrl}
              onChange={(event) => setOrganizerUrl(event.target.value)}
              placeholder="https://example.com"
              inputMode="url"
            />
            {organizerUrlHint ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">{organizerUrlHint}</span>
            ) : null}
          </label>
        </fieldset>
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium">Offer</legend>
          <p className="text-xs text-ink-soft">
            Optional. Use the price on the page. 0 means free. A field that is blank or invalid is left out.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Price
              <input
                className={`${field} mt-1`}
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="0"
                inputMode="decimal"
              />
              {priceHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{priceHint}</span> : null}
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
              {currencyHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{currencyHint}</span> : null}
            </label>
          </div>
          <label className="block text-sm font-medium">
            Offer URL
            <input
              className={`${field} mt-1`}
              value={offerUrl}
              onChange={(event) => setOfferUrl(event.target.value)}
              placeholder="https://example.com/events/briefing/tickets"
              inputMode="url"
            />
            {offerUrlHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{offerUrlHint}</span> : null}
          </label>
          <label className="block text-sm font-medium">
            Availability
            <select className={`${field} mt-1`} value={availability} onChange={(event) => setAvailability(event.target.value)}>
              <option value="">Not stated on the page</option>
              {EVENT_OFFER_AVAILABILITY.map((item) => (
                <option key={item} value={item}>
                  {availabilityLabel[item]}
                </option>
              ))}
            </select>
          </label>
        </fieldset>
      </div>
      {started && missing.length > 0 ? (
        <p className="mt-4 text-xs text-ink-soft">Still needed: {missing.join(", ")}.</p>
      ) : null}
      {endDate.trim() && endReady && startReady && !eventEndOk(isoDateTime(startDate), isoDateTime(endDate)) ? (
        <p className="mt-2 text-xs text-ink-soft">The end is earlier than the start, so it is left out.</p>
      ) : null}
      <CopyBlock
        label="Event JSON-LD"
        value={output}
        empty="Add the name, a start date, an attendance mode, and a place or a virtual URL."
      />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}

function startHintFor(value: string, started: boolean): string {
  if (!value.trim()) return started ? "Enter the start in ISO 8601, like 2026-10-21T19:00:00-04:00." : "";
  return isoDateTime(value) ? "" : "Use a real ISO 8601 date, like 2026-10-21 or 2026-10-21T19:00:00-04:00.";
}

function endHintFor(value: string, start: string, started: boolean): string {
  if (!value.trim()) return "";
  if (!isoDateTime(value)) return "Use a real ISO 8601 date, or clear this field.";
  const startValue = isoDateTime(start);
  const endValue = isoDateTime(value);
  if (startValue && endValue && !eventEndOk(startValue, endValue)) {
    return "The end has to be on or after the start. An earlier end is left out.";
  }
  return started ? "" : "";
}

function placeHintFor(
  needed: boolean,
  ready: boolean,
  started: boolean,
  mode: string,
  anyPlace: string,
): string {
  if (mode === "OnlineEventAttendanceMode" && anyPlace.trim()) {
    return "This place is left out while attendance is online. Choose mixed to include the venue and the URL.";
  }
  if (!needed) return "";
  if (ready) return "";
  return started ? "Add the venue name, a street or a city, and a country." : "";
}

function virtualHintFor(needed: boolean, value: string, started: boolean, mode: string): string {
  if (mode === "OfflineEventAttendanceMode" && value.trim()) {
    return "This URL is left out while attendance is offline. Choose mixed to include the venue and the URL.";
  }
  if (!needed) return "";
  if (!value.trim()) return started ? "Enter the URL where someone attends online." : "";
  return httpUrl(value) ? "" : "Enter an http(s) URL, or clear this field.";
}
