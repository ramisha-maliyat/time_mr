"use client";

import { useMemo, useState } from "react";
import { locations } from "@/data/locations";

export default function WidgetsPage() {
  const [timezone, setTimezone] = useState("Asia/Dhaka");
  const [showTime, setShowTime] = useState(true);
  const [showDate, setShowDate] = useState(true);
  const [showTimezone, setShowTimezone] = useState(true);
  const [showSeconds, setShowSeconds] = useState(true);
  const [fontSize, setFontSize] = useState(24);
  const [fontColor, setFontColor] = useState("#ff0000");
  const [backgroundColor, setBackgroundColor] = useState("#000000");

  const selectedLocation = locations.find(
    (location) => location.timezone === timezone
  );

  const previewTime = useMemo(() => {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: showSeconds ? "2-digit" : undefined,
      hour12: false,
    }).format(new Date());
  }, [timezone, showSeconds]);

  const previewDate = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date());
  }, [timezone]);

  const widgetCode = `<iframe 
  src="https://time-mr.vercel.app/embed?timezone=${encodeURIComponent(
    timezone
  )}&time=${showTime}&date=${showDate}&tz=${showTimezone}&seconds=${showSeconds}&fontSize=${fontSize}&fontColor=${encodeURIComponent(
    fontColor
  )}&background=${encodeURIComponent(backgroundColor)}"
  width="360"
  height="180"
  style="border:0; overflow:hidden;"
></iframe>`;

  function copyCode() {
    navigator.clipboard.writeText(widgetCode);
    alert("Widget code copied!");
  }

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-[#2b2b2b] md:px-16">
      <section className="max-w-6xl">
        <h1 className="text-4xl font-black md:text-5xl">
          Free, customisable clock widget for your own web site
        </h1>

        <p className="mt-3 max-w-4xl text-gray-600">
          Want an exact clock on your own website? Customise this TIME.MR widget,
          preview it, and copy the embed code.
        </p>

        <h2 className="mt-10 text-2xl font-black">Options</h2>

        <div className="mt-5 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <section className="space-y-5">
            <div className="bg-gray-100 p-5">
              <label className="block font-black">
                Location
                <select
                  value={timezone}
                  onChange={(event) => setTimezone(event.target.value)}
                  className="mt-2 w-full border bg-white px-4 py-3 font-medium"
                >
                  {locations.map((location) => (
                    <option key={location.city} value={location.timezone}>
                      {location.city}, {location.country}
                    </option>
                  ))}
                </select>
              </label>

              <p className="mt-2 text-sm text-gray-500">
                Selected: {selectedLocation?.city}, {selectedLocation?.country}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-gray-100 p-5">
                <h3 className="font-black">What to display</h3>

                <label className="mt-3 block">
                  <input
                    type="checkbox"
                    checked={showTime}
                    onChange={(event) => setShowTime(event.target.checked)}
                    className="mr-2"
                  />
                  Time
                </label>

                <label className="mt-2 block">
                  <input
                    type="checkbox"
                    checked={showDate}
                    onChange={(event) => setShowDate(event.target.checked)}
                    className="mr-2"
                  />
                  Date
                </label>

                <label className="mt-2 block">
                  <input
                    type="checkbox"
                    checked={showTimezone}
                    onChange={(event) => setShowTimezone(event.target.checked)}
                    className="mr-2"
                  />
                  Time zone
                </label>

                <label className="mt-2 block">
                  <input
                    type="checkbox"
                    checked={showSeconds}
                    onChange={(event) => setShowSeconds(event.target.checked)}
                    className="mr-2"
                  />
                  Seconds
                </label>
              </div>

              <div className="bg-gray-100 p-5">
                <h3 className="font-black">Size</h3>

                <label className="mt-3 block">
                  Font size: {fontSize}px
                  <input
                    type="range"
                    min="14"
                    max="48"
                    value={fontSize}
                    onChange={(event) => setFontSize(Number(event.target.value))}
                    className="mt-3 w-full"
                  />
                </label>
              </div>

              <div className="bg-gray-100 p-5">
                <h3 className="font-black">Colours</h3>

                <label className="mt-3 block">
                  Font colour
                  <input
                    type="color"
                    value={fontColor}
                    onChange={(event) => setFontColor(event.target.value)}
                    className="mt-2 block h-10 w-full"
                  />
                </label>

                <label className="mt-3 block">
                  Background
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(event) => setBackgroundColor(event.target.value)}
                    className="mt-2 block h-10 w-full"
                  />
                </label>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black">What it will look like</h2>

            <div
              className="mt-4 min-h-[180px] max-w-md p-5"
              style={{
                backgroundColor,
                color: fontColor,
                fontSize: `${fontSize}px`,
              }}
            >
              {showTime && (
                <p className="font-black">
                  Time in {selectedLocation?.city}: {previewTime}
                </p>
              )}

              {showDate && <p>{previewDate}</p>}

              {showTimezone && <p>Time zone: {timezone}</p>}
            </div>

            <p className="mt-2 text-sm text-gray-500">
              The final result can look different depending on your website CSS
              and iframe size.
            </p>
          </section>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-black">
            This is the code for your own web clock widget:
          </h2>

          <textarea
            value={widgetCode}
            readOnly
            className="mt-4 h-44 w-full max-w-4xl border bg-gray-100 p-4 font-mono text-sm"
          />

          <button
            onClick={copyCode}
            className="mt-4 bg-black px-8 py-4 font-black text-white"
          >
            Copy widget code
          </button>
        </section>

        <section className="mt-12 max-w-5xl">
          <h2 className="text-2xl font-black">Terms of use</h2>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
            <li>
              A visible link back to TIME.MR should remain near the widget.
            </li>
            <li>
              Your web page must not refresh automatically because of the widget.
            </li>
            <li>
              Usage in personal, portfolio, and educational projects is allowed.
            </li>
            <li>
              The widget comes with no warranty.
            </li>
            <li>
              TIME.MR may improve or change the widget code in the future.
            </li>
          </ul>
        </section>
      </section>
    </main>
  );
}