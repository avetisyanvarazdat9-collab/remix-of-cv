import { useState } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { Tables } from "@/integrations/supabase/types";

type Experience = Tables<"professional_experience">;

type CareerTimelineProps = {
  items: Experience[];
  loc: (row: Experience, field: keyof Experience) => string | null | undefined;
};

function formatPeriod(entry: Experience) {
  const start = entry.start_year ?? "";
  if (entry.is_current) return `${start} — Present`;
  if (entry.end_year) return `${start}–${entry.end_year}`;
  return String(start);
}

export function CareerTimeline({ items, loc }: CareerTimelineProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <ol className="relative mt-8">
      <div
        aria-hidden
        className="absolute bottom-4 left-[11px] top-3 w-px bg-gradient-to-b from-primary/50 via-border/80 to-primary/15 sm:left-[15px]"
      />

      {items.map((entry, index) => {
        const jobTitle = loc(entry, "job_title") || entry.job_title;
        const organization = loc(entry, "organization") || entry.organization;
        const location = loc(entry, "location") || entry.location;
        const employmentType = loc(entry, "employment_type") || entry.employment_type;
        const description = loc(entry, "description") || entry.description;
        const period = formatPeriod(entry);
        const isActive = activeId === entry.id;

        return (
          <li key={entry.id} className="group/item relative pb-10 last:pb-0">
            <span
              aria-hidden
              className={`absolute left-0 top-7 z-10 flex size-[22px] items-center justify-center transition-transform duration-300 sm:top-8 ${
                isActive ? "scale-110" : "group-hover/item:scale-105"
              }`}
            >
              <span
                className={`size-3 rounded-full bg-primary transition-all duration-300 ring-4 ring-background ${
                  isActive
                    ? "shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_25%,transparent)]"
                    : "shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_35%,transparent)] group-hover/item:shadow-[0_0_0_2px_color-mix(in_oklab,var(--primary)_20%,transparent)]"
                }`}
              />
            </span>

            <RevealOnScroll delay={index * 60} className="pl-10 sm:pl-12">
              <article
                tabIndex={0}
                onMouseEnter={() => setActiveId(entry.id)}
                onMouseLeave={() => setActiveId((current) => (current === entry.id ? null : current))}
                onFocus={() => setActiveId(entry.id)}
                onBlur={() => setActiveId((current) => (current === entry.id ? null : current))}
                onClick={() => setActiveId((current) => (current === entry.id ? null : entry.id))}
                className={`premium-card cursor-default p-5 transition-all duration-300 ease-out sm:p-6 ${
                  isActive
                    ? "-translate-y-0.5 border-primary/35 shadow-[var(--shadow-card-hover)]"
                    : "hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[var(--shadow-card-hover)]"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <h3 className="font-display text-base font-semibold leading-snug text-foreground sm:text-lg">
                    {jobTitle}
                  </h3>
                  <time
                    dateTime={period.replace(/\s/g, "")}
                    className={`shrink-0 text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ${
                      isActive ? "text-primary" : "text-primary/80"
                    }`}
                  >
                    {period}
                  </time>
                </div>

                {organization && (
                  <p className="mt-2 text-sm font-medium text-primary">{organization}</p>
                )}

                {(location || employmentType) && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {[location, employmentType].filter(Boolean).join(" · ")}
                  </p>
                )}

                {description && (
                  <p className="mt-3 border-t border-border/60 pt-3 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                )}
              </article>
            </RevealOnScroll>
          </li>
        );
      })}
    </ol>
  );
}
