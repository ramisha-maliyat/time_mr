"use client";

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

    if (!unixInput.trim() || Number.isNaN(value)) {
      return "Invalid Unix timestamp";
    }

    return new Date(value * 1000).toString();
  }, [unixInput]);

  const unixToUTC = useMemo(() => {
    const value = Number(unixInput);

    if (!unixInput.trim() || Number.isNaN(value)) {
      return "Invalid UTC date";
    }

    return new Date(value * 1000).toUTCString();
  }, [unixInput]);

  const dateToUnix = useMemo(() => {
    const value = new Date(dateInput).getTime();

    if (Number.isNaN(value)) {
      return "Invalid date";
    }

    return Math.floor(value / 1000);
  }, [dateInput]);

  function copyText(value: string | number) {
    navigator.clipboard.writeText(String(value));
    alert("Copied!");
  }

  function setNow() {
    const now = new Date();

    setUnixInput(String(Math.floor(now.getTime() / 1000)));
    setDateInput(now.toISOString().slice(0, 16));
  }

  return (
    <main className="page-shell px-4 py-8">
      <section className="container-modern">
        <div className="card-modern mx-auto max-w-6xl overflow-hidden">
          <div className="bg-[#361B10] px-6 py-10 text-[#EBE4CD] md:px-10 md:py-14">
            <p className="text-sm font-black uppercase tracking-[0.3em] opacity-75">
              TIME.MR Developer Tool
            </p>

            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              Unix time converter
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 opacity-80 md:text-xl md:leading-8">
              Convert Unix timestamp to readable date, and readable date to Unix
              timestamp. Useful for APIs, databases, logs, and debugging.
            </p>

            <button
              onClick={setNow}
              className="mt-8 rounded-full bg-[#EBE4CD] px-6 py-3 font-black text-[#361B10] transition hover:-translate-y-0.5 hover:opacity-90"
            >
              Use current time
            </button>
          </div>

          <div className="p-6 md:p-10">
            <div className="grid gap-6 lg:grid-cols-2">
              <section className="rounded-[32px] border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#7A604E]">
                  Converter 1
                </p>

                <h2 className="mt-2 text-3xl font-black text-[#361B10]">
                  Unix to date
                </h2>

                <label className="mt-6 block text-lg font-black text-[#361B10]">
                  Unix timestamp
                  <input
                    value={unixInput}
                    onChange={(event) => setUnixInput(event.target.value)}
                    className="input-modern mt-3 text-xl font-bold"
                    placeholder="Example: 1772352000"
                  />
                </label>

                <div className="mt-6 rounded-3xl bg-[#361B10] p-5 text-[#EBE4CD]">
                  <p className="text-sm font-black uppercase tracking-[0.22em] opacity-70">
                    Local date
                  </p>

                  <p className="mt-3 break-words text-xl font-black leading-8">
                    {unixToDate}
                  </p>

                  <button
                    onClick={() => copyText(unixToDate)}
                    className="mt-5 rounded-full bg-[#EBE4CD] px-5 py-2 font-black text-[#361B10]"
                  >
                    Copy local date
                  </button>
                </div>

                <div className="mt-4 rounded-3xl border border-[#361B10]/10 bg-[#EBE4CD] p-5">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7A604E]">
                    UTC date
                  </p>

                  <p className="mt-3 break-words text-xl font-black leading-8 text-[#361B10]">
                    {unixToUTC}
                  </p>

                  <button
                    onClick={() => copyText(unixToUTC)}
                    className="btn-soft mt-5"
                  >
                    Copy UTC date
                  </button>
                </div>
              </section>

              <section className="rounded-[32px] border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#7A604E]">
                  Converter 2
                </p>

                <h2 className="mt-2 text-3xl font-black text-[#361B10]">
                  Date to Unix
                </h2>

                <label className="mt-6 block text-lg font-black text-[#361B10]">
                  Date and time
                  <input
                    type="datetime-local"
                    value={dateInput}
                    onChange={(event) => setDateInput(event.target.value)}
                    className="input-modern mt-3 text-xl font-bold"
                  />
                </label>

                <div className="mt-6 rounded-3xl bg-[#361B10] p-5 text-[#EBE4CD]">
                  <p className="text-sm font-black uppercase tracking-[0.22em] opacity-70">
                    Unix timestamp
                  </p>

                  <p className="mt-3 break-words text-5xl font-black leading-none md:text-6xl">
                    {dateToUnix}
                  </p>

                  <button
                    onClick={() => copyText(dateToUnix)}
                    className="mt-5 rounded-full bg-[#EBE4CD] px-5 py-2 font-black text-[#361B10]"
                  >
                    Copy timestamp
                  </button>
                </div>

                <div className="mt-4 rounded-3xl border border-[#361B10]/10 bg-[#EBE4CD] p-5">
                  <h3 className="text-xl font-black text-[#361B10]">
                    What is Unix time?
                  </h3>

                  <p className="mt-2 leading-7 text-[#7A604E]">
                    Unix time counts the number of seconds since 1 January 1970
                    at 00:00:00 UTC. It is commonly used in programming,
                    servers, databases, and APIs.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}