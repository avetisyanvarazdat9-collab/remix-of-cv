import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { coursesQuery } from "@/lib/queries";
import { useLocalized, useT } from "@/lib/i18n";
import { buildPageHead } from "@/lib/seo";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/courses")({
  head: () =>
    buildPageHead({
      title: "Courses — Dr. Varazdat Avetisyan",
      description:
        "Structured in-person courses on AI, generative AI, machine learning, and data science taught by Dr. Varazdat Avetisyan.",
      path: "/courses",
    }),
  loader: ({ context }) => context.queryClient.ensureQueryData(coursesQuery),
  component: CoursesLayout,
});

type Course = Tables<"courses">;
type CourseFilter = "all" | "online" | "ongoing" | "completed";

const FILTER_OPTIONS: { id: CourseFilter; labelKey: string }[] = [
  { id: "all", labelKey: "courses.filter.all" },
  { id: "online", labelKey: "courses.filter.online" },
  { id: "ongoing", labelKey: "courses.filter.ongoing" },
  { id: "completed", labelKey: "courses.filter.completed" },
];

function courseDeliveryType(course: Course) {
  return course.delivery_type === "online" ? "online" : "offline";
}

function courseStatus(course: Course) {
  return course.status === "completed" ? "completed" : "ongoing";
}

function matchesCourseFilter(course: Course, filter: CourseFilter) {
  if (filter === "all") return true;
  if (filter === "online") return courseDeliveryType(course) === "online";
  if (filter === "ongoing") return courseStatus(course) === "ongoing";
  return courseStatus(course) === "completed";
}

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
  const [filter, setFilter] = useState<CourseFilter>("all");

  const filteredCourses = useMemo(
    () => (courses ?? []).filter((c) => matchesCourseFilter(c, filter)),
    [courses, filter],
  );

  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">{t("courses.heading")}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{t("courses.lead")}</p>

        <div className="mt-8 -mx-1 flex flex-wrap gap-2 overflow-x-auto px-1 pb-1">
          {FILTER_OPTIONS.map((option) => {
            const active = filter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setFilter(option.id)}
                aria-pressed={active}
                className={`shrink-0 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-background/60 text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {t(option.labelKey)}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((c) => {
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
                  {duration && (
                    <>
                      <span>·</span>
                      <span>{duration}</span>
                    </>
                  )}
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{loc(c, "description")}</p>
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
        </div>

        {(courses ?? []).length === 0 && (
          <p className="mt-10 text-muted-foreground">{t("courses.empty")}</p>
        )}
        {(courses ?? []).length > 0 && filteredCourses.length === 0 && (
          <p className="mt-10 text-muted-foreground">{t("courses.filter.empty")}</p>
        )}
      </section>
    </PublicLayout>
  );
}
