import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings, Image as ImageIcon, MessageSquare, FileText, ExternalLink } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { useSupabase } from "@/components/admin/SupabaseProvider";

export const Route = createFileRoute("/admin/")({ component: DashboardPage });

function DashboardPage() {
  return (
    <RequireAdmin>
      <AdminShell>
        <Dashboard />
      </AdminShell>
    </RequireAdmin>
  );
}

function Dashboard() {
  const { session } = useSupabase();
  const cards = [
    { to: "/admin/settings", label: "Site Settings", desc: "Contact info, socials, branding", icon: Settings },
    { to: "/admin/media", label: "Media Library", desc: "Upload & manage images", icon: ImageIcon },
    { to: "/admin/submissions", label: "Form Submissions", desc: "Contact form messages", icon: MessageSquare },
    { to: "/admin/content", label: "Page Content", desc: "Hero, About, Services — coming next", icon: FileText, disabled: true },
  ];
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-2">Dashboard</div>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
        Welcome back{session?.user.email ? `, ${session.user.email.split("@")[0]}` : ""}.
      </h1>
      <p className="text-zinc-500 mt-2 text-sm">
        Manage your website content. Changes go live immediately after saving.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        {cards.map((c) => {
          const Icon = c.icon;
          const inner = (
            <div className={`p-6 rounded-xl border border-zinc-200 bg-white hover:border-zinc-900 transition-colors ${c.disabled ? "opacity-50" : ""}`}>
              <Icon className="w-5 h-5 text-zinc-900" />
              <div className="mt-4 font-medium">{c.label}</div>
              <div className="text-sm text-zinc-500 mt-1">{c.desc}</div>
            </div>
          );
          if (c.disabled) return <div key={c.to}>{inner}</div>;
          return (
            <Link key={c.to} to={c.to}>
              {inner}
            </Link>
          );
        })}
      </div>

      <a
        href="/"
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900"
      >
        Open live site <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
