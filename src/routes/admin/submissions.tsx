import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { useSupabase } from "@/components/admin/SupabaseProvider";
import { Trash2, Download } from "lucide-react";

export const Route = createFileRoute("/admin/submissions")({ component: SubmissionsPage });

type Row = { id: string; form_type: string; payload: Record<string, unknown>; read: boolean; created_at: string };

function SubmissionsPage() {
  return (
    <RequireAdmin>
      <AdminShell>
        <Inbox />
      </AdminShell>
    </RequireAdmin>
  );
}

function Inbox() {
  const { client } = useSupabase();
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    if (!client) return;
    setLoading(true);
    const { data } = await client
      .from("form_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    setRows((data ?? []) as Row[]);
    setLoading(false);
  };

  useEffect(() => {
    if (client) refresh();
  }, [client]);

  const remove = async (id: string) => {
    if (!client) return;
    if (!confirm("Delete this submission?")) return;
    await client.from("form_submissions").delete().eq("id", id);
    refresh();
  };

  const exportCsv = () => {
    if (rows.length === 0) return;
    const keys = Array.from(
      new Set(rows.flatMap((r) => Object.keys(r.payload))),
    );
    const header = ["id", "form_type", "created_at", ...keys];
    const lines = [header.join(",")];
    for (const r of rows) {
      const vals = [
        r.id,
        r.form_type,
        r.created_at,
        ...keys.map((k) => JSON.stringify(r.payload[k] ?? "")),
      ];
      lines.push(vals.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","));
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `submissions-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = rows.filter((r) =>
    q ? JSON.stringify(r.payload).toLowerCase().includes(q.toLowerCase()) : true,
  );

  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-2">Inbox</div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">Form Submissions</h1>
        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-md border border-zinc-300 text-sm hover:bg-zinc-50"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search submissions…"
        className="mt-6 w-full h-11 px-3 rounded-md border border-zinc-300 text-sm"
      />

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="text-sm text-zinc-500">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="text-sm text-zinc-500">No submissions yet.</div>
        ) : (
          filtered.map((r) => (
            <div key={r.id} className="rounded-lg border border-zinc-200 bg-white p-4">
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>{new Date(r.created_at).toLocaleString()}</span>
                <div className="flex items-center gap-3">
                  <span className="uppercase tracking-wider">{r.form_type}</span>
                  <button onClick={() => remove(r.id)} className="text-red-600 hover:underline inline-flex items-center gap-1">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
              <dl className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                {Object.entries(r.payload).map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="text-zinc-500 text-xs uppercase tracking-wider">{k}</dt>
                    <dd className="text-zinc-900">{String(v)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
