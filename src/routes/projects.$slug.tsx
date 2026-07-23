import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { projectsQuery } from "@/lib/queries";
import { useLocalized, useT } from "@/lib/i18n";
import { buildPageHead, localizedField, truncateDescription } from "@/lib/seo";

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ context, params }) => {
    const projects = await context.queryClient.ensureQueryData(projectsQuery);
    const project = (projects ?? []).find((p) => p.slug === params.slug) ?? null;
    return { project };
  },
  head: ({ loaderData, params }) => {
    const project = loaderData?.project;
    if (!project) {
      return buildPageHead({
        title: "Project — Dr. Varazdat Avetisyan",
        path: `/projects/${params.slug}`,
      });
    }
    const title = localizedField(project, "title") || project.title;
    const description = truncateDescription(
      localizedField(project, "summary") || localizedField(project, "description") || title,
    );
    return buildPageHead({
      title: `${title} — Dr. Varazdat Avetisyan`,
      description,
      path: `/projects/${project.slug}`,
      ogImage: project.image_url,
    });
  },
  component: ProjectDetail,
  notFoundComponent: () => <ProjectNotFound />,
  errorComponent: ({ error }) => <ProjectError message={error.message} />,
});

function ProjectNotFound() {
  const t = useT();
  return (
    <PublicLayout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">{t("projects.notFound")}</h1>
        <Link to="/projects" className="mt-4 inline-block text-primary">{t("projects.backList")}</Link>
      </div>
    </PublicLayout>
  );
}

function ProjectError({ message }: { message: string }) {
  const t = useT();
  return (
    <PublicLayout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl">{t("projects.loadError")}</h1>
        <p className="mt-2 text-muted-foreground">{message}</p>
      </div>
    </PublicLayout>
  );
}

function ProjectDetail() {
  const { slug } = Route.useParams();
  const { data: projects } = useSuspenseQuery(projectsQuery);
  const project = (projects ?? []).find((p) => p.slug === slug);
  const loc = useLocalized();
  const t = useT();
  if (!project) throw notFound();
  const title = loc(project, "title");
  const summary = loc(project, "summary");
  const description = loc(project, "description");
  return (
    <PublicLayout>
      <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <Link to="/projects" className="text-sm text-primary">{t("projects.back")}</Link>
        <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{title}</h1>
        {summary && <p className="mt-3 text-lg text-muted-foreground">{summary}</p>}
        {project.image_url && (
          <img src={project.image_url} alt={title} className="mt-8 w-full rounded-2xl border border-border" />
        )}
        {description && (
          <div className="prose prose-invert mt-8 max-w-none whitespace-pre-line text-foreground">
            {description}
          </div>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          {project.link_url && (
            <a href={project.link_url} target="_blank" rel="noreferrer" className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
              {t("projects.visit")}
            </a>
          )}
          {project.repo_url && (
            <a href={project.repo_url} target="_blank" rel="noreferrer" className="rounded-md border border-border px-4 py-2 text-sm">
              {t("projects.source")}
            </a>
          )}
        </div>
      </article>
    </PublicLayout>
  );
}
