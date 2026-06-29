import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";

export const Route = createFileRoute("/_authenticated/admin/certifications")({
  head: () => ({ meta: [{ title: "Certifications — Admin" }] }),
  component: () => (
    <CrudPage
      title="Certifications"
      description="Professional certifications. Translatable fields show HY / EN / RU tabs."
      table="certifications"
      orderBy={{ column: "display_order" }}
      displayColumns={["name", "issuer", "issue_date", "expiry_date", "is_visible"]}
      fields={[
        { name: "name", label: "Name", type: "i18n" },
        { name: "issuer", label: "Issuer", type: "i18n" },
        { name: "issue_date", label: "Issue date", type: "text", placeholder: "YYYY-MM-DD" },
        { name: "expiry_date", label: "Expiry date", type: "text", placeholder: "YYYY-MM-DD" },
        { name: "credential_id", label: "Credential ID", type: "text" },
        { name: "credential_url", label: "Credential URL", type: "text" },
        { name: "image_url", label: "Image URL", type: "text" },
        { name: "description", label: "Description", type: "i18n-textarea" },
        { name: "display_order", label: "Display order", type: "number" },
        { name: "is_visible", label: "Visible", type: "boolean" },
      ]}
    />
  ),
});
