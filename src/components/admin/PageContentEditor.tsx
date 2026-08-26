import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  emptyPageContentDraft,
  pageContentDraftFilled,
  pageContentRowToDraft,
  PAGE_CONTENT_LANG_TABS,
  savePageContentDraft,
  type PageContentEditorSection,
  type PageContentKeyDraft,
  type PageContentTri,
} from "@/lib/page-content-admin";
import { pageContentQuery } from "@/lib/page-content";

export type { PageContentEditorSection };

type Props = {
  page: string;
  sections: PageContentEditorSection[];
};

export function PageContentEditor({ page, sections }: Props) {
  const queryClient = useQueryClient();
  const { data: rows = [], isLoading } = useQuery(pageContentQuery(page));
  const [drafts, setDrafts] = useState<Record<string, PageContentKeyDraft>>({});
  const [activeLang, setActiveLang] = useState<keyof PageContentTri>("en");
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(sections.map((s) => s.heading)));
  const [savingKey, setSavingKey] = useState<string | null>(null);

  const rowsByKey = useMemo(() => new Map(rows.map((row) => [row.key, row])), [rows]);

  const syncDrafts = useCallback(() => {
    const next: Record<string, PageContentKeyDraft> = {};
    for (const section of sections) {
      for (const def of section.keys) {
        const row = rowsByKey.get(def.key);
        if (row) {
          next[def.key] = pageContentRowToDraft(row);
        } else {
          next[def.key] = emptyPageContentDraft(page, def.key, def.description ?? def.label);
        }
      }
    }
    setDrafts(next);
  }, [page, rowsByKey, sections]);

  useEffect(() => {
    syncDrafts();
  }, [syncDrafts]);

  function toggleSection(heading: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(heading)) next.delete(heading);
      else next.add(heading);
      return next;
    });
  }

  function updateDraftI18n(key: string, code: keyof PageContentTri, value: string) {
    setDrafts((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        i18n: { ...prev[key].i18n, [code]: value },
      },
    }));
  }

  async function saveKey(key: string) {
    const draft = drafts[key];
    if (!draft) return;

    setSavingKey(key);
    try {
      const saved = await savePageContentDraft(draft);
      setDrafts((prev) => ({ ...prev, [key]: pageContentRowToDraft(saved) }));
      await queryClient.invalidateQueries({ queryKey: ["page_content", page] });
      toast.success("Saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSavingKey(null);
    }
  }

  const allDrafts = Object.values(drafts);

  return (
    <div className="mt-8 space-y-4">
      <div>
        <h2 className="font-display text-lg font-semibold">Site text (page content)</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Copy shown on the public homepage via the page_content CMS. Save each row individually.
        </p>
      </div>

      <div className="flex flex-wrap gap-1">
        {PAGE_CONTENT_LANG_TABS.map((t) => {
          const filled = allDrafts.some((d) => pageContentDraftFilled(d, t.code));
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
              {!filled && allDrafts.length > 0 && <span className="ml-1 text-destructive">•</span>}
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading site text…</p>
      ) : (
        sections.map((section) => {
          const open = expanded.has(section.heading);
          return (
            <section key={section.heading} className="glass overflow-hidden rounded-2xl">
              <button
                type="button"
                onClick={() => toggleSection(section.heading)}
                className="flex w-full items-center gap-2 px-5 py-4 text-left"
              >
                {open ? (
                  <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
                ) : (
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                )}
                <span className="font-display font-semibold">{section.heading}</span>
                <span className="text-xs text-muted-foreground">({section.keys.length})</span>
              </button>

              {open && (
                <div className="space-y-4 border-t border-border/60 px-5 py-4">
                  {section.keys.map((def) => {
                    const draft = drafts[def.key] ?? emptyPageContentDraft(page, def.key, def.label);
                    return (
                      <div
                        key={def.key}
                        className="rounded-xl border border-border/60 bg-background/30 p-4"
                      >
                        <label className="mb-2 block text-sm font-medium text-foreground">
                          {def.label}
                        </label>
                        <textarea
                          rows={3}
                          value={draft.i18n[activeLang]}
                          onChange={(e) => updateDraftI18n(def.key, activeLang, e.target.value)}
                          className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                        <div className="mt-3 flex items-center justify-between gap-2">
                          <span className="font-mono text-[10px] text-muted-foreground">{def.key}</span>
                          <button
                            type="button"
                            onClick={() => void saveKey(def.key)}
                            disabled={savingKey === def.key}
                            className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
                          >
                            {savingKey === def.key ? "Translating & saving…" : "Save"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })
      )}
    </div>
  );
}
