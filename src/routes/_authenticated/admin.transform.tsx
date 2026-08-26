import { createFileRoute } from "@tanstack/react-router";
import { PageContentEditor, type PageContentEditorSection } from "@/components/admin/PageContentEditor";

export const Route = createFileRoute("/_authenticated/admin/transform")({
  head: () => ({ meta: [{ title: "Transform Admin" }] }),
  component: TransformAdmin,
});

const TRANSFORM_PAGE_CONTENT_SECTIONS: PageContentEditorSection[] = [
  {
    heading: "SEO",
    keys: [
      { key: "seo.title", label: "Document title" },
      { key: "seo.description", label: "Meta description" },
      { key: "seo.keywords", label: "Meta keywords" },
    ],
  },
  {
    heading: "Hero",
    keys: [
      { key: "hero.eyebrow", label: "Eyebrow" },
      { key: "hero.heading", label: "Heading" },
      { key: "hero.subheading", label: "Subheading" },
      { key: "hero.cta_primary", label: "Primary button" },
      { key: "hero.cta_secondary", label: "Secondary button" },
    ],
  },
  {
    heading: "Services",
    keys: [
      { key: "services.eyebrow", label: "Section eyebrow" },
      { key: "services.heading", label: "Section heading" },
      { key: "services.0.title", label: "Service 1 — Title" },
      { key: "services.0.body", label: "Service 1 — Body" },
      { key: "services.1.title", label: "Service 2 — Title" },
      { key: "services.1.body", label: "Service 2 — Body" },
      { key: "services.2.title", label: "Service 3 — Title" },
      { key: "services.2.body", label: "Service 3 — Body" },
      { key: "services.3.title", label: "Service 4 — Title" },
      { key: "services.3.body", label: "Service 4 — Body" },
      { key: "services.4.title", label: "Service 5 — Title" },
      { key: "services.4.body", label: "Service 5 — Body" },
      { key: "services.5.title", label: "Service 6 — Title" },
      { key: "services.5.body", label: "Service 6 — Body" },
    ],
  },
  {
    heading: "Engagement Model",
    keys: [
      { key: "engagement.eyebrow", label: "Section eyebrow" },
      { key: "engagement.heading", label: "Section heading" },
      { key: "engagement.steps.0.title", label: "Step 1 — Title" },
      { key: "engagement.steps.0.body", label: "Step 1 — Body" },
      { key: "engagement.steps.1.title", label: "Step 2 — Title" },
      { key: "engagement.steps.1.body", label: "Step 2 — Body" },
      { key: "engagement.steps.2.title", label: "Step 3 — Title" },
      { key: "engagement.steps.2.body", label: "Step 3 — Body" },
      { key: "engagement.steps.3.title", label: "Step 4 — Title" },
      { key: "engagement.steps.3.body", label: "Step 4 — Body" },
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

function TransformAdmin() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Transform page</h1>
      <p className="mt-1 text-muted-foreground">
        Edit the Transform hub copy in Armenian, English and Russian. Visitors see the version matching their selected language.
      </p>
      <PageContentEditor page="transform" sections={TRANSFORM_PAGE_CONTENT_SECTIONS} />
    </div>
  );
}
