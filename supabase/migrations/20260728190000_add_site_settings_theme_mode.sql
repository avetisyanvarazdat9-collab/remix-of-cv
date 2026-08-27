-- Admin theme applies to one visitor mode (light or dark); the other uses default CSS tokens.

ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS theme_mode text NOT NULL DEFAULT 'dark';

ALTER TABLE public.site_settings
  DROP CONSTRAINT IF EXISTS site_settings_theme_mode_check;

ALTER TABLE public.site_settings
  ADD CONSTRAINT site_settings_theme_mode_check
  CHECK (theme_mode IN ('light', 'dark'));
