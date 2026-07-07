import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { X, MapPin, Calendar, ExternalLink } from "lucide-react";
import { internationalExperienceQuery } from "@/lib/queries";
import { useLocalized } from "@/lib/i18n";

type IntlRow = {
  id: string;
  title: string | null;
  organization: string | null;
  location: string | null;
  country_code: string | null;
  lat: number | null;
  lng: number | null;
  category: string | null;
  event_date: string | null;
  description: string | null;
  url: string | null;
  i18n?: unknown;
};

// Public world topojson (110m) — small, cached by browsers.
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export function WorldMap() {
  const { data } = useQuery(internationalExperienceQuery);
  const rows = (data ?? []) as IntlRow[];
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const loc = useLocalized();

  useEffect(() => setMounted(true), []);

  const pins = useMemo(
    () => rows.filter((r) => typeof r.lat === "number" && typeof r.lng === "number"),
    [rows],
  );

  const timeline = useMemo(() => {
    return [...rows].sort((a, b) => {
      const da = a.event_date ? new Date(a.event_date).getTime() : 0;
      const db = b.event_date ? new Date(b.event_date).getTime() : 0;
      return db - da;
    });
  }, [rows]);

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--primary) 20%, transparent) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative aspect-[2/1] w-full">
          {mounted && (
            <ComposableMap
              projection="geoEqualEarth"
              projectionConfig={{ scale: 165 }}
              style={{ width: "100%", height: "100%" }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: "color-mix(in oklab, var(--primary) 8%, var(--card))",
                          stroke: "color-mix(in oklab, var(--primary) 20%, transparent)",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                        hover: { fill: "color-mix(in oklab, var(--primary) 14%, var(--card))", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>
              {pins.map((p) => (
                <Marker key={p.id} coordinates={[p.lng as number, p.lat as number]}>
                  <g>
                    <circle r={8} fill="color-mix(in oklab, var(--primary) 30%, transparent)" />
                    <circle r={4} fill="var(--primary)" stroke="var(--background)" strokeWidth={1.2} />
                  </g>
                </Marker>
              ))}
            </ComposableMap>
          )}
        </div>
        <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-border/60 px-4 py-3 text-sm text-muted-foreground">
          <span>
            {pins.length > 0
              ? `${pins.length} location${pins.length === 1 ? "" : "s"} across ${new Set(pins.map((p) => p.country_code ?? p.location)).size} countries`
              : "Add international experience entries in the admin panel to populate the map."}
          </span>
          <button
            onClick={() => setOpen(true)}
            disabled={rows.length === 0}
            className="inline-flex items-center gap-2 rounded-md border border-primary/40 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 disabled:opacity-50"
          >
            View Timeline →
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/40 p-4 pt-16 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl border border-border bg-background p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground hover:bg-accent"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
            <h3 className="font-display text-2xl font-bold text-foreground">International Experience</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Trainings, workshops, conferences, and academic exchanges — most recent first.
            </p>
            <ol className="mt-6 space-y-4">
              {timeline.map((r) => {
                const title = (loc(r, "title") as string) || r.title || "Untitled";
                const desc = (loc(r, "description") as string) || r.description;
                return (
                  <li
                    key={r.id}
                    className="relative rounded-xl border border-border bg-card p-4 pl-6"
                  >
                    <span className="absolute left-2 top-5 size-2 rounded-full bg-primary shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_25%,transparent)]" />
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-display text-base font-semibold text-foreground">{title}</p>
                      {r.event_date && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="size-3" />
                          {new Date(r.event_date).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                          })}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {[r.organization, r.location].filter(Boolean).join(" · ")}
                    </p>
                    {r.category && (
                      <span className="mt-2 inline-block rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                        {r.category}
                      </span>
                    )}
                    {desc && (
                      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                    )}
                    {r.url && (
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        <ExternalLink className="size-3" /> Details
                      </a>
                    )}
                  </li>
                );
              })}
              {timeline.length === 0 && (
                <li className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                  <MapPin className="mx-auto mb-2 size-5" />
                  No entries yet.
                </li>
              )}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
