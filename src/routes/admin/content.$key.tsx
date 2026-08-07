import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AdminShell } from "@/components/admin/AdminShell";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { useSupabase } from "@/components/admin/SupabaseProvider";
import { SECTION_BY_KEY, type Field } from "@/lib/cms-schemas";
import { DEFAULTS } from "@/lib/cms-defaults";
import { FieldRenderer } from "@/components/admin/FieldRenderer";
import { ArrowLeft, ExternalLink, RotateCcw, Save } from "lucide-react";

export const Route = createFileRoute("/admin/content/$key")({ component: ContentEditorPage });

function ContentEditorPage() {
  return (
    <RequireAdmin>
      <AdminShell>
        <Editor />
      </AdminShell>
    </RequireAdmin>
  );
}

type Data = Record<string, unknown>;

function seedFor(key: string): Data {
  return JSON.parse(JSON.stringify(DEFAULTS[key] ?? {})) as Data;
}

function isRec(v: unknown): v is Data {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

/**
 * Fills anything missing from the stored row with the seed value — including
 * keys inside list items (e.g. per-slide headline/subline added after a save),
 * so the editor always shows the copy that is actually live on the site.
 */
function withSeed(key: string, stored: Data | null): Data {
  const seed = seedFor(key);
  if (!stored) return seed;
  return mergeDeep(seed, stored) as Data;
}

function mergeDeep(seed: unknown, stored: unknown): unknown {
  if (Array.isArray(stored)) {
    const seedArr = Array.isArray(seed) ? seed : [];
    return stored.map((item, i) => mergeDeep(seedArr[i], item));
  }
  if (isRec(stored)) {
    const out: Data = isRec(seed) ? { ...seed } : {};
    for (const [k, v] of Object.entries(stored)) {
      if (v === undefined || v === null) continue;
      if (typeof v === "string" && v === "" && isRec(seed) && typeof seed[k] === "string" && seed[k]) {
        out[k] = seed[k];
        continue;
      }
      out[k] = mergeDeep(isRec(seed) ? seed[k] : undefined, v);
    }
    return out;
  }
  if (stored === undefined || stored === null || stored === "") return seed ?? stored;
  return stored;
}

function Editor() {
  const { key } = useParams({ from: "/admin/content/$key" });
  const section = SECTION_BY_KEY[key];
  const { client } = useSupabase();
  const qc = useQueryClient();
  const [data, setData] = useState<Data>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    if (!client || !section) return;
    let cancelled = false;
    setLoading(true);
    (async () => {
      const { data: row } = await client
        .from("content_blocks")
        .select("data")
        .eq("key", key)
        .maybeSingle();
      if (cancelled) return;
      setData(withSeed(key, (row?.data as Data) ?? null));
      setDirty(false);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [client, key, section]);

  if (!section) {
    return (
      <div>
        <h1 className="text-2xl font-semibold">Unknown content section</h1>
        <Link to="/admin/content" className="text-sm underline mt-4 inline-block">← Back</Link>
      </div>
    );
  }

  const set = (k: string, v: unknown) => {
    setData((d) => ({ ...d, [k]: v }));
    setDirty(true);
  };

  const save = async () => {
    if (!client) return;
    setSaving(true);
    setMsg(null);
    const { error } = await client
      .from("content_blocks")
      .upsert({ key, data, updated_at: new Date().toISOString() }, { onConflict: "key" });
    setSaving(false);
    if (error) {
      setMsg({ kind: "err", text: error.message });
      return;
    }
    setDirty(false);
    setMsg({ kind: "ok", text: "Saved. Live on the website." });
    await qc.invalidateQueries({ queryKey: ["content_blocks"] });
  };

  const restore = () => {
    if (!confirm("Reset this section back to the original website content? (Not saved until you press Save.)")) return;
    setData(seedFor(key));
    setDirty(true);
  };

  return (
    <div>
      <Link to="/admin/content" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900">
        <ArrowLeft className="w-3.5 h-3.5" /> All sections
      </Link>
      <div className="flex items-center justify-between gap-4 flex-wrap mt-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-1">{section.key}</div>
          <h1 className="text-3xl font-semibold tracking-tight">{section.label}</h1>
          <p className="text-sm text-zinc-500 mt-1 max-w-2xl">{section.description}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={restore}
            className="inline-flex items-center gap-2 h-11 px-4 rounded-md border border-zinc-300 text-sm hover:bg-zinc-50"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
          <a
            href={section.previewPath ?? "/"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 h-11 px-4 rounded-md border border-zinc-300 text-sm hover:bg-zinc-50"
          >
            <ExternalLink className="w-4 h-4" /> Preview
          </a>
          <button
            onClick={save}
            disabled={saving || loading}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-md bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {saving ? "Saving…" : dirty ? "Save & Publish" : "Save"}
          </button>
        </div>
      </div>

      {msg && (
        <div
          className={`mt-6 rounded-md p-3 text-sm border ${
            msg.kind === "ok"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {msg.text}
        </div>
      )}

      {loading ? (
        <div className="mt-8 text-sm text-zinc-500">Loading…</div>
      ) : (
        <div className="mt-8 space-y-6 max-w-4xl">
          {section.fields.map((f: Field) => (
            <FieldRenderer key={f.key} field={f} value={data[f.key]} onChange={(v) => set(f.key, v)} />
          ))}
        </div>
      )}
    </div>
  );
}
