import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";

export const Route = createFileRoute("/_authenticated/admin/learning-resources")({
  component: () => (
    <CrudPage
      title="Learning Resources"
      description="Books, papers, datasets, and tools shown on the Learn page."
      table="learning_resources"
      orderBy={{ column: "display_order" }}
      displayColumns={["resource_type", "title", "author_or_source", "is_visible"]}
      fields={[
        {
          name: "resource_type",
          label: "Resource type",
          type: "select",
          options: [
            { value: "book", label: "Book" },
            { value: "paper", label: "Paper" },
            { value: "dataset", label: "Dataset" },
            { value: "tool", label: "Tool" },
          ],
        },
        { name: "title", label: "Title", type: "i18n", required: true },
        { name: "author_or_source", label: "Author / Source", type: "text" },
        { name: "url", label: "URL", type: "url" },
        { name: "description", label: "Description", type: "i18n-textarea" },
        { name: "display_order", label: "Display order", type: "number" },
        { name: "is_visible", label: "Visible", type: "boolean" },
      ]}
    />
  ),
});
