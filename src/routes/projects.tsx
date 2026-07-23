import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { projectsQuery } from "@/lib/queries";
import { useLocalized, useT } from "@/lib/i18n";
import { buildPageHead } from "@/lib/seo";

export const Route = createFileRoute("/projects")({
  head: () =>
    buildPageHead({
      title: "Projects — Dr. Varazdat Avetisyan",
      description:
        "Research and engineering projects in artificial intelligence, machine learning, and data science by Dr. Varazdat Avetisyan.",
      path: "/projects",
    }),
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
  component: ProjectsLayout,
});

function ProjectsLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/projects/$slug");
  if (isChild) return <Outlet />;
  return <ProjectsIndex />;
}

function ProjectsIndex() {
  const { data: projects } = useSuspenseQuery(projectsQuery);
  const loc = useLocalized();
  const t = useT();
  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">{t("projects.heading")}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{t("projects.lead")}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {(projects ?? []).map((p) => {
            const title = loc(p, "title");
            return (
              <Link
                key={p.id}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="glass rounded-2xl p-6 hover:border-primary/40"
              >
                {p.image_url && (
                  <img src={p.image_url} alt={title} className="mb-4 aspect-video w-full rounded-lg object-cover" />
                )}
                <h3 className="font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{loc(p, "summary")}</p>
                {p.tech_stack && p.tech_stack.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech_stack.map((t) => (
                      <span key={t} className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </section>
    </PublicLayout>
  );
}
