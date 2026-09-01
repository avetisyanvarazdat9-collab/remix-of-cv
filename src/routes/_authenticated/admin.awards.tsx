import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";

export const Route = createFileRoute("/_authenticated/admin/awards")({
  component: () => (
    <CrudPage
      title="Awards"
      description="Recognitions, awards, and honors shown on the Impact page."
      table="awards"
      orderBy={{ column: "display_order" }}
      displayColumns={["title", "organization", "year", "is_visible"]}
      fields={[
        { name: "title", label: "Award title", type: "i18n", required: true },
        { name: "organization", label: "Awarding organization", type: "text" },
        { name: "year", label: "Year", type: "text" },
        { name: "description", label: "Description", type: "i18n-textarea" },
        { name: "display_order", label: "Display order", type: "number" },
        { name: "is_visible", label: "Visible", type: "boolean" },
      ]}
    />
  ),
});
