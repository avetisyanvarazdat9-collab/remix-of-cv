-- Generic admin-editable page text content (key-value per page, multilingual).

CREATE TABLE IF NOT EXISTS public.page_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  key text NOT NULL,
  i18n jsonb NOT NULL DEFAULT '{}'::jsonb,
  description text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT page_content_page_key_unique UNIQUE (page, key)
);

CREATE INDEX IF NOT EXISTS page_content_page_idx
  ON public.page_content (page);

GRANT SELECT ON public.page_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_content TO authenticated;
GRANT ALL ON public.page_content TO service_role;

ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public can read page_content" ON public.page_content;
CREATE POLICY "public can read page_content"
  ON public.page_content FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "admins can insert page_content" ON public.page_content;
CREATE POLICY "admins can insert page_content"
  ON public.page_content FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles r
      WHERE r.user_id = auth.uid()
        AND r.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "admins can update page_content" ON public.page_content;
CREATE POLICY "admins can update page_content"
  ON public.page_content FOR UPDATE
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

DROP POLICY IF EXISTS "admins can delete page_content" ON public.page_content;
CREATE POLICY "admins can delete page_content"
  ON public.page_content FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles r
      WHERE r.user_id = auth.uid()
        AND r.role = 'admin'
    )
  );

DROP TRIGGER IF EXISTS page_content_set_updated_at ON public.page_content;
CREATE TRIGGER page_content_set_updated_at
  BEFORE UPDATE ON public.page_content
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

NOTIFY pgrst, 'reload schema';
