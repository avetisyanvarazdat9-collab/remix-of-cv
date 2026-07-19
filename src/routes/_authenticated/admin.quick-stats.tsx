import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";

export const Route = createFileRoute("/_authenticated/admin/quick-stats")({
  head: () => ({ meta: [{ title: "Quick stats — Admin" }] }),
  component: QuickStatsEditor,
});

function QuickStatsEditor() {
  return (
    <CrudPage
      title="Quick stats"
      description="Metric badges shown across the public site. Translatable labels show HY / EN / RU tabs."
      table="statistics"
      orderBy={{ column: "display_order" }}
      displayColumns={["label", "value", "display_order", "is_visible"]}
      fields={[
        { name: "label", label: "Label", type: "i18n", required: true },
        { name: "value", label: "Value", type: "text", required: true },
        { name: "display_order", label: "Display order", type: "number" },
        { name: "is_visible", label: "Visible", type: "boolean" },
      ]}
    />
  );
}
