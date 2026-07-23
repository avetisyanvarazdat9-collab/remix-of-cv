import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { absoluteUrl, escapeXml, STATIC_SITEMAP_PATHS } from "@/lib/seo";

type SitemapEntry = { loc: string; lastmod?: string };

function getServerClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

function formatLastmod(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString().slice(0, 10);
}

function urlEntry(entry: SitemapEntry): string {
  const lastmod = entry.lastmod ? `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>` : "";
  return `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>${lastmod}\n  </url>`;
}

export async function buildSitemapXml(): Promise<string> {
  const entries: SitemapEntry[] = STATIC_SITEMAP_PATHS.map((path) => ({
    loc: absoluteUrl(path),
  }));

  try {
    const supabase = getServerClient();

    const [blog, courses, projects, videos] = await Promise.all([
      supabase
        .from("blog_posts")
        .select("slug, updated_at, published_at")
        .eq("is_published", true),
      supabase
        .from("courses")
        .select("slug, updated_at")
        .eq("is_visible", true),
      supabase
        .from("projects")
        .select("slug, updated_at")
        .eq("is_visible", true),
      supabase
        .from("video_courses")
        .select("slug, updated_at")
        .eq("is_visible", true),
    ]);

    for (const row of blog.data ?? []) {
      if (!row.slug) continue;
      entries.push({
        loc: absoluteUrl(`/blog/${row.slug}`),
        lastmod: formatLastmod(row.updated_at ?? row.published_at),
      });
    }

    for (const row of courses.data ?? []) {
      if (!row.slug) continue;
      entries.push({
        loc: absoluteUrl(`/courses/${row.slug}`),
        lastmod: formatLastmod(row.updated_at),
      });
    }

    for (const row of projects.data ?? []) {
      if (!row.slug) continue;
      entries.push({
        loc: absoluteUrl(`/projects/${row.slug}`),
        lastmod: formatLastmod(row.updated_at),
      });
    }

    for (const row of videos.data ?? []) {
      if (!row.slug) continue;
      entries.push({
        loc: absoluteUrl(`/video-courses/${row.slug}`),
        lastmod: formatLastmod(row.updated_at),
      });
    }
  } catch {
    // Static URLs remain valid if dynamic fetch fails.
  }

  const unique = new Map<string, SitemapEntry>();
  for (const entry of entries) unique.set(entry.loc, entry);

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...unique.values()].map(urlEntry).join("\n")}
</urlset>`;
}

export function buildRobotsTxt(): string {
  return `User-agent: *
Allow: /

Disallow: /admin
Disallow: /auth
Disallow: /auth-status
Disallow: /mcp
Disallow: /.well-known/
Disallow: /.mcp/
Disallow: /.lovable/

Sitemap: ${absoluteUrl("/sitemap.xml")}
`;
}
