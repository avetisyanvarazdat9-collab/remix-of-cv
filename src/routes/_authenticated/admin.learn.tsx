import { createFileRoute } from "@tanstack/react-router";
import { PageContentEditor, type PageContentEditorSection } from "@/components/admin/PageContentEditor";

export const Route = createFileRoute("/_authenticated/admin/learn")({
  head: () => ({ meta: [{ title: "Learn Admin" }] }),
  component: LearnAdmin,
});

const LEARN_PAGE_CONTENT_SECTIONS: PageContentEditorSection[] = [
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
      { key: "hero.cta_primary", label: "Primary button" },
      { key: "hero.cta_secondary", label: "Secondary button" },
    ],
  },
  {
    heading: "Courses",
    keys: [
      { key: "courses.eyebrow", label: "Section eyebrow" },
      { key: "courses.heading", label: "Section heading" },
      { key: "courses.card_cta", label: "Course card CTA" },
    ],
  },
  {
    heading: "Video Library",
    keys: [
      { key: "videos.eyebrow", label: "Section eyebrow" },
      { key: "videos.heading", label: "Section heading" },
    ],
  },
  {
    heading: "Articles",
    keys: [
      { key: "articles.eyebrow", label: "Section eyebrow" },
      { key: "articles.heading", label: "Section heading" },
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

function LearnAdmin() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Learn page</h1>
      <p className="mt-1 text-muted-foreground">
        Edit the Learn hub copy in Armenian, English and Russian. Visitors see the version matching their selected language.
      </p>
      <PageContentEditor page="learn" sections={LEARN_PAGE_CONTENT_SECTIONS} />
    </div>
  );
}
