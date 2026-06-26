CREATE TABLE public.home_content (
  id BOOLEAN PRIMARY KEY DEFAULT TRUE,
  hero_badge TEXT NOT NULL DEFAULT 'AI / ML Researcher & Educator',
  hero_btn1_label TEXT NOT NULL DEFAULT 'Explore Courses',
  hero_btn1_url   TEXT NOT NULL DEFAULT '/courses',
  hero_btn2_label TEXT NOT NULL DEFAULT 'Book a Consultation',
  hero_btn2_url   TEXT NOT NULL DEFAULT '',
  hero_btn3_label TEXT NOT NULL DEFAULT 'Contact Me',
  hero_btn3_url   TEXT NOT NULL DEFAULT '',
  about_label TEXT NOT NULL DEFAULT 'About Me',
  about_heading TEXT NOT NULL DEFAULT 'Building the future of AI',
  about_btn_label TEXT NOT NULL DEFAULT 'Read Full Biography',
  about_btn_url   TEXT NOT NULL DEFAULT '/about',
  courses_label TEXT NOT NULL DEFAULT 'Learning',
  courses_heading TEXT NOT NULL DEFAULT 'Featured Courses',
  partners_heading TEXT NOT NULL DEFAULT 'Partner Organizations',
  cta_heading TEXT NOT NULL DEFAULT 'Ready to collaborate?',
  cta_text TEXT NOT NULL DEFAULT 'Whether it''s research, teaching, or building — let''s start a conversation.',
  cta_btn_label TEXT NOT NULL DEFAULT 'Get in Touch',
  cta_btn_url   TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT home_content_singleton CHECK (id = TRUE)
);

GRANT SELECT ON public.home_content TO anon, authenticated;
GRANT INSERT, UPDATE ON public.home_content TO authenticated;
GRANT ALL ON public.home_content TO service_role;

ALTER TABLE public.home_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public can read home_content" ON public.home_content
  FOR SELECT USING (true);

CREATE POLICY "admins can insert home_content" ON public.home_content
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins can update home_content" ON public.home_content
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER set_home_content_updated_at
  BEFORE UPDATE ON public.home_content
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.home_content (id) VALUES (TRUE) ON CONFLICT DO NOTHING;