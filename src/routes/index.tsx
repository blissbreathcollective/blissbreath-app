import { createFileRoute, Link } from "@tanstack/react-router";
import { recipeById, recipeFromPathText, rooms, seqById, week } from "@/lib/content";
import { formatLong, isoLocal } from "@/lib/dates";
import { scoreAnswers, seasonNote, readable } from "@/lib/dosha";
import { firstClause, todayPathDay } from "@/lib/path";
import { useSanctuary } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const today = isoLocal();
  const path = todayPathDay();
  const weekday = new Date().getDay();
  const rhythm = week[weekday];
  const seq = seqById[rhythm.seqId];
  const recipe = recipeById[rhythm.recipeId];
  const pathRecipe = recipeFromPathText(path.recipe) ?? recipe;
  const streak = useSanctuary((s) => s.streak);
  const totalMinutes = useSanctuary((s) => s.totalMinutes);

  return (
    <div className="stagger-in space-y-8">
      <section className="overflow-hidden rounded-xl shadow-[var(--shadow-card)]">
        <div className="relative min-h-72">
          <img
            src="/images/sanctuary-hero.jpg"
            alt="Linen sanctuary opening onto the Pacific at dawn"
            className="absolute inset-0 size-full object-cover outline outline-1 -outline-offset-1 outline-forest/10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/35 to-forest/10" />
          <div className="relative flex min-h-72 flex-col justify-end p-6 text-paper">
            <p className="font-sans text-[0.68rem] tracking-[0.2em] uppercase text-sage-soft">
              The Complete Conscious Lifestyle
            </p>
            <h1 className="mt-2 text-4xl text-paper sm:text-5xl">Breathe into Bliss</h1>
            <p className="mt-2 max-w-md text-sm text-paper/85">
              You’ve arrived. A quieter way to live. Breath, movement, mindset, and nature-aligned
              nourishment — unhurried, sensory, held.
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        <span className="rounded-pill bg-sand px-3 py-1.5 font-sans text-xs tracking-wide text-forest">
          {streak > 0 ? `${streak}-day streak` : "Begin a streak"}
        </span>
        <span className="rounded-pill bg-sand px-3 py-1.5 font-sans text-xs tracking-wide text-forest">
          {totalMinutes} minutes practiced
        </span>
        <DoshaChip />
      </div>

      <article className="rounded-xl bg-paper p-5 shadow-[var(--shadow-card)]">
        <p className="font-sans text-[0.68rem] tracking-[0.16em] text-sage-deep uppercase">
          {formatLong(today)} · today’s rhythm
        </p>
        <p className="mt-3 font-serif text-2xl italic leading-snug">“{path.affirmation}”</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-ivory-warm p-3">
            <p className="font-sans text-[0.65rem] tracking-[0.14em] text-sage-deep uppercase">Breath</p>
            <p className="mt-1 font-serif text-lg">{firstClause(path.pranayama, 42)}</p>
            <p className="mt-1 text-sm text-muted">{path.pranayama}</p>
          </div>
          <Link
            to="/nourish/$recipeId"
            params={{ recipeId: pathRecipe.id }}
            className="rounded-lg bg-ivory-warm p-3 no-underline"
          >
            <p className="font-sans text-[0.65rem] tracking-[0.14em] text-sage-deep uppercase">Nourish</p>
            <p className="mt-1 font-serif text-lg text-forest">
              {pathRecipe.title}
            </p>
            <p className="mt-1 text-sm text-muted">{path.ayurveda}</p>
          </Link>
        </div>
        <div className="mt-5 flex flex-wrap gap-2 pb-2">
          <Button asChild>
            <Link to="/breathe" search={{ seq: path.pranayamaId || rhythm.seqId }}>
              Start today’s breath
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/nourish/$recipeId" params={{ recipeId: pathRecipe.id }}>
              Cook today’s recipe
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/path/$date" params={{ date: path.date }}>
              Open the Path
            </Link>
          </Button>
        </div>
      </article>

      <DoshaInvite />

      <section>
        <p className="font-sans text-[0.68rem] tracking-[0.16em] text-sage-deep uppercase">
          Browse the week
        </p>
        <div className="mt-3 grid grid-cols-7 gap-1.5">
          {week.map((d, i) => (
            <Link
              key={d.short}
              to="/breathe"
              search={{ seq: d.seqId }}
              className={cn(
                "flex min-h-11 items-center justify-center rounded-md bg-paper font-sans text-[0.7rem] tracking-wide text-muted no-underline shadow-[var(--shadow-card)]",
                i === weekday && "bg-sage-deep text-paper",
              )}
            >
              {d.short}
            </Link>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted">
          {rhythm.day}: {seq.name} · {recipe.title}. {rhythm.note}
        </p>
      </section>

      <section>
        <p className="font-sans text-[0.68rem] tracking-[0.16em] text-sage-deep uppercase">
          The Sanctuary
        </p>
        <h2 className="mt-1 text-3xl">Four rooms of one practice</h2>
        <p className="mt-2 max-w-lg text-muted">
          Settle in. Each pillar a room you return to — woven, not scattered.
        </p>
        <div className="mt-4 grid gap-3">
          {rooms.map((room) => (
            <Link
              key={room.id}
              to={room.href}
              className="block rounded-xl bg-paper p-4 no-underline shadow-[var(--shadow-card)]"
            >
              <p className="font-sans text-[0.65rem] tracking-[0.14em] text-sage-deep uppercase">
                {room.room}
              </p>
              <h3 className="mt-1 text-xl">{room.title}</h3>
              <p className="mt-1 text-sm text-muted">{room.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-xl">
        <img
          src="/images/ocean-breath.jpg"
          alt="Pacific tide drawing a breath-shaped curve on wet sand"
          className="h-48 w-full object-cover outline outline-1 -outline-offset-1 outline-forest/10"
        />
        <p className="bg-forest px-5 py-4 font-serif text-lg italic text-paper">
          Nature is not a backdrop — it is the method.
        </p>
      </section>

      <section className="rounded-xl bg-paper p-5 shadow-[var(--shadow-card)]">
        <p className="font-sans text-[0.68rem] tracking-[0.16em] text-sage-deep uppercase">
          Begin your stay
        </p>
        <h2 className="mt-1 text-3xl">Your Free 7-Day Lifestyle Reset</h2>
        <p className="mt-2 text-muted">
          Each day: 10–15 minutes of breath, a gentle pairing, one plant-based plate, and an
          integration prompt. Soft renewal, beginning now.
        </p>
        <div className="mt-4">
          <Button asChild>
            <Link to="/reset">Enter the 7-Day Reset</Link>
          </Button>
        </div>
      </section>

      <p className="text-center font-sans text-xs text-muted">
        <Link to="/about" className="text-sage-deep">
          About the Collective
        </Link>
        {" · "}
        Not guru theater. Not hustle wellness. A lifestyle inhabited together.
      </p>
    </div>
  );
}

function DoshaChip() {
  const prakriti = useSanctuary((s) => s.prakriti);
  const score = readable(prakriti, 12) ? scoreAnswers(prakriti) : null;
  if (!score) return null;
  return (
    <Link
      to="/dosha"
      className="rounded-pill bg-sage-deep px-3 py-1.5 font-sans text-xs tracking-wide text-paper no-underline"
    >
      {score.ja}
    </Link>
  );
}

function DoshaInvite() {
  const prakriti = useSanctuary((s) => s.prakriti);
  const vikriti = useSanctuary((s) => s.vikriti);
  const score = readable(prakriti, 12) ? scoreAnswers(prakriti) : null;
  const weather = readable(vikriti, 4) ? scoreAnswers(vikriti) : null;
  const season = seasonNote();
  return (
    <section className="rounded-xl bg-paper p-5 shadow-[var(--shadow-card)]">
      <p className="font-sans text-xs tracking-widest text-sage-deep uppercase">Ayurveda</p>
      <h2 className="mt-1 text-3xl">
        {score ? `${score.ja} · known` : "Investigate the doṣas"}
      </h2>
      <p className="mt-2 text-muted">
        {score
          ? `${season.ritu}. ${weather ? `Pacify ${weather.ja} — vikṛti is the weather.` : "Sit for this season’s vikṛti whenever the weather changes."}`
          : "Prakṛti, vikṛti, and agni — soil, weather, and fire. A classical sitting, not a personality quiz."}
      </p>
      <div className="mt-4">
        <Button asChild>
          <Link to="/dosha">{score ? "Open your reading" : "Begin the investigation"}</Link>
        </Button>
      </div>
    </section>
  );
}
