import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function initSupabase(url: string, anonKey: string): SupabaseClient | null {
  if (typeof window === "undefined") return null;
  if (_client) return _client;
  if (!url || !anonKey) return null;
  _client = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storageKey: "am-cms-auth",
      detectSessionInUrl: true,
      flowType: "pkce",
    },
  });
  return _client;
}

export function getSupabase(): SupabaseClient | null {
  return _client;
}
