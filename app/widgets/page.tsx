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
  const [fontColor, setFontColor] = useState("#EBE4CD");
  const [backgroundColor, setBackgroundColor] = useState("#361B10");
  const [copied, setCopied] = useState(false);

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
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2500);
  }

  return (
    <main className="page-shell px-4 py-8">
      <section className="container-modern">
        <div className="card-modern overflow-hidden">
          <div className="grid gap-8 bg-[#361B10] px-6 py-10 text-[#EBE4CD] md:grid-cols-[1.25fr_0.75fr] md:px-10 md:py-14">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] opacity-75">
                TIME.MR Widgets
              </p>

              <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
                Free customisable clock widget
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 opacity-80 md:text-xl md:leading-8">
                Build a clock widget for your own website. Choose the location,
                display options, colours, size, and copy the iframe embed code.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-[#EBE4CD]/15 px-4 py-2 text-sm font-bold">
                  Live preview
                </span>

                <span className="rounded-full bg-[#EBE4CD]/15 px-4 py-2 text-sm font-bold">
                  Custom colours
                </span>

                <span className="rounded-full bg-[#EBE4CD]/15 px-4 py-2 text-sm font-bold">
                  Embed ready
                </span>
              </div>
            </div>

            <div className="rounded-[32px] border border-[#EBE4CD]/20 bg-[#EBE4CD]/10 p-6 backdrop-blur">
              <p className="text-sm font-black uppercase tracking-[0.25em] opacity-70">
                Selected widget
              </p>

              <h2 className="mt-4 text-4xl font-black">
                {selectedLocation?.city || "Dhaka"}
              </h2>

              <p className="mt-2 text-sm font-bold opacity-75">
                {selectedLocation?.country || "Bangladesh"} · {timezone}
              </p>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <section className="space-y-5">
                <div className="rounded-[32px] border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6">
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-[#7A604E]">
                    Location
                  </p>

                  <label className="mt-4 block text-lg font-black text-[#361B10]">
                    Choose city or timezone
                    <select
                      value={timezone}
                      onChange={(event) => setTimezone(event.target.value)}
                      className="input-modern mt-3 text-lg font-bold"
                    >
                      {locations.map((location) => (
                        <option
                          key={`${location.city}-${location.timezone}`}
                          value={location.timezone}
                        >
                          {location.city}, {location.country}
                        </option>
                      ))}
                    </select>
                  </label>

                  <p className="mt-3 text-sm font-bold text-[#7A604E]">
                    Selected: {selectedLocation?.city},{" "}
                    {selectedLocation?.country}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-[28px] border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5">
                    <h3 className="text-xl font-black text-[#361B10]">
                      Display
                    </h3>

                    <label className="mt-4 flex items-center gap-3 font-bold text-[#7A604E]">
                      <input
                        type="checkbox"
                        checked={showTime}
                        onChange={(event) => setShowTime(event.target.checked)}
                        className="h-5 w-5 accent-[#361B10]"
                      />
                      Time
                    </label>

                    <label className="mt-3 flex items-center gap-3 font-bold text-[#7A604E]">
                      <input
                        type="checkbox"
                        checked={showDate}
                        onChange={(event) => setShowDate(event.target.checked)}
                        className="h-5 w-5 accent-[#361B10]"
                      />
                      Date
                    </label>

                    <label className="mt-3 flex items-center gap-3 font-bold text-[#7A604E]">
                      <input
                        type="checkbox"
                        checked={showTimezone}
                        onChange={(event) =>
                          setShowTimezone(event.target.checked)
                        }
                        className="h-5 w-5 accent-[#361B10]"
                      />
                      Time zone
                    </label>

                    <label className="mt-3 flex items-center gap-3 font-bold text-[#7A604E]">
                      <input
                        type="checkbox"
                        checked={showSeconds}
                        onChange={(event) =>
                          setShowSeconds(event.target.checked)
                        }
                        className="h-5 w-5 accent-[#361B10]"
                      />
                      Seconds
                    </label>
                  </div>

                  <div className="rounded-[28px] border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5">
                    <h3 className="text-xl font-black text-[#361B10]">
                      Size
                    </h3>

                    <label className="mt-4 block font-bold text-[#7A604E]">
                      Font size: {fontSize}px
                      <input
                        type="range"
                        min="14"
                        max="48"
                        value={fontSize}
                        onChange={(event) =>
                          setFontSize(Number(event.target.value))
                        }
                        className="mt-4 block w-full accent-[#361B10]"
                      />
                    </label>
                  </div>

                  <div className="rounded-[28px] border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5">
                    <h3 className="text-xl font-black text-[#361B10]">
                      Colours
                    </h3>

                    <label className="mt-4 block font-bold text-[#7A604E]">
                      Font colour
                      <input
                        type="color"
                        value={fontColor}
                        onChange={(event) => setFontColor(event.target.value)}
                        className="mt-2 block h-11 w-full rounded-xl border border-[#361B10]/10 bg-transparent"
                      />
                    </label>

                    <label className="mt-4 block font-bold text-[#7A604E]">
                      Background
                      <input
                        type="color"
                        value={backgroundColor}
                        onChange={(event) =>
                          setBackgroundColor(event.target.value)
                        }
                        className="mt-2 block h-11 w-full rounded-xl border border-[#361B10]/10 bg-transparent"
                      />
                    </label>
                  </div>
                </div>
              </section>

              <section>
                <div className="rounded-[32px] bg-[#361B10] p-6 text-[#EBE4CD] shadow-2xl shadow-[#361B10]/20 md:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.25em] opacity-70">
                    Preview
                  </p>

                  <h2 className="mt-2 text-3xl font-black">
                    What it will look like
                  </h2>

                  <div
                    className="mt-6 min-h-[210px] rounded-[28px] border border-white/10 p-6 shadow-inner"
                    style={{
                      backgroundColor,
                      color: fontColor,
                      fontSize: `${fontSize}px`,
                    }}
                  >
                    {showTime && (
                      <p className="font-black leading-tight">
                        Time in {selectedLocation?.city}: {previewTime}
                      </p>
                    )}

                    {showDate && <p className="mt-3">{previewDate}</p>}

                    {showTimezone && (
                      <p className="mt-3 break-words">Time zone: {timezone}</p>
                    )}

                    {!showTime && !showDate && !showTimezone && (
                      <p className="font-black">Nothing selected</p>
                    )}
                  </div>

                  <p className="mt-4 text-sm font-bold opacity-75">
                    The final result may vary slightly depending on iframe size
                    and your website layout.
                  </p>
                </div>
              </section>
            </div>

            <section className="mt-8 rounded-[32px] border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6 md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-[#7A604E]">
                    Embed code
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-[#361B10] md:text-3xl">
                    Code for your own web clock widget
                  </h2>
                </div>

                <button onClick={copyCode} className="btn-primary w-fit">
                  {copied ? "Copied!" : "Copy widget code"}
                </button>
              </div>

              <textarea
                value={widgetCode}
                readOnly
                className="mt-5 h-52 w-full rounded-3xl border border-[#361B10]/10 bg-[#EBE4CD] p-5 font-mono text-sm text-[#361B10] outline-none"
              />
            </section>

            <section className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[32px] bg-[#361B10] p-6 text-[#EBE4CD] md:p-8">
                <h2 className="text-2xl font-black">Terms of use</h2>

                <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 opacity-85">
                  <li>
                    A visible link back to TIME.MR should remain near the widget.
                  </li>
                  <li>
                    Your web page must not refresh automatically because of the
                    widget.
                  </li>
                  <li>
                    Usage in personal, portfolio, and educational projects is
                    allowed.
                  </li>
                  <li>The widget comes with no warranty.</li>
                </ul>
              </div>

              <div className="rounded-[32px] border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6 md:p-8">
                <h2 className="text-2xl font-black text-[#361B10]">
                  Best for
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Portfolio websites",
                    "Dashboards",
                    "Blogs",
                    "Team pages",
                    "Event pages",
                    "Time zone tools",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-[#361B10]/10 px-4 py-2 text-sm font-black text-[#361B10]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <p className="mt-5 leading-7 text-[#7A604E]">
                  TIME.MR may improve or change widget code in the future.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}