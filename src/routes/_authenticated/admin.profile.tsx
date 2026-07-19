import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { PreviewPanel } from "@/components/admin/PreviewPanel";

export const Route = createFileRoute("/_authenticated/admin/profile")({
  component: ProfileEditor,
});

type Profile = Tables<"profile">;
type Tri = { hy: string; en: string; ru: string };

type FieldDef = {
  name: keyof Profile;
  label: string;
  type?: "text" | "textarea" | "url" | "i18n" | "i18n-textarea" | "image";
};

const fields: FieldDef[] = [
  { name: "name", label: "Name", type: "i18n" },
  { name: "title", label: "Title", type: "i18n" },
  { name: "tagline", label: "Tagline", type: "i18n-textarea" },
  { name: "location", label: "Location", type: "i18n" },
  { name: "bio", label: "Bio", type: "i18n-textarea" },
  { name: "email", label: "Email" },
  { name: "phone", label: "Phone" },
  { name: "photo_url", label: "Profile Photo", type: "image" },
  { name: "cv_url", label: "CV URL", type: "url" },
  { name: "github_url", label: "GitHub URL", type: "url" },
  { name: "linkedin_url", label: "LinkedIn URL", type: "url" },
  { name: "twitter_url", label: "Twitter / X URL", type: "url" },
  { name: "website_url", label: "Website URL", type: "url" },
];

const LANG_TABS: { code: "hy" | "en" | "ru"; label: string }[] = [
  { code: "hy", label: "HY · Հայերեն" },
  { code: "en", label: "EN · English" },
  { code: "ru", label: "RU · Русский" },
];

function ProfileEditor() {
  const [data, setData] = useState<Partial<Profile> | null>(null);
  const [i18n, setI18n] = useState<Record<string, Tri>>({});
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!/^image\/(jpe?g|png|webp|gif|avif)$/i.test(file.type)) {
      toast.error("Please choose a JPG, PNG, or WebP image.");
      return;
    }
    setUploadingPhoto(true);
    try {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const filePath = `profile/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("portfolio-assets")
        .upload(filePath, file, { cacheControl: "3600", upsert: false, contentType: file.type });
      if (upErr) throw upErr;

      const publicUrlResult = supabase.storage.from("portfolio-assets").getPublicUrl(filePath) as any;
      const publicUrl = publicUrlResult?.data?.publicUrl ?? publicUrlResult?.publicUrl;
      if (!publicUrl) throw new Error("Uploaded, but could not resolve public URL.");

      setData((d) => ({ ...(d ?? {}), photo_url: publicUrl! }));
      toast.success("Photo uploaded — click Save profile to persist.");
    } catch (err: any) {
      const msg = String(err?.message ?? err ?? "Upload failed");
      toast.error(msg);
    } finally {
      setUploadingPhoto(false);
      e.target.value = "";
    }
  }

  useEffect(() => {
    supabase.from("profile").select("*").limit(1).maybeSingle().then(({ data, error }) => {
      if (error) toast.error(error.message);
      const row = data ?? {};
      setData(row);
      const bag: Record<string, Tri> = {};
      const existing = ((row as any).i18n ?? {}) as Record<string, Partial<Tri>>;
      for (const f of fields) {
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
    const { id, i18n: _ignore, ...rest } = data as any;
    const payload: any = { ...rest };
    for (const f of fields) {
      if (f.type === "i18n" || f.type === "i18n-textarea") {
        const tri = i18n[f.name as string] ?? { hy: "", en: "", ru: "" };
        payload[f.name] = tri.en || tri.hy || tri.ru || null;
      }
    }
    payload.i18n = i18n;
    const { error } = id
      ? await supabase.from("profile").update(payload).eq("id", id)
      : await supabase.from("profile").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Profile saved");
  }

  if (!data) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Profile</h1>
      <p className="mt-1 text-muted-foreground">This information appears across the public site. Fields with HY / EN / RU tabs are shown in the visitor's selected language.</p>
      <form onSubmit={save} className="glass mt-6 grid gap-4 rounded-2xl p-6 sm:grid-cols-2">
        {fields.map((f) => {
          const colSpan = f.type === "textarea" || f.type === "i18n" || f.type === "i18n-textarea" || f.type === "image" ? "sm:col-span-2" : "";
          return (
            <div key={f.name as string} className={colSpan}>
              <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">{f.label}</label>
              {f.type === "image" ? (
                <div className="flex flex-col gap-3 rounded-md border border-border bg-background/40 p-3 sm:flex-row sm:items-center">
                  {(data[f.name] as string) ? (
                    <img
                      src={(data[f.name] as string) ?? ""}
                      alt="Profile preview"
                      className="h-24 w-24 rounded-md border border-border object-cover"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-md border border-dashed border-border text-xs text-muted-foreground">
                      No image
                    </div>
                  )}
                  <div className="flex-1 space-y-2">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background/60 px-3 py-2 text-sm hover:bg-accent">
                      {uploadingPhoto ? (
                        <>
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                            <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" className="opacity-75" />
                          </svg>
                          Uploading…
                        </>
                      ) : (
                        <>Choose image…</>
                      )}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                        disabled={uploadingPhoto}
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="url"
                      placeholder="…or paste an image URL"
                      value={(data[f.name] as string) ?? ""}
                      onChange={(e) => setData({ ...data, [f.name]: e.target.value })}
                      className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-xs outline-none focus:border-primary"
                    />
                  </div>
                </div>
              ) : f.type === "i18n" || f.type === "i18n-textarea" ? (
                <I18nInput
                  value={i18n[f.name as string] ?? { hy: "", en: "", ru: "" }}
                  multiline={f.type === "i18n-textarea"}
                  onChange={(v) => setI18n({ ...i18n, [f.name as string]: v })}
                />
              ) : f.type === "textarea" ? (
                <textarea
                  rows={5}
                  value={(data[f.name] as string) ?? ""}
                  onChange={(e) => setData({ ...data, [f.name]: e.target.value })}
                  className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
                />
              ) : (
                <input
                  type={f.type === "url" ? "url" : "text"}
                  value={(data[f.name] as string) ?? ""}
                  onChange={(e) => setData({ ...data, [f.name]: e.target.value })}
                  className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
                />
              )}
            </div>
          );
        })}
        <div className="sm:col-span-2">
          <PreviewPanel fields={fields as any} values={data} i18nValues={i18n} title="Public preview" />
        </div>
        <div className="sm:col-span-2 flex justify-end">
          <button disabled={saving} className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60">
            {saving ? "Saving…" : "Save profile"}
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
          rows={5}
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
