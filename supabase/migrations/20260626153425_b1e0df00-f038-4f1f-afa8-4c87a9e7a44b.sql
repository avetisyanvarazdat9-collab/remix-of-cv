
CREATE TABLE public.certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  issuer text,
  issue_date date,
  expiry_date date,
  credential_id text,
  credential_url text,
  image_url text,
  description text,
  display_order integer NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  i18n jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.certifications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.certifications TO authenticated;
GRANT ALL ON public.certifications TO service_role;

ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view visible certifications"
  ON public.certifications FOR SELECT
  USING (is_visible = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage certifications"
  ON public.certifications FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER certifications_set_updated_at
  BEFORE UPDATE ON public.certifications
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
