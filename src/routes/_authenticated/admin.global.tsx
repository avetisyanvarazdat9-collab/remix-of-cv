import { createFileRoute } from "@tanstack/react-router";
import { PageContentEditor, type PageContentEditorSection } from "@/components/admin/PageContentEditor";

export const Route = createFileRoute("/_authenticated/admin/global")({
  head: () => ({ meta: [{ title: "Global Shell Admin" }] }),
  component: GlobalShellAdmin,
});

const GLOBAL_PAGE_CONTENT_SECTIONS: PageContentEditorSection[] = [
  {
    heading: "404 Page",
    keys: [
      { key: "not_found.heading", label: "Heading" },
      { key: "not_found.description", label: "Description" },
      { key: "not_found.cta", label: "Button label" },
    ],
  },
  {
    heading: "Error Page",
    keys: [
      { key: "error.heading", label: "Heading" },
      { key: "error.description", label: "Description" },
      { key: "error.retry", label: "Retry button" },
      { key: "error.go_home", label: "Go home button" },
    ],
  },
  {
    heading: "Footer",
    keys: [
      { key: "footer.rights_reserved", label: "Rights reserved text" },
      { key: "footer.privacy_link", label: "Privacy Policy link label" },
    ],
  },
];

function GlobalShellAdmin() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Global shell</h1>
      <p className="mt-1 text-muted-foreground">
        Edit shared site chrome — 404 page, error boundary, and footer — in Armenian, English and Russian.
      </p>
      <PageContentEditor page="global" sections={GLOBAL_PAGE_CONTENT_SECTIONS} />
    </div>
  );
}
