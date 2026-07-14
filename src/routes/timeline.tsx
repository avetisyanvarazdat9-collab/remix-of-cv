import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, Globe2 } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { internationalExperienceQuery } from "@/lib/queries";
import { useLocalized } from "@/lib/i18n";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "International Experience Timeline — Dr. Varazdat Avetisyan" },
      {
        name: "description",
        content:
          "Trainings, workshops, conferences, and academic exchanges across the globe — a chronological timeline of international engagements.",
      },
      { property: "og:title", content: "International Experience Timeline" },
      {
        property: "og:description",
        content:
          "A chronological timeline of trainings, workshops, and international academic engagements.",
      },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(internationalExperienceQuery());
  },
  component: TimelinePage,
});

function TimelinePage() {
  const { data: intlRows } = useSuspenseQuery(internationalExperienceQuery());
  const loc = useLocalized();

  const timelineEntries = [...(intlRows ?? [])].sort((a: any, b: any) => {
    const ad = a.event_date ? new Date(a.event_date).getTime() : 0;
    const bd = b.event_date ? new Date(b.event_date).getTime() : 0;
    return bd - ad;
  });
  const countryCount = new Set(
    (intlRows ?? []).map((r: any) => r.country_code).filter(Boolean),
  ).size;

  return (
    <PublicLayout>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>

        <header className="mt-8 border-b border-border pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            International Experience
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Trainings, talks & workshops
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            A chronological record of international engagements — most recent first.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Globe2 className="size-3.5" />
              {countryCount > 0 ? `${countryCount} countries` : "Global reach"}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              {timelineEntries.length}+ engagements
            </span>
          </div>
        </header>

        <div className="mt-10">
          {timelineEntries.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">
              No entries yet.
            </p>
          ) : (
            <ol className="relative space-y-8 border-l border-border pl-6 sm:pl-8">
              {timelineEntries.map((r: any) => {
                const year = r.event_date
                  ? new Date(r.event_date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                    })
                  : "";
                return (
                  <li key={r.id} className="relative">
                    <span className="absolute -left-[29px] top-1.5 flex size-3 items-center justify-center sm:-left-[37px]">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
                      <span className="relative inline-flex size-3 rounded-full border-2 border-background bg-primary" />
                    </span>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      {year && (
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                          {year}
                        </span>
                      )}
                      {r.category && (
                        <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          {r.category}
                        </span>
                      )}
                    </div>
                    <h2 className="mt-1 font-display text-lg font-semibold text-foreground">
                      {(loc(r, "title") as string) || r.title}
                    </h2>
                    {(r.organization || r.location) && (
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {[r.organization, r.location].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    {r.description && (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {(loc(r, "description") as string) || r.description}
                      </p>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
