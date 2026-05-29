"use client";

import { useEffect, useState } from "react";

export default function CountdownPage() {
  const [target, setTarget] = useState("");
  const [remaining, setRemaining] = useState("Choose a date and time");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!target) {
        setRemaining("Choose a date and time");
        setFinished(false);
        return;
      }

      const targetTime = new Date(target).getTime();
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setRemaining("Countdown finished");
        setFinished(true);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      setFinished(false);
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  function clearCountdown() {
    setTarget("");
    setRemaining("Choose a date and time");
    setFinished(false);
  }

  return (
    <main className="page-shell px-4 py-8">
      <section className="container-modern">
        <div className="card-modern mx-auto max-w-5xl overflow-hidden text-center">
          <div className="bg-[#361B10] px-6 py-10 text-[#EBE4CD] md:px-10 md:py-14">
            <p className="text-sm font-black uppercase tracking-[0.3em] opacity-75">
              TIME.MR Tool
            </p>

            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              Countdown
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 opacity-80 md:text-xl">
              Choose a future date and time. TIME.MR will count down the days,
              hours, minutes, and seconds.
            </p>
          </div>

          <div className="p-6 md:p-10">
            <div className="mx-auto max-w-xl rounded-[28px] border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5 text-left md:p-6">
              <label className="block text-lg font-black text-[#361B10]">
                Target date and time
                <input
                  type="datetime-local"
                  value={target}
                  onChange={(event) => setTarget(event.target.value)}
                  className="input-modern mt-3 text-lg font-bold"
                />
              </label>

              <p className="mt-3 text-sm text-[#7A604E]">
                Select any future date and time from your browser timezone.
              </p>
            </div>

            <div
              className={`mx-auto mt-10 max-w-4xl rounded-[32px] p-6 shadow-2xl md:p-10 ${
                finished
                  ? "bg-[#EBE4CD] text-[#361B10] ring-2 ring-[#361B10]"
                  : "bg-[#361B10] text-[#EBE4CD] shadow-[#361B10]/20"
              }`}
            >
              <p className="text-sm font-black uppercase tracking-[0.3em] opacity-70">
                Remaining time
              </p>

              <div className="mt-5 break-words text-4xl font-black leading-tight tracking-tight sm:text-6xl md:text-7xl">
                {remaining}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={clearCountdown}
                className="btn-soft"
              >
                Clear
              </button>

              {target && (
                <button
                  onClick={() => {
                    const targetDate = new Date(target);
                    alert(`Countdown target: ${targetDate.toString()}`);
                  }}
                  className="btn-primary"
                >
                  Show target
                </button>
              )}
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5 text-left">
                <h2 className="text-xl font-black text-[#361B10]">
                  Live update
                </h2>
                <p className="mt-2 text-[#7A604E]">
                  The countdown refreshes every second.
                </p>
              </div>

              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5 text-left">
                <h2 className="text-xl font-black text-[#361B10]">
                  Browser time
                </h2>
                <p className="mt-2 text-[#7A604E]">
                  The selected date uses your device timezone.
                </p>
              </div>

              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5 text-left">
                <h2 className="text-xl font-black text-[#361B10]">
                  TIME.MR
                </h2>

              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}