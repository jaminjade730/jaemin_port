"use client";

import { useEffect, useId, useRef } from "react";
import { useBackgroundAudio } from "@/components/audio-provider";

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        config: {
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number; target: YTPlayer }) => void;
          };
        },
      ) => YTPlayer;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

type YTPlayer = {
  destroy: () => void;
};

const YT_PLAYING = 1;
const YT_PAUSED = 2;
const YT_ENDED = 0;

let apiPromise: Promise<void> | null = null;

function loadYouTubeApi() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();

  apiPromise ??= new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
    }
  });

  return apiPromise;
}

export function CaseYouTube({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const reactId = useId().replace(/:/g, "");
  const elementId = `yt-${reactId}`;
  const playerRef = useRef<YTPlayer | null>(null);
  const { duck, unduck } = useBackgroundAudio();

  useEffect(() => {
    let cancelled = false;

    loadYouTubeApi().then(() => {
      if (cancelled || !window.YT?.Player) return;

      playerRef.current = new window.YT.Player(elementId, {
        events: {
          onStateChange: (event) => {
            if (event.data === YT_PLAYING) {
              duck();
              return;
            }
            if (event.data === YT_PAUSED || event.data === YT_ENDED) {
              unduck();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      unduck();
      try {
        playerRef.current?.destroy();
      } catch {
        // player may already be gone with the iframe
      }
      playerRef.current = null;
    };
  }, [elementId, duck, unduck]);

  return (
    <iframe
      id={elementId}
      src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className="case-media__video"
    />
  );
}
