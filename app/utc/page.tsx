"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function UTCPage() {
  const [utcTime, setUtcTime] = useState("");

  useEffect(() => {
    const update = () => {
      setUtcTime(new Date().toUTCString());
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-[#2b2b2b]">


      <section className="mt-20 text-center">
        <h1 className="text-5xl font-black">UTC Time</h1>

        <div className="mt-10 text-4xl font-black md:text-6xl">
          {utcTime}
        </div>
      </section>
    </main>
  );
}