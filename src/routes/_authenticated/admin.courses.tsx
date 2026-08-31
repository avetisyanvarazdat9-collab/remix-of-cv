import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";

export const Route = createFileRoute("/_authenticated/admin/courses")({
  component: () => (
    <CrudPage
      title="Courses"
      description="Translatable fields show HY / EN / RU tabs."
      table="courses"
      orderBy={{ column: "display_order" }}
      displayColumns={["title", "slug", "delivery_type", "status", "level", "duration", "is_visible"]}
      fields={[
        { name: "title", label: "Title", type: "i18n", required: true },
        { name: "slug", label: "Slug", type: "text", placeholder: "auto-generated-from-title" },
        { name: "description", label: "Description", type: "i18n-textarea" },
        { name: "level", label: "Level", type: "i18n" },
        { name: "duration", label: "Duration", type: "i18n" },
        {
          name: "delivery_type",
          label: "Delivery format",
          type: "select",
          options: [
            { value: "online", label: "Online" },
            { value: "offline", label: "Offline" },
          ],
        },
        {
          name: "status",
          label: "Course status",
          type: "select",
          options: [
            { value: "upcoming", label: "Upcoming" },
            { value: "ongoing", label: "Ongoing" },
            { value: "completed", label: "Completed" },
          ],
        },
        { name: "link_url", label: "Link URL", type: "url" },
        { name: "image_url", label: "Image URL", type: "url" },
        { name: "display_order", label: "Display order", type: "number" },
        { name: "is_visible", label: "Visible", type: "boolean" },
      ]}
    />
  ),
});
