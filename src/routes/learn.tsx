import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, BookOpen, FileText, Quote } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { HubHero, HubSection, HubCTA } from "@/components/hub/HubLayout";
import { VideoThumbnail } from "@/components/video/VideoThumbnail";
import { coursesQuery, videoCoursesQuery, blogQuery, learningResourcesQuery, testimonialsQuery, statisticsQuery, successStoriesQuery } from "@/lib/queries";
import { useLocalized, useT } from "@/lib/i18n";
import { buildPageHead } from "@/lib/seo";
import {
  pageContentQuery,
  resolvePageContentString,
  usePageContent,
  type PageContentI18n,
  type PageContentRow,
} from "@/lib/page-content";
import type { Tables } from "@/integrations/supabase/types";

const LEARN_PAGE = "learn";

type Course = Tables<"courses">;
type CourseStatus = "upcoming" | "ongoing" | "completed";

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

function resourceTypeLabelKey(type: string) {
  switch (type) {
    case "paper":
      return "resources.type.paper";
    case "dataset":
      return "resources.type.dataset";
    case "tool":
      return "resources.type.tool";
    default:
      return "resources.type.book";
  }
}

function pageContentLookup(rows: PageContentRow[] | undefined, key: string, fallback: string) {
  const row = (rows ?? []).find((entry) => entry.key === key);
  return resolvePageContentString((row?.i18n ?? {}) as PageContentI18n, "en", fallback);
}

export const Route = createFileRoute("/learn")({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(coursesQuery),
      context.queryClient.ensureQueryData(videoCoursesQuery),
      context.queryClient.ensureQueryData(blogQuery),
      context.queryClient.ensureQueryData(learningResourcesQuery),
      context.queryClient.ensureQueryData(testimonialsQuery),
      context.queryClient.ensureQueryData(statisticsQuery),
      context.queryClient.ensureQueryData(successStoriesQuery),
      context.queryClient.ensureQueryData(pageContentQuery(LEARN_PAGE)),
    ]);
    const pageContent = await context.queryClient.ensureQueryData(pageContentQuery(LEARN_PAGE));
    return { pageContent };
  },
  head: ({ loaderData }) => {
    const pageContent = (loaderData as { pageContent?: PageContentRow[] } | undefined)?.pageContent;
    return buildPageHead({
      title: pageContentLookup(
        pageContent,
        "seo.title",
        "Learn AI Courses, Video Lessons & Articles | Dr. Varazdat Avetisyan",
      ),
      description: pageContentLookup(
        pageContent,
        "seo.description",
        "Develop AI, Data Science and Software Engineering skills through in-person courses, on-demand video lessons and long-form articles taught by Dr. Varazdat Avetisyan.",
      ),
      path: "/learn",
      keywords: pageContentLookup(
        pageContent,
        "seo.keywords",
        "AI Training Armenia, Generative AI Armenia, Machine Learning Instructor Armenia, Data Science Training Armenia, Prompt Engineering Armenia",
      ),
    });
  },
  component: LearnHub,
});

