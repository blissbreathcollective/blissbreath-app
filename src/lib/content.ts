import { pathKitchen } from "@/data/path-recipes";

export type Phase = [label: string, seconds: number];

export type Sequence = {
  id: string;
  name: string;
  pattern: string;
  phases: Phase[];
  minutes: number;
  blurb: string;
  intention: string;
};

export const sequences: Sequence[] = [
  {
    id: "gratitude",
    name: "Morning Gratitude Breath",
    pattern: "4-4-6",
    phases: [
      ["Inhale", 4],
      ["Hold", 4],
      ["Exhale", 6],
    ],
    minutes: 10,
    blurb: "Soft inhale, gentle hold, longer thank-you exhale. Arrive before the day asks.",
    intention: "Arrive",
  },
  {
    id: "box",
    name: "Box Breath",
    pattern: "4-4-4-4",
    phases: [
      ["Inhale", 4],
      ["Hold", 4],
      ["Exhale", 4],
      ["Hold", 4],
    ],
    minutes: 10,
    blurb: "Equal sides of the square. Presence and steady attention.",
    intention: "Steady",
  },
  {
    id: "energy",
    name: "Energy Sequence",
    pattern: "5-2-5",
    phases: [
      ["Inhale", 5],
      ["Hold", 2],
      ["Exhale", 5],
    ],
    minutes: 12,
    blurb: "Slightly longer inhale, complete exhale. Awakens vitality before movement.",
    intention: "Awaken",
  },
  {
    id: "coherence",
    name: "Heart Coherence",
    pattern: "5-5",
    phases: [
      ["Inhale", 5],
      ["Exhale", 5],
    ],
    minutes: 12,
    blurb: "Even in-and-out through the heart space. Soften the chest, widen the breath.",
    intention: "Attune",
  },
  {
    id: "triangle",
    name: "Focus Triangle",
    pattern: "4-4-4",
    phases: [
      ["Inhale", 4],
      ["Hold", 4],
      ["Exhale", 4],
    ],
    minutes: 10,
    blurb: "Three sides of attention. Clear without bracing.",
    intention: "Clarify",
  },
  {
    id: "wave",
    name: "Vitality Wave",
    pattern: "4-2-6-2",
    phases: [
      ["Inhale", 4],
      ["Hold", 2],
      ["Exhale", 6],
      ["Hold", 2],
    ],
    minutes: 12,
    blurb: "A rolling wave — lift, crest, release, rest. Good before a social evening.",
    intention: "Circulate",
  },
  {
    id: "soothe",
    name: "Soothing Exhale",
    pattern: "4-8",
    phases: [
      ["Inhale", 4],
      ["Exhale", 8],
    ],
    minutes: 15,
    blurb: "Long out-breath for vagal tone. Evening wind-down and nervous-system sip.",
    intention: "Downshift",
  },
  {
    id: "nadi",
    name: "Nadi Shodhana",
    pattern: "L4 · R4",
    phases: [
      ["Left inhale", 4],
      ["Right exhale", 4],
      ["Right inhale", 4],
      ["Left exhale", 4],
    ],
    minutes: 10,
    blurb: "Alternate-nostril balance. Imagine the left channel, then the right — coastal evenness.",
    intention: "Balance",
  },
  {
    id: "dirgha",
    name: "Dirgha Three-Part Breath",
    pattern: "6-6",
    phases: [
      ["Inhale belly-ribs-chest", 6],
      ["Exhale chest-ribs-belly", 6],
    ],
    minutes: 10,
    blurb: "Fill the low belly, the ribs, the collarbones — then empty in reverse. Full, unhurried.",
    intention: "Fill",
  },
  {
    id: "ujjayi",
    name: "Ujjayi Ocean Breath",
    pattern: "4-4-6",
    phases: [
      ["Inhale", 4],
      ["Hold", 4],
      ["Exhale", 6],
    ],
    minutes: 12,
    blurb: "Slight constriction at the throat so the breath sounds like distant surf.",
    intention: "Ocean",
  },
  {
    id: "watch",
    name: "Just Watch",
    pattern: "natural",
    phases: [
      ["Inhale", 4],
      ["Exhale", 4],
    ],
    minutes: 8,
    blurb: "No shaping. Rest attention on the tide as it already is.",
    intention: "Rest",
  },
];

