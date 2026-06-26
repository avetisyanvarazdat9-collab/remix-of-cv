import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import type { Tables } from "@/integrations/supabase/types";
import { PreviewPanel } from "@/components/admin/PreviewPanel";

export const Route = createFileRoute("/_authenticated/admin/home")({
  head: () => ({ meta: [{ title: "Homepage — Admin" }] }),
  component: HomeContentEditor,
});

type Row = Tables<"home_content">;
type Tri = { hy: string; en: string; ru: string };

type FieldDef = { name: keyof Row; label: string; type?: "text" | "textarea" | "url" | "i18n" | "i18n-textarea" };

const SECTIONS: { title: string; hint?: string; fields: FieldDef[] }[] = [
  {
    title: "Hero",
    hint: "Top of the homepage. Name, title and bio come from the Profile page.",
    fields: [
      { name: "hero_badge", label: "Badge text", type: "i18n" },
      { name: "hero_btn1_label", label: "Button 1 — label", type: "i18n" },
      { name: "hero_btn1_url", label: "Button 1 — URL", type: "url" },
      { name: "hero_btn2_label", label: "Button 2 — label", type: "i18n" },
      { name: "hero_btn2_url", label: "Button 2 — URL", type: "url" },
      { name: "hero_btn3_label", label: "Button 3 — label", type: "i18n" },
      { name: "hero_btn3_url", label: "Button 3 — URL", type: "url" },
    ],
  },
  {
    title: "About section",
    fields: [
      { name: "about_label", label: "Eyebrow label", type: "i18n" },
      { name: "about_heading", label: "Heading", type: "i18n" },
      { name: "about_btn_label", label: "Button label", type: "i18n" },
      { name: "about_btn_url", label: "Button URL", type: "url" },
    ],
  },
  {
    title: "Featured Courses section",
    fields: [
      { name: "courses_label", label: "Eyebrow label", type: "i18n" },
      { name: "courses_heading", label: "Heading", type: "i18n" },
    ],
  },
  {
    title: "Partners section",
    fields: [{ name: "partners_heading", label: "Heading", type: "i18n" }],
  },
  {
    title: "Contact CTA",
    fields: [
      { name: "cta_heading", label: "Heading", type: "i18n" },
      { name: "cta_text", label: "Text", type: "i18n-textarea" },
      { name: "cta_btn_label", label: "Button label", type: "i18n" },
      { name: "cta_btn_url", label: "Button URL", type: "url" },
    ],
  },
];

const LANG_TABS: { code: "hy" | "en" | "ru"; label: string }[] = [
  { code: "hy", label: "HY" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

const ALL_FIELDS: FieldDef[] = SECTIONS.flatMap((s) => s.fields);

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
        const bag: Record<string, Tri> = {};
        for (const f of ALL_FIELDS) {
          if (f.type === "i18n" || f.type === "i18n-textarea") {
            const plain = ((row as any)[f.name] ?? "") as string;
            bag[f.name as string] = {
              hy: existing[f.name as string]?.hy ?? plain ?? "",
              en: existing[f.name as string]?.en ?? plain ?? "",
              ru: existing[f.name as string]?.ru ?? plain ?? "",
            };
          }
        }
        setI18n(bag);
      });
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    setSaving(true);
    const payload: any = { ...data, id: true };
    for (const f of ALL_FIELDS) {
      if (f.type === "i18n" || f.type === "i18n-textarea") {
        const tri = i18n[f.name as string] ?? { hy: "", en: "", ru: "" };
        payload[f.name] = tri.en || tri.hy || tri.ru || null;
      }
    }
    payload.i18n = i18n;
    const { error } = await supabase
      .from("home_content")
      .upsert(payload, { onConflict: "id" });
    setSaving(false);
    if (error) return toast.error(error.message);
    queryClient.invalidateQueries({ queryKey: ["home_content"] });
    toast.success("Homepage saved — live on the public site");
  }

  if (!data) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Homepage content</h1>
      <p className="mt-1 text-muted-foreground">
        Edit copy in Armenian, English and Russian. Visitors see the version matching their selected language.
      </p>

      <form onSubmit={save} className="mt-6 space-y-6">
        {SECTIONS.map((section) => (
          <div key={section.title} className="glass rounded-2xl p-6">
            <h2 className="font-display text-lg font-semibold">{section.title}</h2>
            {section.hint && <p className="mt-1 text-xs text-muted-foreground">{section.hint}</p>}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {section.fields.map((f) => {
                const colSpan = f.type === "textarea" || f.type === "i18n-textarea" ? "sm:col-span-2" : "";
                return (
                  <div key={f.name as string} className={colSpan}>
                    <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">{f.label}</label>
                    {f.type === "i18n" || f.type === "i18n-textarea" ? (
                      <I18nInput
                        value={i18n[f.name as string] ?? { hy: "", en: "", ru: "" }}
                        multiline={f.type === "i18n-textarea"}
                        onChange={(v) => setI18n({ ...i18n, [f.name as string]: v })}
                      />
                    ) : f.type === "textarea" ? (
                      <textarea
                        rows={3}
                        value={(data[f.name] as string | null) ?? ""}
                        onChange={(e) => setData({ ...data, [f.name]: e.target.value })}
                        className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder={f.type === "url" ? "/path, https://… or mailto:" : ""}
                        value={(data[f.name] as string | null) ?? ""}
                        onChange={(e) => setData({ ...data, [f.name]: e.target.value })}
                        className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {SECTIONS.map((section) => (
          <PreviewPanel
            key={`preview-${section.title}`}
            title={`${section.title} preview`}
            fields={section.fields.map((f) => ({ name: f.name as string, label: f.label, type: f.type })) as any}
            values={data as Record<string, any>}
            i18nValues={i18n}
          />
        ))}

        <div className="sticky bottom-4 flex justify-end">
          <button
            disabled={saving}
            className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-lg disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save homepage"}
          </button>
        </div>
      </form>
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
