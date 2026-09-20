import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Flame, Wind, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { recipeById, seqById } from "@/lib/content";
import {
  AGNI_ORDER,
  DOSHA_ORDER,
  agniQuestions,
  agnis,
  amaLikely,
  dinacharyaFor,
  doshas,
  gunaPairs,
  kalaAt,
  kalaProgress,
  prakritiQuestions,
  rasa,
  readable,
  readingSummary,
  scoreAgni,
  scoreAnswers,
  seasonNote,
  sevenTypes,
  stableOrder,
  tastesFor,
  vikritiQuestions,
  type AgniId,
  type AgniQuestion,
  type DoshaId,
  type DoshaQuestion,
} from "@/lib/dosha";
import { sitWithDosha } from "@/lib/reflect";
import { useSanctuary } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dosha")({ component: DoshaPage });

const ICONS = { vata: Wind, pitta: Flame, kapha: Droplets };

type Chapter = "prakriti" | "vikriti" | "agni";
type Layer = "intro" | "sit" | "result";

function DoshaPage() {
  const prakriti = useSanctuary((s) => s.prakriti);
  const vikriti = useSanctuary((s) => s.vikriti);
  const agni = useSanctuary((s) => s.agni);
  const setPrakriti = useSanctuary((s) => s.setPrakriti);
  const setVikriti = useSanctuary((s) => s.setVikriti);
  const setAgni = useSanctuary((s) => s.setAgni);
  const clearDosha = useSanctuary((s) => s.clearDosha);

  const prakritiScore = scoreAnswers(prakriti);
  const hasResult = readable(prakriti, 12);

  const [layer, setLayer] = useState<Layer>("intro");
  const [chapter, setChapter] = useState<Chapter>("prakriti");
  const [index, setIndex] = useState(0);
  const [draftDosha, setDraftDosha] = useState<Record<string, DoshaId>>({});
  const [draftAgni, setDraftAgni] = useState<Record<string, AgniId>>({});
  const [fullSit, setFullSit] = useState(true);

  useEffect(() => {
    const apply = () => {
      if (readable(useSanctuary.getState().prakriti, 12)) {
        setLayer((l) => (l === "sit" ? l : "result"));
      }
    };
    if (useSanctuary.persist.hasHydrated()) apply();
    return useSanctuary.persist.onFinishHydration(apply);
  }, []);

  const doshaQuestions = chapter === "vikriti" ? vikritiQuestions : prakritiQuestions;

  function begin(which: Chapter) {
    const full = which === "prakriti";
    setFullSit(full);
    if (which === "agni") {
      setDraftAgni(agni);
      setDraftDosha({});
    } else {
      setDraftDosha(which === "vikriti" ? vikriti : {});
      setDraftAgni({});
    }
    setChapter(which);
    setIndex(0);
    setLayer("sit");
  }

  function chooseDosha(id: string, value: DoshaId) {
    const next = { ...draftDosha, [id]: value };
    setDraftDosha(next);
    if (index < doshaQuestions.length - 1) {
      setIndex(index + 1);
      return;
    }
    if (chapter === "prakriti") {
      setPrakriti(next);
      setDraftDosha({});
      setChapter("vikriti");
      setIndex(0);
      return;
    }
    setVikriti(next);
    if (fullSit) {
      setDraftAgni({});
      setChapter("agni");
      setIndex(0);
    } else {
      setLayer("result");
    }
  }

  function chooseAgni(id: string, value: AgniId) {
    const next = { ...draftAgni, [id]: value };
    setDraftAgni(next);
    if (index < agniQuestions.length - 1) {
      setIndex(index + 1);
      return;
    }
    setAgni(next);
    setLayer("result");
  }

  function back() {
    if (index > 0) {
      setIndex(index - 1);
      return;
    }
    if (!fullSit) {
      setLayer(hasResult ? "result" : "intro");
      return;
    }
    if (chapter === "agni") {
      setChapter("vikriti");
      setDraftDosha(vikriti);
      setIndex(vikritiQuestions.length - 1);
      return;
    }
    if (chapter === "vikriti") {
      setChapter("prakriti");
      setDraftDosha(prakriti);
      setIndex(prakritiQuestions.length - 1);
      return;
    }
    setLayer(hasResult ? "result" : "intro");
  }

  return (
    <div className="space-y-8">
      {layer === "intro" ? (
        <Intro onBegin={() => begin("prakriti")} hasResult={hasResult} onResult={() => setLayer("result")} />
      ) : null}
      {layer === "sit" && chapter !== "agni" ? (
        <SitDosha
          chapter={chapter}
          questions={doshaQuestions}
          index={index}
          draft={draftDosha}
          onChoose={chooseDosha}
          onBack={back}
        />
      ) : null}
      {layer === "sit" && chapter === "agni" ? (
        <SitAgni questions={agniQuestions} index={index} draft={draftAgni} onChoose={chooseAgni} onBack={back} />
      ) : null}
      {layer === "result" && prakritiScore ? (
        <Result
          onRetake={() => {
            clearDosha();
            begin("prakriti");
          }}
          onVikriti={() => begin("vikriti")}
          onAgni={() => begin("agni")}
          onPrinciples={() => setLayer("intro")}
        />
      ) : null}
    </div>
  );
}