export const seqById: Record<string, Sequence> = Object.fromEntries(
  sequences.map((s) => [s.id, s]),
);

export const pranayamaToSeq: Record<string, string> = {
  sama: "box",
  nadi: "nadi",
  dirgha: "dirgha",
  ujjayi: "ujjayi",
  longexhale: "soothe",
  box: "box",
  watch: "watch",
  coherence: "coherence",
  triangle: "triangle",
  wave: "wave",
  gratitude: "gratitude",
  energy: "energy",
  soothe: "soothe",
};

export type WeekDay = {
  day: string;
  short: string;
  affirmation: string;
  seqId: string;
  recipeId: string;
  note: string;
};

export const week: WeekDay[] = [
  {
    day: "Sunday",
    short: "Sun",
    affirmation: "I begin again with gratitude in my breath.",
    seqId: "gratitude",
    recipeId: "citrus-chia",
    note: "Whisper the affirmation once before the first inhale.",
  },
  {
    day: "Monday",
    short: "Mon",
    affirmation: "I meet this week with a calm, clear center.",
    seqId: "box",
    recipeId: "green-recovery",
    note: "Move after breath, before screens.",
  },
  {
    day: "Tuesday",
    short: "Tue",
    affirmation: "Energy moves through me with ease and joy.",
    seqId: "energy",
    recipeId: "anti-inflammatory",
    note: "Let the inhale feel slightly brighter than yesterday.",
  },
  {
    day: "Wednesday",
    short: "Wed",
    affirmation: "My heart and breath are in soft agreement.",
    seqId: "coherence",
    recipeId: "warm-lentil",
    note: "Eat without a device.",
  },
  {
    day: "Thursday",
    short: "Thu",
    affirmation: "I choose focus that feels spacious, not tight.",
    seqId: "triangle",
    recipeId: "herbed-tahini",
    note: "Sip water before coffee.",
  },
  {
    day: "Friday",
    short: "Fri",
    affirmation: "I celebrate my body with breath and bright food.",
    seqId: "wave",
    recipeId: "rainbow-chickpea",
    note: "Invite lightness — this breath is a wave, not a grind.",
  },
  {
    day: "Saturday",
    short: "Sat",
    affirmation: "I rest as deeply as I rise.",
    seqId: "soothe",
    recipeId: "cacao-elixir",
    note: "Step outside for eight breaths of outdoor air.",
  },
];

export type RecipeCollection = "recovery" | "elixir" | "vitality";

export type Recipe = {
  id: string;
  title: string;
  collection: RecipeCollection;
  collectionLabel: string;
  blurb: string;
  plate: string;
  image: string;
  pairsWith?: string;
  serves: string;
  time: string;
  ingredients: string[];
  steps: string[];
  notes?: string;
};

