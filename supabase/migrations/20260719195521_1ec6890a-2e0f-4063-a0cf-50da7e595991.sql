DO $$
DECLARE
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
BEGIN
  FOREACH table_name IN ARRAY cms_tables LOOP
    EXECUTE format('DROP POLICY IF EXISTS admin_all ON public.%I', table_name);
    EXECUTE format('DROP POLICY IF EXISTS cms_admin_access ON public.%I', table_name);
    EXECUTE format($policy$
      CREATE POLICY cms_admin_access
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
END $$;

DROP POLICY IF EXISTS portfolio_assets_admin_all ON storage.objects;
DROP POLICY IF EXISTS portfolio_assets_admin_access ON storage.objects;
CREATE POLICY portfolio_assets_admin_access
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