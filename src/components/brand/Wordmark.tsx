import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function BreathMark({ className }: { className?: string }) {
  return (
    <svg
      className={cn("text-sage-deep", className)}
      viewBox="0 0 40 40"
      width="28"
      height="28"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8 26c4-10 10-14 16-14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M32 14c-4 10-10 14-16 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="3.25" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      aria-label="Blissbreath Lifestyle Collective home"
      className="inline-flex min-w-0 items-center gap-2.5 text-forest no-underline"
    >
      <BreathMark />
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="font-serif text-[1.2rem] leading-none tracking-wide">Blissbreath</span>
        {!compact ? (
          <span className="truncate font-sans text-[0.62rem] font-normal tracking-[0.04em] text-muted">
            Lifestyle Collective
          </span>
        ) : null}
      </span>
    </Link>
  );
}
