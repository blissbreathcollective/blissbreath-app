export type DoshaId = "vata" | "pitta" | "kapha";
export type AgniId = "sama" | "visama" | "tikshna" | "manda";

export type DoshaQuestion = {
  id: string;
  prompt: string;
  hint?: string;
  options: Record<DoshaId, string>;
};

export type AgniQuestion = {
  id: string;
  prompt: string;
  hint?: string;
  options: Record<AgniId, string>;
};

export const DOSHA_ORDER: DoshaId[] = ["vata", "pitta", "kapha"];
export const AGNI_ORDER: AgniId[] = ["visama", "tikshna", "manda", "sama"];

export const doshas: Record<
  DoshaId,
  {
    id: DoshaId;
    name: string;
    sanskrit: string;
    ja: string;
    elements: string;
    essence: string;
    gunas: string[];
    body: string;
    mind: string;
    whenBalanced: string;
    whenAggravated: string;
    favor: string[];
    ease: string[];
    breath: string;
    nourish: string;
    recipeIds: string[];
  }
> = {
  vata: {
    id: "vata",
    name: "Vata",
    sanskrit: "Vāta",
    ja: "Vātaja",
    elements: "Ākāśa + vāyu · space and air",
    essence: "The principle of movement — breath, thought, nerve, elimination, the spaces between.",
    gunas: ["rūkṣa (dry)", "laghu (light)", "śīta (cold)", "chala (mobile)", "khara (rough)", "sūkṣma (subtle)"],
    body: "Often a lighter frame, prominent joints, variable appetite, dry skin, cool extremities, light or interrupted sleep.",
    mind: "Quick to grasp, quick to forget. Creative, enthusiastic, easily scattered. Speech tends to be rapid.",
    whenBalanced: "Inspired, flexible, clear, and lightly joyful — like a tide that knows its rhythm.",
    whenAggravated: "Anxiety, restlessness, dry bowels, insomnia, feeling ungrounded or cold.",
    favor: [
      "Warm, moist, cooked food; oil; a day that keeps its appointments",
      "Madhura, amla, lavaṇa — sweet, sour, and salty in moderation",
      "Steady sleep, warm oil on the skin, fewer abrupt transitions",
      "Gentle, longer exhales and Nāḍī Śodhana — never more stimulation",
    ],
    ease: ["Cold, dry, raw, and irregular meals", "Overstimulation, skipped rest, excessive travel of the mind"],
    breath: "soothe",
    nourish: "Warm pots, oils, and evening elixirs. Ground after practice — never skip the plate.",
    recipeIds: ["warm-lentil", "cacao-elixir", "anti-inflammatory"],
  },
  pitta: {
    id: "pitta",
    name: "Pitta",
    sanskrit: "Pitta",
    ja: "Pittaja",
    elements: "Agni + jala · fire and water",
    essence: "The principle of transformation — digestion, vision, discernment, the heat that completes.",
    gunas: ["uṣṇa (hot)", "tīkṣṇa (sharp)", "drava (liquid)", "sasneha (slightly oily)", "amla (sour)", "kaṭu (pungent)"],
    body: "Medium, well-proportioned build. Strong hunger, warm skin, a tendency toward flush, early greying or thinning hair, efficient metabolism.",
    mind: "Keen, precise, leadership-oriented. Intensity is a gift until it becomes irritability or criticism.",
    whenBalanced: "Clear-seeing, courageous, metabolically bright, able to complete what is begun.",
    whenAggravated: "Inflammation, acidity, impatience, heat in the skin or eyes, restless drive.",
    favor: [
      "Cooling, moderately heavy plates; madhura, tikta, kaṣāya — sweet, bitter, astringent",
      "Moonlit rest, shade, and unhurried meals — never a skipped noon plate",
      "Heart coherence and even breath — never forced heat or competitive practice",
      "Coconut, cilantro, cucumber, and mineral greens",
    ],
    ease: ["Excess chili, alcohol, midday sun, competitive overwork"],
    breath: "coherence",
    nourish: "Cooling bowls and bitter-green recovery. Eat before hunger becomes sharp.",
    recipeIds: ["green-recovery", "citrus-chia", "soothing-elixir"],
  },
  kapha: {
    id: "kapha",
    name: "Kapha",
    sanskrit: "Kapha",
    ja: "Kaphaja",
    elements: "Pṛthvī + jala · earth and water",
    essence: "The principle of cohesion — structure, immunity, lubrication, the love of stillness.",
    gunas: ["snigdha (unctuous)", "guru (heavy)", "śīta (cold)", "manda (slow)", "sthira (stable)", "mṛdu (soft)"],
    body: "Sturdy or full frame, smooth skin, deep sound sleep, slower digestion, strong stamina once in motion, cool and stable joints.",
    mind: "Steady memory, loyalty, calm speech. Slow to start, slow to stop. Contentment can thicken into inertia.",
    whenBalanced: "Devoted, enduring, compassionate, with a voice and presence that hold the room.",
    whenAggravated: "Heaviness, congestion, clinging, fog, resistance to change, excess sleep.",
    favor: [
      "Light, warm, spiced plates; kaṭu, tikta, kaṣāya — pungent, bitter, astringent",
      "Dawn movement — before the mind negotiates",
      "Energy sequences and Dīrgha breath; never only rest",
      "Dry warmth, variety, and slightly earlier dinners",
    ],
    ease: ["Dairy-heavy sweets, cold drinks, late mornings, too much sitting"],
    breath: "energy",
    nourish: "Bright, light vitality plates. Spice, bitter greens, and a morning that actually begins.",
    recipeIds: ["rainbow-chickpea", "citrus-chia", "herbed-tahini"],
  },
};

