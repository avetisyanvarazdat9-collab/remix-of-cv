import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { coursesQuery } from "@/lib/queries";
import { useLocalized, useT } from "@/lib/i18n";
import { buildPageHead } from "@/lib/seo";
import {
  pageContentQuery,
  resolvePageContentString,
  type PageContentI18n,
  type PageContentRow,
} from "@/lib/page-content";
import type { Tables } from "@/integrations/supabase/types";

const COURSES_PAGE = "courses";

function pageContentLookup(rows: PageContentRow[] | undefined, key: string, fallback: string) {
  const row = (rows ?? []).find((entry) => entry.key === key);
  return resolvePageContentString((row?.i18n ?? {}) as PageContentI18n, "en", fallback);
}

export const Route = createFileRoute("/courses")({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(coursesQuery),
      context.queryClient.ensureQueryData(pageContentQuery(COURSES_PAGE)),
    ]);
    const pageContent = await context.queryClient.ensureQueryData(pageContentQuery(COURSES_PAGE));
    return { pageContent };
  },
  head: ({ loaderData }) => {
    const pageContent = (loaderData as { pageContent?: PageContentRow[] } | undefined)?.pageContent;
    return buildPageHead({
      title: pageContentLookup(pageContent, "seo.title", "Courses Dr. Varazdat Avetisyan"),
      description: pageContentLookup(
        pageContent,
        "seo.description",
        "Structured in-person courses on AI, generative AI, machine learning, and data science taught by Dr. Varazdat Avetisyan.",
      ),
      path: "/courses",
    });
  },
  component: CoursesLayout,
});

type Course = Tables<"courses">;
type CourseStatus = "upcoming" | "ongoing" | "completed";
type CourseFilter = "all" | "online" | "upcoming" | "ongoing" | "completed";

const FILTER_OPTIONS: { id: CourseFilter; labelKey: string }[] = [
  { id: "all", labelKey: "courses.filter.all" },
  { id: "online", labelKey: "courses.filter.online" },
  { id: "upcoming", labelKey: "courses.filter.upcoming" },
  { id: "ongoing", labelKey: "courses.filter.ongoing" },
  { id: "completed", labelKey: "courses.filter.completed" },
];

function courseDeliveryType(course: Course) {
  return course.delivery_type === "online" ? "online" : "offline";
}

function courseStatus(course: Course): CourseStatus {
  if (course.status === "completed") return "completed";
  if (course.status === "upcoming") return "upcoming";
  return "ongoing";
}

function courseStatusBadgeClass(status: CourseStatus) {
  switch (status) {
    case "upcoming":
      return "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400";
    case "ongoing":
      return "border-primary/30 bg-primary/10 text-primary";
    case "completed":
      return "border-border bg-muted text-muted-foreground";
  }
}

function courseStatusLabelKey(status: CourseStatus) {
  switch (status) {
    case "upcoming":
      return "courses.status.upcoming";
    case "ongoing":
      return "courses.status.ongoing";
    case "completed":
      return "courses.status.completed";
  }
}

function CourseStatusBadge({ course, label }: { course: Course; label: string }) {
  const status = courseStatus(course);
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${courseStatusBadgeClass(status)}`}
    >
      {label}
    </span>
  );
}

function matchesCourseFilter(course: Course, filter: CourseFilter) {
  if (filter === "all") return true;
  if (filter === "online") return courseDeliveryType(course) === "online";
  return courseStatus(course) === filter;
}

function matchesTopicFilter(course: Course, topicFilter: string) {
  if (topicFilter === "all") return true;
  return (course.topics ?? []).includes(topicFilter);
}

function matchesSearch(
  course: Course,
  query: string,
  loc: (row: Course, field: keyof Course) => string | null | undefined,
) {
  const trimmed = query.trim();
  if (!trimmed) return true;
  const needle = trimmed.toLowerCase();
  const title = String(loc(course, "title") ?? course.title ?? "").toLowerCase();
  const description = String(loc(course, "description") ?? course.description ?? "").toLowerCase();
  return title.includes(needle) || description.includes(needle);
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
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<CourseFilter>("all");
  const [topicFilter, setTopicFilter] = useState("all");

  const allTopics = useMemo(() => {
    const topics = new Set<string>();
    for (const course of courses ?? []) {
      for (const topic of course.topics ?? []) {
        const trimmed = topic.trim();
        if (trimmed) topics.add(trimmed);
      }
    }
    return [...topics].sort((a, b) => a.localeCompare(b));
  }, [courses]);

  const filteredCourses = useMemo(
    () =>
      (courses ?? []).filter(
        (course) =>
          matchesCourseFilter(course, filter) &&
          matchesTopicFilter(course, topicFilter) &&
          matchesSearch(course, search, loc),
      ),
    [courses, filter, topicFilter, search, loc],
  );

  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">{t("courses.heading")}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{t("courses.lead")}</p>

        <div className="mt-8">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("courses.search.placeholder")}
            aria-label={t("courses.search.placeholder")}
            className="w-full rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="mt-4 -mx-1 flex flex-wrap gap-2 overflow-x-auto px-1 pb-1">
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

        {allTopics.length > 0 && (
          <div className="mt-4 -mx-1 flex flex-wrap gap-2 overflow-x-auto px-1 pb-1">
            <button
              type="button"
              onClick={() => setTopicFilter("all")}
              aria-pressed={topicFilter === "all"}
              className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-200 ${
                topicFilter === "all"
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border bg-background/60 text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {t("courses.filter.topic.all")}
            </button>
            {allTopics.map((topic) => {
              const active = topicFilter === topic;
              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setTopicFilter(topic)}
                  aria-pressed={active}
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-200 ${
                    active
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border bg-background/60 text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((c) => {
            const title = loc(c, "title");
            const level = loc(c, "level");
            const duration = loc(c, "duration");
            const status = courseStatus(c);
            return (
              <div key={c.id} className="glass flex flex-col rounded-2xl p-6 hover:border-primary/40">
                {c.image_url && (
                  <img src={c.image_url} alt={title} className="mb-4 aspect-video w-full rounded-lg object-cover" />
                )}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <CourseStatusBadge course={c} label={t(courseStatusLabelKey(status))} />
                  {level && <span className="text-primary">{level}</span>}
                  {duration && (
                    <>
                      {level && <span className="text-muted-foreground">·</span>}
                      <span className="text-primary">{duration}</span>
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
