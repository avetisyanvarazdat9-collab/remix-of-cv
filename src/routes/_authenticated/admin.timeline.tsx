import { createFileRoute } from "@tanstack/react-router";
import { PageContentEditor, type PageContentEditorSection } from "@/components/admin/PageContentEditor";

export const Route = createFileRoute("/_authenticated/admin/timeline")({
  head: () => ({ meta: [{ title: "Timeline Admin" }] }),
  component: TimelineAdmin,
});

const TIMELINE_PAGE_CONTENT_SECTIONS: PageContentEditorSection[] = [
  {
    heading: "SEO",
    keys: [
      { key: "seo.title", label: "Document title" },
      { key: "seo.description", label: "Description" },
    ],
  },
  {
    heading: "Navigation",
    keys: [{ key: "back_to_home", label: "Back to home link" }],
  },
  {
    heading: "Hero",
    keys: [
      { key: "hero.eyebrow", label: "Eyebrow" },
      { key: "hero.heading", label: "Heading" },
      { key: "hero.subheading", label: "Subheading" },
    ],
  },
  {
    heading: "Badges",
    keys: [
      { key: "badge.global_reach", label: "Global reach fallback" },
      { key: "badge.countries_suffix", label: "Countries suffix" },
      { key: "badge.engagements_suffix", label: "Engagements suffix" },
    ],
  },
  {
    heading: "Empty state",
    keys: [{ key: "empty.no_entries", label: "No entries message" }],
  },
];

function TimelineAdmin() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Timeline page</h1>
      <p className="mt-1 text-muted-foreground">
        Edit the Timeline page copy in Armenian, English and Russian. Visitors see the version matching their selected language.
      </p>
      <PageContentEditor page="timeline" sections={TIMELINE_PAGE_CONTENT_SECTIONS} />
    </div>
  );
}
