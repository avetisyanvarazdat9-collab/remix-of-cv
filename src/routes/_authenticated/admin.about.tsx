import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Wrench, GraduationCap, User as UserIcon } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/about")({
  head: () => ({ meta: [{ title: "About — Admin" }] }),
  component: AboutEditor,
});

type Profile = Tables<"profile">;
type Tri = { hy: string; en: string; ru: string };

const I18N_FIELDS: { name: "tagline" | "bio"; label: string; multiline: boolean }[] = [
  { name: "tagline", label: "Tagline", multiline: false },
  { name: "bio", label: "Bio (Markdown)", multiline: true },
];

const LANG_TABS: { code: "hy" | "en" | "ru"; label: string }[] = [
  { code: "hy", label: "HY · Հայերեն" },
  { code: "en", label: "EN · English" },
  { code: "ru", label: "RU · Русский" },
];

// Focused editor for the "About" narrative: bio (Markdown) and tagline.
// Structured Skills and Education live in their own pages, linked below.
function AboutEditor() {
  const [profile, setProfile] = useState<Partial<Profile> | null>(null);
  const [i18n, setI18n] = useState<Record<string, Tri>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("profile").select("*").limit(1).maybeSingle().then(({ data, error }) => {
      if (error) toast.error(error.message);
      const row = data ?? {};
      setProfile(row);
      const existing = ((row as any).i18n ?? {}) as Record<string, Partial<Tri>>;
      const bag: Record<string, Tri> = {};
      for (const f of I18N_FIELDS) {
        const plain = ((row as any)[f.name] ?? "") as string;
        bag[f.name] = {
          hy: existing[f.name]?.hy ?? plain ?? "",
          en: existing[f.name]?.en ?? plain ?? "",
          ru: existing[f.name]?.ru ?? plain ?? "",
        };
      }
      setI18n(bag);
    });
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    const { id, i18n: existingI18n, ...rest } = profile as any;
    const payload: any = { ...rest };
    for (const f of I18N_FIELDS) {
      const tri = i18n[f.name] ?? { hy: "", en: "", ru: "" };
      payload[f.name] = tri.en || tri.hy || tri.ru || null;
    }
    payload.i18n = { ...(existingI18n ?? {}), ...i18n };
    const { error } = id
      ? await supabase.from("profile").update(payload).eq("id", id)
      : await supabase.from("profile").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("About saved");
  }

  if (!profile) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">About</h1>
      <p className="mt-1 text-muted-foreground">Long-form narrative shown on the About page. Markdown supported in the bio. Each field saves in HY / EN / RU.</p>

      <form onSubmit={save} className="glass mt-6 grid gap-4 rounded-2xl p-6">
        {I18N_FIELDS.map((f) => (
          <div key={f.name}>
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">{f.label}</label>
            <I18nInput
              value={i18n[f.name] ?? { hy: "", en: "", ru: "" }}
              multiline={f.multiline}
              onChange={(v) => setI18n({ ...i18n, [f.name]: v })}
            />
          </div>
        ))}
        <div className="flex justify-end">
          <button disabled={saving} className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60">
            {saving ? "Saving…" : "Save about"}
          </button>
        </div>
      </form>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link to="/admin/profile" className="glass rounded-xl p-5 hover:border-primary/40">
          <UserIcon className="mb-2 size-5 text-primary" />
          <p className="font-display font-semibold">Profile fields</p>
          <p className="mt-1 text-xs text-muted-foreground">Name, title, location, contacts, social links</p>
        </Link>
        <Link to="/admin/skills" className="glass rounded-xl p-5 hover:border-primary/40">
          <Wrench className="mb-2 size-5 text-primary" />
          <p className="font-display font-semibold">Skills</p>
          <p className="mt-1 text-xs text-muted-foreground">Categorised technical and soft skills</p>
        </Link>
        <Link to="/admin/education" className="glass rounded-xl p-5 hover:border-primary/40">
          <GraduationCap className="mb-2 size-5 text-primary" />
          <p className="font-display font-semibold">Education</p>
          <p className="mt-1 text-xs text-muted-foreground">Degrees, certifications and training</p>
        </Link>
      </div>
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
          rows={14}
          value={value?.[active] ?? ""}
          onChange={(e) => onChange({ ...value, [active]: e.target.value })}
          className="w-full rounded-md border border-input bg-background/60 px-3 py-2 font-mono text-sm outline-none focus:border-primary"
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
