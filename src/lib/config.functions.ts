import { createServerFn } from "@tanstack/react-start";

/**
 * Runtime public config exposed to the browser (safe values only).
 * Accepts either the Lovable-managed `APP_SUPABASE_*` names or the standard
 * `VITE_SUPABASE_*` / `SUPABASE_*` names used on Cloudflare Pages, so the same
 * build works locally and in production regardless of which pair is configured.
 */
export const getPublicConfig = createServerFn({ method: "GET" }).handler(async () => {
  const env = process.env;
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
