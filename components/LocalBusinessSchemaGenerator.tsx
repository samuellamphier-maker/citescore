"use client";

import { useMemo, useRef, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import {
  LOCAL_BUSINESS_TYPE_GROUPS,
  WEEKDAYS,
  buildLocalBusinessSchema,
  clockTime,
  geoDecimalPlaces,
  geoNumber,
  httpUrl,
  telephoneValue,
} from "@/lib/generators";

type SameAsRow = { id: string; url: string };
type HoursRow = { id: string; days: string[]; opens: string; closes: string };

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

function emptyHours(id: string): HoursRow {
  return { id, days: [], opens: "", closes: "" };
}

export function LocalBusinessSchemaGenerator() {
  const sameSeq = useRef(1);
  const hoursSeq = useRef(1);
  const [name, setName] = useState("");
  const [type, setType] = useState("LocalBusiness");
  const [url, setUrl] = useState("");
  const [telephone, setTelephone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [addressLocality, setAddressLocality] = useState("");
  const [addressRegion, setAddressRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressCountry, setAddressCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [sameAs, setSameAs] = useState<SameAsRow[]>([{ id: "same-1", url: "" }]);
  const [hours, setHours] = useState<HoursRow[]>([emptyHours("hours-1")]);

  const output = useMemo(
    () =>
      buildLocalBusinessSchema({
        name,
        type,
        url,
        telephone,
        streetAddress,
        addressLocality,
        addressRegion,
        postalCode,
        addressCountry,
        hours,
        latitude,
        longitude,
        sameAs: sameAs.map((row) => row.url),
        logoUrl,
        imageUrl,
      }),
    [
      name,
      type,
      url,
      telephone,
      streetAddress,
      addressLocality,
      addressRegion,
      postalCode,
      addressCountry,
      hours,
      latitude,
      longitude,
      sameAs,
      logoUrl,
      imageUrl,
    ],
  );

  function nextSameId() {
    sameSeq.current += 1;
    return `same-${sameSeq.current}`;
  }

  function nextHoursId() {
    hoursSeq.current += 1;
    return `hours-${hoursSeq.current}`;
  }

  function toggleDay(id: string, day: string) {
    setHours((current) =>
      current.map((row) => {
        if (row.id !== id) return row;
        const days = row.days.includes(day) ? row.days.filter((item) => item !== day) : [...row.days, day];
        return { ...row, days };
      }),
    );
  }

  const urlHint = url.trim() && !httpUrl(url) ? "Enter the location URL, like https://example.com/locations/main-street." : "";
  const phoneHint =
    telephone.trim() && !telephoneValue(telephone)
      ? "Enter a phone number with country and area code, or leave this blank."
      : "";
  const countryHint =
    addressCountry.trim() && !/^[A-Za-z]{2}$/.test(addressCountry.trim())
      ? "Google’s examples use a two-letter country code, such as US."
      : "";
  const imageHint =
    imageUrl.trim() && !httpUrl(imageUrl) ? "Enter an image URL the page shows, or leave this blank." : "";
  const logoHint =
    logoUrl.trim() && !httpUrl(logoUrl) ? "Enter an image URL a crawler can fetch, or leave this blank." : "";
  const addressMissing =
    name.trim() &&
    !streetAddress.trim() &&
    !addressLocality.trim() &&
    !addressRegion.trim() &&
    !postalCode.trim() &&
    !addressCountry.trim();

  let geoHint = "";
  if (latitude.trim() || longitude.trim()) {
    const lat = geoNumber(latitude, -90, 90);
    const lng = geoNumber(longitude, -180, 180);
    if (!latitude.trim() || !longitude.trim()) geoHint = "Enter both latitude and longitude, or leave both blank.";
    else if (lat === null || lng === null) geoHint = "Latitude runs from -90 to 90. Longitude runs from -180 to 180.";
    else if (geoDecimalPlaces(latitude) < 5 || geoDecimalPlaces(longitude) < 5) {
      geoHint = "Google recommends at least five decimal places. The script uses the numbers you entered.";
    }
  }

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Use the name, address, phone, and hours a person can already read on the page.
        Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Business name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Example Bakery"
            autoComplete="organization"
            required
          />
        </label>
        <label className="block text-sm font-medium">
          Type
          <select className={`${field} mt-1`} value={type} onChange={(event) => setType(event.target.value)}>
            {LOCAL_BUSINESS_TYPE_GROUPS.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.types.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium">
          URL
          <input
            className={`${field} mt-1`}
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com/locations/main-street"
            inputMode="url"
            autoComplete="url"
          />
          {urlHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{urlHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Phone
          <input
            className={`${field} mt-1`}
            value={telephone}
            onChange={(event) => setTelephone(event.target.value)}
            placeholder="+1-555-010-0100"
            inputMode="tel"
            autoComplete="tel"
          />
          {phoneHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{phoneHint}</span> : null}
        </label>
        <fieldset className="grid gap-4">
          <legend className="text-sm font-medium">Address</legend>
          <label className="block text-sm font-medium">
            Street address
            <input
              className={`${field} mt-1`}
              value={streetAddress}
              onChange={(event) => setStreetAddress(event.target.value)}
              placeholder="100 Main Street"
              autoComplete="street-address"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              City
              <input
                className={`${field} mt-1`}
                value={addressLocality}
                onChange={(event) => setAddressLocality(event.target.value)}
                placeholder="Springfield"
                autoComplete="address-level2"
              />
            </label>
            <label className="block text-sm font-medium">
              Region
              <input
                className={`${field} mt-1`}
                value={addressRegion}
                onChange={(event) => setAddressRegion(event.target.value)}
                placeholder="IL"
                autoComplete="address-level1"
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Postal code
              <input
                className={`${field} mt-1`}
                value={postalCode}
                onChange={(event) => setPostalCode(event.target.value)}
                placeholder="62701"
                autoComplete="postal-code"
              />
            </label>
            <label className="block text-sm font-medium">
              Country
              <input
                className={`${field} mt-1`}
                value={addressCountry}
                onChange={(event) => setAddressCountry(event.target.value)}
                placeholder="US"
                autoComplete="country"
              />
              {countryHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{countryHint}</span> : null}
            </label>
          </div>
          {addressMissing ? (
            <p className="text-xs text-ink-soft">Google’s LocalBusiness rich result needs an address as well as the name.</p>
          ) : null}
        </fieldset>
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium">Opening hours</legend>
          <p className="text-xs text-ink-soft">
            One row is one set of hours. Google’s examples use 00:00 to 00:00 for a closed day, and 00:00 to 23:59 for a
            day that is open all day.
          </p>
          {hours.map((row, index) => {
            const touched = row.days.length > 0 || row.opens.trim() !== "" || row.closes.trim() !== "";
            const opensOk = row.opens.trim() === "" || Boolean(clockTime(row.opens));
            const closesOk = row.closes.trim() === "" || Boolean(clockTime(row.closes));
            const complete = row.days.length > 0 && Boolean(clockTime(row.opens)) && Boolean(clockTime(row.closes));
            const hint =
              !opensOk || !closesOk
                ? "Use a 24-hour time, like 07:00."
                : touched && !complete
                  ? "Choose at least one day, an open time, and a close time."
                  : "";
            return (
              <div key={row.id} className="grid gap-2">
                <p className="text-sm font-medium">Hours {index + 1}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-2">
                  {WEEKDAYS.map((day) => (
                    <label key={day} className="flex items-center gap-1 text-xs font-normal">
                      <input
                        type="checkbox"
                        checked={row.days.includes(day)}
                        aria-label={`${day} for hours ${index + 1}`}
                        onChange={() => toggleDay(row.id, day)}
                      />
                      {day.slice(0, 3)}
                    </label>
                  ))}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium">
                    Opens
                    <input
                      className={`${field} mt-1`}
                      value={row.opens}
                      placeholder="07:00"
                      inputMode="numeric"
                      spellCheck={false}
                      aria-label={`Opens for hours ${index + 1}`}
                      onChange={(event) =>
                        setHours((current) =>
                          current.map((item) => (item.id === row.id ? { ...item, opens: event.target.value } : item)),
                        )
                      }
                    />
                  </label>
                  <label className="block text-sm font-medium">
                    Closes
                    <input
                      className={`${field} mt-1`}
                      value={row.closes}
                      placeholder="15:00"
                      inputMode="numeric"
                      spellCheck={false}
                      aria-label={`Closes for hours ${index + 1}`}
                      onChange={(event) =>
                        setHours((current) =>
                          current.map((item) => (item.id === row.id ? { ...item, closes: event.target.value } : item)),
                        )
                      }
                    />
                  </label>
                </div>
                {hint ? <p className="text-xs text-ink-soft">{hint}</p> : null}
                <button
                  type="button"
                  className="justify-self-start text-sm text-ink-soft underline-offset-4 hover:underline"
                  onClick={() =>
                    setHours(hours.length === 1 ? [emptyHours(row.id)] : hours.filter((item) => item.id !== row.id))
                  }
                >
                  Remove
                </button>
              </div>
            );
          })}
          <button
            type="button"
            className="justify-self-start rounded-lg border border-rule bg-white px-4 py-2 text-sm"
            onClick={() => setHours([...hours, emptyHours(nextHoursId())])}
          >
            Add hours
          </button>
        </fieldset>
        <fieldset className="grid gap-4">
          <legend className="text-sm font-medium">Geo coordinates (optional)</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Latitude
              <input
                className={`${field} mt-1`}
                value={latitude}
                onChange={(event) => setLatitude(event.target.value)}
                placeholder="39.78172"
                inputMode="decimal"
              />
            </label>
            <label className="block text-sm font-medium">
              Longitude
              <input
                className={`${field} mt-1`}
                value={longitude}
                onChange={(event) => setLongitude(event.target.value)}
                placeholder="-89.65015"
                inputMode="decimal"
              />
            </label>
          </div>
          {geoHint ? <p className="text-xs text-ink-soft">{geoHint}</p> : null}
        </fieldset>
        <fieldset className="grid gap-2">
          <legend className="text-sm font-medium">Profile URLs (sameAs)</legend>
          <p className="text-xs text-ink-soft">Only profiles this business controls.</p>
          {sameAs.map((row, index) => {
            const hint = row.url.trim() && !httpUrl(row.url) ? "Enter a full profile URL, or clear this row." : "";
            return (
              <div key={row.id} className="grid gap-2">
                <input
                  className={field}
                  value={row.url}
                  aria-label={`Profile URL ${index + 1}`}
                  placeholder="https://www.example.com/profile"
                  inputMode="url"
                  onChange={(event) =>
                    setSameAs(sameAs.map((item) => (item.id === row.id ? { ...item, url: event.target.value } : item)))
                  }
                />
                {hint ? <p className="text-xs text-ink-soft">{hint}</p> : null}
                <button
                  type="button"
                  className="justify-self-start text-sm text-ink-soft underline-offset-4 hover:underline"
                  onClick={() =>
                    setSameAs(
                      sameAs.length === 1 ? [{ id: row.id, url: "" }] : sameAs.filter((item) => item.id !== row.id),
                    )
                  }
                >
                  Remove
                </button>
              </div>
            );
          })}
          <button
            type="button"
            className="justify-self-start rounded-lg border border-rule bg-white px-4 py-2 text-sm"
            onClick={() => setSameAs([...sameAs, { id: nextSameId(), url: "" }])}
          >
            Add a profile URL
          </button>
        </fieldset>
        <label className="block text-sm font-medium">
          Logo URL
          <input
            className={`${field} mt-1`}
            value={logoUrl}
            onChange={(event) => setLogoUrl(event.target.value)}
            placeholder="https://example.com/logo.png"
            inputMode="url"
          />
          {logoHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{logoHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Image URL
          <input
            className={`${field} mt-1`}
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://example.com/photos/storefront.jpg"
            inputMode="url"
          />
          {imageHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{imageHint}</span> : null}
        </label>
      </div>
      <CopyBlock
        label="LocalBusiness JSON-LD"
        value={output}
        empty="Add a business name to generate the script tag."
      />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}
