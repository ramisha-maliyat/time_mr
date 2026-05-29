"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function UnixPage() {
  const [unixTime, setUnixTime] = useState(0);

  useEffect(() => {
    const update = () => {
      setUnixTime(Math.floor(Date.now() / 1000));
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-[#2b2b2b]">
      <Link href="/" className="font-bold underline">
        ← Back home
      </Link>

      <section className="mt-20 text-center">
        <h1 className="text-5xl font-black">Unix Clock</h1>

        <div className="mt-10 text-7xl font-black">
          {unixTime}
        </div>

        <p className="mt-4 text-gray-600">
          Seconds since January 1, 1970 UTC
        </p>
      </section>
    </main>
  );
}