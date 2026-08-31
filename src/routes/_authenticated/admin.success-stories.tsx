import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";

export const Route = createFileRoute("/_authenticated/admin/success-stories")({
  component: () => (
    <CrudPage
      title="Success Stories"
      description="Alumni and learner outcomes shown on the Learn page."
      table="success_stories"
      orderBy={{ column: "display_order" }}
      displayColumns={["name", "headline", "outcome", "is_visible"]}
      fields={[
        { name: "name", label: "Name", type: "text", required: true },
        { name: "headline", label: "Headline", type: "i18n" },
        { name: "story", label: "Story", type: "i18n-textarea" },
        { name: "outcome", label: "Outcome / achievement", type: "i18n" },
        { name: "photo_url", label: "Photo", type: "image" },
        { name: "link_url", label: "Link (LinkedIn, portfolio, etc.)", type: "url" },
        { name: "display_order", label: "Display order", type: "number" },
        { name: "is_visible", label: "Visible", type: "boolean" },
      ]}
    />
  ),
});
