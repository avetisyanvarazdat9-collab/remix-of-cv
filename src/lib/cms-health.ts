import { supabase } from "@/integrations/supabase/client";

export type HealthIssue = {
  key: string;
  label: string;
  severity: "missing" | "empty";
};

export type HealthResult = {
  healthy: boolean;
  issues: HealthIssue[];
};

const REQUIRED_TABLES = [
  "profile",
  "navigation_menu",
  "home_content",
  "site_settings",
  "courses",
  "video_courses",
  "blog_posts",
  "projects",
  "companies",
  "skills",
  "education",
  "certifications",
  "talks",
  "statistics",
  "user_roles",
] as const;

const SINGLETON_TABLES = ["profile", "home_content", "site_settings"] as const;

export async function checkCmsHealth(): Promise<HealthResult> {
  const issues: HealthIssue[] = [];

  // Table presence + row counts in parallel.
  const probes = await Promise.all(
    REQUIRED_TABLES.map(async (t) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { count, error } = await (supabase as any)
        .from(t)
        .select("*", { count: "exact", head: true });
      return { t, count: count ?? 0, error };
    }),
  );

  for (const p of probes) {
    if (p.error) {
      issues.push({ key: `table:${p.t}`, label: `Missing table: ${p.t}`, severity: "missing" });
      continue;
    }
    if ((SINGLETON_TABLES as readonly string[]).includes(p.t) && p.count === 0) {
      issues.push({ key: `empty:${p.t}`, label: `Empty singleton: ${p.t}`, severity: "empty" });
    }
    if (p.t === "navigation_menu" && p.count === 0) {
      issues.push({ key: "empty:navigation_menu", label: "No navigation items", severity: "empty" });
    }
  }

  // Storage bucket probe.
  try {
    const { error } = await supabase.storage.from("portfolio-assets").list("", { limit: 1 });
    if (error) {
      issues.push({ key: "bucket:portfolio-assets", label: "Missing storage bucket: portfolio-assets", severity: "missing" });
    }
  } catch {
    issues.push({ key: "bucket:portfolio-assets", label: "Missing storage bucket: portfolio-assets", severity: "missing" });
  }

  return { healthy: issues.length === 0, issues };
}

export async function runInitCms(): Promise<{ ok: boolean; error?: string; steps?: unknown }> {
  const { data, error } = await supabase.functions.invoke("init-cms", { body: {} });
  if (error) {
    // Try to surface the function's JSON error body if present.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const detail = (error as any)?.context?.body ?? error.message;
    return { ok: false, error: typeof detail === "string" ? detail : JSON.stringify(detail) };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payload = data as any;
  if (!payload?.ok) return { ok: false, error: payload?.error ?? "Unknown error", steps: payload?.steps };
  return { ok: true, steps: payload?.steps };
}
