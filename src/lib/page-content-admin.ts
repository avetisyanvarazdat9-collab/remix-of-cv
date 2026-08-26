import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import type { PageContentI18n } from "@/lib/page-content";
import { fillMissingTranslationsFromEn } from "@/lib/translate";

export type PageContentRow = Tables<"page_content">;
export type PageContentTri = { hy: string; en: string; ru: string };

export const PAGE_CONTENT_LANG_TABS: { code: keyof PageContentTri; label: string }[] = [
  { code: "hy", label: "HY · Հայերեն" },
  { code: "en", label: "EN · English" },
  { code: "ru", label: "RU · Русский" },
];

export const EMPTY_PAGE_CONTENT_TRI: PageContentTri = { hy: "", en: "", ru: "" };

export type PageContentKeyDraft = {
  id?: string;
  page: string;
  key: string;
  description: string;
  i18n: PageContentTri;
};

export type PageContentEditorSection = {
  heading: string;
  keys: { key: string; label: string; description?: string }[];
};

export function normalizePageContentTri(raw: unknown): PageContentTri {
  const bag = (raw && typeof raw === "object" ? raw : {}) as PageContentI18n;
  return {
    hy: bag.hy ?? "",
    en: bag.en ?? "",
    ru: bag.ru ?? "",
  };
}

export function pageContentRowToDraft(row: PageContentRow): PageContentKeyDraft {
  return {
    id: row.id,
    page: row.page,
    key: row.key,
    description: row.description ?? "",
    i18n: normalizePageContentTri(row.i18n),
  };
}

export function emptyPageContentDraft(
  page: string,
  key: string,
  description = "",
): PageContentKeyDraft {
  return {
    page,
    key,
    description,
    i18n: { ...EMPTY_PAGE_CONTENT_TRI },
  };
}

export function pageContentDraftFilled(draft: PageContentKeyDraft, code: keyof PageContentTri) {
  return (draft.i18n[code] ?? "").trim().length > 0;
}

/** Insert or update one page_content row; returns saved row. */
export async function savePageContentDraft(draft: PageContentKeyDraft): Promise<PageContentRow> {
  const page = draft.page.trim();
  const key = draft.key.trim();
  if (!page || !key) throw new Error("Page and key are required");

  const i18n = await fillMissingTranslationsFromEn(draft.i18n);
  const payload = {
    page,
    key,
    description: draft.description.trim() || null,
    i18n,
  };

  if (draft.id) {
    const { data, error } = await supabase
      .from("page_content")
      .update(payload)
      .eq("id", draft.id)
      .select("*")
      .single();
    if (error) throw error;
    return data;
  }

  const { data, error } = await supabase
    .from("page_content")
    .insert(payload)
    .select("*")
    .single();
  if (error) throw error;
  return data;
}