function Intro({
  onBegin,
  hasResult,
  onResult,
}: {
  onBegin: () => void;
  hasResult: boolean;
  onResult: () => void;
}) {
  const season = seasonNote();
  return (
    <>
      <header>
        <p className="font-sans text-xs tracking-widest text-sage-deep uppercase">Caraka · Vimāna Sthāna 8</p>
        <h1 className="mt-1 text-4xl">Investigate the doṣas</h1>
        <div className="tri-mark" aria-hidden>
          <i />
          <i />
          <i />
        </div>
        <p className="mt-3 max-w-xl text-muted">
          Vāta, Pitta, and Kapha are not personality labels. They are functional principles — movement,
          transformation, cohesion — the basis of deha-prakṛti, the constitution set at conception and
          revealed across a lifetime. Treat the weather first. Do not confuse a season for a soul.
        </p>
      </header>

      <article className="rounded-xl bg-paper p-5 shadow-[var(--shadow-card)]">
        <p className="font-sans text-xs tracking-widest text-sage-deep uppercase">Three sittings</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <div>
            <h2 className="text-xl">Prakṛti</h2>
            <p className="mt-1 text-sm text-muted">
              Lifelong nature. Bones, sleep, appetite, the mind at rest — not this week’s story.
            </p>
          </div>
          <div>
            <h2 className="text-xl">Vikṛti</h2>
            <p className="mt-1 text-sm text-muted">
              Present imbalance. Season, strain, and diet move the doṣas. This is what to pacify now.
            </p>
          </div>
          <div>
            <h2 className="text-xl">Agni</h2>
            <p className="mt-1 text-sm text-muted">
              Digestive fire — samā, viṣama, tīkṣṇa, manda. Health is said to stand on this.
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm italic text-muted">
          {season.ritu}. {season.coast}
        </p>
      </article>

      <div className="grid gap-3">
        {(Object.keys(doshas) as DoshaId[]).map((id) => {
          const d = doshas[id];
          const Icon = ICONS[id];
          return (
            <article key={id} className="rounded-xl bg-paper p-5 shadow-[var(--shadow-card)]">
              <p className="flex items-center gap-2 font-sans text-xs tracking-widest text-sage-deep uppercase">
                <Icon className="size-4" strokeWidth={1.6} aria-hidden />
                {d.sanskrit} · {d.elements}
              </p>
              <h2 className="mt-2 text-2xl">{d.name}</h2>
              <p className="mt-1">{d.essence}</p>
              <p className="mt-2 text-sm text-muted">{d.gunas.join(" · ")}</p>
            </article>
          );
        })}
      </div>

      <article className="rounded-xl bg-ivory-warm p-5">
        <p className="font-sans text-xs tracking-widest text-sage-deep uppercase">Sāmānya–Viśeṣa</p>
        <p className="mt-2 text-sm">
          Like increases like; opposites pacify. The ten gurvādi pairs are how a vaidya thinks — not
          as types of people, as qualities in a moment.
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {gunaPairs.map((g) => (
            <li key={g.a} className="text-sm">
              <span className="font-medium">{g.a}</span>
              <span className="text-muted"> · {g.b}</span>
            </li>
          ))}
        </ul>
      </article>

      <article className="rounded-xl bg-paper p-5 shadow-[var(--shadow-card)]">
        <p className="font-sans text-xs tracking-widest text-sage-deep uppercase">Seven prakṛti</p>
        <ul className="mt-3 space-y-2">
          {sevenTypes.map((t) => (
            <li key={t.id} className="text-sm">
              <span className="font-medium">{t.label}.</span>{" "}
              <span className="text-muted">{t.note}</span>
            </li>
          ))}
        </ul>
      </article>

      <p className="text-sm text-muted">
        Options are unlabeled. Answer as the body has been, not as a preferred story. Pulse (nāḍī
        parīkṣā) with a trained vaidya remains the clinical standard.
      </p>

      <div className="flex flex-wrap gap-2">
        <Button onClick={onBegin}>Begin prakṛti</Button>
        {hasResult ? (
          <Button variant="ghost" onClick={onResult}>
            Return to your reading
          </Button>
        ) : null}
      </div>
      <p className="text-xs text-muted">
        This is lifestyle education, not a diagnosis. Blissbreath is not a substitute for medical care.
      </p>
    </>
  );
}

