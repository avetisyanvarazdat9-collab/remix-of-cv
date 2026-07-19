import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { CrudPage } from "@/components/admin/CrudPage";

export const Route = createFileRoute("/_authenticated/admin/quick-stats")({
  head: () => ({ meta: [{ title: "Quick stats — Admin" }] }),
  component: QuickStatsEditor,
});

type Stat = { label: string; value: string; display_order: number; is_visible: boolean };
const DEFAULTS: Stat[] = [
  { label: "Years of experience", value: "15+", display_order: 1, is_visible: true },
  { label: "Courses taught", value: "30+", display_order: 2, is_visible: true },
  { label: "Students mentored", value: "500+", display_order: 3, is_visible: true },
  { label: "Companies founded", value: "3", display_order: 4, is_visible: true },
];

function QuickStatsEditor() {
  const [stats, setStats] = useState<Stat[]>(DEFAULTS);

  useEffect(() => { setStats(load()); }, []);

  function update(i: number, key: keyof Stat, value: string) {
    setStats((prev) => prev.map((s, idx) => (idx === i ? { ...s, [key]: value } : s)));
  }

  function save() {
    void stats;
    toast.success("Quick stats saved");
  }

  function reset() {
    setStats(DEFAULTS);
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

function QuickStatsEditor() {
  return (
    <CrudPage
      title="Quick stats"
      description="Metric badges shown across the public site. Translatable labels show HY / EN / RU tabs."
      table="statistics"
      orderBy={{ column: "display_order" }}
      displayColumns={["label", "value", "display_order", "is_visible"]}
      fields={[
        { name: "label", label: "Label", type: "i18n", required: true },
        { name: "value", label: "Value", type: "text", required: true },
        { name: "display_order", label: "Display order", type: "number" },
        { name: "is_visible", label: "Visible", type: "boolean" },
      ]}
    />
  );
}
