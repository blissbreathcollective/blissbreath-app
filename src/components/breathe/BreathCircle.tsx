import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  phase: string;
  seconds: number;
  phaseDuration: number;
  running: boolean;
  complete: boolean;
};

function scaleFor(phase: string, running: boolean, complete: boolean): number {
  if (complete) return 1;
  if (!running) return 0.74;
  const p = phase.toLowerCase();
  if (p.includes("inhale")) return 1;
  if (p.includes("exhale")) return 0.72;
  return -1; // hold: keep current
}

export function BreathCircle({ phase, seconds, phaseDuration, running, complete }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const lastScale = useRef(0.74);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const next = scaleFor(phase, running, complete);
    const target = next < 0 ? lastScale.current : next;
    lastScale.current = target;
    const ms = running && !complete ? Math.max(phaseDuration, 0.4) * 1000 : 700;
    el.style.setProperty("--orb-ms", `${ms}ms`);
    el.style.setProperty("--orb-scale", String(target));
  }, [phase, phaseDuration, running, complete]);

  return (
    <div className="relative mx-auto grid place-items-center py-2">
      <div
        className="absolute size-56 rounded-full bg-sage-soft/30 blur-3xl sm:size-72"
        style={{ animation: running ? "breathe-glow 3.4s ease-in-out infinite alternate" : undefined }}
        aria-hidden
      />
      <div
        ref={wrap}
        className={cn(
          "orb relative grid size-44 place-items-center rounded-full sm:size-64",
          "bg-[radial-gradient(circle_at_35%_30%,color-mix(in_oklab,var(--color-sage-soft)_70%,white),var(--color-sage-deep)_62%,var(--color-forest)_100%)]",
          "shadow-[0_20px_50px_rgba(47,61,50,0.22),inset_0_1px_0_rgba(255,252,247,0.35)]",
        )}
        role="img"
        aria-label={running ? `${phase}, ${seconds} seconds` : "Breath ready"}
      >
        <div className="text-center text-paper">
          <p className="font-sans text-xs tracking-widest uppercase opacity-80">
            {complete ? "Complete" : running ? phase : "Ready"}
          </p>
          <p className="mt-1 font-serif text-5xl leading-none tabular-nums sm:text-6xl">
            {String(seconds).padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  );
}
