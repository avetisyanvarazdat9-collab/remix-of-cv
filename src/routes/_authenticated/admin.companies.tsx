import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";

export const Route = createFileRoute("/_authenticated/admin/companies")({
  component: () => (
    <CrudPage
      title="Companies"
      description="Translatable fields show HY / EN / RU tabs."
      table="companies"
      orderBy={{ column: "display_order" }}
      displayColumns={["name", "role", "start_year", "end_year", "is_current"]}
      fields={[
        { name: "name", label: "Name (brand)", type: "text", required: true },
        { name: "role", label: "Role", type: "i18n" },
        { name: "description", label: "Description", type: "i18n-textarea" },
        { name: "logo_url", label: "Logo URL", type: "url" },
        { name: "website_url", label: "Website URL", type: "url" },
        { name: "start_year", label: "Start year", type: "number" },
        { name: "end_year", label: "End year", type: "number" },
        { name: "is_current", label: "Current", type: "boolean" },
        { name: "display_order", label: "Display order", type: "number" },
        { name: "is_visible", label: "Visible", type: "boolean" },
      ]}
    />
  ),
});
