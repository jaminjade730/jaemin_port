"use client";

import { useEffect, useRef } from "react";
import { readLevels } from "@/lib/audio-bus";

const SPACING = 26;
const JITTER = 0.42;
const BASE_RADIUS = 1.6;
const POINTER_RADIUS = 210;
const POINTER_PUSH = 22;
const POINTER_EASE = 0.14;

type Dot = {
  x: number;
  y: number;
  seed: number;
  phase: number;
};

// Cheap value noise: enough irregularity without a full simplex implementation.
const hash = (x: number, y: number) => {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
};

export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let frame = 0;
    let dots: Dot[] = [];

    let targetX = -9999;
    let targetY = -9999;
    let pointerX = -9999;
    let pointerY = -9999;
    let pointerActive = false;

    // Scattered grid: jittered so there are no visible rows or rings.
    const build = () => {
      const next: Dot[] = [];
      const cols = Math.ceil(width / SPACING) + 2;
      const rows = Math.ceil(height / SPACING) + 2;

      for (let j = -1; j < rows; j += 1) {
        for (let i = -1; i < cols; i += 1) {
          const jx = hash(i, j) - 0.5;
          const jy = hash(i + 91, j + 17) - 0.5;
          const keep = hash(i + 41, j + 73);

          // drop a few so the density reads organic rather than tiled
          if (keep > 0.93) continue;

          next.push({
            x: (i + 0.5 + jx * JITTER * 2) * SPACING,
            y: (j + 0.5 + jy * JITTER * 2) * SPACING,
            seed: keep,
            phase: hash(i + 7, j + 3) * Math.PI * 2,
          });
        }
      }

      dots = next;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const draw = (time: number) => {
      const { bass, mid, treble, energy } = readLevels();

      ctx.clearRect(0, 0, width, height);

      const ink =
        document.documentElement.dataset.theme === "light"
          ? "16, 16, 16"
          : "255, 255, 255";

      const cx = width / 2;
      const cy = height / 2;
      const clearRadius = Math.min(width, height) * 0.3;

      const t = time * 0.001;
      const drift = 4 + mid * 26;

      for (const dot of dots) {
        // Three sine layers at unrelated frequencies read as wandering drift,
        // never as a repeating orbit.
        const nx =
          Math.sin(dot.x * 0.006 + dot.y * 0.004 + t * 0.31 + dot.phase) +
          Math.sin(dot.y * 0.011 - t * 0.19) * 0.6 +
          Math.sin(dot.x * 0.017 + t * 0.11) * 0.35;
        const ny =
          Math.cos(dot.y * 0.007 - dot.x * 0.005 + t * 0.26 + dot.phase) +
          Math.cos(dot.x * 0.013 + t * 0.23) * 0.6 +
          Math.cos(dot.y * 0.019 - t * 0.14) * 0.35;

        let dx = nx * drift;
        let dy = ny * drift;

        // bass shoves everything gently away from the middle, then releases
        const ax = dot.x - cx;
        const ay = dot.y - cy;
        const away = Math.hypot(ax, ay) || 1;
        const kick = bass * 26 * Math.sin(away * 0.008 - t * 1.5);
        dx += (ax / away) * kick;
        dy += (ay / away) * kick;

        const x = dot.x + dx;
        const y = dot.y + dy;

        if (x < -20 || x > width + 20 || y < -20 || y > height + 20) continue;

        // treble makes individual dots flicker on their own phase
        const shimmer =
          0.62 +
          0.38 * Math.sin(t * 3.4 + dot.seed * 42) * (0.3 + treble * 1.4);

        // fade out near the centre so the headline stays readable
        const dist = Math.hypot(x - cx, (y - cy) * 1.6);
        const centerFade = Math.min(1, dist / clearRadius);

        let strength =
          (0.38 + energy * 1.05) * shimmer * centerFade * (0.6 + dot.seed * 0.6);
        let px = 0;
        let py = 0;
        let glow = 0;

        if (pointerActive) {
          const pdx = x - pointerX;
          const pdy = y - pointerY;
          const pDist = Math.hypot(pdx, pdy);
          if (pDist < POINTER_RADIUS) {
            const falloff = 1 - pDist / POINTER_RADIUS;
            const push = falloff * falloff;
            const pAngle = Math.atan2(pdy, pdx);
            glow = push;
            strength = Math.min(1.6, strength + push * 0.8);
            px = Math.cos(pAngle) * push * POINTER_PUSH;
            py = Math.sin(pAngle) * push * POINTER_PUSH;
          }
        }

        if (strength < 0.05) continue;

        ctx.beginPath();
        ctx.arc(x + px, y + py, BASE_RADIUS * strength, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ink}, ${Math.min(
          0.9,
          0.12 + strength * 0.5 + glow * 0.12,
        )})`;
        ctx.fill();
      }
    };

    const loop = (time: number) => {
      if (pointerActive) {
        pointerX += (targetX - pointerX) * POINTER_EASE;
        pointerY += (targetY - pointerY) * POINTER_EASE;
      }

      draw(time);
      frame = requestAnimationFrame(loop);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;

      if (!pointerActive) {
        pointerActive = true;
        pointerX = targetX;
        pointerY = targetY;
      }

      if (reduceMotion) {
        pointerX = targetX;
        pointerY = targetY;
        draw(0);
      }
    };

    const onPointerLeave = () => {
      pointerActive = false;
      if (reduceMotion) draw(0);
    };

    const onResize = () => {
      resize();
      if (reduceMotion) draw(0);
    };

    resize();
    if (reduceMotion) {
      draw(0);
    } else {
      frame = requestAnimationFrame(loop);
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("blur", onPointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="intro__dots" aria-hidden />;
}
