import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useSupabase } from "@/components/admin/SupabaseProvider";

export const Route = createFileRoute("/admin/login")({ component: LoginPage });

function LoginPage() {
  const { client, refreshAdmin, ready, configError } = useSupabase();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!client) return;
    setSubmitting(true);
    setError(null);
    try {
      const { data: signIn, error } = await client.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const uid = signIn.user?.id;
      if (uid) {
        const { data: adminRow } = await client
          .from("admins")
          .select("id")
          .eq("user_id", uid)
          .maybeSingle();
        if (!adminRow) {
          await client.auth.signOut();
          throw new Error(
            "This account isn't registered as an admin. Run /admin/setup once, or add this user to the 'admins' table in Supabase.",
          );
        }
      }
      await refreshAdmin();
      if (!remember) {
        // Clear on window close: replace persisted session with a session-scoped copy
        const raw = localStorage.getItem("am-cms-auth");
        if (raw) {
          sessionStorage.setItem("am-cms-auth", raw);
          localStorage.removeItem("am-cms-auth");
        }
      }
      navigate({ to: "/admin" });

    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const forgot = async () => {
    if (!client || !email) {
      setError("Enter your email above first, then click 'Forgot password?' again.");
      return;
    }
    setError(null);
    const { error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset`,
    });
    if (error) setError(error.message);
    else setError("Password reset email sent. Check your inbox.");
  };

  return (
    <div className="min-h-screen grid place-items-center bg-zinc-50 px-4" style={{ fontFamily: "Inter Tight, system-ui, sans-serif" }}>
      <div className="w-full max-w-md bg-white border border-zinc-200 rounded-xl shadow-sm p-8">
        <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-2">
          AM Concepts · Admin
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Sign in</h1>
        <p className="text-sm text-zinc-500 mt-1">Access the website editor.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-1.5">Email</label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3 rounded-md border border-zinc-300 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-1.5">Password</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-3 rounded-md border border-zinc-300 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 text-sm"
            />
          </div>
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-zinc-600">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Remember me
            </label>
            <button type="button" onClick={forgot} className="text-zinc-600 hover:text-zinc-900 underline">
              Forgot password?
            </button>
          </div>
          {configError && (
            <div className="rounded-md bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800">
              {configError}
            </div>
          )}
          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={submitting || (ready && !client)}
            className="w-full h-11 rounded-md bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 disabled:opacity-50 transition-colors"
          >
            {submitting ? "Signing in…" : !ready ? "Connecting…" : "Sign in"}
          </button>

        </form>

        <div className="mt-6 pt-6 border-t border-zinc-100 text-xs text-zinc-500 text-center">
          First time? <Link to="/admin/setup" className="underline hover:text-zinc-900">Run setup</Link>
        </div>
      </div>
    </div>
  );
}
