import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import type { Tables } from "@/integrations/supabase/types";
import { PreviewPanel } from "@/components/admin/PreviewPanel";
import { PageContentEditor, type PageContentEditorSection } from "@/components/admin/PageContentEditor";

export const Route = createFileRoute("/_authenticated/admin/home")({
  head: () => ({ meta: [{ title: "Homepage Admin" }] }),
  component: HomeContentEditor,
});

type Row = Tables<"home_content">;
type Tri = { hy: string; en: string; ru: string };

const HERO_SECTION = {
  title: "Hero",
  hint: "Badge below the name. Main hero copy (title, subtitle, CTAs) is edited in Site text below. Name and bio come from Profile.",
  fields: [{ name: "hero_badge" as const, label: "Badge text", type: "i18n" as const }],
};

const HOME_PAGE_CONTENT_SECTIONS: PageContentEditorSection[] = [
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
      { key: "hero.title", label: "Main heading" },
      { key: "hero.subtitle", label: "Subtitle" },
      { key: "hero.lead", label: "Lead paragraph" },
      { key: "hero.cta1", label: "Primary button (Explore Courses)" },
      { key: "hero.cta2", label: "Secondary button (Request a Consultation)" },
      { key: "hero.cta3", label: "Tertiary button (Contact Me)" },
      { key: "hero.image_alt", label: "Portrait image alt text" },
    ],
  },
  {
    heading: "About preview",
    keys: [
      { key: "about.eyebrow", label: "Section eyebrow" },
      { key: "about.heading", label: "Section heading" },
      { key: "about.cta", label: "Learn more button" },
      { key: "about.brief.eyebrow", label: "Sidebar eyebrow (In brief)" },
    ],
  },
  {
    heading: "Stats",
    keys: [
      { key: "stats.eyebrow", label: "Section eyebrow" },
      { key: "stats.heading", label: "Section heading" },
      { key: "stats.fallback.0.value", label: "Fallback stat 1 — value" },
      { key: "stats.fallback.0.label", label: "Fallback stat 1 — label" },
      { key: "stats.fallback.1.value", label: "Fallback stat 2 — value" },
      { key: "stats.fallback.1.label", label: "Fallback stat 2 — label" },
      { key: "stats.fallback.2.value", label: "Fallback stat 3 — value" },
      { key: "stats.fallback.2.label", label: "Fallback stat 3 — label" },
      { key: "stats.fallback.3.value", label: "Fallback stat 4 — value" },
      { key: "stats.fallback.3.label", label: "Fallback stat 4 — label" },
    ],
  },
  {
    heading: "Areas of expertise",
    keys: [
      { key: "expertise.eyebrow", label: "Eyebrow" },
      { key: "expertise.heading", label: "Heading" },
      { key: "expertise.0", label: "Artificial Intelligence" },
      { key: "expertise.1", label: "Generative AI" },
      { key: "expertise.2", label: "Data Science" },
      { key: "expertise.3", label: "Machine Learning" },
      { key: "expertise.4", label: "Deep Learning" },
      { key: "expertise.5", label: "Prompt Engineering" },
      { key: "expertise.6", label: "AI Agents" },
      { key: "expertise.7", label: "Computer Science Education" },
      { key: "expertise.8", label: "Educational Innovation" },
      { key: "expertise.9", label: "Digital Transformation" },
    ],
  },
  {
    heading: "Journeys",
    keys: [
      { key: "journeys.section.eyebrow", label: "Section — Eyebrow" },
      { key: "journeys.section.heading", label: "Section — Heading" },
      { key: "journeys.learn.eyebrow", label: "Learn — Eyebrow" },
      { key: "journeys.learn.title", label: "Learn — heading" },
      { key: "journeys.learn.body", label: "Learn — body" },
      { key: "journeys.learn.cta", label: "Learn — button" },
      { key: "journeys.transform.eyebrow", label: "Transform — Eyebrow" },
      { key: "journeys.transform.title", label: "Transform — heading" },
      { key: "journeys.transform.body", label: "Transform — body" },
      { key: "journeys.transform.cta", label: "Transform — button" },
      { key: "journeys.collaborate.eyebrow", label: "Collaborate — Eyebrow" },
      { key: "journeys.collaborate.title", label: "Collaborate — heading" },
      { key: "journeys.collaborate.body", label: "Collaborate — body" },
      { key: "journeys.collaborate.cta", label: "Collaborate — button" },
      { key: "journeys.impact.eyebrow", label: "Impact — Eyebrow" },
      { key: "journeys.impact.title", label: "Impact — heading" },
      { key: "journeys.impact.body", label: "Impact — body" },
      { key: "journeys.impact.cta", label: "Impact — button" },
    ],
  },
  {
    heading: "Partners",
    keys: [
      { key: "partners.eyebrow", label: "Section eyebrow" },
      { key: "partners.heading", label: "Section heading" },
      { key: "partners.lead", label: "Section lead paragraph" },
      { key: "partners.category_fallback", label: "Category badge fallback" },
    ],
  },
  {
    heading: "Featured Courses",
    keys: [
      { key: "featured_courses.eyebrow", label: "Section eyebrow" },
      { key: "featured_courses.heading", label: "Section heading" },
      { key: "featured_courses.view_all", label: "View all link" },
      { key: "featured_courses.card_cta", label: "Course card CTA" },
    ],
  },
  {
    heading: "Four Dimensions",
    keys: [
      { key: "four_dimensions.eyebrow", label: "Section eyebrow" },
      { key: "four_dimensions.heading", label: "Section heading" },
      { key: "four_dimensions.lead", label: "Section lead paragraph" },
      { key: "four_dimensions.cta_fallback", label: "Pillar CTA fallback" },
      { key: "four_dimensions.timeline_cta_fallback", label: "Timeline button fallback" },
    ],
  },
];

