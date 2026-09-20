import { createFileRoute } from "@tanstack/react-router";
import { BreathStudio } from "@/components/breathe/BreathStudio";

export const Route = createFileRoute("/breathe")({
  validateSearch: (s: Record<string, unknown>) => ({
    seq: typeof s.seq === "string" ? s.seq : undefined,
  }),
  component: BreathePage,
});

function BreathePage() {
  const { seq } = Route.useSearch();
  return (
    <div>
      <p className="font-sans text-[0.68rem] tracking-[0.18em] text-sage-deep uppercase">
        Conscious Breath
      </p>
      <h1 className="mt-1 text-3xl sm:text-4xl">Signature Energy Sequences</h1>
      <p className="mt-2 max-w-lg text-sm text-muted sm:text-base">
        Ten to fifteen minutes that regulate the nervous system, awaken vitality, and create spacious
        presence. Sit tall, soften the jaw, follow the count.
      </p>
      <BreathStudio initialId={seq} />
    </div>
  );
}
