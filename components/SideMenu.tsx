"use client";

import Link from "next/link";
import { menuItems } from "@/data/menuItems";

type SideMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function SideMenu({ open, onClose }: SideMenuProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40">
      <aside className="ml-auto h-full w-full max-w-xl overflow-y-auto bg-[#2d2d2d] p-8 text-white shadow-2xl">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-4xl font-black tracking-tight">TIME.MR</h2>

          <button
            onClick={onClose}
            className="text-4xl font-black text-white hover:text-gray-300"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="text-lg font-medium hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}