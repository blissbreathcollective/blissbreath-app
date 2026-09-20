import { useEffect, useRef, useState, type FormEvent } from "react";
import { BreathMark } from "@/components/brand/Wordmark";
import { Button } from "@/components/ui/button";
import { GATE_STORAGE_KEY, unlockSanctuary } from "@/lib/gate";

export function GateLanding({ onOpened }: { onOpened: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [word, setWord] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await unlockSanctuary({ data: { password: word } });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      try {
        localStorage.setItem(GATE_STORAGE_KEY, "1");
      } catch {
        /* private mode */
      }
      onOpened();
    } catch {
      setError("The door is quiet just now. Try once more.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="relative min-h-dvh overflow-hidden bg-forest text-paper">
      <img
        src="/images/sanctuary-hero.jpg"
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/55 to-forest/25" />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-lg flex-col justify-end px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-[calc(2rem+env(safe-area-inset-top))]">
        <div className="stagger-in rounded-xl bg-paper p-6 text-forest shadow-[var(--shadow-card)] sm:p-8">
          <div className="flex items-center gap-2.5">
            <BreathMark />
            <p className="font-sans text-[0.68rem] tracking-[0.18em] text-sage-deep uppercase">
              Private sanctuary
            </p>
          </div>
          <h1 className="mt-4 text-4xl text-forest sm:text-5xl">Breathe into Bliss</h1>
          <p className="mt-3 text-sm text-muted">
            This house is closed to the street. Enter with the word you were given.
          </p>

          <form className="mt-6 space-y-3" onSubmit={onSubmit}>
            <label htmlFor="invitation-word" className="block font-sans text-sm">
              Invitation word
            </label>
            <input
              ref={inputRef}
              id="invitation-word"
              name="password"
              type="password"
              autoComplete="current-password"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              required
              value={word}
              onChange={(e) => {
                setWord(e.target.value);
                if (error) setError(null);
              }}
              placeholder="The word"
              className="h-12 w-full rounded-lg bg-ivory px-3 text-forest shadow-[0_0_0_1px_rgba(47,61,50,0.16)] outline-none placeholder:text-muted/70 focus-visible:shadow-[0_0_0_2px_rgba(107,125,94,0.45)]"
            />
            {error ? (
              <p className="text-sm text-forest" role="alert">
                {error}
              </p>
            ) : null}
            <Button type="submit" size="lg" className="w-full" disabled={pending}>
              {pending ? "Opening…" : "Enter the sanctuary"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
