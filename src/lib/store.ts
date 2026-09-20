import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AgniId, DoshaId } from "@/lib/dosha";
import { isoLocal } from "@/lib/dates";

export type PracticeEntry = {
  id: string;
  date: string;
  sequenceId: string;
  minutes: number;
  completed: boolean;
  at: number;
};

export type JournalEntry = {
  id: string;
  date: string;
  prompt: string;
  body: string;
  at: number;
};

export type VikritiLogEntry = {
  at: number;
  answers: Record<string, DoshaId>;
};

type SanctuaryState = {
  resetComplete: boolean[];
  email: string | null;
  practices: PracticeEntry[];
  journal: JournalEntry[];
  favoriteRecipes: string[];
  favoriteSeqs: string[];
  chimes: boolean;
  lastPracticeDate: string | null;
  streak: number;
  totalMinutes: number;
  prakriti: Record<string, DoshaId>;
  vikriti: Record<string, DoshaId>;
  agni: Record<string, AgniId>;
  doshaAt: number | null;
  vikritiLog: VikritiLogEntry[];
  toggleResetDay: (index: number) => void;
  setEmail: (email: string) => void;
  logPractice: (entry: Omit<PracticeEntry, "id" | "at" | "date"> & { date?: string }) => void;
  saveJournal: (prompt: string, body: string, date?: string) => void;
  updateJournal: (id: string, body: string) => void;
  toggleFavRecipe: (id: string) => void;
  toggleFavSeq: (id: string) => void;
  setChimes: (on: boolean) => void;
  setPrakriti: (answers: Record<string, DoshaId>) => void;
  setVikriti: (answers: Record<string, DoshaId>) => void;
  setAgni: (answers: Record<string, AgniId>) => void;
  clearDosha: () => void;
};

function nextStreak(last: string | null, today: string, prev: number): number {
  if (last === today) return Math.max(prev, 1);
  if (!last) return 1;
  const [ly, lm, ld] = last.split("-").map(Number);
  const lastDate = new Date(ly, lm - 1, ld);
  lastDate.setDate(lastDate.getDate() + 1);
  const y = lastDate.getFullYear();
  const m = String(lastDate.getMonth() + 1).padStart(2, "0");
  const d = String(lastDate.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}` === today ? prev + 1 : 1;
}

export const useSanctuary = create<SanctuaryState>()(
  persist(
    (set, get) => ({
      resetComplete: Array(7).fill(false),
      email: null,
      practices: [],
      journal: [],
      favoriteRecipes: [],
      favoriteSeqs: [],
      chimes: true,
      lastPracticeDate: null,
      streak: 0,
      totalMinutes: 0,
      prakriti: {},
      vikriti: {},
      agni: {},
      doshaAt: null,
      vikritiLog: [],
      toggleResetDay: (index) =>
        set((s) => {
          const next = [...s.resetComplete];
          next[index] = !next[index];
          return { resetComplete: next };
        }),
      setEmail: (email) => set({ email }),
      logPractice: (entry) => {
        const today = entry.date ?? isoLocal();
        const id = `${today}-${entry.sequenceId}-${Date.now()}`;
        const prev = get();
        const streak =
          entry.completed ? nextStreak(prev.lastPracticeDate, today, prev.streak) : prev.streak;
        set({
          practices: [
            { id, at: Date.now(), date: today, ...entry },
            ...prev.practices,
          ].slice(0, 180),
          lastPracticeDate: entry.completed ? today : prev.lastPracticeDate,
          streak: entry.completed ? streak : prev.streak,
          totalMinutes: prev.totalMinutes + (entry.completed ? entry.minutes : 0),
        });
      },
      saveJournal: (prompt, body, date) => {
        const today = date ?? isoLocal();
        const existing = get().journal.find((j) => j.date === today && j.prompt === prompt);
        if (existing) {
          set((s) => ({
            journal: s.journal.map((j) =>
              j.id === existing.id ? { ...j, body, at: Date.now() } : j,
            ),
          }));
          return;
        }
        set((s) => ({
          journal: [
            { id: `${today}-${Date.now()}`, date: today, prompt, body, at: Date.now() },
            ...s.journal,
          ].slice(0, 365),
        }));
      },
      updateJournal: (id, body) =>
        set((s) => ({
          journal: s.journal.map((j) => (j.id === id ? { ...j, body, at: Date.now() } : j)),
        })),
      toggleFavRecipe: (id) =>
        set((s) => ({
          favoriteRecipes: s.favoriteRecipes.includes(id)
            ? s.favoriteRecipes.filter((x) => x !== id)
            : [...s.favoriteRecipes, id],
        })),
      toggleFavSeq: (id) =>
        set((s) => ({
          favoriteSeqs: s.favoriteSeqs.includes(id)
            ? s.favoriteSeqs.filter((x) => x !== id)
            : [...s.favoriteSeqs, id],
        })),
      setChimes: (on) => set({ chimes: on }),
      setPrakriti: (answers) => set({ prakriti: answers, doshaAt: Date.now() }),
      setVikriti: (answers) =>
        set((s) => ({
          vikriti: answers,
          doshaAt: Date.now(),
          vikritiLog: [{ at: Date.now(), answers }, ...s.vikritiLog].slice(0, 12),
        })),
      setAgni: (answers) => set({ agni: answers, doshaAt: Date.now() }),
      clearDosha: () => set({ prakriti: {}, vikriti: {}, agni: {}, doshaAt: null }),
    }),
    { name: "blissbreath-sanctuary" },
  ),
);
