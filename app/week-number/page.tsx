import Link from "next/link";

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

export default function WeekNumberPage() {
  const now = new Date();
  const weekNumber = getWeekNumber(now);

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-center text-[#2b2b2b]">


      <h1 className="mt-20 text-5xl font-black">Week number</h1>

      <div className="mt-10 text-8xl font-black">{weekNumber}</div>

      <p className="mt-4 text-xl text-gray-600">
        Current ISO week number
      </p>
    </main>
  );
}