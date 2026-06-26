import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { PreviewPanel } from "./PreviewPanel";

export type FieldType = "text" | "textarea" | "number" | "boolean" | "date" | "url" | "tags" | "image" | "i18n" | "i18n-textarea";
export type Field = { name: string; label: string; type: FieldType; required?: boolean; placeholder?: string };

const LANG_TABS: { code: "hy" | "en" | "ru"; label: string }[] = [
  { code: "hy", label: "HY · Հայերեն" },
  { code: "en", label: "EN · English" },
  { code: "ru", label: "RU · Русский" },
];

export interface CrudPageProps {
  title: string;
  description?: string;
  table: string;
  fields: Field[];
  orderBy?: { column: string; ascending?: boolean };
  displayColumns: string[];
  /** Optional client-side filter — used for tabbed views (e.g. Upcoming vs Past). */
  filter?: (row: Record<string, any>) => boolean;
  /** Default values applied to new rows (used by tabbed views to pre-fill the active tab). */
  defaults?: Record<string, any>;
  /** Hide the page header (useful when embedded under a tabbed parent that owns the heading). */
  hideHeader?: boolean;
}

type Row = Record<string, any>;

export function CrudPage({ title, description, table, fields, orderBy, displayColumns, filter, defaults, hideHeader }: CrudPageProps) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);

  async function load() {
    setLoading(true);
    let q = supabase.from(table as any).select("*");
    if (orderBy) q = q.order(orderBy.column, { ascending: orderBy.ascending ?? true });
    const { data, error } = await q;
    if (error) toast.error(error.message);
    setRows((data as Row[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  async function del(id: string) {
    if (!confirm("Delete this item?")) return;
    const { error } = await supabase.from(table as any).delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  }

  async function save(values: Row) {
    const payload: Row = {};
    const i18nBag: Record<string, { hy: string; en: string; ru: string }> = {
      ...(editing?.i18n && typeof editing.i18n === "object" ? editing.i18n : {}),
    };
    for (const f of fields) {
      if (f.type === "i18n" || f.type === "i18n-textarea") {
        const bag = (values[f.name] ?? {}) as { hy?: string; en?: string; ru?: string };
        const tri = {
          hy: (bag.hy ?? "").trim(),
          en: (bag.en ?? "").trim(),
          ru: (bag.ru ?? "").trim(),
        };
        i18nBag[f.name] = tri;
        // Write English (or first non-empty) into the plain column for fallback / legacy queries.
        payload[f.name] = tri.en || tri.hy || tri.ru || null;
        continue;
      }
      let v = values[f.name];
      if (v === "" || v === undefined) v = null;
      if (f.type === "number" && v !== null) v = Number(v);
      if (f.type === "boolean") v = !!v;
      if (f.type === "tags" && typeof v === "string")
        v = v.split(",").map((s: string) => s.trim()).filter(Boolean);
      payload[f.name] = v;
    }
    if (fields.some((f) => f.type === "i18n" || f.type === "i18n-textarea")) {
      payload.i18n = i18nBag;
    }
    let error;
    if (editing?.id) {
      ({ error } = await supabase.from(table as any).update(payload).eq("id", editing.id));
    } else {
      ({ error } = await supabase.from(table as any).insert(payload));
    }
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing(null);
    setCreating(false);
    load();
  }

  const visibleRows = filter ? rows.filter(filter) : rows;

  return (
    <div>
      {!hideHeader && (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold">{title}</h1>
            {description && <p className="mt-1 text-muted-foreground">{description}</p>}
          </div>
          <button
            onClick={() => { setCreating(true); setEditing({ ...(defaults ?? {}) }); }}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            <Plus className="size-4" /> New
          </button>
        </div>
      )}
      {hideHeader && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => { setCreating(true); setEditing({ ...(defaults ?? {}) }); }}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
          >
            <Plus className="size-4" /> New
          </button>
        </div>
      )}

      <div className="glass mt-6 overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                {displayColumns.map((c) => (
                  <th key={c} className="px-4 py-3 font-medium">{c.replace(/_/g, " ")}</th>
                ))}
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={displayColumns.length + 1} className="px-4 py-6 text-center text-muted-foreground">Loading…</td></tr>
              ) : visibleRows.length === 0 ? (
                <tr><td colSpan={displayColumns.length + 1} className="px-4 py-6 text-center text-muted-foreground">No items yet. Click New to add one.</td></tr>
              ) : visibleRows.map((row) => (
                <tr key={row.id} className="border-b border-border/40 last:border-0 hover:bg-accent/30">
                  {displayColumns.map((c) => (
                    <td key={c} className="max-w-xs truncate px-4 py-3">
                      {formatCell(row[c])}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-2">
                      <button onClick={() => { setEditing(row); setCreating(false); }} className="rounded-md border border-border p-1.5 hover:bg-accent">
                        <Pencil className="size-3.5" />
                      </button>
                      <button onClick={() => del(row.id)} className="rounded-md border border-destructive/40 p-1.5 text-destructive hover:bg-destructive/10">
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(editing || creating) && (
        <EditModal
          fields={fields}
          initial={editing ?? {}}
          isNew={creating}
          onCancel={() => { setEditing(null); setCreating(false); }}
          onSave={save}
        />
      )}
    </div>
  );
}

function formatCell(v: any) {
  if (v === null || v === undefined) return <span className="text-muted-foreground">—</span>;
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (Array.isArray(v)) return v.join(", ");
  if (typeof v === "string" && v.length > 80) return v.slice(0, 80) + "…";
  return String(v);
}

function EditModal({ fields, initial, isNew, onCancel, onSave }: { fields: Field[]; initial: Row; isNew: boolean; onCancel: () => void; onSave: (v: Row) => void }) {
  const [values, setValues] = useState<Row>(() => {
    const v: Row = { ...initial };
    const bag = (initial?.i18n && typeof initial.i18n === "object") ? initial.i18n : {};
    for (const f of fields) {
      if (f.type === "tags" && Array.isArray(v[f.name])) v[f.name] = v[f.name].join(", ");
      if (f.type === "date" && v[f.name]) v[f.name] = String(v[f.name]).slice(0, 10);
      if (f.type === "i18n" || f.type === "i18n-textarea") {
        const existing = (bag as any)[f.name] as { hy?: string; en?: string; ru?: string } | undefined;
        const plain = initial?.[f.name] ?? "";
        v[f.name] = {
          hy: existing?.hy ?? plain ?? "",
          en: existing?.en ?? plain ?? "",
          ru: existing?.ru ?? plain ?? "",
        };
      }
    }
    return v;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-10">
      <div className="glass relative w-full max-w-2xl rounded-2xl p-6">
        <button onClick={onCancel} className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground hover:bg-accent">
          <X className="size-4" />
        </button>
        <h2 className="font-display text-xl font-semibold">{isNew ? "Create" : "Edit"}</h2>
        <form
          onSubmit={(e) => { e.preventDefault(); onSave(values); }}
          className="mt-5 grid gap-4 sm:grid-cols-2"
        >
          {fields.map((f) => (
            <div key={f.name} className={(f.type === "textarea" || f.type === "i18n" || f.type === "i18n-textarea") ? "sm:col-span-2" : ""}>
              <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">{f.label}</label>
              {f.type === "textarea" ? (
                <textarea
                  value={values[f.name] ?? ""}
                  onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                  rows={6}
                  placeholder={f.placeholder}
                  required={f.required}
                  className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
                />
              ) : f.type === "boolean" ? (
                <label className="flex h-10 items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!values[f.name]}
                    onChange={(e) => setValues({ ...values, [f.name]: e.target.checked })}
                    className="size-4"
                  />
                  <span className="text-sm">{f.label}</span>
                </label>
              ) : f.type === "image" ? (
                <ImageUploadField
                  value={values[f.name] ?? ""}
                  onChange={(url) => setValues({ ...values, [f.name]: url })}
                  required={f.required}
                />
              ) : (f.type === "i18n" || f.type === "i18n-textarea") ? (
                <I18nField
                  value={values[f.name] ?? { hy: "", en: "", ru: "" }}
                  onChange={(next) => setValues({ ...values, [f.name]: next })}
                  multiline={f.type === "i18n-textarea"}
                  placeholder={f.placeholder}
                  required={f.required}
                />
              ) : (
                <input
                  type={f.type === "number" ? "number" : f.type === "date" ? "date" : f.type === "url" ? "url" : "text"}
                  value={values[f.name] ?? ""}
                  onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                  placeholder={f.placeholder}
                  required={f.required}
                  className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
                />
              )}
            </div>
          ))}
          <div className="sm:col-span-2">
            <PreviewPanel fields={fields} values={values} />
          </div>
          <div className="sm:col-span-2 mt-2 flex justify-end gap-2">
            <button type="button" onClick={onCancel} className="rounded-md border border-border px-4 py-2 text-sm">Cancel</button>
            <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

type Tri = { hy: string; en: string; ru: string };
function I18nField({
  value, onChange, multiline, placeholder, required,
}: {
  value: Tri;
  onChange: (v: Tri) => void;
  multiline?: boolean;
  placeholder?: string;
  required?: boolean;
}) {
  const [active, setActive] = useState<"hy" | "en" | "ru">("en");
  const v: Tri = { hy: value?.hy ?? "", en: value?.en ?? "", ru: value?.ru ?? "" };
  const canCopyEnToHy = v.en.trim().length > 0 && v.hy !== v.en;
  return (
    <div className="rounded-md border border-border bg-background/40 p-2">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <div className="flex gap-1">
          {LANG_TABS.map((t) => {
            const filled = v[t.code].trim().length > 0;
            return (
              <button
                key={t.code}
                type="button"
                onClick={() => setActive(t.code)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  active === t.code
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
        <button
          type="button"
          disabled={!canCopyEnToHy}
          onClick={() => onChange({ ...v, hy: v.en })}
          className="ml-auto inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
          title="Copy English text into the Armenian field"
        >
          Copy EN → HY
        </button>
      </div>
      {multiline ? (
        <textarea
          rows={6}
          value={v[active]}
          onChange={(e) => onChange({ ...v, [active]: e.target.value })}
          placeholder={placeholder}
          required={required && active === "en"}
          className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
        />
      ) : (
        <input
          type="text"
          value={v[active]}
          onChange={(e) => onChange({ ...v, [active]: e.target.value })}
          placeholder={placeholder}
          required={required && active === "en"}
          className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
        />
      )}
      <p className="mt-1 text-[10px] text-muted-foreground">Tip: a red dot means that language is empty. The site falls back to English when a translation is missing.</p>
    </div>
  );
}


const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const ALLOWED_IMAGE_EXTS = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function ImageUploadField({ value, onChange, required }: { value: string; onChange: (url: string) => void; required?: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function validate(file: File): string | null {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    const typeOk = ALLOWED_IMAGE_TYPES.includes(file.type);
    const extOk = ALLOWED_IMAGE_EXTS.includes(ext);
    if (!typeOk && !extOk) {
      return `Unsupported file type${file.type ? ` (${file.type})` : ""}. Use JPG, PNG, WebP, GIF, or SVG.`;
    }
    if (file.size === 0) return "File is empty.";
    if (file.size > MAX_IMAGE_BYTES) {
      return `Image is ${formatBytes(file.size)} — must be under ${formatBytes(MAX_IMAGE_BYTES)}.`;
    }
    return null;
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    // Reset the input so re-selecting the same file re-triggers change.
    if (inputRef.current) inputRef.current.value = "";
    if (!file) return;

    const validationError = validate(file);
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }
    setError(null);

    setUploading(true);
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "png";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("site-assets").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });
    if (uploadError) {
      setUploading(false);
      setError(uploadError.message);
      toast.error(uploadError.message);
      return;
    }
    const { data } = supabase.storage.from("site-assets").getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
    toast.success("Image uploaded");
  }


  return (
    <div className="space-y-2">
      {value && (
        <img src={value} alt="" className="h-24 w-auto rounded-md border border-border object-cover" />
      )}
      <div className="flex gap-2">
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… or upload"
          required={required && !value}
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
