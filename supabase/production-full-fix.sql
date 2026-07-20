-- =====================================================================
-- PRODUCTION FULL FIX — idempotent migration
-- Run in the external Supabase SQL editor. Safe to re-run.
-- Fixes: schema drift, NOT NULL/default issues, triggers, RLS, storage.
-- Admin check: inline EXISTS on public.user_roles (no private.* helpers).
-- =====================================================================

-- ---------- Extensions ----------
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ---------- Enum ----------
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin','user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ---------- Helper: updated_at trigger ----------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- =====================================================================
-- CORE TABLES (CREATE IF NOT EXISTS, then backfill columns idempotently)
-- =====================================================================

-- user_roles ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- profile -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  title text NOT NULL DEFAULT '',
  tagline text, location text, bio text, email text, phone text,
  photo_url text, cv_url text, github_url text, linkedin_url text,
  twitter_url text, website_url text,
  i18n jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.profile ALTER COLUMN name SET DEFAULT '';
ALTER TABLE public.profile ALTER COLUMN title SET DEFAULT '';
ALTER TABLE public.profile ADD COLUMN IF NOT EXISTS i18n jsonb NOT NULL DEFAULT '{}'::jsonb;

-- navigation_menu -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.navigation_menu (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL DEFAULT '',
  path text NOT NULL DEFAULT '/',
  order_index int NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  label_en text NOT NULL DEFAULT '',
  label_hy text NOT NULL DEFAULT '',
  label_ru text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.navigation_menu ADD COLUMN IF NOT EXISTS label_en text NOT NULL DEFAULT '';
ALTER TABLE public.navigation_menu ADD COLUMN IF NOT EXISTS label_hy text NOT NULL DEFAULT '';
ALTER TABLE public.navigation_menu ADD COLUMN IF NOT EXISTS label_ru text NOT NULL DEFAULT '';
ALTER TABLE public.navigation_menu ALTER COLUMN label SET DEFAULT '';
ALTER TABLE public.navigation_menu ALTER COLUMN label_en SET DEFAULT '';
ALTER TABLE public.navigation_menu ALTER COLUMN path SET DEFAULT '/';

-- Autofill label from label_en/hy/ru/path when blank
CREATE OR REPLACE FUNCTION public.navigation_menu_autofill_label()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.label IS NULL OR btrim(NEW.label) = '' THEN
    NEW.label := COALESCE(
      NULLIF(btrim(NEW.label_en), ''),
      NULLIF(btrim(NEW.label_hy), ''),
      NULLIF(btrim(NEW.label_ru), ''),
      NEW.path, 'item'
    );
  END IF;
  RETURN NEW;
END; $$;

-- courses -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  slug text NOT NULL DEFAULT '',
  description text, level text, duration text, link_url text, image_url text, category text,
  display_order int DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT false,
  topics text[] NOT NULL DEFAULT '{}',
  learning_outcomes text[] NOT NULL DEFAULT '{}',
  prerequisites text[] NOT NULL DEFAULT '{}',
  i18n jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS slug text NOT NULL DEFAULT '';
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS topics text[] NOT NULL DEFAULT '{}';
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS learning_outcomes text[] NOT NULL DEFAULT '{}';
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS prerequisites text[] NOT NULL DEFAULT '{}';
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS category text;
DO $$ BEGIN
  CREATE UNIQUE INDEX courses_slug_key ON public.courses(slug) WHERE slug <> '';
EXCEPTION WHEN duplicate_table THEN NULL; END $$;

CREATE OR REPLACE FUNCTION public.courses_autofill_slug()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
DECLARE base TEXT; candidate TEXT; i INT := 0;
BEGIN
  IF NEW.slug IS NULL OR btrim(NEW.slug) = '' THEN
    base := lower(coalesce(NEW.title,''));
    base := regexp_replace(base, '[^a-z0-9\u0400-\u04FF\u0530-\u058F\s-]', '', 'g');
    base := regexp_replace(base, '\s+', '-', 'g');
    base := regexp_replace(base, '-+', '-', 'g');
    base := btrim(base, '-');
    IF base = '' THEN base := 'course'; END IF;
    candidate := base;
    WHILE EXISTS (SELECT 1 FROM public.courses WHERE slug = candidate AND id IS DISTINCT FROM NEW.id) LOOP
      i := i + 1; candidate := base || '-' || i;
    END LOOP;
    NEW.slug := candidate;
  END IF;
  RETURN NEW;
END; $$;

-- video_courses -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.video_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  slug text NOT NULL DEFAULT '',
  description text, level text, duration text, link_url text, image_url text,
  video_url text, platform text, price text, category text,
  display_order int NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT false,
  i18n jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
DO $$ BEGIN
  CREATE UNIQUE INDEX video_courses_slug_key ON public.video_courses(slug) WHERE slug <> '';
EXCEPTION WHEN duplicate_table THEN NULL; END $$;

CREATE OR REPLACE FUNCTION public.video_courses_autofill_slug()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
DECLARE base TEXT; candidate TEXT; i INT := 0;
BEGIN
  IF NEW.slug IS NULL OR btrim(NEW.slug) = '' THEN
    base := lower(coalesce(NEW.title,''));
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
END; $$;

-- blog_posts ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL DEFAULT '',
  title text NOT NULL DEFAULT '',
  excerpt text, content text, cover_image_url text, category text,
  read_time_minutes int,
  published_at timestamptz,
  tags text[] DEFAULT '{}',
  is_published boolean NOT NULL DEFAULT false,
  i18n jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- projects ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL DEFAULT '',
  title text NOT NULL DEFAULT '',
  summary text, description text, image_url text, link_url text, repo_url text, category text,
  tech_stack text[] DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  display_order int NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  i18n jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- companies -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text, role text, description text, logo_url text, website_url text, category text,
  start_year int, end_year int,
  is_current boolean NOT NULL DEFAULT false,
  display_order int NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.companies ALTER COLUMN name DROP NOT NULL;
ALTER TABLE public.companies ALTER COLUMN role DROP NOT NULL;

-- education -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution text, degree text, field text, description text,
  start_year int, end_year int,
  display_order int NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.education ALTER COLUMN institution DROP NOT NULL;
ALTER TABLE public.education ALTER COLUMN degree DROP NOT NULL;

-- certifications ------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text, issuer text, description text,
  issue_date date, expiry_date date,
  credential_id text, credential_url text, image_url text,
  display_order int NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  i18n jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.certifications ALTER COLUMN name DROP NOT NULL;
ALTER TABLE public.certifications ALTER COLUMN issuer DROP NOT NULL;

-- skills --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL DEFAULT '',
  name text NOT NULL DEFAULT '',
  level int,
  display_order int NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  i18n jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- talks ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.talks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  event_name text, event_date date, location text, description text,
  slides_url text, video_url text,
  display_order int NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  i18n jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- testimonials --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL DEFAULT '',
  author_title text, author_org text, avatar_url text,
  quote text NOT NULL DEFAULT '',
  rating int,
  display_order int NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  i18n jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- statistics ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL DEFAULT '',
  value text NOT NULL DEFAULT '',
  display_order int NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  i18n jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- international_experience -------------------------------------------
CREATE TABLE IF NOT EXISTS public.international_experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text, organization text, location text, country_code text,
  lat double precision, lng double precision,
  category text, event_date date, description text, url text,
  display_order int NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  i18n jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- messages ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  body text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- home_content (singleton, id=true) ----------------------------------
CREATE TABLE IF NOT EXISTS public.home_content (
  id boolean PRIMARY KEY DEFAULT true CHECK (id = true),
  hero_badge text NOT NULL DEFAULT 'AI / ML Researcher & Educator',
  hero_btn1_label text NOT NULL DEFAULT 'Explore Courses',
  hero_btn1_url text NOT NULL DEFAULT '/courses',
  hero_btn2_label text NOT NULL DEFAULT 'Book a Consultation',
  hero_btn2_url text NOT NULL DEFAULT '',
  hero_btn3_label text NOT NULL DEFAULT 'Contact Me',
  hero_btn3_url text NOT NULL DEFAULT '',
  about_label text NOT NULL DEFAULT 'About Me',
  about_heading text NOT NULL DEFAULT 'Building the future of AI',
  about_btn_label text NOT NULL DEFAULT 'Read Full Biography',
  about_btn_url text NOT NULL DEFAULT '/about',
  courses_label text NOT NULL DEFAULT 'Learning',
  courses_heading text NOT NULL DEFAULT 'Featured Courses',
  partners_heading text NOT NULL DEFAULT 'Partner Organizations',
  cta_heading text NOT NULL DEFAULT 'Ready to collaborate?',
  cta_text text NOT NULL DEFAULT '',
  cta_btn_label text NOT NULL DEFAULT 'Get in touch',
  cta_btn_url text NOT NULL DEFAULT '',
  i18n jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO public.home_content(id) VALUES (true) ON CONFLICT DO NOTHING;

-- site_settings (singleton) ------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
  id boolean PRIMARY KEY DEFAULT true CHECK (id = true),
  primary_color text NOT NULL DEFAULT '#7c5cff',
  background_color text NOT NULL DEFAULT '#0f172a',
  text_color text NOT NULL DEFAULT '#f1f5f9',
  logo_url text, contact_email text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO public.site_settings(id) VALUES (true) ON CONFLICT DO NOTHING;

-- error_logs ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.error_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL DEFAULT 'client',
  severity text NOT NULL DEFAULT 'error',
  message text NOT NULL,
  stack text, url text, route text, user_agent text, kind text,
  user_id uuid,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- =====================================================================
-- TRIGGERS (drop+create for idempotency)
-- =====================================================================
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'profile','navigation_menu','courses','video_courses','blog_posts',
    'projects','companies','education','certifications','skills',
    'talks','testimonials','statistics','international_experience',
    'home_content','site_settings'
  ] LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS %I_set_updated_at ON public.%I;', t, t);
    EXECUTE format('CREATE TRIGGER %I_set_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();', t, t);
  END LOOP;
END $$;

DROP TRIGGER IF EXISTS navigation_menu_autofill_label_trg ON public.navigation_menu;
CREATE TRIGGER navigation_menu_autofill_label_trg
  BEFORE INSERT OR UPDATE ON public.navigation_menu
  FOR EACH ROW EXECUTE FUNCTION public.navigation_menu_autofill_label();

DROP TRIGGER IF EXISTS courses_autofill_slug_trg ON public.courses;
CREATE TRIGGER courses_autofill_slug_trg
  BEFORE INSERT OR UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.courses_autofill_slug();

DROP TRIGGER IF EXISTS video_courses_autofill_slug_trg ON public.video_courses;
CREATE TRIGGER video_courses_autofill_slug_trg
  BEFORE INSERT OR UPDATE ON public.video_courses
  FOR EACH ROW EXECUTE FUNCTION public.video_courses_autofill_slug();

-- =====================================================================
-- GRANTS
-- =====================================================================
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'profile','navigation_menu','courses','video_courses','blog_posts',
    'projects','companies','education','certifications','skills',
    'talks','testimonials','statistics','international_experience',
    'home_content','site_settings','messages','error_logs','user_roles'
  ] LOOP
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated;', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role;', t);
  END LOOP;

  -- Public read (anon) on visitor-facing tables
  FOREACH t IN ARRAY ARRAY[
    'profile','navigation_menu','courses','video_courses','blog_posts',
    'projects','companies','education','certifications','skills',
    'talks','testimonials','statistics','international_experience',
    'home_content','site_settings'
  ] LOOP
    EXECUTE format('GRANT SELECT ON public.%I TO anon;', t);
  END LOOP;

  -- anon may insert messages (contact form) and error_logs
  EXECUTE 'GRANT INSERT ON public.messages TO anon';
