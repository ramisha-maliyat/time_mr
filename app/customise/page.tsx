"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CustomisePage() {
  const [theme, setTheme] = useState("light");
  const [clockFormat, setClockFormat] = useState("24");

  useEffect(() => {
    const savedTheme = localStorage.getItem("time_mr_theme");
    const savedFormat = localStorage.getItem("time_mr_clock_format");

    if (savedTheme) setTheme(savedTheme);
    if (savedFormat) setClockFormat(savedFormat);
  }, []);

  function saveSettings() {
    localStorage.setItem("time_mr_theme", theme);
    localStorage.setItem("time_mr_clock_format", clockFormat);
    alert("Settings saved");
  }

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-[#2b2b2b] md:px-12">
 

      <section className="mx-auto mt-12 max-w-4xl">
        <h1 className="text-5xl font-black">Customise</h1>

        <p className="mt-4 text-xl text-gray-600">
          Change your TIME.MR preferences. These settings are saved in your
          browser.
        </p>

        <div className="mt-10 space-y-6 bg-gray-100 p-6">
          <label className="block text-xl font-black">
            Theme
            <select
              value={theme}
              onChange={(event) => setTheme(event.target.value)}
              className="mt-2 block w-full border bg-white px-4 py-3 font-medium"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>

          <label className="block text-xl font-black">
            Clock format
            <select
              value={clockFormat}
              onChange={(event) => setClockFormat(event.target.value)}
              className="mt-2 block w-full border bg-white px-4 py-3 font-medium"
            >
              <option value="24">24-hour</option>
              <option value="12">12-hour</option>
            </select>
          </label>

          <button
            onClick={saveSettings}
            className="bg-black px-8 py-4 font-black text-white"
          >
            Save settings
          </button>
        </div>
      </section>
    </main>
  );
}