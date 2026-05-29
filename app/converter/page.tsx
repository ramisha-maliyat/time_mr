"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { locations } from "@/data/locations";
import { LocationItem } from "@/types/location";
import {
  getDateByTimezone,
  getShortTime,
  getTimeByTimezone,
} from "@/lib/time";

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<LocationItem>(
    locations[0]
  );

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [deviceDifference, setDeviceDifference] = useState<number | null>(null);
  const [searchText, setSearchText] = useState("");
  const [clockFormat, setClockFormat] = useState("24");

  useEffect(() => {
    const savedFormat = localStorage.getItem("time_mr_clock_format");

    if (savedFormat) {
      setClockFormat(savedFormat);
    }
  }, []);

  useEffect(() => {
    const updateClock = () => {
      setTime(getTimeByTimezone(selectedLocation.timezone, clockFormat === "12"));
      setDate(getDateByTimezone(selectedLocation.timezone));
    };

    updateClock();

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, [selectedLocation, clockFormat]);

  useEffect(() => {
    async function checkDeviceTime() {
      try {
        const requestStart = Date.now();

        const response = await fetch("/api/server-time", {
          cache: "no-store",
        });

        const data = await response.json();

        const requestEnd = Date.now();
        const roundTrip = requestEnd - requestStart;
        const estimatedServerTime = data.serverTime + roundTrip / 2;

        const differenceInSeconds = (requestEnd - estimatedServerTime) / 1000;

        setDeviceDifference(differenceInSeconds);
      } catch {
        setDeviceDifference(null);
      }
    }

    checkDeviceTime();

    const interval = setInterval(checkDeviceTime, 30000);

    return () => clearInterval(interval);
  }, []);

  let deviceMessage = "Checking your device clock...";

  if (deviceDifference !== null) {
    const value = Math.abs(deviceDifference).toFixed(1);

    if (deviceDifference > 0.5) {
      deviceMessage = `Your device clock is ${value} seconds ahead.`;
    } else if (deviceDifference < -0.5) {
      deviceMessage = `Your device clock is ${value} seconds behind.`;
    } else {
      deviceMessage = "Your device clock is accurate.";
    }
  }

  const filteredLocations = locations.filter((location) => {
    const text = searchText.toLowerCase();

    return (
      location.city.toLowerCase().includes(text) ||
      location.country.toLowerCase().includes(text) ||
      location.timezone.toLowerCase().includes(text)
    );
  });

  return (
    <main className="page-shell">
      <section className="container-modern pt-8 md:pt-14">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="card-modern overflow-hidden">
            <div className="bg-[#361B10] px-6 py-8 text-[#EBE4CD] md:px-10 md:py-12">
              <p className="text-sm font-black uppercase tracking-[0.3em] opacity-75">
                Exact time now
              </p>

              <h1 className="mt-4 text-3xl font-black leading-tight md:text-6xl">
                Time in {selectedLocation.city}, {selectedLocation.country}
              </h1>

              <p className="mt-4 max-w-3xl text-base leading-7 opacity-80 md:text-xl">
                Live world clock, timezone search, and device time accuracy
                check for TIME.MR.
              </p>
            </div>

            <div className="p-6 md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#7A604E]">
                {deviceMessage}
              </p>

              <div className="mt-6 break-words text-[64px] font-black leading-none tracking-tight text-[#361B10] sm:text-[100px] md:text-[150px] lg:text-[180px]">
                {time || "--:--:--"}
              </div>

              <p className="mt-6 text-2xl font-bold text-[#361B10] md:text-4xl">
                {date || "Loading date..."}
              </p>

              <p className="mt-3 break-words text-lg text-[#7A604E]">
                Time zone: {selectedLocation.timezone}
              </p>
            </div>
          </div>

          <aside className="card-modern p-6 md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#7A604E]">
              Selected city
            </p>

            <h2 className="mt-4 text-4xl font-black text-[#361B10]">
              {selectedLocation.city}
            </h2>

            <p className="mt-2 text-xl font-bold text-[#7A604E]">
              {selectedLocation.country}
            </p>

            <div className="mt-8 rounded-[28px] bg-[#361B10] p-6 text-[#EBE4CD]">
              <p className="text-sm font-black uppercase tracking-[0.22em] opacity-70">
                Current time
              </p>

              <p className="mt-3 text-5xl font-black">{time || "--:--"}</p>

              <p className="mt-4 text-sm font-bold opacity-75">
                {selectedLocation.timezone}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7A604E]">
                  Format
                </p>
                <p className="mt-2 text-2xl font-black text-[#361B10]">
                  {clockFormat === "12" ? "12H" : "24H"}
                </p>
              </div>

              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7A604E]">
                  Cities
                </p>
                <p className="mt-2 text-2xl font-black text-[#361B10]">
                  {locations.length}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="container-modern mt-8">
        <div className="card-modern p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#7A604E]">
                Search
              </p>

              <h2 className="mt-2 text-3xl font-black text-[#361B10]">
                Search city
              </h2>
            </div>

            <p className="text-sm font-bold text-[#7A604E]">
              Search by city, country, or timezone
            </p>
          </div>

          <input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search Dhaka, Tokyo, London..."
            className="input-modern mt-5 text-lg"
          />

          {searchText && (
            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {filteredLocations.map((location) => (
                <button
                  key={`${location.city}-${location.timezone}`}
                  onClick={() => {
                    setSelectedLocation(location);
                    setSearchText("");
                  }}
                  className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5 text-left transition hover:-translate-y-1 hover:bg-[#361B10] hover:text-[#EBE4CD] hover:shadow-xl hover:shadow-[#361B10]/10"
                >
                  <h3 className="text-xl font-black">{location.city}</h3>
                  <p className="mt-1 font-bold opacity-75">
                    {location.country}
                  </p>
                  <p className="mt-2 break-words text-sm opacity-70">
                    {location.timezone}
                  </p>
                </button>
              ))}

              {filteredLocations.length === 0 && (
                <p className="rounded-3xl bg-[#FFF9E8]/80 p-5 font-bold text-[#7A604E]">
                  No city found.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="container-modern mt-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#7A604E]">
              Quick view
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#361B10]">
              World clocks
            </h2>
          </div>

          <p className="text-sm font-bold text-[#7A604E]">
            Click a city to make it the main clock.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {locations.slice(0, 10).map((location) => (
            <button
              key={`${location.city}-${location.timezone}`}
              onClick={() => setSelectedLocation(location)}
              className={`rounded-3xl p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#361B10]/10 ${
                selectedLocation.city === location.city
                  ? "bg-[#361B10] text-[#EBE4CD]"
                  : "bg-[#FFF9E8]/80 text-[#361B10]"
              }`}
            >
              <h3 className="text-xl font-black">{location.city}</h3>
              <p className="mt-1 text-sm font-bold opacity-70">
                {location.country}
              </p>
              <p className="mt-4 text-3xl font-black">
                {getShortTime(location.timezone, clockFormat === "12")}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-12 bg-[#361B10] px-4 py-12 text-[#EBE4CD] md:py-16">
        <div className="container-modern">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] opacity-70">
              City cloud
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              Pick any city
            </h2>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {filteredLocations.map((location, index) => (
              <button
                key={`${location.city}-${index}`}
                onClick={() => setSelectedLocation(location)}
                className={`rounded-full px-4 py-2 font-black transition hover:bg-[#EBE4CD] hover:text-[#361B10] ${
                  selectedLocation.city === location.city
                    ? "bg-[#EBE4CD] text-[#361B10]"
                    : "bg-[#EBE4CD]/10 text-[#EBE4CD]"
                } ${
                  index % 4 === 0
                    ? "text-2xl md:text-4xl"
                    : "text-base md:text-xl"
                }`}
              >
                {location.city}
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}