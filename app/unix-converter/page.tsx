"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function UnixConverterPage() {
  const [unixInput, setUnixInput] = useState(
    String(Math.floor(Date.now() / 1000))
  );

  const [dateInput, setDateInput] = useState(
    new Date().toISOString().slice(0, 16)
  );

  const unixToDate = useMemo(() => {
    const value = Number(unixInput);

    if (Number.isNaN(value)) {
      return "Invalid Unix timestamp";
    }

    return new Date(value * 1000).toString();
  }, [unixInput]);

  const dateToUnix = useMemo(() => {
    const value = new Date(dateInput).getTime();

    if (Number.isNaN(value)) {
      return "Invalid date";
    }

    return Math.floor(value / 1000);
  }, [dateInput]);

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-[#2b2b2b] md:px-12">
      <Link href="/" className="font-bold underline">
        ← Back home
      </Link>

      <section className="mx-auto mt-12 max-w-5xl">
        <h1 className="text-5xl font-black">Unix time converter</h1>

        <p className="mt-4 text-xl text-gray-600">
          Convert Unix timestamp to readable date, and readable date to Unix
          timestamp.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="bg-gray-100 p-6">
            <h2 className="text-2xl font-black">Unix to date</h2>

            <input
              value={unixInput}
              onChange={(event) => setUnixInput(event.target.value)}
              className="mt-5 w-full border bg-white px-4 py-3 text-xl"
            />

            <p className="mt-5 text-xl font-bold">{unixToDate}</p>
          </div>

          <div className="bg-gray-100 p-6">
            <h2 className="text-2xl font-black">Date to Unix</h2>

            <input
              type="datetime-local"
              value={dateInput}
              onChange={(event) => setDateInput(event.target.value)}
              className="mt-5 w-full border bg-white px-4 py-3 text-xl"
            />

            <p className="mt-5 text-xl font-bold">{dateToUnix}</p>
          </div>
        </div>
      </section>
    </main>
  );
}