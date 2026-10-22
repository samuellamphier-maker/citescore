import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildVehicleSchema,
  odometerReading,
  vehicleColor,
  vehicleFuelType,
  vehicleModelDate,
  vehicleModelValue,
  vehicleVin,
} from "./generators.ts";

function parse(script: string) {
  const json = script.replace(/^<script type="application\/ld\+json">\n/, "").replace(/\n<\/script>\n$/, "");
  return JSON.parse(json) as Record<string, unknown>;
}

const blank = {
  type: "Car",
  name: "",
  description: "",
  brand: "",
  model: "",
  vehicleModelDate: "",
  mileage: "",
  mileageUnit: "",
  fuelType: "",
  color: "",
  vin: "",
  price: "",
  currency: "",
  imageUrl: "",
  url: "",
};

test("Vehicle JSON-LD is empty until the name and type are present", () => {
  assert.equal(buildVehicleSchema({ ...blank, name: "  ", model: "Example" }), "");
  assert.equal(buildVehicleSchema({ ...blank, name: "Example Vehicle", type: "Boat" }), "");
  assert.equal(vehicleModelDate("2017"), "2017");
  assert.equal(vehicleModelDate("2017-06"), "2017-06");
  assert.equal(vehicleModelDate("2020-01-31"), "2020-01-31");
  assert.equal(vehicleModelDate("2020-01-31T15:04:00Z"), "2020-01-31T15:04:00Z");
  assert.equal(vehicleModelDate("model year 2017"), "");
  assert.equal(odometerReading("10,000"), 10000);
  assert.equal(odometerReading("0"), 0);
  assert.equal(odometerReading("-1"), null);
  assert.equal(odometerReading("12 miles"), null);
  assert.equal(vehicleVin("1m8gdm9a xkp042788"), "1M8GDM9AXKP042788");
  assert.equal(vehicleVin("1M8GDM9A1KP042788"), "");
  assert.equal(vehicleVin("1M8GDM9AIKP042788"), "");
  assert.equal(vehicleFuelType("Gasoline"), "Gasoline");
  assert.equal(vehicleFuelType("https://example.com/fuel/gasoline"), "https://example.com/fuel/gasoline");
  assert.equal(vehicleFuelType("x".repeat(81)), "");
  assert.equal(vehicleColor("blue"), "blue");
  assert.equal(vehicleModelValue("example.com/models/example"), "https://example.com/models/example");
});

test("Car writes the visible fields and leaves invalid ones out", () => {
  const script = buildVehicleSchema({
    ...blank,
    name: "  Example   < Vehicle ",
    description: "  The sentence already on the page. ",
    brand: " Example Motors ",
    model: "Example Model",
    vehicleModelDate: "2017",
    mileage: "10,000",
    mileageUnit: "SMI",
    fuelType: "Gasoline",
    color: "blue",
    vin: "1M8GDM9AXKP042788",
    price: "10,499.00",
    currency: "usd",
    imageUrl: "example.com/photos/example.jpg",
    url: "example.com/vehicles/example",
  });
  assert.match(script, /Example \\u003c Vehicle/);
  const data = parse(script);

  assert.equal(data["@context"], "https://schema.org");
  assert.equal(data["@type"], "Car");
  assert.equal(data.name, "Example < Vehicle");
  assert.equal(data.description, "The sentence already on the page.");
  assert.deepEqual(data.brand, { "@type": "Brand", name: "Example Motors" });
  assert.equal(data.model, "Example Model");
  assert.equal(data.vehicleModelDate, "2017");
  assert.deepEqual(data.mileageFromOdometer, {
    "@type": "QuantitativeValue",
    value: 10000,
    unitCode: "SMI",
  });
  assert.equal(data.fuelType, "Gasoline");
  assert.equal(data.color, "blue");
  assert.equal(data.vehicleIdentificationNumber, "1M8GDM9AXKP042788");
  assert.equal(data.image, "https://example.com/photos/example.jpg");
  assert.equal(data.url, "https://example.com/vehicles/example");
  assert.deepEqual(data.offers, { "@type": "Offer", price: "10499.00", priceCurrency: "USD" });
  assert.equal("modelDate" in data, false);
  assert.equal("itemCondition" in data, false);
  assert.equal("availability" in data, false);
  assert.equal(Array.isArray(data["@type"]), false);
});

test("Vehicle is one object, and a partial offer or odometer is left out", () => {
  const data = parse(
    buildVehicleSchema({
      ...blank,
      type: "Vehicle",
      name: "Example Vehicle",
      brand: "https://example.com/brands/example",
      model: "https://example.com/models/example",
      mileage: "0",
      mileageUnit: "",
      price: "10499",
      currency: "",
      vin: "not a vin",
      fuelType: "",
      color: "",
    }),
  );

  assert.equal(data["@type"], "Vehicle");
  assert.equal("brand" in data, false);
  assert.equal(data.model, "https://example.com/models/example");
  assert.equal("mileageFromOdometer" in data, false);
  assert.equal("offers" in data, false);
  assert.equal("vehicleIdentificationNumber" in data, false);
});

test("a zero odometer with a unit is written, and a unit without a reading is left out", () => {
  const withZero = parse(
    buildVehicleSchema({
      ...blank,
      name: "Example Vehicle",
      mileage: "0",
      mileageUnit: "KMT",
      price: "",
      currency: "USD",
    }),
  );
  assert.deepEqual(withZero.mileageFromOdometer, {
    "@type": "QuantitativeValue",
    value: 0,
    unitCode: "KMT",
  });
  assert.equal("offers" in withZero, false);

  const unitOnly = parse(
    buildVehicleSchema({
      ...blank,
      name: "Example Vehicle",
      mileage: "",
      mileageUnit: "SMI",
    }),
  );
  assert.equal("mileageFromOdometer" in unitOnly, false);
});
