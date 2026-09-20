import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Home, Leaf, Wind, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { HashLanding } from "@/components/layout/HashLanding";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/path", label: "Path", icon: Sparkles },
  { to: "/breathe", label: "Breathe", icon: Wind },
  { to: "/nourish", label: "Nourish", icon: Leaf },
  { to: "/journal", label: "Journal", icon: BookOpen },
] as const;

function isActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-ivory">
      <HashLanding />
      <header className="sticky top-0 z-30 border-b border-forest/10 bg-ivory/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-3 px-4">
          <Wordmark />
          <div className="flex items-center gap-4">
            <Link
              to="/dosha"
              className="font-sans text-xs font-medium tracking-[0.12em] text-sage-deep uppercase no-underline hover:text-forest"
            >
              Doṣa
            </Link>
            <Link
              to="/reset"
              className="font-sans text-xs font-medium tracking-[0.12em] text-sage-deep uppercase no-underline hover:text-forest"
            >
              7-Day Reset
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-6">
        {children}
      </main>

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-30 flex justify-center px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-2"
      >
        <div className="flex w-full max-w-md items-stretch justify-between gap-0.5 rounded-[1.75rem] bg-forest px-2 py-1.5 shadow-[0_16px_40px_rgba(47,61,50,0.28)]">
          {nav.map((item) => {
            const active = isActive(pathname, item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-12 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 text-[0.65rem] tracking-wide no-underline transition-colors duration-150",
                  active ? "bg-paper/12 text-paper" : "text-sage-soft/80 hover:text-paper",
                )}
              >
                <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
