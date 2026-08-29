import { createFileRoute } from "@tanstack/react-router";
import { PageContentEditor, type PageContentEditorSection } from "@/components/admin/PageContentEditor";

export const Route = createFileRoute("/_authenticated/admin/privacy")({
  head: () => ({ meta: [{ title: "Privacy Admin" }] }),
  component: PrivacyAdmin,
});

const PRIVACY_PAGE_CONTENT_SECTIONS: PageContentEditorSection[] = [
  {
    heading: "SEO",
    keys: [
      { key: "seo.title", label: "Document title" },
      { key: "seo.description", label: "Description" },
    ],
  },
  {
    heading: "Hero",
    keys: [
      { key: "hero.heading", label: "Heading" },
      { key: "hero.last_updated_label", label: "Last updated label" },
    ],
  },
  {
    heading: "What we collect",
    keys: [
      { key: "collect.heading", label: "Section heading" },
      { key: "collect.body", label: "Body text" },
    ],
  },
  {
    heading: "Cookies & analytics",
    keys: [
      { key: "cookies.heading", label: "Section heading" },
      { key: "cookies.body", label: "Body text" },
    ],
  },
  {
    heading: "Chatbot",
    keys: [
      { key: "chatbot.heading", label: "Section heading" },
      { key: "chatbot.body", label: "Body text" },
    ],
  },
  {
    heading: "Your rights",
    keys: [
      { key: "rights.heading", label: "Section heading" },
      { key: "rights.body", label: "Body text" },
    ],
  },
];

function PrivacyAdmin() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Privacy page</h1>
      <p className="mt-1 text-muted-foreground">
        Edit the Privacy page copy in Armenian, English and Russian. Visitors see the version matching their selected language.
      </p>
      <PageContentEditor page="privacy" sections={PRIVACY_PAGE_CONTENT_SECTIONS} />
    </div>
  );
}
