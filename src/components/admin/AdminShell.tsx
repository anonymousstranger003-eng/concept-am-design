import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Settings,
  Image as ImageIcon,
  FileText,
  MessageSquare,
  LogOut,
  Moon,
  Sun,
  Menu,
} from "lucide-react";
import { useSupabase } from "@/components/admin/SupabaseProvider";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/settings", label: "Site Settings", icon: Settings },
  { to: "/admin/media", label: "Media Library", icon: ImageIcon },
  { to: "/admin/submissions", label: "Submissions", icon: MessageSquare },
  { to: "/admin/content", label: "Content (soon)", icon: FileText, disabled: true },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const { client, session } = useSupabase();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("am-admin-dark") === "1";
    setDark(saved);
  }, []);

  const toggleDark = () => {
    const v = !dark;
    setDark(v);
    localStorage.setItem("am-admin-dark", v ? "1" : "0");
  };

  const signOut = async () => {
    if (client) await client.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  const bg = dark ? "bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900";
  const panel = dark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200";
  const muted = dark ? "text-zinc-400" : "text-zinc-500";

  return (
    <div className={`min-h-screen ${bg} font-sans antialiased`} style={{ fontFamily: "Inter Tight, system-ui, sans-serif" }}>
      {/* Topbar (mobile) */}
      <div className={`md:hidden sticky top-0 z-30 flex items-center justify-between px-4 h-14 border-b ${panel}`}>
        <button onClick={() => setOpen(!open)} className="p-2 -ml-2">
          <Menu className="w-5 h-5" />
        </button>
        <div className="font-semibold tracking-tight">AM CMS</div>
        <button onClick={toggleDark} className="p-2 -mr-2">
          {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${open ? "block" : "hidden"} md:block w-full md:w-64 md:sticky md:top-0 md:h-screen border-r ${panel} p-5 space-y-1 shrink-0`}
        >
          <div className="hidden md:flex items-center justify-between mb-6">
            <div>
              <div className="font-semibold tracking-tight text-base">AM Concepts</div>
              <div className={`text-[10px] uppercase tracking-[0.2em] ${muted}`}>Admin Panel</div>
            </div>
            <button
              onClick={toggleDark}
              className={`p-2 rounded-md hover:${dark ? "bg-zinc-800" : "bg-zinc-100"}`}
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          <nav className="space-y-1">
            {nav.map((n) => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
              const Icon = n.icon;
              const cls = `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                n.disabled
                  ? `${muted} opacity-50 cursor-not-allowed`
                  : active
                    ? dark
                      ? "bg-zinc-800 text-white"
                      : "bg-zinc-900 text-white"
                    : dark
                      ? "hover:bg-zinc-800"
                      : "hover:bg-zinc-100"
              }`;
              if (n.disabled)
                return (
                  <div key={n.to} className={cls}>
                    <Icon className="w-4 h-4" /> {n.label}
                  </div>
                );
              return (
                <Link key={n.to} to={n.to} className={cls} onClick={() => setOpen(false)}>
                  <Icon className="w-4 h-4" /> {n.label}
                </Link>
              );
            })}
          </nav>

          <div className={`pt-6 mt-6 border-t ${dark ? "border-zinc-800" : "border-zinc-200"} space-y-2`}>
            <div className={`text-[11px] ${muted} truncate`}>{session?.user.email}</div>
            <button
              onClick={signOut}
              className={`flex items-center gap-2 text-sm w-full px-3 py-2 rounded-md ${
                dark ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
              }`}
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
            <Link
              to="/"
              className={`block text-xs text-center ${muted} hover:underline mt-2`}
            >
              View site →
            </Link>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 p-4 md:p-10 max-w-6xl">{children}</main>
      </div>
    </div>
  );
}