export const agnis: Record<
  AgniId,
  { id: AgniId; name: string; sanskrit: string; allied: DoshaId | null; essence: string; counsel: string }
> = {
  sama: {
    id: "sama",
    name: "Sama",
    sanskrit: "Samāgni",
    allied: null,
    essence: "Even fire. Hunger arrives on time, food is received completely, the mind is clear after a meal.",
    counsel: "Protect this. Regular meals, without grazing or heroic fasting, keep the fire even.",
  },
  visama: {
    id: "visama",
    name: "Viṣama",
    sanskrit: "Viṣamāgni",
    allied: "vata",
    essence: "Irregular fire — variable hunger, gas that moves, meals that sometimes vanish and sometimes sit.",
    counsel: "Warm, moist, regular. Sit to eat. Oil and routine kindle more reliably than spice alone.",
  },
  tikshna: {
    id: "tikshna",
    name: "Tīkṣṇa",
    sanskrit: "Tīkṣṇāgni",
    allied: "pitta",
    essence: "Sharp fire. Hunger is punctual and intense; delay turns to heat, acidity, or impatience.",
    counsel: "Do not skip the noon plate. Cool, moderately substantial food. Never feed a fire with chili and caffeine alone.",
  },
  manda: {
    id: "manda",
    name: "Manda",
    sanskrit: "Mandāgni",
    allied: "kapha",
    essence: "Slow fire. Heaviness after meals, fog, a coated sense of the mouth, little true hunger.",
    counsel: "Lighter, warmer, spiced plates. Walk after eating. Kindling comes from movement and bitter taste, not from more food.",
  },
};

export const rasa = [
  { id: "madhura", sanskrit: "Madhura", english: "Sweet", builds: "kapha" as DoshaId, reduces: "vata" as DoshaId },
  { id: "amla", sanskrit: "Amla", english: "Sour", builds: "pitta" as DoshaId, reduces: "vata" as DoshaId },
  { id: "lavana", sanskrit: "Lavaṇa", english: "Salty", builds: "pitta" as DoshaId, reduces: "vata" as DoshaId },
  { id: "katu", sanskrit: "Kaṭu", english: "Pungent", builds: "pitta" as DoshaId, reduces: "kapha" as DoshaId },
  { id: "tikta", sanskrit: "Tikta", english: "Bitter", builds: "vata" as DoshaId, reduces: "pitta" as DoshaId },
  { id: "kashaya", sanskrit: "Kaṣāya", english: "Astringent", builds: "vata" as DoshaId, reduces: "pitta" as DoshaId },
] as const;

export const tastesFor: Record<DoshaId, { favor: string[]; ease: string[] }> = {
  vata: { favor: ["madhura", "amla", "lavana"], ease: ["katu", "tikta", "kashaya"] },
  pitta: { favor: ["madhura", "tikta", "kashaya"], ease: ["katu", "amla", "lavana"] },
  kapha: { favor: ["katu", "tikta", "kashaya"], ease: ["madhura", "amla", "lavana"] },
};

