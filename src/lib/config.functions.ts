import { createServerFn } from "@tanstack/react-start";

type EnvLike = Record<string, string | undefined>;

/**
 * Cloudflare Workers expose configured vars/secrets as a binding, not always on
 * `process.env`. Read both so the same build works locally and on Cloudflare.
 */
async function resolveEnv(): Promise<EnvLike> {
  const sources: EnvLike[] = [];
  try {
    const mod = (await import("cloudflare:workers")) as { env?: EnvLike };
    if (mod?.env) sources.push(mod.env);
  } catch {
    // not running on Cloudflare — ignore
  }
  try {
    if (typeof process !== "undefined" && process.env) sources.push(process.env as EnvLike);
  } catch {
    // ignore
  }
  const merged: EnvLike = {};
  for (const src of sources) {
    for (const key of Object.keys(src)) {
      if (merged[key] === undefined && src[key]) merged[key] = src[key];
    }
  }
  return merged;
}

/**
 * Runtime public config exposed to the browser (safe values only).
 * Accepts Lovable-managed `APP_SUPABASE_*`, `VITE_SUPABASE_*`, or plain
 * `SUPABASE_*` names, so any of them works in production.
 */
export const getPublicConfig = createServerFn({ method: "GET" }).handler(async () => {
  const env = await resolveEnv();
  return {
    supabaseUrl:
      env.APP_SUPABASE_URL ?? env.VITE_SUPABASE_URL ?? env.SUPABASE_URL ?? "",
    supabaseAnonKey:
      env.APP_SUPABASE_ANON_KEY ??
      env.VITE_SUPABASE_ANON_KEY ??
      env.SUPABASE_ANON_KEY ??
      env.VITE_SUPABASE_PUBLISHABLE_KEY ??
      env.SUPABASE_PUBLISHABLE_KEY ??
      "",
  };
});
