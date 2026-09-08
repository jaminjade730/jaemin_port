// Shares one analyser between the <audio> player and the canvas visualiser.
// The player owns the element; the visualiser only reads levels each frame.

export type AudioLevels = {
  bass: number;
  mid: number;
  treble: number;
  energy: number;
};

type Ctor = typeof AudioContext;

let context: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let bins: Uint8Array<ArrayBuffer> | null = null;
let current: HTMLAudioElement | null = null;

// an element can only ever back one MediaElementSource, so cache per element
const sources = new WeakMap<HTMLAudioElement, MediaElementAudioSourceNode>();

const smoothed: AudioLevels = { bass: 0, mid: 0, treble: 0, energy: 0 };

export function connectAudio(element: HTMLAudioElement) {
  if (current === element) return;

  const Ctx: Ctor | undefined =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: Ctor }).webkitAudioContext;
  if (!Ctx) return;

  try {
    context ??= new Ctx();

    if (!analyser) {
      analyser = context.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.82;
      // routing through the analyser means we must reconnect the output ourselves
      analyser.connect(context.destination);
      bins = new Uint8Array(analyser.frequencyBinCount);
    }

    // the player remounts on route changes, so hand the analyser the new element
    if (current) sources.get(current)?.disconnect();

    let source = sources.get(element);
    if (!source) {
      source = context.createMediaElementSource(element);
      sources.set(element, source);
    }

    source.connect(analyser);
    current = element;
  } catch {
    current = null;
  }
}

export function resumeAudio() {
  if (context?.state === "suspended") void context.resume();
}

function ensureContext() {
  if (context) return context;

  const Ctx: Ctor | undefined =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: Ctor }).webkitAudioContext;
  if (!Ctx) return null;

  try {
    context = new Ctx();
    return context;
  } catch {
    return null;
  }
}

/** Soft low tick for interactive hover — more “톡” than a bright blip. */
export function playHoverSfx() {
  const ctx = ensureContext();
  if (!ctx) return;

  if (ctx.state === "suspended") void ctx.resume();

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  // low muted tick: short sine + lowpass so it reads as 톡/틱, not 뿅
  osc.type = "sine";
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(110, now + 0.045);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(480, now);
  filter.Q.setValueAtTime(0.7, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.055, now + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

  osc.connect(filter);
  filter.connect(gain);
  // keep SFX off the analyser path so dots don't react to every hover
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.06);
}

const average = (from: number, to: number) => {
  if (!bins) return 0;
  let sum = 0;
  for (let i = from; i < to; i += 1) sum += bins[i];
  return sum / (to - from) / 255;
};

export function readLevels(): AudioLevels {
  if (!analyser || !bins) return smoothed;

  analyser.getByteFrequencyData(bins);

  const count = bins.length;
  const bass = average(0, Math.floor(count * 0.08));
  const mid = average(Math.floor(count * 0.08), Math.floor(count * 0.35));
  const treble = average(Math.floor(count * 0.35), count);

  // extra easing on top of the analyser's own smoothing keeps motion fluid
  smoothed.bass += (bass - smoothed.bass) * 0.18;
  smoothed.mid += (mid - smoothed.mid) * 0.14;
  smoothed.treble += (treble - smoothed.treble) * 0.2;
  smoothed.energy +=
    (bass * 0.5 + mid * 0.35 + treble * 0.15 - smoothed.energy) * 0.12;

  return smoothed;
}
