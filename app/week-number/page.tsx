function getWeekNumber(date: Date) {
  const copiedDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );

  const dayNumber = copiedDate.getUTCDay() || 7;

  copiedDate.setUTCDate(copiedDate.getUTCDate() + 4 - dayNumber);

  const yearStart = new Date(Date.UTC(copiedDate.getUTCFullYear(), 0, 1));

  return Math.ceil(
    ((copiedDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
  );
}

function getStartOfISOWeek(date: Date) {
  const copiedDate = new Date(date);
  const day = copiedDate.getDay() || 7;

  copiedDate.setDate(copiedDate.getDate() - day + 1);
  copiedDate.setHours(0, 0, 0, 0);

  return copiedDate;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function WeekNumberPage() {
  const now = new Date();
  const weekNumber = getWeekNumber(now);

  const weekStart = getStartOfISOWeek(now);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  return (
    <main className="page-shell px-4 py-8">
      <section className="container-modern">
        <div className="card-modern mx-auto max-w-5xl overflow-hidden text-center">
          <div className="bg-[#361B10] px-6 py-10 text-[#EBE4CD] md:px-10 md:py-14">
            <p className="text-sm font-black uppercase tracking-[0.3em] opacity-75">
              TIME.MR Calendar
            </p>

            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              Week number
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 opacity-80 md:text-xl">
              Find the current ISO week number based on today&apos;s date.
            </p>
          </div>

          <div className="p-6 md:p-10">
            <div className="mx-auto rounded-[36px] bg-[#361B10] p-8 text-[#EBE4CD] shadow-2xl shadow-[#361B10]/20 md:max-w-3xl md:p-12">
              <p className="text-sm font-black uppercase tracking-[0.3em] opacity-70">
                Current ISO week
              </p>

              <div className="mt-4 text-[110px] font-black leading-none tracking-tight sm:text-[150px] md:text-[190px]">
                {weekNumber}
              </div>

              <p className="mt-5 text-xl font-bold opacity-85 md:text-3xl">
                {formatDate(now)}
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6 text-left">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7A604E]">
                  Week starts
                </p>

                <h2 className="mt-3 text-2xl font-black text-[#361B10]">
                  {formatDate(weekStart)}
                </h2>
              </div>

              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6 text-left">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7A604E]">
                  Week ends
                </p>

                <h2 className="mt-3 text-2xl font-black text-[#361B10]">
                  {formatDate(weekEnd)}
                </h2>
              </div>

              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6 text-left">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7A604E]">
                  Standard
                </p>

                <h2 className="mt-3 text-2xl font-black text-[#361B10]">
                  ISO 8601
                </h2>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6 text-left">
              <h2 className="text-2xl font-black text-[#361B10]">
                How ISO week numbers work
              </h2>

              <p className="mt-3 max-w-4xl text-lg leading-8 text-[#7A604E]">
                ISO weeks start on Monday. Week 1 is the week that contains the
                first Thursday of the year. This is commonly used in calendars,
                schedules, planning systems, and business reporting.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}