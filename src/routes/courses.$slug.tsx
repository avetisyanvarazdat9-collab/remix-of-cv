import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { coursesQuery, profileQuery } from "@/lib/queries";
import { useLocalized, useT } from "@/lib/i18n";
import { buildPageHead, localizedField, truncateDescription } from "@/lib/seo";

export const Route = createFileRoute("/courses/$slug")({
  loader: async ({ context, params }) => {
    const [courses] = await Promise.all([
      context.queryClient.ensureQueryData(coursesQuery),
      context.queryClient.ensureQueryData(profileQuery),
    ]);
    const course = (courses ?? []).find((c) => c.slug === params.slug) ?? null;
    return { course };
  },
  head: ({ loaderData, params }) => {
    const course = loaderData?.course;
    if (!course) {
      return buildPageHead({
        title: "Course — Dr. Varazdat Avetisyan",
        path: `/courses/${params.slug}`,
      });
    }
    const title = localizedField(course, "title") || course.title;
    const description = truncateDescription(localizedField(course, "description") || title);
    return buildPageHead({
      title: `${title} — Dr. Varazdat Avetisyan`,
      description,
      path: `/courses/${course.slug}`,
      ogImage: course.image_url,
    });
  },
  component: CourseDetail,
  notFoundComponent: () => <CourseNotFound />,
  errorComponent: ({ error }) => (
    <PublicLayout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl">Failed to load course</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
      </div>
    </PublicLayout>
  ),
});

function CourseNotFound() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Course not found</h1>
        <Link to="/courses" className="mt-4 inline-block text-primary">Back to Courses</Link>
      </div>
    </PublicLayout>
  );
}

function CourseDetail() {
  const { slug } = Route.useParams();
  const { data: courses } = useSuspenseQuery(coursesQuery);
  const { data: profile } = useSuspenseQuery(profileQuery);
  const loc = useLocalized();
  const t = useT();
  const course = (courses ?? []).find((c) => c.slug === slug);
  if (!course) throw notFound();

  const title = loc(course, "title");
  const description = loc(course, "description");
  const level = loc(course, "level");
  const duration = loc(course, "duration");
  const instructorName = profile ? loc(profile, "name") : "";
  const instructorTitle = profile ? loc(profile, "title") : "";
  const mailto = `mailto:?subject=${encodeURIComponent(`Enrollment inquiry: ${title}`)}`;

  return (
    <PublicLayout>
      <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <Link to="/courses" className="text-sm text-primary">← Back to Courses</Link>
        <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-primary">
          {level && <span>{level}</span>}
          {duration && <><span>·</span><span>{duration}</span></>}
        </div>
        {course.image_url && (
          <img src={course.image_url} alt={title} className="mt-8 aspect-video w-full rounded-2xl border border-border object-cover" />
        )}
        {description && (
          <div className="prose prose-invert mt-8 max-w-none whitespace-pre-line text-foreground">
            {description}
          </div>
        )}

        {course.topics && course.topics.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold">{t("courses.topics")}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {course.topics.map((tp) => (
                <span key={tp} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                  {tp}
                </span>
              ))}
            </div>
          </section>
        )}

        {course.learning_outcomes && course.learning_outcomes.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold">{t("courses.outcomes")}</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
              {course.learning_outcomes.map((o) => <li key={o}>{o}</li>)}
            </ul>
          </section>
        )}

        {course.prerequisites && course.prerequisites.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold">{t("courses.prerequisites")}</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
              {course.prerequisites.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </section>
        )}

        {profile && (
          <section className="mt-10 glass rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">{t("courses.instructor")}</h2>
            <div className="mt-4 flex items-center gap-4">
              {profile.photo_url && (
                <img src={profile.photo_url} alt={instructorName} className="size-14 rounded-full object-cover" />
              )}
              <div>
                <div className="font-medium">{instructorName}</div>
                <div className="text-sm text-muted-foreground">{instructorTitle}</div>
              </div>
            </div>
          </section>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          {course.link_url && (
            <a href={course.link_url} target="_blank" rel="noreferrer" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              {t("courses.enroll")}
            </a>
          )}
          <a href={mailto} className="rounded-md border border-border px-4 py-2 text-sm">
            {t("courses.contact")}
          </a>
        </div>
      </article>
    </PublicLayout>
  );
}
