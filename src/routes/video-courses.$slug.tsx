import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { videoCoursesQuery } from "@/lib/queries";
import { useLocalized, useT } from "@/lib/i18n";
import { buildPageHead, localizedField, truncateDescription } from "@/lib/seo";

export const Route = createFileRoute("/video-courses/$slug")({
  loader: async ({ context, params }) => {
    const videos = await context.queryClient.ensureQueryData(videoCoursesQuery);
    const video = (videos ?? []).find((v) => v.slug === params.slug) ?? null;
    return { video };
  },
  head: ({ loaderData, params }) => {
    const video = loaderData?.video;
    if (!video) {
      return buildPageHead({
        title: "Video Course — Dr. Varazdat Avetisyan",
        path: `/video-courses/${params.slug}`,
      });
    }
    const title = localizedField(video, "title") || video.title;
    const description = truncateDescription(localizedField(video, "description") || title);
    return buildPageHead({
      title: `${title} — Dr. Varazdat Avetisyan`,
      description,
      path: `/video-courses/${video.slug}`,
      ogImage: video.thumbnail_url,
    });
  },
  component: VideoCourseDetail,
  notFoundComponent: () => (
    <PublicLayout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Video not found</h1>
        <Link to="/video-courses" className="mt-4 inline-block text-primary">Back to Video Courses</Link>
      </div>
    </PublicLayout>
  ),
  errorComponent: ({ error }) => (
    <PublicLayout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl">Failed to load video course</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
      </div>
    </PublicLayout>
  ),
});

function getYouTubeEmbed(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
      if (u.pathname.startsWith("/embed/")) return url;
    }
  } catch {
    /* ignore */
  }
  return null;
}

function VideoCourseDetail() {
  const { slug } = Route.useParams();
  const { data: videos } = useSuspenseQuery(videoCoursesQuery);
  const loc = useLocalized();
  const t = useT();
  const video = (videos ?? []).find((v) => v.slug === slug);
  if (!video) throw notFound();

  const title = loc(video, "title");
  const description = loc(video, "description");
  const platform = loc(video, "platform");
  const duration = loc(video, "duration");
  const embed = getYouTubeEmbed(video.youtube_url) ?? getYouTubeEmbed(video.video_url);

  const related = (videos ?? [])
    .filter((v) => v.slug !== slug)
    .filter((v) => {
      const a = video.topics ?? [];
      const b = v.topics ?? [];
      return a.length === 0 || b.some((t) => a.includes(t));
    })
    .slice(0, 3);

  return (
    <PublicLayout>
      <article className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <Link to="/video-courses" className="text-sm text-primary">← Back to Video Courses</Link>
        <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-primary">
          {platform && <span>{platform}</span>}
          {duration && <><span>·</span><span>{duration}</span></>}
        </div>

        {embed ? (
          <div className="mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-border">
            <iframe
              src={embed}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        ) : video.thumbnail_url ? (
          <img src={video.thumbnail_url} alt={title} className="mt-8 aspect-video w-full rounded-2xl border border-border object-cover" />
        ) : null}

        {description && (
          <div className="prose prose-invert mt-8 max-w-none whitespace-pre-line text-foreground">
            {description}
          </div>
        )}

        {video.topics && video.topics.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold">{t("courses.topics")}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {video.topics.map((tp) => (
                <span key={tp} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                  {tp}
                </span>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-xl font-semibold">{t("courses.related")}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {related.map((v) => (
                <Link
                  key={v.id}
                  to="/video-courses/$slug"
                  params={{ slug: v.slug }}
                  className="glass rounded-xl p-3 hover:border-primary/40"
                >
                  {v.thumbnail_url && (
                    <img src={v.thumbnail_url} alt={loc(v, "title")} className="aspect-video w-full rounded-lg object-cover" />
                  )}
                  <div className="mt-3 font-display text-sm font-semibold">{loc(v, "title")}</div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </PublicLayout>
  );
}
