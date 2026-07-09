import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Loader2, ClipboardCopy, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/auth-status")({
  head: () => ({
    meta: [
      { title: "Auth status — Admin diagnostics" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthStatusPage,
});

type Row = { label: string; ok: boolean; value?: string; hint?: string };

function AuthStatusPage() {
  const { user, isAdmin, loading, session } = useAuth();
  const [reachOk, setReachOk] = useState<boolean | null>(null);
  const [reachError, setReachError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key =
    (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ||
    (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined);

  useEffect(() => {
    if (!url || !key) {
      setReachOk(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const { error } = await supabase.from("profile").select("id").limit(1);
        if (cancelled) return;
        if (error) {
          setReachOk(false);
          setReachError(error.message);
        } else {
          setReachOk(true);
        }
      } catch (err) {
        if (cancelled) return;
        setReachOk(false);
        setReachError(err instanceof Error ? err.message : String(err));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [url, key]);
  const envRows: Row[] = [
    {
      label: "VITE_SUPABASE_URL",
      ok: !!url,
      value: url ? maskUrl(url) : "missing",
    },
    {
      label: "VITE_SUPABASE_PUBLISHABLE_KEY (or ANON_KEY)",
      ok: !!key,
      value: key ? `${key.slice(0, 8)}…${key.slice(-4)}` : "missing",
    },
  ];

  const authRows: Row[] = loading
    ? [{ label: "Session", ok: false, value: "loading…" }]
    : user
      ? [
          { label: "Signed in", ok: true, value: user.email ?? user.id },
          { label: "User ID", ok: true, value: user.id },
          {
            label: "Admin role",
            ok: isAdmin,
            value: isAdmin ? "yes" : "no",
            hint: isAdmin ? undefined : "Add a row in user_roles with role='admin' for this user id.",
          },
          {
            label: "Access token",
            ok: !!session?.access_token,
            value: session?.access_token
              ? `${session.access_token.slice(0, 8)}…${session.access_token.slice(-4)}`
              : "none",
          },
        ]
      : [
          {
            label: "Signed in",
            ok: false,
            value: "no",
            hint: "Go to /auth and sign in with your admin credentials.",
          },
        ];

  const buildReport = (): string => {
    const lines: string[] = [];
    lines.push("Auth Status Report");
    lines.push("==================");
    lines.push("");
    lines.push("Environment variables:");
    for (const row of envRows) {
      lines.push(`  ${row.label}: ${row.value}`);
    }
    lines.push("");
    lines.push("Backend reachability:");
    if (reachOk === null) {
      lines.push("  Connectivity: checking…");
    } else if (reachOk) {
      lines.push("  Connectivity: OK (query succeeded)");
    } else {
      lines.push(`  Connectivity: failed — ${reachError ?? "unknown error"}`);
    }
    lines.push("");
    lines.push("Session:");
    for (const row of authRows) {
      lines.push(`  ${row.label}: ${row.value}`);
      if (row.hint) lines.push(`    Hint: ${row.hint}`);
    }
    lines.push("");
    lines.push("Generated: " + new Date().toISOString());
    return lines.join("\n");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildReport());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silently ignore
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-2xl space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Auth status
            </h1>
            <p className="text-sm text-muted-foreground">
              Diagnostics for Supabase connectivity and current session.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-accent transition-colors"
              title="Copy full report to clipboard"
            >
              {copied ? (
                <Check className="size-4 text-emerald-600" />
              ) : (
                <ClipboardCopy className="size-4 text-muted-foreground" />
              )}
              {copied ? "Copied!" : "Copy report"}
            </button>
            <Link
              to="/auth"
              className="rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-accent"
            >
              Sign in
            </Link>
            <Link
              to="/admin"
              className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90"
            >
              Admin
            </Link>
          </div>
        </header>

        <Section title="Environment variables" rows={envRows} />

        <Section
          title="Backend reachability"
          rows={[
            reachOk === null
              ? { label: "Connectivity", ok: false, value: "checking…" }
              : reachOk
                ? { label: "Connectivity", ok: true, value: "OK (query succeeded)" }
                : {
                    label: "Connectivity",
                    ok: false,
                    value: reachError ?? "failed",
                    hint: "Check that VITE_SUPABASE_URL points to the right project and the key matches.",
                  },
          ]}
        />

        <Section title="Session" rows={authRows} />

        {user && !isAdmin && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground">
            You're signed in but your account is not an admin. Insert a row into{" "}
            <code className="font-mono">user_roles</code> with{" "}
            <code className="font-mono">role='admin'</code> for user id{" "}
            <code className="font-mono">{user.id}</code>.
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <ul className="space-y-2">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex items-start justify-between gap-3 rounded-md border border-border/60 bg-background/40 px-3 py-2"
          >
            <div className="min-w-0">
              <div className="text-sm font-medium text-foreground">{row.label}</div>
              {row.value && (
                <div className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
                  {row.value}
                </div>
              )}
              {row.hint && (
                <div className="mt-1 text-xs text-muted-foreground">{row.hint}</div>
              )}
            </div>
            <StatusIcon state={row.value === "checking…" || row.value === "loading…" ? "pending" : row.ok ? "ok" : "bad"} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function StatusIcon({ state }: { state: "ok" | "bad" | "pending" }) {
  if (state === "pending")
    return <Loader2 className="mt-0.5 size-5 shrink-0 animate-spin text-muted-foreground" />;
  if (state === "ok")
    return <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />;
  return <XCircle className="mt-0.5 size-5 shrink-0 text-destructive" />;
}

function maskUrl(u: string) {
  try {
    const parsed = new URL(u);
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return u;
  }
}
