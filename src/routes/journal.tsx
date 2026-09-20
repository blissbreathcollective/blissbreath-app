import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatLong, isoLocal } from "@/lib/dates";
import { todayPathDay } from "@/lib/path";
import { sitWithReflection } from "@/lib/reflect";
import { useSanctuary } from "@/lib/store";

export const Route = createFileRoute("/journal")({ component: JournalPage });

function JournalPage() {
  const path = todayPathDay();
  const today = isoLocal();
  const journal = useSanctuary((s) => s.journal);
  const saveJournal = useSanctuary((s) => s.saveJournal);
  const todayEntry = useMemo(
    () => journal.find((j) => j.date === today && j.prompt === path.reflection),
    [journal, today, path.reflection],
  );
  const [body, setBody] = useState(todayEntry?.body ?? "");
  const [saved, setSaved] = useState(false);
  const [guide, setGuide] = useState<string | null>(null);
  const [guideState, setGuideState] = useState<"idle" | "wait" | "err">("idle");

  function save() {
    saveJournal(path.reflection, body, today);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  }

  async function sit() {
    save();
    setGuideState("wait");
    setGuide(null);
    try {
      const res = await sitWithReflection({
        data: {
          prompt: path.reflection,
          notes: body,
          affirmation: path.affirmation,
        },
      });
      if (res.ok) {
        setGuide(res.text);
        setGuideState("idle");
      } else {
        setGuide(res.error);
        setGuideState("err");
      }
    } catch {
      setGuide("The guide could not arrive just now.");
      setGuideState("err");
    }
  }

  const history = journal.filter((j) => !(j.date === today && j.prompt === path.reflection));

  return (
    <div className="space-y-8">
      <header>
        <p className="font-sans text-[0.68rem] tracking-[0.18em] text-sage-deep uppercase">
          Reflective awareness
        </p>
        <h1 className="mt-1 text-4xl">Integration journal</h1>
        <p className="mt-3 max-w-xl text-muted">
          One prompt. One honest page. Close the loop so insight becomes lifestyle. Presence, not
          performance.
        </p>
      </header>

      <article className="rounded-xl bg-paper p-5 shadow-[var(--shadow-card)]">
        <p className="font-sans text-[0.65rem] tracking-[0.14em] text-sage-deep uppercase">
          {formatLong(today)}
        </p>
        <p className="mt-3 font-serif text-xl italic">“{path.affirmation}”</p>
        <p className="mt-4 text-sm">{path.reflection}</p>
        <label htmlFor="notes" className="mt-5 block font-sans text-sm">
          Notes
        </label>
        <textarea
          id="notes"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={7}
          placeholder="Let the day land here."
          className="mt-2 w-full resize-y rounded-lg bg-ivory p-3 font-sans text-base leading-relaxed shadow-[0_0_0_1px_rgba(47,61,50,0.16)] outline-none focus-visible:shadow-[0_0_0_2px_rgba(107,125,94,0.45)]"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" onClick={save}>
            {saved ? "Held" : "Hold this page"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => void sit()} disabled={guideState === "wait"}>
            {guideState === "wait" ? "Sitting…" : "Sit with this"}
          </Button>
        </div>
        {guide ? (
          <p
            className={`mt-4 text-sm leading-relaxed ${guideState === "err" ? "text-muted" : "font-serif text-lg italic"}`}
          >
            {guide}
          </p>
        ) : null}
      </article>

      {history.length > 0 ? (
        <section>
          <p className="font-sans text-[0.68rem] tracking-[0.16em] text-sage-deep uppercase">
            Earlier pages
          </p>
          <ul className="mt-3 space-y-3">
            {history.slice(0, 24).map((j) => (
              <li key={j.id} className="rounded-xl bg-paper p-4 shadow-[var(--shadow-card)]">
                <p className="font-sans text-xs tracking-wide text-muted">{formatLong(j.date)}</p>
                <p className="mt-1 text-sm italic text-muted">{j.prompt}</p>
                <p className="mt-2 whitespace-pre-wrap text-sm">{j.body}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p className="text-sm text-muted">Your earlier pages will gather here.</p>
      )}
    </div>
  );
}
