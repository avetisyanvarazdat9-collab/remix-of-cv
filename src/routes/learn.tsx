import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, BookOpen, Video, FileText } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { HubHero, HubSection, HubCTA } from "@/components/hub/HubLayout";
import { coursesQuery, videoCoursesQuery, blogQuery } from "@/lib/queries";
import { useLocalized } from "@/lib/i18n";
import { buildPageHead } from "@/lib/seo";

export const Route = createFileRoute("/learn")({
  head: () =>
    buildPageHead({
      title: "Learn — AI Courses, Video Lessons & Articles | Dr. Varazdat Avetisyan",
      description:
        "Develop AI, Data Science and Software Engineering skills through in-person courses, on-demand video lessons and long-form articles taught by Dr. Varazdat Avetisyan.",
      path: "/learn",
      keywords:
        "AI Training Armenia, Generative AI Armenia, Machine Learning Instructor Armenia, Data Science Training Armenia, Prompt Engineering Armenia",
    }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(coursesQuery);
    context.queryClient.ensureQueryData(videoCoursesQuery);
    context.queryClient.ensureQueryData(blogQuery);
  },
  component: LearnHub,
});

function LearnHub() {
  const { data: courses } = useSuspenseQuery(coursesQuery);
  const { data: videos } = useSuspenseQuery(videoCoursesQuery);
  const { data: posts } = useSuspenseQuery(blogQuery);
  const loc = useLocalized();

  const featuredCourses = (courses ?? []).filter((c: any) => c.is_visible).slice(0, 6);
  const featuredVideos = (videos ?? []).filter((v: any) => v.is_visible).slice(0, 4);
  const featuredPosts = (posts ?? []).filter((p: any) => p.is_published !== false).slice(0, 3);

  return (
    <PublicLayout>
      <HubHero
        eyebrow="Learn"
        heading="Build real AI and data skills"
        subheading="Curated courses, on-demand videos, and long-form articles designed to take you from curious beginner to confident practitioner."
        primaryTo="/courses"
        primaryLabel="Browse Courses"
        secondaryTo="/video-courses"
        secondaryLabel="Watch Videos"
      />

      <HubSection eyebrow="Courses" heading="Instructor-led programs" viewAllTo="/courses">
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
                <Link to="/courses" className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                  Learn more <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </HubSection>

      <HubSection eyebrow="Video Library" heading="Watch and learn at your pace" viewAllTo="/video-courses">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredVideos.map((v: any) => (
            <a key={v.id} href={v.video_url || "#"} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40">
              <div className="relative aspect-video w-full bg-muted">
                {v.thumbnail_url && <img src={v.thumbnail_url} alt={loc(v, "title")} className="size-full object-cover" />}
                <span className="absolute inset-0 flex items-center justify-center bg-foreground/10 opacity-0 transition-opacity group-hover:opacity-100">
                  <Video className="size-8 text-white" />
                </span>
              </div>
              <div className="p-4">
                <p className="line-clamp-2 text-sm font-medium text-foreground">{loc(v, "title")}</p>
                {v.category && <p className="mt-1 text-xs text-muted-foreground">{v.category}</p>}
              </div>
            </a>
          ))}
        </div>
      </HubSection>

      <HubSection eyebrow="Articles" heading="Insights from the frontier of AI" viewAllTo="/blog">
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
        heading="Ready to enroll in a course?"
        text="Reach out to discuss which program best matches your goals, team, or organization."
        primaryTo="/contact"
        primaryLabel="Get Course Details"
        icon={BookOpen}
      />
    </PublicLayout>
  );
}
