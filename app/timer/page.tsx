"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

  function setCustomTimer() {
    const totalSeconds = inputMinutes * 60 + inputSeconds;

    if (totalSeconds <= 0) {
      alert("Please enter a valid timer duration.");
      return;
    }

    setRunning(false);
    setSeconds(totalSeconds);
  }

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-[#2b2b2b]">

      <section className="mx-auto mt-20 max-w-4xl text-center">
        <h1 className="text-5xl font-black">Timer</h1>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
          <label className="text-left font-black">
            Minutes
            <input
              type="number"
              min="0"
              value={inputMinutes}
              disabled={running}
              onChange={(event) => setInputMinutes(Number(event.target.value))}
              className="mt-2 block w-40 border bg-gray-100 px-4 py-3 text-xl outline-none focus:border-black"
            />
          </label>

          <label className="text-left font-black">
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
              className="mt-2 block w-40 border bg-gray-100 px-4 py-3 text-xl outline-none focus:border-black"
            />
          </label>

          <button
            onClick={setCustomTimer}
            disabled={running}
            className="mt-6 bg-gray-200 px-8 py-4 font-black hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 md:mt-8"
          >
            Set timer
          </button>
        </div>

        <div className="mt-10 text-8xl font-black md:text-[150px]">
          {String(minutes).padStart(2, "0")}:
          {String(remainingSeconds).padStart(2, "0")}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setRunning(true)}
            disabled={running || seconds <= 0}
            className="bg-black px-8 py-4 font-black text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Start
          </button>

          <button
            onClick={() => setRunning(false)}
            className="bg-gray-200 px-8 py-4 font-black hover:bg-gray-300"
          >
            Pause
          </button>

          <button
            onClick={() => {
              setRunning(false);
              setSeconds(inputMinutes * 60 + inputSeconds);
            }}
            className="bg-gray-200 px-8 py-4 font-black hover:bg-gray-300"
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
            className="bg-gray-200 px-8 py-4 font-black hover:bg-gray-300"
          >
            Clear
          </button>
        </div>
      </section>
    </main>
  );
}