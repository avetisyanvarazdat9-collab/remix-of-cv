import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { getSocialPlatform, isValidSocialUrl, normalizeSocialUrl } from "@/lib/social-platforms";

export const Route = createFileRoute("/_authenticated/admin/social-links")({
  head: () => ({ meta: [{ title: "Social Links — Admin" }] }),
  component: SocialLinksAdmin,
});

type Row = Tables<"social_links">;

type EditableRow = {
  id?: string;
  platform: string;
  url: string;
  is_visible: boolean;
  display_order: number;
};

function PlatformIcon({ platform }: { platform: string }) {
  const config = getSocialPlatform(platform);
  if (!config) return null;
  const Icon = config.icon;
  if (Icon) return <Icon className="size-4 text-primary" />;
  return <span className="text-[10px] font-semibold text-primary">{config.glyph}</span>;
}

function SocialLinksAdmin() {
  const [rows, setRows] = useState<EditableRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient();

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("social_links").select("*").order("display_order");
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    const byPlatform = new Map((data as Row[]).map((r) => [r.platform, r]));
    const merged = SOCIAL_PLATFORMS.map((p) => {
      const existing = byPlatform.get(p.id);
      return {
        id: existing?.id,
        platform: p.id,
        url: existing?.url ?? "",
        is_visible: existing?.is_visible ?? false,
        display_order: existing?.display_order ?? p.defaultOrder,
      };
    });
    setRows(merged);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function updateRow(platform: string, patch: Partial<EditableRow>) {
    setRows((prev) => prev.map((r) => (r.platform === platform ? { ...r, ...patch } : r)));
  }

  async function saveAll() {
    for (const row of rows) {
      const trimmed = row.url.trim();
      if (trimmed && !isValidSocialUrl(normalizeSocialUrl(trimmed))) {
        toast.error(`Invalid URL for ${getSocialPlatform(row.platform)?.label ?? row.platform}`);
        return;
      }
    }

    setSaving(true);
    for (const row of rows) {
      const url = row.url.trim() ? normalizeSocialUrl(row.url) : null;
      const payload = {
        platform: row.platform,
        url,
        is_visible: row.is_visible && !!url,
        display_order: row.display_order,
      };

      if (row.id) {
        const { error } = await supabase.from("social_links").update(payload).eq("id", row.id);
        if (error) {
          setSaving(false);
          toast.error(error.message);
          return;
        }
      } else {
        const { error } = await supabase.from("social_links").insert(payload);
        if (error) {
          setSaving(false);
          toast.error(error.message);
          return;
        }
      }
    }

    setSaving(false);
    toast.success("Social links saved");
    queryClient.invalidateQueries({ queryKey: ["social_links"] });
    load();
  }

  async function clearLink(platform: string) {
    const row = rows.find((r) => r.platform === platform);
    if (!row?.id) {
      updateRow(platform, { url: "", is_visible: false });
      return;
    }
    if (!confirm(`Remove ${getSocialPlatform(platform)?.label ?? platform} link?`)) return;
    const { error } = await supabase
      .from("social_links")
      .update({ url: null, is_visible: false })
      .eq("id", row.id);
    if (error) return toast.error(error.message);
    toast.success("Link removed");
    queryClient.invalidateQueries({ queryKey: ["social_links"] });
    load();
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Social Links</h1>
      <p className="mt-1 text-muted-foreground">
        Manage all social profile URLs shown on the homepage hero and Contact page. Hidden or empty links are not displayed publicly.
      </p>

      <div className="glass mt-6 overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-medium">Platform</th>
                <th className="px-4 py-3 font-medium">URL</th>
                <th className="px-4 py-3 font-medium">Visible</th>
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">
                    Loading…
                  </td>
                </tr>
              ) : (
                rows.map((row) => {
                  const label = getSocialPlatform(row.platform)?.label ?? row.platform;
                  return (
                    <tr key={row.platform} className="border-b border-border/40 last:border-0 hover:bg-accent/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 font-medium">
                          <span className="inline-flex size-7 items-center justify-center rounded-md border border-border bg-background/60">
                            <PlatformIcon platform={row.platform} />
                          </span>
                          {label}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="url"
                          value={row.url}
                          onChange={(e) => updateRow(row.platform, { url: e.target.value })}
                          placeholder="https://…"
                          className="w-full min-w-[12rem] rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <label className="inline-flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={row.is_visible}
                            onChange={(e) => updateRow(row.platform, { is_visible: e.target.checked })}
                            className="size-4"
                          />
                          <span className="text-xs text-muted-foreground">{row.is_visible ? "Yes" : "No"}</span>
                        </label>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={row.display_order}
                          onChange={(e) =>
                            updateRow(row.platform, { display_order: Number(e.target.value) || 0 })
                          }
                          className="w-20 rounded-md border border-input bg-background/60 px-2 py-1.5 text-sm outline-none focus:border-primary"
                        />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => clearLink(row.platform)}
                          className="rounded-md border border-destructive/40 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10"
                        >
                          Clear
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          disabled={saving || loading}
          onClick={saveAll}
          className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save social links"}
        </button>
      </div>
    </div>
  );
}
