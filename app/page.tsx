"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { locations } from "@/data/locations";
import { LocationItem } from "@/types/location";
import { getShortTime, getTimeByTimezone } from "@/lib/time";

const bangladeshLocation =
  locations.find((location) => location.timezone === "Asia/Dhaka") ||
  locations.find((location) => location.city === "Dhaka") ||
  locations[0];

type SunInfo = {
  sunrise: string;
  sunset: string;
  dayLength: string;
};

function getISOWeekNumber(date: Date) {
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

function getDatePartsByTimezone(timezone: string) {
  const now = new Date();

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "long",
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).formatToParts(now);

  const weekday = parts.find((part) => part.type === "weekday")?.value || "";
  const month = parts.find((part) => part.type === "month")?.value || "";
  const day = parts.find((part) => part.type === "day")?.value || "";
  const year = parts.find((part) => part.type === "year")?.value || "";

  return {
    weekday,
    month,
    day,
    year,
    formatted: `${weekday}, ${month} ${Number(day)}, ${year}`,
  };
}

function getDateObjectInTimezone(timezone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  const day = Number(parts.find((part) => part.type === "day")?.value);

  return new Date(year, month - 1, day);
}

function formatSunTime(value: string, timezone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

function formatDayLength(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${hours}h ${minutes}m`;
}

export default function Home() {
  const [selectedLocation, setSelectedLocation] =
    useState<LocationItem>(bangladeshLocation);

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [deviceDifference, setDeviceDifference] = useState<number | null>(null);
  const [syncAccuracy, setSyncAccuracy] = useState<number | null>(null);
  const [searchText, setSearchText] = useState("");
  const [clockFormat, setClockFormat] = useState("24");
  const [sunInfo, setSunInfo] = useState<SunInfo | null>(null);
  const [sunLoading, setSunLoading] = useState(false);

  useEffect(() => {
    const savedFormat = localStorage.getItem("time_mr_clock_format");

    if (savedFormat) {
      setClockFormat(savedFormat);
    }
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const timezoneDate = getDateObjectInTimezone(selectedLocation.timezone);
      const dateParts = getDatePartsByTimezone(selectedLocation.timezone);
      const weekNumber = getISOWeekNumber(timezoneDate);

      setTime(
        getTimeByTimezone(selectedLocation.timezone, clockFormat === "12")
      );

      setDate(`${dateParts.formatted}, week ${weekNumber}`);
    };

    updateClock();

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, [selectedLocation, clockFormat]);

  useEffect(() => {
    async function loadSunInfo() {
      try {
        setSunLoading(true);
        setSunInfo(null);

        const geoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            selectedLocation.city
          )}&count=10&language=en&format=json`
        );

        const geoData = await geoResponse.json();

        const matchedLocation =
          geoData.results?.find((result: { country?: string }) =>
            result.country
              ?.toLowerCase()
              .includes(selectedLocation.country.toLowerCase())
          ) || geoData.results?.[0];

        if (!matchedLocation) {
          setSunInfo(null);
          return;
        }

        const latitude = matchedLocation.latitude;
        const longitude = matchedLocation.longitude;

        const sunResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunrise,sunset,daylight_duration&timezone=${encodeURIComponent(
            selectedLocation.timezone
          )}`
        );

        const sunData = await sunResponse.json();

        const sunriseValue = sunData.daily?.sunrise?.[0];
        const sunsetValue = sunData.daily?.sunset?.[0];
        const daylightValue = sunData.daily?.daylight_duration?.[0];

        if (!sunriseValue || !sunsetValue || !daylightValue) {
          setSunInfo(null);
          return;
        }

        setSunInfo({
          sunrise: formatSunTime(sunriseValue, selectedLocation.timezone),
          sunset: formatSunTime(sunsetValue, selectedLocation.timezone),
          dayLength: formatDayLength(daylightValue),
        });
      } catch {
        setSunInfo(null);
      } finally {
        setSunLoading(false);
      }
    }

    loadSunInfo();
  }, [selectedLocation]);

  useEffect(() => {
    async function checkDeviceTime() {
      try {
        const samples: {
          difference: number;
          accuracy: number;
        }[] = [];

        for (let i = 0; i < 5; i++) {
          const requestStart = Date.now();

          const response = await fetch("/api/server-time", {
            cache: "no-store",
          });

          const data = await response.json();

          const requestEnd = Date.now();

          const roundTripTime = requestEnd - requestStart;
          const estimatedServerTime = data.serverTime + roundTripTime / 2;

          const differenceInSeconds =
            (requestEnd - estimatedServerTime) / 1000;

          const accuracyInSeconds = roundTripTime / 2 / 1000;

          samples.push({
            difference: differenceInSeconds,
            accuracy: accuracyInSeconds,
          });

          await new Promise((resolve) => setTimeout(resolve, 120));
        }

        const bestSample = samples.sort((a, b) => a.accuracy - b.accuracy)[0];

        setDeviceDifference(bestSample.difference);
        setSyncAccuracy(bestSample.accuracy);
      } catch {
        setDeviceDifference(null);
        setSyncAccuracy(null);
      }
    }

    checkDeviceTime();

    const interval = setInterval(checkDeviceTime, 30000);

    return () => clearInterval(interval);
  }, []);

  let deviceMessage = "Checking your device clock...";

  if (deviceDifference !== null) {
    const value = Math.abs(deviceDifference).toFixed(1);

    if (deviceDifference > 0.1) {
      deviceMessage = `Your clock is ${value} seconds ahead.`;
    } else if (deviceDifference < -0.1) {
      deviceMessage = `Your clock is ${value} seconds behind.`;
    } else {
      deviceMessage = "Your clock is accurate.";
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
        <div className="card-modern overflow-hidden">
          <div className="p-6 md:p-10">
            <div>
              <h1 className="text-3xl font-black leading-tight text-[#361B10] md:text-5xl">
                {deviceMessage}
              </h1>

              <p className="mt-2 text-lg font-bold text-[#7A604E] md:text-xl">
                {syncAccuracy !== null
                  ? `Accuracy of synchronisation was ±${syncAccuracy.toFixed(
                      3
                    )} seconds.`
                  : "Measuring synchronisation accuracy..."}
              </p>

              <p className="mt-2 text-xl text-[#7A604E] md:text-2xl">
                Time in {selectedLocation.country} now:
              </p>
            </div>

            <div className="mt-8 break-words text-[72px] font-black leading-none tracking-tight text-[#361B10] sm:text-[120px] md:text-[180px] lg:text-[220px]">
              {time || "--:--:--"}
            </div>

            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-2xl font-bold text-[#361B10] md:text-4xl">
                  {date || "Loading date..."}
                </p>

                <p className="mt-3 text-lg text-[#7A604E]">
                  {sunLoading
                    ? "Sun: loading sunrise and sunset..."
                    : sunInfo
                    ? `Sun: ↑ ${sunInfo.sunrise} ↓ ${sunInfo.sunset} (${sunInfo.dayLength})`
                    : "Sun: sunrise and sunset unavailable"}
                </p>

                <p className="mt-2 break-words text-lg text-[#7A604E]">
                  Time zone: {selectedLocation.timezone}
                </p>
              </div>

              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 px-5 py-4">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7A604E]">
                  Selected city
                </p>

                <p className="mt-2 text-2xl font-black text-[#361B10]">
                  {selectedLocation.city}
                </p>
              </div>
            </div>
          </div>
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
                  className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5 text-left text-[#361B10] transition hover:-translate-y-1 hover:border-[#361B10]/20 hover:bg-[#F7F1DF] hover:shadow-xl hover:shadow-[#361B10]/10"
                >
                  <h3 className="text-xl font-black">{location.city}</h3>

                  <p className="mt-1 font-bold text-[#7A604E]">
                    {location.country}
                  </p>

                  <p className="mt-2 break-words text-sm text-[#7A604E]">
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
                  : "bg-[#FFF9E8]/80 text-[#361B10] hover:bg-[#F7F1DF]"
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

      <section className="mt-12 bg-[#EBE4CD] px-4 py-12 text-[#361B10] md:py-16">
        <div className="container-modern">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#7A604E]">
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
                className={`rounded-full border px-4 py-2 font-black transition hover:-translate-y-0.5 hover:border-[#361B10]/20 hover:bg-[#FFF9E8] hover:text-[#361B10] ${
                  selectedLocation.city === location.city
                    ? "border-[#361B10]/20 bg-[#FFF9E8] text-[#361B10]"
                    : "border-[#361B10]/10 bg-[#FFF9E8]/70 text-[#361B10]"
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