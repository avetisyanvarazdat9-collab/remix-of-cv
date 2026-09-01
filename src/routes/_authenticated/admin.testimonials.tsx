import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";

export const Route = createFileRoute("/_authenticated/admin/testimonials")({
  component: () => (
    <CrudPage
      title="Testimonials"
      description="Quotes shown on the Home, Impact, and Learn pages."
      table="testimonials"
      orderBy={{ column: "display_order" }}
      displayColumns={["author_name", "role", "organization", "category", "is_visible"]}
      fields={[
        { name: "author_name", label: "Author name", type: "text", required: true },
        { name: "role", label: "Role", type: "text" },
        { name: "organization", label: "Organization", type: "text" },
        {
          name: "category",
          label: "Category",
          type: "select",
          options: [
            { value: "Student", label: "Student" },
            { value: "University", label: "University" },
            { value: "Corporate", label: "Corporate" },
          ],
        },
        { name: "quote", label: "Quote", type: "i18n-textarea", required: true },
        { name: "avatar_url", label: "Avatar", type: "image" },
        { name: "display_order", label: "Display order", type: "number" },
        { name: "is_visible", label: "Visible", type: "boolean" },
      ]}
    />
  ),
});
