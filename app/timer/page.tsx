"use client";

import { useEffect, useMemo, useState } from "react";

export default function TimerPage() {
  const [inputMinutes, setInputMinutes] = useState(5);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [seconds, setSeconds] = useState(300);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((value) => value - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running, seconds]);

  useEffect(() => {
    if (seconds === 0 && running) {
      setRunning(false);
      alert("Timer finished!");
    }
  }, [seconds, running]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const totalSetSeconds = inputMinutes * 60 + inputSeconds;

  const progress = useMemo(() => {
    if (totalSetSeconds <= 0) return 0;

    const percentage = ((totalSetSeconds - seconds) / totalSetSeconds) * 100;

    if (percentage < 0) return 0;
    if (percentage > 100) return 100;

    return percentage;
  }, [seconds, totalSetSeconds]);

  function setCustomTimer() {
    const totalSeconds = inputMinutes * 60 + inputSeconds;

    if (totalSeconds <= 0) {
      alert("Please enter a valid timer duration.");
      return;
    }

    setRunning(false);
    setSeconds(totalSeconds);
  }

  function handleStart() {
    if (seconds <= 0) {
      setCustomTimer();
      return;
    }

    setRunning(true);
  }

  return (
    <main className="page-shell px-4 py-8">
      <section className="container-modern">
        <div className="card-modern mx-auto max-w-5xl p-6 text-center md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#7A604E]">
            TIME.MR Tool
          </p>

          <h1 className="mt-4 text-4xl font-black text-[#361B10] md:text-6xl">
            Timer
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-[#7A604E] md:text-lg">
            Set your own timer, start, pause, reset, or clear it anytime.
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <label className="text-left font-black text-[#361B10]">
              Minutes
              <input
                type="number"
                min="0"
                value={inputMinutes}
                disabled={running}
                onChange={(event) =>
                  setInputMinutes(Math.max(0, Number(event.target.value)))
                }
                className="input-modern mt-2 text-xl font-bold"
              />
            </label>

            <label className="text-left font-black text-[#361B10]">
              Seconds
              <input
                type="number"
                min="0"
                max="59"
                value={inputSeconds}
                disabled={running}
                onChange={(event) => {
                  const value = Number(event.target.value);

                  if (value > 59) {
                    setInputSeconds(59);
                  } else if (value < 0) {
                    setInputSeconds(0);
                  } else {
                    setInputSeconds(value);
                  }
                }}
                className="input-modern mt-2 text-xl font-bold"
              />
            </label>

            <button
              onClick={setCustomTimer}
              disabled={running}
              className="btn-soft disabled:cursor-not-allowed disabled:opacity-50"
            >
              Set timer
            </button>
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-[32px] bg-[#361B10] p-6 text-[#EBE4CD] shadow-2xl shadow-[#361B10]/20 md:p-10">
            <div className="break-words text-[72px] font-black leading-none tracking-tight sm:text-[110px] md:text-[150px]">
              {String(minutes).padStart(2, "0")}:
              {String(remainingSeconds).padStart(2, "0")}
            </div>

            <div className="mt-8 h-3 overflow-hidden rounded-full bg-[#EBE4CD]/20">
              <div
                className="h-full rounded-full bg-[#EBE4CD] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-4 text-sm font-bold opacity-80">
              {running ? "Timer is running" : "Timer is paused"}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleStart}
              disabled={running || seconds <= 0}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Start
            </button>

            <button onClick={() => setRunning(false)} className="btn-soft">
              Pause
            </button>

            <button
              onClick={() => {
                setRunning(false);
                setSeconds(inputMinutes * 60 + inputSeconds);
              }}
              className="btn-soft"
            >
              Reset
            </button>

            <button
              onClick={() => {
                setRunning(false);
                setInputMinutes(5);
                setInputSeconds(0);
                setSeconds(300);
              }}
              className="btn-soft"
            >
              Clear
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}