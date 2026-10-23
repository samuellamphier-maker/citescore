"use client";

import { useMemo, useRef, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import {
  WEEKDAYS,
  acceptingNewPatients,
  buildDentistSchema,
  clinicSpecialties,
  clockTime,
  geoDecimalPlaces,
  geoNumber,
  httpUrl,
  restaurantPriceRange,
  telephoneValue,
} from "@/lib/generators";

type HoursRow = { id: string; days: string[]; opens: string; closes: string };
type ProfileRow = { id: string; url: string };

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

function emptyHours(id: string): HoursRow {
  return { id, days: [], opens: "", closes: "" };
}

export function DentistSchemaGenerator() {
  const hoursSeq = useRef(1);
  const profileSeq = useRef(1);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [telephone, setTelephone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [addressLocality, setAddressLocality] = useState("");
  const [addressRegion, setAddressRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressCountry, setAddressCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [hours, setHours] = useState<HoursRow[]>([emptyHours("hours-1")]);
  const [specialties, setSpecialties] = useState("");
  const [accepting, setAccepting] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sameAs, setSameAs] = useState<ProfileRow[]>([{ id: "same-1", url: "" }]);

  const output = useMemo(
    () =>
      buildDentistSchema({
        name,
        url,
        logoUrl,
        telephone,
        streetAddress,
        addressLocality,
        addressRegion,
        postalCode,
        addressCountry,
        latitude,
        longitude,
        hours: hours.map((row) => ({
          days: row.days,
          opens: row.opens,
          closes: row.closes,
        })),
        specialties,
        acceptingNewPatients: accepting,
        priceRange,
        sameAs: sameAs.map((row) => row.url),
      }),
    [
      name,
      url,
      logoUrl,
      telephone,
      streetAddress,
      addressLocality,
      addressRegion,
      postalCode,
      addressCountry,
      latitude,
      longitude,
      hours,
      specialties,
      accepting,
      priceRange,
      sameAs,
    ],
  );

  function nextHoursId() {
    hoursSeq.current += 1;
    return `hours-${hoursSeq.current}`;
  }

  function nextProfileId() {
    profileSeq.current += 1;
    return `same-${profileSeq.current}`;
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

  const started = [
    name,
    url,
    logoUrl,
    telephone,
    streetAddress,
    addressLocality,
    addressRegion,
    postalCode,
    addressCountry,
    latitude,
    longitude,
    specialties,
    priceRange,
    ...sameAs.map((row) => row.url),
    ...hours.flatMap((row) => [row.opens, row.closes, ...row.days]),
  ].some((value) => value.trim());

  const addressMissing =
    name.trim() &&
    ![streetAddress, addressLocality, addressRegion, postalCode, addressCountry].some((value) => value.trim());
  const countryHint =
    addressCountry.trim() && !/^[A-Za-z]{2}$/.test(addressCountry.trim())
      ? "Google’s examples use a two-letter country code, such as US. Other country text is still written."
      : "";
  const phoneHint =
    telephone.trim() && !telephoneValue(telephone)
      ? "Enter a phone number with 7–15 digits, or leave this blank."
      : "";
  const urlHint = url.trim() && !httpUrl(url) ? "Enter the page URL, or leave it blank." : "";
  const logoHint = logoUrl.trim() && !httpUrl(logoUrl) ? "Enter the logo URL, or leave it blank." : "";
  const priceHint =
    priceRange.trim() && !restaurantPriceRange(priceRange)
      ? "Use fewer than 100 characters, or leave this blank. Google’s local business page does not show a longer price range."
      : "";

  const specialtyLines = specialties.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const specialtyCount = clinicSpecialties(specialties).length;
  const specialtyHint =
    specialtyLines.length > 0 && specialtyCount < specialtyLines.length
      ? "A line was left out. Use a schema.org MedicalSpecialty name, such as Dentistry, or its https://schema.org URL. A repeated name is written once."
      : "";
  const acceptingWritten = acceptingNewPatients(accepting) !== null;

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
        The script updates as you type. Use the name, the address, the specialty, and the other facts a person can
        already see. Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Example Dental"
            autoComplete="organization"
            required
          />
          {started && !name.trim() ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              Add the name. The script is written once the office name is present.
            </span>
          ) : null}
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Page URL
            <input
              className={`${field} mt-1`}
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://example.com/offices/example"
              inputMode="url"
              autoComplete="url"
            />
            {urlHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{urlHint}</span> : null}
          </label>
          <label className="block text-sm font-medium">
            Logo URL
            <input
              className={`${field} mt-1`}
              value={logoUrl}
              onChange={(event) => setLogoUrl(event.target.value)}
              placeholder="https://example.com/logo.png"
              inputMode="url"
            />
            {logoHint ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">{logoHint}</span>
            ) : (
              <span className="mt-1 block text-xs font-normal text-ink-soft">
                Written as a URL. This form does not wrap the logo in an ImageObject.
              </span>
            )}
          </label>
        </div>
        <label className="block text-sm font-medium">
          Telephone
          <input
            className={`${field} mt-1`}
            value={telephone}
            onChange={(event) => setTelephone(event.target.value)}
            placeholder="+1-555-010-0201"
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
              placeholder="18 Bay Street"
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
                placeholder="62702"
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
            <p className="text-xs text-ink-soft">
              Google’s local business rich result needs an address as well as the name. The script is still written from
              the name.
            </p>
          ) : null}
        </fieldset>
        <fieldset className="grid gap-4">
          <legend className="text-sm font-medium">Geo coordinates</legend>
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
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium">Opening hours</legend>
          <p className="text-xs text-ink-soft">
            One row becomes one openingHours string, such as Mo-Fr 08:00-17:00. Consecutive days are a range. A day you
            do not check is left out. This form does not write openingHoursSpecification.
          </p>
          {hours.map((row, index) => {
            const touched = row.days.length > 0 || row.opens.trim() !== "" || row.closes.trim() !== "";
            const opensOk = row.opens.trim() === "" || Boolean(clockTime(row.opens));
            const closesOk = row.closes.trim() === "" || Boolean(clockTime(row.closes));
            const complete = row.days.length > 0 && Boolean(clockTime(row.opens)) && Boolean(clockTime(row.closes));
            const hint =
              !opensOk || !closesOk
                ? "Use a 24-hour time, like 08:00."
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
                      placeholder="08:00"
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
                      placeholder="17:00"
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
        <label className="block text-sm font-medium">
          medicalSpecialty
          <textarea
            className={`${field} mt-1 min-h-24 font-mono`}
            value={specialties}
            onChange={(event) => setSpecialties(event.target.value)}
            placeholder={"Dentistry"}
            rows={3}
            spellCheck={false}
          />
          {specialtyHint ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">{specialtyHint}</span>
          ) : (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              One schema.org specialty per line. Dentistry is the name for a dental practice. One line is a single URL.
              Two lines become an array.
            </span>
          )}
        </label>
        <label className="block text-sm font-medium">
          Accepting new patients
          <select className={`${field} mt-1`} value={accepting} onChange={(event) => setAccepting(event.target.value)}>
            <option value="">Leave out</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <span className="mt-1 block text-xs font-normal text-ink-soft">
            {accepting && !acceptingWritten
              ? "Choose yes or no, or leave this blank."
              : "Written as isAcceptingNewPatients only when the page says yes or no. This form does not write availableService."}
          </span>
        </label>
        <label className="block text-sm font-medium">
          priceRange
          <input
            className={`${field} mt-1`}
            value={priceRange}
            onChange={(event) => setPriceRange(event.target.value)}
            placeholder="$$"
          />
          {priceHint ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">{priceHint}</span>
          ) : (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              Only when the page shows a range, such as $$. Leave it blank when the page does not.
            </span>
          )}
        </label>
        <fieldset className="grid gap-2">
          <legend className="text-sm font-medium">Profile URLs (sameAs)</legend>
          <p className="text-xs text-ink-soft">
            Only profiles this office controls. One URL is a single value. Two become an array.
          </p>
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
            onClick={() => setSameAs([...sameAs, { id: nextProfileId(), url: "" }])}
          >
            Add a profile URL
          </button>
        </fieldset>
      </div>
      <CopyBlock label="Dentist JSON-LD" value={output} empty="Add a name to generate the script tag." />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}
