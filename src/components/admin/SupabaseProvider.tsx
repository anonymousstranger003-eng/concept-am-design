import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { SupabaseClient, Session } from "@supabase/supabase-js";
import { initSupabase } from "@/lib/supabase";

type Ctx = {
  client: SupabaseClient | null;
  session: Session | null;
  ready: boolean;
  isAdmin: boolean;
  /** Set when no Supabase URL / anon key could be resolved at runtime. */
  configError: string | null;
  refreshAdmin: () => Promise<void>;
};

const SupabaseCtx = createContext<Ctx>({
  client: null,
  session: null,
  ready: false,
  isAdmin: false,
  configError: null,
  refreshAdmin: async () => {},
});

/** Build-time env fallback (Cloudflare Pages / Vite `VITE_*` variables). */
function envFallback() {
  const env = import.meta.env as Record<string, string | undefined>;
  return {
    url: env.VITE_SUPABASE_URL ?? env.VITE_APP_SUPABASE_URL ?? "",
    key:
      env.VITE_SUPABASE_ANON_KEY ??
      env.VITE_SUPABASE_PUBLISHABLE_KEY ??
      env.VITE_APP_SUPABASE_ANON_KEY ??
      "",
  };
}

export function SupabaseProvider({
  url,
  anonKey,
  children,
}: {
  url: string;
  anonKey: string;
  children: ReactNode;
}) {
  const [client, setClient] = useState<SupabaseClient | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [configError, setConfigError] = useState<string | null>(null);

  const checkAdmin = async (c: SupabaseClient, s: Session | null) => {
    if (!s) {
      setIsAdmin(false);
      return;
    }
    const { data } = await c.from("admins").select("id").eq("user_id", s.user.id).maybeSingle();
    setIsAdmin(!!data);
  };

  useEffect(() => {
    const fb = envFallback();
    const resolvedUrl = url || fb.url;
    const resolvedKey = anonKey || fb.key;
    if (!resolvedUrl || !resolvedKey) {
      setConfigError(
        "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or APP_SUPABASE_URL / APP_SUPABASE_ANON_KEY) in your environment and redeploy.",
      );
      setReady(true);
      return;
    }
    const c = initSupabase(resolvedUrl, resolvedKey);
    if (!c) {
      setConfigError("Supabase client could not be created with the provided URL and key.");
      setReady(true);
      return;
    }
    setConfigError(null);
    setClient(c);
    c.auth
      .getSession()
      .then(async ({ data }) => {
        setSession(data.session);
        await checkAdmin(c, data.session);
      })
      .finally(() => setReady(true));
    const { data: sub } = c.auth.onAuthStateChange(async (_evt, s) => {
      setSession(s);
      await checkAdmin(c, s);
    });
    return () => sub.subscription.unsubscribe();
  }, [url, anonKey]);

  return (
    <SupabaseCtx.Provider
      value={{
        client,
        session,
        ready,
        isAdmin,
        configError,
        refreshAdmin: async () => {
          if (client) await checkAdmin(client, session);
        },
      }}
    >
      {children}
    </SupabaseCtx.Provider>
  );
}

export const useSupabase = () => useContext(SupabaseCtx);
