import { createFileRoute, Link } from "@tanstack/react-router";
import { RecipeCook, RecipeHeart, RecipePairing } from "@/components/nourish/RecipeCook";
import { recipeById } from "@/lib/content";
import { useSanctuary } from "@/lib/store";

export const Route = createFileRoute("/nourish/$recipeId")({
  component: RecipePage,
});

function RecipePage() {
  const { recipeId } = Route.useParams();
  const recipe = recipeById[recipeId];
  const favs = useSanctuary((s) => s.favoriteRecipes);
  const toggle = useSanctuary((s) => s.toggleFavRecipe);

  if (!recipe) {
    return (
      <div>
        <h1 className="text-3xl">This recipe is still gathering</h1>
        <p className="mt-2 text-muted">Return to Nourish for this week’s plates.</p>
        <Link to="/nourish" className="mt-4 inline-block min-h-11 text-sage-deep">
          Back to Nourish
        </Link>
      </div>
    );
  }

  const saved = favs.includes(recipe.id);

  return (
    <article className="space-y-6">
      <p className="font-sans text-[0.68rem] tracking-[0.16em] text-sage-deep uppercase">
        <Link to="/nourish" className="text-sage-deep no-underline">
          Nourish
        </Link>
        {" · "}
        {recipe.collectionLabel}
      </p>
      <div className="overflow-hidden rounded-xl bg-paper shadow-[var(--shadow-card)]">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-52 w-full object-cover outline outline-1 -outline-offset-1 outline-forest/10 sm:h-64"
        />
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl">{recipe.title}</h1>
              <p className="mt-2 text-sm text-muted">{recipe.blurb}</p>
              <p className="mt-2 text-sm">{recipe.plate}</p>
            </div>
            <RecipeHeart saved={saved} onToggle={() => toggle(recipe.id)} />
          </div>
          <div className="mt-6">
            <RecipeCook recipe={recipe} />
          </div>
          <div className="mt-6">
            <RecipePairing recipe={recipe} />
          </div>
        </div>
      </div>
    </article>
  );
}
