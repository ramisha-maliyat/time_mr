"use client";

import { useEffect, useState } from "react";

type SoundType = "tick" | "beep" | "alarm";

export default function SoundPage() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundType, setSoundType] = useState<SoundType>("tick");
  const [volume, setVolume] = useState(40);
  const [savedMessage, setSavedMessage] = useState("");

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

    setSavedMessage("Sound settings saved.");

    setTimeout(() => {
      setSavedMessage("");
    }, 2500);
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
    <main className="page-shell px-4 py-8">
      <section className="container-modern">
        <div className="card-modern mx-auto max-w-6xl overflow-hidden">
          <div className="grid gap-8 bg-[#361B10] px-6 py-10 text-[#EBE4CD] md:grid-cols-[1.25fr_0.75fr] md:px-10 md:py-14">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] opacity-75">
                TIME.MR Settings
              </p>

              <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
                Sound
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 opacity-80 md:text-xl md:leading-8">
                Customise sound alerts for timers, countdowns, and future clock
                tick features.
              </p>
            </div>

            <div className="rounded-[32px] border border-[#EBE4CD]/20 bg-[#EBE4CD]/10 p-6 backdrop-blur">
              <p className="text-sm font-black uppercase tracking-[0.25em] opacity-70">
                Current setup
              </p>

              <h2 className="mt-4 text-4xl font-black">
                {soundEnabled ? "Enabled" : "Muted"}
              </h2>

              <p className="mt-3 text-sm font-bold opacity-75">
                {soundType.toUpperCase()} · Volume {volume}%
              </p>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <section className="rounded-[32px] border border-[#361B10]/10 bg-[#FFF9E8]/80 p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#7A604E]">
                  Options
                </p>

                <h2 className="mt-2 text-3xl font-black text-[#361B10]">
                  Sound settings
                </h2>

                <label className="mt-6 flex cursor-pointer items-center justify-between gap-4 rounded-3xl border border-[#361B10]/10 bg-[#EBE4CD] p-5">
                  <div>
                    <p className="text-xl font-black text-[#361B10]">
                      Enable sound
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#7A604E]">
                      Turn alerts on or off for TIME.MR tools.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={soundEnabled}
                    onChange={(event) => setSoundEnabled(event.target.checked)}
                    className="h-6 w-6 accent-[#361B10]"
                  />
                </label>

                <label className="mt-6 block text-lg font-black text-[#361B10]">
                  Sound type
                  <select
                    value={soundType}
                    onChange={(event) =>
                      setSoundType(event.target.value as SoundType)
                    }
                    className="input-modern mt-3 text-lg font-bold"
                  >
                    <option value="tick">Tick</option>
                    <option value="beep">Beep</option>
                    <option value="alarm">Alarm</option>
                  </select>
                </label>

                <label className="mt-6 block text-lg font-black text-[#361B10]">
                  Volume: {volume}%
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(event) => setVolume(Number(event.target.value))}
                    className="mt-4 block w-full accent-[#361B10]"
                  />
                </label>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button onClick={playTestSound} className="btn-soft">
                    Test sound
                  </button>

                  <button onClick={saveSettings} className="btn-primary">
                    Save settings
                  </button>
                </div>

                {savedMessage && (
                  <p className="mt-5 rounded-2xl bg-[#361B10]/10 px-4 py-3 font-bold text-[#361B10]">
                    {savedMessage}
                  </p>
                )}
              </section>

              <section className="rounded-[32px] bg-[#361B10] p-6 text-[#EBE4CD] shadow-2xl shadow-[#361B10]/20 md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.25em] opacity-70">
                  Preview
                </p>

                <h2 className="mt-2 text-3xl font-black">
                  {soundType === "tick" && "Tick sound"}
                  {soundType === "beep" && "Beep sound"}
                  {soundType === "alarm" && "Alarm sound"}
                </h2>

                <div className="mt-8 grid grid-cols-5 items-end gap-2">
                  {[35, 55, 75, 45, 65].map((height, index) => (
                    <div
                      key={index}
                      className="rounded-full bg-[#EBE4CD]"
                      style={{
                        height: `${Math.max(12, (height * volume) / 100)}px`,
                        opacity: soundEnabled ? 1 : 0.35,
                      }}
                    />
                  ))}
                </div>

                <div className="mt-8 rounded-3xl border border-[#EBE4CD]/20 bg-[#EBE4CD]/10 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.2em] opacity-70">
                    Status
                  </p>

                  <p className="mt-2 text-2xl font-black">
                    {soundEnabled ? "Sound alerts are on" : "Sound alerts are off"}
                  </p>

                  <p className="mt-3 leading-7 opacity-80">
                    Test sound uses the browser Web Audio API. Some browsers may
                    require a click before sound can play.
                  </p>
                </div>
              </section>
            </div>

            <section className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5">
                <h3 className="text-xl font-black text-[#361B10]">
                  Timer
                </h3>

                <p className="mt-2 text-[#7A604E]">
                  Alert when the timer reaches zero.
                </p>
              </div>

              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5">
                <h3 className="text-xl font-black text-[#361B10]">
                  Countdown
                </h3>

                <p className="mt-2 text-[#7A604E]">
                  Alert when a countdown finishes.
                </p>
              </div>

              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5">
                <h3 className="text-xl font-black text-[#361B10]">
                  Clock
                </h3>

                <p className="mt-2 text-[#7A604E]">
                  Optional ticking sound for future clock mode.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}