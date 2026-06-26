-- Add i18n JSONB columns for multi-language content.
-- Shape: { "field_name": { "hy": "...", "en": "...", "ru": "..." }, ... }
-- The original text columns remain as the English/legacy fallback.

ALTER TABLE public.profile      ADD COLUMN IF NOT EXISTS i18n jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.home_content ADD COLUMN IF NOT EXISTS i18n jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.projects     ADD COLUMN IF NOT EXISTS i18n jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.courses      ADD COLUMN IF NOT EXISTS i18n jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.blog_posts   ADD COLUMN IF NOT EXISTS i18n jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.skills       ADD COLUMN IF NOT EXISTS i18n jsonb NOT NULL DEFAULT '{}'::jsonb;

-- Helper to build {hy,en,ru} from one current value
CREATE OR REPLACE FUNCTION public._tri(v text) RETURNS jsonb
LANGUAGE sql IMMUTABLE AS $$
  SELECT CASE WHEN v IS NULL OR v = '' THEN '{}'::jsonb
         ELSE jsonb_build_object('hy', v, 'en', v, 'ru', v) END
$$;

-- Backfill: only populate keys that are currently empty so reruns are safe.
UPDATE public.profile SET i18n = i18n
  || jsonb_build_object('title',    public._tri(title))
  || jsonb_build_object('tagline',  public._tri(tagline))
  || jsonb_build_object('bio',      public._tri(bio))
  || jsonb_build_object('location', public._tri(location))
WHERE NOT (i18n ? 'title');

UPDATE public.home_content SET i18n = i18n
  || jsonb_build_object('hero_badge',       public._tri(hero_badge))
  || jsonb_build_object('hero_btn1_label',  public._tri(hero_btn1_label))
  || jsonb_build_object('hero_btn2_label',  public._tri(hero_btn2_label))
  || jsonb_build_object('hero_btn3_label',  public._tri(hero_btn3_label))
  || jsonb_build_object('about_label',      public._tri(about_label))
  || jsonb_build_object('about_heading',    public._tri(about_heading))
  || jsonb_build_object('about_btn_label',  public._tri(about_btn_label))
  || jsonb_build_object('courses_label',    public._tri(courses_label))
  || jsonb_build_object('courses_heading',  public._tri(courses_heading))
  || jsonb_build_object('partners_heading', public._tri(partners_heading))
  || jsonb_build_object('cta_heading',      public._tri(cta_heading))
  || jsonb_build_object('cta_text',         public._tri(cta_text))
  || jsonb_build_object('cta_btn_label',    public._tri(cta_btn_label))
WHERE NOT (i18n ? 'hero_badge');

UPDATE public.projects SET i18n = i18n
  || jsonb_build_object('title',       public._tri(title))
  || jsonb_build_object('summary',     public._tri(summary))
  || jsonb_build_object('description', public._tri(description))
WHERE NOT (i18n ? 'title');

UPDATE public.courses SET i18n = i18n
  || jsonb_build_object('title',       public._tri(title))
  || jsonb_build_object('description', public._tri(description))
  || jsonb_build_object('level',       public._tri(level))
  || jsonb_build_object('duration',    public._tri(duration))
WHERE NOT (i18n ? 'title');

UPDATE public.blog_posts SET i18n = i18n
  || jsonb_build_object('title',   public._tri(title))
  || jsonb_build_object('excerpt', public._tri(excerpt))
  || jsonb_build_object('content', public._tri(content))
WHERE NOT (i18n ? 'title');

UPDATE public.skills SET i18n = i18n
  || jsonb_build_object('category', public._tri(category))
  || jsonb_build_object('name',     public._tri(name))
WHERE NOT (i18n ? 'name');

DROP FUNCTION public._tri(text);