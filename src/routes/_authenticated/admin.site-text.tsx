import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { AdminSearchField } from "@/components/admin/AdminSearchField";
import { textMatchesAdminSearch } from "@/lib/admin-search";
import type { PageContentI18n } from "@/lib/page-content";
import { fillMissingTranslationsFromEn } from "@/lib/translate";

export const Route = createFileRoute("/_authenticated/admin/site-text")({
  head: () => ({ meta: [{ title: "Site Text Admin" }] }),
  component: SiteTextAdmin,
});

type Row = Tables<"page_content">;
type Tri = { hy: string; en: string; ru: string };

type Draft = {
  page: string;
  key: string;
  description: string;
  i18n: Tri;
};

const EMPTY_TRI: Tri = { hy: "", en: "", ru: "" };

/** page_content pages with a dedicated admin editor — hidden from this flat list */
const MANAGED_ELSEWHERE = ["home"];

function isPageManagedElsewhere(page: string) {
  return MANAGED_ELSEWHERE.includes(page.trim().toLowerCase());
}

const LANG_TABS: { code: keyof Tri; label: string }[] = [
  { code: "hy", label: "HY · Հայերեն" },
  { code: "en", label: "EN · English" },
  { code: "ru", label: "RU · Русский" },
];

function normalizeTri(raw: unknown): Tri {
  const bag = (raw && typeof raw === "object" ? raw : {}) as PageContentI18n;
  return {
    hy: bag.hy ?? "",
    en: bag.en ?? "",
    ru: bag.ru ?? "",
  };
}

function rowToDraft(row: Row): Draft {
  return {
    page: row.page,
    key: row.key,
    description: row.description ?? "",
    i18n: normalizeTri(row.i18n),
  };
}

function draftFilled(draft: Draft, code: keyof Tri) {
  return (draft.i18n[code] ?? "").trim().length > 0;
}

function SiteTextAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [activeLang, setActiveLang] = useState<keyof Tri>("en");
  const [expandedPages, setExpandedPages] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newDraft, setNewDraft] = useState<Draft>({
    page: "",
    key: "",
    description: "",
    i18n: { ...EMPTY_TRI },
  });

  const loadRows = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("page_content")
      .select("*")
      .order("page")
      .order("key");
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    const list = data ?? [];
    setRows(list);
    setDrafts(Object.fromEntries(list.map((row) => [row.id, rowToDraft(row)])));
    setExpandedPages((prev) => {
      const next = new Set(prev);
      for (const row of list) next.add(row.page);
      return next;
    });
  }, []);

  useEffect(() => {
    void loadRows();
  }, [loadRows]);

  const filteredRows = useMemo(() => {
    const q = search.trim();
    if (!q) return rows;
    return rows.filter((row) => {
      const draft = drafts[row.id];
      return (
        textMatchesAdminSearch(row.page, q) ||
        textMatchesAdminSearch(row.key, q) ||
        textMatchesAdminSearch(row.description ?? "", q) ||
        textMatchesAdminSearch(draft?.i18n.hy ?? "", q) ||
        textMatchesAdminSearch(draft?.i18n.en ?? "", q) ||
        textMatchesAdminSearch(draft?.i18n.ru ?? "", q)
      );
    });
  }, [rows, drafts, search]);

  const listableRows = useMemo(
    () => filteredRows.filter((row) => !isPageManagedElsewhere(row.page)),
    [filteredRows],
  );

  const grouped = useMemo(() => {
    const map = new Map<string, Row[]>();
    for (const row of listableRows) {
      const list = map.get(row.page) ?? [];
      list.push(row);
      map.set(row.page, list);
    }
    return [...map.entries()]
      .filter(([page]) => !isPageManagedElsewhere(page))
      .sort(([a], [b]) => a.localeCompare(b));
  }, [listableRows]);

  function togglePage(page: string) {
    setExpandedPages((prev) => {
      const next = new Set(prev);
      if (next.has(page)) next.delete(page);
      else next.add(page);
      return next;
    });
  }

  function updateDraft(id: string, patch: Partial<Draft>) {
    setDrafts((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...patch },
    }));
  }

  function updateDraftI18n(id: string, code: keyof Tri, value: string) {
    setDrafts((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        i18n: { ...prev[id].i18n, [code]: value },
      },
    }));
  }

  async function saveRow(id: string) {
    const draft = drafts[id];
    if (!draft) return;
    const page = draft.page.trim();
    const key = draft.key.trim();
    if (!page || !key) return toast.error("Page and key are required");

    setSavingId(id);
    const i18n = await fillMissingTranslationsFromEn(draft.i18n);
    const { data, error } = await supabase
      .from("page_content")
      .update({
        page,
        key,
        description: draft.description.trim() || null,
        i18n,
      })
      .eq("id", id)
      .select("*")
      .single();
    setSavingId(null);
    if (error) return toast.error(error.message);

    setRows((prev) => prev.map((row) => (row.id === id ? data : row)));
    setDrafts((prev) => ({ ...prev, [id]: rowToDraft(data) }));
    toast.success("Saved");
  }

  async function deleteRow(id: string) {
    if (!window.confirm("Delete this text entry? This cannot be undone.")) return;
    setDeletingId(id);
    const { error } = await supabase.from("page_content").delete().eq("id", id);
    setDeletingId(null);
    if (error) return toast.error(error.message);
    setRows((prev) => prev.filter((row) => row.id !== id));
    setDrafts((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    toast.success("Deleted");
  }

  async function addRow(e: React.FormEvent) {
    e.preventDefault();
    const page = newDraft.page.trim();
    const key = newDraft.key.trim();
    if (!page || !key) return toast.error("Page and key are required");

    setAdding(true);
    const i18n = await fillMissingTranslationsFromEn(newDraft.i18n);
    const { data, error } = await supabase
      .from("page_content")
      .insert({
        page,
        key,
        description: newDraft.description.trim() || null,
        i18n,
      })
      .select("*")
      .single();
    setAdding(false);
    if (error) return toast.error(error.message);

    setRows((prev) => [...prev, data].sort((a, b) => a.page.localeCompare(b.page) || a.key.localeCompare(b.key)));
    setDrafts((prev) => ({ ...prev, [data.id]: rowToDraft(data) }));
    setExpandedPages((prev) => new Set(prev).add(data.page));
    setNewDraft({ page: "", key: "", description: "", i18n: { ...EMPTY_TRI } });
    setShowAdd(false);
    toast.success("Entry added");
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Site Text</h1>
          <p className="mt-1 max-w-2xl text-muted-foreground">
            Manage reusable UI copy for pages that don&apos;t yet have a dedicated admin section. Homepage content is managed under Homepage.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAdd((v) => !v)}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          <Plus className="size-4" />
          Add new
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-1">
        {LANG_TABS.map((t) => {
          const filled = listableRows.some((row) => draftFilled(drafts[row.id] ?? rowToDraft(row), t.code));
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
              {!filled && listableRows.length > 0 && <span className="ml-1 text-destructive">•</span>}
            </button>
          );
        })}
      </div>

      {showAdd && (
        <form onSubmit={addRow} className="glass mt-6 grid gap-4 rounded-2xl p-6 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Page</label>
            <input
              type="text"
              value={newDraft.page}
              onChange={(e) => setNewDraft((d) => ({ ...d, page: e.target.value }))}
              placeholder="home, about, global…"
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Key</label>
            <input
              type="text"
              value={newDraft.key}
              onChange={(e) => setNewDraft((d) => ({ ...d, key: e.target.value }))}
              placeholder="hero.subtitle"
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 font-mono text-sm outline-none focus:border-primary"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Description</label>
            <input
              type="text"
              value={newDraft.description}
              onChange={(e) => setNewDraft((d) => ({ ...d, description: e.target.value }))}
              placeholder="Where this text appears on the site"
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
              Text ({LANG_TABS.find((t) => t.code === activeLang)?.label})
            </label>
            <textarea
              rows={3}
              value={newDraft.i18n[activeLang]}
              onChange={(e) =>
                setNewDraft((d) => ({
                  ...d,
                  i18n: { ...d.i18n, [activeLang]: e.target.value },
                }))
              }
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="flex justify-end gap-2 sm:col-span-2">
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="rounded-md border border-border px-4 py-2 text-sm text-muted-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={adding}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
            >
              {adding ? "Translating & saving…" : "Add entry"}
            </button>
          </div>
        </form>
      )}

      <div className="mt-6">
        <AdminSearchField
          value={search}
          onChange={setSearch}
          placeholder="Search page, key, description, or text…"
        />
      </div>

      {loading ? (
        <p className="mt-8 text-muted-foreground">Loading…</p>
      ) : grouped.length === 0 ? (
        <p className="mt-8 text-muted-foreground">
          {search.trim() ? "No matching entries." : "No site text entries yet. Click “Add new” to create one."}
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {grouped.map(([page, pageRows]) => {
            const expanded = expandedPages.has(page);
            return (
              <section key={page} className="glass overflow-hidden rounded-2xl">
                <button
                  type="button"
                  onClick={() => togglePage(page)}
                  className="flex w-full items-center gap-2 px-5 py-4 text-left"
                >
                  {expanded ? (
                    <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                  )}
                  <span className="font-display font-semibold">{page}</span>
                  <span className="text-xs text-muted-foreground">({pageRows.length})</span>
                </button>

                {expanded && (
                  <div className="space-y-4 border-t border-border/60 px-5 py-4">
                    {pageRows.map((row) => {
                      const draft = drafts[row.id] ?? rowToDraft(row);
                      return (
                        <div key={row.id} className="rounded-xl border border-border/60 bg-background/30 p-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Page</label>
                              <input
                                type="text"
                                value={draft.page}
                                onChange={(e) => updateDraft(row.id, { page: e.target.value })}
                                className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Key</label>
                              <input
                                type="text"
                                value={draft.key}
                                onChange={(e) => updateDraft(row.id, { key: e.target.value })}
                                className="w-full rounded-md border border-input bg-background/60 px-3 py-2 font-mono text-sm outline-none focus:border-primary"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Description</label>
                              <input
                                type="text"
                                value={draft.description}
                                onChange={(e) => updateDraft(row.id, { description: e.target.value })}
                                className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
                                Text ({LANG_TABS.find((t) => t.code === activeLang)?.label})
                              </label>
                              <textarea
                                rows={3}
                                value={draft.i18n[activeLang]}
                                onChange={(e) => updateDraftI18n(row.id, activeLang, e.target.value)}
                                className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
                              />
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => void deleteRow(row.id)}
                              disabled={deletingId === row.id}
                              className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10 disabled:opacity-60"
                            >
                              <Trash2 className="size-3.5" />
                              {deletingId === row.id ? "Deleting…" : "Delete"}
                            </button>
                            <button
                              type="button"
                              onClick={() => void saveRow(row.id)}
                              disabled={savingId === row.id}
                              className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
                            >
                              {savingId === row.id ? "Translating & saving…" : "Save"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
