import Link from "next/link";
import { menuItems } from "@/data/menuItems";

export default function Footer() {
  return (
    <footer className="border-t border-[#361B10]/10 bg-[#EBE4CD] px-4 py-12 text-[#361B10] md:px-8 md:py-16">
      <div className="container-modern">
        <div className="rounded-[32px] border border-[#361B10]/10 bg-[#FFF9E8] p-6 shadow-sm md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-[0.18em] md:text-5xl">
                TIME.MR
              </h2>

              <p className="mt-3 text-lg font-bold text-[#7A604E] md:text-2xl">
                exact time for any time zone
              </p>
            </div>

            <p className="max-w-md text-sm font-bold leading-6 text-[#7A604E] md:text-right">
              Built for world clocks, timers, calendars, widgets, Unix time, UTC,
              and time conversion.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-2xl border border-transparent px-4 py-3 font-black text-[#361B10] transition hover:border-[#361B10]/15 hover:bg-[#EBE4CD] hover:text-[#361B10] hover:shadow-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-10 border-t border-[#361B10]/10 pt-6">
            <p className="text-sm font-bold text-[#7A604E]">
              © TIME.RM.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}