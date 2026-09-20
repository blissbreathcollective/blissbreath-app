import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { GATE_STORAGE_KEY, closeSanctuary } from "@/lib/gate";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  async function closeDoor() {
    try {
      await closeSanctuary();
    } catch {
      /* still close locally */
    }
    try {
      localStorage.removeItem(GATE_STORAGE_KEY);
    } catch {
      /* private mode */
    }
    window.location.assign("/");
  }

  return (
    <div className="space-y-8">
      <header>
        <p className="font-sans text-[0.68rem] tracking-[0.18em] text-sage-deep uppercase">
          The Collective
        </p>
        <h1 className="mt-1 text-4xl">A lifestyle held in common</h1>
      </header>

      <img
        src="/images/forest-light.jpg"
        alt="Soft forest light through leaves"
        className="h-56 w-full rounded-xl object-cover outline outline-1 -outline-offset-1 outline-forest/10"
      />

      <div className="space-y-4 text-muted">
        <p>
          Blissbreath Lifestyle Collective is the culmination of more than two decades of rigorous,
          hands-on curation in the art of conscious living — transformative breathwork, dynamic
          energy activation, embodied movement, reflective awareness and intentional mindsets, and
          nature-aligned nourishment woven into one daily rhythm.
        </p>
        <p>
          A sanctuary with structure: sensory enough for Tulum mornings, precise enough for
          nervous-system regulation and longevity. Not guru theater. Not hustle wellness. A lifestyle
          inhabited together — and returned to.
        </p>
        <p>
          Neuroscience links consistent meditation and breathwork to grey matter in regions of
          emotional regulation, focus, and resilience. Breath physiology supports oxygenation, vagal
          tone, and nervous-system balance. Plant-based eating supports cellular repair, lower
          inflammation, and longevity — while deepening alignment with nature.
        </p>
        <p className="font-serif text-xl italic text-forest">You are at one with nature.</p>
      </div>

      <section className="rounded-xl bg-paper p-5 shadow-[var(--shadow-card)]">
        <p className="font-sans text-[0.65rem] tracking-[0.14em] text-sage-deep uppercase">
          Here you’ll find
        </p>
        <ul className="mt-3 space-y-2 text-sm">
          <li>Conscious breathwork and meditation</li>
          <li>Signature Energy Breath Sequences and Embodied Breath + Movement Flows</li>
          <li>Reflective awareness and intentional mindsets</li>
          <li>Nature-aligned plant-based recipes and meal support</li>
          <li>A private community for ongoing lifestyle integration</li>
          <li>Coming soon: Facilitator Training for those ready to guide</li>
        </ul>
      </section>

      <div className="flex flex-wrap gap-2">
        <Button asChild>
          <Link to="/reset">Enter the 7-Day Reset</Link>
        </Button>
        <Button variant="ghost" asChild>
          <a href="https://www.blissbreathcollective.com/" target="_blank" rel="noopener noreferrer">
            Visit the Collective
          </a>
        </Button>
      </div>

      <p className="text-sm text-muted">
        Reach out on{" "}
        <a href="https://x.com/blissbreathlife" target="_blank" rel="noopener noreferrer">
          X
        </a>{" "}
        or{" "}
        <a
          href="https://www.instagram.com/blissbreathlife/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        . Patreon and booking links coming soon.
      </p>
      <p className="text-xs text-muted">
        Blissbreath Lifestyle Collective supports wellbeing and conscious lifestyle education and is
        not a substitute for medical care.
      </p>

      <button
        type="button"
        onClick={() => void closeDoor()}
        className="font-sans text-xs tracking-wide text-muted underline-offset-4 hover:text-forest hover:underline"
      >
        Close the door
      </button>
    </div>
  );
}
