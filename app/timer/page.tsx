"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function TimerPage() {
  const [seconds, setSeconds] = useState(300);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((value) => value - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running, seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-[#2b2b2b]">
      <Link href="/" className="font-bold underline">
        ← Back home
      </Link>

      <section className="mt-20 text-center">
        <h1 className="text-5xl font-black">Timer</h1>

        <div className="mt-10 text-8xl font-black">
          {String(minutes).padStart(2, "0")}:
          {String(remainingSeconds).padStart(2, "0")}
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() => setRunning(true)}
            className="bg-black px-8 py-4 font-black text-white"
          >
            Start
          </button>

          <button
            onClick={() => setRunning(false)}
            className="bg-gray-200 px-8 py-4 font-black"
          >
            Pause
          </button>

          <button
            onClick={() => {
              setRunning(false);
              setSeconds(300);
            }}
            className="bg-gray-200 px-8 py-4 font-black"
          >
            Reset
          </button>
        </div>
      </section>
    </main>
  );
}