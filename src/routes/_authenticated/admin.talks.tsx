import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";

export const Route = createFileRoute("/_authenticated/admin/talks")({
  component: () => (
    <CrudPage
      title="Talks & events"
      description="Translatable fields show HY / EN / RU tabs."
      table="talks"
      orderBy={{ column: "event_date", ascending: false }}
      displayColumns={["title", "event_name", "event_date", "location"]}
      fields={[
        { name: "title", label: "Title", type: "i18n", required: true },
        { name: "event_name", label: "Event name", type: "i18n" },
        { name: "event_date", label: "Date", type: "date" },
        { name: "location", label: "Location", type: "i18n" },
        { name: "description", label: "Description", type: "i18n-textarea" },
        { name: "slides_url", label: "Slides URL", type: "url" },
        { name: "video_url", label: "Video URL", type: "url" },
        { name: "display_order", label: "Display order", type: "number" },
        { name: "is_visible", label: "Visible", type: "boolean" },
      ]}
    />
  ),
});
