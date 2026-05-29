"use client";

import { useEffect, useState } from "react";

export default function EmbedPage() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const timezone = params.get("timezone") || "Asia/Dhaka";
    const showSeconds = params.get("seconds") !== "false";

    const update = () => {
      const now = new Date();

      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: showSeconds ? "2-digit" : undefined,
          hour12: false,
        }).format(now)
      );

      setDate(
        new Intl.DateTimeFormat("en-US", {
          timeZone: timezone,
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        }).format(now)
      );
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  if (typeof window === "undefined") {
    return null;
  }

  const params = new URLSearchParams(window.location.search);

  const timezone = params.get("timezone") || "Asia/Dhaka";
  const showTime = params.get("time") !== "false";
  const showDate = params.get("date") !== "false";
  const showTimezone = params.get("tz") !== "false";
  const fontSize = params.get("fontSize") || "24";
  const fontColor = params.get("fontColor") || "#ff0000";
  const background = params.get("background") || "#000000";

  return (
    <main
      className="flex min-h-screen items-center justify-center p-4"
      style={{
        backgroundColor: background,
        color: fontColor,
        fontSize: `${fontSize}px`,
      }}
    >
      <div>
        {showTime && <p className="font-black">TIME.MR: {time}</p>}
        {showDate && <p>{date}</p>}
        {showTimezone && <p>Time zone: {timezone}</p>}

        <a
          href="/"
          target="_blank"
          className="mt-2 block text-xs underline opacity-70"
        >
          Powered by TIME.MR
        </a>
      </div>
    </main>
  );
}