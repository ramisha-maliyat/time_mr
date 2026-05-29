"use client";

import Link from "next/link";
import { useState } from "react";
import SideMenu from "@/components/SideMenu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between px-6 py-5 md:px-12">
        <Link
          href="/"
          className="bg-[#c83261] px-6 py-4 font-black tracking-[0.35em] text-white"
        >
          TIME.MR
        </Link>

        <button
          onClick={() => setMenuOpen(true)}
          className="text-4xl text-gray-500 hover:text-black"
          aria-label="Open menu"
        >
          ☰
        </button>
      </header>

      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}