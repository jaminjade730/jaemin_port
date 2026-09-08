"use client";

import { useEffect, useRef, useState } from "react";
import { TRACKS, useBackgroundAudio } from "@/components/audio-provider";

export function IntroAudio() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const {
    track,
    index,
    playing,
    volume,
    toggle,
    step,
    select,
    setVolume,
  } = useBackgroundAudio();

  useEffect(() => {
    if (!open) return;

    const onDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="intro__audio" ref={wrapRef}>
      <button
        type="button"
        className={`intro__sound${playing ? " is-playing" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="배경 음악 설정"
        title={`${track.title} — ${track.artist}`}
      >
        <span className="intro__sound-bars" aria-hidden>
          <i />
          <i />
          <i />
        </span>
      </button>

      {open ? (
        <div className="intro__player" role="group" aria-label="배경 음악">
          <div className="intro__player-now">
            <p className="intro__player-title">{track.title}</p>
            <p className="intro__player-artist">{track.artist}</p>
          </div>

          <div className="intro__player-transport">
            <button type="button" onClick={() => step(-1)} aria-label="이전 곡">
              ‹‹
            </button>
            <button
              type="button"
              className="is-primary"
              onClick={toggle}
              aria-label={playing ? "일시정지" : "재생"}
            >
              {playing ? "❙❙" : "▶"}
            </button>
            <button type="button" onClick={() => step(1)} aria-label="다음 곡">
              ››
            </button>
          </div>

          <label className="intro__player-volume">
            <span>VOL</span>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(volume * 100)}
              onChange={(event) => setVolume(Number(event.target.value) / 100)}
              aria-label="음량"
            />
            <span className="intro__player-volume-value">
              {Math.round(volume * 100)}
            </span>
          </label>

          <ul className="intro__player-list">
            {TRACKS.map((item, i) => (
              <li key={item.src}>
                <button
                  type="button"
                  className={i === index ? "is-active" : undefined}
                  onClick={() => select(i)}
                >
                  <span>{item.title}</span>
                  <em>{item.artist}</em>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
