import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Wrench, GraduationCap, User as UserIcon, Globe2 } from "lucide-react";
import { saveAdminProfile } from "@/lib/profile-save";
import { profileQuery } from "@/lib/queries";
import { mergeProfileI18nPayload, type ProfileI18nTri } from "@/lib/profile-i18n";

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

const EMPTY_TRI: ProfileI18nTri = { hy: "", en: "", ru: "" };

/** Load editor state per language without cross-filling missing translations from the plain column. */
function hydrateAboutI18nFields(row: Partial<Profile>): Record<string, ProfileI18nTri> {
  const rawI18n = (row as { i18n?: unknown }).i18n;
  let existing: Record<string, Partial<ProfileI18nTri>> = {};
  if (rawI18n && typeof rawI18n === "object" && !Array.isArray(rawI18n)) {
    existing = rawI18n as Record<string, Partial<ProfileI18nTri>>;
  } else if (typeof rawI18n === "string") {
    try {
      const parsed = JSON.parse(rawI18n) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        existing = parsed as Record<string, Partial<ProfileI18nTri>>;
      }
    } catch {
      /* ignore malformed i18n JSON */
    }
  }

  const bag: Record<string, ProfileI18nTri> = {};
  for (const name of I18N_FIELD_NAMES) {
    const plain = String((row as Record<string, unknown>)[name] ?? "");
    const tri = existing[name];
    let hy = tri?.hy ?? "";
    let en = tri?.en ?? "";
    let ru = tri?.ru ?? "";
    // Legacy rows: plain column only, no per-language i18n yet.
    if (!hy && !en && !ru && plain) {
      en = plain;
    }
    bag[name] = { hy, en, ru };
  }
  return bag;
}

function normalizeAboutI18n(next: Record<string, ProfileI18nTri>): Record<string, ProfileI18nTri> {
  const bag: Record<string, ProfileI18nTri> = {};
  for (const name of I18N_FIELD_NAMES) {
    const tri = next[name] ?? EMPTY_TRI;
    bag[name] = {
      hy: tri.hy ?? "",
      en: tri.en ?? "",
      ru: tri.ru ?? "",
    };
  }
  return bag;
}

// Focused editor for the "About" narrative: bio (Markdown) and tagline.
// Structured Skills and Education live in their own pages, linked below.
function AboutEditor() {
  const queryClient = useQueryClient();
  const [profile, setProfile] = useState<Partial<Profile> | null>(null);
  const [i18n, setI18n] = useState<Record<string, ProfileI18nTri>>({});
  const [activeLang, setActiveLang] = useState<"hy" | "en" | "ru">("en");
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
        setI18n(hydrateAboutI18nFields(row));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);

    const currentI18n = normalizeAboutI18n(i18nRef.current);
    const { id, i18n: existingI18n, ...rest } = profile as Profile & { i18n?: unknown };
    const payload: Record<string, unknown> = { ...rest };

    for (const f of I18N_FIELDS) {
      const tri = currentI18n[f.name] ?? EMPTY_TRI;
      payload[f.name] = tri.en || tri.hy || tri.ru || null;
    }

    payload.name = payload.name || REQUIRED_PROFILE_DEFAULTS.name;
    payload.title = payload.title || REQUIRED_PROFILE_DEFAULTS.title;
    payload.i18n = mergeProfileI18nPayload(existingI18n, currentI18n);

    const { data: savedProfile, error } = await saveAdminProfile(id, payload as Partial<Profile>);
    setSaving(false);
    if (error) return toast.error(error.message);

    const nextI18n = normalizeAboutI18n(
      mergeProfileI18nPayload(existingI18n, currentI18n) as Record<string, ProfileI18nTri>,
    );

    if (savedProfile) {
      setProfile(savedProfile);
      setI18n(hydrateAboutI18nFields(savedProfile));
      queryClient.setQueryData(profileQuery.queryKey, savedProfile);
    } else {
      const mergedProfile = { ...(profile as Profile), ...payload, i18n: nextI18n } as Profile;
      setProfile(mergedProfile);
      setI18n(hydrateAboutI18nFields(mergedProfile));
      queryClient.setQueryData(profileQuery.queryKey, mergedProfile);
    }

    toast.success("About saved");
  }

  if (!profile) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">About</h1>
      <p className="mt-1 text-muted-foreground">
        Edit the About page narrative (tagline and bio). Skills, education, and professional development are managed separately — use the links below.
      </p>

      <form onSubmit={save} className="mt-6 space-y-6">
        <div className="flex flex-wrap gap-1">
          {LANG_TABS.map((t) => {
            const filled = I18N_FIELD_NAMES.some(
              (name) => (i18n[name]?.[t.code] ?? "").trim().length > 0,
            );
            return (
              <button
                type="button"
                key={t.code}
                onClick={() => setActiveLang(t.code)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                  activeLang === t.code
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:bg-accent"
                }`}
              >
                {t.label}
                {!filled && <span className="ml-1 text-destructive">•</span>}
              </button>
            );
          })}
        </div>

        {I18N_FIELDS.map((f) => {
          const tri = i18n[f.name] ?? EMPTY_TRI;
          return (
            <div key={f.name}>
              <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
                {f.label}
              </label>
              {f.multiline ? (
                <textarea
                  rows={14}
                  value={tri[activeLang]}
                  onChange={(e) =>
                    setI18n((prev) => ({
                      ...prev,
                      [f.name]: { ...(prev[f.name] ?? EMPTY_TRI), [activeLang]: e.target.value },
                    }))
                  }
                  className="w-full rounded-md border border-input bg-background/60 px-3 py-2 font-mono text-sm outline-none focus:border-primary"
                />
              ) : (
                <input
                  type="text"
                  value={tri[activeLang]}
                  onChange={(e) =>
                    setI18n((prev) => ({
                      ...prev,
                      [f.name]: { ...(prev[f.name] ?? EMPTY_TRI), [activeLang]: e.target.value },
                    }))
                  }
                  className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
                />
              )}
            </div>
          );
        })}

        <div className="flex justify-end">
          <button disabled={saving} className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60">
            {saving ? "Saving…" : "Save about"}
          </button>
        </div>
      </form>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link to="/admin/profile" className="glass rounded-xl p-5 hover:border-primary/40">
          <UserIcon className="mb-2 size-5 text-primary" />
          <p className="font-display font-semibold">Profile</p>
          <p className="mt-1 text-xs text-muted-foreground">Name, title, contacts — social links are under Social Links</p>
        </Link>
        <Link to="/admin/skills" className="glass rounded-xl p-5 hover:border-primary/40">
          <Wrench className="mb-2 size-5 text-primary" />
          <p className="font-display font-semibold">Skills</p>
          <p className="mt-1 text-xs text-muted-foreground">Shown in the Skills section on the About page</p>
        </Link>
        <Link to="/admin/education" className="glass rounded-xl p-5 hover:border-primary/40">
          <GraduationCap className="mb-2 size-5 text-primary" />
          <p className="font-display font-semibold">Education</p>
          <p className="mt-1 text-xs text-muted-foreground">Shown in the Education section on the About page</p>
        </Link>
        <Link to="/admin/professional-development" className="glass rounded-xl p-5 hover:border-primary/40">
          <Globe2 className="mb-2 size-5 text-primary" />
          <p className="font-display font-semibold">Professional Development</p>
          <p className="mt-1 text-xs text-muted-foreground">Trainings, workshops, and exchanges on the About page</p>
        </Link>
      </div>
    </div>
  );
}
