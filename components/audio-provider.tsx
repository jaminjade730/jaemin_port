"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { connectAudio, playHoverSfx, resumeAudio } from "@/lib/audio-bus";

export type Track = {
  src: string;
  title: string;
  artist: string;
};

export const TRACKS: Track[] = [
  {
    src: "/audio/happy-is.mp3",
    title: "Happy Is",
    artist: "Splitshine feat. Sybil Rose",
  },
  {
    src: "/audio/never-change.mp3",
    title: "Never Change",
    artist: "The Parrisian feat. Parris Fleming",
  },
  {
    src: "/audio/shining.mp3",
    title: "Shining",
    artist: "Leon Albertson feat. Adryon de León",
  },
  {
    src: "/audio/working.mp3",
    title: "Working",
    artist: "Cory Barker feat. Jordan King",
  },
];

const DEFAULT_VOLUME = 0.35;
const FADE_OUT_MS = 700;
const FADE_IN_MS = 900;

type AudioApi = {
  track: Track;
  index: number;
  playing: boolean;
  volume: number;
  toggle: () => void;
  step: (delta: number) => void;
  select: (index: number) => void;
  setVolume: (value: number) => void;
  /** Pause BGM while another media (e.g. YouTube) is audible. */
  duck: () => void;
  /** Resume BGM only if it was paused by duck(). */
  unduck: () => void;
};

const AudioContext = createContext<AudioApi | null>(null);

export function useBackgroundAudio() {
  const value = useContext(AudioContext);
  if (!value) {
    throw new Error("useBackgroundAudio must be used inside AudioProvider");
  }
  return value;
}

// Lives in the root layout so the track keeps playing across route changes.
export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const duckedRef = useRef(false);
  const volumeRef = useRef(DEFAULT_VOLUME);
  const fadeRef = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);

  // start on a random track so repeat visits don't always hear the same song
  useEffect(() => {
    setIndex(Math.floor(Math.random() * TRACKS.length));
  }, []);

  useEffect(() => {
    volumeRef.current = volume;
    const audio = audioRef.current;
    // don't snap volume while a duck fade is in progress
    if (audio && !duckedRef.current && fadeRef.current === null) {
      audio.volume = volume;
    }
  }, [volume]);

  const cancelFade = useCallback(() => {
    if (fadeRef.current !== null) {
      cancelAnimationFrame(fadeRef.current);
      fadeRef.current = null;
    }
  }, []);

  const fadeVolume = useCallback(
    (from: number, to: number, duration: number, onDone?: () => void) => {
      const audio = audioRef.current;
      if (!audio) return;

      cancelFade();
      const start = performance.now();

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = t * t * (3 - 2 * t);
        audio.volume = from + (to - from) * eased;

        if (t < 1) {
          fadeRef.current = requestAnimationFrame(tick);
          return;
        }

        fadeRef.current = null;
        audio.volume = to;
        onDone?.();
      };

      fadeRef.current = requestAnimationFrame(tick);
    },
    [cancelFade],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Browsers block audio autoplay, so fall back to the first user gesture.
    let armed = true;

    const start = () => {
      if (!armed) return;
      connectAudio(audio);
      resumeAudio();
      audio
        .play()
        .then(() => {
          armed = false;
          setPlaying(true);
        })
        .catch(() => {});
    };

    start();

    window.addEventListener("pointerdown", start);
    window.addEventListener("keydown", start);

    return () => {
      armed = false;
      cancelFade();
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
  }, [cancelFade]);

  // light tick on every new hover into a button / link / role=button
  useEffect(() => {
    const isInteractive = (node: EventTarget | null) => {
      if (!(node instanceof Element)) return null;
      return node.closest(
        'button, a, [role="button"], summary, .board-works__link, .intro__link, .intro__cta, .intro__sound, .intro__theme, .profile-cell__action, .case-action__toggle, .case-research__toggle, .case-header__link',
      );
    };

    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      const target = isInteractive(event.target);
      if (!target) return;

      const from = isInteractive(event.relatedTarget);
      if (from === target) return;

      playHoverSfx();
    };

    document.addEventListener("pointerover", onPointerOver);
    return () => document.removeEventListener("pointerover", onPointerOver);
  }, []);

  const step = useCallback((delta: number) => {
    duckedRef.current = false;
    cancelFade();
    setIndex((current) => (current + delta + TRACKS.length) % TRACKS.length);
    setPlaying(true);
  }, [cancelFade]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // manual control cancels any video-driven duck
    duckedRef.current = false;
    cancelFade();
    audio.volume = volumeRef.current;

    if (audio.paused) {
      connectAudio(audio);
      resumeAudio();
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  }, [cancelFade]);

  const duck = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (duckedRef.current && audio.paused) return;

    duckedRef.current = true;
    const from = audio.volume;

    fadeVolume(from, 0, FADE_OUT_MS, () => {
      audio.pause();
      setPlaying(false);
    });
  }, [fadeVolume]);

  const unduck = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !duckedRef.current) return;

    duckedRef.current = false;
    cancelFade();
    connectAudio(audio);
    resumeAudio();

    const target = volumeRef.current;
    audio.volume = 0;

    audio
      .play()
      .then(() => {
        setPlaying(true);
        fadeVolume(0, target, FADE_IN_MS);
      })
      .catch(() => {});
  }, [cancelFade, fadeVolume]);

  const select = useCallback(
    (next: number) => {
      duckedRef.current = false;
      cancelFade();
      if (next === index) {
        toggle();
        return;
      }
      setIndex(next);
      setPlaying(true);
    },
    [index, toggle, cancelFade],
  );

  const value = useMemo<AudioApi>(
    () => ({
      track: TRACKS[index],
      index,
      playing,
      volume,
      toggle,
      step,
      select,
      setVolume,
      duck,
      unduck,
    }),
    [index, playing, volume, toggle, step, select, duck, unduck],
  );

  return (
    <AudioContext.Provider value={value}>
      <audio
        ref={audioRef}
        src={TRACKS[index].src}
        preload="auto"
        onEnded={() => step(1)}
        onLoadedData={(event) => {
          const audio = event.currentTarget;
          if (!duckedRef.current && fadeRef.current === null) {
            audio.volume = volumeRef.current;
          }
          connectAudio(audio);
          if (playing) audio.play().catch(() => {});
        }}
      />
      {children}
    </AudioContext.Provider>
  );
}
