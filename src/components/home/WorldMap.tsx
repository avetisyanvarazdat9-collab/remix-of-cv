import { useEffect, useMemo, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { X, MapPin, Calendar, ExternalLink, Filter, Loader2 } from "lucide-react";
import {
  internationalExperienceQuery,
  internationalExperienceFacetsQuery,
} from "@/lib/queries";
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
const ALL = "__all__";

export function WorldMap() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<IntlRow | null>(null);
  const [mounted, setMounted] = useState(false);
  const [category, setCategory] = useState<string>(ALL);
  const [fromYear, setFromYear] = useState<string>(ALL);
  const [toYear, setToYear] = useState<string>(ALL);
  const loc = useLocalized();

  useEffect(() => setMounted(true), []);

  const facetsQ = useQuery(internationalExperienceFacetsQuery);
  const categories = facetsQ.data?.categories ?? [];
  const years = facetsQ.data?.years ?? [];
  const totalRows = facetsQ.data?.total ?? 0;

  const filters = useMemo(
    () => ({
      category: category === ALL ? null : category,
      fromYear: fromYear === ALL ? null : Number(fromYear),
      toYear: toYear === ALL ? null : Number(toYear),
    }),
    [category, fromYear, toYear],
  );

  const rowsQ = useQuery({
    ...internationalExperienceQuery(filters),
    placeholderData: keepPreviousData,
  });
  const filtered = (rowsQ.data ?? []) as IntlRow[];
  const isFetching = rowsQ.isFetching;

  const pins = useMemo(
    () => filtered.filter((r) => typeof r.lat === "number" && typeof r.lng === "number"),
    [filtered],
  );

  const timeline = filtered; // server already orders by event_date desc

  const hasFilters = category !== ALL || fromYear !== ALL || toYear !== ALL;
  const resetFilters = () => {
    setCategory(ALL);
    setFromYear(ALL);
    setToYear(ALL);
  };

  return (
    <div>
      {/* Filters */}
      {mounted && totalRows > 0 && (
        <div className="animate-fade-in-up mb-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Filter className="size-3.5" /> Filter
            {isFetching && <Loader2 className="size-3 animate-spin text-primary" />}
          </span>

          <button
            type="button"
            onClick={() => setCategory(ALL)}
            className={`hover-lift-sm rounded-full border px-3 py-1 ${
              category === ALL
                ? "border-primary bg-primary/15 text-primary shadow-sm"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`hover-lift-sm rounded-full border px-3 py-1 ${
                category === c
                  ? "border-primary bg-primary/15 text-primary shadow-sm"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}

          <span className="mx-1 h-4 w-px bg-border" aria-hidden />

          <label className="inline-flex items-center gap-1.5 text-muted-foreground">
            From
            <select
              value={fromYear}
              onChange={(e) => setFromYear(e.target.value)}
              className="rounded-md border border-border bg-background px-2 py-1 text-foreground transition-colors focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/25"
            >
              <option value={ALL}>Any</option>
              {years.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </label>
          <label className="inline-flex items-center gap-1.5 text-muted-foreground">
            To
            <select
              value={toYear}
              onChange={(e) => setToYear(e.target.value)}
              className="rounded-md border border-border bg-background px-2 py-1 text-foreground transition-colors focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/25"
            >
              <option value={ALL}>Any</option>
              {years.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </label>

          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="ml-auto text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card transition-shadow duration-300 hover:shadow-[var(--shadow-elegant)]">
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
                  <g
                    className="[&_.pin-halo]:transition-all [&_.pin-halo]:duration-200 [&_.pin-dot]:transition-transform [&_.pin-dot]:duration-200 hover:[&_.pin-halo]:r-[12] hover:[&_.pin-dot]:scale-125"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(p);
                    }}
                  >
                    <circle
                      className="pin-halo animate-pin-pulse"
                      r={8}
                      fill="color-mix(in oklab, var(--primary) 30%, transparent)"
                    />
                    <circle
                      className="pin-dot"
                      r={4}
                      fill="var(--primary)"
                      stroke="var(--background)"
                      strokeWidth={1.2}
                    />
                  </g>
                </Marker>
              ))}
            </ComposableMap>
          )}
        </div>
        <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-border/60 px-4 py-3 text-sm text-muted-foreground">
          <span>
            {!mounted
              ? "Loading map…"
              : totalRows === 0
                ? "Add international experience entries in the admin panel to populate the map."
                : pins.length === 0
                  ? "No entries match the current filters."
                  : `${pins.length} location${pins.length === 1 ? "" : "s"} across ${new Set(pins.map((p) => p.country_code ?? p.location)).size} countries${hasFilters ? ` (of ${totalRows})` : ""}`}
          </span>
          <button
            onClick={() => setOpen(true)}
            disabled={timeline.length === 0}
            className="hover-lift-sm inline-flex items-center gap-2 rounded-md border border-primary/40 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 disabled:opacity-50"
          >
            View Timeline →
          </button>
        </div>
      </div>

      {open && (
        <div
          className="animate-backdrop-in fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/40 p-4 pt-16 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="animate-pop-in relative w-full max-w-2xl rounded-2xl border border-border bg-background p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground transition-all duration-200 hover:rotate-90 hover:bg-accent hover:text-foreground"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
            <h3 className="font-display text-2xl font-bold text-foreground">International Experience</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {hasFilters
                ? `Filtered view — ${timeline.length} of ${totalRows} entries.`
                : "Trainings, workshops, conferences, and academic exchanges — most recent first."}
            </p>
            <ol className="mt-6 space-y-4">
              {timeline.map((r, i) => {
                const title = (loc(r, "title") as string) || r.title || "Untitled";
                const desc = (loc(r, "description") as string) || r.description;
                return (
                  <li
                    key={r.id}
                    style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
                    className="animate-fade-in-up hover-lift relative rounded-xl border border-border bg-card p-4 pl-6"
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
                  No entries match the current filters.
                </li>
              )}
            </ol>
          </div>
        </div>
      )}

      {selected && (
        <div
          className="animate-backdrop-in fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/40 p-4 pt-16 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="animate-pop-in relative w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground transition-all duration-200 hover:rotate-90 hover:bg-accent hover:text-foreground"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            {(() => {
              const title = (loc(selected, "title") as string) || selected.title || "Untitled";
              const desc = (loc(selected, "description") as string) || selected.description;
              return (
                <>
                  <h3 className="font-display text-xl font-bold text-foreground pr-8">{title}</h3>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    {selected.event_date && (
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="size-3.5" />
                        {new Date(selected.event_date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    )}
                    {selected.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5" />
                        {selected.location}
                      </span>
                    )}
                  </div>

                  {selected.category && (
                    <span className="mt-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {selected.category}
                    </span>
                  )}

                  {selected.organization && (
                    <p className="mt-2 text-sm text-muted-foreground">{selected.organization}</p>
                  )}

                  {desc && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                  )}

                  {selected.url && (
                    <a
                      href={selected.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      <ExternalLink className="size-3.5" /> More details
                    </a>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