const LANG_TABS: { code: "hy" | "en" | "ru"; label: string }[] = [
  { code: "hy", label: "HY" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

function HomeContentEditor() {
  const [data, setData] = useState<Partial<Row> | null>(null);
  const [i18n, setI18n] = useState<Record<string, Tri>>({});
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    supabase
      .from("home_content")
      .select("*")
      .eq("id", true)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) toast.error(error.message);
        const row = data ?? ({ id: true } as Partial<Row>);
        setData(row);
        const existing = ((row as any).i18n ?? {}) as Record<string, Partial<Tri>>;
        const plain = ((row as any).hero_badge ?? "") as string;
        setI18n({
          hero_badge: {
            hy: existing.hero_badge?.hy ?? plain ?? "",
            en: existing.hero_badge?.en ?? plain ?? "",
            ru: existing.hero_badge?.ru ?? plain ?? "",
          },
        });
      });
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    setSaving(true);
    const tri = i18n.hero_badge ?? { hy: "", en: "", ru: "" };
    const payload: any = {
      ...data,
      id: true,
      hero_badge: tri.en || tri.hy || tri.ru || null,
      i18n: { ...((data as any).i18n ?? {}), hero_badge: tri },
    };
    const { error } = await supabase.from("home_content").upsert(payload, { onConflict: "id" });
    setSaving(false);
    if (error) return toast.error(error.message);
    queryClient.invalidateQueries({ queryKey: ["home_content"] });
    toast.success("Badge saved and live on the public site");
  }

  if (!data) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Homepage content</h1>
      <p className="mt-1 text-muted-foreground">
        Edit homepage copy in Armenian, English and Russian. Visitors see the version matching their selected language.
      </p>

      <form onSubmit={save} className="mt-6 space-y-6">
        <div className="glass rounded-2xl p-6">
          <h2 className="font-display text-lg font-semibold">{HERO_SECTION.title}</h2>
          <p className="mt-1 text-xs text-muted-foreground">{HERO_SECTION.hint}</p>
          <div className="mt-4">
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
              Badge text
            </label>
            <I18nInput
              value={i18n.hero_badge ?? { hy: "", en: "", ru: "" }}
              onChange={(v) => setI18n({ hero_badge: v })}
            />
          </div>
        </div>

        <PreviewPanel
          title="Hero badge preview"
          fields={[{ name: "hero_badge", label: "Badge text", type: "i18n" }]}
          values={data as Record<string, any>}
          i18nValues={i18n}
        />

        <div className="sticky bottom-4 flex justify-end">
          <button
            disabled={saving}
            className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-lg disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save badge"}
          </button>
        </div>
      </form>

      <PageContentEditor page="home" sections={HOME_PAGE_CONTENT_SECTIONS} />
    </div>
  );
}

function I18nInput({ value, onChange, multiline }: { value: Tri; onChange: (v: Tri) => void; multiline?: boolean }) {
  const [active, setActive] = useState<"hy" | "en" | "ru">("en");
  return (
    <div className="rounded-md border border-border bg-background/40 p-2">
      <div className="mb-2 flex gap-1">
        {LANG_TABS.map((t) => {
          const filled = (value?.[t.code] ?? "").trim().length > 0;
          return (
            <button
              type="button"
              key={t.code}
              onClick={() => setActive(t.code)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                active === t.code ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              {t.label}{!filled && <span className="ml-1 text-destructive">•</span>}
            </button>
          );
        })}
      </div>
      {multiline ? (
        <textarea
          rows={3}
          value={value?.[active] ?? ""}
          onChange={(e) => onChange({ ...value, [active]: e.target.value })}
          className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
        />
      ) : (
        <input
          type="text"
          value={value?.[active] ?? ""}
          onChange={(e) => onChange({ ...value, [active]: e.target.value })}
          className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
        />
      )}
    </div>
  );
}
