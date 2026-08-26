import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { AboutHighlight, AboutHighlightInstitution } from "@/lib/queries";

export const Route = createFileRoute("/_authenticated/admin/about-highlights")({
  head: () => ({ meta: [{ title: "About Highlights Admin" }] }),
  component: AboutHighlightsAdmin,
});

type Tri = { hy: string; en: string; ru: string };

type HighlightDraft = {
  id?: string;
  roleI18n: Tri;
  institutions: AboutHighlightInstitution[];
  display_order: number;
  is_visible: boolean;
};

const EMPTY_TRI: Tri = { hy: "", en: "", ru: "" };
const EMPTY_INSTITUTION: AboutHighlightInstitution = { name: "", url: "", logo_url: "" };
const LANG_TABS: { code: keyof Tri; label: string }[] = [
  { code: "hy", label: "HY · Հայերեն" },
  { code: "en", label: "EN · English" },
  { code: "ru", label: "RU · Русский" },
];
const MAX_INSTITUTIONS = 3;

function parseInstitutions(value: unknown): AboutHighlightInstitution[] {
  if (!Array.isArray(value)) return [{ ...EMPTY_INSTITUTION }];
  return value.map((item) => {
    const row = item as Partial<AboutHighlightInstitution>;
    return {
      name: String(row.name ?? ""),
      url: String(row.url ?? ""),
      logo_url: String(row.logo_url ?? ""),
    };
  });
}

function rowToDraft(row: AboutHighlight): HighlightDraft {
  const bag = row.i18n?.role ?? {};
  return {
    id: row.id,
    roleI18n: {
      hy: bag.hy ?? row.role ?? "",
      en: bag.en ?? row.role ?? "",
      ru: bag.ru ?? row.role ?? "",
    },
    institutions: parseInstitutions(row.institutions),
    display_order: row.display_order,
    is_visible: row.is_visible,
  };
}

function newDraft(order: number): HighlightDraft {
  return {
    roleI18n: { ...EMPTY_TRI },
    institutions: [{ ...EMPTY_INSTITUTION }],
    display_order: order,
    is_visible: true,
  };
}

