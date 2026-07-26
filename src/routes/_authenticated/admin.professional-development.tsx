import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";

export const Route = createFileRoute("/_authenticated/admin/professional-development")({
  head: () => ({ meta: [{ title: "Professional Development — Admin" }] }),
  component: () => (
    <CrudPage
      title="Professional Development"
      description="Trainings, workshops, conferences, and academic exchanges shown in the Professional Development section on the About page. Map coordinates are optional and also power the homepage world map and Timeline when provided."
      table="international_experience"
      orderBy={{ column: "event_date", ascending: false }}
      displayColumns={["title", "organization", "location", "category", "event_date", "is_visible"]}
      fields={[
        { name: "title", label: "Title / Name", type: "i18n", required: true },
        { name: "organization", label: "Organization / Provider", type: "text" },
        { name: "location", label: "Location (City, Country)", type: "text", placeholder: "Berlin, Germany" },
        { name: "event_date", label: "Date", type: "date" },
        { name: "description", label: "Description", type: "i18n-textarea" },
        { name: "url", label: "URL (optional link)", type: "url" },
        { name: "category", label: "Category", type: "text", placeholder: "Training / Workshop / Conference / Lecture / Exchange" },
        { name: "country_code", label: "Country code (ISO2, optional)", type: "text", placeholder: "DE" },
        { name: "lat", label: "Latitude (optional, for map)", type: "number", placeholder: "52.52" },
        { name: "lng", label: "Longitude (optional, for map)", type: "number", placeholder: "13.405" },
        { name: "display_order", label: "Display order", type: "number" },
        { name: "is_visible", label: "Visible", type: "boolean" },
      ]}
    />
  ),
});
