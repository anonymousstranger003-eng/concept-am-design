import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getSetupState, bootstrapAdmin } from "@/lib/admin-bootstrap.functions";

export const Route = createFileRoute("/admin/setup")({
  component: SetupPage,
});

function SetupPage() {
  const navigate = useNavigate();
  const getState = useServerFn(getSetupState);
  const doBootstrap = useServerFn(bootstrapAdmin);
  const [state, setState] = useState<
    | { loading: true }
    | { loading: false; configured: boolean; needsSetup: boolean; suggestedEmail: string; error?: string }
  >({ loading: true });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("manoj123");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    getState().then((s) => {
      setState({ loading: false, ...s });
      setEmail(s.suggestedEmail ?? "");
    });
  }, [getState]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await doBootstrap({ data: { email, password } });
      setDone(true);
      setTimeout(() => navigate({ to: "/admin/login" }), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Setup failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-zinc-50 px-4 py-10" style={{ fontFamily: "Inter Tight, system-ui, sans-serif" }}>
      <div className="w-full max-w-md bg-white border border-zinc-200 rounded-xl shadow-sm p-8">
        <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-2">
          AM Concepts · CMS Setup
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Create your admin account</h1>
        <p className="text-sm text-zinc-500 mt-1">
          This page works only once. It disables itself after the first admin is created.
        </p>

        {state.loading && (
          <div className="mt-8 text-sm text-zinc-500">Checking database…</div>
        )}

        {!state.loading && !state.configured && (
          <div className="mt-6 rounded-md bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            Server is missing <code>APP_SUPABASE_URL</code> or <code>APP_SUPABASE_SERVICE_ROLE</code> env vars.
          </div>
        )}

        {!state.loading && state.configured && !state.needsSetup && (
          <div className="mt-6 space-y-4">
            <div className="rounded-md bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
              An admin account already exists. Setup is disabled.
            </div>
            <Link to="/admin/login" className="inline-flex items-center justify-center w-full h-11 rounded-md bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors">
              Go to Login
            </Link>
          </div>
        )}

        {!state.loading && state.configured && state.needsSetup && !done && (
          <form onSubmit={submit} className="mt-6 space-y-4">
            {state.error && (
              <div className="rounded-md bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800">
                {state.error} — Did you run the SQL migration? See <code>CMS_SETUP.md</code>.
              </div>
            )}
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-1.5">Email</label>
              <input
                type="email"
                required
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
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-3 rounded-md border border-zinc-300 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 text-sm"
              />
              <p className="mt-1.5 text-[11px] text-zinc-500">
                Change this after your first login (Dashboard → Account).
              </p>
            </div>
            {error && (
              <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full h-11 rounded-md bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 disabled:opacity-50 transition-colors"
            >
              {submitting ? "Creating account…" : "Create Admin Account"}
            </button>
          </form>
        )}

        {done && (
          <div className="mt-6 rounded-md bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
            Admin created. Redirecting to login…
          </div>
        )}
      </div>
    </div>
  );
}
