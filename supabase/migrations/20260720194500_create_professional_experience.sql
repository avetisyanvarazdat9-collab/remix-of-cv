-- Professional Experience CMS table (job history, separate from partners/companies).

CREATE TABLE IF NOT EXISTS public.professional_experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_title text,
  organization text,
  location text,
  employment_type text,
  description text,
  start_year int,
  end_year int,
  is_current boolean NOT NULL DEFAULT false,
  display_order int NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  i18n jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.professional_experience TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.professional_experience TO authenticated;
GRANT ALL ON public.professional_experience TO service_role;

ALTER TABLE public.professional_experience ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read professional_experience" ON public.professional_experience;
CREATE POLICY "public read professional_experience"
  ON public.professional_experience FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "admin all professional_experience" ON public.professional_experience;
CREATE POLICY "admin all professional_experience"
  ON public.professional_experience FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles r
      WHERE r.user_id = auth.uid()
        AND r.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles r
      WHERE r.user_id = auth.uid()
        AND r.role = 'admin'
    )
  );

DROP TRIGGER IF EXISTS professional_experience_set_updated_at ON public.professional_experience;
CREATE TRIGGER professional_experience_set_updated_at
  BEFORE UPDATE ON public.professional_experience
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

NOTIFY pgrst, 'reload schema';