export const gunaPairs: { a: string; b: string; note: string }[] = [
  { a: "Guru · heavy", b: "Laghu · light", note: "Weight and digestion; Kapha builds with guru, Vāta with laghu." },
  { a: "Śīta · cold", b: "Uṣṇa · hot", note: "Temperature of tissue and mind. Pitta is uṣṇa; Vāta and Kapha are śīta." },
  { a: "Snigdha · unctuous", b: "Rūkṣa · dry", note: "Oil versus wind. The first medicine for Vāta is snigdha." },
  { a: "Manda · slow", b: "Tīkṣṇa · sharp", note: "The pace of agni and intellect." },
  { a: "Sthira · stable", b: "Sara · mobile", note: "Kapha holds; Vāta moves. Routine is sthira made daily." },
  { a: "Mṛdu · soft", b: "Kaṭhina · hard", note: "Yielding versus rigid — joints, stool, temperament." },
  { a: "Viśada · clear", b: "Picchila · slimy", note: "Clarity of channels versus āma’s stickiness." },
  { a: "Ślakṣṇa · smooth", b: "Khara · rough", note: "Skin, voice, and the feel of a day." },
  { a: "Sūkṣma · subtle", b: "Sthūla · gross", note: "Vāta enters the minute; Kapha occupies the substantial." },
  { a: "Sāndra · dense", b: "Drava · liquid", note: "Cohesion versus flow — lymph, emotion, stool." },
];

export const sevenTypes: { id: string; label: string; note: string }[] = [
  { id: "vata", label: "Vātaja", note: "Eka-doṣa. Movement leads. Protect with oil, warmth, and rhythm." },
  { id: "pitta", label: "Pittaja", note: "Eka-doṣa. Fire leads. Protect with coolness, shade, and complete meals." },
  { id: "kapha", label: "Kaphaja", note: "Eka-doṣa. Cohesion leads. Protect with lightness, spice, and dawn." },
  { id: "vata-pitta", label: "Vāta–Pitta", note: "Dvandva. Mobile fire. Warm without heating; regular without rigid drive." },
  { id: "vata-kapha", label: "Vāta–Kapha", note: "Dvandva. Cold constitution. Warmth serves both; avoid dry-and-heavy together." },
  { id: "pitta-kapha", label: "Pitta–Kapha", note: "Dvandva. Stable fire. Cool the heat, lighten the hold." },
  { id: "sama", label: "Sama / Tridoṣa", note: "Rare evenness. Let ṛtu and vikṛti decide the medicine, not a single label." },
];

