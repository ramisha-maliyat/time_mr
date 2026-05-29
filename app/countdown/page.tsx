"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CountdownPage() {
  const [target, setTarget] = useState("");
  const [remaining, setRemaining] = useState("Choose a date and time");

  useEffect(() => {
    const interval = setInterval(() => {
      if (!target) return;

      const targetTime = new Date(target).getTime();
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setRemaining("Countdown finished");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-center text-[#2b2b2b]">


      <h1 className="mt-20 text-5xl font-black">Countdown</h1>

      <input
        type="datetime-local"
        value={target}
        onChange={(event) => setTarget(event.target.value)}
        className="mt-10 border px-5 py-4 text-xl"
      />

      <div className="mt-10 text-5xl font-black">{remaining}</div>
    </main>
  );
}