function ChapterBar({ chapter }: { chapter: Chapter }) {
  const steps: { id: Chapter; label: string }[] = [
    { id: "prakriti", label: "Prakṛti" },
    { id: "vikriti", label: "Vikṛti" },
    { id: "agni", label: "Agni" },
  ];
  return (
    <ol className="flex gap-2 font-sans text-[0.65rem] tracking-[0.14em] uppercase">
      {steps.map((s) => (
        <li
          key={s.id}
          className={cn("text-muted", chapter === s.id && "text-sage-deep")}
        >
          {s.label}
        </li>
      ))}
    </ol>
  );
}

function SitDosha({
  chapter,
  questions,
  index,
  draft,
  onChoose,
  onBack,
}: {
  chapter: "prakriti" | "vikriti";
  questions: DoshaQuestion[];
  index: number;
  draft: Record<string, DoshaId>;
  onChoose: (id: string, value: DoshaId) => void;
  onBack: () => void;
}) {
  const q = questions[index];
  const progress = ((index + 1) / questions.length) * 100;
  const order = useMemo(() => stableOrder(q.id, DOSHA_ORDER), [q.id]);
  return (
    <div>
      <ChapterBar chapter={chapter} />
      <p className="mt-2 font-sans text-xs tracking-widest text-sage-deep uppercase">
        {chapter === "prakriti" ? "Most of your life" : "This season"} · {index + 1} of {questions.length}
      </p>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-sand">
        <div className="h-full bg-sage-deep transition-[width] duration-200" style={{ width: `${progress}%` }} />
      </div>
      <h1 className="mt-6 text-3xl">{q.prompt}</h1>
      {q.hint ? <p className="mt-2 text-sm italic text-muted">{q.hint}</p> : null}
      <div className="mt-6 grid gap-3">
        {order.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => onChoose(q.id, id)}
            className={cn(
              "min-h-14 rounded-xl bg-paper p-4 text-left shadow-[var(--shadow-card)] transition-[box-shadow] duration-150",
              draft[q.id] === id && "shadow-[0_0_0_1px_var(--color-sage-deep),0_14px_40px_rgba(47,61,50,0.08)]",
            )}
          >
            <p className="text-sm">{q.options[id]}</p>
          </button>
        ))}
      </div>
      <button type="button" onClick={onBack} className="mt-6 min-h-11 font-sans text-sm text-sage-deep">
        Back
      </button>
    </div>
  );
}