export const prakritiQuestions: DoshaQuestion[] = [
  {
    id: "frame",
    prompt: "Body frame, most of your life",
    hint: "Bones and proportion — not this month’s weight. Prakṛti is read in the skeleton first.",
    options: {
      vata: "Light or narrow-boned; longer limbs; joints often visible",
      pitta: "Medium-boned, evenly proportioned, muscle that shows when you use it",
      kapha: "Broad or dense frame; well-padded joints; a sense of substance",
    },
  },
  {
    id: "weight",
    prompt: "How weight has behaved since youth",
    options: {
      vata: "Hard to gain; easy to lose; fluctuates with stress or skipped meals",
      pitta: "Moderate; gains and loses without much drama",
      kapha: "Gains easily, especially in stillness; slow to reduce",
    },
  },
  {
    id: "skin",
    prompt: "Skin, in its ordinary state",
    options: {
      vata: "Dry, thin, or rough; cool to the touch; chaps in wind",
      pitta: "Warm, fair-to-rosy, oily in the T-zone; flushes; marks easily",
      kapha: "Thick, smooth, slightly oily, pale or cool-toned, few wrinkles early",
    },
  },
  {
    id: "hair",
    prompt: "Hair, as it has generally been",
    options: {
      vata: "Dry, wiry, or fine; a tendency to frizz or break",
      pitta: "Fine to medium; early greying or thinning is familiar",
      kapha: "Thick, wavy or lustrous; holds oil; slow to grey",
    },
  },
  {
    id: "teeth",
    prompt: "Teeth and gums, as they have always been",
    hint: "Caraka reads the mouth as constitution, not dentistry.",
    options: {
      vata: "Uneven, spaced, or delicate; gums recede; teeth feel sensitive to cold",
      pitta: "Medium, yellowish or easily inflamed gums; a sharp mouth-feel",
      kapha: "Strong, white, well-set; large and even",
    },
  },
  {
    id: "appetite",
    prompt: "Appetite, on an ordinary day",
    options: {
      vata: "Irregular — forget to eat, then suddenly ravenous",
      pitta: "Sharp and punctual; irritability if a meal is late",
      kapha: "Steady, can skip a meal without fuss; slow to hunger",
    },
  },
  {
    id: "bowel",
    prompt: "Elimination, as a lifetime pattern",
    options: {
      vata: "Dry, variable, or tending toward constipation",
      pitta: "Frequent, soft, or urgent; heat if imbalanced",
      kapha: "Slow, regular, well-formed; sluggish if heavy",
    },
  },
  {
    id: "sleep",
    prompt: "Sleep, when life is not in crisis",
    options: {
      vata: "Light, easily broken; mind still running as the body lies down",
      pitta: "Moderate, usually sound; heat or intensity can wake you",
      kapha: "Deep, long, hard to rise from; loves the extra hour",
    },
  },
  {
    id: "temperature",
    prompt: "Relationship with heat and cold",
    options: {
      vata: "Cold hands and feet; loves warmth; wind is tiring",
      pitta: "Runs warm; midday sun and spice are too much",
      kapha: "Cool and comfortable in heat; damp cold is the trouble",
    },
  },
  {
    id: "speech",
    prompt: "Speech and thought, as others have known you",
    options: {
      vata: "Quick, lively, sometimes leaping mid-sentence",
      pitta: "Precise, persuasive, cutting when impatient",
      kapha: "Measured, melodious, few words that land",
    },
  },
  {
    id: "voice",
    prompt: "The voice itself",
    options: {
      vata: "Light, airy, or hoarse when tired; varies with the day",
      pitta: "Sharp, carrying, clear — heard across a room",
      kapha: "Low, resonant, steady, pleasant to rest in",
    },
  },
  {
    id: "mind",
    prompt: "Learning and memory",
    options: {
      vata: "Grasps instantly, forgets unless it is loved",
      pitta: "Sharp, discriminating, remembers what was useful",
      kapha: "Slow to take in, then keeps it for years",
    },
  },
  {
    id: "energy",
    prompt: "Energy through a day",
    options: {
      vata: "Bursts, then depletion; movement helps until it doesn’t",
      pitta: "Focused drive; can overdo and burn",
      kapha: "Enduring once started; starting is the work",
    },
  },
  {
    id: "stress",
    prompt: "Under lasting strain, you tend to",
    options: {
      vata: "Worry, scatter, lose sleep, feel unmoored",
      pitta: "Irritate, control, inflame, push harder",
      kapha: "Withdraw, hold on, stall, seek comfort food",
    },
  },
  {
    id: "climate",
    prompt: "The climate that has always suited you",
    options: {
      vata: "Warm, humid, still — a sheltered coast, not a desert wind",
      pitta: "Cool, moonlit, slightly moist — shade over blaze",
      kapha: "Warm and dry, with movement in the air",
    },
  },
  {
    id: "sweat",
    prompt: "Perspiration",
    options: {
      vata: "Scant; skin stays dry even in effort",
      pitta: "Easy, warm, sometimes sharp-scented",
      kapha: "Moderate to slow; cool and steady",
    },
  },
  {
    id: "eyes",
    prompt: "Eyes, in their usual expression",
    options: {
      vata: "Smaller or active, slightly dry, often dark",
      pitta: "Penetrating, light-sensitive, a hint of ruddiness",
      kapha: "Large, calm, well-lubricated, softly defined",
    },
  },
  {
    id: "joints",
    prompt: "Joints and gait through a room",
    hint: "How the body has moved since you were young — not a recent injury.",
    options: {
      vata: "Light, quick, sometimes restless or cracking in the joints",
      pitta: "Purposeful, moderate, efficient — the shortest line",
      kapha: "Steady, grounded, the whole sole meeting the floor",
    },
  },
  {
    id: "nails",
    prompt: "Nails, as they tend to grow",
    options: {
      vata: "Dry, ridged, or brittle; pale beds",
      pitta: "Soft, pink, a tendency to inflammation at the edges",
      kapha: "Thick, strong, well-formed, slow-growing",
    },
  },
];

