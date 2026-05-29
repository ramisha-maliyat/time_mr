"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ClockPage() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString("en-GB", {
          hour12: false,
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
  }, []);

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-center text-[#2b2b2b]">
      <Link href="/" className="font-bold underline">
        ← Back home
      </Link>

      <h1 className="mt-20 text-5xl font-black">Clock</h1>

      <div className="mt-10 text-8xl font-black md:text-[160px]">
        {time}
      </div>

      <p className="mt-6 text-3xl">{date}</p>
    </main>
  );
}