function SitAgni({
  questions,
  index,
  draft,
  onChoose,
  onBack,
}: {
  questions: AgniQuestion[];
  index: number;
  draft: Record<string, AgniId>;
  onChoose: (id: string, value: AgniId) => void;
  onBack: () => void;
}) {
  const q = questions[index];
  const progress = ((index + 1) / questions.length) * 100;
  const order = useMemo(() => stableOrder(q.id, AGNI_ORDER), [q.id]);
  return (
    <div>
      <ChapterBar chapter="agni" />
      <p className="mt-2 font-sans text-xs tracking-widest text-sage-deep uppercase">
        Jatharāgni · {index + 1} of {questions.length}
      </p>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-sand">
        <div className="h-full bg-sage-deep transition-[width] duration-200" style={{ width: `${progress}%` }} />
      </div>
      <h1 className="mt-6 text-3xl">{q.prompt}</h1>
      {q.hint ? <p className="mt-2 text-sm italic text-muted">{q.hint}</p> : null}
      <div className="mt-6 grid gap-3">
        {order.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => onChoose(q.id, id)}
            className={cn(
              "min-h-14 rounded-xl bg-paper p-4 text-left shadow-[var(--shadow-card)] transition-[box-shadow] duration-150",
              draft[q.id] === id && "shadow-[0_0_0_1px_var(--color-sage-deep),0_14px_40px_rgba(47,61,50,0.08)]",
            )}
          >
            <p className="text-sm">{q.options[id]}</p>
          </button>
        ))}
      </div>
      <button type="button" onClick={onBack} className="mt-6 min-h-11 font-sans text-sm text-sage-deep">
        Back
      </button>
    </div>
  );
}

