-- =====================================================================
-- Production fix: admin RLS on all CMS tables + storage bucket policies.
-- No function dependencies (no private.is_admin / private.has_role).
-- Every policy inlines an EXISTS check against public.user_roles.
-- Run in Supabase SQL editor. Idempotent; safe to re-run.
-- =====================================================================

-- ---------- 0. user_roles must be readable by its owner ----------
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL    ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='user_roles' AND policyname='ur_select_own') THEN
    EXECUTE 'CREATE POLICY ur_select_own ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id)';
  END IF;
END $$;

-- ---------- 1. Drop any policy that referenced the missing helpers ----------
-- These policies were created by earlier migrations that assumed
-- private.is_admin() or private.has_role() existed. Drop them so the fresh
-- inline policies below can be created cleanly.
DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname IN ('public','storage')
      AND (
        qual        LIKE '%private.is_admin%' OR with_check LIKE '%private.is_admin%'
     OR qual        LIKE '%private.has_role%' OR with_check LIKE '%private.has_role%'
     OR qual        LIKE '%public.has_role%'  OR with_check LIKE '%public.has_role%'
      )
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', r.policyname, r.schemaname, r.tablename);
  END LOOP;
END $$;

-- ---------- 2. Apply admin-write RLS to every CMS table ----------
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

    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);

    EXECUTE format('DROP POLICY IF EXISTS admin_all ON public.%I', t);
    EXECUTE format($f$
      CREATE POLICY admin_all ON public.%I
        FOR ALL TO authenticated
        USING      (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
        WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
    $f$, t);
  END LOOP;
END $$;

-- ---------- 3. Public SELECT for visitor-facing tables ----------
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

-- ---------- 4. Contact messages: anyone may submit ----------
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='messages') THEN
    EXECUTE 'GRANT INSERT ON public.messages TO anon, authenticated';
    EXECUTE 'DROP POLICY IF EXISTS messages_insert_any ON public.messages';
    EXECUTE 'CREATE POLICY messages_insert_any ON public.messages FOR INSERT TO anon, authenticated WITH CHECK (true)';
  END IF;
END $$;

-- ---------- 5. Storage bucket "portfolio-assets" ----------
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets','portfolio-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS portfolio_public_read  ON storage.objects;
DROP POLICY IF EXISTS portfolio_admin_insert ON storage.objects;
DROP POLICY IF EXISTS portfolio_admin_update ON storage.objects;
DROP POLICY IF EXISTS portfolio_admin_delete ON storage.objects;

CREATE POLICY portfolio_public_read ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'portfolio-assets');

CREATE POLICY portfolio_admin_insert ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'portfolio-assets'
    AND EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')
  );

CREATE POLICY portfolio_admin_update ON storage.objects
  FOR UPDATE TO authenticated
  USING      (bucket_id = 'portfolio-assets'
              AND EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
  WITH CHECK (bucket_id = 'portfolio-assets'
              AND EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

CREATE POLICY portfolio_admin_delete ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'portfolio-assets'
    AND EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')
  );

-- ---------- 6. Verification ----------
-- After running, these should all succeed / return the expected rows:
--   SELECT policyname FROM pg_policies WHERE schemaname='public' AND policyname='admin_all';
--   SELECT policyname FROM pg_policies WHERE schemaname='storage' AND policyname LIKE 'portfolio_%';
--   SELECT u.email, r.role FROM auth.users u
--     JOIN public.user_roles r ON r.user_id = u.id
--     WHERE u.email IN ('avetisyanvarazdat9@gmail.com','admin@admin.local');
-- =====================================================================
