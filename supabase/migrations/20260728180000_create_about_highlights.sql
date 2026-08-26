-- About Highlights: institution + role sidebar items for homepage About preview.

CREATE TABLE public.about_highlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL,
  institutions jsonb NOT NULL DEFAULT '[]'::jsonb,
  i18n jsonb NOT NULL DEFAULT '{}'::jsonb,
  display_order integer NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.about_highlights TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.about_highlights TO authenticated;
GRANT ALL ON public.about_highlights TO service_role;

ALTER TABLE public.about_highlights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read about_highlights" ON public.about_highlights FOR SELECT USING (is_visible);
CREATE POLICY "admins manage about_highlights" ON public.about_highlights
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = auth.uid() AND r.role = 'admin'));

CREATE TRIGGER about_highlights_updated_at
  BEFORE UPDATE ON public.about_highlights
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.about_highlights (role, institutions, i18n, display_order, is_visible) VALUES
  (
    'AI/ML Researcher',
    '[{"name": "IIAP", "url": "", "logo_url": ""}]'::jsonb,
    '{"role":{"hy":"AI/ML Researcher","en":"AI/ML Researcher","ru":"AI/ML Researcher"}}'::jsonb,
    0,
    true
  ),
  (
    'Department Chair',
    '[{"name": "GSU", "url": "", "logo_url": ""}]'::jsonb,
    '{"role":{"hy":"Department Chair","en":"Department Chair","ru":"Department Chair"}}'::jsonb,
    1,
    true
  ),
  (
    'Lecturer',
    '[{"name": "UFAR", "url": "", "logo_url": ""}, {"name": "NPUA", "url": "", "logo_url": ""}]'::jsonb,
    '{"role":{"hy":"Lecturer","en":"Lecturer","ru":"Lecturer"}}'::jsonb,
    2,
    true
  ),
  (
    'Educator',
    '[{"name": "Ardy Academy", "url": "", "logo_url": ""}]'::jsonb,
    '{"role":{"hy":"Educator","en":"Educator","ru":"Educator"}}'::jsonb,
    3,
    true
  ),
  (
    'Co-founder & Former CTO',
    '[{"name": "Luseen Mobile", "url": "", "logo_url": ""}]'::jsonb,
    '{"role":{"hy":"Co-founder & Former CTO","en":"Co-founder & Former CTO","ru":"Co-founder & Former CTO"}}'::jsonb,
    4,
    true
  );

NOTIFY pgrst, 'reload schema';
