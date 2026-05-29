import Link from "next/link";
import { menuItems } from "@/data/menuItems";

export default function Footer() {
  return (
    <footer className="bg-[#2d2d2d] px-6 py-14 text-white md:px-12">
      <h2 className="text-3xl font-black">
        TIME.MR - exact time for any time zone
      </h2>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="hover:underline"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}