import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { SECTIONS } from "@/lib/cms-schemas";
import { FileText, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/admin/content/")({ component: ContentIndexPage });

function ContentIndexPage() {
  return (
    <RequireAdmin>
      <AdminShell>
        <Index />
      </AdminShell>
    </RequireAdmin>
  );
}

function Index() {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-2">Content</div>
      <h1 className="text-3xl font-semibold tracking-tight">Page Content</h1>
      <p className="text-sm text-zinc-500 mt-2 max-w-2xl">
        Edit every section of the live website. Changes save to your database and
        appear instantly — no rebuild or redeploy required.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {SECTIONS.map((s) => (
          <Link
            key={s.key}
            to="/admin/content/$key"
            params={{ key: s.key }}
            className="group p-5 rounded-xl border border-zinc-200 bg-white hover:border-zinc-900 transition-colors"
          >
            <div className="flex items-start justify-between">
              <FileText className="w-5 h-5 text-zinc-900" />
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all" />
            </div>
            <div className="mt-4 font-medium">{s.label}</div>
            <div className="text-xs text-zinc-500 mt-1 line-clamp-2">{s.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
