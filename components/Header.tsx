"use client";

import Link from "next/link";
import { useState } from "react";
import SideMenu from "@/components/SideMenu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#361B10]/10 bg-[#EBE4CD]/95 backdrop-blur-xl">
        <div className="container-modern flex items-center justify-between py-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-[#361B10]/15 bg-[#FFF9E8] px-6 py-3 text-sm font-black tracking-[0.24em] text-[#361B10] shadow-sm transition hover:border-[#361B10]/30 hover:bg-[#F7F1DF] hover:shadow-md"
          >
            TIME.MR
          </Link>

          <button
            onClick={() => setMenuOpen(true)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#361B10]/15 bg-[#FFF9E8] text-2xl font-black text-[#361B10] shadow-sm transition hover:border-[#361B10]/30 hover:bg-[#F7F1DF] hover:shadow-md"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </header>

      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}