-- =====================================================================
-- Production fix: admin RLS on all CMS tables + storage bucket policies.
-- Run this ONCE in your external Supabase SQL editor (production project).
-- Safe to re-run: everything is idempotent.
-- =====================================================================

-- ---------- 1. Admin helper (SECURITY DEFINER; bypasses RLS on user_roles)
CREATE SCHEMA IF NOT EXISTS private;

CREATE OR REPLACE FUNCTION private.is_admin(_uid uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _uid AND role = 'admin'
  );
$$;

REVOKE ALL ON FUNCTION private.is_admin(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.is_admin(uuid) TO authenticated, service_role;

-- Ensure user_roles is readable by its owner (needed by the frontend guard)
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL    ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='user_roles' AND policyname='ur_select_own') THEN
    EXECUTE 'CREATE POLICY ur_select_own ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id)';
  END IF;
END $$;

-- ---------- 2. Apply admin-write RLS to every CMS table
DO $$
DECLARE
  t text;
  cms_tables text[] := ARRAY[
    'profile','home_content','navigation_menu','site_settings',
    'blog_posts','projects','courses','video_courses',
    'talks','companies','education','certifications',
    'skills','statistics','testimonials','international_experience',
    'messages','error_logs'
  ];
BEGIN
  FOREACH t IN ARRAY cms_tables LOOP
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name=t) THEN
      RAISE NOTICE 'skip %, table missing', t; CONTINUE;
    END IF;

    -- Grants (RLS still enforces per-row)
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);

    -- Drop old admin policies (if any prior migration created them under other names, they stay)
    EXECUTE format('DROP POLICY IF EXISTS admin_all ON public.%I', t);
    EXECUTE format(
      'CREATE POLICY admin_all ON public.%I FOR ALL TO authenticated
         USING (private.is_admin(auth.uid()))
         WITH CHECK (private.is_admin(auth.uid()))',
      t
    );
  END LOOP;
END $$;

-- ---------- 3. Public SELECT for visitor-facing tables
DO $$
DECLARE
  t text;
  public_read text[] := ARRAY[
    'profile','home_content','navigation_menu','site_settings',
    'blog_posts','projects','courses','video_courses',
    'talks','companies','education','certifications',
    'skills','statistics','testimonials','international_experience'
  ];
BEGIN
  FOREACH t IN ARRAY public_read LOOP
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name=t) THEN CONTINUE; END IF;
    EXECUTE format('GRANT SELECT ON public.%I TO anon', t);
    EXECUTE format('DROP POLICY IF EXISTS public_read ON public.%I', t);
    EXECUTE format('CREATE POLICY public_read ON public.%I FOR SELECT TO anon, authenticated USING (true)', t);
  END LOOP;
END $$;

-- ---------- 4. Contact messages: anyone may submit, only admin may read/manage
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='messages') THEN
    EXECUTE 'GRANT INSERT ON public.messages TO anon, authenticated';
    EXECUTE 'DROP POLICY IF EXISTS messages_insert_any ON public.messages';
    EXECUTE 'CREATE POLICY messages_insert_any ON public.messages FOR INSERT TO anon, authenticated WITH CHECK (true)';
  END IF;
END $$;

-- ---------- 5. Storage bucket "portfolio-assets"
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets','portfolio-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- storage.objects policies
DROP POLICY IF EXISTS portfolio_public_read  ON storage.objects;
DROP POLICY IF EXISTS portfolio_admin_insert ON storage.objects;
DROP POLICY IF EXISTS portfolio_admin_update ON storage.objects;
DROP POLICY IF EXISTS portfolio_admin_delete ON storage.objects;

CREATE POLICY portfolio_public_read ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'portfolio-assets');

CREATE POLICY portfolio_admin_insert ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'portfolio-assets' AND private.is_admin(auth.uid()));

CREATE POLICY portfolio_admin_update ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'portfolio-assets' AND private.is_admin(auth.uid()))
  WITH CHECK (bucket_id = 'portfolio-assets' AND private.is_admin(auth.uid()));

CREATE POLICY portfolio_admin_delete ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'portfolio-assets' AND private.is_admin(auth.uid()));

-- =====================================================================
-- Done. After running: hard-refresh /admin on production.
-- =====================================================================
