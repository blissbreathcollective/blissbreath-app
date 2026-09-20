import raw from "@/data/path-2026.json";
import { recipeSlug } from "@/lib/content";
import { isoLocal, to2026Key } from "@/lib/dates";

export type PathBreath = {
  number: number;
  name: string;
  essence: string;
};

export type PathMonth = {
  breath: number;
  label: string;
  affirmation: string;
  theme: string;
};

export type PathDay = {
  date: string;
  breath: number;
  breathName: string;
  monthTheme: string;
  monthAffirmation: string;
  affirmation: string;
  meditation: string;
  pranayama: string;
  pranayamaId?: string | null;
  yoga: string;
  ayurveda: string;
  reflection: string;
  recipe?: string;
};

export type PathYear = {
  title: string;
  subtitle: string;
  tagline: string;
  audience: string;
  breaths: PathBreath[];
  months: Record<string, PathMonth>;
  days: PathDay[];
};

export const pathYear = raw as PathYear;

const byDate = new Map(pathYear.days.map((d) => [d.date, d]));

export function dayByDate(iso: string): PathDay | undefined {
  return byDate.get(iso) ?? byDate.get(to2026Key(iso));
}

export function todayPathDay(): PathDay {
  return dayByDate(isoLocal()) ?? pathYear.days[0];
}

export function monthEntry(month: number): PathMonth | undefined {
  return pathYear.months[String(month)];
}

export function daysInMonthOf(year: number, month: number): PathDay[] {
  const prefix = `${year}-${String(month).padStart(2, "0")}-`;
  return pathYear.days.filter((d) => d.date.startsWith(prefix));
}

export type PathRecipe = {
  slug: string;
  title: string;
  blurb: string;
  firstDate: string;
};

export function uniquePathRecipes(): PathRecipe[] {
  const seen = new Map<string, PathRecipe>();
  for (const d of pathYear.days) {
    const rawRecipe = (d.recipe ?? "").trim();
    if (!rawRecipe) continue;
    const title = rawRecipe.split("—")[0].split(" - ")[0].trim();
    const slug = recipeSlug(rawRecipe);
    if (!slug || seen.has(slug)) continue;
    seen.set(slug, { slug, title, blurb: rawRecipe, firstDate: d.date });
  }
  return [...seen.values()];
}

export function firstClause(text: string, max = 48): string {
  const cut = text.split("—")[0].split("–")[0].split(" - ")[0].trim();
  return cut.length > max ? `${cut.slice(0, max).trim()}…` : cut;
}
