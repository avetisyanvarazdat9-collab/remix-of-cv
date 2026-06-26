import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";

export const Route = createFileRoute("/_authenticated/admin/talks-events")({
  head: () => ({ meta: [{ title: "Talks & Events — Admin" }] }),
  component: TalksEventsPage,
});

// Tabs split the talks table by event date relative to today.
const today = () => new Date().toISOString().slice(0, 10);

const TABS = [
  { id: "upcoming", label: "Upcoming", filter: (r: any) => !!r.event_date && r.event_date >= today() },
  { id: "past", label: "Past", filter: (r: any) => !!r.event_date && r.event_date < today() },
  { id: "undated", label: "Undated", filter: (r: any) => !r.event_date },
  { id: "all", label: "All", filter: () => true },
] as const;

const fields = [
  { name: "title", label: "Title", type: "i18n" as const, required: true },
  { name: "event_name", label: "Event name", type: "i18n" as const },
  { name: "event_date", label: "Date", type: "date" as const },
  { name: "location", label: "Location", type: "i18n" as const },
  { name: "description", label: "Description", type: "i18n-textarea" as const },
  { name: "slides_url", label: "Slides URL", type: "url" as const },
  { name: "video_url", label: "Video URL", type: "url" as const },
  { name: "display_order", label: "Display order", type: "number" as const },
  { name: "is_visible", label: "Visible", type: "boolean" as const },
];

function TalksEventsPage() {
  const [tab, setTab] = useState<typeof TABS[number]["id"]>("upcoming");
  const active = TABS.find((t) => t.id === tab)!;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Talks & Events</h1>
      <p className="mt-1 text-muted-foreground">Conference talks, lectures, workshops and panel appearances.</p>

      <div className="mt-6 inline-flex flex-wrap rounded-md border border-border bg-card/40 p-1">
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
          title="Talks"
          table="talks"
          orderBy={{ column: "event_date", ascending: false }}
          displayColumns={["title", "event_name", "event_date", "location"]}
          fields={fields}
          filter={active.filter}
          hideHeader
        />
      </div>
    </div>
  );
}
