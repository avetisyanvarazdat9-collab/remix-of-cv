-- Split site theme into independent light and dark custom palettes.

ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS light_primary_color text,
  ADD COLUMN IF NOT EXISTS light_background_color text,
  ADD COLUMN IF NOT EXISTS light_text_color text,
  ADD COLUMN IF NOT EXISTS dark_primary_color text,
  ADD COLUMN IF NOT EXISTS dark_background_color text,
  ADD COLUMN IF NOT EXISTS dark_text_color text;

-- Backfill from legacy single palette into the column set matching theme_mode.
UPDATE public.site_settings
SET
  dark_primary_color = CASE WHEN theme_mode = 'dark' THEN primary_color ELSE dark_primary_color END,
  dark_background_color = CASE WHEN theme_mode = 'dark' THEN background_color ELSE dark_background_color END,
  dark_text_color = CASE WHEN theme_mode = 'dark' THEN text_color ELSE dark_text_color END,
  light_primary_color = CASE WHEN theme_mode = 'light' THEN primary_color ELSE light_primary_color END,
  light_background_color = CASE WHEN theme_mode = 'light' THEN background_color ELSE light_background_color END,
  light_text_color = CASE WHEN theme_mode = 'light' THEN text_color ELSE light_text_color END
WHERE id = true;

COMMENT ON COLUMN public.site_settings.primary_color IS 'DEPRECATED: use dark_primary_color / light_primary_color instead';
COMMENT ON COLUMN public.site_settings.background_color IS 'DEPRECATED: use dark_background_color / light_background_color instead';
COMMENT ON COLUMN public.site_settings.text_color IS 'DEPRECATED: use dark_text_color / light_text_color instead';
COMMENT ON COLUMN public.site_settings.theme_mode IS 'DEPRECATED: both palettes are stored independently; visitor mode picks which applies';

-- Ensure anon can read the new palette columns (column-specific grant pattern).
REVOKE SELECT ON public.site_settings FROM anon;

GRANT SELECT (
  id,
  primary_color,
  background_color,
  text_color,
  theme_mode,
  light_primary_color,
  light_background_color,
  light_text_color,
  dark_primary_color,
  dark_background_color,
  dark_text_color,
  updated_at,
  logo_url
) ON public.site_settings TO anon;
