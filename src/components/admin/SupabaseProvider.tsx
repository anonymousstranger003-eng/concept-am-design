import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { SupabaseClient, Session } from "@supabase/supabase-js";
import { initSupabase } from "@/lib/supabase";

type Ctx = {
  client: SupabaseClient | null;
  session: Session | null;
  ready: boolean;
  isAdmin: boolean;
  refreshAdmin: () => Promise<void>;
};

const SupabaseCtx = createContext<Ctx>({
  client: null,
  session: null,
  ready: false,
  isAdmin: false,
  refreshAdmin: async () => {},
});

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

  const checkAdmin = async (c: SupabaseClient, s: Session | null) => {
    if (!s) {
      setIsAdmin(false);
      return;
    }
    const { data } = await c.from("admins").select("id").eq("user_id", s.user.id).maybeSingle();
    setIsAdmin(!!data);
  };

  useEffect(() => {
    const c = initSupabase(url, anonKey);
    if (!c) {
      setReady(true);
      return;
    }
    setClient(c);
    c.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      await checkAdmin(c, data.session);
      setReady(true);
    });
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
