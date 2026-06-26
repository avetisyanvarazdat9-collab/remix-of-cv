import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/quick-stats")({
  head: () => ({ meta: [{ title: "Quick stats — Admin" }] }),
  component: QuickStatsEditor,
});

// Quick Stats are display-only metric badges (e.g. "15+ years experience").
// Saved to localStorage as a UI preference, per the brief.
const STORAGE_KEY = "admin:quickStats";

type Stat = { label: string; value: string };
const DEFAULTS: Stat[] = [
  { label: "Years of experience", value: "15+" },
  { label: "Courses taught", value: "30+" },
  { label: "Students mentored", value: "500+" },
  { label: "Companies founded", value: "3" },
];

function load(): Stat[] {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length === 4) return parsed as Stat[];
  } catch { /* ignore */ }
  return DEFAULTS;
}

function QuickStatsEditor() {
  const [stats, setStats] = useState<Stat[]>(DEFAULTS);

  useEffect(() => { setStats(load()); }, []);

  function update(i: number, key: keyof Stat, value: string) {
    setStats((prev) => prev.map((s, idx) => (idx === i ? { ...s, [key]: value } : s)));
  }

  function save() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    toast.success("Quick stats saved");
  }

  function reset() {
    setStats(DEFAULTS);
    window.localStorage.removeItem(STORAGE_KEY);
    toast.message("Reset to defaults");
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Quick stats</h1>
      <p className="mt-1 text-muted-foreground">Four metric badges shown on the dashboard. Stored locally in your browser.</p>

      <div className="glass mt-6 grid gap-4 rounded-2xl p-6 sm:grid-cols-2">
        {stats.map((s, i) => (
          <div key={i} className="rounded-xl border border-border/60 bg-background/40 p-4">
            <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Item {i + 1}</p>
            <label className="mb-1 block text-xs text-muted-foreground">Label</label>
            <input
              value={s.label}
              onChange={(e) => update(i, "label", e.target.value)}
              className="mb-3 w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <label className="mb-1 block text-xs text-muted-foreground">Value</label>
            <input
              value={s.value}
              onChange={(e) => update(i, "value", e.target.value)}
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button onClick={reset} className="rounded-md border border-border px-4 py-2 text-sm">Reset</button>
        <button onClick={save} className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground">Save</button>
      </div>
    </div>
  );
}
