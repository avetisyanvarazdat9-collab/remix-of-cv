
ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS slug text,
  ADD COLUMN IF NOT EXISTS topics text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS learning_outcomes text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS prerequisites text[] NOT NULL DEFAULT '{}';

UPDATE public.courses SET slug = lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || substr(id::text, 1, 6) WHERE slug IS NULL;
ALTER TABLE public.courses ALTER COLUMN slug SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS courses_slug_key ON public.courses(slug);

ALTER TABLE public.video_courses
  ADD COLUMN IF NOT EXISTS slug text,
  ADD COLUMN IF NOT EXISTS topics text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS youtube_url text;

UPDATE public.video_courses SET slug = lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || substr(id::text, 1, 6) WHERE slug IS NULL;
ALTER TABLE public.video_courses ALTER COLUMN slug SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS video_courses_slug_key ON public.video_courses(slug);
