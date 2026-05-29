"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { locations } from "@/data/locations";
import { getTimezoneOffsetLabel } from "@/lib/time";

export default function ConverterPage() {
  const now = new Date();

  const [fromTimezone, setFromTimezone] = useState("Asia/Dhaka");
  const [date, setDate] = useState(now.toISOString().slice(0, 10));
  const [time, setTime] = useState("08:00");

  const convertedDate = useMemo(() => {
    return new Date(`${date}T${time}:00`);
  }, [date, time]);

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-[#2b2b2b] md:px-12">
      <Link href="/" className="font-bold underline">
        ← Back home
      </Link>

      <section className="mt-12">
        <h1 className="text-5xl font-black">Time here & there</h1>

        <p className="mt-4 max-w-3xl text-xl text-gray-600">
          Select a location, date, and time. TIME.MR will show what time it is in
          other locations.
        </p>

        <div className="mt-10 grid gap-4 rounded-xl bg-gray-100 p-6 md:grid-cols-3">
          <label className="font-black">
            Location
            <select
              value={fromTimezone}
              onChange={(event) => setFromTimezone(event.target.value)}
              className="mt-2 w-full border bg-white px-4 py-3 font-medium"
            >
              {locations.map((location) => (
                <option key={location.city} value={location.timezone}>
                  {location.city}, {location.country}
                </option>
              ))}
            </select>
          </label>

          <label className="font-black">
            Date
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="mt-2 w-full border bg-white px-4 py-3 font-medium"
            />
          </label>

          <label className="font-black">
            Time
            <input
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              className="mt-2 w-full border bg-white px-4 py-3 font-medium"
            />
          </label>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
          {locations.map((location) => {
            const converted = new Intl.DateTimeFormat("en-GB", {
              timeZone: location.timezone,
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }).format(convertedDate);

            const offset = getTimezoneOffsetLabel(
              location.timezone,
              convertedDate
            );

            const active = location.timezone === fromTimezone;

            return (
              <div
                key={location.city}
                className={`p-5 ${
                  active ? "bg-black text-white" : "bg-gray-100"
                }`}
              >
                <h2 className="text-2xl font-black">{location.city}</h2>
                <p className="text-sm opacity-70">{location.country}</p>
                <p className="mt-4 text-xl font-bold">{converted}</p>
                <p className="mt-2 text-sm opacity-70">{offset}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}