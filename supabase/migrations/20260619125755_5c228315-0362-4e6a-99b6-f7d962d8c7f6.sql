CREATE TABLE public.site_settings (
  id BOOLEAN PRIMARY KEY DEFAULT TRUE,
  primary_color TEXT NOT NULL DEFAULT '#7c5cff',
  background_color TEXT NOT NULL DEFAULT '#0f172a',
  text_color TEXT NOT NULL DEFAULT '#f1f5f9',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT site_settings_singleton CHECK (id = TRUE)
);

GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT INSERT, UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public can read site_settings" ON public.site_settings
  FOR SELECT USING (true);

CREATE POLICY "admins can insert site_settings" ON public.site_settings
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins can update site_settings" ON public.site_settings
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER set_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.site_settings (id) VALUES (TRUE) ON CONFLICT DO NOTHING;