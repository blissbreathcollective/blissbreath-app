import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { RecipeCook, RecipeHeart, RecipePairing } from "@/components/nourish/RecipeCook";
import { collections, recipeById, recipes } from "@/lib/content";
import { doshas, rasa, readable, scoreAnswers, tastesFor } from "@/lib/dosha";
import { uniquePathRecipes } from "@/lib/path";
import { useSanctuary } from "@/lib/store";

export const Route = createFileRoute("/nourish/")({ component: NourishPage });

function NourishPage() {
  const favs = useSanctuary((s) => s.favoriteRecipes);
  const toggle = useSanctuary((s) => s.toggleFavRecipe);
  const prakriti = useSanctuary((s) => s.prakriti);
  const vikriti = useSanctuary((s) => s.vikriti);
  const pathRecipes = uniquePathRecipes();
  const nature = readable(prakriti, 12) ? scoreAnswers(prakriti) : null;
  const weather = readable(vikriti, 4) ? scoreAnswers(vikriti) : null;
  const pacifyId = weather?.ranked[0] ?? nature?.ranked[0];
  const aligned = pacifyId ? doshas[pacifyId] : null;

  return (
    <div className="space-y-8">
      <header>
        <p className="font-sans text-[0.68rem] tracking-[0.18em] text-sage-deep uppercase">
          At One with Nature
        </p>
        <h1 className="mt-1 text-4xl">Nature-Aligned Nourishment</h1>
        <p className="mt-3 max-w-xl text-muted">
          Plant-based plates and sips with full recipes — ingredients and method for every bowl,
          plate, and elixir, so beauty on the plate is something you can actually cook.
        </p>
      </header>

      {aligned ? (
        <article className="rounded-xl bg-paper p-5 shadow-[var(--shadow-card)]">
          <p className="font-sans text-xs tracking-widest text-sage-deep uppercase">
            For {aligned.sanskrit}
            {weather ? " · vikṛti" : " · prakṛti"}
          </p>
          <p className="mt-2">{aligned.nourish}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {rasa
              .filter((r) => tastesFor[aligned.id].favor.includes(r.id))
              .map((r) => (
                <span
                  key={r.id}
                  className="rounded-pill bg-sage-deep px-3 py-1.5 font-sans text-xs tracking-wide text-paper"
                >
                  {r.sanskrit} · {r.english}
                </span>
              ))}
          </div>
          <ul className="mt-3 space-y-1 text-sm">
            {aligned.recipeIds.map((id) => {
              const r = recipeById[id];
              return r ? (
                <li key={id}>
                  <Link to="/nourish/$recipeId" params={{ recipeId: r.id }} className="text-sage-deep">
                    {r.title}
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </article>
      ) : (
        <p className="text-sm text-muted">
          <Link to="/dosha" className="text-sage-deep">
            Investigate your doṣa
          </Link>{" "}
          to pair plates with prakṛti and this season’s vikṛti.
        </p>
      )}

      <div className="grid gap-3">
        {collections.map((c) => (
          <article key={c.id} className="overflow-hidden rounded-xl bg-paper shadow-[var(--shadow-card)]">
            <img
              src={c.image}
              alt={c.title}
              className="h-40 w-full object-cover outline outline-1 -outline-offset-1 outline-forest/10"
            />
            <div className="p-4">
              <h2 className="text-2xl">{c.title}</h2>
              <p className="mt-1 text-sm text-muted">{c.blurb}</p>
            </div>
          </article>
        ))}
      </div>

      <section>
        <p className="font-sans text-[0.68rem] tracking-[0.16em] text-sage-deep uppercase">
          This week’s plates
        </p>
        <div className="mt-3 grid gap-3">
          {recipes.map((r) => {
            const saved = favs.includes(r.id);
            return (
              <article key={r.id} className="overflow-hidden rounded-xl bg-paper shadow-[var(--shadow-card)]">
                <Link to="/nourish/$recipeId" params={{ recipeId: r.id }} className="block no-underline">
                  <img
                    src={r.image}
                    alt={r.title}
                    className="h-44 w-full object-cover outline outline-1 -outline-offset-1 outline-forest/10"
                  />
                </Link>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-sans text-[0.65rem] tracking-[0.14em] text-sage-deep uppercase">
                        {r.collectionLabel}
                      </p>
                      <h3 className="mt-1 text-xl">
                        <Link
                          to="/nourish/$recipeId"
                          params={{ recipeId: r.id }}
                          className="text-forest no-underline"
                        >
                          {r.title}
                        </Link>
                      </h3>
                    </div>
                    <RecipeHeart saved={saved} onToggle={() => toggle(r.id)} />
                  </div>
                  <p className="mt-2 text-sm">{r.plate}</p>
                  <p className="mt-1 text-sm text-muted">{r.blurb}</p>
                  <p className="mt-2 font-sans text-xs tracking-wide text-muted">
                    Serves {r.serves} · {r.time}
                  </p>
                  <details className="group mt-3">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-sans text-sm text-sage-deep [&::-webkit-details-marker]:hidden">
                      Ingredients & method
                      <ChevronDown
                        className="size-4 shrink-0 transition-transform duration-150 group-open:rotate-180"
                        strokeWidth={1.6}
                        aria-hidden
                      />
                    </summary>
                    <div className="mt-4 border-t border-line pt-4">
                      <RecipeCook recipe={r} />
                    </div>
                  </details>
                  <div className="mt-3">
                    <RecipePairing recipe={r} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <p className="font-sans text-[0.68rem] tracking-[0.16em] text-sage-deep uppercase">
          Living library from the Path
        </p>
        <p className="mt-2 text-sm text-muted">
          Forty-eight seasonal recipes, each with ingredients and method, woven through Bliss Breath
          Life 2026.
        </p>
        <ul className="mt-4 space-y-3">
          {pathRecipes.map((r) => {
            const recipe = recipeById[r.slug];
            return (
              <li key={r.slug}>
                <Link
                  to="/nourish/$recipeId"
                  params={{ recipeId: r.slug }}
                  className="block rounded-lg bg-paper p-4 no-underline shadow-[var(--shadow-card)]"
                >
                  <h3 className="text-lg text-forest">{recipe?.title ?? r.title}</h3>
                  <p className="mt-1 text-sm text-muted">{recipe?.blurb ?? r.blurb}</p>
                  {recipe ? (
                    <p className="mt-2 font-sans text-xs tracking-wide text-sage-deep">
                      Serves {recipe.serves} · {recipe.time} · View recipe
                    </p>
                  ) : (
                    <p className="mt-2 font-sans text-xs tracking-wide text-sage-deep">View recipe</p>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
