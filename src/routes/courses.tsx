import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { coursesQuery } from "@/lib/queries";
import { useLocalized, useT } from "@/lib/i18n";

export const Route = createFileRoute("/courses")({
  head: () => ({ meta: [{ title: "Courses — Varazdat Avetisyan" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(coursesQuery),
  component: CoursesPage,
});

function CoursesPage() {
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
              <a
                key={c.id}
                href={c.link_url ?? "#"}
                target={c.link_url ? "_blank" : undefined}
                rel="noreferrer"
                className="glass rounded-2xl p-6 hover:border-primary/40"
              >
                {c.image_url && <img src={c.image_url} alt={title} className="mb-4 aspect-video w-full rounded-lg object-cover" />}
                <div className="flex items-center gap-2 text-xs text-primary">
                  {level && <span>{level}</span>}
                  {duration && <><span>·</span><span>{duration}</span></>}
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{loc(c, "description")}</p>
              </a>
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
