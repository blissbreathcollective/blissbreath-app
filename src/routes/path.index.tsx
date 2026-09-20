import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { daysInMonth, isoLocal, monthLabel } from "@/lib/dates";
import { dayByDate, pathYear, todayPathDay } from "@/lib/path";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/path/")({ component: PathPage });

function PathPage() {
  const today = isoLocal();
  const pathToday = todayPathDay();
  const initial = pathToday.date;
  const [year] = useState(2026);
  const [month, setMonth] = useState(() => Number(initial.slice(5, 7)));

  const cells = useMemo(() => {
    const first = new Date(year, month - 1, 1).getDay();
    const count = daysInMonth(year, month);
    const blanks = Array.from({ length: first }, () => null);
    const days = Array.from({ length: count }, (_, i) => {
      const iso = `${year}-${String(month).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
      return { iso, day: i + 1, entry: dayByDate(iso) };
    });
    return [...blanks, ...days];
  }, [year, month]);

  const theme = pathYear.months[String(month)];

  return (
    <div className="space-y-8">
      <header>
        <p className="font-sans text-[0.68rem] tracking-[0.18em] text-sage-deep uppercase">
          Bliss Breath Life 2026
        </p>
        <h1 className="mt-1 text-4xl">The Eight Breaths on the Path to a Blissful Life</h1>
        <p className="mt-3 max-w-xl text-muted">
          Dear Bliss Seeker — your daily companion: affirmation, pranayama, yoga, Ayurveda, and
          reflection. Bliss is not something you chase — it is something you breathe into, moment by
          moment.
        </p>
      </header>

      <article className="rounded-xl bg-paper p-5 shadow-[var(--shadow-card)]">
        <p className="font-sans text-[0.68rem] tracking-[0.16em] text-sage-deep uppercase">
          Today · {pathToday.breathName}
        </p>
        <p className="mt-3 font-serif text-2xl italic leading-snug">“{pathToday.affirmation}”</p>
        <p className="mt-3 text-sm text-muted">{pathToday.pranayama}</p>
        <div className="mt-4">
          <Link
            to="/path/$date"
            params={{ date: pathToday.date }}
            className="font-sans text-sm font-medium text-sage-deep"
          >
            Open today’s full practice
          </Link>
        </div>
      </article>

      <section>
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            className="min-h-11 min-w-11 font-sans text-sm text-sage-deep"
            onClick={() => setMonth((m) => (m === 1 ? 12 : m - 1))}
            aria-label="Previous month"
          >
            Previous
          </button>
          <h2 className="text-2xl">{monthLabel(year, month)}</h2>
          <button
            type="button"
            className="min-h-11 min-w-11 font-sans text-sm text-sage-deep"
            onClick={() => setMonth((m) => (m === 12 ? 1 : m + 1))}
            aria-label="Next month"
          >
            Next
          </button>
        </div>
        {theme ? (
          <p className="mt-2 text-center text-sm italic text-muted">“{theme.affirmation}”</p>
        ) : null}

        <div className="mt-4 grid grid-cols-7 gap-1 text-center font-sans text-[0.65rem] tracking-wide text-muted">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={`${d}-${i}`} className="py-1">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((cell, i) =>
            cell ? (
              <Link
                key={cell.iso}
                to="/path/$date"
                params={{ date: cell.iso }}
                className={cn(
                  "grid min-h-11 place-items-center rounded-md bg-paper font-sans text-sm no-underline text-forest shadow-[0_0_0_1px_rgba(47,61,50,0.06)]",
                  cell.iso === today && "bg-sage-deep text-paper",
                  !cell.entry && "opacity-40",
                )}
              >
                {cell.day}
              </Link>
            ) : (
              <div key={`b-${i}`} />
            ),
          )}
        </div>
      </section>

      <section>
        <p className="font-sans text-[0.68rem] tracking-[0.16em] text-sage-deep uppercase">
          The Eight Breaths
        </p>
        <div className="mt-3 grid gap-3">
          {pathYear.breaths.map((b) => (
            <article key={b.number} className="rounded-xl bg-paper p-4 shadow-[var(--shadow-card)]">
              <p className="font-sans text-[0.65rem] tracking-[0.14em] text-sage-deep uppercase">
                Breath {b.number}
              </p>
              <h3 className="mt-1 text-xl">{b.name}</h3>
              <p className="mt-1 text-sm text-muted">{b.essence}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
