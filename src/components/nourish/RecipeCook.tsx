import { Heart } from "lucide-react";
import type { Recipe } from "@/lib/content";
import { seqById } from "@/lib/content";
import { cn } from "@/lib/utils";

export function RecipeCook({ recipe }: { recipe: Recipe }) {
  return (
    <div className="space-y-6">
      <dl className="flex flex-wrap gap-x-6 gap-y-1 font-sans text-xs tracking-wide text-muted">
        <div>
          <dt className="inline uppercase tracking-[0.14em] text-sage-deep">Serves </dt>
          <dd className="inline">{recipe.serves}</dd>
        </div>
        <div>
          <dt className="inline uppercase tracking-[0.14em] text-sage-deep">Time </dt>
          <dd className="inline">{recipe.time}</dd>
        </div>
      </dl>

      <section>
        <h3 className="font-sans text-[0.65rem] tracking-[0.14em] text-sage-deep uppercase">
          Ingredients
        </h3>
        <ul className="mt-3 space-y-2">
          {recipe.ingredients.map((item) => (
            <li key={item} className="flex gap-3 text-sm">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sage-deep" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-sans text-[0.65rem] tracking-[0.14em] text-sage-deep uppercase">
          Method
        </h3>
        <ol className="mt-3 space-y-3">
          {recipe.steps.map((step, i) => (
            <li key={step} className="flex gap-3 text-sm">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ivory-warm font-sans text-xs tabular-nums text-sage-deep">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {recipe.notes ? <p className="text-sm italic text-muted">{recipe.notes}</p> : null}
    </div>
  );
}

export function RecipeHeart({
  saved,
  onToggle,
}: {
  saved: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={saved ? "Remove from saved" : "Save recipe"}
      onClick={onToggle}
      className="grid size-11 place-items-center text-sage-deep"
    >
      <Heart className={cn("size-5", saved && "fill-sage-deep")} strokeWidth={1.6} />
    </button>
  );
}

export function RecipePairing({ recipe }: { recipe: Recipe }) {
  const seq = recipe.pairsWith ? seqById[recipe.pairsWith] : undefined;
  if (!seq) return null;
  return (
    <p className="font-sans text-xs tracking-wide text-muted">Pair with {seq.name}</p>
  );
}
