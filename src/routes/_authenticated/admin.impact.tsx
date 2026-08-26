import { createFileRoute } from "@tanstack/react-router";
import { PageContentEditor, type PageContentEditorSection } from "@/components/admin/PageContentEditor";

export const Route = createFileRoute("/_authenticated/admin/impact")({
  head: () => ({ meta: [{ title: "Impact Admin" }] }),
  component: ImpactAdmin,
});

const IMPACT_PAGE_CONTENT_SECTIONS: PageContentEditorSection[] = [
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
    ],
  },
  {
    heading: "Stats",
    keys: [
      { key: "stats.eyebrow", label: "Section eyebrow" },
      { key: "stats.heading", label: "Section heading" },
    ],
  },
  {
    heading: "Testimonials",
    keys: [
      { key: "testimonials.eyebrow", label: "Section eyebrow" },
      { key: "testimonials.heading", label: "Section heading" },
    ],
  },
  {
    heading: "Recognition",
    keys: [
      { key: "talks.eyebrow", label: "Section eyebrow" },
      { key: "talks.heading", label: "Section heading" },
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

function ImpactAdmin() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Impact page</h1>
      <p className="mt-1 text-muted-foreground">
        Edit the Impact hub copy in Armenian, English and Russian. Visitors see the version matching their selected language.
      </p>
      <PageContentEditor page="impact" sections={IMPACT_PAGE_CONTENT_SECTIONS} />
    </div>
  );
}