function Ratio({ score }: { score: NonNullable<ReturnType<typeof scoreAnswers>> }) {
  return (
    <div className="space-y-3">
      {score.ranked.map((id) => (
        <div key={id}>
          <div className="flex justify-between font-sans text-xs tracking-wide text-muted">
            <span>{doshas[id].sanskrit}</span>
            <span className="tabular-nums">{score.percents[id]}%</span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-sand">
            <div className="h-full rounded-full bg-sage-deep" style={{ width: `${score.percents[id]}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function KalaClock() {
  const [now, setNow] = useState<{ hour: number; minute: number } | null>(null);
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNow({ hour: d.getHours(), minute: d.getMinutes() });
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  if (!now) {
    return <div className="h-16" />;
  }
  const kala = kalaAt(now.hour, now.minute);
  const pct = kalaProgress(now.hour, now.minute);
  return (
    <article className="rounded-xl bg-paper p-5 shadow-[var(--shadow-card)]">
      <p className="font-sans text-xs tracking-widest text-sage-deep uppercase">
        Doṣa kāla · {kala.window}
      </p>
      <h2 className="mt-2 text-2xl">
        {doshas[kala.id].sanskrit} · {kala.span}
      </h2>
      <div className="relative mt-4">
        <div className="kala-track" aria-hidden>
          <span className="kala-pitta" style={{ left: "0%", width: "8.33%" }} />
          <span className="kala-vata" style={{ left: "8.33%", width: "16.67%" }} />
          <span className="kala-kapha" style={{ left: "25%", width: "16.67%" }} />
          <span className="kala-pitta" style={{ left: "41.67%", width: "16.67%" }} />
          <span className="kala-vata" style={{ left: "58.33%", width: "16.67%" }} />
          <span className="kala-kapha" style={{ left: "75%", width: "16.67%" }} />
          <span className="kala-pitta" style={{ left: "91.67%", width: "8.33%" }} />
        </div>
        <div className="kala-now" style={{ left: `${pct}%` }} />
      </div>
      <div className="relative mt-2 h-4 font-sans text-[0.65rem] tracking-wide text-muted">
        {[
          { h: "2", p: 8.33 },
          { h: "6", p: 25 },
          { h: "10", p: 41.67 },
          { h: "14", p: 58.33 },
          { h: "18", p: 75 },
          { h: "22", p: 91.67 },
        ].map((m) => (
          <span key={m.h} className="absolute -translate-x-1/2 tabular-nums" style={{ left: `${m.p}%` }}>
            {m.h}
          </span>
        ))}
      </div>
      <p className="mt-3 text-sm">{kala.counsel}</p>
    </article>
  );
}

function Result({
  onRetake,
  onVikriti,
  onAgni,
  onPrinciples,
}: {
  onRetake: () => void;
  onVikriti: () => void;
  onAgni: () => void;
  onPrinciples: () => void;
}) {
  const prakritiAnswers = useSanctuary((s) => s.prakriti);
  const vikritiAnswers = useSanctuary((s) => s.vikriti);
  const agniAnswers = useSanctuary((s) => s.agni);
  const vikritiLog = useSanctuary((s) => s.vikritiLog);
  const prakriti = scoreAnswers(prakritiAnswers)!;
  const vikriti = readable(vikritiAnswers, 4) ? scoreAnswers(vikritiAnswers) : null;
  const agni = readable(agniAnswers, 3) ? scoreAgni(agniAnswers) : null;
  const primary = prakriti.ranked[0];
  const toPacify = vikriti ? vikriti.ranked[0] : primary;
  const d = doshas[toPacify];
  const nature = doshas[primary];
  const seq = seqById[d.breath];
  const season = seasonNote();
  const plates = useMemo(() => d.recipeIds.map((id) => recipeById[id]).filter(Boolean), [d.recipeIds]);
  const dinacharya = dinacharyaFor(toPacify);
  const tastes = tastesFor[toPacify];
  const ama = amaLikely(vikritiAnswers, agni);
  const [guide, setGuide] = useState<string | null>(null);
  const [guideState, setGuideState] = useState<"idle" | "wait" | "err">("idle");

  async function sit() {
    setGuideState("wait");
    setGuide(null);
    try {
      const res = await sitWithDosha({
        data: {
          reading: readingSummary({ prakriti, vikriti, agni, ritu: season, pacifyId: toPacify }),
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

  const patternCopy =
    prakriti.pattern === "sama"
      ? "A relatively even tridoṣa constitution — rare, and asking for season-led care rather than a single prescription."
      : prakriti.pattern === "dvandva"
        ? "A dual prakṛti. Honor both, and pacify whichever is currently loud."
        : `${nature.sanskrit} leads. Live with its gifts; do not feed its excess.`;

  return (
    <>
      <header>
        <p className="font-sans text-xs tracking-widest text-sage-deep uppercase">Your reading</p>
        <h1 className="mt-1 text-4xl">{prakriti.ja}</h1>
        <p className="mt-1 font-sans text-sm tracking-wide text-sage-deep">
          {prakriti.pattern === "sama"
            ? "Sama-prakṛti · even tridoṣa"
            : prakriti.pattern === "dvandva"
              ? "Dvandva prakṛti · dual constitution"
              : "Eka-doṣa · a single principle leads"}
        </p>
        <p className="mt-2 text-muted">{patternCopy}</p>
      </header>

      <article className="rounded-xl bg-paper p-5 shadow-[var(--shadow-card)]">
        <p className="font-sans text-xs tracking-widest text-sage-deep uppercase">Prakṛti ratio</p>
        <div className="mt-4">
          <Ratio score={prakriti} />
        </div>
      </article>

      {vikriti ? (
        <article className="rounded-xl bg-paper p-5 shadow-[var(--shadow-card)]">
          <p className="font-sans text-xs tracking-widest text-sage-deep uppercase">Vikṛti · this season</p>
          <h2 className="mt-2 text-2xl">
            {vikriti.ja}
            {vikriti.ranked[0] !== primary ? " is speaking louder than usual" : " is in keeping with your nature"}
          </h2>
          <p className="mt-2 text-sm text-muted">
            Pacify {doshas[toPacify].sanskrit} first. Prakṛti is the soil; vikṛti is the weather.
          </p>
          <div className="mt-4">
            <Ratio score={vikriti} />
          </div>
        </article>
      ) : (
        <article className="rounded-xl bg-paper p-5 shadow-[var(--shadow-card)]">
          <p className="font-sans text-xs tracking-widest text-sage-deep uppercase">Vikṛti</p>
          <p className="mt-2 text-sm text-muted">The present weather has not been sat yet.</p>
          <div className="mt-3">
            <Button onClick={onVikriti}>Sit for vikṛti</Button>
          </div>
        </article>
      )}

      {agni ? (
        <article className="rounded-xl bg-paper p-5 shadow-[var(--shadow-card)]">
          <p className="font-sans text-xs tracking-widest text-sage-deep uppercase">Agni · jatharāgni</p>
          <h2 className="mt-2 text-2xl">{agnis[agni.type].sanskrit}</h2>
          <p className="mt-2">{agnis[agni.type].essence}</p>
          <p className="mt-2 text-sm text-muted">{agnis[agni.type].counsel}</p>
          {ama ? (
            <p className="mt-3 text-sm italic text-muted">
              Signs of āma are present. Kindle the fire with warmth, bitter taste, and walking — before
              richer plates.
            </p>
          ) : null}
        </article>
      ) : (
        <article className="rounded-xl bg-paper p-5 shadow-[var(--shadow-card)]">
          <p className="font-sans text-xs tracking-widest text-sage-deep uppercase">Agni</p>
          <p className="mt-2 text-sm text-muted">
            Digestive fire has not been sat. Caraka places agni at the root of health.
          </p>
          <div className="mt-3">
            <Button onClick={onAgni}>Sit for agni</Button>
          </div>
        </article>
      )}

      <article className="rounded-xl bg-ivory-warm p-5">
        <p className="font-sans text-xs tracking-widest text-sage-deep uppercase">{season.ritu}</p>
        <p className="mt-1 font-sans text-xs tracking-wide text-muted">{season.window}</p>
        <p className="mt-2 text-sm">{season.note}</p>
        <p className="mt-2 text-sm italic text-muted">{season.coast}</p>
      </article>

      <KalaClock />

      <section>
        <p className="font-sans text-xs tracking-widest text-sage-deep uppercase">
          Dina-caryā · pacifying {d.sanskrit}
        </p>
        <ul className="mt-3 space-y-2">
          {dinacharya.map((step) => (
            <li key={step.kala} className="rounded-xl bg-paper p-4 shadow-[var(--shadow-card)]">
              <p className="font-sans text-[0.65rem] tracking-[0.14em] text-sage-deep uppercase">
                {step.kala}
              </p>
              <h3 className="mt-1 text-xl">{step.title}</h3>
              <p className="mt-1 text-sm text-muted">{step.line}</p>
            </li>
          ))}
        </ul>
      </section>

      <article className="rounded-xl bg-paper p-5 shadow-[var(--shadow-card)]">
        <p className="font-sans text-xs tracking-widest text-sage-deep uppercase">Ṣaḍ-rasa · six tastes</p>
        <p className="mt-2 text-sm text-muted">Favor the tastes that pacify {d.sanskrit} now. Like increases like.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {rasa.map((r) => {
            const favor = tastes.favor.includes(r.id);
            const ease = tastes.ease.includes(r.id);
            return (
              <span
                key={r.id}
                className={cn(
                  "rounded-pill px-3 py-1.5 font-sans text-xs tracking-wide",
                  favor && "bg-sage-deep text-paper",
                  ease && "bg-sand text-muted line-through decoration-forest/30",
                  !favor && !ease && "bg-ivory-warm text-forest",
                )}
              >
                {r.sanskrit}
                <span className="opacity-70"> · {r.english}</span>
              </span>
            );
          })}
        </div>
      </article>

      <article className="rounded-xl bg-paper p-5 shadow-[var(--shadow-card)]">
        <p className="font-sans text-xs tracking-widest text-sage-deep uppercase">
          {nature.sanskrit} in balance
        </p>
        <p className="mt-2">{nature.whenBalanced}</p>
        <p className="mt-3 text-sm text-muted">When aggravated: {nature.whenAggravated}</p>
        <p className="mt-3 text-sm">{nature.body}</p>
        <p className="mt-2 text-sm">{nature.mind}</p>
        <p className="mt-3 text-sm text-muted">{nature.gunas.join(" · ")}</p>
      </article>

      <section>
        <p className="font-sans text-xs tracking-widest text-sage-deep uppercase">
          What to favor now · {d.name}
        </p>
        <ul className="mt-3 space-y-2">
          {d.favor.map((line) => (
            <li key={line} className="rounded-lg bg-paper px-4 py-3 text-sm shadow-[var(--shadow-card)]">
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-muted">Ease off: {d.ease.join("; ")}.</p>
      </section>

      <section className="rounded-xl bg-paper p-5 shadow-[var(--shadow-card)]">
        <p className="font-sans text-xs tracking-widest text-sage-deep uppercase">Today’s pairing</p>
        <h2 className="mt-2 text-2xl">{seq.name}</h2>
        <p className="mt-1 text-sm text-muted">{d.nourish}</p>
        <div className="mt-4">
          <Button asChild>
            <Link to="/breathe" search={{ seq: d.breath }}>
              Practice {seq.name}
            </Link>
          </Button>
        </div>
        <ul className="mt-4 space-y-2">
          {plates.map((r) => (
            <li key={r.id} className="text-sm">
              <Link to="/nourish/$recipeId" params={{ recipeId: r.id }} className="text-sage-deep">
                {r.title}
              </Link>
              {" — "}
              {r.plate}
            </li>
          ))}
        </ul>
        <Link to="/nourish" className="mt-3 inline-block min-h-11 font-sans text-sm text-sage-deep">
          Open Nourish
        </Link>
      </section>

      <article className="rounded-xl bg-paper p-5 shadow-[var(--shadow-card)]">
        <p className="font-sans text-xs tracking-widest text-sage-deep uppercase">Sit with this reading</p>
        <p className="mt-2 text-sm text-muted">
          A few sentences of integration — not a diagnosis. Presence, not performance.
        </p>
        <div className="mt-4">
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

      {vikritiLog.length > 1 ? (
        <section>
          <p className="font-sans text-xs tracking-widest text-sage-deep uppercase">Vikṛti over time</p>
          <ul className="mt-3 space-y-2">
            {vikritiLog.slice(0, 6).map((entry) => {
              const s = scoreAnswers(entry.answers);
              if (!s) return null;
              return (
                <li key={entry.at} className="flex justify-between rounded-lg bg-paper px-4 py-3 text-sm shadow-[var(--shadow-card)]">
                  <span>{s.ja}</span>
                  <span className="font-sans text-xs tracking-wide text-muted tabular-nums">
                    {new Date(entry.at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <Button variant="ghost" onClick={onVikriti}>
          Refresh vikṛti
        </Button>
        <Button variant="ghost" onClick={onAgni}>
          Refresh agni
        </Button>
        <Button variant="quiet" onClick={onPrinciples}>
          The principles
        </Button>
        <Button variant="quiet" onClick={onRetake}>
          Begin again
        </Button>
      </div>
      <p className="text-xs text-muted">
        Educational only. For treatment of illness, consult a qualified practitioner. Pulse diagnosis
        cannot be performed here. Blissbreath supports wellbeing and is not a substitute for medical care.
      </p>
    </>
  );
}
