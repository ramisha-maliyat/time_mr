"use client";

import { useEffect, useState } from "react";

export default function UTCPage() {
  const [utcTime, setUtcTime] = useState("");
  const [utcClock, setUtcClock] = useState("");
  const [utcDate, setUtcDate] = useState("");
  const [isoString, setIsoString] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();

      setUtcTime(now.toUTCString());

      setUtcClock(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "UTC",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now)
      );

      setUtcDate(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "UTC",
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        }).format(now)
      );

      setIsoString(now.toISOString());
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  function copyUTC() {
    navigator.clipboard.writeText(utcTime);
    alert("UTC time copied!");
  }

  function copyISO() {
    navigator.clipboard.writeText(isoString);
    alert("ISO time copied!");
  }

  return (
    <main className="page-shell px-4 py-8">
      <section className="container-modern">
        <div className="card-modern mx-auto max-w-5xl overflow-hidden text-center">
          <div className="bg-[#361B10] px-6 py-10 text-[#EBE4CD] md:px-10 md:py-14">
            <p className="text-sm font-black uppercase tracking-[0.3em] opacity-75">
              TIME.MR Standard Time
            </p>

            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              UTC Time
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 opacity-80 md:text-xl">
              Coordinated Universal Time is the global time standard used for
              servers, aviation, logs, APIs, and timezone conversion.
            </p>
          </div>

          <div className="p-6 md:p-10">
            <div className="rounded-[36px] bg-[#361B10] p-6 text-[#EBE4CD] shadow-2xl shadow-[#361B10]/20 md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.3em] opacity-70">
                Current UTC clock
              </p>

              <div className="mt-5 break-words text-[64px] font-black leading-none tracking-tight sm:text-[100px] md:text-[150px]">
                {utcClock || "--:--:--"}
              </div>

              <p className="mt-6 text-xl font-bold opacity-85 md:text-3xl">
                {utcDate || "Loading UTC date..."}
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6 text-left">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7A604E]">
                  UTC string
                </p>

                <h2 className="mt-3 break-words text-2xl font-black text-[#361B10]">
                  {utcTime || "Loading..."}
                </h2>

                <button onClick={copyUTC} className="btn-soft mt-5">
                  Copy UTC
                </button>
              </div>

              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6 text-left">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7A604E]">
                  ISO format
                </p>

                <h2 className="mt-3 break-words text-2xl font-black text-[#361B10]">
                  {isoString || "Loading..."}
                </h2>

                <button onClick={copyISO} className="btn-soft mt-5">
                  Copy ISO
                </button>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6 text-left">
              <h2 className="text-2xl font-black text-[#361B10]">
                Why UTC matters
              </h2>

              <p className="mt-3 max-w-4xl text-lg leading-8 text-[#7A604E]">
                UTC does not depend on your local timezone. It is useful when
                storing timestamps, comparing time across countries, debugging
                server logs, and converting between world time zones.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}