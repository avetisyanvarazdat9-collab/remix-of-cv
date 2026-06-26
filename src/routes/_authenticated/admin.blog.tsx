import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";

export const Route = createFileRoute("/_authenticated/admin/blog")({
  component: () => (
    <CrudPage
      title="Blog posts"
      description="Write articles in Markdown. Translatable fields show HY / EN / RU tabs."
      table="blog_posts"
      orderBy={{ column: "published_at", ascending: false }}
      displayColumns={["title", "slug", "is_published", "published_at"]}
      fields={[
        { name: "title", label: "Title", type: "i18n", required: true },
        { name: "slug", label: "Slug", type: "text", required: true },
        { name: "excerpt", label: "Excerpt", type: "i18n" },
        { name: "content", label: "Content (Markdown)", type: "i18n-textarea" },
        { name: "cover_image_url", label: "Cover image", type: "image" },
        { name: "tags", label: "Tags (comma separated)", type: "tags" },
        { name: "published_at", label: "Published at (YYYY-MM-DD)", type: "date" },
        { name: "is_published", label: "Published", type: "boolean" },
      ]}
    />
  ),
});
