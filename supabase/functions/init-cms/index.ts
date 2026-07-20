// init-cms — idempotent CMS initializer.
// Creates tables, columns, indexes, triggers, RLS policies, storage bucket,
// storage policies, and inserts singleton + default navigation rows.
// Safe to call any number of times.

import postgres from "https://deno.land/x/postgresjs@v3.4.4/mod.js";
import { SCHEMA_SQL } from "./schema.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const DEFAULT_NAV = [
  { path: "/", en: "Home", hy: "Գլխավոր", ru: "Главная" },
  { path: "/about", en: "About", hy: "Իմ մասին", ru: "Обо мне" },
  { path: "/courses", en: "Courses", hy: "Դասընթացներ", ru: "Курсы" },
  { path: "/video-courses", en: "Video Courses", hy: "Վիդեո դասընթացներ", ru: "Видеокурсы" },
  { path: "/talks", en: "Talks & Events", hy: "Ելույթներ", ru: "Выступления" },
  { path: "/blog", en: "Blog", hy: "Բլոգ", ru: "Блог" },
  { path: "/projects", en: "Projects", hy: "Նախագծեր", ru: "Проекты" },
  { path: "/companies", en: "Companies", hy: "Ընկերություններ", ru: "Компании" },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: CORS });
  }

  const steps: { step: string; ok: boolean; detail?: string }[] = [];
  const push = (step: string, ok: boolean, detail?: string) =>
    steps.push({ step, ok, ...(detail ? { detail } : {}) });

  const dbUrl = Deno.env.get("SUPABASE_DB_URL");
  if (!dbUrl) {
    return new Response(
      JSON.stringify({ ok: false, error: "SUPABASE_DB_URL not set" }),
      { status: 500, headers: { ...CORS, "Content-Type": "application/json" } },
    );
  }

  let sql: ReturnType<typeof postgres> | null = null;
  try {
    sql = postgres(dbUrl, { prepare: false, max: 1, idle_timeout: 5 });

    // 1) Run the full idempotent schema/RLS/storage migration.
    try {
      await sql.unsafe(SCHEMA_SQL);
      push("schema", true);
    } catch (e) {
      push("schema", false, (e as Error).message);
      throw e;
    }

    // 2) Seed default navigation rows if the table is empty for that path.
    let navInserted = 0;
    for (let i = 0; i < DEFAULT_NAV.length; i++) {
      const n = DEFAULT_NAV[i];
      const res = await sql`
        INSERT INTO public.navigation_menu
          (path, label, label_en, label_hy, label_ru, order_index, is_visible)
        SELECT ${n.path}, ${n.en}, ${n.en}, ${n.hy}, ${n.ru}, ${i}, true
        WHERE NOT EXISTS (
          SELECT 1 FROM public.navigation_menu WHERE path = ${n.path}
        )
        RETURNING id
      `;
      navInserted += res.length;
    }
    push("navigation_seed", true, `${navInserted} inserted`);

    // 3) Ensure singleton profile row.
    const prof = await sql`
      INSERT INTO public.profile (name, title)
      SELECT '', ''
      WHERE NOT EXISTS (SELECT 1 FROM public.profile)
      RETURNING id
    `;
    push("profile_singleton", true, prof.length ? "created" : "exists");

    // 4) home_content + site_settings singletons (SQL migration already does
    //    INSERT ... ON CONFLICT DO NOTHING; nothing more needed here).
    push("singletons", true);

    // 5) Bootstrap: if there is no admin yet, promote the caller (via JWT sub).
    const admins = await sql`SELECT 1 FROM public.user_roles WHERE role='admin' LIMIT 1`;
    if (admins.length === 0) {
      const authz = req.headers.get("authorization") || "";
      const token = authz.replace(/^Bearer\s+/i, "");
      let sub: string | null = null;
      try {
        const parts = token.split(".");
        if (parts.length === 3) {
          const payload = JSON.parse(
            atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")),
          );
          sub = payload?.sub ?? null;
        }
      } catch { /* ignore */ }
      if (sub) {
        await sql`
          INSERT INTO public.user_roles (user_id, role)
          VALUES (${sub}::uuid, 'admin')
          ON CONFLICT (user_id, role) DO NOTHING
        `;
        push("bootstrap_admin", true, sub);
      } else {
        push("bootstrap_admin", false, "no caller JWT — sign in and re-run");
      }
    } else {
      push("bootstrap_admin", true, "admin already exists");
    }

    return new Response(
      JSON.stringify({ ok: true, steps }),
      { headers: { ...CORS, "Content-Type": "application/json" } },
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ ok: false, error: (e as Error).message, steps }),
      { status: 500, headers: { ...CORS, "Content-Type": "application/json" } },
    );
  } finally {
    try { await sql?.end({ timeout: 3 }); } catch { /* ignore */ }
  }
});
