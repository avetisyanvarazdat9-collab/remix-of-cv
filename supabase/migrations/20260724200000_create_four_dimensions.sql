-- Four Dimensions of Impact CMS table + storage bucket.

CREATE TABLE IF NOT EXISTS public.four_dimensions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dimension_number integer NOT NULL,
  title text NOT NULL,
  subtitle text,
  description text,
  bullet_points jsonb NOT NULL DEFAULT '[]'::jsonb,
  image_url text,
  image_alt text,
  badge_text text,
  engagement_text text,
  cta_button_text text,
  cta_button_url text,
  timeline_button_text text,
  timeline_button_url text,
  show_timeline_footer boolean NOT NULL DEFAULT false,
  is_visible boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT four_dimensions_number_unique UNIQUE (dimension_number),
  CONSTRAINT four_dimensions_number_range CHECK (dimension_number BETWEEN 1 AND 4)
);

CREATE INDEX IF NOT EXISTS four_dimensions_display_order_idx
  ON public.four_dimensions (display_order);

CREATE INDEX IF NOT EXISTS four_dimensions_visible_order_idx
  ON public.four_dimensions (is_visible, display_order);

GRANT SELECT ON public.four_dimensions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.four_dimensions TO authenticated;
GRANT ALL ON public.four_dimensions TO service_role;

ALTER TABLE public.four_dimensions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read visible four_dimensions" ON public.four_dimensions;
CREATE POLICY "public read visible four_dimensions"
  ON public.four_dimensions FOR SELECT
  USING (is_visible = true);

DROP POLICY IF EXISTS "admin all four_dimensions" ON public.four_dimensions;
CREATE POLICY "admin all four_dimensions"
  ON public.four_dimensions FOR ALL
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

DROP TRIGGER IF EXISTS four_dimensions_set_updated_at ON public.four_dimensions;
CREATE TRIGGER four_dimensions_set_updated_at
  BEFORE UPDATE ON public.four_dimensions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Storage bucket for dimension images (path: {dimension_id}/image.ext)
INSERT INTO storage.buckets (id, name, public)
VALUES ('four-dimensions', 'four-dimensions', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "four-dimensions public read" ON storage.objects;
CREATE POLICY "four-dimensions public read"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'four-dimensions');

DROP POLICY IF EXISTS "four-dimensions admin all" ON storage.objects;
CREATE POLICY "four-dimensions admin all"
  ON storage.objects
  FOR ALL
  TO authenticated
  USING (
    bucket_id = 'four-dimensions'
    AND EXISTS (
      SELECT 1 FROM public.user_roles r
      WHERE r.user_id = auth.uid()
        AND r.role = 'admin'
    )
  )
  WITH CHECK (
    bucket_id = 'four-dimensions'
    AND EXISTS (
      SELECT 1 FROM public.user_roles r
      WHERE r.user_id = auth.uid()
        AND r.role = 'admin'
    )
  );

-- Seed the four existing dimensions (preserves current homepage content).
INSERT INTO public.four_dimensions (
  id,
  dimension_number,
  title,
  subtitle,
  description,
  bullet_points,
  image_url,
  image_alt,
  badge_text,
  engagement_text,
  cta_button_text,
  cta_button_url,
  timeline_button_text,
  timeline_button_url,
  show_timeline_footer,
  is_visible,
  display_order
) VALUES
  (
    'a1b2c3d4-1111-4111-8111-111111111101',
    1,
    'Academic Leadership',
    NULL,
    'PhD in Computer Engineering',
    '["University Professor","AI & Computer Science Educator","Research & Curriculum Development","International Academic Collaborations"]'::jsonb,
    NULL,
    'Portrait of Varazdat Avetisyan in academic setting',
    NULL,
    NULL,
    'Learn More',
    '/collaborate',
    NULL,
    NULL,
    false,
    true,
    1
  ),
  (
    'a1b2c3d4-1111-4111-8111-111111111102',
    2,
    'Industry Leadership',
    NULL,
    'CTO & Co-Founder, Luseen Mobile',
    '["AI Consultant","Technology Strategy","Software Engineering","Digital Transformation"]'::jsonb,
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80',
    'Technology leadership team collaborating in a modern workspace',
    NULL,
    NULL,
    'Learn More',
    '/transform',
    NULL,
    NULL,
    false,
    true,
    2
  ),
  (
    'a1b2c3d4-1111-4111-8111-111111111103',
    3,
    'Education & Training',
    NULL,
    'AI Course Development',
    '["University Teaching","Corporate Training","Workshops & Professional Development","Student Mentorship"]'::jsonb,
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    'Educator leading a professional training workshop',
    NULL,
    NULL,
    'Learn More',
    '/learn',
    NULL,
    NULL,
    false,
    true,
    3
  ),
  (
    'a1b2c3d4-1111-4111-8111-111111111104',
    4,
    'International Experience',
    NULL,
    'Trainings & workshops across Europe',
    '["Academic exchange programs","Conference speaking","Cross-institutional research","Global professional network"]'::jsonb,
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
    'International travel and global professional collaboration',
    NULL,
    NULL,
    NULL,
    NULL,
    'View Timeline',
    '/timeline',
    true,
    true,
    4
  )
ON CONFLICT (id) DO NOTHING;

NOTIFY pgrst, 'reload schema';
