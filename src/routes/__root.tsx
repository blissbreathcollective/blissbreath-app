import { useEffect, useState } from "react";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AppShell } from "@/components/layout/AppShell";
import { GateLanding } from "@/components/layout/GateLanding";
import { GATE_STORAGE_KEY, readSanctuaryGate } from "@/lib/gate";
import { HASH_BOOT_SCRIPT } from "@/lib/hash-routes";
import appCss from "../styles.css?url";

const APP_NAME = "Blissbreath Lifestyle Collective";

export const Route = createRootRoute({
  beforeLoad: async () => {
    try {
      const { open } = await readSanctuaryGate();
      return { sanctuaryOpen: open };
    } catch {
      return { sanctuaryOpen: false };
    }
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Breathe into Bliss. Breath, movement, mindset, and nature-aligned nourishment — a quieter stay.",
      },
      { name: "theme-color", content: "#faf6ef" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: "Blissbreath" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Outfit:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  const { sanctuaryOpen } = Route.useRouteContext();
  const [clientOpen, setClientOpen] = useState(sanctuaryOpen);

  useEffect(() => {
    if (sanctuaryOpen) {
      setClientOpen(true);
      return;
    }
    try {
      if (localStorage.getItem(GATE_STORAGE_KEY) === "1") setClientOpen(true);
    } catch {
      /* private mode */
    }
  }, [sanctuaryOpen]);

  const open = sanctuaryOpen || clientOpen;

  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-ivory text-forest min-h-dvh">
        <PreviewHostBridge />
        <script dangerouslySetInnerHTML={{ __html: HASH_BOOT_SCRIPT }} />
        <AuthProvider>
          {open ? (
            <AppShell>
              <Outlet />
            </AppShell>
          ) : (
            <GateLanding onOpened={() => setClientOpen(true)} />
          )}
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
