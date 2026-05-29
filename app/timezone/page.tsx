"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function TimezonePage() {
  const [timezone, setTimezone] = useState("");
  const [locale, setLocale] = useState("");

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    setLocale(navigator.language);
  }, []);

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-[#2b2b2b] md:px-12">
      <Link href="/" className="font-bold underline">
        ← Back home
      </Link>

      <h1 className="mt-20 text-5xl font-black">Your time zone</h1>

      <div className="mt-10 bg-gray-100 p-8">
        <p className="text-xl text-gray-600">Detected timezone</p>
        <h2 className="mt-2 text-4xl font-black">{timezone}</h2>

        <p className="mt-8 text-xl text-gray-600">Browser locale</p>
        <h2 className="mt-2 text-4xl font-black">{locale}</h2>
      </div>
    </main>
  );
}