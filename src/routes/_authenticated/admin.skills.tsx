import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";

export const Route = createFileRoute("/_authenticated/admin/skills")({
  component: () => (
    <CrudPage
      title="Skills"
      description="Translatable fields show HY / EN / RU tabs."
      table="skills"
      orderBy={{ column: "display_order" }}
      displayColumns={["category", "name", "level", "is_visible"]}
      fields={[
        { name: "category", label: "Category", type: "i18n", required: true },
        { name: "name", label: "Name", type: "i18n", required: true },
        { name: "level", label: "Level (1-5)", type: "number" },
        { name: "display_order", label: "Display order", type: "number" },
        { name: "is_visible", label: "Visible", type: "boolean" },
      ]}
    />
  ),
});
