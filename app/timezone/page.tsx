"use client";

import { useEffect, useState } from "react";

export default function TimezonePage() {
  const [timezone, setTimezone] = useState("");
  const [locale, setLocale] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [offset, setOffset] = useState("");

  useEffect(() => {
    const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const detectedLocale = navigator.language;

    setTimezone(detectedTimezone);
    setLocale(detectedLocale);

    const update = () => {
      const now = new Date();

      setCurrentTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: detectedTimezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now)
      );

      setCurrentDate(
        new Intl.DateTimeFormat("en-US", {
          timeZone: detectedTimezone,
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        }).format(now)
      );

      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: detectedTimezone,
        timeZoneName: "shortOffset",
      }).formatToParts(now);

      setOffset(
        parts.find((part) => part.type === "timeZoneName")?.value || ""
      );
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="page-shell px-4 py-8">
      <section className="container-modern">
        <div className="card-modern overflow-hidden">
          <div className="bg-[#361B10] px-6 py-10 text-[#EBE4CD] md:px-10 md:py-14">
            <p className="text-sm font-black uppercase tracking-[0.3em] opacity-75">
              TIME.MR
            </p>

            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              Your time zone
            </h1>

            <p className="mt-4 max-w-3xl text-lg opacity-80">
              TIME.MR detects your browser timezone and shows your local time,
              locale, and UTC offset.
            </p>
          </div>

          <div className="p-6 md:p-10">
            <div className="rounded-[32px] bg-[#361B10] p-6 text-[#EBE4CD] shadow-2xl shadow-[#361B10]/20 md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.3em] opacity-70">
                Current local time
              </p>

              <div className="mt-4 break-words text-[64px] font-black leading-none tracking-tight sm:text-[100px] md:text-[140px]">
                {currentTime || "--:--:--"}
              </div>

              <p className="mt-5 text-xl font-bold md:text-3xl">
                {currentDate || "Detecting date..."}
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7A604E]">
                  Detected timezone
                </p>

                <h2 className="mt-3 break-words text-2xl font-black text-[#361B10] md:text-3xl">
                  {timezone || "Detecting..."}
                </h2>
              </div>

              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7A604E]">
                  Browser locale
                </p>

                <h2 className="mt-3 text-2xl font-black text-[#361B10] md:text-3xl">
                  {locale || "Detecting..."}
                </h2>
              </div>

              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7A604E]">
                  UTC offset
                </p>

                <h2 className="mt-3 text-2xl font-black text-[#361B10] md:text-3xl">
                  {offset || "Detecting..."}
                </h2>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6">
              <h2 className="text-2xl font-black text-[#361B10]">
                What this means
              </h2>

              <p className="mt-3 max-w-4xl text-lg leading-8 text-[#7A604E]">
                Your browser reports this timezone automatically. It is used by
                TIME.MR to show accurate local time, convert time between cities,
                and format dates based on your device settings.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}