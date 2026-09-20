import { createServerFn } from "@tanstack/react-start";

export const GATE_COOKIE = "bb_sanctuary";
export const GATE_STORAGE_KEY = "bb-sanctuary-open";

export const readSanctuaryGate = createServerFn({ method: "POST" }).handler(
  async (): Promise<{ open: boolean }> => {
    const { isSanctuaryOpen } = await import("./gate.server");
    return { open: isSanctuaryOpen() };
  },
);

export const unlockSanctuary = createServerFn({ method: "POST" })
  .validator((input: { password: string }) => input)
  .handler(async ({ data }): Promise<{ ok: true } | { ok: false; error: string }> => {
    const { tryUnlock } = await import("./gate.server");
    return tryUnlock(data.password);
  });

export const closeSanctuary = createServerFn({ method: "POST" }).handler(async () => {
  const { lockSanctuary } = await import("./gate.server");
  lockSanctuary();
  return { ok: true as const };
});
