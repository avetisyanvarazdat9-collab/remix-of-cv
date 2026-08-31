import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { useMemo } from "react";
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
import type { Tables } from "@/integrations/supabase/types";

const VIDEO_COURSES_PAGE = "video-courses";

type VideoCourse = Tables<"video_courses"> & { playlist?: string | null };

type VideoPlaylistGroup = {
  playlist: string | null;
  videos: VideoCourse[];
};

function pageContentLookup(rows: PageContentRow[] | undefined, key: string, fallback: string) {
  const row = (rows ?? []).find((entry) => entry.key === key);
  return resolvePageContentString((row?.i18n ?? {}) as PageContentI18n, "en", fallback);
}

function groupVideosByPlaylist(videos: VideoCourse[]): VideoPlaylistGroup[] {
  const playlistMap = new Map<string, VideoCourse[]>();
  const playlistOrder: string[] = [];
  const ungrouped: VideoCourse[] = [];

  for (const video of videos) {
    const playlist = video.playlist?.trim();
    if (playlist) {
      if (!playlistMap.has(playlist)) {
        playlistMap.set(playlist, []);
        playlistOrder.push(playlist);
      }
      playlistMap.get(playlist)!.push(video);
      continue;
    }
    ungrouped.push(video);
  }

  const groups: VideoPlaylistGroup[] = playlistOrder.map((playlist) => ({
    playlist,
    videos: playlistMap.get(playlist) ?? [],
  }));

  if (ungrouped.length > 0) {
    groups.push({ playlist: null, videos: ungrouped });
  }

  return groups;
}

function VideoCourseCard({
  video,
  loc,
  t,
}: {
  video: VideoCourse;
  loc: (row: VideoCourse, field: keyof VideoCourse) => string | null | undefined;
  t: (key: string) => string;
}) {
  const title = loc(video, "title");
  const platform = loc(video, "platform");
  const duration = loc(video, "duration");

  return (
    <div className="glass group flex flex-col rounded-2xl p-4 hover:border-primary/40">
      <Link to="/video-courses/$slug" params={{ slug: video.slug }} className="block">
        <VideoThumbnail
          video={video}
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
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{loc(video, "description")}</p>
        {video.topics && video.topics.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {video.topics.slice(0, 5).map((tp) => (
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
          params={{ slug: video.slug }}
          className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          {t("courses.learnMore")}
        </Link>
      </div>
    </div>
  );
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
  const allVideos = (videos ?? []) as VideoCourse[];
  const playlistGroups = useMemo(() => groupVideosByPlaylist(allVideos), [allVideos]);

  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">{t("video.heading")}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{t("video.lead")}</p>

        {allVideos.length === 0 ? (
          <p className="mt-10 text-muted-foreground">{t("video.empty")}</p>
        ) : (
          <div className="mt-10 space-y-10">
            {playlistGroups.map((group) => (
              <div key={group.playlist ?? "__ungrouped__"}>
                <div className="mb-5 flex flex-wrap items-baseline gap-2">
                  <h2 className="font-display text-xl font-semibold">
                    {group.playlist ?? t("video.ungrouped")}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    ({group.videos.length} {t("video.videoCount")})
                  </span>
                </div>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {group.videos.map((v) => (
                    <VideoCourseCard key={v.id} video={v} loc={loc} t={t} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </PublicLayout>
  );
}
