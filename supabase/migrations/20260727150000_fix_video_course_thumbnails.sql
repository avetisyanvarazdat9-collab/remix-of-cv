-- Align video_courses thumbnail columns (schema drift: some envs use image_url, app uses thumbnail_url)

ALTER TABLE public.video_courses ADD COLUMN IF NOT EXISTS thumbnail_url text;
ALTER TABLE public.video_courses ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE public.video_courses ADD COLUMN IF NOT EXISTS youtube_url text;

UPDATE public.video_courses
SET thumbnail_url = image_url
WHERE (thumbnail_url IS NULL OR btrim(thumbnail_url) = '')
  AND image_url IS NOT NULL
  AND btrim(image_url) <> '';

UPDATE public.video_courses
SET image_url = thumbnail_url
WHERE (image_url IS NULL OR btrim(image_url) = '')
  AND thumbnail_url IS NOT NULL
  AND btrim(thumbnail_url) <> '';

COMMENT ON COLUMN public.video_courses.thumbnail_url IS 'Public video card thumbnail (Supabase Storage URL or external URL)';
COMMENT ON COLUMN public.video_courses.image_url IS 'Legacy alias kept in sync with thumbnail_url';
