import { createServerFn } from "@tanstack/react-start";

/** Runtime public config exposed to the browser (safe values only). */
export const getPublicConfig = createServerFn({ method: "GET" }).handler(async () => {
  return {
    supabaseUrl: process.env.APP_SUPABASE_URL ?? "",
    supabaseAnonKey: process.env.APP_SUPABASE_ANON_KEY ?? "",
  };
});