export const recipes: Recipe[] = [
  {
    id: "citrus-chia",
    title: "Citrus-Chia Plate",
    collection: "vitality",
    collectionLabel: "Morning vitality",
    blurb: "Sunrise plate that opens the day with clarity — light enough to move, rich enough to sustain.",
    plate: "Chia pudding, pink grapefruit, mint, toasted coconut.",
    image: "/images/citrus-plate.jpg",
    pairsWith: "gratitude",
    serves: "2",
    time: "10 min + overnight",
    ingredients: [
      "6 tablespoons chia seeds",
      "2 cups unsweetened oat milk",
      "1 tablespoon maple syrup",
      "1 teaspoon vanilla extract",
      "Pinch of sea salt",
      "1 pink grapefruit, segmented",
      "1 orange, segmented",
      "A handful of fresh mint leaves",
      "2 tablespoons toasted coconut flakes",
    ],
    steps: [
      "Whisk chia seeds, oat milk, maple, vanilla, and salt in a jar. Rest 10 minutes, whisk again so no clumps remain, then refrigerate overnight.",
      "Segment the grapefruit and orange over a bowl, keeping the juice.",
      "Spoon the set pudding into two bowls. Top with citrus, a spoon of reserved juice, mint, and toasted coconut.",
      "Eat slowly, before screens. The first bite is part of the morning practice.",
    ],
    notes: "Pudding keeps three days. For a warmer morning, use a splash of heated oat milk over the cold chia.",
  },
  {
    id: "green-recovery",
    title: "Green Recovery Bowl",
    collection: "recovery",
    collectionLabel: "Post-practice recovery",
    blurb: "Massaged greens and cool minerals after a weekday sequence.",
    plate: "Massaged kale, avocado, cucumber, lemon-herb oil, hemp seeds.",
    image: "/images/nourishment-bowl.jpg",
    pairsWith: "box",
    serves: "2",
    time: "20 min",
    ingredients: [
      "1 bunch curly kale, stems removed, leaves torn",
      "1 ripe avocado",
      "1 Persian cucumber, sliced",
      "3 tablespoons extra-virgin olive oil",
      "Juice of 1 lemon",
      "1 small garlic clove, finely grated",
      "A handful of parsley, chopped",
      "2 tablespoons hemp seeds",
      "Sea salt and black pepper",
    ],
    steps: [
      "Place kale in a wide bowl with a pinch of salt and 1 tablespoon of the oil. Massage with your hands for a full minute until the leaves darken and soften.",
      "Whisk remaining oil with lemon, garlic, parsley, salt, and pepper.",
      "Fold cucumber through the kale. Slice the avocado over the top.",
      "Pour the herb oil, scatter hemp seeds, and eat while the breath is still slow.",
    ],
    notes: "Add leftover quinoa if you need more grounding after a longer practice.",
  },
  {
    id: "anti-inflammatory",
    title: "Anti-Inflammatory Bowl",
    collection: "recovery",
    collectionLabel: "Post-practice recovery",
    blurb: "Warm quinoa, turmeric-tahini, and roasted roots — color, texture, calm satiety.",
    plate: "Warm quinoa, roasted sweet potato, kale, tahini-turmeric, pumpkin seeds.",
    image: "/images/recovery-bowl.jpg",
    pairsWith: "energy",
    serves: "2",
    time: "40 min",
    ingredients: [
      "¾ cup quinoa, rinsed",
      "1 large sweet potato, cubed",
      "2 cups chopped kale",
      "3 tablespoons olive oil, divided",
      "3 tablespoons tahini",
      "½ teaspoon ground turmeric",
      "Juice of ½ lemon",
      "2 tablespoons pumpkin seeds",
      "Sea salt",
    ],
    steps: [
      "Heat the oven to 425°F. Toss sweet potato with 1 tablespoon oil and salt. Roast 25 minutes until the edges caramelize.",
      "Simmer quinoa in 1½ cups salted water, covered, 15 minutes. Rest 5 minutes, then fluff.",
      "Whisk tahini, turmeric, lemon, a pinch of salt, and 2–3 tablespoons warm water until pourable.",
      "Wilt kale in the remaining oil for 1 minute. Assemble quinoa, potato, and kale. Spoon turmeric-tahini and finish with pumpkin seeds.",
    ],
    notes: "Black pepper with the turmeric helps the body use curcumin. A few cracks over the sauce is enough.",
  },
  {
    id: "warm-lentil",
    title: "Warm Lentil Pot",
    collection: "recovery",
    collectionLabel: "Midweek comfort",
    blurb: "A quiet pot that restores what practice opened.",
    plate: "Red lentils, carrot, cumin, olive oil, lemon, fresh parsley.",
    image: "/images/vitality-plate.jpg",
    pairsWith: "coherence",
    serves: "4",
    time: "35 min",
    ingredients: [
      "1 cup red lentils, rinsed",
      "1 yellow onion, diced",
      "2 carrots, diced",
      "2 garlic cloves, minced",
      "1 teaspoon cumin seeds",
      "½ teaspoon ground coriander",
      "4 cups vegetable broth",
      "2 tablespoons olive oil, plus more to finish",
      "Juice of ½ lemon",
      "A handful of parsley, chopped",
      "Sea salt",
    ],
    steps: [
      "Warm olive oil in a pot. Add cumin seeds until they smell toasted, about 30 seconds. Stir in onion, carrot, and a pinch of salt; cook until the onion is translucent.",
      "Add garlic and coriander for 30 seconds. Stir in lentils and broth. Bring to a simmer.",
      "Cook uncovered 18–20 minutes, stirring now and then, until the lentils collapse into a soft pot.",
      "Finish with lemon, parsley, a ribbon of olive oil, and salt to taste. Eat without a device.",
    ],
    notes: "Thins with a splash of water the next day — it wants to thicken overnight.",
  },
  {
    id: "herbed-tahini",
    title: "Herbed Tahini Vegetables",
    collection: "vitality",
    collectionLabel: "Grounded plate",
    blurb: "Roasted brassicas with a herb drizzle — focus that still feels like a meal.",
    plate: "Roasted cauliflower and carrots, tahini-herb drizzle, toasted almonds.",
    image: "/images/vitality-plate.jpg",
    pairsWith: "triangle",
    serves: "3",
    time: "40 min",
    ingredients: [
      "1 medium cauliflower, cut into florets",
      "4 carrots, cut into batons",
      "3 tablespoons olive oil",
      "¼ cup tahini",
      "Juice of 1 lemon",
      "1 small garlic clove",
      "A handful each of parsley and dill",
      "⅓ cup toasted almonds, roughly chopped",
      "Sea salt and black pepper",
    ],
    steps: [
      "Heat the oven to 425°F. Toss cauliflower and carrots with oil, salt, and pepper. Roast 28–32 minutes until browned at the edges.",
      "Blend tahini, lemon, garlic, herbs, a pinch of salt, and enough water to make a thick drizzle.",
      "Pile the vegetables on a warm plate. Spoon the herb tahini generously.",
      "Scatter almonds. Serve with a simple green if you want more volume.",
    ],
  },
  {
    id: "rainbow-chickpea",
    title: "Rainbow Chickpea Salad",
    collection: "vitality",
    collectionLabel: "Joyful bites",
    blurb: "Bright, lemony, eaten with the hands if you like.",
    plate: "Chickpeas, cherry tomato, cucumber, olive, parsley, lemon, olive oil.",
    image: "/images/nourishment-bowl.jpg",
    pairsWith: "wave",
    serves: "2",
    time: "15 min",
    ingredients: [
      "1 can (15 oz) chickpeas, rinsed and dried",
      "1 cup cherry tomatoes, halved",
      "1 cucumber, diced",
      "⅓ cup Castelvetrano olives, torn",
      "A generous handful of parsley, chopped",
      "3 tablespoons extra-virgin olive oil",
      "Juice of 1 lemon",
      "½ teaspoon cumin",
      "Sea salt and black pepper",
    ],
    steps: [
      "Toss chickpeas with cumin, a pinch of salt, and 1 tablespoon of the oil.",
      "Add tomato, cucumber, olives, and parsley.",
      "Dress with remaining oil and lemon. Taste for salt and a crack of pepper.",
      "Let it sit 5 minutes so the chickpeas take the lemon. Eat with the hands if you like.",
    ],
    notes: "Holds well for lunch the next day. Add avocado just before eating.",
  },
  {
    id: "cacao-elixir",
    title: "Cacao-Adaptogen Elixir",
    collection: "elixir",
    collectionLabel: "Nervous-system sip",
    blurb: "Soft, sensory sip that supports downshift — magnesium-minded, quiet pleasure.",
    plate: "Oat milk, raw cacao, cinnamon, pinch of sea salt. Pair with fruit.",
    image: "/images/cacao-elixir.jpg",
    pairsWith: "soothe",
    serves: "1",
    time: "8 min",
    ingredients: [
      "1½ cups unsweetened oat milk",
      "1 tablespoon raw cacao powder",
      "½ teaspoon cinnamon",
      "Pinch of sea salt",
      "1 teaspoon maple syrup, or to taste",
      "¼ teaspoon ashwagandha powder (optional)",
      "Fruit on the side — berries or orange slices",
    ],
    steps: [
      "Warm the oat milk in a small pot until steaming, not boiling.",
      "Whisk in cacao, cinnamon, salt, maple, and ashwagandha until completely smooth and lightly frothy.",
      "Pour into a favorite cup. Sit. Pair with fruit if you want a little sweetness after the last exhale.",
    ],
    notes: "Skip ashwagandha if pregnant or if a practitioner has advised otherwise. Cacao alone still soothes.",
  },
  {
    id: "soothing-elixir",
    title: "Magnesium Evening Elixir",
    collection: "elixir",
    collectionLabel: "Nervous-system sip",
    blurb: "A warmer cousin of the cacao cup — for nights that need a longer exhale.",
    plate: "Warm oat milk, cinnamon, cacao nibs, optional ashwagandha, honey or maple.",
    image: "/images/soothing-elixir.jpg",
    pairsWith: "soothe",
    serves: "1",
    time: "8 min",
    ingredients: [
      "1½ cups unsweetened oat milk",
      "½ teaspoon cinnamon",
      "1 tablespoon cacao nibs, plus a pinch to finish",
      "1 teaspoon honey or maple syrup",
      "¼ teaspoon ashwagandha or a pinch of nutmeg",
      "Pinch of sea salt",
    ],
    steps: [
      "Warm oat milk with cinnamon, salt, and most of the cacao nibs until steaming.",
      "Take off the heat. Stir in honey or maple and ashwagandha.",
      "Pour through a small strainer if you prefer a smooth sip, or leave the nibs for texture.",
      "Finish with a few cacao nibs on top. Drink slowly in low light.",
    ],
  },
];

