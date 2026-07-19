DO $$
DECLARE
  p record;
  table_name text;
  cms_tables text[] := ARRAY[
    'blog_posts',
    'certifications',
    'companies',
    'courses',
    'education',
    'error_logs',
    'home_content',
    'international_experience',
    'messages',
    'navigation_menu',
    'profile',
    'projects',
    'site_settings',
    'skills',
    'statistics',
    'talks',
    'testimonials',
    'video_courses'
  ];
  public_visible_tables text[] := ARRAY[
    'certifications',
    'companies',
    'courses',
    'education',
    'international_experience',
    'projects',
    'skills',
    'statistics',
    'talks',
    'testimonials',
    'video_courses'
  ];
BEGIN
  -- Drop policies that depend on obsolete/missing admin helper functions, plus
  -- previous generated admin_all policies, so re-running this migration is safe.
  FOR p IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = ANY (cms_tables || ARRAY['user_roles'])
      AND (
        policyname = 'admin_all'
        OR coalesce(qual, '') LIKE '%private.is_admin%'
        OR coalesce(with_check, '') LIKE '%private.is_admin%'
        OR coalesce(qual, '') LIKE '%private.has_role%'
        OR coalesce(with_check, '') LIKE '%private.has_role%'
        OR coalesce(qual, '') LIKE '%public.has_role%'
        OR coalesce(with_check, '') LIKE '%public.has_role%'
      )
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', p.policyname, p.schemaname, p.tablename);
  END LOOP;

  FOR p IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND (
        policyname IN (
          'portfolio-assets admin delete',
          'portfolio-assets admin update',
          'portfolio-assets admin write',
          'portfolio_assets_admin_all'
        )
        OR coalesce(qual, '') LIKE '%private.is_admin%'
        OR coalesce(with_check, '') LIKE '%private.is_admin%'
        OR coalesce(qual, '') LIKE '%private.has_role%'
        OR coalesce(with_check, '') LIKE '%private.has_role%'
        OR coalesce(qual, '') LIKE '%public.has_role%'
        OR coalesce(with_check, '') LIKE '%public.has_role%'
      )
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', p.policyname, p.schemaname, p.tablename);
  END LOOP;

  -- Ensure PostgREST has table-level privileges; RLS still decides row access.
  FOREACH table_name IN ARRAY cms_tables LOOP
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', table_name);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', table_name);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_name);
  END LOOP;

  GRANT SELECT ON public.user_roles TO authenticated;
  GRANT ALL ON public.user_roles TO service_role;
  ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

  -- Users must be able to read their own role rows, otherwise the frontend admin guard denies access.
  DROP POLICY IF EXISTS "users can read their own roles" ON public.user_roles;
  CREATE POLICY "users can read their own roles"
    ON public.user_roles
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

  DROP POLICY IF EXISTS "admins manage user_roles" ON public.user_roles;
  CREATE POLICY "admins manage user_roles"
    ON public.user_roles
    FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM public.user_roles r
        WHERE r.user_id = auth.uid()
          AND r.role = 'admin'
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM public.user_roles r
        WHERE r.user_id = auth.uid()
          AND r.role = 'admin'
      )
    );

  -- Admins can manage every CMS table. No private/public helper functions are used.
  FOREACH table_name IN ARRAY cms_tables LOOP
    EXECUTE format('DROP POLICY IF EXISTS admin_all ON public.%I', table_name);
    EXECUTE format($policy$
      CREATE POLICY admin_all
        ON public.%I
        FOR ALL
        TO authenticated
        USING (
          EXISTS (
            SELECT 1 FROM public.user_roles r
            WHERE r.user_id = auth.uid()
              AND r.role = 'admin'
          )
        )
        WITH CHECK (
          EXISTS (
            SELECT 1 FROM public.user_roles r
            WHERE r.user_id = auth.uid()
              AND r.role = 'admin'
          )
        )
    $policy$, table_name);
  END LOOP;

  -- Recreate public read policies without helper functions.
  DROP POLICY IF EXISTS "public read published posts" ON public.blog_posts;
  CREATE POLICY "public read published posts"
    ON public.blog_posts FOR SELECT TO public
    USING (is_published = true);

  DROP POLICY IF EXISTS "public can read home_content" ON public.home_content;
  CREATE POLICY "public can read home_content"
    ON public.home_content FOR SELECT TO public
    USING (true);

  DROP POLICY IF EXISTS "Public can read visible nav" ON public.navigation_menu;
  CREATE POLICY "Public can read visible nav"
    ON public.navigation_menu FOR SELECT TO public
    USING (is_visible = true);

  DROP POLICY IF EXISTS "public can read profile" ON public.profile;
  CREATE POLICY "public can read profile"
    ON public.profile FOR SELECT TO public
    USING (true);

  DROP POLICY IF EXISTS "public can read site_settings" ON public.site_settings;
  CREATE POLICY "public can read site_settings"
    ON public.site_settings FOR SELECT TO public
    USING (true);

  FOREACH table_name IN ARRAY public_visible_tables LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', 'public read ' || table_name, table_name);
    EXECUTE format($policy$
      CREATE POLICY %I
        ON public.%I
        FOR SELECT
        TO public
        USING (is_visible = true)
    $policy$, 'public read ' || table_name, table_name);
  END LOOP;

  DROP POLICY IF EXISTS "anyone can submit message" ON public.messages;
  CREATE POLICY "anyone can submit message"
    ON public.messages
    FOR INSERT
    TO public
    WITH CHECK (
      length(trim(name)) BETWEEN 1 AND 100
      AND length(trim(email)) BETWEEN 3 AND 255
      AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
      AND length(trim(body)) BETWEEN 1 AND 5000
    );

  DROP POLICY IF EXISTS "Block client error log inserts" ON public.error_logs;
  CREATE POLICY "Block client error log inserts"
    ON public.error_logs
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (false);
END $$;

-- Storage object policies for portfolio image uploads, using public.user_roles directly.
DROP POLICY IF EXISTS "portfolio-assets public read" ON storage.objects;
CREATE POLICY "portfolio-assets public read"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'portfolio-assets');

DROP POLICY IF EXISTS portfolio_assets_admin_all ON storage.objects;
CREATE POLICY portfolio_assets_admin_all
  ON storage.objects
  FOR ALL
  TO authenticated
  USING (
    bucket_id = 'portfolio-assets'
    AND EXISTS (
      SELECT 1 FROM public.user_roles r
      WHERE r.user_id = auth.uid()
        AND r.role = 'admin'
    )
  )
  WITH CHECK (
    bucket_id = 'portfolio-assets'
    AND EXISTS (
      SELECT 1 FROM public.user_roles r
      WHERE r.user_id = auth.uid()
        AND r.role = 'admin'
    )
  );