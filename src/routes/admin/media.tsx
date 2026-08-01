import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { MediaGrid } from "@/components/admin/MediaLibrary";

export const Route = createFileRoute("/admin/media")({ component: MediaPage });

function MediaPage() {
  return (
    <RequireAdmin>
      <AdminShell>
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-2">Assets</div>
          <h1 className="text-3xl font-semibold tracking-tight">Media Library</h1>
          <p className="text-sm text-zinc-500 mt-2 max-w-2xl">
            Upload, rename or delete images. Everything here is instantly selectable inside every
            Page Content editor, or copy the public URL to use anywhere.
          </p>
          <div className="mt-6">
            <MediaGrid />
          </div>
        </div>
      </AdminShell>
    </RequireAdmin>
  );
}