END $$;

-- =====================================================================
-- RLS — enable and reset policies (drop ALL then recreate)
-- Uses inline EXISTS check against public.user_roles (no private.* helpers)
-- =====================================================================
DO $$
DECLARE t text; p record;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'profile','navigation_menu','courses','video_courses','blog_posts',
    'projects','companies','education','certifications','skills',
    'talks','testimonials','statistics','international_experience',
    'home_content','site_settings','messages','error_logs','user_roles'
  ] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', t);
    FOR p IN SELECT policyname FROM pg_policies WHERE schemaname='public' AND tablename=t LOOP
      EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I;', p.policyname, t);
    END LOOP;
  END LOOP;
END $$;

-- user_roles: user reads own; admins manage
CREATE POLICY "users read own roles" ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "admins manage roles" ON public.user_roles FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role='admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role='admin'));

-- Visitor-facing tables: public SELECT + admin ALL
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'profile','navigation_menu','courses','video_courses','blog_posts',
    'projects','companies','education','certifications','skills',
    'talks','testimonials','statistics','international_experience',
    'home_content','site_settings'
  ] LOOP
    EXECUTE format($f$
      CREATE POLICY "public read" ON public.%I FOR SELECT USING (true);
      CREATE POLICY "admin all" ON public.%I FOR ALL TO authenticated
        USING (EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role='admin'))
        WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role='admin'));
    $f$, t, t);
  END LOOP;
