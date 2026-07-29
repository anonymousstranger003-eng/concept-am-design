import { useRef, useState } from "react";
import { useSupabase } from "@/components/admin/SupabaseProvider";
import { Upload, X } from "lucide-react";

export function ImagePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const { client } = useSupabase();
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const upload = async (file: File) => {
    if (!client) return;
    setUploading(true);
    setErr(null);
    const ext = file.name.split(".").pop() || "bin";
    const key = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await client.storage.from("media").upload(key, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });
    if (error) {
      setErr(error.message);
    } else {
      const { data } = client.storage.from("media").getPublicUrl(key);
      onChange(data.publicUrl);
    }
    setUploading(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        <div className="w-24 h-24 rounded-md bg-zinc-100 border border-zinc-200 overflow-hidden shrink-0">
          {value ? (
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full grid place-items-center text-[10px] text-zinc-400">No image</div>
          )}
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <input
            type="text"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste image URL or upload…"
            className="w-full h-9 px-3 rounded-md border border-zinc-300 text-sm bg-white"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => ref.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md border border-zinc-300 text-xs hover:bg-zinc-50"
            >
              <Upload className="w-3.5 h-3.5" />
              {uploading ? "Uploading…" : "Upload"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md border border-zinc-300 text-xs text-red-600 hover:bg-red-50"
              >
                <X className="w-3.5 h-3.5" /> Remove
              </button>
            )}
          </div>
          {err && <div className="text-[11px] text-red-600">{err}</div>}
        </div>
      </div>
      <input
        ref={ref}
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) upload(e.target.files[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
}
