
CREATE TABLE public.navigation_menu (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  path text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.navigation_menu TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.navigation_menu TO authenticated;
GRANT ALL ON public.navigation_menu TO service_role;

ALTER TABLE public.navigation_menu ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read visible nav"
  ON public.navigation_menu FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert nav"
  ON public.navigation_menu FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update nav"
  ON public.navigation_menu FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete nav"
  ON public.navigation_menu FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER navigation_menu_set_updated_at
  BEFORE UPDATE ON public.navigation_menu
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.navigation_menu (label, path, order_index, is_visible) VALUES
  ('Home', '/', 10, true),
  ('About', '/about', 20, true),
  ('Projects', '/projects', 30, true),
  ('Courses', '/courses', 40, true),
  ('Video', '/video-courses', 50, true),
  ('Talks', '/talks', 60, true),
  ('Blog', '/blog', 70, true),
  ('Companies', '/companies', 80, true),
  ('Contact', '/contact', 90, true);
