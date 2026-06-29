import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";

export const Route = createFileRoute("/_authenticated/admin/education")({
  component: () => (
    <CrudPage
      title="Education"
      description="Translatable fields show HY / EN / RU tabs."
      table="education"
      orderBy={{ column: "display_order" }}
      displayColumns={["institution", "degree", "field", "start_year", "end_year"]}
      fields={[
        { name: "institution", label: "Institution", type: "i18n" },
        { name: "degree", label: "Degree", type: "i18n" },
        { name: "field", label: "Field", type: "i18n" },
        { name: "start_year", label: "Start year", type: "number" },
        { name: "end_year", label: "End year", type: "number" },
        { name: "description", label: "Description", type: "i18n-textarea" },
        { name: "display_order", label: "Display order", type: "number" },
        { name: "is_visible", label: "Visible", type: "boolean" },
      ]}
    />
  ),
});
