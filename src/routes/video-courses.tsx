import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { VideoThumbnail } from "@/components/video/VideoThumbnail";
import { videoCoursesQuery } from "@/lib/queries";
import { useLocalized, useT } from "@/lib/i18n";
import { buildPageHead } from "@/lib/seo";
import {
  pageContentQuery,
  resolvePageContentString,
  type PageContentI18n,
  type PageContentRow,
} from "@/lib/page-content";

const VIDEO_COURSES_PAGE = "video-courses";

function pageContentLookup(rows: PageContentRow[] | undefined, key: string, fallback: string) {
  const row = (rows ?? []).find((entry) => entry.key === key);
  return resolvePageContentString((row?.i18n ?? {}) as PageContentI18n, "en", fallback);
}

export const Route = createFileRoute("/video-courses")({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(videoCoursesQuery),
      context.queryClient.ensureQueryData(pageContentQuery(VIDEO_COURSES_PAGE)),
    ]);
    const pageContent = await context.queryClient.ensureQueryData(pageContentQuery(VIDEO_COURSES_PAGE));
    return { pageContent };
  },
  head: ({ loaderData }) => {
    const pageContent = (loaderData as { pageContent?: PageContentRow[] } | undefined)?.pageContent;
    return buildPageHead({
      title: pageContentLookup(pageContent, "seo.title", "Video Courses Dr. Varazdat Avetisyan"),
      description: pageContentLookup(
        pageContent,
        "seo.description",
        "On-demand video lessons on AI, machine learning, and data science from Dr. Varazdat Avetisyan.",
      ),
      path: "/video-courses",
    });
  },
  component: VideoCoursesLayout,
});

function VideoCoursesLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/video-courses/$slug");
  if (isChild) return <Outlet />;
  return <VideoCoursesIndex />;
}

function VideoCoursesIndex() {
  const { data: videos } = useSuspenseQuery(videoCoursesQuery);
  const loc = useLocalized();
  const t = useT();
  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">{t("video.heading")}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{t("video.lead")}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {(videos ?? []).map((v) => {
            const title = loc(v, "title");
            const platform = loc(v, "platform");
            const duration = loc(v, "duration");
            return (
              <div key={v.id} className="glass group flex flex-col rounded-2xl p-4 hover:border-primary/40">
                <Link to="/video-courses/$slug" params={{ slug: v.slug }} className="block">
                  <VideoThumbnail
                    video={v}
                    title={title}
                    fallbackLabel={t("video.thumbnailLabel")}
                  />
                </Link>
                <div className="px-2 pt-4 pb-2">
                  <div className="text-xs text-primary">
                    {platform}
                    {duration && ` · ${duration}`}
                  </div>
                  <h3 className="mt-1 font-display text-base font-semibold">{title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{loc(v, "description")}</p>
                  {v.topics && v.topics.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {v.topics.slice(0, 5).map((tp) => (
                        <span
                          key={tp}
                          className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {tp}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-auto px-2 pb-2 pt-3">
                  <Link
                    to="/video-courses/$slug"
                    params={{ slug: v.slug }}
                    className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                  >
                    {t("courses.learnMore")}
                  </Link>
                </div>
              </div>
            );
          })}
          {(videos ?? []).length === 0 && <p className="text-muted-foreground">{t("video.empty")}</p>}
        </div>
      </section>
    </PublicLayout>
  );
}
