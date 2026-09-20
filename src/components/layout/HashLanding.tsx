import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { destFromHash } from "@/lib/hash-routes";

/** Honors the public hash URL (app.blissbreathcollective.com/#reset). */
export function HashLanding() {
  const router = useRouter();

  useEffect(() => {
    const apply = () => {
      const dest = destFromHash(window.location.hash);
      if (!dest) return;
      const here = window.location.pathname.replace(/\/$/, "") || "/";
      const there = dest.replace(/\/$/, "") || "/";
      if (here === there) return;
      router.history.push(dest);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, [router]);

  return null;
}
