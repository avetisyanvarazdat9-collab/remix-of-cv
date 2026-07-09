import { AlertTriangle } from "lucide-react";

/**
 * Verifies that the Supabase environment variables required by the browser
 * client are present. Renders a friendly full-screen message instead of
 * letting the app crash with an opaque error when they are missing (e.g. on
 * a fresh Vercel deployment without env vars configured).
 */
export function SupabaseEnvCheck({ children }: { children: React.ReactNode }) {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key =
    (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ||
    (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined);

  const missing: string[] = [];
  if (!url) missing.push("VITE_SUPABASE_URL");
  if (!key) missing.push("VITE_SUPABASE_PUBLISHABLE_KEY (or VITE_SUPABASE_ANON_KEY)");

  if (missing.length === 0) return <>{children}</>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 shadow-xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-lg bg-destructive/15 text-destructive">
            <AlertTriangle className="size-5" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">
              Backend not configured
            </h1>
            <p className="text-xs text-muted-foreground">
              Supabase environment variables are missing
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          This deployment is missing the environment variables required to
          connect to the database and authentication service. Add them in your
          hosting provider (e.g. Vercel → Project → Settings → Environment
          Variables) and redeploy.
        </p>

        <ul className="mt-4 space-y-2">
          {missing.map((name) => (
            <li
              key={name}
              className="rounded-md border border-border bg-muted/40 px-3 py-2 font-mono text-xs text-foreground"
            >
              {name}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs text-muted-foreground">
          Both values are safe to expose to the browser (protected by
          row-level security). Never add <code>SUPABASE_SERVICE_ROLE_KEY</code>{" "}
          as a <code>VITE_</code> variable.
        </p>
      </div>
    </div>
  );
}
