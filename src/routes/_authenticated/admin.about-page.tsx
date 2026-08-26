import { createFileRoute } from "@tanstack/react-router";
import { PageContentEditor, type PageContentEditorSection } from "@/components/admin/PageContentEditor";

export const Route = createFileRoute("/_authenticated/admin/about-page")({
  head: () => ({ meta: [{ title: "About Page Text Admin" }] }),
  component: AboutPageTextAdmin,
});

const ABOUT_PAGE_CONTENT_SECTIONS: PageContentEditorSection[] = [
  {
    heading: "SEO",
    keys: [
      { key: "seo.title", label: "Document title" },
      { key: "seo.description", label: "Description" },
    ],
  },
  {
    heading: "Buttons",
    keys: [{ key: "cta.download_cv", label: "Download CV button" }],
  },
  {
    heading: "Section Headings",
    keys: [
      { key: "sections.certifications.heading", label: "Certifications heading" },
      { key: "sections.professional_experience.heading", label: "Professional Experience heading" },
      { key: "sections.professional_development.heading", label: "Professional Development heading" },
      { key: "sections.professional_development.lead", label: "Professional Development lead" },
    ],
  },
];

function AboutPageTextAdmin() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold">About page text</h1>
      <p className="mt-1 text-muted-foreground">
        Edit About page chrome (SEO, buttons, section headings) in Armenian, English and Russian. Profile, skills, and education content are managed separately under About.
      </p>
      <PageContentEditor page="about" sections={ABOUT_PAGE_CONTENT_SECTIONS} />
    </div>
  );
}
