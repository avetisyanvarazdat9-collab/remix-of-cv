import { createFileRoute } from "@tanstack/react-router";
import { PageContentEditor, type PageContentEditorSection } from "@/components/admin/PageContentEditor";

export const Route = createFileRoute("/_authenticated/admin/collaborate")({
  head: () => ({ meta: [{ title: "Collaborate Admin" }] }),
  component: CollaborateAdmin,
});

const COLLABORATE_PAGE_CONTENT_SECTIONS: PageContentEditorSection[] = [
  {
    heading: "SEO",
    keys: [
      { key: "seo.title", label: "Document title" },
      { key: "seo.description", label: "Description" },
      { key: "seo.keywords", label: "Keywords" },
    ],
  },
  {
    heading: "Hero",
    keys: [
      { key: "hero.eyebrow", label: "Eyebrow" },
      { key: "hero.heading", label: "Heading" },
      { key: "hero.subheading", label: "Subheading" },
      { key: "hero.cta", label: "Primary button" },
      { key: "hero.cta_secondary", label: "Secondary button" },
    ],
  },
  {
    heading: "Projects",
    keys: [
      { key: "projects.eyebrow", label: "Section eyebrow" },
      { key: "projects.heading", label: "Section heading" },
    ],
  },
  {
    heading: "Speaking",
    keys: [
      { key: "speaking.eyebrow", label: "Section eyebrow" },
      { key: "speaking.heading", label: "Section heading" },
    ],
  },
  {
    heading: "Partners",
    keys: [
      { key: "partners.eyebrow", label: "Section eyebrow" },
      { key: "partners.heading", label: "Section heading" },
    ],
  },
  {
    heading: "Bottom CTA",
    keys: [
      { key: "cta.heading", label: "Heading" },
      { key: "cta.body", label: "Body text" },
      { key: "cta.button", label: "Button label" },
    ],
  },
];

function CollaborateAdmin() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Collaborate page</h1>
      <p className="mt-1 text-muted-foreground">
        Edit the Collaborate hub copy in Armenian, English and Russian. Visitors see the version matching their selected language.
      </p>
      <PageContentEditor page="collaborate" sections={COLLABORATE_PAGE_CONTENT_SECTIONS} />
    </div>
  );
}
