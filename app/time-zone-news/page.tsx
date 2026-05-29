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
    <main className="page-shell px-4 py-8">
      <section className="container-modern">
        <div className="card-modern overflow-hidden">
          <div className="grid gap-8 bg-[#361B10] px-6 py-10 text-[#EBE4CD] md:grid-cols-[1.3fr_0.7fr] md:px-10 md:py-14">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] opacity-75">
                TIME.MR Updates
              </p>

              <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
                Time zone news
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 opacity-80 md:text-xl md:leading-8">
                Follow timezone changes, daylight saving updates, UTC offset
                changes, and global clock announcements.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-[#EBE4CD]/15 px-4 py-2 text-sm font-bold">
                  Searchable
                </span>

                <span className="rounded-full bg-[#EBE4CD]/15 px-4 py-2 text-sm font-bold">
                  Year filter
                </span>

                <span className="rounded-full bg-[#EBE4CD]/15 px-4 py-2 text-sm font-bold">
                  Expandable news
                </span>
              </div>
            </div>

            <div className="rounded-[32px] border border-[#EBE4CD]/20 bg-[#EBE4CD]/10 p-6 backdrop-blur">
              <p className="text-sm font-black uppercase tracking-[0.25em] opacity-70">
                Total news
              </p>

              <h2 className="mt-4 text-6xl font-black">
                {newsItems.length}
              </h2>

              <p className="mt-3 text-sm font-bold opacity-75">
                Timezone and daylight saving updates in your TIME.MR archive.
              </p>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <article className="rounded-[32px] bg-[#361B10] p-6 text-[#EBE4CD] shadow-2xl shadow-[#361B10]/20 md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.3em] opacity-70">
                Featured update
              </p>

              <h2 className="mt-4 text-2xl font-black leading-tight md:text-4xl">
                {featuredNews.title}
              </h2>

              <p className="mt-3 text-lg font-bold opacity-75">
                {featuredNews.date}
              </p>

              <p className="mt-5 max-w-4xl text-base leading-7 opacity-85 md:text-xl md:leading-8">
                {featuredNews.summary}
              </p>

              <button
                onClick={() => setOpenIndex(0)}
                className="mt-6 rounded-full bg-[#EBE4CD] px-6 py-3 font-black text-[#361B10] transition hover:-translate-y-0.5 hover:opacity-90"
              >
                Read more
              </button>
            </article>

            <section className="mt-8 rounded-[32px] border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5 md:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-[#7A604E]">
                    Archive
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-[#361B10] md:text-3xl">
                    More time zone news
                  </h2>
                </div>

                <p className="text-sm font-bold text-[#7A604E]">
                  Showing {filteredNews.length} of {newsItems.length}
                </p>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-[1fr_180px]">
                <input
                  value={searchText}
                  onChange={(event) => {
                    setSearchText(event.target.value);
                    setOpenIndex(null);
                  }}
                  placeholder="Search news, country, year..."
                  className="input-modern"
                />

                <select
                  value={selectedYear}
                  onChange={(event) => {
                    setSelectedYear(event.target.value);
                    setOpenIndex(null);
                  }}
                  className="input-modern"
                >
                  {years.map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </select>
              </div>
            </section>

            <section className="mt-8">
              {filteredNews.length === 0 && (
                <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-8 text-center">
                  <p className="text-xl font-black text-[#361B10]">
                    No news found.
                  </p>

                  <p className="mt-2 text-[#7A604E]">
                    Try a different keyword or choose another year.
                  </p>
                </div>
              )}

              <div className="space-y-4">
                {filteredNews.map((item, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <article
                      key={`${item.date}-${item.title}`}
                      className="rounded-[28px] border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#361B10]/10 md:p-6"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="grid w-full grid-cols-1 gap-3 text-left md:grid-cols-[130px_1fr_auto] md:items-center"
                      >
                        <span className="rounded-full bg-[#361B10]/10 px-4 py-2 text-center text-sm font-black text-[#361B10]">
                          {item.date}
                        </span>

                        <span className="text-xl font-black text-[#361B10] md:text-2xl">
                          {item.title}
                        </span>

                        <span className="w-fit rounded-full bg-[#361B10] px-4 py-2 text-sm font-black text-[#EBE4CD]">
                          {isOpen ? "Hide" : "Read"}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="mt-5 rounded-3xl border border-[#361B10]/10 bg-[#EBE4CD] p-5">
                          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7A604E]">
                            {item.date}
                          </p>

                          <h3 className="mt-2 text-2xl font-black text-[#361B10]">
                            {item.title}
                          </h3>

                          <p className="mt-3 max-w-4xl text-lg leading-8 text-[#7A604E]">
                            {item.summary}
                          </p>

                          <p className="mt-4 text-sm font-bold text-[#7A604E]">
                            This is a TIME.MR project news item. Later, this
                            section can be connected to a real news database,
                            CMS, or admin panel.
                          </p>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}