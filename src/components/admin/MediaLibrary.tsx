import { useEffect, useState } from "react";
import { useSupabase } from "@/components/admin/SupabaseProvider";
import { Copy, Check, Trash2, RefreshCw, Pencil, X, Upload } from "lucide-react";

export type MediaItem = { name: string; publicUrl: string; size?: number };

export function useMediaLibrary() {
  const { client } = useSupabase();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    if (!client) return;
    setLoading(true);
    setError(null);
    const { data, error: err } = await client.storage.from("media").list("", {
      limit: 1000,
      offset: 0,
      sortBy: { column: "created_at", order: "desc" },
    });
    if (err) {
      setError(err.message);
      setItems([]);
      setLoading(false);
      return;
    }
    const files = (data ?? []).filter(
      (f) => !!f.name && f.name !== ".emptyFolderPlaceholder" && !f.name.endsWith("/"),
    );
    setItems(
      files.map((f) => ({
        name: f.name,
        size: f.metadata?.["size"] as number | undefined,
        publicUrl: client.storage.from("media").getPublicUrl(f.name).data.publicUrl,
      })),
    );
    setLoading(false);
  };

  useEffect(() => {
    if (client) void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  const upload = async (files: FileList | File[]): Promise<string[]> => {
    if (!client) return [];
    setUploading(true);
    setError(null);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const ext = (file.name.split(".").pop() || "bin").toLowerCase();
      const base = file.name
        .replace(/\.[^.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .slice(0, 40);
      const key = `${base || "image"}-${Date.now().toString(36)}.${ext}`;
      const { error: err } = await client.storage.from("media").upload(key, file, {
        cacheControl: "31536000",
        upsert: false,
        contentType: file.type || undefined,
      });
      if (err) {
        setError(err.message);
        break;
      }
      urls.push(client.storage.from("media").getPublicUrl(key).data.publicUrl);
    }
    setUploading(false);
    await refresh();
    return urls;
  };

  const remove = async (name: string) => {
    if (!client) return;
    const { error: err } = await client.storage.from("media").remove([name]);
    if (err) setError(err.message);
    await refresh();
  };

  const rename = async (name: string, nextName: string) => {
    if (!client || !nextName || nextName === name) return;
    const { error: err } = await client.storage.from("media").move(name, nextName);
    if (err) setError(err.message);
    await refresh();
  };

  return { items, loading, uploading, error, refresh, upload, remove, rename };
}

export function MediaGrid({
  onSelect,
  compact = false,
}: {
  onSelect?: (url: string) => void;
  compact?: boolean;
}) {
  const { items, loading, uploading, error, refresh, upload, remove, rename } = useMediaLibrary();
  const [copied, setCopied] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);

  const copy = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          if (e.dataTransfer.files.length) void upload(e.dataTransfer.files);
        }}
        className={`rounded-xl border-2 border-dashed p-5 text-center transition-colors ${
          drag ? "border-zinc-900 bg-zinc-50" : "border-zinc-300"
        }`}
      >
        <Upload className="w-5 h-5 mx-auto text-zinc-400" />
        <label className="mt-2 block text-sm">
          Drag & drop images here, or <span className="underline font-medium cursor-pointer">browse</span>
          <input
            type="file"
            hidden
            multiple
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.length) void upload(e.target.files);
              e.target.value = "";
            }}
          />
        </label>
        {uploading && <div className="mt-2 text-xs text-zinc-500">Uploading…</div>}
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-xs text-zinc-500">{items.length} file(s)</div>
        <button
          type="button"
          onClick={() => void refresh()}
          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md border border-zinc-300 text-xs hover:bg-zinc-50"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {error && (
        <div className="mt-3 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>
      )}

      <div className="mt-4">
        {loading ? (
          <div className="text-sm text-zinc-500">Loading…</div>
        ) : items.length === 0 ? (
          <div className="text-sm text-zinc-500">No files yet — upload your first image above.</div>
        ) : (
          <div className={`grid gap-3 ${compact ? "grid-cols-3 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"}`}>
            {items.map((it) => (
              <div key={it.name} className="border border-zinc-200 rounded-lg overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => onSelect?.(it.publicUrl)}
                  className="block w-full aspect-square bg-zinc-100 group relative"
                  title={onSelect ? "Use this image" : it.name}
                >
                  <img src={it.publicUrl} alt={it.name} loading="lazy" className="w-full h-full object-cover" />
                  {onSelect && (
                    <span className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/40 grid place-items-center text-white text-xs opacity-0 group-hover:opacity-100 transition">
                      Use image
                    </span>
                  )}
                </button>
                <div className="p-2">
                  <div className="text-[11px] text-zinc-500 truncate" title={it.name}>
                    {it.name}
                  </div>
                  <div className="mt-2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => void copy(it.publicUrl)}
                      className="flex-1 inline-flex items-center justify-center gap-1 h-8 rounded-md border border-zinc-200 text-[11px] hover:bg-zinc-50"
                    >
                      {copied === it.publicUrl ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied === it.publicUrl ? "Copied" : "URL"}
                    </button>
                    <button
                      type="button"
                      title="Rename"
                      onClick={() => {
                        const next = prompt("New file name (keep the extension):", it.name);
                        if (next) void rename(it.name, next.trim());
                      }}
                      className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-zinc-200 hover:bg-zinc-50"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      title="Delete"
                      onClick={() => {
                        if (confirm(`Delete ${it.name}?`)) void remove(it.name);
                      }}
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

export function MediaBrowserModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-zinc-900/50 p-4 md:p-10 overflow-y-auto" onClick={onClose}>
      <div
        className="mx-auto max-w-4xl bg-white rounded-xl shadow-xl p-5 md:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">Media library</div>
            <h2 className="text-xl font-semibold">Choose an image</h2>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-md hover:bg-zinc-100">
            <X className="w-4 h-4" />
          </button>
        </div>
        <MediaGrid
          compact
          onSelect={(url) => {
            onSelect(url);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
