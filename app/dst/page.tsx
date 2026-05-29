"use client";

import { useMemo, useState } from "react";

type DstEvent = {
  id: number;
  month: string;
  day: number;
  region: string;
  category:
    | "Upcoming events"
    | "North America"
    | "Europe"
    | "Australia"
    | "Africa"
    | "South America";
  title: string;
  description: string;
  details: string;
};

const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028];

const baseEvents: DstEvent[] = [
  {
    id: 1,
    month: "February",
    day: 15,
    region: "Morocco and Western Sahara",
    category: "Africa",
    title: "Winter time started",
    description: "The time is set back one hour from 03:00 to 02:00 local time.",
    details:
      "Morocco usually adjusts clocks around Ramadan. Exact dates may vary by year, but this project page shows the event structure and behaviour.",
  },
  {
    id: 2,
    month: "March",
    day: 8,
    region: "United States and Canada",
    category: "North America",
    title: "Daylight saving time starts",
    description:
      "Clocks move forward one hour in most regions that observe daylight saving time.",
    details:
      "Most parts of the United States and Canada move clocks forward in spring. Some places, such as Arizona and parts of Canada, may not observe DST.",
  },
  {
    id: 3,
    month: "March",
    day: 29,
    region: "United Kingdom and Europe",
    category: "Europe",
    title: "Summer time starts",
    description: "Clocks move forward one hour in many European countries.",
    details:
      "Many European countries switch to summer time near the end of March. Local names include British Summer Time and Central European Summer Time.",
  },
  {
    id: 4,
    month: "April",
    day: 5,
    region: "Australia",
    category: "Australia",
    title: "Daylight saving time ends",
    description: "Clocks move back one hour in several Australian states.",
    details:
      "Australian DST is not used everywhere. New South Wales, Victoria, South Australia, Tasmania, and the ACT usually observe it.",
  },
  {
    id: 5,
    month: "September",
    day: 5,
    region: "Easter Island, Chile",
    category: "South America",
    title: "DST starts",
    description: "Clocks move forward one hour in selected Chilean regions.",
    details:
      "Chile and Easter Island may have different transition rules. This project entry demonstrates how TIME.MR can show regional DST changes.",
  },
  {
    id: 6,
    month: "October",
    day: 25,
    region: "United Kingdom and Europe",
    category: "Europe",
    title: "Summer time ends",
    description: "Clocks move back one hour in many European countries.",
    details:
      "At the end of summer time, many European locations return to standard time by moving clocks back one hour.",
  },
  {
    id: 7,
    month: "November",
    day: 1,
    region: "United States and Canada",
    category: "North America",
    title: "Daylight saving time ends",
    description:
      "Clocks move back one hour in most regions that observe daylight saving time.",
    details:
      "In autumn, most observing regions in North America return to standard time. The exact local time is usually around 02:00.",
  },
];

const categories = [
  "Upcoming events",
  "North America",
  "Europe",
  "Australia",
  "Africa",
  "South America",
];

function monthToIndex(month: string) {
  return new Date(`${month} 1, 2026`).getMonth();
}

function makeEventDate(year: number, event: DstEvent) {
  return new Date(year, monthToIndex(event.month), event.day);
}

