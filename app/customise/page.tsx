"use client";

import { useEffect, useState } from "react";

export default function CustomisePage() {
  const [theme, setTheme] = useState("light");
  const [clockFormat, setClockFormat] = useState("24");
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("time_mr_theme");
    const savedFormat = localStorage.getItem("time_mr_clock_format");

    if (savedTheme) setTheme(savedTheme);
    if (savedFormat) setClockFormat(savedFormat);
  }, []);

  function saveSettings() {
    localStorage.setItem("time_mr_theme", theme);
    localStorage.setItem("time_mr_clock_format", clockFormat);

    setSavedMessage("Settings saved successfully.");

    setTimeout(() => {
      setSavedMessage("");
    }, 2500);
  }

  return (
    <main className="page-shell px-4 py-8">
      <section className="container-modern">
        <div className="card-modern mx-auto max-w-6xl overflow-hidden">
          <div className="grid gap-8 bg-[#361B10] px-6 py-10 text-[#EBE4CD] md:grid-cols-[1.25fr_0.75fr] md:px-10 md:py-14">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] opacity-75">
                TIME.MR Preferences
              </p>

              <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
                Customise
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 opacity-80 md:text-xl md:leading-8">
                Change your TIME.MR preferences. These settings are saved in
                your browser and used by other TIME.MR pages.
              </p>
            </div>

            <div className="rounded-[32px] border border-[#EBE4CD]/20 bg-[#EBE4CD]/10 p-6 backdrop-blur">
              <p className="text-sm font-black uppercase tracking-[0.25em] opacity-70">
                Current setup
              </p>

              <h2 className="mt-4 text-4xl font-black">
                {clockFormat === "24" ? "24-hour" : "12-hour"}
              </h2>

              <p className="mt-3 text-sm font-bold opacity-75">
                Theme: {theme === "dark" ? "Dark" : "Light"}
              </p>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <section className="rounded-[32px] border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#7A604E]">
                  Settings
                </p>

                <h2 className="mt-2 text-3xl font-black text-[#361B10]">
                  Display preferences
                </h2>

                <label className="mt-6 block text-lg font-black text-[#361B10]">
                  Theme
                  <select
                    value={theme}
                    onChange={(event) => setTheme(event.target.value)}
                    className="input-modern mt-3 text-lg font-bold"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </label>

                <label className="mt-6 block text-lg font-black text-[#361B10]">
                  Clock format
                  <select
                    value={clockFormat}
                    onChange={(event) => setClockFormat(event.target.value)}
                    className="input-modern mt-3 text-lg font-bold"
                  >
                    <option value="24">24-hour</option>
                    <option value="12">12-hour</option>
                  </select>
                </label>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button onClick={saveSettings} className="btn-primary">
                    Save settings
                  </button>

                  <button
                    onClick={() => {
                      setTheme("light");
                      setClockFormat("24");
                    }}
                    className="btn-soft"
                  >
                    Reset
                  </button>
                </div>

                {savedMessage && (
                  <p className="mt-5 rounded-2xl bg-[#361B10]/10 px-4 py-3 font-bold text-[#361B10]">
                    {savedMessage}
                  </p>
                )}
              </section>

              <section className="rounded-[32px] bg-[#361B10] p-6 text-[#EBE4CD] shadow-2xl shadow-[#361B10]/20 md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.25em] opacity-70">
                  Preview
                </p>

                <h2 className="mt-2 text-3xl font-black">
                  TIME.MR look
                </h2>

                <div
                  className={`mt-6 rounded-[28px] border p-6 ${
                    theme === "dark"
                      ? "border-[#EBE4CD]/20 bg-[#1f0f09] text-[#EBE4CD]"
                      : "border-[#EBE4CD]/30 bg-[#EBE4CD] text-[#361B10]"
                  }`}
                >
                  <p className="text-sm font-black uppercase tracking-[0.25em] opacity-70">
                    Sample clock
                  </p>

                  <p className="mt-4 text-5xl font-black md:text-6xl">
                    {clockFormat === "24" ? "21:45:08" : "09:45:08 PM"}
                  </p>

                  <p className="mt-3 font-bold opacity-75">
                    Format: {clockFormat === "24" ? "24-hour" : "12-hour"}
                  </p>
                </div>

                <p className="mt-5 leading-7 opacity-80">
                  Your selected clock format is used on the homepage and other
                  clock-related pages that read the saved browser preference.
                </p>
              </section>
            </div>

            <section className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5">
                <h3 className="text-xl font-black text-[#361B10]">
                  Browser storage
                </h3>

                <p className="mt-2 text-[#7A604E]">
                  Preferences are saved locally in your browser.
                </p>
              </div>

              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5">
                <h3 className="text-xl font-black text-[#361B10]">
                  Clock format
                </h3>

                <p className="mt-2 text-[#7A604E]">
                  Choose between 24-hour and 12-hour time display.
                </p>
              </div>

              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5">
                <h3 className="text-xl font-black text-[#361B10]">
                  Theme ready
                </h3>

                <p className="mt-2 text-[#7A604E]">
                  Theme preference is saved now and can be connected globally.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}