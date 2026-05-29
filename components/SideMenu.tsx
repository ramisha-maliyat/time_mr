"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "@/data/menuItems";

type SideMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function SideMenu({ open, onClose }: SideMenuProps) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        onClick={onClose}
        aria-label="Close menu overlay"
        className="absolute inset-0 bg-[#361B10]/25 backdrop-blur-sm"
      />

      <aside className="relative ml-auto flex h-full w-full max-w-[420px] flex-col bg-[#EBE4CD] text-[#361B10] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#361B10]/10 px-5 py-5">
          <Link
            href="/"
            onClick={onClose}
            className="text-xl font-black tracking-[0.22em] text-[#361B10]"
          >
            TIME.MR
          </Link>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#361B10]/15 bg-[#FFF9E8] text-2xl font-black text-[#361B10] transition hover:border-[#361B10]/30 hover:bg-[#F7F1DF]"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-6">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-[#7A604E]">
            Navigation
          </p>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  title={item.label}
                  className={`group flex items-center justify-between rounded-2xl border px-4 py-3 text-base font-black text-[#361B10] transition ${
                    isActive
                      ? "border-[#361B10]/25 bg-[#FFF9E8] shadow-sm"
                      : "border-transparent bg-transparent hover:border-[#361B10]/20 hover:bg-[#FFF9E8] hover:shadow-sm"
                  }`}
                >
                  <span className="text-[#361B10]">{item.label}</span>

                  <span className="text-lg text-[#7A604E] transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-[#361B10]/10 bg-[#F7F1DF] px-5 py-4">
          <p className="text-sm font-bold text-[#7A604E]">
            TIME.MR — exact time for any time zone
          </p>
        </div>
      </aside>
    </div>
  );
}