END $$;

-- messages: anyone can insert; only admins read/delete
CREATE POLICY "anyone insert message" ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "admins manage messages" ON public.messages FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role='admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role='admin'));

-- error_logs: admin-only read; service role writes (client insert blocked)
CREATE POLICY "admins read errors" ON public.error_logs FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role='admin'));

-- =====================================================================
-- STORAGE — bucket + policies (portfolio-assets)
-- =====================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;

DO $$
DECLARE p record;
BEGIN
  FOR p IN SELECT policyname FROM pg_policies
           WHERE schemaname='storage' AND tablename='objects'
             AND policyname IN (
               'portfolio public read','portfolio admin insert',
               'portfolio admin update','portfolio admin delete'
             )
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects;', p.policyname);
  END LOOP;
END $$;

CREATE POLICY "portfolio public read" ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-assets');
CREATE POLICY "portfolio admin insert" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'portfolio-assets'
    AND EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role='admin'));
CREATE POLICY "portfolio admin update" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'portfolio-assets'
    AND EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role='admin'))
  WITH CHECK (bucket_id = 'portfolio-assets'
    AND EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role='admin'));
CREATE POLICY "portfolio admin delete" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'portfolio-assets'
    AND EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role='admin'));

-- =====================================================================
-- DROP obsolete helpers if present (safe if missing)
-- =====================================================================
DROP FUNCTION IF EXISTS private.is_admin(uuid);
DROP FUNCTION IF EXISTS private.has_role(uuid, public.app_role);
DROP FUNCTION IF EXISTS public.is_admin(uuid);
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

-- =====================================================================
-- VERIFICATION QUERIES (run these separately as an admin user)
-- =====================================================================
-- 1) Admin INSERT / UPDATE / DELETE on navigation_menu
--    INSERT INTO public.navigation_menu(path, label_en) VALUES ('/verify','Verify');
--    UPDATE public.navigation_menu SET label_en='Verify2' WHERE path='/verify';
--    DELETE FROM public.navigation_menu WHERE path='/verify';
--
-- 2) Admin profile update
--    UPDATE public.profile SET tagline='ok' WHERE id = (SELECT id FROM public.profile LIMIT 1);
--
-- 3) Public SELECT (as anon)
--    SET ROLE anon; SELECT count(*) FROM public.profile; RESET ROLE;
--
-- 4) Storage upload — from the app or:
--    SELECT * FROM storage.buckets WHERE id='portfolio-assets';
--
-- 5) Policy audit — must return zero rows
--    SELECT schemaname,tablename,policyname,qual,with_check
--    FROM pg_policies
--    WHERE (qual ILIKE '%private.%' OR with_check ILIKE '%private.%');
--
-- 6) Role audit — must show role='admin' for your user
--    SELECT u.email, r.role FROM public.user_roles r JOIN auth.users u ON u.id=r.user_id;
