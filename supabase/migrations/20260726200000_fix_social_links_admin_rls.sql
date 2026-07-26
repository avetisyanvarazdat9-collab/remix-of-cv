-- Ensure admins can SELECT all social_links rows (including hidden / empty URL rows).

DROP POLICY IF EXISTS "admin read all social_links" ON public.social_links;
CREATE POLICY "admin read all social_links"
  ON public.social_links FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles r
      WHERE r.user_id = auth.uid()
        AND r.role = 'admin'
    )
  );

NOTIFY pgrst, 'reload schema';
