
CREATE TABLE public.international_experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  organization text,
  location text,
  country_code text,
  lat double precision,
  lng double precision,
  category text,
  event_date date,
  description text,
  url text,
  display_order integer NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  i18n jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.international_experience TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.international_experience TO authenticated;
GRANT ALL ON public.international_experience TO service_role;

ALTER TABLE public.international_experience ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read visible international experience"
  ON public.international_experience FOR SELECT
  USING (is_visible = true);

CREATE POLICY "Admins manage international experience"
  ON public.international_experience FOR ALL
  TO authenticated
  USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_intl_exp_updated_at
  BEFORE UPDATE ON public.international_experience
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DELETE FROM public.navigation_menu;
INSERT INTO public.navigation_menu (path, label, label_en, label_hy, label_ru, order_index, is_visible) VALUES
  ('/learn',       'Learn',       'Learn',       'Ուսուցում',    'Обучение',      1, true),
  ('/transform',   'Transform',   'Transform',   'Փոխակերպում',  'Трансформация', 2, true),
  ('/collaborate', 'Collaborate', 'Collaborate', 'Համագործակցել','Сотрудничество', 3, true),
  ('/impact',      'Impact',      'Impact',      'Ազդեցություն', 'Влияние',       4, true),
  ('/contact',     'Connect',     'Connect',     'Կապ',          'Связаться',     5, true);
