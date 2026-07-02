
-- New: testimonials
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  role TEXT,
  organization TEXT,
  quote TEXT NOT NULL,
  category TEXT CHECK (category IN ('Student','University','Corporate')),
  avatar_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  i18n JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read testimonials" ON public.testimonials FOR SELECT USING (is_visible);
CREATE POLICY "admins manage testimonials" ON public.testimonials FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(),'admin'::app_role));
CREATE TRIGGER testimonials_updated_at BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- New: statistics
CREATE TABLE public.statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  i18n JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.statistics TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.statistics TO authenticated;
GRANT ALL ON public.statistics TO service_role;
ALTER TABLE public.statistics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read statistics" ON public.statistics FOR SELECT USING (is_visible);
CREATE POLICY "admins manage statistics" ON public.statistics FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(),'admin'::app_role));
CREATE TRIGGER statistics_updated_at BEFORE UPDATE ON public.statistics
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Extend existing tables
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS read_time_minutes INTEGER;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.talks ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS category TEXT;

-- Seed initial statistics from existing defaults
INSERT INTO public.statistics (label, value, display_order) VALUES
  ('Years of Experience','15+',1),
  ('Courses Taught','30+',2),
  ('Students Trained','500+',3),
  ('Companies','3',4);