export const vikritiQuestions: DoshaQuestion[] = [
  {
    id: "now-digest",
    prompt: "This week, digestion feels",
    hint: "Vikṛti — the present weather of the body, not your lifelong nature.",
    options: {
      vata: "Gas, dryness, irregular hunger, bloating that moves",
      pitta: "Heat, acidity, strong hunger, a burning aftertaste",
      kapha: "Heaviness after meals, slow, a little fog",
    },
  },
  {
    id: "now-sleep",
    prompt: "This week, sleep has been",
    options: {
      vata: "Thin, late, or broken by thought",
      pitta: "Warm, intense dreams, or waking too sharp",
      kapha: "Too much, groggy, hard to leave",
    },
  },
  {
    id: "now-body",
    prompt: "This week, the body itself",
    options: {
      vata: "Dry, cold, cracking, a little ungrounded",
      pitta: "Inflamed, flushed, impatient in the skin or gut",
      kapha: "Congested, puffy, reluctant",
    },
  },
  {
    id: "now-mind",
    prompt: "This week, the mind",
    options: {
      vata: "Scattered, anxious, leaping",
      pitta: "Critical, driven, easily heated",
      kapha: "Dull, attached, slow to change course",
    },
  },
  {
    id: "now-crave",
    prompt: "Cravings lately lean toward",
    options: {
      vata: "Warm, salty, oily, or just something — anything — now",
      pitta: "Cold drinks, spice, caffeine, or a sharp bite",
      kapha: "Sweet, dairy, bread, the nap after",
    },
  },
  {
    id: "now-ama",
    prompt: "On waking, the tongue and the mouth",
    hint: "Āma — the sticky residue of incomplete fire. A coated tongue is weather, not identity.",
    options: {
      vata: "Dry, a little cracked, or a thin coating that comes and goes",
      pitta: "Yellowish, sour, or heated first thing",
      kapha: "Thick white coat, sweet or dull taste, heavy in the throat",
    },
  },
  {
    id: "now-energy",
    prompt: "This week, energy",
    options: {
      vata: "Spikes and crashes; wired then hollow",
      pitta: "Driven, then irritated when it cannot complete",
      kapha: "Reluctant to begin; once moving, hard to stop or change",
    },
  },
  {
    id: "now-season",
    prompt: "What the season is asking of you",
    options: {
      vata: "To be held: oil, routine, longer exhales, earlier night",
      pitta: "To cool: shade, bitter greens, less proving",
      kapha: "To stir: dawn breath, spice, a walk before the mind votes",
    },
  },
];

export const agniQuestions: AgniQuestion[] = [
  {
    id: "hunger",
    prompt: "Hunger, most days this season",
    hint: "Agni — jatharāgni, the digestive fire. Health is said to stand on this.",
    options: {
      visama: "Unpredictable. Some days ravenous, some days I forget.",
      tikshna: "Sharp, on the clock. Late meals make me irritable or hot.",
      manda: "Quiet. I can go long without real hunger; meals sit.",
      sama: "Reliable, moderate, arriving before I am uncomfortable.",
    },
  },
  {
    id: "after",
    prompt: "Two hours after a proper meal",
    options: {
      visama: "Sometimes light, sometimes bloated — it depends on the wind of the day",
      tikshna: "Already hungry again, or a sour heat if the meal was late or spicy",
      manda: "Still heavy, a little foggy, not ready to move",
      sama: "Complete, clear, ready for the next part of the day",
    },
  },
  {
    id: "heavy",
    prompt: "A rich or late plate",
    options: {
      visama: "Uncertain — sometimes fine, sometimes a night of restlessness and gas",
      tikshna: "I can burn through it, then pay in heat or sharpness",
      manda: "It sits. Sleep thickens. Morning is coated.",
      sama: "I know my measure. A little too much is felt, then forgotten.",
    },
  },
  {
    id: "thirst",
    prompt: "Thirst and the quality of drink you reach for",
    options: {
      visama: "Variable; dry mouth, then no interest; I forget water",
      tikshna: "Strong; I want cold, citrus, or something that bites",
      manda: "Low; cold sweet drinks if anything; water feels like work",
      sama: "Steady; room-temperature water feels like enough",
    },
  },
  {
    id: "elimination-agni",
    prompt: "The fire as it finishes — elimination this season",
    options: {
      visama: "Dry or irregular; the timing wanders",
      tikshna: "Urgent, loose, or burning if I have overdone heat",
      manda: "Slow, sticky, incomplete",
      sama: "Regular, well-formed, without drama",
    },
  },
];

