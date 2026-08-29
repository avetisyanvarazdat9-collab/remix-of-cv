import { createFileRoute } from "@tanstack/react-router";
import { PageContentEditor, type PageContentEditorSection } from "@/components/admin/PageContentEditor";

export const Route = createFileRoute("/_authenticated/admin/cv")({
  head: () => ({ meta: [{ title: "CV Admin" }] }),
  component: CVAdmin,
});

const CV_PAGE_CONTENT_SECTIONS: PageContentEditorSection[] = [
  {
    heading: "SEO",
    keys: [
      { key: "seo.title", label: "Document title" },
      { key: "seo.description", label: "Description" },
    ],
  },
  {
    heading: "Toolbar",
    keys: [
      { key: "toolbar.hint", label: "Hint text" },
      { key: "toolbar.back", label: "Back button" },
      { key: "toolbar.print", label: "Print button" },
    ],
  },
  {
    heading: "Section headings",
    keys: [
      { key: "sections.profile", label: "Profile" },
      { key: "sections.key_metrics", label: "Key Metrics" },
      { key: "sections.professional_experience", label: "Professional Experience" },
      { key: "sections.education", label: "Education" },
      { key: "sections.skills_expertise", label: "Skills & Expertise" },
      { key: "sections.certifications", label: "Certifications" },
      { key: "sections.courses_taught", label: "Courses Taught" },
      { key: "sections.video_courses", label: "Video Courses" },
      { key: "sections.talks_events", label: "Talks & Events" },
      { key: "sections.international_experience", label: "International Experience" },
    ],
  },
  {
    heading: "Dates",
    keys: [{ key: "dates.present", label: "Present suffix" }],
  },
];

function CVAdmin() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold">CV page</h1>
      <p className="mt-1 text-muted-foreground">
        Edit the CV page copy in Armenian, English and Russian. Visitors see the version matching their selected language.
      </p>
      <PageContentEditor page="cv" sections={CV_PAGE_CONTENT_SECTIONS} />
    </div>
  );
}
