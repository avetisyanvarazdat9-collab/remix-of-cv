import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const SELECT_COLUMNS =
  "id,title,organization,location,country_code,lat,lng,category,event_date,description,url,i18n";

function getClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export type IntlFilters = {
  category?: string | null;
  fromYear?: number | null;
  toYear?: number | null;
};

export const getInternationalExperience = createServerFn({ method: "GET" })
  .inputValidator((input: IntlFilters) => ({
    category: input?.category ?? null,
    fromYear: input?.fromYear ?? null,
    toYear: input?.toYear ?? null,
  }))
  .handler(async ({ data }) => {
    const supabase = getClient();
    let q = supabase
      .from("international_experience")
      .select(SELECT_COLUMNS)
      .eq("is_visible", true)
      .order("event_date", { ascending: false, nullsFirst: false });

    if (data.category) q = q.eq("category", data.category);
    if (data.fromYear !== null) q = q.gte("event_date", `${data.fromYear}-01-01`);
    if (data.toYear !== null) q = q.lte("event_date", `${data.toYear}-12-31`);

    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return (rows ?? []) as Array<Record<string, unknown>>;
  });

export const getInternationalExperienceFacets = createServerFn({ method: "GET" }).handler(
  async () => {
    const supabase = getClient();
    const { data, error } = await supabase
      .from("international_experience")
      .select("category,event_date")
      .eq("is_visible", true);
    if (error) throw new Error(error.message);

    const rows = (data ?? []) as Array<{ category: string | null; event_date: string | null }>;
    const categories = Array.from(
      new Set(rows.map((r) => r.category).filter((c): c is string => !!c)),
    ).sort();
    const years = Array.from(
      new Set(
        rows
          .map((r) => (r.event_date ? new Date(r.event_date).getFullYear() : null))
          .filter((y): y is number => y !== null),
      ),
    ).sort((a, b) => b - a);

    return { categories, years, total: rows.length };
  },
);
