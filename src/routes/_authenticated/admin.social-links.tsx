import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { AdminSearchField } from "@/components/admin/AdminSearchField";
import { textMatchesAdminSearch } from "@/lib/admin-search";
import {
  SOCIAL_PLATFORMS,
  getSocialPlatform,
  isValidSocialUrl,
  normalizeSocialUrl,
} from "@/lib/social-platforms";

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

function defaultRows(): EditableRow[] {
  return SOCIAL_PLATFORMS.map((p) => ({
    platform: p.id,
    url: "",
    is_visible: false,
    display_order: p.defaultOrder,
  }));
}

function mergeRows(data: Row[] | null): EditableRow[] {
  const byPlatform = new Map((data ?? []).map((r) => [r.platform, r]));
  return SOCIAL_PLATFORMS.map((p) => {
    const existing = byPlatform.get(p.id);
    return {
      id: existing?.id,
      platform: p.id,
      url: existing?.url ?? "",
      is_visible: existing?.is_visible ?? false,
      display_order: existing?.display_order ?? p.defaultOrder,
    };
  });
}

function PlatformIcon({ platform }: { platform: string }) {
  const config = getSocialPlatform(platform);
  if (!config) return null;
  const Icon = config.icon;
  if (Icon) return <Icon className="size-4 text-primary" />;
  return <span className="text-[10px] font-semibold text-primary">{config.glyph}</span>;
}

function SocialLinksAdmin() {
  const [rows, setRows] = useState<EditableRow[]>(defaultRows);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingPlatform, setSavingPlatform] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const filteredRows = useMemo(() => {
    if (!search.trim()) return rows;
    return rows.filter((row) => {
      const label = getSocialPlatform(row.platform)?.label ?? row.platform;
      return textMatchesAdminSearch([label, row.platform, row.url], search);
    });
  }, [rows, search]);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const { data, error } = await supabase.from("social_links").select("*").order("display_order");
      if (error) {
        setLoadError(error.message);
        toast.error(error.message);
        setRows(defaultRows());
        return;
      }
      setRows(mergeRows(data as Row[]));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load social links";
      setLoadError(message);
      toast.error(message);
      setRows(defaultRows());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function updateRow(platform: string, patch: Partial<EditableRow>) {
    setRows((prev) => prev.map((r) => (r.platform === platform ? { ...r, ...patch } : r)));
  }

  function validateRow(row: EditableRow): string | null {
    const trimmed = row.url.trim();
    if (trimmed && !isValidSocialUrl(normalizeSocialUrl(trimmed))) {
      return `Invalid URL for ${getSocialPlatform(row.platform)?.label ?? row.platform}`;
    }
    return null;
  }

  async function persistRow(row: EditableRow): Promise<boolean> {
    const validationError = validateRow(row);
    if (validationError) {
      toast.error(validationError);
      return false;
    }

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
        toast.error(error.message);
        return false;
      }
      return true;
    }

    const { data, error } = await supabase.from("social_links").insert(payload).select("*").single();
    if (error) {
      toast.error(error.message);
      return false;
    }
    updateRow(row.platform, { id: (data as Row).id });
    return true;
  }

  async function saveRow(platform: string) {
    const row = rows.find((r) => r.platform === platform);
    if (!row) return;
    setSavingPlatform(platform);
    const ok = await persistRow(row);
    setSavingPlatform(null);
    if (ok) {
      toast.success(`${getSocialPlatform(platform)?.label ?? platform} saved`);
      queryClient.invalidateQueries({ queryKey: ["social_links"] });
      await load();
    }
  }

  async function saveAll() {
    for (const row of rows) {
      const validationError = validateRow(row);
      if (validationError) {
        toast.error(validationError);
        return;
      }
    }

    setSaving(true);
    for (const row of rows) {
      const ok = await persistRow(row);
      if (!ok) {
        setSaving(false);
        return;
      }
    }
    setSaving(false);
    toast.success("Social links saved");
    queryClient.invalidateQueries({ queryKey: ["social_links"] });
    await load();
  }

  async function clearLink(platform: string) {
    const row = rows.find((r) => r.platform === platform);
    if (!row) return;

    if (!row.id) {
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
    await load();
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Social Links</h1>
      <p className="mt-1 text-muted-foreground">
        Manage all social profile URLs shown on the homepage hero and Contact page. Hidden or empty links are not displayed publicly.
      </p>

      {loadError && (
        <div className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <p className="font-medium">Could not load social links from Supabase.</p>
          <p className="mt-1">{loadError}</p>
          <p className="mt-2 text-xs opacity-90">
            If the table is missing, apply migration <code className="rounded bg-background/60 px-1">20260726193000_create_social_links.sql</code>.
          </p>
          <button
            type="button"
            onClick={() => void load()}
            className="mt-3 rounded-md border border-current/30 px-3 py-1 text-xs font-medium hover:bg-current/10"
          >
            Retry
          </button>
        </div>
      )}

      <div className="mt-6">
        <AdminSearchField
          value={search}
          onChange={setSearch}
          placeholder="Search platform or URL…"
        />
      </div>

      <div className="glass mt-4 overflow-hidden rounded-2xl">
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
              ) : filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">
                    {search.trim()
                      ? "No results found. Try a different search term."
                      : "No social platforms configured."}
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => {
                  const label = getSocialPlatform(row.platform)?.label ?? row.platform;
                  const isSavingRow = savingPlatform === row.platform;
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
                        <div className="inline-flex gap-2">
                          <button
                            type="button"
                            disabled={isSavingRow || saving}
                            onClick={() => void saveRow(row.platform)}
                            className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-accent disabled:opacity-60"
                          >
                            {isSavingRow ? "Saving…" : "Save"}
                          </button>
                          <button
                            type="button"
                            disabled={isSavingRow || saving}
                            onClick={() => void clearLink(row.platform)}
                            className="rounded-md border border-destructive/40 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10 disabled:opacity-60"
                          >
                            Clear
                          </button>
                        </div>
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
          onClick={() => void saveAll()}
          className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save all social links"}
        </button>
      </div>
    </div>
  );
}
