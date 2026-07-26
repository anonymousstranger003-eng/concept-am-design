import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AdminShell } from "@/components/admin/AdminShell";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { useSupabase } from "@/components/admin/SupabaseProvider";
import { SETTINGS_FALLBACK, type SiteSettings } from "@/hooks/useSiteSettings";
import { Save } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({ component: SettingsPage });

function SettingsPage() {
  return (
    <RequireAdmin>
      <AdminShell>
        <SettingsEditor />
      </AdminShell>
    </RequireAdmin>
  );
}

const fields: { key: keyof SiteSettings; label: string; type?: "text" | "textarea" | "url"; hint?: string }[] = [
  { key: "siteName", label: "Site name" },
  { key: "tagline", label: "Tagline / subtitle" },
  { key: "email", label: "Email", type: "text" },
  { key: "phone", label: "Phone (display)", hint: "e.g. +91 95394 58218" },
  { key: "whatsapp", label: "WhatsApp number", hint: "Digits only, with country code. e.g. 919539458218" },
  { key: "addressCalicut", label: "Calicut office address", type: "textarea" },
  { key: "addressKasaragod", label: "Kasaragod office address", type: "textarea" },
  { key: "mapCalicut", label: "Calicut Google Maps embed URL", type: "url" },
  { key: "mapKasaragod", label: "Kasaragod Google Maps embed URL", type: "url" },
  { key: "instagram", label: "Instagram URL", type: "url" },
  { key: "facebook", label: "Facebook URL", type: "url" },
  { key: "linkedin", label: "LinkedIn URL", type: "url" },
  { key: "youtube", label: "YouTube URL", type: "url" },
  { key: "metaTitle", label: "SEO — Meta title" },
  { key: "metaDescription", label: "SEO — Meta description", type: "textarea" },
];

function SettingsEditor() {
  const { client } = useSupabase();
  const qc = useQueryClient();
  const [values, setValues] = useState<SiteSettings>(SETTINGS_FALLBACK);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    if (!client) return;
    (async () => {
      const { data } = await client.from("site_settings").select("data").eq("id", 1).maybeSingle();
      setValues({ ...SETTINGS_FALLBACK, ...((data?.data ?? {}) as SiteSettings) });
      setLoading(false);
    })();
  }, [client]);

  const save = async () => {
    if (!client) return;
    setSaving(true);
    setMsg(null);
    const { error } = await client
      .from("site_settings")
      .upsert({ id: 1, data: values, updated_at: new Date().toISOString() });
    setSaving(false);
    if (error) setMsg({ kind: "err", text: error.message });
    else {
      setMsg({ kind: "ok", text: "Saved. Changes are live on the website." });
      qc.invalidateQueries({ queryKey: ["site_settings"] });
    }
  };

  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-2">Settings</div>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-3xl font-semibold tracking-tight">Site Settings</h1>
        <button
          onClick={save}
          disabled={saving || loading}
          className="inline-flex items-center gap-2 h-11 px-5 rounded-md bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
      <p className="text-sm text-zinc-500 mt-2">
        These values are used across Footer, Contact page, and social links.
      </p>

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

      <div className="grid md:grid-cols-2 gap-5 mt-8">
        {fields.map((f) => (
          <div key={f.key} className={f.type === "textarea" ? "md:col-span-2" : ""}>
            <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-1.5">
              {f.label}
            </label>
            {f.type === "textarea" ? (
              <textarea
                rows={2}
                value={(values[f.key] as string) ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                className="w-full px-3 py-2 rounded-md border border-zinc-300 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 text-sm bg-white"
              />
            ) : (
              <input
                type="text"
                value={(values[f.key] as string) ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                className="w-full h-11 px-3 rounded-md border border-zinc-300 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 text-sm bg-white"
              />
            )}
            {f.hint && <p className="text-[11px] text-zinc-500 mt-1">{f.hint}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
