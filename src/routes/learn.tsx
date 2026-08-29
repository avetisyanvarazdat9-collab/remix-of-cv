import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, BookOpen, FileText } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { HubHero, HubSection, HubCTA } from "@/components/hub/HubLayout";
import { VideoThumbnail } from "@/components/video/VideoThumbnail";
import { coursesQuery, videoCoursesQuery, blogQuery } from "@/lib/queries";
import { useLocalized, useT } from "@/lib/i18n";
import { buildPageHead } from "@/lib/seo";
import {
  pageContentQuery,
  resolvePageContentString,
  usePageContent,
  type PageContentI18n,
  type PageContentRow,
} from "@/lib/page-content";

const LEARN_PAGE = "learn";

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
  const loc = useLocalized();
  const t = useT();
  const { pc } = usePageContent(LEARN_PAGE);

  const featuredCourses = (courses ?? []).filter((c: any) => c.is_visible).slice(0, 6);
  const featuredVideos = (videos ?? []).filter((v: any) => v.is_visible).slice(0, 4);
  const featuredPosts = (posts ?? []).filter((p: any) => p.is_published !== false).slice(0, 3);

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
