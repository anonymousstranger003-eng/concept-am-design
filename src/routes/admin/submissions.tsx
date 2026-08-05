import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { useSupabase } from "@/components/admin/SupabaseProvider";
import { Trash2, Download, RefreshCw, Mail, MailOpen } from "lucide-react";

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

const PAGE_SIZE = 10;

function Inbox() {
  const { client } = useSupabase();
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | "unread" | "read">("all");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    if (!client) return;
    setLoading(true);
    setError(null);
    const { data, error: err } = await client
      .from("form_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (err) setError(err.message);
    setRows((data ?? []) as Row[]);
    setLoading(false);
  };

  useEffect(() => {
    if (client) void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  const setRead = async (id: string, read: boolean) => {
    if (!client) return;
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, read } : r)));
    const { error: err } = await client.from("form_submissions").update({ read }).eq("id", id);
    if (err) {
      setError(err.message);
      void refresh();
    }
  };

  const remove = async (id: string) => {
    if (!client) return;
    if (!confirm("Delete this submission?")) return;
    const prev = rows;
    setRows((rs) => rs.filter((r) => r.id !== id));
    const { error: err } = await client.from("form_submissions").delete().eq("id", id);
    if (err) {
      setError(err.message);
      setRows(prev);
    }
  };

  const exportCsv = () => {
    if (rows.length === 0) return;
    const keys = Array.from(new Set(rows.flatMap((r) => Object.keys(r.payload))));
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

  const filtered = rows
    .filter((r) => (status === "all" ? true : status === "read" ? r.read : !r.read))
    .filter((r) => (q ? JSON.stringify(r.payload).toLowerCase().includes(q.toLowerCase()) : true));

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount - 1);
  const visible = filtered.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE);
  const unread = rows.filter((r) => !r.read).length;

  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-2">Inbox</div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Form Submissions{" "}
          {unread > 0 && (
            <span className="align-middle ml-2 text-xs font-medium px-2 py-1 rounded-full bg-zinc-900 text-white">
              {unread} unread
            </span>
          )}
        </h1>
        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-md border border-zinc-300 text-sm hover:bg-zinc-50"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 items-center">
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(0);
          }}
          placeholder="Search submissions…"
          className="h-11 px-3 rounded-md border border-zinc-300 text-sm flex-1 min-w-[200px]"
        />
        {(["all", "unread", "read"] as const).map((s) => (
          <button
            key={s}
            onClick={() => {
              setStatus(s);
              setPage(0);
            }}
            className={`h-11 px-4 rounded-md border text-sm capitalize ${
              status === s ? "bg-zinc-900 text-white border-zinc-900" : "border-zinc-300 hover:bg-zinc-50"
            }`}
          >
            {s}
          </button>
        ))}
        <button
          onClick={() => void refresh()}
          className="inline-flex items-center gap-2 h-11 px-4 rounded-md border border-zinc-300 text-sm hover:bg-zinc-50"
        >
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>
      )}

      <div className="mt-6 space-y-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 rounded-lg bg-zinc-100 animate-pulse" />
          ))
        ) : visible.length === 0 ? (
          <div className="text-sm text-zinc-500">No submissions found.</div>
        ) : (
          visible.map((r) => (
            <div
              key={r.id}
              className={`rounded-lg border bg-white p-4 ${r.read ? "border-zinc-200" : "border-zinc-900"}`}
            >
              <div className="flex items-center justify-between text-xs text-zinc-500 flex-wrap gap-2">
                <span>{new Date(r.created_at).toLocaleString()}</span>
                <div className="flex items-center gap-3">
                  <span className="uppercase tracking-wider">{r.form_type}</span>
                  <button
                    onClick={() => void setRead(r.id, !r.read)}
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    {r.read ? <MailOpen className="w-3 h-3" /> : <Mail className="w-3 h-3" />}
                    {r.read ? "Mark unread" : "Mark read"}
                  </button>
                  <button
                    onClick={() => void remove(r.id)}
                    className="text-red-600 hover:underline inline-flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
              <dl className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                {Object.entries(r.payload).map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="text-zinc-500 text-xs uppercase tracking-wider">{k}</dt>
                    <dd className="text-zinc-900 break-words">{String(v)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))
        )}
      </div>

      {pageCount > 1 && (
        <div className="mt-6 flex items-center justify-between text-sm">
          <button
            disabled={current === 0}
            onClick={() => setPage(current - 1)}
            className="h-10 px-4 rounded-md border border-zinc-300 disabled:opacity-40 hover:bg-zinc-50"
          >
            Previous
          </button>
          <span className="text-zinc-500">
            Page {current + 1} of {pageCount}
          </span>
          <button
            disabled={current >= pageCount - 1}
            onClick={() => setPage(current + 1)}
            className="h-10 px-4 rounded-md border border-zinc-300 disabled:opacity-40 hover:bg-zinc-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

