import { createFileRoute, Link } from "@tanstack/react-router";
import { RecipeCook } from "@/components/nourish/RecipeCook";
import { Button } from "@/components/ui/button";
import { pranayamaToSeq, recipeFromPathText } from "@/lib/content";
import { addDays, formatLong } from "@/lib/dates";
import { dayByDate, firstClause } from "@/lib/path";

export const Route = createFileRoute("/path/$date")({
  component: PathDayPage,
});

function PathDayPage() {
  const { date } = Route.useParams();
  const entry = dayByDate(date);
  if (!entry) {
    return (
      <div>
        <h1 className="text-3xl">This day is still gathering</h1>
        <p className="mt-2 text-muted">Return to the Path calendar.</p>
        <Link to="/path" className="mt-4 inline-block text-sage-deep">
          Back to Path
        </Link>
      </div>
    );
  }

  const seqId = pranayamaToSeq[entry.pranayamaId ?? ""] ?? "gratitude";
  const prev = addDays(date, -1);
  const next = addDays(date, 1);
  const recipe = recipeFromPathText(entry.recipe);

  return (
    <div className="space-y-6">
      <p className="font-sans text-[0.68rem] tracking-[0.16em] text-sage-deep uppercase">
        {formatLong(date)} · Breath {entry.breath}
      </p>
      <h1 className="text-3xl">{entry.breathName}</h1>
      <p className="font-serif text-2xl italic leading-snug">“{entry.affirmation}”</p>
      <p className="text-sm italic text-muted">Month: {entry.monthTheme}</p>

      <div className="grid gap-3 sm:grid-cols-2">
        <article className="rounded-xl bg-paper p-4 shadow-[var(--shadow-card)]">
          <p className="font-sans text-[0.65rem] tracking-[0.14em] text-sage-deep uppercase">
            Pranayama
          </p>
          <h2 className="mt-1 text-xl">{firstClause(entry.pranayama)}</h2>
          <p className="mt-1 text-sm text-muted">{entry.pranayama}</p>
        </article>
        <article className="rounded-xl bg-paper p-4 shadow-[var(--shadow-card)]">
          <p className="font-sans text-[0.65rem] tracking-[0.14em] text-sage-deep uppercase">Yoga</p>
          <h2 className="mt-1 text-xl">{firstClause(entry.yoga)}</h2>
          <p className="mt-1 text-sm text-muted">{entry.yoga}</p>
        </article>
      </div>

      <article className="rounded-xl bg-paper p-4 shadow-[var(--shadow-card)]">
        <p className="font-sans text-[0.65rem] tracking-[0.14em] text-sage-deep uppercase">
          Meditation
        </p>
        <p className="mt-2">{entry.meditation}</p>
      </article>
      <article className="rounded-xl bg-paper p-4 shadow-[var(--shadow-card)]">
        <p className="font-sans text-[0.65rem] tracking-[0.14em] text-sage-deep uppercase">
          Ayurveda
        </p>
        <p className="mt-2">{entry.ayurveda}</p>
      </article>
      <article className="rounded-xl bg-paper p-4 shadow-[var(--shadow-card)]">
        <p className="font-sans text-[0.65rem] tracking-[0.14em] text-sage-deep uppercase">
          Reflection
        </p>
        <p className="mt-2 italic">{entry.reflection}</p>
      </article>
      {entry.recipe ? (
        <article className="rounded-xl bg-paper p-4 shadow-[var(--shadow-card)]">
          <p className="font-sans text-[0.65rem] tracking-[0.14em] text-sage-deep uppercase">
            Weekly recipe
          </p>
          {recipe ? (
            <>
              <h2 className="mt-1 text-xl">{recipe.title}</h2>
              <p className="mt-2 text-sm text-muted">{recipe.blurb}</p>
              <p className="mt-2 font-sans text-xs tracking-wide text-muted">
                Serves {recipe.serves} · {recipe.time}
              </p>
              <div className="mt-4">
                <RecipeCook recipe={recipe} />
              </div>
              <Link
                to="/nourish/$recipeId"
                params={{ recipeId: recipe.id }}
                className="mt-4 inline-flex min-h-11 items-center font-sans text-sm text-sage-deep"
              >
                Open in Nourish
              </Link>
            </>
          ) : (
            <p className="mt-2">{entry.recipe}</p>
          )}
        </article>
      ) : null}
      <article className="rounded-xl bg-ivory-warm p-4">
        <p className="font-sans text-[0.65rem] tracking-[0.14em] text-sage-deep uppercase">
          This month’s guiding affirmation
        </p>
        <p className="mt-2 font-serif text-xl italic">“{entry.monthAffirmation}”</p>
      </article>

      <div className="flex flex-wrap gap-2">
        <Button asChild>
          <Link to="/breathe" search={{ seq: seqId }}>
            Practice today’s pranayama
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/journal">Write the reflection</Link>
        </Button>
      </div>

      <div className="flex items-center justify-between pt-2 text-sm">
        <Link to="/path/$date" params={{ date: prev }} className="text-sage-deep">
          Previous day
        </Link>
        <Link to="/path" className="text-muted">
          Calendar
        </Link>
        <Link to="/path/$date" params={{ date: next }} className="text-sage-deep">
          Next day
        </Link>
      </div>
    </div>
  );
}
