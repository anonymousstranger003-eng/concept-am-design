import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useSupabase } from "@/components/admin/SupabaseProvider";

export const Route = createFileRoute("/admin/reset")({ component: ResetPage });

function ResetPage() {
  const { client } = useSupabase();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!client) return;
    const { error } = await client.auth.updateUser({ password });
    if (error) setError(error.message);
    else {
      setOk(true);
      setTimeout(() => navigate({ to: "/admin" }), 1000);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-zinc-50 px-4" style={{ fontFamily: "Inter Tight, system-ui, sans-serif" }}>
      <form onSubmit={submit} className="w-full max-w-md bg-white border border-zinc-200 rounded-xl shadow-sm p-8 space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Set new password</h1>
        <input
          type="password"
          minLength={6}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-11 px-3 rounded-md border border-zinc-300 text-sm"
          placeholder="New password"
        />
        {error && <div className="text-sm text-red-600">{error}</div>}
        {ok && <div className="text-sm text-emerald-600">Password updated. Redirecting…</div>}
        <button className="w-full h-11 rounded-md bg-zinc-900 text-white text-sm">Update password</button>
      </form>
    </div>
  );
}
