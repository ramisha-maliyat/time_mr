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
    <main className="page-shell px-4 py-8">
      <section className="container-modern">
        <div className="card-modern overflow-hidden">
          <div className="bg-[#361B10] px-6 py-10 text-[#EBE4CD] md:px-10 md:py-14">
            <p className="text-sm font-black uppercase tracking-[0.3em] opacity-75">
              TIME.MR Calendar
            </p>

            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              {year} calendar
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 opacity-80 md:text-xl">
              A clean full-year compact calendar with weekends highlighted and
              today marked clearly.
            </p>
          </div>

          <div className="p-5 md:p-10">
            <div className="mb-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7A604E]">
                  Year
                </p>
                <h2 className="mt-2 text-3xl font-black text-[#361B10]">
                  {year}
                </h2>
              </div>

              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7A604E]">
                  Today
                </p>
                <h2 className="mt-2 text-3xl font-black text-[#361B10]">
                  {today.getDate()}
                </h2>
              </div>

              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7A604E]">
                  Month
                </p>
                <h2 className="mt-2 text-3xl font-black text-[#361B10]">
                  {monthNames[today.getMonth()]}
                </h2>
              </div>
            </div>

<div
  className="grid justify-items-center gap-x-8 gap-y-8 sm:gap-x-10 md:gap-y-12"
  style={{
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  }}
>
              {monthNames.map((monthName, monthIndex) => {
                const days = getMonthDays(year, monthIndex);
                const isCurrentMonth = monthIndex === today.getMonth();

                return (
                  <div
                    key={monthName}
                  className={`w-full max-w-[280px] rounded-[28px] border p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#361B10]/10 ${
                      isCurrentMonth
                        ? "border-[#361B10]/30 bg-[#361B10] text-[#EBE4CD]"
                        : "border-[#361B10]/10 bg-[#FFF9E8]/80 text-[#361B10]"
                    }`}
                  >
                    <div className="flex items-end justify-between border-b border-current/20 pb-3">
                      <h2 className="text-lg font-black">{monthName}</h2>
                      <span className="text-xs font-bold opacity-65">
                        {year}
                      </span>
                    </div>

                    <div
                      className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                        isCurrentMonth ? "text-[#EBE4CD]/70" : "text-[#7A604E]"
                      }`}
                      style={{
                        gridTemplateColumns: "repeat(7, 1fr)",
                        columnGap: "4px",
                        rowGap: "6px",
                      }}
                    >
                      {weekDays.map((day, index) => (
                        <div
                          key={`${day}-${index}`}
                          className={
                            index >= 5
                              ? isCurrentMonth
                                ? "text-[#EBE4CD]"
                                : "text-[#361B10]"
                              : ""
                          }
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    <div
                      className="mt-3 grid text-center text-xs"
                      style={{
                        gridTemplateColumns: "repeat(7, 1fr)",
                        columnGap: "6px",
                        rowGap: "7px",
                      }}
                    >
                      {days.map((day, index) => {
                        const date = day
                          ? new Date(year, monthIndex, day)
                          : null;

                        const isWeekend =
                          date &&
                          (date.getDay() === 0 || date.getDay() === 6);

                        const isToday =
                          day === today.getDate() &&
                          monthIndex === today.getMonth() &&
                          year === today.getFullYear();

                        return (
                          <div
                            key={`${monthName}-${index}`}
                            className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full font-bold ${
                              isToday
                                ? "bg-[#EBE4CD] text-[#361B10] ring-2 ring-[#EBE4CD]"
                                : isWeekend
                                ? isCurrentMonth
                                  ? "bg-[#EBE4CD]/15 text-[#EBE4CD]"
                                  : "bg-[#361B10]/10 text-[#361B10]"
                                : isCurrentMonth
                                ? "text-[#EBE4CD]/85"
                                : "text-[#7A604E]"
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
          </div>
        </div>
      </section>
    </main>
  );
}