import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { blogQuery } from "@/lib/queries";
import { formatDate } from "@/lib/format-date";
import { useLocalized, useT } from "@/lib/i18n";
import { buildPageHead, localizedField, truncateDescription } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ context, params }) => {
    const posts = await context.queryClient.ensureQueryData(blogQuery);
    const post = (posts ?? []).find((p) => p.slug === params.slug && p.is_published) ?? null;
    return { post };
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    if (!post) {
      return buildPageHead({
        title: "Article — Dr. Varazdat Avetisyan",
        path: `/blog/${params.slug}`,
      });
    }
    const title = localizedField(post, "title") || post.title;
    const description = truncateDescription(
      localizedField(post, "excerpt") || localizedField(post, "content") || title,
    );
    return buildPageHead({
      title: `${title} — Dr. Varazdat Avetisyan`,
      description,
      path: `/blog/${post.slug}`,
      ogType: "article",
      ogImage: post.cover_image_url,
    });
  },
  component: BlogPost,
  notFoundComponent: () => <PostNotFound />,
  errorComponent: ({ error }) => <PostError message={error.message} />,
});

function PostNotFound() {
  const t = useT();
  return (
    <PublicLayout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">{t("blog.notFound")}</h1>
        <Link to="/blog" className="mt-4 inline-block text-primary">{t("blog.backList")}</Link>
      </div>
    </PublicLayout>
  );
}

function PostError({ message }: { message: string }) {
  const t = useT();
  return (
    <PublicLayout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl">{t("blog.loadError")}</h1>
        <p className="mt-2 text-muted-foreground">{message}</p>
      </div>
    </PublicLayout>
  );
}

function BlogPost() {
  const { slug } = Route.useParams();
  const { data: posts } = useSuspenseQuery(blogQuery);
  const post = (posts ?? []).find((p) => p.slug === slug && p.is_published);
  const loc = useLocalized();
  const t = useT();
  if (!post) throw notFound();
  const title = loc(post, "title");
  const content = loc(post, "content");
  return (
    <PublicLayout>
      <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <Link to="/blog" className="text-sm text-primary">{t("blog.back")}</Link>
        <p className="mt-4 text-xs text-muted-foreground">
          {post.published_at && formatDate(post.published_at)}
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
        {post.cover_image_url && (
          <img src={post.cover_image_url} alt={title} className="mt-8 w-full rounded-2xl border border-border" />
        )}
        <div className="prose prose-invert prose-headings:font-display mt-8 max-w-none">
          <ReactMarkdown>{content ?? ""}</ReactMarkdown>
        </div>
      </article>
    </PublicLayout>
  );
}
