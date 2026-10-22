"use client";

import { useMemo, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import {
  ODOMETER_UNIT_CODES,
  VEHICLE_TYPES,
  buildVehicleSchema,
  httpUrl,
  isoCurrency,
  odometerReading,
  productPrice,
  vehicleColor,
  vehicleFuelType,
  vehicleModelDate,
  vehicleModelValue,
  vehicleVin,
  type OdometerUnitCode,
  type VehicleType,
} from "@/lib/generators";

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

const unitLabel: Record<(typeof ODOMETER_UNIT_CODES)[number], string> = {
  SMI: "Miles (SMI)",
  KMT: "Kilometers (KMT)",
};

export function VehicleSchemaGenerator() {
  const [type, setType] = useState<VehicleType>("Car");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [modelDate, setModelDate] = useState("");
  const [mileage, setMileage] = useState("");
  const [mileageUnit, setMileageUnit] = useState<"" | OdometerUnitCode>("");
  const [fuelType, setFuelType] = useState("");
  const [color, setColor] = useState("");
  const [vin, setVin] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [url, setUrl] = useState("");

  const output = useMemo(
    () =>
      buildVehicleSchema({
        type,
        name,
        description,
        brand,
        model,
        vehicleModelDate: modelDate,
        mileage,
        mileageUnit,
        fuelType,
        color,
        vin,
        price,
        currency,
        imageUrl,
        url,
      }),
    [type, name, description, brand, model, modelDate, mileage, mileageUnit, fuelType, color, vin, price, currency, imageUrl, url],
  );

  const started = [name, description, brand, model, modelDate, mileage, fuelType, color, vin, price, currency, imageUrl, url].some(
    (value) => value.trim(),
  );
  const brandIsUrl = /^https?:\/\//i.test(brand.trim()) || /^[^/\s]+\.[^/\s]+\/.+/.test(brand.trim());
  const dateHint =
    modelDate.trim() && !vehicleModelDate(modelDate)
      ? "Use a year, YYYY-MM, YYYY-MM-DD, or a date and time. A sentence is left out."
      : "";
  const mileageHint = mileage.trim() && odometerReading(mileage) === null
    ? "Enter the odometer reading as a number, or leave it blank. Zero is kept."
    : mileage.trim() && odometerReading(mileage) !== null && !mileageUnit
      ? "Choose miles or kilometers. A reading without a unit is left out."
      : !mileage.trim() && mileageUnit
        ? "Enter the reading, or clear the unit. A unit alone is left out."
        : "";
  const fuelHint =
    fuelType.trim() && !vehicleFuelType(fuelType)
      ? "Use a short fuel name or a fuel URL. A value longer than 80 characters is left out."
      : "";
  const colorHint =
    color.trim() && !vehicleColor(color)
      ? "Use the color the page shows. A value longer than 80 characters is left out."
      : "";
  const vinHint =
    vin.trim() && !vehicleVin(vin)
      ? "Use a 17-character VIN. I, O, and Q are left out, and the check digit has to match. Spaces and hyphens are ignored."
      : "";
  const priceInvalid = price.trim() && !productPrice(price);
  const currencyInvalid = currency.trim() && !isoCurrency(currency);
  const offerPartial = Boolean(price.trim()) !== Boolean(currency.trim());
  const imageHint = imageUrl.trim() && !httpUrl(imageUrl) ? "Enter the image URL, or leave it blank." : "";
  const urlHint = url.trim() && !httpUrl(url) ? "Enter the page URL, or leave it blank." : "";
  const modelHint =
    model.trim() && !vehicleModelValue(model) ? "Enter the model name or a model URL, or leave it blank." : "";

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Use the name, the VIN, the price, and the other facts a person can already see.
        Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Type
          <select
            className={`${field} mt-1`}
            value={type}
            onChange={(event) => setType(event.target.value as VehicleType)}
          >
            {VEHICLE_TYPES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <span className="mt-1 block text-xs font-normal text-ink-soft">
            Car is a car. Vehicle is the broader type. The script writes one type.
          </span>
        </label>
        <label className="block text-sm font-medium">
          Name
          <input
            className={`${field} mt-1`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Example Vehicle"
            required
          />
          {started && !name.trim() ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              Add the name. The script is written once the vehicle name is present.
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
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Brand
            <input
              className={`${field} mt-1`}
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              placeholder="Example Motors"
            />
            {brandIsUrl ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">
                Enter the brand name. A URL alone is left out.
              </span>
            ) : null}
          </label>
          <label className="block text-sm font-medium">
            Model
            <input
              className={`${field} mt-1`}
              value={model}
              onChange={(event) => setModel(event.target.value)}
              placeholder="Example Model"
            />
            {modelHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{modelHint}</span> : null}
          </label>
        </div>
        <label className="block text-sm font-medium">
          vehicleModelDate
          <input
            className={`${field} mt-1`}
            value={modelDate}
            onChange={(event) => setModelDate(event.target.value)}
            placeholder="2017"
          />
          {dateHint ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">{dateHint}</span>
          ) : (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              A year, YYYY-MM, or a full date. This form writes vehicleModelDate. It does not write modelDate.
            </span>
          )}
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            mileageFromOdometer
            <input
              className={`${field} mt-1`}
              value={mileage}
              onChange={(event) => setMileage(event.target.value)}
              placeholder="10000"
              inputMode="decimal"
            />
          </label>
          <label className="block text-sm font-medium">
            Unit
            <select
              className={`${field} mt-1`}
              value={mileageUnit}
              onChange={(event) => setMileageUnit(event.target.value as "" | OdometerUnitCode)}
            >
              <option value="">Not stated on the page</option>
              {ODOMETER_UNIT_CODES.map((item) => (
                <option key={item} value={item}>
                  {unitLabel[item]}
                </option>
              ))}
            </select>
          </label>
        </div>
        {mileageHint ? <p className="-mt-2 text-xs text-ink-soft">{mileageHint}</p> : null}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            fuelType
            <input
              className={`${field} mt-1`}
              value={fuelType}
              onChange={(event) => setFuelType(event.target.value)}
              placeholder="Gasoline"
            />
            {fuelHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{fuelHint}</span> : null}
          </label>
          <label className="block text-sm font-medium">
            color
            <input
              className={`${field} mt-1`}
              value={color}
              onChange={(event) => setColor(event.target.value)}
              placeholder="blue"
            />
            {colorHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{colorHint}</span> : null}
          </label>
        </div>
        <label className="block text-sm font-medium">
          VIN
          <input
            className={`${field} mt-1`}
            value={vin}
            onChange={(event) => setVin(event.target.value)}
            placeholder="The VIN already on the page"
            autoCapitalize="characters"
            spellCheck={false}
          />
          {vinHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{vinHint}</span> : null}
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Price
            <input
              className={`${field} mt-1`}
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="10499"
              inputMode="decimal"
            />
            {priceInvalid ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">
                Enter a number greater than zero, like 10499 or 10499.00.
              </span>
            ) : null}
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
            {currencyInvalid ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">Use a three-letter ISO 4217 code, like USD.</span>
            ) : null}
          </label>
        </div>
        {offerPartial && !priceInvalid && !currencyInvalid ? (
          <p className="-mt-2 text-xs text-ink-soft">Enter both a price and a currency. One without the other is left out.</p>
        ) : null}
        <div className="grid gap-4 sm:grid-cols-2">
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
            Page URL
            <input
              className={`${field} mt-1`}
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://example.com/vehicles/example"
              inputMode="url"
              autoComplete="url"
            />
            {urlHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{urlHint}</span> : null}
          </label>
        </div>
      </div>
      <CopyBlock label="Vehicle JSON-LD" value={output} empty="Add a name to generate the script tag." />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}
