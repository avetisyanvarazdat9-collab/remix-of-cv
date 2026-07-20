-- =====================================================================
-- Production fix: admin RLS on all CMS tables + storage bucket policies.
-- No role-helper function dependencies.
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

-- ---------- 1. Drop earlier generated admin policies ----------
DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname IN ('public','storage')
      AND policyname IN (
        'cms_admin_access',
        'portfolio_assets_admin_access',
        'portfolio_admin_insert',
        'portfolio_admin_update',
        'portfolio_admin_delete',
        'admins manage user_roles'
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

    EXECUTE format('DROP POLICY IF EXISTS cms_admin_access ON public.%I', t);
    EXECUTE format($f$
      CREATE POLICY cms_admin_access ON public.%I
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

-- ---------- 5. Admin-safe profile save helper ----------
-- This removes the profile editor's dependency on fragile direct table-write
-- RLS while still authorizing strictly through public.user_roles.
CREATE OR REPLACE FUNCTION public.admin_save_profile(p_profile_id uuid, p_profile jsonb)
RETURNS public.profile
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result public.profile;
  target_id uuid;
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM public.user_roles ur
    WHERE ur.user_id = auth.uid()
      AND ur.role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Not authorized' USING ERRCODE = '42501';
  END IF;

  IF p_profile_id IS NOT NULL THEN
    UPDATE public.profile
       SET name = COALESCE(NULLIF(p_profile->>'name', ''), name, 'Dr. Varazdat Avetisyan'),
           title = COALESCE(NULLIF(p_profile->>'title', ''), title, 'AI/ML Researcher, Lecturer & Entrepreneur'),
           tagline = NULLIF(p_profile->>'tagline', ''),
           location = NULLIF(p_profile->>'location', ''),
           bio = NULLIF(p_profile->>'bio', ''),
           email = NULLIF(p_profile->>'email', ''),
           phone = NULLIF(p_profile->>'phone', ''),
           photo_url = NULLIF(p_profile->>'photo_url', ''),
           cv_url = NULLIF(p_profile->>'cv_url', ''),
           github_url = NULLIF(p_profile->>'github_url', ''),
           linkedin_url = NULLIF(p_profile->>'linkedin_url', ''),
           twitter_url = NULLIF(p_profile->>'twitter_url', ''),
           website_url = NULLIF(p_profile->>'website_url', ''),
           i18n = COALESCE(p_profile->'i18n', i18n, '{}'::jsonb),
           updated_at = now()
     WHERE id = p_profile_id
     RETURNING * INTO result;
  END IF;

  IF result.id IS NULL THEN
    SELECT id INTO target_id FROM public.profile ORDER BY created_at ASC LIMIT 1;

    IF target_id IS NOT NULL THEN
      UPDATE public.profile
         SET name = COALESCE(NULLIF(p_profile->>'name', ''), name, 'Dr. Varazdat Avetisyan'),
             title = COALESCE(NULLIF(p_profile->>'title', ''), title, 'AI/ML Researcher, Lecturer & Entrepreneur'),
             tagline = NULLIF(p_profile->>'tagline', ''),
             location = NULLIF(p_profile->>'location', ''),
             bio = NULLIF(p_profile->>'bio', ''),
             email = NULLIF(p_profile->>'email', ''),
             phone = NULLIF(p_profile->>'phone', ''),
             photo_url = NULLIF(p_profile->>'photo_url', ''),
             cv_url = NULLIF(p_profile->>'cv_url', ''),
             github_url = NULLIF(p_profile->>'github_url', ''),
             linkedin_url = NULLIF(p_profile->>'linkedin_url', ''),
             twitter_url = NULLIF(p_profile->>'twitter_url', ''),
             website_url = NULLIF(p_profile->>'website_url', ''),
             i18n = COALESCE(p_profile->'i18n', i18n, '{}'::jsonb),
             updated_at = now()
       WHERE id = target_id
       RETURNING * INTO result;
    ELSE
      INSERT INTO public.profile (
        name, title, tagline, location, bio, email, phone, photo_url, cv_url,
        github_url, linkedin_url, twitter_url, website_url, i18n
      ) VALUES (
        COALESCE(NULLIF(p_profile->>'name', ''), 'Dr. Varazdat Avetisyan'),
        COALESCE(NULLIF(p_profile->>'title', ''), 'AI/ML Researcher, Lecturer & Entrepreneur'),
        NULLIF(p_profile->>'tagline', ''),
        NULLIF(p_profile->>'location', ''),
        NULLIF(p_profile->>'bio', ''),
        NULLIF(p_profile->>'email', ''),
        NULLIF(p_profile->>'phone', ''),
        NULLIF(p_profile->>'photo_url', ''),
        NULLIF(p_profile->>'cv_url', ''),
        NULLIF(p_profile->>'github_url', ''),
        NULLIF(p_profile->>'linkedin_url', ''),
        NULLIF(p_profile->>'twitter_url', ''),
        NULLIF(p_profile->>'website_url', ''),
        COALESCE(p_profile->'i18n', '{}'::jsonb)
      )
      RETURNING * INTO result;
    END IF;
  END IF;

  RETURN result;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_save_profile(uuid, jsonb) FROM public;
GRANT EXECUTE ON FUNCTION public.admin_save_profile(uuid, jsonb) TO authenticated;

-- ---------- 6. Storage bucket "portfolio-assets" ----------
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

-- ---------- 7. Verification ----------
-- After running, these should all succeed / return the expected rows:
--   SELECT policyname FROM pg_policies WHERE schemaname='public' AND policyname='cms_admin_access';
--   SELECT policyname FROM pg_policies WHERE schemaname='storage' AND policyname LIKE 'portfolio_%';
--   SELECT u.email, r.role FROM auth.users u
--     JOIN public.user_roles r ON r.user_id = u.id
--     WHERE u.email IN ('avetisyanvarazdat9@gmail.com','admin@admin.local');
-- =====================================================================
