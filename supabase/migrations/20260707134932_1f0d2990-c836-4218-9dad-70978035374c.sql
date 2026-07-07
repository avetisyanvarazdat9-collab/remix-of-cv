
REVOKE SELECT ON public.profile FROM anon;
GRANT SELECT (id, name, title, tagline, location, bio, photo_url, cv_url, github_url, linkedin_url, twitter_url, website_url, created_at, updated_at, i18n) ON public.profile TO anon;

REVOKE SELECT ON public.site_settings FROM anon;
GRANT SELECT (id, primary_color, background_color, text_color, updated_at, logo_url) ON public.site_settings TO anon;
