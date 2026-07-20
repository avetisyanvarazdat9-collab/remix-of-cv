import { useEffect, useState } from "react";
import { checkCmsHealth, runInitCms, type HealthResult } from "@/lib/cms-health";

export function InitializeCms({ onReady }: { onReady: () => void }) {
  const [health, setHealth] = useState<HealthResult | null>(null);
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { void refresh(); }, []);

  async function refresh() {
    setError(null);
    const h = await checkCmsHealth();
    setHealth(h);
    if (h.healthy) onReady();
  }

  async function initialize() {
    setRunning(true);
    setError(null);
    setLog("Running init-cms…");
    const res = await runInitCms();
    if (!res.ok) {
      setError(res.error ?? "Initialization failed");
      setLog((l) => l + "\n" + JSON.stringify(res.steps ?? {}, null, 2));
      setRunning(false);
      return;
    }
    setLog("Initialization complete. Re-checking…\n" + JSON.stringify(res.steps, null, 2));
    // Give PostgREST a moment to refresh its schema cache after DDL.
    await new Promise((r) => setTimeout(r, 1500));
    const h = await checkCmsHealth();
    setHealth(h);
    setRunning(false);
    if (h.healthy) {
      // Reload the CMS automatically.
      window.location.reload();
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-6">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-2xl">
        <h1 className="font-display text-3xl font-bold">Initialize CMS</h1>
        <p className="mt-2 text-muted-foreground">
          Your database is not fully set up. Click below to create the missing
          tables, indexes, triggers, RLS policies, storage bucket, and default
          content. This is safe to run multiple times.
        </p>

        {health && (
          <div className="mt-6 rounded-lg border border-border bg-muted/40 p-4">
            <p className="text-sm font-medium">
              {health.healthy
                ? "✓ All checks passed"
                : `${health.issues.length} issue${health.issues.length === 1 ? "" : "s"} detected`}
            </p>
            {!health.healthy && (
              <ul className="mt-2 max-h-40 space-y-1 overflow-auto text-sm text-muted-foreground">
                {health.issues.map((i) => (
                  <li key={i.key}>• {i.label}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={initialize}
          disabled={running}
          className="mt-6 w-full rounded-xl bg-primary px-6 py-4 text-lg font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          {running ? "Initializing…" : "Initialize CMS"}
        </button>

        {error && (
          <div className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}
        {log && (
          <pre className="mt-4 max-h-48 overflow-auto rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
            {log}
          </pre>
        )}

        <button
          type="button"
          onClick={refresh}
          className="mt-4 text-sm text-muted-foreground hover:text-foreground"
        >
          Re-check status
        </button>
      </div>
    </div>
  );
}
