import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useT } from "@/lib/i18n";
import { buildPageHead } from "@/lib/seo";

export const Route = createFileRoute("/auth")({
  head: () =>
    buildPageHead({
      title: "Sign in — Admin",
      description: "Admin sign-in for Dr. Varazdat Avetisyan website management.",
      path: "/auth",
      robots: "noindex, nofollow",
    }),
  validateSearch: (s: Record<string, unknown>) => ({
    next: typeof s.next === "string" ? s.next : undefined,
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { next } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const t = useT();

  function goNext() {
    if (next && next.startsWith("/") && !next.startsWith("//")) {
      window.location.href = next;
    } else {
      navigate({ to: "/admin" });
    }
  }

  useEffect(() => {
    if (user && !loading) goNext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const username = String(fd.get("username") ?? "").trim().toLowerCase();
    const password = String(fd.get("password") ?? "");
    if (!username || !password) return;

    setBusy(true);
    try {
      const email = username.includes("@") ? username : `${username}@admin.local`;
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      goNext();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("auth.invalid"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bg-hero relative flex min-h-screen items-center justify-center px-4">
      <div className="bg-grid absolute inset-0 opacity-30" />
      <div className="glass relative w-full max-w-md rounded-2xl p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-lg bg-primary/15 text-primary">
            <Lock className="size-5" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">{t("auth.title")}</h1>
            <p className="text-xs text-muted-foreground">{t("auth.restricted")}</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">{t("auth.username")}</label>
            <input
              name="username"
              type="text"
              required
              autoFocus
              autoComplete="username"
              defaultValue=""
              className="w-full rounded-md border border-input bg-card/40 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">{t("auth.password")}</label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              autoComplete="current-password"
              className="w-full rounded-md border border-input bg-card/40 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <button
            disabled={busy}
            className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            {busy ? t("auth.signingIn") : t("auth.signIn")}
          </button>
        </form>

        <div className="mt-5 flex items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            {t("auth.backHome")}
          </Link>
          <Link
            to="/auth-status"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Auth status
          </Link>
        </div>
      </div>
    </div>
  );
}
