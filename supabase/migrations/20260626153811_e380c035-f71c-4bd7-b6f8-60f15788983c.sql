
REVOKE SELECT ON public.profile FROM anon;
GRANT SELECT (id, name, title, tagline, location, bio, photo_url, cv_url, github_url, linkedin_url, twitter_url, website_url, created_at, updated_at, i18n) ON public.profile TO anon;

REVOKE SELECT ON public.site_settings FROM anon;
GRANT SELECT (id, primary_color, background_color, text_color, updated_at, logo_url) ON public.site_settings TO anon;

CREATE POLICY "Block client error log inserts" ON public.error_logs
  FOR INSERT TO anon, authenticated
  WITH CHECK (false);

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
