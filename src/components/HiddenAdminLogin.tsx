import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { X, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { resolveUsernameEmail } from "@/lib/admin-auth.functions";

/**
 * Global hidden admin trigger.
 * Press Ctrl+Shift+A (or Cmd+Shift+A on macOS) anywhere on the site to open a
 * full-screen dark overlay with the sign-in modal. Username + password only.
 * No registration. Default credentials: admin / admin123 (changeable from
 * /admin/settings). Passwords are hashed (bcrypt) by Supabase Auth.
 */
export function HiddenAdminLogin() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        if (!loading && user && isAdmin) {
          navigate({ to: "/admin" });
          return;
        }
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [user, isAdmin, loading, navigate]);

  // Default-admin auto-provisioning removed for security. Admins must be
  // created via a secure out-of-band process.


  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const username = String(fd.get("username") ?? "").trim().toLowerCase();
    const password = String(fd.get("password") ?? "");
    setBusy(true);
    try {
      const { email } = await resolveUsernameEmail({ data: { username } });
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Signed in");
      setOpen(false);
      navigate({ to: "/admin" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Invalid username or password");
    } finally {
      setBusy(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-xl px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Admin sign in"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="relative w-full max-w-md rounded-2xl border border-border/60 bg-card/90 p-8 shadow-2xl">
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            navigate({ to: "/" });
          }}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <X className="size-4" />
        </button>
        <div className="mb-6 flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-lg bg-primary/15 text-primary">
            <Lock className="size-5" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold">Restricted</h2>
            <p className="text-xs text-muted-foreground">Admin access only</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Username</label>
            <input
              name="username"
              type="text"
              required
              autoFocus
              autoComplete="username"
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Password</label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              autoComplete="current-password"
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          Press <kbd className="rounded border border-border bg-background/60 px-1.5 py-0.5">Esc</kbd> to close
        </p>
      </div>
    </div>
  );
}
