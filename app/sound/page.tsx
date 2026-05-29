"use client";

import { useEffect, useState } from "react";

type SoundType = "tick" | "beep" | "alarm";

export default function SoundPage() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundType, setSoundType] = useState<SoundType>("tick");
  const [volume, setVolume] = useState(40);

  useEffect(() => {
    const savedEnabled = localStorage.getItem("time_mr_sound_enabled");
    const savedType = localStorage.getItem("time_mr_sound_type");
    const savedVolume = localStorage.getItem("time_mr_sound_volume");

    if (savedEnabled) setSoundEnabled(savedEnabled === "true");
    if (savedType === "tick" || savedType === "beep" || savedType === "alarm") {
      setSoundType(savedType);
    }
    if (savedVolume) setVolume(Number(savedVolume));
  }, []);

  function saveSettings() {
    localStorage.setItem("time_mr_sound_enabled", String(soundEnabled));
    localStorage.setItem("time_mr_sound_type", soundType);
    localStorage.setItem("time_mr_sound_volume", String(volume));

    alert("Sound settings saved");
  }

  function playTestSound() {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (soundType === "tick") {
      oscillator.frequency.value = 800;
      oscillator.type = "square";
    }

    if (soundType === "beep") {
      oscillator.frequency.value = 500;
      oscillator.type = "sine";
    }

    if (soundType === "alarm") {
      oscillator.frequency.value = 1000;
      oscillator.type = "sawtooth";
    }

    gainNode.gain.value = volume / 100;

    oscillator.start();

    setTimeout(() => {
      oscillator.stop();
      audioContext.close();
    }, soundType === "alarm" ? 600 : 200);
  }

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-[#2b2b2b] md:px-12">
      <section className="mx-auto mt-10 max-w-4xl">
        <h1 className="text-5xl font-black">Sound</h1>

        <p className="mt-4 text-xl text-gray-600">
          Customise sound alerts for timers, countdowns, and clock ticks.
        </p>

        <div className="mt-10 space-y-8 bg-gray-100 p-6">
          <label className="flex items-center gap-3 text-xl font-black">
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(event) => setSoundEnabled(event.target.checked)}
              className="h-5 w-5"
            />
            Enable sound
          </label>

          <label className="block text-xl font-black">
            Sound type
            <select
              value={soundType}
              onChange={(event) => setSoundType(event.target.value as SoundType)}
              className="mt-2 block w-full border bg-white px-4 py-3 font-medium"
            >
              <option value="tick">Tick</option>
              <option value="beep">Beep</option>
              <option value="alarm">Alarm</option>
            </select>
          </label>

          <label className="block text-xl font-black">
            Volume: {volume}%
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              className="mt-4 block w-full"
            />
          </label>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={playTestSound}
              className="bg-gray-200 px-8 py-4 font-black hover:bg-gray-300"
            >
              Test sound
            </button>

            <button
              onClick={saveSettings}
              className="bg-black px-8 py-4 font-black text-white"
            >
              Save settings
            </button>
          </div>
        </div>

        <div className="mt-8 bg-[#2d2d2d] p-6 text-white">
          <h2 className="text-2xl font-black">How it will be used</h2>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-lg">
            <li>Timer alert when timer reaches zero</li>
            <li>Countdown alert when countdown finishes</li>
            <li>Optional clock tick sound for future clock mode</li>
          </ul>
        </div>
      </section>
    </main>
  );
}