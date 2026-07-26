-- Centralized social media links (single source of truth for public social URLs).

CREATE TABLE IF NOT EXISTS public.social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  url text,
  is_visible boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT social_links_platform_unique UNIQUE (platform),
  CONSTRAINT social_links_platform_check CHECK (
    platform IN ('facebook', 'instagram', 'linkedin', 'github', 'twitter', 'youtube', 'telegram', 'tiktok')
  )
);

CREATE INDEX IF NOT EXISTS social_links_visible_order_idx
  ON public.social_links (is_visible, display_order);

GRANT SELECT ON public.social_links TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.social_links TO authenticated;
GRANT ALL ON public.social_links TO service_role;

ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read visible social_links" ON public.social_links;
CREATE POLICY "public read visible social_links"
  ON public.social_links FOR SELECT
  USING (is_visible = true AND url IS NOT NULL AND length(trim(url)) > 0);

DROP POLICY IF EXISTS "admin all social_links" ON public.social_links;
CREATE POLICY "admin all social_links"
  ON public.social_links FOR ALL
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

DROP TRIGGER IF EXISTS social_links_set_updated_at ON public.social_links;
CREATE TRIGGER social_links_set_updated_at
  BEFORE UPDATE ON public.social_links
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed all supported platforms (empty until configured in Admin).
INSERT INTO public.social_links (platform, url, is_visible, display_order) VALUES
  ('facebook', NULL, false, 1),
  ('instagram', NULL, false, 2),
  ('linkedin', NULL, false, 3),
  ('github', NULL, false, 4),
  ('twitter', NULL, false, 5),
  ('youtube', NULL, false, 6),
  ('telegram', NULL, false, 7),
  ('tiktok', NULL, false, 8)
ON CONFLICT (platform) DO NOTHING;

-- Migrate existing profile social URLs (preserve data; do not delete profile columns).
DO $$
DECLARE
  p record;
BEGIN
  SELECT github_url, linkedin_url, twitter_url
  INTO p
  FROM public.profile
  ORDER BY created_at
  LIMIT 1;

  IF p.github_url IS NOT NULL AND length(trim(p.github_url)) > 0 THEN
    UPDATE public.social_links
    SET url = trim(p.github_url), is_visible = true
    WHERE platform = 'github';
  END IF;

  IF p.linkedin_url IS NOT NULL AND length(trim(p.linkedin_url)) > 0 THEN
    UPDATE public.social_links
    SET url = trim(p.linkedin_url), is_visible = true
    WHERE platform = 'linkedin';
  END IF;

  IF p.twitter_url IS NOT NULL AND length(trim(p.twitter_url)) > 0 THEN
    UPDATE public.social_links
    SET url = trim(p.twitter_url), is_visible = true
    WHERE platform = 'twitter';
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';