export type DoshaScore = {
  counts: Record<DoshaId, number>;
  percents: Record<DoshaId, number>;
  ranked: DoshaId[];
  pattern: "eka" | "dvandva" | "sama";
  label: string;
  ja: string;
};

export type AgniScore = {
  counts: Record<AgniId, number>;
  ranked: AgniId[];
  type: AgniId;
  percents: Record<AgniId, number>;
};

export function readable<T>(answers: Record<string, T>, min: number): boolean {
  return Object.keys(answers).length >= min;
}

export function scoreAnswers(answers: Record<string, DoshaId>): DoshaScore | null {
  const ids = Object.values(answers);
  if (ids.length === 0) return null;
  const counts: Record<DoshaId, number> = { vata: 0, pitta: 0, kapha: 0 };
  for (const id of ids) counts[id] += 1;
  const total = ids.length;
  const percents = {
    vata: Math.round((counts.vata / total) * 100),
    pitta: Math.round((counts.pitta / total) * 100),
    kapha: Math.round((counts.kapha / total) * 100),
  };
  const ranked = [...DOSHA_ORDER].sort((a, b) => counts[b] - counts[a] || DOSHA_ORDER.indexOf(a) - DOSHA_ORDER.indexOf(b));
  const [a, b, c] = ranked;
  const spread = counts[a] - counts[c];
  const close = counts[a] - counts[b] <= Math.max(1, Math.floor(total * 0.12));
  const allClose = spread <= Math.max(1, Math.floor(total * 0.15));

  let pattern: DoshaScore["pattern"] = "eka";
  let label = doshas[a].name;
  let ja = doshas[a].ja;
  if (allClose && counts[c] > 0) {
    pattern = "sama";
    label = "Tridoṣa · Sama";
    ja = "Sama-prakṛti";
  } else if (close && counts[b] > 0) {
    pattern = "dvandva";
    label = `${doshas[a].sanskrit}–${doshas[b].sanskrit}`;
    ja = label;
  }
  return { counts, percents, ranked, pattern, label, ja };
}

export function scoreAgni(answers: Record<string, AgniId>): AgniScore | null {
  const ids = Object.values(answers);
  if (ids.length === 0) return null;
  const counts: Record<AgniId, number> = { sama: 0, visama: 0, tikshna: 0, manda: 0 };
  for (const id of ids) counts[id] += 1;
  const total = ids.length;
  const percents = {
    sama: Math.round((counts.sama / total) * 100),
    visama: Math.round((counts.visama / total) * 100),
    tikshna: Math.round((counts.tikshna / total) * 100),
    manda: Math.round((counts.manda / total) * 100),
  };
  const ranked = [...AGNI_ORDER].sort((a, b) => counts[b] - counts[a] || AGNI_ORDER.indexOf(a) - AGNI_ORDER.indexOf(b));
  const [lead, second] = ranked;
  const close = counts[lead] - counts[second] <= 1 && counts[second] > 0;
  const type: AgniId = close && lead !== "sama" && second === "sama" ? "sama" : close && counts.sama >= counts[lead] - 1 ? "sama" : lead;
  return { counts, ranked, type, percents };
}

export type Ritu = {
  id: string;
  ritu: string;
  window: string;
  accumulated: DoshaId;
  note: string;
  coast: string;
};

