"use client";

import { useMemo, useRef, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import {
  WEEKDAYS,
  buildRestaurantSchema,
  geoDecimalPlaces,
  geoNumber,
  httpUrl,
  restaurantCuisines,
  restaurantPriceRange,
  restaurantReservations,
  telephoneValue,
  clockTime,
} from "@/lib/generators";

type HoursRow = { id: string; days: string[]; opens: string; closes: string };

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

function emptyHours(id: string): HoursRow {
  return { id, days: [], opens: "", closes: "" };
}

export function RestaurantSchemaGenerator() {
  const hoursSeq = useRef(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [addressLocality, setAddressLocality] = useState("");
  const [addressRegion, setAddressRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressCountry, setAddressCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [telephone, setTelephone] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cuisines, setCuisines] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [hours, setHours] = useState<HoursRow[]>([emptyHours("hours-1")]);
  const [menuUrl, setMenuUrl] = useState("");
  const [acceptsReservations, setAcceptsReservations] = useState("");

  const output = useMemo(
    () =>
      buildRestaurantSchema({
        name,
        description,
        streetAddress,
        addressLocality,
        addressRegion,
        postalCode,
        addressCountry,
        latitude,
        longitude,
        telephone,
        url,
        imageUrl,
        cuisines,
        priceRange,
        hours: hours.map((row) => ({
          days: row.days,
          opens: row.opens,
          closes: row.closes,
        })),
        menuUrl,
        acceptsReservations,
      }),
    [
      name,
      description,
      streetAddress,
      addressLocality,
      addressRegion,
      postalCode,
      addressCountry,
      latitude,
      longitude,
      telephone,
      url,
      imageUrl,
      cuisines,
      priceRange,
      hours,
      menuUrl,
      acceptsReservations,
    ],
  );

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

  const started = [
    name,
    description,
    streetAddress,
    addressLocality,
    addressRegion,
    postalCode,
    addressCountry,
    latitude,
    longitude,
    telephone,
    url,
    imageUrl,
    cuisines,
    priceRange,
    menuUrl,
    acceptsReservations,
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
  const imageHint = imageUrl.trim() && !httpUrl(imageUrl) ? "Enter the image URL, or leave it blank." : "";
  const urlHint = url.trim() && !httpUrl(url) ? "Enter the page URL, or leave it blank." : "";
  const menuHint = menuUrl.trim() && !httpUrl(menuUrl) ? "Enter the menu URL, or leave it blank." : "";
  const priceHint =
    priceRange.trim() && !restaurantPriceRange(priceRange)
      ? "Use the short price range the page shows, such as $$ or $10-15. 100 characters or longer is left out."
      : "";
  const reservationWritten = restaurantReservations(acceptsReservations) !== null;
  const reservationHint =
    acceptsReservations.trim() && !reservationWritten
      ? "Use yes, no, or the URL where a person books. A sentence is left out."
      : "";

  const cuisineLines = cuisines.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const cuisineCount = restaurantCuisines(cuisines).length;
  const cuisineHint =
    cuisineLines.length > 0 && cuisineCount < cuisineLines.length
      ? "A line was left out. Use a cuisine of at most 80 characters. A repeated name is written once."
      : "";

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
        The script updates as you type. Use the name, the address, the cuisine, and the other facts a person can
        already see. Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Example Restaurant"
            required
          />
          {started && !name.trim() ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              Add the name. The script is written once the restaurant name is present.
            </span>
          ) : null}
        </label>
        <label className="block text-sm font-medium">
          Description
          <textarea
            className={`${field} mt-1 min-h-24`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="The sentence already on the page."
            rows={3}
          />
        </label>
        <fieldset className="grid gap-4">
          <legend className="text-sm font-medium">Address</legend>
          <label className="block text-sm font-medium">
            Street address
            <input
              className={`${field} mt-1`}
              value={streetAddress}
              onChange={(event) => setStreetAddress(event.target.value)}
              placeholder="418 Cedar Street"
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
                placeholder="62704"
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
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Telephone
            <input
              className={`${field} mt-1`}
              value={telephone}
              onChange={(event) => setTelephone(event.target.value)}
              placeholder="+1-555-010-0194"
              inputMode="tel"
              autoComplete="tel"
            />
            {phoneHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{phoneHint}</span> : null}
          </label>
          <label className="block text-sm font-medium">
            Page URL
            <input
              className={`${field} mt-1`}
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://example.com/restaurants/example"
              inputMode="url"
              autoComplete="url"
            />
            {urlHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{urlHint}</span> : null}
          </label>
        </div>
        <label className="block text-sm font-medium">
          Image URL
          <input
            className={`${field} mt-1`}
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://example.com/photos/example.jpg"
            inputMode="url"
          />
          {imageHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{imageHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          servesCuisine
          <textarea
            className={`${field} mt-1 min-h-24 font-mono`}
            value={cuisines}
            onChange={(event) => setCuisines(event.target.value)}
            placeholder={"Middle Eastern\nMediterranean"}
            rows={3}
            spellCheck={false}
          />
          {cuisineHint ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">{cuisineHint}</span>
          ) : (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              One cuisine per line. One line is a single value. Two lines become an array.
            </span>
          )}
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
              The text the page shows, such as $$ or $10-15. This is not a dish price and not an Offer.
            </span>
          )}
        </label>
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
                ? "Use a 24-hour time, like 11:00."
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
                      placeholder="11:00"
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
                      placeholder="21:00"
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
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Menu URL
            <input
              className={`${field} mt-1`}
              value={menuUrl}
              onChange={(event) => setMenuUrl(event.target.value)}
              placeholder="https://example.com/restaurants/example/menu"
              inputMode="url"
            />
            {menuHint ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">{menuHint}</span>
            ) : (
              <span className="mt-1 block text-xs font-normal text-ink-soft">
                Written as menu. This form does not also write hasMenu.
              </span>
            )}
          </label>
          <label className="block text-sm font-medium">
            acceptsReservations
            <input
              className={`${field} mt-1`}
              value={acceptsReservations}
              onChange={(event) => setAcceptsReservations(event.target.value)}
              placeholder="yes"
            />
            {reservationHint ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">{reservationHint}</span>
            ) : (
              <span className="mt-1 block text-xs font-normal text-ink-soft">
                yes or no, or the URL where a person books. Not one guest’s reservation.
              </span>
            )}
          </label>
        </div>
      </div>
      <CopyBlock label="Restaurant JSON-LD" value={output} empty="Add a name to generate the script tag." />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}
