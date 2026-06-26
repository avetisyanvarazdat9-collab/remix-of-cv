import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";

export const Route = createFileRoute("/_authenticated/admin/partners")({
  head: () => ({ meta: [{ title: "Partners — Admin" }] }),
  component: PartnersPage,
});

const TABS = [
  { id: "current", label: "Current", filter: (r: any) => r.is_current === true, defaults: { is_current: true } },
  { id: "past", label: "Past", filter: (r: any) => r.is_current === false, defaults: { is_current: false } },
  { id: "all", label: "All", filter: () => true, defaults: {} },
] as const;

const fields = [
  { name: "name", label: "Name (brand)", type: "text" as const, required: true },
  { name: "role", label: "Role / partnership", type: "i18n" as const },
  { name: "description", label: "Description", type: "i18n-textarea" as const },
  { name: "logo_url", label: "Logo URL", type: "url" as const },
  { name: "website_url", label: "Website URL", type: "url" as const },
  { name: "start_year", label: "Start year", type: "number" as const },
  { name: "end_year", label: "End year", type: "number" as const },
  { name: "is_current", label: "Current partner", type: "boolean" as const },
  { name: "display_order", label: "Display order", type: "number" as const },
  { name: "is_visible", label: "Visible", type: "boolean" as const },
];

function PartnersPage() {
  const [tab, setTab] = useState<typeof TABS[number]["id"]>("current");
  const active = TABS.find((t) => t.id === tab)!;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Partners</h1>
      <p className="mt-1 text-muted-foreground">Companies and partnerships, grouped by status.</p>

      <div className="mt-6 inline-flex rounded-md border border-border bg-card/40 p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-md px-4 py-1.5 text-sm transition-colors ${
              tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <CrudPage
          key={active.id}
          title="Partners"
          table="companies"
          orderBy={{ column: "display_order" }}
          displayColumns={["name", "role", "start_year", "end_year", "is_current"]}
          fields={fields}
          filter={active.filter}
          defaults={active.defaults}
          hideHeader
        />
      </div>
    </div>
  );
}