const RITUS: { start: [number, number]; ritu: Ritu }[] = [
  {
    start: [1, 15],
    ritu: {
      id: "sisira",
      ritu: "Śiśira · late winter",
      window: "mid-January – mid-March",
      accumulated: "kapha",
      note: "Cold deepens; Kapha accumulates while Vāta still wants oil. Warm, nourishing, not inert.",
      coast: "On this coast, the rains hold. Bones want oil; lungs want spice and dawn movement so Kapha does not settle.",
    },
  },
  {
    start: [3, 15],
    ritu: {
      id: "vasanta",
      ritu: "Vasanta · spring",
      window: "mid-March – mid-May",
      accumulated: "kapha",
      note: "Winter’s Kapha liquefies. Prefer light, warm, bitter, and movement before the mind negotiates.",
      coast: "Hills green, then dry. This is the season to stir — bitter greens, brisk breath, less dairy.",
    },
  },
  {
    start: [5, 15],
    ritu: {
      id: "grisma",
      ritu: "Grīṣma · summer",
      window: "mid-May – mid-July",
      accumulated: "pitta",
      note: "Pitta climbs with the sun. Cool without drying. Sweet, bitter, astringent. Shade at noon.",
      coast: "Marine layer in the morning, blaze by afternoon. Protect the eyes and the midday meal.",
    },
  },
  {
    start: [7, 15],
    ritu: {
      id: "varsa",
      ritu: "Varṣa · rains",
      window: "mid-July – mid-September",
      accumulated: "vata",
      note: "Classical monsoon aggravates Vāta; agni is weak. Warm, sour, salty, well-cooked.",
      coast: "Here the rains rarely come. Late summer is still dry heat — Pitta remains, Vāta gathers in the wind. Cook your water; do not live on ice.",
    },
  },
  {
    start: [9, 15],
    ritu: {
      id: "sarad",
      ritu: "Śarad · autumn",
      window: "mid-September – mid-November",
      accumulated: "pitta",
      note: "Pitta is still high from summer; the air begins to dry, so Vāta gathers. Pacify heat without scattering.",
      coast: "Santa Ana winds, bright heat, then sudden cool nights. Warm oil, regular meals, moonlight rather than blaze. This is a junction — ṛtusandhi — go gently.",
    },
  },
  {
    start: [11, 15],
    ritu: {
      id: "hemanta",
      ritu: "Hemanta · early winter",
      window: "mid-November – mid-January",
      accumulated: "kapha",
      note: "Agni is strong; the body can take richer, warmer food. Nourish Vāta; keep Kapha from settling with morning movement.",
      coast: "Short light, Pacific cold. Oil the skin. Eat the day’s main plate at noon while the fire is high.",
    },
  },
];

export function seasonNote(d = new Date()): Ritu {
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const stamp = month * 100 + day;
  let current = RITUS[RITUS.length - 1].ritu;
  for (const row of RITUS) {
    const s = row.start[0] * 100 + row.start[1];
    if (stamp >= s) current = row.ritu;
  }
  return current;
}

export type Kala = {
  id: DoshaId;
  window: string;
  span: string;
  counsel: string;
};

const KALAS: { start: number; end: number; kala: Kala }[] = [
  {
    start: 2,
    end: 6,
    kala: {
      id: "vata",
      window: "2–6",
      span: "Brahma muhūrta into dawn",
      counsel: "The mind is thin and clear. Sit, breathe, do not scatter. This is not an hour for screens.",
    },
  },
  {
    start: 6,
    end: 10,
    kala: {
      id: "kapha",
      window: "6–10",
      span: "Morning Kapha",
      counsel: "Heaviness wants motion. Rise, move, take a light warm breakfast. Sleep past this window and the day thickens.",
    },
  },
  {
    start: 10,
    end: 14,
    kala: {
      id: "pitta",
      window: "10–14",
      span: "Midday Pitta",
      counsel: "The day’s fire is highest. The main plate belongs here. Do not skip it, and do not work through it standing.",
    },
  },
  {
    start: 14,
    end: 18,
    kala: {
      id: "vata",
      window: "14–18",
      span: "Afternoon Vāta",
      counsel: "Wind in the channels. A walk, a warm sip, fewer abrupt tasks. Creative work is welcome; depletion is not.",
    },
  },
  {
    start: 18,
    end: 22,
    kala: {
      id: "kapha",
      window: "18–22",
      span: "Evening Kapha",
      counsel: "A lighter dinner, earlier rather than later. Let the day land. Sweetness here becomes sleep, or heaviness.",
    },
  },
  {
    start: 22,
    end: 26,
    kala: {
      id: "pitta",
      window: "22–2",
      span: "Night Pitta",
      counsel: "Repair, not production. Screens feed the fire. If you are awake, sip warm and dim the room.",
    },
  },
];

