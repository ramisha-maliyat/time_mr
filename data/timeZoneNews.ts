export type NewsItem = {
  date: string;
  title: string;
  summary: string;
};

export const newsItems: NewsItem[] = [
  {
    date: "2026-05-22",
    title: "Alberta and Northwest Territories stay on daylight saving time",
    summary:
      "The Canadian provinces of Alberta and Northwest Territories will stay on UTC -6 from 2026.",
  },
  {
    date: "2026-03-08",
    title: "British Columbia makes daylight saving time permanent",
    summary:
      "British Columbia announces a permanent daylight saving time plan.",
  },
  {
    date: "2026-02-28",
    title: "Moldova adjusts DST timing",
    summary:
      "Moldova changes the timing of daylight saving time transitions.",
  },
];