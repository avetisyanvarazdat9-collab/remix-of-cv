import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";

export const Route = createFileRoute("/_authenticated/admin/video-courses")({
  component: () => (
    <CrudPage
      title="Video courses"
      description="Translatable fields show HY / EN / RU tabs."
      table="video_courses"
      orderBy={{ column: "display_order" }}
      displayColumns={["title", "slug", "platform", "duration", "is_visible"]}
      fields={[
        { name: "title", label: "Title", type: "i18n", required: true },
        { name: "slug", label: "Slug", type: "text", placeholder: "auto-generated-from-title" },
        { name: "description", label: "Description", type: "i18n-textarea" },
        { name: "video_url", label: "Video URL", type: "url" },
        { name: "thumbnail_url", label: "Thumbnail URL", type: "url" },
        { name: "platform", label: "Platform (YouTube, Vimeo…)", type: "i18n" },
        { name: "duration", label: "Duration", type: "i18n" },
        { name: "display_order", label: "Display order", type: "number" },
        { name: "is_visible", label: "Visible", type: "boolean" },
      ]}
    />
  ),
});
