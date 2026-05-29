"use client";

import { useMemo, useState } from "react";
import { newsItems } from "@/data/timeZoneNews";

export default function TimeZoneNewsPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const years = useMemo(() => {
    const uniqueYears = Array.from(
      new Set(newsItems.map((item) => item.date.slice(0, 4)))
    );

    return ["All", ...uniqueYears];
  }, []);

  const filteredNews = newsItems.filter((item) => {
    const search = searchText.toLowerCase();

    const matchesSearch =
      item.title.toLowerCase().includes(search) ||
      item.summary.toLowerCase().includes(search) ||
      item.date.includes(search);

    const matchesYear =
      selectedYear === "All" || item.date.startsWith(selectedYear);

    return matchesSearch && matchesYear;
  });

  const featuredNews = filteredNews[0] || newsItems[0];

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-[#2b2b2b] md:px-16">
      <section className="max-w-5xl">
        <h1 className="text-5xl font-black">Time zone news</h1>

        <article className="mt-10 max-w-3xl">
          <p className="text-sm font-bold text-gray-500">Featured update</p>

          <h2 className="mt-2 text-3xl font-black">
            {featuredNews.title}
          </h2>

          <p className="mt-2 text-lg text-gray-500">
            {featuredNews.date}
          </p>

          <p className="mt-5 text-xl leading-8 text-gray-700">
            {featuredNews.summary}
          </p>

          <button
            onClick={() => setOpenIndex(0)}
            className="mt-5 font-black underline hover:text-[#c83261]"
          >
            Read more
          </button>
        </article>

        <section className="mt-12 max-w-4xl bg-gray-100 p-5">
          <h2 className="text-2xl font-black">More time zone news</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-[1fr_180px]">
            <input
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
                setOpenIndex(null);
              }}
              placeholder="Search news, country, year..."
              className="w-full border bg-white px-4 py-3 outline-none focus:border-black"
            />

            <select
              value={selectedYear}
              onChange={(event) => {
                setSelectedYear(event.target.value);
                setOpenIndex(null);
              }}
              className="border bg-white px-4 py-3"
            >
              {years.map((year) => (
                <option key={year}>{year}</option>
              ))}
            </select>
          </div>
        </section>

        <section className="mt-8 max-w-5xl">
          {filteredNews.length === 0 && (
            <p className="text-xl text-gray-500">No news found.</p>
          )}

          <div className="space-y-2">
            {filteredNews.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <article
                  key={`${item.date}-${item.title}`}
                  className="border-b border-gray-200 py-3"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="grid w-full grid-cols-1 gap-1 text-left hover:text-[#c83261] md:grid-cols-[110px_1fr]"
                  >
                    <span className="font-bold text-gray-500">
                      {item.date}
                    </span>

                    <span className="text-lg font-bold">
                      {item.title}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-3 max-w-3xl border-l-4 border-[#c83261] bg-gray-100 p-5">
                      <p className="text-sm font-bold text-gray-500">
                        {item.date}
                      </p>

                      <h3 className="mt-1 text-2xl font-black">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-gray-700">
                        {item.summary}
                      </p>

                      <p className="mt-4 text-sm text-gray-500">
                        This is a TIME.MR project news item. Later, this section
                        can be connected to a real news database or CMS.
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}