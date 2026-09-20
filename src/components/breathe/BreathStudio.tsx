import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BreathCircle } from "@/components/breathe/BreathCircle";
import { Button } from "@/components/ui/button";
import { chime, haptic } from "@/lib/audio";
import { seqById, sequences, type Sequence } from "@/lib/content";
import { useSanctuary } from "@/lib/store";
import { cn } from "@/lib/utils";

function fmt(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function kindFromPhase(label: string): "inhale" | "exhale" | "hold" {
  const p = label.toLowerCase();
  if (p.includes("exhale")) return "exhale";
  if (p.includes("inhale")) return "inhale";
  return "hold";
}

export function BreathStudio({ initialId }: { initialId?: string }) {
  const fallback = sequences[0];
  const startSeq = (initialId && seqById[initialId]) || fallback;
  const [seq, setSeq] = useState<Sequence>(startSeq);
  const [running, setRunning] = useState(false);
  const [complete, setComplete] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseLeft, setPhaseLeft] = useState(startSeq.phases[0][1]);
  const [totalLeft, setTotalLeft] = useState(startSeq.minutes * 60);
  const chimes = useSanctuary((s) => s.chimes);
  const setChimes = useSanctuary((s) => s.setChimes);
  const logPractice = useSanctuary((s) => s.logPractice);
  const favoriteSeqs = useSanctuary((s) => s.favoriteSeqs);
  const toggleFavSeq = useSanctuary((s) => s.toggleFavSeq);

  const phase = seq.phases[phaseIndex];
  const totalDuration = seq.minutes * 60;
  const elapsed = totalDuration - totalLeft;
  const progress = complete ? 100 : running ? (elapsed / totalDuration) * 100 : 0;

  const runningRef = useRef(false);
  const seqRef = useRef(seq);
  const phaseIndexRef = useRef(0);
  const phaseLeftRef = useRef(startSeq.phases[0][1]);
  const totalLeftRef = useRef(startSeq.minutes * 60);
  const chimesRef = useRef(chimes);

  useEffect(() => {
    seqRef.current = seq;
  }, [seq]);
  useEffect(() => {
    chimesRef.current = chimes;
  }, [chimes]);

  const reset = useCallback((next: Sequence) => {
    setSeq(next);
    setRunning(false);
    setComplete(false);
    setPhaseIndex(0);
    setPhaseLeft(next.phases[0][1]);
    setTotalLeft(next.minutes * 60);
    runningRef.current = false;
    seqRef.current = next;
    phaseIndexRef.current = 0;
    phaseLeftRef.current = next.phases[0][1];
    totalLeftRef.current = next.minutes * 60;
  }, []);

  useEffect(() => {
    if (initialId && seqById[initialId] && seqById[initialId].id !== seq.id && !running) {
      reset(seqById[initialId]);
    }
  }, [initialId, reset, running, seq.id]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      if (!runningRef.current) return;
      const current = seqRef.current;
      let pLeft = phaseLeftRef.current - 1;
      let tLeft = totalLeftRef.current - 1;
      let pIndex = phaseIndexRef.current;

      if (tLeft < 0) {
        runningRef.current = false;
        setRunning(false);
        setComplete(true);
        setPhaseLeft(0);
        setTotalLeft(0);
        if (chimesRef.current) chime("complete");
        haptic(24);
        logPractice({ sequenceId: current.id, minutes: current.minutes, completed: true });
        return;
      }

      if (pLeft <= 0) {
        pIndex = (pIndex + 1) % current.phases.length;
        pLeft = current.phases[pIndex][1];
        phaseIndexRef.current = pIndex;
        setPhaseIndex(pIndex);
        if (chimesRef.current) chime(kindFromPhase(current.phases[pIndex][0]));
        haptic(10);
      }

      phaseLeftRef.current = pLeft;
      totalLeftRef.current = tLeft;
      setPhaseLeft(pLeft);
      setTotalLeft(tLeft);
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, logPractice]);

  const start = () => {
    const next = seq;
    setComplete(false);
    setPhaseIndex(0);
    setPhaseLeft(next.phases[0][1]);
    setTotalLeft(next.minutes * 60);
    phaseIndexRef.current = 0;
    phaseLeftRef.current = next.phases[0][1];
    totalLeftRef.current = next.minutes * 60;
    runningRef.current = true;
    setRunning(true);
    if (chimes) chime("inhale");
    haptic(16);
  };

  const stop = () => {
    runningRef.current = false;
    setRunning(false);
    if (!complete) {
      logPractice({
        sequenceId: seq.id,
        minutes: Math.max(1, Math.round((seq.minutes * 60 - totalLeft) / 60)),
        completed: false,
      });
    }
    reset(seq);
  };

  const featured = useMemo(
    () => sequences.filter((s) => ["gratitude", "box", "energy", "coherence", "soothe", "nadi"].includes(s.id)),
    [],
  );
  const more = useMemo(
    () => sequences.filter((s) => !featured.some((f) => f.id === s.id)),
    [featured],
  );

  return (
    <div>
      <BreathCircle
        phase={phase[0]}
        seconds={complete ? 0 : phaseLeft}
        phaseDuration={phase[1]}
        running={running}
        complete={complete}
      />

      <div className="text-center">
        <p className="font-sans text-xs tracking-widest text-sage-deep uppercase">
          {seq.intention}
        </p>
        <h2 className="mt-1 text-3xl">{seq.name}</h2>
        <p className="mt-1 font-sans text-sm text-muted">
          {seq.pattern} · {seq.minutes} min
        </p>
      </div>

      <div className="mx-auto mt-4 h-1 max-w-xs overflow-hidden rounded-full bg-sand">
        <div
          className="h-full rounded-full bg-sage-deep transition-[width] duration-200 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-center font-sans text-sm tabular-nums text-muted">
        {complete ? "Session complete — hold today’s affirmation once more" : `${fmt(totalLeft)} remaining`}
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {!running && !complete ? (
          <Button onClick={start}>Start {seq.minutes} min</Button>
        ) : complete ? (
          <Button onClick={() => reset(seq)}>Practice again</Button>
        ) : (
          <Button variant="ghost" onClick={stop}>
            Stop
          </Button>
        )}
        <Button variant="ghost" type="button" onClick={() => setChimes(!chimes)}>
          {chimes ? "Chimes on" : "Chimes off"}
        </Button>
      </div>

      <p className="mx-auto mt-5 max-w-md text-center text-sm text-muted">{seq.blurb}</p>

      <div className="mt-3 flex justify-center">
        <Button variant="quiet" type="button" onClick={() => toggleFavSeq(seq.id)}>
          {favoriteSeqs.includes(seq.id) ? "Saved" : "Save sequence"}
        </Button>
      </div>

      <p className="mt-8 font-sans text-[0.68rem] tracking-[0.16em] text-sage-deep uppercase">
        Choose a sequence
      </p>
      <div className="mt-3 grid gap-3">
        {featured.map((s) => (
          <button
            key={s.id}
            type="button"
            disabled={running}
            onClick={() => reset(s)}
            className={cn(
              "rounded-xl bg-paper p-4 text-left shadow-[var(--shadow-card)] transition-[box-shadow] duration-150",
              s.id === seq.id && "shadow-[0_0_0_1px_var(--color-sage-deep),0_14px_40px_rgba(47,61,50,0.08)]",
            )}
          >
            <p className="font-sans text-[0.68rem] tracking-[0.14em] text-sage-deep uppercase">
              {s.intention} · {s.pattern}
            </p>
            <h3 className="mt-1 text-xl">{s.name}</h3>
            <p className="mt-1 text-sm text-muted">{s.blurb}</p>
          </button>
        ))}
      </div>
      {more.length > 0 ? (
        <details className="mt-4">
          <summary className="cursor-pointer font-sans text-sm text-sage-deep">More sequences</summary>
          <div className="mt-3 grid gap-3">
            {more.map((s) => (
              <button
                key={s.id}
                type="button"
                disabled={running}
                onClick={() => reset(s)}
                className={cn(
                  "rounded-xl bg-paper p-4 text-left shadow-[var(--shadow-card)]",
                  s.id === seq.id && "shadow-[0_0_0_1px_var(--color-sage-deep)]",
                )}
              >
                <h3 className="text-lg">{s.name}</h3>
                <p className="mt-1 text-sm text-muted">{s.blurb}</p>
              </button>
            ))}
          </div>
        </details>
      ) : null}
    </div>
  );
}
