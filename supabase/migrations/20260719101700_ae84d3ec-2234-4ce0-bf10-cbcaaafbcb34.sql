
DROP POLICY IF EXISTS "portfolio-assets authenticated write" ON storage.objects;
DROP POLICY IF EXISTS "portfolio-assets authenticated update" ON storage.objects;
DROP POLICY IF EXISTS "portfolio-assets authenticated delete" ON storage.objects;

CREATE POLICY "portfolio-assets admin write" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'portfolio-assets' AND private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "portfolio-assets admin update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'portfolio-assets' AND private.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (bucket_id = 'portfolio-assets' AND private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "portfolio-assets admin delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'portfolio-assets' AND private.has_role(auth.uid(), 'admin'::app_role));
