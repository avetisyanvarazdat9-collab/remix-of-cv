import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PlayCircle } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { videoCoursesQuery } from "@/lib/queries";
import { useLocalized, useT } from "@/lib/i18n";

export const Route = createFileRoute("/video-courses")({
  head: () => ({ meta: [{ title: "Video Courses — Varazdat Avetisyan" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(videoCoursesQuery),
  component: VideoCoursesPage,
});

function VideoCoursesPage() {
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
              <a
                key={v.id}
                href={v.video_url ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="glass group rounded-2xl p-4 hover:border-primary/40"
              >
                <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                  {v.thumbnail_url ? (
                    <img src={v.thumbnail_url} alt={title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <PlayCircle className="size-12 text-primary/60" />
                    </div>
                  )}
                </div>
                <div className="px-2 pt-4 pb-2">
                  <div className="text-xs text-primary">{platform} {duration && `· ${duration}`}</div>
                  <h3 className="mt-1 font-display text-base font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{loc(v, "description")}</p>
                </div>
              </a>
            );
          })}
          {(videos ?? []).length === 0 && <p className="text-muted-foreground">{t("video.empty")}</p>}
        </div>
      </section>
    </PublicLayout>
  );
}
