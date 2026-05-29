"use client";

import { useMemo, useState } from "react";

type DstEvent = {
  id: number;
  month: string;
  day: number;
  region: string;
  category: "Upcoming events" | "North America" | "Europe" | "Australia" | "Africa" | "South America";
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
    description:
      "Clocks move forward one hour in many European countries.",
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
    description:
      "Clocks move back one hour in several Australian states.",
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
    description:
      "Clocks move forward one hour in selected Chilean regions.",
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
    description:
      "Clocks move back one hour in many European countries.",
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
    <main className="min-h-screen bg-white text-[#2b2b2b]">
      <section className="px-6 py-8 md:px-16">
        <h1 className="text-4xl font-black md:text-5xl">
          Daylight Saving Time {selectedYear}
        </h1>

        <p className="mt-4 max-w-4xl text-lg text-gray-600">
          Will the time be set backwards or forwards? When? Where? This page
          shows daylight saving time changes in a simple TIME.MR project format.
        </p>
      </section>

      <section className="h-[230px] bg-gradient-to-r from-pink-200 via-rose-100 to-cyan-100">
        <div className="flex h-full items-center justify-center">
          <div className="flex h-36 w-36 items-center justify-center rounded-full border-8 border-white bg-white shadow-xl">
            <div className="relative h-24 w-24 rounded-full border-4 border-gray-300">
              <div className="absolute left-1/2 top-3 h-10 w-1 -translate-x-1/2 rounded bg-gray-800"></div>
              <div className="absolute left-1/2 top-1/2 h-1 w-8 -translate-y-1/2 rounded bg-gray-800"></div>
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-800"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-8 md:px-16">
        <ul className="max-w-5xl list-disc space-y-2 pl-6 text-sm text-gray-700">
          <li>
            Daylight saving time means some places move clocks forward or
            backward during the year.
          </li>
          <li>
            Not all countries use daylight saving time. Bangladesh does not
            currently use daylight saving time.
          </li>
          <li>
            This TIME.MR page is dynamic inside the project. Later it can be
            connected to a live timezone database.
          </li>
        </ul>

        <div className="mt-8">
          <h2 className="text-2xl font-black">
            {nextEvent ? (
              <>
                The next event happens on {nextEvent.month} {nextEvent.day},{" "}
                {selectedYear}, when {nextEvent.title.toLowerCase()} in{" "}
                {nextEvent.region}.
              </>
            ) : (
              "No DST events found for this filter."
            )}
          </h2>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <label className="font-bold">Scroll down or jump to:</label>

            <select
              value={selectedCategory}
              onChange={(event) => {
                setSelectedCategory(event.target.value);
                setOpenEventId(null);
              }}
              className="border bg-gray-100 px-4 py-2"
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => {
                  setSelectedYear(year);
                  setOpenEventId(null);
                }}
                className={`px-4 py-2 text-sm font-bold ${
                  year === selectedYear
                    ? "bg-black text-white"
                    : "bg-gray-100 text-[#2b2b2b] hover:bg-gray-200"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-20 space-y-10">
          {filteredEvents.map((event) => {
            const eventDate = makeEventDate(selectedYear, event);
            const weekday = new Intl.DateTimeFormat("en-US", {
              weekday: "short",
            }).format(eventDate);

            const isOpen = openEventId === event.id;

            return (
              <article
                key={`${event.id}-${selectedYear}`}
                className="flex max-w-5xl gap-6"
              >
                <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center bg-gray-100 text-center">
                  <span className="text-xs text-gray-500">{event.month}</span>

                  <span className="text-3xl font-black text-[#c83261]">
                    {event.day}
                  </span>

                  <span className="text-xs text-gray-500">{weekday}</span>
                </div>

                <div>
                  <h3 className="text-2xl font-black">{event.region}</h3>

                  <p className="mt-2 text-lg font-bold">{event.title}</p>

                  <p className="mt-1 text-gray-600">{event.description}</p>

                  <button
                    onClick={() => setOpenEventId(isOpen ? null : event.id)}
                    className="mt-3 text-sm font-bold underline"
                  >
                    {isOpen ? "Hide info" : "More info"}
                  </button>

                  {isOpen && (
                    <div className="mt-4 max-w-3xl border-l-4 border-[#c83261] bg-gray-100 p-5">
                      <p className="font-bold">
                        {event.month} {event.day}, {selectedYear}
                      </p>

                      <p className="mt-2 text-gray-700">{event.details}</p>

                      <p className="mt-3 text-sm text-gray-500">
                        Category: {event.category}
                      </p>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}