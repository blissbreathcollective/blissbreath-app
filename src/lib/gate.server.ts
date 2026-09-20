import { createHmac, timingSafeEqual } from "node:crypto";
import { getCookie, getRequest, setCookie } from "@tanstack/react-start/server";
import { GATE_COOKIE } from "./gate";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 45;
const HMAC_MSG = "blissbreath-sanctuary-v1";

function configuredPassword(): string | null {
  const fromEnv = process.env.SANCTUARY_PASSWORD?.trim();
  if (fromEnv) return fromEnv;
  // Vercel production must set SANCTUARY_PASSWORD. Local preview keeps a
  // working word so the gate can be sat with during build.
  if (process.env.VERCEL) return null;
  return "into bliss";
}

export function normalizeGateWord(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function hmacFor(password: string): string {
  return createHmac("sha256", password).update(HMAC_MSG).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function requestIsHttps(): boolean {
  try {
    const req = getRequest();
    const forwarded = req.headers.get("x-forwarded-proto");
    if (forwarded) return forwarded.split(",")[0]?.trim() === "https";
    return new URL(req.url).protocol === "https:";
  } catch {
    return process.env.NODE_ENV === "production";
  }
}

function writeGateCookie(value: string, maxAge: number) {
  setCookie(GATE_COOKIE, value, {
    path: "/",
    httpOnly: true,
    secure: requestIsHttps(),
    sameSite: "lax",
    maxAge,
  });
}

export function isSanctuaryOpen(): boolean {
  const password = configuredPassword();
  if (!password) return false;
  const token = getCookie(GATE_COOKIE);
  if (!token) return false;
  return safeEqual(token, hmacFor(password));
}

export function tryUnlock(password: string): { ok: true } | { ok: false; error: string } {
  const expected = configuredPassword();
  if (!expected) {
    return { ok: false, error: "This door has not been given a word yet." };
  }
  const given = normalizeGateWord(password);
  if (!given) {
    return { ok: false, error: "Offer the word you were given." };
  }
  if (!safeEqual(given, normalizeGateWord(expected))) {
    return { ok: false, error: "That word doesn’t open this door." };
  }
  writeGateCookie(hmacFor(expected), COOKIE_MAX_AGE);
  return { ok: true };
}

export function lockSanctuary(): void {
  writeGateCookie("", 0);
}
