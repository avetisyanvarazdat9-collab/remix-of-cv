import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { blogQuery } from "@/lib/queries";
import { formatDate } from "@/lib/format-date";
import { useLocalized, useT } from "@/lib/i18n";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "Blog — Varazdat Avetisyan" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(blogQuery),
  component: BlogLayout,
});

function BlogLayout() {
  const matches = useMatches();
  if (matches.some((m) => m.routeId === "/blog/$slug")) return <Outlet />;
  return <BlogIndex />;
}

function BlogIndex() {
  const { data: posts } = useSuspenseQuery(blogQuery);
  const loc = useLocalized();
  const t = useT();
  const published = (posts ?? []).filter((p) => p.is_published);
  return (
    <PublicLayout>
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">{t("blog.heading")}</h1>
        <ul className="mt-10 space-y-4">
          {published.map((p) => (
            <li key={p.id}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="glass block rounded-2xl p-6 hover:border-primary/40"
              >
                <p className="text-xs text-muted-foreground">
                  {p.published_at && formatDate(p.published_at)}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold">{loc(p, "title")}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{loc(p, "excerpt")}</p>
              </Link>
            </li>
          ))}
          {published.length === 0 && <p className="text-muted-foreground">{t("blog.empty")}</p>}
        </ul>
      </section>
    </PublicLayout>
  );
}
