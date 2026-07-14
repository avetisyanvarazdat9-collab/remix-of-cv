
CREATE OR REPLACE FUNCTION public.courses_autofill_slug()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  base TEXT;
  candidate TEXT;
  i INT := 0;
BEGIN
  IF NEW.slug IS NULL OR btrim(NEW.slug) = '' THEN
    base := lower(coalesce(NEW.title, ''));
    base := regexp_replace(base, '[^a-z0-9\u0400-\u04FF\u0530-\u058F\s-]', '', 'g');
    base := regexp_replace(base, '\s+', '-', 'g');
    base := regexp_replace(base, '-+', '-', 'g');
    base := btrim(base, '-');
    IF base = '' THEN base := 'course'; END IF;
    candidate := base;
    WHILE EXISTS (SELECT 1 FROM public.courses WHERE slug = candidate AND id IS DISTINCT FROM NEW.id) LOOP
      i := i + 1;
      candidate := base || '-' || i;
    END LOOP;
    NEW.slug := candidate;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS courses_autofill_slug_trg ON public.courses;
CREATE TRIGGER courses_autofill_slug_trg
BEFORE INSERT OR UPDATE ON public.courses
FOR EACH ROW EXECUTE FUNCTION public.courses_autofill_slug();

-- Same for video_courses if it also has a slug column
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='video_courses' AND column_name='slug') THEN
    CREATE OR REPLACE FUNCTION public.video_courses_autofill_slug()
    RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $f$
    DECLARE base TEXT; candidate TEXT; i INT := 0;
    BEGIN
      IF NEW.slug IS NULL OR btrim(NEW.slug) = '' THEN
        base := lower(coalesce(NEW.title, ''));
        base := regexp_replace(base, '[^a-z0-9\u0400-\u04FF\u0530-\u058F\s-]', '', 'g');
        base := regexp_replace(base, '\s+', '-', 'g');
        base := regexp_replace(base, '-+', '-', 'g');
        base := btrim(base, '-');
        IF base = '' THEN base := 'video-course'; END IF;
        candidate := base;
        WHILE EXISTS (SELECT 1 FROM public.video_courses WHERE slug = candidate AND id IS DISTINCT FROM NEW.id) LOOP
          i := i + 1; candidate := base || '-' || i;
        END LOOP;
        NEW.slug := candidate;
      END IF;
      RETURN NEW;
    END; $f$;
    DROP TRIGGER IF EXISTS video_courses_autofill_slug_trg ON public.video_courses;
    CREATE TRIGGER video_courses_autofill_slug_trg
    BEFORE INSERT OR UPDATE ON public.video_courses
    FOR EACH ROW EXECUTE FUNCTION public.video_courses_autofill_slug();
  END IF;
END $$;
