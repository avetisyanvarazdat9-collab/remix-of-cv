
ALTER TABLE public.talks ADD COLUMN IF NOT EXISTS i18n jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.video_courses ADD COLUMN IF NOT EXISTS i18n jsonb NOT NULL DEFAULT '{}'::jsonb;

UPDATE public.talks SET i18n = jsonb_strip_nulls(jsonb_build_object(
  'title', jsonb_build_object('hy', title, 'en', title, 'ru', title),
  'event_name', CASE WHEN event_name IS NOT NULL THEN jsonb_build_object('hy', event_name, 'en', event_name, 'ru', event_name) END,
  'location', CASE WHEN location IS NOT NULL THEN jsonb_build_object('hy', location, 'en', location, 'ru', location) END,
  'description', CASE WHEN description IS NOT NULL THEN jsonb_build_object('hy', description, 'en', description, 'ru', description) END
)) WHERE i18n = '{}'::jsonb;

UPDATE public.video_courses SET i18n = jsonb_strip_nulls(jsonb_build_object(
  'title', jsonb_build_object('hy', title, 'en', title, 'ru', title),
  'description', CASE WHEN description IS NOT NULL THEN jsonb_build_object('hy', description, 'en', description, 'ru', description) END,
  'platform', CASE WHEN platform IS NOT NULL THEN jsonb_build_object('hy', platform, 'en', platform, 'ru', platform) END,
  'duration', CASE WHEN duration IS NOT NULL THEN jsonb_build_object('hy', duration, 'en', duration, 'ru', duration) END
)) WHERE i18n = '{}'::jsonb;
