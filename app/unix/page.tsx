"use client";

import { useEffect, useState } from "react";

export default function UnixPage() {
  const [unixTime, setUnixTime] = useState(0);
  const [utcString, setUtcString] = useState("");
  const [localString, setLocalString] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();

      setUnixTime(Math.floor(now.getTime() / 1000));
      setUtcString(now.toUTCString());
      setLocalString(now.toString());
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  function copyUnixTime() {
    navigator.clipboard.writeText(String(unixTime));
    alert("Unix time copied!");
  }

  return (
    <main className="page-shell px-4 py-8">
      <section className="container-modern">
        <div className="card-modern mx-auto max-w-6xl overflow-hidden text-center">
          <div className="bg-[#361B10] px-6 py-10 text-[#EBE4CD] md:px-10 md:py-14">
            <p className="text-sm font-black uppercase tracking-[0.3em] opacity-75">
              TIME.MR Developer Tool
            </p>

            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              Unix Clock
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 opacity-80 md:text-xl">
              Live Unix timestamp showing the number of seconds since January 1,
              1970 UTC.
            </p>
          </div>

          <div className="p-6 md:p-10">
            <div className="rounded-[36px] bg-[#361B10] p-6 text-[#EBE4CD] shadow-2xl shadow-[#361B10]/20 md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.3em] opacity-70">
                Current Unix time
              </p>

              <div className="mt-5 break-words text-[56px] font-black leading-none tracking-tight sm:text-[90px] md:text-[130px]">
                {unixTime}
              </div>

              <button
                onClick={copyUnixTime}
                className="mt-8 rounded-full bg-[#EBE4CD] px-6 py-3 font-black text-[#361B10] transition hover:-translate-y-0.5 hover:opacity-90"
              >
                Copy Unix time
              </button>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6 text-left">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7A604E]">
                  UTC time
                </p>

                <h2 className="mt-3 break-words text-2xl font-black leading-8 text-[#361B10]">
                  {utcString || "Loading..."}
                </h2>
              </div>

              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6 text-left">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7A604E]">
                  Local time
                </p>

                <h2 className="mt-3 break-words text-2xl font-black leading-8 text-[#361B10]">
                  {localString || "Loading..."}
                </h2>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6 text-left">
              <h2 className="text-2xl font-black text-[#361B10]">
                What is Unix time?
              </h2>

              <p className="mt-3 max-w-4xl text-lg leading-8 text-[#7A604E]">
                Unix time is a timestamp format that counts seconds from
                January 1, 1970 at 00:00:00 UTC. It is widely used in
                programming, databases, APIs, server logs, and automation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}