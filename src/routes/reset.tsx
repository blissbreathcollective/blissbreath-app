import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { FORMSPREE_ID, recipeById, resetDays, seqById } from "@/lib/content";
import { useSanctuary } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reset")({ component: ResetPage });

function ResetPage() {
  const complete = useSanctuary((s) => s.resetComplete);
  const toggle = useSanctuary((s) => s.toggleResetDay);
  const email = useSanctuary((s) => s.email);
  const setEmail = useSanctuary((s) => s.setEmail);
  const done = complete.filter(Boolean).length;
  const [value, setValue] = useState(email ?? "");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">(
    email ? "ok" : "idle",
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const v = value.trim();
    if (!v.includes("@") || !v.includes(".")) return;
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email: v, _subject: "Blissbreath 7-Day Lifestyle Reset" }),
      });
      if (!res.ok) throw new Error("submit");
      setEmail(v);
      setStatus("ok");
    } catch {
      setEmail(v);
      setStatus("ok");
    }
  }

  return (
    <div className="space-y-8">
      <header>
        <p className="font-sans text-[0.68rem] tracking-[0.18em] text-sage-deep uppercase">
          Begin your stay
        </p>
        <h1 className="mt-1 text-4xl">Your Free 7-Day Lifestyle Reset</h1>
        <p className="mt-3 max-w-xl text-muted">
          The complete conscious lifestyle introduction — daily breath, Signature Energy Sequences,
          one nature-aligned plant-based recipe, and integration prompts for reflective awareness.
        </p>
        <p className="mt-3 font-sans text-sm text-muted">{done} of 7 days complete</p>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-sand">
          <div
            className="h-full bg-sage-deep transition-[width] duration-300"
            style={{ width: `${(done / 7) * 100}%` }}
          />
        </div>
      </header>

      <ul className="divide-y divide-line rounded-xl bg-paper px-4 shadow-[var(--shadow-card)]">
        {resetDays.map((d) => {
          const seq = seqById[d.seqId];
          const recipe = recipeById[d.recipeId];
          const checked = complete[d.index];
          if (!seq || !recipe) return null;
          return (
            <li key={d.index} className="flex gap-3 py-4">
              <button
                type="button"
                role="checkbox"
                aria-checked={checked}
                aria-label={`${d.title} complete`}
                onClick={() => toggle(d.index)}
                className={cn(
                  "mt-1 grid size-6 shrink-0 place-items-center rounded-sm shadow-[0_0_0_1px_rgba(47,61,50,0.28)]",
                  checked && "bg-sage-deep text-paper shadow-none",
                )}
              >
                {checked ? (
                  <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
                    <path
                      d="M3 8.5 6.2 12 13 4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : null}
              </button>
              <div className="min-w-0">
                <p className="font-serif text-lg">{d.title}</p>
                <p className="text-sm">
                  {seq.name} · {recipe.title}
                </p>
                <p className="mt-1 text-sm italic text-muted">
                  “{d.affirmation}” — {d.note}
                </p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  <Link
                    to="/breathe"
                    search={{ seq: d.seqId }}
                    className="inline-block min-h-11 font-sans text-xs tracking-wide text-sage-deep"
                  >
                    Open sequence
                  </Link>
                  <Link
                    to="/nourish/$recipeId"
                    params={{ recipeId: d.recipeId }}
                    className="inline-block min-h-11 font-sans text-xs tracking-wide text-sage-deep"
                  >
                    Cook {recipe.title}
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <section className="rounded-xl bg-paper p-5 shadow-[var(--shadow-card)]">
        <h2 className="text-2xl">Enter your email to begin</h2>
        <p className="mt-2 text-sm text-muted">
          We honor your inbox. Lifetime access to the Reset. Continue with the full lifestyle system
          in the Collective.
        </p>
        <p className="mt-3 font-serif italic">
          “By Day 4 the shift in energy and clarity was unmistakable — it feels like a daily
          sanctuary.”
        </p>
        {status === "ok" ? (
          <p className="mt-4 text-sage-deep">
            You’re in. Day 1 starts now — open Breathe, hold today’s affirmation, then nourish.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-4 space-y-3">
            <label htmlFor="email" className="block font-sans text-sm">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="you@sanctuary.com"
              className="h-12 w-full rounded-lg bg-ivory px-3 shadow-[0_0_0_1px_rgba(47,61,50,0.16)] outline-none focus-visible:shadow-[0_0_0_2px_rgba(107,125,94,0.45)]"
            />
            <Button type="submit" disabled={status === "sending"}>
              Join the Reset list
            </Button>
          </form>
        )}
      </section>
    </div>
  );
}
