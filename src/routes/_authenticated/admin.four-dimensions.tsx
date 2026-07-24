import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import {
  deleteFourDimensionImage,
  uploadFourDimensionImage,
  validateFourDimensionImage,
} from "@/lib/four-dimensions-storage";

export const Route = createFileRoute("/_authenticated/admin/four-dimensions")({
  head: () => ({ meta: [{ title: "Four Dimensions of Impact — Admin" }] }),
  component: FourDimensionsAdmin,
});

type Row = Tables<"four_dimensions">;

function parseBullets(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value === "string" && value.trim()) {
    return value.split("\n").map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

function FourDimensionsAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Row | null>(null);
  const queryClient = useQueryClient();

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("four_dimensions").select("*").order("display_order");
    if (error) toast.error(error.message);
    setRows((data as Row[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function save(values: Partial<Row>) {
    if (!editing?.id) return;
    const bullets = parseBullets(values.bullet_points as unknown);
    const payload = {
      title: values.title?.trim(),
      subtitle: values.subtitle?.trim() || null,
      description: values.description?.trim() || null,
      bullet_points: bullets,
      image_url: values.image_url?.trim() || null,
      image_alt: values.image_alt?.trim() || null,
      badge_text: values.badge_text?.trim() || null,
      engagement_text: values.engagement_text?.trim() || null,
      cta_button_text: values.cta_button_text?.trim() || null,
      cta_button_url: values.cta_button_url?.trim() || null,
      timeline_button_text: values.timeline_button_text?.trim() || null,
      timeline_button_url: values.timeline_button_url?.trim() || null,
      show_timeline_footer: !!values.show_timeline_footer,
      is_visible: values.is_visible ?? true,
      display_order: Number(values.display_order ?? editing.display_order),
    };

    if (!payload.title) {
      toast.error("Title is required");
      return;
    }

    const { error } = await supabase.from("four_dimensions").update(payload).eq("id", editing.id);
    if (error) return toast.error(error.message);

    toast.success("Dimension saved");
    setEditing(null);
    queryClient.invalidateQueries({ queryKey: ["four_dimensions"] });
    load();
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Four Dimensions of Impact</h1>
      <p className="mt-1 text-muted-foreground">
        Manage the four homepage impact dimensions — titles, descriptions, bullet points, images, and CTAs.
      </p>

      <div className="glass mt-6 overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Image</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Subtitle</th>
                <th className="px-4 py-3 font-medium">Visible</th>
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-muted-foreground">
                    Loading…
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-muted-foreground">
                    No dimensions found. Run the database migration to seed the four dimensions.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id} className="border-b border-border/40 last:border-0 hover:bg-accent/30">
                    <td className="px-4 py-3">{row.dimension_number}</td>
                    <td className="px-4 py-3">
                      {row.image_url ? (
                        <img src={row.image_url} alt="" className="h-12 w-16 rounded-md border border-border object-cover" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="max-w-xs truncate px-4 py-3">{row.title}</td>
                    <td className="max-w-xs truncate px-4 py-3">{row.subtitle || "—"}</td>
                    <td className="px-4 py-3">{row.is_visible ? "Yes" : "No"}</td>
                    <td className="px-4 py-3">{row.display_order}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setEditing(row)}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-accent"
                      >
                        <Pencil className="size-3.5" /> Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <EditModal
          row={editing}
          onCancel={() => setEditing(null)}
          onSave={save}
        />
      )}
    </div>
  );
}

function EditModal({
  row,
  onCancel,
  onSave,
}: {
  row: Row;
  onCancel: () => void;
  onSave: (values: Partial<Row>) => Promise<void>;
}) {
  const [values, setValues] = useState<Partial<Row>>({
    ...row,
    bullet_points: parseBullets(row.bullet_points) as unknown as Row["bullet_points"],
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const bulletsText = parseBullets(values.bullet_points).join("\n");

  async function handleUpload(file: File) {
    const validationError = validateFourDimensionImage(file);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    setUploading(true);
    try {
      const publicUrl = await uploadFourDimensionImage(row.id, file, values.image_url);
      const { error } = await supabase.from("four_dimensions").update({ image_url: publicUrl }).eq("id", row.id);
      if (error) throw error;
      setValues((v) => ({ ...v, image_url: publicUrl }));
      queryClient.invalidateQueries({ queryKey: ["four_dimensions"] });
      toast.success("Image uploaded and saved.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleDeleteImage() {
    if (!values.image_url) return;
    if (!confirm("Remove this image from storage?")) return;
    setUploading(true);
    try {
      await deleteFourDimensionImage(values.image_url);
      const { error } = await supabase.from("four_dimensions").update({ image_url: null }).eq("id", row.id);
      if (error) throw error;
      setValues((v) => ({ ...v, image_url: null }));
      queryClient.invalidateQueries({ queryKey: ["four_dimensions"] });
      toast.success("Image removed.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSave({
      ...values,
      bullet_points: bulletsText.split("\n").map((s) => s.trim()).filter(Boolean) as unknown as Row["bullet_points"],
    });
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-10">
      <div className="glass relative w-full max-w-2xl rounded-2xl p-6">
        <button onClick={onCancel} className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground hover:bg-accent">
          <X className="size-4" />
        </button>
        <h2 className="font-display text-xl font-semibold">
          Edit Dimension {row.dimension_number}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{row.title}</p>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Dimension number">
            <input
              type="number"
              value={row.dimension_number}
              disabled
              className="w-full rounded-md border border-input bg-muted/40 px-3 py-2 text-sm text-muted-foreground"
            />
          </Field>
          <Field label="Display order">
            <input
              type="number"
              value={values.display_order ?? 0}
              onChange={(e) => setValues({ ...values, display_order: Number(e.target.value) })}
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Field>
          <Field label="Title" className="sm:col-span-2">
            <input
              type="text"
              value={values.title ?? ""}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              required
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Field>
          <Field label="Subtitle" className="sm:col-span-2">
            <input
              type="text"
              value={values.subtitle ?? ""}
              onChange={(e) => setValues({ ...values, subtitle: e.target.value })}
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Field>
          <Field label="Description (lead text)" className="sm:col-span-2">
            <textarea
              rows={2}
              value={values.description ?? ""}
              onChange={(e) => setValues({ ...values, description: e.target.value })}
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Field>
          <Field label="Bullet points (one per line)" className="sm:col-span-2">
            <textarea
              rows={6}
              value={bulletsText}
              onChange={(e) =>
                setValues({
                  ...values,
                  bullet_points: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) as unknown as Row["bullet_points"],
                })
              }
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Field>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Image</label>
            <div className="space-y-3 rounded-md border border-border bg-background/40 p-4">
              {values.image_url ? (
                <img
                  src={values.image_url}
                  alt={values.image_alt ?? ""}
                  className="max-h-48 w-full rounded-md border border-border object-cover"
                />
              ) : (
                <p className="text-sm text-muted-foreground">No image uploaded yet.</p>
              )}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => inputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm hover:bg-accent disabled:opacity-60"
                >
                  <Upload className="size-3.5" />
                  {uploading ? "Uploading…" : values.image_url ? "Replace image" : "Upload image"}
                </button>
                {values.image_url && (
                  <button
                    type="button"
                    disabled={uploading}
                    onClick={handleDeleteImage}
                    className="rounded-md border border-destructive/40 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 disabled:opacity-60"
                  >
                    Delete image
                  </button>
                )}
              </div>
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (inputRef.current) inputRef.current.value = "";
                  if (file) void handleUpload(file);
                }}
              />
              <p className="text-xs text-muted-foreground">
                Stored in Supabase Storage at four-dimensions/{row.id}/image
              </p>
            </div>
          </div>

          <Field label="Image alt text" className="sm:col-span-2">
            <input
              type="text"
              value={values.image_alt ?? ""}
              onChange={(e) => setValues({ ...values, image_alt: e.target.value })}
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Field>

          <Field label="Badge text">
            <input
              type="text"
              value={values.badge_text ?? ""}
              onChange={(e) => setValues({ ...values, badge_text: e.target.value })}
              placeholder="{count} countries or Global reach"
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Field>
          <Field label="Engagement text">
            <input
              type="text"
              value={values.engagement_text ?? ""}
              onChange={(e) => setValues({ ...values, engagement_text: e.target.value })}
              placeholder="{count}+ engagements"
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Field>
          <Field label="CTA button text">
            <input
              type="text"
              value={values.cta_button_text ?? ""}
              onChange={(e) => setValues({ ...values, cta_button_text: e.target.value })}
              placeholder="Learn More"
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Field>
          <Field label="CTA button URL">
            <input
              type="text"
              value={values.cta_button_url ?? ""}
              onChange={(e) => setValues({ ...values, cta_button_url: e.target.value })}
              placeholder="/collaborate"
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Field>
          <Field label="Timeline button text">
            <input
              type="text"
              value={values.timeline_button_text ?? ""}
              onChange={(e) => setValues({ ...values, timeline_button_text: e.target.value })}
              placeholder="View Timeline"
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Field>
          <Field label="Timeline button URL">
            <input
              type="text"
              value={values.timeline_button_url ?? ""}
              onChange={(e) => setValues({ ...values, timeline_button_url: e.target.value })}
              placeholder="/timeline"
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Field>

          <Field label="Show timeline footer">
            <label className="flex h-10 items-center gap-2">
              <input
                type="checkbox"
                checked={!!values.show_timeline_footer}
                onChange={(e) => setValues({ ...values, show_timeline_footer: e.target.checked })}
                className="size-4"
              />
              <span className="text-sm">Display badges and timeline CTA</span>
            </label>
          </Field>
          <Field label="Visible">
            <label className="flex h-10 items-center gap-2">
              <input
                type="checkbox"
                checked={values.is_visible ?? true}
                onChange={(e) => setValues({ ...values, is_visible: e.target.checked })}
                className="size-4"
              />
              <span className="text-sm">Show on public homepage</span>
            </label>
          </Field>

          <div className="sm:col-span-2 mt-2 flex justify-end gap-2">
            <button type="button" onClick={onCancel} className="rounded-md border border-border px-4 py-2 text-sm">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}
