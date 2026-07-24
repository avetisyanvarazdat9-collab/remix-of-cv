import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, User, Briefcase, FileText, BookOpen, Video, Mic2, Building2, Wrench, GraduationCap, Inbox, LogOut, BarChart3, Settings, BookText, AlertTriangle, Palette, Home, Menu as MenuIcon, Award, Globe2, Activity, History, Layers } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };
const items: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/home", label: "Homepage", icon: Home },
  { to: "/admin/four-dimensions", label: "Four Dimensions", icon: Layers },
  { to: "/admin/profile", label: "Profile", icon: User },
  { to: "/admin/about", label: "About", icon: BookText },
  { to: "/admin/quick-stats", label: "Quick stats", icon: BarChart3 },
  { to: "/admin/projects", label: "Projects", icon: Briefcase },
  { to: "/admin/blog", label: "Blog posts", icon: FileText },
  { to: "/admin/courses", label: "Courses", icon: BookOpen },
  { to: "/admin/video-courses", label: "Video courses", icon: Video },
  { to: "/admin/talks-events", label: "Talks & events", icon: Mic2 },
  { to: "/admin/international-experience", label: "International", icon: Globe2 },

  { to: "/admin/partners", label: "Partners", icon: Building2 },
  { to: "/admin/skills", label: "Skills", icon: Wrench },
  { to: "/admin/education", label: "Education", icon: GraduationCap },
  { to: "/admin/professional-experience", label: "Professional Experience", icon: History },
  { to: "/admin/certifications", label: "Certifications", icon: Award },
  { to: "/admin/messages", label: "Messages", icon: Inbox },
  { to: "/admin/error-logs", label: "Error logs", icon: AlertTriangle },
  { to: "/admin/navigation", label: "Navigation", icon: MenuIcon },
  { to: "/admin/theme", label: "Theme", icon: Palette },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { isAdmin, user, loading } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!loading && user && !isAdmin) {
      // signed in but not admin
    }
  }, [loading, user, isAdmin]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Loading…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="glass max-w-md rounded-2xl p-8 text-center">
          <h1 className="font-display text-2xl font-bold">Not authorized</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account doesn't have admin access. Only the first registered account becomes admin.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <Link to="/" className="rounded-md border border-border px-3 py-1.5 text-sm">Home</Link>
            <button onClick={signOut} className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground">Sign out</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 shrink-0 border-r border-border/60 bg-sidebar p-4 md:flex md:flex-col">
        <Link to="/" className="mb-6 font-display font-semibold">
          Varazdat<span className="text-primary">.</span> <span className="text-xs text-muted-foreground">admin</span>
        </Link>
        <nav className="flex-1 space-y-0.5">
          {items.map(({ to, label, icon: Icon, exact }) => {
            const active = exact ? pathname === to : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${active ? "bg-sidebar-accent text-foreground" : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"}`}
              >
                <Icon className="size-4" /> {label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto space-y-0.5">
          <Link
            to="/auth-status"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
          >
            <Activity className="size-4" /> Auth status
          </Link>
          <button onClick={signOut} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent">
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </aside>
      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-border/60 px-4 py-3 md:hidden">
          <Link to="/" className="font-display font-semibold">Admin</Link>
          <button onClick={signOut} className="text-sm text-muted-foreground"><LogOut className="size-4" /></button>
        </header>
        <div className="md:hidden border-b border-border/60 overflow-x-auto">
          <nav className="flex gap-1 px-3 py-2 whitespace-nowrap">
            {items.map(({ to, label, exact }) => {
              const active = exact ? pathname === to : pathname.startsWith(to);
              return (
                <Link key={to} to={to} className={`rounded-md px-3 py-1.5 text-xs ${active ? "bg-sidebar-accent text-foreground" : "text-muted-foreground"}`}>
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        <main className="p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}

export function AdminLayoutRoute() {
  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}
