-- Ensure anon can read theme_mode alongside existing theme color columns.
-- Matches column-specific grant pattern from 20260707134932.

REVOKE SELECT ON public.site_settings FROM anon;

GRANT SELECT (
  id,
  primary_color,
  background_color,
  text_color,
  theme_mode,
  updated_at,
  logo_url
) ON public.site_settings TO anon;