function AboutHighlightsAdmin() {
  const [rows, setRows] = useState<AboutHighlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState<Record<string, HighlightDraft>>({});
  const [creating, setCreating] = useState<HighlightDraft | null>(null);
  const queryClient = useQueryClient();

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("about_highlights").select("*").order("display_order");
    if (error) toast.error(error.message);
    const list = (data as AboutHighlight[]) ?? [];
    setRows(list);
    setDrafts(Object.fromEntries(list.map((row) => [row.id, rowToDraft(row)])));
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function saveDraft(draft: HighlightDraft) {
    const roleEn = draft.roleI18n.en.trim();
    if (!roleEn) {
      toast.error("Role (English) is required");
      return;
    }
    const institutions = draft.institutions
      .map((inst) => ({
        name: inst.name.trim(),
        url: inst.url.trim(),
        logo_url: inst.logo_url.trim(),
      }))
      .filter((inst) => inst.name || inst.url || inst.logo_url);

    const payload = {
      role: roleEn,
      institutions,
      i18n: { role: draft.roleI18n },
      display_order: Number(draft.display_order) || 0,
      is_visible: draft.is_visible,
    };

    let error;
    if (draft.id) {
      ({ error } = await supabase.from("about_highlights").update(payload).eq("id", draft.id));
    } else {
      ({ error } = await supabase.from("about_highlights").insert(payload));
    }
    if (error) return toast.error(error.message);

    toast.success(draft.id ? "Highlight saved" : "Highlight created");
    setCreating(null);
    queryClient.invalidateQueries({ queryKey: ["about_highlights"] });
    load();
  }

  async function deleteRow(id: string) {
    if (!confirm("Delete this highlight?")) return;
    const { error } = await supabase.from("about_highlights").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Highlight deleted");
    queryClient.invalidateQueries({ queryKey: ["about_highlights"] });
    load();
  }

  function updateDraft(id: string, patch: Partial<HighlightDraft>) {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">About Highlights</h1>
      <p className="mt-1 text-muted-foreground">
        Manage the homepage About sidebar: institution names, roles, logos, and links (up to 3 institutions per highlight).
      </p>

      <div className="mt-6">
        <button
          type="button"
          onClick={() => setCreating(newDraft(rows.length))}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          <Plus className="size-4" /> Add new highlight
        </button>
      </div>

      {creating && (
        <HighlightCard
          draft={creating}
          onChange={setCreating}
          onSave={() => saveDraft(creating)}
          onCancel={() => setCreating(null)}
          isNew
        />
      )}

      {loading ? (
        <p className="mt-8 text-muted-foreground">Loading…</p>
      ) : rows.length === 0 && !creating ? (
        <p className="mt-8 text-muted-foreground">
          No highlights yet. Run the database migration or add one above.
        </p>
      ) : (
        <div className="mt-6 space-y-6">
          {rows.map((row) => {
            const draft = drafts[row.id] ?? rowToDraft(row);
            return (
              <HighlightCard
                key={row.id}
                draft={draft}
                onChange={(next) => updateDraft(row.id, next)}
                onSave={() => saveDraft(draft)}
                onDelete={() => deleteRow(row.id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function HighlightCard({
  draft,
  onChange,
  onSave,
  onDelete,
  onCancel,
  isNew,
}: {
  draft: HighlightDraft;
  onChange: (next: HighlightDraft) => void;
  onSave: () => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isNew?: boolean;
}) {
  const [roleLang, setRoleLang] = useState<keyof Tri>("en");

  function setInstitution(index: number, patch: Partial<AboutHighlightInstitution>) {
    const next = draft.institutions.map((inst, i) => (i === index ? { ...inst, ...patch } : inst));
    onChange({ ...draft, institutions: next });
  }

  function addInstitution() {
    if (draft.institutions.length >= MAX_INSTITUTIONS) return;
    onChange({ ...draft, institutions: [...draft.institutions, { ...EMPTY_INSTITUTION }] });
  }

  function removeInstitution(index: number) {
    onChange({ ...draft, institutions: draft.institutions.filter((_, i) => i !== index) });
  }

  return (
    <div className="glass rounded-2xl border border-border/60 p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="font-display text-lg font-semibold">
          {isNew ? "New highlight" : draft.roleI18n.en || "Highlight"}
        </h2>
        <div className="flex gap-2">
          {onCancel && (
            <button type="button" onClick={onCancel} className="rounded-md border border-border px-3 py-1.5 text-sm">
              Cancel
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center gap-1.5 rounded-md border border-destructive/40 px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="size-3.5" /> Delete
            </button>
          )}
          <button
            type="button"
            onClick={onSave}
            className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground"
          >
            Save
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-5">
        <Field label="Role">
          <div className="rounded-md border border-border bg-background/40 p-2">
            <div className="mb-2 flex gap-1">
              {LANG_TABS.map((tab) => (
                <button
                  key={tab.code}
                  type="button"
                  onClick={() => setRoleLang(tab.code)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                    roleLang === tab.code
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={draft.roleI18n[roleLang]}
              onChange={(e) =>
                onChange({
                  ...draft,
                  roleI18n: { ...draft.roleI18n, [roleLang]: e.target.value },
                })
              }
              required={roleLang === "en"}
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
        </Field>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Institutions</label>
            <button
              type="button"
              onClick={addInstitution}
              disabled={draft.institutions.length >= MAX_INSTITUTIONS}
              className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs hover:bg-accent disabled:opacity-50"
            >
              <Plus className="size-3" /> Add institution
            </button>
          </div>
          <div className="space-y-4">
            {draft.institutions.map((inst, index) => (
              <div key={index} className="rounded-md border border-border bg-background/40 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-medium">Institution {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeInstitution(index)}
                    className="text-xs text-destructive hover:underline"
                  >
                    Remove institution
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Name">
                    <input
                      type="text"
                      value={inst.name}
                      onChange={(e) => setInstitution(index, { name: e.target.value })}
                      className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </Field>
                  <Field label="Website URL">
                    <input
                      type="url"
                      value={inst.url}
                      onChange={(e) => setInstitution(index, { url: e.target.value })}
                      placeholder="https://…"
                      className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Logo">
                      <ImageUploadField
                        value={inst.logo_url}
                        onChange={(url) => setInstitution(index, { logo_url: url })}
                        uploadFolder="about-highlights"
                      />
                    </Field>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Display order">
            <input
              type="number"
              value={draft.display_order}
              onChange={(e) => onChange({ ...draft, display_order: Number(e.target.value) })}
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Field>
          <Field label="Visible">
            <label className="flex h-10 items-center gap-2">
              <input
                type="checkbox"
                checked={draft.is_visible}
                onChange={(e) => onChange({ ...draft, is_visible: e.target.checked })}
                className="size-4"
              />
              <span className="text-sm">Show on homepage</span>
            </label>
          </Field>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}

const ASSET_BUCKET = "portfolio-assets";
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const ALLOWED_IMAGE_EXTS = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function ImageUploadField({
  value,
  onChange,
  uploadFolder,
}: {
  value: string;
  onChange: (url: string) => void;
  uploadFolder?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (inputRef.current) inputRef.current.value = "";
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    const typeOk = ALLOWED_IMAGE_TYPES.includes(file.type);
    const extOk = ALLOWED_IMAGE_EXTS.includes(ext);
    if (!typeOk && !extOk) {
      const msg = "Use JPG, PNG, WebP, GIF, or SVG.";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      const msg = `Image must be under ${formatBytes(MAX_IMAGE_BYTES)}.`;
      setError(msg);
      toast.error(msg);
      return;
    }
    setError(null);
    setUploading(true);

    const fileName = `${crypto.randomUUID()}.${ext}`;
    const path = uploadFolder ? `${uploadFolder}/${fileName}` : fileName;
    const { error: uploadError } = await supabase.storage.from(ASSET_BUCKET).upload(path, file, {
      cacheControl: "3600",
      upsert: !!uploadFolder,
      contentType: file.type,
    });
    if (uploadError) {
      setUploading(false);
      setError(uploadError.message);
      toast.error(uploadError.message);
      return;
    }
    const { data } = supabase.storage.from(ASSET_BUCKET).getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
    toast.success("Image uploaded");
  }

  return (
    <div className="space-y-2">
      {value && <img src={value} alt="" className="h-12 w-auto rounded-md border border-border object-contain" />}
      <div className="flex gap-2">
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… or upload"
          className="flex-1 rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm hover:bg-accent disabled:opacity-60"
        >
          <Upload className="size-3.5" />
          {uploading ? "Uploading…" : "Upload"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-md border border-border px-3 py-2 text-sm hover:bg-accent"
          >
            Clear
          </button>
        )}
      </div>
      {error ? (
        <p role="alert" className="text-xs text-destructive">{error}</p>
      ) : (
        <p className="text-xs text-muted-foreground">JPG, PNG, WebP, GIF or SVG · max {formatBytes(MAX_IMAGE_BYTES)}</p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_IMAGE_TYPES.join(",")}
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}