function LearnHub() {
  const { data: courses } = useSuspenseQuery(coursesQuery);
  const { data: videos } = useSuspenseQuery(videoCoursesQuery);
  const { data: posts } = useSuspenseQuery(blogQuery);
  const { data: resources } = useSuspenseQuery(learningResourcesQuery);
  const { data: testimonials } = useSuspenseQuery(testimonialsQuery);
  const { data: statistics } = useSuspenseQuery(statisticsQuery);
  const { data: successStories } = useSuspenseQuery(successStoriesQuery);
  const loc = useLocalized();
  const t = useT();
  const { pc } = usePageContent(LEARN_PAGE);

  const featuredCourses = (courses ?? []).filter((c: any) => c.is_visible).slice(0, 6);
  const featuredVideos = (videos ?? []).filter((v: any) => v.is_visible).slice(0, 4);
  const featuredResources = (resources ?? []).filter((r: any) => r.is_visible).slice(0, 6);
  const featuredPosts = (posts ?? []).filter((p: any) => p.is_published !== false).slice(0, 3);
  const studentTestimonials = (testimonials ?? []).filter((tm: any) => tm.category === "Student").slice(0, 3);
  const learnStats = (statistics ?? []).filter((s: any) => s.is_visible && s.show_on_learn);
  const featuredStories = (successStories ?? []).filter((s: any) => s.is_visible).slice(0, 3);

  return (
    <PublicLayout>
      <HubHero
        eyebrow={pc("hero.eyebrow", "Learn")}
        heading={pc("hero.heading", "Build real AI and data skills")}
        subheading={pc(
          "hero.subheading",
          "Curated courses, on-demand videos, and long-form articles designed to take you from curious beginner to confident practitioner.",
        )}
        primaryTo="/courses"
        primaryLabel={pc("hero.cta_primary", "Browse Courses")}
        secondaryTo="/video-courses"
        secondaryLabel={pc("hero.cta_secondary", "Watch Videos")}
      />

      <HubSection
        eyebrow={pc("courses.eyebrow", "Courses")}
        heading={pc("courses.heading", "Instructor-led programs")}
        viewAllTo="/courses"
        viewAllLabel={pc("courses.view_all", "View all →")}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((c: any) => (
            <article key={c.id} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40">
              {c.image_url ? (
                <img src={c.image_url} alt={loc(c, "title")} className="h-40 w-full object-cover" />
              ) : (
                <div className="h-40 w-full" style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--primary) 30%, transparent), color-mix(in oklab, var(--accent) 30%, transparent))" }} />
              )}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2">
                  <CourseStatusBadge
                    course={c}
                    label={t(courseStatusLabelKey(courseStatus(c)))}
                  />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground">{loc(c, "title")}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{loc(c, "description")}</p>
                <Link to="/courses/$slug" params={{ slug: c.slug }} className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                  {pc("courses.card_cta", "Learn more")} <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </HubSection>

      <HubSection
        eyebrow={pc("videos.eyebrow", "Video Library")}
        heading={pc("videos.heading", "Watch and learn at your pace")}
        viewAllTo="/video-courses"
        viewAllLabel={pc("videos.view_all", "View all →")}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredVideos.map((v: any) => (
            <Link
              key={v.id}
              to="/video-courses/$slug"
              params={{ slug: v.slug }}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40"
            >
              <VideoThumbnail
                video={v}
                title={loc(v, "title")}
                fallbackLabel={t("video.thumbnailLabel")}
                roundedClassName="rounded-none"
              />
              <div className="p-4">
                <p className="line-clamp-2 text-sm font-medium text-foreground">{loc(v, "title")}</p>
                {v.platform && (
                  <p className="mt-1 text-xs text-muted-foreground">{loc(v, "platform")}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </HubSection>

      <HubSection
        eyebrow={pc("resources.eyebrow", "Learning Resources")}
        heading={pc("resources.heading", "Recommended reading & tools")}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredResources.map((r: any) => {
            const title = loc(r, "title");
            const description = loc(r, "description");
            const cardClass =
              "group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40";
            const cardContent = (
              <>
                <span className="inline-flex w-fit rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                  {t(resourceTypeLabelKey(r.resource_type))}
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground group-hover:text-primary">
                  {title}
                </h3>
                {r.author_or_source && (
                  <p className="mt-1 text-sm text-muted-foreground">{r.author_or_source}</p>
                )}
                {description && (
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{description}</p>
                )}
              </>
            );

            return r.url ? (
              <a
                key={r.id}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className={cardClass}
              >
                {cardContent}
              </a>
            ) : (
              <div key={r.id} className={cardClass}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </HubSection>

      {learnStats.length > 0 && (
        <HubSection
          eyebrow={pc("impact.eyebrow", "Impact")}
          heading={pc("impact.heading", "Learning outcomes at a glance")}
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {learnStats.map((s: any) => (
              <div key={s.id} className="text-center">
                <p className="text-2xl font-bold text-foreground md:text-3xl">
                  {(loc(s, "value") as string) || s.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {(loc(s, "label") as string) || s.label}
                </p>
              </div>
            ))}
          </div>
        </HubSection>
      )}

      <HubSection
        eyebrow={pc("articles.eyebrow", "Articles")}
        heading={pc("articles.heading", "Insights from the frontier of AI")}
        viewAllTo="/blog"
        viewAllLabel={pc("articles.view_all", "View all →")}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {featuredPosts.map((p: any) => (
            <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }} className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
              <FileText className="size-5 text-primary" />
              <h3 className="mt-4 font-display text-base font-semibold text-foreground group-hover:text-primary">{loc(p, "title")}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{loc(p, "excerpt") || loc(p, "summary")}</p>
            </Link>
          ))}
        </div>
      </HubSection>

      {studentTestimonials.length > 0 && (
        <HubSection
          eyebrow={pc("testimonials.eyebrow", "Testimonials")}
          heading={pc("testimonials.heading", "What learners say")}
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {studentTestimonials.map((tm: any) => (
              <figure key={tm.id} className="premium-card flex h-full flex-col p-7">
                <Quote className="size-5 text-primary/50" />
                <blockquote className="mt-4 flex-1 text-sm leading-[1.75] text-foreground">
                  {(loc(tm, "quote") as string) || tm.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
                  {tm.avatar_url ? (
                    <img src={tm.avatar_url} alt="" className="size-10 rounded-full object-cover ring-2 ring-primary/10" />
                  ) : (
                    <div className="icon-badge size-10 text-sm font-semibold">
                      {tm.author_name?.slice(0, 1)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{tm.author_name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {[tm.role, tm.organization].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </HubSection>
      )}

      {featuredStories.length > 0 && (
        <HubSection
          eyebrow={pc("stories.eyebrow", "Success Stories")}
          heading={pc("stories.heading", "Where our learners are now")}
        >
          <div className="grid gap-6 md:grid-cols-3">
            {featuredStories.map((s: any) => {
              const headline = loc(s, "headline");
              const outcome = loc(s, "outcome");
              const story = loc(s, "story");
              const cardClass =
                "group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40";
              const cardContent = (
                <>
                  <div className="flex items-center gap-3">
                    {s.photo_url ? (
                      <img src={s.photo_url} alt="" className="size-14 rounded-full object-cover" />
                    ) : (
                      <div className="icon-badge size-14 text-lg font-semibold">
                        {s.name?.slice(0, 1)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground">{s.name}</p>
                      {headline && (
                        <p className="text-sm text-muted-foreground">{headline}</p>
                      )}
                    </div>
                  </div>
                  {outcome && (
                    <span className="mt-4 inline-flex w-fit rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                      {outcome}
                    </span>
                  )}
                  {story && (
                    <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{story}</p>
                  )}
                </>
              );

              return s.link_url ? (
                <a
                  key={s.id}
                  href={s.link_url}
                  target="_blank"
                  rel="noreferrer"
                  className={cardClass}
                >
                  {cardContent}
                </a>
              ) : (
                <div key={s.id} className={cardClass}>
                  {cardContent}
                </div>
              );
            })}
          </div>
        </HubSection>
      )}

      <HubCTA
        heading={pc("cta.heading", "Ready to enroll in a course?")}
        text={pc(
          "cta.body",
          "Reach out to discuss which program best matches your goals, team, or organization.",
        )}
        primaryTo="/contact"
        primaryLabel={pc("cta.button", "Get Course Details")}
        icon={BookOpen}
      />
    </PublicLayout>
  );
}
