import { createFileRoute, Outlet, redirect, useMatches } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin" }] }),
  beforeLoad: async () => {
    // Sign-in is already enforced by the parent `_authenticated` layout.
    // Here we additionally require the admin role. Non-admins are bounced
    // to the home page so protected admin data never renders.
    const { data: userData } = await supabase.auth.getUser();
    const uid = userData.user?.id;
    if (!uid) throw redirect({ to: "/auth" });

    const { data: role } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", uid)
      .eq("role", "admin")
      .maybeSingle();

    if (!role) throw redirect({ to: "/" });
  },
  component: Layout,
});


function Layout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId !== "/_authenticated/admin" && m.routeId.startsWith("/_authenticated/admin"));
  if (isChild) {
    return (
      <AdminShell>
        <Outlet />
      </AdminShell>
    );
  }
  return (
    <AdminShell>
      <Dashboard />
    </AdminShell>
  );
}

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

const tables = [
  "projects",
  "blog_posts",
  "courses",
  "video_courses",
  "talks",
  "companies",
  "skills",
  "education",
  "messages",
] as const;

type Stat = { label: string; value: string };
const STAT_DEFAULTS: Stat[] = [
  { label: "Years of experience", value: "15+" },
  { label: "Courses taught", value: "30+" },
  { label: "Students mentored", value: "500+" },
  { label: "Companies founded", value: "3" },
];

function Dashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [stats, setStats] = useState<Stat[]>(STAT_DEFAULTS);

  useEffect(() => {
    Promise.all(
      tables.map(async (t) => {
        const { count } = await supabase.from(t).select("*", { count: "exact", head: true });
        return [t, count ?? 0] as const;
      }),
    ).then((rows) => setCounts(Object.fromEntries(rows)));

    try {
      const raw = window.localStorage.getItem("admin:quickStats");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length === 4) setStats(parsed);
      }
    } catch { /* ignore */ }
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Dashboard</h1>
      <p className="mt-1 text-muted-foreground">Welcome back. Manage every section of your CV site.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="glass rounded-xl p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-3xl font-bold text-primary">{s.value}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 font-display text-xl font-semibold">Content counts</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tables.map((t) => (
          <Link
            key={t}
            to={`/admin/${t === "blog_posts" ? "blog" : t === "video_courses" ? "video-courses" : t === "talks" ? "talks-events" : t === "companies" ? "partners" : t}` as string}
            className="glass rounded-xl p-5 hover:border-primary/40"
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{t.replace("_", " ")}</p>
            <p className="mt-2 font-display text-3xl font-bold">{counts[t] ?? "…"}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
