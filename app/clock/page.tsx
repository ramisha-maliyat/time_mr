"use client";

import { useEffect, useState } from "react";

export default function ClockPage() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [timezone, setTimezone] = useState("");
  const [format, setFormat] = useState<"24" | "12">("24");

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString("en-GB", {
          hour12: format === "12",
        })
      );

      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      );
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [format]);

  return (
    <main className="page-shell px-4 py-8">
      <section className="container-modern">
        <div className="card-modern mx-auto max-w-6xl overflow-hidden text-center">
          <div className="bg-[#361B10] px-6 py-10 text-[#EBE4CD] md:px-10 md:py-14">
            <p className="text-sm font-black uppercase tracking-[0.3em] opacity-75">
              TIME.MR Live Clock
            </p>

            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              Clock
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 opacity-80 md:text-xl">
              A clean live clock using your device timezone and browser locale.
            </p>
          </div>

          <div className="p-6 md:p-10">
            <div className="rounded-[36px] bg-[#361B10] p-6 text-[#EBE4CD] shadow-2xl shadow-[#361B10]/20 md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.3em] opacity-70">
                Current time
              </p>

              <div className="mt-5 break-words text-[64px] font-black leading-none tracking-tight sm:text-[110px] md:text-[170px]">
                {time || "--:--:--"}
              </div>

              <p className="mt-6 text-xl font-bold opacity-85 md:text-3xl">
                {date || "Loading date..."}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setFormat("24")}
                className={`rounded-full px-6 py-3 font-black transition ${
                  format === "24"
                    ? "bg-[#361B10] text-[#EBE4CD]"
                    : "bg-[#361B10]/10 text-[#361B10] hover:bg-[#361B10]/15"
                }`}
              >
                24-hour
              </button>

              <button
                onClick={() => setFormat("12")}
                className={`rounded-full px-6 py-3 font-black transition ${
                  format === "12"
                    ? "bg-[#361B10] text-[#EBE4CD]"
                    : "bg-[#361B10]/10 text-[#361B10] hover:bg-[#361B10]/15"
                }`}
              >
                12-hour
              </button>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6 text-left">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7A604E]">
                  Timezone
                </p>

                <h2 className="mt-3 break-words text-2xl font-black text-[#361B10]">
                  {timezone || "Detecting..."}
                </h2>
              </div>

              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6 text-left">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7A604E]">
                  Format
                </p>

                <h2 className="mt-3 text-2xl font-black text-[#361B10]">
                  {format === "24" ? "24-hour" : "12-hour"}
                </h2>
              </div>

              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6 text-left">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7A604E]">
                  Update
                </p>

                <h2 className="mt-3 text-2xl font-black text-[#361B10]">
                  Every second
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}