import { createFileRoute } from "@tanstack/react-router";
import { PageContentEditor, type PageContentEditorSection } from "@/components/admin/PageContentEditor";

export const Route = createFileRoute("/_authenticated/admin/contact")({
  head: () => ({ meta: [{ title: "Contact Admin" }] }),
  component: ContactAdmin,
});

const CONTACT_PAGE_CONTENT_SECTIONS: PageContentEditorSection[] = [
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
      { key: "heading", label: "Heading" },
      { key: "lead", label: "Subheading" },
    ],
  },
  {
    heading: "Form labels",
    keys: [
      { key: "name", label: "Name field" },
      { key: "email", label: "Email field" },
      { key: "subject", label: "Subject field" },
      { key: "message", label: "Message field" },
    ],
  },
  {
    heading: "Form actions",
    keys: [
      { key: "send", label: "Send button" },
      { key: "sending", label: "Sending state" },
    ],
  },
  {
    heading: "Feedback messages",
    keys: [
      { key: "invalid", label: "Validation error" },
      { key: "success", label: "Success toast" },
      { key: "failed", label: "Failure toast prefix" },
    ],
  },
];

function ContactAdmin() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Contact page</h1>
      <p className="mt-1 text-muted-foreground">
        Edit the Contact page copy in Armenian, English and Russian. Visitors see the version matching their selected language.
      </p>
      <PageContentEditor page="contact" sections={CONTACT_PAGE_CONTENT_SECTIONS} />
    </div>
  );
}
