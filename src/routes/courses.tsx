import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { coursesQuery } from "@/lib/queries";
import { useLocalized, useT } from "@/lib/i18n";

export const Route = createFileRoute("/courses")({
  head: () => ({ meta: [{ title: "Courses — Varazdat Avetisyan" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(coursesQuery),
  component: CoursesLayout,
});

function CoursesLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/courses/$slug");
  if (isChild) return <Outlet />;
  return <CoursesIndex />;
}

function CoursesIndex() {
  const { data: courses } = useSuspenseQuery(coursesQuery);
  const loc = useLocalized();
  const t = useT();
  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">{t("courses.heading")}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{t("courses.lead")}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {(courses ?? []).map((c) => {
            const title = loc(c, "title");
            const level = loc(c, "level");
            const duration = loc(c, "duration");
            return (
              <div key={c.id} className="glass flex flex-col rounded-2xl p-6 hover:border-primary/40">
                {c.image_url && (
                  <img src={c.image_url} alt={title} className="mb-4 aspect-video w-full rounded-lg object-cover" />
                )}
                <div className="flex items-center gap-2 text-xs text-primary">
                  {level && <span>{level}</span>}
                  {duration && <><span>·</span><span>{duration}</span></>}
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{loc(c, "description")}</p>
                {c.topics && c.topics.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.topics.slice(0, 6).map((tp) => (
                      <span key={tp} className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                        {tp}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-auto pt-5">
                  <Link
                    to="/courses/$slug"
                    params={{ slug: c.slug }}
                    className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                  >
                    {t("courses.learnMore")}
                  </Link>
                </div>
              </div>
            );
          })}
          {(courses ?? []).length === 0 && (
            <p className="text-muted-foreground">{t("courses.empty")}</p>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
