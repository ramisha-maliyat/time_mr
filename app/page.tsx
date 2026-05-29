"use client";

import { useEffect, useState } from "react";

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
    <main className="min-h-screen bg-white text-[#2b2b2b]">


      <section className="px-6 pt-6 md:px-12">
        <p className="text-lg font-bold text-gray-600">{deviceMessage}</p>

        <h1 className="mt-8 text-3xl font-black md:text-5xl">
          Time in {selectedLocation.city}, {selectedLocation.country} now:
        </h1>

        <div className="mt-8 text-[70px] font-black leading-none tracking-tight sm:text-[110px] md:text-[160px] lg:text-[210px]">
          {time}
        </div>

        <p className="mt-6 text-2xl md:text-4xl">{date}</p>

        <p className="mt-3 text-lg text-gray-600">
          Time zone: {selectedLocation.timezone}
        </p>
      </section>

      <section className="mt-10 px-6 md:px-12">
        <h2 className="mb-4 text-2xl font-black">Search city</h2>

        <input
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search Dhaka, Tokyo, London..."
          className="w-full max-w-2xl border px-5 py-4 text-xl outline-none focus:border-black"
        />

        {searchText && (
          <div className="mt-4 grid max-w-4xl grid-cols-1 gap-2 md:grid-cols-2">
            {filteredLocations.map((location) => (
              <button
                key={location.city}
                onClick={() => {
                  setSelectedLocation(location);
                  setSearchText("");
                }}
                className="bg-gray-100 p-4 text-left hover:bg-black hover:text-white"
              >
                <h3 className="text-xl font-black">{location.city}</h3>
                <p>{location.country}</p>
                <p className="text-sm opacity-70">{location.timezone}</p>
              </button>
            ))}

            {filteredLocations.length === 0 && (
              <p className="text-gray-500">No city found.</p>
            )}
          </div>
        )}
      </section>

      <section className="mt-10 px-6 md:px-12">
        <h2 className="mb-4 text-2xl font-black">World clocks</h2>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {locations.slice(0, 10).map((location) => (
            <button
              key={location.city}
              onClick={() => setSelectedLocation(location)}
              className={`p-4 text-left transition ${
                selectedLocation.city === location.city
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <h3 className="font-black">{location.city}</h3>
              <p className="text-sm">{location.country}</p>
              <p className="mt-2 text-2xl font-bold">
                {getShortTime(location.timezone, clockFormat === "12")}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-16 bg-[#2d2d2d] px-6 py-12 text-white md:px-12">
        <div className="flex flex-wrap justify-center gap-4">
          {filteredLocations.map((location, index) => (
            <button
              key={location.city}
              onClick={() => setSelectedLocation(location)}
              className={`font-black transition hover:bg-white hover:text-black ${
                selectedLocation.city === location.city
                  ? "bg-white px-3 py-1 text-black"
                  : ""
              } ${
                index % 4 === 0
                  ? "text-4xl md:text-5xl"
                  : "text-xl md:text-2xl"
              }`}
            >
              {location.city}
            </button>
          ))}
        </div>
      </section>

      <footer className="bg-[#2d2d2d] px-6 py-14 text-white md:px-12">
        <h2 className="text-3xl font-black">
          TIME.MR - exact time for any time zone
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <p>Exact time now</p>
          <p>Time here & there</p>
          <p>Your time zone</p>
          <p>Time zones</p>
          <p>Daylight Saving Time</p>
          <p>Clock</p>
          <p>Countdown</p>
          <p>Timer</p>
          <p>Calendar</p>
          <p>UTC</p>
          <p>Unix clock</p>
          <p>Unix time converter</p>
        </div>
      </footer>
    </main>
  );
}