let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** Soft phase chime — a quiet bell, never startling. */
export function chime(kind: "inhale" | "exhale" | "hold" | "complete") {
  const audio = getCtx();
  if (!audio) return;
  const now = audio.currentTime;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  const freqs = { inhale: 528, exhale: 396, hold: 432, complete: 639 };
  osc.type = "sine";
  osc.frequency.value = freqs[kind];
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(kind === "complete" ? 0.05 : 0.028, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + (kind === "complete" ? 1.4 : 0.55));
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start(now);
  osc.stop(now + 1.6);
}

export function haptic(ms = 12) {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* ignore */
  }
}
