import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSupabase } from "@/components/admin/SupabaseProvider";

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { ready, session, isAdmin } = useSupabase();
  const navigate = useNavigate();

  useEffect(() => {
    if (!ready) return;
    if (!session) {
      navigate({ to: "/admin/login" });
    } else if (!isAdmin) {
      navigate({ to: "/admin/login" });
    }
  }, [ready, session, isAdmin, navigate]);

  if (!ready) {
    return (
      <div className="min-h-screen grid place-items-center bg-zinc-50 text-sm text-zinc-500">
        Loading…
      </div>
    );
  }
  if (!session || !isAdmin) return null;
  return <>{children}</>;
}