export function kalaAt(hour: number, minute = 0): Kala {
  const h = ((hour % 24) + 24) % 24 + minute / 60;
  const shifted = h < 2 ? h + 24 : h;
  const found = KALAS.find((k) => shifted >= k.start && shifted < k.end);
  return found?.kala ?? KALAS[0].kala;
}

export function kalaProgress(hour: number, minute = 0): number {
  const h = ((hour % 24) + 24) % 24 + minute / 60;
  return (h / 24) * 100;
}

export function pacify(primary: DoshaId, aggravated: DoshaId | null): DoshaId {
  return aggravated ?? primary;
}

export type DinacharyaStep = { kala: string; title: string; line: string };

export function dinacharyaFor(id: DoshaId): DinacharyaStep[] {
  const table: Record<DoshaId, DinacharyaStep[]> = {
    vata: [
      { kala: "Dawn", title: "Warmth before the world", line: "Warm water. Oil on the skin if you can. Sit before you speak." },
      { kala: "Morning", title: "A breakfast that exists", line: "Cooked, moist, regular. Skip the cold smoothie. Nāḍī Śodhana or a long exhale." },
      { kala: "Noon", title: "The day’s plate", line: "Eat sitting. Warm spices, oil, grain. Do not work through it." },
      { kala: "Afternoon", title: "Hold the wind", line: "A walk, not a sprint of tasks. Tea, not another threshold." },
      { kala: "Night", title: "Earlier than you think", line: "Dim, oil, Soothing Exhale. The mind will bargain — the body wants the dark." },
    ],
    pitta: [
      { kala: "Dawn", title: "Cool arrival", line: "Rose or plain water. Shade. Do not begin the day already proving." },
      { kala: "Morning", title: "Steady, not sharp", line: "A real breakfast before the fire climbs. Heart coherence rather than heat." },
      { kala: "Noon", title: "Honor the fire", line: "The main meal. Bitter greens, coconut, cucumber. Never skip — hunger will turn to heat." },
      { kala: "Afternoon", title: "Unclench", line: "Step out of the sun. A walk in shade. Less critique, of self and others." },
      { kala: "Night", title: "Moon, not blaze", line: "Lighter dinner. No chili, little alcohol. Screens off before Pitta’s night watch." },
    ],
    kapha: [
      { kala: "Dawn", title: "Up before the negotiation", line: "Rise in Kapha’s morning window. Dry brush or warm shower. Movement first." },
      { kala: "Morning", title: "Kindle", line: "Light, spiced, bitter. Energy breath or Dīrgha. Coffee after food, not instead of it." },
      { kala: "Noon", title: "The warm plate, not the nap", line: "Pungent, bitter, astringent. Walk after. Sweetness waits." },
      { kala: "Afternoon", title: "Keep the channel open", line: "A second movement, however small. Variety. Do not thicken the chair." },
      { kala: "Night", title: "Dinner early and light", line: "Finished well before night Pitta. Sleep is a gift — not an extra hour in the morning." },
    ],
  };
  return table[id];
}

export function amaLikely(vikriti: Record<string, DoshaId>, agni: AgniScore | null): boolean {
  const tongue = vikriti["now-ama"];
  if (tongue === "kapha") return true;
  if (agni?.type === "manda") return true;
  return false;
}

export function readingSummary(input: {
  prakriti: DoshaScore;
  vikriti: DoshaScore | null;
  agni: AgniScore | null;
  ritu: Ritu;
  pacifyId: DoshaId;
}): string {
  const agni = input.agni ? agnis[input.agni.type].sanskrit : "not yet sat";
  const weather = input.vikriti ? `${input.vikriti.label} speaking` : "not yet sat";
  return `Prakṛti: ${input.prakriti.ja} (${input.prakriti.label}; Vāta ${input.prakriti.percents.vata}%, Pitta ${input.prakriti.percents.pitta}%, Kapha ${input.prakriti.percents.kapha}%). Vikṛti: ${weather}. Agni: ${agni}. Ṛtu: ${input.ritu.ritu}. Pacify now: ${doshas[input.pacifyId].sanskrit}.`;
}

/** Stable shuffle so back-navigation does not reshuffle, and labels are not implied by order. */
export function stableOrder<T extends string>(seed: string, keys: readonly T[]): T[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  const arr = [...keys];
  for (let i = arr.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    const j = Math.abs(h) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