export const allRecipes: Recipe[] = [...recipes, ...pathKitchen];

export const recipeById: Record<string, Recipe> = Object.fromEntries(
  allRecipes.map((r) => [r.id, r]),
);

export function recipeSlug(raw: string): string {
  const title = raw.split("—")[0].split(" - ")[0].trim();
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

export function recipeFromPathText(raw?: string | null): Recipe | undefined {
  const text = raw?.trim();
  if (!text) return undefined;
  return recipeById[recipeSlug(text)];
}

export const collections = [
  {
    id: "recovery",
    title: "Post-Practice Recovery Bowls",
    blurb: "Grounding, mineral-rich bowls designed to replenish after breath and movement.",
    image: "/images/recovery-bowl.jpg",
  },
  {
    id: "elixir",
    title: "Nervous-System Soothing Smoothies & Elixirs",
    blurb: "Soft, sensory sips that support downshift — magnesium-minded blends, adaptogenic notes.",
    image: "/images/cacao-elixir.jpg",
  },
  {
    id: "vitality",
    title: "Morning Vitality Plates & Sips",
    blurb: "Sunrise plates and warm or cool sips that open the day with clarity.",
    image: "/images/citrus-plate.jpg",
  },
] as const;

export const rooms: {
  id: string;
  room: string;
  title: string;
  blurb: string;
  href: "/breathe" | "/path" | "/journal" | "/nourish";
}[] = [
  {
    id: "breath",
    room: "Room one",
    title: "Conscious Breathwork & Meditation",
    blurb:
      "Practices that calm the nervous system and gently support the brain’s grey matter — clarity, regulation, a quieter baseline.",
    href: "/breathe",
  },
  {
    id: "flow",
    room: "Room two",
    title: "Signature Energy Breath & Embodied Flows",
    blurb:
      "Signature Energy Breath Sequences with Embodied Flows — vitality without force, ground with grace.",
    href: "/path",
  },
  {
    id: "mind",
    room: "Room three",
    title: "Reflective Awareness & Intentional Mindsets",
    blurb: "Integration prompts and intentional frameworks — insight into lived change. Presence, not performance.",
    href: "/journal",
  },
  {
    id: "nourish",
    room: "Room four",
    title: "Nature-Aligned Nourishment & Longevity",
    blurb: "Plant-forward recipes and rituals that restore after practice — beauty that begins on the plate.",
    href: "/nourish",
  },
];

export const resetDays = week.map((w, i) => ({
  index: i,
  title: `Day ${i + 1} · ${w.day}`,
  affirmation: w.affirmation,
  seqId: w.seqId,
  recipeId: w.recipeId,
  note: w.note,
}));

export const FORMSPREE_ID = "xyezgjrz";
