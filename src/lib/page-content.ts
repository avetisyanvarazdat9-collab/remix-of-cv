import { queryOptions, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useLang, type Lang } from "@/lib/i18n";

export type PageContentRow = Tables<"page_content">;
export type PageContentI18n = { hy?: string; en?: string; ru?: string };

/** Same fallback chain as `localized()` for a flat { hy, en, ru } bag. */
export function resolvePageContentString(
  bag: PageContentI18n | null | undefined,
  lang: Lang,
  fallback: string,
): string {
  if (bag) {
    const v = bag[lang] ?? bag.en ?? bag.hy ?? bag.ru;
    if (v && String(v).trim() !== "") return v;
  }
  return fallback;
}

export function pageContentQuery(page: string) {
  return queryOptions({
    queryKey: ["page_content", page] as const,
    queryFn: async (): Promise<PageContentRow[]> => {
      const { data, error } = await supabase
        .from("page_content")
        .select("*")
        .eq("page", page)
        .order("key");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function usePageContent(page: string) {
  const { lang } = useLang();
  const { data: rows = [], isLoading, error } = useQuery(pageContentQuery(page));

  const pc = useMemo(() => {
    const byKey = new Map(rows.map((row) => [row.key, row]));
    return (key: string, fallback: string) => {
      const row = byKey.get(key);
      const bag = (row?.i18n ?? {}) as PageContentI18n;
      return resolvePageContentString(bag, lang, fallback);
    };
  }, [rows, lang]);

  return { pc, rows, isLoading, error };
}
