"use client";

import { useMemo, useState } from "react";
import { CopyBlock } from "@/components/CopyBlock";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import {
  APPLICANT_LOCATION_TYPES,
  EMPLOYMENT_TYPES,
  SALARY_UNITS,
  buildJobPostingSchema,
  eventEndOk,
  httpUrl,
  isoCurrency,
  isoDateTime,
  jobDescriptionText,
  jobSalaryBounds,
  nonNegativePrice,
  type JobLocationKind,
} from "@/lib/generators";

const field =
  "w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70";

const employmentLabel: Record<(typeof EMPLOYMENT_TYPES)[number], string> = {
  FULL_TIME: "Full time",
  PART_TIME: "Part time",
  CONTRACTOR: "Contractor",
  TEMPORARY: "Temporary",
  INTERN: "Intern",
  VOLUNTEER: "Volunteer",
  PER_DIEM: "Per diem",
  OTHER: "Other",
};

const unitLabel: Record<(typeof SALARY_UNITS)[number], string> = {
  HOUR: "Hour",
  DAY: "Day",
  WEEK: "Week",
  MONTH: "Month",
  YEAR: "Year",
};

export function JobPostingSchemaGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [datePosted, setDatePosted] = useState("");
  const [validThrough, setValidThrough] = useState("");
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [organizationName, setOrganizationName] = useState("");
  const [organizationUrl, setOrganizationUrl] = useState("");
  const [organizationLogo, setOrganizationLogo] = useState("");
  const [locationKind, setLocationKind] = useState<JobLocationKind>("place");
  const [streetAddress, setStreetAddress] = useState("");
  const [addressLocality, setAddressLocality] = useState("");
  const [addressRegion, setAddressRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressCountry, setAddressCountry] = useState("");
  const [applicantLocationType, setApplicantLocationType] = useState("Country");
  const [applicantLocationName, setApplicantLocationName] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [salaryCurrency, setSalaryCurrency] = useState("");
  const [salaryUnit, setSalaryUnit] = useState("");
  const [directApply, setDirectApply] = useState("");

  const output = useMemo(
    () =>
      buildJobPostingSchema({
        title,
        description,
        datePosted,
        validThrough,
        employmentTypes,
        organizationName,
        organizationUrl,
        organizationLogo,
        locationKind,
        streetAddress,
        addressLocality,
        addressRegion,
        postalCode,
        addressCountry,
        applicantLocationType,
        applicantLocationName,
        salaryMin,
        salaryMax,
        salaryCurrency,
        salaryUnit,
        directApply,
      }),
    [
      title,
      description,
      datePosted,
      validThrough,
      employmentTypes,
      organizationName,
      organizationUrl,
      organizationLogo,
      locationKind,
      streetAddress,
      addressLocality,
      addressRegion,
      postalCode,
      addressCountry,
      applicantLocationType,
      applicantLocationName,
      salaryMin,
      salaryMax,
      salaryCurrency,
      salaryUnit,
      directApply,
    ],
  );

  const started =
    [
      title,
      description,
      datePosted,
      validThrough,
      organizationName,
      organizationUrl,
      organizationLogo,
      streetAddress,
      addressLocality,
      addressRegion,
      postalCode,
      addressCountry,
      applicantLocationName,
      salaryMin,
      salaryMax,
      salaryCurrency,
    ].some((value) => value.trim()) ||
    employmentTypes.length > 0 ||
    Boolean(directApply) ||
    Boolean(salaryUnit);

  const titleText = title.trim().replace(/\s+/g, " ");
  const descriptionText = jobDescriptionText(description);
  const titleMissing = started && !titleText;
  const descriptionHint =
    description.trim() && !descriptionText
      ? "Add the description a person can already read on the page."
      : descriptionText && titleText && descriptionText === titleText
        ? "The description has to be the job, not a repeat of the title. Google’s page says they cannot be the same."
        : "";
  const posted = isoDateTime(datePosted);
  const through = isoDateTime(validThrough);
  const postedHint = datePosted.trim() && !posted ? "Use a real date, like 2026-10-20, or a date and time." : "";
  const throughHint =
    validThrough.trim() && !through
      ? "Use a real date, like 2026-12-31, or leave this blank when the posting has no expiration."
      : through && posted && !eventEndOk(posted, through)
        ? "The expiration has to be on or after the date posted, or leave it blank."
        : "";
  const orgUrlHint =
    organizationUrl.trim() && !httpUrl(organizationUrl)
      ? "Enter the organization’s URL, or leave it blank. The name is still included."
      : "";
  const logoHint =
    organizationLogo.trim() && !httpUrl(organizationLogo)
      ? "Enter a logo URL, or leave it blank."
      : "";
  const needsPlace = locationKind === "place" || locationKind === "hybrid";
  const needsRemote = locationKind === "telecommute" || locationKind === "hybrid";
  const remoteHint =
    needsRemote && locationKind === "telecommute" && applicantLocationType !== "Country"
      ? "Google’s page says a 100% remote job needs at least one country. A state or a city is still written when that is what the page shows."
      : "";
  const salaryStarted = Boolean(salaryMin.trim() || salaryMax.trim() || salaryCurrency.trim() || salaryUnit);
  const minReady = !salaryMin.trim() || Boolean(nonNegativePrice(salaryMin));
  const maxReady = !salaryMax.trim() || Boolean(nonNegativePrice(salaryMax));
  const bounds = minReady && maxReady ? jobSalaryBounds(salaryMin, salaryMax) : null;
  const salaryHint = (() => {
    if (!salaryStarted) return "";
    if (!minReady || !maxReady) return "Enter a number, including 0 when the role is unpaid.";
    if (!salaryMin.trim() && salaryMax.trim()) return "Add a minimum. A maximum alone is left out.";
    if (salaryMin.trim() && salaryMax.trim() && bounds === null) return "The maximum has to be at least the minimum.";
    if (salaryCurrency.trim() && !isoCurrency(salaryCurrency)) return "Use a three-letter ISO 4217 code, like USD.";
    if (bounds && (!isoCurrency(salaryCurrency) || !salaryUnit)) {
      return "Add a currency and a pay period, or clear the salary. The salary is left out until all three are valid.";
    }
    if ((salaryCurrency.trim() || salaryUnit) && !bounds) return "Add a minimum, or clear the salary.";
    return "";
  })();

  function toggleEmployment(value: string) {
    setEmploymentTypes((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  }

  return (
    <form className="rounded-2xl border border-rule bg-cream p-5 text-ink" onSubmit={(event) => event.preventDefault()}>
      <p className="text-sm text-ink-soft">
        The script updates as you type. Use the title, description, employer, location, and salary a person can already
        see on the job page. Nothing is uploaded.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block text-sm font-medium">
          Job title
          <input
            className={`${field} mt-1`}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Software engineer"
            required
          />
          {titleMissing ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">Add the job title shown on the page.</span>
          ) : (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              The role only. Leave the company, the city, and the pay out of this field.
            </span>
          )}
        </label>
        <label className="block text-sm font-medium">
          Description
          <textarea
            className={`${field} mt-1 min-h-28`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder={"What the person will do, the skills you ask for, and the hours.\n\nA blank line starts a new paragraph."}
          />
          {descriptionHint ? (
            <span className="mt-1 block text-xs font-normal text-ink-soft">{descriptionHint}</span>
          ) : (
            <span className="mt-1 block text-xs font-normal text-ink-soft">
              A blank line becomes a paragraph. A single line break becomes a line break. Pasted tags are removed.
            </span>
          )}
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Date posted
            <input
              className={`${field} mt-1 font-mono text-[13px]`}
              value={datePosted}
              onChange={(event) => setDatePosted(event.target.value)}
              placeholder="2026-10-20"
              inputMode="numeric"
              spellCheck={false}
            />
            {postedHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{postedHint}</span> : null}
          </label>
          <label className="block text-sm font-medium">
            Valid through
            <input
              className={`${field} mt-1 font-mono text-[13px]`}
              value={validThrough}
              onChange={(event) => setValidThrough(event.target.value)}
              placeholder="2026-12-31"
              inputMode="numeric"
              spellCheck={false}
            />
            {throughHint ? (
              <span className="mt-1 block text-xs font-normal text-ink-soft">{throughHint}</span>
            ) : (
              <span className="mt-1 block text-xs font-normal text-ink-soft">
                Leave blank only when the posting has no expiration date.
              </span>
            )}
          </label>
        </div>
        <fieldset>
          <legend className="text-sm font-medium">Employment type</legend>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-2">
            {EMPLOYMENT_TYPES.map((item) => (
              <label key={item} className="flex items-center gap-1 text-xs font-normal">
                <input
                  type="checkbox"
                  checked={employmentTypes.includes(item)}
                  aria-label={employmentLabel[item]}
                  onChange={() => toggleEmployment(item)}
                />
                {employmentLabel[item]}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="block text-sm font-medium">
          Hiring organization name
          <input
            className={`${field} mt-1`}
            value={organizationName}
            onChange={(event) => setOrganizationName(event.target.value)}
            placeholder="CiteScore"
          />
          <span className="mt-1 block text-xs font-normal text-ink-soft">
            The company, not the street address of one office. Use the word confidential only when the page says the
            employer is confidential.
          </span>
        </label>
        <label className="block text-sm font-medium">
          Hiring organization URL
          <input
            className={`${field} mt-1`}
            value={organizationUrl}
            onChange={(event) => setOrganizationUrl(event.target.value)}
            placeholder="https://example.com"
            inputMode="url"
            autoComplete="url"
          />
          {orgUrlHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{orgUrlHint}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Logo URL
          <input
            className={`${field} mt-1`}
            value={organizationLogo}
            onChange={(event) => setOrganizationLogo(event.target.value)}
            placeholder="https://example.com/logo.png"
            inputMode="url"
          />
          {logoHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{logoHint}</span> : null}
        </label>
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium">Where the job is done</legend>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-normal">
            {(
              [
                ["place", "On-site"],
                ["telecommute", "100% remote"],
                ["hybrid", "Office and remote"],
              ] as const
            ).map(([value, label]) => (
              <label key={value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="locationKind"
                  checked={locationKind === value}
                  onChange={() => setLocationKind(value)}
                />
                {label}
              </label>
            ))}
          </div>
          <p className="text-xs text-ink-soft">
            100% remote writes jobLocationType TELECOMMUTE and an applicant location. It does not write a street
            address. A job that is sometimes remote still needs the office.
          </p>
          {needsPlace ? (
            <div className="grid gap-4">
              <label className="block text-sm font-medium">
                Street address
                <input
                  className={`${field} mt-1`}
                  value={streetAddress}
                  onChange={(event) => setStreetAddress(event.target.value)}
                  placeholder="555 Clancy St"
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
                    placeholder="Detroit"
                  />
                </label>
                <label className="block text-sm font-medium">
                  Region
                  <input
                    className={`${field} mt-1`}
                    value={addressRegion}
                    onChange={(event) => setAddressRegion(event.target.value)}
                    placeholder="MI"
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
                    placeholder="48201"
                  />
                </label>
                <label className="block text-sm font-medium">
                  Country
                  <input
                    className={`${field} mt-1`}
                    value={addressCountry}
                    onChange={(event) => setAddressCountry(event.target.value)}
                    placeholder="US"
                    required={needsPlace}
                  />
                  <span className="mt-1 block text-xs font-normal text-ink-soft">
                    Required for an office. A two-letter code such as US is uppercased.
                  </span>
                </label>
              </div>
            </div>
          ) : null}
          {needsRemote ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Applicant location type
                <select
                  className={`${field} mt-1`}
                  value={applicantLocationType}
                  onChange={(event) => setApplicantLocationType(event.target.value)}
                >
                  {APPLICANT_LOCATION_TYPES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium">
                Where applicants may be
                <input
                  className={`${field} mt-1`}
                  value={applicantLocationName}
                  onChange={(event) => setApplicantLocationName(event.target.value)}
                  placeholder={applicantLocationType === "Country" ? "USA" : "Michigan, USA"}
                />
                {remoteHint ? <span className="mt-1 block text-xs font-normal text-ink-soft">{remoteHint}</span> : null}
              </label>
            </div>
          ) : null}
        </fieldset>
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium">Base salary</legend>
          <p className="text-xs text-ink-soft">
            Optional. Leave this blank when the page does not show pay. The minimum alone is a single salary. A minimum
            and a maximum are a range.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Minimum
              <input
                className={`${field} mt-1 font-mono text-[13px]`}
                value={salaryMin}
                onChange={(event) => setSalaryMin(event.target.value)}
                placeholder="40"
                inputMode="decimal"
              />
            </label>
            <label className="block text-sm font-medium">
              Maximum
              <input
                className={`${field} mt-1 font-mono text-[13px]`}
                value={salaryMax}
                onChange={(event) => setSalaryMax(event.target.value)}
                placeholder="50"
                inputMode="decimal"
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Currency
              <input
                className={`${field} mt-1 font-mono text-[13px] uppercase`}
                value={salaryCurrency}
                onChange={(event) => setSalaryCurrency(event.target.value)}
                placeholder="USD"
                maxLength={3}
                autoCapitalize="characters"
              />
            </label>
            <label className="block text-sm font-medium">
              Pay period
              <select
                className={`${field} mt-1`}
                value={salaryUnit}
                onChange={(event) => setSalaryUnit(event.target.value)}
              >
                <option value="">Not stated — left out of the script</option>
                {SALARY_UNITS.map((item) => (
                  <option key={item} value={item}>
                    {unitLabel[item]}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {salaryHint ? <p className="text-xs text-ink-soft">{salaryHint}</p> : null}
        </fieldset>
        <label className="block text-sm font-medium">
          Direct apply
          <select className={`${field} mt-1`} value={directApply} onChange={(event) => setDirectApply(event.target.value)}>
            <option value="">Not stated — left out of the script</option>
            <option value="true">Yes — the application is completed on this page</option>
            <option value="false">No — the applicant is sent somewhere else</option>
          </select>
          <span className="mt-1 block text-xs font-normal text-ink-soft">
            Yes means one short application on this page, or instructions that contact the employer directly. A second
            login is not direct apply.
          </span>
        </label>
      </div>
      <CopyBlock
        label="JobPosting JSON-LD"
        value={output}
        empty="Add the job title, a description that is not the title, the date posted, the hiring organization, and a worksite country or a remote applicant location."
      />
      <ToolNextLinks className="mt-4 text-sm" />
    </form>
  );
}
