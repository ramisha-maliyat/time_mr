import Link from "next/link";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

function getMonthDays(year: number, month: number) {
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0).getDate();

  const firstDay = firstDate.getDay() === 0 ? 6 : firstDate.getDay() - 1;

  const days: Array<number | null> = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= lastDate; day++) {
    days.push(day);
  }

  return days;
}

export default function CalendarPage() {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-[#2b2b2b] md:px-16">
      <Link
        href="/"
        className="inline-block bg-[#c83261] px-6 py-4 text-sm font-black tracking-[0.25em] text-white"
      >
        TIME.MR
      </Link>

      <section className="mt-10">
        <h1 className="text-4xl font-black md:text-5xl">{year} calendar</h1>

<div
  className="mt-12 grid gap-x-24 gap-y-16"
  style={{
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
  }}
>
          {monthNames.map((monthName, monthIndex) => {
            const days = getMonthDays(year, monthIndex);

            return (
              <div key={monthName} className="w-[210px]">
                <h2 className="border-b border-gray-400 pb-1 text-sm font-black">
                  {monthName}{" "}
                  <span className="font-normal text-gray-500">{year}</span>
                </h2>

                <div
                  className="mt-2 grid text-center text-[10px] font-bold text-gray-500"
                  style={{
                    gridTemplateColumns: "repeat(7, 1fr)",
                    columnGap: "4px",
                    rowGap: "4px",
                  }}
                >
                  {weekDays.map((day, index) => (
                    <div
                      key={`${day}-${index}`}
                      className={index >= 5 ? "text-red-600" : ""}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div
                  className="mt-2 grid text-center text-[10px]"
                  style={{
                    gridTemplateColumns: "repeat(7, 1fr)",
                    columnGap: "4px",
                    rowGap: "4px",
                  }}
                >
                  {days.map((day, index) => {
                    const date = day ? new Date(year, monthIndex, day) : null;

                    const isWeekend =
                      date && (date.getDay() === 0 || date.getDay() === 6);

                    const isToday =
                      day === today.getDate() &&
                      monthIndex === today.getMonth() &&
                      year === today.getFullYear();

                    return (
                      <div
                        key={`${monthName}-${index}`}
                        className={`flex h-5 w-5 items-center justify-center rounded-full ${
                          isToday
                            ? "border border-[#c83261] text-[#c83261]"
                            : isWeekend
                            ? "font-bold text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}