export default function DSTPage() {
  const currentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState(
    years.includes(currentYear) ? currentYear : 2026
  );
  const [selectedCategory, setSelectedCategory] = useState("Upcoming events");
  const [openEventId, setOpenEventId] = useState<number | null>(null);

  const filteredEvents = useMemo(() => {
    if (selectedCategory === "Upcoming events") {
      return baseEvents;
    }

    return baseEvents.filter((event) => event.category === selectedCategory);
  }, [selectedCategory]);

  const nextEvent = filteredEvents[0];

  return (
    <main className="page-shell px-4 py-8">
      <section className="container-modern">
        <div className="card-modern overflow-hidden">
          <div className="grid gap-8 bg-[#361B10] px-6 py-10 text-[#EBE4CD] md:grid-cols-[1.4fr_0.6fr] md:px-10 md:py-14">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] opacity-75">
                TIME.MR
              </p>

              <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
                Daylight Saving Time {selectedYear}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 opacity-80 md:text-xl md:leading-8">
                Will the time be set backwards or forwards? When? Where? This
                page shows daylight saving time changes in a modern TIME.MR
                format.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-[#EBE4CD]/15 px-4 py-2 text-sm font-bold">
                  Dynamic year filter
                </span>

                <span className="rounded-full bg-[#EBE4CD]/15 px-4 py-2 text-sm font-bold">
                  Region categories
                </span>

                <span className="rounded-full bg-[#EBE4CD]/15 px-4 py-2 text-sm font-bold">
                  Expandable info
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex h-44 w-44 items-center justify-center rounded-full border border-[#EBE4CD]/30 bg-[#EBE4CD]/10 shadow-2xl shadow-black/20 backdrop-blur">
                <div className="relative h-28 w-28 rounded-full border-4 border-[#EBE4CD]">
                  <div className="absolute left-1/2 top-4 h-10 w-1 -translate-x-1/2 rounded bg-[#EBE4CD]" />
                  <div className="absolute left-1/2 top-1/2 h-1 w-9 -translate-y-1/2 rounded bg-[#EBE4CD]" />
                  <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EBE4CD]" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5">
                <h2 className="text-xl font-black text-[#361B10]">
                  What is DST?
                </h2>
                <p className="mt-2 text-[#7A604E]">
                  Some places move clocks forward or backward during the year.
                </p>
              </div>

              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5">
                <h2 className="text-xl font-black text-[#361B10]">
                  Bangladesh
                </h2>
                <p className="mt-2 text-[#7A604E]">
                  Bangladesh does not currently use daylight saving time.
                </p>
              </div>

              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5">
                <h2 className="text-xl font-black text-[#361B10]">
                  TIME.MR
                </h2>
                <p className="mt-2 text-[#7A604E]">
                  This page is interactive and can later connect to live data.
                </p>
              </div>
            </div>

            <section className="mt-8 rounded-[32px] bg-[#361B10] p-6 text-[#EBE4CD] md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.25em] opacity-70">
                Next event
              </p>

              <h2 className="mt-3 text-2xl font-black leading-tight md:text-4xl">
                {nextEvent ? (
                  <>
                    {nextEvent.month} {nextEvent.day}, {selectedYear}:{" "}
                    {nextEvent.title} in {nextEvent.region}
                  </>
                ) : (
                  "No DST events found for this filter."
                )}
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                <label className="block font-black">
                  Jump to region
                  <select
                    value={selectedCategory}
                    onChange={(event) => {
                      setSelectedCategory(event.target.value);
                      setOpenEventId(null);
                    }}
                    className="mt-2 w-full rounded-2xl border border-[#EBE4CD]/20 bg-[#EBE4CD] px-4 py-3 text-[#361B10] outline-none"
                  >
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </label>

                <div className="flex flex-wrap gap-2">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        setSelectedYear(year);
                        setOpenEventId(null);
                      }}
                      className={`rounded-full px-4 py-3 text-sm font-black transition ${
                        year === selectedYear
                          ? "bg-[#EBE4CD] text-[#361B10]"
                          : "bg-[#EBE4CD]/10 text-[#EBE4CD] hover:bg-[#EBE4CD]/20"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-10 space-y-5">
              {filteredEvents.map((event) => {
                const eventDate = makeEventDate(selectedYear, event);
                const weekday = new Intl.DateTimeFormat("en-US", {
                  weekday: "short",
                }).format(eventDate);

                const isOpen = openEventId === event.id;

                return (
                  <article
                    key={`${event.id}-${selectedYear}`}
                    className="rounded-[28px] border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#361B10]/10 md:p-6"
                  >
                    <div className="flex flex-col gap-5 md:flex-row">
                      <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-3xl bg-[#361B10] text-center text-[#EBE4CD]">
                        <span className="text-xs font-bold opacity-70">
                          {event.month}
                        </span>

                        <span className="text-4xl font-black">
                          {event.day}
                        </span>

                        <span className="text-xs font-bold opacity-70">
                          {weekday}
                        </span>
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                          <div>
                            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7A604E]">
                              {event.category}
                            </p>

                            <h3 className="mt-2 text-2xl font-black text-[#361B10] md:text-3xl">
                              {event.region}
                            </h3>
                          </div>

                          <button
                            onClick={() =>
                              setOpenEventId(isOpen ? null : event.id)
                            }
                            className="btn-soft w-fit"
                          >
                            {isOpen ? "Hide info" : "More info"}
                          </button>
                        </div>

                        <p className="mt-4 text-lg font-black text-[#361B10]">
                          {event.title}
                        </p>

                        <p className="mt-2 leading-7 text-[#7A604E]">
                          {event.description}
                        </p>

                        {isOpen && (
                          <div className="mt-5 rounded-3xl border border-[#361B10]/10 bg-[#EBE4CD] p-5">
                            <p className="font-black text-[#361B10]">
                              {event.month} {event.day}, {selectedYear}
                            </p>

                            <p className="mt-2 leading-7 text-[#7A604E]">
                              {event.details}
                            </p>

                            <p className="mt-4 text-sm font-bold text-[#7A604E]">
                              Category: {event.category}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}