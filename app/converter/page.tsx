"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { locations } from "@/data/locations";
import { getTimezoneOffsetLabel } from "@/lib/time";

function getDateTimeForDisplay(date: Date, timezone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function getOnlyTime(date: Date, timezone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function getOnlyDate(date: Date, timezone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    weekday: "long",
    hour12: false,
  }).format(date);
}

function getTimezoneHourDifference(fromTimezone: string, toTimezone: string) {
  const now = new Date();

  const fromParts = new Intl.DateTimeFormat("en-US", {
    timeZone: fromTimezone,
    hour: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const toParts = new Intl.DateTimeFormat("en-US", {
    timeZone: toTimezone,
    hour: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const fromHour = Number(fromParts.find((part) => part.type === "hour")?.value);
  const toHour = Number(toParts.find((part) => part.type === "hour")?.value);

  let difference = toHour - fromHour;

  if (difference > 12) difference -= 24;
  if (difference < -12) difference += 24;

  if (difference === 0) return "same time";
  if (difference > 0) return `+${difference}h`;
  return `${difference}h`;
}

export default function ConverterPage() {
  const now = new Date();

  const [fromTimezone, setFromTimezone] = useState("Asia/Dhaka");
  const [toTimezone, setToTimezone] = useState("Europe/Paris");
  const [thirdTimezone, setThirdTimezone] = useState("");
  const [date, setDate] = useState(now.toISOString().slice(0, 10));
  const [time, setTime] = useState("08:00");
  const [eventName, setEventName] = useState("Birthday");
  const [mode, setMode] = useState<"single" | "table">("single");
  const [submitted, setSubmitted] = useState(false);

  const fromLocation = locations.find(
    (location) => location.timezone === fromTimezone
  );

  const toLocation = locations.find(
    (location) => location.timezone === toTimezone
  );

  const thirdLocation = locations.find(
    (location) => location.timezone === thirdTimezone
  );

  const selectedLocations = [fromLocation, toLocation, thirdLocation].filter(
    Boolean
  ) as typeof locations;

  const convertedDate = useMemo(() => {
    return new Date(`${date}T${time}:00`);
  }, [date, time]);

  const tableRows = useMemo(() => {
    return Array.from({ length: 24 }, (_, index) => {
      const rowDate = new Date(`${date}T00:00:00`);
      rowDate.setHours(index);

      return {
        base: rowDate,
        baseTime: getOnlyTime(rowDate, fromTimezone),
        targetTime: getOnlyTime(rowDate, toTimezone),
        baseDay: getOnlyDate(rowDate, fromTimezone),
        targetDay: getOnlyDate(rowDate, toTimezone),
      };
    });
  }, [date, fromTimezone, toTimezone]);

  const fromTime = fromLocation
    ? getOnlyTime(convertedDate, fromLocation.timezone)
    : "";

  const toTime = toLocation
    ? getOnlyTime(convertedDate, toLocation.timezone)
    : "";

  const timeDifference =
    fromLocation && toLocation
      ? getTimezoneHourDifference(fromLocation.timezone, toLocation.timezone)
      : "";

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-[#2b2b2b] md:px-12">


      {!submitted && (
        <section className="mt-12 max-w-4xl">
          <h1 className="text-5xl font-black">Time zone converter</h1>

          <div className="mt-6 grid gap-3 md:grid-cols-[2fr_120px_160px]">
            <label className="font-black">
              Location or time zone
              <select
                value={fromTimezone}
                onChange={(event) => setFromTimezone(event.target.value)}
                className="mt-1 w-full bg-gray-100 px-4 py-4 text-xl font-normal outline-none"
              >
                {locations.map((location) => (
                  <option key={location.city} value={location.timezone}>
                    {location.city}, {location.country}
                  </option>
                ))}
              </select>
            </label>

            <label className="font-black">
              Time
              <input
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="mt-1 w-full bg-gray-100 px-4 py-4 text-xl font-normal outline-none"
              />
            </label>

            <label className="font-black">
              Date
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="mt-1 w-full bg-gray-100 px-4 py-4 text-xl font-normal outline-none"
              />
            </label>
          </div>

          <div className="mt-5 max-w-xl">
            <label className="font-black">
              Other locations or time zones
              <select
                value={toTimezone}
                onChange={(event) => setToTimezone(event.target.value)}
                className="mt-1 w-full bg-gray-100 px-4 py-4 text-xl font-normal outline-none"
              >
                {locations.map((location) => (
                  <option key={location.city} value={location.timezone}>
                    {location.city}, {location.country}
                  </option>
                ))}
              </select>
            </label>

            <select
              value={thirdTimezone}
              onChange={(event) => setThirdTimezone(event.target.value)}
              className="mt-2 w-full bg-gray-100 px-4 py-4 text-xl text-gray-600 outline-none"
            >
              <option value="">Location 3 optional</option>
              {locations.map((location) => (
                <option key={location.city} value={location.timezone}>
                  {location.city}, {location.country}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-5 space-y-2 text-xl">
            <label className="block">
              <input
                type="radio"
                checked={mode === "table"}
                onChange={() => setMode("table")}
                className="mr-2"
              />
              Show as table
            </label>

            <label className="block">
              <input
                type="radio"
                checked={mode === "single"}
                onChange={() => setMode("single")}
                className="mr-2"
              />
              Convert only the specified time
            </label>
          </div>

          <label className="mt-5 block max-w-xl font-black">
            Event name optional
            <input
              value={eventName}
              onChange={(event) => setEventName(event.target.value)}
              placeholder="Birthday"
              className="mt-1 w-full bg-gray-100 px-4 py-4 text-xl font-normal outline-none"
            />
          </label>

          <button
            onClick={() => setSubmitted(true)}
            className="mt-6 bg-gray-100 px-6 py-4 font-black hover:bg-gray-200"
          >
            Compare time
          </button>
        </section>
      )}

      {submitted && mode === "single" && (
        <section className="mt-12 max-w-5xl">
          <button
            onClick={() => setSubmitted(false)}
            className="mb-8 font-bold underline"
          >
            ← Edit this event
          </button>

          <h1 className="text-5xl font-black">
            {eventName || "Event"}
          </h1>

          <h2 className="mt-2 text-4xl font-black">
            {time} on {getDateTimeForDisplay(convertedDate, fromTimezone)} in{" "}
            {fromLocation?.city}, {fromLocation?.country}
          </h2>

          <div className="mt-8 flex flex-wrap gap-3">
            {selectedLocations.map((location) => (
              <div key={location.city} className="bg-gray-100 p-5">
                <h3 className="text-3xl font-black">{location.city}</h3>
                <p className="text-4xl font-black">
                  {getOnlyTime(convertedDate, location.timezone)}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  {getTimezoneOffsetLabel(location.timezone, convertedDate)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 inline-block bg-black px-5 py-2 text-3xl font-black text-white">
            {fromLocation?.city} to {toLocation?.city}: {timeDifference}
          </div>

        <div className="mt-8 flex flex-col items-start gap-2 text-xl">
  <button
    onClick={() => {
      setThirdTimezone("America/New_York");
    }}
    className="text-left underline hover:text-[#c83261]"
  >
    Show another time zone
  </button>

  <button
    onClick={() => setSubmitted(false)}
    className="text-left underline hover:text-[#c83261]"
  >
    Edit this event
  </button>

  <button
    onClick={() => {
      setSubmitted(false);
      setFromTimezone("Asia/Dhaka");
      setToTimezone("Europe/Paris");
      setThirdTimezone("");
      setTime("08:00");
      setEventName("");
      setMode("single");
    }}
    className="text-left underline hover:text-[#c83261]"
  >
    Create a new event
  </button>
</div>
        </section>
      )}

      {submitted && mode === "table" && (
  <section className="mt-10 max-w-4xl">
    <button
      onClick={() => setSubmitted(false)}
      className="mb-4 text-sm font-bold underline"
    >
      ← Edit comparison
    </button>

    <h1 className="text-4xl font-black">
      Time in {fromLocation?.city} and {toLocation?.city}
    </h1>

    <ul className="mt-3 list-disc pl-5 text-base leading-7">
      <li>
        When the time is <b>{time}</b> in {fromLocation?.city}, it is{" "}
        <b>{toTime}</b> in {toLocation?.city}.
      </li>
      <li>Time difference is {timeDifference}.</li>
      <li>
        Click edit comparison to change city, date, or time.
      </li>
    </ul>

    <h2 className="mt-8 text-2xl font-black">
      Time difference from {fromLocation?.city}
    </h2>

    <div className="mt-4 w-[360px] space-y-3">
      <div className="grid grid-cols-[60px_1fr_70px] items-center gap-2">
        <span className="text-sm">UTC</span>
        <div className="h-6 bg-black"></div>
        <span className="text-sm">GMT</span>
      </div>

      <div className="grid grid-cols-[60px_1fr_70px] items-center gap-2">
        <span className="text-sm">{toLocation?.city}</span>
        <div className="h-6 bg-black"></div>
        <span className="text-sm">{timeDifference}</span>
      </div>
    </div>

    <div className="mt-10 w-[360px]">
      <div className="grid grid-cols-2 border-b-2 border-black text-center">
        <div className="py-2 text-2xl font-black">
          {fromLocation?.city}
        </div>

        <div className="border-l border-gray-400 py-2 text-2xl font-black">
          {toLocation?.city} ({timeDifference})
        </div>
      </div>

      <div className="grid grid-cols-2 text-center text-sm">
        <div className="border-r border-gray-400">
          {tableRows.map((row, index) => {
            const isSelectedHour = row.baseTime === time;
            const isWorkHour = index >= 12 && index <= 17;

            return (
              <div
                key={`base-${index}`}
                className={`py-1 ${
                  isWorkHour ? "bg-green-100" : ""
                } ${isSelectedHour ? "font-black text-[#c83261]" : ""}`}
              >
                {index === 0 && (
                  <div className="mb-1 text-xs text-gray-500">
                    {row.baseDay}
                  </div>
                )}

                {row.baseTime}
              </div>
            );
          })}
        </div>

        <div>
          {tableRows.map((row, index) => {
            const isSelectedHour = row.baseTime === time;
            const isWorkHour = index >= 12 && index <= 17;

            return (
              <div
                key={`target-${index}`}
                className={`py-1 ${
                  isWorkHour ? "bg-green-100" : ""
                } ${isSelectedHour ? "font-black text-[#c83261]" : ""}`}
              >
                {index === 0 && (
                  <div className="mb-1 text-xs text-gray-500">
                    {row.targetDay}
                  </div>
                )}

                {row.targetTime}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
)}
    </main>
  );
}