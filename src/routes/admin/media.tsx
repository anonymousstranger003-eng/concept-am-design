import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { useSupabase } from "@/components/admin/SupabaseProvider";
import { Upload, Trash2, Copy, Check } from "lucide-react";

export const Route = createFileRoute("/admin/media")({ component: MediaPage });

type Item = { name: string; publicUrl: string; size?: number };

function MediaPage() {
  return (
    <RequireAdmin>
      <AdminShell>
        <Library />
      </AdminShell>
    </RequireAdmin>
  );
}

function Library() {
  const { client } = useSupabase();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  const refresh = async () => {
    if (!client) return;
    setLoading(true);
    const { data, error } = await client.storage.from("media").list("", {
      limit: 500,
      sortBy: { column: "created_at", order: "desc" },
    });
    if (error) {
      setErr(error.message);
      setLoading(false);
      return;
    }
    const mapped: Item[] = (data ?? [])
      .filter((f) => f.name && !f.name.endsWith("/"))
      .map((f) => ({
        name: f.name,
        size: f.metadata?.size,
        publicUrl: client.storage.from("media").getPublicUrl(f.name).data.publicUrl,
      }));
    setItems(mapped);
    setLoading(false);
  };

  useEffect(() => {
    if (client) refresh();
  }, [client]);

  const upload = async (files: FileList | File[]) => {
    if (!client) return;
    setUploading(true);
    setErr(null);
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop() || "bin";
      const key = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await client.storage.from("media").upload(key, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });
      if (error) {
        setErr(error.message);
        break;
      }
    }
    setUploading(false);
    refresh();
  };

  const remove = async (name: string) => {
    if (!client) return;
    if (!confirm(`Delete ${name}?`)) return;
    const { error } = await client.storage.from("media").remove([name]);
    if (error) setErr(error.message);
    refresh();
  };

  const copy = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-2">Assets</div>
      <h1 className="text-3xl font-semibold tracking-tight">Media Library</h1>
      <p className="text-sm text-zinc-500 mt-2">
        Upload images. Copy the public URL and paste it into any content editor.
      </p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          if (e.dataTransfer.files.length) upload(e.dataTransfer.files);
        }}
        className={`mt-6 rounded-xl border-2 border-dashed p-8 text-center transition-colors ${drag ? "border-zinc-900 bg-zinc-50" : "border-zinc-300"}`}
      >
        <Upload className="w-6 h-6 mx-auto text-zinc-400" />
        <div className="mt-2 text-sm">
          Drag & drop images here, or{" "}
          <button
            onClick={() => inputRef.current?.click()}
            className="underline font-medium"
          >
            browse
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          hidden
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && upload(e.target.files)}
        />
        {uploading && <div className="mt-3 text-xs text-zinc-500">Uploading…</div>}
      </div>

      {err && (
        <div className="mt-4 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {err}
        </div>
      )}

      <div className="mt-8">
        {loading ? (
          <div className="text-sm text-zinc-500">Loading…</div>
        ) : items.length === 0 ? (
          <div className="text-sm text-zinc-500">No files yet.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {items.map((it) => (
              <div key={it.name} className="group border border-zinc-200 rounded-lg overflow-hidden bg-white">
                <div className="aspect-square bg-zinc-100">
                  <img
                    src={it.publicUrl}
                    alt={it.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2.5">
                  <div className="text-[11px] text-zinc-500 truncate">{it.name}</div>
                  <div className="mt-2 flex gap-1.5">
                    <button
                      onClick={() => copy(it.publicUrl)}
                      className="flex-1 inline-flex items-center justify-center gap-1 h-8 rounded-md border border-zinc-200 text-[11px] hover:bg-zinc-50"
                    >
                      {copied === it.publicUrl ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied === it.publicUrl ? "Copied" : "Copy URL"}
                    </button>
                    <button
                      onClick={() => remove(it.name)}
                      className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-zinc-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
