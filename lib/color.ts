type Rgb = { r: number; g: number; b: number };

function parseHex(hex: string): Rgb | null {
  const raw = hex.replace("#", "");
  const full =
    raw.length === 3
      ? raw
          .split("")
          .map((c) => c + c)
          .join("")
      : raw;

  if (full.length !== 6) return null;

  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function toHex({ r, g, b }: Rgb) {
  return `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
}

export function darkenHex(hex: string, amount = 0.18) {
  const rgb = parseHex(hex);
  if (!rgb) return hex;

  return toHex({
    r: Math.max(0, Math.round(rgb.r * (1 - amount))),
    g: Math.max(0, Math.round(rgb.g * (1 - amount))),
    b: Math.max(0, Math.round(rgb.b * (1 - amount))),
  });
}

export function isLightColor(hex: string) {
  const rgb = parseHex(hex);
  if (!rgb) return false;
  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 > 170;
}

export function withAlpha(hex: string, alpha: number) {
  const rgb = parseHex(hex);
  if (!rgb) return hex;
  return `rgb(${rgb.r} ${rgb.g} ${rgb.b} / ${alpha})`;
}

export function inkOnColor(hex: string) {
  return isLightColor(hex) ? "#171717" : "#ffffff";
}
