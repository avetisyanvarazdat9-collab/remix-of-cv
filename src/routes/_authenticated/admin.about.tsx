import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Wrench, GraduationCap, User as UserIcon } from "lucide-react";
import { saveAdminProfile } from "@/lib/profile-save";
import { profileQuery } from "@/lib/queries";
import {
  hydrateProfileI18nFields,
  mergeProfileI18nPayload,
  type ProfileI18nTri,
} from "@/lib/profile-i18n";

export const Route = createFileRoute("/_authenticated/admin/about")({
  head: () => ({ meta: [{ title: "About — Admin" }] }),
  component: AboutEditor,
});

type Profile = Tables<"profile">;

const I18N_FIELD_NAMES = ["tagline", "bio"] as const;
const I18N_FIELDS: { name: (typeof I18N_FIELD_NAMES)[number]; label: string; multiline: boolean }[] = [
  { name: "tagline", label: "Tagline", multiline: false },
  { name: "bio", label: "Bio (Markdown)", multiline: true },
];

const LANG_TABS: { code: "hy" | "en" | "ru"; label: string }[] = [
  { code: "hy", label: "HY · Հայերեն" },
  { code: "en", label: "EN · English" },
  { code: "ru", label: "RU · Русский" },
];

const REQUIRED_PROFILE_DEFAULTS = {
  name: "Dr. Varazdat Avetisyan",
  title: "AI/ML Researcher, Lecturer & Entrepreneur",
};

// Focused editor for the "About" narrative: bio (Markdown) and tagline.
// Structured Skills and Education live in their own pages, linked below.
function AboutEditor() {
  const queryClient = useQueryClient();
  const [profile, setProfile] = useState<Partial<Profile> | null>(null);
  const [i18n, setI18n] = useState<Record<string, ProfileI18nTri>>({});
  const [saving, setSaving] = useState(false);
  const i18nRef = useRef(i18n);
  i18nRef.current = i18n;

  useEffect(() => {
    let cancelled = false;

    supabase
      .from("profile")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) toast.error(error.message);
        const row = data ?? {};
        setProfile(row);
        setI18n(hydrateProfileI18nFields(row, I18N_FIELD_NAMES));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);

    const currentI18n = i18nRef.current;
    const { id, i18n: existingI18n, ...rest } = profile as Profile & { i18n?: unknown };
    const payload: Record<string, unknown> = { ...rest };

    for (const f of I18N_FIELDS) {
      const tri = currentI18n[f.name] ?? { hy: "", en: "", ru: "" };
      payload[f.name] = tri.en || tri.hy || tri.ru || null;
    }

    payload.name = payload.name || REQUIRED_PROFILE_DEFAULTS.name;
    payload.title = payload.title || REQUIRED_PROFILE_DEFAULTS.title;
    payload.i18n = mergeProfileI18nPayload(existingI18n, currentI18n);

    const { data: savedProfile, error } = await saveAdminProfile(id, payload as Partial<Profile>);
    setSaving(false);
    if (error) return toast.error(error.message);

    const nextI18n = mergeProfileI18nPayload(existingI18n, currentI18n);
    setI18n(nextI18n);

    if (savedProfile) {
      setProfile(savedProfile);
      queryClient.setQueryData(profileQuery.queryKey, savedProfile);
    } else {
      queryClient.setQueryData(profileQuery.queryKey, (prev: Profile | null | undefined) =>
        prev ? { ...prev, ...payload, i18n: nextI18n } as Profile : prev,
      );
    }

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
              onChange={(v) => setI18n((prev) => ({ ...prev, [f.name]: v }))}
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

function I18nInput({ value, onChange, multiline }: { value: ProfileI18nTri; onChange: (v: ProfileI18nTri) => void; multiline?: boolean }) {
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
